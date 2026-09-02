/**
 * 2.2 — Credibility bar. Dark band.
 *
 * Closes the hero's dark block rather than opening a band of its own: it is a
 * bar, not a section, and giving it its own ground would break the page's
 * dark / light alternation for four numbers.
 */

import { useLayoutEffect, useRef } from 'react'
import { gsap, buildCounters, revealRise, reducedMotion } from '../lib/scroll'
import { CRED_STATS as STATS } from '../content'

export default function Credibility() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const el = root.current
    const ctx = gsap.context(() => {
      if (reducedMotion()) return
      buildCounters(el)
      revealRise(el, { trigger: el, start: 'top 88%', stagger: 0.08 })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="cred band band--dark" ref={root} aria-label="IBA by the numbers">
      <div className="wrap">
        <div className="cred__grid">
          {STATS.map((s) => (
            <div className="cred__item" key={s.label} data-rise>
              {/* label above the figure: the reader is told what is being
                  counted before they are given the count */}
              <span className="cred__v">{s.label}</span>
              {/* the final value is in the markup, so it is correct before the
                  counter ever runs — and stays correct if it never does */}
              <span className="cred__k" data-count={s.to} data-suffix={s.suffix}>
                {s.to}
                {s.suffix}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
