/**
 * CoinStack.jsx
 * ------------------------------------------------------------------
 * Real CSS-3D coins: two engraved faces plus a genuine cylindrical rim
 * built from N tangential strips, so the thickness is actual geometry and
 * responds correctly to every rotation instead of being faked with shadows.
 *
 * Deliberately NOT the WebGL coin in three/coin.js. That one is the home page's
 * subject and lives on the shared canvas, which only one section may hold at a
 * time; this is DOM, so the About hero can run its own piece without taking the
 * stage away from anything — and the two never contend for the same rig.
 *
 * Rim construction (the classic cylinder-side trick):
 *   rotate(a) translateY(-r) rotateX(90deg)
 *   → each strip lands on the circumference at angle a, standing along Z.
 * Strips are tiny (~40 x 24px), so 24 of them cost far less to raster than
 * a single full-size disc.
 *
 * Layering contract:
 *   .coin        → owned by the scrubbed scroll timeline (x/y/z/rotation)
 *   .coin__body  → owned by the idle float loop (independent of scroll)
 *   .coin__spec  → CSS-only shimmer sweep (zero JS per frame)
 */

import { useLayoutEffect, useMemo, useRef } from 'react'
import { gsap, reducedMotion } from '../lib/scroll'

/* ---------------------------- engraved marks ---------------------------- */
/* Each returns <g> using currentColor, so one definition renders twice:
   a white copy offset down (the lit lower lip) under a dark copy. */
const GLYPHS = {
  /* Ethereum — the canonical six-facet mark */
  eth: (
    <g fill="currentColor">
      <path d="M32 4 L32 24.2 L49 32 Z" opacity="0.75" />
      <path d="M32 4 L15 32 L32 24.2 Z" />
      <path d="M32 43.8 L32 60 L49 35.2 Z" opacity="0.75" />
      <path d="M32 60 L32 43.8 L15 35.2 Z" />
      <path d="M32 40.6 L49 32 L32 24.2 Z" opacity="0.45" />
      <path d="M15 32 L32 40.6 L32 24.2 Z" opacity="0.6" />
    </g>
  ),
  /* Bitcoin — filled outlines with even-odd counters. Built from strokes the
     two bowls overlap into a blob, so the bowls are explicit shapes here. */
  btc: (
    <g fill="currentColor" fillRule="evenodd">
      {/* ticks */}
      <path d="M26 6 h5 v9 h-5 z M34 6 h5 v9 h-5 z M26 49 h5 v9 h-5 z M34 49 h5 v9 h-5 z" />
      {/* stem — also forms the left wall of both counters */}
      <path d="M16 14 h9 v36 h-9 z" />
      {/* bowls: outer starts at x=22 so the ring closes under the stem, while
          each counter starts at x=25 and is therefore wide enough to read */}
      <path d="M22 14 H37.5 a8.5 8.5 0 0 1 0 17 H22 Z M25 19 H37.5 a3.5 3.5 0 0 1 0 7 H25 Z" />
      <path d="M22 31 H38.5 a9.5 9.5 0 0 1 0 19 H22 Z M25 36 H38.5 a4.5 4.5 0 0 1 0 9 H25 Z" />
    </g>
  ),
  /* the AXIOM ledger hex */
  axiom: (
    <g fill="currentColor" fillRule="evenodd">
      <path d="M32 5 L54 18 L54 46 L32 59 L10 46 L10 18 Z M32 15 L18 23 L18 41 L32 49 L46 41 L46 23 Z" />
      <path d="M32 26 L40 31 L40 38 L32 43 L24 38 L24 31 Z" />
    </g>
  ),
}
const GLYPH_KEYS = Object.keys(GLYPHS)

/* Key light sits upper-left, matching the face gradients. */
const LIGHT_DEG = 218

function rimStrips(count) {
  return Array.from({ length: count }, (_, i) => {
    const deg = (i / count) * 360
    const facing = Math.cos(((deg - LIGHT_DEG) * Math.PI) / 180)
    // high floor: on a black page a dark rim just reads as a hole in the coin,
    // so the shadowed side still has to sit clearly above the background
    const lum = 0.46 + 0.54 * Math.max(0, facing) ** 0.7
    return { deg, lum }
  })
}

function CoinFace({ variant, glyph }) {
  return (
    <div className={`coin__face coin__face--${variant}`}>
      <span className="coin__plate" aria-hidden="true" />
      <span className="coin__well" aria-hidden="true" />
      {glyph && (
        <>
          {/* lit lower lip, then the recess on top of it → engraved */}
          <svg viewBox="0 0 64 64" className="coin__glyph coin__glyph--lip" aria-hidden="true">
            {GLYPHS[glyph]}
          </svg>
          <svg viewBox="0 0 64 64" className="coin__glyph coin__glyph--cut" aria-hidden="true">
            {GLYPHS[glyph]}
          </svg>
        </>
      )}
      <span className="coin__bevel" aria-hidden="true" />
      <span className="coin__spec" aria-hidden="true" />
    </div>
  )
}

export default function CoinStack({ count = 10, segments = 24 }) {
  const rootRef = useRef(null)

  const strips = useMemo(() => rimStrips(segments), [segments])

  const coins = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        i,
        glyph: GLYPH_KEYS[i % GLYPH_KEYS.length],
      })),
    [count]
  )

  /* Ambient float — deliberately unsynced from the scroll timeline. */
  useLayoutEffect(() => {
    if (reducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.coin__body').forEach((body, i) => {
        gsap.to(body, {
          y: 'random(-11, 11)',
          x: 'random(-7, 7)',
          duration: 'random(3.4, 5.8)',
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: i * 0.14,
          force3D: true,
        })
      })
    }, rootRef)
    return () => ctx.revert()
  }, [count])

  return (
    <div className="coin-stack" ref={rootRef}>
      {/* ring position, side and z-index are all assigned by
          buildCoinHeroTimeline, which owns the layout maths */}
      {coins.map(({ i, glyph }) => (
        <div
          className="coin"
          key={i}
          data-index={i}
          style={{ '--shine-delay': `${(i * 0.47).toFixed(2)}s` }}
        >
          <div className="coin__body">
            {/* cylindrical edge */}
            <div className="coin__rim" style={{ '--seg': segments }} aria-hidden="true">
              {strips.map((s, k) => (
                <span
                  className="coin__seg"
                  key={k}
                  style={{ '--a': `${s.deg}deg`, '--lum': s.lum.toFixed(3) }}
                />
              ))}
            </div>

            <CoinFace variant="front" glyph={glyph} />
            <CoinFace variant="back" />
          </div>
        </div>
      ))}
    </div>
  )
}
