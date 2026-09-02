/**
 * The Studio section, as content.
 *
 * One page rather than four, because the brief sets 6.1–6.4 as H2s under a
 * single H1 — Clients, Government Projects, Corridors and Councils are four
 * views of one ecosystem, not four services you would pick between. The nav's
 * five Studio items are anchors into it.
 *
 * ⚠ EVERY NAME IN CLIENTS AND GOVERNMENT IS A REAL ORGANISATION.
 * They render as typeset text, never as logo files — the same rule the home
 * page's Trusted By band carries. Before this goes live: confirm each
 * organisation has agreed to be listed and to the wording of that listing, then
 * swap each cell for a licensed asset. Do NOT substitute scraped logo files;
 * that is a trademark problem, not a design one.
 */

/* ================================================================== */
/* 6.0 — the landing                                                  */
/* ================================================================== */

export const STUDIO_INTRO =
  'IBA does not work alone. The Studio is where our alliance becomes visible: 75+ ecosystem partners, 70+ global affiliations, government mandates across ministries, and cross-border Web3 corridors connecting economies.'

/** The four sections, as the jump list under the intro. */
export const STUDIO_SECTIONS = [
  { label: 'Clients', href: '/studio#clients' },
  { label: 'Government Projects', href: '/studio#government-projects' },
  { label: 'Web3 Corridors', href: '/studio#web3-corridors' },
  { label: 'Councils & Affiliations', href: '/studio#councils' },
]

/* ================================================================== */
/* 6.1 — clients                                                      */
/* ================================================================== */

/**
 * The wall, in two groups the filter switches between.
 *
 * `key` is what the chip toggles on, so the grouping is data rather than two
 * hand-written walls with a conditional around them.
 *
 * `domain` is the company's own domain, and it is what scripts/fetch-logos.mjs
 * fetches a mark for into public/logos/. An entry WITHOUT one renders as its
 * typeset name — which is the correct outcome, not a gap to be filled in with a
 * guess. A wrong domain puts another company's logo on IBA's client wall, so
 * the rule here is: if the domain is not known, leave it out. The names below
 * with no domain are the ones nobody has confirmed yet.
 */
export const CLIENT_GROUPS = [
  {
    key: 'enterprise',
    label: 'Enterprise',
    /* VERIFY: several of these are abbreviations as supplied — MOI, IETSA,
       afoma. Expand or correct them here before launch. */
    items: [
      { name: 'PwC', domain: 'pwc.com' },
      { name: 'Tanishq', domain: 'tanishq.co.in' },
      { name: 'Larsen & Toubro', domain: 'larsentoubro.com' },
      { name: 'KPMG', domain: 'kpmg.com' },
      { name: 'GSK', domain: 'gsk.com' },
      { name: 'iRA Blocks' },
      { name: 'CII (Confederation of Indian Industry)', domain: 'cii.in' },
      { name: 'Airtel', domain: 'airtel.in' },
      { name: 'Zee TV', domain: 'zee.com' },
      { name: 'RBL Bank', domain: 'rblbank.com' },
      { name: 'Grus & Grade' },
      { name: 'WH Smith', domain: 'whsmith.co.uk' },
      { name: 'Apollo Hospitals', domain: 'apollohospitals.com' },
      { name: 'Blockskillo' },
      { name: 'Nestlé', domain: 'nestle.com' },
      { name: 'TimesPro', domain: 'timespro.com' },
      { name: 'Comviva', domain: 'comviva.com' },
      { name: 'Sarva Labs' },
      { name: 'afoma' },
      { name: 'Indo Zambia Blockchain Alliance' },
      { name: 'MOI' },
      { name: 'IETSA' },
      { name: 'Godfrey Phillips India', domain: 'godfreyphillips.com' },
      { name: 'RP-Sanjiv Goenka Group', domain: 'rpsg.in' },
      { name: 'Sanofi', domain: 'sanofi.com' },
      { name: 'Wockhardt', domain: 'wockhardt.com' },
      { name: 'MakeMyTrip', domain: 'makemytrip.com' },
      { name: 'Bank of India', domain: 'bankofindia.co.in' },
      { name: 'Cosmos Bank', domain: 'cosmosbank.com' },
    ],
  },
  {
    key: 'web3',
    label: 'Web3',
    items: [
      { name: 'ThreeFold', domain: 'threefold.io' },
      { name: 'Dragonchain', domain: 'dragonchain.com' },
      { name: 'Blockchain Chamber of Commerce' },
      { name: 'Findexable', domain: 'findexable.com' },
      { name: 'Chainalysis', domain: 'chainalysis.com' },
      { name: 'Merkle Science', domain: 'merklescience.com' },
      { name: 'Kaiko', domain: 'kaiko.com' },
      { name: 'Spherium Finance', domain: 'spherium.finance' },
      { name: 'The Block Space' },
      { name: 'Blockchain Intelligence Group' },
      { name: 'Supra Oracles', domain: 'supra.com' },
      { name: 'Cypher Blockchain' },
      { name: '3.0 Verse' },
      { name: 'NexBloc', domain: 'nexbloc.com' },
      { name: 'TaxCryp' },
      { name: 'Metafluence', domain: 'metafluence.com' },
      { name: 'YunoMeta' },
      { name: 'OCAi' },
      { name: 'Create Protocol' },
      { name: 'Launchpool' },
      { name: 'AdLunam' },
      { name: 'Nexus Nodes' },
      { name: 'Oryx Holding' },
      { name: 'Verseatile' },
      { name: 'SEA' },
      { name: 'Own' },
      { name: 'Rocken Films' },
      { name: 'DigiByte', domain: 'digibyte.io' },
      { name: 'Stellar', domain: 'stellar.org' },
      { name: 'TomoChain' },
      { name: 'SelfKey', domain: 'selfkey.org' },
      { name: 'WaykiChain', domain: 'waykichain.com' },
      { name: 'SKALE', domain: 'skale.space' },
      { name: 'Hewlett Packard Enterprise', domain: 'hpe.com' },
      { name: 'Flowgen' },
      { name: 'KLEOS' },
      { name: 'Cloud28+' },
      { name: 'CICO Lab' },
      { name: 'Vlinder' },
      { name: 'Join+Idea' },
      { name: 'Green Edge' },
      { name: 'Beliive' },
      { name: 'Solidaridad', domain: 'solidaridadnetwork.org' },
      { name: 'Tag' },
      { name: 'GenBlue' },
      { name: 'Crystal Twin' },
      { name: 'Shareitt' },
      { name: 'Bernal' },
      { name: 'Devium' },
      { name: 'Tergo' },
      { name: 'Alaska Gold Rush' },
      { name: 'Unblockers' },
      { name: 'Realto Group' },
      { name: 'Cryp' },
      { name: 'Fiex' },
      { name: 'aCryptoVerse' },
      { name: 'T-Assets' },
      { name: 'Organic Ledger' },
      { name: 'Watchad' },
    ],
  },
]

