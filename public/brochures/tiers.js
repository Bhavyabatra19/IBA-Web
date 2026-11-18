/* Web3 Corridor membership tiers, shared by the invoice, the welcome letter
   and the benefits sheet. Benefit copy from src/components/CorridorPlans.jsx
   (content review 11-14-2026); prices and service partners from the IBA
   Membership Matrix, "updated matrix" sheet (Nov 13). Prices are annual, in
   US dollars. The website shows no prices (by request); these documents do. */

window.W3C = {
  /* partner memberships sold on their own (US$ / year) */
  standalone: [
    { name: 'TheCircle', price: 1000 },
    { name: 'TheBlock', price: 6000 },
  ],
  /* corridor partner benefits: TheCircle for every tier, TheBlock Connect
     for Gold Class only (by request, 11-16-2026) */
  partners: [
    { partner: 'TheCircle', benefit: 'Global Member benefits', who: 'Every tier' },
    { partner: 'TheBlock', benefit: 'Connect benefits', who: 'Gold Class' },
  ],
  tiers: {
    club: {
      name: 'Club Class',
      price: 2500,
      servicePartners: 'TheCircle',
      sub: 'Essential Access',
      tagline: 'Learn • Connect • Explore',
      includes: 'Club Class Membership — inclusions from IBA and TheCircle',
      benefits: [
        { t: 'Network & Community', d: 'Access to our international ecosystem of founders, investors, mentors and partners; online and in-person community events, workshops and roundtables; startup, investor and mentor directories; curated roundtables and member roundups; and Dubai co-hosted event privileges with special event pricing.' },
        { t: 'Mentorship & Advisory', d: 'Up to 4 hours of mentorship a month; a GTM blueprint covering product lifecycle advisory, business planning, expansion strategies and regulatory mentoring; and growth advisory with pitch deck and business plan reviews and tailored funding preparation.' },
        { t: 'Resources & Secure Access', d: 'Startup resources, KPI frameworks, playbooks, templates and data-room guidance; verified identity with your official Club Badge; and a verifiable vault for all your data room and corporate documents.' },
        { t: 'Visibility & Promotion', d: 'One podcast recording, an IBA LinkedIn spotlight, and media promotion across podcast, live TV and crypto news media.' },
        { t: 'Preferential Pricing', d: 'Preferential pricing on Web3 Corridor services and products. For other IBA Web3 advisory services, members are evaluated for preferential pricing on customised consulting.' },
      ],
    },
    premier: {
      name: 'Premier Class',
      price: 5000,
      servicePartners: 'TheCircle & Edon Global',
      sub: 'Growth & Visibility',
      tagline: 'Position • Engage • Accelerate',
      includes: 'Includes all Club Class benefits, plus:',
      benefits: [
        { t: 'Strategic Advisory & Growth Acceleration', d: 'Six months of expert board advisory, strategic mentoring, KPI and milestone reviews, and business growth planning.' },
        { t: 'Market Readiness & Business Expansion', d: 'Comprehensive market readiness assessments, business setup blueprints, and strategic guidance for market entry and expansion.' },
        { t: 'Investment Readiness & Grant Opportunities', d: 'Mock investor committee exposure, investment preparation, and advisory on blockchain grants and funding opportunities.' },
        { t: 'Talent Access & Technical Enablement', d: 'Priority access to the IBA talent pool, on-request technical interns, and expert support for innovation and execution.' },
        { t: 'Global Visibility & Thought Leadership', d: 'Startup podcasts, media exposure, white paper publishing support, and subsidized access to exclusive industry events and passes on request.' },
      ],
    },
    gold: {
      name: 'Gold Class',
      price: 10000,
      servicePartners: 'TheCircle, Edon Global & TheBlock',
      sub: 'Executive & Institutional',
      tagline: 'Lead • Expand • Scale',
      includes: 'Includes all Premier Class benefits, plus:',
      benefits: [
        { t: 'All Premier Class Privileges', d: 'Complete access to strategic advisory, investment readiness, talent networks, market expansion, global visibility and growth acceleration services.' },
        { t: 'Dubai Web3 Experience Center Access', d: 'Exclusive access to full-service business facilities, professional office space and operational support at Dubai’s prestigious World Trade Centre.' },
        { t: 'Premium Business Establishment & Market Access', d: 'Dedicated support for establishing a Dubai presence, facilitating business operations, strategic partnerships and cross-border market expansion.' },
        { t: 'Tokenization Launch & Ecosystem Enablement', d: 'Privileged access to IBA’s premier Dubai partner, TheBlock, leveraging its ecosystem for tokenization launches, industry showcases, curated events and strategic networking.' },
        { t: 'Global Visibility & Institutional Connections', d: 'Enhanced brand positioning, media exposure, executive networking and curated introductions to investors, institutions and Web3 ecosystem leaders through the IBA Web3 Corridor.' },
      ],
    },
    xchange: {
      name: 'Gold Xchange',
      price: 15000,
      servicePartners: '',
      sub: 'Indo–UAE Startup Xchange · 12-week Launch Sprint',
      tagline: 'Validate • Build • Launch',
      includes: 'Gold Xchange membership includes:',
      benefits: [
        { t: 'Member events and briefings', d: '' },
        { t: 'Founder community across both markets', d: '' },
        { t: 'Network and ecosystem orientation', d: '' },
        { t: 'India → UAE or UAE → India track', d: '' },
        { t: 'Compliance clinics', d: '' },
        { t: 'Curated introductions', d: '' },
        { t: 'Named corridor concierge', d: '' },
        { t: 'Market-entry support and partner navigation', d: '' },
        { t: '12-week launch sprint: validate, build, launch', d: '' },
        { t: 'Demo day and soft-landing support', d: '' },
      ],
    },
  },
  /* the full Web360 Club matrix: [benefit, Club, Premier, Gold] */
  matrix: [
    ['Verified Club badge', true, true, true],
    ['IBA SafeVault: data room, corporate documents and KYC/KYB', true, true, true],
    ['Roundtable invitations and the members’ roundup', true, '4 a year', '6 a year'],
    ['Funding prep and assistance: growth advisory, deck and plan reviews', true, true, true],
    ['Member pricing on Corridor services and products', true, true, true],
    ['Dubai co-hosted event packages and special prices', true, true, true],
    ['GTM blueprint', true, true, true],
    ['Global member and partner directory', true, true, true],
    ['Product advisory: blueprint analysis, lifecycle, expansion and business plan', true, true, true],
    ['Mentoring on the regulatory framework', true, true, true],
    ['Introduction to the Web3 Corridor promotions', false, true, true],
    ['IBA promotion and LinkedIn spotlight', true, true, true],
    ['Event passes, on request and subsidised', false, true, 'Connect: full service'],
    ['Advisor on Board: KPI and milestone reviews, strategy sessions', false, true, true],
    ['Startup podcast and media visibility', 'One podcast recording', true, true],
    ['Market readiness assessment', false, true, true],
    ['On-request tech interns', false, true, true],
    ['Access to the IBA talent pool', false, true, true],
    ['Business set-up blueprint', false, true, true],
    ['Expert Board Advisor support (6 months)', false, true, true],
    ['Exposure to a mock investor committee', false, true, true],
    ['White paper publishing support', false, true, true],
    ['Blockchain grant advice and information', false, true, true],
    ['TheCircle Level 1 pack', false, true, true],
    ['TheBlock Level 1 pack', false, false, true],
  ],
}

