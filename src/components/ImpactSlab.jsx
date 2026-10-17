/**
 * ImpactSlab.jsx
 * ------------------------------------------------------------------
 * One solid slab over three flat planes falling away beneath it — the drawing
 * that sits in the Impact panel, on the home page and again on /about.
 *
 * The slab is the realised thing and the planes are what it was resolved from,
 * each fainter than the last. They overlap by design: the crossings compound
 * their alpha, so the stack darkens toward the middle on its own rather than
 * needing a shadow drawn under it.
 *
 * Strictly red / black / white — the reference's second hue on the right face
 * is taken here as a drop in lightness instead, which is the palette's rule.
 *
 * The component owns its own animation rather than leaving it to whichever
 * section rendered it, so a second Impact panel cannot end up with a still
 * drawing because its section forgot to build the timeline. Gradient ids are
 * per-instance for the same reason: two of these on one page sharing an id
 * would have the second one's fills resolve to the first one's gradients.
 */

import { useId, useLayoutEffect, useRef } from 'react'
import { gsap, reducedMotion } from '../lib/scroll'

export default function ImpactSlab() {
  const root = useRef(null)
  const uid = useId().replace(/:/g, '')
  const id = (n) => `iv-${n}-${uid}`
  const url = (n) => `url(#${id(n)})`

  useLayoutEffect(() => {
    const el = root.current
    const ctx = gsap.context(() => {
      if (reducedMotion()) return

      /* ---- the drawing assembles, then breathes ----
         The planes rise into place and the slab descends onto them, which is
         the same reading as the picture: measurement settling into a result.
         Once landed, the stack drifts — the slab up, the planes down, so the
         gaps open and close rather than the whole thing sliding as a block. */
      gsap
        .timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        })
        .from('.iv-planeIn', { y: 26, opacity: 0, duration: 1.05, stagger: 0.12 }, 0)
        .from('.iv-slabIn', { y: -34, opacity: 0, duration: 1.2 }, 0.15)

      /* Paused off screen. An infinite tween left running behind the viewport
         is work the reader never sees. Built fresh per tween rather than
         sharing one object — GSAP writes back onto a scrollTrigger config. */
      const whileOnScreen = () => ({
        trigger: el,
        start: 'top 96%',
        end: 'bottom top',
        toggleActions: 'play pause resume pause',
      })
      const drift = { ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.5 }

      gsap.to('.iv-slab', { ...drift, y: -7, duration: 3.4, scrollTrigger: whileOnScreen() })
      gsap.to('.iv-plane', {
        ...drift,
        y: 5,
        duration: 4.3,
        stagger: 0.4,
        scrollTrigger: whileOnScreen(),
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <div className="impact__art" ref={root}>
      {/* `slice`, so the drawing fills the panel's full height. The viewBox is
          cut to nearly the column's own ratio, so the crop takes only the side
          margins. */}
      <svg
        viewBox="0 0 240 300"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={id('rim')} x1="202" y1="19" x2="38" y2="101" gradientUnits="userSpaceOnUse">
            <stop stopColor="#b3341f" />
            <stop offset="1" stopColor="#d8503b" />
          </linearGradient>
          <linearGradient id={id('floor')} x1="184" y1="28" x2="56" y2="92" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ff4a50" />
            <stop offset="1" stopColor="#f6a495" />
          </linearGradient>
          <linearGradient id={id('left')} x1="38" y1="60" x2="120" y2="137" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ff4a50" />
            <stop offset="1" stopColor="#b3331f" />
          </linearGradient>
          <linearGradient id={id('right')} x1="202" y1="60" x2="120" y2="137" gradientUnits="userSpaceOnUse">
            <stop stopColor="#bb3722" />
            <stop offset="1" stopColor="#8b2718" />
          </linearGradient>
          <linearGradient id={id('plane')} x1="202" y1="0" x2="38" y2="300" gradientUnits="userSpaceOnUse">
            <stop stopColor="#d71920" />
            <stop offset="1" stopColor="#7d2416" />
          </linearGradient>
        </defs>

        {/* Two nested groups per moving part: the outer one is the entrance,
            the inner one the ambient float. Separating them means the loop
            never has to inherit whatever transform the entrance left behind,
            and neither tween can overwrite the other. */}
        {[
          { d: 'M120 137l82 41-82 41-82-41z', o: 0.62 },
          { d: 'M120 173l82 41-82 41-82-41z', o: 0.42 },
          { d: 'M120 209l82 41-82 41-82-41z', o: 0.26 },
        ].map((p) => (
          <g className="iv-planeIn" key={p.d}>
            <g className="iv-plane">
              <path d={p.d} fill={url('plane')} fillOpacity={p.o} />
            </g>
          </g>
        ))}

        {/* the slab: two walls, the rim, and the floor recessed inside it */}
        <g className="iv-slabIn">
          <g className="iv-slab">
            <path d="M38 60v34l82 41v-34z" fill={url('left')} />
            <path d="M202 60v34l-82 41v-34z" fill={url('right')} />
            <path d="M120 19l82 41-82 41-82-41z" fill={url('rim')} />
            <path d="M120 28l64 32-64 32-64-32z" fill={url('floor')} />
          </g>
        </g>
      </svg>
    </div>
  )
}
