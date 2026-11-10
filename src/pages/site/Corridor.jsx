/**
 * Web3 Corridor, the corridor and its memberships, with the content of the
 * client's "IBA Web3 Corridor · Complete Membership" reference (11-04-2026)
 * set out in the site's own blocks. Running order (content review,
 * 11-06-2026): the hero; Corridor memberships, the three pathways as the
 * home page's What IBA Does cards; Web360 Club Premium Programs (the
 * Indo–UAE Startup Xchange and its Gold cohort), in brief and then each in
 * full; the five regions and the network map; the operating model;
 * TheBlock Experience (video); the Global Innovation Corridor Forum at
 * WTC 2026; and the ask.
 *
 * The hero keeps the heading and the turning globe (by request).
 */

import { PageHero, Section, SubHead, Cards, Stats, Btn } from '../../components/Kit'
import { Steps } from '../../sections/service/ServiceBlocks'
import CorridorNetwork from '../../components/CorridorNetwork'
import BlockFilm from '../../components/BlockFilm'
import PillarCards from '../../components/PillarCards'
import { initials } from '../../data/partners'

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
  { num: '01 / India', title: 'Technical engine', text: 'Building talent, innovation and startup capabilities.' },
  { num: '02 / UAE', title: 'Launchpad', text: 'Enabling capital access, regulatory clarity and cross-border expansion.' },
  { num: '03 / Europe', title: 'Standards', text: 'Strengthening compliance, governance and institutional market integration.' },
  { num: '04 / Americas', title: 'Infrastructure', text: 'Mobilizing institutional capital, advancing tokenization and driving adoption.' },
  { num: '05 / Africa', title: 'Utility', text: 'Driving mobile innovation, accessibility and real-world Web3 adoption.' },
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

/* Corridor memberships: the three pathways, as the home page's What IBA
   Does cards (content review, 11-06-2026) */
const PATHWAYS = [
  {
    key: 'founder',
    tag: 'Web360 Club',
    title: 'Founder & Investor',
    body: 'Investor relations, deal flow, advisory and international growth for founders and the investors who back them.',
    cta: 'See the tiers',
    href: '/membership#plans',
    img: '/images/corridor-founder.jpg',
  },
  {
    key: 'institution',
    tag: 'Web360 Club',
    title: 'Tokenization & Institutions',
    body: 'Tokenization, RWA, issuer, vendor and corporate plans for institutions bringing assets and services on-chain.',
    cta: 'See the tiers',
    href: '/membership#plans',
    img: '/images/card-tokenization-art.jpg',
  },
  /* ⚠ links to the Expertise page's Global Market Expansion section, whose
     content is on its way (content review, 11-06) */
  {
    key: 'expand',
    tag: 'Cross-border growth',
    title: 'Global Market Expansion',
    body: 'Market-entry strategy, business setup, partner access and go-to-market support for scaling into new markets across the corridor.',
    href: '/expertise#global-market-expansion',
    img: '/images/corridor-expansion.jpg',
  },
]

/* Web360 Club Premium Programs: a section of their own (content review) */
const PREMIUM = [
  {
    key: 'exchange',
    tag: 'Premium · India ↔ UAE',
    title: 'Indo–UAE Startup Xchange',
    body: 'A year-round membership for startups moving between India and the UAE: setup, compliance, market access, capital, talent and founder community.',
    cta: 'Explore the Xchange',
    href: '#xchange',
    img: '/images/card-partnership.jpg',
  },
  {
    key: 'medal',
    tag: 'Premium · 12 weeks',
    title: 'The Gold Xchange Cohort',
    body: 'A structured 12-week launch sprint for Gold members, from the decision to enter the other market to its first real signal, closing with a demo day.',
    cta: 'See the sprint',
    href: '#xchange-cohort',
    img: '/images/corridor-gold.jpg',
  },
]

/* Corridor partners: the third section (content review, 11-10). Logos
   from public/logos. TheCircle's mark is cut from the supplied white
   wordmark (thecircle-wordmark-white.png) and set in IBA Black, so it
   reads on the white logo tile. */
