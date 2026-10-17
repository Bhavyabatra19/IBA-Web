/**
 * The Flagship Programme graphic — a grey globe, with red only on the moving dots, turning slowly inside its
 * orbits, after the reference the client supplied.
 *
 * The land is the same Natural Earth data the presence map uses
 * (data/land-110m.json), drawn with an orthographic projection each frame
 * as the globe turns. Points on the far side are pulled to the horizon, which
 * closes every visible landmass cleanly at the globe's edge.
 *
 * The orbits are plain ellipses; the dots ride them with SVG animateMotion,
 * so they cost nothing in JS. Reduced motion: drawn once, still.
 */

import { useEffect, useRef } from 'react'
import LAND from '../data/land-110m.json'
import { reducedMotion, whileOnScreen } from '../lib/scroll'

const R = 150 // globe radius
const C = 240 // centre of the 480 frame
const TILT = (18 * Math.PI) / 180 // the globe leans toward the viewer
const SPEED = 6 // degrees of longitude per second

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
      const front = sinT * Math.sin(lat) + cosT * cl * Math.cos(dl)
      if (front > 0) any = true
      else {
        // behind the globe: pull the point onto the horizon
        const m = Math.hypot(x, y) || 1
        x /= m
        y /= m
      }
      seg += `${i ? 'L' : 'M'}${(C + x * R).toFixed(1)} ${(C - y * R).toFixed(1)}`
    }
    if (any) d += seg + 'Z'
  }
  return d
}

/* the orbits: [rx, ry, rotation, dashed, dot duration] */
const ORBITS = [
  [205, 70, -18, false, 9],
  [190, 62, 24, true, 12],
  [100, 210, 32, false, 11],
  [165, 175, -40, true, 14],
]

const ellipse = (rx, ry) =>
  `M${C - rx} ${C}a${rx} ${ry} 0 1 0 ${rx * 2} 0a${rx} ${ry} 0 1 0 ${-rx * 2} 0`

export default function CorridorGlobe({ className = '' }) {
  const svg = useRef(null)
  const land = useRef(null)

  useEffect(() => {
    const el = svg.current
    const path = land.current
    if (!el || !path) return
    let lon = 20
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
    <svg ref={svg} className={`cg ${className}`} viewBox="0 0 480 480" aria-hidden="true">
      <defs>
        {/* the sphere: white, lit from the top-left, falling to the brand grey */}
        <radialGradient id="cg-sphere" cx="38%" cy="32%" r="75%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.55" stopColor="#f5f3f2" />
          <stop offset="1" stopColor="#e2dfdd" />
        </radialGradient>
        <radialGradient id="cg-shadow">
          <stop offset="0" stopColor="#111111" stopOpacity="0.16" />
          <stop offset="1" stopColor="#111111" stopOpacity="0" />
        </radialGradient>
        <clipPath id="cg-clip">
          <circle cx={C} cy={C} r={R} />
        </clipPath>
      </defs>

      {/* contact shadow */}
      <ellipse cx={C} cy={C + R + 48} rx={R * 0.75} ry="14" fill="url(#cg-shadow)" />

      {/* the back halves of the orbits sit behind the globe */}
      <g className="cg__orbits cg__orbits--back">
        {ORBITS.map(([rx, ry, rot, dashed], i) => (
          <path
            key={i}
            d={ellipse(rx, ry)}
            transform={`rotate(${rot} ${C} ${C})`}
            className={dashed ? 'cg__orbit cg__orbit--dash' : 'cg__orbit'}
          />
        ))}
      </g>

      {/* the globe */}
      <circle cx={C} cy={C} r={R} fill="url(#cg-sphere)" />
      <path ref={land} className="cg__land" clipPath="url(#cg-clip)" />
      <circle cx={C} cy={C} r={R} className="cg__rim" />

      {/* the orbits again, faintly, over the globe, with their riders */}
      <g className="cg__orbits">
        {ORBITS.map(([rx, ry, rot, dashed, dur], i) => (
          <g key={i} transform={`rotate(${rot} ${C} ${C})`}>
            <path
              id={`cg-o${i}`}
              d={ellipse(rx, ry)}
              className={dashed ? 'cg__orbit cg__orbit--dash cg__orbit--front' : 'cg__orbit cg__orbit--front'}
            />
            <circle r={i % 2 ? 4 : 6} className="cg__dot">
              <animateMotion dur={`${dur}s`} repeatCount="indefinite" rotate="auto">
                <mpath href={`#cg-o${i}`} />
              </animateMotion>
            </circle>
          </g>
        ))}
      </g>

      {/* loose satellites */}
      <circle cx="96" cy="190" r="5" className="cg__dot cg__dot--soft" />
      <circle cx="402" cy="128" r="4" className="cg__dot cg__dot--soft" />
      <circle cx="132" cy="380" r="6" className="cg__dot cg__dot--soft" />
      <circle cx="420" cy="342" r="4" className="cg__dot cg__dot--soft" />
    </svg>
  )
}
