/**
 * The closing call-to-action band, directly above the footer on every page
 * but home (whose own closing section, sections/GetInTouch.jsx, does the job).
 *
 * Compact (by request: smaller type, a new design): a slim black-to-red
 * panel with a small red eyebrow, the heading, one line, the topics as small
 * tags, and the button at the right. Styles in brandbook.css (.cta-band).
 */

const TOPICS = ['Consulting', 'Tokenization', 'Corridors', 'Membership', 'UAE Experience Center', 'Red Club']

export default function CtaBand() {
  return (
    <section className="cta-band" aria-labelledby="cta-band-title">
      <div className="cta-band__inner">
        <div className="cta-band__copy">
          <p className="cta-band__eyebrow">Talk to us</p>
          <h2 className="cta-band__title" id="cta-band-title">
            Let’s get started
          </h2>
          <p className="cta-band__text">
            Talk to our team about consulting, tokenization, corridors, membership
            <br />
            the UAE Experience Center or the Red Club.
          </p>
          <ul className="cta-band__tags" aria-label="Topics">
            {TOPICS.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
        <a className="cta-band__btn" href="/connect" data-enquiry="">
          Book a call <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  )
}
