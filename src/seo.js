/**
 * 9 — Titles and descriptions, one per route.
 *
 * This is a single-page app: the server sends one index.html to every URL, and
 * without this every page on the site would share that file's one title. So the
 * table is keyed by the exact path in PAGES (App.jsx) and applied on every route
 * change — see lib/seo.js.
 *
 * ⚠ THE TABLE MUST COVER EVERY ROUTE IN PAGES. Two pages sharing a title is the
 * duplicate-title problem this section exists to prevent, and the silent way to
 * cause it is to add a route and not add a row here. App.jsx warns in the
 * console during development when the two lists disagree — it is the only place
 * that can, since it is the file that owns PAGES.
 *
 * `brief: true` marks the ten the client supplied, word for word. The rest are
 * written to the same pattern — `Name | what it is`, then a sentence that says
 * what is actually on the page — because the site has twenty routes and the
 * brief covers ten of them.
 *
 * ---------------------------------------------------------------------------
 * A NOTE ON WHAT THIS CANNOT DO.
 *
 * These tags are written by JavaScript after the page loads. Google renders JS
 * and will see them; most other crawlers, and every social-media link preview
 * (Slack, WhatsApp, LinkedIn, X, iMessage), read the raw HTML and will see
 * index.html's tags for every URL on the site.
 *
 * That is a deployment problem, not a code one, and it has two standard fixes:
 * prerender the routes at build time (vite-plugin-ssr, or a static export), or
 * put the tags in at the edge (a Netlify/Cloudflare/Vercel middleware that
 * injects them per path). Until one of those is in place, treat the link
 * previews as unfinished.
 */

import { FACTS } from './data/facts'

/* No brand suffix is appended anywhere. Every title below already names IBA or
   the Alliance, which is the brief's own pattern — appending one would give
   half the pages the word twice. */
export const SITE_NAME = 'India Blockchain Alliance'

/**
 * The default, and what an unknown path gets.
 *
 * An unknown path renders the home page (see PAGES) rather than a 404, so it
 * gets the home page's title — and `noindex`, because a URL that does not exist
 * should not collect search results under a title that says it does. When there
 * is a real 404 page, this becomes its row.
 */
export const FALLBACK = {
  title: 'India Blockchain Alliance | Blockchain Advisory, Consulting & Education',
  description:
    `IBA is a premier global blockchain community and advocacy group advancing blockchain adoption across Asia and MENA. ${FACTS.members.text} members, ${FACTS.countries.text} countries, ${FACTS.tokenized.text} tokenized assets.`,
  noindex: true,
}

export const SEO = {
  /* ---- from the brief, verbatim ---- */
  '/': {
    brief: true,
    title: 'India Blockchain Alliance | Blockchain Advisory, Consulting & Education',
    description:
      `IBA is a premier global blockchain community and advocacy group advancing blockchain adoption across Asia and MENA. ${FACTS.members.text} members, ${FACTS.countries.text} countries, ${FACTS.tokenized.text} tokenized assets.`,
  },
  '/about': {
    brief: true,
    title: 'About IBA | Vision, Mission & Global Presence',
    description:
      `Who we are, what we're building, and where we operate — across ${FACTS.countries.text} countries, ${FACTS.affiliations.text} affiliations and 16+ industry verticals.`,
  },
  '/library': {
    brief: true,
    title: 'IBA Library | Free Blockchain Articles, Videos & Research',
    description:
      'Searchable, categorised library of articles, videos, reports and recorded sessions. Free with a member account.',
  },
  '/connect': {
    brief: true,
    title: 'Contact IBA | Let the Journey Begin',
    description:
      'Email, call or WhatsApp the India Blockchain Alliance, or submit an enquiry about consulting, advisory, Red Club, Verifyble or a Web3 Corridor.',
  },

  /* ---- the pages added from the content source ---- */
  '/expertise': {
    title: 'Expertise | Web3 Solution Consulting Stack | IBA',
    description:
      'Tokenization, standards, compliance and stablecoin structuring, plus power consulting for IDO, STO and IEO launches — from “should we?” to “it’s live, and it’s governed”.',
  },
  '/ecosystem': {
    title: 'IBA Ecosystem | Initiatives, Partners, Councils & People',
    description:
      `Tech4Good, Green Chain Protocol, Verifyble, Red Club and the Web3 Corridor, with ${FACTS.partners.text} ecosystem partners and the councils setting blockchain standards.`,
  },
  '/initiatives': {
    title: 'IBA Initiatives | The Programmes We Build and Run',
    description:
      'Tech4Good, Green Chain Protocol, Verifyble, IBA Red Club, the Web3 Corridor and the India AI Alliance.',
  },
  '/corridor': {
    title: 'Web3 Corridor | One Global Corridor | IBA',
    description:
      'One global corridor bringing countries together for Web3 resources, partnerships, growth and expansion — its partner countries, the forum at WTC 2026 in Barcelona, and membership.',
  },
  '/red-club': {
    title: 'IBA Experience Zone | Where Builders Get Ready',
    description:
      'Certified programmes, Blockchain and AI labs, the Experience Zone Wallet, the Investor Ready Programme, an AI tool for businesses and a 30-60-90 day plan.',
  },
}

/**
 * ⚠ SUPPLIED BUT HOMELESS.
 *
 * The brief gives Initiatives a title and a description, and there is no
 * initiatives page — the four are a section of /about, and nav.js points every
 * initiative link at /about#initiatives. A title cannot be set for a fragment,
 * so this pair is parked here rather than dropped: the moment Initiatives
 * becomes a route, this becomes its row.
 */
export const AWAITING_ROUTE = {
  initiatives: {
    brief: true,
    title: 'IBA Initiatives | Tech4Good, Green Chain Protocol, Verifyble & Red Club',
    description:
      'Four programmes built and run by the India Blockchain Alliance — impact, green finance, on-chain credentialing and talent.',
  },
}

export const seoFor = (path) => SEO[path] || FALLBACK
