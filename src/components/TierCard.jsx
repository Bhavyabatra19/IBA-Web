/**
 * A tier card for the membership tiers (Bronze, Silver, Gold), replacing the
 * shields (by request, 11-13-2026): a glowing glass card in the tier's metal,
 * tilted like the cards in the Membership hero render
 * (public/images/membership-hero.webp), with a chip, a panel and lines, and a
 * second card glowing beneath it. Pure SVG; the tilt and glow are in
 * brandbook.css (.tcard).
 */

const METALS = {
  bronze: { hi: '#ffd9bb', mid: '#c98352', lo: '#6e3a1b', glow: '#e08a4f' },
  silver: { hi: '#ffffff', mid: '#cfd3d9', lo: '#7b8089', glow: '#dfe6f0' },
  gold: { hi: '#fff4c2', mid: '#e3b73f', lo: '#8c6410', glow: '#f2c94c' },
}

export default function TierCard({ metal = 'gold' }) {
  const m = METALS[metal]
  const id = `tcard-${metal}`
  return (
    <span className={`tcard tcard--${metal}`} style={{ '--tcard-glow': m.glow }} aria-hidden="true">
      <svg className="tcard__svg" viewBox="0 0 120 92" focusable="false">
        <defs>
          <linearGradient id={`${id}-face`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={m.hi} stopOpacity="0.95" />
            <stop offset="0.5" stopColor={m.mid} stopOpacity="0.85" />
            <stop offset="1" stopColor={m.lo} stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id={`${id}-under`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={m.mid} stopOpacity="0.45" />
            <stop offset="1" stopColor={m.lo} stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id={`${id}-rim`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.45" stopColor={m.hi} stopOpacity="0.5" />
            <stop offset="1" stopColor={m.glow} />
          </linearGradient>
          <linearGradient id={`${id}-sheen`} x1="0" y1="0" x2="1" y2="0.6">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="0.4" stopColor="#ffffff" stopOpacity="0.08" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* the card beneath, as the stack in the hero */}
        <rect x="14" y="30" width="96" height="58" rx="8" fill={`url(#${id}-under)`} stroke={m.glow} strokeOpacity="0.7" strokeWidth="1" />
        {/* the card */}
        <rect x="6" y="6" width="100" height="62" rx="8" fill={`url(#${id}-face)`} stroke={`url(#${id}-rim)`} strokeWidth="1.6" />
        <rect x="6" y="6" width="100" height="62" rx="8" fill={`url(#${id}-sheen)`} />
        {/* chip, panel and lines */}
        <rect x="15" y="17" width="16" height="12" rx="2.5" fill="#ffffff" fillOpacity="0.7" />
        <path d="M15 23h16M23 17v12" stroke={m.lo} strokeOpacity="0.35" strokeWidth="0.8" />
        <rect x="46" y="15" width="50" height="20" rx="3" fill="#ffffff" fillOpacity="0.38" />
        <rect x="15" y="44" width="56" height="4" rx="2" fill="#ffffff" fillOpacity="0.55" />
        <rect x="15" y="54" width="34" height="4" rx="2" fill="#ffffff" fillOpacity="0.4" />
        <rect x="78" y="52" width="18" height="8" rx="2" fill="#ffffff" fillOpacity="0.4" />
      </svg>
    </span>
  )
}
