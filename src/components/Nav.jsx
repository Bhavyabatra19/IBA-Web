/**
 * Primary navigation — five tabs, two utility actions.
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
 * 4. Everything about a tab's shape is data. A tab with no children is a plain
 *    link, a tab with `groups` opens a panel of headed lists, and the one with
 *    `pill` renders as the flagship. None of the three is a hand-written case
 *    here, so the bar follows nav.js wherever it goes.
 *
 * Member Login is a link to /library/sign-in, not a modal. It used to open one;
 * the real forms are pages now (7.2, 7.3), and a modal holding a second, shorter
 * copy of them is how the two versions start disagreeing.
 *
 * Connect With Us — in the bar and at the foot of the drawer — opens the 8.1
 * enquiry overlay. Neither button has a handler for it: both carry
 * `data-enquiry` and one delegated listener in Enquiry.jsx does the work, the
 * same way the other forty triggers on the site do. Their href is the real
 * /connect page, so with no JS they still go somewhere.
 */

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { NAV, MEMBER_LOGIN, tabItems } from '../nav'
import {
  gsap,
  ScrollTrigger,
  scrollToId,
  scrollToTop,
  lockScroll,
  unlockScroll,
} from '../lib/scroll'
import { navigate, parseHref, usePath } from '../lib/router'
import { useEnquiry } from '../lib/enquiryStore'

/** Line icons for the panel links (the `icon` field in nav.js), on a 24 grid. */
const ICONS = {
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></>,
  users: <><circle cx="9" cy="8" r="3.5" /><path d="M2.5 19c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6M16 4.6a3.5 3.5 0 0 1 0 6.8M18 13.4c2.1.7 3.5 2.8 3.5 5.6" /></>,
  eye: <><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></>,
  chart: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
  layers: <><path d="m12 3 9 5-9 5-9-5Z" /><path d="m3 13 9 5 9-5" /></>,
  spark: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" />,
  link: <path d="M10 14a4 4 0 0 1 0-5.6l2.4-2.4a4 4 0 0 1 5.6 5.6l-1.2 1.2M14 10a4 4 0 0 1 0 5.6L11.6 18a4 4 0 0 1-5.6-5.6l1.2-1.2" />,
  chat: <path d="M4 5h16v11H9l-5 4Z" />,
  lock: <><rect x="5" y="11" width="14" height="10" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
  handshake: <path d="m2 12 4-4 4 2 3-2 4 2 5 2M6 8l-4 4 6 6 2-1 2 2 2-1 2 1 4-5-3-3M10 10l3 3" />,
  book: <path d="M4 4h6a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4ZM20 4h-6a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h6Z" />,
  doc: <><path d="M6 2h8l4 4v16H6Z" /><path d="M14 2v4h4M9 12h6M9 16h6" /></>,
  play: <><circle cx="12" cy="12" r="9" /><path d="m10 8 6 4-6 4Z" /></>,
  video: <><rect x="2" y="6" width="14" height="12" /><path d="m16 10 6-3v10l-6-3" /></>,
  report: <><path d="M6 2h12v20H6Z" /><path d="M9 17v-3M12 17v-6M15 17v-4" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" /></>,
  pin: <><path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12Z" /><circle cx="12" cy="9" r="2.5" /></>,
}

/** Whether a tab has anything to disclose — flat items or grouped ones. */
const hasPanel = (tab) => tabItems(tab).length > 0

/** Where a tab sits in the mobile drawer. Everything without a flag keeps its
    order in NAV, because Array.prototype.sort is stable. */
const drawerRank = (tab) => (tab.top ? 0 : tab.pill ? 1 : 2)

