/**
 * Web3 Corridor — one global corridor.
 *
 * The page tells a single story, in order: there is one corridor; these are
 * the countries partnering on it; this is what it opens for anyone inside it;
 * this is where it launches; and a small membership matrix closes the page,
 * asking people to get in touch. Content follows IBA's corridor membership
 * deck; prices are deliberately not shown.
 *
 * Earlier versions repeated the same idea as objectives, core dimensions,
 * strands, impact and next steps, and named regions in prose. The partner
 * countries are now the flags, and everything a member gets is said once.
 */

import { PageHero, Section, Cards, Btn } from '../../components/Kit'
import { Table } from '../../sections/service/ServiceBlocks'

/* The hero graphic: the supplied map artwork, a glowing red dotted world
   (public/images/corridor-hero-map.jpg), tilted back in 3D with the corridor
   drawn over it: arcs rise between the continents' pins and a pulse runs
   along each. HUBS are the pin centres in the artwork's own pixels, so the
   overlay's viewBox matches the image and the arcs land on the pins. */
const HUBS = {
  americas: [538, 496],
  europe: [910, 260],
  africa: [973, 472],
  uae: [1173, 358],
  india: [1314, 393],
}
const ROUTES = [
  ['americas', 'europe'],
  ['americas', 'africa'],
  ['europe', 'uae'],
  ['europe', 'africa'],
  ['africa', 'uae'],
  ['uae', 'india'],
  ['europe', 'india'],
]
/* a quadratic arc that lifts off the map by a share of its length */
const arc = ([x1, y1], [x2, y2]) => {
  const lift = Math.hypot(x2 - x1, y2 - y1) * 0.32
  return `M${x1} ${y1} Q${(x1 + x2) / 2} ${(y1 + y2) / 2 - lift} ${x2} ${y2}`
}

const HeroMap = () => (
  <figure className="cx-map" aria-label="A glowing world map with the corridor connecting its partner regions">
    <div className="cx-map__stage">
      <img src="/images/corridor-hero-map.jpg" alt="" width="1832" height="859" decoding="async" />
      <svg className="cx-map__routes" viewBox="0 0 1832 859" aria-hidden="true">
        <defs>
          <filter id="cx-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {ROUTES.map(([from, to], i) => {
          const d = arc(HUBS[from], HUBS[to])
          return (
            <g key={from + to} style={{ '--i': i }}>
              <path className="cx-map__arc" d={d} />
              <path className="cx-map__flow" d={d} pathLength="100" />
              <circle className="cx-map__pulse" r="13" filter="url(#cx-glow)">
                <animateMotion dur={`${3 + (i % 3) * 0.6}s`} begin={`-${i * 0.45}s`} repeatCount="indefinite" path={d} />
              </circle>
            </g>
          )
        })}
      </svg>
    </div>
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

/**
 * The corridor's partner countries, from IBA's corridor deck. Each is a node
 * of the same corridor, not a corridor of its own: `strength` is what that
 * market brings, `role` is the part it plays.
 */
const PARTNERS = [
  { code: 'AE', country: 'United Arab Emirates', node: 'Dubai', role: 'Financial hub & global launchpad', text: 'Regulatory clarity and capital access, with frameworks built for virtual assets and free zones incubating Web3 startups.' },
  { code: 'IN', country: 'India', node: 'Home of IBA', role: 'Technical engine & implementation hub', text: 'One of the world’s largest pools of blockchain developers and more than 1,250 active Web3 ventures.' },
  { code: 'ZM', country: 'Zambia', node: 'Africa', role: 'High-growth adoption & real-world utility', text: 'Mobile-first innovation and grassroots adoption, using Web3 to leapfrog legacy infrastructure.' },
  { code: 'ES', country: 'Spain', node: 'Europe', role: 'Governance & mature market integration', text: 'Institutional compliance and standards from Europe’s regulatory lead, and host of the corridor forum in Barcelona.' },
]

