/**
 * A row of cards that scrolls sideways, snapping card by card, with the
 * site's round previous / next buttons under it (the Memberships page's
 * rows, after the client's design). Cards are passed as children; each
 * should be an <li>. Styles in brandbook.css (.rail).
 *
 * `autoplay` (ms): the row moves on by one card on that interval, back to
 * the start after the last, only while it is on screen; it holds while the
 * pointer is over it or focus is inside it, and never runs under reduced
 * motion.
 */

import { useEffect, useRef } from 'react'
import { reducedMotion } from '../lib/scroll'

export default function CardRail({ label, children, cols = 3, autoplay = 0 }) {
  const track = useRef(null)
  const root = useRef(null)
  const step = (dir) => {
    const el = track.current
    const card = el?.firstElementChild
    if (!card) return
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    const w = card.getBoundingClientRect().width + gap
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
    if (dir > 0 && atEnd) el.scrollTo({ left: 0, behavior: 'smooth' })
    else if (dir < 0 && el.scrollLeft <= 4) el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' })
    else el.scrollBy({ left: dir * w, behavior: 'smooth' })
  }

  useEffect(() => {
    if (!autoplay || reducedMotion()) return
    const box = root.current
    let held = false
    let seen = false
    const hold = () => (held = true)
    const free = () => (held = box.matches(':focus-within'))
    box.addEventListener('pointerenter', hold)
    box.addEventListener('pointerleave', free)
    box.addEventListener('focusin', hold)
    box.addEventListener('focusout', () => setTimeout(free, 0))
    const io = new IntersectionObserver(([e]) => (seen = e.isIntersecting), { threshold: 0.3 })
    io.observe(box)
    const t = setInterval(() => {
      if (seen && !held && !document.hidden) step(1)
    }, autoplay)
    return () => {
      clearInterval(t)
      io.disconnect()
      box.removeEventListener('pointerenter', hold)
      box.removeEventListener('pointerleave', free)
      box.removeEventListener('focusin', hold)
    }
  }, [autoplay])

  return (
    <div className={`rail rail--${cols}`} ref={root}>
      <ul className="rail__track" ref={track} aria-label={label}>
        {children}
      </ul>
      <div className="rail__controls">
        <button type="button" className="pcx__arrow rail__arrow" onClick={() => step(-1)} aria-label="Previous">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m15 6-6 6 6 6" />
          </svg>
        </button>
        <button type="button" className="pcx__arrow rail__arrow" onClick={() => step(1)} aria-label="Next">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m9 6 6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  )
}
