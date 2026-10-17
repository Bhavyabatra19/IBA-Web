/**
 * 2.1 — Hero. Black band crossed by a single red light beam.
 *
 * No pin, no scrub. Under the copy, silver coins travel an arch across the
 * bottom of the panel, tumbling as they go; the second half of the headline
 * rolls through the alliance's claims. Both run only while on screen.
 */

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap, reducedMotion, whileOnScreen, isMobile } from '../lib/scroll'
import CoinStack from '../components/CoinStack'

const PHRASES = [
  'largest tokenized ecosystem',
  'most comprehensive Web3 ecosystem',
  'largest globalised think tank',
]

/** How long a phrase holds before the next one rolls in. */
const DWELL = 3200

/** Seconds for one coin to travel the whole arch, edge to edge. */
const TRAVEL = 16

/**
 * The arch, measured on resize (never per frame — a layout read after the
 * transform writes would force a style recalc every frame).
 *
 * It is the top of a large wheel whose centre sits below the panel, as in
 * the reference: coins rise out of the bottom-left edge, crest under the
 * copy, and sink out of the bottom-right. Solved from two numbers:
 *   A — how high the crest rises above the panel's bottom edge: up to
 *       the button row at the foot of the copy block;
 *   W — the arch's half-width where it meets the bottom edge.
 * For a circle through those three points, R − c = A and R² − c² = W², so
 * R + c = W² / A — which gives the radius R and the centre's depth c.
 */
function measureArch(el, coins) {
  const w = el.clientWidth
  const h = el.clientHeight
  const coin = coins[0]?.offsetWidth || 110
  const block = el.parentElement.querySelector('.hero__bottom')
  const top = block
    ? block.getBoundingClientRect().bottom - el.getBoundingClientRect().top
    : h * 0.6
  /* The coins stay strictly below the button at every width (by request):
     the highest coin's centre sits 0.6 of a coin (its reach when tilted)
     plus 24px under the button row's bottom edge, so no coin ever touches
     the button or the copy above it. */
  const crest = top + coin * 0.6 + 24
  /* never let the arch rise above that crest, even if the panel is short */
  const A = Math.max(1, h - crest)
  const W = w * (w < 860 ? 0.44 : 0.36)
  const R = (W * W) / A / 2 + A / 2
  const c = R - A
  // run each coin until it is wholly below the bottom edge, so the wrap from
  // the right end back to the left is never seen
  const phiMax = Math.acos(Math.max(-1, Math.min(1, (c - coin * 0.6) / R)))
  return { w, h, R, c, phiMax }
}

/** Puts every coin on the arch for time t (seconds). */
function placeCoins(coins, g, t) {
  const n = coins.length
  for (let i = 0; i < n; i++) {
    const el = coins[i]
    // evenly spaced along the arch, all moving left → right over the crest
    const u = (i / n + t / TRAVEL) % 1
    const phi = -g.phiMax + u * 2 * g.phiMax
    // offsets from the panel centre, where every .coin starts
    const x = g.R * Math.sin(phi)
    const y = g.h / 2 + g.c - g.R * Math.cos(phi)
    /* Each coin leans along the arch and tumbles on its own phase, like
       coins tossed in a row — never fully side-on, so the face always shows. */
    const rz = (phi * 180) / Math.PI * 0.6 + Math.sin(t * 0.9 + i) * 12
    const ry = Math.sin(t * 1.3 + i * 1.7) * 62
    const rx = 28 + Math.sin(t * 1.05 + i * 2.3) * 26
    /* Written straight to style rather than through gsap.set: this runs for
       every coin on every frame, and a pre-built string skips GSAP's parsing
       and caching. Same order GSAP uses — translate, Z, Y, X. */
    el.style.transform =
      `translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,0)` +
      ` rotate(${rz.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)` +
      ` rotateX(${rx.toFixed(2)}deg)`
  }
}

