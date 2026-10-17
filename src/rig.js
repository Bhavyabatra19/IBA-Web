/**
 * rig.js
 * ------------------------------------------------------------------
 * The evolution, authored as data.
 *
 * Nothing in this file imports three.js. Every tween writes to a plain object,
 * and one pass per frame copies that object onto the scene. Three reasons that
 * separation matters here:
 *
 *   1. a scrubbed timeline has to render identically forwards and backwards,
 *      and plain numbers do that for free;
 *   2. the storyboard stays readable as a storyboard;
 *   3. the same timelines can drive a WebGL scene, a reduced-motion still, or
 *      a mobile scene with fewer objects, without being rewritten.
 *
 * Timelines are 100 units long so one unit reads as one percent of the pinned
 * scroll distance. A tail marker pins the length: a GSAP timeline's duration is
 * wherever its last tween happens to end, and one overrunning tween silently
 * rescales every position parameter in the file.
 *
 * `.to()` only, never `.fromTo()`. fromTo defaults to immediateRender:true,
 * which writes its from-value the moment the tween is constructed — in a
 * paused, scrubbed timeline that pins the property for the whole sequence.
 */

import gsap from 'gsap'
import { EASE } from './lib/scroll'

/**
 * The two states, and where each begins.
 *
 * There were five. The sequence opened on a rough fragment that turned, then
 * shattered into shards that flew into the shape of the disc, then struck the
 * coin and turned it square to the reader — four fifths of the pin spent
 * arriving at the object rather than showing it. It now opens ON that object,
 * seated and closed, and the two states that remain are what it then does:
 * the seam opens, and the halves part.
 *
 * The two that remain are stretched to fill the same hundred units in their
 * old proportions, so every beat still lands where it did inside its own state.
 *
 * The fragment and the shards still exist in three/matter.js. Nothing builds
 * them any more; the file is kept because this is not a repository and a
 * deleted file here is a deleted file.
 */
export const STAGES = [
  { key: 'blockchain', name: 'Blockchain', at: 0 },
  { key: 'future', name: 'Future', at: 49 },
]

export const stageAt = (pct) => {
  let i = 0
  for (let k = 0; k < STAGES.length; k++) if (pct >= STAGES[k].at) i = k
  return i
}

/**
 * @param {'hero'|'break'} mode
 */
export function makeRig(mode = 'hero') {
  const hero = mode === 'hero'
  return {
    /* The coin, as two halves that can part — and the frame the hero opens on:
       present, square to the reader, and shut. It used to arrive turned away
       and seat itself over the first third of the pin; it is now already
       seated, so `spinY` and `tilt` start where that beat left them and the
       sequence begins with the object rather than with its approach. */
    coin: { op: 1, split: hero ? 0 : 0.12, spinY: 0, tilt: hero ? 0.1 : 0, scale: 1 },
    /* the lattice inside it */
    core: { op: hero ? 0 : 1, expand: hero ? 0 : 0.3, spin: 0, energy: 0 },
    /* Where the camera and the light stood when the seam was about to open.
       Starting them where the removed states left them is what keeps the
       opening frame the frame it always was at that point in the sequence. */
    cam: { x: 0, y: 0, z: hero ? 4.9 : 6.4, fov: 38 },
    bloom: hero ? 0.3 : 0.22,
    tail: 0,
  }
}

/* ================================================================== */
/* HERO — blockchain → future                                          */
/* ================================================================== */
/**
 * The two durations are the old ones scaled by 100/70, because the three
 * removed states were thirty of the hundred units that were left: 34 → 49,
 * 36 → 51. Every offset inside a state is scaled by the same figure, so each
 * beat still lands at the same point within its own state as it always did.
 */
export function buildHeroTimeline(R) {
  const tl = gsap.timeline({ paused: true, defaults: { ease: 'none' } })

  /* ---------- 1 · BLOCKCHAIN · 0–49 ----------
     The seam opens just enough to show there is something inside. The interior
     is lit from within before it is revealed, so the opening reveals a working
     thing rather than an empty shell.

     Nothing introduces the coin before this: it is the first thing on the page
     and it is already there, closed, so the sequence's first move is the one
     move that matters. */
  tl.to(R.core, { op: 1, duration: 24, ease: 'power2.out' }, 0)
    .to(R.coin, { split: 0.24, duration: 49, ease: EASE.matter }, 0)
    .to(R.core, { expand: 0.55, duration: 49, ease: EASE.matter }, 0)
    .to(R.core, { energy: 0.5, duration: 49, ease: 'power2.out' }, 0)
    .to(R.core, { spin: 0.55, duration: 49, ease: 'none' }, 0)
    .to(R.cam, { z: 4.5, x: 0.28, duration: 49, ease: EASE.camera }, 0)
    .to(R, { bloom: 0.5, duration: 49, ease: 'power2.in' }, 0)

  /* ---------- 2 · FUTURE · 49–100 ----------
     The halves seat fully apart and hold, perfectly aligned. The camera settles
     back rather than pushing in: the object has become the subject, and crowding
     it at the end loses the symmetry that the whole sequence was building. */
  tl.to(R.coin, { split: 1, duration: 51, ease: EASE.seat }, 49)
    .to(R.core, { expand: 1, duration: 51, ease: EASE.matter }, 49)
    .to(R.core, { spin: 1.5, duration: 51, ease: 'none' }, 49)
    .to(R.core, { energy: 1, duration: 43, ease: 'power2.out' }, 49)
    .to(R.cam, { z: 5.5, x: 0, y: 0.12, duration: 51, ease: EASE.camera }, 49)
    .to(R, { bloom: 0.78, duration: 33, ease: 'power2.out' }, 53)

  tl.set(R, { tail: 1 }, 100)
  return tl
}

/* ================================================================== */
/* BREAK OPEN — the same object, read close up                         */
/* ================================================================== */
export function buildBreakTimeline(R) {
  const tl = gsap.timeline({ paused: true, defaults: { ease: 'none' } })

  tl.to(R.coin, { split: 1, duration: 100, ease: EASE.seat }, 0)
    .to(R.core, { expand: 1, duration: 100, ease: EASE.matter }, 0)
    .to(R.core, { spin: 2.4, duration: 100, ease: 'none' }, 0)
    .to(R.core, { energy: 1, duration: 78, ease: 'power2.out' }, 12)
    /* the only beat in the piece where the camera actually closes in */
    .to(R.cam, { z: 3.5, y: 0.05, duration: 100, ease: EASE.camera }, 0)
    .to(R.coin, { tilt: 0.16, duration: 100, ease: EASE.camera }, 0)
    .to(R, { bloom: 0.85, duration: 70, ease: 'power2.in' }, 20)

  tl.set(R, { tail: 1 }, 100)
  return tl
}

/* ================================================================== */
/* Reduced motion — the same states, delivered without a scrub          */
/* ================================================================== */
/**
 * Resolve a rig to a fixed point on its timeline. Used when the reader has
 * asked for no motion: they still get the object at its most legible state
 * rather than an empty frame or a spinner.
 */
export function resolveRig(R, tl, pct) {
  tl.progress(pct / 100)
  return R
}
