/**
 * Home, membership in brief (by request, 11-06): a black band under the
 * Web3 Corridor map with a carousel of the ways to join, each card's "Know
 * more" going to its part of the Membership page (the pathway links open
 * the plans on that pathway's tab). It replaces the longer membership
 * section that sat lower on the page. No prices (by request).
 */

import { Section, Btn } from '../components/Kit'
import CardRail from '../components/CardRail'
import { Go } from './service/ServiceBlocks'

const SLIDES = [
  {
    tag: 'Free access',
    title: 'Membership of the Alliance',
    text: 'The complete IBA Library, the IBA Directory, member briefings and a verified profile in the network.',
    href: '/membership#alliance',
  },
  {
    tag: 'Web360 Club',
    title: 'Club, Premier & Gold Class',
    text: 'Three Web3 Corridor memberships, each building on the last: advisory, funding readiness, visibility and a Dubai presence.',
    href: '/membership#plans-web360',
  },
  {
    tag: 'India ↔ UAE',
    title: 'Indo–UAE Startup Xchange',
    text: 'Gold Xchange: market entry between India and the UAE, with compliance clinics, introductions and a 12-week launch sprint.',
    href: '/membership#plans-xchange',
  },
  {
    tag: 'Four steps',
    title: 'How to Join',
    text: 'Apply, a short conversation with the IBA team, choose your pathway and tier, and meet your IBA lead.',
    href: '/membership#join',
  },
]

export default function MembershipBand() {
  return (
    <Section
      id="membership"
      tone="dark"
      eyebrow="IBA Membership"
      title="Be Part of the Movement"
      lede="One network across the IBA Web3 Corridor, with a pathway for every stage of growth."
    >
      <div className="mbb">
        <CardRail label="Ways to join IBA" cols={3}>
          {SLIDES.map((s) => (
            <li className="pk-card mbb__card" key={s.title}>
              <span className="wd__tag">{s.tag}</span>
              <h3 className="pk-card__title">{s.title}</h3>
              <p className="pk-card__text">{s.text}</p>
              <Go className="mbb__go" href={s.href} aria-label={`Know more about ${s.title}`}>
                Know more <span aria-hidden="true">→</span>
              </Go>
            </li>
          ))}
        </CardRail>
      </div>
      <div className="pk-actions" data-rise>
        <Btn href="/membership">
          Explore Membership <span aria-hidden="true">→</span>
        </Btn>
      </div>
    </Section>
  )
}
