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
 * ---------------------------------------------------------------------------
 * The shape is six tabs sorted by what a visitor is trying to do rather than
 * by IBA's org chart:
 *
 *   Home        the way back, said out loud. The lockup has always gone here
 *               and still does; a named tab beside it is the version people
 *               look for rather than the one they have to know about
 *   About       who are you and are you real — vision, mission, footprint,
 *               people, numbers
 *   Expertise   everything IBA sells or delivers, split by BUYER rather than by
 *               feature: enterprises and governments on one side, institutions
 *               and students on the other. Red Club sits here because it is a
 *               programme people enrol in
 *   Ecosystem   everything IBA convenes rather than sells — initiatives,
 *               partner products, organisations, councils, and the people in
 *               them
 *   Resources   the library: free, searchable, and the main reason to make an
 *               account
 *   Web3        the flagship cross-border programme, pulled out of Ecosystem
 *   Corridor    deliberately — one level down would waste it. It is the one
 *               highlighted tab, and it carries `pill` to say so
 *
 * A tab has either `items` (a flat list), `groups` (lists under headings), or
 * neither. Only Expertise is grouped, and it has to be: the split by audience
 * IS the information, and a flat list of seven would hide it. Home has neither,
 * deliberately — a dropdown under it would list the home page's own sections,
 * which are the five tabs standing next to it.
 */

/**
 * Destinations with no route and no section carrying them yet.
 *
 * Kept apart from the tree on purpose: an href pointing at a path the router
 * does not know silently renders the HOME page (see PAGES in App.jsx), so a
 * missing page looks like a working link that goes to the wrong place. These
 * are the ones that need building, listed where they can be counted.
 */
export const PENDING = {
  privacy: '/privacy',
  terms: '/terms',
}

