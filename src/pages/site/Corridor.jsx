/**
 * Web3 Corridor — one global corridor.
 *
 * The page tells a single story, in order: there is one corridor and why it
 * exists; these are the countries partnering on it; these are its objectives
 * and focus pillars; this is what it opens and how IBA supports it; this is
 * where it launches; and the memberships close the page, each card opening
 * its page under /memberships. Content follows IBA's corridor deck; prices
 * are deliberately not shown.
 */

import { PageHero, Section, Cards, Btn, Bullets } from '../../components/Kit'
import { ALL_MEMBERSHIPS, MEMBERSHIPS_PATH, MEMBERSHIP_TOPIC, membershipPath } from '../../memberships'

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
  { code: 'AE', country: 'United Arab Emirates', node: 'Dubai', role: 'Financial hub & global launchpad', text: 'Regulatory clarity and capital access. The UAE set a global precedent with regulatory frameworks built specifically for virtual assets. Its government-backed free zones run dedicated campuses that incubate Web3 startups, supported by strong public-private partnerships.' },
  { code: 'IN', country: 'India', node: 'Home of IBA', role: 'Technical engine & implementation hub', text: 'One of the world’s largest pools of blockchain developers and more than 1,250 active Web3 ventures. India contributes heavily to open-source protocols, zero-knowledge privacy solutions and decentralized applications. It already uses blockchain across government, telecoms and finance.' },
  { code: 'ZM', country: 'Zambia', node: 'Africa', role: 'High-growth adoption & real-world utility', text: 'Mobile-first innovation and grassroots adoption. Africa is a global frontrunner in crypto adoption and DeFi, driven by economic need rather than speculation. It uses Web3 to leapfrog legacy infrastructure, remove real financial friction and grow a large wave of developer talent.' },
  { code: 'ES', country: 'Spain', node: 'Europe', role: 'Governance & mature market integration', text: 'Institutional compliance and standards from Europe’s regulatory lead, and host of the corridor forum in Barcelona. Europe has pioneered comprehensive legal standards for digital assets. The EU also actively funds and pilots Web3 projects for digital sovereignty.' },
]

/** Why the corridor exists. */
const WHY = [
  'Responds to the need for stronger cross-border collaboration in emerging technologies, startup growth and digital transformation.',
  'Unlocks opportunities across regions that together represent more than 2.8 billion people.',
  'Grows the Web3 & AI Corridor into a global innovation platform, with the Americas next.',
  'Speeds up technology transfer, investment, entrepreneurship and ecosystem collaboration across regions.',
]

/** The three core objectives. */
const OBJECTIVES = [
  { num: '01', title: 'Connect', text: 'Build a sustainable innovation corridor connecting nations with global technology, investment and innovation ecosystems.' },
  { num: '02', title: 'Transfer', text: 'Facilitate technology transfer, knowledge exchange and capacity building in emerging technologies.' },
  { num: '03', title: 'Access', text: 'Create pathways for startups, SMEs, innovation hubs, women entrepreneurs and young innovators to reach markets and funding.' },
]

