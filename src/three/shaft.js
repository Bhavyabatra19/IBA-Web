/**
 * shaft.js
 * ------------------------------------------------------------------
 * The diagonal shaft of red light the hero sits in.
 *
 * It was a CSS gradient on the band, and it could not stay one. The hero's
 * background paints OVER the canvas — the renderer clears to opaque black, so
 * nothing beneath the stage is ever visible — which meant the light lay in
 * front of the coin like haze on a lens instead of behind it like a lamp in a
 * room. The only way for the object to be lit from behind is for the light to
 * be in the scene with it, so here it is: one plane, well back, additive.
 *
 * Being in the scene buys three things CSS could not:
 *   · the coin occludes it, because it is genuinely behind the coin
 *   · it moves with the camera dolly and the pointer parallax, so it sits in
 *     the same space as the object rather than sliding across it
 *   · the bloom pass picks it up, which is what makes the core read as light
 *     rather than as a painted stripe
 *
 * The texture is drawn once into a 2D canvas. A shader would be the other way
 * to do it and would cost a program, a uniform block and a pass of its own for
 * a gradient that never changes.
 */

import * as THREE from 'three'

/** The bright line: how strong at its middle, and how wide before it is gone. */
const CORE = 0.5
const CORE_W = 0.05
/** The haze it sits in: far fainter, far wider. */
const HAZE = 0.045
const HAZE_W = 0.24

const lerp = (a, b, t) => a + (b - a) * t

/**
 * Across the shaft: a thin bright line inside a wide, very faint haze.
 *
 * The two scales are the whole thing, and getting the balance between them
 * backwards is what went wrong twice. A broad band at a middling alpha floods
 * the frame — it reads as a red picture. A narrow band alone reads as a wire.
 * What light actually does is almost nothing across most of its spread, then a
 * climb over the last few percent to a core that is bright and thin.
 *
 * Both are gaussians, summed, and sampled at a stop per percent. That is the
 * difference between this and a handful of hand-placed stops: a gradient
 * interpolates in a straight line BETWEEN its stops, so every stop is a corner
 * in the falloff, and a corner in a falloff is an edge the eye can see. Ten
 * stops across a beam this wide put ten visible creases in it. A curve has none
 * anywhere, because there is no segment long enough to be straight.
 *
 * The core sits at 0.5 for a reason beyond taste. The bloom pass thresholds at
 * 0.22 in the LINEAR buffer, and this texture is sRGB: 0.5 here lands just under
 * that once converted, so the line is bright but barely feeds the bloom. Above
 * it the pass takes over, spreads the core into a halo and multiplies it by a
 * strength that climbs to 0.78 by the end of the sequence — which is how a
 * hairline turns into a floodlight.
 *
 * The beam has a red of its own — #7e3139 — and it is deliberately NOT the
 * brand's --red. This is light in a room rather than a mark on a page: it wants
 * to be muted and to sit back, where the brand red has to carry a button and a
 * link and hold its own against white type. Nothing else on the site uses this
 * value, and nothing else should.
 *
 * It rides the core's own strength, so the light warms toward its middle instead
 * of being one flat colour at every brightness.
 */
function paintBands(ctx, size) {
  const g = ctx.createLinearGradient(0, 0, 0, size)
  const bell = (d, w) => Math.exp(-(d * d) / (2 * w * w))

  for (let i = 0; i <= 100; i++) {
    const t = i / 100
    const d = t - 0.5
    const core = CORE * bell(d, CORE_W)
    const a = Math.min(1, core + HAZE * bell(d, HAZE_W))
    /* 0 out in the haze, 1 at the centre of the line. Both ends are #7e3139 at
       two lightnesses rather than two colours — taken down for the haze, up for
       the core — so the beam is one hue the whole way through it. */
    const heat = core / CORE
    const r = Math.round(lerp(88, 152, heat))
    const gr = Math.round(lerp(34, 62, heat))
    const b = Math.round(lerp(40, 70, heat))
    g.addColorStop(t, `rgba(${r}, ${gr}, ${b}, ${a.toFixed(4)})`)
  }

  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
}

/**
 * Along the shaft: lit the whole way, and strongest past the middle.
 *
 * It reaches both edges of the frame rather than fading to nothing inside it —
 * a beam that stops in mid-air is a streak, and the reference runs corner to
 * corner. The asymmetry is what gives it a direction: brightest around three
 * fifths along, easing off toward the far end.
 */
function fadeEnds(ctx, size) {
  ctx.globalCompositeOperation = 'destination-in'
  const g = ctx.createLinearGradient(0, 0, size, 0)
  /* Sampled along a curve for the same reason the bands are — a handful of
     stops here would put creases ACROSS the beam, which is the more obvious of
     the two. Peak at 0.62 along, easing to a lit but dimmer pair of ends. */
  for (let i = 0; i <= 60; i++) {
    const t = i / 60
    const d = (t - 0.62) / (t < 0.62 ? 0.52 : 0.46)
    const a = 0.32 + 0.68 * Math.exp(-(d * d) * 1.35)
    g.addColorStop(t, `rgba(0, 0, 0, ${a.toFixed(4)})`)
  }
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  ctx.globalCompositeOperation = 'source-over'
}

function buildTexture() {
  /* 512, not 256. The beam is stretched over most of the frame, so every texel
     across it covers several screen pixels — and a soft gradient asked to cross
     that many pixels in eight-bit colour is where banding comes from. */
  const size = 512
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  paintBands(ctx, size)
  fadeEnds(ctx, size)

  const tex = new THREE.CanvasTexture(canvas)
  /* The gradient runs to transparent at all four edges, so there is nothing to
     repeat and clamping is what keeps the sampler from wrapping a bright edge
     around to a dark one. */
  tex.wrapS = THREE.ClampToEdgeWrapping
  tex.wrapT = THREE.ClampToEdgeWrapping
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

export function buildShaft() {
  const map = buildTexture()

  const mat = new THREE.MeshBasicMaterial({
    map,
    transparent: true,
    /* Additive, because this is light and not paint: over the renderer's black
       it adds itself, and over anything already lit it brightens rather than
       tinting. */
    blending: THREE.AdditiveBlending,
    /* Depth is READ but not WRITTEN. Read, so the coin in front of it wins and
       the shaft is genuinely behind the object. Not written, or the plane would
       leave a rectangle in the depth buffer that later transparent passes would
       have to fight. */
    depthWrite: false,
    depthTest: true,
    side: THREE.DoubleSide,
  })

  /* Far enough back to sit behind the coin at every point of the dolly, and
     long enough to cross the whole frame on the diagonal once it is turned.

     The height is what sets the scale of the two falloffs, and it is the number
     to change if the beam wants to be wider or tighter. The frame is about nine
     units tall at this depth, so at 13 the faint haze spreads across most of it
     and the bright core lands at about four tenths of a unit — a hairline. */
  const geo = new THREE.PlaneGeometry(56, 13)
  const mesh = new THREE.Mesh(geo, mat)
  mesh.position.set(0.5, 0.3, -8)
  /* Positive Z takes +X up the screen: the beam rises to the right. Measured
     off the reference, which climbs about 610px over 1546. */
  mesh.rotation.z = THREE.MathUtils.degToRad(21.5)
  /* Drawn before the object, and never culled — its bounding sphere is huge and
     mostly off-screen, which is exactly the case frustum culling gets wrong. */
  mesh.renderOrder = -1
  mesh.frustumCulled = false

  return {
    mesh,
    dispose() {
      geo.dispose()
      mat.dispose()
      map.dispose()
    },
  }
}
