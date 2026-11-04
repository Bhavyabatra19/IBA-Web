/**
 * A portrait film shown full width (Web3 Corridor, Partnership with The
 * Block). The frame spans the section; the film sits whole in the middle,
 * and the sides carry its poster, blurred and darkened, so a 9:16 film
 * fills a wide frame without cropping it.
 *
 * It starts muted and looped once half of it is on screen, and pauses when
 * it scrolls away (by request). The player's own controls are always there
 * (by request): sound on/off, play/pause, the timeline, full screen and
 * picture-in-picture (the pop-out). Once a visitor pauses it themselves,
 * scrolling never restarts it behind their back. With reduced motion it
 * does not start by itself.
 */

import { useEffect, useRef } from 'react'
import { reducedMotion } from '../lib/scroll'

export default function BlockFilm({ src, poster, label }) {
  const video = useRef(null)
  const still = reducedMotion()

  useEffect(() => {
    const el = video.current
    if (!el || still || !('IntersectionObserver' in window)) return
    let ours = false // a pause/play this script made, not the visitor
    let heldByVisitor = false
    const onPause = () => {
      if (!ours) heldByVisitor = true
      ours = false
    }
    const onPlay = () => {
      if (!ours) heldByVisitor = false
      ours = false
    }
    el.addEventListener('pause', onPause)
    el.addEventListener('play', onPlay)
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && el.paused && !heldByVisitor) {
          ours = true
          el.play().catch(() => (ours = false))
        } else if (!entry.isIntersecting && !el.paused && !document.pictureInPictureElement) {
          ours = true
          el.pause()
        }
      },
      { threshold: 0.5 }
    )
    io.observe(el)
    return () => {
      io.disconnect()
      el.removeEventListener('pause', onPause)
      el.removeEventListener('play', onPlay)
    }
  }, [still])

  return (
    <figure className="bfilm" data-rise>
      <span className="bfilm__ground" style={{ backgroundImage: `url(${poster})` }} aria-hidden="true" />
      <video
        ref={video}
        className="bfilm__video"
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        controls
        preload="metadata"
        aria-label={label}
      />
      <figcaption className="sr-only">{label}</figcaption>
    </figure>
  )
}