/** What being inside the corridor gives you, each said once. */
const ACCESS = [
  {
    num: '01',
    title: 'Web3 Resources',
    text: 'Templates, frameworks, learning on RWA, tokenomics and regulation, and tech support to move faster.',
  },
  {
    num: '02',
    title: 'Partnerships',
    text: 'Introductions to investors, family offices, mentors, tokenization platforms and members across every partner country.',
  },
  {
    num: '03',
    title: 'Growth',
    text: 'Advisory, mentoring and investor readiness that take a startup from founder to fundable venture.',
  },
  {
    num: '04',
    title: 'Expansion',
    text: 'Pre-verified business setup, go-to-market plans and visibility to enter new markets across the corridor.',
  },
]

/** The two sides the corridor serves. */
const SIDES = [
  { tag: 'For Founders', title: 'Tested Pathways to New Markets', text: 'Established opportunities with real scope for funding, local and relevant go-to-market strategies, new markets, advanced technical integration and the tokenization of businesses.' },
  { tag: 'For Investors', title: 'One Framework to De-risk', text: 'A unified framework to de-risk international deployments, with vetted deal flow arriving from every partner country.' },
]

/**
 * The membership matrix: the three tiers, the tokenization packs beside them,
 * and only the offerings that tell them apart. Prices are left out on purpose;
 * the full detail is shared when someone gets in touch.
 */
const Y = '✓'
const N = '—'
const MATRIX = {
  head: ['', 'Bronze', 'Silver', 'Gold', 'Tokeni\u00adzation'],
  rows: [
    ['Best for', 'Early builders', 'Startups', 'By invite', 'Issuers'],
    ['Community, events & Verified badge', Y, Y, Y, Y],
    ['Business setup & GTM advisory', Y, Y, Y, Y],
    ['Investor introductions', N, Y, Y, Y],
    ['Weekly strategy sessions', N, N, Y, N],
    ['Tokenomics & tokenization advisory', N, N, N, Y],
    ['Expert board advisor', N, N, Y, Y],
  ],
}

export default function Corridor() {
  return (
    <div>
      <PageHero
        id="corridor"
        aside={<HeroMap />}
        eyebrow="IBA Web3 Corridor"
        title="One Global Corridor"
        lede="A single corridor that brings countries together, giving everyone inside it access to Web3 resources, partnerships, growth and expansion. It draws on the strengths of each partner country to create value for all of them."
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
        id="corridor-partners"
        eyebrow="Corridor Partners"
        title="The Countries in the Corridor"
        lede="Each partner country is a node of the same corridor. Join through one and you reach them all."
      >
        <ul className="cx-partners">
          {PARTNERS.map((p) => (
            <li className="cx-partner" key={p.code} data-rise>
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
            <p className="cx-partner__text">The corridor grows through new country partners.</p>
            <a className="cx-partner__go" href="/connect" data-enquiry="Web3 Corridor">
              Become a country partner <span aria-hidden="true">→</span>
            </a>
          </li>
        </ul>
      </Section>

      <Section
        id="corridor-access"
        tone="dark"
        eyebrow="Build. Fund. Scale."
        title="What the Corridor Opens"
        lede="Regional fragmentation is the biggest barrier to the next trillion dollars of the decentralized economy. The corridor removes it: startups become founders, founders become fundable ventures, and ventures graduate into the Corridor Club."
      >
        <Cards items={ACCESS} cols={4} />
        <div className="cx-block">
          <Cards items={SIDES} cols={2} />
        </div>
      </Section>

      <Section
        id="corridor-forum"
        tone="red"
        eyebrow="Launch · WTC 2026 · November · Barcelona"
        title="Global Innovation Corridor Forum"
        lede="The corridor launches at the World Token Congress in Barcelona, where its partner countries, investors and innovators meet and the roadmap is set."
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
        lede="Membership is a journey: every stage is gated, and every gate is earned."
      >
        <div id="corridor-matrix" className="cx-table cx-table--matrix">
          <Table head={MATRIX.head} rows={MATRIX.rows} caption="What each corridor membership includes" />
        </div>
        <div className="pk-actions cx-block cx-block--tight" data-rise>
          <Btn enquiry="Web3 Corridor membership">
            Get in Touch <span aria-hidden="true">→</span>
          </Btn>
        </div>
      </Section>
    </div>
  )
}
