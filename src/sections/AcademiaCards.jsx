/**
 * Academia & students — two doors, as two cards. Light band.
 *
 * Follows the what-we-do cards and is built from the same parts (.wd__*):
 * photo header toned into the brand, glass icon badge, red on hover. Two
 * columns instead of three, and a wider header to suit them.
 *
 * Photos: Unsplash, under the Unsplash License (free for commercial use, no
 * attribution required), saved locally in public/images:
 *   ac-students.jpg      Christian Lendl    unsplash.com/photos/nxBucBB_ihQ
 *   ac-institutions.jpg  Matthieu Joannon   unsplash.com/photos/m8MSzLd2Y4Q
 */

import { useLayoutEffect, useRef } from 'react'
import { gsap, revealRise, reducedMotion } from '../lib/scroll'
import { Go } from './service/ServiceBlocks'

/* line icons, drawn on a 48 grid in currentColor */
const ICONS = {
  students: (
    <>
      <circle cx="18" cy="16" r="6" />
      <path d="M6 38c0-7 5.4-12 12-12s12 5 12 12" />
      <circle cx="33" cy="18" r="5" />
      <path d="M31 27c6 0 11 4.6 11 11" />
    </>
  ),
  institutions: (
    <>
      <path d="M6 18 24 8l18 10Z" />
      <path d="M10 22v14M18 22v14M30 22v14M38 22v14" />
      <path d="M6 40h36" />
    </>
  ),
}

const DOORS = [
  {
    key: 'students',
    tag: 'Learners',
    title: 'Global Exposure',
    body: 'Join the IBA Red Club: programmes, projects, placements.',
    cta: 'Join Red Club',
    href: '/red-club',
    img: '/images/card-students.jpg',
  },
  {
    key: 'institutions',
    tag: 'Institutions',
    title: 'For Institutions',
    body: 'Bring Red Club programmes and campus labs to your university.',
    cta: 'Request Prospectus',
    href: '/connect',
    img: '/images/card-institutions.jpg',
  },
]

export default function AcademiaCards() {
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
    <section
      className="wd wd--two band band--light band--own"
      ref={root}
      aria-labelledby="ac-title"
    >
      <div className="wd__inner">
        <p className="hero__kicker wd__eyebrow" id="ac-title" data-rise>
          <svg className="hero__kicker-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2.5 20.5 7v10L12 21.5 3.5 17V7L12 2.5Z" />
            <path d="M3.5 7 12 11.5 20.5 7M12 11.5v10" />
          </svg>
          Knowledge Hub
        </p>

        <div className="wd__grid">
          {DOORS.map((d) => (
            <article className={`wd__card wd__card--${d.key}`} key={d.key} data-rise>
              <div className="wd__media" aria-hidden="true">
                <img className="wd__photo" src={d.img} alt="" loading="lazy" decoding="async" />
                <span className="wd__tint" />
              </div>
              <div className="wd__body">
                <span className="wd__tag">{d.tag}</span>
                {/* the icon, below the label (by request), not on the photo */}
                <span className="wd__badge wd__badge--inline" aria-hidden="true">
                  <svg className="wd__icon" viewBox="0 0 48 48">
                    {ICONS[d.key]}
                  </svg>
                </span>
                <h3 className="wd__title">{d.title}</h3>
                <p className="wd__text">{d.body}</p>
                <Go className="wd__go" href={d.href}>
                  {d.cta} <span aria-hidden="true">→</span>
                </Go>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
