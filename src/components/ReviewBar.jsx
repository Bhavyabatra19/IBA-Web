/**
 * The review build's bar (npm run build:artifact only; the site never shows
 * it). It says the build is not live and links to the pages that changed, so
 * a reviewer can go straight to them. CHANGES is the list to keep current.
 */

import { useState } from 'react'
import { navigate, usePath } from '../lib/router'
import { scrollToTop } from '../lib/scroll'

const CHANGES = [
  { label: 'Home', href: '/', note: 'New hero coins, Impact band, nav' },
  { label: 'About', href: '/about', note: 'Welcome to IBA, governance model' },
  { label: 'Expertise', href: '/expertise', note: 'Advisory and Consulting Stack wheel' },
  { label: 'Tokenization', href: '/tokenization', note: 'New page' },
  { label: 'Ecosystem', href: '/ecosystem', note: 'Partners, standards, associates' },
  { label: 'Web3 Corridor', href: '/corridor', note: 'Rebuilt: regions, operating model, Xchange' },
  { label: 'Membership Plans', href: '/corridor#memberships', note: 'Founder, tokenization and Xchange tiers' },
]

export default function ReviewBar() {
  const path = usePath()
  /* open on a desktop, folded on a phone where it would cover the page */
  const [open, setOpen] = useState(() => window.innerWidth > 700)
  const go = (e, href) => {
    e.preventDefault()
    if (navigate(href) && href === path) scrollToTop()
  }
  return (
    <aside className={`rv${open ? '' : ' rv--closed'}`} aria-label="Review build">
      <button type="button" className="rv__toggle" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span className="rv__dot" aria-hidden="true" />
        Review build · not live
      </button>
      {open && (
        <ul className="rv__list">
          {CHANGES.map((c) => (
            <li key={c.label}>
              <a href={c.href} onClick={(e) => go(e, c.href)} aria-current={path === c.href ? 'page' : undefined}>
                <strong>{c.label}</strong>
                <span>{c.note}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </aside>
  )
}
