/**
 * 8.2 — Or reach us directly.
 *
 * The left pane of the enquiry modal, and the same block again as a section on
 * the Connect page. Four channels, one availability line, and every value comes
 * from CONTACT in nav.js — which the footer and the closing band also read, so
 * a number corrected once is corrected in five places.
 *
 * It exists because a form is the slowest way to reach anyone. Someone who
 * wants to call should not have to scroll past eight fields to find the number,
 * which is also why the mobile layout puts this pane FIRST — see 8.1.
 *
 * The WhatsApp opener carries the page's own topic: the person answering sees
 * where the enquiry came from before they have read a word of it.
 */

import { CONTACT } from '../nav'
import { AVAILABILITY, waLink } from '../enquiry'

/* WhatsApp was drawn in its own green here, which is what section 8.2 asks for.
   It is red like the other three now: four channels in a row are one control,
   and the odd one out read as a badge rather than as the fourth of a set. The
   glyph is still the handset-in-a-bubble, so it is still recognised without
   being read — which was the only thing the green was buying. */

/**
 * The four channels, drawn once.
 *
 * Exported because the closing band sets the same four out in full at the foot
 * of every page, and the footer repeats them as a row of marks directly under
 * it. The values already came from one place — CONTACT in nav.js — and now the
 * glyphs and the WhatsApp wording do too, so a mark that changes here changes
 * in all three and none of them can end up showing a different set.
 *
 * It is a function rather than an array because one of the four is not fixed:
 * the WhatsApp link carries the topic of whatever page it is on.
 */
export const channels = (phrase) => [
  {
    k: 'Email',
    v: CONTACT.email.label,
    href: CONTACT.email.href,
    icon: (
      <>
        <rect x="2" y="3.4" width="12" height="9.2" rx="2.2" />
        <path d="M2.7 4.8L8 8.7l5.3-3.9" />
      </>
    ),
  },
  {
    k: 'Phone',
    v: CONTACT.phone.label,
    href: CONTACT.phone.href,
    icon: (
      <path d="M5.4 2.4l1.7 2.7-1.3 1.3a8.2 8.2 0 003.8 3.8l1.3-1.3 2.7 1.7v2.1c0 .7-.6 1.2-1.2 1.1A12.2 12.2 0 012.3 3.6c-.1-.6.4-1.2 1.1-1.2z" />
    ),
  },
  {
    k: 'WhatsApp',
    v: CONTACT.whatsapp.label,
    href: waLink(phrase),
    external: true,
    /* the handset in the speech bubble, drawn rather than fetched — a brand
       glyph nobody has to load and nothing can fail to serve */
    icon: (
      <>
        <path d="M2.6 13.4l.8-2.7a5.6 5.6 0 111.9 1.9z" />
        <path d="M6 6c.3 1.6 1.6 3 3.2 3.3l.6-.8 1.4.6v1c0 .4-.4.7-.8.6A5.4 5.4 0 015 5.6c0-.4.3-.7.7-.7h1l.5 1.4z" />
      </>
    ),
  },
  {
    k: 'LinkedIn',
    v: 'linkedin.com/in/indieblock',
    href: CONTACT.linkedin.href,
    external: true,
    icon: (
      <>
        <rect x="2" y="2" width="12" height="12" rx="2.6" />
        <path d="M5.1 6.9v4.3M5.1 4.8v.2M7.9 11.2V6.9M7.9 8.7c0-1 .6-1.8 1.6-1.8s1.5.8 1.5 1.8v2.5" />
      </>
    ),
  },
]

/**
 * @param {object} p
 * @param {string} [p.phrase]  what the WhatsApp opener says the reader wants to
 *   talk about, from the page the CTA was on.
 * @param {string} [p.heading] the H2. The modal has its own heading above this
 *   pane, so there it is a quieter label; the Connect page gives it the brief's
 *   "Or reach us directly" as a real section head.
 * @param {boolean} [p.as] heading level — 'h2' on the page, 'p' in the modal
 *   where the dialog's own h2 already exists and a second one would break the
 *   heading order a screen reader navigates by.
 */
export default function ReachOut({ phrase, heading = 'Or reach us directly', as = 'h2' }) {
  const Heading = as
  return (
    <div className="reach">
      <Heading className={as === 'h2' ? 'reach__h display' : 'eyebrow'}>{heading}</Heading>

      <ul className="reach__list">
        {channels(phrase).map((c) => (
          <li key={c.k}>
            <a
              href={c.href}
              {...(c.external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
            >
              <span className="reach__ico" aria-hidden="true">
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {c.icon}
                </svg>
              </span>
              <span className="reach__k">{c.k}</span>
              {/* The number is a link on a phone and plain text on a desktop,
                  where nothing would happen if it were tapped. The stylesheet
                  turns the pointer off above the breakpoint rather than the
                  markup changing — the href stays, so it is still copyable and
                  still announced. */}
              <span className="reach__v">{c.v}</span>
            </a>
          </li>
        ))}
      </ul>

      <p className="reach__note">{AVAILABILITY}</p>
    </div>
  )
}
