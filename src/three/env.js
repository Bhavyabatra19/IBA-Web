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

const RED = 0xc0392b // IBA brand red

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

  /* the surround: a cool, dim studio rather than a void */
  envScene.background = new THREE.Color(0x14161a)

  /* key — upper left front, the dominant highlight on every face */
  lightformer(envScene, { w: 7, h: 7, color: 0xffffff, intensity: 4.2, pos: [-6, 5, 6] })

  /* strip — the long specular that crosses the face as the object turns.
     Single most important light for reading metal in motion. */
  lightformer(envScene, { w: 22, h: 1.0, color: 0xf2f6ff, intensity: 7.0, pos: [-1.5, 6.5, 3.2] })
  lightformer(envScene, { w: 17, h: 0.7, color: 0xffffff, intensity: 3.2, pos: [3, -6, 3] })

  /* fill — keeps the shadow side off black without flattening the form */
  lightformer(envScene, { w: 9, h: 9, color: 0xdfe7f2, intensity: 1.0, pos: [7, -2, 5] })

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
