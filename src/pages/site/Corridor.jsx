/**
 * Web3 Corridor — one global corridor, connected from India.
 *
 * India Blockchain Alliance runs the corridor from India, so the page shows
 * it that way: India is the hub and the network expands outward from it, in
 * the hero map and in the network diagram below it. The page is built to be
 * read at a glance — a picture, then short tiles — in this order:
 *
 *   hero        the map, with routes growing out of India
 *   network     India at the centre: what flows through the corridor, and
 *               its figures
 *   partners    the countries, India first as the hub
 *   objectives, pillars, what the corridor opens, services, the forum
 *   membership  a pointer to the Web360 Club tiers on /memberships
 *
 * Content follows IBA's corridor deck, cut to its key lines; prices are
 * deliberately not shown. "Asset pooling" is IBA's addition to the network's
 * offer (October 2026).
 */

import { PageHero, Section, Cards, Stats, Btn } from '../../components/Kit'

/* The hero graphic: the supplied map artwork, a glowing red dotted world
   (public/images/corridor-hero-map.jpg), tilted back in 3D with the corridor
   drawn over it. HUBS are the pin centres in the artwork's own pixels, so the
   overlay's viewBox matches the image and the arcs land on the pins. Every
   route starts in India: the arcs draw outward from it one after another,
   then a pulse keeps running along each, away from India. */
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

