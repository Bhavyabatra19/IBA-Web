/**
 * India, picked out on the site's map images (by request: India highlighted
 * more prominently than the other countries). A red map pin, outlined in
 * white so it reads on a red map, standing on India's position (a share of
 * the image), with a soft glow at its foot. An optional glass label card sits
 * beside it (`card="right"`) or above it (`card="above"`) on a thin leader;
 * where the map already names India, leave the card off. The pin bobs gently.
 * The maps are flat artwork, so the marker sits over them rather than
 * changing them. Styles in brandbook.css (.inp). Reduced motion: still.
 */

export default function IndiaPulse({ x, y, label = 'India', sub, card, cardSm, small }) {
  return (
    <span className={`inp${small ? ' inp--small' : ''}`} style={{ left: `${x}%`, top: `${y}%` }} aria-hidden="true">
      <span className="inp__glow" />
      <span className="inp__float">
        <svg className="inp__pin" viewBox="0 0 24 32">
          <path d="M12 1.5C6.2 1.5 1.8 5.8 1.8 11.4 1.8 19 12 30.5 12 30.5s10.2-11.5 10.2-19.1C22.2 5.8 17.8 1.5 12 1.5Z" />
          <circle cx="12" cy="11.2" r="4" />
        </svg>
        {card && (
          <span className={`inp__card inp__card--${card}${cardSm ? ` inp__card--sm-${cardSm}` : ''}`}>
            <span className="inp__leader" />
            <b>{label}</b>
            {sub && <small>{sub}</small>}
          </span>
        )}
      </span>
    </span>
  )
}
