/**
 * The Expertise hero graphic: the client's render of two neon puzzle pieces
 * locking together over falling data lines (public/images/xp-puzzle).
 *
 * The render is the bottom layer, black background and all. Only across its
 * outer fifth does its black give way to transparency (bright pixels stay
 * solid), so it melts into the hero; over black every pixel is the render's
 * own. Every animation is a layer over it that only ADDS light, clipped by
 * masks cut from the same render:
 *   - the pieces: their edges glow brighter and dimmer, and a slow band of
 *     light crosses them (pieces-mask: the pieces' own brightness)
 *   - the data lines: light falls down them, strip by strip at different
 *     speeds, and the particles flicker (rain-mask: the lines and particles,
 *     with the pieces cut out)
 *   - a few square sparks fall along the lines
 * The whole stack floats gently. The pieces cannot float on their own: they
 * are part of the one flat render, and moving a copy of them would show a
 * second set of edges where they were.
 * Styles and motion in brandbook.css (.pz). Reduced motion: the render alone.
 */

const SRC = 1254 // the render is square, in px; layers are placed as a share of it
const DIR = '/images/xp-puzzle'
const pct = (v) => `${((v / SRC) * 100).toFixed(3)}%`

/** Vertical strips of the rain, each falling at its own pace: [x, w, s, delay s]. */
const STRIPS = [
  [140, 140, 3.4, -0.4],
  [280, 160, 4.2, -2.1],
  [440, 120, 3.1, -1.3],
  [560, 140, 3.8, -0.2],
  [700, 180, 4.6, -3],
  [880, 120, 3.3, -1.8],
  [1000, 140, 4, -0.9],
]

/** Square sparks falling along the render's own lines: [x, y (render px), delay s]. */
const SPARKS = [
  [404, 250, 0],
  [683, 100, 1.4],
  [203, 440, 2.6],
  [898, 640, 0.7],
  [1062, 520, 3.3],
  [608, 900, 1.9],
  [491, 950, 4.1],
  [1112, 520, 2.2],
]

export default function XpPuzzle() {
  return (
    <div className="pz">
      <img
        className="pz__base"
        src={`${DIR}/base.png`}
        alt=""
        width={SRC}
        height={SRC}
        decoding="async"
      />

      {/* light falling down the data lines, and the particles flickering */}
      <div className="pz__rain">
        {STRIPS.map(([x, w, s, delay]) => (
          <span
            key={x}
            className="pz__drop"
            style={{ left: pct(x), width: pct(w), animationDuration: `${s}s`, animationDelay: `${delay}s` }}
          />
        ))}
        <span className="pz__flicker" />
      </div>

      {/* the pieces: edge glow breathing, and a slow sheen across them */}
      <div className="pz__pieces">
        <span className="pz__glow" />
        <span className="pz__sheen" />
      </div>

      {SPARKS.map(([x, y, delay], i) => (
        <span
          key={i}
          className="pz__spark"
          style={{ left: pct(x), top: pct(y), animationDelay: `${delay}s` }}
        />
      ))}
    </div>
  )
}
