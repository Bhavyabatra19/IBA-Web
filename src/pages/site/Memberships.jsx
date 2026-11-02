/**
 * Memberships — every membership IBA offers through its partner ecosystem.
 *
 * Three parts, in this order:
 *   Web360 Club      IBA's own tiers, Bronze, Silver and Gold, three to a
 *                    view: who each is for, and why to join.
 *   Ecosystem        partner companies offering their services to members:
 *                    The IBA Circle (investors), IBA Block. (events) and
 *                    Tokenized Asset Foundation (tokenization), then a card
 *                    into the marketplace. Explore on a card opens
 *                    that partner's tiers in a pop-up.
 *   Cohort           memberships for institutes and their students: the Red
 *                    Club Experience Zone (B2B) and the Student Experience.
 *                    Placeholders, named but not yet detailed.
 *
 * The partner data and the pop-up are exported for the marketplace
 * (pages/site/Marketplace.jsx), which lists every partner.
 *
 * No prices are shown anywhere on the page, by request. The decks' prices
 * are recorded in git history (the first commit of this page).
 *
 * To add a partner membership: give it a Details component, then add it to
 * ECOSYSTEM. It joins the carousel before the marketplace card, and its offerings
 * and locations put it in the marketplace's filters.
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
import { Table, Go } from '../../sections/service/ServiceBlocks'
import { lockScroll, unlockScroll } from '../../lib/scroll'
import { MEMBER_LOGIN } from '../../nav'

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
/* Partner logos                                                     */
/* ---------------------------------------------------------------- */

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

/* ---------------------------------------------------------------- */
/* The ecosystem: partner companies and their tiers                  */
/* ---------------------------------------------------------------- */

/**
 * Partners whose membership tiers are on the site. `why` is the card's answer
 * to "Why join through IBA?"; `brief`, `offerings` and `locations` are what
 * the marketplace lists and filters on — its filter options are read from
 * these lists, so a new offering here becomes a new filter there.
 */
export const ECOSYSTEM = [
  {
    id: 'circle',
    Logo: CircleLogo,
    name: 'The IBA Circle',
    partner: 'TheCircle.',
    kind: 'Startup Venture Ecosystem',
    why: 'Meet investors before the raise. Join through IBA for global networking with angels, family offices and VCs, and a real-time view of how founders become investor-ready.',
    brief: 'Startup venture ecosystem connecting founders, operators and investors: acceleration, investor access, mentoring and media.',
    offerings: ['Investor Access', 'Startup Acceleration', 'Mentoring', 'Media & Visibility'],
    locations: ['GCC', 'Global'],
    title: 'Start where you are. Upgrade as you grow.',
    lede: 'Choose the right level of support at the right stage. Not every company is ready for acceleration or fundraising.',
    Details: CircleLevels,
  },
  {
    id: 'block',
    Logo: BlockLogo,
    name: 'IBA Block.',
    partner: 'TheBlock.',
    kind: 'Virtual Asset Ecosystem',
    why: 'The events hub for virtual assets. Join through IBA for global networking at side events, workshops and conferences, and real-time experience of the Dubai ecosystem.',
    brief: 'Virtual asset hub in Dubai: event spaces, side events and workshops, media, launch support, VA licensing and talent.',
    offerings: ['Events', 'Spaces', 'Media & Visibility', 'Regulatory & Licensing', 'Talent & Education'],
    locations: ['UAE'],
    title: 'The Capital of Virtual Assets',
    lede: 'A membership-driven network that brings together chains, market makers, legal experts, technologists, investors and other service providers, with year-round spaces, events and media to keep members connected and visible.',
    Details: BlockPackages,
  },
  {
    id: 'taf',
    Logo: TafLogo,
    name: 'Tokenized Asset Foundation',
    partner: 'Tokenized Asset Foundation',
    kind: 'Tokenized Asset Ecosystem',
    why: 'Your route into tokenized markets. Join through IBA for global expansion through directories, issuer profiles and events across the tokenization industry.',
    brief: 'Global tokenized asset ecosystem: vendor and issuer directories, a learning center, events and visibility.',
    offerings: ['Tokenization', 'Directories', 'Events', 'Talent & Education'],
    locations: ['Global'],
    title: 'Join the global tokenized asset ecosystem.',
    lede: 'Membership of Tokenized Asset Foundation (formerly the STO Foundation): directories, issuer profiles, learning, events and visibility across the tokenization industry.',
    Details: TafTiers,
  },
]

