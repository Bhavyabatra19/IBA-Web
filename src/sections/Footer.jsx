/**
 * Global footer — a dark, rounded panel at the hero's width, so the page ends
 * in the same frame the hero opens it in.
 *
 * The brand and its line on the left, then five link columns (FOOTER in
 * nav.js), then one strip: the line, the year, the tagline, and the two
 * policy links.
 */

import { FOOTER, PENDING } from '../nav'
import { scrollToId, scrollToTop } from '../lib/scroll'
import { navigate, parseHref } from '../lib/router'

/* the contact icons, drawn on a 24 grid in currentColor */
const ICONS = {
  linkedin: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.5h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1v5.45h-4v-4.83c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.85 1.25-1.85 2.55v4.91h-4v-11Z"
      />
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="m3.5 6.5 8.5 6.5 8.5-6.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  ),
}

export default function Footer() {
  /* internal links go through the router, so the page never reloads */
  const go = (e, href) => {
    const { path, hash, external } = parseHref(href)
    if (external || href.startsWith('mailto:') || href.startsWith('tel:')) return
    e.preventDefault()
    if (path && path !== window.location.pathname) {
      navigate(href) // App scrolls once the new page has laid out
      return
    }
    if (path) navigate(href)
    if (hash) scrollToId(hash)
    else scrollToTop()
  }

  return (
    <footer className="ft">
      <div className="ft__panel">
        <div className="ft__top">
          <div className="ft__brand">
            <a className="ft__logo" href="/" onClick={(e) => go(e, '/')} aria-label="India Blockchain Alliance — home">
              <img src="/iba-logo-blocks.png" alt="" />
            </a>
            <p className="ft__triad">
              Insights <i>|</i> Impact <i>|</i> Innovation
            </p>
          </div>

          {FOOTER.map((col) => (
            <nav className="ft__col" key={col.title} aria-label={col.title}>
              <h2 className="ft__h">{col.title}</h2>
              <ul>
                {col.items.filter((it) => !it.icon).map((it) => (
                  <li key={it.label}>
                    <a
                      href={it.href}
                      onClick={(e) => go(e, it.href)}
                      {...(it.external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                    >
                      {it.label}
                    </a>
                  </li>
                ))}
              </ul>
              {/* the ways to reach IBA, as a row of icons */}
              {col.items.some((it) => it.icon) && (
                <ul className="ft__icons">
                  {col.items.filter((it) => it.icon).map((it) => (
                    <li key={it.label}>
                      <a
                        href={it.href}
                        aria-label={it.label}
                        title={it.label}
                        {...(it.external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                      >
                        {ICONS[it.icon]}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </nav>
          ))}
        </div>

        <div className="ft__strip">
          <p>
            © India Blockchain Alliance{' '}
            {new Date().getFullYear()} · Connecting Economies. Block by Block.
          </p>
          <div className="ft__legal">
            <a href={PENDING.privacy}>Privacy Policy</a>
            <a href={PENDING.terms}>Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
