/**
 * The IBA Library — membership of the alliance (what it opens: the library,
 * the IBA Directory and more), where to find our content, and the
 * searchable catalogue.
 *
 * The catalogue lists every resource in src/data/resources.json, which the
 * admin console (/admin) edits; each card shows its thumbnail and opens its
 * link in a new tab.
 */

import { useMemo, useRef, useState } from 'react'
import { PageHero, Section, Cards, Btn } from '../../components/Kit'
import { CONTACT } from '../../nav'
import { FACTS } from '../../data/facts'
import LibrarySearch from '../../components/LibrarySearch'
import DATA from '../../data/resources.json'

/* Every resource in the shared list (src/data/resources.json, edited at
   /admin); the home page's knowledge base shows the featured ones. */
const RESOURCES = DATA.items

const uniq = (k) => [...new Set(RESOURCES.map((r) => r[k]))].sort()
const FILTERS = [
  { key: 'format', label: 'Format', options: uniq('format') },
  { key: 'topic', label: 'Topic', options: uniq('topic') },
  {
    key: 'level',
    label: 'Level',
    options: ['Introductory', 'Practitioner', 'Advanced'],
  },
  { key: 'platform', label: 'Platform', options: uniq('platform') },
]
/* undated items sit after the dated ones, in list order */
const byDate = (dir) => (a, b) => {
  if (!a.date || !b.date) return (a.date ? -1 : 0) - (b.date ? -1 : 0)
  return dir * a.date.localeCompare(b.date)
}
const SORTS = {
  newest: byDate(-1),
  oldest: byDate(1),
}
const fmtDate = (d) =>
  d &&
  new Date(d).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

