/**
 * IBA's programmes and councils, as cards with their logos. Shown on the
 * About page as "IBA Initiatives: Our programs. Our commitment. Our impact",
 * just before the founder's note (moved from the Expertise page, 11-17).
 * An entry without a `logo` shows a monogram (`mono`).
 */

import { REGIONS_LINE } from './facts'

export const INITIATIVES = [
  { title: 'Tech4Good', logo: '/logos/initiatives/trim/t4g.png', sub: 'Technology in service of outcomes that matter', text: "IBA's impact initiative, applying blockchain and emerging technology to problems where the return is social rather than commercial. Anchors the alliance's SDG alignment.", href: '/initiatives#init-tech4good' },
  { title: 'Green Chain Protocol', logo: '/logos/initiatives/trim/green-chain.png', sub: 'Making green finance and governance verifiable', text: 'A blockchain ecosystem focused on ESG, aligned with COP28, showcasing and growing Web3 projects in sustainability.', href: '/initiatives#init-green-chain' },
  { title: 'Verifyble', logo: '/logos/initiatives/trim/verifyble.png', sub: 'Data security and digital asset management', text: "IBA's platform for data security and digital asset management, helping any organisation or individual secure, verify and manage data and digital assets on-chain.", href: '/initiatives#init-verifyble' },
  { title: 'IBA Red Club', logo: '/logos/initiatives/trim/red-club.png', sub: 'The talent pipeline for Web3 and AI', text: 'Certified programmes, on-campus labs, live industry projects, internships and placements.', href: '/initiatives#init-red-club' },
  { title: 'Web3 Corridor', logo: '/images/web3-global-corridor.jpg', sub: 'Global Innovation Corridor Initiative', text: 'A global innovation platform connecting ' + REGIONS_LINE + ' through innovation, technology, investment and partnerships.', href: '/initiatives#init-web3-corridor' },
  /* ⚠ India AI Alliance is left out until its description is supplied (by
     request: no placeholder copy on the page). Its logo is in the project:
     { title: 'India AI Alliance', logo: '/logos/partners/india-ai-alliance.jpg', sub: …, text: …, href: '/initiatives#init-india-ai-alliance' } */
  /* the two councils, with their logos (by request); text from the Ecosystem page */
  { title: 'Emerging Technology Council', logo: '/logos/initiatives/trim/etc.png', sub: 'Policy and community for new tech frontiers', text: "The apex body for India's technology industry, driving policy advocacy, research, knowledge, advisory and community building across newer tech frontiers.", href: '/ecosystem#communities' },
  { title: 'Blockchain Governance Council', logo: '/logos/initiatives/trim/bgc.png', sub: 'Standards, frameworks and compliance', text: 'An open global multi-stakeholder network co-developing solutions around policy, frameworks, compliance, security, taxation and standards.', href: '/ecosystem#communities' },
]

/* the order the carousel shows them in */
const ORDER = [
  'Web3 Corridor',
  'Blockchain Governance Council',
  'Emerging Technology Council',
  'Tech4Good',
  'Green Chain Protocol',
  'Verifyble',
  'IBA Red Club',
]

export const INITIATIVES_IN_ORDER = ORDER.map((name) => INITIATIVES.find((item) => item.title === name))