const CORRIDOR_PARTNERS = [
  {
    name: 'TheBlock',
    logo: '/logos/eco/theblock-ae.png',
    tag: 'Dubai · UAE Experience Centre',
    text: 'A workspace and community for virtual-asset companies, giving corridor members a real-time experience of the UAE ecosystem.',
    href: '#the-block',
  },
  {
    name: 'TheCircle',
    logo: '/logos/partners/thecircle.png',
    tag: 'Corridor partner',
    text: 'Partnering with IBA across the Web3 Corridor network.',
  },
  {
    name: 'Token Asset Foundation',
    logo: '/logos/partners/token-asset-foundation.jpg',
    tag: 'Tokenization standards',
    text: 'Advancing tokenized assets and institutional adoption; IBA’s founder serves as its Chief Strategy Advisor.',
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
          'Explore founder and investor programmes, tokenization and institutional memberships, global market expansion and the Web360 Club premium programmes, and choose the level of access that fits your next move.',
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

      {/* Corridor memberships, straight under the hero (content review,
          11-06): the three pathways as the home page's What IBA Does cards.
          The plans themselves are on the Membership page. */}
      <Section
        id="memberships"
        eyebrow="Corridor memberships"
        title="Three pathways into the corridor."
        lede="Choose the route that fits your next move: Web360 Club for founders and investors, Web360 Club for tokenization and institutions, or Global Market Expansion."
      >
        <div className="wd wd--duo wd--art wd--pillars">
          <PillarCards cards={PATHWAYS} />
        </div>
        <div className="pk-actions" data-rise>
          <Btn href="/membership">
            Explore Membership <Arrow />
          </Btn>
        </div>
      </Section>

      {/* Corridor partners, the third section (content review, 11-10): a
          dark glass panel in a white section, as the Membership tiers */}
      <Section
        id="corridor-partners"
        eyebrow="Corridor partners"
        title="Building the corridor together."
        lede="The organisations working with IBA to connect markets, capital and infrastructure across the Web3 Corridor."
      >
        <div className="cpn-partners" data-rise>
          <ul className="cpn-partners__list">
            {CORRIDOR_PARTNERS.map((p) => (
              <li className="cpn-partner" key={p.name}>
                <span className="cpn-partner__logo">
                  {p.logo ? (
                    <img src={p.logo} alt={`${p.name} logo`} loading="lazy" decoding="async" />
                  ) : (
                    <span className="cpn-partner__mono" aria-hidden="true">
                      {initials(p.name.replace(/^The(?=[A-Z])/, 'The '))}
                    </span>
                  )}
                </span>
                <span className="cpn-partner__tag">{p.tag}</span>
                <h3 className="cpn-partner__name">{p.name}</h3>
                <p className="cpn-partner__text">{p.text}</p>
                {p.href && (
                  <a className="cpn-partner__go" href={p.href}>
                    Know more <Arrow />
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Web360 Club Premium Programs, a section of their own (content
          review): the two programmes in brief, then each in full below */}
      <Section
        id="premium-programs"
        tone="dark"
        eyebrow="Web360 Club · Premium Programs"
        title="Web360 Club Premium Programs"
        lede="Two special programmes for founders ready to build across the India–UAE corridor: a year-round Xchange membership and its 12-week Gold cohort."
      >
        <div className="wd wd--duo wd--art wd--pillars wd--premium">
          <PillarCards cards={PREMIUM} />
        </div>
      </Section>

      <Section
        id="xchange"
        eyebrow="Premium Program · Indo–UAE Startup Xchange"
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
        eyebrow="Premium Program · The Gold Xchange Cohort"
        title="A 12-week route from decision to market signal."
        lede={[
          'Gold members of the Indo–UAE Startup Xchange enter a structured 12-week launch sprint: a guided route from the decision to enter the other market to the first real signal from it, with corridor support at every stage.',
          'The programme runs two cohorts a year of 20–25 startups each, and closes with a demo day and soft-landing support in the destination market.',
        ]}
      >
        <Steps items={SPRINT} />
      </Section>

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
        lede="Explore your membership fit across Web360 founder programmes, tokenization plans, global market expansion or the Web360 Club premium programmes, and tell us your preferred track, tier and target markets."
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
