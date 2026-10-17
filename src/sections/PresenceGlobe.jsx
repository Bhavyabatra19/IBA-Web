/**
 * Global presence — the headline, then the world drawn as the curved crown of
 * a globe, with the figures standing on it as pins. Light band.
 *
 * The map is Natural Earth's coastlines in real lon/lat (data/land-110m.json),
 * so nothing here is a picture: every vertex is bent by warp() into the arch,
 * and the pins go through the same warp, which is the only reason they still
 * land on India, the UAE and Spain.
 *
 * The thickness is the land drawn again underneath itself, a little lower
 * each time and paler each time — the extruded look, from one shape — with
 * the layers blurred together so they blend into one soft shadow.
 */

import { useId, useLayoutEffect, useRef } from 'react'
import { gsap, revealRise, reducedMotion } from '../lib/scroll'
import { X, Y } from '../components/WorldMap'
import presence from '../data/presence.json'
/* Natural Earth 1:110m land (public domain), decoded once from the
   world-atlas TopoJSON into [lon, lat] rings at 0.1° — Antarctica and specks
   under 0.6 deg² dropped. Holes (inland seas, lakes) are rings of their own
   and are cut out by the even-odd fill. */
import LAND from '../data/land-110m.json'
import { FACTS } from '../data/facts'

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

/* The figures, each standing on a real market. Stems differ in height so the
   labels never sit in a row; the UAE's sits to the left of its stem, since
   India's is just to its right. */
const PINS = [
  { at: 'Spain', value: FACTS.countries.text, label: 'Countries', stem: 'mid' },
  { at: 'United Arab Emirates', value: FACTS.affiliations.text, label: 'Global Affiliations', stem: 'short', side: 'left' },
  { at: 'India', value: FACTS.members.text, label: 'Global Members', stem: 'tall' },
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
            Global Presence
          </p>
          <h2 className="pg__title" id="pg-title" data-rise>
            Present in {FACTS.countries.text} Countries
          </h2>
          <p className="pg__lede" data-rise>
            IBA operates where policy, capital and code meet, with members,
            advisors, affiliations and active programmes spanning every major
            region, scaling today’s footprint into a single global Web3 Corridor
            network.
          </p>
        </header>

        {/* the supplied map artwork: a glossy red world on white with the
            three headline figures as glass cards. The figures in it match
            data/facts.js; they are repeated as text for screen readers. ⚠ If
            a figure changes, this image must be updated too. */}
        <figure className="pg__art" data-rise>
          <img
            src="/images/presence-map.jpg"
            alt=""
            width="1888"
            height="833"
            loading="lazy"
            decoding="async"
          />
          <figcaption className="sr-only">
            {FACTS.countries.text} countries, {FACTS.affiliations.text} global affiliations,{' '}
            {FACTS.members.text} global members
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
