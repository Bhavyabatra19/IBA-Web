/**
 * The Web3 Corridor hero's graphic: a dark glossy globe with silver land,
 * the corridor's five regions pinned at their real coordinates, and the
 * corridor routes arcing between them in IBA Red, with light travelling
 * along each — the UAE as the hub, as the corridor copy describes it.
 *
 * Land is Natural Earth (data/land-110m.json) in the same orthographic
 * projection as the other globes, turned so all five regions face the
 * viewer. The routes are great circles lifted off the surface. Original
 * SVG artwork. Motion (CSS, brandbook.css .cx): light runs along the
 * routes, the pins pulse, a dot circles the orbit ring. Reduced motion:
 * still.
 */

import { useMemo } from 'react'
import LAND from '../data/land-110m.json'

const CX = 300
const CY = 300
const R = 205
/* the view: centred between the Americas and India, tilted to show the north */
const LON0 = 14
const TILT = (16 * Math.PI) / 180
const D = Math.PI / 180

/** lat/lon (degrees) at radius k (1 = the surface) → screen x, y and depth z */
function project(lat, lon, k = 1) {
  const la = lat * D
  const dl = (lon - LON0) * D
  const cl = Math.cos(la)
  const x = cl * Math.sin(dl)
  const y = Math.cos(TILT) * Math.sin(la) - Math.sin(TILT) * cl * Math.cos(dl)
  const z = Math.sin(TILT) * Math.sin(la) + Math.cos(TILT) * cl * Math.cos(dl)
  return [CX + x * R * k, CY - y * R * k, z]
}

function landPath() {
  let d = ''
  for (const ring of LAND) {
    let any = false
    let seg = ''
    ring.forEach(([lon, lat], i) => {
      let [x, y, z] = project(lat, lon)
      if (z > 0) any = true
      else {
        // the far side pulled to the horizon, so a shape crossing it closes cleanly
        const dx = x - CX
        const dy = y - CY
        const m = Math.hypot(dx, dy) || 1
        x = CX + (dx / m) * R
        y = CY + (dy / m) * R
      }
      seg += `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`
    })
    if (any) d += seg + 'Z'
  }
  return d
}

/* the five regions — the same places as data/presence.json */
const PLACES = {
  INDIA: { lat: 22, lon: 79, dx: 14, dy: 18, anchor: 'start' },
  UAE: { lat: 24, lon: 54, dx: 12, dy: -14, anchor: 'start' },
  AFRICA: { lat: 0, lon: 24, dx: 14, dy: 22, anchor: 'start' },
  EUROPE: { lat: 46, lon: 6, dx: -14, dy: -12, anchor: 'end' },
  AMERICAS: { lat: -6, lon: -54, dx: -14, dy: 20, anchor: 'end' },
}

/* the routes: the UAE as the hub, and the India–Europe–Americas leg */
const ROUTES = [
  ['UAE', 'INDIA'],
  ['UAE', 'AFRICA'],
  ['UAE', 'EUROPE'],
  ['INDIA', 'EUROPE'],
  ['EUROPE', 'AMERICAS'],
]

/** a great-circle route between two places, lifted off the globe mid-way */
function routePath(a, b) {
  const v = ({ lat, lon }) => [Math.cos(lat * D) * Math.cos(lon * D), Math.cos(lat * D) * Math.sin(lon * D), Math.sin(lat * D)]
  const p = v(a)
  const q = v(b)
  const omega = Math.acos(Math.min(1, p[0] * q[0] + p[1] * q[1] + p[2] * q[2]))
  const lift = 0.1 + omega * 0.12
  let d = ''
  for (let i = 0; i <= 40; i++) {
    const t = i / 40
    const s1 = Math.sin((1 - t) * omega) / Math.sin(omega)
    const s2 = Math.sin(t * omega) / Math.sin(omega)
    const w = [s1 * p[0] + s2 * q[0], s1 * p[1] + s2 * q[1], s1 * p[2] + s2 * q[2]]
    const lat = Math.asin(w[2]) / D
    const lon = Math.atan2(w[1], w[0]) / D
    const [x, y] = project(lat, lon, 1 + lift * Math.sin(Math.PI * t))
    d += `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`
  }
  return d
}

