/**
 * Memberships — the two partner memberships IBA offers, The IBA Circle and
 * IBA Block. (TheBlock.), set out as their own decks set them out, with
 * IBA's 10% off shown against every price.
 *
 * Sources: "The IBA Circle – Startup Venture Ecosystem 2026" and "IBA Block
 * Memberships" (both PDFs supplied by IBA). Tier names, prices and benefits
 * are copied from them word for word, typos aside. Only the discounted price
 * is ours, and it is worked out here from the original rather than typed in,
 * so a price change in the deck is a one-number change on this page.
 *
 * ⚠ The Circle deck's comparison matrix (page 17) is misaligned in the PDF
 * itself — ticks missing, values in the wrong rows — so it is left out until
 * IBA sends a clean copy. Each level's own page in the deck is complete and
 * is what the cards below carry.
 *
 * ⚠ The Block deck prices its packages as "12K / 24K / 48K Annually" with no
 * currency. They are shown exactly so; confirm the currency (USD or AED)
 * before launch and set BLOCK_CURRENCY.
 */

import { PageHero, Section, Btn, Bullets } from '../../components/Kit'
import { Table } from '../../sections/service/ServiceBlocks'

/** IBA's discount on every membership, as a fraction. */
const DISCOUNT = 0.1

const off = (n) => Math.round(n * (1 - DISCOUNT) * 100) / 100

/** USD 4,990 */
const usd = (n) => 'USD ' + n.toLocaleString('en-US')

/** 12K, 10.8K — the Block deck's own shorthand */
const BLOCK_CURRENCY = ''
const k = (n) => (BLOCK_CURRENCY ? BLOCK_CURRENCY + ' ' : '') + n / 1000 + 'K'

/** The original price struck through, then the price after IBA's discount. */
function Price({ amount, format, per }) {
  return (
    <p className="mb-price">
      <s className="mb-price__was">
        <span className="mb-sr">Was </span>
        {format(amount)}
      </s>
      <span className="mb-price__now">
        <span className="mb-sr">Now </span>
        {format(off(amount))}
      </span>
      {per && <span className="mb-price__per">{per}</span>}
    </p>
  )
}

/* ---------------------------------------------------------------- */
/* The IBA Circle                                                    */
/* ---------------------------------------------------------------- */

const CIRCLE = [
  {
    level: 'Level 1',
    name: 'Global Member',
    price: 990,
    per: '/ year',
    text: 'Ecosystem access for early-stage and international founders building community before needing active execution support.',
    list: [
      'Ecosystem Access: a global network of founders, investors and ecosystem partners.',
      'Community Events: online and physical gatherings, workshops and roundtables.',
      'Directories: startup, investor and mentor discovery within the ecosystem.',
      'Founder Resources: templates, KPI frameworks, startup playbooks and data-room guidance.',
      'Mentoring & Media: 4 hours of mentor access per month, plus 1 podcast recording.',
      'Publishing (Optional): add USD 300 for full distribution on The Block channels and 24K+ newsletter.',
    ],
    outcome: 'Ecosystem Integration & Community',
  },
  {
    level: 'Level 2',
    name: 'Startup Member',
    price: 4990,
    per: '/ year',
    text: 'Strategic guidance to prepare for growth, fundraising, and market expansion without joining a formal accelerator. The most relevant pre-accelerator offer.',
    list: [
      'Strategic Advisory: helping founders make better decisions before they become expensive mistakes.',
      'Investor Readiness: professional fundraising preparation and commercial strategy.',
      'Revenue Growth: strategic go-to-market and marketing advisory.',
      'Strategic Introductions: curated introductions to relevant investors and partners, where appropriate.',
      'Tangible Benefits: includes 2 complimentary IBA Circle events, 1 featured episode on The IBA Circle Podcast, and up to 12 hours/month of mentorship.',
    ],
    outcome: 'Investor-Ready & Clear GTM Strategy',
  },
  {
    level: 'Level 3',
    name: 'Seed Accelerator',
    price: 9900,
    per: '/ 3 months',
    text: 'The structured execution program for high-potential Seed companies preparing to raise capital and accelerate growth.',
    list: [
      'Structured Execution: weekly strategy sessions, KPI reviews, and a clear growth roadmap.',
      'Investor Readiness: comprehensive pitch deck, financial model, and data room review.',
      'Strategic Introductions: curated introductions to investors, family offices, and mentors.',
    ],
    outcome: 'Ready to Raise Capital',
  },
  {
    level: 'Level 4',
    name: 'Series A Accelerator',
    price: 19900,
    per: '/ 4 months',
    text: 'The institutional-capital and expansion program for startups preparing to scale, raise institutional capital and accelerate market expansion.',
    list: [
      'Institutional Fundraising: dedicated fundraising strategy and curated introductions to institutional investors and VCs.',
      'Executive Positioning: premium visibility and leadership branding within the ecosystem.',
      'International Expansion: structured strategy for global growth, corporate introductions and new market entry.',
    ],
    outcome: 'Institutional Fundraising & Global Expansion',
  },
]

