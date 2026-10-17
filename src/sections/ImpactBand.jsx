/**
 * Impact, measured — the headline figures as one sentence. Dark panel.
 *
 * Sits between the counters and the Web3 Corridor. The same width and
 * corner as the hero panel, so the page opens and then restates itself in
 * the same frame. The ground is a dot grid under two red glows: pattern for
 * texture, gradient for light, both faded out before the panel's edges.
 */

import { useLayoutEffect, useRef } from 'react'
import { gsap, revealRise, reducedMotion } from '../lib/scroll'
import { Go } from './service/ServiceBlocks'
import { FACTS } from '../data/facts'

export default function ImpactBand() {
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
    <section className="ib band band--light band--own" ref={root} aria-labelledby="ib-title">
      <div className="ib__panel">
        <div className="ib__bg" aria-hidden="true">
          <span className="ib__glow" />
          <span className="ib__dots" />
        </div>

        <div className="ib__copy">
          {/* the hero's eyebrow pill, reused as-is (.hero__kicker) */}
          <p className="hero__kicker" data-rise>
            <svg className="hero__kicker-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2.5 20.5 7v10L12 21.5 3.5 17V7L12 2.5Z" />
              <path d="M3.5 7 12 11.5 20.5 7M12 11.5v10" />
            </svg>
            Impact, Measured, Executed
          </p>
          <h2 className="ib__title" id="ib-title" data-rise>
            {FACTS.tokenized.text} Tokenized Assets. {FACTS.countries.text}&nbsp;Countries.{' '}
            <span className="ib__nowrap">{FACTS.partners.text} Ecosystem Partners.</span>
          </h2>
          <p className="ib__lede" data-rise>
            {FACTS.sectors.text} tokenization sectors and a growing global network of ecosystem
            partners across the alliance.
          </p>
          <Go className="ib__cta" href="/about#impact" data-rise>
            See Our Impact
          </Go>
        </div>
      </div>
    </section>
  )
}