/** A domain as a filename stem. Shared with scripts/fetch-logos.mjs. */
export const logoKey = (domain) => domain.replace(/[^a-z0-9]+/gi, '-')

/* ================================================================== */
/* 6.2 — government projects                                          */
/* ================================================================== */

export const GOV_PROJECTS = [
  {
    name: 'E-Notary Project',
    body: 'Blockchain-based notarisation for verifiable, tamper-evident public records.',
  },
  {
    name: 'Land Records',
    body: 'Digital land registry with immutable ownership and transfer history.',
  },
  {
    name: 'Document Verification',
    body: 'Instant verification of government-issued documents at source.',
  },
  {
    name: 'Supply Chain',
    body: 'Traceability across public procurement and distribution networks.',
  },
]

/** Said plainly, because the four above are a sample and not the register. */
export const GOV_PROJECTS_MORE = 'And more.'

/* VERIFY: RCAT is expanded in the brief as "Rajiv Gandhi Centre of Advanced
   Technology", which the acronym does not match. Confirm the body and its
   correct initialism before launch. */
export const GOV_CLIENTS = [
  'Ministry of Culture',
  'Ministry of Health and Family Welfare',
  'Ministry of Mines',
  'Ministry of Minority Affairs',
  'Ministry of Rural Development',
  'Government of Haryana',
  'BSNL',
  'Aadhaar',
  'Invest India',
  'NCDEX',
  'PHD Chamber of Commerce',
  'TiE Chandigarh',
  'STPI (Software Technology Parks of India)',
  'RCAT (Rajiv Gandhi Centre of Advanced Technology)',
]

/* ================================================================== */
/* 6.3 — web3 corridors                                               */
/* ================================================================== */

export const CORRIDOR_INTRO =
  "Web3 Corridors are IBA's structured cross-border programs — connecting regulators, capital, talent and projects between markets that should be trading with each other and mostly aren't yet."

/**
 * Both corridors are named and neither is written yet.
 *
 * The brief supplies "description placeholder — objectives, partners, current
 * programs" for both, so that is exactly what ships: the corridor, the three
 * headings its copy will fill, and each marked outstanding. Inventing plausible
 * objectives for a real cross-border program is how a website ends up making a
 * commitment nobody at IBA agreed to.
 */
export const CORRIDORS = [
  {
    name: 'India – UAE',
    fields: ['Objectives', 'Partners', 'Current programs'],
    pending: true,
  },
  {
    name: 'India – Spain – LATAM',
    fields: ['Objectives', 'Partners', 'Current programs'],
    pending: true,
  },
]

/* ================================================================== */
/* 6.4 — councils & affiliations                                      */
/* ================================================================== */

export const COUNCILS = [
  'Emerging Technology Council',
  'Blockchain Governance Council',
  'The Green Chain',
  'Tech Zero',
]

/** The count is CRED_STATS' "Global Affiliations" — see content.js. */
export const COUNCILS_NOTE =
  'Plus 70+ global affiliations. The Blockchain Governance Council is also where the policy, compliance, taxation and standards work behind IBA’s legal advisory is developed.'
