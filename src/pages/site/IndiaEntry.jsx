/**
 * India Entry Strategy, where the Expertise page's India Entry band's
 * "Know more" goes.
 *
 * The copy is the client's "India Market Entry | IBA Web3 Global Corridor"
 * page (supplied as HTML, 11-23, adapted from IBA's November 2026 India
 * market-entry presentation), set in the Tokenization page's sections and
 * card designs (by request: "the same format as the Tokenization part").
 * Its own header, footer and contact block are left out; the site's are used
 * instead, and its "Request a discovery call" opens the site's enquiry form
 * on the India Market Entry topic.
 *
 * ⚠ The market figures and credential counts come from the client's copy,
 * which itself says they should be independently verified before
 * publication; the notes under them say so on the page, as the source does.
 *
 * Tones alternate light and dark with no two dark bands touching, as on
 * Tokenization (brandbook.css, "India Entry grounds").
 */

import { useState } from 'react'
import { PageHero, Section, SubHead, Cards, Btn, Stats } from '../../components/Kit'
import IndiaGateway from '../../components/IndiaGateway'
import MissionPillars from '../../components/MissionPillars'

const ENQUIRY = 'India Market Entry'

const I = {
  search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 5 5" /></>,
  layers: <><path d="M12 3 3 7.5l9 4.5 9-4.5Z" /><path d="m3 12 9 4.5 9-4.5M3 16.5 12 21l9-4.5" /></>,
  shield: <><path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6l8-3Z" /><path d="m8.5 12 2.5 2.5 4.5-5" /></>,
  network: <><circle cx="6" cy="6" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="12" cy="18" r="2.5" /><path d="M8 7.5l3 8.5M16 7.5l-3 8.5M8.5 6h7" /></>,
  rocket: <><path d="M12 2.5c3 2.2 4.5 5.4 4.5 9.2V16h-9v-4.3c0-3.8 1.5-7 4.5-9.2Z" /><circle cx="12" cy="9.5" r="1.8" /><path d="M7.5 12.5 5 15v3l2.5-2M16.5 12.5 19 15v3l-2.5-2" /></>,
  cycle: <><path d="M20 12a8 8 0 1 1-2.3-5.6" /><path d="M20 4v4.5h-4.5" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z" /></>,
  bank: <><path d="M3 9.5 12 4l9 5.5M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18" /></>,
  coins: <><ellipse cx="9" cy="7" rx="6" ry="2.5" /><path d="M3 7v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V7" /><path d="M9 16.5c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4c0-1.4-2.7-2.5-6-2.5" /></>,
  map: <><path d="M3 6.5 9 4l6 2.5L21 4v13.5L15 20l-6-2.5L3 20Z" /><path d="M9 4v13.5M15 6.5V20" /></>,
  handshake: <><path d="m3 11 4-4 5 2 5-2 4 4-5 5-2-1-2 2-2-1-2 1-5-6Z" /><path d="m12 9-3 3 2 2" /></>,
  users: <><circle cx="9" cy="8" r="3.2" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" /><circle cx="17" cy="9" r="2.5" /><path d="M16 14.2c2.8.3 5 2.6 5 5.8" /></>,
  leaf: <><path d="M5 19c0-8 5-13 15-14-1 10-6 15-14 15" /><path d="M5 19c3-4 6-7 10-9" /></>,
  chip: <><rect x="6" y="6" width="12" height="12" rx="1.5" /><path d="M9 2.5v3.5M15 2.5v3.5M9 18v3.5M15 18v3.5M2.5 9H6M2.5 15H6M18 9h3.5M18 15h3.5" /></>,
}

/* the four phases, in their own white strip under the hero */
const PHASES = [
  { label: 'Explore', text: 'Validate the opportunity', icon: I.search },
  { label: 'Enter', text: 'Structure the market entry', icon: I.layers },
  { label: 'Establish', text: 'Launch operations', icon: I.rocket },
  { label: 'Expand', text: 'Scale through the corridor', icon: I.globe },
]

