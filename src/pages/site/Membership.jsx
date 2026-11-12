/**
 * Membership (/membership), a main nav item (content review, 11-05-2026:
 * "membership should be its own section with tiers and benefits, plus a main
 * nav item"). One page for every way to join IBA: membership of the
 * alliance (the library, the directory and more), the three pathways and
 * their tiers (components/CorridorPlans, moved here from the Web3 Corridor
 * page), how to join, and the questions. No prices anywhere (by request).
 *
 * Set in the site's own visual language (content review, 11-09), as on
 * Tokenization and Expertise: a 3D render in the hero, the icon strip under
 * it, glass cards on the red light-arcs ground, the tiers in a dark glass
 * panel, and the steps as glass cards on the red gradient.
 * Tones alternate light and dark with no two dark bands touching (as on the
 * Web3 Corridor page): dark hero, the white strip, the red light-arcs, white
 * (the tiers' dark panel), the red gradient, the questions on a light band
 * with a soft red glow, the ask white and centred, and then the site's dark
 * CTA band (brandbook.css, "Membership grounds").
 */

import { PageHero, Section, Btn } from '../../components/Kit'
import { Go, Faq } from '../../sections/service/ServiceBlocks'
import MissionPillars from '../../components/MissionPillars'
import CorridorPlans from '../../components/CorridorPlans'
import { FACTS } from '../../data/facts'

const ENQUIRY = 'Membership'
const Arrow = () => <span aria-hidden="true">→</span>

/* the hero's 3D render: the supplied membership cards, stacked and wired
   in light (public/images/membership-hero.webp, from membership-hero.png,
   its black made transparent like the Tokenization render); floats over a
   soft red glow (.tkh) */
const HeroArt = () => (
  <div className="tkh mbp-art">
    <span className="tkh__glow" aria-hidden="true" />
    <img
      className="tkh__img"
      src="/images/membership-hero.webp"
      alt=""
      width="920"
      height="920"
      decoding="async"
      fetchpriority="high"
    />
  </div>
)

