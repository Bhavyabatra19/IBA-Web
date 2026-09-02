/**
 * The Education section, as content.
 *
 * Three pages — the chooser, the student door, the institution door — held here
 * for the same reason services.js holds the seven service pages: a page file
 * should say what shape its content takes, and this file says what it is.
 *
 * The Red Club's stat strip is NOT restated here. It is the same four figures
 * the home page and About already publish, so it is imported from content.js at
 * the point of use — a second copy is how "800+" and "850+" end up disagreeing
 * across three pages.
 */

/* ================================================================== */
/* 5.0 — the chooser                                                  */
/* ================================================================== */

/** Every education page's path, in one place, so the nav and the router agree. */
export const educationPath = (slug) => (slug ? `/education/${slug}` : '/education')

export const EDU_INTRO =
  'The Fourth Industrial Revolution is the integration of AI, robotics, IoT and big data into industry — blurring the lines between the physical, digital and biological worlds. The skills to operate in it are not optional. IBA builds them from both ends.'

/**
 * The two doors. Split by who is standing at them rather than by feature —
 * a student and a registrar are not shopping for the same thing, and asking
 * them to read one page and work out which half is theirs is the failure this
 * section exists to avoid.
 */
export const EDU_DOORS = [
  {
    key: 'student',
    who: "I'm a Student",
    audience: 'For students',
    name: 'IBA Red Club',
    body: 'Join the IBA Red Club. Certified training, live industry projects, mentorship, internships and placement assistance — with every credential issued to a blockchain-enabled career wallet you own.',
    cta: 'Explore IBA Red Club',
    href: '/education/red-club',
  },
  {
    key: 'institution',
    who: "I'm an Institution",
    audience: 'For institutions',
    name: 'Verifyble',
    body: 'Partner through Verifyble. Bring Blockchain and AI labs onto your campus, issue verifiable credentials at source, and position your institute as a regional leader in emerging tech.',
    cta: 'Explore Verifyble',
    href: '/education/verifyble',
  },
]

/**
 * What the section delivers, whichever door it is entered by — the bar in the
 * landing hero's console.
 *
 * Every term is named further down its own page and nowhere invented here:
 * training, live projects, research and placements are the Red Club's four
 * blocks; labs and credentials are Verifyble's two halves. It is a summary, so
 * it is the one list in this file that has to be checked against the pages it
 * summarises when either of them changes.
 */
export const EDU_STRANDS = [
  'Certified Training',
  'Live Projects',
  'Research',
  'On-Campus Labs',
  'Verifiable Credentials',
  'Internships',
  'Placements',
  'Faculty Development',
]

/* ================================================================== */
/* 5.1 — IBA Red Club, for students                                   */
/* ================================================================== */

export const RC_INTRO =
  "The IBA Red Club is where students stop reading about blockchain and AI and start shipping with them. Certified programs taught by practitioners, live projects with real problem statements, mentors from 14 countries, and credentials you carry with you — not ones that sit in someone else's database."

export const RC_BLOCKS = [
  {
    name: 'Training',
    body: 'World-class certified training programs across all blockchain concepts — technical and non-technical. Contextual content, expert-led live sessions, periodic assessment.',
  },
  {
    name: 'Projects',
    body: "Live projects for every enrolled student on a blockchain certification track. Real problem statements sourced from IBA's industry network, not textbook exercises.",
  },
  {
    name: 'Research',
    body: 'Blockchain-related research and consulting projects, run jointly with IBA and your institution — with the opportunity to contribute to published work and joint patents.',
  },
  {
    name: 'Placements',
    body: "Domestic and international placement recommendations and assistance, backed by IBA's enterprise and Web3 ecosystem.",
  },
]

export const RC_PROGRAM = [
  {
    name: 'Methodology',
    items: [
      'Contextual content',
      'Expert-led sessions',
      'Periodic assessment',
      'Certifications on blockchain',
      'Career assistance',
    ],
  },
  {
    name: 'Impact Value',
    items: [
      'Online and LIVE expert-led sessions',
      'Case studies from industry',
      'Capstone projects',
      'Hands-on approach',
      'In-depth trending skillsets',
    ],
  },
  {
    name: 'Career Assistance',
    items: [
      'CV building',
      'Question banks',
      'Interview preparation sessions',
      'Internship and placement assistance',
    ],
  },
]

