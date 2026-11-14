/**
 * A membership card for each tier, in place of the shields (by request,
 * 11-13-2026; restyled 11-14-2026 to match the hero): a dark glass card
 * with a red neon rim, tilted and stacked over two cards beneath it, as in
 * the Membership hero render (public/images/membership-hero.webp), with the
 * tier's name on its face ("Club Class", "Premier Class", "Gold Class") and
 * a chip and line in the tier's metal. Pure SVG; the tilt and glow are in
 * brandbook.css (.tcard).
 */

const METALS = {
  bronze: { hi: '#ffd9bb', mid: '#d08a58', lo: '#7a4520' },
  silver: { hi: '#ffffff', mid: '#cfd3d9', lo: '#7b8089' },
  gold: { hi: '#fff4c2', mid: '#e3b73f', lo: '#8c6410' },
}

export default function TierCard({ metal = 'gold', label }) {
  const m = METALS[metal]
  const id = `tcard-${metal}`
  return (
    <span className={`tcard tcard--${metal}`} aria-hidden="true">
      <svg className="tcard__svg" viewBox="0 0 220 168" focusable="false">
        <defs>
          {/* the dark glass face */}
          <linearGradient id={`${id}-face`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2a1416" stopOpacity="0.96" />
            <stop offset="0.55" stopColor="#120a0b" stopOpacity="0.96" />
            <stop offset="1" stopColor="#3a0a0d" stopOpacity="0.96" />
          </linearGradient>
          <linearGradient id={`${id}-under`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#1c1012" stopOpacity="0.9" />
            <stop offset="1" stopColor="#2b0709" stopOpacity="0.9" />
          </linearGradient>
          {/* the neon rim: white catching the light top-left, red elsewhere */}
          <linearGradient id={`${id}-rim`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="0.3" stopColor="#ff3a40" />
            <stop offset="1" stopColor="#ff1a22" />
          </linearGradient>
          <linearGradient id={`${id}-sheen`} x1="0" y1="0" x2="0.8" y2="0.7">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.2" />
            <stop offset="0.35" stopColor="#ffffff" stopOpacity="0.03" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`${id}-metal`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={m.hi} />
            <stop offset="0.55" stopColor={m.mid} />
            <stop offset="1" stopColor={m.lo} />
          </linearGradient>
        </defs>

        {/* the cards beneath, as the stack in the hero */}
        <rect className="tcard__under" x="14" y="52" width="196" height="110" rx="12" fill={`url(#${id}-under)`} stroke="#ff2a33" strokeWidth="1.4" />
        <rect className="tcard__under" x="10" y="32" width="196" height="110" rx="12" fill={`url(#${id}-under)`} stroke="#ff2a33" strokeWidth="1.4" />

        {/* the card */}
        <rect x="6" y="8" width="196" height="116" rx="12" fill={`url(#${id}-face)`} stroke={`url(#${id}-rim)`} strokeWidth="2" />
        <rect x="6" y="8" width="196" height="116" rx="12" fill={`url(#${id}-sheen)`} />

        {/* chip in the tier's metal, the panel and pills as in the render */}
        <rect x="20" y="24" width="26" height="19" rx="3.5" fill={`url(#${id}-metal)`} />
        <path d="M20 33.5h26M33 24v19" stroke={m.lo} strokeOpacity="0.55" strokeWidth="1" />
        <rect x="112" y="22" width="76" height="26" rx="5" fill="#ffffff" fillOpacity="0.1" />
        <rect x="138" y="54" width="50" height="8" rx="4" fill="#ffffff" fillOpacity="0.1" />

        {/* the tier's name */}
        {label && (
          <text x="20" y="92" className="tcard__name" fill={`url(#${id}-metal)`}>
            {label}
          </text>
        )}
        <rect x="20" y="104" width="92" height="4" rx="2" fill="#ffffff" fillOpacity="0.16" />
        <text x="188" y="110" className="tcard__brand" textAnchor="end">
          IBA
        </text>
      </svg>
    </span>
  )
}
