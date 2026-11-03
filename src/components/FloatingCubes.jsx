/**
 * Floating cubes — the About hero's graphic: the client's render of glowing
 * brushed-metal cubes adrift on black, one of them lit red.
 *
 * The cubes are cut straight out of that one flat render
 * (public/images/about-blocks), so they are its pixels, not a rebuild. Outside
 * each cube's opaque body its black was turned into transparency, so on the
 * hero's black a cube and its glow look as they did in the render. Each sits
 * where it sat in the render (the box is the render's shape), floats on its
 * own clock and sways a little. Being pictures, they cannot turn in 3D.
 * Styles and motion in brandbook.css (.fc). Reduced motion: still.
 */

/** The render's size, in px; every block is placed as a share of it. */
const SRC_W = 1149
const SRC_H = 1366

const BLOCKS = [
  // [file, x, y, w, h (render px), float s, sway s, delay s]
  // back to front: the top cube sits behind the large one
  ['block-2.png', 89, 0, 438, 391, 7, 16, -2], // top
  ['block-1.png', 0, 368, 601, 625, 8, 20, 0], // large
  ['block-3.png', 637, 201, 512, 538, 6.5, 18, -4], // red
  // the white cube (by request, to pair with the red one): block-4 recoloured
  // to brushed white — same shape and shading, its red glow turned white
  ['block-4-white.png', 588, 711, 521, 539, 7.5, 22, -1],
  ['block-5.png', 138, 929, 402, 433, 6, 15, -3], // small
]

const pct = (v, of) => `${((v / of) * 100).toFixed(3)}%`

export default function FloatingCubes() {
  return (
    <div className="fc" aria-hidden="true">
      {BLOCKS.map(([src, x, y, w, h, float, sway, delay]) => (
        <div
          key={src}
          className="fc__wrap"
          style={{
            left: pct(x, SRC_W),
            top: pct(y, SRC_H),
            width: pct(w, SRC_W),
            height: pct(h, SRC_H),
            animationDuration: `${float}s`,
            animationDelay: `${delay}s`,
          }}
        >
          <img
            className="fc__block"
            src={`/images/about-blocks/${src}`}
            alt=""
            draggable="false"
            decoding="async"
            style={{ animationDuration: `${sway}s`, animationDelay: `${delay * 2}s` }}
          />
        </div>
      ))}
    </div>
  )
}