const SECTORS = ['Blockchain', 'AI / ML', 'Web3', 'Tokenisation', 'Fintech']

const FIGURES = [
  { value: '4th', label: 'Largest economy globally, as described in the source' },
  { value: '#1', label: 'Grassroots crypto adoption, Chainalysis 2023–25' },
  { value: '~20B', label: 'UPI transactions per month, the source’s 2025 approximation' },
  { value: '#2', label: 'GitHub developer community, the source citing Octoverse 2024' },
]

const OPPORTUNITIES = [
  { icon: I.chip, title: 'AI & enterprise technology', text: 'IndiaAI Mission, GCC growth, BFSI and manufacturing AI adoption.' },
  { icon: I.layers, title: 'Real-world asset tokenisation', text: 'Real estate, funds, carbon, trade finance and infrastructure.' },
  { icon: I.coins, title: 'Fintech on DPI rails', text: 'UPI, Account Aggregator, ONDC and open-credit layers.' },
  { icon: I.network, title: 'Web3 infrastructure', text: 'Custody, compliance tooling, wallets, chain analytics and developer platforms.' },
  { icon: I.bank, title: 'GIFT City IFSC', text: 'Global-facing funds, fintech sandbox and digital-asset structures.' },
  { icon: I.leaf, title: 'Climate & public goods', text: 'Carbon registries, supply-chain traceability and e-governance.' },
]

const CREDENTIALS = [
  { value: '90+', label: 'Web3 companies advised across real estate, royalties, carbon and AI-fintech' },
  { value: '6', label: 'Governments advised on blockchain and digital-asset strategy' },
  { value: '4', label: 'Regulatory regimes referenced: ADGM, VARA, DIFC and IFSCA' },
]

const REGIONS = [
  { num: 'India', title: 'Market entry and implementation' },
  { num: 'UAE', title: 'Regional connectivity' },
  { num: 'Africa', title: 'Emerging-market partnerships' },
  { num: 'Europe', title: 'Institutional market access' },
  { num: 'Americas', title: 'Capital and global relationships' },
]

const REGULATORS = [
  { title: 'RBI', text: 'Payments, banking, FEMA and stablecoin stance.' },
  { title: 'SEBI', text: 'Tokenised securities, investment products and intermediaries.' },
  { title: 'FIU-IND', text: 'PMLA registration and AML/CFT for VDA service providers.' },
  { title: 'CBDT / Income Tax', text: 'VDA taxation, TDS and crypto-asset reporting.' },
  { title: 'MeitY & CERT-In', text: 'IT and data protection requirements; cybersecurity incident reporting.' },
  { title: 'IFSCA', text: 'GIFT City IFSC fintech sandbox, funds and international units.' },
  { title: 'Enforcement Directorate', text: 'FEMA and PMLA investigations and enforcement.' },
  { title: 'MCA / ROC / DPIIT', text: 'Incorporation, FDI policy and Startup India recognition.' },
  { title: 'GST Council', text: 'Indirect tax on digital and cross-border services.' },
  { title: 'State governments', text: 'State IT and startup policies, incentives and local approvals.' },
]

const FRICTIONS = [
  { icon: I.bank, title: 'Banking & payments', text: 'Bank account access, payment rails and on/off-ramp relationships.' },
  { icon: I.coins, title: 'Capital flows & FEMA', text: 'FDI routes, pricing, repatriation and ODI.' },
  { icon: I.shield, title: 'Tax & permanent establishment', text: 'GST, transfer pricing and PE exposure.' },
  { icon: I.map, title: 'Regional variation', text: '28 states and 8 union territories with distinct policies and buyers.' },
  { icon: I.handshake, title: 'Relationship-led sales', text: 'Long enterprise and PSU cycles, procurement and PoC demands.' },
  { icon: I.users, title: 'Talent & leadership', text: 'Hiring, retention and credible local management.' },
]

