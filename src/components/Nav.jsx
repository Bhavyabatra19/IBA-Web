/**
 * Primary navigation — six tabs, two utility actions.
 *
 * Every tab is a link to its own destination first and a dropdown second: the
 * panel opens on hover and on keyboard focus, and a click goes to the page.
 * A tab that opened a menu and went nowhere is the thing readers complain
 * about — clicking About has to reach /about.
 *
 * Four things make this more than a bar of links:
 *
 * 1. It is fixed over a page that alternates dark and light bands, so it reads
 *    which band is under it and flips its own theme tokens. A single fixed
 *    treatment would have to be dark-on-dark or a permanent scrim; this way the
 *    bar belongs to whatever it is currently sitting on.
 * 2. Anchor navigation routes through the Lenis instance rather than the
 *    browser's hash jump — see scrollToId. The hero is pinned for five
 *    viewports, and a native jump lands mid-pin with the smooth-scroller
 *    easing back to where it thought it was.
 * 3. The mega panel and the mobile drawer are the same IA from nav.js, so the
 *    two can never drift apart.
 * 4. A tab with no `items` (Home) is a plain link — no chevron, no panel, no
 *    accordion. The shape is data, not five hand-written tabs plus a special
 *    case.
 *
 * Sign In is a link to /library/sign-in, not a modal. It used to open one; the
 * real forms are pages now (7.2, 7.3), and a modal holding a second, shorter
 * copy of them is how the two versions start disagreeing.
 */

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { NAV } from '../nav'
import {
  gsap,
  ScrollTrigger,
  scrollToId,
  scrollToTop,
  lockScroll,
  unlockScroll,
} from '../lib/scroll'
import { navigate, parseHref, usePath } from '../lib/router'

