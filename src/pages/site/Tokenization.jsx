/**
 * Tokenization — where the Expertise page's "Know more" goes.
 *
 * The copy is the client's "Tokenization · India Blockchain Alliance" page
 * (supplied as a PDF), set in the site's own section and card designs (by
 * request: like the Expertise, Ecosystem and About pages) — the Impact band,
 * the standard icon cards and the Our Mission glass cards. Its own header
 * and footer are left out; the site's are used instead.
 *
 * ⚠ The three market figures and the "source material" wording come from the
 * client's copy, which itself says they should be validated before publication.
 */

import { PageHero, Section, Cards, Btn, Stats } from '../../components/Kit'
import TokenHero from '../../components/TokenHero'
import MissionPillars from '../../components/MissionPillars'

const ENQUIRY = 'RWA Tokenization'

/* the three focus points, in their own white strip under the hero (by
   request), each with an icon */
const HERO_POINTS = [
  { label: 'Asset strategy and token design', icon: <><path d="M12 3 3 7.5l9 4.5 9-4.5Z" /><path d="m3 12 9 4.5 9-4.5M3 16.5 12 21l9-4.5" /></> },
  { label: 'Regulatory and compliance alignment', icon: <><path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6l8-3Z" /><path d="m8.5 12 2.5 2.5 4.5-5" /></> },
  { label: 'Market access and ecosystem connections', icon: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z" /></> },
]

const FIGURES = [
  { value: '~$400T', label: 'Global real estate asset base cited in the source material' },
  { value: '10% by 2030', label: 'Source document’s projection for tokenized markets as a share of global GDP' },
  { value: '~$1T/year', label: 'Illustrative real estate turnover scenario at a 0.25% turnover-to-stock ratio' },
]

const VALUE = [
  {
    icon: <path d="M7 17 17 7M9 7h8v8" />,
    title: 'Unlock liquidity potential',
    text: 'Fractional ownership and secondary-market mechanisms may make asset interests easier to transfer, subject to market demand, legal structure and applicable rules.',
  },
  {
    icon: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3.5" /></>,
    title: 'Broaden capital access',
    text: 'Give asset owners new ways to reach eligible investors across markets and explore capital formation without necessarily issuing company equity or taking on conventional debt.',
  },
  {
    icon: <><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" /><circle cx="12" cy="12" r="2.8" /></>,
    title: 'Improve transparency',
    text: 'Blockchain records and well-designed reporting can support clearer transaction histories, auditability and visibility into ownership and asset-related information.',
  },
  {
    icon: <path d="M12 4 20 12 12 20 4 12Z" />,
    title: 'Lower barriers to participation',
    text: 'Fractional structures can reduce minimum ticket sizes and allow eligible investors to access selected asset classes in smaller increments.',
  },
  {
    icon: <><path d="M20 12a8 8 0 1 1-2.3-5.6" /><path d="M20 4v4.5h-4.5" /></>,
    title: 'Streamline operations',
    text: 'Smart contracts can automate defined processes such as distributions, transfer rules and reporting workflows when appropriately designed and governed.',
  },
  {
    icon: <path d="M12 5v14M5 12h14" />,
    title: 'Expand portfolio choice',
    text: 'Tokenized structures can create new ways to participate in real estate, private markets, commodities, intellectual property, art and other alternative assets.',
  },
]

const STEPS = [
  { icon: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 5 5" /></>, title: 'Assess the asset and opportunity', text: 'Evaluate asset suitability, ownership, underlying cash flows, stakeholder needs and the commercial case for tokenization.' },
  { icon: <><path d="M12 3 3 7.5l9 4.5 9-4.5Z" /><path d="m3 12 9 4.5 9-4.5M3 16.5 12 21l9-4.5" /></>, title: 'Structure rights and issuance', text: 'Define the token model, legal structure, issuance approach, investor rights, tokenomics and distribution strategy.' },
  { icon: <><path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6l8-3Z" /><path d="m8.5 12 2.5 2.5 4.5-5" /></>, title: 'Map regulation and compliance', text: 'Address jurisdiction-specific legal, regulatory, tax, governance and investor eligibility requirements from the outset.' },
  { icon: <><path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" /></>, title: 'Build the technology layer', text: 'Design and test smart contracts, platform integrations, permissions, reporting and operational controls.' },
  { icon: <><circle cx="6" cy="6" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="12" cy="18" r="2.5" /><path d="M8 7.5l3 8.5M16 7.5l-3 8.5M8.5 6h7" /></>, title: 'Connect capital and distribution', text: 'Engage relevant brokers, marketplaces, investors, institutions and ecosystem partners to support market access.' },
  { icon: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" /></>, title: 'Support ongoing operations', text: 'Plan for asset reporting, distributions, governance, transfer controls and secondary-market participation where available and permitted.' },
]

/* as the glass cards take them: a key, the step number with its title, and
   the description as the card's text */
const STEP_CARDS = () => STEPS.map((s, i) => ({ key: `step-${i + 1}`, title: `${String(i + 1).padStart(2, '0')}  ${s.title}`, short: s.text, icon: s.icon }))

const APPLICATIONS = [
  { icon: <><path d="M5 20V8l7-4 7 4v12M3 20h18" /><path d="M9 20v-5h6v5" /></>, title: 'Real estate & infrastructure', text: 'Property interests, development projects and infrastructure-linked assets.' },
  { icon: <><path d="M12 3v9h9a9 9 0 1 1-9-9Z" /><path d="M15 3.5A9 9 0 0 1 20.5 9H15Z" /></>, title: 'Private equity & funds', text: 'Fund interests and selected private-market investment structures.' },
  { icon: <><path d="M3 8l9-4 9 4v9l-9 4-9-4V8Z" /><path d="M3 8l9 4 9-4M12 12v9" /></>, title: 'Commodities', text: 'Digitally represented interests linked to eligible physical commodities.' },
  { icon: <><path d="M9 18h6M10 21h4" /><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3Z" /></>, title: 'Intellectual property', text: 'Selected royalty streams, music, film, patents and other IP-related rights.' },
  { icon: <><rect x="3" y="4" width="18" height="16" rx="1.5" /><path d="m3 16 5-5 4 4 3-3 6 6" /><circle cx="16" cy="8.5" r="1.5" /></>, title: 'Art & collectibles', text: 'Fractional participation models for selected high-value collectibles.' },
  { icon: <><path d="M6 3h9l4 4v14H6V3Z" /><path d="M14 3v5h5M9 12h7M9 16h5" /></>, title: 'Financial instruments', text: 'Tokenized debt, securities and other instruments where legally permitted.' },
]

const CHALLENGES = [
  'Illiquidity and limited exit options',
  'High transaction and administration costs',
  'Large minimum investment sizes',
  'Fragmented records and opaque processes',
  'Slow settlement and restricted market access',
]
const ENABLES = [
  'Fractional access and clearer digital ownership records',
  'More efficient issuance and servicing workflows',
  'Compliance-aware transfer and governance mechanisms',
  'Connections between issuers, platforms and investors',
  'Primary and secondary market capabilities, where permitted',
]

const EXPANSION = [
  { icon: <><circle cx="12" cy="5" r="2.5" /><circle cx="5" cy="18" r="2.5" /><circle cx="19" cy="18" r="2.5" /><path d="M10.8 7.2 6.2 15.8M13.2 7.2l4.6 8.6M7.5 18h9" /></>, title: 'Build the network', text: 'Bring together asset owners, brokers, marketplaces, technology providers and investors around a coordinated platform strategy.' },
  { icon: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z" /></>, title: 'Activate priority markets', text: 'The source material highlights the United States, UAE and Europe as initial focus regions for supply, demand and ecosystem development.' },
  { icon: <><path d="M4 17c4 0 4-10 8-10s4 10 8 10" /><circle cx="4" cy="17" r="2" /><circle cx="20" cy="17" r="2" /></>, title: 'Connect through corridors', text: 'IBA’s Web3 Corridor model can help connect jurisdictions, institutions, capital and partners to support cross-border market entry and expansion.' },
]

/* Why the Market Needs Infrastructure, as a Web3 graphic (by request): the
   traditional market as a broken grey chain, a token hub in the middle, and
   the connected stack as a live red chain — each point a block on its chain */
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

const InfraGraphic = () => (
  <div className="tkc">
    <Chain items={CHALLENGES} title="Challenges in traditional markets" />
    <div className="tkc__hub" aria-hidden="true">
      <span className="tkc__beam" />
      <span className="tkc__token">
        <svg viewBox="0 0 24 24">
          <path d="M12 3 4 7.5v9L12 21l8-4.5v-9Z" />
          <path d="M4 7.5 12 12l8-4.5M12 12v9" />
        </svg>
      </span>
      <span className="tkc__beam tkc__beam--out" />
    </div>
    <Chain items={ENABLES} live title="What a connected tokenization stack can enable" />
  </div>
)

const Arrow = () => <span aria-hidden="true">→</span>

export default function Tokenization() {
  return (
    <div className="tkp">
      <PageHero
        id="tokenization"
        aside={<TokenHero />}
        eyebrow="Tokenization · Real-World Assets · Digital Markets"
        title={
          <>
            Turn real-world assets into <em className="tkp-hl">new market opportunities.</em>
          </>
        }
        lede="Tokenization can connect traditionally illiquid assets to digital markets—creating new possibilities for fractional ownership, capital formation, transparency and cross-border investor access."
        actions={
          <>
            <Btn href="#framework">
              Explore the framework <Arrow />
            </Btn>
            <Btn enquiry={ENQUIRY} variant="ghost">
              Discuss a tokenization project
            </Btn>
          </>
        }
      />

      <section className="tkp-focus band band--light band--own" aria-label="What IBA brings">
        <ul className="tkp-focus__list">
          {HERO_POINTS.map((p) => (
            <li className="tkp-focus__item" key={p.label}>
              <span className="tkp-focus__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">{p.icon}</svg>
              </span>
              <span className="tkp-focus__label">{p.label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* set like the About page's Impact section (by request): the red
          gradient band, the figures in one row between hairlines */}
      <Section
        id="opportunity"
        tone="red"
        eyebrow="The Opportunity"
        title="Bringing traditionally illiquid assets into digital markets."
        lede="Real estate, private equity, commodities, intellectual property and other high-value assets can be difficult to trade, costly to administer and inaccessible to many investors. Tokenization represents ownership or economic rights through digital tokens, creating the potential for fractional participation and more efficient market infrastructure."
      >
        <Stats items={FIGURES} />
        <p className="tkp-note" data-rise>
          Figures are drawn from the provided source material and include estimates and scenario projections, not
          guaranteed outcomes. Market definitions, assumptions and dates should be validated before publication.
        </p>
      </Section>

      {/* the site's standard icon cards, three across (as on Expertise and Ecosystem) */}
      <Section
        id="value-creation"
        eyebrow="Value Creation"
        title="Designed to create value for both asset owners and investors."
        lede="A well-structured tokenization model aligns asset economics, investor access, operational design and the legal rights represented by each token."
      >
        <Cards items={VALUE} cols={3} />
      </Section>

      <Section
        id="framework"
        tone="dark"
        eyebrow="End-to-End Framework"
        title="From asset selection to market participation."
        lede="Tokenization is more than issuing a token. It requires a coordinated approach to asset suitability, legal rights, compliance, technology, capital formation and the market infrastructure needed to support ongoing activity."
      >
        {/* the six steps as the About page's Our Mission glass cards, on its
            red light-arcs ground */}
        <MissionPillars items={STEP_CARDS()} />
        <div className="pk-actions" data-rise>
          <Btn enquiry={ENQUIRY}>
            Discuss your Project <Arrow />
          </Btn>
        </div>
      </Section>

      <Section
        id="applications"
        eyebrow="Industry Applications"
        title="One approach. Multiple asset classes."
        lede="Tokenization models can be tailored to different asset types, legal rights, cash-flow profiles and investor requirements."
      >
        <Cards items={APPLICATIONS} cols={3} />
      </Section>

      <Section
        id="infrastructure"
        tone="dark"
        eyebrow="Why the Market Needs Infrastructure"
        title="Solving for more than the token itself."
        lede="Market adoption depends on the ecosystem around an asset: trusted legal structures, compliance, interoperable technology, distribution and ongoing investor servicing."
      >
        <InfraGraphic />
      </Section>

      <Section
        id="market-expansion"
        eyebrow="Ecosystem and Market Expansion"
        title="Tokenization scales when the ecosystem connects."
        lede="Issuers need more than technology. They need a network of asset owners, brokers, marketplaces, investors, service providers and institutional partners—supported by regulatory engagement and access to priority markets."
      >
        <Cards items={EXPANSION} cols={3} />
      </Section>

      <Section
        id="tokenization-cta"
        tone="dark"
        eyebrow="India Blockchain Alliance"
        title="Move from tokenization concept to a market-ready program."
        lede="Explore the asset, regulatory, technology and ecosystem requirements for your initiative—and identify the partners and markets needed to take it forward."
      >
        <div className="pk-actions" data-rise>
          <Btn enquiry={ENQUIRY}>
            Discuss your project <Arrow />
          </Btn>
        </div>
        {/* the disclaimer, at the bottom of the closing box (by request) */}
        <p className="tkp-disclaimer">
          This page is informational and does not constitute legal, tax, investment or financial advice, or an offer to
          issue or acquire any token. Tokenization outcomes depend on asset structure, applicable laws, market demand,
          technology design and operational controls. Market statistics and projections shown here are based on the
          supplied source material and should be independently verified before external publication.
        </p>
      </Section>
    </div>
  )
}
