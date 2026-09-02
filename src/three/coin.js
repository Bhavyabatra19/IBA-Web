/**
 * coin.js
 * ------------------------------------------------------------------
 * The coin, built as two solid halves that can part.
 *
 * Geometry, not a texture. The profile is revolved with LatheGeometry over
 * half a turn, and the flat cut face is a ShapeGeometry of the same profile's
 * cross-section — so when the halves separate you are looking at a solid
 * object that has been divided, not at two hollow shells.
 *
 *   LatheGeometry maps a profile point (r, y) at angle φ to
 *       (r·sin φ, y, r·cos φ)
 *   so φ ∈ [0, π] is exactly the half with x ≥ 0, and the cut plane is x = 0.
 *   The halves therefore separate along X, which is the horizontal split the
 *   brief asks for, with no arbitrary rotation to keep track of.
 *
 * The face carries no letterform, numeral, or existing crypto mark. Its design
 * is a raised rim, two concentric half-rings, a ring of radial index notches,
 * and a central aperture — a real hole through the profile, so the lattice
 * inside is visible as a glint before the coin ever opens.
 */

import * as THREE from 'three'

export const R_OUT = 1.0
export const R_IN = 0.26 // the central aperture
const H = 0.086 // half thickness
const FIELD = 0.056 // the struck field, recessed below the rim

/* Cross-section, inner aperture → outer edge.
   Repeated points are deliberate: LatheGeometry shares vertices along the
   profile and smooth-shades between them, so a corner only stays crisp if it
   is sampled twice. Without these the field, rim wall and bevel blur into one
   dome and the object reads as a glass lens rather than a struck coin. */
const TOP = [
  [R_IN, 0.018],
  [0.288, 0.045],
  [0.3, 0.052],
  [0.34, FIELD],
  [0.62, FIELD],
  [0.7, FIELD],
  [0.7, FIELD], // ── corner: field → rim wall
  [0.762, 0.079],
  [0.762, 0.079], // ── corner: rim wall → rim top
  [0.8, H],
  [0.9, H],
  [0.9, H], // ── corner: rim top → bevel
  [0.95, 0.079],
  [0.985, 0.059],
  [1.0, 0.037],
  [1.0, 0.037], // ── corner: bevel → cylindrical edge
]

/* ------------------------------------------------------------------ */
/* profile helpers                                                     */
/* ------------------------------------------------------------------ */

/** Closed solid of revolution: bottom out, up the edge, top back in, close. */
function latheProfile() {
  const pts = []
  for (let i = 0; i < TOP.length; i++) pts.push(new THREE.Vector2(TOP[i][0], -TOP[i][1]))
  for (let i = TOP.length - 1; i >= 0; i--) pts.push(new THREE.Vector2(TOP[i][0], TOP[i][1]))
  // close the inner aperture wall by returning to the first point
  pts.push(new THREE.Vector2(TOP[0][0], -TOP[0][1]))
  return pts
}

/**
 * The flat cut face, as a 2D outline in (z, y).
 * It is the profile mirrored through z = 0 — an annulus cross-section, which
 * is two closed loops, so it is built as a Shape with a hole rather than as a
 * single self-touching contour.
 */
function crossSectionShape() {
  const outer = []
  const push = (arr, z, y) => {
    const last = arr[arr.length - 1]
    // earcut chokes on the zero-length edges the duplicated corner points create
    if (last && Math.abs(last.x - z) < 1e-6 && Math.abs(last.y - y) < 1e-6) return
    arr.push(new THREE.Vector2(z, y))
  }

  // +z side, bottom → top
  for (let i = 0; i < TOP.length; i++) push(outer, TOP[i][0], -TOP[i][1])
  for (let i = TOP.length - 1; i >= 0; i--) push(outer, TOP[i][0], TOP[i][1])
  // -z side, top → bottom
  for (let i = 0; i < TOP.length; i++) push(outer, -TOP[i][0], TOP[i][1])
  for (let i = TOP.length - 1; i >= 0; i--) push(outer, -TOP[i][0], -TOP[i][1])

  return new THREE.Shape(outer)
}

/* ------------------------------------------------------------------ */
/* the half                                                            */
/* ------------------------------------------------------------------ */

/**
 * @param {number} side  +1 → the x ≥ 0 half, -1 → the x ≤ 0 half
 */
function buildHalfGeometries(side, segments) {
  const phiStart = side > 0 ? 0 : Math.PI

  const shell = new THREE.LatheGeometry(latheProfile(), segments, phiStart, Math.PI)
  // NOT computeVertexNormals(): LatheGeometry derives normals from the profile
  // tangent, which is what preserves the hard corners above. Recomputing from
  // face averages throws that away and re-smooths the whole silhouette.

  /* The cut face. ShapeGeometry faces +Z; rotating -90° about Y sends that to
     -X (correct outward normal for the x ≥ 0 half) and maps shape-X to world-Z.
     +90° does the mirror image for the other half. Because the cross-section is
     symmetric in z, the same shape serves both without a winding flip. */
  const cap = new THREE.ShapeGeometry(crossSectionShape(), 1)
  cap.rotateY(side > 0 ? -Math.PI / 2 : Math.PI / 2)

  // bake the axis fix so each half animates with an identity orientation
  shell.rotateX(Math.PI / 2)
  cap.rotateX(Math.PI / 2)

  return { shell, cap }
}