export default function Nav() {
  const root = useRef(null)
  const path = usePath()
  const [openTab, setOpenTab] = useState(null)
  const [drawer, setDrawer] = useState(false)
  const [acc, setAcc] = useState(null)
  const [condensed, setCondensed] = useState(false)
  const [overLight, setOverLight] = useState(false)
  const hoverTimer = useRef(0)

  /* ---------------------------------------------------------------- */
  /* condensed + band theme                                            */
  /* ---------------------------------------------------------------- */

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -40',
        end: 99999,
        onToggle: (self) => setCondensed(self.isActive),
      })
    }, root)
    return () => ctx.revert()
  }, [])

  /**
   * Which band is under the bar, from live rects rather than from a
   * ScrollTrigger per band.
   *
   * A trigger records a document position when it is created, and the nav is
   * built before the hero installs its five-viewport pin — so every band below
   * the hero gets recorded ~4500px too high, and because those stale positions
   * also decide refresh order, later refreshes never correct them. A rect is
   * measured now and cannot be stale.
   *
   * Deliberately a passive effect, not a layout one: passive effects run after
   * App's layout effect has started Lenis, so this callback is appended to the
   * ticker BEHIND Lenis's. Ahead of it, every frame would be measured against
   * the previous frame's pin transform — which is a whole viewport wrong for
   * as long as the hero is pinned.
   */
  useEffect(() => {
    let navH = navHeight()
    let bands = [...document.querySelectorAll('.band--light')]

    /* No scroll-position guard: setting the same boolean is a no-op in React,
       so the only per-frame cost is three rects — and a guard would freeze
       whatever the last moving frame happened to measure. */
    const read = () => {
      let over = false
      for (const band of bands) {
        const r = band.getBoundingClientRect()
        if (r.top <= navH && r.bottom > navH) {
          over = true
          break
        }
      }
      setOverLight(over)
    }

    const remeasure = () => {
      navH = navHeight()
      bands = [...document.querySelectorAll('.band--light')]
    }

    gsap.ticker.add(read)
    ScrollTrigger.addEventListener('refresh', remeasure)
    window.addEventListener('resize', remeasure)

    return () => {
      gsap.ticker.remove(read)
      ScrollTrigger.removeEventListener('refresh', remeasure)
      window.removeEventListener('resize', remeasure)
    }
  }, [])

  /* ---------------------------------------------------------------- */
  /* open / close                                                      */
  /* ---------------------------------------------------------------- */

  const close = useCallback(() => {
    clearTimeout(hoverTimer.current)
    setOpenTab(null)
  }, [])

  /* Esc closes whatever is open, innermost first. */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      if (openTab) close()
      else if (drawer) setDrawer(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [openTab, drawer, close])

  /* Mouse leaving the bar is handled by onPointerLeave; this is the touch and
     keyboard path, where there is no leave event to close on. */
  useEffect(() => {
    if (!openTab) return
    const onDown = (e) => {
      if (!root.current?.contains(e.target)) close()
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [openTab, close])

  useEffect(() => {
    if (!drawer) return
    lockScroll()
    return () => unlockScroll()
  }, [drawer])

  /* ---------------------------------------------------------------- */
  /* navigation                                                        */
  /* ---------------------------------------------------------------- */

  const go = (e, href) => {
    const { path, hash, external } = parseHref(href)
    if (external) return // mailto, tel, another site — the browser's business

    e.preventDefault()
    close()
    setDrawer(false)

    /* A page change: App handles the scroll once the new page has laid out,
       since there is nothing here to scroll to yet. */
    if (path && path !== window.location.pathname) {
      navigate(href)
      return
    }
    /* Already on the page. The drawer's unlock runs in an effect cleanup, so
       the scroll is queued behind it — starting Lenis and telling it to move
       in the same tick leaves it stopped at the destination. */
    if (path) navigate(href)
    if (hash) requestAnimationFrame(() => scrollToId(hash))
    else requestAnimationFrame(() => scrollToTop())
  }

  const hoverOpen = (e, tab) => {
    if (e.pointerType !== 'mouse') return
    clearTimeout(hoverTimer.current)
    /* A tab with no panel still has to close whichever panel is open, or
       crossing Home on the way to the logo leaves About's hanging. */
    hoverTimer.current = setTimeout(() => setOpenTab(tab.items ? tab.key : null), 80)
  }

  const hoverClose = (e) => {
    if (e.pointerType !== 'mouse') return
    clearTimeout(hoverTimer.current)
    hoverTimer.current = setTimeout(close, 180)
  }

  const panel = NAV.find((t) => t.key === openTab)

  /**
   * Whether a tab IS the page being read, rather than merely pointing into it.
   *
   * The hash is what settles it: Services resolves to /#what-we-do, a section of
   * the home page, and marking four tabs as the current page while the reader is
   * on it would make the marker mean nothing. Only a whole-page destination —
   * Home, About — can be current.
   */
  const isCurrent = (tab) => {
    const { path: p, hash } = parseHref(tab.href)
    if (hash || !p) return false
    /* A sub-page marks its parent tab too — reading /services/web3-advisory,
       Services is still the section you are in. The trailing slash is what keeps
       "/" from prefixing every path on the site. */
    return path === p || (p !== '/' && path.startsWith(`${p}/`))
  }

  return (
    <>
      <header
        className="nav"
        ref={root}
        data-condensed={condensed || !!openTab || undefined}
        data-over={overLight ? 'light' : undefined}
        onPointerLeave={hoverClose}
      >
        <div className="nav__bar">
          <a className="nav__brand" href="/" onClick={(e) => go(e, '/')}>
            <img src="/iba-logo.webp" alt="India Blockchain Alliance — home" />
          </a>

          <nav className="nav__tabs" aria-label="Primary">
            {NAV.map((tab) => (
              <div className="nav__tab" key={tab.key}>
                {/* A link, not a button: the click goes to the destination and
                    the panel is opened by hover and by keyboard focus. */}
                <a
                  className="nav__tabBtn"
                  href={tab.href}
                  aria-expanded={tab.items ? openTab === tab.key : undefined}
                  aria-controls={tab.items ? `nav-panel-${tab.key}` : undefined}
                  aria-current={isCurrent(tab) ? 'page' : undefined}
                  data-active={openTab === tab.key ? '' : undefined}
                  onPointerEnter={(e) => hoverOpen(e, tab)}
                  /* Keyboard focus opens the panel; a mouse click must not, or
                     focus would open it a beat before the click navigated away
                     and the panel would flash. A link focused by pointer is not
                     :focus-visible, which is exactly the distinction needed. */
                  onFocus={(e) => {
                    if (tab.items && e.target.matches(':focus-visible')) setOpenTab(tab.key)
                  }}
                  onClick={(e) => go(e, tab.href)}
                >
                  {tab.label}
                  {tab.items && (
                    <svg viewBox="0 0 10 6" aria-hidden="true">
                      <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  )}
                </a>
              </div>
            ))}
          </nav>

          <div className="nav__util">
            <a
              className="nav__signin"
              href="/library/sign-in"
              onClick={(e) => go(e, '/library/sign-in')}
            >
              Sign In
            </a>
            <a
              className="btn btn--primary btn--sm"
              href="/#connect"
              onClick={(e) => go(e, '/#connect')}
            >
              Connect With Us
            </a>
          </div>

          <button
            type="button"
            className="nav__burger"
            aria-expanded={drawer}
            aria-controls="nav-drawer"
            aria-label={drawer ? 'Close menu' : 'Open menu'}
            onClick={() => setDrawer((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>

        {/* One panel that swaps contents, not five that mount and unmount —
            moving between tabs then reads as the panel changing rather than
            as it closing and a new one opening. */}
        {panel && (
          <div
            className="nav__panel"
            id={`nav-panel-${panel.key}`}
            role="region"
            aria-label={panel.label}
          >
            <div className="nav__panelIn wrap">
              <div className="nav__panelHead">
                <h2 className="nav__panelTitle display">{panel.label}</h2>
                <a
                  className="arrow arrow--red"
                  href={panel.href}
                  onClick={(e) => go(e, panel.href)}
                >
                  View all <span aria-hidden="true">→</span>
                </a>
              </div>
              <ul className="nav__panelList" data-count={panel.items.length}>
                {panel.items.map((it) => (
                  <li key={it.label}>
                    <a href={it.href} onClick={(e) => go(e, it.href)}>
                      <span className="nav__itemLabel">{it.label}</span>
                      {it.note && <span className="nav__itemNote">{it.note}</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </header>

      {/* ---------------------------- mobile ---------------------------- */}
      <div className="drawer" id="nav-drawer" data-open={drawer ? '' : undefined} hidden={!drawer}>
        <div className="drawer__scroll">
          {NAV.map((tab) => {
            /* No panel to disclose, so no accordion — just the destination. */
            if (!tab.items) {
              return (
                <section className="drawer__acc" key={tab.key}>
                  <h2>
                    <a
                      href={tab.href}
                      aria-current={isCurrent(tab) ? 'page' : undefined}
                      onClick={(e) => go(e, tab.href)}
                    >
                      {tab.label}
                    </a>
                  </h2>
                </section>
              )
            }

            const isOpen = acc === tab.key
            return (
              <section
                className="drawer__acc"
                key={tab.key}
                data-open={isOpen ? '' : undefined}
                /* On the section, not on the button: the button discloses a
                   list, it does not go to the page, so aria-current would be a
                   claim about the wrong element. */
                data-current={isCurrent(tab) ? '' : undefined}
              >
                <h2>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setAcc(isOpen ? null : tab.key)}
                  >
                    {tab.label}
                    <svg viewBox="0 0 12 12" aria-hidden="true">
                      <path d="M6 1v10M1 6h10" fill="none" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  </button>
                </h2>
                {/* 0fr → 1fr animates a grid row to its content height without
                    ever needing a measured pixel value */}
                <div className="drawer__accBody">
                  <div>
                    <ul>
                      {tab.items.map((it) => (
                        <li key={it.label}>
                          <a href={it.href} onClick={(e) => go(e, it.href)} tabIndex={isOpen ? 0 : -1}>
                            <span className="nav__itemLabel">{it.label}</span>
                            {it.note && <span className="nav__itemNote">{it.note}</span>}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            )
          })}
        </div>

        <div className="drawer__foot">
          <a
            className="btn btn--ghost btn--block"
            href="/library/sign-in"
            onClick={(e) => go(e, '/library/sign-in')}
          >
            Sign In
          </a>
          <a
            className="btn btn--primary btn--block"
            href="/#connect"
            onClick={(e) => go(e, '/#connect')}
          >
            Connect With Us
          </a>
        </div>
      </div>
    </>
  )
}

/** Live nav height in px — the triggers above are measured against it. */
function navHeight() {
  const v = getComputedStyle(document.documentElement).getPropertyValue('--nav-h')
  return parseFloat(v) || 72
}
