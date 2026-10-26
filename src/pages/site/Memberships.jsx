/**
 * Memberships — every membership IBA offers through its partner ecosystem.
 *
 * The page is a carousel with one card per membership: The IBA Circle and
 * IBA Block. (TheBlock.) are live, and four placeholders hold the places of
 * memberships IBA has not yet named. Opening a live card shows that
 * membership's levels in a pop-up, set out as its deck sets them out, with
 * IBA's 10% off shown against every price.
 *
 * To add a membership: give it a DETAILS component, then replace the first
 * placeholder in LIVE's wake by adding its card to LIVE. SLOTS keeps the
 * total at six, so a new membership takes a placeholder's place.
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
 * is what the pop-up carries.
 *
 * ⚠ The Block deck prices its packages as "12K / 24K / 48K Annually" with no
 * currency. They are shown exactly so; confirm the currency (USD or AED)
 * before launch and set BLOCK_CURRENCY.
 */

import { useEffect, useRef, useState } from 'react'
import { PageHero, Section, Btn, Bullets } from '../../components/Kit'
import { Table } from '../../sections/service/ServiceBlocks'
import { lockScroll, unlockScroll } from '../../lib/scroll'

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

/* ---------------------------------------------------------------- */
/* What each membership's pop-up shows                               */
/* ---------------------------------------------------------------- */

