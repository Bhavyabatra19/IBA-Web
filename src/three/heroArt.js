/**
 * heroArt.js
 * ------------------------------------------------------------------
 * One object per inner-page hero. Three of them, built from the same parts.
 *
 * Each says what its section is, rather than being a generic ornament:
 *
 *   services — a stack. Six slabs, one per service, twisting as they rise.
 *              The page is called The Consulting Stack; this is that word.
 *   studio   — a network. Nodes on shells, joined to their nearest neighbours,
 *              which is what an ecosystem of 75+ partners looks like.
 *   library  — a shelf. Documents fanned like files in a drawer, one pulled
 *              proud of the rest.
 *
 * Everything is deterministic — no Math.random — for the reason core.js gives:
 * an object that reshuffles itself between reloads cannot be art-directed, and
 * a scrubbed animation that does it cannot be scrubbed.
 *
 * Every builder returns the same shape, so heroScene.js does not need to know
 * which one it is holding:
 *   { group, setOpacity(o), update(t, scrub), dispose() }
 */

import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'

/* deterministic hash → [0,1), same helper core.js uses */
const rand = (i, salt = 0) => {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453
  return x - Math.floor(x)
}

const SILVER = 0xb9c0c8
const DARK = 0x121215
const RED = 0xd71920

/** The metal every hero object is cut from, so the three read as one family. */
function silverMaterial(extra = {}) {
  return new THREE.MeshPhysicalMaterial({
    color: SILVER,
    metalness: 1,
    roughness: 0.26,
    envMapIntensity: 1.5,
    transparent: true,
    opacity: 1,
    ...extra,
  })
}

/* ================================================================== */
/* services — the stack                                               */
/* ================================================================== */

function buildStack({ quality }) {
  const group = new THREE.Group()
  const disposables = []
  const COUNT = 6
  const GAP = 0.34

  const geo = new RoundedBoxGeometry(2.15, 0.11, 2.15, quality === 'low' ? 2 : 4, 0.05)
  disposables.push(geo)

  const slabs = []
  for (let i = 0; i < COUNT; i++) {
    /* One slab is red — the service you are on. It is the only accent in the
       object, so the eye lands on it before it reads the stack. */
    const accent = i === 2
    const mat = accent
      ? new THREE.MeshPhysicalMaterial({
          color: 0x8e2a20,
          metalness: 0.9,
          roughness: 0.3,
          envMapIntensity: 1.3,
          emissive: new THREE.Color(RED),
          emissiveIntensity: 0.28,
          transparent: true,
        })
      : silverMaterial({ roughness: 0.22 + i * 0.02 })
    disposables.push(mat)

    const mesh = new THREE.Mesh(geo, mat)
    /* The twist is the point: six flat plates squared up read as one block,
       and the same six turned progressively read as a stack you could count. */
    mesh.userData = {
      i,
      home: (i - (COUNT - 1) / 2) * GAP,
      twist: i * 0.16,
      scale: 1 - i * 0.055,
    }
    group.add(mesh)
    slabs.push(mesh)
  }

  const materials = slabs.map((s) => s.material)

  return {
    group,
    setOpacity(o) {
      for (const m of materials) m.opacity = o
      group.visible = o > 0.002
    },
    update(t, scrub) {
      /* scrub pulls the stack apart as the hero scrolls away, so the object
         resolves into its parts exactly as the reader leaves it */
      const spread = 1 + scrub * 1.5
      for (const s of slabs) {
        const { i, home, twist, scale } = s.userData
        s.position.y = home * spread + Math.sin(t * 0.6 + i * 0.7) * 0.022
        s.rotation.y = twist + t * 0.13 + scrub * 0.5 * (i - 2.5) * 0.12
        s.scale.setScalar(scale)
      }
      group.rotation.set(-0.32 + Math.sin(t * 0.15) * 0.03, t * 0.11, 0)
    },
    dispose() {
      for (const d of disposables) d.dispose()
    },
  }
}

/* ================================================================== */
/* studio — the network                                               */
/* ================================================================== */

const GOLDEN = Math.PI * (1 + Math.sqrt(5))