const ROUTES = [
  {
    num: 'Route 01',
    title: 'Onshore Indian entity',
    sub: 'Wholly owned subsidiary or LLP',
    text: 'Best suited to Indian customers: SaaS, AI, fintech and registered VDA services.',
    list: ['Key authorities: MCA/ROC, RBI/FEMA, FIU-IND, CBDT, GST', 'Watch-outs: banking, VDA tax and AML burden'],
  },
  {
    num: 'Route 02',
    title: 'GIFT City IFSC unit',
    sub: 'IFSC company, fund or branch',
    text: 'Best suited to global-facing funds, fintech, tokenisation and digital-asset structures.',
    list: ['Key authorities: IFSCA, SEZ and tax rules', 'Watch-outs: non-resident client focus and substance requirements'],
  },
  {
    num: 'Route 03',
    title: 'JV / strategic partner',
    sub: 'JV company or management contract',
    text: 'Best suited to regulated sectors, B2G and faster distribution.',
    list: ['Key authorities: depend on partner licences', 'Watch-outs: control, IP, exit terms and due diligence'],
  },
  {
    num: 'Route 04',
    title: 'Offshore HQ + India office',
    sub: 'Branch, liaison, project office or GCC',
    text: 'Best suited to market testing, R&D, engineering and project work.',
    list: ['Key authorities: RBI/FEMA, MCA/ROC, CBDT', 'Watch-outs: activity restrictions and PE risk'],
  },
]

/* the five moves, as the Tokenization framework's glass cards */
const MOVES = [
  { key: 'diagnose', icon: I.search, title: '01  Diagnose', short: 'Map market readiness, business fit and regulatory exposure.' },
  { key: 'structure', icon: I.layers, title: '02  Structure', short: 'Design investment route, entity, licences, tax and FEMA.' },
  { key: 'connect', icon: I.network, title: '03  Connect', short: 'Curated introductions to buyers, regulators, partners and investors.' },
  { key: 'launch', icon: I.rocket, title: '04  Launch', short: 'Execute pilots, customer acquisition, team and operations.' },
  { key: 'sustain', icon: I.cycle, title: '05  Sustain', short: 'Impact assessment, policy monitoring and course correction.' },
]

