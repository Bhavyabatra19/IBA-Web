/**
 * The Library section, as content.
 *
 * Five screens and two emails. The emails live here rather than in a component
 * because they are not rendered by this app at all — they are copy for whoever
 * wires the transactional mail, and keeping them beside the forms that trigger
 * them is what stops the wording drifting from the flow.
 *
 * ⚠ THERE IS NO AUTH BACKEND. See lib/previewSession.js. Nothing in the Library
 * is actually gated; the dashboard is a preview of the signed-in state, not a
 * protected area. Do not put anything confidential behind it.
 */

/* ================================================================== */
/* 7.1 — the public landing                                           */
/* ================================================================== */

export const LIB_BODY =
  "Research, policy briefs, sector playbooks, tokenomics primers and recorded sessions — contributed by IBA's 100+ global advisors and 800+ members. Create a free account to access everything."

export const LIB_VALUE = [
  'Policy and regulatory briefs across 20+ jurisdictions',
  'Sector playbooks for BFSI, supply chain, healthcare, e-governance and more',
  'Tokenomics and RWA structuring primers',
  'Recorded webinars and expert sessions',
  'Red Club curriculum samples and FDP materials',
  'Research papers and consulting frameworks',
]

/**
 * The same six, named rather than described — the shelves as they appear on the
 * rail in the landing hero, where a full sentence per node would be unreadable.
 *
 * Paired with LIB_VALUE by order, so the two lists have to change together. Two
 * lists of the same six is a cost; six sentences set as a row of labels is worse.
 *
 * Not `LIB_SHELVES` — that is the dashboard's four shelves, further down, which
 * are a different thing wearing the same word.
 */
export const LIB_SHELF_NAMES = [
  'Policy Briefs',
  'Sector Playbooks',
  'Tokenomics Primers',
  'Recorded Sessions',
  'Curriculum Samples',
  'Research Papers',
]

/** Stated on the page, not buried in the terms — it is the reason to sign up. */
export const LIB_TRUST =
  "Free forever for registered members. We don't sell your data. Unsubscribe from emails any time."

/* ================================================================== */
/* 7.2 — sign-up                                                      */
/* ================================================================== */

export const ROLES = [
  'Student',
  'Faculty / Institution',
  'Corporate',
  'Government / Regulator',
  'Startup / Founder',
  'Investor',
  'Other',
]

export const INTERESTS = [
  'Policy & Regulation',
  'Tokenization / RWA',
  'Education & Skilling',
  'Enterprise Blockchain',
  'AI',
  'ESG & Green Chain',
]

/**
 * Countries, as ISO 3166-1 alpha-2 codes resolved to names at load.
 *
 * The codes are the data and the names are derived, so the list is correct in
 * whatever locale the reader has and cannot go stale when a country is renamed.
 * A hand-typed list of 249 English names is a list that is wrong within a year —
 * and a shortened one silently excludes whoever is not on it.
 */
const COUNTRY_CODES =
  'AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG UM US UY UZ VA VC VE VG VI VN VU WF WS YE YT ZA ZM ZW'.split(
    ' '
  )

export const COUNTRIES = (() => {
  /* Intl.DisplayNames is in every browser this site targets, but a code is a
     usable fallback and an exception here would take the whole form down. */
  let name = (c) => c
  try {
    const dn = new Intl.DisplayNames(undefined, { type: 'region' })
    name = (c) => dn.of(c) || c
  } catch {
    /* fall through to the code */
  }
  return COUNTRY_CODES.map((code) => ({ code, label: name(code) })).sort((a, b) =>
    a.label.localeCompare(b.label)
  )
})()

/* ================================================================== */
/* 7.5 — the dashboard                                                */
/* ================================================================== */

export const LIB_CATEGORIES = [
  'Policy & Regulation',
  'Tokenization & RWA',
  'Sector Playbooks',
  'Education & Skilling',
  'AI & Emerging Tech',
  'ESG & Green Chain',
  'Recordings',
]

/**
 * The dashboard's shelves.
 *
 * `empty` is what a shelf says when it has nothing on it. For a new account
 * "Continue where you left off" and "Saved items" are empty because that is
 * the truth, not because the catalogue is missing.
 *
 * `awaiting` marks the two the brief supplies no items for. They render as
 * waiting for a catalogue rather than filled with invented paper titles —
 * fabricated research citations under IBA's name are a worse failure than an
 * empty shelf.
 */
export const LIB_SHELVES = [
  {
    key: 'continue',
    name: 'Continue where you left off',
    empty: 'Nothing opened yet. Anything you start reading will wait for you here.',
  },
  {
    key: 'new',
    name: 'New this month',
    awaiting: true,
  },
  {
    key: 'saved',
    name: 'Saved items',
    empty: 'Nothing saved yet. Tap the bookmark on any resource to keep it here.',
  },
  {
    key: 'events',
    name: 'Upcoming member events',
    awaiting: true,
  },
]

export const LIB_UPSELL = {
  title: 'Want more than resources?',
  body: 'Members get advisory access, event invitations and ecosystem introductions.',
  cta: 'Explore Membership',
  href: '/#connect',
}

/* ================================================================== */
/* 7.3 / 7.4 — transactional email copy                               */
/* ================================================================== */

/**
 * Not rendered by this app.
 *
 * These are for whoever wires the mail provider. They are exported rather than
 * left in a document so the wording is version-controlled beside the forms that
 * send them — a welcome email that still describes a flow the site no longer has
 * is the usual result of keeping them apart.
 *
 * `{firstName}` and `{link}` are the substitutions the sender must fill.
 */
export const EMAIL_WELCOME = {
  subject: 'Your IBA Library access is live',
  body: [
    'Welcome to the India Blockchain Alliance.',
    "Your account is active and the full Library is open to you — research, policy briefs, sector playbooks and recorded sessions, free for as long as you're a member.",
  ],
  startHere: [
    'The IBA Core — how we think about blockchain adoption across Asia and MENA',
    'Sector Playbooks — pick your vertical',
    'Tokenization Primer — from structuring to listing',
  ],
  postscript:
    'Student? The IBA Red Club runs certified programs, live projects and placement assistance. At an institution? Verifyble brings Blockchain and AI labs onto your campus.',
  cta: { label: 'Open the Library', href: '/library/dashboard' },
  signoff: '— Team IBA · Insights | Impact | Innovation',
}

export const EMAIL_RESET = {
  subject: 'Reset your IBA Library password',
  body: [
    'We received a request to reset the password for your IBA Library account. Click below to set a new one.',
    'This link expires in 60 minutes.',
    "If you didn't request this, you can safely ignore this email.",
  ],
  cta: { label: 'Set a new password', href: '{link}' },
}