/* ---------------------------------------------------------------- */
/* IBA Block                                                         */
/* ---------------------------------------------------------------- */

const BLOCK = [
  { name: 'Connect', price: 12000 },
  { name: 'Access', price: 24000 },
  { name: 'Build', price: 48000 },
]

const YES = '✓'

/** The Block deck's package table, row for row. */
const BLOCK_ROWS = [
  ['Space Access Passes', '1', '3', '6'],
  ['Guest Passes', '–', '1', '3'],
  ['Consultations (Mkt/Reg/Tech)', '0.5h each', '2h each', '4h each'],
  ['Dedicated Account Manager', '–', YES, YES],
  ['Web Platform Profile', YES, YES, YES],
  ['Product/Service Showcase', '–', YES, YES],
  ['Logo on Logo Wall', '–', YES, YES],
  ['Event Access', 'Standard', 'Standard + VIP', 'Standard + VIP'],
  ['Workshops (Seats)', '1', '3', 'Unlimited'],
  ['Private/Co-hosted Event', '–', '1 co-hosted', '1 private + 1 co-hosted'],
  ['Speaker Opportunities', 'Events only', 'Events & Conferences', 'Priority Access to all'],
  ['AMAs on X', '–', '1', '2'],
  ['Podcast Features', '1', '2', '4'],
  ['Podcast Studio Time', '2h', '6h', '12h'],
  ['Announcement Posts', YES, YES, YES],
  ['Social Media Features', '–', '2', '4'],
  ['Newspaper Features', 'Normal (1 Edition)', 'Premium (2 Edition)', 'Full-Page (4 Editions)'],
]

export default function Memberships() {
  return (
    <>
      <PageHero
        eyebrow="Memberships"
        title="Memberships"
        lede="Two memberships from IBA's partner ecosystem: The IBA Circle, for founders building towards a raise, and IBA Block., the membership network for the virtual asset industry. Every membership is 10% off through IBA."
        actions={
          <>
            <Btn href="/memberships#circle">The IBA Circle</Btn>
            <Btn href="/memberships#block" variant="ghost">
              IBA Block.
            </Btn>
          </>
        }
      />

      <Section
        id="circle"
        eyebrow="The IBA Circle · Startup Venture Ecosystem"
        title="Start where you are. Upgrade as you grow."
        lede="Choose the right level of support at the right stage. Not every company is ready for acceleration or fundraising."
        tone="card"
      >
        <div className="mb-tiers mb-tiers--4">
          {CIRCLE.map((t) => (
            <article className="pk-card mb-tier" key={t.name} data-rise>
              <p className="pk-card__num">{t.level}</p>
              <h3 className="pk-card__title">{t.name}</h3>
              <span className="wd__tag mb-tier__tag">10% off with IBA</span>
              <Price amount={t.price} format={usd} per={t.per} />
              <p className="pk-card__text">{t.text}</p>
              <Bullets items={t.list} />
              <p className="pk-card__text mb-tier__outcome">
                <strong>Outcome:</strong> {t.outcome}
              </p>
              <div className="mb-tier__go">
                <Btn enquiry={`The IBA Circle: ${t.name}`}>Apply</Btn>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="block"
        eyebrow="IBA Block. · Membership Packages"
        title="The Capital of Virtual Assets"
        lede="A membership-driven network that brings together chains, market makers, legal experts, technologists, investors and other service providers, with year-round spaces, events and media to keep members connected and visible."
      >
        <div className="mb-tiers mb-tiers--3">
          {BLOCK.map((p) => (
            <article className="pk-card mb-tier" key={p.name} data-rise>
              <p className="pk-card__num">Sponsorship Package</p>
              <h3 className="pk-card__title">{p.name}</h3>
              <span className="wd__tag mb-tier__tag">10% off with IBA</span>
              <Price amount={p.price} format={k} per="Annually" />
              <div className="mb-tier__go">
                <Btn enquiry={`IBA Block: ${p.name} package`}>Enquire</Btn>
              </div>
            </article>
          ))}
        </div>
        <div className="mb-table">
          <Table
            caption="IBA Block. sponsorship packages"
            head={['Sponsorship Packages', ...BLOCK.map((p) => p.name)]}
            rows={[
              ['Price', ...BLOCK.map((p) => <Price key={p.name} amount={p.price} format={k} per="Annually" />)],
              ...BLOCK_ROWS,
            ]}
          />
        </div>
      </Section>
    </>
  )
}
