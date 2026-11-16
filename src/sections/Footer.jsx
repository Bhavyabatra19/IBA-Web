/**
 * Global footer, a dark, rounded panel at the hero's width, so the page ends
 * in the same frame the hero opens it in.
 *
 * The brand and its line on the left, then five link columns (FOOTER in
 * nav.js), then one strip: the line, the year, the tagline, and the two
 * policy links.
 */

import { FOOTER, PENDING } from '../nav'
import { scrollToId, scrollToTop } from '../lib/scroll'
import { navigate, parseHref } from '../lib/router'
import { waLink } from '../enquiry'

/* the contact icons: the red-lit glass circles of the Let's Talk form
   (by request, 11-15), so the two rows match */
const ICONS = {
  email: '/images/contact/glass-email.png',
  whatsapp: '/images/contact/glass-whatsapp.png',
  linkedin: '/images/contact/glass-linkedin.png',
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
            <a className="ft__logo" href="/" onClick={(e) => go(e, '/')} aria-label="India Blockchain Alliance home page">
              <img src="/iba-logo-blocks.webp" alt="" width="360" height="334" />
            </a>
            {/* IBA's one tagline (by request, 11-06) */}
            <p className="ft__triad">Rewriting the Rules with Web3</p>
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
                        href={it.icon === 'whatsapp' ? waLink() : it.href}
                        aria-label={it.label}
                        title={it.label}
                        {...(it.external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                      >
                        <img src={ICONS[it.icon]} alt="" width="48" height="48" loading="lazy" decoding="async" />
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
            {new Date().getFullYear()}
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