const HeroMap = () => {
  const [ix, iy] = HUBS.india
  return (
    <figure className="cx-map" aria-label="A glowing world map with the corridor expanding from India to its partner regions">
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
/* The network: India at the centre                                    */
/* ------------------------------------------------------------------ */

/** The spokes of the network diagram, placed round India on a 400 × 400 grid. */
const SPOKES = [
  { code: 'AE', name: 'UAE', place: 'Financial hub', x: 318, y: 88 },
  { code: 'ES', name: 'Europe', place: 'Spain', x: 82, y: 96 },
  { code: 'ZM', name: 'Africa', place: 'Zambia', x: 80, y: 306 },
  { name: 'Americas', place: 'Next', x: 318, y: 312, next: true },
]

const NetworkDiagram = () => (
  <figure className="cx-net" aria-label="India at the centre of the corridor, connected to the UAE, Europe and Africa, with the Americas next">
    <svg viewBox="0 0 400 400" aria-hidden="true">
      {SPOKES.map((s, i) => {
        const d = `M200 200 L${s.x} ${s.y}`
        return (
          <g key={s.name} className={s.next ? 'cx-net__spoke cx-net__spoke--next' : 'cx-net__spoke'}>
            <path d={d} />
            {!s.next && (
              <circle className="cx-net__pulse" r="4">
                <animateMotion dur="2.4s" begin={`${i * 0.5}s`} repeatCount="indefinite" path={d} />
              </circle>
            )}
          </g>
        )
      })}
      <circle className="cx-net__ripple" cx="200" cy="200" r="52" />
      <circle className="cx-net__ripple cx-net__ripple--late" cx="200" cy="200" r="52" />
    </svg>
    <div className="cx-net__hub">
      <Flag code="IN" name="India" />
      <strong>India</strong>
      <span>The hub · IBA</span>
    </div>
    {SPOKES.map((s) => (
      <div
        key={s.name}
        className={s.next ? 'cx-net__node cx-net__node--next' : 'cx-net__node'}
        style={{ left: `${(s.x / 400) * 100}%`, top: `${(s.y / 400) * 100}%` }}
      >
        {s.code ? <Flag code={s.code} name={s.name} /> : <span className="cx-flag cx-flag--next">+</span>}
        <strong>{s.name}</strong>
        <span>{s.place}</span>
      </div>
    ))}
  </figure>
)

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
 * The corridor's partner countries, from IBA's corridor deck, India first:
 * it is the hub the others connect through. `role` is the part each plays.
 */
const PARTNERS = [
  { code: 'IN', country: 'India', node: 'The hub · Home of IBA', role: 'Technical engine', text: 'One of the world’s largest blockchain developer pools and 1,250+ active Web3 ventures.', hub: true },
  { code: 'AE', country: 'United Arab Emirates', node: 'Dubai', role: 'Financial hub & launchpad', text: 'Virtual-asset regulation, capital access and free-zone campuses for Web3 startups.' },
  { code: 'ES', country: 'Spain', node: 'Europe', role: 'Governance & standards', text: 'Europe’s regulatory lead, and host of the corridor forum in Barcelona.' },
  { code: 'ZM', country: 'Zambia', node: 'Africa', role: 'Adoption & real-world use', text: 'Mobile-first adoption and real-world DeFi, with a fast-growing developer base.' },
]

/** The three core objectives. */
const OBJECTIVES = [
  { num: '01', title: 'Connect', text: 'A lasting innovation corridor between nations and global technology, investment and innovation.' },
  { num: '02', title: 'Transfer', text: 'Technology transfer, knowledge exchange and capacity building in emerging technologies.' },
  { num: '03', title: 'Access', text: 'Pathways to markets and funding for startups, SMEs, hubs, women founders and young innovators.' },
]

/** The focus pillars, one line each. */
const PILLARS = [
  { title: 'Web3 & Digital Transformation', text: 'Literacy, adoption and digital skills.' },
  { title: 'Blockchain & Tokenization', text: 'Digital identity, tokenization and smart contracts.' },
  { title: 'Hubs & Co-Working', text: 'Incubation, innovation exchange and shared workspaces.' },
  { title: 'Startups & Investment', text: 'Acceleration, investor readiness and market access.' },
  { title: 'Women in Emerging Tech', text: 'Leadership, skills, entrepreneurship and mentorship.' },
  { title: 'Education & Research', text: 'Certifications, training and academic partnerships.' },
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
  { tag: 'For Founders', title: 'Tested Pathways to New Markets', text: 'Funding, local go-to-market strategies, technical integration and the tokenization of businesses.' },
  { tag: 'For Investors', title: 'One Framework to De-risk', text: 'One framework for international deployment, with vetted deal flow from every partner country.' },
]

/** The services IBA runs across the corridor. */
const SERVICES = [
  { num: '01', title: 'Tech Support', text: 'End-to-end plans and operations for tokenized businesses.' },
  { num: '02', title: 'Business Setup', text: 'Pre-verified legal and regulatory frameworks, KYC and KYB, for each market.' },
  { num: '03', title: 'Advisory & Mentoring', text: 'Veterans who have scaled Web3 across borders, and experts on call.' },
  { num: '04', title: 'Global Visibility', text: 'Marketing, networking and forums in front of global decision-makers.' },
  { num: '05', title: 'Go-To-Market Plans', text: 'Blueprints for fast entry into new markets, with tokenization plans.' },
  { num: '06', title: 'Asset Pooling', text: 'Cross-border pooling of capital and tokenized real-world assets.' },
]

export default function Corridor() {
  return (
    <div>
      <PageHero
        id="corridor"
        aside={<HeroMap />}
        eyebrow="IBA Web3 Corridor · Led from India by India Blockchain Alliance"
        title="One Global Corridor"
        lede="From India to the world. One corridor connects partner countries to shared Web3 resources, capital, partnerships and markets, together home to more than 2.8 billion people."
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
        title="India at the centre. The world connected."
        lede="IBA connects the corridor from India. Every partner joins one network, and everything below moves through it."
      >
        <div className="cx-netwrap">
          <NetworkDiagram />
          <Cards items={FLOWS} cols={2} />
        </div>
        <div className="cx-block">
          <Stats items={FIGURES} dark />
        </div>
      </Section>

      <Section
        id="corridor-partners"
        eyebrow="Corridor Partners"
        title="The Countries in the Corridor"
        lede="India is the hub. Join through any partner and you reach them all."
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
        lede="One infrastructure for cross-border tech and business: startups become founders, and founders become fundable ventures."
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
        lede="IBA runs these for every venture in the corridor, in every partner market."
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
        lede="Corridor membership runs through the Web360 Club: Bronze for founders finding their fit, Silver for going global, and Gold by invitation."
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
