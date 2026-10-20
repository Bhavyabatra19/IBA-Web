/**
 * 8 — Connect With Us, as content.
 *
 * One enquiry, reachable from about forty places on the site, so everything the
 * enquiry knows about itself lives here: the topics, the desks they route to,
 * the reach-out channels, the WhatsApp wording, and the copy for each state the
 * form can end in.
 *
 * ⚠ NOTHING SUBMITS. There is no endpoint — see submitEnquiry in lib/enquiry.js.
 * SUCCESS and FAILED below are written and built and currently unreachable; the
 * form ends on UNWIRED instead, which says what actually happened. When an
 * endpoint exists, that third branch is the only thing to delete.
 */

import { CONTACT } from './nav'

/* ================================================================== */
/* 8.1 — the modal                                                    */
/* ================================================================== */

export const ENQUIRY = {
  heading: "Let's Talk",
  sub: "Tell us what you're working on. We reply within two working days.",
  /* Reflected into the URL so a campaign or an email can link straight to the
     open form. Read on load, written on open, removed on close. */
  param: 'enquiry',
}

/* ================================================================== */
/* 8.4 — the form                                                     */
/* ================================================================== */

/**
 * "I'm interested in", and the key everything else in section 8 is filed under.
 *
 * The routing map, the pre-fill on every CTA and the {topic} in the auto-reply
 * are all this list. It is written once for that reason: a topic that exists on
 * the dropdown and not in ROUTING is an enquiry that silently falls to the
 * default inbox, and the two lists drifting apart is exactly how that happens.
 */
export const TOPICS = [
  'Consulting',
  'Web3 Advisory',
  'Legal Advisory',
  'RWA Tokenization',
  'White Label Solutions',
  'Red Club (learner)',
  'Red Club / Verifyble (institution)',
  'Web3 Corridor',
  'Ecosystem partnership',
  /* ⚠ NAMING, carried over from nav.js: "Tech4Good" matches none of the four
     initiatives the site publishes (Emerging Technology Council, Blockchain
     Governance Council, The Green Chain, Tech Zero) and is most likely Tech
     Zero. Kept as the brief words it until someone confirms. */
  'Tech4Good / Green Chain Protocol',
  'Media / Speaking',
  'Something else',
]

export const CONTACT_METHODS = ['Email', 'Phone', 'WhatsApp']

/**
 * The field the spam bots fill in and people never see.
 *
 * A honeypot is half of the protection and the cheap half. The other half is a
 * server-side challenge — Turnstile or invisible reCAPTCHA — which cannot be
 * done from here because there is no server to verify the token. Whoever wires
 * the endpoint must add it; a honeypot alone stops the crude bots only.
 *
 * Deliberately named like a real field. `name="_hp"` is a pattern the scrapers
 * know to skip. Not named after anything the form really asks for: next to the
 * real website field, a browser's autofill could match a "company_website"
 * honeypot and flag a person as a bot.
 */
export const HONEYPOT = 'referral_code'

/* ---- the three ways the form can end ---- */

export const SUCCESS = {
  title: "Thanks — we've got it.",
  body: 'Someone from the IBA team will be in touch within two working days.',
  urgent: "If it's urgent, WhatsApp us on",
}

export const FAILED = {
  title: "That didn't send.",
  body: 'Something went wrong on our side. Please try again, or email us directly at',
}

/**
 * The honest third state.
 *
 * Not FAILED: "something went wrong on our side" describes a server that tried.
 * There is no server. Telling a reader to try again would have them retype an
 * enquiry into a form that cannot ever accept it.
 */
export const UNWIRED = {
  title: 'This form is not connected yet.',
  body: 'Nothing was sent, and we would rather say so than show you a confirmation for an enquiry nobody received. Your message is still in the form — copy it into an email or a WhatsApp message and it will reach the same people.',
}

/**
 * The auto-reply. Not rendered by this app — it is copy for whoever wires the
 * mail provider, exported rather than left in a document so the wording is
 * versioned beside the form that triggers it.
 *
 * `{topic}` is the substitution the sender must fill, and it is the reader's own
 * answer to "I'm interested in".
 */
export const EMAIL_AUTOREPLY = {
  subject: "We've received your enquiry — India Blockchain Alliance",
  body: [
    'Thanks for getting in touch.',
    'Your enquiry about {topic} has reached the IBA team and we’ll come back to you within two working days.',
    'If it’s time-sensitive, reply to this email or message us on WhatsApp at +91 8420045940.',
  ],
  signoff: '— Team IBA',
}

/* ================================================================== */
/* 8.5 — routing                                                      */
/* ================================================================== */

/**
 * Which desk an enquiry belongs to, as configuration rather than as branches.
 *
 * ⚠ NO ADDRESSES SUPPLIED. The brief asks IBA for a destination per desk and
 * says, until then, to point everything at the default inbox — which is what
 * `email: null` does here. The map is still worth having now: when the six
 * addresses arrive, this is a six-line edit and no logic changes.
 *
 * The desks are the routing; whether they are separate inboxes or labels on one
 * is the mail provider's business, not the website's.
 */
