/**
 * IBA Red Club — the overview: what Red Club is, what members get and who
 * it is for, then a door each to the detail for institutions and for
 * learners (/red-club/institutions, /red-club/learners). Kept short by
 * request; the rest of the reference copy lives on those two pages. Copy in
 * redClubContent.js.
 */

import { PageHero, Section, Cards, Btn } from '../../components/Kit'
import { Faq } from '../../sections/service/ServiceBlocks'
import EzStairs from '../../components/EzStairs'
import { LEARNER, HIGHLIGHTS, EXPERIENCE, WHO, FAQ } from './redClubContent'

const Arrow = () => <span aria-hidden="true">→</span>

const DOORS = [
  {
    img: '/images/card-institutions.jpg',
    tag: 'For institutions',
    title: 'More than a campus club. An institutional growth platform.',
    text: 'Experience Centers on campus: curriculum, labs, research, industry projects and international pathways, run as a partnership between IBA and the institution.',
    href: '/red-club/institutions',
    cta: 'Know more',
  },
  {
    img: '/images/card-students.jpg',
    tag: 'For individual learners',
    title: 'From curiosity to industry-ready capability',
    text: 'Programmes, live projects, mentors, career support and verifiable credentials for anyone building Web3 skills, whether you are studying, working or starting out.',
    href: '/red-club/learners',
    cta: 'Know more',
  },
]

/* the general questions; the institution and learner ones are on their pages */
const OVERVIEW_FAQ = FAQ.filter((f) =>
  ['Who can join Red Club?', 'Do I need prior blockchain experience?', 'What can members gain?', 'How is Red Club connected to IBA?'].includes(f.q)
)

/* who it's for, without the bullet lists: the overview names them, the
   detail pages say what each gets */
const WHO_SHORT = WHO.map(({ title, text }) => ({ title, text }))

export default function RedClub() {
  return (
    <div className="rc-page">
      <PageHero
        id="red-club"
        aside={<EzStairs />}
        eyebrow="India Blockchain Alliance · Web3 Corridor"
        title={
          <>
            Where institutions lead.
            <br />
            Learners build the future.
          </>
        }
        lede="The IBA Red Club Experience Centers connect universities, educators and learners to practical blockchain, tokenization and AI learning, powered by industry collaboration, applied research and international pathways."
        actions={
          <>
            <Btn href="/red-club/institutions">
              For Institutions <Arrow />
            </Btn>
            <Btn href="/red-club/learners" variant="ghost">
              For Learners
            </Btn>
          </>
        }
      />

      <Section
        id="rc-about"
        eyebrow="About Red Club"
        title="Where the next wave of Web3 talent comes together."
        lede="Red Club is a learning, collaboration and opportunity network within the India Blockchain Alliance ecosystem, and its institution-facing skills and innovation initiative within the IBA Web3 Corridor: a launchpad for learners, developers, professionals, founders and entrepreneurs who want to take an active role in building the Web3 economy."
      >
        <Cards cols={4} items={HIGHLIGHTS} />
      </Section>

      <Section
        id="rc-paths"
        eyebrow="Know more"
        title="Two ways into Red Club"
        lede="Red Club works with institutions and with individual learners: institutions build Experience Centers on campus, and learners at any stage build practical Web3 skills, projects and networks."
      >
        <Cards cols={2} items={DOORS} />
      </Section>

      <Section
        id="rc-experience"
        eyebrow="The Red Club experience"
        title="Knowledge is the starting point. Capability is the outcome."
        lede="A connected experience designed to move members from awareness to practical participation."
      >
        <Cards cols={3} items={EXPERIENCE} />
      </Section>

      <Section
        id="rc-who"
        eyebrow="Who it's for"
        title="Different journeys. One connected community."
        lede="Whether you're exploring Web3 or already building in the ecosystem, Red Club can be a place to learn, contribute and grow."
      >
        <Cards cols={4} items={WHO_SHORT} />
      </Section>

      <Section
        id="rc-community"
        tone="red"
        eyebrow="A network. A shared ambition."
        title="Be part of the community building the future of Web3."
        lede="Connect your curiosity with people, knowledge and opportunities across the India Blockchain Alliance ecosystem."
      >
        <div className="pk-actions" data-rise>
          <Btn enquiry={LEARNER}>
            Find Your Place in Red Club <Arrow />
          </Btn>
        </div>
      </Section>

      <Section id="rc-faq" eyebrow="Frequently asked" title="Good to know.">
        <Faq items={OVERVIEW_FAQ} />
      </Section>
    </div>
  )
}
