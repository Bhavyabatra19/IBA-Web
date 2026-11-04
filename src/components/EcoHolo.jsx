/**
 * The Ecosystem hero graphic: the client's render of a holographic shield on
 * a circuit chip, ringed by five tiles (public/images/eco-holo).
 *
 * The render is the bottom layer, black background and all. Only across its
 * outer fifth does its black give way to transparency (bright pixels stay
 * solid), so it melts into the hero; over black every pixel is the render's
 * own. Every animation is a layer over it that only ADDS light,
 * cut from the same render the same way, so the picture underneath keeps its
 * pixels and colours:
 *   - the shield: a scan of light rising through it, clipped to its own shape
 *   - the circuit lines: a pulse of light running out from the chip along
 *     them (clipped to the lines alone, so it never crosses a tile)
 *   - the particles: their streams flicker, and a few sparks rise with them
 *   - the tiles and the chip: their own glow, screened over themselves,
 *     breathing in and out. They do not move.
 * Styles and motion in brandbook.css (.eh). Reduced motion: the render alone.
 */

/** The render's size, in px; every layer is placed as a share of it. */
const SRC_W = 1518
const SRC_H = 1036
const DIR = '/images/eco-holo'

/** Glow crops: [file, x, y, w, h (render px), pulse delay s]. */
const GLOWS = [
  ['chip', 580, 380, 385, 275, 0],
  ['tile-h', 235, 248, 330, 212, 0.6],
  ['tile-globe', 975, 248, 330, 212, 1.2],
  ['tile-people', 1002, 532, 363, 238, 1.8],
  ['tile-target', 562, 668, 380, 244, 2.4],
  ['tile-link', 120, 510, 360, 230, 3],
]

/** Rising sparks, on the render's own particle streams: [x, y (render px), delay s]. */
const SPARKS = [
  [728, 300, 0],
  [855, 230, 1.1],
  [912, 260, 2.3],
  [728, 260, 3.2],
  [855, 280, 4.4],
  [800, 240, 5.1],
]

const box = (x, y, w, h) => ({
  left: `${((x / SRC_W) * 100).toFixed(3)}%`,
  top: `${((y / SRC_H) * 100).toFixed(3)}%`,
  width: `${((w / SRC_W) * 100).toFixed(3)}%`,
  height: `${((h / SRC_H) * 100).toFixed(3)}%`,
})

export default function EcoHolo() {
  return (
    <div className="eh">
      <img
        className="eh__base"
        src={`${DIR}/base.png`}
        alt=""
        width={SRC_W}
        height={SRC_H}
        decoding="async"
      />

      {/* light running out along the circuit lines */}
      <div className="eh__lines">
        <span className="eh__wave" />
        <span className="eh__wave eh__wave--late" />
      </div>

      {GLOWS.map(([name, x, y, w, h, delay]) => (
        <img
          key={name}
          className="eh__glow"
          src={`${DIR}/${name}.png`}
          alt=""
          decoding="async"
          style={{ ...box(x, y, w, h), animationDelay: `${delay}s` }}
        />
      ))}

      {/* the particle streams above the shield, flickering */}
      <img
        className="eh__glow eh__glow--particles"
        src={`${DIR}/particles.png`}
        alt=""
        decoding="async"
        style={box(690, 70, 250, 260)}
      />
      {SPARKS.map(([x, y, delay], i) => (
        <span
          key={i}
          className="eh__spark"
          style={{
            left: `${((x / SRC_W) * 100).toFixed(3)}%`,
            top: `${((y / SRC_H) * 100).toFixed(3)}%`,
            animationDelay: `${delay}s`,
          }}
        />
      ))}

      {/* the hologram: a band of light rising through the shield */}
      <div className="eh__shield" style={box(660, 214, 214, 290)} />
    </div>
  )
}
