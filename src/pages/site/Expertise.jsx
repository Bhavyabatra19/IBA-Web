/** Expertise — the consulting stack, how we work, and who we work with. */

import { PageHero, Section, Cards, Quote, Btn } from '../../components/Kit'
import { REGIONS_LINE } from '../../data/facts'

/* The hero image: the client's Pinterest reference (pin.it/4IGXSzIxE),
   cropped to the graphic, tinted to IBA red, with the original brand's mark
   on the plate replaced by IBA. ⚠ Third-party artwork — license it from its
   creator, or replace it, before launch. The drawn alternative is
   components/ExpertiseHolo.jsx. */
const HeroImage = () => (
  <div className="xp-img" aria-hidden="true">
    <img src="/images/xp-holo.jpg" alt="" width="1080" height="780" decoding="async" />
  </div>
)

/* IBA Initiatives: the programmes IBA built and runs (moved here from the
   Ecosystem page, by request) */
const INITIATIVES = [
  { title: 'Tech4Good', sub: 'Technology in service of outcomes that matter', text: "IBA's impact initiative, applying blockchain and emerging technology to problems where the return is social rather than commercial. Anchors the alliance's SDG alignment.", href: '/initiatives#init-tech4good', cta: 'Learn more' },
  { title: 'Green Chain Protocol', sub: 'Making green finance and governance verifiable', text: 'A blockchain ecosystem focused on ESG, aligned with COP28, showcasing and growing Web3 projects in sustainability.', href: '/initiatives#init-green-chain', cta: 'Learn more' },
  { title: 'Verifyble', sub: 'Data security and digital asset management', text: "IBA's platform for data security and digital asset management, helping any organisation or individual secure, verify and manage data and digital assets on-chain.", href: '/initiatives#init-verifyble', cta: 'Learn more' },
  { title: 'IBA Red Club', sub: 'The talent pipeline for Web3 and AI', text: 'Certified programmes, on-campus labs, live industry projects, internships and placements.', href: '/initiatives#init-red-club', cta: 'Learn more' },
  { title: 'Web3 Corridor', sub: 'Global Innovation Corridor Initiative', text: 'A global innovation platform connecting ' + REGIONS_LINE + ' through innovation, technology, investment and partnerships.', href: '/initiatives#init-web3-corridor', cta: 'Learn more' },
  { title: 'India AI Alliance', sub: 'Details to be added', text: 'Description of the India AI Alliance to be supplied.', href: '/initiatives#init-india-ai-alliance', cta: 'Learn more' },
]

const STACK = [
  { title: 'Tokenization', text: 'Asset selection, token design, issuance structure and tokenomics for real-world and digital assets. We take an asset from idea to a compliant, investable token.' },
  { title: 'Standards', text: 'Technical and operating standards that make solutions interoperable, auditable and ready to scale across platforms and markets.' },
  { title: 'Frameworks & Compliance', text: 'Regulatory mapping, governance frameworks and compliance design across jurisdictions, built in from the first day of the project.' },
  { title: 'Stablecoins Structuring', text: 'Reserve, issuance and redemption design for stablecoin models, aligned with regulatory expectations in each market.' },
]

const POWER = [
  { title: 'IDO / STO / IEO Marketing', text: 'Product validation, roadmap and marketing strategy, brand and community building for token launches.' },
  { title: 'Technical', text: 'Platform and smart contract creation, testing, security audit, white paper and tokenomics.' },
  { title: 'Financial', text: 'Book building, escrow, wallet management, reporting, audit and fund administration.' },
]

const BUILD = [
  { num: '01', title: 'Strategy Assessment', text: 'We frame the problem, test the business case and map the regulation before anything is built.' },
  { num: '02', title: 'Blockchain and Web3 Solution', text: 'We design the architecture, token model and governance that fit the assessed need.' },
  { num: '03', title: 'Custom Application Development', text: 'We build, test and audit the platform and smart contracts, then support the launch.' },
]

const GROW = [
  { num: '04', title: 'Go-to-Market', text: 'We plan and run the launch: positioning, target markets, partners and the channels that put the product in front of the right people.' },
  { num: '05', title: 'Investments', text: 'We prepare you for capital and connect you with it: investor readiness, structuring and introductions across the alliance network.' },
  { num: '06', title: 'Grow and Build', text: 'After launch we keep building with you: new features, new users, stronger community and partnerships that compound.' },
  { num: '07', title: 'Scale Your Business', text: 'We help you expand into new markets and jurisdictions, with the governance and operations to run at scale.' },
]

