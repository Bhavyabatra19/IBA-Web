/**
 * HeroArt.jsx
 * ------------------------------------------------------------------
 * The 3D object in an inner page's hero, and the rules for when it may run.
 *
 * Same contract as three/Stage.jsx: the scene module is imported dynamically so
 * three is never on the critical path, and the object is an addition to a hero
 * that already reads without it. If three never lands, if WebGL is missing, or
 * if the context is lost, the hero is exactly the hero the page had before —
 * there is nothing to fall back to because nothing was taken away.
 *
 * Reduced motion still gets the object, held still. The preference is about
 * movement, not about pictures, and a silent metal object is not what it is
 * asking us to remove — so the scene is built, one frame is drawn at a resolved
 * state, and no ticker is ever started.
 *
 * Below the layout's own breakpoint the hero copy takes the full width and
 * there is no column left to draw into, so the canvas is not mounted at all —
 * see the media query on `.heroArt`. It is checked here too, because a hidden
 * canvas that still holds a WebGL context and renders every frame is the
 * expensive kind of invisible.
 */

import { useEffect, useRef } from 'react'
import { gsap, reducedMotion, isCoarse, isMobile, ScrollTrigger } from '../lib/scroll'

/** Matches the `.heroArt` media query. Below this there is no room for it. */
const MIN_WIDTH = 1080

function pickQuality() {
  if (isMobile() || isCoarse()) return 'low'
  const mem = navigator.deviceMemory
  if (typeof mem === 'number' && mem <= 4) return 'low'
  return 'high'
}

function hasWebGL2() {
  try {
    return !!document.createElement('canvas').getContext('webgl2')
  } catch {
    return false
  }
}

export default function HeroArt({ kind }) {
  const rootRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    const canvas = canvasRef.current
    if (!root || !canvas || !kind || !hasWebGL2()) return
    if (window.innerWidth < MIN_WIDTH) return

    const still = reducedMotion()

    let scene = null
    let disposed = false
    let ticker = null
    let ro = null
    let io = null
    let st = null
    let onMove = null
    let visible = false
    let started = 0

    /* What the entrance writes and the frame reads — no scroll position is read
       inside the scene, and no animation state is kept there. */
    const R = { op: 0, t: 0, scrub: 0 }

    const onLost = (e) => {
      e.preventDefault()
      delete root.dataset.live
      root.dataset.failed = 'true'
    }
    canvas.addEventListener('webglcontextlost', onLost)

    const start = () => {
      io?.disconnect()
      io = null

      import('../three/heroScene')
        .then(({ createHeroScene }) => {
          if (disposed) return
          scene = createHeroScene(canvas, { kind, quality: pickQuality() })
          /* an unknown kind builds nothing — leave the hero as it was */
          if (!scene) return

          const size = () => {
            scene.setSize(root.clientWidth || 1, root.clientHeight || 1)
          }
          size()
          ro = new ResizeObserver(size)
          ro.observe(root)

          started = performance.now()

          if (still) {
            /* One frame, at the state the entrance would have resolved to. */
            R.op = 1
            R.t = 0
            scene.apply(R)
            scene.render()
            root.dataset.live = 'true'
            return
          }

          gsap.to(R, { op: 1, duration: 1.2, ease: 'power2.out' })

          /* How far the hero has scrolled away, 0..1. Each object spends it
             differently — the stack spreads, the network opens, the shelf fans
             — so the reader's own scrolling resolves the object rather than
             merely sliding it up the screen. */
          st = ScrollTrigger.create({
            trigger: root,
            start: 'top top',
            end: 'bottom top',
            onUpdate: (self) => {
              R.scrub = self.progress
            },
          })

          /* Drawing only while the hero is on screen. A second WebGL context
             spinning behind the fold is heat for nothing. */
          const gate = ScrollTrigger.create({
            trigger: root,
            start: 'top bottom',
            end: 'bottom top',
            onToggle: (self) => {
              visible = self.isActive
            },
          })

          let painted = false
          ticker = () => {
            if (!visible) return
            R.t = (performance.now() - started) / 1000
            scene.apply(R)
            scene.render()
            if (!painted) {
              painted = true
              /* only once a real frame exists — fading in on `then` would show
                 an empty box for a frame or two */
              root.dataset.live = 'true'
            }
          }
          gsap.ticker.add(ticker)

          const killGate = st
          st = { kill: () => { killGate.kill(); gate.kill() } }
        })
        .catch(() => {
          root.dataset.failed = 'true'
        })
    }

    /* Built when the hero is a viewport away. On these pages that is
       immediately — the hero is the top of the page — but the observer keeps
       the work off the first paint. */
    io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) start()
      },
      { rootMargin: '100% 0px' }
    )
    io.observe(root)

    if (!still && !isCoarse()) {
      onMove = (e) => {
        if (!scene) return
        const r = root.getBoundingClientRect()
        /* measured against the element: the parallax answers to the pointer
           being over THIS object, not to where it is in the window */
        scene.setPointer(
          (e.clientX - (r.left + r.width / 2)) / window.innerWidth,
          -(e.clientY - (r.top + r.height / 2)) / window.innerHeight
        )
      }
      window.addEventListener('pointermove', onMove, { passive: true })
    }

    return () => {
      disposed = true
      canvas.removeEventListener('webglcontextlost', onLost)
      if (onMove) window.removeEventListener('pointermove', onMove)
      if (ticker) gsap.ticker.remove(ticker)
      st?.kill()
      io?.disconnect()
      ro?.disconnect()
      scene?.dispose()
    }
  }, [kind])

  if (!kind) return null

  return (
    <div className="heroArt" ref={rootRef} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  )
}
