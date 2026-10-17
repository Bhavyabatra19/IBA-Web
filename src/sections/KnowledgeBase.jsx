/**
 * Open knowledge base — four recent library items, two up, then the sign-up.
 * Light band, after the ecosystem marquee.
 *
 * Built from the what-we-do card (.wd__*): photo header toned into the
 * brand, glass icon badge for the format, red on hover. The badge shows what
 * KIND of item it is — article, recording, report — since that is what a
 * reader decides on first.
 *
 * Photos: Unsplash, under the Unsplash License (free for commercial use, no
 * attribution required), saved locally in public/images:
 *   kb-corridor.jpg    itsiken             unsplash.com/photos/pmYoy3WaFPU
 *   kb-ai.jpg          Immo Wegmann        unsplash.com/photos/w69Z8K-HGQU
 *   kb-regulation.jpg  Sasun Bughdaryan    unsplash.com/photos/FaTLrG5-ViE
 *   kb-forum.jpg       Alexandre Pellaes   unsplash.com/photos/6vAjp0pscX0
 */

import { useLayoutEffect, useRef } from 'react'
import { gsap, revealRise, reducedMotion } from '../lib/scroll'
import { Go } from './service/ServiceBlocks'

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
}

const ITEMS = [
  {
    kind: 'article',
    format: 'Article',
    title: 'What Is a Web3 Corridor?',
    body: 'A plain explanation of the Global Innovation Corridor Initiative.',
    source: 'Medium',
    date: '20 Aug 2026',
    img: '/images/card-globe.jpg',
    tint: 'red',
  },
  {
    kind: 'webinar',
    format: 'Webinar / Recording',
    title: 'AI + Blockchain: What Institutions Are Actually Building',
    body: 'A field report from the IBA Red Club AI Lab network.',
    source: 'IBA Original',
    date: '5 Aug 2026',
    img: '/images/card-ai.jpg',
    tint: 'ink',
  },
  {
    kind: 'report',
    format: 'Report / Whitepaper',
    title: 'Reading the Room: Blockchain Regulation Across Global Markets in 2026',
    body: 'A jurisdiction-by-jurisdiction snapshot of what actually applies today.',
    source: 'IBA Original',
    date: '2 Aug 2026',
    img: '/images/card-compliance.jpg',
    tint: 'deep',
  },
  {
    kind: 'webinar',
    format: 'Webinar / Recording',
    title: 'Inside the Global Innovation Corridor',
    body: 'The core dimensions, the partner regions and the road to the Barcelona forum.',
    source: 'IBA Original',
    date: '29 Jul 2026',
    img: '/images/card-forum.jpg',
    tint: 'warm',
  },
]

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
    <section className="wd wd--two kb band band--light band--own" ref={root} id="library" aria-labelledby="kb-title">
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
            Open to the Community
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
                <span className="wd__tag">{it.format}</span>
                {/* the icon, below the label (by request), not on the photo */}
                <span className="wd__badge wd__badge--inline" aria-hidden="true">
                  <svg className="wd__icon" viewBox="0 0 48 48">
                    {ICONS[it.kind]}
                  </svg>
                </span>
                <h3 className="wd__title kb__card-title">
                  {/* the whole card is the link; the title carries it */}
                  <Go className="kb__link" href="/library">
                    {it.title}
                  </Go>
                </h3>
                <p className="wd__text">{it.body}</p>
                <p className="kb__meta">
                  <span>{it.source}</span>
                  <span aria-hidden="true">·</span>
                  <time>{it.date}</time>
                </p>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}