const SERVICES = [
  ['Explore', 'Market Intelligence & Business Strategy', 'Know where to play and how to win', ['India entry strategy', 'Market potential and segment prioritisation', 'Competitive benchmarking and partner landscape mapping', 'Regulatory environment and readiness assessment', 'Entry mode and location selection: state, city, GIFT City', 'Business planning and marketing strategy', 'Board-ready India business case']],
  ['Explore', 'Go-To-Market Strategy', 'A clear India vision and roadmap', ['India GTM roadmap and vision', 'Competition analysis and insights', 'Business plan and financial model', 'Pricing and localisation', 'Business development and closure', 'Partner ecosystem development']],
  ['Enter', 'India Company Formation, Regulatory & Legal', 'Get the foundations right first time', ['FDI investment route planning', 'WOS, JV, LLP, branch, liaison, project office or IFSC unit setup', 'RBI, ROC and statutory licences and approvals', 'Representation before regulators', 'FIU-IND registration and AML/KYC programme', 'IFSCA sandbox, DPDP and CERT-In compliance', 'VDA, GST and transfer-pricing tax design']],
  ['Enter', 'Government & Policy Access', 'Engage the people shaping the rules', ['Regulator and ministry engagement strategy', 'Policy consultations', 'State incentives, MoUs and approvals', 'Public-sector pilots and DPI integrations', 'G2G and corridor programmes through GICI', 'Policy monitoring and early-warning briefs']],
  ['Enter', 'Partnerships & Joint Ventures', 'The right partners, properly structured', ['Partner identification and due diligence', 'Partnership structuring and models', 'JV and management contract negotiation', 'Strategic investor and JV partner search', 'Channel, distribution and reseller partners']],
  ['Enter', 'Market Access & Business Development', 'Warm doors, not cold calls', ['C-suite introductions across BFSI, conglomerates and PSUs', 'Network and channel creation', 'Conversion-focused pilots and PoCs', 'Enterprise procurement navigation', 'Delegations and showcases, including the World Token Congress India Pavilion', 'Account mapping and pipeline building']],
  ['Establish', 'Implementation', 'Turnkey delivery on the ground', ['Turnkey project management', 'Programme coordination', 'Infrastructure setup support', 'Operations rollout', 'Operating model development', 'Financial modelling', 'Risk assessment and mitigation']],
  ['Establish', 'Operational & Start-Up Strategy', 'Be operational in India, fast', ['Incorporation, banking and offices in Bengaluru, Mumbai, Delhi NCR, Hyderabad and GIFT City', 'Organisation design, EOR, talent and leadership search', 'Interim Country Manager-as-a-Service', 'Systems and processes', 'Vendor management and a vetted legal and accounting panel', 'Project management, marketing and prioritisation', 'Payments and on/off-ramp partner onboarding']],
  ['Expand', 'Corporate Strategy & Capital', 'Fund and accelerate India growth', ['Organic and inorganic growth strategy', 'Financial and operational modelling', 'Introductions to VCs, family offices and angels', 'Acquisition scouting and diligence', 'Fund and tokenised-capital structuring', 'Grants, incubators and government schemes', 'Investor-ready India narrative and data room']],
  ['Expand', 'Marketing, Brand & Ecosystem', 'Build a trusted presence', ['Marketing and branding', 'Launch PR and media strategy', 'Developer communities, hackathons and bounties', 'IIT, IIM and incubator partnerships', 'Keynote and thought-leadership platforms', 'Tokenization Foresight executive series', 'Visibility across IBA initiatives']],
  ['Expand', 'Trust, Risk & Governance', 'Stay compliant as rules evolve', ['Counterparty and partner due diligence', 'Regulatory and reputational risk monitoring', 'AML/CFT, Travel Rule and sanctions controls', 'Cybersecurity and incident-reporting protocols', 'Consumer grievance and dispute frameworks', 'Board and investor compliance reporting']],
  ['Expand', 'Impact Assessment', 'Measure impact and correct course', ['Operational assessment and audits', 'Strategy and policy assessments', 'Project audits', 'Advisory to meet objectives', 'Policy-change impact reviews']],
].map(([phase, title, sub, list], i) => ({ phase, num: `${String(i + 1).padStart(2, '0')} · ${phase}`, title, sub, list }))

const FILTERS = ['All', 'Explore', 'Enter', 'Establish', 'Expand']

const PITFALLS = [
  'Assuming India is one market',
  'Launching before registrations',
  'Selecting the wrong local partner',
  'Underestimating enterprise sales cycles',
  'Overlooking tax and FEMA',
]
const PREVENTION = [
  'State- and segment-specific market prioritisation',
  'Readiness review and regulatory support',
  'Partner search and diligence',
  'Warm introductions and structured, conversion-focused pilots',
  'Early legal, tax and investment-route structuring',
]

const STRENGTHS = [
  { num: 'Strength 01', title: 'Domain specialists', text: 'Experts connecting policymakers, academia, blockchain engineers and venture capital.' },
  { num: 'Strength 02', title: 'Experienced professionals', text: 'Blockchain, AI, technology, academic and policy expertise.' },
  { num: 'Strength 03', title: 'In-house expertise', text: 'Business facilitation, legal, regulatory and expansion support.' },
  { num: 'Strength 04', title: 'Global experience', text: 'Cross-cultural work across the US, UK, Australia, Middle East and Singapore.' },
  { num: 'Strength 05', title: 'Lean practices', text: 'India-local fee structures paired with specialist delivery.' },
  { num: 'Strength 06', title: 'Dynamic models', text: 'Flexible engagements aligned to client requirements.' },
]

