/**
 * matter.js
 * ------------------------------------------------------------------
 * The first two states: the raw fragment, and the pieces that carry it into
 * a disc.
 *
 * The shards do not appear from nowhere — every one of them starts at a point
 * ON the fragment's surface and ends at a point on the coin's silhouette. The
 * fragment then fades while they are already in flight, so the eye reads one
 * object coming apart rather than two objects swapping places.
 *
 * Deterministic throughout: the same fragment and the same flight paths on
 * every reload, because a scrubbed sequence that reshuffles between frames
 * cannot be scrubbed.
 */

import * as THREE from 'three'
import { R_IN, R_OUT } from './coin'

const rand = (i, salt = 0) => {
  const x = Math.sin(i * 78.233 + salt * 158.5453) * 43758.5453
  return x - Math.floor(x)
}

/* ------------------------------------------------------------------ */
/* the primitive fragment                                              */
/* ------------------------------------------------------------------ */

/** Low-frequency displacement along the normal — cast metal, not a sphere. */
function roughen(geo, amp, freq) {
  const p = geo.attributes.position
  const n = geo.attributes.normal
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i)
    const y = p.getY(i)
    const z = p.getZ(i)
    const d =
      amp *
      (Math.sin(x * freq * 1.7 + y * freq * 0.9) * Math.cos(y * freq * 1.3 - z * freq * 2.1) +
        0.55 * Math.sin((x + z) * freq * 3.1) +
        0.3 * Math.cos((y - x) * freq * 5.3))
    p.setXYZ(i, x + n.getX(i) * d, y + n.getY(i) * d, z + n.getZ(i) * d)
  }
  p.needsUpdate = true
  // the surface genuinely moved, so the original normals no longer describe it
  geo.computeVertexNormals()
}

export function buildRock({ quality = 'high' } = {}) {
  const geo = new THREE.IcosahedronGeometry(0.78, quality === 'low' ? 3 : 5)
  roughen(geo, 0.19, 2.4)
  geo.computeBoundingSphere()

  const mat = new THREE.MeshPhysicalMaterial({
    color: 0x8b939b,
    metalness: 1,
    // markedly rougher than the coin: this is the "before", and the finish
    // improving is half of what the sequence is about
    roughness: 0.62,
    envMapIntensity: 1.0,
    transparent: true,
    opacity: 1,
  })

  const mesh = new THREE.Mesh(geo, mat)
  return {
    mesh,
    material: mat,
    /** surface points the shards launch from */
    sample(i) {
      const k = i + 0.5
      const phi = Math.acos(1 - (2 * k) / 200)
      const theta = Math.PI * (1 + Math.sqrt(5)) * k
      const r = 0.72 + rand(i, 11) * 0.22
      return new THREE.Vector3(
        Math.cos(theta) * Math.sin(phi) * r,
        Math.sin(theta) * Math.sin(phi) * r,
        Math.cos(phi) * r
      )
    },
    dispose() {
      geo.dispose()
      mat.dispose()
    },
  }
}

/* ------------------------------------------------------------------ */
/* the shards                                                          */
/* ------------------------------------------------------------------ */

/**
 * Where a shard comes to rest on the assembled disc.
 * Most of them land on the rim, which is what actually draws the circle;
 * the rest fill the faces so the disc reads as solid rather than as a hoop.
 */
function restingPlace(i, count) {
  const onRim = i / count < 0.62
  const t = rand(i, 21)
  const phi = rand(i, 22) * Math.PI * 2

  if (onRim) {
    const r = R_OUT * (0.9 + t * 0.1)
    return {
      pos: new THREE.Vector3(
        Math.cos(phi) * r,
        Math.sin(phi) * r,
        (rand(i, 23) - 0.5) * 0.15
      ),
      rot: new THREE.Euler(rand(i, 24) * 0.5, rand(i, 25) * 0.5, phi),
      scl: new THREE.Vector3(0.1, 0.055, 0.05),
    }
  }
  const r = R_IN + 0.08 + t * (R_OUT - R_IN - 0.2)
  return {
    pos: new THREE.Vector3(
      Math.cos(phi) * r,
      Math.sin(phi) * r,
      (rand(i, 26) > 0.5 ? 1 : -1) * 0.062
    ),
    rot: new THREE.Euler(0.1, 0.1, phi),
    scl: new THREE.Vector3(0.075, 0.05, 0.028),
  }
}

export function buildShards(rock, { quality = 'high' } = {}) {
  const count = quality === 'low' ? 90 : 190

  const geo = new THREE.TetrahedronGeometry(1, 0)
  const mat = new THREE.MeshPhysicalMaterial({
    color: 0xaab2ba,
    metalness: 1,
    roughness: 0.4,
    envMapIntensity: 1.25,
    transparent: true,
    opacity: 0,
  })

  const mesh = new THREE.InstancedMesh(geo, mat, count)
  mesh.frustumCulled = false

  /* start and end transforms, computed once */
  const A = []
  const B = []
  for (let i = 0; i < count; i++) {
    const from = rock.sample(i)
    const scatter = 0.55 + rand(i, 31) * 0.9
    A.push({
      pos: from.clone().multiplyScalar(scatter + 0.55),
      rot: new THREE.Euler(rand(i, 32) * 6.3, rand(i, 33) * 6.3, rand(i, 34) * 6.3),
      scl: new THREE.Vector3(1, 1, 1).multiplyScalar(0.05 + rand(i, 35) * 0.075),
    })
    B.push(restingPlace(i, count))
  }

  const m = new THREE.Matrix4()
  const q = new THREE.Quaternion()
  const e = new THREE.Euler()
  const p = new THREE.Vector3()
  const s = new THREE.Vector3()

  let lastForm = -1

  /** cubic ease so pieces decelerate into place instead of arriving flat */
  const ease = (t) => 1 - Math.pow(1 - t, 3)

  return {
    mesh,
    material: mat,
    /**
     * @param {number} form 0 = scattered on the fragment, 1 = assembled
     */
    setForm(form) {
      if (Math.abs(form - lastForm) < 0.0008) return
      lastForm = form

      for (let i = 0; i < count; i++) {
        // a per-shard offset staggers arrival, so the disc closes progressively
        // rather than every piece snapping home on the same frame
        const lead = rand(i, 41) * 0.42
        const t = ease(Math.min(1, Math.max(0, (form - lead) / (1 - lead))))

        const a = A[i]
        const b = B[i]
        p.lerpVectors(a.pos, b.pos, t)
        // arc the flight out and back in, so paths curve instead of running
        // straight down the radius
        const bulge = Math.sin(t * Math.PI) * 0.34
        p.multiplyScalar(1 + bulge * (1 - t) * 0.7)

        e.set(
          a.rot.x + (b.rot.x - a.rot.x) * t,
          a.rot.y + (b.rot.y - a.rot.y) * t,
          a.rot.z + (b.rot.z - a.rot.z) * t
        )
        q.setFromEuler(e)
        s.lerpVectors(a.scl, b.scl, t)
        m.compose(p, q, s)
        mesh.setMatrixAt(i, m)
      }
      mesh.instanceMatrix.needsUpdate = true
    },
    dispose() {
      geo.dispose()
      mat.dispose()
    },
  }
}
