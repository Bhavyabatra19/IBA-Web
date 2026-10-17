/**
 * 2.4 — Impact band. Dark.
 *
 * A 2×2 of counted stats beside one panel that holds the stated portfolio.
 *
 * That split is the section's whole argument, and the layout now carries it
 * rather than a comment: the four on the left are a running tally still
 * growing, so they count up as they arrive; the four in the panel are settled
 * portfolio facts, so they are printed. Animating the second set upward would
 * imply a trajectory the numbers do not claim.
 */

import { useLayoutEffect, useRef } from 'react'
import { gsap, buildCounters, revealLines, revealRise, reducedMotion } from '../lib/scroll'
import { IMPACT_PRIMARY as PRIMARY, IMPACT_SECONDARY as SECONDARY } from '../content'
import ImpactSlab from '../components/ImpactSlab'

export default function Impact() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const el = root.current
    const ctx = gsap.context(() => {
      if (reducedMotion()) return
      buildCounters(el)
      revealLines(el, { trigger: el })
      revealRise(el, { trigger: el })
      /* the drawing animates itself — see components/ImpactSlab */
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="section band band--dark" ref={root} id="impact">
      <div className="wrap">
        <div className="impact__head">
          <p className="eyebrow" data-rise>Impact</p>
          <h2 className="h2 display" data-clip>
            <span className="line">
              <span className="line__inner">Impact,</span>
            </span>
            <span className="line">
              <span className="line__inner">
                <em>Measured</em>
              </span>
            </span>
          </h2>
        </div>

        <div className="impact__grid">
          <div className="impact__stats">
            {PRIMARY.map((s) => (
              <div className="impact__card" key={s.label} data-rise>
                {/* the final value is in the markup, so it is correct before the
                    counter runs — and stays correct if it never does */}
                <span
                  className="impact__k"
                  data-count={s.to}
                  data-prefix={s.prefix}
                  data-suffix={s.suffix}
                >
                  {s.prefix}
                  {s.to}
                  {s.suffix}
                </span>
                <span className="impact__v">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="impact__panel" data-rise>
            <div className="impact__panelCopy">
              <p className="eyebrow">Portfolio</p>
              <ul className="impact__facts">
                {SECONDARY.map((s) => (
                  <li key={s.k}>
                    <strong>{s.k}</strong>
                    <span>{s.v}</span>
                  </li>
                ))}
              </ul>
              <a className="btn btn--primary btn--sm" href="#connect" data-enquiry="">
                See Our Work
              </a>
            </div>
            <ImpactSlab />
          </div>
        </div>
      </div>
    </section>
  )
}
