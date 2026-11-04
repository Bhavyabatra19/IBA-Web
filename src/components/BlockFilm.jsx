/**
 * A portrait film shown full width (Web3 Corridor, Partnership with The
 * Block). The frame spans the section; the film sits whole in the middle,
 * and the sides carry its poster, blurred and darkened, so a 9:16 film
 * fills a wide frame without cropping a face out of it.
 *
 * Plays muted and looped while at least half of it is on screen, and
 * pauses once it scrolls away (by request). With reduced motion it does not
 * start by itself: it shows its controls instead.
 */

import { useEffect, useRef } from 'react'
import { reducedMotion } from '../lib/scroll'

export default function BlockFilm({ src, poster, label }) {
  const video = useRef(null)
  const still = reducedMotion()

  useEffect(() => {
    const el = video.current
    if (!el || still || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {})
        else el.pause()
      },
      { threshold: 0.5 }
    )
    io.observe(el)
    return () => io.disconnect()
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
        preload="metadata"
        controls={still}
        aria-label={label}
      />
      <figcaption className="sr-only">{label}</figcaption>
    </figure>
  )
}
