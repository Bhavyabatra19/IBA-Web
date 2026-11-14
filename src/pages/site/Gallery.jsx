/**
 * IBA in the News & Gallery.
 *
 * Two lists, both edited at /admin:
 *   In the News    every resource in src/data/resources.json whose format is
 *                  News or Press Release (the same list the library shows)
 *   Photo Gallery  src/data/gallery.json, photos uploaded to
 *                  public/images/gallery, filterable by event and opened in a
 *                  lightbox
 */

import { useCallback, useEffect, useMemo, useState } from 'react'
import { PageHero, Section, Cards, Btn } from '../../components/Kit'
import { CONTACT } from '../../nav'
import { lockScroll, unlockScroll } from '../../lib/scroll'
import RESOURCES from '../../data/resources.json'
import GALLERY from '../../data/gallery.json'

const PRESS_FORMATS = ['News', 'Press Release']

const fmtDate = (d) =>
  d &&
  new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

/* newest first; undated items after the dated ones, in list order */
const byNewest = (a, b) => {
  if (!a.date || !b.date) return (a.date ? -1 : 0) - (b.date ? -1 : 0)
  return b.date.localeCompare(a.date)
}

const NEWS = RESOURCES.items.filter((r) => PRESS_FORMATS.includes(r.format)).sort(byNewest)
const PHOTOS = (GALLERY.photos || []).filter((p) => p.image)
const EVENTS = [...new Set(PHOTOS.map((p) => p.event).filter(Boolean))]

function Lightbox({ photos, index, onClose, onMove }) {
  const p = photos[index]

  useEffect(() => {
    lockScroll()
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') onMove(1)
      else if (e.key === 'ArrowLeft') onMove(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      unlockScroll()
    }
  }, [onClose, onMove])

  return (
    <div
      className="glb"
      role="dialog"
      aria-modal="true"
      aria-label={p.caption || 'Photo'}
      data-lenis-prevent=""
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <button type="button" className="glb__close" onClick={onClose} aria-label="Close" autoFocus>
        ×
      </button>
      {photos.length > 1 && (
        <>
          <button type="button" className="glb__nav glb__nav--prev" onClick={() => onMove(-1)} aria-label="Previous photo">
            ‹
          </button>
          <button type="button" className="glb__nav glb__nav--next" onClick={() => onMove(1)} aria-label="Next photo">
            ›
          </button>
        </>
      )}
      <figure className="glb__fig">
        <img src={p.image} alt={p.caption || p.event || ''} />
        <figcaption>
          {p.caption && <span className="glb__cap">{p.caption}</span>}
          <span className="glb__meta">
            {[p.event, p.location, fmtDate(p.date)].filter(Boolean).join(' · ')}
            {photos.length > 1 && ` · ${index + 1} / ${photos.length}`}
          </span>
        </figcaption>
      </figure>
    </div>
  )
}

export default function Gallery() {
  const [event, setEvent] = useState('')
  const [open, setOpen] = useState(-1)

  const photos = useMemo(
    () => PHOTOS.filter((p) => !event || p.event === event).sort(byNewest),
    [event],
  )
  const close = useCallback(() => setOpen(-1), [])
  const move = useCallback(
    (d) => setOpen((i) => (i + d + photos.length) % photos.length),
    [photos.length],
  )

  return (
    <div>
      <PageHero
        id="gallery"
        eyebrow="Media"
        title="IBA in the News & Gallery"
        lede="Press coverage of the alliance, and moments from IBA events, conferences and gatherings across the Web3 Corridor."
      />

      <Section
        id="in-the-news"
        tone="card"
        eyebrow="In the News"
        title="IBA in the News"
        lede="Coverage, interviews and announcements about India Blockchain Alliance."
      >
        {NEWS.length ? (
          <Cards
            cols={3}
            items={NEWS.map((r) => ({
              img: r.thumbnail,
              tag: r.format,
              title: r.title,
              text: r.summary,
              href: r.link,
              cta: [r.platform, fmtDate(r.date)].filter(Boolean).join(' · '),
            }))}
          />
        ) : (
          <p className="pk-empty">Press coverage is on its way.</p>
        )}
        <div className="pk-actions gl-actions" data-rise>
          <Btn href="/library#catalogue" variant="ghost">
            Browse the Full Library
          </Btn>
          <Btn href={`mailto:${CONTACT.email.label}?subject=${encodeURIComponent('Media enquiry')}`} variant="ghost">
            Media Enquiries
          </Btn>
        </div>
      </Section>

      <section className="pk-sec pk-sec--plain band band--light band--own" id="photos">
        <div className="pk-sec__panel">
          <header className="pk-head">
            <h2 className="pk-head__title">Photo Gallery</h2>
            <p className="pk-head__lede">
              Moments from IBA events, conferences and gatherings across the corridor.
            </p>
          </header>

          {EVENTS.length > 1 && (
            <div className="gl-chips" role="group" aria-label="Filter by event">
              {['', ...EVENTS].map((e) => (
                <button
                  type="button"
                  key={e || 'all'}
                  className={`gl-chip${event === e ? ' is-on' : ''}`}
                  aria-pressed={event === e}
                  onClick={() => setEvent(e)}
                >
                  {e || 'All events'}
                </button>
              ))}
            </div>
          )}

          {photos.length ? (
            <ul className="gl-grid">
              {photos.map((p, i) => (
                <li key={p.image + i}>
                  <button type="button" className="gl-tile" onClick={() => setOpen(i)}>
                    <img src={p.image} alt={p.caption || p.event || ''} loading="lazy" decoding="async" />
                    {(p.caption || p.event) && (
                      <span className="gl-tile__cap">
                        {p.caption && <span>{p.caption}</span>}
                        {p.event && <small>{p.event}</small>}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="pk-empty">Photos from our events are coming soon.</p>
          )}
        </div>
      </section>

      {open >= 0 && photos[open] && (
        <Lightbox photos={photos} index={open} onClose={close} onMove={move} />
      )}
    </div>
  )
}
