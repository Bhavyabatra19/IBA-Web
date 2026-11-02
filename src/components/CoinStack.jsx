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

/**
 * The home hero's coins: one real-world asset class each, as in IBA's
 * tokenized-assets artwork — a raised mark on the face and its name around
 * the lower rim. Same 64 × 64 grid and currentColor contract as GLYPHS.
 */
export const ASSET_FACES = [
  {
    key: 'gold',
    label: 'Gold',
    mark: (
      <g fill="currentColor">
        <path d="M6 50 L11 40 H29 L34 50 Z" />
        <path d="M30 50 L35 40 H53 L58 50 Z" />
        <path d="M18 38 L23 28 H41 L46 38 Z" />
      </g>
    ),
  },
  {
    key: 'estate',
    label: 'Real Estate',
    mark: (
      <g fill="currentColor" fillRule="evenodd">
        <path d="M14 8 H36 V56 H14 Z M18 13 h4 v4 h-4 z M28 13 h4 v4 h-4 z M18 21 h4 v4 h-4 z M28 21 h4 v4 h-4 z M18 29 h4 v4 h-4 z M28 29 h4 v4 h-4 z M18 37 h4 v4 h-4 z M28 37 h4 v4 h-4 z M22 46 h6 v10 h-6 z" />
        <path d="M38 24 H52 V56 H38 Z M41 28 h3 v4 h-3 z M47 28 h3 v4 h-3 z M41 36 h3 v4 h-3 z M47 36 h3 v4 h-3 z M41 44 h3 v4 h-3 z M47 44 h3 v4 h-3 z" />
      </g>
    ),
  },
  {
    key: 'carbon',
    label: 'Carbon Credits',
    mark: (
      <g fill="currentColor">
        <path d="M31 52 C15 48 11 28 18 14 C28 20 34 36 31 52 Z" />
        <path d="M33 52 C49 48 54 30 47 17 C37 23 31 37 33 52 Z" />
        <path d="M31 50 h2 v8 h-2 z" />
      </g>
    ),
  },
  {
    key: 'bonds',
    label: 'Bonds & Debt',
    mark: (
      <g fill="currentColor" fillRule="evenodd">
        <path d="M14 6 H40 L50 16 V48 H40 V58 H14 Z M20 16 h18 v3 h-18 z M20 24 h24 v3 h-24 z M20 32 h24 v3 h-24 z M20 40 h14 v3 h-14 z" />
        <circle cx="45" cy="47" r="7" />
        <path d="M41 52 L39 62 L45 58 L51 62 L49 52 Z" />
      </g>
    ),
  },
  {
    key: 'commodities',
    label: 'Commodities',
    mark: (
      <g fill="currentColor" fillRule="evenodd">
        <path d="M6 18 L12 14 H58 V46 L52 50 H6 Z M12 21 h2 v24 h-2 z M18 21 h2 v24 h-2 z M24 21 h2 v24 h-2 z M30 21 h2 v24 h-2 z M36 21 h2 v24 h-2 z M42 21 h2 v24 h-2 z M48 21 h2 v24 h-2 z" />
      </g>
    ),
  },
  {
    key: 'infrastructure',
    label: 'Infrastructure',
    mark: (
      <g fill="currentColor">
        <path d="M4 40 H60 V44 H4 Z" />
        <path d="M16 14 h4 v38 h-4 z M44 14 h4 v38 h-4 z" />
        <path d="M4 40 Q11 22 18 15 Q32 34 46 15 Q53 22 60 40" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <path d="M24 40 V27 M32 40 V31 M40 40 V27 M9 40 V30 M55 40 V30" stroke="currentColor" strokeWidth="1.6" />
      </g>
    ),
  },
  {
    key: 'agriculture',
    label: 'Agriculture',
    mark: (
      <g fill="currentColor">
        <path d="M31 22 h2 v38 h-2 z" />
        <ellipse cx="32" cy="10" rx="3.5" ry="6" />
        <ellipse cx="26" cy="20" rx="3.5" ry="6.5" transform="rotate(-35 26 20)" />
        <ellipse cx="38" cy="20" rx="3.5" ry="6.5" transform="rotate(35 38 20)" />
        <ellipse cx="26" cy="31" rx="3.5" ry="6.5" transform="rotate(-35 26 31)" />
        <ellipse cx="38" cy="31" rx="3.5" ry="6.5" transform="rotate(35 38 31)" />
        <ellipse cx="26" cy="42" rx="3.5" ry="6.5" transform="rotate(-35 26 42)" />
        <ellipse cx="38" cy="42" rx="3.5" ry="6.5" transform="rotate(35 38 42)" />
      </g>
    ),
  },
  {
    key: 'green',
    label: 'Green Assets',
    mark: (
      <g fill="currentColor" fillRule="evenodd">
        <path d="M4 56 L12 36 H34 L28 56 Z M10 52 L12 47 H18 L16 52 Z M20 52 L22 47 H28 L26 52 Z M14 43 L16 39 H22 L20 43 Z M24 43 L26 39 H31 L30 43 Z" />
        <path d="M45 22 h2 v36 h-2 z" />
        <circle cx="46" cy="20" r="3" />
        <path d="M46 20 L44 4 L48 4 Z M46 20 L61 26 L59 29 Z M46 20 L33 30 L31 27 Z" />
      </g>
    ),
  },
]

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

