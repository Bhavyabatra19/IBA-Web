/**
 * About — Vision and Mission, as two cards built like the home page's
 * Academia & Students cards (.wd--two): photo header toned into the brand,
 * tag and the lead line, then the opening of the copy clamped
 * to five lines and a Read more button, the icon in the corner; the whole text opens in a popup (a
 * native <dialog>: focus kept inside, Esc and the backdrop close it, the page
 * behind does not scroll). The photos load straight away (not lazily), as
 * this band sits right under the hero.
 *
 * Each card keeps its own anchor (#vision, #mission) for the nav links.
 * Photos: Unsplash, under the Unsplash License, saved in public/images:
 *   ab-vision.jpg   supplied artwork: a red eye ringed by orbits and cubes
 *   ab-mission.jpg  supplied artwork: a red target with a dart, ringed by orbits
 */

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap, revealRise, reducedMotion, lockScroll, unlockScroll } from '../lib/scroll'

/* line icons, drawn on a 48 grid in currentColor */
const ICONS = {
  vision: (
    <>
      <path d="M4 24s7.5-12 20-12 20 12 20 12-7.5 12-20 12S4 24 4 24Z" />
      <circle cx="24" cy="24" r="6" />
    </>
  ),
  mission: (
    <>
      <circle cx="24" cy="24" r="16" />
      <circle cx="24" cy="24" r="9" />
      <circle cx="24" cy="24" r="2.5" />
    </>
  ),
}

export default function VisionMission({ vision, mission }) {
  const root = useRef(null)

  useLayoutEffect(() => {
    const el = root.current
    const ctx = gsap.context(() => {
      if (reducedMotion()) return
      revealRise(el, { trigger: el, start: 'top 82%', stagger: 0.1 })
    }, root)
    return () => ctx.revert()
  }, [])

  /* which card's full text is open, if any */
  const [open, setOpen] = useState(null)
  const dlg = useRef(null)
  useEffect(() => {
    const d = dlg.current
    if (!d || !open) return
    d.showModal()
    // focus the close button, not the scrolling sheet the dialog would pick
    d.querySelector('.vm__x')?.focus()
    lockScroll()
    return () => {
      if (d.open) d.close()
      unlockScroll()
    }
  }, [open])

  const cards = [
    { key: 'vision', tag: 'Our Vision', img: '/images/ab-vision.jpg', ...vision },
    { key: 'mission', tag: 'Our Mission', img: '/images/ab-mission.jpg', ...mission },
  ]

  return (
    <section className="wd wd--two vm band band--light band--own" ref={root} aria-labelledby="vm-title">
      <div className="wd__inner">
        <p className="hero__kicker wd__eyebrow" id="vm-title" data-rise>
          <svg className="hero__kicker-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2.5 20.5 7v10L12 21.5 3.5 17V7L12 2.5Z" />
            <path d="M3.5 7 12 11.5 20.5 7M12 11.5v10" />
          </svg>
          Vision &amp; Mission
        </p>

        <div className="wd__grid">
          {cards.map((c) => (
            <article className={`wd__card wd__card--${c.key}`} id={c.key} key={c.key} data-rise>
              <div className="wd__media" aria-hidden="true">
                {/* the first band under the hero, so loaded straight away rather
                    than lazily — a lazy photo here showed as an empty box */}
                <img className="wd__photo vm__photo" src={c.img} alt="" decoding="async" />
                <span className="wd__tint" />
              </div>
              <div className="wd__body">
                <span className="wd__tag">{c.tag}</span>
                <h3 className="wd__title">{c.lead}</h3>
                {/* the opening of the copy, clamped to five lines */}
                <p className="wd__text vm__preview">{c.paras.join(' ')}</p>
                <button
                  type="button"
                  className="vm__more"
                  aria-haspopup="dialog"
                  onClick={() => setOpen(c.key)}
                >
                  Read more <span aria-hidden="true">→</span>
                </button>
                {/* the icon in the card's bottom-right corner, as on the home cards */}
                <span className="wd__badge wd__badge--inline" aria-hidden="true">
                  <svg className="wd__icon" viewBox="0 0 48 48">
                    {ICONS[c.key]}
                  </svg>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* the full text, in a popup */}
      {open && (
        <dialog
          className="vm__dialog"
          ref={dlg}
          aria-labelledby="vm-dialog-title"
          onClose={() => setOpen(null)}
          onClick={(e) => {
            // a click on the backdrop (the dialog element itself) closes it
            if (e.target === e.currentTarget) e.currentTarget.close()
          }}
        >
          {cards
            .filter((c) => c.key === open)
            .map((c) => (
              <div className="vm__sheet" key={c.key}>
                <div className="vm__sheet-media" aria-hidden="true">
                  <img src={c.img} alt="" />
                </div>
                <div className="vm__sheet-body">
                  <span className="wd__tag">{c.tag}</span>
                  <h3 className="vm__sheet-title" id="vm-dialog-title">
                    {c.lead}
                  </h3>
                  <div className="vm__copy">
                    {c.paras.map((p) => (
                      <p className="wd__text" key={p.slice(0, 24)}>
                        {p}
                      </p>
                    ))}
                  </div>
                  {c.close && <p className="vm__close">{c.close}</p>}
                </div>
                <button
                  type="button"
                  className="vm__x"
                  aria-label="Close"
                  onClick={() => dlg.current?.close()}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6 6l12 12M18 6 6 18" />
                  </svg>
                </button>
              </div>
            ))}
        </dialog>
      )}
    </section>
  )
}
