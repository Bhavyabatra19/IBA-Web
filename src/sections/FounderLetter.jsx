/**
 * About — Message From the Founder.
 *
 * Two parts, so neither leaves a gap beside the other:
 *   · the introduction, full width: a large portrait on the left; on the
 *     right the opening line as a large quote, the founder's name and role,
 *     three figures and the regulators named in the letter, and LinkedIn
 *   · the letter itself in one centred reading column, with one line pulled
 *     out large across it, and the signature
 *
 * Every figure here is taken from the letter's own text. Styles in
 * brandbook.css (.fl2).
 */


const FACTS = [
  { value: '25', label: 'Years in banking' },
  { value: '90+', label: 'Ventures advised' },
  { value: '4', label: 'Continents' },
]

const REGULATORS = ['ADGM', 'VARA', 'DIFC', 'GIFT City']

export default function FounderLetter({ lead, paras, pull, linkedin }) {
  return (
    <div className="fl2">
      <div className="fl2__intro">
        <figure className="fl2__portrait" data-rise>
          <img
            src="/images/founder.jpg"
            alt="Raj Kapoor, Founder of the India Blockchain Alliance"
            width="1200"
            height="1149"
            loading="lazy"
            decoding="async"
          />
          <figcaption className="fl2__badge">
            <strong>Raj Kapoor</strong>
            <span>Founder, India Blockchain Alliance</span>
          </figcaption>
        </figure>

        <div className="fl2__side">
          <blockquote className="fl2__lead" data-rise>
            <span className="fl2__mark" aria-hidden="true">
              “
            </span>
            <p>{lead}</p>
          </blockquote>

          <ul className="fl2__facts" data-rise>
            {FACTS.map((f) => (
              <li key={f.label}>
                <strong>{f.value}</strong>
                <span>{f.label}</span>
              </li>
            ))}
          </ul>

          <div className="fl2__regs" data-rise>
            <span className="fl2__label">At the table with</span>
            <ul>
              {REGULATORS.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>

          <div data-rise>
            {/* the LinkedIn mark, linked to Raj Kapoor's profile (by request,
                in place of a "Connect on LinkedIn" button) */}
            <a
              className="fl2__linkedin"
              href={linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Raj Kapoor on LinkedIn"
              title="Raj Kapoor on LinkedIn"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <article className="fl2__letter">
        {paras.map((p, i) => (
          <div className="fl2__para" key={p.slice(0, 24)}>
            <p data-rise>{p}</p>
            {i === pull.after && (
              <p className="fl2__pull" data-rise>
                {pull.text}
              </p>
            )}
          </div>
        ))}

        <footer className="fl2__sign" data-rise>
          <img src="/images/founder-sq.jpg" alt="" width="56" height="56" loading="lazy" />
          <span>
            <span className="fl2__sig">Raj Kapoor</span>
            <span className="fl2__sig-role">Founder, India Blockchain Alliance</span>
          </span>
        </footer>
      </article>
    </div>
  )
}
