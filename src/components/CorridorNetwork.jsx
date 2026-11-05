/**
 * The Web3 Corridor's network map, made live (by request): the client's
 * glowing world map (public/images/corridor-network-map.webp) with an SVG
 * drawn over it in the image's own pixels (1260 × 640) — each region's pin
 * pulses, light runs out of India along a route to every other region, and the whole
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

/* the routes, all flowing out of India (content review, 11-05: the
   corridor's outflow from India to the rest of the world). Each path starts
   at India, so the light that runs along it travels outward. */
const ROUTES = [
  { id: 'in-uae', d: 'M898 196 Q852 150 803 176', dur: 2.2 },
  { id: 'in-eu', d: 'M898 196 Q770 40 622 128', dur: 3.4 },
  { id: 'in-af', d: 'M898 196 Q805 250 674 262', dur: 2.8 },
  { id: 'in-am', d: 'M898 196 Q640 -40 376 296', dur: 4.6, dashed: true },
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
            <g key={k} transform={`translate(${x} ${y})`} className={k === 'india' ? 'cnm__pin--source' : undefined}>
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
