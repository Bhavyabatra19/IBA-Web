/**
 * Web3 Corridor — one global corridor.
 *
 * The page tells a single story, in order: there is one corridor; these are
 * the countries partnering on it; this is what it opens for anyone inside it;
 * this is where it launches; and this is how to become a member. Membership,
 * its matrix and its terms close the page.
 *
 * Earlier versions repeated the same idea as objectives, core dimensions,
 * strands, impact and next steps, and named regions in prose. The partner
 * countries are now the flags, and everything a member gets is said once.
 */

import { PageHero, Section, Cards, Form, Btn, SubHead } from '../../components/Kit'
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
 * The corridor's partner countries. Each is a door into the same corridor,
 * not a corridor of its own; the role says what that country brings to it.
 */
const PARTNERS = [
  { code: 'IN', country: 'India', city: 'New Delhi', role: 'Strategic advisory lead', text: 'Home of the India Blockchain Alliance: Web3 services, knowledge sharing, membership and international collaboration.' },
  { code: 'AE', country: 'United Arab Emirates', city: 'Dubai', role: 'Activation hub', text: 'The corridor’s gateway for investment and partnerships, with TheBlock as the venue where startups and investors meet.' },
  { code: 'ES', country: 'Spain', city: 'Barcelona', role: 'Launch stage', text: 'The corridor’s European partner and host of the Global Innovation Corridor Forum at WTC 2026.' },
  { code: 'ZM', country: 'Zambia', city: 'Lusaka', role: 'Talent hub', text: 'The corridor’s African partner through the Indo Zambia Blockchain Alliance: programmes, hubs and capacity building.' },
]

/** What being inside the corridor gives you, each said once. */
const ACCESS = [
  {
    num: '01',
    title: 'Web3 Resources',
    text: 'Shared knowledge, research, certifications and advisory from every partner country, in one place.',
    list: ['Blockchain, tokenization and digital identity expertise', 'Training and credentials through Verifyble', 'Regulatory insight across partner markets'],
  },
  {
    num: '02',
    title: 'Partnerships',
    text: 'Introductions to the governments, institutions, corporates and builders already in the corridor.',
    list: ['Investors, funds and launchpads', 'Universities and innovation hubs', 'Councils and industry bodies'],
  },
  {
    num: '03',
    title: 'Growth',
    text: 'Support to take ventures and people from early stage to investment-ready.',
    list: ['Startup acceleration and investor readiness', 'Women and girls in emerging technology', 'Mentors and talent across the network'],
  },
  {
    num: '04',
    title: 'Expansion',
    text: 'One membership that opens every partner market, instead of starting over in each.',
    list: ['Market entry into partner countries', 'Cross-border pilots and projects', 'A presence at corridor events worldwide'],
  },
]

/** Programmes the corridor runs through: links, not descriptions. */
const PROGRAMMES = [
  { title: 'Tech4Good', href: '/initiatives#init-tech4good', cta: 'Explore' },
  { title: 'Blockchain Council', href: '/ecosystem#communities', cta: 'Explore' },
  { title: 'Green Chain Protocol', href: '/initiatives#init-green-chain', cta: 'Explore' },
  { title: 'Verifyble', href: '/initiatives#init-verifyble', cta: 'Explore' },
  { title: 'Red Club', href: '/red-club', cta: 'Explore' },
  { title: 'Emerging Tech Council', href: '/ecosystem#communities', cta: 'Explore' },
]

/**
 * The two memberships, by name.
 *
 * ⚠ The descriptions come from the site's own navigation; replace them with
 * the wording in IBA's corridor deck. Prices are left out on purpose until IBA
 * publishes them.
 */
const MEMBERSHIPS = [
  { tag: 'Organisations', title: 'Partner Members', text: 'For companies, institutions and public bodies partnering on the corridor across its member countries.', href: '#join-corridor', cta: 'Apply' },
  { tag: 'Individuals', title: 'Web360 Members', text: 'For founders, professionals and builders joining the corridor network as individuals.', href: '#join-corridor', cta: 'Apply' },
]

