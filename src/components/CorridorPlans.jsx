/**
 * Web3 Corridor membership plans behind tabs: the three Web360 Club
 * memberships (Club Class, Premier Class, Gold Class; content review,
 * 11-14-2026) and the Indo–UAE Startup Xchange, each with its three tier
 * cards. The cards reuse the
 * site's tier card (.mbr-tier, with a TierCard in each metal); the tabs are styled in
 * brandbook.css (.cpl).
 *
 * Each tier shows 4–5 key benefits and a Request Brochure button (by
 * request, 11-12-2026); the full lists are in the brochure.
 *
 * No prices anywhere on the site (by request, 11-04-2026): the cards give
 * who each tier is for and what it includes; terms are shared on enquiry.
 */

import { useEffect, useState } from 'react'
import TierCard from './TierCard'
import { Bullets } from './Kit'

const ENQUIRY = 'Membership'

const TRACKS = [
  {
    key: 'web360',
    label: 'Web360 Club',
    title: 'Web360 Club Membership Benefits',
    intro: 'Membership positioning: Club Class establishes ecosystem access and knowledge; Premier Class strengthens visibility, business development and commercial readiness; Gold Class delivers executive-level engagement, institutional positioning and priority growth opportunities in the heart of Dubai.',
  },
  {
    key: 'xchange',
    label: 'Indo–UAE Startup Xchange',
    intro: 'A distinct bilateral market-entry membership, Gold Xchange, built around a 12-week launch sprint.',
  },
]

const PLANS = {
  /* the three Web3 Corridor memberships (content review, 11-14-2026): one
     set of tiers in place of the Founder & Investor and Tokenization &
     Institutions tracks */
  web360: [
    {
      metal: 'bronze',
      name: 'Club Class',
      sub: 'Essential Access',
      tagline: 'Learn • Connect • Explore',
      includes: 'Club Class Membership — Exclusive Benefits',
      benefits: [
        { t: 'Verified Identity & Secure Access', d: 'Official Club badge, IBA SafeVault for corporate documentation and KYC/KYB, and access to the global member and partner directory.' },
        { t: 'Strategic Advisory & Growth Enablement', d: 'GTM blueprint, product lifecycle advisory, business planning, expansion strategies and regulatory mentoring.' },
        { t: 'Funding Readiness & Investor Preparation', d: 'Growth advisory, pitch deck and business plan reviews, and tailored funding preparation assistance.' },
        { t: 'Exclusive Networking & Global Exposure', d: 'Curated roundtables, member roundups, Web3 Corridor introductions, Dubai co-hosted event privileges and special event pricing.' },
        { t: 'Visibility & Preferred Member Privileges', d: 'IBA LinkedIn spotlights, promotional opportunities, and preferential pricing on Web3 Corridor services and products.' },
      ],
    },
    {
      metal: 'silver',
      name: 'Premier Class',
      sub: 'Growth & Visibility',
      tagline: 'Position • Engage • Accelerate',
      includes: 'Includes all Club Class benefits, plus:',
      benefits: [
        { t: 'Strategic Advisory & Growth Acceleration', d: 'Six months of expert board advisory, strategic mentoring, KPI and milestone reviews, and business growth planning.' },
        { t: 'Market Readiness & Business Expansion', d: 'Comprehensive market readiness assessments, business setup blueprints, and strategic guidance for market entry and expansion.' },
        { t: 'Investment Readiness & Grant Opportunities', d: 'Mock investor committee exposure, investment preparation, and advisory on blockchain grants and funding opportunities.' },
        { t: 'Talent Access & Technical Enablement', d: 'Priority access to the IBA talent pool, on-request technical interns, and expert support for innovation and execution.' },
        { t: 'Global Visibility & Thought Leadership', d: 'Startup podcasts, media exposure, white paper publishing support, and subsidized access to exclusive industry events and passes on request.' },
      ],
    },
    {
      metal: 'gold',
      name: 'Gold Class',
      sub: 'Executive & Institutional',
      tagline: 'Lead • Expand • Scale',
      includes: 'Includes all Premier Class benefits, plus:',
      lead: 'Premier Class privileges. Premium Dubai presence. Global Web3 opportunities.',
      benefits: [
        { t: 'All Premier Class Privileges', d: 'Complete access to strategic advisory, investment readiness, talent networks, market expansion, global visibility and growth acceleration services.' },
        { t: 'Dubai Web3 Experience Center Access', d: 'Exclusive access to full-service business facilities, professional office space and operational support at Dubai’s prestigious World Trade Centre.' },
        { t: 'Premium Business Establishment & Market Access', d: 'Dedicated support for establishing a Dubai presence, facilitating business operations, strategic partnerships and cross-border market expansion.' },
        { t: 'Tokenization Launch & Ecosystem Enablement', d: 'Privileged access to IBA’s premier Dubai partner, TheBlock, leveraging its ecosystem for tokenization launches, industry showcases, curated events and strategic networking.' },
        { t: 'Global Visibility & Institutional Connections', d: 'Enhanced brand positioning, media exposure, executive networking and curated introductions to investors, institutions and Web3 ecosystem leaders through the IBA Web3 Corridor.' },
      ],
    },
  ],
  /* one tier, Gold Xchange (IBA Membership Matrix, 11-13-2026) */
  xchange: [
    {
      metal: 'gold',
      name: 'Gold Xchange',
      sub: '12-week Launch Sprint',
      audience: 'Startups ready for a structured India ↔ UAE launch',
      benefits: [
        'Member events and briefings',
        'Founder community across both markets',
        'Network and ecosystem orientation',
        'India → UAE or UAE → India track',
        'Compliance clinics',
        'Curated introductions',
        'Named corridor concierge',
        'Market-entry support and partner navigation',
        '12-week launch sprint: validate, build, launch',
        'Demo day and soft-landing support',
      ],
    },
  ],
}

