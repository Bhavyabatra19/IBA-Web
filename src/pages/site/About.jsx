/**
 * About, who we are, vision, mission, impact, and the founder.
 * Tones alternate light and dark (as on the Web3 Corridor, Membership,
 * Tokenization and Expertise pages): dark hero, white, the red light-arcs,
 * the Framework on a light band with a soft red glow, the red Impact band,
 * the founder white, and then the site's dark CTA band (brandbook.css,
 * "About grounds").
 */

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
          lead="Every great nation is defined by the infrastructure it chooses to build."
          /* condensed from the founder's message (11-06); the complete note
             opens from "Read the full note" */
          note={[
            'A century ago, it was railways and ports. A generation ago, it was telecom and software. Today, it is trust itself: how value moves, how ownership is proven, and how a promise made in Mumbai is honoured in Nairobi, Dubai or Frankfurt.',
            'India has already shown the world what digital public infrastructure can achieve at scale. The next chapter is being written now, and India must not merely participate in it. India must author it. That is why the India Blockchain Alliance exists.',
            'The Alliance brings together founders, regulators, enterprises and investors so that innovation and integrity move forward together, across a corridor connecting Africa, the UAE, India and Europe.',
            'The future will not be handed to us. It will be built, block by block, partnership by partnership. Let us build it together.',
          ]}
          full={[
            'A century ago, it was railways and ports. A generation ago, it was telecom and software. Today, it is trust itself: how value moves, how ownership is proven, and how a promise made in Mumbai is honoured in Nairobi, Dubai or Frankfurt without friction or doubt.',
            'That is the infrastructure India must now lead. And that is why the India Blockchain Alliance exists.',
            'India has already shown the world what digital public infrastructure can achieve at scale. The next chapter is being written now, and India must not merely participate in it. India must author it.',
            'The last digital revolution connected people. The next one will connect value, and India will not wait to be invited.',
            'Real-world assets, from land and energy to carbon credits and royalties, are moving onto programmable rails. Capital that was once locked and reserved for a privileged few is becoming accessible, transparent and global. This is a rewiring of how economies work.',
            'But technology alone does not build a future. People, institutions and trust do. The Alliance brings together founders, regulators, enterprises and investors so that innovation and integrity move forward together. Regulation is not the enemy of innovation. Clarity is its fuel.',
            'Our vision reaches beyond borders. Across the corridor connecting Africa, the UAE, India and Europe, we see capital, ideas and opportunity flowing as freely as information does today.',
            "To the builders I say, build boldly, and build responsibly. To the institutions, help lead this transformation, don't just witness it. And to the policymakers: give us clear frameworks, and India's talent will do the rest. And to every young Indian who feels too far from the centre of the world to change it: the centre has moved. It is wherever you choose to build.",
            "India's greatest export in the coming decade will be trust, engineered at scale. The future will not be handed to us. It will be built, block by block, partnership by partnership.",
            'Let us build it together.',
          ]}
        />
      </Section>
    </div>
  )
}
