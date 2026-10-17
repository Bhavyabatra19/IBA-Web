/**
 * Built by experts, across the ecosystem — partner chips in two marquees that
 * run against each other, as frosted glass cards on a dark red band lit by
 * sweeping arcs (after the client's reference). After the presence globe.
 *
 * The partners come from data/partners.js, shared with the Ecosystem page;
 * the marquee shows only those with a logo.
 *
 * Each track holds its list twice and translates -50%, which is what makes
 * the loop seamless; the second copy is hidden from assistive tech, which
 * reads the list once.
 */

import { useLayoutEffect, useRef } from 'react'
import { gsap, revealRise, reducedMotion } from '../lib/scroll'
import { Go } from './service/ServiceBlocks'
import { PARTNERS } from '../data/partners'
import { FACTS } from '../data/facts'

/* the partners with a logo, from the shared list, in two rows that run
   against each other */
const WITH_LOGO = PARTNERS.filter((p) => p.logo)
const half = Math.ceil(WITH_LOGO.length / 2)
const ROWS = [WITH_LOGO.slice(0, half), WITH_LOGO.slice(half)]

function Chip({ p, hidden }) {
  return (
    <li className="eco__chip" aria-hidden={hidden || undefined}>
      {p.logo ? (
        <img className="eco__logo" src={p.logo} alt="" loading="lazy" decoding="async" />
      ) : (
        <span className={`eco__mono eco__mono--${p.tone}`} aria-hidden="true">
          {p.mono}
        </span>
      )}
      <span className="eco__name">{p.name}</span>
    </li>
  )
}

