/**
 * The IBA Library — where to find our content, the searchable catalogue,
 * and the member sign-up and log-in.
 *
 * ⚠ ACCOUNTS ARE NOT LIVE. There is no auth backend, so the sign-up and
 * log-in forms say so on submit rather than pretending to create or open an
 * account. The catalogue below is the source's sample list, and its cards do
 * not open an item yet — each needs a real URL (`href`) when published.
 */

import { useMemo, useRef, useState } from 'react'
import { PageHero, Section, Cards, Form, Btn } from '../../components/Kit'
import { CONTACT } from '../../nav'
import { FACTS } from '../../data/facts'
import LibraryHolo from '../../components/LibraryHolo'

const RESOURCES = [
  { title: 'Reading the Room: Blockchain Regulation Across Global Markets in 2026', desc: 'A jurisdiction-by-jurisdiction snapshot of what actually applies today.', format: 'Report / Whitepaper', topic: 'Policy & Regulation', level: 'Practitioner', source: 'IBA Original', date: '2026-08-02', duration: 22, views: 4100 },
  { title: 'Tokenizing Real Estate: Lessons from DNA Real Estate', desc: 'How a $473M issuance handled legal wrapper, listing and governance.', format: 'Case Study', topic: 'Tokenization & RWA', level: 'Advanced', source: 'IBA Original', date: '2026-07-14', duration: 14, views: 2870 },
  { title: 'What Is a Web3 Corridor?', desc: 'A plain explanation of the Global Innovation Corridor Initiative.', format: 'Article', topic: 'Web3 Corridor', level: 'Introductory', source: 'Medium', date: '2026-08-20', duration: 6, views: 6210 },
  { title: 'Inside the IBA Red Club Blockchain Lab', desc: 'A campus walkthrough of the smart-contract auditing environment.', format: 'Video', topic: 'Knowledge & Skilling', level: 'Introductory', source: 'YouTube', date: '2026-06-30', duration: 11, views: 3320 },
  { title: 'Enterprise Blockchain Without the Hype', desc: 'Where blockchain actually beats a database, and where it doesn’t.', format: 'Playbook', topic: 'Enterprise Blockchain', level: 'Practitioner', source: 'IBA Original', date: '2026-05-18', duration: 18, views: 5010 },
  { title: 'Green Chain Protocol: Verifying Climate Claims On-Chain', desc: 'How carbon and impact accounting gets the same rigor as a credential.', format: 'Report / Whitepaper', topic: 'ESG & Green Chain', level: 'Advanced', source: 'Council Publication', date: '2026-04-27', duration: 26, views: 1890 },
  { title: 'AI + Blockchain: What Institutions Are Actually Building', desc: 'A field report from the IBA Red Club AI Lab network.', format: 'Webinar / Recording', topic: 'AI & Emerging Tech', level: 'Practitioner', source: 'IBA Original', date: '2026-08-05', duration: 47, views: 2210 },
  { title: 'Verifyble Explained: Data and Digital Assets You Control', desc: 'How on-chain verification secures data and simplifies digital asset management.', format: 'Article', topic: 'Data Security & Digital Assets', level: 'Introductory', source: 'Medium', date: '2026-03-11', duration: 7, views: 4780 },
  { title: 'BFSI on Chain: Sixteen Use Cases, Ranked by Readiness', desc: 'A sector deep dive into trade finance, KYC and claims management.', format: 'Report / Whitepaper', topic: 'Sector Deep Dives', level: 'Advanced', source: 'IBA Original', date: '2026-02-19', duration: 31, views: 1660 },
  { title: 'Inside the Global Innovation Corridor', desc: 'The core dimensions, the partner regions and the road to the Barcelona forum.', format: 'Webinar / Recording', topic: 'Web3 Corridor', level: 'Practitioner', source: 'IBA Original', date: '2026-07-29', duration: 38, views: 2990 },
  { title: 'A Founder Playbook: Legal Advisory Before You Tokenize', desc: 'The questions to answer before a single token is minted.', format: 'Playbook', topic: 'Policy & Regulation', level: 'Introductory', source: 'IBA Original', date: '2026-06-08', duration: 15, views: 3510 },
  { title: 'From Campus to Career: Red Club Placement Outcomes', desc: 'How the Four Building Blocks connect to real hiring pipelines.', format: 'Video', topic: 'Knowledge & Skilling', level: 'Introductory', source: 'YouTube', date: '2026-01-22', duration: 9, views: 2040 },
]

const uniq = (k) => [...new Set(RESOURCES.map((r) => r[k]))].sort()
const FILTERS = [
  { key: 'format', label: 'Format', options: uniq('format') },
  { key: 'topic', label: 'Topic', options: uniq('topic') },
  {
    key: 'level',
    label: 'Level',
    options: ['Introductory', 'Practitioner', 'Advanced'],
  },
  { key: 'source', label: 'Source', options: uniq('source') },
]
const SORTS = {
  newest: (a, b) => b.date.localeCompare(a.date),
  oldest: (a, b) => a.date.localeCompare(b.date),
  views: (a, b) => b.views - a.views,
}
const fmtDate = (d) =>
  new Date(d).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

const ACCOUNTS_NOTE =
  'Member accounts are not live yet, so nothing has been created or sent. Email ' +
  CONTACT.email.label +
  ' and the IBA team will set up your access.'

