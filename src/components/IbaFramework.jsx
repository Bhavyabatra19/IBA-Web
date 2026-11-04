/**
 * About — the IBA Framework, after the client's reference: a white hub
 * ("Multi-dimensional IBA Framework · One connected Web3 ecosystem") ringed
 * in red arcs, wired to four numbered pills that alternate white and black,
 * each ending in an icon cap.
 *
 * Four pills, with the client's titles and statements (the earlier six
 * dimensions fold into them; SDG alignment is part of 04).
 *
 * Each pill is an accordion row: its statement opens inside the row, under
 * the pill, on a click or tap (by request — the earlier hover popup covered
 * the rows below and did not exist on touch screens). The first row is open
 * to begin with, and one row is open at a time. The open pill and its wire
 * light red. Because an open row pushes the pills below it down, the wires are
 * drawn to each pill where it actually is (measured), not to fixed positions.
 * Styles in brandbook.css (.ibf).
 */

import { useLayoutEffect, useRef, useState } from 'react'

const PILLS = [
  {
    title: 'Interoperable Web3 Ecosystem',
    tone: 'light',
    text: 'IBA helps organizations navigate diverse jurisdictions and unlock cross-border opportunities in the Web3 economy. Connecting policymakers, institutions, investors, technology providers, and innovators, we enable market entry, advance tokenization initiatives, and foster trusted pathways for blockchain adoption—bridging local ecosystems to build a more connected, interoperable global digital economy.',
    icon: (
      <>
        <path d="M12 3.5 16 6v4.5l-4 2.5-4-2.5V6Z" />
        <path d="M5 12l3 2v3.5l-3 2-3-2V14ZM19 12l3 2v3.5l-3 2-3-2V14Z" />
        <path d="M8 14l1.5-1M16 14l-1.5-1" />
      </>
    ),
  },
  {
    title: 'Decentralized Global Focus',
    tone: 'dark',
    text: 'IBA combines on-the-ground presence, regulatory expertise, and institutional partnerships across emerging and established markets to build cross-border Web3 Corridors. Connecting jurisdictions, global financial markets, capital, technology, and talent, we create structured pathways for market access, cross-border investment, and tokenization of real-world assets—bridging traditional finance and decentralized ecosystems to unlock institutional opportunities and accelerate the growth of an interconnected global digital economy.',
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.6 2.6 3.9 5.6 3.9 9s-1.3 6.4-3.9 9c-2.6-2.6-3.9-5.6-3.9-9S9.4 5.6 12 3ZM4.5 7.5h15M4.5 16.5h15" />
      </>
    ),
  },
  {
    title: 'Resource & Sectoral Expertise',
    tone: 'light',
    text: 'Mobilize and strengthen talent, capabilities, and industry expertise needed to accelerate blockchain adoption and tokenization at scale. Through capacity building, industry-led training, strategic consulting, advisory, and mentoring, IBA empowers organizations and professionals to identify high-value use cases, develop sector-specific Web3 solutions, and translate innovation into real-world applications—driving adoption, unlocking new opportunities, and scaling impact across industries and global ecosystems.',
    icon: (
      <>
        <circle cx="12" cy="8" r="3" />
        <path d="M6.5 19c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5" />
        <circle cx="5" cy="9.5" r="2.2" />
        <path d="M1.5 18c0-2.2 1.6-4 3.8-4.2" />
        <circle cx="19" cy="9.5" r="2.2" />
        <path d="M22.5 18c0-2.2-1.6-4-3.8-4.2" />
      </>
    ),
  },
  {
    title: 'Policy, Advocacy, and Standards',
    tone: 'dark',
    text: 'Advance responsible Web3 adoption by shaping regulatory frameworks, contributing to global blockchain standards and fostering policy dialogue among governments, regulators, institutions and industry leaders. IBA promotes regulatory clarity, interoperability and trusted frameworks for blockchain innovation and tokenization, helping align emerging technologies with evolving market needs. Guided by the UN Sustainable Development Goals (SDGs) and anchored by Tech Zero, IBA encourages sustainable, inclusive and responsible Web3 initiatives—connecting policy, technology and real-world impact to support a more transparent, accessible and sustainable digital economy.',
    icon: (
      <>
        <path d="M13 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h5" />
        <path d="M13 3l5 5h-5Z" />
        <path d="M8 10h5M8 13.5h3" />
        <path d="M17 12.5l4 1.5v3c0 2.4-1.7 4-4 4.8-2.3-.8-4-2.4-4-4.8v-3Z" />
        <path d="m15.4 17.3 1.2 1.2 2.2-2.4" />
      </>
    ),
  },
]

/* The wires, in the desktop layout's own pixels (the stage is 510 x 456 and
   drawn 1:1 there): the hub is centred at (200, 228) and the pills start at
   x 510. Each wire leaves the outer ring, runs to an elbow and then straight
   to its pill's centre, `y`, measured from the stage's top. The closed
   layout's centres are the starting values. */