/**
 * ⚠ TO FILL from IBA's corridor deck: the membership matrix and the terms.
 *
 * MATRIX: one row per benefit, one column per membership, e.g.
 *   head: ['Benefit', 'Partner Members', 'Web360 Members'],
 *   rows: [['Corridor network access', '✓', '✓'], ...]
 * TERMS: one string per clause.
 *
 * Both sections render as soon as they have content; until then the page
 * offers them on request rather than inventing either.
 */
const MATRIX = { head: ['Benefit', 'Partner Members', 'Web360 Members'], rows: [] }
const TERMS = []

export default function Corridor() {
  return (
    <div>
      <PageHero
        id="corridor"
        aside={<HeroMap />}
        eyebrow="IBA Web3 Corridor"
        title="One Global Corridor"
        lede="A single corridor that brings countries together, giving everyone inside it access to Web3 resources, partnerships, growth and expansion across every partner market."
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
        lede="Each partner country is a door into the same corridor. Join through one and you reach them all."
      >
        <ul className="cx-partners">
          {PARTNERS.map((p) => (
            <li className="cx-partner" key={p.code} data-rise>
              <Flag code={p.code} name={p.country} />
              <p className="cx-partner__role">{p.role}</p>
              <h3 className="cx-partner__name">{p.country}</h3>
              <p className="cx-partner__city">{p.city}</p>
              <p className="cx-partner__text">{p.text}</p>
            </li>
          ))}
          <li className="cx-partner cx-partner--next" data-rise>
            <span className="cx-flag cx-flag--next" aria-hidden="true">+</span>
            <p className="cx-partner__role">Expanding</p>
            <h3 className="cx-partner__name">Your Country</h3>
            <p className="cx-partner__text">The corridor grows through new country partners.</p>
            <a className="cx-partner__go" href="#join-corridor" data-enquiry="Web3 Corridor">
              Become a country partner <span aria-hidden="true">→</span>
            </a>
          </li>
        </ul>
      </Section>

      <Section
        id="corridor-access"
        tone="dark"
        eyebrow="What the Corridor Opens"
        title="Access Across Every Partner Country"
        lede="Being in the corridor means being connected to all of it."
      >
        <Cards items={ACCESS} cols={4} />
      </Section>

      <Section id="corridor-programmes" eyebrow="Inside the Corridor" title="Programmes Running Through It">
        <Cards items={PROGRAMMES} cols={3} />
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
        eyebrow="Membership"
        title="Join the Corridor"
        lede="Two ways in, one corridor."
      >
        <Cards items={MEMBERSHIPS} cols={2} />

        <div id="corridor-matrix" className="cx-block">
          <SubHead>Membership Matrix</SubHead>
          {MATRIX.rows.length ? (
            <Table head={MATRIX.head} rows={MATRIX.rows} caption="What each corridor membership includes" />
          ) : (
            <RequestDoc topic="Corridor membership matrix">Request the membership matrix</RequestDoc>
          )}
        </div>

        <div id="corridor-terms" className="cx-block">
          <SubHead>Terms of Membership</SubHead>
          {TERMS.length ? (
            <ol className="cx-terms" data-rise>
              {TERMS.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ol>
          ) : (
            <RequestDoc topic="Corridor membership terms">Request the terms of membership</RequestDoc>
          )}
        </div>
      </Section>

      <Section id="join-corridor" tone="dark" eyebrow="Apply" title="Become a Corridor Member">
        <Form
          subject="Corridor membership application"
          submit="Apply to Join the Corridor"
          consent="I agree to be contacted about my enquiry."
          fields={[
            { name: 'name', label: 'Name' },
            { name: 'org', label: 'Organisation' },
            { name: 'email', label: 'Work email', type: 'email' },
            { name: 'country', label: 'Country' },
            { name: 'membership', label: 'Membership', type: 'select', options: ['Partner Member', 'Web360 Member', 'Country partner', 'Not sure yet'] },
            { name: 'looking', label: "What you're looking for", type: 'textarea' },
          ]}
        />
      </Section>
    </div>
  )
}

/** Until a document is published on the page, it is offered on request. */
const RequestDoc = ({ topic, children }) => (
  <div className="pk-actions" data-rise>
    <Btn enquiry={topic} variant="ghost">
      {children} <span aria-hidden="true">→</span>
    </Btn>
  </div>
)
