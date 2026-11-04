/**
 * IBA Red Club for institutions (/red-club/institutions) — the "Know more"
 * page behind the overview's institutions door: the proposition, the
 * institutional advantage, the connected journey, the Experience Centers and
 * how a campus partnership runs. Copy in redClubContent.js.
 */

import { PageHero, Section, SubHead, Cards, Bullets, Btn } from '../../components/Kit'
import { Go, Steps, Groups, Faq } from '../../sections/service/ServiceBlocks'
import {
  INSTITUTION,
  PROPOSITION,
  INSTITUTION_BENEFITS,
  CONNECTED_JOURNEY,
  CENTERS,
  AGENDA,
  PROGRAMMES,
  MEMBERSHIP_SCOPE,
  LABS,
  OPERATING_MODEL,
  SUSTAINABILITY,
  FAQ,
} from './redClubContent'

const Arrow = () => <span aria-hidden="true">→</span>

const JUMP = [
  ['/red-club', '← Red Club'],
  ['#rc-advantage', 'Advantage'],
  ['#rc-journey', 'The Journey'],
  ['#rc-centers', 'Experience Centers'],
  ['#rc-membership', 'Membership'],
  ['#rc-operating-model', 'How It Works'],
  ['/red-club/learners', 'For Learners →'],
]

const INSTITUTION_FAQ = FAQ.filter((f) =>
  ['Is Red Club only for learners?', 'Are all labs and certifications included in membership?', 'How does the Red Club connect to the Web3 Corridor?'].includes(f.q)
)

export default function RedClubInstitutions() {
  return (
    <div>
      <PageHero
        id="red-club-institutions"
        aside={
          <div className="rc-hero-art" aria-hidden="true">
            <img src="/images/ac-institutions.jpg" alt="" decoding="async" fetchpriority="high" />
          </div>
        }
        eyebrow="IBA Red Club · For Institutions"
        title="Where institutions lead."
        lede="More than a campus club, an institutional growth platform: Red Club positions participating institutions as emerging-technology enablers, connects academic programmes with industry requirements and supports meaningful learner outcomes."
        actions={
          <>
            <Btn enquiry={INSTITUTION}>
              Enquire About Partnership <Arrow />
            </Btn>
            <Btn href="#rc-centers" variant="ghost">
              Explore the Experience Centers
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
        id="rc-proposition"
        eyebrow="The Red Club proposition"
        title="Connecting academic excellence to the global Web3 economy"
        lede="India Blockchain Alliance promotes Web3 technologies, with emphasis on blockchain, tokenization, AI, policy and education. The Red Club is its institution-facing skills and innovation initiative within the IBA Web3 Corridor, developed with global industry organizations and partners."
      >
        <Cards cols={3} items={PROPOSITION} />
      </Section>

      <Section
        id="rc-advantage"
        tone="dark"
        eyebrow="Institutional advantage"
        title="More than a campus club. An institutional growth platform."
        lede="The Red Club model is designed to position participating institutions as emerging-technology enablers, connect academic programmes with industry requirements and support meaningful learner outcomes."
      >
        <Cards cols={4} items={INSTITUTION_BENEFITS} />
        <SubHead lede="Leadership in emerging-tech innovation, credible industry research papers, opportunities for joint technology patents, technology entrepreneurship programmes, consulting engagements and international pathways.">
          Institutional outcomes
        </SubHead>
      </Section>

      <Section
        id="rc-journey"
        eyebrow="The institution-to-learner connection"
        title="One connected journey. Shared outcomes."
        lede="As an institution builds its Red Club capabilities, learners gain access to a more practical and connected learning environment."
      >
        <Steps items={CONNECTED_JOURNEY} />
      </Section>

      <Section
        id="rc-centers"
        tone="dark"
        eyebrow="Red Club Experience Centers"
        title="A hands-on hub for Industry 4.0 skills"
        lede="The Experience Center concept brings together tokenization, blockchain and AI learning environments for applied research, innovation, training and collaboration."
      >
        <Cards cols={4} items={CENTERS} />
      </Section>

      <Section
        id="rc-objectives"
        eyebrow="Primary objectives"
        title="Build capacity. Set standards. Solve real problems."
        lede="Support emerging-technology research excellence, position the university as a technology enabler, develop overseas academic collaborations and establish industry-aligned best practices."
      >
        <SubHead>Research and collaboration agenda</SubHead>
        <div data-rise>
          <Bullets items={AGENDA} />
        </div>
      </Section>

      <Section id="rc-programmes" eyebrow="Programmes & methodology" title="Designed for practical, measurable learning">
        <Cards cols={3} items={PROGRAMMES} />
      </Section>

      <Section
        id="rc-membership"
        eyebrow="Participation & services"
        title="Institutional membership with flexible capabilities"
        lede="Red Club membership is tiered. What an Experience Center includes, what is charged separately and what can be added are set out below; the exact scope is confirmed in each institutional agreement."
      >
        <Groups items={MEMBERSHIP_SCOPE} cols={2} />
      </Section>

      <Section
        id="rc-labs"
        eyebrow="Optional lab enhancements"
        title="Expand the Experience Center"
        lede="Shared IBA–Red Club branding with the institution is part of the model. Specific branding rights and commercial arrangements should be agreed separately."
      >
        <Cards cols={3} items={LABS} />
      </Section>

      <Section
        id="rc-operating-model"
        tone="dark"
        eyebrow="Operating model"
        title="Clear responsibilities for a functioning campus partnership"
      >
        <Groups items={OPERATING_MODEL} cols={2} />
        <SubHead lede="IBA supplies programme, project and ecosystem capabilities; the institution enables campus infrastructure, faculty engagement and learner participation. Together, they can create a sustained bridge from academic learning to industry practice.">
          Practical partnership model
        </SubHead>
      </Section>

      <Section
        id="rc-sustainability"
        eyebrow="Institutional sustainability"
        title="Potential avenues for institutional revenue and visibility"
        lede="Experience Centers can support institution-led commercial engagement, subject to programme design, demand and agreed terms."
      >
        <Cards cols={3} items={SUSTAINABILITY} />
      </Section>

      <Section id="rc-faq" eyebrow="Frequently asked" title="Understand the Red Club model">
        <Faq items={INSTITUTION_FAQ} />
      </Section>

      <Section
        id="rc-join"
        tone="red"
        eyebrow="Build the next generation of Web3 talent"
        title="Bring the IBA Red Club to your institution."
        lede="Explore an Experience Center, tailor emerging-technology programmes and connect your learners to a broader industry and global learning ecosystem."
      >
        <div className="pk-actions" data-rise>
          <Btn enquiry={INSTITUTION}>
            Enquire About Partnership <Arrow />
          </Btn>
          <Btn href="/red-club/learners" variant="ghost">
            See What Learners Get
          </Btn>
        </div>
      </Section>
    </div>
  )
}
