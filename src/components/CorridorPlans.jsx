/**
 * Web3 Corridor membership plans, three tracks behind tabs (Web360 Founder
 * & Investor, Web360 Tokenization & Institutions, Indo–UAE Startup
 * Xchange), each with its three tier cards, from the
 * client's Corridor membership reference (11-04-2026). The cards reuse the
 * site's tier card (.mbr-tier, with a TierCard in each metal); the tabs are styled in
 * brandbook.css (.cpl).
 *
 * Each tier shows 4–5 key benefits and a Request Brochure button (by
 * request, 11-12-2026); the full lists are in the brochure.
 *
 * Both Web360 Club tracks carry the corridor partners' benefits for every
 * tier (by request, 11-14-2026), shown once above the tier cards, each
 * linking to that partner's membership page.
 *
 * No prices anywhere on the site (by request, 11-04-2026): the cards give
 * who each tier is for and what it includes; terms are shared on enquiry.
 */

import { useEffect, useState } from 'react'
import TierCard from './TierCard'
import { Bullets } from './Kit'

const ENQUIRY = 'Membership'

/* corridor partner benefits, for every Web360 Club tier */
const PARTNER_BENEFITS = [
  { partner: 'TheCircle', benefit: 'Global Member benefits', href: 'https://the-block.com/the-circle/' },
  { partner: 'TheBlock', benefit: 'Connect benefits', href: 'https://the-block.com/individual-membership/' },
]

const TRACKS = [
  {
    key: 'club',
    label: 'Founder & Investor',
    intro: 'Web360 Club for founders and investors: investor relations, deal flow, advisory and international growth.',
    partners: true,
  },
  {
    key: 'token',
    label: 'Tokenization & Institutions',
    title: 'Web360 Club Membership Benefits',
    partners: true,
    intro: 'Membership positioning: Club establishes ecosystem access and knowledge; Premier strengthens visibility, business development and commercial readiness; Gold delivers executive-level engagement, institutional positioning and priority growth opportunities.',
  },
  {
    key: 'xchange',
    label: 'Indo–UAE Startup Xchange',
    intro: 'A distinct bilateral market-entry membership with three tiers and a 12-week Gold launch sprint.',
  },
]

