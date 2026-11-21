/**
 * India Market Entry (/india-entry), the page behind the About page's India
 * Entry "Know more" (content review, 11-21).
 *
 * The copy is IBA's "India Market Entry · Web3 Global Corridor" page, in its
 * own order and words, set in the site's blocks. Where the source said the
 * same thing twice it is said once:
 *   · the four phases (Explore, Enter, Establish, Expand) were the hero's
 *     footer, the services filter AND the roadmap; here they are the strip
 *     under the hero and the services tabs, and each tab carries its roadmap
 *     timing and milestones, so there is no separate roadmap section
 *   · the entry-route table is four comparison cards, readable on a phone
 *   · the five pitfalls sit under the five moves they are prevented by
 * The source's notes to its editors ("verify before publication",
 * "placeholders omitted") are not shown on the page.
 */

import { useState } from 'react'
import { PageHero, Section, SubHead, Cards, Stats, Btn } from '../../components/Kit'

const ENQUIRY = 'India Market Entry'
const Arrow = () => <span aria-hidden="true">→</span>

/* ---------------------------------------------------------------- */
/* content                                                           */
/* ---------------------------------------------------------------- */

const PHASES = [
  {
    key: 'Explore',
    line: 'Validate the opportunity',
    time: '0–3 months',
    milestones: ['Market and regulatory scan', 'Route-selection workshop', 'Curated discovery meetings', 'Go/no-go business case'],
    icon: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 5 5" /></>,
  },
  {
    key: 'Enter',
    line: 'Structure the market entry',
    time: '3–9 months',
    milestones: ['Formation, approvals and banking', 'First partners and pilots', 'Core team and Country Manager', 'Policy and regulator outreach'],
    icon: <><path d="M4 12h12M12 6l6 6-6 6" /><path d="M20 4v16" /></>,
  },
  {
    key: 'Establish',
    line: 'Launch operations',
    time: '9–18 months',
    milestones: ['Turnkey implementation', 'First enterprise contracts', 'Local brand and community', 'Compliance operating rhythm'],
    icon: <><path d="M4 20V9l8-5 8 5v11" /><path d="M9 20v-6h6v6M3 20h18" /></>,
  },
  {
    key: 'Expand',
    line: 'Scale through the corridor',
    time: '18 months+',
    milestones: ['Multi-state expansion', 'Fundraise, JV or M&A', 'Corridor expansion', 'Impact assessment and course correction'],
    icon: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9" /><path d="M15 5h5v5M20 5l-5 5" /></>,
  },
]

const SECTORS = ['Blockchain', 'AI / ML', 'Web3', 'Tokenisation', 'Fintech']

const STATS = [
  { value: '4th', label: 'Largest economy globally' },
  { value: '#1', label: 'Grassroots crypto adoption, Chainalysis 2023–25' },
  { value: '~20B', label: 'UPI transactions per month, 2025 approximation' },
  { value: '#2', label: 'GitHub developer community, Octoverse 2024' },
]

