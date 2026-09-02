/**
 * scroll.js
 * ------------------------------------------------------------------
 * One scroll authority for the whole page.
 *
 * Lenis is driven by the GSAP ticker and drives ScrollTrigger.update, so the
 * page has exactly one RAF loop — the 3D scene renders from that same loop
 * rather than starting a second one. Two loops is how scrubbed WebGL ends up
 * a frame behind the DOM.
 */

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)
gsap.defaults({ force3D: true })
gsap.config({ nullTargetWarn: false })

/* Easing vocabulary. Named for what they are used FOR, so the choreography
   reads as intent rather than as a list of bezier curves. */
export const EASE = {
  /** camera and depth moves */
  camera: 'power2.inOut',
  /** matter reorganising — the forming and splitting beats */
  matter: 'power3.inOut',
  /** entrances */
  rise: 'power3.out',
  /** the mechanical seat of the two halves */
  seat: 'expo.inOut',
  /** ambient drift */
  drift: 'sine.inOut',
}

export const reducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const isCoarse = () =>
  typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

export const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 860

/**
 * Boot smooth scrolling. Returns a teardown.
 * Under reduced motion this is a no-op and the browser's native scroll is left
 * alone — hijacking scroll is itself a motion effect.
 */
/**
 * The live Lenis instance, or null under reduced motion / before boot.
 * Held at module scope because the overlays (nav drawer, auth modal) and the
 * anchor links have to talk to the same scroll authority the page runs on —
 * a second instance, or touching window.scrollTo behind Lenis's back, is how
 * a locked overlay ends up scrolling the page underneath it anyway.
 */
let lenis = null

export function initSmoothScroll() {
  if (reducedMotion()) return () => {}

  lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.6,
  })

  lenis.on('scroll', ScrollTrigger.update)
  const raf = (time) => lenis.raf(time * 1000)
  gsap.ticker.add(raf)
  gsap.ticker.lagSmoothing(0)

  return () => {
    gsap.ticker.remove(raf)
    lenis.destroy()
    lenis = null
  }
}

/* ------------------------------------------------------------------ */
/* Overlay scroll lock                                                 */
/* ------------------------------------------------------------------ */

/* Counted, not a boolean: the mobile drawer can open the auth modal on top of
   itself, and closing the modal must not hand scrolling back to a reader who
   still has the drawer covering the page. */
let locks = 0

export function lockScroll() {
  if (++locks > 1) return
  lenis?.stop()
  /* also for the reduced-motion path, where there is no Lenis to stop */
  document.documentElement.classList.add('is-locked')
}

export function unlockScroll() {
  if (locks === 0 || --locks > 0) return
  lenis?.start()
  document.documentElement.classList.remove('is-locked')
}

/** Jump to the top, through the scroll authority so Lenis stays in sync. */
/**
 * `immediate` defaults to true because the callers that came first are route
 * changes and the footer lockup, where the reader is being put at the top of
 * something new and easing there would only show them the page they are
 * leaving. The back-to-top control passes false: there the travel IS the
 * feedback, and a page that simply blinks to the top leaves the reader
 * wondering whether it is the same page.
 */
export function scrollToTop({ immediate = true } = {}) {
  if (lenis) lenis.scrollTo(0, { immediate })
  else window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' })
}

/**
 * Send the page to an in-page anchor through the scroll authority.
 *
 * A native hash jump would move the scroll position out from under Lenis,
 * which then eases back from wherever it thought it was — so every nav link
 * routes through here instead. Returns false if the target does not exist,
 * letting the caller fall back to normal link behaviour.
 */
export function scrollToId(hash, { immediate = false } = {}) {
  if (!hash?.startsWith('#')) return false
  const el = document.querySelector(hash)
  if (!el) return false

  const navH = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue('--nav-h')
  ) || 0

  /* `immediate` is for arriving on a new page: the reader asked for a section
     of a document they have not seen, so easing them through a screenful of
     content they never chose to look at is theatre, not orientation. */
  if (lenis) lenis.scrollTo(el, { offset: -navH, duration: immediate ? 0 : 1.2, immediate })
  else el.scrollIntoView({ behavior: immediate || reducedMotion() ? 'auto' : 'smooth' })

  /* the hash still belongs in the URL — just without the browser's jump */
  if (history.replaceState) history.replaceState(null, '', hash)
  return true
}

/** Re-measure once fonts land — web font metrics move every trigger. */
export function refreshOnLoad() {
  const refresh = () => ScrollTrigger.refresh()
  if (document.fonts?.ready) document.fonts.ready.then(refresh)
  window.addEventListener('load', refresh)
  const t = setTimeout(refresh, 700)
  return () => {
    window.removeEventListener('load', refresh)
    clearTimeout(t)
  }
}

/* ------------------------------------------------------------------ */
/* Shared DOM choreography                                             */
/* ------------------------------------------------------------------ */

