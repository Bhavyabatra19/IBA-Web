/**
 * heroScene.js
 * ------------------------------------------------------------------
 * The renderer behind an inner page's hero object.
 *
 * Why not the shared fullscreen stage: that canvas is fixed and covers the
 * viewport, and its `apply` is written for the home page's coin assembly. These
 * objects sit in the right half of a hero band beside a headline, which a
 * fullscreen canvas cannot do, and the home page's hero already owns the stage.
 *
 * What it does share is env.js, so a hero object is lit by exactly the same rig
 * as the coin and reads as the same metal in the same room.
 *
 * No EffectComposer. The shared stage needs one for the coin's bloom; nothing
 * here blooms, so a plain render with MSAA from the renderer costs a fraction
 * of a second post chain on a second context.
 */

import * as THREE from 'three'
import { buildEnvironment } from './env'
import { buildHeroObject } from './heroArt'

/** Where the camera sits for each object — they are not the same size. */
const FRAMING = {
  services: { z: 7.0, fov: 34, y: 0.1 },
  studio: { z: 7.4, fov: 36, y: 0 },
  library: { z: 7.6, fov: 36, y: 0.15 },
}

export function createHeroScene(canvas, { kind, quality = 'high' } = {}) {
  const object = buildHeroObject(kind, { quality })
  if (!object) return null

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    powerPreference: 'high-performance',
    /* transparent, so the object sits in the band's own dark rather than in a
       black rectangle pasted over it */
    alpha: true,
  })
  renderer.setClearAlpha(0)
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.05

  const frame = FRAMING[kind] ?? FRAMING.studio
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(frame.fov, 1, 0.1, 40)
  camera.position.set(0, frame.y, frame.z)

  scene.environment = buildEnvironment(renderer, { quality })
  scene.add(object.group)
  object.setOpacity(0)

  function setSize(w, h) {
    const dpr = Math.min(window.devicePixelRatio || 1, quality === 'high' ? 2 : 1.5)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setPixelRatio(dpr)
    renderer.setSize(w, h, false)
  }

  const pointer = { x: 0, y: 0 }

  /**
   * @param {object} R
   * @param {number} R.op    0..1 entrance opacity
   * @param {number} R.t     seconds — drives the idle drift
   * @param {number} R.scrub 0..1 how far the hero has scrolled away
   */
  function apply(R) {
    /* A restrained parallax, so the frame is never completely dead while the
       reader is sitting still reading the headline next to it. */
    camera.position.set(pointer.x * 0.55, frame.y + pointer.y * 0.4, frame.z)
    camera.lookAt(0, 0, 0)

    object.setOpacity(R.op)
    if (R.op <= 0.002) return
    object.update(R.t, R.scrub)
  }

  function render() {
    renderer.render(scene, camera)
  }

  function setPointer(nx, ny) {
    pointer.x = nx
    pointer.y = ny
  }

  function dispose() {
    object.dispose()
    scene.environment?.dispose()
    renderer.dispose()
  }

  return { apply, render, setSize, setPointer, dispose }
}