/** Two low concentric ridges on the field, each spanning only its own half. */
function buildRings(side) {
  const specs = [
    [0.5, 0.011],
    [0.615, 0.0075],
  ]
  return specs.map(([r, tube]) => {
    const g = new THREE.TorusGeometry(r, tube, 6, 40, Math.PI)
    // TorusGeometry's arc starts at θ=0; rotating by ∓90° moves it onto the
    // half this group owns
    g.rotateZ(side > 0 ? -Math.PI / 2 : Math.PI / 2)
    g.translate(0, 0, FIELD - tube * 0.35)
    return g
  })
}

/**
 * Radial index notches around the field. Instanced — they are the only part
 * of the object with a meaningful count, and they read as machining rather
 * than as ornament.
 */
function buildNotches(side, count) {
  const geo = new THREE.BoxGeometry(0.052, 0.016, 0.02)
  const mesh = new THREE.InstancedMesh(geo, null, count)
  const m = new THREE.Matrix4()
  const q = new THREE.Quaternion()
  const e = new THREE.Euler()
  const pos = new THREE.Vector3()
  const scl = new THREE.Vector3(1, 1, 1)

  for (let i = 0; i < count; i++) {
    // inset from the seam at both ends so the notches never straddle the cut
    const t = (i + 0.5) / count
    const phi = (side > 0 ? -Math.PI / 2 : Math.PI / 2) + (t - 0.5) * Math.PI * 0.92
    const r = 0.558
    pos.set(Math.cos(phi) * r, Math.sin(phi) * r, FIELD - 0.004)
    e.set(0, 0, phi)
    q.setFromEuler(e)
    // every fourth notch is longer — an index mark, so the ring has a readable
    // rhythm instead of being a uniform texture
    scl.set(i % 4 === 0 ? 1.55 : 1, 1, 1)
    m.compose(pos, q, scl)
    mesh.setMatrixAt(i, m)
  }
  mesh.instanceMatrix.needsUpdate = true
  return mesh
}

/* ------------------------------------------------------------------ */
/* material                                                            */
/* ------------------------------------------------------------------ */

/**
 * Brushed silver / gunmetal. Anisotropy is what separates this from generic
 * chrome: it stretches the highlight along the brushing direction, which is
 * the cue that says "machined" rather than "polished ball".
 */
export function buildCoinMaterial({ quality = 'high' } = {}) {
  return new THREE.MeshPhysicalMaterial({
    color: 0xc4cad1,
    metalness: 1.0,
    // a touch rougher than a mirror: it blurs the environment, which pulls in
    // light from a wider solid angle and stops the faces going dead black
    roughness: 0.29,
    anisotropy: quality === 'low' ? 0 : 0.7,
    anisotropyRotation: 0,
    clearcoat: 0.2,
    clearcoatRoughness: 0.3,
    envMapIntensity: 1.35,
    transparent: true,
    opacity: 1,
  })
}

/** Slightly darker, rougher gunmetal for the interior cut face. */
export function buildCutMaterial() {
  return new THREE.MeshPhysicalMaterial({
    color: 0x8f979f,
    metalness: 1.0,
    roughness: 0.44,
    envMapIntensity: 1.1,
    transparent: true,
    opacity: 1,
  })
}

/* ------------------------------------------------------------------ */
/* assembly                                                            */
/* ------------------------------------------------------------------ */

/**
 * @returns {{ group: THREE.Group, halves: THREE.Group[], materials: THREE.Material[] }}
 */
export function buildCoin({ quality = 'high' } = {}) {
  const segments = quality === 'low' ? 48 : 128
  const notchCount = quality === 'low' ? 18 : 30

  const faceMat = buildCoinMaterial({ quality })
  const cutMat = buildCutMaterial()

  const group = new THREE.Group()
  const halves = []

  for (const side of [1, -1]) {
    const half = new THREE.Group()
    const { shell, cap } = buildHalfGeometries(side, segments)

    half.add(new THREE.Mesh(shell, faceMat))
    half.add(new THREE.Mesh(cap, cutMat))
    for (const g of buildRings(side)) half.add(new THREE.Mesh(g, faceMat))

    const notches = buildNotches(side, notchCount)
    notches.material = faceMat
    half.add(notches)

    half.userData.side = side
    group.add(half)
    halves.push(half)
  }

  return { group, halves, materials: [faceMat, cutMat] }
}
