/**
 * The Ecosystem page's Key Partners, as a paged carousel (after the client's
 * reference): red glass tiles on a red gradient panel, each with the logo on
 * a white rounded square and the name beneath, twelve to a page, with
 * previous / next buttons and page dots.
 *
 * Motion: every logo floats on its own clock; a page's tiles rise in, in a
 * stagger, when it comes into view; a tile lifts on hover. The pages advance
 * on their own every few seconds, pausing while the pointer or focus is on
 * the carousel. Reduced motion: no float, no autoplay, no slide animation.
 *
 * Partners come from data/partners.js (shared with the home marquee); one
 * without a logo shows its initials, and one with a `url` is a link to its
 * site.
 */

import { useEffect, useRef, useState } from 'react'
import { PARTNERS, initials } from '../data/partners'
import { reducedMotion } from '../lib/scroll'

const PER_PAGE = 12
const AUTOPLAY_MS = 6000

/* At most twelve to a page, spread evenly across the pages that needs (by
   request: twelve-at-a-time left a last page holding one partner alone) */
const PAGE_COUNT = Math.ceil(PARTNERS.length / PER_PAGE)
const PAGES = Array.from({ length: PAGE_COUNT }, (_, i) =>
  PARTNERS.slice(
    Math.round((i * PARTNERS.length) / PAGE_COUNT),
    Math.round(((i + 1) * PARTNERS.length) / PAGE_COUNT)
  )
)

export default function PartnerCarousel() {
  const [page, setPage] = useState(0)
  const [paused, setPaused] = useState(false)
  const root = useRef(null)
  const drag = useRef(null)
  const count = PAGES.length

  const go = (n) => setPage(((n % count) + count) % count)

  /* autoplay, only while on screen, not paused, and motion allowed */
  useEffect(() => {
    if (paused || reducedMotion()) return
    const el = root.current
    let visible = false
    let timer = 0
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
    })
    io.observe(el)
    timer = setInterval(() => {
      if (visible && !document.hidden) setPage((p) => (p + 1) % count)
    }, AUTOPLAY_MS)
    return () => {
      clearInterval(timer)
      io.disconnect()
    }
  }, [paused, count, page])

  /* swipe: a horizontal drag of 50px or more turns the page */
  const onPointerDown = (e) => {
    drag.current = { x: e.clientX, y: e.clientY }
  }
  const onPointerUp = (e) => {
    const d = drag.current
    drag.current = null
    if (!d) return
    const dx = e.clientX - d.x
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(e.clientY - d.y)) go(page + (dx < 0 ? 1 : -1))
  }

  return (
    <div
      className="pcx"
      ref={root}
      role="region"
      aria-roledescription="carousel"
      aria-label="Ecosystem partners"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false)
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(page + 1)
        if (e.key === 'ArrowLeft') go(page - 1)
      }}
    >
      <div className="pcx__viewport" onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
        <div className="pcx__track" style={{ transform: `translateX(${-page * 100}%)` }}>
          {PAGES.map((items, p) => (
            <ul
              className={`pcx__page${p === page ? ' is-current' : ''}`}
              key={p}
              aria-label={`Page ${p + 1} of ${count}`}
              aria-hidden={p !== page || undefined}
              inert={p !== page ? '' : undefined}
            >
              {items.map(({ name, logo, url }, i) => (
                <li className={`pcx__tile${url ? ' pcx__tile--link' : ''}`} key={name} style={{ '--i': i }}>
                  <span className="pcx__badge" style={{ '--float': `${4.2 + (i % 5) * 0.55}s`, '--delay': `${-(i * 0.7)}s` }}>
                    {logo ? (
                      <img className="pcx__logo" src={logo} alt="" loading="lazy" decoding="async" />
                    ) : (
                      <span className="pcx__mono" aria-hidden="true">
                        {initials(name)}
                      </span>
                    )}
                  </span>
                  {url ? (
                    /* the name is the link; its ::after stretches over the
                       whole tile, so the tile is one click target */
                    <a className="pcx__name pcx__link" href={url} target="_blank" rel="noreferrer noopener">
                      {name}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : (
                    <span className="pcx__name">{name}</span>
                  )}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <div className="pcx__controls">
        <button type="button" className="pcx__arrow" onClick={() => go(page - 1)} aria-label="Previous partners">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 5 8 12l7 7" />
          </svg>
        </button>
        <div className="pcx__dots">
          {PAGES.map((_, p) => (
            <button
              type="button"
              key={p}
              className={`pcx__dot${p === page ? ' is-current' : ''}`}
              onClick={() => go(p)}
              aria-label={`Show page ${p + 1} of ${count}`}
              aria-current={p === page || undefined}
            />
          ))}
        </div>
        <button type="button" className="pcx__arrow" onClick={() => go(page + 1)} aria-label="Next partners">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m9 5 7 7-7 7" />
          </svg>
        </button>
      </div>

      <p className="pcx__more">
        And more partners joining every quarter.{' '}
        <a href="#become-a-partner">
          Become a Partner <span aria-hidden="true">→</span>
        </a>
      </p>
    </div>
  )
}
