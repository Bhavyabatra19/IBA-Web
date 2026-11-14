/**
 * The partner list, one source for the home page's marquee and the
 * Ecosystem page's Key Partners wall.
 *
 * Logos in public/logos/partners come from the folder IBA supplied
 * ("logos for iba"); the three in public/logos/eco are each organisation's
 * own site icon. A partner with no `logo` shows a monogram.
 *
 * ⚠ HELD BACK from the supplied folder, pending confirmation:
 *   nexus_nodes_logo.jpeg   the artwork reads "Matter Labs", not Nexus Nodes
 *   1739422591472.jpeg      an "A" mark with no name
 * ⚠ "Power" is matched to 1720871479371.jpeg (a power-button mark) by its
 *   look alone, confirm.
 * Ira Blocks, Aasthi, Unify Platform AG, Ztudium, Block Intelligence,
 * Zamindaar (the "eZ" mark) and Fab C Labs were supplied by IBA
 * separately; the white or grey lettering of Ira Blocks, Ztudium, Block
 * Intelligence and Fab C Labs is recoloured dark to read on white (Fab C
 * Labs also loses its black ground and its tagline, unreadable at tile size),
 * and Unify uses its V mark alone, since the name sits beneath it.
 */

const L = (f) => `/logos/partners/${f}.jpg`

export const PARTNERS = [
  { name: 'TheBlock.', logo: '/logos/eco/theblock-ae.png' },
  { name: 'Tokenized Asset Foundation', logo: L('token-asset-foundation') },
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
  { name: 'TheCircle', logo: '/logos/partners/thecircle.png' },
  /* added later; the ones still without a logo show monograms on the
     Ecosystem page only */
  { name: 'AgoraX' },
  { name: 'Ira Blocks', logo: '/logos/partners/ira-blocks.png' },
  { name: 'AdLunam Inc' },
  { name: 'Aasthi', logo: '/logos/partners/aasthi.png' },
  { name: 'Fab C Labs', logo: '/logos/partners/fab-c-labs.png' },
  { name: 'Unify Platform AG', logo: '/logos/partners/unify-platform.png' },
  { name: 'Block Intelligence', logo: '/logos/partners/block-intelligence.png' },
  { name: 'Ztudium', logo: '/logos/partners/ztudium.png' },
  { name: 'Zamindaar', logo: '/logos/partners/zamindaar.png' },
  { name: 'Global Alliance for Ethical AI Innovation' },
]

/** two letters for a partner with no logo */
export const initials = (name) => {
  const w = name.replace(/[^A-Za-z0-9& ]/g, '').split(' ').filter(Boolean)
  return w.length === 1 ? w[0].slice(0, 2).toUpperCase() : (w[0][0] + w[1][0]).toUpperCase()
}
