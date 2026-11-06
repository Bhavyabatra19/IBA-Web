/**
 * Membership (/membership), a main nav item (content review, 11-05-2026:
 * "membership should be its own section with tiers and benefits, plus a main
 * nav item"). One page for every way to join IBA: membership of the
 * alliance (the library, the directory and more), the three pathways and
 * their tiers (components/CorridorPlans, moved here from the Web3 Corridor
 * page), how to join, and the questions. No prices anywhere (by request).
 */

import { PageHero, Section, Cards, Btn } from '../../components/Kit'
import { Go, Steps, Faq } from '../../sections/service/ServiceBlocks'
import CorridorPlans from '../../components/CorridorPlans'
import { FACTS } from '../../data/facts'

const ENQUIRY = 'Membership'
const Arrow = () => <span aria-hidden="true">→</span>

const JUMP = [
  ['#alliance', 'Membership of the Alliance'],
  ['#plans', 'Pathways & Tiers'],
  ['#join', 'How to Join'],
  ['#membership-faq', 'FAQ'],
]

const OPENS = [
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
]

/* the four steps, as the homepage's membership section had them (moved
   here by request, 11-06) */
const JOURNEY = [
  { n: '01', name: 'Apply', body: 'Share your organisation, sector and the markets you are building for.' },
  { n: '02', name: 'Assess', body: 'A short conversation with the IBA team to find the right fit.' },
  { n: '03', name: 'Select', body: 'Choose the membership pathway and tier that match your goals.' },
  { n: '04', name: 'Activate', body: 'Meet your IBA lead and begin with the network, the library and the corridor.' },
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
    <div>
      <PageHero
        id="membership"
        eyebrow="IBA Membership"
        title="Join the Alliance"
        lede={`Membership brings founders, investors, institutions and professionals into one network across the IBA Web3 Corridor: ${FACTS.members.text} members in ${FACTS.countries.text} countries, with a pathway for every stage of growth.`}
        actions={
          <>
            <Btn enquiry={ENQUIRY}>
              Become a Member <Arrow />
            </Btn>
            <Btn href="#plans" variant="ghost">
              Explore Pathways & Tiers
            </Btn>
          </>
        }
      />

      <nav className="pk-jump" aria-label="On this page">
        {JUMP.map(([href, label]) => (
          <Go className="pk-jump__link" href={href} key={href}>
            {label}
          </Go>
        ))}
      </nav>

      <Section
        id="alliance"
        tone="card"
        eyebrow="Membership of the Alliance"
        title="What membership opens"
        lede="Membership opens the full breadth of the IBA ecosystem to those committed to shaping the future of blockchain and Web3: the complete library, the IBA Directory and a place within a network of leaders, advisors and institutions. Membership of the alliance is free access, by application."
      >
        <Cards cols={4} items={OPENS} />
      </Section>

      <Section
        id="plans"
        eyebrow="Pathways & tiers"
        title="Find the membership built for your ambition."
        lede="Three pathways, each with three tiers: Web360 Club for founders and investors, Web360 Club for tokenization and institutions, and the Indo–UAE Startup Xchange. Choose a pathway to see its tiers."
      >
        <CorridorPlans />
      </Section>

      <Section
        id="join"
        tone="card"
        eyebrow="IBA Membership"
        title="How to join"
      >
        <Steps items={JOURNEY} />
        <div className="pk-actions" data-rise>
          <Btn enquiry={ENQUIRY}>
            Become a Member <Arrow />
          </Btn>
          <Btn href="#plans" variant="ghost">
            Explore Pathways & Tiers
          </Btn>
        </div>
      </Section>

      <Section id="membership-faq" eyebrow="Frequently asked questions" title="Before you choose.">
        <Faq items={FAQ} />
      </Section>

      <Section
        id="membership-cta"
        tone="red"
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
