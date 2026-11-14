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
    intro: 'A distinct bilateral market-entry membership with three tiers and a 12-week Gold launch sprint.',
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
  xchange: [
    {
      metal: 'bronze',
      name: 'Club',
      sub: 'Network Access',
      audience: 'Founder-led ventures exploring India ↔ UAE expansion',
      summary: 'A year-round starting point for corridor briefings, events and peer community.',
      benefits: [
        'Member events and briefings',
        'Founder community across both markets',
        'Network and ecosystem orientation',
        'For India → UAE or UAE → India tracks',
      ],
    },
    {
      metal: 'silver',
      name: 'Premier',
      sub: 'Hands-on Market Entry',
      audience: 'Startups needing guided compliance and commercial introductions',
      summary: 'Club access with practical market-entry clinics, curated introductions and named support.',
      benefits: [
        'All Club Xchange inclusions',
        'Compliance clinics',
        'Curated introductions',
        'Named corridor concierge',
        'Market-entry support and partner navigation',
      ],
    },
    {
      metal: 'gold',
      name: 'Gold',
      sub: '12-week Launch Sprint',
      audience: 'Startups ready for a structured India ↔ UAE launch',
      summary: 'Premier access plus a focused 12-week sprint from validation to launch.',
      benefits: [
        'All Premier Xchange inclusions',
        '12-week launch sprint',
        'Validate (weeks 1–3), build (4–8), launch (9–12)',
        'Demo day and soft-landing support',
      ],
    },
  ],
}

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

        <ul className="cpl__plans">
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
      </div>
    </div>
  )
}
