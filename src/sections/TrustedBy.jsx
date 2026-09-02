/**
 * 2.5 — Trusted By. Light band.
 *
 * ⚠ THESE ARE TYPESET WORDMARKS, NOT OFFICIAL LOGOS.
 * Each name renders as text. Before this goes live: confirm every organisation
 * has agreed to be listed, then swap each item for a licensed asset. Do not
 * substitute scraped logo files — that is a trademark problem, not a design one.
 *
 * The claim and the line that qualifies it share the top row, and the two
 * marquees run under them. Which row is ministries and which is industry is
 * carried by the rows' aria-labels alone — it is deliberately not printed, so
 * the two strips read as one wall of names rather than as two lists.
 *
 * The track holds the list twice and translates -50%, which is what makes the
 * loop seamless; duplicating in markup rather than cloning in JS keeps it
 * working with no script at all. The spacing between items is a margin on the
 * items and not a gap on the track, and that is load-bearing — see .marquee__row.
 */

import { useLayoutEffect, useRef } from 'react'
import { gsap, revealLines, revealRise, reducedMotion } from '../lib/scroll'

const GROUPS = [
  {
    key: 'gov',
    label: 'Government & Institutions',
    items: [
      'Ministry of Electronics & IT',
      'NITI Aayog',
      'Ministry of Commerce',
      'State Blockchain Missions',
      'Public Sector Undertakings',
      'National Informatics Centre',
    ],
  },
  {
    key: 'ent',
    label: 'Enterprise & Web3',
    items: [
      'Global Banking',
      'Supply Chain & Logistics',
      'Healthcare Systems',
      'Web3 Protocols',
      'Digital Asset Exchanges',
      'Enterprise Consulting',
    ],
  },
]

function Row({ items, reverse, label }) {
  return (
    <div className={`marquee${reverse ? ' marquee--rev' : ''}`}>
      <div className="marquee__row" aria-label={label}>
        {[...items, ...items].map((name, i) => (
          <span className="marquee__item" key={`${name}-${i}`} aria-hidden={i >= items.length}>
            {name}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function TrustedBy() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const el = root.current
    const ctx = gsap.context(() => {
      if (reducedMotion()) return
      revealLines(el, { trigger: el })
      revealRise(el, { trigger: el })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="section band band--light" ref={root} id="trusted">
      {/* The claim and its qualifier on one row. The line used to trail the
          marquees, which put the sentence that explains them after the reader
          had already scrolled past the thing it explains. */}
      <div className="wrap trusted__top">
        <div className="trusted__head">
          <p className="eyebrow" data-rise>Trusted By</p>
          <h2 className="h2 h2--col display" data-clip>
            <span className="line">
              <span className="line__inner">Where policy,</span>
            </span>
            <span className="line">
              <span className="line__inner">
                capital and <em>code</em> meet.
              </span>
            </span>
          </h2>
        </div>
        <p className="trusted__caption" data-rise>
          From Ministries to marketplaces — IBA works where policy, capital and code
          meet.
        </p>
      </div>

      <div className="trusted__rows" data-rise>
        {GROUPS.map((g, i) => (
          <Row key={g.key} items={g.items} reverse={i % 2 === 1} label={g.label} />
        ))}
      </div>
    </section>
  )
}
