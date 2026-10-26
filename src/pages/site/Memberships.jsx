/**
 * Memberships — every membership IBA offers through its partner ecosystem.
 *
 * Two parts, in this order:
 *   Web360 Club      IBA's own memberships, as a full-width banner carousel.
 *                    Three placeholder banners until the tiers are confirmed.
 *   Ecosystem        memberships run with partners: The IBA Circle, IBA
 *                    Block. (TheBlock.) and Tokenized Asset Foundation, then
 *                    placeholders for those to come. Opening a card shows
 *                    that membership's levels in a pop-up.
 *
 * No prices are shown anywhere on the page, by request. The decks' prices
 * are recorded in git history (the first commit of this page).
 *
 * To add a membership: give it a Details component, then add its card to
 * LIVE. SLOTS keeps the total at six, so it takes a placeholder's place.
 *
 * Sources: "The IBA Circle – Startup Venture Ecosystem 2026" and "IBA Block
 * Memberships" (both PDFs supplied by IBA), and stofdn.com/membership. Tier names and benefits are
 * copied from them word for word, typos aside.
 *
 * ⚠ The partner list (data/partners.js) names this partner "Token Asset
 * Foundation (STO)"; IBA gives the name as Tokenized Asset Foundation.
 *
 * Tokenized Asset Foundation's tiers are its three individual tiers, from
 * stofdn.com/membership. ⚠ That page could not be loaded from the build
 * session; the benefits were read through search results, so check them
 * against the page. Its corporate tiers are not shown yet.
 *
 * ⚠ The Circle deck's comparison matrix (page 17) is misaligned in the PDF
 * itself — ticks missing, values in the wrong rows — so it is left out until
 * IBA sends a clean copy. Each level's own page in the deck is complete and
 * is what the pop-up carries.
 */

import { useEffect, useRef, useState } from 'react'
import { PageHero, Section, Btn, Bullets } from '../../components/Kit'
import { Table } from '../../sections/service/ServiceBlocks'
import { lockScroll, unlockScroll } from '../../lib/scroll'

/* ---------------------------------------------------------------- */
/* The IBA Circle                                                    */
/* ---------------------------------------------------------------- */

const CIRCLE = [
  {
    level: 'Level 1',
    name: 'Global Member',
    text: 'Ecosystem access for early-stage and international founders building community before needing active execution support.',
    list: [
      'Ecosystem Access: a global network of founders, investors and ecosystem partners.',
      'Community Events: online and physical gatherings, workshops and roundtables.',
      'Directories: startup, investor and mentor discovery within the ecosystem.',
      'Founder Resources: templates, KPI frameworks, startup playbooks and data-room guidance.',
      'Mentoring & Media: 4 hours of mentor access per month, plus 1 podcast recording.',
      'Publishing (Optional): an add-on for full distribution on The Block channels and 24K+ newsletter.',
    ],
    outcome: 'Ecosystem Integration & Community',
  },
  {
    level: 'Level 2',
    name: 'Startup Member',
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
    duration: '3 months',
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
    duration: '4 months',
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

const BLOCK = [{ name: 'Connect' }, { name: 'Access' }, { name: 'Build' }]

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
          {t.duration && <span className="wd__tag mb-tier__tag">Duration: {t.duration}</span>}
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
          rows={BLOCK_ROWS}
        />
      </div>
    </>
  )
}

