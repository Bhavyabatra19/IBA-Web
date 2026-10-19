/** PartnerCarousel — the Ecosystem page's Key Partners as a two-row glass
    carousel: scroll-snapped columns, prev/next arrows, page dots, and a slow
    autoplay that pauses on hover, focus, off-screen and reduced motion. */

import { useCallback, useEffect, useRef, useState } from 'react'
import { initials } from '../data/partners'

const TONES = ['red', 'ink', 'deep']
const AUTOPLAY_MS = 4500

/* the sheen follows the pointer: --mx/--my drive a radial highlight, and a
   small tilt is set from the pointer's offset from the tile's centre */
const onTileMove = (e) => {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width
  const y = (e.clientY - r.top) / r.height
  el.style.setProperty('--mx', `${x * 100}%`)
  el.style.setProperty('--my', `${y * 100}%`)
  el.style.setProperty('--rx', `${(0.5 - y) * 8}deg`)
  el.style.setProperty('--ry', `${(x - 0.5) * 8}deg`)
}
const onTileLeave = (e) => {
  const el = e.currentTarget
  el.style.setProperty('--rx', '0deg')
  el.style.setProperty('--ry', '0deg')
}

export default function PartnerCarousel({ partners, moreHref = '#become-a-partner' }) {
  const track = useRef(null)
  const root = useRef(null)
  const [pages, setPages] = useState(1)
  const [page, setPage] = useState(0)
  const paused = useRef(false)
  const visible = useRef(false)

  const measure = useCallback(() => {
    const t = track.current
    if (!t) return
    const n = Math.max(1, Math.round(t.scrollWidth / t.clientWidth))
    setPages(n)
    const max = t.scrollWidth - t.clientWidth
    setPage(max > 0 ? Math.round((t.scrollLeft / max) * (n - 1)) : 0)
  }, [])

  const go = useCallback((i) => {
    const t = track.current
    if (!t) return
    const max = t.scrollWidth - t.clientWidth
    const n = Math.max(1, Math.round(t.scrollWidth / t.clientWidth))
    const target = ((i + n) % n) / Math.max(1, n - 1)
    t.scrollTo({ left: target * max, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const t = track.current
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(t)
    t.addEventListener('scroll', measure, { passive: true })
    const io = new IntersectionObserver(([e]) => (visible.current = e.isIntersecting), { threshold: 0.3 })
    io.observe(root.current)
    return () => {
      ro.disconnect()
      io.disconnect()
      t.removeEventListener('scroll', measure)
    }
  }, [measure])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => {
      if (!paused.current && visible.current && !document.hidden) go(page + 1)
    }, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [go, page])

  const hold = (v) => () => (paused.current = v)

  return (
    <div
      className="pc"
      ref={root}
      data-rise
      role="region"
      aria-roledescription="carousel"
      aria-label="Key partners"
      onMouseEnter={hold(true)}
      onMouseLeave={hold(false)}
      onFocus={hold(true)}
      onBlur={hold(false)}
    >
      <div className="pc__glow" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <ul className="pc__track" ref={track} tabIndex={0}>
        {partners.map(({ name, logo }, i) => (
          <li
            className="pc__tile"
            key={name}
            style={{ '--i': i % 12 }}
            onPointerMove={onTileMove}
            onPointerLeave={onTileLeave}
          >
            <span className="pc__mark">
              {logo ? (
                <img className="eco__logo" src={logo} alt="" loading="lazy" decoding="async" />
              ) : (
                <span className={`eco__mono eco__mono--${TONES[i % TONES.length]}`} aria-hidden="true">
                  {initials(name)}
                </span>
              )}
            </span>
            <span className="pc__name">{name}</span>
          </li>
        ))}
        <li className="pc__tile pc__tile--more">
          <span>And more partners joining every quarter.</span>
          <a href={moreHref}>
            Become a Partner <span aria-hidden="true">→</span>
          </a>
        </li>
      </ul>

      <div className="pc__nav">
        <button type="button" className="pc__arrow" onClick={() => go(page - 1)} aria-label="Previous partners">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
        </button>
        <div className="pc__dots" role="tablist" aria-label="Choose a page">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === page}
              aria-label={`Page ${i + 1} of ${pages}`}
              className={`pc__dot${i === page ? ' is-on' : ''}`}
              onClick={() => go(i)}
            />
          ))}
        </div>
        <button type="button" className="pc__arrow" onClick={() => go(page + 1)} aria-label="Next partners">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  )
}
