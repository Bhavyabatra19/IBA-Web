/**
 * The cookie choice for Google Analytics (SEO and analytics pass, 11-16).
 *
 * Shown only when a GA4 ID is set (lib/analytics.js) and the visitor has not
 * chosen yet. Accept turns on analytics cookies; Decline keeps Google
 * Analytics cookieless. Either choice is remembered in this browser.
 * Vercel Web Analytics uses no cookies, so it is not part of this choice.
 */

import { useState } from 'react'
import { GA_ID, storedConsent, setConsent } from '../lib/analytics'

export default function ConsentBanner() {
  const [open, setOpen] = useState(() => Boolean(GA_ID) && !storedConsent())
  if (!open) return null

  const choose = (granted) => {
    setConsent(granted)
    setOpen(false)
  }

  return (
    <div className="cns" role="region" aria-label="Cookie choice">
      <p className="cns__text">
        We use analytics cookies to understand how the site is used and improve it. No advertising cookies.{' '}
        <a href="/privacy#cookies">Privacy policy</a>
      </p>
      <div className="cns__actions">
        <button type="button" className="cns__btn cns__btn--ghost" onClick={() => choose(false)}>
          Decline
        </button>
        <button type="button" className="cns__btn" onClick={() => choose(true)}>
          Accept
        </button>
      </div>
    </div>
  )
}
