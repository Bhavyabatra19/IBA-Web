/** Ecosystem — initiatives, key partners, councils, people, directory, partnering. */

import { PageHero, Section, Cards, Form, Btn, Prose } from '../../components/Kit'
import EcoHolo from '../../components/EcoHolo'
import PartnerCarousel from '../../components/PartnerCarousel'
import { Go } from '../../sections/service/ServiceBlocks'

/* The hero image: the client's render of a shield hub joined to five tiles,
   shown as supplied with a light animation laid over it (components/EcoHolo).
   It replaces the earlier edit of a Pinterest reference (eco-hero.jpg); confirm
   the rights to this render before launch. Spacing shared with the Expertise
   hero image (.xp-img). */
const HeroImage = () => (
  <div className="xp-img xp-img--eco" aria-hidden="true">
    <EcoHolo />
  </div>
)

/* "Know more" opens each council's LinkedIn About page. */
const COUNCILS = [
  { title: 'Emerging Technology Council', logo: '/logos/initiatives/emerging-technology-council.png', text: "The apex body for India's technology industry, driving policy advocacy, research, knowledge, advisory and community building across newer tech frontiers.", href: 'https://www.linkedin.com/company/emerging-tech-council/about/' },
  { title: 'Blockchain Governance Council', logo: '/logos/initiatives/blockchain-governance-council.png', text: 'An open global multi-stakeholder network co-developing solutions around policy, frameworks, compliance, security, taxation and standards.', href: 'https://www.linkedin.com/company/blockchain-governance-council/about/' },
  { title: 'The Green Chain Protocol', logo: '/logos/initiatives/green-chain.png', text: 'A blockchain ecosystem focused on ESG, aligned with COP28, showcasing and growing Web3 projects in sustainability.', href: 'https://www.linkedin.com/company/the-green-chain-protocol/about/' },
  { title: 'Web3 Corridor', logo: '/images/web3.jpeg', text: 'A global innovation corridor connecting India, the UAE, Europe, the Americas, and Africa to drive investment, technology transfer, and venture growth while advancing interoperable frameworks for Web3, tokenization, and AI across regions representing over 2.8 billion people.', href: '/corridor' },
]

/* The council cards: logo, name, description, "Know more". */
const Councils = () => (
  <ul className="ecc">
    {COUNCILS.map((c) => (
      <li className="ecc__card" key={c.title} data-rise>
        <span className="ecc__logo">
          {c.logo ? (
            <img src={c.logo} alt="" loading="lazy" decoding="async" />
          ) : (
            <span className="ecc__mono" aria-hidden="true">{c.mono}</span>
          )}
        </span>
        <h3 className="ecc__title">{c.title}</h3>
        <p className="ecc__text">{c.text}</p>
        {c.href.startsWith('http') ? (
          <a className="ecc__go" href={c.href} target="_blank" rel="noreferrer noopener" aria-label={`Know more about ${c.title} (opens LinkedIn)`}>
            Know more <span aria-hidden="true">→</span>
          </a>
        ) : (
          <Go className="ecc__go" href={c.href} aria-label={`Know more about ${c.title}`}>
            Know more <span aria-hidden="true">→</span>
          </Go>
        )}
      </li>
    ))}
  </ul>
)

