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

import { Btn } from '../components/Kit'

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
            <Btn href={linkedin} variant="ghost">
              Connect on LinkedIn <span aria-hidden="true">→</span>
            </Btn>
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