/* ------------------------------------------------------------------
   Every benefit, in full, by theme (by request, 11-16-2026: each tier's
   brochure and welcome letter lists everything that tier includes, never
   "everything in the tier below, plus").

   Built from the membership matrix (which tier gets what) and the tier
   copy on the website (what each benefit is). Per tier: true = included,
   a string = included with that detail (shown as a tag), false or
   missing = not included. A description can differ by tier (dByTier).
   ------------------------------------------------------------------ */
window.W3C.groups = [
  {
    name: 'Verified Identity & Secure Access',
    items: [
      { t: 'Verified Club badge', d: 'An official, verified Web3 Corridor member badge for your website, pitch deck and profiles, showing your organisation has been verified by IBA.', club: true, premier: true, gold: true },
      { t: 'IBA SafeVault', d: 'A secure data room for your corporate documents, with your KYC/KYB verification held in one place and ready to share with investors and partners.', club: true, premier: true, gold: true },
      { t: 'Global member and partner directory', d: 'A listing in, and access to, the global directory of Web3 Corridor members and partners, so the right people can find you and you can find them.', club: true, premier: true, gold: true },
    ],
  },
  {
    name: 'Strategic Advisory & Growth',
    items: [
      { t: 'Go-to-market (GTM) blueprint', d: 'A go-to-market blueprint for your product: target markets, positioning, channels and launch priorities.', club: true, premier: true, gold: true },
      { t: 'Product advisory', d: 'Advisory on your product blueprint and lifecycle, your expansion strategy and your business plan.', club: true, premier: true, gold: true },
      { t: 'Regulatory mentoring', d: 'Mentoring on the regulatory framework that applies to your business in India, the UAE and the markets you plan to enter.', club: true, premier: true, gold: true },
      { t: 'Expert Board Advisor', d: 'Six months of support from an expert advisor alongside your board, bringing strategic mentoring and business growth planning.', premier: '6 months', gold: '6 months' },
      { t: 'Advisor on Board: KPI and milestone reviews', d: 'Regular strategy sessions with reviews of your KPIs and milestones, so progress is tracked and corrected early.', premier: true, gold: true },
      { t: 'Market readiness assessment', d: 'A structured assessment of how ready you are to enter a new market, and the gaps to close before you launch.', premier: true, gold: true },
      { t: 'Business set-up blueprint', d: 'A blueprint for setting up your business in a new market: the structure, the requirements and the steps in order.', premier: true, gold: true },
    ],
  },
  {
    name: 'Funding & Investment Readiness',
    items: [
      { t: 'Funding preparation and assistance', d: 'Growth advisory, reviews of your pitch deck and business plan, and funding preparation tailored to your stage.', club: true, premier: true, gold: true },
      { t: 'Mock investor committee', d: 'Pitch to a mock investor committee and get candid feedback before you meet real investors.', premier: true, gold: true },
      { t: 'Blockchain grant advisory', d: 'Advice and information on blockchain grants and non-dilutive funding opportunities that fit your project.', premier: true, gold: true },
    ],
  },
  {
    name: 'Networking, Events & Global Exposure',
    items: [
      { t: 'Member roundtables and the members’ roundup', d: 'Invitations to curated member roundtables, and the members’ roundup: a regular digest of members, news and opportunities across the corridor.', club: '2 a year', premier: '4 a year', gold: '6 a year' },
      { t: 'Web3 Corridor introductions and promotions', d: 'Introductions into Web3 Corridor programmes and promotions across India, the UAE and the corridor’s partner markets.', club: true, premier: true, gold: true },
      { t: 'Dubai co-hosted event privileges', d: 'Privileged packages and special pricing for events IBA co-hosts in Dubai.', club: true, premier: true, gold: true },
      { t: 'Industry event passes', d: '', dByTier: { premier: 'Subsidised passes to selected industry events, on request.', gold: 'Full-service event access through TheBlock Connect, including passes to selected industry events.' }, premier: 'Subsidised', gold: 'Full service' },
      { t: 'Member pricing', d: 'Preferential member pricing on Web3 Corridor services and products.', club: true, premier: true, gold: true },
    ],
  },
  {
    name: 'Visibility & Thought Leadership',
    items: [
      { t: 'IBA promotion and LinkedIn spotlight', d: 'Promotion through IBA’s channels, including a member spotlight on IBA’s LinkedIn.', club: true, premier: true, gold: true },
      { t: 'Startup podcast and media visibility', d: 'Appearances on startup podcasts and exposure through IBA’s media partners.', premier: true, gold: true },
      { t: 'White paper publishing support', d: 'Support to write, refine and publish your white paper.', premier: true, gold: true },
    ],
  },
  {
    name: 'Talent & Technical Enablement',
    items: [
      { t: 'IBA talent pool', d: 'Priority access to the IBA talent pool when you hire for technical and business roles.', premier: true, gold: true },
      { t: 'Technical interns on request', d: 'Technical interns placed with your team on request, to support innovation and execution.', premier: true, gold: true },
    ],
  },
  {
    name: 'Dubai Presence & Institutional Access',
    items: [
      { t: 'Dubai Web3 Experience Center', d: 'Access to full-service business facilities, professional office space and operational support at Dubai’s World Trade Centre.', gold: true },
      { t: 'Business establishment and market access', d: 'Dedicated support to establish your Dubai presence, run business operations there, and build strategic partnerships for cross-border expansion.', gold: true },
      { t: 'Tokenization launch and ecosystem enablement', d: 'Privileged access to IBA’s premier Dubai partner, TheBlock, and its ecosystem for tokenization launches, industry showcases, curated events and strategic networking.', gold: true },
      { t: 'Institutional connections', d: 'Executive networking, enhanced brand positioning and media exposure, and curated introductions to investors, institutions and Web3 ecosystem leaders through the Web3 Corridor.', gold: true },
    ],
  },
  {
    name: 'Corridor Partner Benefits',
    items: [
      { t: 'TheCircle Global Member benefits', d: 'TheCircle’s Global Member benefits, through IBA’s corridor partnership.', club: true, premier: true, gold: true },
      { t: 'TheBlock Connect benefits', d: 'TheBlock’s Connect benefits in Dubai, through IBA’s corridor partnership.', gold: true },
      { t: 'TheCircle Level 1 pack', d: 'TheCircle’s Level 1 membership pack, included in your membership.', premier: true, gold: true },
      { t: 'TheBlock Level 1 pack', d: 'TheBlock’s Level 1 membership pack, included in your membership.', gold: true },
    ],
  },
]