function CoinFace({ variant, glyph, asset }) {
  const mark = asset ? asset.mark : glyph && GLYPHS[glyph]
  return (
    <div className={`coin__face coin__face--${variant}`}>
      <span className="coin__plate" aria-hidden="true" />
      <span className="coin__well" aria-hidden="true" />
      {mark && (
        <>
          {/* lit lower lip, then the recess on top of it → engraved */}
          <svg viewBox="0 0 64 64" className="coin__glyph coin__glyph--lip" aria-hidden="true">
            {mark}
          </svg>
          <svg viewBox="0 0 64 64" className="coin__glyph coin__glyph--cut" aria-hidden="true">
            {mark}
          </svg>
        </>
      )}
      {asset && (
        /* the asset's name, set round the lower rim and read left to right */
        <svg viewBox="0 0 100 100" className="coin__label" aria-hidden="true">
          {/* the dark band the name is set in, as on the artwork */}
          <circle className="coin__band" cx="50" cy="50" r="41.5" />
          <path id={`coin-arc-${asset.key}`} d="M6.5 50 A43.5 43.5 0 0 0 93.5 50" fill="none" />
          <text>
            <textPath href={`#coin-arc-${asset.key}`} startOffset="50%" textAnchor="middle">
              {asset.label.toUpperCase()}
            </textPath>
          </text>
        </svg>
      )}
      <span className="coin__bevel" aria-hidden="true" />
      <span className="coin__spec" aria-hidden="true" />
    </div>
  )
}

/**
 * @param rim  'strips' — the faceted cylinder above, true to any angle.
 *             'discs'  — `segments` round discs stacked through the thickness.
 *             Every disc is a circle, so the silhouette stays perfectly round
 *             at any tilt; it only reads as layers near edge-on (90°), which a
 *             coin that tumbles but never turns side-on does not reach. Fewer
 *             3D layers than strips, too, so it is the cheaper choice for
 *             coins that move every frame.
 */
/**
 * @param faces  optional list of faces ({ key, label, mark }, e.g. ASSET_FACES)
 *               to strike the coins with, in turn, in place of the crypto marks.
 */
export default function CoinStack({ count = 10, segments = 24, float = true, rim = 'strips', faces }) {
  const rootRef = useRef(null)

  const strips = useMemo(() => (rim === 'strips' ? rimStrips(segments) : []), [rim, segments])
  /* disc depths from back face to front face, as fractions of the thickness */
  const discs = useMemo(
    () =>
      rim === 'discs'
        ? Array.from({ length: segments }, (_, k) => (k + 0.5) / segments - 0.5)
        : [],
    [rim, segments]
  )

  const coins = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        i,
        glyph: GLYPH_KEYS[i % GLYPH_KEYS.length],
        asset: faces && faces[i % faces.length],
      })),
    [count, faces]
  )

  /* Ambient float — deliberately unsynced from the scroll timeline. Off when
     the owner already moves every coin each frame (the home hero's wheel):
     a second transform per coin there is only extra work. */
  useLayoutEffect(() => {
    if (!float || reducedMotion()) return
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
  }, [count, float])

  return (
    <div className="coin-stack" ref={rootRef}>
      {/* ring position, side and z-index are all assigned by
          buildCoinHeroTimeline, which owns the layout maths */}
      {coins.map(({ i, glyph, asset }) => (
        <div
          className={asset ? 'coin coin--asset' : 'coin'}
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
              {discs.map((d, k) => (
                <span className="coin__disc" key={k} style={{ '--d': d.toFixed(4) }} />
              ))}
            </div>

            <CoinFace variant="front" glyph={glyph} asset={asset} />
            <CoinFace variant="back" />
          </div>
        </div>
      ))}
    </div>
  )
}
