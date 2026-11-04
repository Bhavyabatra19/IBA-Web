/**
 * The Library (Resources) hero graphic: the client's render of a magnifying
 * glass over an isometric grid of glowing resource tiles
 * (public/images/lib-search). It replaces the drawn LibraryHolo.jsx here.
 *
 * The render is the bottom layer, black background and all. From the middle
 * outward (across 45% of each side) its black gives way to transparency
 * while bright pixels stay solid, so the hero's beam runs in under it and
 * the black reads as a soft shadow; over black every pixel is the render's
 * own. Every animation is a layer over it that only ADDS light, clipped by
 * masks cut from the same render:
 *   - the tiles: their red borders and icons breathe, and a band of light
 *     passes across the grid so the tiles pulse in turn (tiles-mask: the crisp
 *     lines, with the glass cut out). The tiles do not move.
 *   - the magnifying glass: its lens glows brighter and dimmer, and a glint
 *     crosses the glass now and then (glass-mask)
 *   - the particles: the nodes on the risers twinkle (nodes-mask), and motes
 *     rise up the risers
 * Nothing in the render is moved: it is one flat picture, and a moved copy of
 * the glass or a tile would show a second outline where it was.
 * Styles and motion in brandbook.css (.rsx). Reduced motion: the render alone.
 */

const SRC_W = 1536
const SRC_H = 1024
const DIR = '/images/lib-search'

/** Motes rising up the risers, from just under each node: [x, y (render px), delay s]. */
const MOTES = [
  [765, 225, 0],
  [903, 240, 1.3],
  [474, 335, 2.5],
  [375, 390, 0.8],
  [252, 475, 3.1],
  [1207, 340, 1.9],
  [1254, 445, 3.8],
]

export default function LibrarySearch() {
  return (
    <div className="lh rsx" aria-hidden="true">
      <div className="rsx__stack">
        <img
          className="rsx__base"
          src={`${DIR}/base.png`}
          alt=""
          width={SRC_W}
          height={SRC_H}
          decoding="async"
        />

        {/* the tile borders: breathing, and a band of light passing over */}
        <div className="rsx__layer rsx__tiles">
          <span className="rsx__fill rsx__fill--breathe" />
          <span className="rsx__band" />
        </div>

        {/* the magnifying glass: lens glow and a passing glint */}
        <div className="rsx__layer rsx__glass">
          <span className="rsx__fill rsx__fill--lens" />
          <span className="rsx__glint" />
        </div>

        {/* the riser nodes, twinkling */}
        <div className="rsx__layer rsx__nodes">
          <span className="rsx__fill rsx__fill--twinkle" />
        </div>

        {MOTES.map(([x, y, delay], i) => (
          <span
            key={i}
            className="rsx__mote"
            style={{
              left: `${((x / SRC_W) * 100).toFixed(3)}%`,
              top: `${((y / SRC_H) * 100).toFixed(3)}%`,
              animationDelay: `${delay}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
