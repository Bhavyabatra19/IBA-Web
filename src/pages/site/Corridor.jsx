/**
 * Web3 Corridor — one global corridor, connected from India.
 *
 * Four regions — Africa, the UAE, India and Europe — are equal partners,
 * each with its own role, and IBA is the central catalyst that connects
 * them (IBA's corridor deck, slides 1–14, as revised 2 Nov 2026). The page
 * is built to be read at a glance — a picture, then short tiles — in this
 * order:
 *
 *   hero        the Web3 Corridor logo (public/images/corridor-logo.webp)
 *   network     a corridor for shared growth: the map, then what flows
 *               through the corridor and its figures
 *   partners    the regions, each with its role
 *   objectives, pillars, what the corridor opens, services, the forum
 *   membership  a pointer to the Web360 Club tiers on /memberships
 *
 * Content follows IBA's corridor deck, cut to its key lines; prices are
 * deliberately not shown. "Asset pooling" is IBA's addition to the network's
 * offer (October 2026).
 */

import { useEffect, useRef } from 'react'
import { PageHero, Section, Cards, Stats, Btn } from '../../components/Kit'

/* The corridor map: the supplied map artwork, a glowing red dotted world
   (public/images/corridor-hero-map.jpg), tilted back in 3D with the corridor
   drawn over it. HUBS are the pin centres in the artwork's own pixels, so the
   overlay's viewBox matches the image and the arcs land on the pins. Every
   route starts in India: the arcs draw outward from it one after another,
   then a pulse keeps running along each, away from India. The sequence waits
   (data-live) until the map scrolls into view, so it plays where it is seen. */
const HUBS = {
  americas: [538, 496],
  europe: [910, 260],
  africa: [973, 472],
  uae: [1173, 358],
  india: [1314, 393],
}
/** Where the network reaches from India, nearest first. `next` is not yet live. */
const REACH = [{ to: 'uae' }, { to: 'europe' }, { to: 'africa' }, { to: 'americas', next: true }]
/* a quadratic arc that lifts off the map by a share of its length */
const arc = ([x1, y1], [x2, y2]) => {
  const lift = Math.hypot(x2 - x1, y2 - y1) * 0.32
  return `M${x1} ${y1} Q${(x1 + x2) / 2} ${(y1 + y2) / 2 - lift} ${x2} ${y2}`
}

function CorridorMap() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      el.dataset.live = ''
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        el.dataset.live = ''
        io.disconnect()
      },
      { threshold: 0.35 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const [ix, iy] = HUBS.india
  return (
    <figure className="cx-map" ref={ref} aria-label="A glowing world map with the corridor expanding from India to its partner regions">
      <div className="cx-map__stage">
        <img src="/images/corridor-hero-map.jpg" alt="" width="1832" height="859" decoding="async" />
        <svg className="cx-map__routes" viewBox="0 0 1832 859" aria-hidden="true">
          <defs>
            <filter id="cx-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {REACH.map(({ to, next }, i) => {
            const d = arc(HUBS.india, HUBS[to])
            return (
              <g key={to} className={next ? 'cx-map__route cx-map__route--next' : 'cx-map__route'} style={{ '--i': i }}>
                <path className="cx-map__arc" d={d} pathLength="100" />
                {!next && (
                  <>
                    <path className="cx-map__flow" d={d} pathLength="100" />
                    <circle className="cx-map__pulse" r="11" filter="url(#cx-glow)">
                      <animateMotion dur="3.2s" begin={`${1 + i * 0.6}s`} repeatCount="indefinite" path={d} />
                    </circle>
                  </>
                )}
              </g>
            )
          })}
          {/* the partner regions: plain nodes, lit as their route arrives. The
              artwork labels each region, so the nodes carry no text. */}
          {REACH.map(({ to, next }, i) => {
            const [x, y] = HUBS[to]
            return (
              <g key={to} className={next ? 'cx-map__node cx-map__node--next' : 'cx-map__node'} style={{ '--i': i }}>
                <circle cx={x} cy={y} r="10" />
              </g>
            )
          })}
          {/* India: the hub, with rings spreading out from it */}
          <g className="cx-map__hub">
            <circle className="cx-map__ring" cx={ix} cy={iy} r="20" />
            <circle className="cx-map__ring cx-map__ring--late" cx={ix} cy={iy} r="20" />
            <circle className="cx-map__core" cx={ix} cy={iy} r="20" filter="url(#cx-glow)" />
          </g>
        </svg>
      </div>
    </figure>
  )
}

