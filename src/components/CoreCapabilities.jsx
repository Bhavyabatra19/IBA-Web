/**
 * Expertise — the four core capabilities as a hub (after the client's
 * reference): on a dark panel, "One Web3 Corridor" at the centre in glowing
 * rings, the four capabilities as glass cards at the corners, each joined to
 * the hub by a dashed connector with a light travelling along it. Hover,
 * focus or a tap on a card lights it and shows its full statement in the
 * strip below; until someone does, it steps through them on its own (only
 * while on screen). Narrow screens: the hub above the cards, no connectors.
 * Styles in brandbook.css (.cco). Reduced motion: no stepping.
 */

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { reducedMotion } from '../lib/scroll'

const CAPABILITIES = [
  {
    key: 'token',
    title: 'Tokenization',
    lead: 'Asset selection, token architecture, issuance structuring, and tokenomics for real-world and digital assets',
    text: 'IBA helps organizations unlock asset value through tokenization, enabling fractional ownership, broader investor access, improved liquidity potential, and more efficient issuance and administration. From asset evaluation to regulatory alignment and issuance design, we help transform eligible assets into structured, investment-ready digital instruments.',
    /* an asset split into tokens */
    icon: (
      <>
        <path d="M3 20V9l5-3 5 3v11" />
        <path d="M6 12h4M6 15.5h4M2 20h12" />
        <rect x="15.5" y="4" width="5.5" height="5.5" rx="1.2" />
        <rect x="15.5" y="11.5" width="5.5" height="5.5" rx="1.2" />
        <path d="M13 9.5h2M13 14h2" />
      </>
    ),
  },
  {
    key: 'comply',
    title: 'Standards, Frameworks, and Compliance',
    lead: 'Reduce regulatory uncertainty and accelerate market readiness for Web3 solutions',
    text: 'IBA helps organizations map jurisdiction-specific requirements, establish robust governance frameworks, and integrate compliance into technical and operational design from day one. The result: auditable, interoperable, and regulation-aligned blockchain and tokenization solutions better positioned for institutional adoption, cross-border deployment, and scalable growth.',
    /* a shield with a check */
    icon: (
      <>
        <path d="M12 2.5 20 5.5v6c0 4.8-3.4 8.3-8 10-4.6-1.7-8-5.2-8-10v-6Z" />
        <path d="m8.3 12.2 2.6 2.6 5-5.3" />
      </>
    ),
  },
  {
    key: 'stable',
    title: 'Stablecoin Structuring',
    lead: 'Build trust. Enable adoption. Unlock real-world utility',
    text: 'IBA helps organizations design stablecoin models with transparent reserve structures, reliable issuance and redemption mechanisms, and robust governance aligned with market-specific regulatory expectations. By strengthening confidence among users, institutions, and ecosystem partners, we help position stablecoins for broader acceptance, integration into payment and settlement systems, and adoption across domestic and cross-border markets.',
    /* a coin held level on a balance */
    icon: (
      <>
        <circle cx="12" cy="7" r="4.5" />
        <path d="M10.5 6h3M10.5 8h3" />
        <path d="M12 11.5V20M7 20h10M3.5 14h17" />
        <path d="M3.5 14 2 17.5h3ZM20.5 14 19 17.5h3Z" />
      </>
    ),
  },
  {
    key: 'global',
    title: 'Advisory & Global Market Expansion',
    lead: 'Turn expert insight into market access, commercial traction and measurable growth',
    text: 'IBA’s subject-matter experts combine strategic advisory with cross-border Web3 corridors and institutional networks to help organizations identify priority markets, navigate regulatory complexity, secure strategic partnerships, and accelerate go-to-market execution. From market-entry planning to revenue opportunities and scalable expansion, we translate specialist knowledge and ecosystem access into tangible business outcomes across global markets.',
    /* a globe with a rising arrow */
    icon: (
      <>
        <path d="M20.5 11.5A8.5 8.5 0 1 1 12.5 3" />
        <path d="M3.5 12h17M12 3.5c-2.2 2.3-3.3 5.1-3.3 8.5s1.1 6.2 3.3 8.5c2.2-2.3 3.3-5.1 3.3-8.5" />
        <path d="M15 3h6v6M21 3l-6 6" />
      </>
    ),
  },
]


const STEP_MS = 5000
const fmt = (n) => String(n).padStart(2, '0')

