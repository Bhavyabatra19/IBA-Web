/**
 * 2.2, Credibility bar. Warm light band, four white cards.
 *
 * `band--own` so the light band after it keeps its top padding, this is a
 * different ground from its neighbours, not a continuation of either.
 */

import { useLayoutEffect, useRef } from 'react'
import { gsap, revealRise, reducedMotion } from '../lib/scroll'
import { CRED_STATS as STATS } from '../content'

/**
 * The figures count up (by request), here only, the site-wide counter in
 * lib/scroll stays off, for the reason given there: a figure caught mid-count
 * reads as the wrong number. So a figure counts only once it is well inside
 * the viewport, and one the page loads already scrolled past simply shows its
 * value. Hovering a card counts it again, quickly.
 */
function countUp(el, duration) {
  const to = Number(el.dataset.count)
  const suffix = el.dataset.suffix || ''
  // hold the final width, so the card does not reflow as digits are added
  el.style.minWidth = `${el.offsetWidth}px`
  const state = { v: 0 }
  gsap.killTweensOf(el)
  gsap.killTweensOf(state)
  return gsap
    .timeline()
    .to(state, {
      v: to,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = `${Math.round(state.v)}${suffix}`
      },
    })
    // a small pop as it lands
    .fromTo(el, { scale: 1 }, { scale: 1.08, duration: 0.16, ease: 'power2.out', yoyo: true, repeat: 1 }, duration * 0.55)
}

export default function Credibility() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const el = root.current
    const figures = Array.from(el.querySelectorAll('.cred__k'))
    const cleanups = []
    const ctx = gsap.context(() => {
      if (reducedMotion()) return
      revealRise(el, { trigger: el, start: 'top 88%', stagger: 0.08 })

      figures.forEach((fig, i) => {
        gsap.set(fig, { display: 'inline-block', transformOrigin: '50% 60%' })
        // already scrolled past on load: leave the value as written
        if (fig.getBoundingClientRect().bottom < 0) return
        const io = new IntersectionObserver(
          ([entry]) => {
            if (!entry.isIntersecting) return
            io.disconnect()
            gsap.delayedCall(i * 0.12, () => countUp(fig, 1.8))
          },
          { threshold: 0.6 }
        )
        io.observe(fig)
        cleanups.push(() => io.disconnect())
      })

      // hover: count again, faster
      figures.forEach((fig) => {
        const card = fig.closest('.cred__item')
        const replay = () => countUp(fig, 0.9)
        card.addEventListener('mouseenter', replay)
        cleanups.push(() => card.removeEventListener('mouseenter', replay))
      })
    }, root)
    return () => {
      cleanups.forEach((fn) => fn())
      ctx.revert()
      // leave the written values in place after any interrupted count
      figures.forEach((fig) => {
        fig.textContent = `${fig.dataset.count}${fig.dataset.suffix || ''}`
        fig.style.minWidth = ''
      })
    }
  }, [])

  return (
    <section className="cred band band--light band--own" ref={root} aria-label="IBA by the numbers">
      <div className="wrap">
        <div className="cred__grid">
          {STATS.map((s) => (
            <div className="cred__item" key={s.label} data-rise>
              {/* the final value is in the markup, so it is correct before the
                  counter ever runs, and stays correct if it never does */}
              <span className="cred__k" data-count={s.to} data-suffix={s.suffix}>
                {s.to}
                {s.suffix}
              </span>
              <span className="cred__v">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
