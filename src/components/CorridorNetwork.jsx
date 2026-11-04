/**
 * The Web3 Corridor's network map, made live (by request): the client's
 * glowing world map (public/images/corridor-network-map.webp) with an SVG
 * drawn over it in the image's own pixels (1260 × 640) — each region's pin
 * pulses, light runs along every route between the regions, and the whole
 * map breathes slowly. Reduced motion: the map and routes, still.
 * Styles in brandbook.css (.cnm).
 */

/* the pins, where the map draws them */
const PINS = {
  americas: [373, 307],
  europe: [619, 143],
  uae: [800, 192],
  india: [898, 208],
  africa: [672, 272],
}

/* the routes, as curves between the pins (the map's own arcs, traced) */
const ROUTES = [
  { id: 'eu-uae', d: 'M619 124 Q711 106 803 172', dur: 3.2 },
  { id: 'uae-in', d: 'M803 172 Q852 168 902 187', dur: 2.2 },
  { id: 'eu-af', d: 'M619 124 Q662 190 671 251', dur: 2.8 },
  { id: 'af-uae', d: 'M671 251 Q725 196 803 172', dur: 3 },
  { id: 'am-eu', d: 'M373 290 Q470 170 619 124', dur: 4.2, dashed: true },
]

export default function CorridorNetwork() {
  return (
    <figure className="cnm" data-rise>
      <div className="cnm__stage">
        <img
          className="cnm__map"
          src="/images/corridor-network-map.webp"
          alt="World map linking the Americas, Europe, Africa, the UAE and India"
          width="1260"
          height="640"
          loading="lazy"
          decoding="async"
        />
        <svg className="cnm__live" viewBox="0 0 1260 640" aria-hidden="true" focusable="false">
          <defs>
            <radialGradient id="cnm-dot">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="0.45" stopColor="#ff6a6e" />
              <stop offset="1" stopColor="#ff2a31" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* the routes, lit, with a light running along each */}
          {ROUTES.map((r, i) => (
            <g key={r.id}>
              <path id={`cnm-${r.id}`} d={r.d} className={`cnm__route${r.dashed ? ' cnm__route--dash' : ''}`} />
              <circle r="9" fill="url(#cnm-dot)" className="cnm__spark">
                <animateMotion dur={`${r.dur}s`} begin={`${-i * 0.7}s`} repeatCount="indefinite" rotate="auto">
                  <mpath href={`#cnm-${r.id}`} />
                </animateMotion>
              </circle>
            </g>
          ))}

          {/* each region's pin, pulsing outward */}
          {Object.entries(PINS).map(([k, [x, y]], i) => (
            <g key={k} transform={`translate(${x} ${y})`}>
              <circle r="14" className="cnm__ring" style={{ animationDelay: `${i * 0.5}s` }} />
              <circle r="14" className="cnm__ring" style={{ animationDelay: `${i * 0.5 + 1.2}s` }} />
              <circle r="5" className="cnm__core" />
            </g>
          ))}
        </svg>
        {/* a slow sweep of light across the map */}
        <span className="cnm__sweep" aria-hidden="true" />
      </div>
    </figure>
  )
}