export const RC_CREDENTIALS_LEDE =
  'Every IBA certification and badge is issued through the IBA Seal of Trust into a blockchain-enabled career wallet. That means:'

export const RC_CREDENTIALS = [
  {
    name: 'GreenCredentials',
    body: 'Secure credentials, badges and microcredentials issued directly to your wallet and portfolio.',
  },
  {
    name: 'Verifiable Credentials (VCs)',
    body: 'Usable for higher education applications and employment verification.',
  },
  {
    name: 'Portable by default',
    body: "Authenticate your academic records and achievements across platforms, without asking anyone's permission.",
  },
]

export const RC_ACCESS = [
  {
    name: 'Labs & Sandbox',
    body: 'Exclusive member access to blockchain, AI and metaverse labs and sandbox environments for hands-on exploration and experimentation.',
  },
  {
    name: 'Internships',
    body: 'Virtual and on-site internship opportunities for full-course students — domestic and international.',
  },
  {
    name: 'Mentorship',
    body: 'International and domestic mentors for project, research and academic guidance.',
  },
  {
    name: 'International Pathways',
    body: 'Pathway programs for blockchain students across Australia, Canada, the UK and the USA.',
  },
  {
    name: 'AI Career Tools',
    body: 'Skills Passport, mock interviews, multilingual practice sessions and automated resume feedback — built to move job readiness and soft skills, not just marks.',
  },
  {
    name: 'Networking',
    body: 'Verified professional networking, content creation and discovery on Web3 social platforms — community without data exploitation.',
  },
  {
    name: 'Learning Content',
    body: 'Skill-based micro-credentials, project-based learning modules and self-paced academic programs aligned to global education standards. Immersive, Web3-enabled courses on blockchain, AI and emotional wellness through gamified environments.',
  },
]

export const RC_WHY = [
  'World-class programs',
  'Live projects',
  'Internship opportunities',
  'International pathway programs',
  'Research and consulting opportunities',
  'World-class mentoring',
  'Employment and placements',
  'An industry-ready profile',
]

export const RC_JOIN = [
  {
    n: '01',
    name: 'Your campus is already a member',
    body: "If your campus already has an IBA Red Club Experience Center, register through your institution's coordinator and you're in.",
  },
  {
    n: '02',
    name: 'Your campus is not — yet',
    body: "Sign up as an individual member, or tell us who to talk to at your college. We'll take it from there.",
  },
]

/**
 * VERIFY: the brief supplies these answers as a placeholder and asks for them to
 * be confirmed before launch. The wording on placement is deliberately blunt —
 * assistance and recommendations, never a guarantee — and must not be softened.
 */
export const RC_FAQ = [
  {
    q: 'Do I need a coding background?',
    a: 'No — the program runs technical and non-technical tracks.',
  },
  {
    q: 'What does membership cost?',
    a: 'Red Club membership is charged per student. See the current bands, or ask us for the rate that applies to your cohort.',
  },
  {
    q: 'How long are the programs?',
    a: 'From integrated modules through to 3–6 month diplomas.',
  },
  {
    q: 'Is placement guaranteed?',
    a: 'No. IBA provides placement assistance and recommendations. It is not a placement guarantee, and nobody at IBA will tell you otherwise.',
  },
  {
    q: "Can I join if my college isn't a partner?",
    a: 'Yes — individual membership is available.',
  },
]

/* ================================================================== */
/* 5.2 — Verifyble, for institutions                                  */
/* ================================================================== */

export const VFY_INTRO = [
  "With the rapid advancement of artificial intelligence and its transformative impact across industries, institutions need more than a guest lecture series. Verifyble is IBA's institutional membership and credentialing infrastructure — a hub for research, innovation and skill development that sits inside your campus and carries your name alongside ours.",
  'Developed in partnership with global blockchain industry organisations, Verifyble covers two things at once: the credentials your learners carry out, and the labs, faculty capability and industry connections that make those credentials mean something.',
]

