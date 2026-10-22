/**
 * Web3 Corridor Memberships — the landing page (/memberships) and one detail
 * page per membership (/memberships/<slug>), as content.
 *
 * Two groups: IBA's own membership tracks, and the partner memberships IBA
 * offers. Every card's Explore opens that membership's detail page here, on
 * the IBA site, never the partner's. Every enquiry comes to IBA first, so IBA
 * can advise, screen and direct the applicant; nothing on these pages sends a
 * visitor to a partner or takes a payment.
 *
 * ⚠ NO PRICES. Not a membership fee, not a separate service price. There is no
 * price field on purpose: when a grid is supplied, its prices are removed
 * before it goes in here.
 *
 * ⚠ AWAITING SOURCE MATERIAL. The exact wording, tiers and benefits come from
 * IBA's latest membership decks and grids, which have not been supplied yet.
 * Until they are, a field left `null` renders as a clearly labelled
 * placeholder and `awaiting` lists what is missing. Nothing here was written
 * to stand in for that material, and older deck content is deliberately not
 * reused. Fill these in and empty `awaiting` before the pages are published;
 * App.jsx lists every membership still waiting in the console during
 * development.
 *
 * Partner grids are reproduced AS SUPPLIED: the partner's wording, benefits
 * and levels, unchanged, minus prices. Only colours, layout and boxes follow
 * IBA's theme. Use the latest supplied grid; do not assume a tier count.
 *
 * Ideas discussed internally but not confirmed are deliberately not recorded
 * in this file: this repository is public.
 */

export const MEMBERSHIPS_PATH = '/memberships'

/* the enquiry topic every membership enquiry is filed under (see enquiry.js) */
export const MEMBERSHIP_TOPIC = 'Web3 Corridor membership'

/**
 * One membership:
 *   slug       its detail page, /memberships/<slug>
 *   name       as it appears on its card and page
 *   fullName   the expanded name, where the short name needs one
 *   logo       the partner's logo, on partner memberships
 *   summary    the card's short description            (null = awaiting)
 *   intro      the detail page's opening paragraph      (null = awaiting)
 *   grid       the membership levels, each { name, intro?, benefits[] },
 *              or for a single offering one entry        (null = awaiting)
 *   viaIba     IBA branding and ecosystem exposure benefits of joining
 *              through IBA, from the supplied material  (null = awaiting)
 *   connects   slugs of the partner memberships IBA can connect this
 *              membership's members to, where appropriate
 *   awaiting   what is still needed before publication
 */

/** IBA's own membership tracks. */
export const TRACKS = [
  {
    slug: 'web360',
    name: 'IBA Web360',
    tag: 'IBA Membership',
    /* from IBA's brief; the full benefits come from the latest deck */
    summary:
      'IBA’s complete consulting and services offering: end-to-end, turnkey support from conceptualisation to completion, including follow-through with operations, consulting, advisory, go-to-market and tokenization advisory.',
    intro:
      'The larger, complete consulting and services offering. IBA supports you end to end, from conceptualisation to completion, and follows through with operations, consulting, advisory, go-to-market and tokenization advisory as one offering.',
    grid: null,
    viaIba: null,
    connects: ['the-circle', 'taf'],
    awaiting: ['Benefits and grouping from IBA’s latest deck'],
  },
  {
    slug: 'founders-startup-pack',
    name: 'Founders Startup Pack',
    tag: 'IBA Membership',
    /* ⚠ For founders and startups. It is NOT a student pack (that idea was
       withdrawn), and it is not a trimmed copy of Web360: a startup's needs
       differ, so its benefits come from its own material. */
    summary:
      'The founder- and startup-focused membership, shaped around what an early-stage team needs rather than the full Web360 offering.',
    intro:
      'The smaller membership for founders and startups. It is built around what an early-stage team needs, which is not the same as the full Web360 offering.',
    grid: null,
    viaIba: null,
    connects: ['the-circle', 'taf'],
    awaiting: ['Benefits and grouping from IBA’s latest deck (its own, not copied from Web360)'],
  },
  {
    slug: 'red-club',
    name: 'Red Club',
    tag: 'IBA Membership',
    summary: null,
    intro: null,
    grid: null,
    viaIba: null,
    awaiting: ['Short description', 'Benefits and grouping from IBA’s latest deck'],
  },
  {
    slug: 'institutional',
    name: 'Institutional',
    tag: 'IBA Membership',
    summary: null,
    intro: null,
    grid: null,
    viaIba: null,
    awaiting: ['Short description', 'Benefits and grouping from IBA’s latest deck'],
  },
]

/**
 * The partner memberships, copied as supplied.
 *
 * ⚠ NAMES TO CONFIRM against the latest decks. TAF is "Tokenized Asset
 * Foundation" in IBA's brief, but the ecosystem list (data/partners.js) has
 * "Token Asset Foundation (STO)", and The Block is "TheBlock." there.
 */
export const PARTNERS = [
  {
    slug: 'the-circle',
    name: 'IBA The Circle',
    logo: null,
    summary: null,
    intro: null,
    /* ⚠ The latest Circle material has four memberships per the brief; an
       older deck had six. Use whatever the latest supplied grid shows. */
    grid: null,
    viaIba: null,
    awaiting: ['Logo', 'Short description', 'Latest membership grid and wording (prices removed)'],
  },
  {
    slug: 'the-block',
    name: 'IBA The Block',
    logo: '/logos/eco/theblock-ae.png',
    summary: null,
    intro: null,
    grid: null,
    viaIba: null,
    awaiting: ['Short description', 'Latest membership grid and wording (prices removed)', 'Confirm the logo is current'],
  },
  {
    slug: 'taf',
    name: 'IBA TAF',
    fullName: 'Tokenized Asset Foundation',
    logo: '/logos/partners/token-asset-foundation.jpg',
    summary: null,
    intro: null,
    grid: null,
    viaIba: null,
    awaiting: [
      'Confirm the exact name and spelling',
      'Short description',
      'Latest membership grid and wording (prices removed)',
      'Confirm the logo is current',
    ],
  },
]

export const ALL_MEMBERSHIPS = [...TRACKS, ...PARTNERS]

export const membershipPath = (m) => `${MEMBERSHIPS_PATH}/${m.slug}`

export const isPartner = (m) => PARTNERS.includes(m)

/**
 * How an enquiry works, the same on every page. IBA reviews every one, so the
 * copy never says or implies that applying guarantees a place.
 */
export const STEPS = [
  { num: '01', title: 'Explore', text: 'Read about each membership here, on the IBA site.' },
  { num: '02', title: 'Enquire Through IBA', text: 'Send your enquiry or application to IBA, whichever membership it is for.' },
  { num: '03', title: 'IBA Advises and Screens', text: 'We review your enquiry and advise on the membership that fits your stage and goals.' },
  { num: '04', title: 'IBA Directs You', text: 'If it is a fit, we direct you to the right membership or partner and introduce you.' },
]

export const SCREENING_NOTE =
  'Every enquiry and application is reviewed by IBA. Enquiring or applying does not guarantee membership.'
