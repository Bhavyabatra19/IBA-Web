/**
 * Expertise, in the running order the client set:
 *   hero · Web3 Solution Advisory and Consulting Stack (four core
 *   capabilities, each with an icon) · the founder's quote (text only, on a
 *   moving ground) · Tokenization (a black hero-style band, "Know more" to
 *   /tokenization) · the outcome · who we work with · IBA initiatives
 *   (a logo carousel).
 * Tones alternate so no two dark sections touch (by request): dark, white,
 * white, dark, grey, dark, white, and then the site's dark CTA band.
 * The Power Consulting and How We Work blocks were taken off by request.
 */

import { PageHero, Section, SubHead, Cards, Quote, Btn } from '../../components/Kit'
import { REGIONS_LINE } from '../../data/facts'
import CoreCapabilities from '../../components/CoreCapabilities'
import TokenHero from '../../components/TokenHero'
import InitiativeCarousel from '../../components/InitiativeCarousel'
import MissionPillars from '../../components/MissionPillars'

/* Supplied innovation image in the Expertise hero. */
const HeroImage = () => (
  <div className="xp-img xp-img--innovation" aria-hidden="true">
    <img src="/images/Futuristic%20Neon%20Innovation%20Lightbulb.png" alt="" />
  </div>
)

const KEYWORDS = [
  'Tokenization',
  'Policy',
  'Compliance',
  'Standards',
  'Taxation',
  'Forensics',
  'Risk Mitigation',
  'Advisory',
  'Consulting',
  'Research',
  'Launch Pads',
  'Accelerators',
  'Consortiums',
  'Knowledge',
  'Market Expansion',
  'Networking',
  'Collaborations',
  'Events',
]

/* line icons on a 24 grid, for the partner cards */
const PARTNERS = [
  {
    key: 'gov',
    title: 'Governments & Regulators',
    icon: (
      <>
        <path d="M3 9.5 12 4l9 5.5Z" />
        <path d="M5.5 11v7M10 11v7M14 11v7M18.5 11v7M3 20.5h18" />
      </>
    ),
    short: 'Policy input, standards and public infrastructure built on blockchain and Web3 technologies. We work alongside policy teams to turn intent into frameworks that can be implemented.',
  },
  {
    key: 'ent',
    title: 'Enterprises',
    icon: (
      <>
        <rect x="3" y="7.5" width="18" height="12.5" rx="1.5" />
        <path d="M9 7.5V5.5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 5.5v2M3 13h18M11 13v2h2v-2" />
      </>
    ),
    short: 'From a first use-case assessment to a governed, production-ready deployment. We help leadership teams decide where the technology earns its place, then deliver it.',
  },
  {
    key: 'asset',
    title: 'Asset Owners & Issuers',
    icon: (
      <>
        <ellipse cx="12" cy="6" rx="7" ry="2.5" />
        <path d="M5 6v4c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6M5 10v4c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-4M5 14v4c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-4" />
      </>
    ),
    short: 'Structuring, compliance and go-to-market support for tokenized offerings, from choosing the asset to reaching investors.',
  },
  {
    key: 'found',
    title: 'Founders & Startups',
    icon: (
      <>
        <path d="M12 2.5c3 2.2 4.5 5.4 4.5 9.2V16h-9v-4.3c0-3.8 1.5-7 4.5-9.2Z" />
        <circle cx="12" cy="9.5" r="1.8" />
        <path d="M7.5 12.5 5 15v3l2.5-2M16.5 12.5 19 15v3l-2.5-2M10.5 18.5 12 21.5l1.5-3" />
      </>
    ),
    short: 'Launch readiness across technical, financial and marketing workstreams, with access to the alliance network of advisors, partners and investors.',
  },
]

const OUTCOMES = [
  { num: '01', title: 'Clarity and Trust', text: 'A clearly defined problem, a validated approach, and an honest assessment of whether blockchain is the right solution, before you invest in building.' },
  { num: '02', title: 'Compliance Confidence', text: 'Regulatory requirements mapped from the outset, ensuring your solution is designed for jurisdictional compliance and ready for regulator and auditor scrutiny.' },
  { num: '03', title: 'A Working Product', text: 'A built, audited, and deployment-ready solution, backed by robust governance and the expertise to operate, maintain, and scale it.' },
  { num: '04', title: 'Access to Capital', text: 'Compelling investment proposition, a fundraise-ready structure, and strategic investor connections to help unlock capital and accelerate growth.' },
  { num: '05', title: 'Market Launch and Outreach', text: 'A market-ready launch plan, defined target segments, a qualified prospect pipeline, partner introductions, scheduled outreach campaigns, and measurable targets for leads, conversions, and early customer acquisition.' },
  { num: '06', title: 'Growth and Expansion', text: 'Access to cross-border corridors that connect you with local partners, investors, institutions, and market-entry pathways, enabling faster expansion, stronger partnerships, and compliant entry into new jurisdictions.' },
]

