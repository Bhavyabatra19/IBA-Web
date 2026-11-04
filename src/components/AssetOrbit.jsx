/**
 * The Tokenization hero graphic: the eight asset classes of the coin ring
 * (Gold, Real Estate, Carbon Credits, Bonds & Debt, Commodities,
 * Infrastructure, Agriculture, Green Assets) redrawn as thin line icons on
 * faint orbit rings, so it reads as background texture behind the headline.
 *
 * One SVG, no images. The red orbit and its nodes turn very slowly, and the
 * nodes pulse; both stop under prefers-reduced-motion (brandbook.css, .aob).
 */

const C = 200 // centre of the 400 × 400 drawing
const R = 140 // the ring the icons sit on

/* 24 × 24 monoline icons, drawn at 1.5px */
const ICONS = [
  { name: 'Gold', d: <><path d="M4 18h7l-1.5-5h-4L4 18ZM13 18h7l-1.5-5h-4L13 18ZM8.5 11h7L14 6h-4l-1.5 5Z" /></> },
  { name: 'Real Estate', d: <><path d="M5 20V8l7-4 7 4v12M3 20h18" /><path d="M9 20v-5h6v5M9 10h.01M15 10h.01" /></> },
  { name: 'Carbon Credits', d: <><path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14" /><path d="M5 19 13 11" /></> },
  { name: 'Bonds & Debt', d: <><path d="M6 3h9l4 4v14H6V3Z" /><path d="M14 3v5h5M9 12h7M9 16h5" /></> },
  { name: 'Commodities', d: <><path d="M3 8l9-4 9 4v9l-9 4-9-4V8Z" /><path d="M3 8l9 4 9-4M12 12v9" /></> },
  { name: 'Infrastructure', d: <><path d="M2 17h20M5 17V9M19 17V9M2 9c4 0 6-3 10-3s6 3 10 3" /><path d="M9 17v-6M15 17v-6" /></> },
  { name: 'Agriculture', d: <><path d="M12 21V8" /><path d="M12 13c-3 0-5-2-5-5 3 0 5 2 5 5ZM12 13c3 0 5-2 5-5-3 0-5 2-5 5ZM12 8c-2 0-3-2-3-4 2 0 3 2 3 4ZM12 8c2 0 3-2 3-4-2 0-3 2-3 4Z" /></> },
  { name: 'Green Assets', d: <><path d="M12 11v10M9 21h6" /><circle cx="12" cy="9" r="1.6" /><path d="M12 7.4V2.5M13.4 9.8l4.2 2.5M10.6 9.8l-4.2 2.5" /></> },
]

const at = (i, r, n = ICONS.length) => {
  const a = (i / n) * Math.PI * 2 - Math.PI / 2
  return [C + r * Math.cos(a), C + r * Math.sin(a)]
}

export default function AssetOrbit() {
  return (
    <svg className="aob" viewBox="0 0 400 400" aria-hidden="true" focusable="false">
      {/* faint concentric rings */}
      <g className="aob__rings">
        <circle cx={C} cy={C} r="190" />
        <circle cx={C} cy={C} r={R} />
        <circle cx={C} cy={C} r="88" />
        <circle cx={C} cy={C} r="42" />
      </g>

      {/* the one red accent: a thin dashed orbit with small nodes, turning slowly */}
      <g className="aob__spin">
        <circle className="aob__orbit" cx={C} cy={C} r="114" />
        {[0, 1, 2].map((i) => {
          const [x, y] = at(i, 114, 3)
          return <circle className="aob__node" key={i} cx={x} cy={y} r="3" style={{ animationDelay: `${-i * 1.3}s` }} />
        })}
      </g>

      {/* connector dots between the icons, on the icon ring */}
      <g className="aob__dots">
        {ICONS.map((_, i) => {
          const [x, y] = at(i + 0.5, R)
          return <circle key={i} cx={x} cy={y} r="1.8" />
        })}
      </g>

      {/* the eight asset icons, each in a thin circle */}
      <g className="aob__icons">
        {ICONS.map((ic, i) => {
          const [x, y] = at(i, R)
          return (
            <g key={ic.name} transform={`translate(${x} ${y})`}>
              <circle r="24" />
              <g transform="translate(-12 -12)">{ic.d}</g>
            </g>
          )
        })}
      </g>

      {/* the hub */}
      <circle className="aob__hub" cx={C} cy={C} r="5" />
    </svg>
  )
}
