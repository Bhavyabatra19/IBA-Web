/**
 * Expertise, IBA Initiatives as a carousel of logo cards on a dark red
 * ground with arcs of light (by request). A native scroll-snap track, so it
 * shows three cards on a wide screen, two on a tablet and one on a phone
 * without any measuring; the arrows and dots move it a card at a time, and
 * it advances on its own every few seconds, pausing while the pointer or
 * focus is on it or it is off screen. Reduced motion: no autoplay.
 *
 * ⚠ LOGOS: only India AI Alliance has a logo in the project. The others show
 * a monogram badge until their marks are supplied, set `logo` below.
 */

import { useEffect, useRef, useState } from 'react'
import { Go } from '../sections/service/ServiceBlocks'
import { reducedMotion } from '../lib/scroll'

const AUTOPLAY_MS = 4500

export default function InitiativeCarousel({ items }) {
  const track = useRef(null)
  const [at, setAt] = useState(0)
  const [paused, setPaused] = useState(false)

  const cards = () => Array.from(track.current?.children || [])
  const goTo = (i) => {
    const list = cards()
    if (!list.length) return
    const n = (i + list.length) % list.length
    track.current.scrollTo({ left: list[n].offsetLeft - list[0].offsetLeft, behavior: 'smooth' })
  }
  /* "next" from the last card that is fully in view wraps to the start */
  const next = () => {
    const el = track.current
    if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) goTo(0)
    else goTo(at + 1)
  }

  /* which card leads, from the scroll position */
  useEffect(() => {
    const el = track.current
    const onScroll = () => {
      const list = cards()
      const x = el.scrollLeft + list[0].offsetLeft
      let best = 0
      list.forEach((c, i) => {
        if (Math.abs(c.offsetLeft - x) < Math.abs(list[best].offsetLeft - x)) best = i
      })
      setAt(best)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (paused || reducedMotion()) return
    let visible = false
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(track.current)
    const t = setInterval(() => visible && !document.hidden && next(), AUTOPLAY_MS)
    return () => {
      clearInterval(t)
      io.disconnect()
    }
  })

  return (
    <div
      className="icx"
      role="region"
      aria-roledescription="carousel"
      aria-label="IBA initiatives"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setPaused(false)}
    >
      <ul className="icx__track" ref={track}>
        {items.map((it) => (
          <li className="icx__card" key={it.title}>
            <span className="icx__logo">
              {it.logo ? (
                <img src={it.logo} alt="" loading="lazy" decoding="async" />
              ) : (
                <span className="icx__mono" aria-hidden="true">
                  {it.mono}
                </span>
              )}
            </span>
            <h3 className="icx__title">{it.title}</h3>
            <p className="icx__sub">{it.sub}</p>
            <p className="icx__text">{it.text}</p>
            <Go className="icx__go" href={it.href} aria-label={`Learn more about ${it.title}`}>
              Learn more <span aria-hidden="true">→</span>
            </Go>
          </li>
        ))}
      </ul>

      <div className="icx__controls">
        <button type="button" className="pcx__arrow" onClick={() => goTo(at - 1)} aria-label="Previous initiative">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 5 8 12l7 7" />
          </svg>
        </button>
        <div className="pcx__dots">
          {items.map((it, i) => (
            <button
              type="button"
              key={it.title}
              className={`pcx__dot${i === at ? ' is-current' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Show ${it.title}`}
              aria-current={i === at || undefined}
            />
          ))}
        </div>
        <button type="button" className="pcx__arrow" onClick={next} aria-label="Next initiative">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m9 5 7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}