/** Tokenized Asset Foundation's individual tiers, from stofdn.com/membership. */
const TAF = [
  {
    name: 'CORE',
    text: 'Essential access to the global tokenized asset ecosystem.',
    list: [
      'Member portal access',
      'Member badge',
      'Learning Center access',
      'Event access',
      '1 standard directory listing',
      '1 standard issuer profile with 1 offering',
      '5-day Buy Side trial, with member pricing',
    ],
  },
  {
    name: 'GROWTH',
    text: 'Visibility and promotion across the ecosystem. Everything in CORE, plus:',
    list: [
      'Up to 5 Enhanced Vendor Directory Listings',
      '1 Enhanced Issuer Profile with unlimited offerings',
      'Branded Learning Center content',
      '1 annual Foundation strategy or advisory session',
    ],
  },
  {
    name: 'Founding Member',
    text: 'Founding recognition, open through 2026. Everything in GROWTH, plus:',
    list: [
      'Annual Founding Member designation and badge',
      'Global press release at enrollment',
      'Featured profile',
      'Preferred directory placement',
      'Annual run-of-network advertising',
      'Priority introductions',
    ],
  },
]

function TafTiers() {
  return (
    <div className="mb-tiers mb-tiers--3">
      {TAF.map((t) => (
        <article className="pk-card mb-tier" key={t.name}>
          <p className="pk-card__num">Individual Membership</p>
          <h3 className="pk-card__title">{t.name}</h3>
          <p className="pk-card__text">{t.text}</p>
          <Bullets items={t.list} />
          <div className="mb-tier__go">
            <Btn enquiry={`Tokenized Asset Foundation: ${t.name}`}>Apply</Btn>
          </div>
        </article>
      ))}
    </div>
  )
}

/* ---------------------------------------------------------------- */
/* The carousel                                                      */
/* ---------------------------------------------------------------- */

/** How many cards the carousel shows in all, live and placeholder. */
const SLOTS = 6

/** TheCircle.'s mark, drawn: a disc with a square cut from it. Ink on the
    white card rather than the supplied white-on-black. */
const CircleLogo = () => (
  <span className="mb-logo">
    <svg className="mb-logo__mark" viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="50" r="50" fill="currentColor" />
      <rect x="54" y="54" width="28" height="28" fill="var(--bb-surface)" />
    </svg>
    <span className="mb-logo__word">
      TheCircle<span>.</span>
    </span>
  </span>
)

/** TheBlock.'s mark, then its wordmark set as text: the supplied wordmark is
    white, and would vanish on the card. */
const BlockLogo = () => (
  <span className="mb-logo">
    <img src="/logos/eco/theblock-ae.png" alt="" width="38" height="38" />
    <span className="mb-logo__word">
      TheBlock<span className="mb-logo__dot">.</span>
    </span>
  </span>
)

const TafLogo = () => (
  <span className="mb-logo">
    <img className="mb-logo__crop" src="/logos/partners/token-asset-foundation.jpg" alt="" width="64" height="38" />
  </span>
)