export default function CoreCapabilities() {
  const [active, setActive] = useState(0)
  const [touched, setTouched] = useState(false)
  const [wires, setWires] = useState([])
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

  /* The connectors, measured: from each card's inner edge, a short level run
     toward the hub, then a curve onto the hub's outer ring (as in the
     reference). None on narrow screens, where the cards stack under the hub. */
  useLayoutEffect(() => {
    const el = map.current
    if (!el) return
    const measure = () => {
      const hub = el.querySelector('.cco__hub')
      if (!hub || getComputedStyle(el).getPropertyValue('--cco-wires').trim() !== '1') return setWires([])
      const o = el.getBoundingClientRect()
      const h = hub.getBoundingClientRect()
      const cx = h.left - o.left + h.width / 2
      const cy = h.top - o.top + h.height / 2
      const r = h.width / 2
      setWires(
        [...el.querySelectorAll('.cco__card')].map((card) => {
          const b = card.getBoundingClientRect()
          const left = b.left + b.width / 2 < cx + o.left
          const sx = (left ? b.right : b.left) - o.left
          const sy = b.top - o.top + b.height / 2
          const dir = left ? 1 : -1
          // an S-curve (by request): leave the card level, swing toward the
          // hub's middle, and arrive level on the ring 15° off its centre line
          // on the card's side, so every connector meets the hub square-on
          const a = (15 * Math.PI) / 180
          const ex = cx - dir * r * Math.cos(a)
          const ey = cy + (sy < cy ? -1 : 1) * r * Math.sin(a)
          const mx = (sx + ex) / 2
          return `M${sx} ${sy}C${mx} ${sy} ${mx} ${ey} ${ex} ${ey}`
        })
      )
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    document.fonts?.ready.then(measure)
    return () => ro.disconnect()
  }, [])

  return (
    <div className="cco">
      <div className="cco__map" ref={map} data-rise>
        <div className="cco__stackArt" aria-hidden="true"><svg viewBox="0 0 460 360" role="presentation"><defs><linearGradient id="cco-stack-top" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff"/><stop offset="1" stopColor="#f4dddd"/></linearGradient><linearGradient id="cco-stack-side" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#d71920"/><stop offset="1" stopColor="#861117"/></linearGradient><radialGradient id="cco-stack-glow"><stop stopColor="#e7353b" stopOpacity=".17"/><stop offset="1" stopColor="#e7353b" stopOpacity="0"/></radialGradient></defs><ellipse cx="233" cy="294" rx="194" ry="48" fill="url(#cco-stack-glow)"/><g fill="none" stroke="#e6d6d6"><path d="M38 286 230 338 422 286M65 272 230 318 395 272M92 258 230 298 368 258"/></g><g stroke="#d9c4c5"><path d="m90 224 141-42 141 42-141 43Z" fill="url(#cco-stack-top)"/><path d="m90 224 141 43v27L90 251Z" fill="url(#cco-stack-side)"/><path d="m372 224-141 43v27l141-43Z" fill="#a7161d"/><path d="m111 179 120-36 120 36-120 36Z" fill="url(#cco-stack-top)"/><path d="m111 179 120 36v25l-120-36Z" fill="#bf2027"/><path d="m351 179-120 36v25l120-36Z" fill="#98151c"/><path d="m133 135 98-30 98 30-98 30Z" fill="url(#cco-stack-top)"/><path d="m133 135 98 30v24l-98-30Z" fill="#a91b22"/><path d="m329 135-98 30v24l98-30Z" fill="#821218"/><path d="m154 91 77-24 77 24-77 24Z" fill="url(#cco-stack-top)"/><path d="m154 91 77 24v24l-77-24Z" fill="#97171e"/><path d="m308 91-77 24v24l77-24Z" fill="#741117"/></g><path d="M231 67V39m0 0-9 11m9-11 9 11" fill="none" stroke="#d71920" strokeWidth="2"/><circle cx="231" cy="39" r="4" fill="#d71920"/><text x="231" y="335" textAnchor="middle" fill="#8c7375" fontSize="11" fontFamily="Arial, sans-serif" letterSpacing="2">CONNECTED SERVICE ARCHITECTURE</text></svg></div>
        {CAPABILITIES.map((cap, i) => (
          <button
            type="button"
            key={cap.key}
            className={`cco__card${i === active ? ' is-active' : ''}`}
            aria-pressed={i === active}
            aria-controls="cco-detail"
            onMouseEnter={() => pick(i)}
            onFocus={() => pick(i)}
            onClick={() => pick(i)}
          >
            <span className="cco__stepTop">
              <span className="cco__stepNo">{fmt(i + 1)}</span>
              <span className="cco__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">{cap.icon}</svg>
              </span>
            </span>
            <span className="cco__name">{cap.title}</span>
            <span className="cco__stepLead">{cap.lead}</span>
            <span className="cco__stepArrow" aria-hidden="true">↗</span>
          </button>
        ))}
      </div>

      {/* the chosen capability, in full */}
      <div className="cco__detail" id="cco-detail" aria-live="polite">
        <div className="cco__detailIn" key={c.key}>
          <span className="cco__big" aria-hidden="true">
            {fmt(active + 1)}
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