const ROADMAP = [
  { num: '0–3 months', title: 'Explore', list: ['Market and regulatory scan', 'Route-selection workshop', 'Curated discovery meetings', 'Go/no-go business case'] },
  { num: '3–9 months', title: 'Enter', list: ['Formation, approvals and banking', 'First partners and pilots', 'Core team and Country Manager', 'Policy and regulator outreach'] },
  { num: '9–18 months', title: 'Establish', list: ['Turnkey implementation', 'First enterprise contracts', 'Local brand and community', 'Compliance operating rhythm'] },
  { num: '18 months+', title: 'Expand', list: ['Multi-state expansion', 'Fundraise, JV or M&A', 'Corridor expansion', 'Impact assessment and course correction'] },
]

const MODELS = [
  { num: '4–6 weeks', title: 'India Discovery Sprint', list: ['Market and regulatory readiness scan', 'Entry-route recommendation', 'Curated meetings with regulators, buyers and partners', 'India business case'] },
  { num: '3–9 months', title: 'Market Entry Programme', list: ['Formation, approvals and banking', 'Partners, pilots and first customers', 'Team build and soft landing', 'Government and policy engagement'] },
  { num: '12 months+', title: 'Country Partner Retainer', list: ['Ongoing government affairs', 'Business development and pipeline', 'Interim Country Manager option', 'Impact assessment and policy watch'] },
  { num: 'Scoped to need', title: 'Bespoke Mandates', list: ['JV, M&A and capital raises', 'Turnkey project management', 'Tokenisation and fund structuring', 'Delegations and executive programmes'] },
]

const NEXT = [
  { num: '01', title: 'Discovery', text: 'Goals, model, timelines.' },
  { num: '02', title: 'Readiness', text: 'Regulatory, market and route fit.' },
  { num: '03', title: 'Roadmap', text: 'Scope, phases, deliverables.' },
]

/* Five pitfalls, as Tokenization's chain graphic: the pitfalls as a broken
   grey chain, India at the hub, how IBA prevents each as a live red chain */
const Chain = ({ items, live, title }) => (
  <div className={`tkc__side${live ? ' tkc__side--live' : ''}`}>
    <h3 className="tkc__title">{title}</h3>
    <ol className="tkc__chain">
      {items.map((it) => (
        <li className="tkc__block" key={it}>
          <span className="tkc__node" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              {live ? <path d="m7 12.5 3.2 3.2L17 9" /> : <path d="M8 8l8 8M16 8l-8 8" />}
            </svg>
          </span>
          <span className="tkc__text">{it}</span>
        </li>
      ))}
    </ol>
  </div>
)

const PitfallGraphic = () => (
  <div className="tkc">
    <Chain items={PITFALLS} title="Five pitfalls that slow an India entry" />
    <div className="tkc__hub" aria-hidden="true">
      <span className="tkc__beam" />
      <span className="tkc__token">
        <svg viewBox="0 0 24 24">{I.shield}</svg>
      </span>
      <span className="tkc__beam tkc__beam--out" />
    </div>
    <Chain items={PREVENTION} live title="How IBA helps prevent them" />
  </div>
)

/* the 12 services, with the source's phase filter */
function Services() {
  const [phase, setPhase] = useState('All')
  const shown = phase === 'All' ? SERVICES : SERVICES.filter((s) => s.phase === phase)
  return (
    <>
      <div className="iep-filters" role="group" aria-label="Filter the services by phase" data-rise>
        {FILTERS.map((f) => (
          <button
            type="button"
            key={f}
            className={`iep-filter${f === phase ? ' is-active' : ''}`}
            aria-pressed={f === phase}
            onClick={() => setPhase(f)}
          >
            {f === 'All' ? 'All 12' : f}
          </button>
        ))}
      </div>
      <Cards items={shown} cols={3} key={phase} />
    </>
  )
}

const Arrow = () => <span aria-hidden="true">→</span>

