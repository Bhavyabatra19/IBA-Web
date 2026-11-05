/**
 * The IBA Framework — its four dimensions, each with its number, icon
 * (24-unit line drawing) and description. Shown on About as the site's
 * standard card grid (by request: the section laid out like the rest of the
 * site); it replaces the earlier hub-and-pills graphic (IbaFramework.jsx).
 */

export const FRAMEWORK = [
  {
    title: 'Interoperable Web3 Ecosystem',
    tone: 'light',
    text: 'IBA helps organizations navigate diverse jurisdictions and unlock cross-border opportunities in the Web3 economy. Connecting policymakers, institutions, investors, technology providers, and innovators, we enable market entry, advance tokenization initiatives, and foster trusted pathways for blockchain adoption—bridging local ecosystems to build a more connected, interoperable global digital economy.',
    icon: (
      <>
        <path d="M12 3.5 16 6v4.5l-4 2.5-4-2.5V6Z" />
        <path d="M5 12l3 2v3.5l-3 2-3-2V14ZM19 12l3 2v3.5l-3 2-3-2V14Z" />
        <path d="M8 14l1.5-1M16 14l-1.5-1" />
      </>
    ),
  },
  {
    title: 'Decentralized Global Focus',
    tone: 'dark',
    text: 'IBA combines on-the-ground presence, regulatory expertise, and institutional partnerships across emerging and established markets to build cross-border Web3 Corridors. Connecting jurisdictions, global financial markets, capital, technology, and talent, we create structured pathways for market access, cross-border investment, and tokenization of real-world assets—bridging traditional finance and decentralized ecosystems to unlock institutional opportunities and accelerate the growth of an interconnected global digital economy.',
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.6 2.6 3.9 5.6 3.9 9s-1.3 6.4-3.9 9c-2.6-2.6-3.9-5.6-3.9-9S9.4 5.6 12 3ZM4.5 7.5h15M4.5 16.5h15" />
      </>
    ),
  },
  {
    title: 'Resource & Sectoral Expertise',
    tone: 'light',
    text: 'Mobilize and strengthen talent, capabilities, and industry expertise needed to accelerate blockchain adoption and tokenization at scale. Through capacity building, industry-led training, strategic consulting, advisory, and mentoring, IBA empowers organizations and professionals to identify high-value use cases, develop sector-specific Web3 solutions, and translate innovation into real-world applications—driving adoption, unlocking new opportunities, and scaling impact across industries and global ecosystems.',
    icon: (
      <>
        <circle cx="12" cy="8" r="3" />
        <path d="M6.5 19c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5" />
        <circle cx="5" cy="9.5" r="2.2" />
        <path d="M1.5 18c0-2.2 1.6-4 3.8-4.2" />
        <circle cx="19" cy="9.5" r="2.2" />
        <path d="M22.5 18c0-2.2-1.6-4-3.8-4.2" />
      </>
    ),
  },
  {
    title: 'Policy, Advocacy, and Standards',
    tone: 'dark',
    text: 'Advance responsible Web3 adoption by shaping regulatory frameworks, contributing to global blockchain standards and fostering policy dialogue among governments, regulators, institutions and industry leaders. IBA promotes regulatory clarity, interoperability and trusted frameworks for blockchain innovation and tokenization, helping align emerging technologies with evolving market needs. Guided by the UN Sustainable Development Goals (SDGs) and anchored by Tech Zero, IBA encourages sustainable, inclusive and responsible Web3 initiatives—connecting policy, technology and real-world impact to support a more transparent, accessible and sustainable digital economy.',
    icon: (
      <>
        <path d="M13 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h5" />
        <path d="M13 3l5 5h-5Z" />
        <path d="M8 10h5M8 13.5h3" />
        <path d="M17 12.5l4 1.5v3c0 2.4-1.7 4-4 4.8-2.3-.8-4-2.4-4-4.8v-3Z" />
        <path d="m15.4 17.3 1.2 1.2 2.2-2.4" />
      </>
    ),
  },
]
