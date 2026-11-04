/**
 * Open knowledge base — four recent library items, two up, then the sign-up.
 * Light band, after the ecosystem marquee.
 *
 * Built from the what-we-do card (.wd__*): photo header toned into the
 * brand, glass icon badge for the format, red on hover. The badge shows what
 * KIND of item it is — article, recording, report — since that is what a
 * reader decides on first.
 *
 * Items: the featured entries of the shared resources list (src/data/
 * resources.json, edited in the admin console at /admin), each opening the
 * source in a new tab. The tag is the platform; the icon and the
 * meta line give the format. Thumbnails are the client's artwork
 * (public/images/kb-*.jpg, cut from their six-up sheet), each carrying its
 * own headline, so the card frame takes their shape and never crops them.
 *
 */

import { useLayoutEffect, useRef } from 'react'
import { gsap, revealRise, reducedMotion } from '../lib/scroll'
import RESOURCES from '../data/resources.json'

/* format icons, drawn on a 48 grid in currentColor */
const ICONS = {
  article: (
    <>
      <path d="M12 6h17l9 9v27H12Z" />
      <path d="M29 6v9h9M18 24h14M18 31h14M18 38h9" />
    </>
  ),
  webinar: (
    <>
      <rect x="6" y="10" width="36" height="26" rx="3" />
      <path d="m21 17 9 6-9 6Z" />
      <path d="M16 42h16" />
    </>
  ),
  report: (
    <>
      <path d="M12 6h24v36H12Z" />
      <path d="M18 34v-6M24 34V20M30 34v-10" />
    </>
  ),
  interview: (
    <>
      <path d="M6 10h24v16H16l-6 5v-5H6Z" />
      <path d="M22 30h4v-0M30 18h12v16h-4v5l-6-5H22v-4" />
    </>
  ),
  profile: (
    <>
      <circle cx="24" cy="17" r="7" />
      <path d="M10 40c1.5-8 7-12 14-12s12.5 4 14 12" />
    </>
  ),
  press: (
    <>
      <path d="M8 20h8l18-10v28L16 28H8Z" />
      <path d="M16 28l3 10h5l-3-10M38 18l4-3M38 30l4 3M39 24h5" />
    </>
  ),
}

/* The items: the featured entries of the shared resources list
   (src/data/resources.json), edited at /admin. Up to six, in list order. */
const ICON_FOR = {
  'Video Interview': 'interview',
  Podcast: 'interview',
  Video: 'webinar',
  'Webinar / Recording': 'webinar',
  'Report / Whitepaper': 'report',
  'Press Release': 'press',
  Profile: 'profile',
}
const fmtDate = (d) =>
  d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : ''
const TINTS = ['red', 'ink', 'deep', 'warm']
const ITEMS = RESOURCES.items
  .filter((r) => r.featured)
  .slice(0, 6)
  .map((r, i) => ({
    kind: ICON_FOR[r.format] || 'article',
    format: r.format,
    platform: r.platform,
    title: r.title,
    body: r.summary,
    date: fmtDate(r.date),
    img: r.thumbnail,
    href: r.link,
    tint: TINTS[i % TINTS.length],
  }))

export default function KnowledgeBase() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const el = root.current
    const ctx = gsap.context(() => {
      if (reducedMotion()) return
      revealRise(el, { trigger: el, start: 'top 82%', stagger: 0.08 })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="wd wd--two kb kb--six band band--light band--own" ref={root} id="library" aria-labelledby="kb-title">
      <div className="wd__inner">
        <header className="kb__head">
          <p className="hero__kicker wd__eyebrow" data-rise>
            <svg className="hero__kicker-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2.5 20.5 7v10L12 21.5 3.5 17V7L12 2.5Z" />
              <path d="M3.5 7 12 11.5 20.5 7M12 11.5v10" />
            </svg>
            Open Knowledge Base
          </p>
          <h2 className="kb__title" id="kb-title" data-rise>
            Powered by the Community
          </h2>
          <p className="kb__lede" data-rise>
            An open-source knowledge base of articles, videos, research and policy
            briefs, developed by IBA’s ecosystem experts and advisors for the wider
            blockchain community, searchable, categorised and free to every
            registered member.
          </p>
        </header>

        <div className="wd__grid">
          {ITEMS.map((it) => (
            <article className={`wd__card kb__card kb__card--${it.tint}`} key={it.title} data-rise>
              <div className="wd__media" aria-hidden="true">
                <img className="wd__photo" src={it.img} alt="" loading="lazy" decoding="async" />
                <span className="wd__tint" />
              </div>
              <div className="wd__body">
                <span className="wd__tag">{it.platform}</span>
                {/* the icon, below the label (by request), not on the photo */}
                <span className="wd__badge wd__badge--inline" aria-hidden="true">
                  <svg className="wd__icon" viewBox="0 0 48 48">
                    {ICONS[it.kind]}
                  </svg>
                </span>
                <h3 className="wd__title kb__card-title">
                  {/* the whole card is the link; it opens the source in a new tab */}
                  <a className="kb__link" href={it.href} target="_blank" rel="noopener noreferrer">
                    {it.title}
                    <span className="sr-only"> (opens on {it.platform} in a new tab)</span>
                  </a>
                </h3>
                <p className="wd__text">{it.body}</p>
                <p className="kb__meta">
                  <span>{it.format}</span>
                  {it.date && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{it.date}</span>
                    </>
                  )}
                </p>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}
