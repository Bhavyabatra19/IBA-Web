/**
 * core.js
 * ------------------------------------------------------------------
 * The lattice inside the coin.
 *
 * Nodes are distributed on three Fibonacci shells and joined to their nearest
 * neighbours, so the connections describe an actual structure rather than being
 * drawn at random — which is the difference between this reading as a network
 * and reading as confetti.
 *
 * Everything is deterministic. No Math.random anywhere: the same lattice comes
 * back on every reload, which matters because a scrubbed animation that
 * reshuffles itself between frames is not scrubbable.
 *
 * Expansion is done by scaling the whole GROUP, never by rewriting vertices.
 * The connecting lines are children of the same group, so they stay attached
 * for free and the line buffer is uploaded exactly once.
 */

import * as THREE from 'three'

/* a small deterministic hash → [0,1), so the lattice is reproducible */
const rand = (i, salt = 0) => {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453
  return x - Math.floor(x)
}

const GOLDEN = Math.PI * (1 + Math.sqrt(5))

function fibonacciShell(count, radius, offset, out) {
  for (let i = 0; i < count; i++) {
    const k = i + 0.5
    const phi = Math.acos(1 - (2 * k) / count)
    const theta = GOLDEN * (k + offset)
    // a little deterministic jitter so the shells don't read as three
    // perfectly smooth spheres nested inside each other
    const r = radius * (0.9 + rand(i + offset, 1) * 0.2)
    out.push(
      new THREE.Vector3(
        Math.cos(theta) * Math.sin(phi) * r,
        Math.sin(theta) * Math.sin(phi) * r,
        Math.cos(phi) * r
      )
    )
  }
}

function buildNodes(quality) {
  const nodes = []
  if (quality === 'low') {
    fibonacciShell(18, 0.36, 0, nodes)
    fibonacciShell(30, 0.66, 7, nodes)
    fibonacciShell(38, 0.92, 19, nodes)
  } else {
    fibonacciShell(26, 0.34, 0, nodes)
    fibonacciShell(54, 0.63, 7, nodes)
    fibonacciShell(86, 0.9, 19, nodes)
  }
  return nodes
}

/** Join each node to its nearest few neighbours, within a distance cap. */
function buildEdges(nodes, perNode, maxDist) {
  const edges = []
  const seen = new Set()
  for (let i = 0; i < nodes.length; i++) {
    const d = []
    for (let j = 0; j < nodes.length; j++) {
      if (i === j) continue
      const dist = nodes[i].distanceTo(nodes[j])
      if (dist <= maxDist) d.push([dist, j])
    }
    d.sort((a, b) => a[0] - b[0])
    for (let k = 0; k < Math.min(perNode, d.length); k++) {
      const j = d[k][1]
      const key = i < j ? `${i}:${j}` : `${j}:${i}`
      if (seen.has(key)) continue
      seen.add(key)
      edges.push([i, j])
    }
  }
  return edges
}

/**
 * @returns {{
 *   group: THREE.Group,
 *   setEnergy: (e:number)=>void,
 *   setOpacity: (o:number)=>void,
 *   frames: THREE.Object3D[],
 *   dispose: ()=>void
 * }}
 */
