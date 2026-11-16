/* Web3 Corridor membership tiers, shared by the welcome letter and the
   benefits sheet. Copied from src/components/CorridorPlans.jsx (content
   review 11-14-2026); change both together. No prices here: the amount is
   typed into each letter and invoice. */

window.W3C = {
  partners: [
    { partner: 'TheCircle', benefit: 'Global Member benefits' },
    { partner: 'TheBlock', benefit: 'Connect benefits' },
  ],
  tiers: {
    club: {
      name: 'Club Class',
      sub: 'Essential Access',
      tagline: 'Learn • Connect • Explore',
      includes: 'Club Class Membership — exclusive benefits',
      benefits: [
        { t: 'Verified Identity & Secure Access', d: 'Official Club badge, IBA SafeVault for corporate documentation and KYC/KYB, and access to the global member and partner directory.' },
        { t: 'Strategic Advisory & Growth Enablement', d: 'GTM blueprint, product lifecycle advisory, business planning, expansion strategies and regulatory mentoring.' },
        { t: 'Funding Readiness & Investor Preparation', d: 'Growth advisory, pitch deck and business plan reviews, and tailored funding preparation assistance.' },
        { t: 'Exclusive Networking & Global Exposure', d: 'Curated roundtables, member roundups, Web3 Corridor introductions, Dubai co-hosted event privileges and special event pricing.' },
        { t: 'Visibility & Preferred Member Privileges', d: 'IBA LinkedIn spotlights, promotional opportunities, and preferential pricing on Web3 Corridor services and products.' },
      ],
    },
    premier: {
      name: 'Premier Class',
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
    ['Roundtable invitations and the members’ roundup', '2 a year', '4 a year', '6 a year'],
    ['Funding prep and assistance: growth advisory, deck and plan reviews', true, true, true],
    ['Member pricing on Corridor services and products', true, true, true],
    ['Dubai co-hosted event packages and special prices', true, true, true],
    ['GTM blueprint', true, true, true],
    ['Global member and partner directory', true, true, true],
    ['Product advisory: blueprint analysis, lifecycle, expansion and business plan', true, true, true],
    ['Mentoring on the regulatory framework', true, true, true],
    ['Introduction to the Web3 Corridor promotions', true, true, true],
    ['IBA promotion and LinkedIn spotlight', true, true, true],
    ['Event passes, on request and subsidised', false, true, 'Connect: full service'],
    ['Advisor on Board: KPI and milestone reviews, strategy sessions', false, true, true],
    ['Startup podcast and media visibility', false, true, true],
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