export const ROUTING = {
  default: { key: 'default', desk: 'Default inbox', email: null },
  desks: [
    { key: 'advisory', desk: 'Advisory / delivery team', email: null },
    { key: 'education-student', desk: 'Education team — student intake', email: null },
    {
      key: 'education-institution',
      desk: 'Education team — institutional partnerships',
      email: null,
    },
    { key: 'corridor', desk: 'Corridor programme lead', email: null },
    { key: 'partnerships', desk: 'Partnerships', email: null },
    { key: 'comms', desk: 'Comms', email: null },
  ],
  /* Every topic in TOPICS appears here. "Something else" is absent on purpose —
     it is the default, and listing it would suggest a desk it does not have. */
  byTopic: {
    Consulting: 'advisory',
    'Web3 Advisory': 'advisory',
    'Legal Advisory': 'advisory',
    'RWA Tokenization': 'advisory',
    'White Label Solutions': 'advisory',
    'Red Club (learner)': 'education-student',
    'Red Club / Verifyble (institution)': 'education-institution',
    'Web3 Corridor': 'corridor',
    'Ecosystem partnership': 'partnerships',
    'Tech4Good / Green Chain Protocol': 'partnerships',
    'Media / Speaking': 'comms',
  },
}

/** The desk a topic belongs to, falling back to the default inbox. */
export const routeFor = (topic) => {
  const key = ROUTING.byTopic[topic]
  return ROUTING.desks.find((d) => d.key === key) || ROUTING.default
}

/** Where it should actually be sent today, which is one address for all of it. */
export const routeAddress = (topic) =>
  routeFor(topic).email || ROUTING.default.email || CONTACT.email.label

/* ================================================================== */
/* 8.2 — reaching IBA directly                                        */
/* ================================================================== */

export const AVAILABILITY =
  "We're based in India (IST). Email and WhatsApp are the fastest way to reach us."

/**
 * The WhatsApp opener, with the topic already in it.
 *
 * The point is not politeness. The person answering sees which page the enquiry
 * came from before they have read a word of it, which is the difference between
 * a cold "hi" and a message that can be handed to the right desk on sight.
 *
 * The bracket is the brief's, and it stays a bracket when there is no page
 * context: an empty "…talk about" reads as a message that failed to finish.
 */
export const waMessage = (phrase) =>
  `Hi IBA — I came from your website and I'd like to talk about ${phrase || '[ ]'}`

export const waLink = (phrase) =>
  `https://wa.me/${CONTACT.whatsapp.number}?text=${encodeURIComponent(waMessage(phrase))}`

/* ================================================================== */
/* per-page context                                                   */
/* ================================================================== */

/**
 * What a CTA means on the page it is on.
 *
 * `topic` pre-selects the dropdown; `phrase` is what the WhatsApp message says
 * the reader wants to talk about. Two fields because they are two registers —
 * "Red Club / Verifyble (institution)" is a routing key and would read as
 * machinery in a sentence a human is about to send.
 *
 * A CTA can always name its own topic and override this (Verifyble's Request
 * Prospectus does, and has to: that page carries both the institution ask and
 * the student one). This is only the default for a page that does not.
 */
export const PAGE_CONTEXT = {
  '/services/consulting-stack': { topic: 'Consulting', phrase: 'the Consulting Stack' },
  '/services/web3-advisory': { topic: 'Web3 Advisory', phrase: 'Web3 advisory' },
  '/services/legal-advisory': { topic: 'Legal Advisory', phrase: 'legal advisory' },
  '/services/rwa-tokenization': { topic: 'RWA Tokenization', phrase: 'RWA tokenization' },
  '/services/white-label': { topic: 'White Label Solutions', phrase: 'white label solutions' },
  '/services/sector-expertise': { topic: 'Consulting', phrase: 'sector expertise' },
  '/services': { topic: 'Consulting', phrase: 'working with IBA' },
  '/education/red-club': { topic: 'Red Club (learner)', phrase: 'the IBA Red Club' },
  '/education/verifyble': {
    topic: 'Red Club / Verifyble (institution)',
    phrase: 'Verifyble',
  },
  '/education': { topic: 'Red Club (learner)', phrase: 'IBA education programmes' },
  /* the current pages */
  '/expertise': { topic: 'Consulting', phrase: 'working with IBA' },
  '/ecosystem': { topic: 'Ecosystem partnership', phrase: 'joining the IBA ecosystem' },
  '/initiatives': { topic: 'Ecosystem partnership', phrase: 'IBA initiatives' },
  '/red-club': { topic: 'Red Club (learner)', phrase: 'the IBA Red Club' },
  '/corridor': { topic: 'Web3 Corridor', phrase: 'Web3 Corridor' },
  '/studio': { topic: 'Ecosystem partnership', phrase: 'joining the IBA ecosystem' },
  '/library': { topic: 'Something else', phrase: 'the IBA Library' },
}

export const contextFor = (path) => PAGE_CONTEXT[path] || { topic: '', phrase: '' }

/* ================================================================== */
/* 8.3 — the Connect page                                             */
/* ================================================================== */

export const CONNECT_SUB =
  "Whether you're a government, an enterprise, a university, a founder or a learner — start with a conversation."

/**
 * The four quick paths, above the form.
 *
 * Each opens the same enquiry with its topic already chosen, rather than going
 * to four different places. A reader who knows which of the four they are has
 * answered the form's hardest question by clicking, and should not then be made
 * to answer it again from a list of twelve.
 */
export const QUICK_PATHS = [
  {
    who: 'For Learners',
    body: 'Join the IBA Red Club: programmes, projects, placements.',
    cta: 'Join Red Club',
    topic: 'Red Club (learner)',
  },
  {
    who: 'For Institutions',
    body: 'Bring Verifyble and campus labs to your university.',
    cta: 'Request Prospectus',
    topic: 'Red Club / Verifyble (institution)',
  },
  {
    who: 'For Enterprises & Governments',
    body: 'Scope an advisory or delivery engagement.',
    cta: 'Book a Call',
    topic: 'Consulting',
  },
  {
    who: 'For Partners',
    body: 'Join the ecosystem or a Web3 Corridor.',
    cta: 'Partner With Us',
    topic: 'Ecosystem partnership',
  },
]
