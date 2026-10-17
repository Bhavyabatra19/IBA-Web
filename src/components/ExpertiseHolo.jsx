/**
 * The Expertise hero's graphic, after the reference the client supplied (a
 * glowing low-poly brain over a lit pedestal), in the IBA theme: the
 * hologram and the pedestal's light in IBA Red, the candle and rims silver.
 *
 *   - a low-poly brain: points scattered inside a brain silhouette and
 *     Delaunay-triangulated, each facet shaded as if lit from the top left,
 *     clipped to the outline, with a red glow behind
 *   - three thin orbit rings that pass behind the brain and in front of it,
 *     with clusters of light dots flowing along them and a red bead on each
 *   - a two-tier pedestal in isometric, with a band of red light round the
 *     side of each tier, and a silver-rimmed plate on top
 *   - a tiled floor, floating motes, a silver trading candle beside the
 *     pedestal and a blurred red one far behind
 *
 * Motion (CSS, brandbook.css .xh): the brain floats, the rings' dots flow,
 * the plate and motes pulse. Reduced motion: still.
 */

import { useMemo } from 'react'

/* the brain, side on, facing left; the stem drops toward the plate */
const BRAIN =
  'M190 262C178 214 214 172 258 166C284 140 336 138 362 158C402 158 428 190 422 226C442 252 428 292 396 298C384 322 350 328 330 318L326 352L310 354L304 320C280 328 240 320 224 302C198 300 186 282 190 262Z'
/* placed and sized in the frame */
const BRAIN_AT = 'translate(-45 -38) scale(1.1)'

/* a small seeded generator, so the mesh is the same on every load */
function rng(seed) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

/* Bowyer–Watson Delaunay triangulation: returns index triples */
function delaunay(pts) {
  const big = [
    [-2000, -2000],
    [3000, -2000],
    [500, 4000],
  ]
  const all = pts.concat(big)
  const n = pts.length
  const circ = (a, b, c) => {
    const [ax, ay] = all[a]
    const [bx, by] = all[b]
    const [cx, cy] = all[c]
    const d = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by))
    const ux = ((ax * ax + ay * ay) * (by - cy) + (bx * bx + by * by) * (cy - ay) + (cx * cx + cy * cy) * (ay - by)) / d
    const uy = ((ax * ax + ay * ay) * (cx - bx) + (bx * bx + by * by) * (ax - cx) + (cx * cx + cy * cy) * (bx - ax)) / d
    return [ux, uy, (ax - ux) ** 2 + (ay - uy) ** 2]
  }
  let tris = [[n, n + 1, n + 2, ...circ(n, n + 1, n + 2)]]
  for (let i = 0; i < n; i++) {
    const [px, py] = all[i]
    const bad = []
    const keep = []
    for (const t of tris) ((px - t[3]) ** 2 + (py - t[4]) ** 2 < t[5] ? bad : keep).push(t)
    const edges = new Map()
    for (const t of bad) {
      for (const [a, b] of [
        [t[0], t[1]],
        [t[1], t[2]],
        [t[2], t[0]],
      ]) {
        const k = a < b ? `${a},${b}` : `${b},${a}`
        edges.set(k, edges.has(k) ? null : [a, b])
      }
    }
    for (const e of edges.values()) if (e) keep.push([e[0], e[1], i, ...circ(e[0], e[1], i)])
    tris = keep
  }
  return tris.filter((t) => t[0] < n && t[1] < n && t[2] < n).map((t) => [t[0], t[1], t[2]])
}

function buildMesh() {
  if (typeof document === 'undefined') return { pts: [], tris: [] }
  const ctx = document.createElement('canvas').getContext('2d')
  const shape = new Path2D(BRAIN)
  const rand = rng(11)
  const pts = []
  /* the outline first, so the facets reach the edge */
  const probe = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  probe.setAttribute('d', BRAIN)
  const len = probe.getTotalLength ? probe.getTotalLength() : 0
  for (let l = 0; len && l < len; l += 16) {
    const p = probe.getPointAtLength(l)
    pts.push([p.x, p.y])
  }
  let guard = 0
  while (pts.length < 150 && guard++ < 8000) {
    const x = 182 + rand() * 248
    const y = 136 + rand() * 220
    if (!ctx.isPointInPath(shape, x, y)) continue
    if (pts.some(([px, py]) => Math.hypot(px - x, py - y) < 13)) continue
    pts.push([x, y])
  }
  const tris = delaunay(pts).map(([a, b, c]) => {
    const cx = (pts[a][0] + pts[b][0] + pts[c][0]) / 3
    const cy = (pts[a][1] + pts[b][1] + pts[c][1]) / 3
    /* lit from the top left: lighter there, deeper red to the bottom right */
    const light = Math.max(0, Math.min(1, 1.15 - (cx - 180) / 400 - (cy - 140) / 420 + (rand() - 0.5) * 0.45))
    return { d: `M${pts[a]}L${pts[b]}L${pts[c]}Z`, light }
  })
  return { pts, tris }
}