/* the full Web360 Club matrix (IBA Membership Matrix, 11-13-2026), row by
   row: what each class includes (true, or a note such as how many a year),
   shown as a comparison table under the cards. No prices (by request). */
const MATRIX = [
  ['Verified Club badge', true, true, true],
  ['IBA SafeVault: data room, corporate documents and KYC/KYB', true, true, true],
  ['Roundtable invitations and the members’ roundup', '2 a year', '4 a year', '6 a year'],
  ['Funding prep and assistance: growth advisory, deck and plan reviews', true, true, true],
  ['Member pricing on Corridor services and products', true, true, true],
  ['Dubai co-hosted event packages and special prices', true, true, true],
  ['GTM blueprint', true, true, true],
  ['Global member and partner directory', true, true, true],
  ['Product advisory: blueprint analysis, lifecycle, expansion and business plan', true, true, true],
  ['Mentoring on the regulatory framework', true, true, true],
  ['Introduction to the Web3 Corridor promotions', true, true, true],
  ['IBA promotion and LinkedIn spotlight', true, true, true],
  ['Event passes, on request and subsidised', false, true, 'Connect: full service'],
  ['Advisor on Board: KPI and milestone reviews, strategy sessions', false, true, true],
  ['Startup podcast and media visibility', false, true, true],
  ['Market readiness assessment', false, true, true],
  ['On-request tech interns', false, true, true],
  ['Access to the IBA talent pool', false, true, true],
  ['Business set-up blueprint', false, true, true],
  ['Expert Board Advisor support (6 months)', false, true, true],
  ['Exposure to a mock investor committee', false, true, true],
  ['White paper publishing support', false, true, true],
  ['Blockchain grant advice and information', false, true, true],
  ['TheCircle Level 1 pack', false, true, true],
  ['TheBlock Level 1 pack', false, false, true],
]
const CLASSES = ['Club Class', 'Premier Class', 'Gold Class']

const Mark = ({ v }) =>
  v === true ? (
    <span className="cpl__yes" aria-label="Included">✓</span>
  ) : v ? (
    <span className="cpl__note">{v}</span>
  ) : (
    <span className="cpl__no" aria-label="Not included">–</span>
  )