/* Global Market Expansion: the client's "Global Market Entry & GTM"
   page (11-10-2026). The corridor's Global Market Expansion cards link
   here (#global-market-expansion). */
const GTM_TIERS = [
  {
    num: 'Tier 01',
    title: 'Explore',
    sub: 'Market discovery & feasibility',
    text: 'For teams evaluating where, when and whether to enter.',
    list: ['Demand and competitor research', 'Regulatory landscape overview', 'Product-market fit and localisation', 'Customer personas and entry options'],
    outcome: 'Market Insight Report, Competitor Matrix, Regulatory Brief, PMF Snapshot, Customer Persona Kit.',
  },
  {
    num: 'Tier 02',
    title: 'Engage',
    sub: 'GTM strategy blueprint',
    text: 'For companies preparing to test and establish a market.',
    list: ['Region-specific GTM roadmap', 'ICP, positioning and messaging', 'Partner and channel mapping', 'Local hiring and legal considerations', 'Relevant ecosystem introductions'],
    outcome: 'Localized GTM Deck, Partner Landscape Map, Talent Snapshot, Legal Playbook, Introductions Log.',
  },
  {
    num: 'Tier 03',
    title: 'Activate',
    sub: 'Market-entry execution',
    text: 'For businesses ready to build local commercial traction.',
    list: ['Business development and outreach', 'Partner and representative enablement', 'Recruitment and event support', 'Investor engagement preparation', 'Soft-landing and GTM coordination'],
    outcome: 'BD Tracker, Partner Engagement Dashboard, Recruitment Kit, Sales Collateral, Investor Brief.',
  },
  {
    num: 'Tier 04',
    title: 'Elevate',
    sub: 'Regional growth & scale-up',
    text: 'For established entrants building long-term regional operations.',
    list: ['Demand generation and growth engine', 'Enterprise partnerships and M&A exploration', 'Capital raise readiness support', 'Product and support localisation', 'Regional operating roadmap'],
    outcome: 'Growth Roadmap, Marketing Plan, Capital Raise Toolkit, Partnerships & M&A File, Localization Framework.',
  },
]

const GTM_SERVICES = [
  { num: '01', title: 'Market intelligence & entry strategy', text: 'Market sizing and prioritisation, competition, customer discovery, business planning, market vision and GTM roadmaps.' },
  { num: '02', title: 'Regulatory, policy & risk navigation', text: 'Regulatory environment assessment, jurisdictional considerations, compliance design inputs, risk identification and mitigation planning. Specialist legal advice is scoped separately where required.' },
  { num: '03', title: 'Corporate & financial advisory', text: 'Organic and inorganic growth options, commercial models, financial and operational modelling, expansion economics and investment readiness.' },
  { num: '04', title: 'Partnerships & ecosystem development', text: 'Partner discovery, qualification, due diligence, channel models, joint venture exploration and commercial negotiation support.' },
  { num: '05', title: 'GTM activation & business development', text: 'Positioning, regional messaging, demand generation, sales collateral, outreach, channel enablement and opportunity pipeline tracking.' },
  { num: '06', title: 'Market setup & operational execution', text: 'Soft landing, infrastructure setup coordination, local talent support, vendor management, organisation design and operating-model development.' },
  { num: '07', title: 'Capital & institutional engagement', text: 'Investor briefs, fundraising preparation, relevant introductions and institutional partnership strategy, subject to applicable rules.' },
  { num: '08', title: 'Programme management & impact', text: 'Project coordination, milestones, operations review, policy and strategy assessment, performance dashboards and optimisation.' },
]

/* IBA Initiatives. An entry without a `logo` shows a monogram (`mono`). */
const OUTCOME_ICONS = [
  <><path d="M3 12s3.2-5.5 9-5.5 9 5.5 9 5.5-3.2 5.5-9 5.5S3 12 3 12Z" /><circle cx="12" cy="12" r="2.5" /><path d="m10.5 12 1.2 1.2 2.5-2.8" /></>,
  <><path d="m12 2.5 8 3v6c0 4.7-3.3 8.2-8 10-4.7-1.8-8-5.3-8-10v-6Z" /><path d="m8.5 12.2 2.4 2.4 4.8-5" /></>,
  <><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9Z" /><path d="m4.3 7.7 7.7 4.4 7.7-4.4M12 12v9" /></>,
  <><path d="M4 19V12M10 19V8M16 19V5M22 19H2" /><path d="m4 9 6-4 5 2 6-5M17 2h4v4" /></>,
  <><path d="M21 3 10.5 13.5M21 3l-6.7 18-3.8-7.5L3 9.7Z" /><path d="m7 17-3 3" /></>,
  <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.4 2.4 3.5 5.4 3.5 9S14.4 18.6 12 21c-2.4-2.4-3.5-5.4-3.5-9S9.6 5.4 12 3Z" /><path d="M15 5h5v5M20 5l-5 5" /></>,
]