/** The live memberships, in carousel order. */
const LIVE = [
  {
    Logo: CircleLogo,
    name: 'The IBA Circle',
    kind: 'Startup Venture Ecosystem',
    text: 'Four levels for founders building the company investors want to fund, from Global Member to Series A Accelerator.',
    cta: 'View the four levels',
    title: 'Start where you are. Upgrade as you grow.',
    lede: 'Choose the right level of support at the right stage. Not every company is ready for acceleration or fundraising.',
    Details: CircleLevels,
  },
  {
    Logo: BlockLogo,
    name: 'IBA Block.',
    kind: 'Virtual Asset Ecosystem',
    text: 'Three membership packages in the capital of virtual assets: spaces, events, media and launch support.',
    cta: 'View the three packages',
    title: 'The Capital of Virtual Assets',
    lede: 'A membership-driven network that brings together chains, market makers, legal experts, technologists, investors and other service providers, with year-round spaces, events and media to keep members connected and visible.',
    Details: BlockPackages,
  },
  {
    Logo: TafLogo,
    name: 'Tokenized Asset Foundation',
    kind: 'Tokenized Asset Ecosystem',
    text: 'Three tiers in the global tokenized asset ecosystem, from essential access to Founding Member recognition.',
    cta: 'View the three tiers',
    title: 'Join the global tokenized asset ecosystem.',
    lede: 'Membership of Tokenized Asset Foundation (formerly the STO Foundation): directories, issuer profiles, learning, events and visibility across the tokenization industry.',
    Details: TafTiers,
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
    <div className="cx-mc" role="region" aria-roledescription="carousel" aria-label="Ecosystem memberships" data-rise>
      <ul className="cx-mc__track" ref={track} tabIndex={0}>
        {MEMBERSHIPS.map((m) =>
          m.Details ? (
            <li className="cx-mc__card mb-mc__card" key={m.num}>
              {m.Logo ? (
                <m.Logo />
              ) : (
                <span className="cx-mc__medal mb-mc__medal" aria-hidden="true">
                  {m.mark}
                </span>
              )}
              <span className="cx-mc__num">
                {m.num} · {m.kind}
              </span>
              <h3 className="cx-mc__name">{m.name}</h3>
              <p className="mb-mc__text">{m.text}</p>
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
/* Web360 Club — the banner carousel                                 */
/* ---------------------------------------------------------------- */

/** Placeholder banners, one per Web360 Club membership, until IBA confirms them. */
const WEB360 = ['01', '02', '03']

function BannerCarousel() {
  const track = useRef(null)
  const [at, setAt] = useState(0)

  const go = (i) => {
    const t = track.current
    if (!t) return
    const n = (i + WEB360.length) % WEB360.length
    t.scrollTo({ left: n * t.clientWidth, behavior: 'smooth' })
  }
  /* the dots follow the track, however it was scrolled: arrows, swipe or keys */
  const onScroll = () => {
    const t = track.current
    if (t) setAt(Math.round(t.scrollLeft / t.clientWidth))
  }

  return (
    <div className="mb-bn" role="region" aria-roledescription="carousel" aria-label="Web360 Club memberships" data-rise>
      <ul className="mb-bn__track" ref={track} tabIndex={0} onScroll={onScroll}>
        {WEB360.map((n, i) => (
          <li
            className="mb-bn__slide"
            key={n}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${WEB360.length}`}
          >
            <span className="mb-bn__beam" aria-hidden="true" />
            <span className="cx-mc__medal mb-bn__medal" aria-hidden="true" />
            <p className="mb-bn__num">Web360 Club · Membership {n}</p>
            <h3 className="mb-bn__name">Membership {n}</h3>
            <p className="mb-bn__text">Details coming soon.</p>
          </li>
        ))}
      </ul>
      <div className="mb-bn__nav">
        <button type="button" className="cx-mc__arrow" onClick={() => go(at - 1)} aria-label="Previous membership">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
        </button>
        <div className="mb-bn__dots">
          {WEB360.map((n, i) => (
            <button
              type="button"
              key={n}
              className="mb-bn__dot"
              aria-label={`Show membership ${n}`}
              aria-current={i === at ? 'true' : undefined}
              onClick={() => go(i)}
            />
          ))}
        </div>
        <button type="button" className="cx-mc__arrow" onClick={() => go(at + 1)} aria-label="Next membership">
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
        lede="IBA offers a range of memberships through its partner ecosystem, each built for a different stage and sector."
        actions={
          <>
            <Btn href="/memberships#web360">Web360 Club</Btn>
            <Btn href="/memberships#memberships" variant="ghost">
              Ecosystem Memberships
            </Btn>
          </>
        }
      />

      <Section
        id="web360"
        eyebrow="Web360 Club"
        title="Web360 Club Memberships"
        lede="IBA's own memberships. Details are coming soon; get in touch to hear about them first."
      >
        <BannerCarousel />
      </Section>

      <Section
        id="memberships"
        eyebrow="Our Ecosystem Memberships"
        title="Choose your membership from the ecosystem"
        lede="Each membership is run with a partner in the IBA ecosystem and has its own levels. Open one to see what each level includes."
        tone="card"
      >
        <MembershipCarousel onOpen={show} />
      </Section>

      <MembershipDialog membership={open} onClose={hide} />
    </>
  )
}
