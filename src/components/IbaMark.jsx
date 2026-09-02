/**
 * IbaMark.jsx
 * ------------------------------------------------------------------
 * Just the blocks of the IBA lockup — a 2x2 grid of I / chain link / B / A.
 *
 * The nav and footer use the supplied bitmap, which is right for a lockup that
 * sits still on a white bar. This is the mark for the one place the lockup has
 * to be ANIMATED: the coins interlock into it at the end of the About hero, and
 * a flat .webp cannot have its four cells arrive one at a time. Every cell
 * carries `data-cell` so a timeline can address them individually.
 */

export default function IbaMark({ className = '' }) {
  return (
    <span className={`ibamark ${className}`} aria-hidden="true">
      <span className="ibamark__cell ibamark__cell--i" data-cell>
        I
      </span>
      <span className="ibamark__cell ibamark__cell--link" data-cell>
        <svg viewBox="0 0 52 52" className="ibamark__link">
          <g fill="none" stroke="currentColor" strokeWidth="4.5" transform="rotate(-45 26 26)">
            <rect x="6" y="18" width="26" height="16" rx="8" />
            <rect x="20" y="18" width="26" height="16" rx="8" />
          </g>
        </svg>
      </span>
      <span className="ibamark__cell ibamark__cell--b" data-cell>
        B
      </span>
      <span className="ibamark__cell ibamark__cell--a" data-cell>
        A
      </span>
    </span>
  )
}