/* Gold Xchange, in full */
window.W3C.xgroups = [
  {
    name: 'The Launch Programme',
    items: [
      { t: '12-week launch sprint', d: 'A structured three-phase programme to validate, build and launch your business in the other market.' },
      { t: 'India → UAE or UAE → India track', d: 'A dedicated track for your direction of expansion, with programme content built around it.' },
      { t: 'Named corridor concierge', d: 'One named point of contact who coordinates your programme, introductions and requests from start to finish.' },
    ],
  },
  {
    name: 'Market Entry',
    items: [
      { t: 'Network and ecosystem orientation', d: 'A structured introduction to your target market’s ecosystem: the regulators, investors, partners and service providers who matter.' },
      { t: 'Compliance clinics', d: 'Working sessions on the regulatory and compliance requirements for entering your target market.' },
      { t: 'Market-entry support and partner navigation', d: 'Guidance on setting up in the target market and choosing the right partners and service providers.' },
    ],
  },
  {
    name: 'Network & Community',
    items: [
      { t: 'Curated introductions', d: 'Introductions to investors, partners, customers and advisors, matched to your goals.' },
      { t: 'Founder community across both markets', d: 'A community of founders building between India and the UAE, to share contacts, lessons and opportunities.' },
      { t: 'Member events and briefings', d: 'Invitations to Startup Xchange member events and market briefings in both markets.' },
    ],
  },
  {
    name: 'Launch & Landing',
    items: [
      { t: 'Demo day and soft-landing support', d: 'Present to investors and partners at demo day, with support as you land and operate in the new market.' },
    ],
  },
]