const PLANS = {
  club: [
    {
      metal: 'bronze',
      name: 'Club',
      sub: 'Starters & Early Builders',
      audience: 'Founders, operators, MSMEs and early-stage businesses',
      summary: 'Build international exposure with the Web360 community, expert access and market-entry guidance.',
      benefits: [
        'Webinars, AMAs and the monthly Corridor roundup',
        'Verified Club badge; public and community events',
        'Go-to-market advisory and mentoring on setup, legal and fundraising',
        'Member pricing on Corridor services and Dubai co-hosted events',
        'Global member directory, document vault and KYC/KYB',
      ],
    },
    {
      metal: 'silver',
      name: 'Premier',
      sub: 'Growth Plan for Founders',
      audience: 'Registered startups pursuing multi-country expansion',
      summary: 'Club inclusions plus founder-focused visibility, investor readiness and growth support.',
      benefits: [
        'All Club inclusions',
        'Growth advisory with deck and plan reviews',
        'Matched investor introductions and networking',
        'Startup podcast feature and two Dubai event admissions',
        'Customised setup, legal and GTM mentoring',
      ],
    },
    {
      metal: 'gold',
      name: 'Gold',
      sub: 'Growth & Accelerator Plan',
      audience: 'High-growth founders and fundraising-focused ventures',
      summary: 'Premier inclusions plus curated investor access, structured milestone reviews and expansion support.',
      benefits: [
        'All Premier inclusions',
        'Expert Board Advisor support for six months',
        'Weekly strategy sessions and KPI/milestone reviews',
        'Curated expert, mentor and investor access',
        'Media and podcast visibility; fast-track into Tokenization Gold',
      ],
    },
  ],
  token: [
    {
      metal: 'bronze',
      name: 'Club',
      sub: 'Essential Access',
      tagline: 'Learn • Connect • Explore',
      benefits: [
        { t: 'Membership & Industry Insights', d: 'Verified badge, live and on-demand webinars, Tokenized Markets Weekly newsletter, and monthly member updates.' },
        { t: 'Knowledge & Learning', d: 'Access to RWA, tokenomics, and regulatory learning resources, member portal, and RWA forum.' },
        { t: 'Ecosystem Visibility', d: 'Vendor listings, issuer profiles, offerings, and access to industry directories.' },
        { t: 'Business Enablement', d: 'Business setup, legal, GTM and fundraising advisory access, corporate vault, KYC/KYB support and on-request technology interns.' },
        { t: 'Member Privileges', d: 'Five-day Buy Side trial, preferential member pricing, and discounted Dubai co-hosted events.' },
      ],
    },
    {
      metal: 'silver',
      name: 'Premier',
      sub: 'Growth & Visibility',
      tagline: 'Position • Engage • Accelerate',
      includes: 'Includes all Club benefits, plus:',
      benefits: [
        { t: 'Enhanced Market Visibility', d: 'Premium listings, branded media exposure, Member Spotlight features and podcast participation eligibility.' },
        { t: 'Strategic Business Development', d: 'Active lead generation, targeted ecosystem introductions and new commercial opportunities.' },
        { t: 'Specialist Tokenization Mentorship', d: 'Expert-led tokenomics white-paper sessions and introductions to tokenization platforms.' },
        { t: 'Business & Project Readiness', d: 'Detailed project assessments, business plan reviews and an annual strategy session.' },
        { t: 'Expanded Ecosystem Engagement', d: 'Greater access to relevant industry partners, potential clients and strategic collaborations.' },
      ],
    },
    {
      metal: 'gold',
      name: 'Gold',
      sub: 'Executive & Institutional',
      tagline: 'Lead • Expand • Scale',
      includes: 'Includes all Club and Premier benefits, plus:',
      benefits: [
        { t: 'Enterprise-Wide Privileges', d: 'Company-wide and core-team access with preferred visibility across the Web3 Corridor ecosystem.' },
        { t: 'Executive Advisory', d: 'Access to an Expert Board Advisor for six months, with priority strategic advisory support.' },
        { t: 'Priority Business Introductions', d: 'Preferential introductions to prospective clients, institutional partners, and relevant ecosystem stakeholders.' },
        { t: 'Sponsorship & Market Leadership', d: 'Sponsorship opportunities, enhanced brand positioning, and high-value industry engagement.' },
        { t: 'Global Business Expansion', d: 'Priority advisory and relationship-building opportunities supporting international market access, institutional engagement and long-term commercial growth.' },
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

/* #plans-club, #plans-token, #plans-xchange: a link can open a pathway's
   tab (the Membership menu does) */
const fromHash = () => {
  const m = typeof window !== 'undefined' && window.location.hash.match(/^#plans-(club|token|xchange)$/)
  return m ? m[1] : null
}

export default function CorridorPlans() {
  const [track, setTrack] = useState(() => fromHash() || 'club')
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
      {TRACKS.map((t) => (
        <span key={t.key} id={`plans-${t.key}`} className="cpl__anchor" aria-hidden="true" />
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

        {current.partners && (
          <div className="cpl__partners">
            <p className="cpl__partners-label">Partner benefits · every tier</p>
            <ul className="cpl__partners-list">
              {PARTNER_BENEFITS.map((b) => (
                <li key={b.partner}>
                  <a href={b.href} target="_blank" rel="noopener noreferrer">
                    <strong>{b.partner}:</strong> {b.benefit} <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <ul className="cpl__plans">
          {plans.map((p) => (
            <li className={`mbr-tier mbr-tier--${p.metal}`} key={p.name}>
              <div className="mbr-tier__top">
                <TierCard metal={p.metal} />
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