/* ---------------------------------------------------------------- */
/* The carousels                                                     */
/* ---------------------------------------------------------------- */

const COHORT_SLOTS = 4

/** Fills a list out to `slots` cards with unnamed placeholders, and numbers them. */
const fill = (items, slots) =>
  [...items, ...Array.from({ length: slots - items.length }, () => ({}))].map((m, i) => ({
    ...m,
    num: String(i + 1).padStart(2, '0'),
  }))

/** The carousel's last card: every partner, and the way to become one. */
const MARKETPLACE = {
  num: 'market',
  href: '/marketplace',
  name: 'Explore the Marketplace',
  text: 'Every partner company in the IBA ecosystem and what they offer, in one place. Or join as a partner company or ecosystem member.',
  cta: 'Explore the Marketplace',
}

/* the live partners, then straight on to the marketplace — no placeholders */
const MEMBERSHIPS = [...fill(ECOSYSTEM, ECOSYSTEM.length), MARKETPLACE]

/** Cohort memberships: named, with no details yet, so neither opens a pop-up. */
const COHORT = fill(
  [
    { name: 'Red Club Experience Zone', audience: 'B2B · For institutes' },
    { name: 'Student Experience', audience: 'For students' },
  ],
  COHORT_SLOTS
)

/** Arrows for a scroll-snapped track: one card's width per press. */
function useStep() {
  const track = useRef(null)
  const step = (dir) => {
    const t = track.current
    const card = t?.firstElementChild
    if (!card) return
    const gap = parseFloat(getComputedStyle(t).columnGap) || 0
    t.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: 'smooth' })
  }
  return [track, step]
}

function Arrows({ step, label }) {
  return (
    <div className="cx-mc__nav">
      <button type="button" className="cx-mc__arrow" onClick={() => step(-1)} aria-label={`Previous ${label}`}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
      </button>
      <button type="button" className="cx-mc__arrow" onClick={() => step(1)} aria-label={`Next ${label}`}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  )
}

function MembershipCarousel({ items, label, onOpen }) {
  const [track, step] = useStep()
  return (
    <div className="cx-mc" role="region" aria-roledescription="carousel" aria-label={label} data-rise>
      <ul className="cx-mc__track" ref={track} tabIndex={0}>
        {items.map((m) =>
          m.Details ? (
            <li className="cx-mc__card mb-mc__card" key={m.num}>
              <h3 className="cx-mc__name">{m.name}</h3>
              <p className="mb-mc__why">Why join through IBA?</p>
              <p className="mb-mc__text">{m.why}</p>
              {/* one row: the call to action on the left, the partner's logo on the right */}
              <div className="mb-mc__foot">
                {/* the whole card is the target; the button's box is stretched
                    over it, so the card reads as one control */}
                <button type="button" className="mb-mc__open" onClick={(e) => onOpen(m, e.currentTarget)}>
                  Explore <span aria-hidden="true">→</span>
                </button>
                <m.Logo />
              </div>
            </li>
          ) : m.href ? (
            <li className="cx-mc__card mb-mc__card mb-mc__card--market" key={m.num}>
              <h3 className="cx-mc__name">{m.name}</h3>
              <p className="mb-mc__text">{m.text}</p>
              <div className="mb-mc__foot">
                <Go className="mb-mc__open" href={m.href}>
                  {m.cta} <span aria-hidden="true">→</span>
                </Go>
              </div>
            </li>
          ) : (
            <li className="cx-mc__card mb-mc__card--soon" key={m.num}>
              <h3 className="cx-mc__name">{m.name ?? `Membership ${m.num}`}</h3>
              {m.audience && <p className="mb-mc__text">{m.audience}</p>}
              <div className="mb-mc__foot">
                <p className="cx-mc__text">Details coming soon.</p>
                <span className="cx-mc__medal" aria-hidden="true" />
              </div>
            </li>
          )
        )}
      </ul>
      <Arrows step={step} label="memberships" />
    </div>
  )
}

/* ---------------------------------------------------------------- */
/* Web360 Club — Bronze, Silver and Gold                             */
/* ---------------------------------------------------------------- */

