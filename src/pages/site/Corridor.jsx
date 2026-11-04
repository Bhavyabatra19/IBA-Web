/**
 * Web3 Corridor — the corridor and its memberships, with the content of the
 * client's "IBA Web3 Corridor · Complete Membership" reference (11-04-2026)
 * set out in the site's own blocks: the five regions and the network map,
 * the operating model, the membership plans (Web360 Founder & Investor,
 * Web360 Tokenization & Institutions and the Indo–UAE Startup Xchange, with
 * a compare table; components/CorridorPlans), the Xchange and its 12-week
 * Gold cohort, the membership journey, the questions and the ask.
 *
 * The hero keeps the heading and the turning globe (by request).
 */

import { PageHero, Section, SubHead, Cards, Stats, Btn } from '../../components/Kit'
import { Steps, Faq } from '../../sections/service/ServiceBlocks'
import CorridorNetwork from '../../components/CorridorNetwork'
import CorridorPlans from '../../components/CorridorPlans'

const ENQUIRY = 'Web3 Corridor'

/* the hero graphic: the globe from the client's Web3 Corridor logo, cut
   out of its own ground and cropped above the wordmark, which now sits in
   the heading instead (public/images/web3-corridor-globe.webp, cut from
   web3-corridor-logo.webp; styles .w3l) */
const HeroMap = () => (
  <div className="w3l">
    <img
      className="w3l__img"
      src="/images/web3-corridor-globe.webp"
      alt=""
      width="765"
      height="765"
      decoding="async"
      fetchpriority="high"
    />
  </div>
)

const FIGURES = [
  { value: '5', label: 'Connected geographic regions' },
  { value: '3', label: 'Distinct membership pathways' },
  { value: '9', label: 'Membership tiers' },
]

const REGIONS = [
  { num: '01 / India', title: 'Technical engine', text: 'Developer talent, innovation, implementation and startup capability.' },
  { num: '02 / UAE', title: 'Launchpad', text: 'Capital access, regulatory navigation and cross-border business setup.' },
  { num: '03 / Europe', title: 'Standards', text: 'Institutional compliance, governance and mature market integration.' },
  { num: '04 / Americas', title: 'Infrastructure', text: 'Institutional capital, tokenization and practical adoption.' },
  { num: '05 / Africa', title: 'Utility', text: 'Mobile innovation, access and real-world Web3 applications.' },
]

const MODEL = [
  { num: '01', title: 'Tokenization', text: 'Tokenized business solutions, RWA education, issuer visibility and tokenomics support.' },
  { num: '02', title: 'Business setup', text: 'Entity structuring, KYC/KYB and regulatory framework navigation.' },
  { num: '03', title: 'Advisory & mentoring', text: 'Expert guidance, investor readiness, founder support and GTM planning.' },
  { num: '04', title: 'Global visibility', text: 'Events, media, podcasts, ecosystem directories and introductions.' },
  { num: '05', title: 'Go-to-market', text: 'Market-entry strategy, channel access and cross-border scaling pathways.' },
  { num: '06', title: 'Capital & community', text: 'Curated investor rooms, peer networks, collaboration and funding preparation.' },
]

const DIRECTIONS = [
  {
    tag: 'India → UAE',
    title: 'Enter Dubai and the wider Gulf',
    text: 'For India-based startups: a path from diagnosing readiness to choosing structure, setting up compliantly and landing customers.',
    list: ['Readiness', 'Structure', 'Setup & compliance', 'Customers'],
  },
  {
    tag: 'UAE → India',
    title: 'Build your presence in India',
    text: 'For UAE-based startups pursuing Indian distribution, teams and customers, with market thesis, entity and tax planning, local network development and pilots.',
    list: ['Market thesis', 'Entity & tax', 'Local network', 'Pilot & scale'],
  },
]

const XCHANGE = [
  { title: 'Corridor concierge', text: 'A named cross-border point of contact for eligible higher-tier members.' },
  { title: 'Soft-landing desk', text: 'On-ground launch coordination, market navigation and partner access.' },
  { title: 'Founder rooms', text: 'Closed-door peer problem-solving and curated business introductions.' },
  { title: 'Regulatory radar', text: 'Plain-language briefings on regulatory changes affecting cross-border plans.' },
  { title: 'Buyer pathways', text: 'Introductions to enterprise buyers, channels and market participants.' },
  { title: 'Two-market perks', text: 'Partner offers and founder community connections across India and the UAE.' },
]

const SPRINT = [
  { n: 'Weeks 01–03', name: 'Validate', body: 'Test the cross-border market thesis and readiness to enter the destination market.' },
  { n: 'Weeks 04–08', name: 'Build', body: 'Develop the market-entry structure, local support and launch foundations.' },
  { n: 'Weeks 09–12', name: 'Launch', body: 'Execute the market-facing sprint with demo day and soft-landing support.' },
]

const JOURNEY = [
  { n: '01', name: 'Apply', body: 'Share your organisation, sector and cross-border market goal.' },
  { n: '02', name: 'Assess', body: 'Discuss fit in a 30-minute conversation for the Xchange programme.' },
  { n: '03', name: 'Select', body: 'Choose the appropriate membership tier and geographic track.' },
  { n: '04', name: 'Activate', body: 'Meet your corridor lead and begin the relevant engagement pathway.' },
]