/** The focus pillars, each with what it works on and what it leads to. */
const PILLARS = [
  { title: 'Web3 Technologies & Digital Transformation', text: 'Web3 literacy, adoption, digital skills and Web3-powered solutions.', outcome: 'Workforce readiness, digital competitiveness and faster transformation.' },
  { title: 'Blockchain, Web3 & Tokenization', text: 'Digital identity, tokenization, smart contracts and decentralized technologies.', outcome: 'Wider adoption, faster innovation and cross-border collaboration.' },
  { title: 'Hubs & Co-Working Ecosystems', text: 'Hub development, startup incubation, innovation exchange and collaborative workspaces.', outcome: 'Stronger innovation infrastructure and regional collaboration.' },
  { title: 'Startup Development & Investment', text: 'Startup acceleration, venture development, investor readiness and market access.', outcome: 'More funding, stronger scaling pathways and international partnerships.' },
  { title: 'Girls & Women in Emerging Technologies', text: 'Leadership development, skills training, entrepreneurship and mentorship.', outcome: 'Greater participation, inclusion and women-led innovation.' },
  { title: 'Education, Research & Capacity Building', text: 'Certifications, training, research collaboration and academic partnerships.', outcome: 'Industry-ready talent and lasting capacity building.' },
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

/** How IBA supports ventures across the corridor. */
const SUPPORT = [
  { title: 'Tech Support', text: 'End-to-end plans and operational support for tokenized business solutions.' },
  { title: 'Business Setup', text: 'Pre-verified frameworks for the legal and regulatory requirements of each corridor market, plus advanced KYC and KYB systems.' },
  { title: 'Advisory & Mentoring', text: 'Direct access to industry veterans who have scaled Web3 across borders, plus mentor sessions with subject-matter experts for tailored solutions.' },
  { title: 'Global Visibility', text: 'Integrated marketing and networking that put your venture in front of global decision-makers, with forums for visibility, investor readiness and funding tracks.' },
  { title: 'Go-To-Market Plans', text: 'Complete blueprints to launch and scale globally, actionable strategies for fast entry into high-demand markets, and separate plans for tokenization.' },
]

/* the memberships, as Explore cards; each opens its own page */
const MEMBERSHIPS = ALL_MEMBERSHIPS.map((m) => ({
  title: m.name,
  text: m.summary || undefined,
  href: membershipPath(m),
  cta: 'Explore',
}))

export default function Corridor() {
  return (
    <div>
      <PageHero
        id="corridor"
        aside={<HeroMap />}
        eyebrow="IBA Web3 Corridor · A high-velocity initiative by India Blockchain Alliance"
        title="One Global Corridor"
        lede="A single corridor that brings countries together, giving everyone inside it access to Web3 resources, partnerships, growth and expansion. It draws on the strengths of each partner country to create value for all of them. Together, those countries map a trillion-dollar opportunity and are home to more than 2.8 billion people."
        actions={
          <>
            <Btn href={MEMBERSHIPS_PATH}>
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
        tone="card"
        eyebrow="The Corridor Focus"
        title="A Corridor for Shared Growth"
        lede="Connecting Africa, the UAE, India and Europe through innovation, technology, investment and partnerships."
      >
        <div className="cx-why" data-rise>
          <Bullets items={WHY} />
        </div>
      </Section>

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
        id="corridor-objectives"
        tone="card"
        eyebrow="The Corridor Objectives"
        title="The Three Core Objectives"
      >
        <Cards items={OBJECTIVES} cols={3} />
      </Section>

      <Section id="corridor-pillars" eyebrow="Focus Pillars" title="Focus Pillars">
        <Cards items={PILLARS} cols={3} />
      </Section>

      <Section
        id="corridor-access"
        tone="dark"
        eyebrow="Build. Fund. Scale."
        title="What the Corridor Opens"
        lede="Regional fragmentation is the biggest barrier to the next trillion dollars of the decentralized economy. The IBA Web3 Corridor removes it with one central infrastructure for cross-border tech and business. Startups become founders, founders become fundable ventures, and ventures graduate into the Corridor Club."
      >
        <Cards items={ACCESS} cols={4} />
        <div className="cx-block">
          <Cards items={SIDES} cols={2} />
        </div>
      </Section>

      <Section
        id="corridor-support"
        tone="card"
        eyebrow="Growth with Advantage"
        title="Shaping the Africa–UAE–India–Europe Corridor"
        lede="One cohesive platform that breaks down regulatory and geographic silos so innovators can scale across high-growth international markets. IBA is the central catalyst through its Corridor Engagement Programs."
      >
        <Cards items={SUPPORT} cols={3} />
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
        eyebrow="Web3 Corridor Memberships"
        title="Join the Corridor"
        lede="IBA’s own membership tracks and partner memberships, each with its own page. Every enquiry comes to IBA first."
      >
        <Cards items={MEMBERSHIPS} cols={4} />
        <div className="pk-actions cx-block cx-block--tight" data-rise>
          <Btn href={MEMBERSHIPS_PATH}>
            All Memberships <span aria-hidden="true">→</span>
          </Btn>
          <Btn enquiry={MEMBERSHIP_TOPIC} variant="ghost">
            Enquire Through IBA
          </Btn>
        </div>
      </Section>
    </div>
  )
}