/** The hero: the Web3 Corridor logo, its square edges faded into the panel. */
const HeroLogo = () => (
  <figure className="cx-logo">
    <img src="/images/corridor-logo.webp" alt="Web3 Corridor" width="1600" height="1600" decoding="async" />
  </figure>
)

/* ------------------------------------------------------------------ */
/* Flags — drawn, not emoji: emoji flags render as two letters on      */
/* Windows. 3:2 boxes, simplified where the real flag carries an       */
/* emblem.                                                             */
/* ------------------------------------------------------------------ */

const FLAGS = {
  IN: (
    <>
      <rect width="30" height="20" fill="#ffffff" />
      <rect width="30" height="6.67" fill="#ff9933" />
      <rect y="13.33" width="30" height="6.67" fill="#138808" />
      <circle cx="15" cy="10" r="2.6" fill="none" stroke="#000080" strokeWidth="0.6" />
      <circle cx="15" cy="10" r="0.6" fill="#000080" />
    </>
  ),
  AE: (
    <>
      <rect width="30" height="20" fill="#ffffff" />
      <rect width="30" height="6.67" fill="#00732f" />
      <rect y="13.33" width="30" height="6.67" fill="#000000" />
      <rect width="8" height="20" fill="#ff0000" />
    </>
  ),
  ES: (
    <>
      <rect width="30" height="20" fill="#aa151b" />
      <rect y="5" width="30" height="10" fill="#f1bf00" />
    </>
  ),
  ZM: (
    <>
      <rect width="30" height="20" fill="#198a00" />
      <rect x="18" y="8" width="4" height="12" fill="#de2010" />
      <rect x="22" y="8" width="4" height="12" fill="#000000" />
      <rect x="26" y="8" width="4" height="12" fill="#ef7d00" />
      <path d="M22.5 4.2c1.5-.9 3.5-.9 5 0-1.2.2-1.8.7-2.5 1.6-.7-.9-1.3-1.4-2.5-1.6Z" fill="#ef7d00" />
    </>
  ),
}

const Flag = ({ code, name }) => (
  <svg className="cx-flag" viewBox="0 0 30 20" role="img" aria-label={`Flag of ${name}`}>
    {FLAGS[code]}
  </svg>
)

/* ------------------------------------------------------------------ */
/* The network: a corridor for shared growth                         */
/* ------------------------------------------------------------------ */

const Icon = ({ d }) => <path d={d} />

