/**
 * Flagship programme — the Web3 Corridor, as a left-aligned dark panel.
 *
 * Follows the impact band, in the same frame (hero width, same corner), with
 * its own ground. The copy keeps to the left; the right holds a dotted world
 * map with the corridor's regions pinned on it.
 */

import { useLayoutEffect, useRef } from 'react'
import { gsap, revealRise, reducedMotion } from '../lib/scroll'
import { Go } from './service/ServiceBlocks'
import { REGIONS_LINE } from '../data/facts'

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
            pinned and linked (public/images/flagship-map.jpg) */}
        <div className="cb__globe cb__art">
          <img
            src="/images/flagship-map.jpg"
            alt="World map linking the Americas, Europe, Africa, the UAE and India"
            width="1832"
            height="859"
            loading="lazy"
            decoding="async"
          />
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
            <span className="cb__title-line">IBA Global Initiative</span>
          </h2>
          <p className="cb__lede" data-rise>
            A global innovation platform connecting {REGIONS_LINE}, built to
            accelerate technology transfer,
            investment, entrepreneurship and ecosystem collaboration across regions.
          </p>
          <Go className="ib__cta" href="/corridor#country-corridors" data-rise>
            Explore Web3 Corridor
          </Go>
        </div>
      </div>
    </section>
  )
}
