/**
 * Flagship programme, the Web3 Corridor, as a left-aligned dark panel.
 *
 * Follows the impact band, in the same frame (hero width, same corner), with
 * its own ground. The copy keeps to the left; the right holds a dotted world
 * map with the corridor's regions pinned on it.
 */

import { useLayoutEffect, useRef } from 'react'
import { gsap, revealRise, reducedMotion } from '../lib/scroll'
import { Go } from './service/ServiceBlocks'
import { REGIONS_LINE } from '../data/facts'
import IndiaPulse from '../components/IndiaPulse'

export default function CorridorBand() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const el = root.current
    const ctx = gsap.context(() => {
      if (reducedMotion()) return
      revealRise(el, { trigger: el, start: 'top 82%', stagger: 0.09 })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="cb band band--light band--own" ref={root} aria-labelledby="cb-title">
      <div className="cb__panel">
        {/* the corridor's reach: the supplied map artwork, the five regions
            pinned on glass labels and linked (public/images/flagship-map-glass.jpg;
            the earlier artwork, flagship-map.jpg, is kept) */}
        <div className="cb__globe cb__art">
          <img
            src="/images/flagship-map-glass.jpg"
            alt="World map linking the Americas, Europe, Africa, the UAE and India"
            width="1832"
            height="859"
            loading="lazy"
            decoding="async"
          />
          {/* India's cube, highlighted with a pin (by request); the map
              names India itself, so no card */}
          <IndiaPulse x={72.3} y={43.6} small />
        </div>

        <div className="cb__copy">
          <p className="hero__kicker" data-rise>
            <svg className="hero__kicker-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2.5 20.5 7v10L12 21.5 3.5 17V7L12 2.5Z" />
              <path d="M3.5 7 12 11.5 20.5 7M12 11.5v10" />
            </svg>
            Flagship Programme
          </p>
          <h2 className="cb__title" id="cb-title" data-rise>
            Web3 Corridor:{' '}
            {/* always its own, second line (by request) */}
            <span className="cb__titleLine">IBA Global Initiative</span>
          </h2>
          <p className="cb__lede" data-rise>
            A global innovation platform connecting {REGIONS_LINE}, built to
            accelerate technology transfer,
            investment, entrepreneurship and ecosystem collaboration across regions.
          </p>
          <Go className="ib__cta" href="/corridor#about" data-rise>
            Explore Web3 Corridor
          </Go>
        </div>
      </div>
    </section>
  )
}
