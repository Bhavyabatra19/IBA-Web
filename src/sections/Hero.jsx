/**
 * 2.1 — Hero. Dark band.
 *
 * The pinned coin evolution. Type sits in a three-row grid with the middle row
 * left empty, which is what keeps the object on the optical centre of the
 * viewport at every breakpoint.
 */

import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger, reducedMotion, isMobile, CLIP_FROM } from '../lib/scroll'
import { makeRig, buildHeroTimeline } from '../rig'
import { claimStage, releaseStage, markDirty } from '../three/stageBus'

export default function Hero() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const el = root.current
    const rig = makeRig('hero')
    const tl = buildHeroTimeline(rig)

    const ctx = gsap.context(() => {
      /* ---- reduced motion: no pin, no scrub, one resolved state ---- */
      if (reducedMotion()) {
        tl.progress(0.88)
        ScrollTrigger.create({
          trigger: el,
          start: 'top 80%',
          end: 'bottom 20%',
          onToggle: (self) => {
            if (self.isActive) claimStage('hero', rig)
            else releaseStage('hero')
            markDirty()
          },
        })
        gsap.set('[data-rise]', { opacity: 1, y: 0 })
        gsap.set('[data-clip] .line__inner', { yPercent: 0, y: 0 })
        return
      }

      /* Five states over 500vh — roughly a screen of scroll each, which is the
         pace at which a state is read rather than glimpsed. Mobile gets less:
         a pin that outlasts the reader's patience is worse than a short one. */
      ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: isMobile() ? '+=340%' : '+=500%',
        pin: true,
        pinSpacing: true,
        scrub: 0.6, // the inertia — the object trails the scroll very slightly
        anticipatePin: 1,
        invalidateOnRefresh: true,
        fastScrollEnd: true,
        onUpdate: (self) => tl.progress(self.progress),
        onToggle: (self) => {
          if (self.isActive) claimStage('hero', rig)
          else releaseStage('hero')
        },
      })

      /* live before the pin engages, or the first frames play on an empty stage */
      ScrollTrigger.create({
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        onToggle: (self) => {
          if (self.isActive) claimStage('hero', rig)
        },
      })

      /* ---- one-shot intro ----
         The yPercent start has to be restated in JS: it is declared in CSS as a
         percentage, and getComputedStyle resolves percentages to pixels, so
         GSAP would read yPercent as already 0 and the tween would do nothing. */
      gsap.set('[data-clip] .line__inner', { yPercent: CLIP_FROM, y: 0 })
      gsap
        .timeline({ delay: 0.25, defaults: { ease: 'expo.out' } })
        .to('[data-clip] .line__inner', { yPercent: 0, duration: 1.35, stagger: 0.1 }, 0)
        .to('[data-rise]', { opacity: 1, y: 0, duration: 1.1, stagger: 0.09 }, 0.35)
    }, root)

    return () => {
      ctx.revert()
      releaseStage('hero')
    }
  }, [])

  return (
    <section className="hero band band--dark" ref={root} id="hero">
      <div className="hero__inner wrap">
        {/* The lockup used to live here. It is global chrome, so it now belongs
            to the fixed nav — the row stays as the reserve for the bar, which
            keeps the copy below on exactly the line it was laid out on. */}
        <div className="hero__top" aria-hidden="true" />

        {/* the centre row belongs to the object */}
        <div />

        <div className="hero__bottom">
          <div className="hero__headline">
            <p className="eyebrow" data-rise>One Alliance. Infinite Possibilities.</p>
            <h1 className="hero__title display" data-clip>
              <span className="line">
                <span className="line__inner">Decentralizing</span>
              </span>
              <span className="line">
                <span className="line__inner">the Future,</span>
              </span>
              <span className="line">
                <span className="line__inner">
                  <em>Together</em>
                </span>
              </span>
            </h1>
          </div>

          <div className="hero__aside">
            <p className="lede hero__lede" data-rise>
              India Blockchain Alliance is a premier global blockchain community and
              advocacy group advancing the development, adoption and implementation
              of blockchain across sectors — with a sharp focus on Asia and the MENA
              region.
            </p>
            <div className="hero__ctas" data-rise>
              <a className="btn btn--primary" href="#connect">
                Talk to Our Team
              </a>
              <a className="btn btn--ghost" href="#library">
                Explore the IBA Library
                <span className="btn__note">free access — sign in</span>
              </a>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
