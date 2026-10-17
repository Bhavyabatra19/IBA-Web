/**
 * The Services section, as content.
 *
 * Seven pages' worth of copy, held here rather than typed into seven
 * components — the same reason nav.js holds the IA and content.js holds the
 * figures. A page file should say what shape its content takes; this file says
 * what the content is.
 *
 * The RWA page's track record and aggregate are NOT restated here. They are the
 * same numbers the About page publishes, so they are imported from content.js
 * at the point of use — a second copy is how "$5B+" and "USD 993 Million" end
 * up disagreeing across two pages.
 */

/* ================================================================== */
/* 4.0 — the landing page                                             */
/* ================================================================== */

/**
 * The bar under the headline. Rendered as a list, so it is a list.
 *
 * Education is last and is the odd one out on purpose: the twelve before it are
 * disciplines IBA practises for organisations, and it is the one thing on the
 * bar delivered to people. It is on the bar because the section now carries the
 * Red Club — see EXPERTISE_STUDENTS.
 */
export const SERVICE_SPECTRUM = [
  'Policy',
  'Compliance',
  'Standards',
  'Taxation',
  'Forensics',
  'Risk Mitigation',
  'Advisory',
  'Consulting',
  'Research',
  'Launch Pads',
  'Accelerator',
  'Consortiums',
  'Education',
]

/**
 * The five, plus Sector Expertise. `wide` is the sixth's band beneath the
 * others — a property of the tile rather than a special case in the page.
 *
 * `short` is the name with the words that only matter in a sentence taken off,
 * for the hero's rail — six full names on one row set six labels wrapping to
 * three lines each, and the rail is read as a sequence, not as prose.
 */
export const SERVICES = [
  {
    n: '01',
    slug: 'consulting-stack',
    name: 'The Consulting Stack',
    short: 'Consulting',
    blurb:
      'Strategy, PoC, MVP, custom development, ecosystem management.',
  },
  {
    n: '02',
    slug: 'web3-advisory',
    name: 'Web3 Advisory',
    short: 'Web3',
    blurb:
      'Tokenomics, tech stack, financial modelling, launch and accelerator.',
  },
  {
    n: '03',
    slug: 'legal-advisory',
    name: 'Legal Advisory',
    short: 'Legal',
    blurb:
      'Token and NFT regulation, documentation, IP, risk.',
  },
  {
    n: '04',
    slug: 'rwa-tokenization',
    name: 'RWA Tokenization',
    short: 'RWA',
    blurb:
      'Structuring, issuance, listing, governance.',
  },
  {
    n: '05',
    slug: 'white-label',
    name: 'White Label Solutions',
    short: 'White Label',
    blurb: 'Deployable platforms across payments, exchange, supply chain and IoT.',
  },
  {
    n: '06',
    slug: 'sector-expertise',
    name: 'Sector Expertise',
    short: 'Sectors',
    wide: true,
    blurb: 'Deep capability across 16+ verticals.',
  },
]

/** Every service page's path, in one place, so the nav and the router agree. */
export const servicePath = (slug) => `/services/${slug}`

/**
 * Group B on the Expertise landing: what IBA delivers to people rather than to
 * organisations.
 *
 * One entry, and the split is worth having for one: the six above are bought by
 * a company and this is enrolled in by a person, and a reader is one or the
 * other before they are anything else. A flat list of seven would make them
 * choose between things that are not alternatives.
 *
 * It carries its own `href` because it is the one item here that does not live
 * under /services — the Red Club has a page in the Education section, and
 * pointing at it is better than a second copy of it.
 */
export const EXPERTISE_STUDENTS = [
  {
    n: '07',
    slug: 'red-club',
    href: '/education/red-club',
    name: 'IBA Red Club',
    blurb:
      'Certified programmes, Blockchain and AI labs, live projects, internships and placements.',
  },
]

/* ================================================================== */
/* 4.1 — the consulting stack                                         */
/* ================================================================== */