export default function Hero() {
  const roller = useRef(null)
  const orbit = useRef(null)
  const [at, setAt] = useState(0)
  const [coinCount] = useState(() => (isMobile() ? 6 : 9))

  /* the coin arch — on the GSAP ticker, which already drives Lenis */
  useEffect(() => {
    const el = orbit.current
    if (!el) return
    const coins = gsap.utils.toArray('.coin', el)
    let t = 0
    let g = measureArch(el, coins)

    const ro = new ResizeObserver(() => {
      g = measureArch(el, coins)
      placeCoins(coins, g, t)
    })
    ro.observe(el)
    // the crest is placed off the copy block's bottom edge, so a change in
    // the copy (web fonts landing, a re-wrap) has to re-solve the arch too
    const block = el.parentElement.querySelector('.hero__bottom')
    if (block) ro.observe(block)
    placeCoins(coins, g, t)

    /* reduced motion: the arch is drawn once, standing still */
    if (reducedMotion()) return () => ro.disconnect()

    const tick = (_time, delta) => {
      // delta, not absolute time, so a pause offscreen resumes where it stopped
      t += Math.min(delta, 100) / 1000
      placeCoins(coins, g, t)
    }
    const release = whileOnScreen(
      el,
      () => gsap.ticker.add(tick),
      () => gsap.ticker.remove(tick)
    )
    return () => {
      release()
      gsap.ticker.remove(tick)
      ro.disconnect()
    }
  }, [coinCount])

  useEffect(() => {
    const el = roller.current
    if (!el || reducedMotion()) return
    let timer = 0
    const start = () => {
      clearInterval(timer)
      timer = setInterval(() => setAt((i) => (i + 1) % PHRASES.length), DWELL)
    }
    const release = whileOnScreen(el, start, () => clearInterval(timer))
    return () => {
      release()
      clearInterval(timer)
    }
  }, [])

  /* The window takes the height of the phrase on show, so a one-line phrase
     pulls the copy below up instead of leaving the longest phrase's gap.
     The space it gives up is handed to the bottom of the copy block, so the
     block's total height never changes: it can be centred in the hero (and in
     the coin wheel) without the headline drifting as phrases roll. Re-measured
     on resize, since the line breaks move with the width. */
  useLayoutEffect(() => {
    const el = roller.current
    if (!el) return
    const block = el.closest('.hero__bottom')
    const fit = () => {
      const phrase = el.children[at]
      if (!phrase) return
      const tallest = Math.max(...Array.from(el.children, (c) => c.offsetHeight))
      el.style.height = `${phrase.offsetHeight}px`
      if (block) block.style.paddingBottom = `${tallest - phrase.offsetHeight}px`
    }
    fit()
    /* Watch the phrases themselves, not just the heading: the window has a
       fixed inline height, so when the web font lands and the glyphs grow,
       the heading does not resize — only the phrases do. Measuring once at
       mount left the window sized to the fallback font, cutting descenders. */
    const ro = new ResizeObserver(fit)
    ro.observe(el.parentElement)
    Array.from(el.children).forEach((c) => ro.observe(c))
    document.fonts?.ready.then(fit)
    return () => ro.disconnect()
  }, [at])

  const prev = (at - 1 + PHRASES.length) % PHRASES.length

  return (
    <section className="hero band band--dark" id="hero">
      <div className="hero__beam" aria-hidden="true" />
      <div className="hero__orbit" ref={orbit} aria-hidden="true">
        {/* The edge is stacked round discs, not strips: strips are flat
            facets, and few enough of them to run smoothly made the edge a
            visible polygon. Discs are round at every tilt, and fewer layers. */}
        <CoinStack count={coinCount} segments={8} rim="discs" float={false} />
      </div>

      <div className="hero__inner wrap">
        <div className="hero__bottom">
          <p className="hero__kicker">
            {/* a block — the chain's unit, and the shape of the IBA mark */}
            <svg className="hero__kicker-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2.5 20.5 7v10L12 21.5 3.5 17V7L12 2.5Z" />
              <path d="M3.5 7 12 11.5 20.5 7M12 11.5v10" />
            </svg>
            One Alliance. Infinite Possibilities.
          </p>

          <h1 className="hero__title">
            <span className="hero__lead">Building the world’s</span>
            {/* one sentence for assistive tech, not every variant in turn */}
            <span className="sr-only">{PHRASES[0]}</span>
            {/* every phrase shares one grid cell; the window's height follows
                the phrase on show (see the layout effect above) */}
            <span className="hero__roller" ref={roller} aria-hidden="true">
              {PHRASES.map((p, i) => (
                <span
                  key={p}
                  className={`hero__phrase${i === at ? ' is-in' : i === prev ? ' is-out' : ''}`}
                >
                  {p}
                </span>
              ))}
            </span>
          </h1>

          <p className="lede hero__lede">
            India Blockchain Alliance is a premier global blockchain community and
            advocacy group advancing the development, adoption and implementation of
            blockchain across sectors, with a sharp focus on establishing the global
            Web3 Corridor network.
          </p>

          <div className="hero__ctas">
            <a className="btn btn--ghost" href="/ecosystem#people">
              Explore Memberships
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
