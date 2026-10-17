/**
 * Academia and students. Dark band.
 *
 * Two doors, and the split IS the content: a student enrols and an institution
 * buys, and a reader is one or the other before they are anything else. The
 * Education landing page makes the same split with the same two destinations —
 * this is that choice offered on the home page, where most people meet it.
 *
 * Deliberately two cards and nothing more. The pages behind them carry the
 * programmes, the tiers and the terms; repeating any of that here would be a
 * second copy to keep in step with the first.
 */

import { useLayoutEffect, useRef } from 'react'
import { gsap, revealLines, revealRise, reducedMotion } from '../lib/scroll'
import { Go } from './service/ServiceBlocks'

const DOORS = [
  {
    who: 'For Students',
    body: 'Join the IBA Red Club: programmes, projects, placements.',
    cta: 'Join Red Club',
    href: '/education/red-club',
  },
  {
    who: 'For Institutions',
    body: 'Bring Verifyble and campus labs to your university.',
    cta: 'Request Prospectus',
    href: '/education/verifyble',
  },
]

export default function Academia() {
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
    <section className="acad section band band--dark" ref={root} id="academia">
      <div className="wrap">
        <div className="acad__head">
          <p className="eyebrow" data-rise>
            Academia &amp; Students
          </p>
          <h2 className="h2--col display" data-clip>
            <span className="line">
              <span className="line__inner">Two doors,</span>
            </span>
            <span className="line">
              <span className="line__inner">
                one <em>mission.</em>
              </span>
            </span>
          </h2>
        </div>

        <ul className="acad__doors">
          {DOORS.map((d) => (
            <li key={d.who} data-rise>
              <p className="acad__who">{d.who}</p>
              <p className="acad__body">{d.body}</p>
              <Go className="btn btn--outline-light btn--sm" href={d.href}>
                {d.cta}
              </Go>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