export const STACK_CAPABILITIES = [
  {
    name: 'Strategy Assessments',
    body: 'By assessing your goals, we do in-depth research on the applicability of blockchain technology and its business impact — prioritising your business architecture and potential case studies.',
  },
  {
    name: 'Blockchain Solution Consultancy',
    body: 'We analyse the need for a blockchain solution and examine the limitations of your existing systems. We thoroughly understand how blockchain applications can add value to your business.',
  },
  {
    name: 'Expert Training & Advice',
    body: 'We suggest the best blockchain-based application for your business by drawing on our experience in product delivery and management services. We also train your team to upskill their blockchain knowledge.',
  },
  {
    name: 'MVP Development',
    body: 'We offer agile software development solutions that maximise your return on investment through innovative blockchain methods, transforming your business projects and operations to the next level.',
  },
  {
    name: 'Custom Application Development',
    body: 'We help turn your business goals into reality by leveraging the benefits of the blockchain platform. With custom blockchain application development, we prioritise product quality that maximises your revenue.',
  },
  {
    name: 'Swift PoC Creation',
    body: 'By focusing on business objectives, we create a Proof of Concept to validate the practical potential of your blockchain-based application. Our consultants assist clients with recommendations based on product feasibility.',
  },
]

export const STACK_STEPS = [
  {
    n: '01',
    name: 'Strategy Assessment',
    body: "We'll assess your goals and evaluate blockchain's applicability and business impact to help you define and prioritise your transformation.",
  },
  {
    n: '02',
    name: 'Hands-On Training & Rapid Prototyping',
    body: 'Technology leadership workshops and training upskill your team while working side-by-side with experts in rapid blockchain development environments.',
  },
  {
    n: '03',
    name: 'Solution Design',
    body: 'Holistic solution design encompasses people, process, operating model and technology to maximise transformation across your business.',
  },
  {
    n: '04',
    name: 'Build & Implementation',
    body: 'Complex implementation management, third-party integration and custom coding ensure each solution fits within existing systems and meets future demand.',
  },
  {
    n: '05',
    name: 'Assets & Solutions',
    body: 'Proprietary software add-ons — including redaction, key management and hardware security modules — give you greater control and customisation.',
  },
  {
    n: '06',
    name: 'Ecosystem Management',
    body: 'Stay focused on the bigger picture while we handle the operation of your new blockchain networks and ecosystems using our proven functional expertise.',
  },
]

export const STACK_TRACKS = [
  {
    key: 'A',
    name: 'Research & Analysis',
    items: [
      'Research & Analysis',
      'Feasibility Study',
      'Competition Analysis',
      'Requirement Documentation',
      'High Level Estimation',
    ],
  },
  {
    key: 'B',
    name: 'Definition & Modeling',
    items: [
      'Functionality Breakdown',
      'UI/UX User Flow',
      'Financial & Tokenomics Modeling',
      'Detailed Estimation',
      'Project Roadmapping',
    ],
  },
]

export const STACK_TOOLS = [
  'Ethereum',
  'Solana',
  'Avalanche',
  'Algorand',
  'Hyperledger Fabric',
  'Hyperledger Indy',
  'Hyperledger Composer',
  'Hyperledger Aries',
  'Hyperledger Caliper',
  'Hyperledger Sawtooth',
  'MultiChain',
  'BlockExplorer',
  'Exonum',
  'Polkadot',
  'Parity',
  'NXT',
  'Sovrin',
  'Corda',
  'Hedera',
  'TRON',
  'Openchain',
  'BNB Smart Chain',
]

/* ================================================================== */
/* 4.2 — web3 advisory                                                */
/* ================================================================== */

export const WEB3_CAPABILITIES = [
  'Blockchain Implementation Rationale',
  'Industry Insights Integration',
  'Tokenomics Development',
  'Tech Stack Advice',
  'Financial Modeling',
  'Product Delivery & Project Management',
]