/** The offscreen start for a clip-reveal, in percent of the line's own height. */
export const CLIP_FROM = 108

/**
 * Where a section's reveal fires, for every section on the site.
 *
 * These were written out at the call sites and had drifted to five different
 * pairs — 80/76, 78/74, 76/72, 74/70, 72/68. No section meant anything by its
 * own number, and the result was that scrolling the page felt uneven: the same
 * kind of block arriving at a slightly different depth each time is a thing a
 * reader feels without being able to name it.
 *
 * The heading goes first and the rest of the block follows it four points
 * later, so the section reads top-down rather than arriving all at once.
 *
 * A section that genuinely needs its own threshold still passes `start` — the
 * credibility bar does, because it is a strip a few lines tall sitting close
 * under the fold, and the shared value would have it play off screen.
 */
export const REVEAL_LINES = 'top 78%'
export const REVEAL_RISE = 'top 74%'

/**
 * Clip-reveal for headline lines wrapped in .line > .line__inner.
 *
 * The `gsap.set` is not redundant. The start state is declared in CSS as a
 * PERCENTAGE transform, and getComputedStyle resolves percentages to pixels —
 * so GSAP parses the matrix, records y in px, and believes yPercent is already
 * 0. Animating to yPercent: 0 is then a no-op and the line never arrives.
 * Restating it here puts GSAP's own transform record in percent units first.
 */
export function revealLines(scope, opts = {}) {
  const inners = gsap.utils.toArray('[data-clip] .line__inner', scope)
  if (!inners.length) return
  gsap.set(inners, { yPercent: CLIP_FROM, y: 0 })
  return gsap.to(inners, {
    yPercent: 0,
    duration: 1.25,
    ease: EASE.rise,
    stagger: 0.09,
    scrollTrigger: opts.trigger
      ? { trigger: opts.trigger, start: opts.start ?? REVEAL_LINES, once: true }
      : undefined,
    delay: opts.delay ?? 0,
  })
}

/**
 * Runs `on` while `el` is on screen and `off` while it is not, and returns the
 * teardown.
 *
 * An IntersectionObserver rather than a ScrollTrigger, for the reason nav.js
 * sets out at length: a ScrollTrigger records a document position at the moment
 * it is created, and anything created before the home hero installs its
 * five-viewport pin is recorded roughly a pin's worth too high — and because
 * those stale positions also decide refresh order, later refreshes do not
 * correct them. A gate that is wrong in that direction never opens, and the
 * thing it was gating simply never runs.
 *
 * An observer is answered by the browser from live geometry every time. It
 * cannot be stale, and it does not care what else on the page has resized.
 *
 * This is only ever the right tool for "is it visible" — anything that needs a
 * position WITHIN the scroll still wants a ScrollTrigger.
 */
export function whileOnScreen(el, on, off) {
  if (!el) return () => {}
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) (e.isIntersecting ? on : off)()
  })
  io.observe(el)
  return () => io.disconnect()
}

/** Generic staggered rise for anything marked [data-rise]. */
export function revealRise(scope, opts = {}) {
  const items = gsap.utils.toArray('[data-rise]', scope)
  if (!items.length) return
  return gsap.to(items, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: EASE.rise,
    stagger: opts.stagger ?? 0.1,
    scrollTrigger: opts.trigger
      ? { trigger: opts.trigger, start: opts.start ?? REVEAL_RISE, once: true }
      : undefined,
    delay: opts.delay ?? 0,
  })
}

/**
 * Ticks every [data-count] in `scope` up to its target the first time it
 * enters view.
 *
 * The element's markup already contains the final value, so a reader with no
 * JS, a failed hydrate, or reduced motion still sees the real number — the
 * animation only ever replaces a number that was already correct.
 *
 *   <span data-count="800" data-suffix="+">800+</span>
 *
 * `immediate` counts on mount instead, with no trigger. For figures that are
 * already on screen when the page opens: a trigger at "top 88%" fires the
 * instant it is created, so the count would be over before the copy around it
 * has finished arriving — and it can never fire a second time on the way back.
 */
export function buildCounters(scope, opts = {}) {
  gsap.utils.toArray('[data-count]', scope).forEach((el) => {
    const target = parseFloat(el.dataset.count)
    if (!Number.isFinite(target)) return
    const prefix = el.dataset.prefix || ''
    const suffix = el.dataset.suffix || ''
    const n = { v: 0 }

    const render = () => {
      el.textContent = prefix + Math.round(n.v).toLocaleString('en-IN') + suffix
    }
    render()

    gsap.to(n, {
      v: target,
      duration: 1.9,
      ease: 'power2.out',
      snap: { v: 1 },
      onUpdate: render,
      delay: opts.immediate ? opts.delay ?? 0 : 0,
      scrollTrigger: opts.immediate
        ? undefined
        : { trigger: el, start: 'top 88%', once: true },
    })
  })
}

export { gsap, ScrollTrigger }
