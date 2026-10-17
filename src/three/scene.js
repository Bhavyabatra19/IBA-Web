/**
 * scene.js
 * ------------------------------------------------------------------
 * One WebGL context for the whole page.
 *
 * The hero and the "break open" section are the same object read at two
 * different distances, so they share a scene, a renderer and a render loop.
 * A second canvas would mean a second context, a second copy of the geometry
 * and a second environment map, for a picture the viewer reads as continuous.
 *
 * `apply(rig)` is the only way anything moves. It takes the plain object the
 * timelines in rig.js write to and copies it onto the scene — no scroll
 * position is read here, and no animation state is stored here.
 */

import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js'
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js'

import { buildEnvironment } from './env'
import { buildCoin } from './coin'
import { buildCore } from './core'
import { buildShaft } from './shaft'
/* ./matter — the fragment and the shards — is no longer imported. The sequence
   opens on the coin now, so nothing ever showed them; built anyway they were a
   subdivided icosahedron and a 190-instance mesh uploaded to the GPU on the
   page that can least afford it. The file is kept, and rig.js says why. */

/** How far each half travels at split = 1. Wide enough to clear the lattice. */
const SPLIT_D = 1.05
/**
 * The split at which the cut faces start being drawn.
 *
 * At 0.004 the halves are 0.008 units apart — under a pixel at this camera
 * distance, so the faces appear on the frame the gap between them becomes
 * something a reader could see through. Below it they are hidden, because a
 * plane seen exactly edge-on is not a picture of anything: see the note on the
 * cap meshes in coin.js.
 */
const CUT_IN = 0.004
/** The lattice inside the closed coin has to fit through the aperture. */
const CORE_MIN = 0.2

const lerp = (a, b, t) => a + (b - a) * t

export function createScene(canvas, { quality = 'high' } = {}) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: false, // SMAA runs in the composer instead
    powerPreference: 'high-performance',
    alpha: false,
  })
  renderer.setClearColor(0x000000, 1)
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.0

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
  /* where the rig opens, so the one frame that may be drawn before apply() has
     run is the frame the sequence starts on rather than the old one */
  camera.position.set(0, 0, 4.9)

  scene.environment = buildEnvironment(renderer, { quality })

  /* ---------------- objects ---------------- */
  const coin = buildCoin({ quality })
  const core = buildCore({ quality })
  const shaft = buildShaft()

  /* one parent so camera-independent tilt/spin applies to the whole assembly */
  const rig = new THREE.Group()
  rig.add(coin.group, core.group)
  scene.add(rig)

  /* Added to the scene and NOT to the rig: the rig is the object, and the shaft
     is the room the object is in. Inside the rig it would tilt and spin with
     the coin, which is the one thing a fixed light must not do. */
  scene.add(shaft.mesh)

  core.setOpacity(0)
  core.setEnergy(0)

  /* ---------------- post ---------------- */
  const composer = new EffectComposer(renderer)
  composer.addPass(new RenderPass(scene, camera))

  const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.22, 0.65, 1.6)
  // Threshold applies to the LINEAR buffer, before tone mapping. A lit metal
  // specular sits several units above 1.0 there, so a threshold near 1.0 blooms
  // the entire object into a white disc.
  composer.addPass(bloom)
  composer.addPass(new OutputPass())
  const smaa = quality === 'high' ? new SMAAPass() : null
  if (smaa) composer.addPass(smaa)

  /* ---------------- sizing ---------------- */
  let dpr = 1
  function setSize(w, h) {
    dpr = Math.min(window.devicePixelRatio || 1, quality === 'high' ? 2 : 1.5)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setPixelRatio(dpr)
    renderer.setSize(w, h, false)
    composer.setPixelRatio(dpr)
    composer.setSize(w, h)
    bloom.setSize(w, h)
  }

  /* ---------------- the state pass ---------------- */
  const pointer = { x: 0, y: 0 }

  function apply(R) {
    /* camera — a real dolly, plus a restrained pointer parallax so the frame
       is never completely dead while the reader is not scrolling */
    camera.position.set(R.cam.x + pointer.x * 0.34, R.cam.y + pointer.y * 0.24, R.cam.z)
    if (camera.fov !== R.cam.fov) {
      camera.fov = R.cam.fov
      camera.updateProjectionMatrix()
    }
    camera.lookAt(0, R.cam.y * 0.2, 0)
    shaft.mesh.visible = !R.hideShaft

    /* coin */
    const coinVisible = R.coin.op > 0.002
    coin.group.visible = coinVisible
    if (coinVisible) {
      for (const mat of coin.materials) mat.opacity = R.coin.op
      const d = R.coin.split * SPLIT_D
      coin.halves[0].position.x = d
      coin.halves[1].position.x = -d
      /* the interior, shown only once there is a gap to see it through */
      const cut = R.coin.split > CUT_IN
      coin.caps[0].visible = cut
      coin.caps[1].visible = cut
      // the halves ease apart along a slight arc rather than sliding on a rail
      coin.halves[0].rotation.z = -R.coin.split * 0.06
      coin.halves[1].rotation.z = R.coin.split * 0.06
      coin.group.rotation.set(R.coin.tilt * 0.9, R.coin.spinY, 0)
      coin.group.scale.setScalar(R.coin.scale)
    }

    /* lattice */
    core.setOpacity(R.core.op)
    if (R.core.op > 0.002) {
      core.setEnergy(R.core.energy)
      core.group.scale.setScalar(lerp(CORE_MIN, 1, R.core.expand))
      core.group.rotation.set(R.core.spin * 0.42, R.core.spin, R.core.spin * 0.17)
      // frames counter-rotate against the node cloud so the interior reads as
      // moving parts rather than as one rigid ball turning
      const f = core.frames
      for (let i = 0; i < f.length; i++) {
        const dir = i % 2 === 0 ? -1 : 1
        f[i].rotation.set(
          f[i].userData.base[0] + R.core.spin * 0.9 * dir,
          f[i].userData.base[1] + R.core.spin * 0.5 * dir,
          f[i].userData.base[2]
        )
      }
      core.group.position.x = 0
    }

    /* the coin tilt carries the whole assembly, so the lattice stays seated
       between the halves however the object is turned */
    rig.rotation.set(0, 0, 0)

    bloom.strength = R.bloom
  }

  function render() {
    composer.render()
  }

  function setPointer(nx, ny) {
    pointer.x = nx
    pointer.y = ny
  }

  function dispose() {
    shaft.dispose()
    core.dispose()
    for (const mat of coin.materials) mat.dispose()
    coin.group.traverse((o) => o.geometry && o.geometry.dispose())
    scene.environment?.dispose()
    composer.dispose?.()
    renderer.dispose()
  }

  return { apply, render, setSize, setPointer, dispose, renderer, camera, scene }
}