/** What moves through the network — one line each. */
const FLOWS = [
  { title: 'Global Connection', text: 'Join through one country and reach every partner in the corridor.', icon: <><circle cx="12" cy="12" r="9" /><Icon d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></> },
  { title: 'Asset Pooling', text: 'Pool capital and real-world assets across borders through tokenization.', icon: <><ellipse cx="12" cy="6" rx="8" ry="3" /><Icon d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" /></> },
  { title: 'Capital & Investment', text: 'Vetted deal flow for investors, and funding paths for founders.', icon: <Icon d="M3 17l6-6 4 4 8-8M15 7h6v6" /> },
  { title: 'Technology Transfer', text: "India's developer depth, shared with every market in the corridor.", icon: <Icon d="M8 6l-6 6 6 6M16 6l6 6-6 6" /> },
  { title: 'Market Access', text: 'Pre-verified business setup and go-to-market plans for each new market.', icon: <Icon d="M5 21V4M5 4h11l-2 4 2 4H5" /> },
  { title: 'Talent & Knowledge', text: 'Skills, certifications and research partnerships across the network.', icon: <Icon d="M2 9l10-5 10 5-10 5zM6 11v5c3 2 9 2 12 0v-5" /> },
]

const FIGURES = [
  { value: '2.8B+', label: 'People across the corridor' },
  { value: '4', label: 'Partner regions, the Americas next' },
  { value: '1,250+', label: 'Active Web3 ventures in India' },
  { value: '$1T', label: 'Opportunity the corridor maps' },
]

/**
 * The corridor's partner regions, from IBA's corridor deck, each with the
 * role it plays. India leads the row as IBA's home; `role` is its part.
 */
const PARTNERS = [
  { code: 'IN', country: 'India', node: 'Home of IBA', role: 'Technical engine & implementation hub', text: 'One of the world’s largest blockchain developer pools and 1,250+ active Web3 ventures.', hub: true },
  { code: 'AE', country: 'United Arab Emirates', node: 'Dubai', role: 'Financial hub & global launchpad', text: 'Regulatory clarity, capital access and free-zone campuses incubating Web3 startups.' },
  { code: 'ES', country: 'Spain', node: 'Europe', role: 'Governance & mature market integration', text: 'Institutional compliance, standards and Europe’s lead on Web3 regulation.' },
  { code: 'ZM', country: 'Zambia', node: 'Africa', role: 'High-growth adoption & real-world utility', text: 'Mobile-first innovation, unbanked growth and real-world DeFi, with fast-growing developer talent.' },
]

/** The three core objectives. */
const OBJECTIVES = [
  { num: '01', title: 'Connect', text: 'A sustainable innovation corridor connecting nations with global technology, investment and innovation.' },
  { num: '02', title: 'Transfer', text: 'Technology transfer, knowledge exchange and capacity building in emerging technologies.' },
  { num: '03', title: 'Access', text: 'Pathways to markets and funding for startups, SMEs, innovation hubs, women entrepreneurs and young innovators.' },
]

/** The focus pillars, one line each. */
const PILLARS = [
  { title: 'Web3 Technologies & Digital Transformation', text: 'Literacy, adoption and digital skills.' },
  { title: 'Blockchain, Web3 & Tokenization', text: 'Digital identity, tokenization and smart contracts.' },
  { title: 'Hubs & Co-Working Ecosystems', text: 'Hub development, startup incubation and collaborative workspaces.' },
  { title: 'Startup Development & Investment', text: 'Acceleration, investor readiness and market access.' },
  { title: 'Girls & Women in Emerging Tech', text: 'Leadership, skills, entrepreneurship and mentorship.' },
  { title: 'Education, Research & Capacity Building', text: 'Certifications, training and academic partnerships.' },
]

/** What being inside the corridor gives you, each said once. */
const ACCESS = [
  { num: '01', title: 'Web3 Resources', text: 'Templates, frameworks and learning on RWA, tokenomics and regulation.' },
  { num: '02', title: 'Partnerships', text: 'Investors, family offices, mentors and members in every partner country.' },
  { num: '03', title: 'Growth', text: 'Advisory, mentoring and investor readiness, from founder to fundable venture.' },
  { num: '04', title: 'Expansion', text: 'Business setup, go-to-market plans and visibility in new markets.' },
]

/** The two sides the corridor serves. */
const SIDES = [
  { tag: 'For Founders', title: 'Tested Pathways to New Markets', text: 'Funding, local go-to-market strategies, new markets, advanced technical integration and business tokenization.' },
  { tag: 'For Investors', title: 'A Unified Framework to De-risk', text: 'A unified framework to de-risk international deployments, with vetted deal flow across the corridor.' },
]

/** The services IBA runs across the corridor. */
const SERVICES = [
  { num: '01', title: 'Tech Support', text: 'End-to-end plans and operations for tokenized businesses.' },
  { num: '02', title: 'Business Setup', text: 'Pre-verified legal and regulatory frameworks, with advanced KYC and KYB.' },
  { num: '03', title: 'Advisory & Mentoring', text: 'Industry veterans who have scaled Web3 across borders, plus expert mentor sessions.' },
  { num: '04', title: 'Global Visibility', text: 'Marketing, networking and forums that put you in front of global decision-makers and investors.' },
  { num: '05', title: 'Go-To-Market Plans', text: 'Blueprints to launch and scale in high-demand markets, with separate tokenization plans.' },
  { num: '06', title: 'Asset Pooling', text: 'Cross-border pooling of capital and tokenized real-world assets.' },
]

export default function Corridor() {
  return (
    <div>
      <PageHero
        id="corridor"
        aside={<HeroLogo />}
        eyebrow="IBA Web3 Corridor · A high-velocity initiative by India Blockchain Alliance"
        title="Bridging Global Regions"
        lede="Mapping a trillion-dollar opportunity across India, the UAE, Africa and Europe, with the Americas next. One corridor for shared Web3 resources, capital, partnerships and markets, home to more than 2.8 billion people."
        actions={
          <>
            <Btn href="#corridor-membership">
              Become a Member <span aria-hidden="true">→</span>
            </Btn>
            <Btn href="#corridor-partners" variant="ghost">
              Meet the Corridor Partners
            </Btn>
          </>
        }
      />

      <Section
        id="corridor-focus"
        tone="dark"
        eyebrow="The Network"
        title="A corridor for shared growth."
        lede="Connecting Africa, the UAE, India and Europe through innovation, technology, investment and partnerships, with IBA as the central catalyst."
      >
        <div className="cx-netmap">
          <CorridorMap />
        </div>
        <Cards items={FLOWS} cols={3} />
        <div className="cx-block">
          <Stats items={FIGURES} dark />
        </div>
      </Section>

      <Section
        id="corridor-partners"
        eyebrow="Corridor Partners"
        title="The Regions in the Corridor"
        lede="Each region brings its own strength. Join through one and reach them all."
      >
        <ul className="cx-partners">
          {PARTNERS.map((p) => (
            <li className={p.hub ? 'cx-partner cx-partner--hub' : 'cx-partner'} key={p.code} data-rise>
              <Flag code={p.code} name={p.country} />
              <p className="cx-partner__role">{p.role}</p>
              <h3 className="cx-partner__name">{p.country}</h3>
              <p className="cx-partner__city">{p.node}</p>
              <p className="cx-partner__text">{p.text}</p>
            </li>
          ))}
          <li className="cx-partner cx-partner--next" data-rise>
            <span className="cx-flag cx-flag--next" aria-hidden="true">+</span>
            <p className="cx-partner__role">Expanding</p>
            <h3 className="cx-partner__name">Your Country</h3>
            <p className="cx-partner__text">The network grows with new country partners.</p>
            <a className="cx-partner__go" href="/connect" data-enquiry="Web3 Corridor">
              Become a country partner <span aria-hidden="true">→</span>
            </a>
          </li>
        </ul>
      </Section>

      <Section id="corridor-objectives" tone="card" eyebrow="The Corridor Objectives" title="Three Core Objectives">
        <Cards items={OBJECTIVES} cols={3} />
      </Section>

      <Section id="corridor-pillars" eyebrow="Focus Pillars" title="Where the Corridor Focuses">
        <Cards items={PILLARS} cols={3} />
      </Section>

      <Section
        id="corridor-access"
        tone="card"
        eyebrow="Build. Fund. Scale."
        title="What the Corridor Opens"
        lede="One infrastructure for cross-border tech and business: startups become founders, founders become fundable ventures, and ventures graduate into the Corridor Club."
      >
        <Cards items={ACCESS} cols={4} />
        <div className="cx-block">
          <Cards items={SIDES} cols={2} />
        </div>
      </Section>

      <Section
        id="corridor-support"
        eyebrow="Corridor Services"
        title="Services Across the Network"
        lede="Advanced support stacks that speed up tech and business outcomes for every corridor venture."
      >
        <Cards items={SERVICES} cols={3} />
      </Section>

      <Section
        id="corridor-forum"
        tone="red"
        eyebrow="Launch · WTC 2026 · November · Barcelona"
        title="Global Innovation Corridor Forum"
        lede="The corridor launches at the World Token Congress in Barcelona, where its partner countries, investors and innovators meet and set the roadmap."
      >
        <div className="pk-actions" data-rise>
          <Btn enquiry="Web3 Corridor">
            Participate in WTC 2026 <span aria-hidden="true">→</span>
          </Btn>
        </div>
      </Section>

      <Section
        id="corridor-membership"
        eyebrow="Membership · Web360 Club"
        title="Join the Corridor"
        lede="Membership runs through the Web360 Club, and every stage is earned: Bronze for starters and early builders, Silver for multi-country growth, and Gold, invite-only, for global activations."
      >
        <div className="pk-actions" data-rise>
          <Btn href="/memberships#web360">
            See the Web360 Club Tiers <span aria-hidden="true">→</span>
          </Btn>
          <Btn enquiry="Web3 Corridor membership" variant="ghost">
            Get in Touch
          </Btn>
        </div>
      </Section>
    </div>
  )
}