const PARTNERS = [
  { title: 'Governments & Regulators', text: 'Policy input, standards and public infrastructure built on blockchain and Web3 technologies. We work alongside policy teams to turn intent into frameworks that can be implemented.' },
  { title: 'Enterprises', text: 'From a first use-case assessment to a governed, production-ready deployment. We help leadership teams decide where the technology earns its place, then deliver it.' },
  { title: 'Asset Owners & Issuers', text: 'Structuring, compliance and go-to-market support for tokenized offerings, from choosing the asset to reaching investors.' },
  { title: 'Founders & Startups', text: 'Launch readiness across technical, financial and marketing workstreams, with access to the alliance network of advisors, partners and investors.' },
]

const OUTCOMES = [
  { title: 'Clarity', text: 'A framed problem, a tested model and an honest answer on whether blockchain is the right tool, before any budget is committed to building.' },
  { title: 'Compliance Confidence', text: 'Regulation mapped up front, so the design holds in the jurisdictions you operate in and stands up to regulator and auditor review.' },
  { title: 'A Working Product', text: 'Built, audited and handed over with the governance needed to run it, and a team that knows how to operate it.' },
  { title: 'A Route to Market', text: 'Clear positioning, the right first markets and the partner channels to reach them.' },
  { title: 'Access to Capital', text: 'Investor-ready materials, a sound structure and introductions across the alliance network.' },
  { title: 'Room to Scale', text: 'The operating model, governance and corridor access to grow into new markets.' },
]

export default function Expertise() {
  return (
    <div>
      <PageHero
        id="expertise"
        aside={<HeroImage />}
        eyebrow="Expertise"
        title="What We Deliver"
        lede={[
          'Policy · Compliance · Standards · Taxation · Forensics · Risk Mitigation · Advisory · Consulting · Research · Launch Pads · Accelerator · Consortiums · Knowledge',
          'Most organisations don\'t fail at blockchain because the technology is wrong. They fail because the problem was never framed, the regulation was never mapped, or the model was never tested. IBA covers the full arc, from "should we?" to "it\'s live, and it\'s governed."',
        ]}
        actions={
          <Btn enquiry="Consulting" variant="primary">
            Scope a Project With Us <span aria-hidden="true">→</span>
          </Btn>
        }
      />

      <Section
        id="consulting-stack"
        eyebrow="For Enterprises & Governments"
        title="Web3 Solution Consulting Stack"
        lede="Four areas of expertise that cover what an organisation needs to move from an idea to a governed, working product. Each one can be engaged on its own, or together as a single programme."
      >
        <Cards items={STACK} cols={4} />
      </Section>

      <Section
        id="power-consulting"
        tone="dark"
        eyebrow="Token Offerings"
        title="Power Consulting"
        lede="End-to-end support for token offerings (IDO, STO and IEO), delivered across three workstreams that run side by side: getting the offering known, getting it built and keeping it financially sound."
      >
        <Cards items={POWER} cols={3} />
      </Section>

      <Section
        id="how-we-work"
        tone="card"
        eyebrow="How We Work"
        title="From the First Question to a Business at Scale"
        lede="The first three steps get the product right: nothing is built until the problem is framed and the regulation is mapped, and nothing is handed over until it has been tested and audited. The next four take it to market, fund it and grow it."
      >
        <p className="pk-label" data-rise>Assess, design and develop</p>
        <Cards items={BUILD} cols={3} />
        <p className="pk-label" data-rise>Launch, fund, grow and scale</p>
        <Cards items={GROW} cols={4} />
        <div className="pk-actions" data-rise>
          <Btn enquiry="Consulting">
            Scope a Project With Us <span aria-hidden="true">→</span>
          </Btn>
        </div>
      </Section>

      <Section id="founder-quote" tone="red">
        <Quote by="Raj Kapoor · Founder, India Blockchain Alliance" photo="/images/founder-sq.jpg">
          The future of capital markets won’t simply be digital. It will be transparent,
          programmable, compliant and tokenized. And I’m excited to help build it. The
          future isn’t coming. I am building it.
        </Quote>
      </Section>

      <Section id="who-we-serve" eyebrow="Who We Work With" title="One Stack, Multiple Partners">
        <Cards items={PARTNERS} cols={4} />
      </Section>

      <Section
        id="outcomes"
        tone="dark"
        eyebrow="The Outcome"
        title="We Equip You to Build, Launch and Scale"
        lede="Every engagement is measured by what you can do at the end of it. These are the results we work towards with each partner."
      >
        <Cards items={OUTCOMES} cols={3} />
        <div className="pk-actions" data-rise>
          <Btn enquiry="Consulting">
            Talk to Our Team <span aria-hidden="true">→</span>
          </Btn>
        </div>
      </Section>

      <Section id="initiatives" tone="card" eyebrow="IBA Initiatives" title="Programmes We Built, Run and Stand Behind">
        <Cards items={INITIATIVES} cols={3} />
      </Section>
    </div>
  )
}
