/**
 * The About hero's scroll piece — scattered points drawing together into a
 * connected network.
 *
 * The subject is the section's own claim: "We are not a vendor. We are an
 * alliance — a network of members, advisors, institutions, regulators and
 * builders who move together." So the animation is that sentence: begins as
 * unrelated points, ends as one structure, and the links only exist once the
 * nodes have found each other. Nothing decorative is added on top.
 *
 * Everything is numbers until the last step. GSAP scrubs a plain array of
 * coordinates and one render pass writes them to the SVG — so links can follow
 * moving nodes without reading a single computed style, and the idle drift is
 * a term in the same expression rather than a competing animation.
 */

import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger, reducedMotion, isMobile } from '../lib/scroll'

const W = 1000
const H = 520
const CX = W / 2
const CY = H / 2

/* Deterministic scatter. Random would re-roll on every mount and the sequence
   would never be the same twice — which is fine for noise and wrong for a
   composition somebody has approved. */
const rand = (i, salt) => {
  const v = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453
  return v - Math.floor(v)
}

/** hub, six around it, eleven on the rim — read as centre, core, network. */
const NODES = [{ x: CX, y: CY, r: 7.5, kind: 'hub' }]
for (let i = 0; i < 6; i += 1) {
  const a = (i / 6) * Math.PI * 2 - Math.PI / 2
  NODES.push({ x: CX + Math.cos(a) * 152, y: CY + Math.sin(a) * 94, r: 5, kind: 'mid' })
}
for (let i = 0; i < 11; i += 1) {
  const a = (i / 11) * Math.PI * 2 + 0.28
  NODES.push({ x: CX + Math.cos(a) * 374, y: CY + Math.sin(a) * 197, r: 3.4, kind: 'out' })
}

/* Each node also carries where it starts — flung out along its own radius, so
   the convergence reads as gathering rather than as a shuffle — and its own
   drift phase, so the field never breathes in unison. */
NODES.forEach((n, i) => {
  const dx = n.x - CX
  const dy = n.y - CY
  const push = 1.7 + rand(i, 1) * 1.1
  n.sx = CX + dx * push + (rand(i, 2) - 0.5) * 190
  n.sy = CY + dy * push + (rand(i, 3) - 0.5) * 150
  n.phase = rand(i, 4) * Math.PI * 2
  n.speed = 0.28 + rand(i, 5) * 0.3
  n.amp = 2.4 + rand(i, 6) * 3.6
})

const nearestMid = (n) => {
  let best = 1
  let bestD = Infinity
  for (let m = 1; m <= 6; m += 1) {
    const d = (NODES[m].x - n.x) ** 2 + (NODES[m].y - n.y) ** 2
    if (d < bestD) {
      bestD = d
      best = m
    }
  }
  return best
}

const LINKS = []
for (let m = 1; m <= 6; m += 1) LINKS.push([0, m]) // hub to core
for (let m = 1; m <= 6; m += 1) LINKS.push([m, (m % 6) + 1]) // core ring
for (let o = 7; o < NODES.length; o += 1) {
  LINKS.push([o, nearestMid(NODES[o])]) // rim inward
  LINKS.push([o, o === NODES.length - 1 ? 7 : o + 1]) // rim around
}

export default function AllianceField() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const el = root.current
    const dots = [...el.querySelectorAll('.af__dot')]
    const links = [...el.querySelectorAll('.af__link')]
    const linkGroup = el.querySelector('.af__links')
    const cam = el.querySelector('.af__cam')

    /* The only mutable state: where each node is right now. */
    const at = NODES.map((n) => ({ x: n.sx, y: n.sy }))

    const draw = (t) => {
      for (let i = 0; i < NODES.length; i += 1) {
        const n = NODES[i]
        const p = at[i]
        /* drift folded into the same write, so it can never fight the scrub */
        const x = p.x + Math.sin(t * n.speed + n.phase) * n.amp
        const y = p.y + Math.cos(t * n.speed * 0.82 + n.phase) * n.amp
        n.cx = x
        n.cy = y
        dots[i].setAttribute('cx', x.toFixed(1))
        dots[i].setAttribute('cy', y.toFixed(1))
      }
      for (let k = 0; k < LINKS.length; k += 1) {
        const [a, b] = LINKS[k]
        const l = links[k]
        l.setAttribute('x1', NODES[a].cx.toFixed(1))
        l.setAttribute('y1', NODES[a].cy.toFixed(1))
        l.setAttribute('x2', NODES[b].cx.toFixed(1))
        l.setAttribute('y2', NODES[b].cy.toFixed(1))
      }
    }

    const ctx = gsap.context(() => {
      if (reducedMotion()) {
        NODES.forEach((n, i) => {
          at[i].x = n.x
          at[i].y = n.y
        })
        gsap.set(linkGroup, { opacity: 1 })
        draw(0)
        return
      }

      draw(0)
      const tick = (time) => draw(time)
      gsap.ticker.add(tick)

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: el.closest('section'),
          start: 'top top',
          end: isMobile() ? '+=85%' : '+=125%',
          pin: true,
          pinSpacing: true,
          scrub: 0.85, // the lag that makes it feel drawn rather than dragged
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      /* Nodes gather. The rim arrives last, so the structure builds outward
         from the centre instead of collapsing inward all at once. */
      at.forEach((p, i) => {
        tl.to(p, { x: NODES[i].x, y: NODES[i].y, duration: 1 }, i < 7 ? 0 : 0.06 + i * 0.006)
      })

      /* Links only once there is something to link. */
      tl.fromTo(linkGroup, { opacity: 0 }, { opacity: 1, duration: 0.55 }, 0.42)

      /* A slow turn of the whole field — the difference between the points
         moving and us moving around them. */
      tl.fromTo(cam, { rotate: -5, scale: 1.1 }, { rotate: 3, scale: 1, duration: 1 }, 0)

      return () => gsap.ticker.remove(tick)
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <div className="af" ref={root} aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" fill="none">
        <defs>
          <radialGradient id="afGlow">
            <stop stopColor="#c0392b" stopOpacity=".3" />
            <stop offset="1" stopColor="#c0392b" stopOpacity="0" />
          </radialGradient>
        </defs>

        <ellipse cx={CX} cy={CY} rx={W * 0.42} ry={H * 0.5} fill="url(#afGlow)" />

        <g className="af__cam" style={{ transformOrigin: `${CX}px ${CY}px` }}>
          <g className="af__links">
            {LINKS.map(([a, b]) => (
              <line
                className="af__link"
                key={`${a}-${b}`}
                data-hub={a === 0 || b === 0 ? '' : undefined}
              />
            ))}
          </g>
          {NODES.map((n, i) => (
            <circle className="af__dot" key={i} r={n.r} data-kind={n.kind} />
          ))}
        </g>
      </svg>
    </div>
  )
}