/* The alliance's associates, run as two marquees in opposite directions. */
const ASSOCIATES = [
  { name: 'Members', icon: <><circle cx="9" cy="8" r="3.2" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" /><circle cx="17" cy="9" r="2.5" /><path d="M16 14.2c2.9.3 5 2.6 5 5.8" /></> },
  { name: 'Advisors', icon: <><path d="M4 5h16v11H9l-5 4V5Z" /><path d="M8 9.5h8M8 12.5h5" /></> },
  { name: 'Partners', icon: <><circle cx="9" cy="12" r="5" /><circle cx="15" cy="12" r="5" /></> },
  { name: 'Learners', icon: <><path d="M2 9l10-5 10 5-10 5L2 9Z" /><path d="M6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5M22 9v6" /></> },
  { name: 'Entrepreneurs', icon: <><path d="M12 3c3.5 2 5 5.5 5 9.5L15 16H9l-2-3.5C7 8.5 8.5 5 12 3Z" /><circle cx="12" cy="9.5" r="1.6" /><path d="M9 16l-2.5 3.5M15 16l2.5 3.5M12 17v3" /></> },
  { name: 'Experts', icon: <><circle cx="12" cy="9" r="5.5" /><path d="M8.5 13.5 7 21l5-2.5 5 2.5-1.5-7.5" /></> },
  { name: 'Economists', icon: <><path d="M3 3v18h18" /><path d="M6 15l4-4 3 3 6-7" /><path d="M15 7h4v4" /></> },
  { name: 'Lawyers', icon: <><path d="M12 3v18M7 21h10M5 6h14" /><path d="M5 6l-3 7a3 3 0 0 0 6 0L5 6ZM19 6l-3 7a3 3 0 0 0 6 0l-3-7Z" /></> },
  { name: 'Scientists', icon: <><path d="M9 3h6M10 3v6L4.5 18.5A1.7 1.7 0 0 0 6 21h12a1.7 1.7 0 0 0 1.5-2.5L14 9V3" /><path d="M7 15h10" /></> },
  { name: 'Academicians', icon: <><path d="M3 5c3-1 6-1 9 1 3-2 6-2 9-1v14c-3-1-6-1-9 1-3-2-6-2-9-1V5Z" /><path d="M12 6v14" /></> },
  { name: 'Developers', icon: <><path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" /></> },
  { name: 'Analysts', icon: <><path d="M4 20V12M9 20V7M14 20v-5" /><circle cx="17.5" cy="8.5" r="3.5" /><path d="M20 11l2 2" /></> },
  { name: 'Engineers', icon: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" /></> },
  { name: 'Trade Experts', icon: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z" /></> },
  { name: 'Lobbyists', icon: <><path d="M3 10v4h3l7 4V6L6 10H3Z" /><path d="M17 9a4 4 0 0 1 0 6M19.5 6.5a8 8 0 0 1 0 11" /></> },
  { name: 'Professionals', icon: <><rect x="3" y="7" width="18" height="13" rx="1.5" /><path d="M9 7V4h6v3M3 12.5h18" /></> },
  { name: 'Regulators', icon: <><path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6l8-3Z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></> },
  { name: 'Policy Makers', icon: <><path d="M6 3h9l4 4v14H6V3Z" /><path d="M14 3v5h5M9 12h7M9 16h5" /></> },
  { name: 'Venture Capitalists', icon: <><ellipse cx="10" cy="6" rx="6" ry="2.5" /><path d="M4 6v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V6M4 10v4c0 1.4 2.7 2.5 6 2.5" /><circle cx="17" cy="17" r="4" /><path d="M17 15v4" /></> },
  { name: 'Visionaries', icon: <><path d="M9 18h6M10 21h4" /><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3Z" /></> },
]
const ROWS = [ASSOCIATES.slice(0, 10), ASSOCIATES.slice(10)]

const Associates = () => (
  <div className="asx" data-rise>
    <p className="sr-only">{ASSOCIATES.map((a) => a.name).join(', ')}</p>
    {ROWS.map((row, r) => (
      <div className={`asx__row${r ? ' asx__row--rev' : ''}`} key={r} aria-hidden="true">
        <div className="asx__track">
          {[...row, ...row].map((a, i) => (
            <span className="asx__tile" key={i}>
              <svg className="asx__icon" viewBox="0 0 24 24">{a.icon}</svg>
              {a.name}
            </span>
          ))}
        </div>
      </div>
    ))}
  </div>
)

const PARTNER_TYPES = [
  { title: 'Ecosystem Partner', text: 'List your product, integrate with IBA infrastructure, access the member network.' },
  { title: 'Institutional Partner', logo: '/logos/initiatives/red-club.jpg', logoAlt: 'IBA Red Club logo', text: 'Bring a Red Club Experience Center to your campus.' },
  { title: 'Government & Policy Partner', text: 'Co-develop frameworks, standards and public infrastructure projects.' },
  { title: 'Corridor Partner', text: 'Join the Global Innovation Corridor as a technology, investment, hub or talent partner.' },
]

export default function Ecosystem() {
  return (
    <div>
      <PageHero
        id="ecosystem"
        aside={<HeroImage />}
        eyebrow="The IBA Ecosystem"
        title="Initiatives, Partnerships & Ecosystem"
        lede="IBA powers the global Web3 ecosystem through flagship initiatives, strategic partnerships, global affiliations, and councils that shape standards, drive collaboration, and translate collective expertise into real-world impact for Web3 and tokenization initiatives."
        actions={
          <>
            <Btn href="#become-a-partner">
              Become a Partner <span aria-hidden="true">→</span>
            </Btn>
          </>
        }
      />

      <Section
        id="organisations"
        center
        eyebrow="Key Partners"
        title="Our global partner network accelerating the Web3 impact."
        lede="IBA connects partners to business opportunities, qualified leads, investor networks, technology providers, and new markets. Through strategic introductions, joint ventures, and cross-border market access, we help turn ecosystem relationships into commercial partnerships, new revenue opportunities, and scalable growth in Web3 and tokenization."
      >
        {/* the partners as a paged carousel of red glass tiles (by request) */}
        <PartnerCarousel />
      </Section>

      <Section
        id="communities" tone="dark"
        eyebrow="Communities and Councils"
        title="Contributing to shape Global Web3 Standards and Frameworks"
      >
        <Councils />
        <div className="pk-actions" data-rise>
          <Btn enquiry="Ecosystem partnership">
            Join a Council <span aria-hidden="true">→</span>
          </Btn>
        </div>
      </Section>

      <Section
        id="people" tone="red"
        eyebrow="Global Contributors"
        title="The Alliance and its Associates"
      >
        <Associates />
        <div className="pk-actions" data-rise>
          <Btn href="/library#signup">
            Join the Movement <span aria-hidden="true">→</span>
          </Btn>
        </div>
      </Section>

      <Section
        id="member-directory" tone="dark"
        eyebrow="Members Only"
        title="Member Directory"
        lede="Find and connect with members, advisors and partners across the alliance. The directory is available to IBA members only."
      >
        <div className="pk-lock" data-rise>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
          <Prose
            lead="The directory is locked"
            paras={['Log in with your member account to browse the directory. Not a member yet? Joining is free.']}
          />
          <div className="pk-actions">
            <Btn href="/library#login">Member Login</Btn>
            <Btn href="/library#signup" variant="ghost">
              Become a Member
            </Btn>
          </div>
        </div>
      </Section>

      <Section id="become-a-partner" eyebrow="Become a Partner" title="Partner With IBA">
        <div className="pk-split">
          <Cards items={PARTNER_TYPES} cols={2} />
          <Form
            subject="Partnership enquiry"
            submit="Submit Partnership Enquiry"
            consent="I agree to be contacted about my partnership enquiry."
            fields={[
              { name: 'name', label: 'Name' },
              { name: 'org', label: 'Organisation' },
              { name: 'email', label: 'Work email', type: 'email' },
              { name: 'country', label: 'Country' },
              {
                name: 'type',
                label: 'Partnership type',
                type: 'select',
                wide: true,
                options: PARTNER_TYPES.map((p) => p.title),
              },
              { name: 'message', label: 'Message', type: 'textarea' },
            ]}
          />
        </div>
      </Section>
    </div>
  )
}