export const VFY_CREDENTIALING = [
  'The IBA Seal of Trust — the standard behind every IBA certification and badge',
  'Blockchain-enabled career wallets — learners hold and carry their own records',
  'GreenCredentials — secure credentials, badges and microcredentials issued to on-chain wallets and portfolios',
  'Verifiable Credentials (VCs) — for higher education and employment verification, authenticated across platforms',
  'A platform for your institute to issue blockchain credentials under its own name',
]

export const VFY_EXPERIENCE_CENTERS =
  'On-campus Blockchain and AI labs, run and managed by IBA, delivering training, live projects, FDPs and research capability.'

/**
 * The three tiers, as a table because they are one: the same two questions
 * answered three times over.
 */
export const VFY_TIERS = {
  head: ['Tier', "Who it's for", "What's included"],
  rows: [
    ['IBA Alpha', 'Institutions entering the ecosystem', 'Base membership, community access, awareness webinars'],
    ['IBA Premium', 'Institutions scaling emerging tech capability', 'Full advisory and program services'],
    [
      'IBA Red Club',
      'Institutions leading in frontier technology',
      'Everything in Premium, plus a full on-campus Experience Center with Blockchain and AI labs and access to advanced Web3 infrastructure',
    ],
  ],
}

export const VFY_OBJECTIVES = [
  {
    name: 'Research & Development',
    items: [
      'Emerging tech research and development excellence',
      'Establish the university as a tech enabler',
      'Academic collaborations',
    ],
  },
  {
    name: 'Training',
    items: [
      'Bespoke training programs aligned to curriculum and industry',
      'Establish industry-standard best practices',
    ],
  },
  {
    name: 'Industry Connect',
    items: [
      'Problem statements and industry-specific collaborative research',
      'Emerging tech partnerships',
      'Industry trends and insights',
    ],
  },
]

export const VFY_LABS = [
  {
    name: 'Blockchain Lab',
    items: [
      'Access to proprietary blockchain smart contract auditing tools',
      'Industry-grade blockchain development environment setup',
      'Faculty Development Programs (FDPs)',
      'Student workshops and certification programs',
      'Live project exposure and internship facilitation',
      'Tech mentorship and support throughout the academic year',
      'All certifications and badges issued through the IBA Seal of Trust into blockchain-enabled career wallets',
    ],
  },
  {
    name: 'AI Lab',
    items: [
      'Access to AI coding environments — Python, Jupyter and more',
      'Generative AI tools: image generation, text summarisers, code generation',
      'Industry-grade projects across Computer Vision, NLP and ML Ops',
      'Faculty FDPs on prompt engineering, ML and DL',
      'Real-world datasets and case studies for student labs',
      'Workshops on ChatGPT, LangChain, TensorFlow, PyTorch and Hugging Face',
    ],
  },
]

export const VFY_ADDONS = [
  'Blockchain curriculum co-creation',
  'Hackathon and startup incubation support',
  'Certification program with external accreditation',
  'Blockchain node setup for advanced labs',
  'Metaverse Experience Lab',
  'AI Lab with project',
  'LLM integration and private ChatGPT lab',
  'AI hackathon / ideathon setup',
  'GPU node as a service (on-premise)',
  'Startup incubation and showcase',
  'Joint FDPs on Blockchain and AI integration',
  'Shared IBA–Red Club branding with the institution',
]

export const VFY_VALUE = [
  {
    name: 'Customised Programs',
    body: 'Bespoke emerging tech programs: integrated modules, MBA Emerging Tech, tech programs, 3–6 month diplomas and customised modules.',
  },
  {
    name: 'Internships',
    body: 'Internship opportunities for full-course students, virtual and on-site, domestic and international.',
  },
  {
    name: 'Mentorship',
    body: 'International and domestic mentors for students; project, research and academic mentorship.',
  },
]

/**
 * The outcome, and the vehicle that gets there. The brief sets these as two
 * columns and they are read as pairs — an ambition on its own is a slogan, and
 * a program on its own is a line item.
 */
