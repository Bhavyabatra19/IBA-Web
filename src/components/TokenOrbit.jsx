/**
 * The tokenization graphic: the home hero's real-world-asset coins (Gold,
 * Real Estate, Carbon Credits, Bonds & Debt, Commodities, Infrastructure,
 * Agriculture, Green Assets — public/images/hero-rwa-coins) in an overlapping
 * ring, after the client's reference: eight coins evenly round a circle, each
 * tilted along it and tucked under the next clockwise, so they read as one
 * wreath. Each floats gently on its own beat and the ring turns very slowly.
 * Used in the Expertise page's Tokenization band and as the Tokenization
 * page's hero image. Motion in brandbook.css (.tko); reduced motion: still.
 */

const COINS = ['coin-1', 'coin-2', 'coin-3', 'coin-4', 'coin-5', 'coin-6', 'coin-7', 'coin-8']
const N = COINS.length
const R = 33 // ring radius, % of the square
const W = 31 // coin width, % of the square: just touching neighbours, neat

export default function TokenOrbit() {
  return (
    <div className="tko tko--ring" aria-hidden="true">
      <span className="tko__core" />
      <div className="tko__wheel">
        {COINS.map((name, i) => {
          // start at the top, go clockwise
          const a = (i / N) * 2 * Math.PI - Math.PI / 2
          const x = 50 + R * Math.cos(a)
          // the coin's body sits low in its image (rim and shadow below), so
          // nudge each up a little to centre the ring by the coins themselves
          const y = 50 + R * Math.sin(a) - 1.5
          return (
            <img
              key={name}
              className="tko__coin"
              src={`/images/hero-rwa-coins/${name}.png`}
              alt=""
              loading="lazy"
              decoding="async"
              style={{
                left: `${(x - W / 2).toFixed(2)}%`,
                top: `${(y - W / 2).toFixed(2)}%`,
                width: `${W}%`,
                /* each coin over the one before it, so it tucks under the
                   next one clockwise; the first sits under the last */
                zIndex: i === 0 ? 1 : i + 1,
              }}
            />
          )
        })}
      </div>
    </div>
  )
}
