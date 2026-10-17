/**
 * The world, drawn as coastline outlines poured full of a dot pattern.
 *
 * It was written for the home page's Web3 Corridor band and lived inside it.
 * Section 7 asks for the same map again — "the global presence map, filtered to
 * corridor countries, with animated red arcs between endpoints" — and a second
 * copy of nineteen coastlines is a second copy that goes stale on its own. So
 * the map is a component and the two places that show it pass in what is on it.
 *
 * ---------------------------------------------------------------------------
 * Why it is drawn rather than loaded, which is the part worth keeping:
 *
 *   · nothing to fetch, nothing to fail, and it takes the band's own colours
 *   · the markets have to sit at real coordinates. A picture of a map puts the
 *     pins wherever the artwork happens to place them, and the moment the art is
 *     swapped they are wrong. Here a pin is a latitude and a longitude, projected
 *     by the same two lines that place the coastlines, so India is at 22°N 79°E
 *     because that is where India is.
 *
 * Shape and grain are separate problems on purpose: the coastlines are polygons
 * in real lon/lat, and the dots are an SVG pattern poured into them through a
 * mask. Finer dots are one number and they cost nothing — the whole map is a
 * dozen paths whatever the density.
 */

import { useId, useLayoutEffect, useRef } from 'react'
import { reducedMotion, whileOnScreen } from '../lib/scroll'

/* ------------------------------------------------------------------ */
/* projection                                                          */
/* ------------------------------------------------------------------ */

/**
 * Equirectangular, and the whole of it: x is longitude, y is latitude upside
 * down. Everything on this map — every coastline vertex, every pin and every
 * arc endpoint — goes through these two lines, which is the only reason the
 * pins land where the land is.
 */
export const X = (lon) => lon + 180
export const Y = (lat) => 78 - lat

/* The frame. Cropped north of Greenland and south of Patagonia: Antarctica and
   the empty Arctic are half the height of a full map and none of its meaning. */
export const VB = { x: 0, y: -6, w: 360, h: 156 }

/** Map units to a percentage of the frame — what positions anything in the DOM
    layer over the drawing, since that layer is a box and not a viewBox. */
export const pct = ({ lat, lon }) => ({
  left: `${((X(lon) - VB.x) / VB.w) * 100}%`,
  top: `${((Y(lat) - VB.y) / VB.h) * 100}%`,
})

/** [lon, lat] pairs to an SVG path. Written as coordinates, not as a `d`
    string, because a coastline is data and a `d` string is a place to lose a
    comma. */
const shape = (pts) =>
  pts.map(([lon, lat], i) => `${i ? 'L' : 'M'}${X(lon)} ${Y(lat)}`).join('') + 'Z'

/* ------------------------------------------------------------------ */
/* the coastlines                                                      */
/* ------------------------------------------------------------------ */

/* Coarse but real: every vertex is an actual place. Accurate enough that the
   continents are recognisable at a glance and the pins sit on the right land,
   which is all this has to be — it is a texture behind four labels, not an
   atlas. */
