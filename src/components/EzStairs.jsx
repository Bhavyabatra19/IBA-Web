/**
 * The Experience Zone hero graphic: the client's infographic of four
 * ascending neon blocks (Programmes, Projects, Labs, Placements) ending in an
 * upward arrow (public/images/ez-stairs/base.png).
 *
 * The render's own arrow was drawn in perspective, sheared, its head skewed
 *, so it has been erased from the render (only where it stood clear of the
 * top block; every block pixel is the render's own) and redrawn here as
 * geometry: perfectly vertical, symmetrical about one centre line, with a
 * level arrowhead. It keeps the original's place and proportions: the same
 * tip (y 134), centre (x 1397), shaft width (137), head width (204) and head
 * height (127, the original's average), and the same depth, shown as a
 * uniform side face to the right like the blocks'. Colours are sampled from
 * the original arrow. It rises from behind the top block: the drawing is
 * clipped at the block's back edge, as the original was hidden there.
 *
 * The picture's dark pixels thin out from its middle toward its edges in the
 * file (bright ones stay solid), so the hero's red beam runs in under it,
 * without the shared round fade, which dimmed the arrow in the top-right
 * corner.
 *
 * Motion, as on the other heroes, every layer only ADDS light, so the
 * picture underneath keeps its pixels:
 *   - the whole graphic floats gently
 *   - the block edges, label borders and risers breathe, and a band of light
 *     sweeps up the steps from Programmes to Placements (lines-mask: the
 *     render's crisp bright pixels)
 *   - the particles twinkle, and motes rise up the risers
 *   - the arrow's halo breathes and a pulse of light runs up its shaft
 * The blocks themselves do not move: they are part of one flat picture.
 *
 * Coordinates are the render's pixels (1671 x 941). Styles and motion in
 * brandbook.css (.ezs). Reduced motion: still.
 */

const W = 1671
const H = 941
/** Motes rising up the risers: [x, y (render px), delay s]. */
const MOTES = [
  [108, 700, 0],
  [309, 520, 1.6],
  [549, 440, 0.8],
  [642, 400, 2.9],
  [942, 290, 2.1],
  [1266, 140, 3.6],
  [1538, 450, 1.2],
  [413, 720, 4.2],
]

const CX = 1397 // the centre line
const TIP = 134 // the tip's height
const HEAD = 261 // the arrowhead's level base
const BASE = 606 // the shaft's foot, behind the block
const HH = 102 // half the arrowhead's width
const SH = 68.5 // half the shaft's width
const DX = 33 // the depth: the side face's offset, as in the original
const DY = -13

/* the front face: one outline, symmetric about CX */
const FRONT = [
  [CX, TIP],
  [CX + HH, HEAD],
  [CX + SH, HEAD],
  [CX + SH, BASE],
  [CX - SH, BASE],
  [CX - SH, HEAD],
  [CX - HH, HEAD],
]
/* the side faces, seen to the right: the head's sloped top, then the shaft */
const HEAD_SIDE = [
  [CX, TIP],
  [CX + DX, TIP + DY],
  [CX + HH + DX, HEAD + DY],
  [CX + HH, HEAD],
]
const SHAFT_SIDE = [
  [CX + SH, HEAD],
  [CX + SH + DX, HEAD + DY],
  [CX + SH + DX, BASE + DY],
  [CX + SH, BASE],
]
const pts = (p) => p.map(([x, y]) => `${x},${y}`).join(' ')

/* everything but the top block: above its back edge (y 360 at x 1329,
   falling 0.357 per px), and right of its right edge (x 1468) */
const CLIP = pts([
  [1150, 0],
  [1671, 0],
  [1671, 941],
  [1468, 941],
  [1468, 409.7],
  [1329, 360],
  [1150, 296.1],
])