export function buildCore({ quality = 'high' } = {}) {
  const group = new THREE.Group()

  const nodes = buildNodes(quality)
  const edges = buildEdges(nodes, quality === 'low' ? 2 : 3, quality === 'low' ? 0.5 : 0.42)

  /* ---------------- the blocks ---------------- */
  const blockGeo = new THREE.BoxGeometry(1, 1, 1)
  const blockMat = new THREE.MeshPhysicalMaterial({
    color: 0x9aa2aa,
    metalness: 1,
    roughness: 0.34,
    envMapIntensity: 1.2,
    emissive: new THREE.Color(0xd71920),
    emissiveIntensity: 0,
    transparent: true,
    opacity: 1,
  })
  const blocks = new THREE.InstancedMesh(blockGeo, blockMat, nodes.length)
  blocks.frustumCulled = false

  const m = new THREE.Matrix4()
  const q = new THREE.Quaternion()
  const e = new THREE.Euler()
  const s = new THREE.Vector3()

  for (let i = 0; i < nodes.length; i++) {
    const base = 0.026 + rand(i, 2) * 0.03
    // a handful of deliberately larger blocks give the lattice a hierarchy;
    // a field of identical cubes reads as noise
    const big = rand(i, 5) > 0.9
    s.set(base * (big ? 2.3 : 1), base * (big ? 1.7 : 1), base * (big ? 1.7 : 1))
    e.set(rand(i, 3) * Math.PI, rand(i, 4) * Math.PI, rand(i, 6) * Math.PI)
    q.setFromEuler(e)
    m.compose(nodes[i], q, s)
    blocks.setMatrixAt(i, m)
  }
  blocks.instanceMatrix.needsUpdate = true
  group.add(blocks)

  /* ---------------- the connections ---------------- */
  const positions = new Float32Array(edges.length * 6)
  for (let k = 0; k < edges.length; k++) {
    const a = nodes[edges[k][0]]
    const b = nodes[edges[k][1]]
    positions.set([a.x, a.y, a.z, b.x, b.y, b.z], k * 6)
  }
  const lineGeo = new THREE.BufferGeometry()
  lineGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  const lineMat = new THREE.LineBasicMaterial({
    color: 0x6f7780,
    transparent: true,
    opacity: 0.5,
    depthWrite: false,
  })
  const lines = new THREE.LineSegments(lineGeo, lineMat)
  lines.frustumCulled = false
  group.add(lines)

  /* ---------------- counter-rotating frames ----------------
     Three thin rings on different axes. They give the interior an obvious
     mechanical rotation that the eye can track, which the node cloud alone
     does not provide. */
  const frames = []
  const frameMat = new THREE.MeshPhysicalMaterial({
    color: 0xb9c0c8,
    metalness: 1,
    roughness: 0.25,
    envMapIntensity: 1.4,
    transparent: true,
    opacity: 1,
  })
  const frameSpecs = [
    [0.74, 0.0055, [0, 0, 0]],
    [0.86, 0.004, [Math.PI / 2.4, 0.3, 0]],
    [0.62, 0.0045, [0.4, Math.PI / 2.2, 0]],
  ]
  for (const [r, tube, rot] of frameSpecs) {
    const f = new THREE.Mesh(
      new THREE.TorusGeometry(r, tube, 5, quality === 'low' ? 40 : 84),
      frameMat
    )
    f.rotation.set(...rot)
    f.userData.base = rot
    group.add(f)
    frames.push(f)
  }

  /* ---------------- the centre ----------------
     The one genuinely emissive object in the scene, so the bloom threshold can
     stay high enough that nothing else blooms. */
  const coreMat = new THREE.MeshStandardMaterial({
    color: 0x2a0509,
    metalness: 0.6,
    roughness: 0.35,
    emissive: new THREE.Color(0xff4a50),
    emissiveIntensity: 0,
    transparent: true,
    opacity: 1,
  })
  const centre = new THREE.Mesh(new THREE.IcosahedronGeometry(0.185, 0), coreMat)
  group.add(centre)

  const cageMat = new THREE.MeshBasicMaterial({
    color: 0xff4a50,
    wireframe: true,
    transparent: true,
    opacity: 0,
    toneMapped: false,
  })
  const cage = new THREE.Mesh(new THREE.IcosahedronGeometry(0.27, 0), cageMat)
  group.add(cage)

  const materials = [blockMat, lineMat, frameMat, coreMat, cageMat]

  /* interpolated between a cool silver lattice and a live crimson one */
  const cool = new THREE.Color(0x6f7780)
  const hot = new THREE.Color(0xd71920)
  const tmp = new THREE.Color()

  /* Opacity and energy both drive the same handful of material properties, so
     they are held here and applied together — otherwise whichever setter ran
     last would clobber the other's contribution. */
  let opacity = 1
  let energy = 0

  function applyMaterials() {
    lineMat.color.copy(tmp.copy(cool).lerp(hot, energy))
    lineMat.opacity = (0.34 + energy * 0.5) * opacity
    blockMat.emissiveIntensity = energy * 0.5
    blockMat.opacity = opacity
    coreMat.emissiveIntensity = energy * 2.6
    coreMat.opacity = opacity
    frameMat.opacity = opacity
    cageMat.opacity = energy * 0.42 * opacity
    centre.scale.setScalar(1 + energy * 0.16)
    group.visible = opacity > 0.002
  }

  return {
    group,
    centre,
    cage,
    frames,
    setEnergy(en) {
      energy = en
      applyMaterials()
    },
    setOpacity(o) {
      opacity = o
      applyMaterials()
    },
    dispose() {
      blockGeo.dispose()
      lineGeo.dispose()
      for (const mat of materials) mat.dispose()
      for (const f of frames) f.geometry.dispose()
      centre.geometry.dispose()
      cage.geometry.dispose()
    },
  }
}
