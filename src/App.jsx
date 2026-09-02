import { useEffect, useLayoutEffect } from 'react'
import Stage from './three/Stage'
import Nav from './components/Nav'
import ScrollTop from './components/ScrollTop'
import Footer from './sections/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/services/Services'
import ConsultingStack from './pages/services/ConsultingStack'
import Web3Advisory from './pages/services/Web3Advisory'
import LegalAdvisory from './pages/services/LegalAdvisory'
import RwaTokenization from './pages/services/RwaTokenization'
import WhiteLabel from './pages/services/WhiteLabel'
import SectorExpertise from './pages/services/SectorExpertise'
import Education from './pages/education/Education'
import RedClub from './pages/education/RedClub'
import Verifyble from './pages/education/Verifyble'
import Studio from './pages/studio/Studio'
import Library from './pages/library/Library'
import Join from './pages/library/Join'
import SignIn from './pages/library/SignIn'
import Reset from './pages/library/Reset'
import Dashboard from './pages/library/Dashboard'
import { usePath } from './lib/router'
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
  '/services': Services,
  '/services/consulting-stack': ConsultingStack,
  '/services/web3-advisory': Web3Advisory,
  '/services/legal-advisory': LegalAdvisory,
  '/services/rwa-tokenization': RwaTokenization,
  '/services/white-label': WhiteLabel,
  '/services/sector-expertise': SectorExpertise,
  '/education': Education,
  '/education/red-club': RedClub,
  '/education/verifyble': Verifyble,
  /* One page, not four: the Studio's four sections are anchors into it. */
  '/studio': Studio,
  '/library': Library,
  '/library/join': Join,
  '/library/sign-in': SignIn,
  '/library/reset': Reset,
  /* ⚠ Not gated. There is no session to gate on — see lib/previewSession.js. */
  '/library/dashboard': Dashboard,
}

export default function App() {
  const path = usePath()
  /* An unknown path falls back to the home page rather than a blank screen.
     A real 404 needs a page of its own; this at least never shows nothing. */
  const Page = PAGES[path] ?? Home

  useLayoutEffect(() => initSmoothScroll(), [])
  useEffect(() => refreshOnLoad(), [])

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
      <Stage />
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
        <Footer />
        {/* Last in the DOM, so it is last in tab order — a reader tabbing the
            page reaches it after the footer rather than before the content. */}
        <ScrollTop />
      </div>
    </>
  )
}
