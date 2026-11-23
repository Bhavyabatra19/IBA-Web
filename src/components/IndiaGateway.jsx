/**
 * The India Entry Strategy graphic: India as the hub, the four phases of the
 * entry pathway (Explore, Enter, Establish, Expand) as rings widening out
 * from it, and live red arcs running from India to the other Web3 Global
 * Corridor regions on the outer ring.
 *
 * Drawn in SVG in the Tokenization render's language (red light on black,
 * a soft glow behind, floating slowly), since the supplied India Entry page
 * has no artwork of its own. Used on the India Entry Strategy hero and the
 * Expertise page's India Entry band. Reduced motion: still.
 * Styles in brandbook.css (.ieg).
 */

const C = 260
const RINGS = [
  { r: 62, label: 'Explore' },
  { r: 104, label: 'Enter' },
  { r: 146, label: 'Establish' },
  { r: 188, label: 'Expand' },
]
/* the corridor regions on the outer ring, by angle (degrees, 0 = right) */
const REGIONS = [
  { name: 'UAE', a: -28 },
  { name: 'Europe', a: -146 },
  { name: 'Africa', a: 58 },
  { name: 'Americas', a: 160 },
]
const OUTER = 188
const at = (r, a) => [C + r * Math.cos((a * Math.PI) / 180), C + r * Math.sin((a * Math.PI) / 180)]

/* a gentle arc from India to a region: bowed to one side of the straight line */
const arc = (a) => {
  const [x, y] = at(OUTER, a)
  const [mx, my] = at(OUTER * 0.55, a - 22)
  return `M${C} ${C} Q${mx.toFixed(1)} ${my.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`
}

export default function IndiaGateway() {
  return (
    <div className="ieg">
      <span className="ieg__glow" aria-hidden="true" />
      <svg
        className="ieg__svg"
        viewBox="0 0 520 520"
        role="img"
        aria-label="India at the centre of four widening phases, Explore, Enter, Establish and Expand, with arcs to the UAE, Europe, Africa and the Americas"
      >
        <defs>
          <radialGradient id="ieg-hub" cx="40%" cy="35%" r="70%">
            <stop offset="0" stopColor="#ff5a60" />
            <stop offset="0.7" stopColor="#c4121a" />
            <stop offset="1" stopColor="#7a0a10" />
          </radialGradient>
          <linearGradient id="ieg-arc" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#ff4a50" stopOpacity="0.95" />
            <stop offset="1" stopColor="#ff4a50" stopOpacity="0.35" />
          </linearGradient>
        </defs>

        {/* the four phase rings, the outermost (Expand) in red */}
        {RINGS.map((ring, i) => (
          <g key={ring.label}>
            <circle
              className={`ieg__ring${i === RINGS.length - 1 ? ' ieg__ring--outer' : ''}`}
              cx={C}
              cy={C}
              r={ring.r}
            />
            <text className="ieg__phase" x={C} y={C - ring.r - 7} textAnchor="middle">
              {ring.label}
            </text>
          </g>
        ))}

        {/* India to each corridor region */}
        {REGIONS.map((reg, i) => (
          <path key={reg.name} className="ieg__arc" d={arc(reg.a)} style={{ animationDelay: `${i * -0.9}s` }} />
        ))}

        {/* the regions, each a node on the outer ring */}
        {REGIONS.map((reg, i) => {
          const [x, y] = at(OUTER, reg.a)
          const [lx, ly] = at(OUTER + 26, reg.a)
          return (
            <g key={reg.name}>
              <circle className="ieg__node-halo" cx={x} cy={y} r="13" style={{ animationDelay: `${i * -0.7}s` }} />
              <circle className="ieg__node" cx={x} cy={y} r="6" />
              <text className="ieg__region" x={lx} y={ly + 4} textAnchor={lx < C - 10 ? 'end' : lx > C + 10 ? 'start' : 'middle'}>
                {reg.name}
              </text>
            </g>
          )
        })}

        {/* India, the hub */}
        <circle className="ieg__pulse" cx={C} cy={C} r="34" />
        <circle cx={C} cy={C} r="34" fill="url(#ieg-hub)" />
        <circle cx={C} cy={C} r="34" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="1.2" />
        <text className="ieg__hub" x={C} y={C + 5} textAnchor="middle">
          India
        </text>
      </svg>
    </div>
  )
}
