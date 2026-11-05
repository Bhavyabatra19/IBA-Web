/** About — who we are, vision, mission, impact, and the founder. */

import { PageHero, Section, Stats, Cards } from '../../components/Kit'
import { CONTACT } from '../../nav'
import FloatingCubes from '../../components/FloatingCubes'
import VisionMission from '../../sections/VisionMission'
import FounderLetter from '../../sections/FounderLetter'
import MissionPillars from '../../components/MissionPillars'
import { FRAMEWORK } from '../../data/framework'
import { FACTS, REGIONS_LINE } from '../../data/facts'

export default function About() {
  return (
    <div>
      <PageHero
        id="who-we-are"
        eyebrow="About IBA"
        title="We Shape the Future of Virtual Assets"
        lede={[
          'India Blockchain Alliance (IBA) is a premier global blockchain community and advocacy group dedicated to advancing the development, adoption and implementation of blockchain technology across diverse sectors.',
          "Founded by visionary leaders and industry experts, IBA serves as a unifying force to drive innovation, collaboration and knowledge in the blockchain and Web3 technologies space, with a sharp focus on tokenization and establishing the global Web3 Corridor network that connects the world's economies.",
          'IBA is an alliance in the truest sense: a network of members, advisors, institutions, regulators and builders who move together.',
        ]}
        /* the floating cubes on the right; the figures move under the copy */
        aside={<FloatingCubes />}
        /* the figures, without any animation (by request), so all four sit on
           one line from the moment the page opens */
        still={
          <div className="about-stats">
            <Stats
              still
              items={[
                { value: FACTS.members.text, count: FACTS.members.n, suffix: FACTS.members.suffix, label: 'Global Members' },
                { value: FACTS.advisors.text, count: FACTS.advisors.n, suffix: FACTS.advisors.suffix, label: 'Global Advisories' },
                { value: FACTS.countries.text, count: FACTS.countries.n, label: 'Countries' },
                { value: FACTS.affiliations.text, count: FACTS.affiliations.n, suffix: FACTS.affiliations.suffix, label: 'Global Affiliations' },
              ]}
            />
          </div>
        }
      />

      <VisionMission
        vision={{
          lead: 'A world where value moves at the speed of trust.',
          paras: [
            'We envision a future where every asset, a home in Amritsar, a royalty stream in Mumbai, a solar farm in Zambia, a fund in Dubai, can be owned, verified, and exchanged as easily as sending a message.',
            'A future where borders slow down people, but never capital, trust, or opportunity.',
            `By 2035, we see the global corridor we are creating, ${REGIONS_LINE}, as the world's first fully interoperable tokenized economy.`,
            'A living network where regulatory frameworks speak to each other, liquidity flows without friction, and a farmer, a founder, and a fund manager transact on the same rails of transparency.',
            'We see India not as a participant in this future, but as its reference architecture, the model other nations study when they ask: how do you build trust at scale?',
            'We see a generation of builders who no longer ask permission to innovate, because the infrastructure of accountability is built into the code itself.',
            'We see capital finally reaching the ideas that deserve it, not the ones with the best connections, but the ones with the best proof.',
            'This is the world we are building toward: decentralized, but not disconnected. Borderless, but not lawless. Tokenized, but never dehumanized.',
          ],
          close: 'Where trust is no longer promised, it is engineered. And India holds the blueprint.',
        }}
        mission={{
          lead: 'We exist to architect the infrastructure of trust for the next era of value.',
          paras: [
            'As blockchain moves from experiment to economic backbone, we stand as the bridge between innovation and institution.',
            'We unite builders, regulators, capital, and communities under one shared conviction: that transparency is not a constraint on growth, but the foundation of it.',
            'We champion the tokenization of real-world value, the decentralization of opportunity, and the convergence of AI and distributed ledgers into systems that are faster, fairer, and borderless by design.',
            'Our mandate is not to chase the future, it is to build it, responsibly, at the intersection of policy and possibility.',
            'We believe emerging economies are not late entrants to this revolution, but its next epicenter, and we exist to ensure they lead, not follow.',
            'Every framework we shape, every partnership we forge, every founder we champion is a step toward one horizon: a world where trust is programmable, capital is borderless, and progress belongs to everyone who builds it.',
          ],
          close: 'This is the infrastructure of what comes next, and we at IBA are laying the first blocks.',
        }}
      />

      <Section
        id="mission-pillars"
        tone="dark"
        eyebrow="Our Mission"
        title="Operating Model"
        lede="Our Web3 Corridors: the rails connecting markets, capital, and ecosystems globally."
      >
        <MissionPillars />
      </Section>

      {/* the framework, in its own white section (by request), laid out like
          the rest of the site: the four dimensions as a two-by-two card
          grid, each readable in full at once. It comes before the Impact
          figures (by request). */}
      <Section
        id="iba-framework"
        tone="card"
        eyebrow="The IBA Framework"
        title="Multi-Dimensional IBA Framework with One Connected Web3 Ecosystem."
      >
        <Cards
          cols={2}
          items={FRAMEWORK.map((f, i) => ({
            num: String(i + 1).padStart(2, '0'),
            icon: f.icon,
            title: f.title,
            text: f.text,
          }))}
        />
      </Section>

      <Section
        id="impact"
        tone="red"
        eyebrow="Impact, Measured, Executed"
        title="Building what matters, real outcomes with lasting impact"
      >
        <Stats
          items={[
            { value: FACTS.tokenized.text, count: FACTS.tokenized.n, prefix: FACTS.tokenized.prefix, suffix: FACTS.tokenized.suffix, label: 'Tokenized Assets' },
            { value: FACTS.countries.text, count: FACTS.countries.n, label: 'Countries' },
            { value: FACTS.sectors.text, count: FACTS.sectors.n, label: 'Tokenization Sectors' },
            { value: FACTS.partners.text, count: FACTS.partners.n, suffix: FACTS.partners.suffix, label: 'Ecosystem Partners' },
          ]}
        />
      </Section>

      <Section id="team" eyebrow="Founder" title="Welcome to IBA">
        <FounderLetter
          linkedin={CONTACT.linkedin.href}
          lead="I spent over two decades inside the world’s financial system before I chose to help rebuild it."
          note={[
            'Twenty-five years in banking taught me something the industry rarely says out loud: trust was never actually free.',
            'I founded the India Blockchain Alliance because I believe that era is ending — and India will not just witness that ending, it will architect what comes next.',
            'This Alliance exists for one reason: to make sure India does not adopt the future of finance — it defines it. We are not here to speculate. We are here to structure.',
            'The rails of the next financial system are being laid right now. I intend for them to run through India — and I invite you to help lay them with us.',
          ]}
        />
      </Section>
    </div>
  )
}
