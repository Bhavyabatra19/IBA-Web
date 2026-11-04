const METALS = {
  bronze: { light: '#f6c7a3', mid: '#b97448', dark: '#5e3016', edge: '#8e5130' },
  silver: { light: '#ffffff', mid: '#c9ccd2', dark: '#6f747c', edge: '#9a9ea6' },
  gold: { light: '#fff1b3', mid: '#d9b44a', dark: '#8c6410', edge: '#b8871d' },
}

export default function TierShield({ metal }) {
  const colors = METALS[metal]
  const id = `tier-shield-${metal}`
  return (
    <svg className={`mbr-tier__shield mbr-tier__shield--${metal}`} viewBox="0 0 64 72" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-edge`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor={colors.light} />
          <stop offset=".5" stopColor={colors.edge} />
          <stop offset="1" stopColor={colors.dark} />
        </linearGradient>
        <linearGradient id={`${id}-face`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor={colors.light} />
          <stop offset=".48" stopColor={colors.mid} />
          <stop offset="1" stopColor={colors.dark} />
        </linearGradient>
      </defs>
      <path d="M32 3 58 12v21c0 17-10 29-26 36C16 62 6 50 6 33V12Z" fill={`url(#${id}-edge)`} />
      <path d="M32 8 53 15v17c0 14-8 24-21 31-13-7-21-17-21-31V15Z" fill={`url(#${id}-face)`} stroke="#fff" strokeOpacity=".78" strokeWidth="1.4" />
      <path d="m32 18 4.1 9.2 10 .8-7.6 6.5 2.5 9.7-9-5.1-9 5.1 2.5-9.7-7.6-6.5 10-.8Z" fill="#fff" fillOpacity=".78" />
      <path d="M32 9v52" stroke="#fff" strokeOpacity=".2" />
    </svg>
  )
}