/* the page's sections, as the Tokenization page's icon strip under the hero */
const JUMP = [
  { href: '#alliance', label: 'Membership of the Alliance', icon: <><path d="M12 3 4 6.5v5c0 4.6 3.4 8.4 8 9.5 4.6-1.1 8-4.9 8-9.5v-5Z" /><path d="m8.5 12 2.5 2.5 4.5-5" /></> },
  { href: '#plans', label: 'Pathways & Tiers', icon: <><path d="M12 3 3 7.5l9 4.5 9-4.5Z" /><path d="m3 12 9 4.5 9-4.5M3 16.5 12 21l9-4.5" /></> },
  { href: '#join', label: 'How to Join', icon: <><path d="M5 12h12M13 6l6 6-6 6" /></> },
  { href: '#membership-faq', label: 'Questions', icon: <><circle cx="12" cy="12" r="9" /><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6M12 17.2v.1" /></> },
]

const OPENS = [
  {
    key: 'library',
    title: 'The Complete Library',
    /* open books */
    icon: <><path d="M3 5.5c3-1 6-1 9 1 3-2 6-2 9-1V19c-3-1-6-1-9 1-3-2-6-2-9-1Z" /><path d="M12 6.5V20" /></>,
    short: 'Free access to every article, research paper, policy brief and recorded session, curated by IBA’s experts and advisors.',
  },
  {
    key: 'directory',
    title: 'The IBA Directory',
    /* a register of people */
    icon: <><rect x="4" y="3" width="16" height="18" rx="2" /><circle cx="12" cy="10" r="2.6" className="mp__fill" /><path d="M7.5 17c.8-2 2.5-3 4.5-3s3.7 1 4.5 3" /></>,
    short: 'A verified register of members, advisors, institutions and partners across the alliance, for introductions that carry weight.',
  },
  {
    key: 'briefings',
    title: 'Briefings & Gatherings',
    /* a calendar with the day marked */
    icon: <><rect x="3.5" y="5" width="17" height="15" rx="2" /><path d="M3.5 10h17M8 3v4M16 3v4" /><circle cx="12" cy="15" r="1.8" className="mp__fill" /></>,
    short: 'Invitations to member briefings, roundtables and the alliance’s events across its partner regions.',
  },
  {
    key: 'profile',
    title: 'A Verified Member Profile',
    /* a verified badge */
    icon: <><path d="m12 2.8 2.4 1.8 3-.2.9 2.9 2.4 1.8-1 2.9 1 2.9-2.4 1.8-.9 2.9-3-.2L12 21.2l-2.4-1.8-3 .2-.9-2.9-2.4-1.8 1-2.9-1-2.9 2.4-1.8.9-2.9 3 .2Z" /><path d="m8.8 12 2.2 2.2 4.2-4.4" /></>,
    short: 'Standing within a community of practitioners, researchers and decision-makers in blockchain and Web3.',
  },
]

/* the four steps, as the homepage's membership section had them (moved
   here by request, 11-06) */
const JOURNEY = [
  {
    key: 'apply',
    title: '01  Apply',
    icon: <><path d="M6 3h9l4 4v14H6Z" /><path d="M14 3v5h5M9 13h7M9 17h4" /></>,
    short: 'Share your organisation, sector and the markets you are building for.',
  },
  {
    key: 'assess',
    title: '02  Assess',
    icon: <><path d="M4 5h16v10H9l-5 4Z" /><path d="M8 9h8M8 12h5" /></>,
    short: 'A short conversation with the IBA team to find the right fit.',
  },
  {
    key: 'select',
    title: '03  Select',
    icon: <><path d="M12 3 3 7.5l9 4.5 9-4.5Z" /><path d="m3 12 9 4.5 9-4.5" /><circle cx="12" cy="7.5" r="1.6" className="mp__fill" /></>,
    short: 'Choose the membership pathway and tier that match your goals.',
  },
  {
    key: 'activate',
    title: '04  Activate',
    icon: <><path d="M12 2.5c3 2.2 4.5 5.4 4.5 9.2V16h-9v-4.3c0-3.8 1.5-7 4.5-9.2Z" /><circle cx="12" cy="9.5" r="1.8" className="mp__fill" /><path d="M7.5 12.5 5 15v3l2.5-2M16.5 12.5 19 15v3l-2.5-2" /></>,
    short: 'Meet your IBA lead and begin with the network, the library and the corridor.',
  },
]

const FAQ = [
  {
    q: 'Are Web360 Club and Indo–UAE Startup Xchange the same membership?',
    a: 'No. Web360 Club runs founder/investor and tokenization tracks; the Indo–UAE Startup Xchange is a separate membership with its own tiers, terms and benefits.',
  },
  {
    q: 'How are membership terms shared?',
    a: 'Terms for every Web360 and Indo–UAE Startup Xchange tier are shared on enquiry and confirmed by the programme team.',
  },
  {
    q: 'Do all members get a dedicated concierge?',
    a: 'No. A named corridor concierge is included for Xchange Silver and Gold, not Bronze. Priority access on certain Web360 tiers is described separately.',
  },
  {
    q: 'Does membership guarantee investment, licensing or customers?',
    a: 'No. Investor introductions, regulatory guidance, market access and launch support are programme benefits, not assured funding, approvals or sales.',
  },
  {
    q: 'What is the difference between Gold and Gold Plus?',
    a: 'Web360 founder Gold is an accelerator and fundraising-focused tier. Gold Plus is a separate tokenization-oriented corporate and institutional membership with sponsorship, visibility and business-development benefits.',
  },
  {
    q: 'Are tax and foreign investment figures legal advice?',
    a: 'No. Regulatory figures shared through the Xchange programme are indicative and not legal or tax advice. Obtain current jurisdiction-specific advice before acting.',
  },
]

export default function Membership() {
  return (
    <div className="mbp">
      <PageHero
        id="membership"
        aside={<HeroArt />}
        eyebrow="IBA Membership"
        title="Join the Alliance"
        lede={`Membership brings founders, investors, institutions and professionals into one network across the IBA Web3 Corridor: ${FACTS.members.text} members in ${FACTS.countries.text} countries, with a pathway for every stage of growth.`}
        actions={
          <>
            <Btn href="#plans" variant="ghost">
              Explore Pathways & Tiers
            </Btn>
            <Btn enquiry={ENQUIRY}>
              Become a Member <Arrow />
            </Btn>
          </>
        }
      />

      <nav className="tkp-focus mbp-focus band band--light band--own" aria-label="On this page">
        <ul className="tkp-focus__list">
          {JUMP.map((j) => (
            <li className="tkp-focus__item" key={j.href}>
              <Go className="mbp-focus__link" href={j.href}>
                <span className="tkp-focus__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">{j.icon}</svg>
                </span>
                <span className="tkp-focus__label">{j.label}</span>
              </Go>
            </li>
          ))}
        </ul>
      </nav>

      <Section
        id="alliance"
        tone="dark"
        eyebrow="Membership of the Alliance"
        title="What membership opens"
        lede="Membership opens the full breadth of the IBA ecosystem to those committed to shaping the future of blockchain and Web3: the complete library, the IBA Directory and a place within a network of leaders, advisors and institutions. Membership of the alliance is free access, by application."
      >
        {/* glass cards on the red light-arcs ground, as About's Our Mission */}
        <MissionPillars items={OPENS} />
      </Section>

      <Section
        id="plans"
        eyebrow="Pathways & tiers"
        title="Find the membership built for your ambition."
        lede="Three pathways, each with three tiers: Web360 Club for founders and investors, Web360 Club for tokenization and institutions, and the Indo–UAE Startup Xchange. Choose a pathway to see its tiers."
      >
        {/* the tiers in a dark glass panel, as the Expertise page's
            Consulting Stack sits in its white section */}
        <div className="mbp-plans" data-rise>
          <CorridorPlans />
        </div>
      </Section>

      <Section
        id="join"
        tone="red"
        eyebrow="IBA Membership"
        title="How to join"
        lede="Four steps from first conversation to an active membership, with the IBA team alongside you at each one."
      >
        <MissionPillars items={JOURNEY} />
        <div className="pk-actions" data-rise>
          <Btn href="#plans" variant="ghost">
            Explore Pathways & Tiers
          </Btn>
          <Btn enquiry={ENQUIRY}>
            Become a Member <Arrow />
          </Btn>
        </div>
      </Section>

      <Section id="membership-faq" tone="card" eyebrow="Frequently asked questions" title="Before you choose.">
        <Faq items={FAQ} />
      </Section>

      <Section
        id="membership-cta"
        center
        eyebrow="Next step"
        title="Your next market starts with the right membership."
        lede="Tell us your organisation, your preferred pathway and tier, and the markets you are building for, and the IBA team will take it from there."
      >
        <div className="pk-actions" data-rise>
          <Btn enquiry={ENQUIRY}>
            Enquire About Membership <Arrow />
          </Btn>
          <Btn href="/corridor" variant="ghost">
            Explore the Web3 Corridor
          </Btn>
        </div>
      </Section>
    </div>
  )
}
