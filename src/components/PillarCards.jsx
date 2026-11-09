/**
 * The photo-header card grid from the home page's "What IBA Does": a 9:4
 * photo in the brand red with a line icon, a tag, the title, the copy and a
 * "Know more" link. Shared so the Web3 Corridor page's pathways and premium
 * programmes read as the same family.
 *
 * cards: [{ key, icon, tag, title, body, cta?, href, img }]
 * `icon` names one of ICONS; `key` must be unique.
 */

import { Go } from '../sections/service/ServiceBlocks'

/* line icons, drawn on a 48 grid in currentColor */
export const ICONS = {
  advise: (
    <>
      <path d="M24 5 40 11v12c0 10-7 17-16 20C15 40 8 33 8 23V11Z" />
      <path d="m17 24 5 5 9-10" />
    </>
  ),
  build: (
    <>
      <path d="M24 4 42 14v20L24 44 6 34V14Z" />
      <path d="M6 14 24 24 42 14M24 24v20" />
    </>
  ),
  corridor: (
    <>
      <circle cx="24" cy="24" r="16" />
      <path d="M8 24h32M24 8c5 4.5 7.5 9.8 7.5 16S29 35.5 24 40c-5-4.5-7.5-9.8-7.5-16S19 12.5 24 8Z" />
    </>
  ),
  block: (
    <>
      <path d="M24 6 39 14.5v19L24 42 9 33.5v-19Z" />
      <path d="M9 14.5 24 23l15-8.5M24 23v19" />
    </>
  ),
  redclub: (
    <>
      <path d="M6 18 24 9l18 9-18 9Z" />
      <path d="M13 21.5v9c0 2.8 5 5.5 11 5.5s11-2.7 11-5.5v-9M42 18v11" />
    </>
  ),
  expand: (
    <>
      <circle cx="24" cy="24" r="15" />
      <path d="M9 24h30M24 9c4.5 4 6.8 9 6.8 15S28.5 35 24 39" />
      <path d="M31 13h8v8M39 13 29 23" />
    </>
  ),
  /* founders and investors: two figures and a rising line */
  founder: (
    <>
      <circle cx="16" cy="15" r="5" />
      <path d="M7 32c0-5 4-9 9-9s9 4 9 9" />
      <path d="M26 38l6-7 4 3 7-9M37 25h6v6" />
    </>
  ),
  /* tokenization and institutions: a coin before a columned building */
  institution: (
    <>
      <path d="M6 16 22 8l16 8Z" />
      <path d="M9 19v14M16 19v14M23 19v8M6 36h18" />
      <circle cx="34" cy="32" r="9" />
      <path d="M34 27v10M31 30h5a2 2 0 0 1 0 4h-4" />
    </>
  ),
  /* the India–UAE exchange: two arrows passing */
  exchange: (
    <>
      <path d="M8 17h28M30 11l6 6-6 6" />
      <path d="M40 31H12M18 25l-6 6 6 6" />
    </>
  ),
  /* the Gold cohort: a medal on its ribbon */
  medal: (
    <>
      <path d="M16 5l6 13M32 5l-6 13" />
      <circle cx="24" cy="30" r="12" />
      <path d="m24 23 2.2 4.5 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5-3.6-3.5 5-.7Z" />
    </>
  ),
}

export default function PillarCards({ cards }) {
  return (
    <div className="wd__grid">
      {cards.map((c) => (
        <article className={`wd__card wd__card--${c.key}`} key={c.key} data-rise>
          <div className="wd__media" aria-hidden="true">
            <img className="wd__photo" src={c.img} alt="" loading="lazy" decoding="async" />
            <span className="wd__tint" />
          </div>
          <div className="wd__body">
            <span className="wd__tag">{c.tag}</span>
            {/* the icon, below the label (by request), not on the photo */}
            <span className="wd__badge wd__badge--inline" aria-hidden="true">
              <svg className="wd__icon" viewBox="0 0 48 48">
                {ICONS[c.icon ?? c.key]}
              </svg>
            </span>
            <h3 className="wd__title">{c.title}</h3>
            <p className="wd__text">{c.body}</p>
            {/* every card reads "Know more", so the accessible name says which */}
            <Go className="wd__go" href={c.href} aria-label={`${c.cta ?? 'Know more'} about ${c.title}`}>
              {c.cta ?? 'Know more'} <span aria-hidden="true">→</span>
            </Go>
          </div>
        </article>
      ))}
    </div>
  )
}
