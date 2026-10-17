/**
 * The founder's line. Light band.
 *
 * One quote, set large, with the attribution under it — the book's Quote style
 * from section 03: 28/38, a red 4px rule above, and the name and role beneath.
 *
 * It sits directly under the hero because that is where the layout puts it, and
 * the order is right: the hero says what the alliance is, and this says why
 * anyone started it. A claim followed by a reason.
 *
 * The portrait is the founder's photograph as supplied by the client
 * (public/images/founder.jpg).
 */

import { useLayoutEffect, useRef } from 'react'
import { gsap, revealLines, revealRise, reducedMotion } from '../lib/scroll'
import { Go } from './service/ServiceBlocks'

export default function Founder() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const el = root.current
    const ctx = gsap.context(() => {
      if (reducedMotion()) return
      revealLines(el, { trigger: el })
      revealRise(el, { trigger: el })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="fnd section band band--light" ref={root} id="founder">
      <div className="wrap">
        <div className="fnd__card" data-rise>
          {/* The portrait panel: the founder's photograph, edge to edge */}
          <figure className="fnd__portrait">
            <img
              className="fnd__photo"
              src="/images/founder.jpg"
              alt="Raj Kapoor, Founder of the India Blockchain Alliance"
              width="1200"
              height="1149"
              loading="lazy"
              decoding="async"
            />
            <figcaption className="fnd__caption">
              <span className="fnd__name">Raj Kapoor</span>
              <span className="fnd__role">Founder, India Blockchain Alliance</span>
            </figcaption>
          </figure>

          <div className="fnd__copy">
            <p className="eyebrow" data-rise>
              The Founder
            </p>
            <h2 className="fnd__title display" data-clip>
              <span className="line">
                <span className="line__inner">The inspiration behind</span>
              </span>
              <span className="line">
                <span className="line__inner">
                  the <em>alliance.</em>
                </span>
              </span>
            </h2>

            <blockquote className="fnd__quote" data-rise>
              <span className="fnd__mark" aria-hidden="true">
                “
              </span>
              <p>
                There is a moment in every industry when someone has to stop watching
                the future arrive, and start building it. This is that moment. And the
                India Blockchain Alliance is that decision.
              </p>
            </blockquote>

            <div className="fnd__sign" data-rise>
              <span className="fnd__sign-name">
                Raj Kapoor
                <small>Founder</small>
              </span>
              <Go className="btn btn--ghost fnd__go" href="/about#team">
                Meet the Founder <span aria-hidden="true">→</span>
              </Go>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