export const NAV = [
  /* The tabs as the content source sets them out. Every href is page-
     qualified, so a link works from any page. */
  { key: 'home', label: 'Home', href: '/', top: true },
  /* Panels are grouped (by request, after the client's reference): a short
     heading over each set of related links, each link with an icon and a
     one-line description. icon names the line icon in Nav.jsx (ICONS). */
  {
    key: 'about',
    label: 'About',
    href: '/about',
    groups: [
      {
        title: 'The Alliance',
        items: [
          { label: 'Who We Are', icon: 'info', desc: 'The alliance and what it stands for.', href: '/about#who-we-are' },
          { label: 'The Team', icon: 'user', desc: 'A message from our founder.', href: '/about#team' },
        ],
      },
      {
        title: 'Purpose',
        items: [
          { label: 'Mission', icon: 'target', desc: 'The infrastructure of trust, and how we build it.', href: '/about#mission' },
          { label: 'Vision', icon: 'eye', desc: 'A world where value moves at the speed of trust.', href: '/about#vision' },
        ],
      },
      {
        title: 'Impact',
        items: [
          { label: 'Our Presence', icon: 'globe', desc: 'The countries and figures behind the alliance.', href: '/about#impact' },
        ],
      },
    ],
  },
  {
    key: 'expertise',
    label: 'Expertise',
    href: '/expertise',
    groups: [
      {
        title: 'What We Deliver',
        items: [
          { label: 'Web3 Solution Consulting Stack', icon: 'layers', desc: 'Tokenization, standards, compliance and stablecoins.', href: '/expertise#consulting-stack' },
        ],
      },
      {
        title: 'Who We Serve',
        items: [
          { label: 'Who We Work With', icon: 'users', desc: 'Governments, enterprises, issuers and founders.', href: '/expertise#who-we-serve' },
        ],
      },
      {
        title: 'Programmes',
        items: [
          { label: 'IBA Initiatives', icon: 'spark', desc: 'Programmes IBA built and runs.', href: '/expertise#initiatives' },
        ],
      },
    ],
  },
  {
    key: 'ecosystem',
    label: 'Ecosystem',
    href: '/ecosystem',
    groups: [
      {
        title: 'Explore',
        items: [
          { label: 'Key Partners', icon: 'link', desc: 'Our growing network of partners.', href: '/ecosystem#organisations' },
          { label: 'Communities & Councils', icon: 'chat', desc: 'Where the standards get set.', href: '/ecosystem#communities' },
        ],
      },
      {
        title: 'Connect',
        items: [
          { label: 'People', icon: 'users', desc: 'Members, advisors and mentors.', href: '/ecosystem#people' },
          { label: 'Member Directory', icon: 'lock', desc: 'Find members across the alliance.', href: '/ecosystem#member-directory' },
        ],
      },
      {
        title: 'Get Involved',
        items: [
          { label: 'Become a Partner', icon: 'handshake', desc: 'Partner with IBA.', href: '/ecosystem#become-a-partner' },
        ],
      },
    ],
  },
  {
    key: 'resources',
    label: 'Resources',
    href: '/library',
    /* the formats all land on the catalogue, which filters by format */
    groups: [
      {
        title: 'The Library',
        items: [
          { label: 'The IBA Library', note: 'free account', icon: 'book', desc: 'Search the full open knowledge base.', href: '/library' },
          { label: 'Articles', icon: 'doc', desc: 'Perspectives on tokenization, policy and Web3.', href: '/library#catalogue' },
        ],
      },
      {
        title: 'Watch & Read',
        items: [
          { label: 'Videos', icon: 'play', desc: 'Walkthroughs and explainers.', href: '/library#catalogue' },
          { label: 'Webinars', icon: 'video', desc: 'Recorded sessions with IBA experts.', href: '/library#catalogue' },
          { label: 'Reports & Whitepapers', icon: 'report', desc: 'Research and policy briefs.', href: '/library#catalogue' },
        ],
      },
    ],
  },
  { key: 'redclub', label: 'Experience Zone', href: '/red-club' },
  {
    key: 'corridor',
    label: 'Web3 Corridor',
    href: '/corridor',
    pill: true,
    groups: [
      {
        title: 'The Initiative',
        items: [
          { label: 'Global Innovation Corridor', icon: 'globe', desc: 'What the corridor is and why it exists.', href: '/corridor' },
          { label: 'Core Dimensions', icon: 'layers', desc: 'How the corridors work.', href: '/corridor#how-corridors-work' },
          { label: 'Country Corridors', icon: 'pin', desc: 'Where the corridor reaches.', href: '/corridor#country-corridors' },
        ],
      },
      {
        title: 'Take Part',
        items: [
          { label: 'Corridor Forum', icon: 'chat', desc: "The corridor's flagship gathering.", href: '/corridor#corridor-forum' },
          { label: 'Join the Corridor', icon: 'handshake', desc: 'Become a corridor partner.', href: '/corridor#join-corridor' },
        ],
      },
      /* ⚠ Both memberships land on the corridor's join form until they have
         pages of their own; the descriptions are placeholders to confirm. */
      {
        title: 'Memberships',
        items: [
          { label: 'Partner Members', icon: 'link', desc: 'Organisations partnering on the corridor.', href: '/corridor#join-corridor' },
          { label: 'Web360 Members', icon: 'globe', desc: 'Individual members across the network.', href: '/corridor#join-corridor' },
        ],
      },
    ],
  },
]

/** Every destination under a tab, whether it is grouped or not. */
export const tabItems = (tab) =>
  tab.groups ? tab.groups.flatMap((g) => g.items) : tab.items || []

/**
 * ⚠ BOTH VALUES CHANGED with the content update, and the old ones are recorded
 * here because they were live on the site and may still be in circulation:
 * rk@, connect@ and iba@indiablockchainalliance.org, and +91 9004140003. If
 * any is still monitored, it needs a forward.
 *
 * The WhatsApp number follows the phone, as it always has — section 8.2's open
 * question about whether IBA wants a separate WhatsApp Business line is still
 * open, and now applies to the new number.
 */