/** IBA's own tiers: who each is for, and why to join. */
const WEB360 = [
  {
    id: 'bronze',
    name: 'Bronze',
    forWhom: 'Founders finding product-market fit',
    why: 'Build with the right people around you while you shape the product. Bronze connects you to founders, mentors and early customers across the IBA network, so you can test, learn and find your fit faster.',
    cta: 'Apply for Bronze',
  },
  {
    id: 'silver',
    name: 'Silver',
    forWhom: 'Companies established in one country, ready to expand globally',
    why: 'Take what works at home into new markets. Silver opens global networking across the IBA corridor, introductions in each market you enter, and real-time insight from members already operating there.',
    cta: 'Apply for Silver',
  },
  {
    id: 'gold',
    name: 'Gold',
    forWhom: 'Top global leaders',
    tag: 'Invite only',
    why: 'Premium, exclusive access for the leaders shaping the industry. A closed circle of global peers, priority access across the IBA ecosystem, and a seat where policy and capital meet.',
    cta: 'Request an Invitation',
  },
]

function TierCarousel() {
  const [track, step] = useStep()
  return (
    <div className="cx-mc mb-tc" role="region" aria-roledescription="carousel" aria-label="Web360 Club tiers" data-rise>
      <ul className="cx-mc__track mb-tc__track" ref={track} tabIndex={0}>
        {WEB360.map((t) => (
          <li className={`mb-tc__card mb-tc__card--${t.id}`} key={t.id}>
            <div className="mb-tc__top">
              <span className="mb-tc__medal" aria-hidden="true" />
              {t.tag && <span className="mb-tc__tag">{t.tag}</span>}
            </div>
            <h3 className="mb-tc__name">{t.name}</h3>
            <p className="mb-tc__label">Who it is for</p>
            <p className="mb-tc__for">{t.forWhom}</p>
            <p className="mb-tc__label">Why join</p>
            <p className="mb-tc__why">{t.why}</p>
            <div className="mb-tc__go">
              <Btn enquiry={`Web360 Club: ${t.name}`} variant={t.id === 'gold' ? 'ghost' : 'primary'}>
                {t.cta}
              </Btn>
            </div>
          </li>
        ))}
      </ul>
      <Arrows step={step} label="tiers" />
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
export function MembershipDialog({ membership, onClose }) {
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
            {name}
            {kind && ` · ${kind}`}
          </p>
          <h2 className="mb-dlg__title" id="mb-dlg-title">
            {title}
          </h2>
          {lede && <p className="mb-dlg__lede">{lede}</p>}
        </header>
        <Details />
      </div>
    </dialog>
  )
}

/** Which membership the pop-up shows, and focus back to its opener on close. */
export function useMembershipDialog() {
  const [open, setOpen] = useState(null)
  const opener = useRef(null)
  const show = (m, from) => {
    opener.current = from
    setOpen(m)
  }
  const hide = () => {
    setOpen(null)
    opener.current?.focus()
  }
  return { open, show, hide }
}

export default function Memberships() {
  const { open, show, hide } = useMembershipDialog()

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
            {/* the way in for existing members, moved here from the navbar */}
            <Btn href="/library#login" variant="ghost">
              {MEMBER_LOGIN}
            </Btn>
          </>
        }
      />

      <Section
        id="web360"
        eyebrow="Web360 Club"
        title="Find the tier that fits where you are"
        lede="IBA's own memberships, from founders finding their fit to the leaders shaping the industry worldwide."
      >
        <TierCarousel />
      </Section>

      <Section
        id="memberships"
        eyebrow="Our Ecosystem Members"
        title="Services from across the ecosystem"
        lede="Partner companies in the IBA ecosystem offer their services to our members, from investor access to events and tokenization. Join through IBA for global networking, global expansion and real-time experience of each partner's community."
        tone="card"
      >
        <MembershipCarousel items={MEMBERSHIPS} label="Ecosystem members" onOpen={show} />
      </Section>

      <Section
        id="cohort"
        eyebrow="Cohort Memberships"
        title="Memberships for institutes and their students"
        lede="Cohort memberships through the IBA Red Club Experience Zone, for institutes and the students they enrol. Details are coming soon."
      >
        <MembershipCarousel items={COHORT} label="Cohort memberships" />
      </Section>

      <MembershipDialog membership={open} onClose={hide} />
    </>
  )
}
