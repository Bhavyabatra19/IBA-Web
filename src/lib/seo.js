/**
 * Writing the current route's metadata into the document.
 *
 * index.html carries one title and one description, and the server sends that
 * same file for every URL. This is what makes twenty routes look like twenty
 * pages: on every route change the title, the description, the canonical and
 * the share tags are rewritten from the table in seo.js.
 *
 * Tags are created on first use and then reused — the alternative, clearing and
 * re-adding them per navigation, churns the head on every click for no gain.
 *
 * ⚠ This runs after the page has loaded, so it is invisible to anything that
 * reads raw HTML — which is most crawlers other than Google, and EVERY social
 * link preview. See the note at the top of seo.js for the two ways to fix that;
 * both are deployment work rather than changes here.
 */

import { SITE_NAME, seoFor } from '../seo'

/**
 * Find or create one tag in the head, then set its content.
 *
 * `attr` is what identifies it: Open Graph uses `property`, everything else
 * uses `name`. Getting that wrong produces a tag that validates and that no
 * scraper reads, so it is a parameter rather than an assumption.
 */
function meta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
  return el
}

function link(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
  return el
}

/**
 * @param {string} path the current pathname, from the router.
 */
export function applySeo(path) {
  const page = seoFor(path)

  document.title = page.title
  meta('name', 'description', page.description)

  /**
   * The canonical is the path WITHOUT its query or hash.
   *
   * It matters here more than on a normal site: `?enquiry=open` (8.1) is a real
   * URL people are meant to share from campaigns, and every anchor in the nav
   * puts a hash in the bar. Left alone, one page would present itself to a
   * crawler as a dozen near-duplicates.
   */
  link('canonical', window.location.origin + path)

  /* Open Graph and Twitter, from the same two strings rather than a second set
     to keep in step. A link to this site is going to be pasted into Slack,
     LinkedIn and WhatsApp far more often than it is going to be typed. */
  meta('property', 'og:type', 'website')
  meta('property', 'og:site_name', SITE_NAME)
  meta('property', 'og:title', page.title)
  meta('property', 'og:description', page.description)
  meta('property', 'og:url', window.location.origin + path)
  /* ⚠ NO SHARE IMAGE. There is no og:image because there is no artwork for one
     — a 1200×630 card is a design job, not a code one. Without it a shared link
     renders as a plain text row. The logo is the wrong thing to substitute: at
     card size it crops to an unreadable square. */
  meta('name', 'twitter:card', 'summary_large_image')
  meta('name', 'twitter:title', page.title)
  meta('name', 'twitter:description', page.description)

  /* Only present when it needs to be. Setting robots to "index, follow" on
     every other page says nothing a crawler does not already assume, and a
     stale one left behind from the previous route would say the opposite. */
  const robots = document.head.querySelector('meta[name="robots"]')
  if (page.noindex) meta('name', 'robots', 'noindex, follow')
  else robots?.remove()
}
