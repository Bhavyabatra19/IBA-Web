/**
 * About, Welcome to IBA, the founder's message.
 *
 * Laid out as the reference site's "Message From the Founder": a large
 * portrait on the left; on the right the opening line as a large quote, a
 * short note of a few lines under it, and the LinkedIn mark.
 *
 * `full` (optional): the complete message, opened from "Read the full note"
 * in a pop-up (a native <dialog>: Escape and the close button shut it,
 * focus returns to the button).
 *
 * Styles in brandbook.css (.fl2).
 */
import { useRef } from 'react'

export default function FounderLetter({ lead, note, linkedin, full }) {
  const dialog = useRef(null)
  const open = () => dialog.current?.showModal()
  const close = () => dialog.current?.close()
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
            {note.map((p) => (
              <p data-rise key={p.slice(0, 24)}>
                {p}
              </p>
            ))}
          </div>

          <div className="fl2__actions" data-rise>
            {full && (
              <button type="button" className="btn btn--primary fl2__more" onClick={open}>
                Read the full note <span aria-hidden="true">→</span>
              </button>
            )}
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

      {full && (
        <dialog
          className="fl2__dialog"
          data-lenis-prevent=""
          ref={dialog}
          aria-labelledby="fl2-full-title"
          onClick={(e) => e.target === dialog.current && close()}
        >
          <div className="fl2__dialogIn">
            <button type="button" className="fl2__close" onClick={close} aria-label="Close the founder's note">
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M4 4l8 8M12 4l-8 8" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            <p className="fl2__dialogEyebrow">A message from our founder</p>
            <h2 className="fl2__dialogTitle" id="fl2-full-title">
              {lead}
            </h2>
            {full.map((p) => (
              <p className="fl2__dialogText" key={p.slice(0, 32)}>
                {p}
              </p>
            ))}
            <p className="fl2__dialogSign">
              <strong>Raj Kapoor</strong>
              <span>Founder, India Blockchain Alliance</span>
            </p>
          </div>
        </dialog>
      )}
    </div>
  )
}
