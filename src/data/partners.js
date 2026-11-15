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
 * Zamindaar (the "eZ" mark), Fab C Labs and AdLunam Inc were supplied by IBA
 * separately; the white or grey lettering of Ira Blocks, Ztudium, Block
 * Intelligence and Fab C Labs is recoloured dark to read on white (Fab C
 * Labs also loses its black ground and its tagline, unreadable at tile size),
 * and Unify uses its V mark alone, since the name sits beneath it.
 *
 * `url` (optional) makes the partner's Ecosystem tile a link to its site,
 * opening in a new tab. Add one only for a site IBA has confirmed.
 */

const L = (f) => `/logos/partners/${f}.jpg`
/* `mark`: a cut-out copy of the logo (baked-in background removed) used in
   the home marquee, where the logos sit straight on the glass */
const M = (f) => `/logos/cutout/${f}.png`

export const PARTNERS = [
  { name: 'TheBlock.', logo: '/logos/eco/theblock-ae.png' },
  { name: 'Tokenized Asset Foundation', logo: L('token-asset-foundation'), mark: M('token-asset-foundation'), url: 'https://stofdn.com/' },
  { name: 'Zoniqx', logo: '/logos/eco/zoniqx-com.png', mark: M('zoniqx-com'), url: 'https://www.zoniqx.com/' },
  { name: 'Integra', logo: L('integra'), mark: M('integra') },
  { name: 'Kula', logo: L('kula'), mark: M('kula') },
  { name: 'T-Hub', logo: '/logos/eco/t-hub-co.png', mark: M('t-hub-co'), url: 'https://t-hub.co/' },
  { name: 'India AI Alliance', logo: L('india-ai-alliance'), mark: M('india-ai-alliance'), url: 'https://indiaaialliance.org/' },
  { name: 'Payomatix', logo: L('payomatix'), mark: M('payomatix') },
  { name: 'Enlighten Capital', logo: L('enlighten-capital'), mark: M('enlighten-capital') },
  { name: 'Indian Startup Premier League', logo: L('ispl'), mark: M('ispl') },
  { name: 'Enterprise Quotient', logo: L('enterprise-quotient'), mark: M('enterprise-quotient') },
  { name: 'NaapBooks', logo: L('naapbooks'), mark: M('naapbooks') },
  { name: 'Edon Global', logo: L('edon-global'), mark: M('edon-global') },
  { name: 'HYPE Ventures', logo: L('hype-ventures'), mark: M('hype-ventures') },
  { name: 'Zerodots', logo: L('zerodots'), mark: M('zerodots') },
  { name: 'Uttung GCC', logo: L('uttung'), mark: M('uttung') },
  { name: 'Eyekyam', logo: L('eyekyam'), mark: M('eyekyam') },
  { name: 'Immverse AI', logo: L('immverse-ai'), mark: M('immverse-ai') },
  { name: 'Mythyaverse', logo: L('mythyaverse'), mark: M('mythyaverse') },
  { name: 'Power', logo: L('power'), mark: M('power') },
  { name: 'Web5 Nexus', logo: L('web5-nexus'), mark: M('web5-nexus') },
  { name: 'ArthaChain', logo: L('arthachain'), mark: M('arthachain') },
  { name: 'Edza AI', logo: L('edza-ai'), mark: M('edza-ai') },
  { name: 'Inner Compass Impact Fund', logo: L('inner-compass-impact-fund'), mark: M('inner-compass-impact-fund') },
  { name: 'nGRND' },
  { name: 'Velocity Network Foundation', logo: L('velocity-network-foundation'), mark: M('velocity-network-foundation') },
  { name: 'TheCircle', logo: '/logos/partners/thecircle.png', url: 'https://the-block.com/the-circle/' },
  /* added later; the ones still without a logo show monograms on the
     Ecosystem page only */
  { name: 'AgoraX' },
  { name: 'Ira Blocks', logo: '/logos/partners/ira-blocks.png' },
  { name: 'AdLunam Inc', logo: '/logos/partners/adlunam.png' },
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
