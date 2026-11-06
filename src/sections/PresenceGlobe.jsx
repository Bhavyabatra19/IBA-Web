/**
 * Global presence, the headline, then the world drawn as the curved crown of
 * a globe, with the figures standing on it as pins. Light band.
 *
 * The map is Natural Earth's coastlines in real lon/lat (data/land-110m.json),
 * so nothing here is a picture: every vertex is bent by warp() into the arch,
 * and the pins go through the same warp, which is the only reason they still
 * land on India, the UAE and Spain.
 *
 * The thickness is the land drawn again underneath itself, a little lower
 * each time and paler each time, the extruded look, from one shape, with
 * the layers blurred together so they blend into one soft shadow.
 */

import { useId, useLayoutEffect, useRef } from 'react'
import { gsap, revealRise, reducedMotion } from '../lib/scroll'
import { X, Y } from '../components/WorldMap'
import presence from '../data/presence.json'
/* Natural Earth 1:110m land (public domain), decoded once from the
   world-atlas TopoJSON into [lon, lat] rings at 0.1°, Antarctica and specks
   under 0.6 deg² dropped. Holes (inland seas, lakes) are rings of their own
   and are cut out by the even-odd fill. */
import LAND from '../data/land-110m.json'
import { Go } from './service/ServiceBlocks'
import IndiaPulse from '../components/IndiaPulse'

/* ------------------------------------------------------------------ */
/* the arch                                                            */
/* ------------------------------------------------------------------ */

/** The drawing's frame, in warped units. */
const FRAME = { x: 0, y: -12, w: 360, h: 168 }
/** How far each layer of the thickness sits below the one above it. */
const STEP = 1.1
const LAYERS = 16

/**
 * Bends the flat map into the crown of a globe.
 *   · across: a sine squeeze, so the land crowds together toward the edges as
 *     it would turning away round a sphere
 *   · down:   the map is flattened (seen from above) and the sides drop away
 *     on a parabola, which is the arch
 */
function warp(lon, lat) {
  const x = X(lon)
  const y = Y(lat)
  const u = (x - 180) / 180 // -1 … 1, left edge to right
  const k = (Math.PI / 2) * 0.9
  return [180 + (180 * Math.sin(u * k)) / Math.sin(k), y * 0.6 + 56 * u * u + 8]
}

const path = (pts) =>
  pts
    .map(([lon, lat], i) => {
      const [x, y] = warp(lon, lat)
      return `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`
    })
    .join('') + 'Z'

const LAND_D = LAND.map(path).join('')

/** A lon/lat as a position in the DOM layer over the drawing. */
const place = (lon, lat) => {
  const [x, y] = warp(lon, lat)
  return {
    left: `${((x - FRAME.x) / FRAME.w) * 100}%`,
    top: `${((y - FRAME.y) / FRAME.h) * 100}%`,
  }
}

const byCountry = Object.fromEntries(presence.countries.map((c) => [c.country, c]))

/* The corridor's five hubs on the map artwork (x, y as % of the image, on
   its glowing points), each with its role in the corridor (content review:
   the map named India alone). cardSm moves a tile on phones, where the map
   is too small for the desktop placement. */
const HUBS = [
  { label: 'Americas', sub: 'Infrastructure', x: 27.5, y: 64.2, card: 'right' },
  { label: 'Europe', sub: 'Standards', x: 51, y: 37.4, card: 'above', cardSm: 'left' },
  { label: 'Africa', sub: 'Utility', x: 57.4, y: 63.2, card: 'right', cardSm: 'below' },
  { label: 'UAE', sub: 'Launchpad', x: 63.6, y: 49, card: 'above' },
  { label: 'India', sub: 'Technical engine', x: 70.4, y: 56.6, card: 'right' },
]

export default function PresenceGlobe() {
  const root = useRef(null)
  const uid = useId().replace(/:/g, '')

  useLayoutEffect(() => {
    const el = root.current
    const ctx = gsap.context(() => {
      if (reducedMotion()) return
      revealRise(el, { trigger: el, start: 'top 82%', stagger: 0.1 })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="pg band band--light band--own" ref={root} aria-labelledby="pg-title">
      <div className="pg__inner">
        <header className="pg__head">
          <p className="hero__kicker pg__eyebrow" data-rise>
            <svg className="hero__kicker-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2.5 20.5 7v10L12 21.5 3.5 17V7L12 2.5Z" />
              <path d="M3.5 7 12 11.5 20.5 7M12 11.5v10" />
            </svg>
            Flagship Programme · Global Presence
          </p>
          <h2 className="pg__title" id="pg-title" data-rise>
            Web3 Corridor: IBA Global Initiative
          </h2>
          <p className="pg__lede" data-rise>
            IBA operates where policy, capital and code meet: India as the
            technical engine, the UAE as the launchpad, Europe for standards,
            Africa for real-world utility and the Americas for infrastructure,
            one global Web3 Corridor network for technology transfer,
            investment, entrepreneurship and ecosystem collaboration.
          </p>
          {/* the section's call to action (by request): join, not explore */}
          <Go className="ib__cta pg__cta" href="/membership" data-rise>
            Join the Alliance
          </Go>
        </header>

        {/* the supplied map artwork, with its three figure cards painted out
            (public/images/presence-map-hubs.jpg; the figures already sit in
            the strip under the hero, content review) and a pin on each of the
            corridor's five hubs, with what happens there */}
        <figure className="pg__art" data-rise>
          <img
            src="/images/presence-map-hubs.jpg"
            alt=""
            width="1888"
            height="833"
            loading="lazy"
            decoding="async"
          />
          {HUBS.map((h) => (
            <IndiaPulse key={h.label} x={h.x} y={h.y} label={h.label} sub={h.sub} card={h.card} cardSm={h.cardSm} small />
          ))}
          <figcaption className="sr-only">
            IBA's hubs: {HUBS.map((h) => `${h.label}, ${h.sub}`).join('; ')}.
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