const HUB = { cx: 200, cy: 228, ring: 226 }
const PILL_X = 510
const CLOSED = [48, 168, 288, 408]
const wire = (y) => {
  /* where it leaves the ring, kept on the ring's right-hand face */
  const dy = Math.max(-0.85, Math.min(0.85, ((y - HUB.cy) * 0.82) / HUB.ring)) * HUB.ring
  const sx = HUB.cx + Math.sqrt(HUB.ring * HUB.ring - dy * dy)
  const sy = HUB.cy + dy
  return { d: `M${sx.toFixed(1)} ${sy.toFixed(1)}L${PILL_X - 44} ${y.toFixed(1)}H${PILL_X - 6}`, sx, sy, y }
}

export default function IbaFramework() {
  const [active, setActive] = useState(0)
  const [ys, setYs] = useState(CLOSED)
  const stage = useRef(null)
  const list = useRef(null)

  /* each pill's centre, in the stage's units, kept up to date as rows open
     and close (the opening is animated, so this follows it frame by frame) */
  useLayoutEffect(() => {
    const st = stage.current
    const ol = list.current
    if (!st || !ol) return
    const measure = () => {
      const s = st.getBoundingClientRect()
      if (!s.width) return
      const k = 510 / s.width
      const next = [...ol.querySelectorAll('.ibf__btn')].map((b) => {
        const r = b.getBoundingClientRect()
        return (r.top + r.height / 2 - s.top) * k
      })
      setYs((prev) => (next.every((v, i) => Math.abs(v - prev[i]) < 0.5) ? prev : next))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(ol)
    ro.observe(st)
    return () => ro.disconnect()
  }, [])

  return (
    <div className="ibf">
      {/* the hub, its rings and the wires */}
      <div className="ibf__stage" ref={stage} aria-hidden="true">
        <svg className="ibf__wires" viewBox="0 0 510 456">
          <defs>
            <radialGradient id="ibf-disc" cx="45%" cy="35%" r="70%">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="0.75" stopColor="#f1f1f2" />
              <stop offset="1" stopColor="#d9d9dc" />
            </radialGradient>
            <filter id="ibf-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" />
            </filter>
          </defs>
          {/* outer rings: a long red arc, a broken white one, a dotted one */}
          <circle cx={HUB.cx} cy={HUB.cy} r="214" className="ibf__ring ibf__ring--red-glow" filter="url(#ibf-glow)" />
          <circle cx={HUB.cx} cy={HUB.cy} r="214" className="ibf__ring ibf__ring--red" />
          <circle cx={HUB.cx} cy={HUB.cy} r="200" className="ibf__ring ibf__ring--white" />
          <circle cx={HUB.cx} cy={HUB.cy} r="226" className="ibf__ring ibf__ring--dots" />
          {/* the disc */}
          <circle cx={HUB.cx} cy={HUB.cy} r="186" fill="url(#ibf-disc)" className="ibf__disc" />
          <circle cx={HUB.cx} cy={HUB.cy} r="172" className="ibf__ring ibf__ring--inner" />

          {PILLS.map((p, i) => {
            const w = wire(ys[i] ?? CLOSED[i])
            return (
              <g key={p.title} className={`ibf__wire${active === i ? ' is-active' : ''}`}>
                <path d={w.d} className="ibf__wireGlow" filter="url(#ibf-glow)" />
                <path d={w.d} className="ibf__wireLine" />
                <circle cx={w.sx} cy={w.sy} r="6" className="ibf__node" />
                <circle cx={PILL_X - 10} cy={w.y} r="5.5" className="ibf__node ibf__node--end" />
              </g>
            )
          })}
        </svg>

        <div className="ibf__hubText">
          <span className="ibf__kicker">Multi-dimensional</span>
          <span className="ibf__brand">IBA</span>
          <span className="ibf__word">Framework</span>
          <span className="ibf__rule" />
          <span className="ibf__kicker">
            One connected
            <br />
            Web3 ecosystem
          </span>
        </div>
      </div>

      <ol className="ibf__pills" ref={list}>
        {PILLS.map((p, i) => {
          const isActive = active === i
          const id = `ibf-desc-${i}`
          return (
            <li
              key={p.title}
              className={`ibf__pill ibf__pill--${p.tone}${isActive ? ' is-active' : ''}`}
            >
              <button
                type="button"
                className="ibf__btn"
                aria-expanded={isActive}
                aria-controls={id}
                onClick={() => setActive(isActive ? null : i)}
              >
                <span className="ibf__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="ibf__title">{p.title}</span>
                <span className="ibf__cap" aria-hidden="true">
                  <span className="ibf__icon">
                    <svg viewBox="0 0 24 24">{p.icon}</svg>
                  </span>
                </span>
              </button>
              <div className="ibf__desc" id={id} role="region" aria-label={p.title}>
                <div className="ibf__descIn">
                  <h4 className="ibf__descTitle">{p.title}</h4>
                  <p>{p.text}</p>
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