export default function IndiaEntry() {
  return (
    <div className="tkp iep">
      <PageHero
        id="india-entry"
        aside={<IndiaGateway />}
        eyebrow="India Entry Strategy · Web3 Global Corridor"
        title={
          <>
            Enter India right. <em className="tkp-hl">Expand without borders.</em>
          </>
        }
        lede="A structured market-entry and growth pathway for global technology, blockchain, AI, fintech and Web3 companies. From regulatory readiness and entity formation to partnerships, first customers, capital and cross-border scale."
        actions={
          <>
            <Btn enquiry={ENQUIRY}>
              Start your India strategy <Arrow />
            </Btn>
            <Btn href="#ie-services" variant="ghost">
              Explore all 12 services
            </Btn>
          </>
        }
      />

      <section className="tkp-focus iep-focus band band--light band--own" aria-label="The India entry pathway">
        <ul className="tkp-focus__list">
          {PHASES.map((p) => (
            <li className="tkp-focus__item" key={p.label}>
              <span className="tkp-focus__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">{p.icon}</svg>
              </span>
              <span className="tkp-focus__label">
                <strong>{p.label}</strong> {p.text}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <Section
        id="ie-proposition"
        eyebrow="The Strategic Proposition"
        title="India is a scale opportunity. Entry requires a local operating model."
        lede={[
          'India combines digital public infrastructure, a substantial technology talent base and expanding enterprise demand. Yet foreign entrants must navigate overlapping authorities, banking and FEMA requirements, taxes, regional differences and relationship-led commercial cycles.',
          'IBA brings these pieces together: market intelligence, regulatory and legal structuring, policy access, curated partnerships, operational delivery and measurable expansion, connected to the wider Web3 Global Corridor.',
        ]}
      >
        <ul className="iep-tags" aria-label="Sectors" data-rise>
          {SECTORS.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </Section>

      <Section
        id="ie-why"
        tone="red"
        eyebrow="Why India · Why Now"
        title="Global ambition meets India’s digital economy."
        lede="The market indicators behind six priority segments for international entrants."
      >
        <Stats items={FIGURES} />
        <p className="tkp-note" data-rise>
          Figures are reproduced from IBA’s November 2026 presentation (sources: IMF, Chainalysis, NPCI and GitHub);
          independently verify current rankings and statistics before relying on them.
        </p>
      </Section>

      <Section
        id="ie-opportunities"
        eyebrow="Priority Segments"
        title="Six opportunities for international entrants."
        lede="Where India’s demand, policy and infrastructure meet the expertise global technology companies bring."
      >
        <Cards items={OPPORTUNITIES} cols={3} />
      </Section>

      <Section
        id="ie-corridor"
        tone="dark"
        eyebrow="IBA Web3 Global Corridor"
        title="India is not an isolated destination. It is a gateway to connected markets."
        lede="IBA’s corridor model links India with the UAE, Africa, Europe and the Americas to help ventures align regulatory strategy, partnerships, investment, talent and commercial expansion across jurisdictions."
      >
        <Cards items={REGIONS} cols={5} />
        <Stats items={CREDENTIALS} dark />
        <p className="tkp-note" data-rise>
          Corridor regions and credentials reflect IBA’s presentation and positioning; specific introductions and
          services depend on mandate and eligibility.
        </p>
      </Section>

      <Section
        id="ie-regulatory"
        eyebrow="Regulatory Intelligence"
        title="Navigate the rulebook, and what lies beyond it."
        lede="India is not one uniform market. Multiple regulators may affect a single business model. The correct entry strategy begins with activity mapping, jurisdiction choice, licensing analysis, tax and operational feasibility."
      >
        <Cards items={REGULATORS} cols={5} />
        <SubHead>Six friction points that can slow market entry</SubHead>
        <Cards items={FRICTIONS} cols={3} />
        <p className="tkp-note" data-rise>
          The digital-asset context includes VDA tax and TDS, FIU-IND/PMLA obligations, AML/CFT, DPDP, CERT-In and
          evolving IFSCA arrangements. These are not a blanket authorisation to operate; obligations depend on activity
          and current law. Obtain up-to-date legal and tax advice.
        </p>
      </Section>

      <Section
        id="ie-routes"
        tone="card"
        eyebrow="Entry Architecture"
        title="Four routes. One right fit for your model."
        lede="IBA’s route-selection workshop aligns commercial activity, ownership, regulatory permissions, tax exposure and operating needs before incorporation."
      >
        <Cards items={ROUTES} cols={4} />
      </Section>

      <Section
        id="ie-method"
        tone="dark"
        eyebrow="How IBA De-risks Your Entry"
        title="Five connected moves, from first look to sustainable scale."
        lede="Designed to reduce false starts, shorten the path to first revenue and build a credible operating presence."
      >
        <MissionPillars items={MOVES} />
      </Section>

      <Section
        id="ie-services"
        eyebrow="The Full Advisory and Delivery Stack"
        title="12 service pillars. One integrated corridor journey."
        lede="Select a phase to focus the service portfolio."
      >
        <Services />
        <div className="pk-actions" data-rise>
          <Btn enquiry={ENQUIRY}>
            Scope your India entry <Arrow />
          </Btn>
        </div>
      </Section>

      <Section
        id="ie-pitfalls"
        tone="dark"
        eyebrow="Pitfalls We Help Prevent"
        title="Avoid the false starts that cost the most."
        lede="The five most common reasons an India entry stalls, and how IBA designs them out from the start."
      >
        <PitfallGraphic />
      </Section>

      <Section
        id="ie-ecosystem"
        eyebrow="Institutional Advantage"
        title="One relationship. A connected ecosystem."
        lede="An ecosystem spanning regulators and policymakers, state governments, banks and BFSI, enterprises, VCs, family offices, IITs, IIMs, incubators, industry bodies, media and corridor partners."
      >
        <Cards items={STRENGTHS} cols={3} />
      </Section>

      <Section
        id="ie-roadmap"
        tone="dark"
        eyebrow="Indicative Execution Roadmap"
        title="A phased India journey with clear milestones."
        lede="Every phase produces the decisions, capabilities and commercial outputs needed for the next stage."
      >
        <Cards items={ROADMAP} cols={4} />
        <p className="tkp-note" data-rise>
          Indicative durations; actual timing depends on sector, regulatory requirements and partner readiness.
        </p>
      </Section>

      <Section
        id="ie-engage"
        eyebrow="Ways to Work with IBA"
        title="Flexible mandates. Defined deliverables."
        lede="Choose a focused discovery engagement, a full entry programme, retained country support or a tailored strategic mandate."
      >
        <Cards items={MODELS} cols={4} />
        <p className="tkp-note" data-rise>
          Engagements are fee-based at India-local fee levels; pricing and scope are confirmed by proposal.
        </p>
      </Section>

      <Section
        id="ie-beyond"
        tone="card"
        eyebrow="Beyond Market Entry"
        title="From a successful India launch to a connected global footprint."
        lede="Build a market-ready business in India, then use the Web3 Global Corridor to explore regional partnerships, international positioning, capital networks and expansion opportunities."
      >
        <div className="pk-actions" data-rise>
          <Btn enquiry={ENQUIRY}>
            Discuss a corridor mandate <Arrow />
          </Btn>
          <Btn href="/corridor" variant="ghost">
            Explore the Web3 Global Corridor
          </Btn>
        </div>
      </Section>

      <Section
        id="ie-cta"
        eyebrow="Start with a Clear Decision"
        title="Your India opportunity deserves a structured entry plan."
        lede="Begin with a discovery call to define your goals, business model and timeline. Then commission an India readiness assessment and receive a scoped roadmap and proposal."
      >
        <Cards items={NEXT} cols={3} />
        <div className="pk-actions" data-rise>
          <Btn enquiry={ENQUIRY}>
            Request a discovery call <Arrow />
          </Btn>
        </div>
        <p className="tkp-disclaimer">
          This page is informational and does not constitute legal, tax or investment advice. Its statistics,
          credential claims, policy descriptions and timelines are drawn from IBA’s November 2026 India market-entry
          presentation and should be independently verified. No regulatory approval, investor funding, introduction or
          market-entry outcome is guaranteed.
        </p>
      </Section>
    </div>
  )
}
