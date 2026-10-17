/**
 * 8.3 — the Connect page.
 *
 * For the reader who arrives from search or from the footer rather than from a
 * CTA — which means they have no topic, no page context and nothing pre-filled.
 * That is the whole reason this page exists alongside the modal: everyone else
 * gets the overlay with their answer already chosen.
 *
 * The four quick paths come first and each opens the modal with its topic set,
 * because a reader who knows which of the four they are has already answered
 * the form's hardest question by clicking, and should not then be handed a list
 * of twelve. The inline form underneath is the same component the modal holds —
 * same fields, same validation, same handler, as 8.4 requires.
 *
 * It is a plain page rather than a ServicePage: a form is a task, and the long
 * scrolled hero those pages open with would put the first field below the fold.
 * The Library's form pages made the same call for the same reason.
 */

import ReachOut from '../components/ReachOut'
import EnquiryForm from '../sections/EnquiryForm'
import { CONNECT_SUB, QUICK_PATHS } from '../enquiry'

export default function Connect() {
  return (
    <>
      <section className="section band band--dark cnx__hero">
        <div className="wrap">
          <p className="eyebrow">Connect With Us</p>
          <h1 className="h2 display cnx__title">Let the Journey Begin</h1>
          <p className="cnx__sub">{CONNECT_SUB}</p>

          <ul className="cnx__paths">
            {QUICK_PATHS.map((q) => (
              <li key={q.who}>
                <p className="cnx__pathWho">{q.who}</p>
                <p className="cnx__pathBody">{q.body}</p>
                {/* A button, not a link: it opens the form on this page rather
                    than going anywhere. `data-enquiry` carries the topic and
                    the delegated listener in Enquiry.jsx does the rest. */}
                <button
                  type="button"
                  className="btn btn--primary btn--sm"
                  data-enquiry={q.topic}
                >
                  {q.cta}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section band band--light cnx__main" id="enquiry">
        <div className="wrap cnx__grid">
          <div className="cnx__form">
            <h2 className="h2 display cnx__h">Send us an enquiry</h2>
            <p className="cnx__note">
              We reply within two working days. Every field marked with an asterisk is
              one we need in order to answer you.
            </p>
            <EnquiryForm />
          </div>

          <aside className="cnx__reach">
            <ReachOut />
          </aside>
        </div>
      </section>
    </>
  )
}
