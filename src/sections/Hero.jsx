/**
 * 2.1 — Hero. Black band crossed by a single red light beam.
 *
 * No pin, no scrub. Under the copy, glass coins travel an arch across the
 * bottom of the panel, tumbling as they go; the second half of the headline
 * rolls through the alliance's claims. Both run only while on screen.
 */

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap, reducedMotion, whileOnScreen, isMobile } from '../lib/scroll'
import { Go } from './service/ServiceBlocks'

/**
 * The coins: the client's eight real-world-asset coins, from their own
 * transparent render (public/images/hero-rwa-coins), left to right as they sat
 * in it. Each is that render's pixels — colour and alpha — split apart where
 * the coins touched; nothing else was changed. Agriculture and Green Assets
 * overlapped at one point of their rims, so Green Assets (in front) keeps its
 * whole rim and Agriculture loses only the few pixels of it that lay behind. The
 * outline is the coin's metal plus an ellipse fitted to it, so the dark lower
 * rim, which is near the background's colour, is not lost. `w`/`h` are each
 * image's pixel size and `d` its coin's diameter in those pixels; every coin
 * is scaled so that diameter is one --coin, so all of them are the same size.
 * (The earlier glass crypto coins are kept in public/images/hero-coins.)
 */
const COINS = [
  { src: 'coin-1.png', w: 324, h: 287, d: 301 }, // Gold
  { src: 'coin-2.png', w: 304, h: 282, d: 291 }, // Real Estate
  { src: 'coin-3.png', w: 298, h: 279, d: 288 }, // Carbon Credits
  { src: 'coin-4.png', w: 301, h: 268, d: 279 }, // Bonds & Debt
  { src: 'coin-5.png', w: 280, h: 278, d: 269 }, // Commodities
  { src: 'coin-6.png', w: 307, h: 273, d: 279 }, // Infrastructure
  { src: 'coin-7.png', w: 299, h: 259, d: 274 }, // Agriculture (d before its overlap trim)
  { src: 'coin-8.png', w: 287, h: 285, d: 282 }, // Green Assets
]
/** On a phone, six of the eight, as before (the arch is shorter there). */
const PHONE_COINS = COINS.slice(1, 7)

const PHRASES = [
  'most comprehensive Web3 ecosystem',
  'global tokenized economy',
  'premier global think tank',
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
  /* every coin's diameter is one --coin; each image adds its glow around that,
     so the diameter is read back from an image's width and its --cw */
  const cw = coins[0] ? parseFloat(coins[0].style.getPropertyValue('--cw')) : 0
  const coin = (cw && coins[0].offsetWidth / cw) || 110
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
    // offsets from the panel centre, where every .hero__coin starts
    const x = g.R * Math.sin(phi)
    const y = g.h / 2 + g.c - g.R * Math.cos(phi)
    /* Each coin leans along the arch and tumbles on its own phase, like
       coins tossed in a row. The coins are flat images whose tilt is already
       in their pixels, so the tumble swings either side of that pose rather
       than adding a base tilt, and stays small enough that the flat image
       never turns far enough to give itself away. These asset coins are
       already drawn at an angle, with their depth in the pixels; a wide turn
       squashed them flat (by request: they "don't look 3D"), so the turn is
       kept to a few degrees and the lean along the arch is gentler. */
    const rz = (phi * 180) / Math.PI * 0.35 + Math.sin(t * 0.9 + i) * 6
    const ry = Math.sin(t * 1.3 + i * 1.7) * 12
    const rx = Math.sin(t * 1.05 + i * 2.3) * 6
    /* Written straight to style rather than through gsap.set: this runs for
       every coin on every frame, and a pre-built string skips GSAP's parsing
       and caching. Same order GSAP uses — translate, Z, Y, X — after a
       per-coin perspective, so each turns about its own centre. */
    el.style.transform =
      `perspective(1200px) translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,0)` +
      ` rotate(${rz.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)` +
      ` rotateX(${rx.toFixed(2)}deg)`
  }
}

export default function Hero() {
  const roller = useRef(null)
  const orbit = useRef(null)
  const [at, setAt] = useState(0)
  const [coins] = useState(() => (isMobile() ? PHONE_COINS : COINS))

  /* the coin arch — on the GSAP ticker, which already drives Lenis */
  useEffect(() => {
    const el = orbit.current
    if (!el) return
    const coins = gsap.utils.toArray('.hero__coin', el)
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
  }, [coins])

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

  /* The window is always as tall as the tallest phrase, so the copy below
     never moves as phrases roll (by request: it used to take each phrase's
     own height, and the paragraph and button jumped whenever a two-line
     phrase came in). On a wide screen every phrase is one line (see the
     stylesheet), so there is no gap; on a phone a short phrase leaves the
     longest one's space. Re-measured on resize, since line breaks move with
     the width. */
  useLayoutEffect(() => {
    const el = roller.current
    if (!el) return
    const block = el.closest('.hero__bottom')
    const fit = () => {
      if (!el.children.length) return
      const tallest = Math.max(...Array.from(el.children, (c) => c.offsetHeight))
      el.style.height = `${tallest}px`
      if (block) block.style.paddingBottom = '0px'
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
        {/* sized in --coin units, width and height both, so the arch can be
            measured before the images have loaded */}
        {coins.map((c) => (
          <img
            key={c.src}
            className="hero__coin"
            src={`/images/hero-rwa-coins/${c.src}`}
            alt=""
            draggable="false"
            decoding="async"
            style={{ '--cw': c.w / c.d, '--ch': c.h / c.d }}
          />
        ))}
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
            {/* the heading's one sentence, for search engines and assistive
                tech alike: "Building the world's most comprehensive Web3
                ecosystem". The rotating phrases are drawn from data-text by
                CSS, so they are not text in the H1 (content review, 11-05) */}
            {' '}
            <span className="sr-only">{PHRASES[0]}</span>
            {/* every phrase shares one grid cell; the window's height follows
                the phrase on show (see the layout effect above) */}
            <span className="hero__roller" ref={roller} aria-hidden="true">
              {PHRASES.map((p, i) => (
                <span
                  key={p}
                  data-text={p}
                  className={`hero__phrase${i === at ? ' is-in' : i === prev ? ' is-out' : ''}`}
                />
              ))}
            </span>
          </h1>

          <p className="lede hero__lede">
            India Blockchain Alliance is a premier global blockchain community and
            advocacy group advancing the development, adoption and implementation of
            blockchain across sectors, with a sharp focus on establishing the global
            Web3 Corridor network.
          </p>

          {/* two actions above the fold (content review, Raj): membership,
              and a conversation with the team */}
          <div className="hero__ctas">
            <Go className="btn btn--primary" href="/library#membership">
              Become a Member
            </Go>
            <a className="btn btn--ghost" href="/connect" data-enquiry="">
              Talk to Our Team
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