export default function EcosystemMarquee() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const el = root.current
    const ctx = gsap.context(() => {
      if (reducedMotion()) return
      revealRise(el, { trigger: el, start: 'top 82%', stagger: 0.1 })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="eco band band--light band--own" ref={root} aria-labelledby="eco-title">
      <div className="eco__inner">
        {/* the backdrop: dark red, with sweeping arcs of light (after the
            client's reference), behind glass partner cards */}
        <svg className="eco__swoosh" viewBox="0 0 1600 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            {/* deep red at the top centre, near-black at the edges (sampled
                from the reference: ~#450a0c at the top, #040406 in the corners) */}
            <radialGradient id="eco-glow" cx="58%" cy="8%" r="52%">
              <stop offset="0" stopColor="#5a0b0e" />
              <stop offset="0.6" stopColor="#1c0405" />
              <stop offset="1" stopColor="#060506" />
            </radialGradient>
            {/* the big glass spheres: red inside, darker toward the bottom */}
            <radialGradient id="eco-sphere" cx="45%" cy="8%" r="80%">
              <stop offset="0" stopColor="#d71920" stopOpacity="0.62" />
              <stop offset="0.4" stopColor="#6a0a0e" stopOpacity="0.4" />
              <stop offset="1" stopColor="#120304" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="eco-floor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#060506" stopOpacity="0" />
              <stop offset="0.4" stopColor="#060506" stopOpacity="0.9" />
              <stop offset="1" stopColor="#030303" />
            </linearGradient>
            {/* the edges fall away to near-black, so the red holds the centre */}
            <radialGradient id="eco-vignette" cx="56%" cy="30%" r="72%">
              <stop offset="0.35" stopColor="#040304" stopOpacity="0" />
              <stop offset="0.8" stopColor="#040304" stopOpacity="0.75" />
              <stop offset="1" stopColor="#040304" stopOpacity="0.95" />
            </radialGradient>
            <linearGradient id="eco-left" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#040304" stopOpacity="0.85" />
              <stop offset="0.28" stopColor="#040304" stopOpacity="0" />
            </linearGradient>
            <filter id="eco-blur" filterUnits="userSpaceOnUse" x="-300" y="-300" width="2200" height="1300">
              <feGaussianBlur stdDeviation="7" />
            </filter>
            <filter id="eco-blur-wide" filterUnits="userSpaceOnUse" x="-300" y="-300" width="2200" height="1300">
              <feGaussianBlur stdDeviation="50" />
            </filter>
          </defs>
          <rect width="1600" height="700" fill="url(#eco-glow)" />

          {/* the left sphere, rising to the top centre, lit along its rim */}
          <circle cx="560" cy="900" r="880" fill="url(#eco-sphere)" />
          <path d="M-320 900A880 880 0 0 1 560 20" className="eco__arc eco__arc--glow" filter="url(#eco-blur)" />
          <path d="M-320 900A880 880 0 0 1 560 20" className="eco__arc eco__arc--rim" />
          {/* the right sphere, its rim lifting toward the top right */}
          <circle cx="1560" cy="980" r="700" fill="url(#eco-sphere)" />
          <path d="M860 980A700 700 0 0 1 1560 280" className="eco__arc eco__arc--glow" filter="url(#eco-blur)" />
          <path d="M860 980A700 700 0 0 1 1560 280" className="eco__arc eco__arc--rim" />

          {/* vignette: dark edges, darker still on the left */}
          <rect width="1600" height="700" fill="url(#eco-vignette)" />
          <rect width="1600" height="700" fill="url(#eco-left)" />

          {/* the bright shaft of light, top right */}
          <path d="M1120 -60L1700 260" className="eco__arc eco__arc--beam" filter="url(#eco-blur-wide)" />
          <path d="M1300 -40L1680 170" className="eco__arc eco__arc--streak" filter="url(#eco-blur)" />
          <path d="M1330 -40L1690 160" className="eco__arc eco__arc--streak-core" />

          {/* thin light trails sweeping across the lower half */}
          <path d="M-20 560C220 520 420 500 620 520" className="eco__arc eco__arc--trail-glow" filter="url(#eco-blur)" />
          <path d="M-20 560C220 520 420 500 620 520" className="eco__arc eco__arc--trail" />
          <path d="M980 560C1220 520 1420 470 1640 420" className="eco__arc eco__arc--trail-glow" filter="url(#eco-blur)" />
          <path d="M980 560C1220 520 1420 470 1640 420" className="eco__arc eco__arc--trail" />
          <path d="M-20 260C120 230 260 215 420 215" className="eco__arc eco__arc--trail eco__arc--trail-faint" />
          <path d="M1240 200C1380 175 1500 165 1640 170" className="eco__arc eco__arc--trail eco__arc--trail-faint" />

          {/* gloss: a soft white highlight high on each sphere */}
          <path d="M180 230C300 120 440 70 560 60" className="eco__arc eco__arc--gloss" filter="url(#eco-blur)" />
          <path d="M1180 420C1300 340 1420 300 1540 290" className="eco__arc eco__arc--gloss" filter="url(#eco-blur)" />

          {/* the dark reflective floor */}
          <rect y="520" width="1600" height="180" fill="url(#eco-floor)" />
          <path d="M0 655C500 640 1100 640 1600 655" className="eco__arc eco__arc--floor" filter="url(#eco-blur)" />
          <path d="M80 655C500 642 1100 642 1520 655" className="eco__arc eco__arc--floor-line" />
          {/* red light pooling on the floor under the cards */}
          <ellipse cx="560" cy="600" rx="420" ry="26" className="eco__pool" filter="url(#eco-blur-wide)" />
          <ellipse cx="1180" cy="610" rx="340" ry="22" className="eco__pool" filter="url(#eco-blur-wide)" />
        </svg>

        <header className="eco__head">
          <p className="hero__kicker pg__eyebrow" data-rise>
            <svg className="hero__kicker-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2.5 20.5 7v10L12 21.5 3.5 17V7L12 2.5Z" />
              <path d="M3.5 7 12 11.5 20.5 7M12 11.5v10" />
            </svg>
            Our Ecosystem
          </p>
          <h2 className="eco__title" id="eco-title" data-rise>
            Built by Experts, Across the Ecosystem
          </h2>
          <p className="eco__lede" data-rise>
            {FACTS.partners.text} ecosystem partners · {FACTS.affiliations.text} global affiliations · products, councils
            and communities built with our network.
          </p>
        </header>

        <div className="eco__rows" data-rise>
          {ROWS.map((row, r) => (
            <div className={`eco__marquee${r ? ' eco__marquee--rev' : ''}`} key={r}>
              <ul className="eco__track" aria-label={r ? undefined : 'Ecosystem partners'} aria-hidden={r ? true : undefined}>
                {[...row, ...row].map((p, i) => (
                  <Chip p={p} hidden={r > 0 || i >= row.length} key={`${p.name}-${i}`} />
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Go className="eco__cta" href="/ecosystem#organisations" data-rise>
          Explore the Ecosystem <span aria-hidden="true">→</span>
        </Go>
      </div>
    </section>
  )
}
