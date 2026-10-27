/**
 * The review build's bar (npm run build:artifact only; the site never shows
 * it). It says the build is not live and links to the pages that changed, so
 * a reviewer can go straight to them. CHANGES is the list to keep current.
 */

import { useState } from 'react'
import { navigate, usePath } from '../lib/router'
import { scrollToTop } from '../lib/scroll'

const CHANGES = [
  { label: 'Memberships', href: '/memberships', note: 'Web360 tiers, ecosystem members, cohort' },
  { label: 'Marketplace', href: '/marketplace', note: 'New: partner directory' },
  { label: 'Web3 Corridor', href: '/corridor', note: 'India as the hub' },
  { label: 'Navbar', href: '/', note: 'Member Login out, Membership in' },
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
