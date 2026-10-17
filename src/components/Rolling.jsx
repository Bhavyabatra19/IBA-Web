/**
 * A line of type with one phrase that changes.
 *
 * The phrases are stacked in a column and the column is slid up one slot at a
 * time, so what the reader sees is the old phrase leaving upward as the new one
 * arrives — a roll, not a crossfade. The window is one line tall with the rest
 * clipped.
 *
 * ---------------------------------------------------------------------------
 * The width problem, and why the longest phrase is rendered twice.
 *
 * "trusted blockchain and Web3 ecosystem" and "largest Web3 think tank" are not
 * the same width, so a box sized to whichever phrase is showing jumps on every
 * change and drags the line after it. The fix is a hidden copy of the LONGEST
 * phrase sitting in the normal flow: it sets the width, it is never animated,
 * and the rolling column is positioned over it. The box is then as wide as the
 * widest phrase at all times and nothing moves but the words.
 *
 * `aria-hidden` on the roll and a plain readable line for assistive tech: a
 * screen reader should hear one sentence, not every variant of it in sequence.
 *
 * [data-live] follows the site's pattern — JS sets it, the animation hangs off
 * it, and with no JS or under reduced motion the first phrase is simply there.
 */

import { useLayoutEffect, useRef, useState } from 'react'
import { reducedMotion, whileOnScreen } from '../lib/scroll'

/** How long a phrase holds before the column moves on. */
const DWELL = 2600

export default function Rolling({ phrases, className = '' }) {
  const root = useRef(null)
  const [at, setAt] = useState(0)

  /* the one that decides the width — measured by the browser, not by counting
     characters, because a wide letter is worth more than a narrow one */
  const longest = phrases.reduce((a, b) => (b.length > a.length ? b : a), '')

  useLayoutEffect(() => {
    const el = root.current
    if (!el || reducedMotion() || phrases.length < 2) return
    el.dataset.live = ''

    let timer = 0
    const start = () => {
      clearInterval(timer)
      timer = setInterval(() => setAt((i) => (i + 1) % phrases.length), DWELL)
    }
    /* nothing rolls behind the viewport — the hero is tall and pinned, and this
       sits in it for several screens of scroll */
    const release = whileOnScreen(el, start, () => clearInterval(timer))

    return () => {
      release()
      clearInterval(timer)
      delete el.dataset.live
    }
  }, [phrases.length])

  return (
    <span className={`roll ${className}`} ref={root}>
      {/* the sizer: in the flow, never animated, never read aloud */}
      <span className="roll__sizer" aria-hidden="true">
        {longest}
      </span>
      {/* what is actually read */}
      <span className="sr-only">{phrases[0]}</span>
      <span className="roll__win" aria-hidden="true">
        <span className="roll__col" style={{ '--at': at }}>
          {phrases.map((p) => (
            <span className="roll__item" key={p}>
              {p}
            </span>
          ))}
        </span>
      </span>
    </span>
  )
}
