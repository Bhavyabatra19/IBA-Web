/**
 * 7.5 — The signed-in Library.
 *
 * ⚠ THIS IS NOT A GATED AREA. There is no backend and nothing here is
 * protected — the route is reachable by anyone who types it. The banner at the
 * top of the page says so, and it stays until the real session lands. Do not
 * file confidential material behind this. See lib/previewSession.js.
 *
 * The two shelves the brief supplies no items for render as waiting for a
 * catalogue rather than filled with invented paper titles: fabricated research
 * citations under IBA's name are a worse failure than an empty shelf. The two
 * that are empty for a new account are empty because that is true, and they say
 * what to do about it.
 */

import { Go } from '../../sections/service/ServiceBlocks'
import { endPreview, usePreview } from '../../lib/previewSession'
import { LIB_TOPICS, LIB_SHELVES, LIB_UPSELL } from '../../library'

export default function Dashboard() {
  const preview = usePreview()
  const firstName = preview?.firstName

  return (
    <section className="section band band--dark dash">
      <div className="wrap">
        {/* Not dismissible: a notice that can be closed is a notice the next
            person to open this page will not see. It goes when the gate is real. */}
        <p className="dash__warning" role="status">
          <strong>Preview only.</strong> There is no account system yet — this page is
          public, nothing on it is gated, and no one is signed in. Do not put anything
          confidential here.
        </p>

        <header className="dash__head">
          <p className="eyebrow">The IBA Library</p>
          <h1 className="h2 display dash__title">
            Welcome back{firstName ? `, ${firstName}` : ''}
          </h1>
          {preview ? (
            <button type="button" className="dash__signout" onClick={endPreview}>
              End preview
            </button>
          ) : (
            <p className="dash__sub">
              You are seeing the signed-in view without a session.{' '}
              <Go href="/library/join">Create a free account</Go> to walk the flow.
            </p>
          )}
        </header>

        <div className="dash__grid">
          <div className="dash__main">
            {LIB_SHELVES.map((s) => (
              <section className="dash__shelf" key={s.key} aria-labelledby={`shelf-${s.key}`}>
                <h2 className="dash__shelfName" id={`shelf-${s.key}`}>
                  {s.name}
                </h2>
                {s.awaiting ? (
                  <p className="dash__awaiting">Awaiting catalogue.</p>
                ) : (
                  <p className="dash__empty">{s.empty}</p>
                )}
              </section>
            ))}

            <section className="dash__shelf" aria-labelledby="shelf-categories">
              <h2 className="dash__shelfName" id="shelf-categories">
                Browse by category
              </h2>
              <ul className="dash__cats">
                {LIB_TOPICS.map((c) => (
                  <li key={c}>
                    {/* every category resolves to the same place until the
                        catalogue exists — said here rather than discovered */}
                    <Go href="/connect">
                      {c}
                      <span aria-hidden="true">→</span>
                    </Go>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="dash__aside">
            <div className="dash__upsell">
              <h2 className="dash__upsellName display">{LIB_UPSELL.title}</h2>
              <p>{LIB_UPSELL.body}</p>
              <Go className="btn btn--primary btn--sm" href={LIB_UPSELL.href}>
                {LIB_UPSELL.cta}
              </Go>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
