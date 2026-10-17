/**
 * The stage the drawn inner-page hero graphics share (Library, Red Club):
 * a tiled floor, a two-tier pedestal edge-lit in IBA Red, light rising from
 * the centre, and four floating glass cards joined back to the centre by
 * dotted lines. Each page supplies its own centrepiece as `children`, drawn
 * on the pedestal's top (around x 300, y 380 in the 600-wide frame), and its
 * own card labels and icons.
 *
 * Original SVG artwork — sharp at any size, no third-party image. Styles
 * and motion in brandbook.css (.lh); reduced motion holds it still.
 */

/* an isometric square slab: centre of its top face, half-width, height */
function slab(cx, cy, hw, h) {
  const hh = hw * 0.32
  const L = [cx - hw, cy]
  const T = [cx, cy - hh]
  const R = [cx + hw, cy]
  const B = [cx, cy + hh]
  const p = (pts) => pts.map((q) => q.join(',')).join(' ')
  return {
    top: p([L, T, R, B]),
    left: p([L, B, [B[0], B[1] + h], [L[0], L[1] + h]]),
    right: p([B, R, [R[0], R[1] + h], [B[0], B[1] + h]]),
    band: `M${L[0]} ${L[1] + h * 0.55}L${B[0]} ${B[1] + h * 0.55}L${R[0]} ${R[1] + h * 0.55}`,
  }
}
const TIERS = [slab(300, 470, 220, 62), slab(300, 424, 146, 40)]

/* where the four cards float: [x, y (centre), tilt, float seconds, delay] */
const SLOTS = [
  [148, 200, -10, 6.5, 0],
  [452, 168, 9, 7.2, -1.8],
  [118, 336, -6, 7.8, -3.1],
  [478, 314, 6, 6.9, -2.4],
]

/* motes: [x, y, r, delay] */
const MOTES = [
  [70, 150, 1.8, 0],
  [540, 240, 2, 1.1],
  [250, 96, 1.4, 2.2],
  [360, 120, 1.6, 0.6],
  [560, 420, 1.5, 1.7],
  [52, 420, 1.6, 2.8],
]

/**
 * @param {Array<{label: string, icon: React.ReactNode}>} cards  four cards,
 *   each a short UPPERCASE label and a line icon on a 24 grid
 * @param {string} id  a short prefix for this stage's gradient ids
 * @param {React.ReactNode} children  the centrepiece
 */
export default function HoloStage({ cards, id, children }) {
  const u = (name) => `${id}-${name}`
  return (
    <div className="lh" aria-hidden="true">
      <svg viewBox="20 60 560 520">
        <defs>
          <linearGradient id={u('top')} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2b2b30" />
            <stop offset="1" stopColor="#141417" />
          </linearGradient>
          <linearGradient id={u('side-l')} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#0b0b0c" />
            <stop offset="1" stopColor="#1d1d21" />
          </linearGradient>
          <linearGradient id={u('side-r')} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#17171a" />
            <stop offset="1" stopColor="#050506" />
          </linearGradient>
          <linearGradient id={u('card')} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2a2a2f" stopOpacity="0.92" />
            <stop offset="1" stopColor="#0d0d10" stopOpacity="0.92" />
          </linearGradient>
          <linearGradient id={u('beam')} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#ff3a40" stopOpacity="0.55" />
            <stop offset="1" stopColor="#ff3a40" stopOpacity="0" />
          </linearGradient>
          <radialGradient id={u('floor')} cx="50%" cy="35%" r="65%">
            <stop offset="0" stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id={u('floor-mask')}>
            <rect x="0" y="380" width="600" height="260" fill={`url(#${u('floor')})`} />
          </mask>
          <filter id={u('soft')} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
          <filter id={u('glow')} x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
        </defs>

        {/* the floor */}
        <g className="lh__floor" mask={`url(#${u('floor-mask')})`}>
          {Array.from({ length: 15 }, (_, i) => {
            const o = (i - 7) * 72
            return (
              <g key={i}>
                <path d={`M${300 + o - 500} ${500 - 160}L${300 + o + 500} ${500 + 160}`} />
                <path d={`M${300 + o + 500} ${500 - 160}L${300 + o - 500} ${500 + 160}`} />
              </g>
            )
          })}
        </g>

        {MOTES.map(([x, y, r, d], i) => (
          <circle key={i} cx={x} cy={y} r={r} className="lh__mote" style={{ animationDelay: `${d}s` }} />
        ))}

        {/* the pedestal */}
        {TIERS.map((t, i) => (
          <g key={i}>
            <polygon points={t.left} fill={`url(#${u('side-l')})`} />
            <polygon points={t.right} fill={`url(#${u('side-r')})`} />
            <polygon points={t.top} fill={`url(#${u('top')})`} />
            <path d={t.band} className="lh__band-glow" filter={`url(#${u('soft')})`} />
            <path d={t.band} className="lh__band" />
          </g>
        ))}

        {/* the light rising from the centre */}
        <path d="M232 396L196 150H404L368 396Z" fill={`url(#${u('beam')})`} className="lh__beam" />

        {/* dotted lines from the centre up to each card */}
        {SLOTS.map(([x, y], i) => (
          <path key={i} d={`M300 380Q${(300 + x) / 2} ${(380 + y) / 2 - 40} ${x} ${y + 34}`} className="lh__link" />
        ))}

        {/* the centrepiece, over a red glow */}
        <ellipse cx="300" cy="372" rx="120" ry="40" className="lh__book-glow" filter={`url(#${u('glow')})`} />
        {children}

        {/* the floating cards */}
        {cards.slice(0, 4).map((c, i) => {
          const [x, y, tilt, dur, delay] = SLOTS[i]
          return (
            <g key={c.label} className="lh__float" style={{ animationDuration: `${dur}s`, animationDelay: `${delay}s` }}>
              <g transform={`translate(${x} ${y}) rotate(${tilt})`}>
                <rect x="-62" y="-34" width="124" height="68" className="lh__card-glow" filter={`url(#${u('soft')})`} />
                <rect x="-62" y="-34" width="124" height="68" fill={`url(#${u('card')})`} className="lh__card" />
                <rect x="-62" y="-34" width="34" height="68" className="lh__card-tab" />
                <g transform="translate(-57 -12)" className="lh__icon">
                  {c.icon}
                </g>
                {/* a long label is fitted to the card rather than overflowing it */}
                <text
                  x="-18"
                  y="-6"
                  className="lh__label"
                  textLength={c.label.length > 8 ? 72 : undefined}
                  lengthAdjust="spacingAndGlyphs"
                >
                  {c.label}
                </text>
                <path d="M-18 8H44M-18 18H28" className="lh__text" />
              </g>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
