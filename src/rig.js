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

/** The five states, and where each begins. Drives the hero rail too. */
export const STAGES = [
  { key: 'primitive', name: 'Primitive', at: 0 },
  { key: 'forming', name: 'Forming', at: 18 },
  { key: 'coin', name: 'Coin', at: 40 },
  { key: 'blockchain', name: 'Blockchain', at: 58 },
  { key: 'future', name: 'Future', at: 78 },
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
    /* the irregular fragment we start from */
    rock: { op: hero ? 1 : 0, scale: 1, spin: 0, shatter: 0 },
    /* the pieces that carry it from fragment to disc */
    shards: { op: 0, form: 0, spin: 0 },
    /* the coin, as two halves that can part */
    coin: { op: hero ? 0 : 1, split: hero ? 0 : 0.12, spinY: hero ? -2.1 : 0, tilt: 0, scale: 1 },
    /* the lattice inside it */
    core: { op: hero ? 0 : 1, expand: hero ? 0 : 0.3, spin: 0, energy: 0 },
    cam: { x: 0, y: 0, z: hero ? 7.4 : 6.4, fov: 38 },
    bloom: 0.22,
    tail: 0,
  }
}

/* ================================================================== */
/* HERO — primitive → forming → coin → blockchain → future             */
/* ================================================================== */
export function buildHeroTimeline(R) {
  const tl = gsap.timeline({ paused: true, defaults: { ease: 'none' } })

  /* ---------- 1 · PRIMITIVE · 0–18 ----------
     A rough fragment, turning. No structure to read yet — the whole point of
     the opening is that there is nothing here that was made. */
  tl.to(R.cam, { z: 5.7, duration: 18, ease: EASE.camera }, 0)
    .to(R.rock, { spin: 1.15, duration: 18, ease: EASE.drift }, 0)
    .to(R, { bloom: 0.3, duration: 18 }, 0)

  /* ---------- 2 · FORMING · 18–40 ----------
     The fragment comes apart and the pieces start finding the circle. Shards
     lead the rock's own fade so there is never a frame with nothing in it. */
  tl.to(R.shards, { op: 1, duration: 5, ease: EASE.rise }, 18)
    .to(R.rock, { shatter: 1, duration: 12, ease: EASE.matter }, 18)
    .to(R.rock, { op: 0, duration: 8, ease: 'power2.in' }, 20)
    .to(R.shards, { form: 1, duration: 21, ease: EASE.matter }, 19)
    .to(R.shards, { spin: 0.9, duration: 22, ease: EASE.drift }, 18)
    .to(R.cam, { z: 5.2, duration: 22, ease: EASE.camera }, 18)

  /* ---------- 3 · COIN · 40–58 ----------
     The pieces resolve into the struck object. They cross-fade rather than cut:
     the shards hold their assembled positions while the coin arrives underneath
     them, so the swap reads as consolidation, not as a replacement. */
  tl.to(R.coin, { op: 1, duration: 9, ease: 'power2.out' }, 40)
    .to(R.shards, { op: 0, duration: 8, ease: 'power2.in' }, 41.5)
    .to(R.coin, { spinY: 0, duration: 18, ease: EASE.seat }, 40)
    .to(R.coin, { tilt: 0.1, duration: 18, ease: EASE.camera }, 40)
    .to(R.cam, { z: 4.9, duration: 18, ease: EASE.camera }, 40)

  /* ---------- 4 · BLOCKCHAIN · 58–78 ----------
     The seam opens just enough to show there is something inside. The interior
     is lit from within before it is revealed, so the opening reveals a working
     thing rather than an empty shell. */
  tl.to(R.core, { op: 1, duration: 10, ease: 'power2.out' }, 58)
    .to(R.coin, { split: 0.24, duration: 20, ease: EASE.matter }, 58)
    .to(R.core, { expand: 0.55, duration: 20, ease: EASE.matter }, 58)
    .to(R.core, { energy: 0.5, duration: 20, ease: 'power2.out' }, 58)
    .to(R.core, { spin: 0.55, duration: 20, ease: 'none' }, 58)
    .to(R.cam, { z: 4.5, x: 0.28, duration: 20, ease: EASE.camera }, 58)
    .to(R, { bloom: 0.5, duration: 20, ease: 'power2.in' }, 58)

  /* ---------- 5 · FUTURE · 78–100 ----------
     The halves seat fully apart and hold, perfectly aligned. The camera settles
     back rather than pushing in: the object has become the subject, and crowding
     it at the end loses the symmetry that the whole sequence was building. */
  tl.to(R.coin, { split: 1, duration: 22, ease: EASE.seat }, 78)
    .to(R.core, { expand: 1, duration: 22, ease: EASE.matter }, 78)
    .to(R.core, { spin: 1.5, duration: 22, ease: 'none' }, 78)
    .to(R.core, { energy: 1, duration: 18, ease: 'power2.out' }, 78)
    .to(R.cam, { z: 5.5, x: 0, y: 0.12, duration: 22, ease: EASE.camera }, 78)
    .to(R, { bloom: 0.78, duration: 14, ease: 'power2.out' }, 80)

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
