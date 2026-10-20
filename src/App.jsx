import { useEffect, useLayoutEffect } from 'react'
import Nav from './components/Nav'
import Enquiry from './components/Enquiry'
import ScrollTop from './components/ScrollTop'
import Footer from './sections/Footer'
import CtaBand from './components/CtaBand'
import Home from './pages/Home'
/* The site's pages, as the content source sets them out. The earlier pages
   (pages/services, pages/education, pages/studio, pages/library/*, and the
   old About, Corridor and Connect) are no longer routed; their files are
   kept so nothing is lost, and can be deleted once the new pages are signed off. */
import About from './pages/site/About'
import Expertise from './pages/site/Expertise'
import Ecosystem from './pages/site/Ecosystem'
import Initiatives from './pages/site/Initiatives'
import Corridor from './pages/site/Corridor'
import RedClub from './pages/site/RedClub'
import Library from './pages/site/Library'
import Connect from './pages/site/Connect'
import Privacy from './pages/site/Privacy'
import { usePath } from './lib/router'
import { applySeo } from './lib/seo'
import { SEO } from './seo'
import {
  initSmoothScroll,
  refreshOnLoad,
  scrollToId,
  scrollToTop,
  ScrollTrigger,
} from './lib/scroll'

/* Flat, and keyed by the exact path. Two levels is not a hierarchy worth a
   matcher — when a third level arrives, that is the moment to grow one. */
const PAGES = {
  '/': Home,
  '/about': About,
  '/expertise': Expertise,
  '/ecosystem': Ecosystem,
  '/initiatives': Initiatives,
  '/corridor': Corridor,
  '/red-club': RedClub,
  '/library': Library,
  '/connect': Connect,
  '/privacy': Privacy,
}

/**
 * Every route needs a row in the SEO table, or it inherits the fallback — which
 * is the home page's title on a page that is not the home page.
 *
 * Checked in development only, and by comparing the two lists rather than by
 * remembering: this file is where a route is added, so it is the only place the
 * omission can be caught at the moment it is made.
 */
if (import.meta.env.DEV) {
  const missing = Object.keys(PAGES).filter((p) => !SEO[p])
  const orphan = Object.keys(SEO).filter((p) => !PAGES[p])
  if (missing.length) console.warn('[seo] routes with no title:', missing)
  if (orphan.length) console.warn('[seo] titles with no route:', orphan)
}

export default function App() {
  const path = usePath()
  /* An unknown path falls back to the home page rather than a blank screen.
     A real 404 needs a page of its own; this at least never shows nothing. */
  const Page = PAGES[path] ?? Home

  useLayoutEffect(() => initSmoothScroll(), [])
  useEffect(() => refreshOnLoad(), [])

  /* 9 — the title, description, canonical and share tags for this route. A
     layout effect so the title has changed before the new page paints; a reader
     watching the tab should not see the old page's name on the new one. */
  useLayoutEffect(() => applySeo(path), [path])

  /* A pinned hero cannot be restored into halfway through — the browser would
     drop the reader into the middle of the sequence with no way to read it. */
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
  }, [])

  /* pins are measured from layout, and the last band settling changes it */
  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 300)
    return () => clearTimeout(t)
  }, [])

  /* Top of the new page before it paints, so the reader never sees it at the
     old page's scroll position. Only when there is no anchor to honour. */
  useLayoutEffect(() => {
    if (!window.location.hash) scrollToTop()
  }, [path])

  /**
   * Landing on an anchor of a page that has only just mounted.
   *
   * Scrolling once — on the next frame, or on the first refresh — lands in the
   * wrong place. The home page's hero pins for five viewports, and until that
   * spacer exists every section below it measures ~4500px too high. The spacer
   * appears partway through mounting, and mounting is one long blocked frame:
   * the hero builds a WebGL rig, a scrubbed timeline and the pin in a single
   * synchronous run.
   *
   * So land, and keep landing on every refresh for a short window. Nothing
   * between the first attempt and the last is ever painted, because the thread
   * never yields — the correction is free, and it is the only approach that is
   * right regardless of when the spacer arrives. The reader touching the wheel
   * ends it immediately; being dragged back to an anchor you have just scrolled
   * away from is worse than landing short.
   */
  useEffect(() => {
    const hash = window.location.hash
    if (!hash) {
      ScrollTrigger.refresh()
      return
    }
    ScrollTrigger.refresh()

    /* Wait for the document to stop growing, then scroll once. Height is the
       honest signal — it is what the pin spacer changes, and it settles whether
       the delay came from the pin, a web font or an image. Three still frames
       is enough to call it, and the deadline stops a page that never settles
       from stranding the reader at the top. */
    let raf = 0
    let last = -1
    let still = 0
    const deadline = performance.now() + 1500
    const tick = () => {
      const h = document.documentElement.scrollHeight
      if (h === last) still += 1
      else {
        still = 0
        last = h
      }
      if (still >= 3 || performance.now() > deadline) {
        if (document.querySelector(hash)) scrollToId(hash, { immediate: true })
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [path])

  return (
    <>
      <div className="page">
        {/* First in the DOM so it is first in tab order and first for a screen
            reader. Its band triggers still resolve: React commits the whole
            tree before any layout effect runs, so the sections it queries for
            already exist by the time Nav's effect looks for them. */}
        <Nav />
        {/* Keyed on the path, so React replaces the page rather than trying to
            reconcile one document into another — which would leave the old
            page's refs and GSAP contexts attached to the new page's nodes. */}
        <main key={path}>
          <Page />
        </main>
        {/* the red closing band — home carries its own (GetInTouch) */}
        {path !== '/' && <CtaBand />}
        <Footer />
        {/* Last in the DOM, so it is last in tab order — a reader tabbing the
            page reaches it after the footer rather than before the content. */}
        <ScrollTop />
      </div>
      {/* Outside .page, because it covers it. Rendered once and opened from
          everywhere: it owns the delegated listener that every [data-enquiry]
          control on the site goes through, so it must not be inside the tree
          App remounts on a route change. */}
      <Enquiry />
    </>
  )
}
