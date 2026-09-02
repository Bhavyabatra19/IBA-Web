/**
 * router.js
 * ------------------------------------------------------------------
 * The whole router. Two pages and a handful of anchors do not need a
 * dependency — they need pushState, popstate, and a way for React to hear
 * about both.
 *
 * Paths, not hashes: the nav already spends the hash on in-page anchors
 * (#connect, #library), and a router that also owned the hash would have to
 * invent a prefix to tell "go to the Library section" from "go to the Library
 * page". Paths keep the two vocabularies apart.
 *
 * The cost is that a static host must serve index.html for unknown paths —
 * see the note in README. Vite's dev server already does.
 */

import { useEffect, useState } from 'react'

/** Fired on a pushState, since the browser only tells us about popstate. */
const ROUTE = 'app:route'

/** The current path, re-read on navigation and on back/forward. */
export function usePath() {
  const [path, setPath] = useState(() => window.location.pathname)
  useEffect(() => {
    const read = () => setPath(window.location.pathname)
    window.addEventListener('popstate', read)
    window.addEventListener(ROUTE, read)
    return () => {
      window.removeEventListener('popstate', read)
      window.removeEventListener(ROUTE, read)
    }
  }, [])
  return path
}

/**
 * Go to an internal URL. Returns false when the URL is not ours to handle, so
 * the caller can let the browser have it — an external link, a mailto, a tel.
 */
export function navigate(to) {
  if (typeof to !== 'string' || !to.startsWith('/')) return false
  const url = new URL(to, window.location.origin)
  const changedPage = url.pathname !== window.location.pathname
  window.history.pushState(null, '', url.pathname + url.hash)
  /* Only a page change needs a re-render. A same-page link is an anchor, and
     the caller scrolls to it — re-rendering the page under the reader to move
     them a few hundred pixels would throw away every ScrollTrigger first. */
  if (changedPage) window.dispatchEvent(new Event(ROUTE))
  return true
}

/** Where an href points, split into the parts each half of the app handles. */
export function parseHref(href) {
  if (typeof href !== 'string') return { external: true }
  if (href.startsWith('#')) return { hash: href }
  if (href.startsWith('/')) {
    const i = href.indexOf('#')
    return i === -1
      ? { path: href }
      : { path: href.slice(0, i), hash: href.slice(i) }
  }
  return { external: true }
}
