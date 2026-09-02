/**
 * 2.3 — What We Do. Light band.
 *
 * Three cards, each led by a drawn panel. The panels are not stock icons: each
 * one states the shape of its service — a compliance sheet being signed off, a
 * core with its satellites, two doors onto one mission — so the illustration is
 * carrying the same argument as the copy under it rather than decorating it.
 *
 * The numbers survive the redesign, moved into the panel chrome. They encode a
 * real order — advise before build, build before the institution can teach it —
 * so they are information, and dropping them would lose it.
 *
 * And the section walks that order rather than only printing it: one card is
 * live at a time, 01 then 02 then 03. Three equal cards are read as three
 * options; the same three taken in turn are read as the sequence they are.
 *
 * The reader can interrupt it. Hovering a card, or tabbing into one, takes the
 * focus and holds it there — the cycle never moves the focus off a card someone
 * is actually looking at.
 */

import { useLayoutEffect, useRef } from 'react'
import {
  gsap,
  ScrollTrigger,
  revealLines,
  revealRise,
  reducedMotion,
  isCoarse,
  whileOnScreen,
} from '../lib/scroll'
import { Go } from './service/ServiceBlocks'

/* Drawn at one size and scaled by the panel. currentColor is the band's ink, so
   every neutral is an alpha of it and only the accents are literal red. */