/* every benefit a tier includes, in full: [{ name, items: [{ t, d, tag }] }] */
/* ------------------------------------------------------------------
   Club Class, as written by IBA (11-18-2026). These are the Club Class
   inclusions and services from IBA and TheCircle, and they replace the
   matrix rows for this tier: list only what is offered, nothing more.
   ------------------------------------------------------------------ */
window.W3C.clubGroups = [
  {
    name: 'Network & Community',
    items: [
      { t: 'International ecosystem access', d: 'Access to our international ecosystem of founders, investors, mentors and partners.' },
      { t: 'Community events, workshops and roundtables', d: 'Participation in online and in-person community events, workshops and roundtables.' },
      { t: 'Startup, investor and mentor directories', d: 'Directories of startups, investors and mentors for ecosystem discovery.' },
      { t: 'Curated roundtables and member roundups', d: 'Invitations to curated member roundtables, and the members\u2019 roundup.' },
      { t: 'Dubai co-hosted event privileges', d: 'Special event pricing for events IBA co-hosts in Dubai.' },
    ],
  },
  {
    name: 'Mentorship & Advisory',
    items: [
      { t: 'Mentorship', tag: 'Up to 4 hours a month', d: 'Up to four hours of mentorship every month.' },
      { t: 'GTM blueprint', d: 'Product lifecycle advisory, business planning and expansion strategies, and regulatory mentoring.' },
      { t: 'Growth advisory', d: 'Pitch deck and business plan reviews, and tailored funding preparation assistance.' },
    ],
  },
  {
    name: 'Resources & Secure Access',
    items: [
      { t: 'Startup resources', d: 'Access to startup resources, KPI frameworks, playbooks, templates and data-room guidance.' },
      { t: 'Official Club Badge', d: 'Verified identity and secure access, with your official Club Badge.' },
      { t: 'Verifiable vault', d: 'A safe vault for all your data room and corporate documents.' },
    ],
  },
  {
    name: 'Visibility & Promotion',
    items: [
      { t: 'Podcast recording', tag: 'One recording', d: 'One podcast recording.' },
      { t: 'Social media and media promotion', d: 'An IBA LinkedIn spotlight, and media promotion across podcast, live TV and crypto news media.' },
    ],
  },
  {
    name: 'Member Pricing',
    items: [
      { t: 'Preferential pricing', d: 'Preferential pricing on Web3 Corridor services and products.' },
    ],
  },
]