export default function CorridorHolo() {
  const land = useMemo(landPath, [])
  const routes = useMemo(() => ROUTES.map(([a, b]) => ({ key: a + b, d: routePath(PLACES[a], PLACES[b]) })), [])

  return (
    <div className="lh cx" aria-hidden="true">
      <svg viewBox="40 40 520 520">
        <defs>
          <radialGradient id="cx-sphere" cx="36%" cy="30%" r="78%">
            <stop offset="0" stopColor="#3a3a3f" />
            <stop offset="0.55" stopColor="#151517" />
            <stop offset="1" stopColor="#050505" />
          </radialGradient>
          <linearGradient id="cx-land" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f4f4f6" />
            <stop offset="0.6" stopColor="#a9a9ae" />
            <stop offset="1" stopColor="#5c5c61" />
          </linearGradient>
          <radialGradient id="cx-gloss" cx="32%" cy="22%" r="45%">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.2" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="cx-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0.62" stopColor="#d71920" stopOpacity="0" />
            <stop offset="0.72" stopColor="#d71920" stopOpacity="0.45" />
            <stop offset="1" stopColor="#d71920" stopOpacity="0" />
          </radialGradient>
          <clipPath id="cx-clip">
            <circle cx={CX} cy={CY} r={R} />
          </clipPath>
          <filter id="cx-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" />
          </filter>
        </defs>

        {/* a red halo round the rim */}
        <circle cx={CX} cy={CY} r={R * 1.38} fill="url(#cx-halo)" className="cx__halo" />

        {/* the back half of the orbit ring */}
        <g transform={`rotate(-14 ${CX} ${CY})`}>
          <path d={`M${CX - 268} ${CY}A268 66 0 0 1 ${CX + 268} ${CY}`} className="cx__orbit cx__orbit--back" />
        </g>

        {/* the globe */}
        <circle cx={CX} cy={CY} r={R} fill="url(#cx-sphere)" />
        <path d={land} fill="url(#cx-land)" opacity="0.9" clipPath="url(#cx-clip)" />
        <circle cx={CX} cy={CY} r={R} fill="url(#cx-gloss)" />
        <circle cx={CX} cy={CY} r={R} className="cx__rim" />

        {/* the routes: a glow, the line, and light running along it */}
        {routes.map((r, i) => (
          <g key={r.key}>
            <path d={r.d} className="cx__route-glow" filter="url(#cx-soft)" />
            <path d={r.d} className="cx__route" />
            <path d={r.d} pathLength="100" className="cx__run" style={{ animationDelay: `${-i * 0.7}s` }} />
          </g>
        ))}

        {/* the pins and their labels */}
        {Object.entries(PLACES).map(([name, p], i) => {
          const [x, y] = project(p.lat, p.lon)
          const hub = name === 'UAE'
          return (
            <g key={name} className={hub ? 'cx__pin cx__pin--hub' : 'cx__pin'}>
              <circle cx={x} cy={y} r={hub ? 16 : 11} className="cx__pulse" style={{ animationDelay: `${-i * 0.5}s` }} />
              <circle cx={x} cy={y} r={hub ? 7 : 5} className="cx__dot" />
              <text x={x + p.dx} y={y + p.dy} textAnchor={p.anchor} className="cx__label">
                {name}
              </text>
            </g>
          )
        })}

        {/* the front half of the orbit ring, with a dot circling it */}
        <g transform={`rotate(-14 ${CX} ${CY})`}>
          <path id="cx-orbit" d={`M${CX + 268} ${CY}A268 66 0 0 1 ${CX - 268} ${CY}A268 66 0 0 1 ${CX + 268} ${CY}`} className="cx__orbit-path" />
          <path d={`M${CX + 268} ${CY}A268 66 0 0 1 ${CX - 268} ${CY}`} className="cx__orbit" />
          <circle r="5" className="cx__orbit-dot">
            <animateMotion dur="12s" repeatCount="indefinite">
              <mpath href="#cx-orbit" />
            </animateMotion>
          </circle>
        </g>
      </svg>
    </div>
  )
}
