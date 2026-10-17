/**
 * 2.3 — What We Do. Light band.
 *
 * Three steps in a row, each led by a line icon, with a dashed link curving
 * between them — the layout of a "get started in three steps" block. The
 * numbers encode a real order (advise before build, build before the
 * institution can teach it) so they are printed as steps rather than as a
 * grid of three equal options, and the links between them are what say so.
 *
 * The icons are the three files supplied for this section, in public/icons —
 * two people and a message for Advise, the pieces being fitted for Build, a
 * lit bulb for Educate — used AS THEY WERE SUPPLIED, not redrawn.
 *
 * They are applied as CSS masks rather than placed as <img>: a mask takes the
 * file's alpha as the shape and paints it in whatever colour the element has,
 * so the same black-on-transparent PNG is the band's ink at rest and the
 * brand's red when its step is live. An <img> would be black in both states,
 * and the only way to recolour one is a filter chain nobody can read. The
 * price is that a masked span has no alt — which is right here: the tile is
 * decoration beside a heading that already says the word.
 *
 * The section still walks its own order: one step is live at a time, 01 then
 * 02 then 03, and its tile tilts up as the live one. Hovering a step, or
 * tabbing into one, takes the focus and holds it there — the cycle never moves
 * the focus off a step someone is actually reading.
 */

import { Fragment, useLayoutEffect, useRef } from 'react'
import {
  gsap,
  revealLines,
  revealRise,
  reducedMotion,
  isCoarse,
  whileOnScreen,
} from '../lib/scroll'
import { Go } from './service/ServiceBlocks'

/* The app is served from the domain root — path routing already requires
   that — so the public path is absolute. The file is named for the step. */
const icon = (key) => `/icons/${key}.png`

/**
 * ⚠ THE ORDER CHANGED, and it is not cosmetic.
 *
 * It ran Advise → Build → Educate, and the comment at the top of this file
 * still explains why that was an order rather than a list: advise before build,
 * build before the institution can teach it. The supplied layout runs Educate →
 * Advise → Build, which is a different argument — train the builders, de-risk
 * the decision, ship the system. People first.
 *
 * Each step now carries a short claim of its own above the paragraph; those
 * three verbs are the headline of the section as much as the names are.
 */
const STEPS = [
  {
    n: '01',
    key: 'educate',
    name: 'Educate',
    claim: 'Train the builders',
    body: 'The IBA Red Club brings certified training, Blockchain and AI labs, live projects and placements to students and institutions.',
    links: [{ label: 'Visit Red Club', href: '/education/red-club' }],
  },
  {
    n: '02',
    key: 'advise',
    name: 'Advise',
    claim: 'De-risk the decision',
    body: 'Policy, compliance, standards, taxation, forensics and risk mitigation — the right blockchain decision before a single line of code is written.',
    links: [{ label: 'See Expertise', href: '/services' }],
  },
  {
    n: '03',
    key: 'build',
    name: 'Build',
    claim: 'Ship the system',
    body: 'From strategy assessment to solution design, custom development, tokenization and ecosystem management, across 16+ industry verticals.',
    links: [{ label: 'See the Consulting Stack', href: '/services/consulting-stack' }],
  },
]

/* The link between two steps: a dashed curve with a point at each end, one
   dipping and the next arching, so the three read as a path and not a row. */
const Link = ({ flip }) => (
  <svg
    className="wwd__link"
    viewBox="0 0 120 40"
    aria-hidden="true"
    data-flip={flip ? '' : undefined}
  >
    <path d="M6 20 C 40 20, 50 34, 60 34 S 80 20, 114 20" />
    <circle cx="6" cy="20" r="2.4" />
    <circle cx="114" cy="20" r="2.4" />
  </svg>
)

/** How long a step holds the focus. */
const DWELL = 3.4

export default function WhatWeDo() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const el = root.current
    const undo = []

    const ctx = gsap.context(() => {
      if (reducedMotion()) return
      revealLines(el, { trigger: el })
      revealRise(el, { trigger: el })

      /* ---- one step live at a time ---- */
      const steps = gsap.utils.toArray('.wwd__step', el)
      const deck = steps[0]?.parentElement
      if (!deck || steps.length < 2) return

      let at = 0
      const show = (i) => {
        at = i
        steps.forEach((s, j) => {
          if (j === i) s.dataset.on = ''
          else delete s.dataset.on
        })
      }
      show(0)

      /* `onRepeat`, not a callback at the end of the timeline: the exact end
         time is the boundary the playhead jumps across when it loops, so a
         callback there fires on the first lap and is skipped on the ones
         after. */
      const tl = gsap.timeline({
        repeat: -1,
        paused: true,
        onRepeat: () => show((at + 1) % steps.length),
      })
      tl.to({ t: 0 }, { t: 1, duration: DWELL, ease: 'none' })

      /* watched rather than measured — see whileOnScreen */
      undo.push(whileOnScreen(el, () => tl.play(), () => tl.pause()))

      const hold = (i) => {
        show(i)
        tl.pause()
      }
      const release = () => {
        tl.time(0)
        tl.play()
      }

      /* pointer only where there is a pointer — on touch, an enter with no
         matching leave would hold the cycle for good on the first tap */
      if (!isCoarse()) {
        steps.forEach((step, i) => {
          const enter = () => hold(i)
          step.addEventListener('pointerenter', enter)
          step.addEventListener('pointerleave', release)
          undo.push(() => {
            step.removeEventListener('pointerenter', enter)
            step.removeEventListener('pointerleave', release)
          })
        })
      }

      /* keyboard, always: tabbing to a step's link makes that step the live one */
      const onIn = (e) => {
        const step = e.target.closest('.wwd__step')
        if (step) hold(steps.indexOf(step))
      }
      const onOut = (e) => {
        if (!deck.contains(e.relatedTarget)) release()
      }
      deck.addEventListener('focusin', onIn)
      deck.addEventListener('focusout', onOut)
      undo.push(() => {
        deck.removeEventListener('focusin', onIn)
        deck.removeEventListener('focusout', onOut)
      })
    }, root)

    return () => {
      undo.forEach((fn) => fn())
      ctx.revert()
    }
  }, [])

  return (
    <section className="section band band--light" ref={root} id="what-we-do">
      <div className="wrap">
        <div className="wwd__head">
          <p className="eyebrow" data-rise>What We Do</p>
          <h2 className="h2 display" data-clip>
            <span className="line">
              <span className="line__inner wwd__grad">Advise. Build.</span>
            </span>
            <span className="line">
              <span className="line__inner wwd__grad">
                <em>Educate.</em>
              </span>
            </span>
          </h2>
        </div>

        <div className="wwd__steps">
          {STEPS.map((s, i) => (
            <Fragment key={s.n}>
              {i > 0 && <Link flip={i % 2 === 0} />}
              <article className="wwd__step" data-rise>
                <span className="wwd__ico" aria-hidden="true">
                  <span
                    className="wwd__mark"
                    style={{ '--icon': `url(${icon(s.key)})` }}
                  />
                </span>
                <span className="wwd__stepN">Step {s.n}</span>
                <h3 className="wwd__stepName display wwd__grad">{s.name}</h3>
                <p className="wwd__claim">{s.claim}</p>
                <p className="wwd__stepBody">{s.body}</p>
                <div className="wwd__links">
                  {s.links.map((l) => (
                    <Go className="arrow arrow--red" href={l.href} key={l.label}>
                      {l.label}
                      <span aria-hidden="true">→</span>
                    </Go>
                  ))}
                </div>
              </article>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