export const LAND = [
  /* North America, from the Alaskan west tip clockwise */
  [
    [-168, 65], [-156, 71], [-130, 70], [-95, 69], [-81, 73], [-64, 60],
    [-56, 51], [-66, 45], [-70, 42], [-76, 37], [-81, 31], [-80, 26],
    [-83, 30], [-89, 29], [-95, 29], [-97, 26], [-97, 21], [-91, 19],
    [-87, 21], [-88, 16], [-83, 10], [-78, 8], [-84, 15], [-95, 16],
    [-105, 20], [-110, 24], [-114, 31], [-117, 33], [-124, 40], [-124, 48],
    [-133, 55], [-140, 60], [-150, 59], [-162, 60],
  ],
  /* Hudson Bay, drawn as its own shape and simply not filled */
  /* Greenland */
  [[-58, 76], [-45, 82], [-25, 82], [-20, 76], [-24, 70], [-38, 64], [-52, 68]],
  /* South America */
  [
    [-77, 8], [-71, 12], [-61, 11], [-52, 5], [-50, 0], [-44, -2], [-35, -6],
    [-38, -13], [-39, -18], [-48, -25], [-54, -34], [-57, -38], [-62, -40],
    [-65, -45], [-68, -53], [-73, -52], [-74, -44], [-73, -37], [-71, -30],
    [-70, -18], [-76, -14], [-81, -6], [-80, -2], [-79, 2],
  ],
  /* Africa */
  [
    [-6, 36], [10, 37], [20, 32], [25, 31], [32, 31], [37, 22], [39, 15],
    [43, 12], [51, 12], [51, 5], [42, 1], [40, -4], [40, -13], [35, -20],
    [33, -26], [31, -30], [26, -34], [18, -34], [15, -27], [12, -18],
    [12, -6], [9, -1], [9, 4], [3, 6], [-4, 5], [-8, 5], [-13, 8],
    [-16, 12], [-17, 20], [-13, 24], [-11, 28], [-9, 32],
  ],
  /* Eurasia, west to east and back along the south */
  [
    [-9, 39], [-9, 43], [-2, 43], [-1, 46], [-4, 48], [1, 50], [4, 52],
    [8, 54], [11, 55], [13, 58], [11, 63], [15, 68], [21, 70], [28, 71],
    [40, 68], [55, 69], [70, 73], [80, 74], [95, 76], [110, 74], [130, 73],
    [145, 70], [160, 69], [172, 66], [180, 65], [172, 61], [162, 60],
    [163, 55], [156, 51], [143, 53], [141, 46], [135, 43], [130, 43],
    [128, 38], [122, 40], [120, 36], [122, 31], [120, 24], [110, 21],
    [108, 15], [107, 10], [104, 1], [100, 6], [98, 8], [98, 14], [94, 16],
    [92, 21], [89, 22], [87, 21], [83, 18], [80, 13], [78, 8], [73, 15],
    [72, 21], [69, 22], [67, 24], [61, 25], [57, 23], [59, 22], [56, 25],
    [51, 25], [48, 29], [43, 29], [50, 20], [45, 13], [43, 13], [39, 20],
    [35, 28], [34, 31], [36, 36], [30, 37], [27, 40], [29, 41], [23, 38],
    [21, 40], [19, 40], [16, 38], [13, 38], [15, 42], [13, 45], [7, 44],
    [3, 43], [0, 40], [-2, 37], [-6, 36],
  ],
  /* Australia */
  [
    [130, -12], [136, -12], [141, -13], [143, -11], [146, -19], [150, -22],
    [153, -28], [150, -37], [145, -38], [140, -38], [137, -35], [129, -32],
    [122, -34], [115, -34], [114, -26], [114, -22], [121, -20], [127, -14],
  ],
  /* Great Britain and Ireland, as one shape at this size */
  [[-10, 52], [-6, 55], [-6, 58], [-3, 58], [-1, 54], [1, 51], [-5, 50]],
  /* Scandinavia's western edge, so Norway is not a straight line */
  [[5, 58], [5, 62], [12, 65], [16, 69], [21, 70], [14, 66], [10, 61]],
  /* Japan */
  [[130, 31], [135, 34], [140, 38], [141, 45], [145, 44], [140, 36], [136, 33]],
  /* Sumatra */
  [[95, 6], [99, 4], [106, -6], [104, -6], [98, 1]],
  /* Java */
  [[105, -6], [114, -8], [114, -9], [105, -7]],
  /* Borneo */
  [[109, 2], [117, 4], [119, -1], [117, -4], [110, -3], [109, -1]],
  /* Sulawesi */
  [[120, 1], [125, 1], [125, -5], [121, -5], [123, -2], [120, -2]],
  /* New Guinea */
  [[131, -1], [141, -3], [150, -9], [147, -9], [138, -6], [131, -3]],
  /* the Philippines, as one shape */
  [[120, 18], [124, 13], [126, 7], [124, 6], [120, 12], [118, 16]],
  /* Madagascar */
  [[49, -13], [50, -18], [47, -25], [44, -22], [43, -17]],
  /* New Zealand */
  [[173, -35], [178, -38], [174, -41], [170, -46], [167, -45], [172, -40]],
  /* Sri Lanka */
  [[80, 9], [82, 7], [81, 6], [80, 7]],
  /* Iceland */
  [[-24, 65], [-18, 66], [-14, 65], [-19, 63]],
]

