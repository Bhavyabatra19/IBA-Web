/**
 * The Expertise hero's graphic, after the reference the client supplied: a
 * dark, glossy globe with silver land, turning slowly inside thin orbit
 * rings — one in IBA Red with a dot riding it — and three frosted icon
 * buttons in front (advise → / tokenize ⇄ / connect ∞).
 *
 * Same projection as CorridorGlobe (Natural Earth land, orthographic, far
 * side pulled to the horizon). Styles in brandbook.css (.xg). Reduced
 * motion: drawn once, still.
 */

import { useEffect, useRef } from 'react'
import LAND from '../data/land-110m.json'
import { reducedMotion, whileOnScreen } from '../lib/scroll'

/* Laid out on the reference's own 720-wide frame (its empty top cropped):
   a large globe low and right, running off the edge */
const R = 390
const CX = 560
const CY = 760
const TILT = (24 * Math.PI) / 180
const SPEED = 5

function landPath(lon0) {
  const l0 = (lon0 * Math.PI) / 180
  const sinT = Math.sin(TILT)
  const cosT = Math.cos(TILT)
  let d = ''
  for (const ring of LAND) {
    let any = false
    let seg = ''
    for (let i = 0; i < ring.length; i++) {
      const lon = (ring[i][0] * Math.PI) / 180
      const lat = (ring[i][1] * Math.PI) / 180
      const cl = Math.cos(lat)
      const dl = lon - l0
      let x = cl * Math.sin(dl)
      let y = cosT * Math.sin(lat) - sinT * cl * Math.cos(dl)
      if (sinT * Math.sin(lat) + cosT * cl * Math.cos(dl) > 0) any = true
      else {
        const m = Math.hypot(x, y) || 1
        x /= m
        y /= m
      }
      seg += `${i ? 'L' : 'M'}${(CX + x * R).toFixed(1)} ${(CY - y * R).toFixed(1)}`
    }
    if (any) d += seg + 'Z'
  }
  return d
}

/* an ellipse centred on (cx, cy) */
const ring = (cx, cy, rx, ry) =>
  `M${cx - rx} ${cy}a${rx} ${ry} 0 1 0 ${rx * 2} 0a${rx} ${ry} 0 1 0 ${-rx * 2} 0`

/* The rings as the reference draws them — not centred on the globe, but
   orbits seen in perspective, all tilted up to the right:
   [cx, cy, rx, ry, rotation, red] */
const RINGS = [
  [285, 535, 215, 78, -33, false], // the large grey ellipse, upper left
  [238, 482, 78, 32, -33, false], //  the small one nested near its top
  [365, 615, 395, 125, -38, true], //  the long red sweep across the globe
  [470, 975, 420, 130, -28, false], // the wide grey ring along the foot
]

export default function ExpertiseGlobe() {
  const svg = useRef(null)
  const land = useRef(null)

  useEffect(() => {
    const el = svg.current
    const path = land.current
    if (!el || !path) return
    let lon = 40
    path.setAttribute('d', landPath(lon))
    if (reducedMotion()) return
    let raf = 0
    let last = 0
    const tick = (t) => {
      if (last) lon -= ((t - last) / 1000) * SPEED
      last = t
      path.setAttribute('d', landPath(lon))
      raf = requestAnimationFrame(tick)
    }
    const release = whileOnScreen(
      el,
      () => {
        last = 0
        raf = requestAnimationFrame(tick)
      },
      () => cancelAnimationFrame(raf)
    )
    return () => {
      release()
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="xg" aria-hidden="true">
      <svg ref={svg} viewBox="0 300 720 716">
        <defs>
          {/* the sphere: near-black, with a cool sheen up and left */}
          <radialGradient id="xg-sphere" cx="35%" cy="28%" r="80%">
            <stop offset="0" stopColor="#3a3a3e" />
            <stop offset="0.5" stopColor="#151517" />
            <stop offset="1" stopColor="#050505" />
          </radialGradient>
          {/* silver land, lit from the top-left */}
          <linearGradient id="xg-land" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f2f2f2" />
            <stop offset="0.6" stopColor="#a9a9ad" />
            <stop offset="1" stopColor="#5a5a5e" />
          </linearGradient>
          <radialGradient id="xg-gloss" cx="32%" cy="22%" r="45%">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.22" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <clipPath id="xg-clip">
            <circle cx={CX} cy={CY} r={R} />
          </clipPath>
        </defs>

        <circle cx={CX} cy={CY} r={R} fill="url(#xg-sphere)" />
        <path ref={land} fill="url(#xg-land)" opacity="0.9" clipPath="url(#xg-clip)" />
        <circle cx={CX} cy={CY} r={R} fill="url(#xg-gloss)" />
        <circle cx={CX} cy={CY} r={R} className="xg__rim" />

        {RINGS.map(([cx, cy, rx, ry, rot, red], i) => (
          <g key={i} transform={`rotate(${rot} ${cx} ${cy})`}>
            <path id={`xg-r${i}`} d={ring(cx, cy, rx, ry)} className={red ? 'xg__ring xg__ring--red' : 'xg__ring'} />
            {red && (
              <circle r="8" className="xg__dot">
                <animateMotion dur="10s" repeatCount="indefinite">
                  <mpath href={`#xg-r${i}`} />
                </animateMotion>
              </circle>
            )}
          </g>
        ))}
      </svg>

      {/* the three frosted icon buttons */}
      <div className="xg__icons">
        <span className="xg__icon">
          <svg viewBox="0 0 24 24">
            <path d="M4 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
        <span className="xg__icon">
          <svg viewBox="0 0 24 24">
            <path d="M5 8h13M14 4l4 4-4 4M19 16H6M10 12l-4 4 4 4" />
          </svg>
        </span>
        <span className="xg__icon">
          <svg viewBox="0 0 24 24">
            <path d="M10 14a4 4 0 0 1 0-5.6l2.4-2.4a4 4 0 0 1 5.6 5.6l-1.2 1.2M14 10a4 4 0 0 1 0 5.6L11.6 18a4 4 0 0 1-5.6-5.6l1.2-1.2" />
          </svg>
        </span>
      </div>
    </div>
  )
}
