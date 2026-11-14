/**
 * IBA Red Club, the overview: what Red Club is, the two ways in, the member
 * journey and a closing call to action. Kept short by request; each point is
 * said once here, and the detail lives on /red-club/institutions and
 * /red-club/learners. Copy in redClubContent.js.
 */

import { PageHero, Section, Cards, Btn } from '../../components/Kit'
import { Faq } from '../../sections/service/ServiceBlocks'
import EzStairs from '../../components/EzStairs'
import { LEARNER, EXPERIENCE } from './redClubContent'

const Arrow = () => <span aria-hidden="true">→</span>

const DOORS = [
  {
    img: '/images/card-institutions.jpg',
    tag: 'For institutions',
    title: 'An Experience Center on your campus',
    text: 'Curriculum, labs, research, industry projects and international pathways, run in partnership with IBA.',
    href: '/red-club/institutions',
    cta: 'Know more',
  },
  {
    img: '/images/card-students.jpg',
    tag: 'For learners',
    title: 'From curiosity to industry-ready',
    text: 'Programmes, live projects, mentors, career support and verifiable credentials. For students, developers, founders and working professionals.',
    href: '/red-club/learners',
    cta: 'Know more',
  },
]

/* only what the page above doesn't already answer; the institution and
   learner questions are on their own pages */
const OVERVIEW_FAQ = [
  {
    q: 'Who can join Red Club?',
    a: 'Students, developers, professionals, founders and institutions interested in blockchain, Web3 and the digital economy.',
  },
  {
    q: 'Do I need prior blockchain experience?',
    a: 'No. Red Club has pathways for newcomers and for experienced builders.',
  },
]

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
        lede="Red Club is IBA's skills and innovation network. It connects universities, educators and learners to hands-on blockchain, tokenization and AI, through industry projects, applied research and international pathways."
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

      <Section id="rc-paths" eyebrow="Know more" title="Two ways into Red Club">
        <Cards cols={2} items={DOORS} />
      </Section>

      <Section
        id="rc-experience"
        eyebrow="The Red Club journey"
        title="Knowledge is the starting point. Capability is the outcome."
      >
        <Cards cols={4} items={EXPERIENCE} />
      </Section>

      <Section
        id="rc-community"
        tone="red"
        eyebrow="A network. A shared ambition."
        title="Be part of the community building the future of Web3."
        lede="Red Club is part of the India Blockchain Alliance, alongside its work in education, industry collaboration and Web3 adoption."
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