export const CONTACT = {
  phone: { label: '+91 8420045940', href: 'tel:+918420045940' },
  email: {
    label: 'hello@indiablockchainalliance.org',
    /* The subject is pre-filled so an enquiry arrives already sorted from the
       one channel that has no form behind it to sort it. */
    href: 'mailto:hello@indiablockchainalliance.org?subject=' +
      encodeURIComponent('Enquiry via indiablockchainalliance.org'),
  },
  /**
   * ⚠ SAME NUMBER AS THE PHONE LINE, and section 8.2 asks IBA to confirm that
   * is intended: "confirm whether +91 9004140003 is the WhatsApp number, or
   * whether IBA wants a separate WhatsApp Business line for enquiries."
   *
   * If a Business line is opened, change `number` here and nothing else — the
   * modal, the footer and the closing band all build their links from it. It is
   * digits only, with the country code and no punctuation, because that is the
   * only form wa.me accepts.
   */
  whatsapp: { label: '+91 8420045940', number: '918420045940' },
  /**
   * ⚠ THIS IS A PERSONAL PROFILE, not a company page — /in/ rather than
   * /company/. It is the value section 8.2 supplies, so it is the value used;
   * but the closing band and the footer both label this link "India Blockchain
   * Alliance", which is an organisation. Confirm which of the two IBA wants
   * readers sent to before launch.
   */
  linkedin: {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/indieblock',
  },
}

/**
 * The label on the way in, everywhere it appears.
 *
 * "Member Login", not "Sign In": IBA is an alliance of 800+ members, and the
 * label should say what the account actually is. It lives here because the
 * brief asks for it to be identical in the nav, the footer, the modal heading,
 * the transactional emails and the empty states — and five copies of a word are
 * five chances for one of them to drift.
 */
export const MEMBER_LOGIN = 'Member Login'

/**
 * Footer columns, as the footer design sets them out: five lists, the last
 * one ending in the three ways to reach IBA. Each label points at the page or
 * section that answers it; where a section has no anchor of its own, at the
 * page that holds it.
 *
 *   Key Partners / Member Directory  the Ecosystem page's organisations list
 *   Core Dimensions                  how corridors work, on /corridor
 *   Corridor Forum                   /corridor — the forum has no section yet
 *   Newsletter signup                an email, until a list provider is wired
 *                                    up; a form that pretended to subscribe
 *                                    would be worse than a plain link
 */
export const FOOTER = [
  {
    title: 'IBA',
    items: [
      { label: 'Who We Are', href: '/about#who-we-are' },
      { label: 'Vision & Mission', href: '/about#vision' },
      { label: 'Impact', href: '/about#impact' },
      { label: 'The Team', href: '/about#team' },
      { label: 'Careers', href: '/connect' },
    ],
  },
  {
    title: 'Expertise',
    items: [
      { label: 'Consulting', href: '/expertise#consulting-stack' },
      { label: 'Who We Work With', href: '/expertise#who-we-serve' },
      { label: 'IBA Initiatives', href: '/expertise#initiatives' },
      { label: 'Communities & Councils', href: '/ecosystem#communities' },
    ],
  },
  {
    title: 'Ecosystem',
    items: [
      { label: 'Key Partners', href: '/ecosystem#organisations' },
      { label: 'People', href: '/ecosystem#people' },
      { label: 'Member Directory', href: '/ecosystem#member-directory' },
      { label: 'Become a Partner', href: '/ecosystem#become-a-partner' },
    ],
  },
  {
    title: 'Web3 Corridor',
    items: [
      { label: 'Global Innovation Corridor', href: '/corridor' },
      { label: 'Core Dimensions', href: '/corridor#how-corridors-work' },
      { label: 'Corridor Forum', href: '/corridor#corridor-forum' },
      { label: 'Country Corridors', href: '/corridor#country-corridors' },
      { label: 'Join the Corridor', href: '/corridor#join-corridor' },
    ],
  },
  {
    title: 'Resources & Contact',
    items: [
      { label: 'The IBA Library', href: '/library' },
      { label: MEMBER_LOGIN, href: '/library#login' },
      { label: 'Newsletter signup', href: '/library#signup' },
      { label: 'Contact Us', href: '/connect' },
      { label: 'LinkedIn', href: CONTACT.linkedin.href, external: true, icon: 'linkedin' },
      { label: 'Email', href: CONTACT.email.href, icon: 'email' },
      { label: 'Phone', href: CONTACT.phone.href, icon: 'phone' },
    ],
  },
]