const OPPORTUNITIES = [
  { title: 'AI & enterprise technology', text: 'IndiaAI Mission, GCC growth, BFSI and manufacturing AI adoption', icon: <><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" /></> },
  { title: 'Real-world asset tokenisation', text: 'Real estate, funds, carbon, trade finance and infrastructure', icon: <><path d="M5 20V8l7-4 7 4v12M3 20h18" /><path d="M9 20v-5h6v5" /></> },
  { title: 'Fintech on DPI rails', text: 'UPI, Account Aggregator, ONDC and open-credit layers', icon: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18M7 15h4" /></> },
  { title: 'Web3 infrastructure', text: 'Custody, compliance tooling, wallets, chain analytics and developer platforms', icon: <><path d="M12 3 4 7.5v9L12 21l8-4.5v-9Z" /><path d="M4 7.5 12 12l8-4.5M12 12v9" /></> },
  { title: 'GIFT City IFSC', text: 'Global-facing funds, fintech sandbox and digital-asset structures', icon: <><path d="M4 21V9l5-3v15M9 21V4l6 3v14M15 21V11l5 2v8M2 21h20" /></> },
  { title: 'Climate & public goods', text: 'Carbon registries, supply-chain traceability and e-governance', icon: <><path d="M5 19c0-8 6-14 15-14 0 9-6 15-14 15" /><path d="M5 19 13 11" /></> },
].map((o, i) => ({ ...o, num: `OPPORTUNITY 0${i + 1}` }))

const REGIONS = [
  ['India', 'Market entry and implementation'],
  ['UAE', 'Regional connectivity'],
  ['Africa', 'Emerging-market partnerships'],
  ['Europe', 'Institutional market access'],
  ['Americas', 'Capital and global relationships'],
]

const CREDENTIALS = [
  { value: '90+', label: 'Web3 companies advised across real estate, royalties, carbon and AI-fintech' },
  { value: '6', label: 'Governments advised on blockchain and digital-asset strategy' },
  { value: '4', label: 'Regulatory regimes referenced: ADGM, VARA, DIFC and IFSCA' },
]

const REGULATORS = [
  ['RBI', 'Payments, banking, FEMA and stablecoin stance'],
  ['SEBI', 'Tokenised securities, investment products and intermediaries'],
  ['FIU-IND', 'PMLA registration and AML/CFT for VDA service providers'],
  ['CBDT / Income Tax', 'VDA taxation, TDS and crypto-asset reporting'],
  ['MeitY & CERT-In', 'IT and data protection requirements; cybersecurity incident reporting'],
  ['IFSCA', 'GIFT City IFSC fintech sandbox, funds and international units'],
  ['Enforcement Directorate', 'FEMA and PMLA investigations and enforcement'],
  ['MCA / ROC / DPIIT', 'Incorporation, FDI policy and Startup India recognition'],
  ['GST Council', 'Indirect tax on digital and cross-border services'],
  ['State governments', 'State IT/startup policies, incentives and local approvals'],
]

const FRICTIONS = [
  ['Banking & payments', 'Bank account access, payment rails and on/off-ramp relationships'],
  ['Capital flows & FEMA', 'FDI routes, pricing, repatriation and ODI'],
  ['Tax & permanent establishment', 'GST, transfer pricing and PE exposure'],
  ['Regional variation', '28 states and 8 union territories with distinct policies and buyers'],
  ['Relationship-led sales', 'Long enterprise/PSU cycles, procurement and PoC demands'],
  ['Talent & leadership', 'Hiring, retention and credible local management'],
]

const ROUTES = [
  { name: 'Onshore Indian entity', form: 'Wholly owned subsidiary or LLP', fit: 'Indian customers: SaaS, AI, fintech and registered VDA services', who: 'MCA/ROC, RBI/FEMA, FIU-IND, CBDT, GST', watch: 'Banking, VDA tax and AML burden' },
  { name: 'GIFT City IFSC unit', form: 'IFSC company, fund or branch', fit: 'Global-facing funds, fintech, tokenisation and digital-asset structures', who: 'IFSCA, SEZ and tax rules', watch: 'Non-resident client focus and substance requirements' },
  { name: 'JV / strategic partner', form: 'JV company or management contract', fit: 'Regulated sectors, B2G and faster distribution', who: 'Depends on partner licences', watch: 'Control, IP, exit terms and due diligence' },
  { name: 'Offshore HQ + India office', form: 'Branch, liaison, project office or GCC', fit: 'Market testing, R&D, engineering and project work', who: 'RBI/FEMA, MCA/ROC, CBDT', watch: 'Activity restrictions and PE risk' },
]

const MOVES = [
  ['Diagnose', 'Map market readiness, business fit and regulatory exposure'],
  ['Structure', 'Design investment route, entity, licences, tax and FEMA'],
  ['Connect', 'Curated introductions to buyers, regulators, partners and investors'],
  ['Launch', 'Execute pilots, customer acquisition, team and operations'],
  ['Sustain', 'Impact assessment, policy monitoring and course correction'],
]

const PITFALLS = [
  ['Assuming India is one market', 'State- and segment-specific market prioritisation'],
  ['Launching before registrations', 'Readiness review and regulatory support'],
  ['Selecting the wrong local partner', 'Partner search and diligence'],
  ['Underestimating enterprise sales cycles', 'Warm introductions and structured conversion-focused pilots'],
  ['Overlooking tax and FEMA', 'Early legal, tax and investment-route structuring'],
]

const SERVICES = [
  ['Explore', 'Market Intelligence & Business Strategy', 'Know where to play and how to win', ['India entry strategy', 'Market potential and segment prioritisation', 'Competitive benchmarking and partner landscape mapping', 'Regulatory environment and readiness assessment', 'Entry mode and location selection: state, city, GIFT City', 'Business planning and marketing strategy', 'Board-ready India business case']],
  ['Explore', 'Go-To-Market Strategy', 'A clear India vision and roadmap', ['India GTM roadmap and vision', 'Competition analysis and insights', 'Business plan and financial model', 'Pricing and localisation', 'Business development and closure', 'Partner ecosystem development']],
  ['Enter', 'India Company Formation, Regulatory & Legal', 'Get the foundations right first time', ['FDI investment route planning', 'WOS, JV, LLP, branch, liaison, project office or IFSC unit setup', 'RBI, ROC and statutory licences and approvals', 'Representation before regulators', 'FIU-IND registration and AML/KYC programme', 'IFSCA sandbox, DPDP and CERT-In compliance', 'VDA, GST and transfer-pricing tax design']],
  ['Enter', 'Government & Policy Access', 'Engage the people shaping the rules', ['Regulator and ministry engagement strategy', 'Policy consultations', 'State incentives, MoUs and approvals', 'Public-sector pilots and DPI integrations', 'G2G and corridor programmes through GICI', 'Policy monitoring and early-warning briefs']],
  ['Enter', 'Partnerships & Joint Ventures', 'The right partners, properly structured', ['Partner identification and due diligence', 'Partnership structuring and models', 'JV and management contract negotiation', 'Strategic investor and JV partner search', 'Channel, distribution and reseller partners']],
  ['Enter', 'Market Access & Business Development', 'Warm doors, not cold calls', ['C-suite introductions across BFSI, conglomerates and PSUs', 'Network and channel creation', 'Conversion-focused pilots and PoCs', 'Enterprise procurement navigation', 'Delegations and showcases, including World Token Congress India Pavilion', 'Account mapping and pipeline building']],
  ['Establish', 'Implementation', 'Turnkey delivery on the ground', ['Turnkey project management', 'Programme coordination', 'Infrastructure setup support', 'Operations rollout', 'Operating model development', 'Financial modelling', 'Risk assessment and mitigation']],
  ['Establish', 'Operational & Start-Up Strategy', 'Be operational in India, fast', ['Incorporation, banking and offices in Bengaluru, Mumbai, Delhi NCR, Hyderabad and GIFT City', 'Organisation design, EOR, talent and leadership search', 'Interim Country Manager-as-a-Service', 'Systems and processes', 'Vendor management and vetted legal/accounting panel', 'Project management, marketing and prioritisation', 'Payments and on/off-ramp partner onboarding']],
  ['Expand', 'Corporate Strategy & Capital', 'Fund and accelerate India growth', ['Organic and inorganic growth strategy', 'Financial and operational modelling', 'Introductions to VCs, family offices and angels', 'Acquisition scouting and diligence', 'Fund and tokenised-capital structuring', 'Grants, incubators and government schemes', 'Investor-ready India narrative and data room']],
  ['Expand', 'Marketing, Brand & Ecosystem', 'Build a trusted presence', ['Marketing and branding', 'Launch PR and media strategy', 'Developer communities, hackathons and bounties', 'IIT, IIM and incubator partnerships', 'Keynote and thought-leadership platforms', 'Tokenization Foresight executive series', 'Visibility across IBA initiatives']],
  ['Expand', 'Trust, Risk & Governance', 'Stay compliant as rules evolve', ['Counterparty and partner due diligence', 'Regulatory and reputational risk monitoring', 'AML/CFT, Travel Rule and sanctions controls', 'Cybersecurity and incident-reporting protocols', 'Consumer grievance and dispute frameworks', 'Board and investor compliance reporting']],
  ['Expand', 'Impact Assessment', 'Measure impact and correct course', ['Operational assessment and audits', 'Strategy and policy assessments', 'Project audits', 'Advisory to meet objectives', 'Policy-change impact reviews']],
].map(([phase, title, promise, list], i) => ({ n: String(i + 1).padStart(2, '0'), phase, title, promise, list }))

const STRENGTHS = [
  { title: 'Domain specialists', text: 'Experts connecting policymakers, academia, blockchain engineers and venture capital', icon: <><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5" /><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 13.8c2.1.8 3.5 2.9 3.5 5.2" /></> },
  { title: 'Experienced professionals', text: 'Blockchain, AI, technology, academic and policy expertise', icon: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" /></> },
  { title: 'In-house expertise', text: 'Business facilitation, legal, regulatory and expansion support', icon: <><path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6l8-3Z" /><path d="m8.5 12 2.5 2.5 4.5-5" /></> },
  { title: 'Global experience', text: 'Cross-cultural work across the US, UK, Australia, Middle East and Singapore', icon: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z" /></> },
  { title: 'Lean practices', text: 'India-local fee structures paired with specialist delivery', icon: <><path d="M4 18 10 12l4 4 6-8" /><path d="M15 8h5v5" /></> },
  { title: 'Dynamic models', text: 'Flexible engagements aligned to client requirements', icon: <><path d="M20 12a8 8 0 1 1-2.3-5.6" /><path d="M20 4v4.5h-4.5" /></> },
]

const MODELS = [
  { tag: '4–6 weeks', title: 'India Discovery Sprint', list: ['Market and regulatory readiness scan', 'Entry-route recommendation', 'Curated meetings with regulators, buyers and partners', 'India business case'] },
  { tag: '3–9 months', title: 'Market Entry Programme', list: ['Formation, approvals and banking', 'Partners, pilots and first customers', 'Team build and soft landing', 'Government and policy engagement'] },
  { tag: '12 months+', title: 'Country Partner Retainer', list: ['Ongoing government affairs', 'Business development and pipeline', 'Interim Country Manager option', 'Impact assessment and policy watch'] },
  { tag: 'Scoped to need', title: 'Bespoke Mandates', list: ['JV, M&A and capital raises', 'Turnkey project management', 'Tokenisation and fund structuring', 'Delegations and executive programmes'] },
]

const START = [
  ['Discovery', 'Goals, model, timelines'],
  ['Readiness', 'Regulatory, market and route fit'],
  ['Roadmap', 'Scope, phases, deliverables'],
]

/* ---------------------------------------------------------------- */
/* blocks                                                            */
/* ---------------------------------------------------------------- */

/* the hero's 3D globe, the Web3 Corridor's own (as on its page) */
const HeroArt = () => (
  <div className="w3l">
    <img className="w3l__img" src="/images/web3-corridor-globe.webp" alt="" width="765" height="765" decoding="async" fetchpriority="high" />
  </div>
)

/* the 12 services, by phase: each tab carries that phase's roadmap timing
   and milestones above its services; "All 12" shows every service */
function PhaseServices() {
  const [phase, setPhase] = useState('All')
  const current = PHASES.find((p) => p.key === phase)
  const list = phase === 'All' ? SERVICES : SERVICES.filter((s) => s.phase === phase)
  return (
    <div className="iep-svc">
      <div className="iep-tabs" role="tablist" aria-label="Services by phase">
        {['All', ...PHASES.map((p) => p.key)].map((k) => (
          <button
            key={k}
            type="button"
            role="tab"
            aria-selected={phase === k}
            className="iep-tab"
            onClick={() => setPhase(k)}
          >
            {k === 'All' ? 'All 12' : k}
          </button>
        ))}
      </div>

      {current && (
        <div className="iep-phase" data-rise>
          <div className="iep-phase__head">
            <span className="iep-phase__time">{current.time}</span>
            <h3 className="iep-phase__name">{current.key}</h3>
            <p className="iep-phase__line">{current.line}</p>
          </div>
          <ul className="iep-phase__marks">
            {current.milestones.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="iep-svc__grid">
        {list.map((s) => (
          <details className="iep-svc__card" key={s.title}>
            <summary>
              <span className="iep-svc__n">{s.n}</span>
              <span className="iep-svc__head">
                <span className="iep-svc__phase">{s.phase}</span>
                <span className="iep-svc__title">{s.title}</span>
              </span>
              <span className="iep-svc__plus" aria-hidden="true" />
            </summary>
            <div className="iep-svc__body">
              <p className="iep-svc__promise">{s.promise}</p>
              <ul>
                {s.list.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          </details>
        ))}
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- */
/* page                                                              */
/* ---------------------------------------------------------------- */

export default function IndiaEntry() {
  return (
    <div className="iep">
      <PageHero
        id="india-entry"
        aside={<HeroArt />}
        eyebrow="IBA Web3 Global Corridor · India Gateway"
        title={
          <>
            Enter <em className="iep-hl">India</em> right.
            <br />
            Expand without borders.
          </>
        }
        lede="A structured market-entry and growth pathway for global technology, blockchain, AI, fintech and Web3 companies. From regulatory readiness and entity formation to partnerships, first customers, capital and cross-border scale."
        actions={
          <>
            <Btn enquiry={ENQUIRY}>
              Start your India strategy <Arrow />
            </Btn>
            <Btn href="#services" variant="ghost">
              Explore all 12 services
            </Btn>
          </>
        }
      />

      {/* the four phases, under the hero (Tokenization's icon strip) */}
      <nav className="tkp-focus iep-focus band band--light band--own" aria-label="The four phases">
        <ul className="tkp-focus__list">
          {PHASES.map((p) => (
            <li className="tkp-focus__item" key={p.key}>
              <a className="iep-focus__link" href="#services">
                <span className="tkp-focus__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">{p.icon}</svg>
                </span>
                <span className="tkp-focus__label">
                  <b>{p.key}</b>
                  {p.line}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <Section id="overview" eyebrow="The strategic proposition" title="India is a scale opportunity. Entry requires a local operating model.">
        <div className="iep-two">
          <div className="iep-two__copy">
            <p data-rise>
              India combines digital public infrastructure, a substantial technology talent base and expanding
              enterprise demand. Yet foreign entrants must navigate overlapping authorities, banking and FEMA
              requirements, taxes, regional differences and relationship-led commercial cycles.
            </p>
            <p data-rise>
              <b>IBA brings these pieces together:</b> market intelligence, regulatory and legal structuring, policy
              access, curated partnerships, operational delivery and measurable expansion, connected to the wider Web3
              Global Corridor.
            </p>
            <ul className="iep-pills" data-rise>
              {SECTORS.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <figure className="iep-photo" data-rise>
            <img src="/images/corridor-expansion.jpg" alt="" loading="lazy" decoding="async" />
            <figcaption>India / The Global Corridor</figcaption>
          </figure>
        </div>
      </Section>

      <Section
        id="opportunity"
        eyebrow="Why India · Why now"
        title="Global ambition meets India's digital economy."
        lede="Market indicators and six priority segments for international entrants."
      >
        <Stats items={STATS} />
        <p className="iep-note" data-rise>Sources: IMF, Chainalysis, NPCI and GitHub.</p>
        <Cards cols={3} items={OPPORTUNITIES} />
      </Section>

      <Section
        id="corridor"
        tone="dark"
        eyebrow="IBA Web3 Global Corridor"
        title="India is not an isolated destination. It is a gateway to connected markets."
        lede="IBA's corridor model links India with the UAE, Africa, Europe and the Americas to help ventures align regulatory strategy, partnerships, investment, talent and commercial expansion across jurisdictions."
      >
        <ol className="iep-route" data-rise>
          {REGIONS.map(([r, d]) => (
            <li key={r}>
              <b>{r}</b>
              <span>{d}</span>
            </li>
          ))}
        </ol>
        <Stats items={CREDENTIALS} dark />
        <p className="iep-note iep-note--dark" data-rise>
          Specific introductions and services depend on mandate and eligibility.
        </p>
      </Section>

      <Section
        id="regulatory"
        eyebrow="Regulatory intelligence"
        title="Navigate the rulebook—and what lies beyond it."
        lede="India is not one uniform market. Multiple regulators may affect a single business model. The correct entry strategy begins with activity mapping, jurisdiction choice, licensing analysis, tax and operational feasibility."
      >
        <ul className="iep-regs" data-rise>
          {REGULATORS.map(([r, d]) => (
            <li key={r}>
              <b>{r}</b>
              <span>{d}</span>
            </li>
          ))}
        </ul>
        <SubHead>Six friction points that can slow market entry</SubHead>
        <ul className="iep-items iep-items--3" data-rise>
          {FRICTIONS.map(([t, d]) => (
            <li key={t}>
              <b>{t}</b>
              <span>{d}</span>
            </li>
          ))}
        </ul>
        <p className="iep-note" data-rise>
          Digital asset context includes VDA tax and TDS, FIU-IND/PMLA obligations, AML/CFT, DPDP, CERT-In and evolving
          IFSCA arrangements. These are not a blanket authorisation to operate; obligations depend on activity and
          current law. Obtain up-to-date legal and tax advice.
        </p>
      </Section>

      <Section
        id="routes"
        tone="dark"
        eyebrow="Entry architecture"
        title="Four routes. One right fit for your model."
        lede="IBA's route-selection workshop aligns commercial activity, ownership, regulatory permissions, tax exposure and operating needs before incorporation."
      >
        <ul className="iep-routes" data-rise>
          {ROUTES.map((r) => (
            <li className="iep-routes__card" key={r.name}>
              <h3>{r.name}</h3>
              <dl>
                <dt>Form</dt>
                <dd>{r.form}</dd>
                <dt>Best suited to</dt>
                <dd>{r.fit}</dd>
                <dt>Key authorities</dt>
                <dd>{r.who}</dd>
                <dt>Watch-outs</dt>
                <dd className="iep-routes__watch">{r.watch}</dd>
              </dl>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="method"
        eyebrow="How IBA de-risks your entry"
        title="Five connected moves, from first look to sustainable scale."
        lede="Designed to reduce false starts, shorten the path to first revenue and build a credible operating presence."
      >
        <ol className="iep-moves" data-rise>
          {MOVES.map(([t, d], i) => (
            <li key={t}>
              <span className="iep-moves__n">0{i + 1}</span>
              <b>{t}</b>
              <span>{d}</span>
            </li>
          ))}
        </ol>
        <SubHead>Five pitfalls we help prevent</SubHead>
        <ul className="iep-pitfalls" data-rise>
          {PITFALLS.map(([p, fix]) => (
            <li key={p}>
              <span className="iep-pitfalls__risk">{p}</span>
              <span className="iep-pitfalls__fix">{fix}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="services"
        eyebrow="The full advisory and delivery stack"
        title="12 service pillars. One integrated corridor journey."
        lede="Select a phase to see its indicative timing, milestones and services, then open any card to view the detailed scope."
      >
        <PhaseServices />
        <p className="iep-note" data-rise>
          Indicative durations; actual timing depends on sector, regulatory requirements and partner readiness.
        </p>
      </Section>

      <Section
        id="beyond"
        tone="red"
        eyebrow="Beyond market entry"
        title="From a successful India launch to a connected global footprint."
        lede="Build a market-ready business in India, then use the Web3 Global Corridor to explore regional partnerships, international positioning, capital networks and expansion opportunities."
      >
        <div className="pk-actions" data-rise>
          <Btn enquiry={ENQUIRY}>
            Discuss a corridor mandate <Arrow />
          </Btn>
        </div>
      </Section>

      <Section
        id="network"
        eyebrow="Institutional advantage"
        title="One relationship. A connected ecosystem."
        lede="An ecosystem spanning regulators and policymakers, state governments, banks and BFSI, enterprises, VCs, family offices, IITs, IIMs, incubators, industry bodies, media and corridor partners."
      >
        <Cards cols={3} items={STRENGTHS} />
        <p className="iep-note" data-rise>
          Founder: Raj Kapoor, blockchain and AI strategic adviser, adviser to six governments and Chief Strategy
          Officer of the Tokenized Asset Foundation (Washington, DC).
        </p>
      </Section>

      <Section
        id="engage"
        tone="dark"
        eyebrow="Ways to work with IBA"
        title="Flexible mandates. Defined deliverables."
        lede="Choose a focused discovery engagement, a full entry programme, retained country support or a tailored strategic mandate."
      >
        <ul className="iep-models" data-rise>
          {MODELS.map((m) => (
            <li className="iep-models__card" key={m.title}>
              <span className="iep-models__time">{m.tag}</span>
              <h3>{m.title}</h3>
              <ul>
                {m.list.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <p className="iep-note iep-note--dark" data-rise>
          Fee-based engagements at India-local fee levels; pricing and scope are confirmed by proposal.
        </p>
      </Section>

      <Section
        id="contact"
        eyebrow="Start with a clear decision"
        title="Your India opportunity deserves a structured entry plan."
        lede="Begin with a discovery call to define your goals, business model and timeline. Then commission an India readiness assessment and receive a scoped roadmap and proposal."
      >
        <div className="iep-start">
          <ol className="iep-start__steps" data-rise>
            {START.map(([t, d], i) => (
              <li key={t}>
                <span className="iep-moves__n">0{i + 1}</span>
                <b>{t}</b>
                <span>{d}</span>
              </li>
            ))}
          </ol>
          <aside className="iep-contact" data-rise>
            <span className="iep-contact__eyebrow">Contact the India gateway</span>
            <h3>Raj Kapoor</h3>
            <p>Founder, India Blockchain Alliance</p>
            <a
              className="iep-contact__mail"
              href="mailto:rk@indiablockchainalliance.org?subject=India%20Market%20Entry%20%7C%20Web3%20Global%20Corridor"
            >
              rk@indiablockchainalliance.org
            </a>
            <Btn enquiry={ENQUIRY}>
              Request a discovery call <Arrow />
            </Btn>
          </aside>
        </div>
        <p className="iep-disclaimer">
          No regulatory approval, investor funding, introduction or market-entry outcome is guaranteed. This page is
          informational, not legal, tax or investment advice.
        </p>
      </Section>
    </div>
  )
}
