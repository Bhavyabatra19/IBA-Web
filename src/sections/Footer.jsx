/**
 * Global footer — the same map as the nav, flattened.
 *
 * Four columns restate the nav tabs with no dropdown to open, so every
 * destination on the site is visible at once. The fifth is the one thing the
 * bar has no room for: the Library entry point and the ways to reach IBA.
 *
 * Dark, because it closes the page — and the Closing band above it is dark, so
 * the two read as one ending rather than as a band and then a footer.
 */

import { useState } from 'react'
import { FOOTER, PENDING } from '../nav'
/* the same three ways to reach IBA the closing band sets out above — one
   definition of both the values and the marks */
import { WAYS } from './Closing'
import { scrollToId, scrollToTop } from '../lib/scroll'
import { navigate, parseHref } from '../lib/router'

export default function Footer() {
  const [note, setNote] = useState(null)

  const go = (e, href) => {
    const { path, hash, external } = parseHref(href)
    if (external) return
    e.preventDefault()
    if (path && path !== window.location.pathname) {
      navigate(href) // App scrolls once the new page has laid out
      return
    }
    if (path) navigate(href)
    if (hash) scrollToId(hash)
    else scrollToTop()
  }

  const subscribe = (e) => {
    e.preventDefault()
    /* TODO: POST to the list provider. Saying so beats a fake confirmation
       the reader would then wait on. */
    setNote('Newsletter signup is not wired up yet — email us to be added.')
  }

  return (
    <footer className="foot band band--dark">
      <div className="wrap">
        <div className="foot__cols">
          {FOOTER.map((col) => (
            <nav className="foot__col" key={col.title} aria-label={col.title}>
              <h2 className="foot__h">{col.title}</h2>
              <ul>
                {col.items.map((it) => (
                  <li key={it.label}>
                    <a href={it.href} onClick={(e) => go(e, it.href)}>
                      {it.label}
                      {it.note && <span className="foot__note">{it.note}</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="foot__col foot__col--wide">
            <h2 className="foot__h">Stay Connected</h2>
            <ul>
              <li>
                <a href="/library" onClick={(e) => go(e, '/library')}>
                  Library
                  <span className="foot__note">Free Resources</span>
                </a>
              </li>
            </ul>

            <form className="foot__sub" onSubmit={subscribe}>
              <label className="field field--inline">
                <span>Newsletter</span>
                <input
                  type="email"
                  name="email"
                  placeholder="you@organisation.org"
                  autoComplete="email"
                  required
                />
              </label>
              <button type="submit" aria-label="Subscribe to the newsletter">
                <span aria-hidden="true">→</span>
              </button>
            </form>
            {note && (
              <p className="foot__status" role="status">
                {note}
              </p>
            )}

            {/* A row of marks rather than three lines of text. The values
                themselves are not lost by being dropped here — the closing
                band directly above sets all three out in full, with their
                labels, on every page of the site. Each mark carries the value
                it points at as its accessible name, so it is announced and it
                is in the tooltip. */}
            <ul className="foot__contact">
              {WAYS.map((w) => (
                <li key={w.k}>
                  <a
                    href={w.href}
                    title={`${w.k} — ${w.v}`}
                    aria-label={`${w.k}: ${w.v}`}
                    {...(w.external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                  >
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      {w.icon}
                    </svg>
                  </a>
                </li>
              ))}
            </ul>

            <a
              className="foot__signin"
              href="/library/sign-in"
              onClick={(e) => go(e, '/library/sign-in')}
            >
              Sign in for free access
            </a>
          </div>
        </div>

        <div className="foot__strip">
          <a className="foot__mark" href="/" onClick={(e) => go(e, '/')} aria-label="India Blockchain Alliance — top">
            <img src="/iba-logo.webp" alt="" />
          </a>
          <span className="foot__triad">Insights <i>|</i> Impact <i>|</i> Innovation</span>
          <span>© India Blockchain Alliance {new Date().getFullYear()}</span>
          <a href={PENDING.privacy}>Privacy Policy</a>
          <a href={PENDING.terms}>Terms</a>
          <span className="foot__tag">Building a Nation. Block by Block.</span>
        </div>
      </div>
    </footer>
  )
}
