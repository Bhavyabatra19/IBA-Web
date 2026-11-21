/**
 * 9, Titles and descriptions, one per route.
 *
 * This is a single-page app: the server sends one index.html to every URL, and
 * without this every page on the site would share that file's one title. So the
 * table is keyed by the exact path in PAGES (App.jsx) and applied on every route
 * change, see lib/seo.js.
 *
 * ⚠ THE TABLE MUST COVER EVERY ROUTE IN PAGES. Two pages sharing a title is the
 * duplicate-title problem this section exists to prevent, and the silent way to
 * cause it is to add a route and not add a row here. App.jsx warns in the
 * console during development when the two lists disagree, it is the only place
 * that can, since it is the file that owns PAGES.
 *
 * Titles and descriptions were rewritten in the SEO pass of 11-16 to fit
 * Google's result snippet; see the note above FALLBACK.
 *
 * ---------------------------------------------------------------------------
 * A NOTE ON WHAT THIS CANNOT DO.
 *
 * These tags are written by JavaScript after the page loads. Google renders JS
 * and will see them; most other crawlers, and every social-media link preview
 * (Slack, WhatsApp, LinkedIn, X, iMessage), read the raw HTML and will see
 * index.html's tags for every URL on the site.
 *
 * FIXED (11-16): scripts/seo-pages.mjs runs after `vite build` and writes a
 * copy of index.html for every route in this table with that route's tags
 * already in the HTML, plus sitemap.xml. Crawlers and link previews now read
 * the right title and description without running any JavaScript.
 */

import { FACTS } from './data/facts'

/* No brand suffix is appended anywhere. Every title below already names IBA or
   the Alliance, so appending one would give half the pages the word twice. */
export const SITE_NAME = 'India Blockchain Alliance'

/**
 * The site's one address (content review, 11-16): every canonical, og:url and
 * sitemap entry is built on it, whichever host served the page (the Vercel
 * preview addresses included), so Google indexes one copy of each page.
 */
export const SITE_URL = 'https://indiablockchainalliance.org'

/** The share card (1200 × 630) shown when a link is pasted into LinkedIn,
    WhatsApp, Slack or X: public/og-image.jpg */
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`

/**
 * Titles are kept to about 60 characters and descriptions to about 155, the
 * lengths Google shows in a result before it cuts them off (SEO pass, 11-16).
 *
 * The default, and what an unknown path gets: the home page's text, with
 * `noindex`, because a URL that does not exist should not collect results.
 */
export const FALLBACK = {
  title: 'India Blockchain Alliance | Web3, Tokenization & Advisory',
  description:
    'India Blockchain Alliance (IBA) connects India, the UAE, Europe, Africa and the Americas through the Web3 Corridor: tokenization, Web3 advisory and memberships.',
  noindex: true,
}

export const SEO = {
  '/': {
    title: 'India Blockchain Alliance | Web3, Tokenization & Advisory',
    description:
      'India Blockchain Alliance (IBA) connects India, the UAE, Europe, Africa and the Americas through the Web3 Corridor: tokenization, Web3 advisory and memberships.',
  },
  '/about': {
    title: 'About IBA | Vision, Mission & Global Presence',
    description:
      `Who India Blockchain Alliance is and what it is building: its vision, mission, founder and team, with ${FACTS.members.text} members across ${FACTS.countries.text} countries.`,
  },
  '/expertise': {
    title: 'Web3 Advisory & Consulting | IBA Expertise',
    description:
      'Web3 advisory and consulting from IBA: tokenization, standards and compliance, stablecoin structuring and global market expansion, from strategy to launch.',
  },
  '/tokenization': {
    title: 'Real-World Asset Tokenization | IBA',
    description:
      'Take real-world assets on-chain with IBA: asset selection, token design, regulation and compliance, technology and investor access, from idea to market.',
  },
  '/corridor': {
    title: 'Web3 Corridor | India, UAE, Europe, Africa & Americas | IBA',
    description:
      'The IBA Web3 Corridor links five regions for market entry, capital and cross-border growth, with Web360 Club memberships and the Indo–UAE Startup Xchange.',
  },
  '/membership': {
    title: 'IBA Membership | Join the India Blockchain Alliance',
    description:
      'Join India Blockchain Alliance: the IBA Library, the member directory and the Web3 Corridor network, with Club, Premier and Gold tiers for founders and institutions.',
  },
  '/ecosystem': {
    title: 'IBA Ecosystem | Partners, Councils & Initiatives',
    description:
      `The IBA ecosystem: ${FACTS.partners.text} partners, the councils setting blockchain standards, and initiatives including Red Club, Verifyble and Tech4Good.`,
  },
  '/initiatives': {
    title: 'IBA Initiatives | Programmes We Build and Run',
    description:
      'Programmes built and run by India Blockchain Alliance: Tech4Good, Green Chain Protocol, Verifyble, Red Club, the Web3 Corridor and the India AI Alliance.',
  },
  '/red-club': {
    title: 'IBA Red Club | Blockchain & AI Experience Centers',
    description:
      'IBA Red Club Experience Centers bring practical blockchain, tokenization and AI learning to universities and learners, with industry projects and global pathways.',
  },
  '/red-club/institutions': {
    title: 'Red Club for Universities | IBA Experience Centers',
    description:
      'Bring a Red Club Experience Center to your campus: curriculum, labs, joint research, industry projects and certifications, run in partnership with IBA.',
  },
  '/red-club/learners': {
    title: 'Red Club for Learners | Industry-Ready Web3 Skills | IBA',
    description:
      'Learn blockchain, tokenization and AI with IBA Red Club: programmes, live projects, internships, mentorship and verifiable credentials for a Web3 career.',
  },
  '/library': {
    title: 'IBA Library | Blockchain Articles, Videos & Research',
    description:
      'A searchable library of blockchain and Web3 articles, videos, reports and recorded sessions from India Blockchain Alliance. Free with a member account.',
  },
  '/connect': {
    title: 'Contact India Blockchain Alliance | Let’s Talk',
    description:
      'Talk to India Blockchain Alliance about Web3 advisory, tokenization, the Web3 Corridor, membership or Red Club. Email, WhatsApp, LinkedIn or the enquiry form.',
  },
  '/india-entry': {
    title: 'India Market Entry | IBA Web3 Global Corridor',
    description:
      'Enter India right with IBA: market intelligence, entity formation, regulatory and tax structuring, partnerships, first customers, capital and corridor expansion.',
  },
  '/privacy': {
    title: 'Privacy Policy | India Blockchain Alliance',
    description:
      'How India Blockchain Alliance collects, uses and protects the information you share through this website, and the rights you have over it.',
  },
}

/**
 * ⚠ SUPPLIED BUT HOMELESS.
 *
 * The brief gives Initiatives a title and a description, and there is no
 * initiatives page, the four are a section of /about, and nav.js points every
 * initiative link at /about#initiatives. A title cannot be set for a fragment,
 * so this pair is parked here rather than dropped: the moment Initiatives
 * becomes a route, this becomes its row.
 */
export const AWAITING_ROUTE = {
  initiatives: {
    brief: true,
    title: 'IBA Initiatives | Tech4Good, Green Chain Protocol, Verifyble & Red Club',
    description:
      'Four programmes built and run by the India Blockchain Alliance, impact, green finance, on-chain credentialing and talent.',
  },
}

export const seoFor = (path) => SEO[path] || FALLBACK
