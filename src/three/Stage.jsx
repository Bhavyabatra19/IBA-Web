/**
 * Stage.jsx
 * ------------------------------------------------------------------
 * The one canvas, and the only place three.js is loaded.
 *
 * The scene module is imported dynamically, so three (~600kB) is fetched after
 * first paint and never blocks the headline. Until it lands — or if WebGL is
 * unavailable, or the context is lost — a quiet still stands in, and the page
 * remains completely readable.
 *
 * The render loop is the GSAP ticker, which is also what drives Lenis and
 * ScrollTrigger. One loop for the page means the object cannot end up a frame
 * behind the type it is supposed to be moving with.
 */

import { useEffect, useRef } from 'react'
import { gsap, reducedMotion, isMobile, isCoarse } from '../lib/scroll'
import { stageBus } from './stageBus'

function pickQuality() {
  if (isMobile() || isCoarse()) return 'low'
  // deviceMemory is Chromium-only; absent elsewhere, which is fine — this is a
  // downgrade hint, not a gate
  const mem = navigator.deviceMemory
  if (typeof mem === 'number' && mem <= 4) return 'low'
  return 'high'
}

function hasWebGL2() {
  try {
    const c = document.createElement('canvas')
    return !!c.getContext('webgl2')
  } catch {
    return false
  }
}

export default function Stage() {
  const rootRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    const canvas = canvasRef.current
    if (!root || !canvas || !hasWebGL2()) return

    let scene = null
    let disposed = false
    let ticker = null
    let ro = null
    let lastLive = null
    let lastRevision = -1
    const still = reducedMotion()

    const onLost = (e) => {
      e.preventDefault()
      // hand the frame back to the still rather than leaving a black hole
      root.classList.remove('is-live')
      root.dataset.failed = 'true'
    }
    canvas.addEventListener('webglcontextlost', onLost)

    import('./scene')
      .then(({ createScene }) => {
        if (disposed) return
        scene = createScene(canvas, { quality: pickQuality() })

        const size = () => {
          const w = root.clientWidth || window.innerWidth
          const h = root.clientHeight || window.innerHeight
          scene.setSize(w, h)
          stageBus.revision++
        }
        size()
        ro = new ResizeObserver(size)
        ro.observe(root)

        root.dataset.ready = 'true'

        ticker = () => {
          const live = stageBus.live && !!stageBus.rig
          if (live !== lastLive) {
            lastLive = live
            root.classList.toggle('is-live', live)
          }
          if (!live) return

          // With reduced motion the rig holds one resolved state per section,
          // so there is nothing to redraw until that state actually changes.
          if (still) {
            if (stageBus.revision === lastRevision) return
            lastRevision = stageBus.revision
          }

          scene.apply(stageBus.rig)
          scene.render()
        }
        gsap.ticker.add(ticker)
      })
      .catch(() => {
        root.dataset.failed = 'true'
      })

    /* pointer parallax — off on touch, where there is no hover to speak of */
    let onMove = null
    if (!still && !isCoarse()) {
      onMove = (e) => {
        if (!scene) return
        scene.setPointer(
          e.clientX / window.innerWidth - 0.5,
          -(e.clientY / window.innerHeight - 0.5)
        )
      }
      window.addEventListener('pointermove', onMove, { passive: true })
    }

    return () => {
      disposed = true
      canvas.removeEventListener('webglcontextlost', onLost)
      if (onMove) window.removeEventListener('pointermove', onMove)
      if (ticker) gsap.ticker.remove(ticker)
      ro?.disconnect()
      scene?.dispose()
    }
  }, [])

  return (
    <div className="stage" ref={rootRef} aria-hidden="true">
      <div className="stage__fallback">
        <span />
      </div>
      <canvas ref={canvasRef} />
    </div>
  )
}
