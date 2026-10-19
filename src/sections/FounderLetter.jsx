/**
 * About — Message From the Founder.
 *
 * One row: the portrait on the left; on the right the opening line as a
 * quote, a short note (lines kept word for word from the founder's letter)
 * and LinkedIn — sized so the text runs the height of the photo.
 *
 * Styles in brandbook.css (.fl2).
 */

import { Btn } from '../components/Kit'

export default function FounderLetter({ lead, paras, linkedin }) {
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

          <div className="fl2__note">
            {paras.map((p) => (
              <p data-rise key={p.slice(0, 24)}>
                {p}
              </p>
            ))}
          </div>

          <div data-rise>
            <Btn href={linkedin} variant="ghost">
              Connect on LinkedIn <span aria-hidden="true">→</span>
            </Btn>
          </div>
        </div>
      </div>
    </div>
  )
}
