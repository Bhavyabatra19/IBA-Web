/**
 * coinHero.js
 * ------------------------------------------------------------------
 * The About hero's choreography: rotate → split → open → close → emblem.
 *
 * Four scenes over one pinned range, scrubbed 1:1 with the wheel:
 *
 *   Scene 1 (0–20%)   drift + camera push-in
 *   Scene 2 (20–45%)  the ring splits into two halves — red core ignites
 *   Scene 3 (45–70%)  doors hold open, the alliance claim resolves between them
 *   Scene 4 (70–100%) halves glide back, interlock, become the mark
 *
 * Rules enforced throughout:
 *   - transforms only (x / y / z / rotation / scale) + opacity → compositor-only
 *   - force3D so every animated node gets its own GPU layer
 *   - all pixel distances are function-based and the trigger sets
 *     invalidateOnRefresh, so the choreography re-measures on resize instead
 *     of drifting
 *
 * This is DOM choreography, so it lives beside the page's other DOM
 * choreography in lib/ rather than in rig.js — that file is the WebGL
 * storyboard and deliberately imports no DOM at all.
 */

import { gsap, EASE } from './scroll'

/** The metallic interlock "click". No equivalent in the shared vocabulary —
    it is the only hard-edged overshoot in the piece. */
const CLICK = 'back.out(2.6)'

/* Matches the `max-width: 760px` breakpoint that halves --coin in the
   stylesheet. Deliberately NOT lib/scroll's isMobile(), which sits at 860 for
   the page's grid: the travel distances here have to change on the same line
   the coins themselves change size, or the halves stop clearing the copy. */
const narrow = () => typeof window !== 'undefined' && window.innerWidth < 760

/** How far each half travels during the SPLIT (scene 2). */
const splitDistance = () =>
  narrow() ? window.innerWidth * 0.42 : Math.min(window.innerWidth * 0.3, 480)

/** How far each half travels once the doors are fully OPEN (scene 3). */
const openDistance = () =>
  narrow() ? window.innerWidth * 0.52 : Math.min(window.innerWidth * 0.38, 640)

/**
 * @param {HTMLElement} root  the <section class="chero"> element
 * @returns {gsap.core.Timeline}
 */