const INITIATIVES = [
  { title: 'Tech4Good', logo: '/logos/initiatives/trim/t4g.png', sub: 'Technology in service of outcomes that matter', text: "IBA's impact initiative, applying blockchain and emerging technology to problems where the return is social rather than commercial. Anchors the alliance's SDG alignment.", href: '/initiatives#init-tech4good' },
  { title: 'Green Chain Protocol', logo: '/logos/initiatives/trim/green-chain.png', sub: 'Making green finance and governance verifiable', text: 'A blockchain ecosystem focused on ESG, aligned with COP28, showcasing and growing Web3 projects in sustainability.', href: '/initiatives#init-green-chain' },
  { title: 'Verifyble', logo: '/logos/initiatives/trim/verifyble.png', sub: 'Data security and digital asset management', text: "IBA's platform for data security and digital asset management, helping any organisation or individual secure, verify and manage data and digital assets on-chain.", href: '/initiatives#init-verifyble' },
  { title: 'IBA Red Club', logo: '/logos/initiatives/trim/red-club.png', sub: 'The talent pipeline for Web3 and AI', text: 'Certified programmes, on-campus labs, live industry projects, internships and placements.', href: '/initiatives#init-red-club' },
  { title: 'Web3 Corridor', logo: '/images/web3.jpeg', sub: 'Global Innovation Corridor Initiative', text: 'A global innovation platform connecting ' + REGIONS_LINE + ' through innovation, technology, investment and partnerships.', href: '/initiatives#init-web3-corridor' },
  /* ⚠ India AI Alliance is left out until its description is supplied (by
     request: no placeholder copy on the page). Its logo is in the project:
     { title: 'India AI Alliance', logo: '/logos/partners/india-ai-alliance.jpg', sub: …, text: …, href: '/initiatives#init-india-ai-alliance' } */
  /* the two councils, with their logos (by request); text from the Ecosystem page */
  { title: 'Emerging Technology Council', logo: '/logos/initiatives/trim/etc.png', sub: 'Policy and community for new tech frontiers', text: "The apex body for India's technology industry, driving policy advocacy, research, knowledge, advisory and community building across newer tech frontiers.", href: '/ecosystem#communities' },
  { title: 'Blockchain Governance Council', logo: '/logos/initiatives/trim/bgc.png', sub: 'Standards, frameworks and compliance', text: 'An open global multi-stakeholder network co-developing solutions around policy, frameworks, compliance, security, taxation and standards.', href: '/ecosystem#communities' },
]

/**
 * Tokenization, as a black hero-style band with the client's tokenization
 * render beside it (the same graphic as the Tokenization page's hero).
 * Its copy is the Tokenization page's hero (the client's tokenization PDF).
 */
const INITIATIVE_ORDER = [
  'Web3 Corridor',
  'Blockchain Governance Council',
  'Emerging Technology Council',
  'Tech4Good',
  'Green Chain Protocol',
  'Verifyble',
  'IBA Red Club',
]

function TokenizationBand() {
  return (
    <section className="tkb band band--light band--own" id="xp-tokenization" aria-labelledby="tkb-title">
      <div className="tkb__panel">
        <span className="pk-hero__beam tkb__beam" aria-hidden="true" />
        <div className="tkb__copy">
          <p className="hero__kicker pk-eyebrow">Tokenization</p>
          <h2 className="tkb__title" id="tkb-title">
            Turn real-world assets into new market opportunities.
          </h2>
          <p className="tkb__lede">
            Tokenization can connect traditionally illiquid assets to digital markets, creating new
            possibilities for fractional ownership, capital formation, transparency and cross-border
            investor access.
          </p>
          <div className="pk-actions">
            <Btn href="/tokenization">
              Know more <span aria-hidden="true">→</span>
            </Btn>
          </div>
        </div>
        <div className="tkb__art">
          <TokenHero />
        </div>
      </div>
    </section>
  )
}