export default function Nav() {
  const root = useRef(null)
  const path = usePath()
  const [openTab, setOpenTab] = useState(null)
  const [drawer, setDrawer] = useState(false)
  const [acc, setAcc] = useState(null)
  const [condensed, setCondensed] = useState(false)
  const [overLight, setOverLight] = useState(false)
  const hoverTimer = useRef(0)
  const { open: enquiryOpen } = useEnquiry()

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

  /**
   * The enquiry overlay takes over from the bar.
   *
   * Connect With Us appears twice here — in the bar and at the foot of the
   * drawer — and both are `data-enquiry` triggers handled by one delegated
   * listener in Enquiry.jsx, which knows nothing about this component's state.
   * So the bar watches the overlay instead of the buttons telling it: the
   * drawer closes and any open mega panel closes, and two scroll locks never
   * stack up behind one another.
   */
  useEffect(() => {
    if (!enquiryOpen) return
    setDrawer(false)
    close()
  }, [enquiryOpen, close])

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
    hoverTimer.current = setTimeout(() => setOpenTab(hasPanel(tab) ? tab.key : null), 80)
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
        className="nav nav--home"
        ref={root}
        data-condensed={condensed || !!openTab || undefined}
        data-over={overLight ? 'light' : undefined}
        onPointerLeave={hoverClose}
      >
        <div className="nav__bar">
          <a className="nav__brand" href="/" onClick={(e) => go(e, '/')}>
            <img src="/iba-logo-blocks.png" alt="India Blockchain Alliance — home" />
          </a>

          <nav className="nav__tabs" aria-label="Primary">
            {NAV.map((tab) => (
              <div className="nav__tab" key={tab.key}>
                {/* A link, not a button: the click goes to the destination and
                    the panel is opened by hover and by keyboard focus. */}
                <a
                  className="nav__tabBtn"
                  href={tab.href}
                  aria-expanded={hasPanel(tab) ? openTab === tab.key : undefined}
                  aria-controls={hasPanel(tab) ? `nav-panel-${tab.key}` : undefined}
                  aria-current={isCurrent(tab) ? 'page' : undefined}
                  data-active={openTab === tab.key ? '' : undefined}
                  /* the flagship reads as a pill rather than a label — set from
                     the tree, so it can move tabs without touching this file */
                  data-pill={tab.pill ? '' : undefined}
                  onPointerEnter={(e) => hoverOpen(e, tab)}
                  /* Keyboard focus opens the panel; a mouse click must not, or
                     focus would open it a beat before the click navigated away
                     and the panel would flash. A link focused by pointer is not
                     :focus-visible, which is exactly the distinction needed. */
                  onFocus={(e) => {
                    if (hasPanel(tab) && e.target.matches(':focus-visible')) setOpenTab(tab.key)
                  }}
                  onClick={(e) => go(e, tab.href)}
                >
                  {tab.label}
                  {hasPanel(tab) && (
                    <svg viewBox="0 0 10 6" aria-hidden="true">
                      <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  )}
                </a>
              </div>
            ))}
          </nav>

          <div className="nav__util">
            {/* The bar's two actions are now the same vocabulary as the rest of
                the site's: white secondary, red primary. It was a bare text
                link, which made the pair read as a link and a button rather
                than as two buttons of different rank. */}
            <a
              className="btn btn--ghost btn--sm"
              href="/library#login"
              onClick={(e) => go(e, '/library#login')}
            >
              {MEMBER_LOGIN}
            </a>
            <a
              className="btn btn--primary btn--sm"
              href="/connect"
              data-enquiry=""
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
              {/* the links, in labelled groups (a flat tab is one group) */}
              <div className="nav__panelGroups">
                {(panel.groups || [{ title: panel.label, items: panel.items }]).map((g) => (
                  <div className="nav__panelGroup" key={g.title}>
                    <h3 className="nav__panelGroupTitle">{g.title}</h3>
                    <ul className="nav__panelList">
                      {g.items.map((it) => (
                        <li key={it.label}>
                          <a href={it.href} onClick={(e) => go(e, it.href)}>
                            {it.icon && ICONS[it.icon] && (
                              <svg className="nav__itemIcon" viewBox="0 0 24 24" aria-hidden="true">
                                {ICONS[it.icon]}
                              </svg>
                            )}
                            <span className="nav__itemText">
                              <span className="nav__itemLabel">
                                {it.label}
                                {it.note && <span className="nav__itemNote">{it.note}</span>}
                              </span>
                              {it.desc && <span className="nav__itemDesc">{it.desc}</span>}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* the grey side column: the section's own page and the two
                  ways in, as quiet links */}
              <aside className="nav__panelSide">
                <h3 className="nav__panelGroupTitle">Get Started</h3>
                <ul>
                  <li>
                    <a href={panel.href} onClick={(e) => go(e, panel.href)}>
                      All of {panel.label} <span aria-hidden="true">→</span>
                    </a>
                  </li>
                  <li>
                    <a href="/connect" data-enquiry="">
                      Connect With Us
                    </a>
                  </li>
                  <li>
                    <a href="/library#signup" onClick={(e) => go(e, '/library#signup')}>
                      Become a Member
                    </a>
                  </li>
                  <li>
                    <a href="/library#login" onClick={(e) => go(e, '/library#login')}>
                      {MEMBER_LOGIN}
                    </a>
                  </li>
                </ul>
              </aside>
            </div>
          </div>
        )}
      </header>

      {/* ---------------------------- mobile ---------------------------- */}
      <div className="drawer" id="nav-drawer" data-open={drawer ? '' : undefined} hidden={!drawer}>
        {/* Home, then the flagship, then the rest in their bar order — the
            brief puts Web3 Corridor above the others here, where the bar puts
            it last, and Home belongs at the top of a menu wherever it appears.
            Sorted rather than reordered in the tree, so the bar keeps its own
            order, and ranked from the data so neither position is a key this
            file has to recognise. */}
        <div className="drawer__scroll">
          {[...NAV].sort((a, b) => drawerRank(a) - drawerRank(b)).map((tab) => {
            const items = tabItems(tab)
            /* No panel to disclose, so no accordion — just the destination. */
            if (!items.length) {
              return (
                <section className="drawer__acc" key={tab.key} data-pill={tab.pill ? '' : undefined}>
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
                data-pill={tab.pill ? '' : undefined}
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
                      {items.map((it) => (
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
            href="/library#login"
            onClick={(e) => go(e, '/library#login')}
          >
            {MEMBER_LOGIN}
          </a>
          <a
            className="btn btn--primary btn--block"
            href="/connect"
            data-enquiry=""
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