export const WEB3_OFFERINGS = [
  {
    name: 'IDO / STO / IEO — Marketing',
    items: [
      'Product Validation Analysis',
      'Roadmap & Marketing Strategy',
      'Brand, Web and Social Media Expertise',
      'Premium Placement in News Outlets',
      'International Bounty Program',
      'Reputation Management',
      'Digital Marketing',
      'Community Management',
      'Public Relations',
      'Airdrops',
    ],
  },
  {
    name: 'IDO / STO / IEO — Technical',
    items: [
      'Platform and Smart Contract Creation',
      'Coding, Testing and Implementation',
      'Major and Side Chain Experts',
      'Code Security Audit',
      'White Paper Creation',
      'Tokenomics',
    ],
  },
  {
    name: 'IDO / STO / IEO — Financial',
    items: [
      'Book Building and Book Running Services',
      'Escrow Services',
      'Multi-Sig Wallet Management',
      'Financial Reporting and Auditing',
      'Blockchain/Crypto Accounting',
      'Fund Administration',
    ],
  },
  {
    name: 'Post IDO / STO / IEO Services',
    items: [
      'HR Services for Business',
      'Financial Reporting',
      'Board Guidance',
      'Marketing and Product Placement',
      'Token Control',
      'Long Term Business Development',
    ],
  },
  {
    name: 'Accelerator',
    items: [
      'Capital Raise',
      'Launchpad Onboarding',
      'Partner Onboarding',
      'DEX/CEX Listing Advancement',
      'Market Making',
      'Sales Approach & Sales Logic',
      'Meetings with Investors',
      'Pitching Support',
      'Outreach Setup',
      'Advisors',
      'Token Metrics',
      'Design & Creative',
      'Pitch Deck & Elevator Pitch Deck',
      'Web Development',
    ],
  },
]

export const WEB3_PILLARS = [
  {
    name: 'Growth & Marketing',
    body: 'Growing conversions and revenue by creating innovative multi-channel campaign strategies and execution focused on SEO, content, community, SEA, emails, affiliate and brand.',
  },
  {
    name: 'Data & Tools Mastery',
    body: 'Tracking and testing to make data-driven decisions and optimise ROI, conversion rate and user experiences.',
  },
  {
    name: 'Product Strategy',
    body: 'Establishing and driving a product strategy and roadmap by analysing and prioritising key features based on customer insights, market research and segmentation.',
  },
  {
    name: 'UX Centric',
    body: 'Creating remarkable, intuitive customer experiences that drive engagement and conversion through mock-up and prototyping.',
  },
  {
    name: 'Comms & Collabs',
    body: 'Ability to influence, communicate and negotiate optimal business outcomes with stakeholders and executives, and drive implementation across cross-functional teams.',
  },
  {
    name: 'Business KPIs & Goals',
    body: 'Revenue-driven planning and execution of target-oriented marketing and product strategies from concept through to commercialisation.',
  },
]

/* ================================================================== */
/* 4.3 — legal advisory                                               */
/* ================================================================== */

export const LEGAL_SERVICES = [
  'Legal guidance on SEC cryptocurrency, Token and NFT regulations',
  'Token & NFT white paper legal services',
  'Token & NFT legal document preparation',
  'Guidance on virtual currency projects and regulatory engagement',
  'Token & NFT risk assessment',
  'Token & NFT funding assistance',
  'Intellectual property protection',
]

export const LEGAL_NOTE =
  "IBA's legal advisory is informed by our work through the Blockchain Governance Council, where policy, frameworks, compliance, security, taxation and standards are developed with members and partners across jurisdictions."

/** Required on the page. Marked as such so it cannot be dropped as filler. */
export const LEGAL_DISCLAIMER =
  'IBA facilitates access to qualified legal counsel and provides regulatory research and advisory support. Nothing on this page constitutes legal advice or creates an attorney-client relationship. Engagements are subject to a signed scope of work.'

/* ================================================================== */
/* 4.4 — RWA tokenization                                             */
/* ================================================================== */

export const RWA_LIFECYCLE = [
  'Legal wrapper',
  'Token design',
  'Financial modeling',
  'Issuance platform',
  'Distribution',
  'Post-listing governance',
]

/* ================================================================== */
/* 4.5 — white label solutions                                        */
/* ================================================================== */

