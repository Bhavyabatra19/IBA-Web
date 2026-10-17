/**
 * env.js
 * ------------------------------------------------------------------
 * The lighting rig, built as geometry and pre-filtered with PMREM instead of
 * loading an .hdr.
 *
 * No binary asset to ship or version, every reflection stays inside the
 * black / white / silver / crimson palette, and each light is a plane you can
 * move rather than a pixel you can't.
 *
 * A metal surface is almost entirely a picture of its surroundings, so this
 * file — not the material — is where the object's look actually lives. Two
 * rules learned the hard way and worth keeping:
 *
 *   · the dome is never pure black. A mirror in a black room is a black
 *     object; the surround is what keeps silver reading as silver.
 *   · sources stay SMALL and hot. A large emitter covers most of the
 *     reflection hemisphere and washes the whole surface flat; a small one
 *     reads as a highlight with metal around it.
 */

import * as THREE from 'three'

const RED = 0xd71920 // IBA brand red

function lightformer(scene, { w, h, color, intensity, pos, lookAt = [0, 0, 0] }) {
  const m = new THREE.Mesh(
    new THREE.PlaneGeometry(w, h),
    new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, toneMapped: false })
  )
  // PMREM renders to a half-float target, so values above 1 survive and read
  // as genuinely bright sources rather than clipping to white
  m.material.color.set(color).multiplyScalar(intensity)
  m.position.set(...pos)
  m.lookAt(...lookAt)
  scene.add(m)
}

export function buildEnvironment(renderer, { quality = 'high' } = {}) {
  const envScene = new THREE.Scene()

  /**
   * The surround, and it went DARKER.
   *
   * Polished metal is a contrast instrument: what makes a coin read as chrome
   * rather than as grey plastic is having near-white and near-black on the same
   * face at the same time. The bright half comes from the sources below, and it
   * only reads as bright if there is something genuinely dark for it to sit
   * against — so the dome came down from 0x14161a and the key went up.
   *
   * Still not pure black, for the reason at the top of this file: a mirror in a
   * black room is a black object.
   */
  envScene.background = new THREE.Color(0x161a1f)

  /* key — upper left front, the dominant highlight on every face. Broad and no
     longer hot: a large soft source is what LIGHTS a face; a small bright one
     puts a spot on it. */
  lightformer(envScene, { w: 11, h: 11, color: 0xffffff, intensity: 3.2, pos: [-6, 5, 6] })

  /**
   * The strip — the long specular that crosses the face as the object turns,
   * and the single most important light for reading metal in motion.
   *
   * ⚠ This was run to 11 with the height at 0.62 and the coin went to liquid
   * chrome. Width and intensity trade against each other: a narrow strip at
   * high intensity is a laser line, a broad one at moderate intensity is a
   * sheen that still travels. It is the second of those now — wider than it has
   * ever been here and dimmer than the file started with, because the brief on
   * this object is machined metal, not a mirror.
   */
  lightformer(envScene, { w: 24, h: 1.8, color: 0xf2f6ff, intensity: 4.4, pos: [-1.5, 6.5, 3.2] })
  lightformer(envScene, { w: 18, h: 1.2, color: 0xffffff, intensity: 2.2, pos: [3, -6, 3] })

  /* fill — keeps the shadow side off black without flattening the form. Up as
     the key comes down, so the object loses glare rather than losing light. */
  lightformer(envScene, { w: 12, h: 12, color: 0xdfe7f2, intensity: 1.6, pos: [7, -2, 5] })

  /* crimson rim, behind and above. Everything that makes this object belong to
     this brand rather than to a generic metal render comes from these two. */
  lightformer(envScene, { w: 13, h: 7, color: RED, intensity: 3.6, pos: [0, 1.5, -8] })
  lightformer(envScene, { w: 6, h: 6, color: RED, intensity: 1.9, pos: [-6.5, -2.5, -4] })

  /* floor — near-black, so the underside grounds instead of glowing */
  lightformer(envScene, { w: 24, h: 24, color: 0x050506, intensity: 1, pos: [0, -7, 0] })

  const pmrem = new THREE.PMREMGenerator(renderer)
  const rt = pmrem.fromScene(envScene, quality === 'low' ? 0.06 : 0.035)
  pmrem.dispose()

  envScene.traverse((o) => {
    if (o.isMesh) {
      o.geometry.dispose()
      o.material.dispose()
    }
  })

  return rt.texture
}
