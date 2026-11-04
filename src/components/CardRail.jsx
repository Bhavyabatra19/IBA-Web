/**
 * A row of cards that scrolls sideways, snapping card by card, with the
 * site's round previous / next buttons under it (the Memberships page's
 * rows, after the client's design). Cards are passed as children; each
 * should be an <li>. Styles in brandbook.css (.rail).
 */

import { useRef } from 'react'

export default function CardRail({ label, children, cols = 3 }) {
  const track = useRef(null)
  const step = (dir) => {
    const el = track.current
    const card = el?.firstElementChild
    if (!card) return
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    el.scrollBy({ left: dir * (card.getBoundingClientRect().width + gap), behavior: 'smooth' })
  }
  return (
    <div className={`rail rail--${cols}`}>
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
