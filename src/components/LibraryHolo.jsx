/**
 * The Library (Resources) hero's graphic: the searchable catalogue. An
 * isometric grid of floating resource tiles — articles, videos, reports,
 * webinars — with a silver magnifying glass hovering over it, its lens
 * glowing IBA Red; the tile it has found lifts out of the grid in red.
 *
 * Its own look, not the pedestal stage the Red Club hero stands on.
 * Original SVG artwork, sharp at any size. Motion (CSS, brandbook.css .lb):
 * the tiles bob on staggered clocks, the found tile rises and glows, the
 * glass drifts as if scanning. Reduced motion: still.
 */

/* line icons on a 24 grid */
const ICONS = {
  article: 'M6 3h8l4 4v14H6Z M14 3v4h4 M9 12h6 M9 16h6',
  video: 'M3 6h13v12H3Z M16 10l5-3v10l-5-3',
  report: 'M5 3h14v18H5Z M9 17v-3 M12 17v-6 M15 17v-4',
  webinar: 'M3 4h18v12H3Z M8 20h8 M12 16v4 M10 8l4 2-4 2Z',
  book: 'M4 5h7a2 2 0 0 1 2 2v13a2 2 0 0 0-2-2H4Z M20 5h-5a2 2 0 0 0-2 2v13a2 2 0 0 1 2-2h5Z',
}

/* the 3 × 3 grid, row by row; the centre tile is the one the glass finds */
const GRID = [
  ['article', 'video', 'report'],
  ['webinar', 'book', 'article'],
  ['report', 'webinar', 'video'],
]
const TILE = 84
const GAP = 18

/* isometric: a flat (x, y) on the grid plane, to the screen */
const iso = (x, y) => [300 + (x - y) * 0.866, 330 + (x + y) * 0.5]

export default function LibraryHolo() {
  const span = 3 * TILE + 2 * GAP
  const off = -span / 2

  return (
    <div className="lh lb" aria-hidden="true">
      <svg viewBox="70 110 470 410">
        <defs>
          <linearGradient id="lb-tile" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2c2c31" />
            <stop offset="1" stopColor="#121215" />
          </linearGradient>
          <linearGradient id="lb-found" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ff4a50" />
            <stop offset="1" stopColor="#9e1016" />
          </linearGradient>
          <linearGradient id="lb-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f6f6f8" />
            <stop offset="0.45" stopColor="#8d8d93" />
            <stop offset="0.7" stopColor="#e2e2e6" />
            <stop offset="1" stopColor="#55555b" />
          </linearGradient>
          <radialGradient id="lb-lens" cx="40%" cy="35%" r="70%">
            <stop offset="0" stopColor="#ff6a6e" stopOpacity="0.45" />
            <stop offset="0.6" stopColor="#d71920" stopOpacity="0.22" />
            <stop offset="1" stopColor="#d71920" stopOpacity="0.08" />
          </radialGradient>
          <radialGradient id="lb-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#ff3a40" stopOpacity="0.55" />
            <stop offset="1" stopColor="#ff3a40" stopOpacity="0" />
          </radialGradient>
          <filter id="lb-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        {/* faint dotted plane the grid floats over */}
        <g className="lb__plane">
          {Array.from({ length: 9 }, (_, i) => {
            const t = off - 60 + i * ((span + 120) / 8)
            const [a, b] = [iso(t, off - 60), iso(t, -off + 60)]
            const [c, d] = [iso(off - 60, t), iso(-off + 60, t)]
            return (
              <g key={i}>
                <path d={`M${a[0]} ${a[1]}L${b[0]} ${b[1]}`} />
                <path d={`M${c[0]} ${c[1]}L${d[0]} ${d[1]}`} />
              </g>
            )
          })}
        </g>

        {/* the glow under the found tile */}
        <ellipse cx="300" cy="350" rx="150" ry="80" fill="url(#lb-halo)" className="lb__halo" />

        {/* the tiles, back row first so the front ones overlap */}
        {GRID.flatMap((row, r) =>
          row.map((icon, c) => {
            const found = r === 1 && c === 1
            const x = off + c * (TILE + GAP)
            const y = off + r * (TILE + GAP)
            return (
              <g
                key={`${r}-${c}`}
                className={found ? 'lb__tile lb__tile--found' : 'lb__tile'}
                style={{ animationDelay: `${-((r * 3 + c) * 0.45)}s` }}
              >
                {/* the tile: a flat square on the iso plane, with a thin side */}
                <g transform={`matrix(0.866 0.5 -0.866 0.5 300 330)`}>
                  <rect x={x} y={y + 7} width={TILE} height={TILE} className="lb__side" />
                  <rect
                    x={x}
                    y={y}
                    width={TILE}
                    height={TILE}
                    fill={found ? 'url(#lb-found)' : 'url(#lb-tile)'}
                    className="lb__face"
                  />
                  <path
                    d={ICONS[icon]}
                    transform={`translate(${x + TILE / 2 - 18} ${y + TILE / 2 - 18}) scale(1.5)`}
                    className="lb__icon"
                  />
                </g>
              </g>
            )
          })
        )}

        {/* the magnifying glass, over the found tile */}
        <g className="lb__glass">
          <ellipse cx="318" cy="392" rx="62" ry="14" className="lb__shadow" filter="url(#lb-soft)" />
          <path d="M346 340L414 408" className="lb__handle-back" />
          <path d="M346 340L414 408" className="lb__handle" />
          <circle cx="300" cy="294" r="74" className="lb__lens-glow" filter="url(#lb-soft)" />
          <circle cx="300" cy="294" r="66" fill="url(#lb-lens)" />
          <circle cx="300" cy="294" r="66" fill="none" stroke="url(#lb-ring)" strokeWidth="13" />
          <path d="M258 264A52 52 0 0 1 312 242" className="lb__shine" />
        </g>

        {/* motes */}
        {[
          [110, 200, 1.8, 0],
          [500, 170, 2, 1.2],
          [480, 470, 1.6, 2.1],
          [120, 460, 1.5, 0.7],
          [200, 140, 1.3, 2.6],
        ].map(([x, y, r, d], i) => (
          <circle key={i} cx={x} cy={y} r={r} className="lh__mote" style={{ animationDelay: `${d}s` }} />
        ))}
      </svg>
    </div>
  )
}