export default function Expertise() {
  return (
    /* xp-page: the page's square corners (brandbook.css) */
    <div className="xp-page">
      <PageHero
        id="expertise"
        aside={<HeroImage />}
        eyebrow="Expertise"
        title="Expertise That Connects. Innovation That Scales. Capital That Moves"
        /* Lighter than it was (by request: the description was too much):
           one paragraph, and the long keyword list as one row of tags that
           scrolls. */
        lede={[
          <strong className="xp-lead" key="h">
            From Web3 Ambition to Economic Dynamics
          </strong>,
          'IBA goes beyond advisory to drive Web3 ventures from strategy to execution and global expansion. We bring together regulatory expertise, technical capabilities, launchpads, accelerators, consortiums, and cross-border corridors to help organisations validate opportunities, build compliant solutions, access markets, and scale with the right partners.',
          <span className="xp-tags" key="k">
            <span className="sr-only">{KEYWORDS.join(', ')}</span>
            <span className="xp-tags__track" aria-hidden="true">
              {[...KEYWORDS, ...KEYWORDS].map((k, i) => (
                /* the second copy only makes the loop seamless; hidden when the
                   row stands still */
                <span className={`xp-tags__tag${i >= KEYWORDS.length ? ' xp-tags__tag--dup' : ''}`} key={i}>
                  {k}
                </span>
              ))}
            </span>
          </span>,
        ]}
        actions={
          <Btn enquiry="Consulting" variant="primary">
            Discuss your Project <span aria-hidden="true">→</span>
          </Btn>
        }
      />

      <Section
        id="consulting-stack"
        center
        eyebrow="Core Capabilities. One Web3 Corridor"
        title="Web3 Solution Advisory and Consulting Stack"
        lede="IBA’s core expertise is the operating model behind our Web3 Corridor, connecting strategy, tokenization, policy, compliance, capital, technology, talent, and market access into one coordinated pathway. Capabilities can be engaged independently or integrated as a single program, enabling organizations to move from opportunity to execution, compliant launch, and cross-border scale through a connected global ecosystem."
      >
        <CoreCapabilities />
      </Section>

      {/* the founder's words, text only (no photo), on the dark red
          gradient, slowly moving (by request) */}
      <Section id="founder-quote" tone="dark">
        <Quote by="Raj Kapoor · Founder, India Blockchain Alliance">
          The future of capital markets won’t simply be digital. It will be transparent,
          programmable, compliant and tokenized. And I’m excited to help build it.
          <span className="founder-quote__setup">The future isn’t coming.</span>
          <span className="founder-quote__final">I am building it.</span>
        </Quote>
      </Section>

      <TokenizationBand />

      {/* Global Market Expansion (the client's GTM page, 11-10-2026): the
          four-stage framework, then the advisory stack behind it */}
      <Section
        id="global-market-expansion"
        tone="dark"
        eyebrow="Global Market Expansion · Web3 Corridor"
        title="New markets. Real traction. Global scale."
        lede={[
          'From market intelligence and regulatory navigation to local partnerships, commercial activation and sustained expansion, IBA helps Web3, fintech and emerging-technology businesses turn cross-border opportunity into an executable growth strategy.',
          'Start at the stage that matches your readiness: Explore, Engage, Activate or Elevate. Each can be commissioned on its own, for one country, or as a connected multi-market programme.',
        ]}
      >
        <Cards items={GTM_TIERS} cols={4} />
        <SubHead lede="Specialist capability across the entire market-entry lifecycle, from IBA's business strategy, corporate strategy, partnerships, implementation, operational strategy and impact-assessment service lines.">
          The advisory and consulting stack
        </SubHead>
        <Cards items={GTM_SERVICES} cols={4} />
        <div className="pk-actions" data-rise>
          <Btn enquiry="Global Market Expansion">
            Request a GTM consultation <span aria-hidden="true">→</span>
          </Btn>
          <Btn href="/membership" variant="ghost">
            Enter through Web360
          </Btn>
        </div>
      </Section>

      {/* the same section and cards as the About page's Our Mission (by
          request): the red light-arcs ground, glass cards, neon-ring icons */}
      <Section
        id="outcome"
        center
        eyebrow="The Outcome"
        title="Your Next Move in Web3 Starts Here."
        lede="We turn Web3 ambitions into actionable outcomes, equipping you with the strategy, capabilities, partnerships, and market access to build, launch, and scale with confidence."
      >
        {/* simple numbered cards (by request, in place of the timeline) */}
        <Cards items={OUTCOMES.map(({ num, ...item }, i) => ({ ...item, icon: OUTCOME_ICONS[i] }))} cols={3} />
        <div className="pk-actions" data-rise>
          <Btn enquiry="Consulting">
            Discuss your Project <span aria-hidden="true">→</span>
          </Btn>
        </div>
      </Section>

      <Section id="who-we-serve" tone="dark" eyebrow="Who We Work With" title="One Stack, Multiple Partners">
        <MissionPillars items={PARTNERS} />
      </Section>

      {/* light, so the page ends white before the dark CTA band */}
      <Section id="initiatives" eyebrow="IBA Initiatives" title="Our programs. Our commitment. Our impact">
        <InitiativeCarousel items={INITIATIVE_ORDER.map((name) => INITIATIVES.find((item) => item.title === name))} />
      </Section>
    </div>
  )
}
