/**
 * Analytics (SEO and analytics pass, 11-16).
 *
 * Two tools, for two jobs:
 *
 * 1. Google Analytics 4: visitors, where they came from, the pages they read,
 *    and the actions that matter (an enquiry sent, an email, WhatsApp or
 *    LinkedIn click, the Let's Talk form opened). It only runs when a GA4
 *    measurement ID is set in Vercel as VITE_GA_ID (e.g. G-XXXXXXXXXX), so
 *    nothing loads until IBA has a property. It starts with Google Consent
 *    Mode set to "denied" (no cookies, anonymous pings only) and switches to
 *    "granted" only when the visitor accepts on the cookie banner.
 *
 * 2. Vercel Web Analytics: page views and visitors with no cookies at all,
 *    so it needs no consent. It reports once it is switched on in the Vercel
 *    project (Analytics tab); until then its requests are simply ignored.
 *
 * Search impressions, clicks and positions come from Google Search Console,
 * not from either of these; link Search Console to the GA4 property to see
 * them in Google Analytics too.
 */

import { inject } from '@vercel/analytics'

export const GA_ID = import.meta.env.VITE_GA_ID || ''

const CONSENT_KEY = 'iba-analytics-consent'

/** 'granted', 'denied', or '' when the visitor has not chosen yet */
export function storedConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY) || ''
  } catch {
    return ''
  }
}

function gtag() {
  window.dataLayer = window.dataLayer || []
  // gtag's own contract: it reads the arguments object, not an array
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments)
}

let started = false

/** Called once, at start-up. */
export function initAnalytics() {
  if (started || typeof window === 'undefined') return
  started = true

  /* Vercel Web Analytics: cookieless, follows route changes by itself */
  inject({ mode: import.meta.env.PROD ? 'production' : 'development' })

  if (!GA_ID) return
  window.gtag = gtag
  const granted = storedConsent() === 'granted'
  gtag('consent', 'default', {
    analytics_storage: granted ? 'granted' : 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
  gtag('js', new Date())
  /* page views are sent by hand on every route change (pageview below), as
     the site never reloads between pages */
  gtag('config', GA_ID, { send_page_view: false, anonymize_ip: true })

  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`
  document.head.appendChild(s)

  document.addEventListener('click', onClick, true)
}

/** The visitor's choice on the cookie banner. */
export function setConsent(granted) {
  try {
    localStorage.setItem(CONSENT_KEY, granted ? 'granted' : 'denied')
  } catch {
    /* private mode: the choice lasts for this visit only */
  }
  if (GA_ID && window.gtag) gtag('consent', 'update', { analytics_storage: granted ? 'granted' : 'denied' })
}

/** One page view, on every route change. */
export function pageview(path) {
  if (!GA_ID || !window.gtag) return
  gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.origin + path,
    page_title: document.title,
  })
}

/** A named action, e.g. track('generate_lead', { topic }) */
export function track(name, params = {}) {
  if (!GA_ID || !window.gtag) return
  gtag('event', name, params)
}

/* The clicks worth counting, picked up site-wide from what the link is, so
   no button has to remember to report itself. */
function onClick(e) {
  const a = e.target.closest?.('a, button')
  if (!a) return
  const href = a.getAttribute('href') || ''
  const label = (a.getAttribute('aria-label') || a.textContent || '').trim().slice(0, 80)
  if (a.hasAttribute('data-enquiry')) return track('enquiry_open', { link_text: label, page_path: location.pathname })
  if (href.startsWith('mailto:')) return track('contact_click', { method: 'email', link_text: label })
  if (href.includes('wa.me/')) return track('contact_click', { method: 'whatsapp', link_text: label })
  if (href.includes('linkedin.com/')) return track('contact_click', { method: 'linkedin', link_text: label })
  if (href.startsWith('tel:')) return track('contact_click', { method: 'phone', link_text: label })
}
