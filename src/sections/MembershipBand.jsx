/**
 * Home — membership (content review, 11-05-2026: "Membership is invisible"):
 * the tiers in brief, what membership opens, and how to join, with the way
 * into the full plans on the Web3 Corridor page. No prices (by request).
 */

import { Section, SubHead, Cards, Btn } from '../components/Kit'
import { Steps } from './service/ServiceBlocks'

const TIERS = [
  {
    num: 'Bronze',
    title: 'Starters & early builders',
    text: 'International exposure, expert access and market-entry guidance for founders, operators and early-stage businesses.',
  },
  {
    num: 'Silver',
    title: 'Growth across markets',
    text: 'Investor readiness, matched introductions and founder visibility for registered startups expanding into new countries.',
  },
  {
    num: 'Gold',
    title: 'Global leaders · by invitation',
    text: 'Curated investor access, board-level advisory and milestone reviews for high-growth ventures and institutions.',
  },
]

const BENEFITS = [
  { title: 'The IBA Library', text: 'Every article, research paper, policy brief and recorded session.' },
  { title: 'The IBA Directory', text: 'A verified register of members, advisors, institutions and partners.' },
  { title: 'Corridor Access', text: 'Market entry, capital and partners across five regions.' },
  { title: 'Briefings & Events', text: 'Member briefings, roundtables and the alliance’s global events.' },
]

const JOIN = [
  { n: '01', name: 'Apply', body: 'Share your organisation, sector and the markets you are building for.' },
  { n: '02', name: 'Assess', body: 'A short conversation with the IBA team to find the right fit.' },
  { n: '03', name: 'Select', body: 'Choose the membership pathway and tier that match your goals.' },
  { n: '04', name: 'Activate', body: 'Meet your IBA lead and begin with the network, the library and the corridor.' },
]

export default function MembershipBand() {
  return (
    <Section
      id="membership"
      tone="card"
      eyebrow="IBA Membership"
      title="Join the Alliance"
      lede="Membership brings founders, investors, institutions and professionals into one network across the IBA Web3 Corridor, with a pathway for every stage of growth."
    >
      <Cards cols={3} items={TIERS} />
      <SubHead>What membership opens</SubHead>
      <Cards cols={4} items={BENEFITS} />
      <SubHead>How to join</SubHead>
      <Steps items={JOIN} />
      <div className="pk-actions" data-rise>
        <Btn enquiry="Membership">
          Become a Member <span aria-hidden="true">→</span>
        </Btn>
        <Btn href="/membership" variant="ghost">
          Explore Membership
        </Btn>
      </div>
    </Section>
  )
}
