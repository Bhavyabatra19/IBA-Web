/**
 * About — Message From the Founder.
 *
 * Two parts, so neither leaves a gap beside the other:
 *   · the introduction, full width: a large portrait on the left; on the
 *     right the opening line as a large quote and LinkedIn
 *   · the letter itself in one centred reading column, with one line pulled
 *     out large across it, and the signature
 *
 * Styles in brandbook.css (.fl2).
 */

import { Btn } from '../components/Kit'

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
