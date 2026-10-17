/**
 * "Every Format, One Free Account" — what is behind the gate.
 *
 * It was seven chips: the format names, set as bare pills, directly under a
 * hero whose console already lists the same seven names. Two problems with
 * that, and the second is the real one. It repeated itself — and a chip can
 * only ever say a word, so the band was asking a reader to make an account on
 * the strength of the phrase "Policy Brief".
 *
 * So each format gets a card that says what it actually is at IBA, with a drawn
 * mark. The claim of this page is that what is inside is worth an email
 * address; this is the band where that claim has to be made, and it cannot be
 * made in one word.
 *
 * The marks are drawn rather than fetched, in the site's own line vocabulary —
 * one stroke weight, one accent, no fills except where a shape is solid. Seven
 * icon files would be seven requests for something that is a dozen paths.
 */

const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }

/**
 * One mark per format, keyed by the format's own name — so a format with no
 * mark renders its card without one rather than throwing.
 */
const MARKS = {
  Article: (
    <>
      <rect x="7" y="4" width="18" height="24" rx="2.5" />
      <path d="M11 11h10M11 16h10" />
      <path className="lib__fmtHot" d="M11 21h6" />
    </>
  ),
  Video: (
    <>
      <rect x="3" y="7" width="26" height="18" rx="3" />
      <path className="lib__fmtHot" d="M13.5 11.5l7 4.5-7 4.5z" fill="currentColor" />
    </>
  ),
  'Report / Whitepaper': (
    <>
      <rect x="7" y="4" width="18" height="24" rx="2.5" />
      <path d="M12 23v-5M20 23v-4" />
      <path className="lib__fmtHot" d="M16 23V12" />
    </>
  ),
  'Webinar / Recording': (
    <>
      <rect x="3" y="5" width="26" height="17" rx="2.5" />
      <path d="M12 27h8M16 22v5" />
      <circle className="lib__fmtHot" cx="16" cy="13.5" r="3" fill="currentColor" stroke="none" />
    </>
  ),
  'Policy Brief': (
    <>
      <rect x="5" y="3" width="16" height="22" rx="2.5" />
      <path d="M9 9h8M9 13h8M9 17h5" />
      <circle className="lib__fmtHot" cx="22.5" cy="22.5" r="6" fill="currentColor" stroke="none" />
      <path d="M20 22.6l1.8 1.8 3.2-3.5" stroke="#fff" strokeWidth="1.6" />
    </>
  ),
  Playbook: (
    <>
      <path d="M4 7c4-2 8-2 12 0 4-2 8-2 12 0v17c-4-2-8-2-12 0-4-2-8-2-12 0z" />
      <path className="lib__fmtHot" d="M16 7v17" />
    </>
  ),
  'Case Study': (
    <>
      <rect x="3" y="4" width="19" height="19" rx="2.5" />
      <path className="lib__fmtHot" d="M7 17l4-4 3 2 4-5" />
      <circle cx="22" cy="21" r="5.5" />
      <path d="M26 25l3 3" />
    </>
  ),
}

export default function Formats({ items }) {
  return (
    <ul className="lib__fmts">
      {items.map((f) => (
        <li className="lib__fmt" key={f.name} data-rise>
          {MARKS[f.name] && (
            <span className="lib__fmtIco" aria-hidden="true">
              <svg viewBox="0 0 32 32" {...S}>
                {MARKS[f.name]}
              </svg>
            </span>
          )}
          <h3 className="lib__fmtName">{f.name}</h3>
          {f.body && <p className="lib__fmtBody">{f.body}</p>}
        </li>
      ))}
    </ul>
  )
}
