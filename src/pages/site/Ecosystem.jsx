/** Ecosystem — initiatives, key partners, councils, people, partnering. */

import { PageHero, Section, Cards, Form, Btn } from '../../components/Kit'
import { PARTNERS, initials } from '../../data/partners'
import { FACTS } from '../../data/facts'

const TONES = ['red', 'ink', 'deep']

/* The hero image: the client's Pinterest reference (pin.it/2FjSHQlfR), a
   shield hub joined to tiles, cropped to the graphic (the source's brand mark
   removed) and toned to IBA red over silver. Three tiles carried labels that
   would read as IBA claims ("SOC", "GDPR", "50K+ users"); they are painted
   out and given ecosystem icons (globe, link, people) instead.
   ⚠ Third-party artwork — license it from its creator, or replace it, before
   launch. Styles shared with the Expertise hero image (.xp-img). */
const HeroImage = () => (
  <div className="xp-img" aria-hidden="true">
    <img src="/images/eco-hero.jpg" alt="" width="1600" height="1133" decoding="async" />
  </div>
)

const COUNCILS = [
  { title: 'Emerging Technology Council', text: "The apex body for India's technology industry, driving policy advocacy, research, knowledge, advisory and community building across newer tech frontiers." },
  { title: 'Blockchain Governance Council', text: 'An open global multi-stakeholder network co-developing solutions around policy, frameworks, compliance, security, taxation and standards.' },
  { title: 'Tech Zero', text: 'A coalition of tech companies making bold climate commitments toward net zero, part of the UN Race to Zero, alongside 350+ global businesses.' },
  { title: 'Learner Communities', text: 'IBA Learner Clubs give members exclusive access to labs and sandbox environments for blockchain, AI and metaverse experimentation.' },
]

const PEOPLE = [
  { title: 'Members', text: 'Practitioners, founders, policymakers and learners across ' + FACTS.countries.text + ' countries. Membership is how most people enter the alliance.' },
  { title: 'Advisors', text: FACTS.advisors.text + ' global advisors across policy, law, finance, engineering and academia, supporting IBA mandates and client work.' },
  { title: 'Mentors & Contributors', text: 'Industry mentors supporting Red Club learners on projects, research and careers, and contributors publishing through the IBA Library.' },
]

const PARTNER_TYPES = [
  { title: 'Ecosystem Partner', text: 'List your product, integrate with IBA infrastructure, access the member network.' },
  { title: 'Institutional Partner', text: 'Bring a Red Club Experience Center to your campus.' },
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
        title="Initiatives, Key Partners, Communities and People"
        lede={`IBA does not work alone. The ecosystem is where the alliance becomes visible: flagship initiatives built and run by IBA, ${FACTS.partners.text} ecosystem partners, ${FACTS.affiliations.text} global affiliations, and the councils and communities where the standards get argued out.`}
        actions={
          <>
            <Btn href="#become-a-partner">
              Become a Partner <span aria-hidden="true">→</span>
            </Btn>
            <Btn href="#organisations" variant="ghost">
              Key Partners
            </Btn>
          </>
        }
      />

      <Section
        id="organisations"
        eyebrow="Key Partners"
        title="Our Growing Network of Ecosystem Partners"
        lede="And more. Logo usage rights pending confirmation for every mark shown here."
      >
        <ul className="pk-orgs pk-orgs--grid">
          {PARTNERS.map(({ name, logo }, i) => (
            <li className="eco__chip" key={name} data-rise>
              {logo ? (
                <img className="eco__logo" src={logo} alt="" loading="lazy" />
              ) : (
                <span className={`eco__mono eco__mono--${TONES[i % TONES.length]}`} aria-hidden="true">
                  {initials(name)}
                </span>
              )}
              <span className="eco__name">{name}</span>
            </li>
          ))}
          {/* closes the last row of the grid, whatever the column count */}
          <li className="pk-orgs__more" data-rise>
            <span>And more partners joining every quarter.</span>
            <a href="#become-a-partner">
              Become a Partner <span aria-hidden="true">→</span>
            </a>
          </li>
        </ul>
      </Section>

      <Section id="communities" tone="dark" eyebrow="Communities & Councils" title="Where the Standards Get Set">
        <Cards items={COUNCILS} cols={4} />
        <div className="pk-actions" data-rise>
          <Btn enquiry="Ecosystem partnership">
            Join a Council <span aria-hidden="true">→</span>
          </Btn>
        </div>
      </Section>

      <Section
        id="people" tone="red"
        eyebrow="People"
        title="The Alliance Is Its People"
        lede={`${FACTS.members.text} global members. ${FACTS.advisors.text} global advisors. ${FACTS.countries.text} countries.`}
      >
        <Cards items={PEOPLE} cols={3} />
        <div className="pk-actions" data-rise>
          <Btn href="/library#signup">
            Join the Alliance <span aria-hidden="true">→</span>
          </Btn>
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
