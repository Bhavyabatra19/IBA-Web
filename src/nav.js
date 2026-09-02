/**
 * Information architecture — one source of truth for the nav and the footer.
 *
 * The nav and the footer are the same map of the site shown at two different
 * altitudes, so they are generated from one structure rather than written
 * twice. Adding a page means editing this file only; it cannot then be in the
 * header and missing from the footer.
 *
 * `href` is where the item goes TODAY. Most destinations are not pages yet, so
 * they resolve to the section currently carrying their content — when one
 * becomes a real page, only the href here changes.
 *
 * Every href is page-qualified: `/#library`, never `#library`. A bare hash
 * means "somewhere on the page you are already on", which is silently wrong
 * from /about — the reader clicks Library and nothing happens.
 *
 * Five content tabs are the whole point of the shape: Education splits by
 * audience (student → Red Club, institution → Verifyble) rather than by feature,
 * and Studio is the umbrella for everything partnership-facing, so clients,
 * government work, corridors and councils do not fragment the bar. Home sits in
 * front of them as a sixth, and is the one tab with no `items` — a panel listing
 * the home page's sections would only restate the five tabs beside it. A tab
 * without `items` renders as a plain link, in the bar and in the drawer both.
 */

/** Destinations that do not exist on the page yet and need real routes. */
export const PENDING = {
  privacy: '/privacy',
  terms: '/terms',
}

export const NAV = [
  {
    key: 'home',
    label: 'Home',
    href: '/',
  },
  {
    key: 'about',
    label: 'About',
    href: '/about',
    items: [
      { label: 'Who We Are', href: '/about#who-we-are' },
      { label: 'The IBA Core', href: '/about#the-iba-core' },
      { label: 'Initiatives That Impact', href: '/about#initiatives' },
      { label: 'The Team', href: '/about#the-team' },
      { label: 'Impact & Numbers', href: '/about#impact-numbers' },
    ],
  },
  {
    key: 'services',
    label: 'Services',
    href: '/services',
    items: [
      { label: 'Consulting Stack', href: '/services/consulting-stack' },
      { label: 'Web3 Advisory', href: '/services/web3-advisory' },
      { label: 'Legal Advisory', href: '/services/legal-advisory' },
      { label: 'RWA Tokenization', href: '/services/rwa-tokenization' },
      { label: 'White Label Solutions', href: '/services/white-label' },
      { label: 'Sector Expertise', href: '/services/sector-expertise' },
    ],
  },
  {
    key: 'education',
    label: 'Education',
    href: '/education',
    items: [
      { label: 'IBA Red Club', note: 'For Students', href: '/education/red-club' },
      { label: 'Verifyble', note: 'For Institutions', href: '/education/verifyble' },
    ],
  },
  {
    key: 'studio',
    label: 'Studio',
    href: '/studio',
    /* Four anchors into one page rather than four pages — see the note at the
       top of studio.js. The tab itself is the fifth, whole-page destination. */
    items: [
      { label: 'Ecosystem & Partners', href: '/studio' },
      { label: 'Clients', href: '/studio#clients' },
      { label: 'Government Projects', href: '/studio#government-projects' },
      { label: 'Web3 Corridors', href: '/studio#web3-corridors' },
      { label: 'Councils & Affiliations', href: '/studio#councils' },
    ],
  },
  {
    key: 'library',
    label: 'Library',
    href: '/library',
    /* The last three name what is on the shelves, and the shelves are not a
       catalogue yet — so they resolve to the landing page's list of them. When
       the catalogue exists they become its filters, and only these hrefs move. */
    items: [
      { label: 'Free Resources', note: 'free account', href: '/library' },
      { label: 'Research & Reports', href: '/library#inside' },
      { label: 'Playbooks', href: '/library#inside' },
      { label: 'Webinars', href: '/library#inside' },
    ],
  },
]

export const CONTACT = {
  phone: { label: '+91 9004140003', href: 'tel:+919004140003' },
  email: {
    label: 'rk@indiablockchainalliance.org',
    href: 'mailto:rk@indiablockchainalliance.org',
  },
  /* VERIFY: best guess at the company slug — correct it here if it is wrong. */
  linkedin: {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/india-blockchain-alliance/',
  },
}

/**
 * Footer columns. Four of them are the nav tabs restated flat — no dropdown to
 * open, so every destination is visible at once — plus a fifth that is the only
 * thing in the footer the nav has no room for: the ways to stay in contact.
 */
export const FOOTER = [
  {
    title: 'IBA',
    items: [
      { label: 'About', href: '/about' },
      { label: 'The Team', href: '/about#the-team' },
      { label: 'Impact', href: '/about#impact-numbers' },
      { label: 'Careers', href: '/#connect' },
      { label: 'Contact', href: '/#connect' },
    ],
  },
  {
    title: 'Services',
    items: [
      { label: 'Consulting', href: '/services/consulting-stack' },
      { label: 'Web3 Advisory', href: '/services/web3-advisory' },
      { label: 'Legal Advisory', href: '/services/legal-advisory' },
      { label: 'Tokenization', href: '/services/rwa-tokenization' },
      { label: 'White Label', href: '/services/white-label' },
      { label: 'Sector Expertise', href: '/services/sector-expertise' },
    ],
  },
  {
    title: 'Education',
    items: [
      { label: 'IBA Red Club', note: 'For Students', href: '/education/red-club' },
      { label: 'Verifyble', note: 'For Institutions', href: '/education/verifyble' },
    ],
  },
  {
    title: 'Studio',
    items: [
      { label: 'Ecosystem', href: '/studio' },
      { label: 'Clients', href: '/studio#clients' },
      { label: 'Government Projects', href: '/studio#government-projects' },
      { label: 'Web3 Corridors', href: '/studio#web3-corridors' },
      { label: 'Councils', href: '/studio#councils' },
    ],
  },
]