const ART = {
  advise: (
    <svg viewBox="0 0 200 130" fill="none" aria-hidden="true">
      <rect
        x="56"
        y="22"
        width="88"
        height="86"
        rx="9"
        fill="#fff"
        stroke="currentColor"
        strokeOpacity=".15"
      />
      <rect x="68" y="36" width="36" height="5" rx="2.5" fill="currentColor" fillOpacity=".22" />
      {/* the settled item */}
      <circle cx="73" cy="58" r="5.5" fill="#c0392b" />
      <path
        d="M70.6 58.2l1.8 1.8 3.1-3.4"
        stroke="#fff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="85" y="55.6" width="47" height="4.6" rx="2.3" fill="currentColor" fillOpacity=".15" />
      {/* the ones still open */}
      <circle cx="73" cy="75" r="5.5" stroke="currentColor" strokeOpacity=".22" />
      <rect x="85" y="72.6" width="40" height="4.6" rx="2.3" fill="currentColor" fillOpacity=".1" />
      <circle cx="73" cy="92" r="5.5" stroke="currentColor" strokeOpacity=".22" />
      <rect x="85" y="89.6" width="33" height="4.6" rx="2.3" fill="currentColor" fillOpacity=".1" />
    </svg>
  ),
  build: (
    <svg viewBox="0 0 200 130" fill="none" aria-hidden="true">
      <path
        d="M100 65H58M100 65h42M100 65V36M100 65v29"
        stroke="currentColor"
        strokeOpacity=".18"
        strokeDasharray="3 4"
      />
      <rect x="40" y="53" width="24" height="24" rx="7" fill="#fff" stroke="currentColor" strokeOpacity=".18" />
      <rect x="136" y="53" width="24" height="24" rx="7" fill="#fff" stroke="currentColor" strokeOpacity=".18" />
      <rect x="88" y="16" width="24" height="24" rx="7" fill="#fff" stroke="currentColor" strokeOpacity=".18" />
      <rect x="88" y="90" width="24" height="24" rx="7" fill="#fff" stroke="currentColor" strokeOpacity=".18" />
      {/* the satellites carry a mark — empty boxes read as placeholders */}
      <circle cx="52" cy="65" r="2.6" fill="currentColor" fillOpacity=".3" />
      <circle cx="148" cy="65" r="2.6" fill="currentColor" fillOpacity=".3" />
      <circle cx="100" cy="28" r="2.6" fill="currentColor" fillOpacity=".3" />
      <circle cx="100" cy="102" r="2.6" fill="currentColor" fillOpacity=".3" />
      <rect x="81" y="46" width="38" height="38" rx="11" fill="#c0392b" />
      <path d="M100 56l11 6-11 6-11-6z" fill="#fff" />
      <path
        d="M89 68l11 6 11-6"
        stroke="#fff"
        strokeOpacity=".72"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  educate: (
    <svg viewBox="0 0 200 130" fill="none" aria-hidden="true">
      {/* students */}
      <rect x="38" y="24" width="54" height="82" rx="9" fill="#fff" stroke="currentColor" strokeOpacity=".18" />
      <path d="M65 48l17 7.5-17 7.5-17-7.5z" fill="#c0392b" />
      <path
        d="M73.5 59.5V69c0 2.4-3.8 4.3-8.5 4.3S56.5 71.4 56.5 69v-9.5"
        stroke="#c0392b"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      {/* institutions */}
      <rect x="108" y="24" width="54" height="82" rx="9" fill="#fff" stroke="currentColor" strokeOpacity=".18" />
      <path d="M135 42l15 9h-30z" fill="currentColor" fillOpacity=".3" />
      <path d="M119 55h32M118 79h34" stroke="#c0392b" strokeWidth="2.3" strokeLinecap="round" />
      <path
        d="M124 60v14M131 60v14M139 60v14M146 60v14"
        stroke="currentColor"
        strokeOpacity=".3"
        strokeWidth="2.3"
        strokeLinecap="round"
      />
      {/* one mission */}
      <path d="M92 65h16" stroke="#c0392b" strokeOpacity=".55" strokeWidth="1.7" strokeDasharray="3 4" />
    </svg>
  ),
}

const CARDS = [
  {
    n: '01',
    name: 'Advise',
    art: ART.advise,
    body: 'Policy, compliance, standards, taxation and risk — settled before a single line of code is written.',
    links: [{ label: 'Explore Services', href: '#connect' }],
  },
  {
    n: '02',
    name: 'Build',
    art: ART.build,
    body: 'Strategy, solution design, custom development and tokenization. End-to-end delivery across 16+ verticals.',
    links: [{ label: 'See the Consulting Stack', href: '#connect' }],
  },
  {
    n: '03',
    name: 'Educate',
    art: ART.educate,
    body: 'Two doors, one mission. The IBA Red Club trains students; Verifyble runs labs on campus for institutions.',
    links: [
      { label: 'For Students', href: '/education/red-club' },
      { label: 'For Institutions', href: '/education/verifyble' },
    ],
  },
]

/** How long a card holds the focus. */
const DWELL = 3.4

export default function WhatWeDo() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const el = root.current
    /* Listeners and attributes are not GSAP's to undo, so they are collected
       here and torn down alongside the context. */
    const undo = []

    const ctx = gsap.context(() => {
      if (reducedMotion()) return
      revealLines(el, { trigger: el })
      revealRise(el, { trigger: el })

      const cards = gsap.utils.toArray('.wwd__card', el)
      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: 'top 86%',
          once: true,
          onEnter: () => gsap.delayedCall(i * 0.1, () => card.classList.add('is-in')),
        })
      })

      /* ---- one card live at a time ---- */
      const deck = cards[0]?.parentElement
      if (!deck || cards.length < 2) return

      let at = 0
      const show = (i) => {
        at = i
        cards.forEach((c, j) => {
          if (j === i) c.dataset.on = ''
          else delete c.dataset.on
        })
      }
      show(0)

      /* `onRepeat` rather than a callback at the end of the timeline: the exact
         end time is the boundary the playhead jumps across when the timeline
         loops, so a callback there fires on the first lap and is skipped on the
         ones after — the deck advanced once and then stopped. */
      const tl = gsap.timeline({
        repeat: -1,
        paused: true,
        onRepeat: () => show((at + 1) % cards.length),
      })
      tl.to({ t: 0 }, { t: 1, duration: DWELL, ease: 'none' })

      /* Never turning off screen: a loop behind the viewport is a wake-up every
         few seconds for something nobody is looking at.

         Watched rather than measured. This deck sits below the hero's
         five-viewport pin, and a ScrollTrigger created before that pin exists
         records a position a pin's worth too high — see whileOnScreen. */
      undo.push(whileOnScreen(el, () => tl.play(), () => tl.pause()))

      /* Taking the focus by hand, and giving it back. */
      const hold = (i) => {
        show(i)
        tl.pause()
      }
      const release = () => {
        /* from the top of the dwell, so the released card is read from the
           start of its turn rather than for whatever was left of it */
        tl.time(0)
        tl.play()
      }

      /* Pointer only where there is a pointer. On a touch screen an enter with
         no matching leave would hold the cycle for good on the first tap. */
      if (!isCoarse()) {
        cards.forEach((card, i) => {
          const enter = () => hold(i)
          card.addEventListener('pointerenter', enter)
          card.addEventListener('pointerleave', release)
          undo.push(() => {
            card.removeEventListener('pointerenter', enter)
            card.removeEventListener('pointerleave', release)
          })
        })
      }

      /* Keyboard, always: tabbing to a card's link makes that card the live one,
         so the focus ring and the highlight are never on different cards. */
      const onIn = (e) => {
        const card = e.target.closest('.wwd__card')
        if (card) hold(cards.indexOf(card))
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
              <span className="line__inner">Advise. Build.</span>
            </span>
            <span className="line">
              <span className="line__inner">
                <em>Educate.</em>
              </span>
            </span>
          </h2>
        </div>

        <div className="wwd__cards">
          {CARDS.map((c) => (
            <article className="wwd__card" key={c.n}>
              <div className="wwd__art">
                <span className="wwd__n">{c.n}</span>
                {c.art}
              </div>
              <div className="wwd__meta">
                <h3 className="wwd__name">{c.name}</h3>
                <p className="wwd__body">{c.body}</p>
                {/* Go, not a bare anchor: two of these now point at pages, and
                    a plain href would reload the site to reach them. */}
                <div className="wwd__links">
                  {c.links.map((l) => (
                    <Go className="arrow arrow--red" href={l.href} key={l.label}>
                      {l.label}
                      <span aria-hidden="true">→</span>
                    </Go>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