function shell(count, radius, offset, out) {
  for (let i = 0; i < count; i++) {
    const k = i + 0.5
    const phi = Math.acos(1 - (2 * k) / count)
    const theta = GOLDEN * (k + offset)
    const r = radius * (0.88 + rand(i + offset, 1) * 0.24)
    out.push(
      new THREE.Vector3(
        Math.cos(theta) * Math.sin(phi) * r,
        Math.sin(theta) * Math.sin(phi) * r,
        Math.cos(phi) * r
      )
    )
  }
}

function buildNetwork({ quality }) {
  const group = new THREE.Group()
  const disposables = []

  const nodes = []
  if (quality === 'low') {
    shell(14, 0.85, 0, nodes)
    shell(26, 1.55, 7, nodes)
  } else {
    shell(20, 0.85, 0, nodes)
    shell(38, 1.5, 7, nodes)
    shell(30, 2.05, 19, nodes)
  }

  /* Joined to nearest neighbours within a cap, so the lines describe a real
     structure. Drawn at random they read as confetti, not as an ecosystem. */
  const edges = []
  const seen = new Set()
  const maxDist = quality === 'low' ? 1.05 : 0.86
  for (let i = 0; i < nodes.length; i++) {
    const near = []
    for (let j = 0; j < nodes.length; j++) {
      if (i === j) continue
      const d = nodes[i].distanceTo(nodes[j])
      if (d <= maxDist) near.push([d, j])
    }
    near.sort((a, b) => a[0] - b[0])
    for (let k = 0; k < Math.min(2, near.length); k++) {
      const j = near[k][1]
      const key = i < j ? `${i}:${j}` : `${j}:${i}`
      if (seen.has(key)) continue
      seen.add(key)
      edges.push([i, j])
    }
  }

  const nodeGeo = new THREE.IcosahedronGeometry(1, 0)
  disposables.push(nodeGeo)
  const nodeMat = silverMaterial({ roughness: 0.3 })
  disposables.push(nodeMat)

  const mesh = new THREE.InstancedMesh(nodeGeo, nodeMat, nodes.length)
  mesh.frustumCulled = false
  const m = new THREE.Matrix4()
  const q = new THREE.Quaternion()
  const e = new THREE.Euler()
  const s = new THREE.Vector3()
  for (let i = 0; i < nodes.length; i++) {
    /* a few deliberately larger nodes give the cloud a hierarchy — a field of
       identical dots reads as noise */
    const big = rand(i, 5) > 0.86
    const r = (0.032 + rand(i, 2) * 0.026) * (big ? 2.4 : 1)
    s.setScalar(r)
    e.set(rand(i, 3) * Math.PI, rand(i, 4) * Math.PI, rand(i, 6) * Math.PI)
    q.setFromEuler(e)
    m.compose(nodes[i], q, s)
    mesh.setMatrixAt(i, m)
  }
  mesh.instanceMatrix.needsUpdate = true
  group.add(mesh)

  const positions = new Float32Array(edges.length * 6)
  for (let k = 0; k < edges.length; k++) {
    const a = nodes[edges[k][0]]
    const b = nodes[edges[k][1]]
    positions.set([a.x, a.y, a.z, b.x, b.y, b.z], k * 6)
  }
  const lineGeo = new THREE.BufferGeometry()
  lineGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  disposables.push(lineGeo)
  const lineMat = new THREE.LineBasicMaterial({
    color: 0x7c848d,
    transparent: true,
    opacity: 0.4,
    depthWrite: false,
  })
  disposables.push(lineMat)
  const lines = new THREE.LineSegments(lineGeo, lineMat)
  lines.frustumCulled = false
  group.add(lines)

  /* IBA at the centre of its own ecosystem — the one warm thing in the object */
  const coreGeo = new THREE.IcosahedronGeometry(0.2, 1)
  disposables.push(coreGeo)
  const coreMat = new THREE.MeshStandardMaterial({
    color: 0x4a0d10,
    metalness: 0.5,
    roughness: 0.32,
    emissive: new THREE.Color(0xd8412c),
    emissiveIntensity: 0.55,
    transparent: true,
  })
  disposables.push(coreMat)
  const core = new THREE.Mesh(coreGeo, coreMat)
  group.add(core)

  return {
    group,
    setOpacity(o) {
      nodeMat.opacity = o
      lineMat.opacity = 0.4 * o
      coreMat.opacity = o
      group.visible = o > 0.002
    },
    update(t, scrub) {
      /* the cloud opens out as the hero leaves, which reads as the network
         being entered rather than merely spun */
      group.scale.setScalar(1 + scrub * 0.35)
      group.rotation.set(0.2 + Math.sin(t * 0.12) * 0.06, t * 0.13 + scrub * 0.4, 0)
      core.scale.setScalar(1 + Math.sin(t * 1.2) * 0.07)
      coreMat.emissiveIntensity = 0.45 + Math.sin(t * 1.2) * 0.12
    },
    dispose() {
      for (const d of disposables) d.dispose()
    },
  }
}