const FAQ = [
  {
    q: 'Are Web360 Club and Indo–UAE Startup Xchange the same membership?',
    a: 'No. Web360 Club runs founder/investor and tokenization tracks; the Indo–UAE Startup Xchange is a separate membership with its own tiers, pricing and benefits.',
  },
  {
    q: 'Are the Web360 membership prices annual?',
    a: 'Founder Bronze and Silver are $2,000 and $3,500 a year, and Founder Gold is a $5,000 club fee. Tokenization Bronze Plus, Silver Plus and Gold Plus are $3,500, $5,000 and $7,000 a year.',
  },
  {
    q: 'What does the Indo–UAE Startup Xchange cost?',
    a: 'Xchange fees are indicative and shared on enquiry. Contact the programme team for a quotation and confirmation of terms.',
  },
  {
    q: 'Do all members get a dedicated concierge?',
    a: 'No. A named corridor concierge is included for Xchange Silver and Gold, not Bronze. Priority access on certain Web360 tiers is described separately.',
  },
  {
    q: 'Does membership guarantee investment, licensing or customers?',
    a: 'No. Investor introductions, regulatory guidance, market access and launch support are programme benefits, not assured funding, approvals or sales.',
  },
  {
    q: 'What is the difference between Gold and Gold Plus?',
    a: 'Web360 founder Gold is an accelerator and fundraising-focused tier. Gold Plus is a separate tokenization-oriented corporate and institutional membership with sponsorship, visibility and business-development benefits.',
  },
  {
    q: 'Are tax and foreign investment figures legal advice?',
    a: 'No. Regulatory figures shared through the Xchange programme are indicative and not legal or tax advice. Obtain current jurisdiction-specific advice before acting.',
  },
]

const Arrow = () => <span aria-hidden="true">→</span>

export default function Corridor() {
  return (
    <div className="w3p">
      <PageHero
        id="corridor"
        aside={<HeroMap />}
        eyebrow="India Blockchain Alliance · Web360 Club"
        title={
          <>
            Bridging
            <br />
            Global Regions:
            <br />
            {/* the initiative's name in plain Questrial: no stroke, open tracking */}
            <span className="w3p-hero__name">Web3 Corridor</span>
          </>
        }
        lede={[
          'One connected ecosystem. Multiple pathways to capital, tokenization, partnerships and cross-border growth.',
          'Explore founder and investor programmes, tokenization-focused memberships and the dedicated India–UAE Startup Xchange, and choose the level of access that fits your next move.',
        ]}
        actions={
          <>
            <Btn href="#memberships">
              Compare Membership Plans <Arrow />
            </Btn>
            <Btn href="#about" variant="ghost">
              Discover the Corridor
            </Btn>
          </>
        }
        still={
          <div className="about-stats">
            <Stats still items={FIGURES} />
          </div>
        }
      />

      <Section
        id="about"
        tone="dark"
        eyebrow="The Web3 Corridor"
        title="Where global opportunity becomes an actionable pathway."
        lede="The IBA Web3 Corridor connects India, the UAE, Europe, the Americas and Africa. Its model combines technology transfer, capital access, regulatory navigation, entrepreneurial development and partner networks."
      >
        {/* the network map, live: pulsing pins and light along the routes */}
        <CorridorNetwork />
        <Cards items={REGIONS} cols={5} />
      </Section>

      <Section
        id="operating-model"
        eyebrow="The operating model"
        title="Support beyond a membership badge."
        lede="Across the programmes, IBA positions membership as a progression of capability, visibility and cross-border access."
      >
        <Cards items={MODEL} cols={3} />
      </Section>

      <Section
        id="memberships"
        eyebrow="Web360 Club · Membership plans"
        title="Find the membership built for your ambition."
        lede="Choose a pathway to see its tiers. The programmes have different objectives, benefits and pricing."
      >
        <CorridorPlans />
      </Section>

      <Section
        id="xchange"
        tone="dark"
        eyebrow="Indo–UAE Startup Xchange"
        title="Build in one market. Belong in both."
        lede="A distinct, year-round membership for startups moving between India and the UAE, combining setup, compliance, market access, capital, talent and founder community."
      >
        <Cards items={DIRECTIONS} cols={2} />
        <Cards items={XCHANGE} cols={3} />
        <SubHead lede="Founder-led; incorporated or incorporation-ready; a scalable product or service; and a clear cross-border objective. The programme runs two cohorts a year of 20–25 startups each, with sponsor scholarship opportunities.">
          Who can apply
        </SubHead>
      </Section>

      <Section
        id="xchange-cohort"
        eyebrow="The Gold Xchange cohort"
        title="A 12-week route from decision to market signal."
        lede="The Gold launch sprint runs in three phases."
      >
        <Steps items={SPRINT} />
      </Section>

      <Section
        id="journey"
        eyebrow="Membership journey"
        title="From application to corridor activation."
        lede="Entry runs in four steps. Web360 membership selection and access are curated or gated by tier."
      >
        <Steps items={JOURNEY} />
      </Section>

      <Section id="corridor-faq" eyebrow="Frequently asked questions" title="Before you choose.">
        <Faq items={FAQ} />
      </Section>

      <Section
        id="contact"
        tone="red"
        eyebrow="Next step"
        title="Your next market starts with the right corridor."
        lede="Explore your membership fit across Web360 founder programmes, tokenization plans or the Indo–UAE Startup Xchange, and tell us your preferred track, tier and target markets."
      >
        <div className="pk-actions" data-rise>
          <Btn enquiry={ENQUIRY}>
            Enquire About Membership <Arrow />
          </Btn>
          <Btn href="#memberships" variant="ghost">
            Review All Plans
          </Btn>
        </div>
      </Section>
    </div>
  )
}