function CircleLevels() {
  return (
    <div className="mb-tiers mb-tiers--4">
      {CIRCLE.map((t) => (
        <article className="pk-card mb-tier" key={t.name}>
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
  )
}

function BlockPackages() {
  return (
    <>
      <div className="mb-tiers mb-tiers--3">
        {BLOCK.map((p) => (
          <article className="pk-card mb-tier" key={p.name}>
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
    </>
  )
}

/* ---------------------------------------------------------------- */
/* The carousel                                                      */
/* ---------------------------------------------------------------- */

/** How many cards the carousel shows in all, live and placeholder. */
const SLOTS = 6

/** The live memberships, in carousel order. */
const LIVE = [
  {
    mark: 'C',
    name: 'The IBA Circle',
    kind: 'Startup Venture Ecosystem',
    text: 'Four levels for founders building the company investors want to fund, from Global Member to Series A Accelerator.',
    from: 990,
    format: usd,
    per: '/ year',
    cta: 'View the four levels',
    title: 'Start where you are. Upgrade as you grow.',
    lede: 'Choose the right level of support at the right stage. Not every company is ready for acceleration or fundraising.',
    Details: CircleLevels,
  },
  {
    mark: 'B',
    name: 'IBA Block.',
    kind: 'Virtual Asset Ecosystem',
    text: 'Three membership packages in the capital of virtual assets: spaces, events, media and launch support.',
    from: 12000,
    format: k,
    per: 'Annually',
    cta: 'View the three packages',
    title: 'The Capital of Virtual Assets',
    lede: 'A membership-driven network that brings together chains, market makers, legal experts, technologists, investors and other service providers, with year-round spaces, events and media to keep members connected and visible.',
    Details: BlockPackages,
  },
]

const MEMBERSHIPS = [
  ...LIVE,
  ...Array.from({ length: SLOTS - LIVE.length }, () => ({})),
].map((m, i) => ({ ...m, num: String(i + 1).padStart(2, '0') }))

function MembershipCarousel({ onOpen }) {
  const track = useRef(null)
  const step = (dir) => {
    const t = track.current
    const card = t?.firstElementChild
    if (!card) return
    const gap = parseFloat(getComputedStyle(t).columnGap) || 0
    t.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: 'smooth' })
  }
  return (
    <div className="cx-mc" role="region" aria-roledescription="carousel" aria-label="IBA memberships" data-rise>
      <ul className="cx-mc__track" ref={track} tabIndex={0}>
        {MEMBERSHIPS.map((m) =>
          m.Details ? (
            <li className="cx-mc__card mb-mc__card" key={m.num}>
              <span className="cx-mc__medal mb-mc__medal" aria-hidden="true">
                {m.mark}
              </span>
              <span className="cx-mc__num">
                {m.num} · {m.kind}
              </span>
              <h3 className="cx-mc__name">{m.name}</h3>
              <p className="mb-mc__text">{m.text}</p>
              <div className="mb-mc__from">
                <span className="mb-mc__label">From</span>
                <Price amount={m.from} format={m.format} per={m.per} />
              </div>
              {/* the whole card is the target; the button's box is stretched
                  over it, so the card reads as one control */}
              <button type="button" className="mb-mc__open" onClick={(e) => onOpen(m, e.currentTarget)}>
                {m.cta} <span aria-hidden="true">→</span>
              </button>
            </li>
          ) : (
            <li className="cx-mc__card mb-mc__card--soon" key={m.num}>
              <span className="cx-mc__medal" aria-hidden="true" />
              <span className="cx-mc__num">{m.num}</span>
              <h3 className="cx-mc__name">Membership {m.num}</h3>
              <p className="cx-mc__text">Details coming soon.</p>
            </li>
          )
        )}
      </ul>
      <div className="cx-mc__nav">
        <button type="button" className="cx-mc__arrow" onClick={() => step(-1)} aria-label="Previous memberships">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
        </button>
        <button type="button" className="cx-mc__arrow" onClick={() => step(1)} aria-label="Next memberships">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- */
/* The pop-up                                                        */
/* ---------------------------------------------------------------- */

/**
 * A native <dialog>, opened with showModal: it holds focus inside itself,
 * closes on Escape, and sits in the top layer above the nav without a
 * z-index. The page behind is locked the way the enquiry form locks it, and
 * data-lenis-prevent hands the panel's own scrolling back to the browser.
 */
function MembershipDialog({ membership, onClose }) {
  const ref = useRef(null)

  useEffect(() => {
    const d = ref.current
    if (!membership || !d) return
    d.showModal()
    lockScroll()
    /* Apply and Enquire open the site's enquiry form, which is not in the top
       layer, so this closes first or the form opens hidden behind it. The
       form's own listener is on document, in the capture phase, and stops the
       click there — only a capture listener on window runs before it. */
    const onEnquiry = (e) => {
      if (d.contains(e.target) && e.target.closest('[data-enquiry]')) d.close()
    }
    window.addEventListener('click', onEnquiry, true)
    return () => {
      window.removeEventListener('click', onEnquiry, true)
      unlockScroll()
      if (d.open) d.close()
    }
  }, [membership])

  if (!membership) return null
  const { name, kind, title, lede, Details } = membership

  return (
    <dialog
      className="mb-dlg"
      ref={ref}
      aria-labelledby="mb-dlg-title"
      data-lenis-prevent
      onClose={onClose}
      /* a click on the backdrop lands on the dialog itself, never its panel */
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="mb-dlg__panel">
        <button type="button" className="mb-dlg__x" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M4 4l8 8M12 4l-8 8" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
        <header className="mb-dlg__head">
          <p className="mb-dlg__eyebrow">
            {name} · {kind}
          </p>
          <h2 className="mb-dlg__title" id="mb-dlg-title">
            {title}
          </h2>
          <p className="mb-dlg__lede">{lede}</p>
        </header>
        <Details />
      </div>
    </dialog>
  )
}

export default function Memberships() {
  const [open, setOpen] = useState(null)
  const opener = useRef(null)

  const show = (m, from) => {
    opener.current = from
    setOpen(m)
  }
  /* focus goes back to the card that opened the pop-up */
  const hide = () => {
    setOpen(null)
    opener.current?.focus()
  }

  return (
    <>
      <PageHero
        eyebrow="IBA Memberships"
        title="Memberships"
        lede="IBA offers a range of memberships through its partner ecosystem, each built for a different stage and sector. The IBA Circle and IBA Block. are open now, with more on the way. Every membership is 10% off through IBA."
        actions={
          <>
            <Btn href="/memberships#memberships">Browse Memberships</Btn>
            <Btn enquiry="IBA memberships" variant="ghost">
              Talk to Our Team
            </Btn>
          </>
        }
      />

      <Section
        id="memberships"
        eyebrow="Our Memberships"
        title="Choose your membership"
        lede="Each membership is run with a partner in the IBA ecosystem and has its own levels. Open one to see what each level includes and its IBA price."
        tone="card"
      >
        <MembershipCarousel onOpen={show} />
      </Section>

      <MembershipDialog membership={open} onClose={hide} />
    </>
  )
}