/* an isometric square block: centre of its top face, half-width, height */
function block(cx, cy, hw, h, band) {
  const hh = hw * 0.32
  const L = [cx - hw, cy]
  const T = [cx, cy - hh]
  const R = [cx + hw, cy]
  const B = [cx, cy + hh]
  const p = (pts) => pts.map((q) => q.join(',')).join(' ')
  const at = (dy) => `M${L[0]} ${L[1] + dy}L${B[0]} ${B[1] + dy}L${R[0]} ${R[1] + dy}`
  return {
    top: p([L, T, R, B]),
    left: p([L, B, [B[0], B[1] + h], [L[0], L[1] + h]]),
    right: p([B, R, [R[0], R[1] + h], [B[0], B[1] + h]]),
    rim: at(0),
    band: at(band),
  }
}

const TIERS = [block(300, 498, 236, 74, 44), block(300, 446, 156, 50, 30)]

/* the orbit rings: [cy, rx, ry, rotation, seconds per lap] */
const ORBITS = [
  [150, 168, 22, -3, 11],
  [258, 236, 42, -5, 14],
  [372, 170, 28, 3, 12],
]
const ell = (cy, rx, ry) => ({
  full: `M${300 - rx} ${cy}a${rx} ${ry} 0 1 0 ${rx * 2} 0a${rx} ${ry} 0 1 0 ${-rx * 2} 0`,
  back: `M${300 - rx} ${cy}A${rx} ${ry} 0 0 1 ${300 + rx} ${cy}`,
  front: `M${300 + rx} ${cy}A${rx} ${ry} 0 0 1 ${300 - rx} ${cy}`,
})

/* floating motes: [x, y, r, delay] */
const MOTES = [
  [92, 180, 2, 0],
  [150, 410, 1.5, 1.2],
  [470, 120, 1.8, 2.1],
  [540, 300, 2.2, 0.6],
  [118, 300, 1.4, 2.8],
  [505, 420, 1.6, 1.7],
  [210, 110, 1.3, 3.2],
  [420, 380, 1.4, 0.9],
  [70, 470, 1.8, 2.4],
  [560, 190, 1.3, 3.6],
]

