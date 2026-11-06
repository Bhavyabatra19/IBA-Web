/**
 * Expertise, The Outcome as a timeline (after the client's reference): a red
 * line across the middle with six dots, the numbered cards alternating above
 * and below it, each joined to its dot by a dashed connector. Odd items sit
 * above (dot near the card's left), even below (dot near its right), so the
 * dots step evenly along the line. On narrow screens it becomes a vertical
 * timeline. Hover lifts a card and lights its dot. Styles in brandbook.css
 * (.otl).
 */

export default function OutcomeTimeline({ items }) {
  return (
    <ol className="otl">
      {items.map((it, i) => (
        <li
          key={it.title}
          className={`otl__item otl__item--${i % 2 ? 'below' : 'above'}`}
          style={{ gridColumn: Math.floor(i / 2) + 1 }}
          data-rise
        >
          <span className="otl__num">{i + 1}.</span>
          <h3 className="otl__title">{it.title}</h3>
          <p className="otl__text">{it.text}</p>
        </li>
      ))}
    </ol>
  )
}
