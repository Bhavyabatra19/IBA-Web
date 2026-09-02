/**
 * 3.1 — About hero. Dark band.
 *
 * The pinned coin-door piece. The page's own words carry it: the opening
 * statement sits in the ring's hole and dissolves as the halves part, the claim
 * the page is built on — "we are not a vendor, we are an alliance" — is what
 * the open doors reveal, and the halves then interlock into the mark.
 *
 * The choreography itself lives in lib/coinHero.js.
 *
 * Note this section does NOT claim the shared WebGL stage. It is CSS-3D, so it
 * costs the About page nothing on the canvas the home page's evolution owns.
 */

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap, reducedMotion, isCoarse, buildCounters, CLIP_FROM } from '../lib/scroll'
import { buildCoinHeroTimeline, resolveCoinHero } from '../lib/coinHero'
import CoinStack from '../components/CoinStack'
import IbaMark from '../components/IbaMark'
import { CRED_STATS } from '../content'

export default function AboutHero() {
  const root = useRef(null)
  const tiltRef = useRef(null)
  /* Coin count stays even so the split takes exact halves. Rim segment count
     drops on mobile — that's where the strip elements actually cost something. */
  const profile = () => (window.innerWidth < 760 ? { coins: 8, segments: 14 } : { coins: 10, segments: 24 })
  const [{ coins: coinCount, segments }, setProfile] = useState(profile)

  useEffect(() => {
    const onResize = () => {
      const next = profile()
      setProfile((prev) => (prev.coins === next.coins ? prev : next))
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  /* scroll choreography */
  useLayoutEffect(() => {
    const el = root.current
    const ctx = gsap.context(() => {
      /* ---- reduced motion: no pin, no scrub, one resolved state ---- */
      if (reducedMotion()) {
        resolveCoinHero(el)
        gsap.set('[data-rise]', { opacity: 1, y: 0 })
        gsap.set('[data-clip] .line__inner', { yPercent: 0, y: 0 })
        return
      }

      buildCoinHeroTimeline(el)

      /* The strip is on screen from the first frame, so it counts on mount
         rather than on a trigger — held back until the copy around it has
         started arriving. */
      buildCounters(el, { immediate: true, delay: 0.55 })

      /* ---- one-shot intro ----
         The yPercent start has to be restated in JS: it is declared in CSS as a
         percentage, and getComputedStyle resolves percentages to pixels, so
         GSAP would read yPercent as already 0 and the tween would do nothing. */
      gsap.set('[data-clip] .line__inner', { yPercent: CLIP_FROM, y: 0 })
      gsap
        .timeline({ delay: 0.2, defaults: { ease: 'expo.out' } })
        .to('[data-clip] .line__inner', { yPercent: 0, duration: 1.35, stagger: 0.11 }, 0)
        .to('[data-rise]', { opacity: 1, y: 0, duration: 1.05, stagger: 0.09 }, 0.3)
        .from(
          '.coin',
          { opacity: 0, scale: 0.72, duration: 1.5, stagger: { each: 0.07, from: 'center' } },
          0
        )
    }, root)
    return () => ctx.revert()
  }, [coinCount])

  /* subtle pointer parallax on the whole stage — quickTo keeps it off the GC */
  useEffect(() => {
    const el = tiltRef.current
    if (!el || reducedMotion() || isCoarse()) return

    const rotY = gsap.quickTo(el, 'rotationY', { duration: 0.9, ease: 'power3.out' })
    const rotX = gsap.quickTo(el, 'rotationX', { duration: 0.9, ease: 'power3.out' })

    const onMove = (e) => {
      const nx = e.clientX / window.innerWidth - 0.5
      const ny = e.clientY / window.innerHeight - 0.5
      rotY(nx * 9)
      rotX(-ny * 7)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <section className="chero band band--dark" ref={root} id="who-we-are">
      {/* ---------- ambient background ----------
          The glow and the grid are on the scroll timeline (see coinHero.js) and
          are left exactly as they were. What is new is the air around them: the
          same lit top and bottom, and the same outlined word, that the section
          landing heroes carry — so /about opens in the same room they do.

          The word is last, so the vignette does not paint over it: the top of
          that gradient is nearly opaque black, which is where the word is. It
          still sits under the stage and the copy, which are z-indexed above. */}
      <div className="chero__bg" aria-hidden="true">
        <div className="chero__glow" />
        <div className="chero__grid" />
        <div className="chero__vignette" />
        <span className="chero__ghost display">Alliance</span>
      </div>

      {/* ---------- scene 3 typography (revealed between the doors) ----------
          The claim, unchanged — the em-dash that joined its two halves is now
          the break between the statement and what backs it up. */}
      <div className="chero__reveal">
        <p className="chero__reveal-item eyebrow">The Alliance</p>
        <h2 className="chero__reveal-item chero__reveal-title display">
          We are not a vendor.
          <br />
          We are an <em>alliance</em>.
        </h2>
        <p className="chero__reveal-item chero__reveal-body">
          A network of members, advisors, institutions, regulators and builders
          who move together.
        </p>
      </div>

      {/* ---------- the stage ---------- */}
      <div className="chero__stage" aria-hidden="true">
        <div className="chero__tilt" ref={tiltRef}>
          {/* The bloom alone lights the gap. There was a hard red-and-white
              line down the centre of it; the glow carries the same beat
              without drawing a rule across the hero. */}
          <div className="chero__core-bloom" />

          <CoinStack count={coinCount} segments={segments} />

          <div className="chero__emblem-glow" />
          {/* the coins interlock and resolve into the brand mark */}
          <div className="chero__emblem">
            <IbaMark className="ibamark--chero" />
          </div>
        </div>
      </div>

      {/* ---------- headline ---------- */}
      <div className="chero__copy">
        <p className="eyebrow chero__kicker" data-rise>
          About
        </p>
        <h1 className="chero__title display" data-clip>
          <span className="line">
            <span className="line__inner">We Shape the Future</span>
          </span>
          <span className="line">
            <span className="line__inner">
              of <em>Virtual Assets</em>
            </span>
          </span>
        </h1>
        <div className="chero__lede">
          <p data-rise>
            India Blockchain Alliance (IBA) is a premier global blockchain community and
            advocacy group dedicated to advancing the development, adoption and
            implementation of blockchain technology across diverse sectors.
          </p>
          <p data-rise>
            Founded by visionary leaders and industry experts, IBA serves as a unifying
            force to drive innovation, collaboration and education in the blockchain
            space, with a sharp focus on the Asia and MENA regions.
          </p>
        </div>

        {/* The four numbers, inline. They are the evidence for the paragraph
            above them, so they belong in the same block of copy rather than in
            a bar underneath — which is where they used to be, as a repeat of
            the home page's strip. */}
        <ul className="chero__stats" data-rise>
          {CRED_STATS.map((s) => (
            <li key={s.label}>
              {s.lead && <span className="chero__statLead">{s.lead}</span>}
              {/* the final value is in the markup, so it is correct before the
                  counter runs — and stays correct if it never does */}
              <span className="chero__statK" data-count={s.to} data-suffix={s.suffix}>
                {s.to}
                {s.suffix}
              </span>
              <span className="chero__statV">{s.label}</span>
            </li>
          ))}
        </ul>

      </div>
    </section>
  )
}