/* how IBA describes Club Class (11-18-2026), used by the brochure and
   the welcome letter */
window.W3C.tiers.club.profile = {
  programme: 'Web3 Corridor Global Membership programme',
  journey: 'Membership is a journey, not a static subscription: every stage is gated, and every gate is earned.',
  promise: 'Investor relations and funding-focused plans with curated access. At the Club Class we bring you a curated programme where capital meets global opportunity.',
  access: 'Access curated deal flow, experienced mentors, strategic advisory hours and ecosystem connections to accelerate your journey from early-stage idea to market-ready venture.',
  headline: 'Build Your Network. Strengthen Your Venture. Prepare for Global Markets.',
  about: [
    'The Club Class Membership is the entry point to the IBA Web360 ecosystem, designed for founders, operators, MSMEs and emerging businesses preparing for international growth. Members gain access to curated investor and industry networking sessions, founder roundtables, expert-led market-entry briefings, mentorship and advisory clinics, potential deal-flow opportunities, and introductions to technology, legal, compliance and commercial partners.',
    'Through the IBA Web3 Corridor, members can explore cross-border markets, understand regulatory and investment-readiness requirements, showcase their ventures, and build strategic relationships that support fundraising, partnerships, business development and international expansion.',
  ],
  idealFor: [
    'Individual founders and operators, MSMEs, businesses operating in one or two countries, and expansion-stage ventures',
    'Idea-stage, pre-seed or early-stage companies',
    'A clearly identified business concept, product or service',
    'Founders actively working on developing their business',
    'Startups exploring international connections, partnerships or future fundraising opportunities',
    'No minimum revenue or fundraising requirement at this level',
  ],
  note: 'For other IBA Web3 advisory services, members will be evaluated for preferential pricing on customised consulting.',
  sources: 'from IBA and TheCircle',
}

window.W3C.benefitsFor = function (key) {
  if (key === 'club') return window.W3C.clubGroups.map((g) => ({ name: g.name, items: g.items.map((i) => ({ t: i.t, d: i.d, tag: i.tag || '' })) }))
  if (key === 'xchange') return window.W3C.xgroups.map((g) => ({ name: g.name, items: g.items.map((i) => ({ t: i.t, d: i.d, tag: '' })) }))
  return window.W3C.groups
    .map((g) => ({
      name: g.name,
      items: g.items
        .filter((i) => i[key])
        .map((i) => ({ t: i.t, d: (i.dByTier && i.dByTier[key]) || i.d, tag: typeof i[key] === 'string' ? i[key] : '' })),
    }))
    .filter((g) => g.items.length)
}
window.W3C.countFor = (key) => window.W3C.benefitsFor(key).reduce((n, g) => n + g.items.length, 0)
