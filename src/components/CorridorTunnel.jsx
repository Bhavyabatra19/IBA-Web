/**
 * The Web3 Corridor hero's graphic: the corridor itself. A tunnel of
 * IBA-red gateways receding to a bright point, flowing toward the viewer so
 * it reads as travelling through; a floor of lines converging on the same
 * point, with light running along them; and the corridor's five regions
 * floating as labels around the entrance.
 *
 * Original SVG artwork, distinct from the other inner heroes. Motion (CSS,
 * brandbook.css .ct): each gate grows from the far point and fades past
 * the viewer on a staggered clock; streaks run the floor lines; the labels
 * bob. Reduced motion: the gates stand still at evenly spaced depths.
 */

import { REGIONS } from '../data/facts'

/* the vanishing point, and the front gate's size */
const VX = 300
const VY = 250
const GW = 400
const GH = 300
const GATES = 7

/* floor lines: from the front edge to the vanishing point */
const FLOOR = Array.from({ length: 9 }, (_, i) => -360 + i * 90)

/* the region labels, placed round the corridor mouth: [x, y, side] */
const SPOTS = [
  [96, 150, 'left'],
  [504, 132, 'right'],
  [70, 330, 'left'],
  [530, 312, 'right'],
  [300, 520, 'center'],
]

/* "the UAE" → "UAE", "the Americas" → "AMERICAS" */
const label = (r) => r.replace(/^the /, '').toUpperCase()

export default function CorridorTunnel() {
  return (
    <div className="lh ct" aria-hidden="true">
      <svg viewBox="20 40 560 520">
        <defs>
          <radialGradient id="ct-core" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="0.25" stopColor="#ff6a6e" stopOpacity="0.7" />
            <stop offset="1" stopColor="#d71920" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ct-floor" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="0.3" stopColor="#ffffff" stopOpacity="0.35" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <filter id="ct-soft" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        {/* the light at the far end */}
        <circle cx={VX} cy={VY} r="150" fill="url(#ct-core)" className="ct__core" />

        {/* the floor, converging on the far point, with light running in */}
        <g>
          {FLOOR.map((x0, i) => (
            <g key={i}>
              <path d={`M${VX + x0} 560L${VX} ${VY}`} stroke="url(#ct-floor)" className="ct__floor" />
              {i % 2 === 0 && (
                <path
                  d={`M${VX} ${VY}L${VX + x0} 560`}
                  pathLength="100"
                  className="ct__streak"
                  style={{ animationDelay: `${-i * 0.37}s` }}
                />
              )}
            </g>
          ))}
        </g>

        {/* the gates: each flows from the far point toward the viewer */}
        {Array.from({ length: GATES }, (_, i) => (
          <g
            key={i}
            className="ct__gate"
            style={{ animationDelay: `${(-i * 6) / GATES}s`, '--s': (i + 1) / GATES }}
          >
            <rect x={VX - GW / 2} y={VY - GH / 2 + 40} width={GW} height={GH} className="ct__frame-glow" filter="url(#ct-soft)" />
            <rect x={VX - GW / 2} y={VY - GH / 2 + 40} width={GW} height={GH} className="ct__frame" />
          </g>
        ))}

        {/* the regions, around the mouth of the corridor */}
        {REGIONS.map((r, i) => {
          const [x, y, side] = SPOTS[i]
          const text = label(r)
          const w = 22 + text.length * 10.5
          const bx = side === 'left' ? x - w : side === 'right' ? x : x - w / 2
          return (
            <g key={r} className="ct__chip" style={{ animationDelay: `${-i * 0.9}s` }}>
              <rect x={bx} y={y - 16} width={w} height="32" className="ct__chip-box" />
              <rect x={bx} y={y - 16} width="4" height="32" className="ct__chip-bar" />
              <text x={bx + 14} y={y + 5} className="ct__chip-text">
                {text}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
