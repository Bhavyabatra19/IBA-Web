/**
 * A tier medal for the Web360 Club cards (Bronze, Silver, Gold), drawn after
 * the client's reference: a metal medal with a raised rim and a raised star,
 * hung on a two-tone ribbon. Pure SVG, so it stays sharp at any size; each
 * metal is a set of gradients. Styles in brandbook.css (.medal).
 */

const METALS = {
  gold: { hi: '#fff3b8', mid: '#e3b73f', lo: '#8c6410', rim: '#b8871d', ribbon: '#c99b2e', band: '#e9e6df' },
  silver: { hi: '#ffffff', mid: '#c9ccd2', lo: '#6f747c', rim: '#9a9ea6', ribbon: '#a7abb2', band: '#eceff2' },
  bronze: { hi: '#f6c7a3', mid: '#b97448', lo: '#5e3016', rim: '#8e5130', ribbon: '#a8643f', band: '#e9ddd5' },
}

export default function TierMedal({ metal = 'gold' }) {
  const m = METALS[metal]
  const id = `medal-${metal}`
  return (
    <svg className={`medal medal--${metal}`} viewBox="0 0 64 80" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={`${id}-face`} cx="38%" cy="32%" r="75%">
          <stop offset="0" stopColor={m.hi} />
          <stop offset="0.45" stopColor={m.mid} />
          <stop offset="1" stopColor={m.lo} />
        </radialGradient>
        <linearGradient id={`${id}-rim`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={m.hi} />
          <stop offset="0.5" stopColor={m.rim} />
          <stop offset="1" stopColor={m.lo} />
        </linearGradient>
        <linearGradient id={`${id}-star`} x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0" stopColor={m.hi} />
          <stop offset="0.6" stopColor={m.mid} />
          <stop offset="1" stopColor={m.lo} />
        </linearGradient>
      </defs>
      {/* the ribbon: a strap behind the medal, its two tails below */}
      <path d="M20 2h24v26H20Z" fill={m.ribbon} />
      <path d="M27 2h10v26H27Z" fill={m.band} opacity="0.85" />
      <path d="M17 50 12 76l9-5 6 7 4-26Z" fill={m.ribbon} />
      <path d="M47 50l5 26-9-5-6 7-4-26Z" fill={m.ribbon} />
      <path d="M17 50 12 76l9-5 6 7 4-26Z" fill="#000" opacity="0.18" />
      {/* the medal: rim, face, inner ring, star */}
      <circle cx="32" cy="40" r="22" fill={`url(#${id}-rim)`} />
      <circle cx="32" cy="40" r="18.5" fill={`url(#${id}-face)`} />
      <circle cx="32" cy="40" r="15" fill="none" stroke={m.lo} strokeOpacity="0.35" strokeWidth="1" />
      <path
        d="M32 29.5l3.1 6.6 7.2.8-5.4 4.9 1.5 7.1L32 45.3l-6.4 3.6 1.5-7.1-5.4-4.9 7.2-.8Z"
        fill={`url(#${id}-star)`}
        stroke={m.lo}
        strokeOpacity="0.45"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
      {/* a highlight across the top of the rim */}
      <path d="M15 33a18 18 0 0 1 22-14" fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}
