/**
 * Web3 Corridor, the corridor and its memberships, with the content of the
 * client's "IBA Web3 Corridor · Complete Membership" reference (11-04-2026)
 * set out in the site's own blocks: the five regions and the network map,
 * the operating model, the three membership pathways in brief (the plans,
 * how to join and the questions are on the Membership page), the Xchange
 * and its 12-week Gold cohort, TheBlock Experience (video), the Global
 * Innovation Corridor Forum at WTC 2026 and the ask.
 *
 * The hero keeps the heading and the turning globe (by request).
 */

import { PageHero, Section, SubHead, Cards, Stats, Btn } from '../../components/Kit'
import { Steps } from '../../sections/service/ServiceBlocks'
import CorridorNetwork from '../../components/CorridorNetwork'
import BlockFilm from '../../components/BlockFilm'

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
  { title: 'Tokenization', text: 'Tokenized business solutions, RWA education, issuer visibility and tokenomics support.' },
  { title: 'Business setup', text: 'Entity structuring, KYC/KYB and regulatory framework navigation.' },
  { title: 'Advisory & mentoring', text: 'Expert guidance, investor readiness, founder support and GTM planning.' },
  { title: 'Global visibility', text: 'Events, media, podcasts, ecosystem directories and introductions.' },
  { title: 'Go-to-market', text: 'Market-entry strategy, channel access and cross-border scaling pathways.' },
  { title: 'Capital & community', text: 'Curated investor rooms, peer networks, collaboration and funding preparation.' },
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

/* The Block, Dubai: the partnership films (public/videos, compressed from
   the client's originals to 720px wide). Add the second film here when it
   arrives: { src, poster, label }. */
const BLOCK_VIDEOS = [
  {
    src: '/videos/iba-the-block-1.mp4',
    poster: '/images/iba-the-block-1-poster.jpg',
    label: 'IBA at The Block, Dubai',
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
            <Btn href="/membership">
              Explore Membership <Arrow />
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

      {/* the plans live on the Membership page now (a main nav item,
          content review); the corridor keeps the three pathways in brief */}
      <Section
        id="memberships"
        eyebrow="Corridor memberships"
        title="Three pathways into the corridor."
        lede="Web360 Club for founders and investors, Web360 Club for tokenization and institutions, and the Indo–UAE Startup Xchange, each with three tiers."
      >
        <Cards
          cols={3}
          items={[
            { tag: 'Web360 Club', title: 'Founder & Investor', text: 'Investor relations, deal flow, advisory and international growth.', href: '/membership#plans', cta: 'See the tiers' },
            { tag: 'Web360 Club', title: 'Tokenization & Institutions', text: 'Tokenization, RWA, issuer, vendor and corporate plans.', href: '/membership#plans', cta: 'See the tiers' },
            { tag: 'India ↔ UAE', title: 'Indo–UAE Startup Xchange', text: 'Market entry between India and the UAE, with a 12-week Gold launch sprint.', href: '/membership#plans', cta: 'See the tiers' },
          ]}
        />
        <div className="pk-actions" data-rise>
          <Btn href="/membership">
            Explore Membership <Arrow />
          </Btn>
        </div>
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
        lede={[
          'Gold members of the Indo–UAE Startup Xchange enter a structured 12-week launch sprint: a guided route from the decision to enter the other market to the first real signal from it, with corridor support at every stage.',
          'The programme runs two cohorts a year of 20–25 startups each, and closes with a demo day and soft-landing support in the destination market.',
        ]}
      >
        <Steps items={SPRINT} />
      </Section>

      <Section
        id="the-block"
        eyebrow="Partnership · Dubai"
        title="TheBlock Experience"
        lede="IBA at The Block, Dubai: a workspace and community for virtual-asset companies, giving corridor members a real-time experience of the Dubai ecosystem and a launchpad into the UAE."
      >
        {/* full width, each film in turn; muted autoplay while in view */}
        <div className="w3p-films">
          {BLOCK_VIDEOS.map((v) => (
            <BlockFilm key={v.src} {...v} />
          ))}
        </div>
      </Section>

      <Section
        id="corridor-forum"
        tone="red"
        eyebrow="Launch · WTC 2026 · November · Barcelona"
        title="Global Innovation Corridor Forum"
        lede="The corridor launches at the World Token Congress in Barcelona, where its partner countries, investors and innovators meet and set the roadmap."
      >
        <div className="pk-actions" data-rise>
          <Btn enquiry={ENQUIRY}>
            Participate in WTC 2026 <Arrow />
          </Btn>
        </div>
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
          <Btn href="/membership#plans" variant="ghost">
            Review All Plans
          </Btn>
        </div>
      </Section>
    </div>
  )
}