export const WHITE_LABEL = [
  {
    group: 'Financial infrastructure',
    items: [
      {
        name: 'Direct Remittance',
        body: 'Blockchain-powered cross-border remittance platform in use by global banks and one of the largest currency exchanges.',
      },
      {
        name: 'Cross Border Trade Finance',
        body: 'Blockchain-powered corporate payment platform used for B2B payments.',
      },
      {
        name: 'Payment Solutions',
        body: 'Blockchain-powered wallet and payment processing platform.',
      },
      {
        name: 'Cryptocurrency Exchange',
        body: 'White label Bitcoin and cryptocurrency exchange trading platform with mobile wallet.',
      },
      {
        name: 'Bitcoin Payment Processor',
        body: 'Cryptocurrency payment processor software to start offering services to merchants accepting Bitcoin payments.',
      },
    ],
  },
  {
    group: 'Platforms & issuance',
    items: [
      { name: 'Blockchain Gaming Platform', body: 'A complete gaming platform stack.' },
      { name: 'ICO Solution Stack', body: 'A complete ICO solution and white label ICO platform.' },
      { name: 'Supply Chain Platform', body: 'Customisable supply chain platform.' },
      { name: 'Utility Coin Offering', body: 'Complete coin offering platform.' },
      {
        name: 'Security Token Offering',
        body: 'STO development stage and raise infrastructure.',
      },
      {
        name: 'Smart Contract Platform',
        body: 'Plug-and-play smart contract repository.',
      },
      {
        name: 'Blockchain IoT',
        body: 'Embedded solution for IoT to secure devices with blockchain-based immutable identity and reputation tracking.',
      },
    ],
  },
]

/* ================================================================== */
/* 4.6 — sector expertise                                             */
/* ================================================================== */

/**
 * VERIFY: the headline claims 16+ verticals and nine are on record. The brief
 * ran out mid-sentence in Social Media's list ("Web3 infrastructure & bridge"),
 * so both the tail of that panel and the remaining verticals are outstanding.
 * The page renders the count it actually has rather than the claim, and the
 * headline's "16+" is left as supplied.
 */
export const SECTORS = [
  {
    name: 'BFSI',
    items: [
      'Trade finance',
      'Securities issuance',
      'Derivatives settlement',
      'Dispute management',
      'Forex trade',
      'Fund processing',
      'Risk management',
      'Identity management',
      'Claims management',
      'Reinsurance',
      'Contract authentication',
      'Customer data-sharing',
      'Insurance marketplace',
      'Insurance records',
      'KYC',
      'P2P insurance',
    ],
  },
  {
    name: 'Supply Chain & Logistics',
    items: [
      'Blockchain automating systems',
      'Car sharing services',
      'Anti-counterfeit solutions',
      'Workflow management apps',
      'IoT-enabled data gathering systems',
      'Cargo track and trace',
      'Damage tracking',
      'Preventive maintenance',
      'Ticketing',
      'Customer data sharing',
      'Shipping documentation',
    ],
  },
  {
    name: 'Healthcare',
    items: [
      'Cold chain tracking',
      'Drug provenance',
      'Health records',
      'Organ registry',
      'Pharma track-and-trace',
      'Physician recertification',
      'Provider data management',
    ],
  },
  {
    name: 'E-Commerce & Retail',
    items: [
      'Distributed marketplace',
      'Food auditing',
      'Inventory control',
      'Loyalty programs',
      'Procurement optimization',
      'Supply chain traceability',
      'Blockchain-powered marketplaces',
      'Customer loyalty programs',
    ],
  },
  {
    name: 'E-Governance',
    items: [
      'Document flow management platforms',
      'Blockchain-based notarisation',
      'Immutable voting solutions',
      'Digital identity',
      'Asset registration',
      'Asset tracking',
      'Digital land and vehicle registry',
      'Digital currency',
      'Digital voting',
      'Food distribution',
    ],
  },
  {
    name: 'Manufacturing',
    items: [
      'Anti-counterfeiting',
      'Digital provenance',
      'Preventive maintenance',
      'Supply chain management',
      'Warranty and payments',
    ],
  },
  {
    name: 'Real Estate',
    items: [
      'STO dashboards',
      'Fractionalised RE assets',
      'Marketplace data protection',
      'Digital document verification',
      'Construction project management',
    ],
  },
  {
    name: 'Utilities',
    items: [
      'Electricity grid management',
      'Energy trading',
      'Shared equipment',
      'Green certification',
      'Produce logistics',
      'Wholesale energy supply',
    ],
  },
  {
    name: 'Social Media',
    /* the brief is cut off after "bridge" — the rest of this list is pending */
    pending: true,
    items: [
      'Blockchain-enabled contracting platforms',
      'Identity hijacking prevention',
      'Censorship & content theft',
      'Royalty management',
      'Web3 infrastructure & bridge',
    ],
  },
]
