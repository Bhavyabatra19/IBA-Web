/**
 * Web3 Corridor membership plans — three tracks behind tabs (Web360 Founder
 * & Investor, Web360 Tokenization & Institutions, Indo–UAE Startup
 * Xchange), each with its three tier cards, from the
 * client's Corridor membership reference (11-04-2026). The cards reuse the
 * site's tier card (.mbr-tier, TierShield); the tabs are styled in
 * brandbook.css (.cpl).
 *
 * No prices anywhere on the site (by request, 11-04-2026): the cards give
 * who each tier is for and what it includes; terms are shared on enquiry.
 */

import { useState } from 'react'
import TierShield from './TierShield'
import { Bullets } from './Kit'

const ENQUIRY = 'Membership'

const TRACKS = [
  {
    key: 'club',
    label: 'Founder & Investor',
    intro: 'Web360 Club for founders and investors: investor relations, deal flow, advisory and international growth.',
  },
  {
    key: 'token',
    label: 'Tokenization & Institutions',
    intro: 'Web360 Club’s tokenization track: dedicated tokenization, RWA, issuer, vendor and corporate plans.',
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
      name: 'Bronze',
      sub: 'Starters & Early Builders',
      audience: 'Founders, operators, MSMEs and early-stage businesses',
      summary: 'Build international exposure with the Web360 community, expert access and market-entry guidance.',
      benefits: [
        'Webinars, AMAs and monthly Corridor roundup',
        'Verified Club badge; public and community events',
        'Member pricing on Corridor services and products',
        'Special Dubai co-hosted event packages',
        'Go-to-market advisory for business expansion',
        'Priority review for Bronze Plus track',
        'Global member and partner directory; templates and frameworks',
        'Corporate document vault; KYC/KYB via biometrics',
        'Mentoring on setup, legal frameworks and fundraising activation',
        'Member-only marketplace and investor table invitations',
      ],
    },
    {
      metal: 'silver',
      name: 'Silver',
      sub: 'Growth Plan for Founders',
      audience: 'Registered startups pursuing multi-country expansion',
      summary: 'Bronze inclusions plus founder-focused visibility, investor readiness and growth support.',
      benefits: [
        'All Bronze inclusions',
        'Learning links: RWA, tokenomics and regulatory primers',
        'Startup podcast company feature',
        'Two complimentary Dubai event admissions',
        'On-request tech interns for projects',
        'Growth advisory; deck and plan reviews',
        'Matched investor introductions and networking',
        'Customized setup, legal and GTM mentoring',
        'Priority review for Silver Plus track',
      ],
    },
    {
      metal: 'gold',
      name: 'Gold',
      sub: 'Growth & Accelerator Plan',
      audience: 'High-growth founders and fundraising-focused ventures',
      summary: 'Silver inclusions plus curated investor access, structured milestone reviews and expansion support.',
      benefits: [
        'All Silver inclusions',
        'Curated expert and founder–mentor appointments',
        'GTM advisory and member pricing',
        'Special prices for Dubai co-hosted events',
        'On-request technical interns',
        'Expert Board Advisor preparation and support for six months',
        'Continuous market-readiness reviews',
        'Fast-track plans into Gold Plus programme',
        'Media and podcast visibility; investor and mentor directory',
        'Weekly strategy sessions and KPI/milestone reviews',
      ],
    },
  ],
  token: [
    {
      metal: 'bronze',
      name: 'Bronze Plus',
      sub: 'Tokenization Starter Pack',
      audience: 'Founders, issuers, advisors, professionals and small businesses',
      summary: 'Join the tokenized markets ecosystem with resources, directories, learning and advisory.',
      benefits: [
        'Verified badge and live/on-demand webinars',
        'Tokenized Markets Weekly newsletter',
        'RWA, tokenomics and regulatory learning centre',
        'Full portal, RWA forum, vendor and issuer directories',
        'Vendor listing and issuer profile/offering',
        'Monthly member roundup and member pricing',
        'Five-day Buy Side trial plus member pricing',
        'On-request technical interns',
        'Dubai co-hosted event member prices',
        'Business setup, legal, GTM and early fundraising advisory',
        'Corporate vault and KYC/KYB facilities',
      ],
    },
    {
      metal: 'silver',
      name: 'Silver Plus',
      sub: 'Tokenization Pro Pack',
      audience: 'Tokenization businesses seeking leads and visibility',
      summary: 'Bronze Plus inclusions with enhanced business development, expert reviews and promotional reach.',
      benefits: [
        'All Bronze Plus inclusions',
        'Enhanced listings and active business development',
        'Branded media, Member Spotlight and podcast eligibility',
        'Expert mentor sessions for tokenomics white paper',
        'Detailed reviews of project and business plans',
        'Introductions to tokenization platforms',
        'Lead-generation and ecosystem introductions',
        'Annual strategy session',
        'GTM advisory, member pricing and Dubai event offers',
        'Full portal, directories and corporate vault',
      ],
    },
    {
      metal: 'gold',
      name: 'Gold Plus',
      sub: 'Corporate & Institutional Pack',
      audience: 'Tokenization platforms, law firms, banks, institutions and established vendors',
      summary: 'An enterprise-oriented package for market presence, sponsorship and high-value introductions.',
      benefits: [
        'All Silver Plus inclusions',
        'Sponsorships, lead generation and prospective client opportunities',
        'Company-wide/core-team access and preferred visibility',
        'Enhanced vendor listings and business development',
        'Expert mentor sessions and detailed plan reviews',
        'Introductions to tokenization platforms',
        'Expert Board Advisor for six months',
        'Priority introductions and advisory',
        'Access to global portal, RWA forum and directories',
        'Member pricing, Dubai event offers and technical intern availability',
      ],
    },
  ],
  xchange: [
    {
      metal: 'bronze',
      name: 'Bronze',
      sub: 'Network Access',
      audience: 'Founder-led ventures exploring India ↔ UAE expansion',
      summary: 'A year-round starting point for corridor briefings, events and peer community.',
      benefits: [
        'Member events and briefings',
        'Founder community across both markets',
        'Network and ecosystem orientation',
        'Suitable for India → UAE or UAE → India tracks',
      ],
    },
    {
      metal: 'silver',
      name: 'Silver',
      sub: 'Hands-on Market Entry',
      audience: 'Startups needing guided compliance and commercial introductions',
      summary: 'Bronze access with practical market-entry clinics, curated introductions and named support.',
      benefits: [
        'All Bronze Xchange inclusions',
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
      summary: 'Silver access plus a focused 12-week sprint from validation to launch.',
      benefits: [
        'All Silver Xchange inclusions',
        '12-week launch sprint',
        'Weeks 1–3: Validate',
        'Weeks 4–8: Build',
        'Weeks 9–12: Launch',
        'Demo day and soft-landing support',
      ],
    },
  ],
}

export default function CorridorPlans() {
  const [track, setTrack] = useState('club')
  const current = TRACKS.find((t) => t.key === track)
  const plans = PLANS[track]

  return (
    <div className="cpl">
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
        <p className="cpl__intro">{current.intro}</p>

        <ul className="cpl__plans">
          {plans.map((p) => (
            <li className={`mbr-tier mbr-tier--${p.metal}`} key={p.name}>
              <div className="mbr-tier__top">
                <TierShield metal={p.metal} />
              </div>
              <h3 className="mbr-tier__name">{p.name}</h3>
              <p className="cpl__sub">{p.sub}</p>
              <p className="mbr-tier__label">Designed for</p>
              <p className="mbr-tier__who">{p.audience}</p>
              <p className="mbr-tier__why">{p.summary}</p>
              <Bullets items={p.benefits} />
              <a className="mbr-tier__cta" href="/connect" data-enquiry={ENQUIRY}>
                Enquire about {p.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
