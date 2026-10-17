/**
 * The partner list — one source for the home page's marquee and the
 * Ecosystem page's Key Partners wall.
 *
 * Logos in public/logos/partners come from the folder IBA supplied
 * ("logos for iba"); the three in public/logos/eco are each organisation's
 * own site icon. A partner with no `logo` shows a monogram.
 *
 * ⚠ HELD BACK from the supplied folder, pending confirmation:
 *   nexus_nodes_logo.jpeg   the artwork reads "Matter Labs", not Nexus Nodes
 *   1632936119627.jpeg      an "eZ" mark with no name
 *   1739422591472.jpeg      an "A" mark with no name
 * ⚠ "Power" is matched to 1720871479371.jpeg (a power-button mark) by its
 *   look alone — confirm.
 */

const L = (f) => `/logos/partners/${f}.jpg`

export const PARTNERS = [
  { name: 'TheBlock.', logo: '/logos/eco/theblock-ae.png' },
  { name: 'Token Asset Foundation (STO)', logo: L('token-asset-foundation') },
  { name: 'World Token Congress', logo: L('world-token-congress') },
  { name: 'Zoniqx', logo: '/logos/eco/zoniqx-com.png' },
  { name: 'Integra', logo: L('integra') },
  { name: 'Kula', logo: L('kula') },
  { name: 'T-Hub', logo: '/logos/eco/t-hub-co.png' },
  { name: 'India AI Alliance', logo: L('india-ai-alliance') },
  { name: 'Payomatix', logo: L('payomatix') },
  { name: 'Enlighten Capital', logo: L('enlighten-capital') },
  { name: 'Indian Startup Premier League', logo: L('ispl') },
  { name: 'Enterprise Quotient', logo: L('enterprise-quotient') },
  { name: 'NaapBooks', logo: L('naapbooks') },
  { name: 'Edon Global', logo: L('edon-global') },
  { name: 'HYPE Ventures', logo: L('hype-ventures') },
  { name: 'Zerodots', logo: L('zerodots') },
  { name: 'Uttung GCC', logo: L('uttung') },
  { name: 'Eyekyam', logo: L('eyekyam') },
  { name: 'Immverse AI', logo: L('immverse-ai') },
  { name: 'Mythyaverse', logo: L('mythyaverse') },
  { name: 'Power', logo: L('power') },
  { name: 'Web5 Nexus', logo: L('web5-nexus') },
  { name: 'ArthaChain', logo: L('arthachain') },
  { name: 'Edza AI', logo: L('edza-ai') },
  { name: 'Inner Compass Impact Fund', logo: L('inner-compass-impact-fund') },
  { name: 'nGRND', logo: L('ngrnd') },
  { name: 'Velocity Network Foundation', logo: L('velocity-network-foundation') },
  /* no logo supplied yet — shown as monograms on the Ecosystem page only */
  { name: 'The Circle' },
  { name: 'AgoraX' },
  { name: 'Ira Blocks' },
  { name: 'Adlam' },
  { name: 'Aasthi' },
  { name: 'Fab C Labs' },
  { name: 'Unify Platform AG' },
  { name: 'Block Intelligence' },
  { name: 'Ztudium' },
  { name: 'Zamindaar' },
  { name: 'Global Alliance for Ethical AI Innovation' },
]

/** two letters for a partner with no logo */
export const initials = (name) => {
  const w = name.replace(/[^A-Za-z0-9& ]/g, '').split(' ').filter(Boolean)
  return w.length === 1 ? w[0].slice(0, 2).toUpperCase() : (w[0][0] + w[1][0]).toUpperCase()
}