/** Cut out of the land above, so the bays read as water rather than as ground. */
export const WATER = [
  /* Hudson Bay */
  [[-95, 62], [-88, 64], [-78, 62], [-77, 55], [-82, 51], [-92, 55]],
  /* the Mediterranean, Black and Caspian seas as one cut */
  [[-2, 36], [10, 38], [18, 42], [28, 41], [30, 45], [40, 47], [50, 45],
   [52, 38], [48, 38], [36, 42], [36, 36], [28, 35], [18, 34], [8, 33],
   [0, 34]],
  /* the Red Sea */
  [[34, 28], [43, 13], [40, 12], [32, 27]],
  /* the Persian Gulf */
  [[48, 30], [57, 25], [56, 24], [47, 29]],
  /* the Baltic */
  [[13, 55], [21, 60], [26, 60], [22, 55], [17, 54]],
]

/* ------------------------------------------------------------------ */
/* the markets                                                         */
/* ------------------------------------------------------------------ */

/**
 * The four endpoints of the two corridors, and the name and nothing else.
 *
 * Each carried a line under it — "Emerging Markets", "Innovation and Talent" —
 * and four of those turned a map into four paragraphs floating over one. What
 * the map has to say is where the corridors reach.
 *
 * `side` and `dy` place the LABEL; the dot is always on the coordinate and
 * never moves. Both are per market rather than worked out, because the only
 * thing that decides them is what else is nearby — and what is nearby is fixed.
 *
 * India and the UAE are the reason `dy` exists. 79°E and 54°E is seven percent
 * of a world map apart, at almost the same latitude, and a label is wider than
 * that gap: side by side, each one reached across the other's dot. So they are
 * separated up and down instead — the UAE's label above its dot, India's below
 * — which is the one axis they have any room on.
 */
export const MARKETS = [
  { name: 'LATAM', lat: -10, lon: -55, side: 'left', dy: 0 },
  { name: 'SPAIN', lat: 40, lon: -4, side: 'left', dy: -2 },
  { name: 'UAE', lat: 24, lon: 54, side: 'right', dy: -24 },
  { name: 'INDIA', lat: 22, lon: 79, side: 'left', dy: 22 },
]

const market = (name) => MARKETS.find((m) => m.name === name)

/**
 * The corridors as legs, named by their endpoints.
 *
 * India–Spain–LATAM is two legs rather than one, because it is: the corridor
 * runs through Spain, and an arc drawn straight from India to Brazil would be
 * drawing a route that does not exist.
 */
export const CORRIDOR_ARCS = [
  ['INDIA', 'UAE'],
  ['INDIA', 'SPAIN'],
  ['SPAIN', 'LATAM'],
]

/**
 * One leg as a quadratic curve, bulging away from the equator side.
 *
 * A straight line between two pins reads as a ruler laid on a map; an arc reads
 * as a route. The lift is a fraction of the leg's own length, so a short hop
 * (India–UAE) stays shallow and a long one (Spain–LATAM) sweeps — which is what
 * makes three arcs on one map look like three different journeys rather than
 * three copies of one curve.
 *
 * The control point is offset along the leg's perpendicular, and of the two
 * perpendiculars it always takes the one pointing up the screen. Otherwise the
 * bulge follows the direction the pair happens to be listed in, and reversing a
 * leg would flip its arc under the map.
 */
const leg = ([a, b]) => {
  const p = market(a)
  const q = market(b)
  if (!p || !q) return null
  const x1 = X(p.lon)
  const y1 = Y(p.lat)
  const x2 = X(q.lon)
  const y2 = Y(q.lat)
  const dx = x2 - x1
  const dy = y2 - y1
  const len = Math.hypot(dx, dy) || 1
  const lift = len * 0.3
  /* the perpendicular with the negative y — up the screen, whichever way round
     the endpoints were given */
  const nx = dy / len
  const ny = -dx / len
  const s = ny > 0 ? -1 : 1
  return {
    key: `${a}-${b}`,
    d: `M${x1} ${y1}Q${(x1 + x2) / 2 + nx * lift * s} ${
      (y1 + y2) / 2 + ny * lift * s
    } ${x2} ${y2}`,
  }
}

/* ------------------------------------------------------------------ */