export default function EzStairs() {
  return (
    <figure className="rc-hero-img ezs">
      <div className="ezs__stack">
        <img
          src="/images/ez-stairs/base.png"
          alt="Four ascending glowing blocks labelled Programmes, Projects, Labs and Placements, rising to an upward arrow"
          width="1671"
          height="941"
          decoding="async"
        />

        {/* the neon lines: breathing, a band sweeping up the steps, and the
            particles twinkling */}
        <div className="ezs__lines" aria-hidden="true">
          <span className="ezs__fill" />
          <span className="ezs__band" />
          <span className="ezs__twinkle" />
        </div>
        {MOTES.map(([x, y, delay], i) => (
          <span
            key={i}
            className="ezs__mote"
            aria-hidden="true"
            style={{
              left: `${((x / W) * 100).toFixed(3)}%`,
              top: `${((y / H) * 100).toFixed(3)}%`,
              animationDelay: `${delay}s`,
            }}
          />
        ))}

        <svg className="ezs__arrow" viewBox="0 0 1671 941" aria-hidden="true">
          <defs>
            <clipPath id="ezs-clip">
              <polygon points={CLIP} />
            </clipPath>
            <linearGradient id="ezs-front" x1="0" y1={TIP} x2="0" y2={BASE} gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="rgb(225,16,20)" />
              <stop offset="0.35" stopColor="rgb(185,6,10)" />
              <stop offset="1" stopColor="rgb(150,3,6)" />
            </linearGradient>
            <linearGradient id="ezs-head-side" x1={CX} y1={TIP} x2={CX + HH + DX} y2={HEAD} gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="rgb(240,110,104)" />
              <stop offset="1" stopColor="rgb(220,62,58)" />
            </linearGradient>
            <linearGradient id="ezs-shaft-side" x1="0" y1={HEAD} x2="0" y2={BASE} gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="rgb(228,10,9)" />
              <stop offset="1" stopColor="rgb(242,24,22)" />
            </linearGradient>
            {/* the dotted texture the blocks and the original arrow carry */}
            <pattern id="ezs-dots" width="9" height="9" patternUnits="userSpaceOnUse">
              <circle cx="4.5" cy="4.5" r="1" fill="rgba(255,150,150,0.32)" />
            </pattern>
            <clipPath id="ezs-front-clip">
              <polygon points={pts(FRONT)} />
            </clipPath>
            {/* the pulse that runs up the shaft: a soft band of light */}
            <linearGradient id="ezs-pulse" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="rgb(255,200,195)" stopOpacity="0" />
              <stop offset="0.5" stopColor="rgb(255,200,195)" stopOpacity="0.55" />
              <stop offset="1" stopColor="rgb(255,200,195)" stopOpacity="0" />
            </linearGradient>
            <filter id="ezs-blur-lg" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="16" />
            </filter>
            <filter id="ezs-blur-sm" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>

          <g clipPath="url(#ezs-clip)">
            {/* the halo round the whole arrow */}
            <g className="ezs__halo" filter="url(#ezs-blur-lg)">
              <polygon points={pts(FRONT)} fill="rgb(255,30,30)" />
              <polygon points={pts(HEAD_SIDE)} fill="rgb(255,30,30)" />
              <polygon points={pts(SHAFT_SIDE)} fill="rgb(255,30,30)" />
            </g>

            {/* the faces, back to front */}
            <polygon points={pts(SHAFT_SIDE)} fill="url(#ezs-shaft-side)" />
            <polygon points={pts(SHAFT_SIDE)} fill="url(#ezs-dots)" />
            <polygon points={pts(HEAD_SIDE)} fill="url(#ezs-head-side)" />
            <polygon points={pts(FRONT)} fill="url(#ezs-front)" />
            <polygon points={pts(FRONT)} fill="url(#ezs-dots)" />
            <g clipPath="url(#ezs-front-clip)">
              <rect
                className="ezs__pulse"
                x={CX - HH}
                y={BASE - 60}
                width={HH * 2}
                height="120"
                fill="url(#ezs-pulse)"
              />
            </g>

            {/* neon edges: a soft glow under a crisp line */}
            <g className="ezs__edge-glow" filter="url(#ezs-blur-sm)" fill="none" stroke="rgb(255,70,70)" strokeWidth="7" strokeLinejoin="round">
              <polygon points={pts(FRONT)} />
              <polyline points={pts(HEAD_SIDE.slice(1, 3))} />
              <polyline points={pts(SHAFT_SIDE.slice(1, 3))} />
            </g>
            <g fill="none" stroke="rgb(255,190,185)" strokeWidth="2.2" strokeLinejoin="round">
              <polygon points={pts(FRONT)} />
              <polyline points={pts([HEAD_SIDE[0], HEAD_SIDE[1], HEAD_SIDE[2], HEAD_SIDE[3]])} />
              <polyline points={pts(SHAFT_SIDE.slice(1, 3))} />
            </g>
          </g>
        </svg>
      </div>
    </figure>
  )
}