/* ================================================================== */
/* library — the shelf                                                */
/* ================================================================== */

function buildShelf({ quality }) {
  const group = new THREE.Group()
  const disposables = []
  const COUNT = 7

  const geo = new RoundedBoxGeometry(1.5, 2.0, 0.055, quality === 'low' ? 2 : 3, 0.035)
  disposables.push(geo)

  const cards = []
  for (let i = 0; i < COUNT; i++) {
    /* One document is pulled proud: the free one you came for. The rest are
       the shelf it came off. */
    const lead = i === 2
    const mat = lead
      ? new THREE.MeshPhysicalMaterial({
          color: 0x93291d,
          metalness: 0.88,
          roughness: 0.26,
          envMapIntensity: 1.5,
          emissive: new THREE.Color(RED),
          /* Low. Pushed up it stops being a lit object and becomes a flat red
             rectangle — the highlight raking across it is what says "card". */
          emissiveIntensity: 0.1,
          transparent: true,
        })
      : new THREE.MeshPhysicalMaterial({
          /* Silver, not dark. Dark metal here is lit almost entirely by the
             rig's crimson rim, so every card came out red and the one document
             that is meant to be red stopped meaning anything. Light enough and
             the white key wins the front faces instead. */
          color: i % 2 ? 0x9aa2aa : 0x868d95,
          metalness: 0.9,
          roughness: 0.3,
          envMapIntensity: 1.4,
          transparent: true,
        })
    disposables.push(mat)

    const mesh = new THREE.Mesh(geo, mat)
    mesh.userData = { i, lead, phase: i * 0.9 }
    group.add(mesh)
    cards.push(mesh)
  }

  const materials = cards.map((c) => c.material)

  return {
    group,
    setOpacity(o) {
      for (const m of materials) m.opacity = o
      group.visible = o > 0.002
    },
    update(t, scrub) {
      /* Fanned on an arc rather than stacked square-on: files in a drawer, not
         a pile of paper. The fan opens as the reader scrolls past. */
      const fan = 0.3 + scrub * 0.16
      for (const c of cards) {
        const { i, lead, phase } = c.userData
        const k = i - (COUNT - 1) / 2
        const a = k * fan
        const radius = 2.2 + (lead ? 0.5 : 0)
        c.position.set(
          Math.sin(a) * radius,
          Math.sin(t * 0.55 + phase) * 0.05 + (lead ? 0.12 : 0),
          Math.cos(a) * radius - 2.2
        )
        c.rotation.set(0.05, -a + Math.sin(t * 0.4 + phase) * 0.02, 0)
      }
      /* Seen along the fan, not down its throat — square-on, the front card
         covers the six behind it and the object has no depth to read.
         Turned toward the key rather than away from it: the other way round,
         the faces are lit only by env.js's crimson rim and every card comes
         out red, including the six that are not supposed to be. */
      group.rotation.set(0.16, 0.62 + Math.sin(t * 0.14) * 0.05 + scrub * 0.3, 0)
    },
    dispose() {
      for (const d of disposables) d.dispose()
    },
  }
}

/* ================================================================== */

const BUILDERS = {
  services: buildStack,
  studio: buildNetwork,
  library: buildShelf,
}

/** @returns {null} when `kind` is not one of the three, so the hero stays bare. */
export function buildHeroObject(kind, opts = {}) {
  const build = BUILDERS[kind]
  return build ? build({ quality: 'high', ...opts }) : null
}
