/**
 * The Web3 Corridor hero graphic: the client's render of a WEB3 cube ringed
 * by six glass cubes (Ethereum, link, NFT, wallet, institution, community),
 * joined by glowing circuit lines (public/images/w3-cubes).
 *
 * The render is the bottom layer. From the middle outward its black gives way
 * to transparency while bright pixels stay solid (colour divided by alpha), so
 * the hero's red beam runs in under it; over black every pixel is the
 * render's own. Each cube, with its platform and a margin of its own glow, is
 * also cut out as its own image (cube-*.png) and laid over the render at
 * exactly its place; the base has a matching soft hole under each, so at rest
 * the two add back up to the render, with no darker patch over the beam. The cut-outs float and turn slightly, a few
 * render pixels at most, less than their glow margin, so the cube underneath
 * never shows past its cut-out. Each carries its own edge pulse
 * (cube-*-glow.png: its crisp bright pixels), which moves with it.
 * Behind the cubes, light runs out along the circuit lines from the centre
 * and the particles twinkle (lines-mask.png: bright pixels outside the
 * cubes), and a few motes drift up.
 *
 * Styles and motion in brandbook.css (.w3c). Reduced motion: the render alone.
 */

const SRC = 1254 // the render is square, in px
const DIR = '/images/w3-cubes'
const pct = (v) => `${((v / SRC) * 100).toFixed(3)}%`

/** [name, x, y, w, h (render px), float s, delay s, turn deg], the WEB3
    cube last, so it sits over its neighbours' margins as in the render. */
const CUBES = [
  ['eth', 458, 38, 339, 302, 6.4, -0.8, 1.2],
  ['link', 78, 222, 349, 308, 7.2, -2.6, -1.1],
  ['nft', 826, 220, 349, 310, 6.8, -4.1, 1],
  ['wallet', 42, 682, 349, 323, 7.6, -1.5, 1.1],
  ['bank', 862, 685, 347, 330, 6.6, -3.4, -1.2],
  ['people', 456, 852, 345, 328, 7, -5.2, -1],
  ['web3', 278, 308, 699, 575, 8, 0, 0.6],
]

/** Motes drifting up the circuit's risers: [x, y (render px), delay s]. */
const MOTES = [
  [409, 300, 0],
  [770, 230, 1.7],
  [862, 360, 3.1],
  [455, 920, 0.9],
  [805, 930, 2.4],
  [1143, 380, 3.8],
  [80, 840, 1.3],
  [1163, 830, 4.4],
]

export default function Web3Cubes() {
  return (
    <figure className="cx-map w3c">
      <div className="w3c__stack">
        <img
          className="w3c__base"
          src={`${DIR}/base.png`}
          alt="A glowing WEB3 cube at the centre of six glass cubes for Ethereum, links, NFTs, wallets, institutions and communities, joined by red circuit lines"
          width={SRC}
          height={SRC}
          decoding="async"
        />

        {/* light along the circuit lines, and the particles twinkling */}
        <div className="w3c__lines" aria-hidden="true">
          <span className="w3c__wave" />
          <span className="w3c__wave w3c__wave--late" />
          <span className="w3c__twinkle" />
        </div>

        {CUBES.map(([name, x, y, w, h, float, delay, turn]) => (
          <div
            key={name}
            className="w3c__cube"
            aria-hidden="true"
            style={{
              left: pct(x),
              top: pct(y),
              width: pct(w),
              height: pct(h),
              '--turn': `${turn}deg`,
              animationDuration: `${float}s`,
              animationDelay: `${delay}s`,
            }}
          >
            <img src={`${DIR}/cube-${name}.png`} alt="" decoding="async" />
            <span
              className="w3c__pulse"
              style={{
                WebkitMaskImage: `url(${DIR}/cube-${name}-glow.png)`,
                maskImage: `url(${DIR}/cube-${name}-glow.png)`,
                animationDelay: `${delay * 0.7}s`,
              }}
            />
          </div>
        ))}

        {MOTES.map(([x, y, delay], i) => (
          <span
            key={i}
            className="w3c__mote"
            aria-hidden="true"
            style={{ left: pct(x), top: pct(y), animationDelay: `${delay}s` }}
          />
        ))}
      </div>
    </figure>
  )
}
