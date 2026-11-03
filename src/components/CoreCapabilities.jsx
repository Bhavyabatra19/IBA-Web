/**
 * Expertise — the four core capabilities as a four-point wheel (after the
 * client's reference): "One Web3 Corridor" at the hub, one coloured segment
 * per capability, and the four cards set around it at the corners. Hover,
 * focus or a tap on a card (or a segment) steps that segment out and shows
 * the full statement in the strip below; until someone does, it steps
 * through them on its own (only while on screen). Narrow screens: the wheel
 * above the cards. Styles in brandbook.css (.cqi, .cco__detail). Reduced
 * motion: no stepping, no movement.
 */

import { useEffect, useRef, useState } from 'react'
import { reducedMotion } from '../lib/scroll'

const CAPABILITIES = [
  {
    key: 'token',
    title: 'Tokenization',
    lead: 'Asset selection, token architecture, issuance structuring, and tokenomics for real-world and digital assets',
    text: 'IBA helps organizations unlock asset value through tokenization, enabling fractional ownership, broader investor access, improved liquidity potential, and more efficient issuance and administration. From asset evaluation to regulatory alignment and issuance design, we help transform eligible assets into structured, investment-ready digital instruments.',
    /* a token: a coin inside a block */
    icon: (
      <>
        <path d="M12 2.5 20.5 7.25v9.5L12 21.5l-8.5-4.75v-9.5Z" />
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 9.8v4.4M10.6 11h2.8" />
      </>
    ),
  },
  {
    key: 'comply',
    title: 'Standards, Frameworks, and Compliance',
    lead: 'Reduce regulatory uncertainty and accelerate market readiness for Web3 solutions',
    text: 'IBA helps organizations map jurisdiction-specific requirements, establish robust governance frameworks, and integrate compliance into technical and operational design from day one. The result: auditable, interoperable, and regulation-aligned blockchain and tokenization solutions better positioned for institutional adoption, cross-border deployment, and scalable growth.',
    /* a checklist on a clipboard */
    icon: (
      <>
        <rect x="4.5" y="4" width="15" height="17.5" rx="2" />
        <path d="M9 4V2.5h6V4" />
        <path d="m8 10 1.4 1.4L12 8.8M8 16l1.4 1.4 2.6-2.6M14 10.2h2.5M14 16.2h2.5" />
      </>
    ),
  },
  {
    key: 'stable',
    title: 'Stablecoin Structuring',
    lead: 'Build trust. Enable adoption. Unlock real-world utility',
    text: 'IBA helps organizations design stablecoin models with transparent reserve structures, reliable issuance and redemption mechanisms, and robust governance aligned with market-specific regulatory expectations. By strengthening confidence among users, institutions, and ecosystem partners, we help position stablecoins for broader acceptance, integration into payment and settlement systems, and adoption across domestic and cross-border markets.',
    /* a dollar coin with a steady line through it (the peg) */
    icon: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M14.5 9.3c-.4-.9-1.3-1.5-2.5-1.5-1.4 0-2.5.8-2.5 1.9s1 1.6 2.5 1.9 2.5.9 2.5 2.1-1.1 2-2.5 2c-1.2 0-2.2-.6-2.6-1.5M12 6.3v1.5M12 15.7v1.8" />
        <path d="M1.5 12h2M20.5 12h2" />
      </>
    ),
  },
  {
    key: 'global',
    title: 'Advisory & Global Market Expansion',
    lead: 'Turn expert insight into market access, commercial traction and measurable growth',
    text: 'IBA’s subject-matter experts combine strategic advisory with cross-border Web3 corridors and institutional networks to help organizations identify priority markets, navigate regulatory complexity, secure strategic partnerships, and accelerate go-to-market execution. From market-entry planning to revenue opportunities and scalable expansion, we translate specialist knowledge and ecosystem access into tangible business outcomes across global markets.',
    /* a map pin with a route sweeping round the globe */
    icon: (
      <>
        <path d="M12 16s-5-4.4-5-8.5a5 5 0 0 1 10 0c0 4.1-5 8.5-5 8.5Z" />
        <circle cx="12" cy="7.5" r="1.8" />
        <path d="M5.5 13.5C3.6 14.3 2.5 15.4 2.5 16.5c0 2.5 4.3 4.5 9.5 4.5s9.5-2 9.5-4.5c0-1.1-1.1-2.2-3-3" />
      </>
    ),
  },
]


const STEP_MS = 5000

/* one colour per capability, all from the brand palette */
const COLORS = ['#d71920', '#3a2a2b', '#9e141b', '#ef5a5f']

/* The wheel: four ring segments around "One Web3 Corridor", each with a
   pill-shaped tab, its icon in the middle — the first top-left with its tab left,
   the rest the same shape turned a quarter at a time (a pinwheel). The
   active segment steps out from the centre; hovering or tapping a segment
   picks it, the same as its card. */
const C = 200 // centre
const R_IN = 58
const R_OUT = 122
const TAB = { x: 22, y: 151, w: 118, h: 46 } // the first tab, left of the ring
const TAB_END = { x: 46, y: 174 } // a dot at the tab's outer end