export const VFY_OUTCOME = [
  {
    outcome: 'Position the institute as a leader in emerging tech innovation',
    name: 'Tech Accelerator',
    body: 'Accelerators for products, services and solutions; tech entrepreneurship programs.',
  },
  {
    outcome: 'Establish credible research papers for industry',
    name: 'Consulting Projects',
    body: 'Undertake joint research and consulting assignments with IBA.',
  },
  {
    outcome: 'Establish joint tech patents',
    name: 'International Pathway',
    body: 'Pathway programs for blockchain students across Australia, Canada, the UK and the USA.',
  },
]

export const VFY_BENEFITS = [
  'World-class partnerships',
  'Low-cost models',
  'Course customisation opportunities',
  'Joint research and consultancy opportunities',
  'Joint certification opportunities',
  'International event participation',
  'A blockchain-enabled university',
  'Higher campus placement',
]

export const VFY_REVENUE = [
  {
    name: 'Corporate Training',
    body: 'The Experience Center becomes a world-class corporate training venue offering a range of corporate programs.',
  },
  {
    name: 'Consulting Projects',
    body: 'Offer world-class consulting services to enterprises from your own campus.',
  },
  {
    name: 'International Networking',
    body: 'National and international networking and speaking events, and the opportunity to contribute to international projects.',
  },
]

export const VFY_MATRIX = [
  {
    name: 'IBA Delivers',
    items: [
      'Courses and course integrations',
      'Hands-on projects',
      'Problem statements',
      'Internships',
      'Placement assistance',
      'Industry–academia connect',
      'Joint research opportunities',
      'Mentoring and career guidance',
      'Executive program curation',
    ],
  },
  {
    name: 'The Institution Provides',
    items: [
      'Space and logistics to run the Experience Center',
      'Equipment, internet connectivity, cloud storage',
      'Promotion of all programs among students',
      'Faculty availability, by mutual convenience, for on-site training',
      'Support for IBA fests and hackathons on campus',
      'Maintenance of trained faculty for IBA lab technology',
    ],
  },
]

export const VFY_SCOPE = [
  {
    name: 'Inclusions',
    items: [
      'Starter pack of awareness webinars',
      'All open-source software',
      'Mentorship',
      'Design and layout',
      'Assistance in consulting and research projects',
      'Assistance in internships (domestic and international)',
      'Live projects',
      'Platform for the institute to issue blockchain credentials',
      'Placement assistance',
    ],
  },
  {
    name: 'Exclusions',
    items: [
      'Red Club membership fees',
      'Paid IBA membership services',
      'Paid software, if needed',
      'Courses (online / on-site)',
      'Certification fees',
      'Blockchain credentialing fees',
      'Guest lectures and faculty',
      'Train-the-trainer program',
    ],
  },
]

/** What IBA operates and manages, at an annual cost to the institution. */
export const VFY_ENGAGEMENT = [
  {
    name: 'Blockchain Lab',
    items: [
      'Unlimited access to the smart contract auditing tool',
      'Annual support for 3 FDPs and 3 student workshops',
      'Live project and internship coordination',
      'Technical mentorship and ticket-based query resolution',
    ],
  },
  {
    name: 'AI Lab',
    items: [
      'AI lab setup on cloud (JupyterHub + VSCode)',
      'Annual support for 3 FDPs and 3 student workshops',
      'Project-based learning and mentorship',
      'Tool licensing and support',
    ],
  },
]

export const VFY_ENGAGEMENT_NOTE =
  'Institution deliverables, both labs: an on-premises lab of 25 systems (8GB RAM, i5, 512GB SSD, stable internet) and one faculty point of contact.'

/**
 * The terms, not the figures.
 *
 * The brief is explicit that pricing does not go on the page — the bands, the
 * per-student fee and the surcharge all sit behind Request Pricing. What is
 * published here is what a registrar needs in order to decide whether to ask.
 */
export const VFY_TERMS = [
  'Annual charges based on cohort size, in bands of up to 25 students',
  'IBA Red Club membership fee charged per student',
  'VAT and taxes extra as applicable',
  'Costs cover one-time software only',
  'Contract period: 2 years',
  'Incremental increase of 15% on annual charges per year',
  'Surcharge for bespoke academic programs, on request',
]
