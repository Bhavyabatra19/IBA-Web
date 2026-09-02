/**
 * ScrollTop.jsx
 * ------------------------------------------------------------------
 * Back to the top, from the bottom right of every page.
 *
 * Rendered once by App rather than by each page: it is chrome, like the nav and
 * the footer, and a control that appeared on some pages and not others would be
 * worse than one that never appeared at all.
 *
 * It stays out of the way until the reader is a screen down. At the top of the
 * page it would be a button that does nothing, and the pages here open on a
 * hero that is the whole viewport — so the threshold is a viewport, not an
 * arbitrary number of pixels.
 *
 * The visibility is a plain scroll listener and deliberately not a
 * ScrollTrigger: this reads window.scrollY live, so it cannot be thrown off by
 * the home hero installing five viewports of pin spacer after it mounts — the
 * failure nav.js documents and whileOnScreen exists to avoid.
 */

import { useEffect, useState } from 'react'
import { scrollToTop } from '../lib/scroll'

export default function ScrollTop() {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    /* Held outside the state so the listener can compare against it without
       re-subscribing: this runs on every scroll frame, and the only thing it
       should cost when nothing has changed is a comparison. */
    let on = false
    const read = () => {
      const next = window.scrollY > window.innerHeight * 0.9
      if (next === on) return
      on = next
      setShown(next)
    }
    read()
    window.addEventListener('scroll', read, { passive: true })
    return () => window.removeEventListener('scroll', read)
  }, [])

  return (
    <button
      type="button"
      className="toTop"
      data-shown={shown ? '' : undefined}
      onClick={() => scrollToTop({ immediate: false })}
      aria-label="Back to top"
      title="Back to top"
    >
      <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M8 13V3.6M3.8 7.8 8 3.6l4.2 4.2" />
      </svg>
    </button>
  )
}