const Compare = () => (
  <details className="cpl__compare">
    <summary>Compare all Web360 Club benefits</summary>
    <div className="cpl__tableWrap">
      <table className="cpl__table">
        <thead>
          <tr>
            <th scope="col">Benefit</th>
            {CLASSES.map((n) => (
              <th scope="col" key={n}>
                {n}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {MATRIX.map(([label, ...tiers]) => (
            <tr key={label}>
              <th scope="row">{label}</th>
              {tiers.map((v, i) => (
                <td key={CLASSES[i]}>
                  <Mark v={v} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </details>
)

/* #plans-web360, #plans-xchange: a link can open a pathway's tab (the
   Membership menu does); the old #plans-club and #plans-token links (the
   homepage band, the Web3 Corridor page) open the Web360 Club tiers */
const ALIAS = { club: 'web360', token: 'web360', web360: 'web360', xchange: 'xchange' }
const ANCHORS = ['web360', 'club', 'token', 'xchange']
const fromHash = () => {
  const m = typeof window !== 'undefined' && window.location.hash.match(/^#plans-(web360|club|token|xchange)$/)
  return m ? ALIAS[m[1]] : null
}

export default function CorridorPlans() {
  const [track, setTrack] = useState(() => fromHash() || 'web360')
  const current = TRACKS.find((t) => t.key === track)
  const plans = PLANS[track]

  useEffect(() => {
    const onHash = () => {
      const t = fromHash()
      if (t) setTrack(t)
    }
    window.addEventListener('hashchange', onHash)
    window.addEventListener('app:route', onHash)
    window.addEventListener('app:hash', onHash)
    return () => {
      window.removeEventListener('hashchange', onHash)
      window.removeEventListener('app:route', onHash)
      window.removeEventListener('app:hash', onHash)
    }
  }, [])

  return (
    <div className="cpl">
      {/* the pathway anchors the menu links to */}
      {ANCHORS.map((a) => (
        <span key={a} id={`plans-${a}`} className="cpl__anchor" aria-hidden="true" />
      ))}
      <div className="cpl__tabs" role="tablist" aria-label="Membership pathways">
        {TRACKS.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            id={`cpl-tab-${t.key}`}
            aria-selected={t.key === track}
            aria-controls="cpl-panel"
            className="cpl__tab"
            onClick={() => setTrack(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div id="cpl-panel" role="tabpanel" aria-labelledby={`cpl-tab-${track}`}>
        {current.title && <h3 className="cpl__title">{current.title}</h3>}
        <p className="cpl__intro">{current.intro}</p>

        <ul className={`cpl__plans${plans.length === 1 ? ' cpl__plans--single' : ''}`}>
          {plans.map((p) => (
            <li className={`mbr-tier mbr-tier--${p.metal}`} key={p.name}>
              <div className="mbr-tier__top">
                <TierCard metal={p.metal} label={p.name} />
              </div>
              <h3 className="mbr-tier__name">{p.name}</h3>
              <p className="cpl__sub">{p.sub}</p>
              {p.tagline && <p className="cpl__tagline">{p.tagline}</p>}
              {p.audience && (
                <>
                  <p className="mbr-tier__label">Designed for</p>
                  <p className="mbr-tier__who">{p.audience}</p>
                </>
              )}
              {p.summary && <p className="mbr-tier__why">{p.summary}</p>}
              {p.includes && <p className="cpl__includes">{p.includes}</p>}
              {p.lead && <p className="cpl__lead">{p.lead}</p>}
              {typeof p.benefits[0] === 'string' ? (
                <Bullets items={p.benefits} />
              ) : (
                <ol className="pk-bullets cpl__benefits">
                  {p.benefits.map((b) => (
                    <li key={b.t}>
                      <strong>{b.t}:</strong> {b.d}
                    </li>
                  ))}
                </ol>
              )}
              <a className="mbr-tier__cta" href="/connect" data-enquiry={ENQUIRY}>
                Request Brochure
              </a>
            </li>
          ))}
        </ul>

        {track === 'web360' && <Compare />}
      </div>
    </div>
  )
}