export function buildCoinHeroTimeline(root) {
  const q = gsap.utils.selector(root)

  const stack = q('.coin-stack')[0]
  const coins = q('.coin')
  const bloom = q('.chero__core-bloom')[0]
  const headline = q('.chero__copy')[0]
  const revealWrap = q('.chero__reveal')[0]
  const revealItems = q('.chero__reveal-item')
  const emblem = q('.chero__emblem')[0]
  const emblemGlow = q('.chero__emblem-glow')[0]
  const glow = q('.chero__glow')[0]
  const grid = q('.chero__grid')[0]

  /* ---------------- base (scene 0) state ----------------
     The coins sit on a single ring rather than in a scattered pile. The ring is
     squashed vertically, which is what a circle looks like viewed from slightly
     above — and Z tracks the ellipse so the lower coins really are nearer the
     camera than the upper ones.

     GSAP's transform order is translate → rotate(Z) → rotateY → rotateX, so
     rotationZ picks the tilt AXIS and rotationX is the tilt itself. Setting
     rotationZ to the ring angle therefore tips every coin outward from the
     centre, like numerals on a clock face. */
  const n = coins.length
  const mid = (n - 1) / 2
  const coinSize = () => coins[0]?.offsetWidth || 260
  /* Radius has to clear the coins themselves or the ring reads as a clump.
     At 1.55x the disc width the arc spacing is ~70% of a coin, so they overlap
     like links in a bracelet while the circle stays legible — and the hole in
     the middle is where the headline sits. */
  const ringRadius = () => coinSize() * 1.55
  const SQUASH = 0.42 // vertical compression: a circle seen from above

  coins.forEach((coin, i) => {
    // the +0.5 offset keeps any coin from landing exactly on the vertical
    // axis, so the ring splits into two exact halves later
    const aDeg = ((i + 0.5) / n) * 360 - 90
    const a = (aDeg * Math.PI) / 180
    const R = ringRadius()
    const base = {
      x: Math.cos(a) * R,
      y: Math.sin(a) * R * SQUASH,
      // sin(a) > 0 is the lower, near side of the ring
      z: Math.sin(a) * coinSize() * 0.5,
      rotationZ: aDeg, // the tilt axis, tangent to the ring
      rotationX: 46,
      rotationY: -6,
    }
    coin._base = base
    coin._angle = a

    // the stack is composited by paint order, so depth must drive z-index
    gsap.set(coin, {
      ...base,
      zIndex: Math.round(100 + Math.sin(a) * 40),
      transformOrigin: '50% 50%',
      force3D: true,
    })

    // the ring parts down the vertical axis: left arc goes left, right goes right
    coin.dataset.side = Math.cos(a) < 0 ? 'left' : 'right'
  })

  const left = coins.filter((c) => c.dataset.side === 'left')
  const right = coins.filter((c) => c.dataset.side === 'right')

  /* Where the halves interlock in scene 4 — one aligned stack, not the fan.
     Collapsing the petal spread back to zero is what sells the "click". */
  const locked = {
    x: 0,
    y: (i) => (i - mid) * -4,
    z: (i) => (i - mid) * 9,
    rotationZ: (i) => (i - mid) * 2.2,
    rotationX: 16,
    rotationY: -11,
  }

  /* Every start state is written BEFORE the scrubbed timeline is built — a
     scrub renders at progress 0 immediately, so a late set would be lost. */
  gsap.set(bloom, { opacity: 0, transformOrigin: '50% 50%' })
  gsap.set(revealItems, { opacity: 0, y: 48, scale: 0.94 })
  gsap.set(revealWrap, { opacity: 1 })
  gsap.set([emblem, emblemGlow], { opacity: 0, scale: 0.55 })

  /* ---------------- master scrubbed timeline ---------------- */
  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: root,
      start: 'top top',
      end: '+=420%',
      pin: true,
      pinSpacing: true,
      scrub: true, // bound 1:1 to scroll
      anticipatePin: 1,
      invalidateOnRefresh: true,
      fastScrollEnd: true,
    },
  })

  /* ================= SCENE 1 · 0–20% — DRIFT + PUSH IN ================= */
  tl.to(stack, { scale: 1.22, duration: 20, ease: EASE.camera }, 0)
    .to(
      coins,
      {
        /* the whole flower turns, each petal keeping its own tilt */
        rotationZ: (i, el) => el._base.rotationZ + 26,
        rotationY: (i, el) => el._base.rotationY - 9,
        rotationX: (i, el) => el._base.rotationX + 6,
        duration: 20,
        ease: EASE.drift,
      },
      0
    )
    .to(headline, { scale: 1.06, y: -18, duration: 20, ease: EASE.camera }, 0)

  /* background parallax runs across the whole pinned range */
  tl.to(glow, { scale: 1.45, yPercent: 12, duration: 100, ease: EASE.drift }, 0)
  tl.to(grid, { yPercent: -9, opacity: 0.35, duration: 100 }, 0)

  /* ================= SCENE 2 · 20–45% — SPLIT ================= */
  const spread = (i) => 0.78 + i * 0.055

  /* Offsets stay relative to each coin's petal position, so the cluster keeps
     its character while travelling instead of snapping to a rigid column. */
  tl.to(
    left,
    {
      x: (i, el) => el._base.x - splitDistance() * spread(i),
      y: (i, el) => el._base.y - i * 5,
      z: (i, el) => el._base.z + 45,
      rotationY: (i, el) => el._base.rotationY - 22,
      rotationZ: (i, el) => el._base.rotationZ - (7 + i * 2.1),
      duration: 25,
      ease: EASE.seat,
    },
    20
  )
    .to(
      right,
      {
        x: (i, el) => el._base.x + splitDistance() * spread(right.length - 1 - i),
        y: (i, el) => el._base.y + (right.length - 1 - i) * 5,
        z: (i, el) => el._base.z + 45,
        rotationY: (i, el) => el._base.rotationY + 22,
        rotationZ: (i, el) => el._base.rotationZ + (7 + (right.length - 1 - i) * 2.1),
        duration: 25,
        ease: EASE.seat,
      },
      20
    )
    /* headline dissolves as the doors part */
    .to(headline, { opacity: 0, scale: 1.16, y: -46, duration: 14, ease: EASE.camera }, 20)
    /* red light ignites in the opening. It starts small and tight so the glow
       still reads as coming FROM the seam rather than as the whole gap
       brightening at once — which is the job the hard core line used to do. */
    .fromTo(
      bloom,
      { scale: 0.18, opacity: 0 },
      { scale: 1, opacity: 0.92, duration: 24, ease: 'power2.out' },
      21
    )

  /* ================= SCENE 3 · 45–70% — OPEN ================= */
  /* Absolute x here, not base-relative: the petal offsets are what left the
     inner coins overlapping the centre copy. Dropping them squares the two
     halves into clean doors that fully clear the revealed typography. */
  tl.to(
    left,
    {
      x: (i) => -openDistance() * (0.92 + i * 0.06),
      rotationZ: (i, el) => el._base.rotationZ - (11 + i * 2.4),
      duration: 25,
      ease: EASE.camera,
    },
    45
  )
    .to(
      right,
      {
        x: (i) => openDistance() * (0.92 + (right.length - 1 - i) * 0.06),
        rotationZ: (i, el) => el._base.rotationZ + (11 + (right.length - 1 - i) * 2.4),
        duration: 25,
        ease: EASE.camera,
      },
      45
    )
    .to(stack, { scale: 1.1, duration: 25, ease: 'power1.inOut' }, 45)
    /* the glow spreads and drops back, so it lights the revealed copy from
       behind instead of sitting brighter than it */
    .to(bloom, { scale: 1.3, opacity: 0.5, duration: 25, ease: EASE.drift }, 45)
    /* typography fades in from the centre of the gap */
    .to(
      revealItems,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 13,
        ease: EASE.rise,
        stagger: 2.6,
      },
      47
    )

  /* ================= SCENE 4 · 70–100% — CLOSE + EMBLEM ================= */
  tl.to(
    revealItems,
    {
      opacity: 0,
      y: -34,
      scale: 0.96,
      duration: 9,
      ease: 'power2.in',
      stagger: { each: 1.8, from: 'end' },
    },
    70
  )
    /* both halves glide back and interlock — the petal fan collapses to a
       single aligned stack, which is what reads as "locked together" */
    .to(coins, { ...locked, duration: 22, ease: EASE.seat }, 72)
    /* the light shuts down as the halves close over it */
    .to(bloom, { scale: 0.35, opacity: 0, duration: 16, ease: EASE.camera }, 74)

  /* the "metallic click": compress, then snap back with a hard-edged ease */
  tl.to(stack, { scale: 0.93, duration: 4, ease: 'power2.in' }, 87)
    .to(stack, { scale: 1, duration: 7, ease: CLICK }, 91)

  /* stack dissolves into the brand mark */
  tl.fromTo(
    emblem,
    { opacity: 0, scale: 0.5, rotation: -75 },
    { opacity: 1, scale: 1, rotation: 0, duration: 14, ease: EASE.rise },
    86
  )
    .fromTo(
      emblemGlow,
      { opacity: 0, scale: 0.4 },
      { opacity: 1, scale: 1, duration: 14, ease: 'power2.out' },
      86
    )
    .to(
      coins,
      {
        opacity: 0,
        duration: 8,
        ease: 'power2.in',
        stagger: { each: 0.35, from: 'edges' },
      },
      89
    )
    .to(glow, { opacity: 0.35, duration: 12, ease: 'power2.in' }, 88)

  return tl
}

/**
 * The same piece with no scrub and no pin, for a reader who has asked for no
 * motion: the ring is held at its opening state and the claim that scene 3
 * reveals is simply legible, in the flow, where the stylesheet puts it.
 */
export function resolveCoinHero(root) {
  const q = gsap.utils.selector(root)
  const coins = q('.coin')
  const n = coins.length

  coins.forEach((coin, i) => {
    const aDeg = ((i + 0.5) / n) * 360 - 90
    const a = (aDeg * Math.PI) / 180
    const size = coin.offsetWidth || 260
    const R = size * 1.55
    gsap.set(coin, {
      x: Math.cos(a) * R,
      y: Math.sin(a) * R * 0.42,
      z: Math.sin(a) * size * 0.5,
      rotationZ: aDeg,
      rotationX: 46,
      rotationY: -6,
      zIndex: Math.round(100 + Math.sin(a) * 40),
      transformOrigin: '50% 50%',
    })
  })

  gsap.set(q('.chero__reveal-item'), { opacity: 1, y: 0, scale: 1 })
  gsap.set(q('.chero__core-bloom, .chero__emblem, .chero__emblem-glow'), { opacity: 0 })
}
