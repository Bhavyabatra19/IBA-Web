/**
 * Floating brushed-metal cubes — the About hero's graphic, after the
 * reference the client supplied (black cubes adrift on black), with one cube
 * in IBA Red.
 *
 * Real CSS 3D: six faces per cube in a preserve-3d box. Each cube floats on
 * its own clock and slowly turns, never fully side-on. Styles and motion in
 * brandbook.css (.fc). Reduced motion: still.
 */

const CUBES = [
  // [size (px), left %, top %, float s, turn s, delay s, red]
  [96, 14, 4, 7, 16, -2, false],
  [150, 2, 34, 8, 20, 0, false],
  [104, 62, 22, 6.5, 18, -4, true],
  [112, 58, 62, 7.5, 22, -1, false],
  [84, 18, 76, 6, 15, -3, false],
]

const FACES = ['front', 'back', 'right', 'left', 'top', 'bottom']

export default function FloatingCubes() {
  return (
    <div className="fc" aria-hidden="true">
      {CUBES.map(([s, x, y, float, turn, delay, red], i) => (
        <div
          key={i}
          className={`fc__wrap${red ? ' fc__wrap--red' : ''}`}
          style={{
            '--s': `${s}px`,
            left: `${x}%`,
            top: `${y}%`,
            animationDuration: `${float}s`,
            animationDelay: `${delay}s`,
          }}
        >
          <div
            className="fc__cube"
            style={{ animationDuration: `${turn}s`, animationDelay: `${delay * 2}s` }}
          >
            {FACES.map((f) => (
              <span className={`fc__face fc__face--${f}`} key={f} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