/* a point turned k quarter-turns clockwise about the centre */
const turn = (x, y, k) => {
  for (let i = 0; i < k; i++) [x, y] = [C - (y - C), C + (x - C)]
  return [x, y]
}
const pt = (r, deg) => [C + r * Math.cos((deg * Math.PI) / 180), C + r * Math.sin((deg * Math.PI) / 180)]
/* the first ring segment, the top-left quarter */
const SEGMENT = (() => {
  const [a, b, c, d] = [pt(R_OUT, 180), pt(R_OUT, 270), pt(R_IN, 270), pt(R_IN, 180)]
  return `M${a}A${R_OUT} ${R_OUT} 0 0 1 ${b}L${c}A${R_IN} ${R_IN} 0 0 0 ${d}Z`
})()

function WheelArt({ active, onPick }) {
  return (
    <svg viewBox="0 0 400 400" role="presentation">
      {CAPABILITIES.map((cap, i) => {
        const [ix, iy] = turn(TAB_END.x, TAB_END.y, i)
        const [nx, ny] = turn(C - 63, C - 63, i)
        // step out along the segment's diagonal
        const dx = Math.sign(nx - C) * 9
        const dy = Math.sign(ny - C) * 9
        return (
          <g
            key={cap.key}
            className={`cqi__seg${i === active ? ' is-active' : ''}`}
            style={{ '--q': COLORS[i], '--dx': `${dx}px`, '--dy': `${dy}px` }}
            onMouseEnter={() => onPick(i)}
            onClick={() => onPick(i)}
          >
            <g transform={`rotate(${90 * i} ${C} ${C})`}>
              <rect x={TAB.x} y={TAB.y} width={TAB.w} height={TAB.h} rx={TAB.h / 2} />
              <path d={SEGMENT} />
            </g>
            <g className="cqi__segIcon" transform={`translate(${nx - 15} ${ny - 15}) scale(1.25)`}>
              {cap.icon}
            </g>
            <circle className="cqi__tabDot" cx={ix} cy={iy} r="5" />
          </g>
        )
      })}
      {/* the gaps between segments, then the hub over the middle */}
      <path className="cqi__gap" d={`M${C} ${C - R_OUT - 4}V${C + R_OUT + 4}M${C - R_OUT - 4} ${C}H${C + R_OUT + 4}`} />
      <circle className="cqi__hub" cx={C} cy={C} r="52" />
      <circle className="cqi__hubRing" cx={C} cy={C} r="43" />
      <text className="cqi__hubTop" x={C} y={C - 4} textAnchor="middle">ONE WEB3</text>
      <text className="cqi__hubBottom" x={C} y={C + 13} textAnchor="middle">CORRIDOR</text>
    </svg>
  )
}

export default function CoreCapabilities() {
  const [active, setActive] = useState(0)
  const [touched, setTouched] = useState(false)
  const map = useRef(null)
  const c = CAPABILITIES[active]
  const pick = (i) => {
    setTouched(true)
    setActive(i)
  }

  /* step through the capabilities until someone picks one, only on screen */
  useEffect(() => {
    if (touched || reducedMotion()) return
    let visible = false
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(map.current)
    const t = setInterval(() => visible && !document.hidden && setActive((a) => (a + 1) % CAPABILITIES.length), STEP_MS)
    return () => {
      clearInterval(t)
      io.disconnect()
    }
  }, [touched])

  return (
    <div className="cco">
      <div className="cqi" ref={map} data-rise>
        <div className="cqi__wheel" aria-hidden="true">
          <WheelArt active={active} onPick={pick} />
        </div>
        {CAPABILITIES.map((cap, i) => (
          <button
            type="button"
            key={cap.key}
            className={`cqi__card cqi__card--${i + 1}${i === active ? ' is-active' : ''}`}
            style={{ '--q': COLORS[i] }}
            aria-pressed={i === active}
            aria-controls="cco-detail"
            onMouseEnter={() => pick(i)}
            onFocus={() => pick(i)}
            onClick={() => pick(i)}
          >
            <span className="cqi__head">
              <span className="cqi__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">{cap.icon}</svg>
              </span>
              <span className="cqi__name">{cap.title}</span>
            </span>
            <span className="cqi__lead">{cap.lead}</span>
          </button>
        ))}
      </div>

      {/* the chosen capability, in full */}
      <div className="cco__detail" id="cco-detail" aria-live="polite">
        <div className="cco__detailIn" key={c.key}>
          <span className="cqi__bigIcon" aria-hidden="true" style={{ '--q': COLORS[active] }}>
            <svg viewBox="0 0 24 24">{c.icon}</svg>
          </span>
          <div>
            <h3 className="cco__title">{c.title}</h3>
            <p className="cco__lead">{c.lead}</p>
            <p className="cco__text">{c.text}</p>
          </div>
        </div>
        <div className="cco__dots">
          {CAPABILITIES.map((cap, i) => (
            <button
              type="button"
              key={cap.key}
              className={i === active ? 'is-active' : undefined}
              aria-label={`Show ${cap.title}`}
              aria-pressed={i === active}
              onClick={() => pick(i)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