export default function Library() {
  const [q, setQ] = useState('')
  const [f, setF] = useState({ format: '', topic: '', level: '', source: '' })
  const [sort, setSort] = useState('newest')
  const catalogue = useRef(null)

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return RESOURCES.filter(
      (r) =>
        Object.entries(f).every(([k, v]) => !v || r[k] === v) &&
        (!needle || `${r.title} ${r.desc} ${r.topic}`.toLowerCase().includes(needle)),
    ).sort(SORTS[sort])
  }, [q, f, sort])

  /* the "where to find us" cards jump to the catalogue, pre-filtered */
  const showFormat = (format) => {
    setF({ format, topic: '', level: '', source: '' })
    catalogue.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div>
      <PageHero
        id="library"
        aside={<LibraryHolo />}
        eyebrow="The IBA Library"
        title="An Open Knowledge Base, Built by the Community"
        lede={`Articles, videos, research, policy briefs and recorded sessions, developed by IBA's industry experts and contributed by our ${FACTS.advisors.text} global advisors and ${FACTS.members.text} members, open to the wider community. Free with a member account, no paywall.`}
        actions={
          <Btn href="#login">
            Member Login <span aria-hidden="true">→</span>
          </Btn>
        }
      />

      <Section eyebrow="Where to Find Us" title="Read, Follow and Watch" tone="red">
        <div className="pk-cards pk-cards--3">
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
              on: () => showFormat('Webinar / Recording'),
            },
          ].map((c) => (
            <article className="pk-card" key={c.title} data-rise>
              <span className="wd__tag">{c.tag}</span>
              <h3 className="pk-card__title">
                {c.href ? (
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
              <span className="pk-card__cta" aria-hidden="true">
                {c.cta} <span>→</span>
              </span>
            </article>
          ))}
        </div>
      </Section>

      <section className="pk-sec pk-sec--plain band band--light band--own" id="catalogue" ref={catalogue}>
        <div className="pk-sec__panel">
          <header className="pk-head">
            <h2 className="pk-head__title">Browse the Library</h2>
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
                <option value="views">Sort: Most Viewed</option>
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
                tag: r.format,
                title: r.title,
                text: r.desc,
                sub: `${r.topic} · ${r.level}`,
                cta: `${r.source} · ${fmtDate(r.date)} · ${r.duration} min`,
              }))}
            />
          ) : (
            <p className="pk-empty">Nothing matches those filters. Try clearing one.</p>
          )}
        </div>
      </section>

      <Section
        id="signup" tone="dark"
        eyebrow="Join Free"
        title="Become an IBA Member"
        lede={[
          'One free account. Full Library access. No cost, ever.',
          "Free forever for registered members. We don't sell your data. Unsubscribe from emails any time.",
        ]}
      >
        <Form
          notice={ACCOUNTS_NOTE}
          submit="Create My Member Account"
          consent={['I agree to the Terms and Privacy Policy.', 'Send me IBA research and event updates.']}
          fields={[
            { name: 'name', label: 'Full name' },
            { name: 'email', label: 'Work email', type: 'email' },
            { name: 'password', label: 'Password', type: 'password' },
            { name: 'org', label: 'Organisation' },
            {
              name: 'role',
              label: 'Role',
              type: 'select',
              options: [
                'Learner',
                'Faculty / Institution',
                'Corporate',
                'Government / Regulator',
                'Startup / Founder',
                'Investor',
                'Other',
              ],
            },
            { name: 'country', label: 'Country' },
          ]}
        />
        <p className="pk-aside" data-rise>
          Already a member? <a href="#login">Member Login</a>
        </p>
      </Section>

      <Section id="login" eyebrow="Members" title="Member Login" lede="Welcome back to the alliance.">
        <div className="lg">
          <div className="lg__form">
            <div className="lg__main">
              <div className="lg__head" data-rise>
                <span className="lg__mark" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <rect x="5" y="10" width="14" height="10" />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                  </svg>
                </span>
                <h3>Log in to your account</h3>
                <p>Use the email you registered with to open the full Library.</p>
              </div>
              <Form
                notice={ACCOUNTS_NOTE}
                submit="Log In"
                consent={[]}
                fields={[
                  { name: 'email', label: 'Email', type: 'email', wide: true },
                  {
                    name: 'password',
                    label: 'Password',
                    type: 'password',
                    wide: true,
                  },
                ]}
              />
              <p className="lg__help" data-rise>
                Trouble logging in? Email <a href={CONTACT.email.href}>{CONTACT.email.label}</a>
              </p>
            </div>
            <p className="pk-aside" data-rise>
              Not a member yet? <a href="#signup">Create a free account</a>
            </p>
          </div>

          {/* what's waiting on the other side, from the catalogue itself */}
          <aside className="lg__panel" data-rise>
            <p className="lg__eyebrow">Inside the Member Library</p>
            <ul className="lg__stats">
              <li>
                <strong>{RESOURCES.length}</strong>
                <span>Resources</span>
              </li>
              <li>
                <strong>{uniq('topic').length}</strong>
                <span>Topics</span>
              </li>
              <li>
                <strong>{uniq('format').length}</strong>
                <span>Formats</span>
              </li>
            </ul>
            <ul className="lg__perks">
              <li>Reports, whitepapers and council publications</li>
              <li>Recorded webinars with IBA experts and partners</li>
              <li>Case studies and founder playbooks</li>
              <li>Free for members, no paywall</li>
            </ul>
            <div className="lg__latest">
              <p className="lg__label">Latest Additions</p>
              <ol>
                {[...RESOURCES]
                  .sort(SORTS.newest)
                  .slice(0, 3)
                  .map((r) => (
                    <li key={r.title}>
                      <span className="lg__fmt">{r.format}</span>
                      <span className="lg__title">{r.title}</span>
                    </li>
                  ))}
              </ol>
            </div>
          </aside>
        </div>
      </Section>
    </div>
  )
}