/**
 * @param {object} p
 * @param {Array}  [p.markets] which pins to show. Defaults to all four.
 * @param {Array}  [p.arcs]    pairs of market names to draw a route between.
 *   Empty by default — the home page's band is a map of where the corridors
 *   reach, and the flagship page is the one that shows them travelling.
 * @param {string} [p.className] added to the map box.
 * @param {React.ReactNode} [p.children] anything else to lay over the drawing,
 *   in the same box the pins are positioned in — so a caller can place its own
 *   markers with the exported `pct()` and have them land on the same
 *   coordinates. The Global Presence map does exactly that: its markers are
 *   interactive and carry a tooltip, which is a different thing from the
 *   labelled corridor pins and should not be bolted onto them.
 */
export default function WorldMap({
  markets = MARKETS,
  arcs = [],
  className = '',
  children,
  ...rest
}) {
  const root = useRef(null)
  /* The pattern and the mask are referenced by url(#id), which is resolved
     against the whole document — so two maps on one page would both draw
     through whichever mask was defined last. useId gives each instance its own;
     the strip is because React's ids contain colons and an SVG id is safer
     without them. */
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const routes = arcs.map(leg).filter(Boolean)

  /* The arcs are CSS animations and this only says when they may run.

     [data-live] is the switch, set here and nowhere else, so under reduced
     motion the routes are simply drawn and nothing travels along them. That is
     why there is no reduced-motion rule for the arcs in the stylesheet, and
     must not be. [data-hold] parks them while the map is off screen — they are
     endless animations on a section the reader has left. */
  useLayoutEffect(() => {
    const el = root.current
    if (!el || routes.length === 0 || reducedMotion()) return
    el.dataset.live = ''
    const release = whileOnScreen(
      el,
      () => delete el.dataset.hold,
      () => {
        el.dataset.hold = ''
      }
    )
    return () => {
      release()
      delete el.dataset.live
      delete el.dataset.hold
    }
  }, [routes.length])

  return (
    /* The drawing is decoration; the markets it carries are not, so the labels
       are real text in the document and only the map itself is hidden. */
    <div className={`corr__map ${className}`} ref={root} {...rest}>
      <svg
        className="corr__world"
        viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`}
        aria-hidden="true"
      >
        <defs>
          {/* The grain. Spacing and radius here are the only two numbers that
              decide how fine the map looks, and neither costs a node. */}
          <pattern
            id={`grain${uid}`}
            width="2.6"
            height="2.6"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1.3" cy="1.3" r="0.52" fill="currentColor" />
          </pattern>
          <mask id={`land${uid}`}>
            {/* white keeps, black cuts — so the seas are drawn the same way the
                coastlines are, and stay in the same coordinate space */}
            {LAND.map((pts, i) => (
              <path key={`l${i}`} d={shape(pts)} fill="#fff" />
            ))}
            {WATER.map((pts, i) => (
              <path key={`w${i}`} d={shape(pts)} fill="#000" />
            ))}
          </mask>
        </defs>
        <rect
          x={VB.x}
          y={VB.y}
          width={VB.w}
          height={VB.h}
          fill={`url(#grain${uid})`}
          mask={`url(#land${uid})`}
        />
      </svg>

      {routes.length > 0 && (
        /* Its own svg over the land rather than more paths inside it: the map
           is drawn at 28% opacity because it is a texture, and a route at 28%
           is a route nobody can follow. */
        <svg
          className="corr__routes"
          viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`}
          aria-hidden="true"
          fill="none"
        >
          {routes.map((r, i) => (
            <g key={r.key} style={{ '--i': i }}>
              {/* the route, always there */}
              <path className="corr__arc" d={r.d} />
              {/* and the traffic on it. pathLength normalises every leg to 100
                  so one dash pattern crosses the short hop and the long sweep
                  at the same apparent speed. */}
              <path className="corr__arcRun" d={r.d} pathLength="100" />
            </g>
          ))}
        </svg>
      )}

      {children}

      <ul className="corr__pins">
        {markets.map((m) => (
          <li
            className="corr__pin"
            key={m.name}
            style={{ ...pct(m), '--gy': `${m.dy}px` }}
            data-side={m.side}
          >
            <span className="corr__pinDot" aria-hidden="true" />
            <span className="corr__pinCard">{m.name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