export default function Library() {
  const [q, setQ] = useState('')
  const [f, setF] = useState({ format: '', topic: '', level: '', platform: '' })
  const [sort, setSort] = useState('newest')
  const catalogue = useRef(null)

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return RESOURCES.filter(
      (r) =>
        Object.entries(f).every(([k, v]) => !v || r[k] === v) &&
        (!needle || `${r.title} ${r.summary} ${r.topic} ${r.platform}`.toLowerCase().includes(needle)),
    ).sort(SORTS[sort])
  }, [q, f, sort])

  /* the "where to find us" cards jump to the catalogue, pre-filtered */
  const showFormat = (format) => {
    setF({ format, topic: '', level: '', platform: '' })
    catalogue.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div>
      <PageHero
        id="library"
        aside={<LibrarySearch />}
        eyebrow="The IBA Library"
        title="An Open Knowledge Base, Built by the Community"
        lede={`Articles, videos, research, policy briefs and recorded sessions, developed by IBA's industry experts and contributed by our ${FACTS.advisors.text} global advisors and ${FACTS.members.text} members, open to the wider community. Free with a member account, no paywall.`}
      />

      {/* Membership, on white between the hero and the red band (by request):
          formal, for serious learners, and without leading on price —
          "complimentary, by application" says it once */}
      <Section
        id="membership"
        tone="card"
        eyebrow="IBA Membership"
        title="Membership of the Alliance"
        lede={`Membership opens the full breadth of the IBA ecosystem to those committed to shaping the future of blockchain and Web3: the complete library, the IBA Directory and a place within a network of leaders, advisors and institutions across ${FACTS.countries.text} countries.`}
      >
        <Cards
          cols={4}
          items={[
            {
              tag: 'Free Access',
              title: 'The Complete Library',
              text: 'Every article, research paper, policy brief and recorded session, curated by IBA’s experts and advisors.',
            },
            {
              title: 'The IBA Directory',
              text: 'A verified register of members, advisors, institutions and partners across the alliance, for introductions that carry weight.',
            },
            {
              title: 'Briefings & Gatherings',
              text: 'Invitations to member briefings, roundtables and the alliance’s events across its partner regions.',
            },
            {
              title: 'A Verified Member Profile',
              text: 'Standing within a community of practitioners, researchers and decision-makers in blockchain and Web3.',
            },
          ]}
        />
        <div className="pk-actions lib-member__actions" data-rise>
          <Btn enquiry="Membership">
            Apply for Membership <span aria-hidden="true">→</span>
          </Btn>
          <Btn href="/membership" variant="ghost">
            Explore Membership
          </Btn>
          <p className="lib-member__note">Membership is complimentary, by application.</p>
        </div>
      </Section>

      <Section eyebrow="Where to Find Us" title="Read, Follow and Watch" tone="red">
        <div className="pk-cards pk-cards--4">
          {[
            {
              tag: 'Articles',
              title: 'Read Our Articles',
              text: 'Long-form perspectives on tokenization, policy and Web3.',
              cta: 'Read articles',
              on: () => showFormat('Article'),
            },
            {
              tag: 'LinkedIn Posts',
              title: 'Follow on LinkedIn',
              text: 'Updates, insights and announcements from the alliance.',
              cta: 'View LinkedIn posts',
              href: CONTACT.linkedin.href,
            },
            {
              tag: 'YouTube Webinars',
              title: 'Watch Webinars',
              text: 'Recorded sessions with IBA experts and partners.',
              cta: 'Watch webinars',
              on: () => showFormat('Video'),
            },
            {
              /* content review: pictures of IBA's events and conferences,
                 once the gallery is ready */
              tag: 'Gallery',
              title: 'See the Gallery',
              text: 'Moments from IBA events, conferences and gatherings across the corridor.',
              cta: 'Coming soon',
              soon: true,
            },
          ].map((c) => (
            <article className="pk-card" key={c.title} data-rise>
              <span className="wd__tag">{c.tag}</span>
              <h3 className="pk-card__title">
                {c.soon ? (
                  c.title
                ) : c.href ? (
                  <a className="pk-card__link" href={c.href} target="_blank" rel="noreferrer noopener">
                    {c.title}
                  </a>
                ) : (
                  <button type="button" className="pk-card__link pk-card__btn" onClick={c.on}>
                    {c.title}
                  </button>
                )}
              </h3>
              <p className="pk-card__text">{c.text}</p>
              <span className="pk-card__cta" aria-hidden={c.soon ? undefined : 'true'}>
                {c.cta} {!c.soon && <span>→</span>}
              </span>
            </article>
          ))}
        </div>
      </Section>

      <section className="pk-sec pk-sec--plain band band--light band--own" id="catalogue" ref={catalogue}>
        <div className="pk-sec__panel">
          <header className="pk-head">
            <h2 className="pk-head__title">Browse the Library</h2>
            <p className="pk-head__lede">
              Articles, research, reports, interviews and videos from across the
              blockchain and Web3 industry, not only from IBA, selected by the
              IBA team and updated regularly.
            </p>
          </header>

          <div className="pk-filters">
            <label className="pk-search">
              <span className="sr-only">Search the library</span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input
                type="search"
                placeholder="Search articles, reports, videos…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </label>
            {FILTERS.map((fl) => (
              <label className="pk-select" key={fl.key}>
                <span className="sr-only">{fl.label}</span>
                <select value={f[fl.key]} onChange={(e) => setF({ ...f, [fl.key]: e.target.value })}>
                  <option value="">{fl.label}: All</option>
                  {fl.options.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </label>
            ))}
            <label className="pk-select">
              <span className="sr-only">Sort</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="newest">Sort: Newest</option>
                <option value="oldest">Sort: Oldest</option>
              </select>
            </label>
          </div>

          <p className="pk-count" role="status">
            {list.length} {list.length === 1 ? 'result' : 'results'}
          </p>

          {list.length ? (
            <Cards
              cols={3}
              items={list.map((r) => ({
                img: r.thumbnail,
                tag: r.format,
                title: r.title,
                text: r.summary,
                sub: [r.topic, r.level].filter(Boolean).join(' · '),
                href: r.link,
                cta: [r.platform, fmtDate(r.date)].filter(Boolean).join(' · '),
              }))}
            />
          ) : (
            <p className="pk-empty">Nothing matches those filters. Try clearing one.</p>
          )}
        </div>
      </section>
    </div>
  )
}