export default function ExpertiseHolo() {
  const { pts, tris } = useMemo(buildMesh, [])

  return (
    <div className="xh" aria-hidden="true">
      <svg viewBox="40 90 520 560">
        <defs>
          <linearGradient id="xh-top" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2b2b30" />
            <stop offset="1" stopColor="#141417" />
          </linearGradient>
          <linearGradient id="xh-side-l" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#0b0b0c" />
            <stop offset="1" stopColor="#1d1d21" />
          </linearGradient>
          <linearGradient id="xh-side-r" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#17171a" />
            <stop offset="1" stopColor="#050506" />
          </linearGradient>
          <linearGradient id="xh-silver" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#4c4c52" />
            <stop offset="0.3" stopColor="#f4f4f6" />
            <stop offset="0.55" stopColor="#b3b3b8" />
            <stop offset="0.8" stopColor="#6a6a70" />
            <stop offset="1" stopColor="#2e2e32" />
          </linearGradient>
          <linearGradient id="xh-rim" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f2f2f4" />
            <stop offset="0.5" stopColor="#77777d" />
            <stop offset="1" stopColor="#d6d6da" />
          </linearGradient>
          <radialGradient id="xh-floor" cx="50%" cy="35%" r="65%">
            <stop offset="0" stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="xh-floor-mask">
            <rect x="0" y="380" width="600" height="300" fill="url(#xh-floor)" />
          </mask>
          <filter id="xh-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
          <filter id="xh-halo" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="22" />
          </filter>
          <filter id="xh-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
          <clipPath id="xh-brain">
            <path d={BRAIN} />
          </clipPath>
        </defs>

        {/* the floor: dark tiles in isometric, fading out at the edges */}
        <g className="xh__floor" mask="url(#xh-floor-mask)">
          {Array.from({ length: 15 }, (_, i) => {
            const o = (i - 7) * 76
            return (
              <g key={i}>
                <path d={`M${300 + o - 500} ${540 - 160}L${300 + o + 500} ${540 + 160}`} />
                <path d={`M${300 + o + 500} ${540 - 160}L${300 + o - 500} ${540 + 160}`} />
              </g>
            )
          })}
        </g>

        {/* a candle far behind, out of focus */}
        <g className="xh__candle xh__candle--far" filter="url(#xh-blur)">
          <path d="M96 210v130" />
          <rect x="82" y="240" width="28" height="72" />
        </g>

        {/* motes */}
        {MOTES.map(([x, y, r, d], i) => (
          <circle key={i} cx={x} cy={y} r={r} className="xh__mote" style={{ animationDelay: `${d}s` }} />
        ))}

        {/* the pedestal, bottom tier first */}
        {TIERS.map((t, i) => (
          <g key={i} className="xh__tier">
            <polygon points={t.left} fill="url(#xh-side-l)" />
            <polygon points={t.right} fill="url(#xh-side-r)" />
            <polygon points={t.top} fill="url(#xh-top)" />
            <path d={t.rim} className="xh__rim" />
            <path d={t.band} className="xh__band-glow" filter="url(#xh-soft)" />
            <path d={t.band} className="xh__band" />
          </g>
        ))}

        {/* the plate the hologram rises from: silver rim, red ring, mark */}
        <g className="xh__plate">
          <ellipse cx="300" cy="446" rx="96" ry="30" className="xh__plate-base" />
          <ellipse cx="300" cy="440" rx="96" ry="30" fill="#141417" stroke="url(#xh-rim)" strokeWidth="3" />
          <ellipse cx="300" cy="440" rx="80" ry="24" className="xh__plate-ring xh__plate-ring--glow" filter="url(#xh-soft)" />
          <ellipse cx="300" cy="440" rx="80" ry="24" className="xh__plate-ring" />
          <ellipse cx="300" cy="440" rx="62" ry="18" fill="#0d0d0f" stroke="url(#xh-rim)" strokeWidth="1.5" />
          <text x="300" y="446" className="xh__plate-mark">
            IBA
          </text>
        </g>

        {/* the hologram's light, rising from the plate */}
        <path d="M228 440L262 300H338L372 440Z" className="xh__beam" />

        {/* the back halves of the rings, behind the brain */}
        {ORBITS.map(([cy, rx, ry, rot], i) => (
          <g key={i} transform={`rotate(${rot} 300 ${cy})`}>
            <path d={ell(cy, rx, ry).back} className="xh__ring xh__ring--back" />
          </g>
        ))}

        {/* the brain, floating */}
        <g className="xh__brain">
          <g transform={BRAIN_AT}>
            <path d={BRAIN} className="xh__halo" filter="url(#xh-halo)" />
            <g clipPath="url(#xh-brain)">
              {tris.map((t, i) => (
                <path
                  key={i}
                  d={t.d}
                  className="xh__facet"
                  style={{ fill: `hsl(358 ${78 + t.light * 12}% ${24 + t.light * 44}%)`, fillOpacity: 0.55 + t.light * 0.35 }}
                />
              ))}
            </g>
            <path d={BRAIN} className="xh__outline" />
            {pts.map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={i % 6 ? 1.3 : 2.4} className="xh__node" />
            ))}
          </g>
        </g>

        {/* the front halves, the dotted light and a red bead on each ring */}
        {ORBITS.map(([cy, rx, ry, rot, dur], i) => {
          const e = ell(cy, rx, ry)
          return (
            <g key={i} transform={`rotate(${rot} 300 ${cy})`}>
              <path d={e.front} className="xh__ring" />
              <path id={`xh-o${i}`} d={e.full} className="xh__dots" style={{ animationDuration: `${dur * 2}s` }} />
              <circle r="4" className="xh__bead">
                <animateMotion dur={`${dur}s`} begin={`${-i * 3}s`} repeatCount="indefinite">
                  <mpath href={`#xh-o${i}`} />
                </animateMotion>
              </circle>
            </g>
          )
        })}

        {/* the silver candle beside the pedestal */}
        <g className="xh__candle">
          <path d="M536 372v190" className="xh__wick" />
          <rect x="519" y="410" width="34" height="112" fill="url(#xh-silver)" />
          <path d="M519 410h34" className="xh__cap" />
        </g>
      </svg>
    </div>
  )
}
