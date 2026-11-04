/**
 * IBA Red Club for students (/red-club/students) — the "Know more" page
 * behind the overview's students door: the student advantage, what members
 * get, the member journey and the wider student ecosystem. Copy in
 * redClubContent.js.
 */

import { PageHero, Section, Cards, Btn } from '../../components/Kit'
import { Go, Steps, Faq } from '../../sections/service/ServiceBlocks'
import { LEARNER, STUDENT_BENEFITS, MEMBER_JOURNEY, STUDENT_ECOSYSTEM, WHO, FAQ } from './redClubContent'

const Arrow = () => <span aria-hidden="true">→</span>

const JUMP = [
  ['/red-club', '← Red Club'],
  ['#rc-advantage', 'Advantage'],
  ['#rc-what-you-get', 'What You Get'],
  ['#rc-journey', 'Your Journey'],
  ['#rc-ecosystem', 'Credentials & Tools'],
  ['/red-club/institutions', 'For Institutions →'],
]

const STUDENT_FAQ = FAQ.filter((f) =>
  ['Do I need prior blockchain experience?', 'Are internships and placements guaranteed?', 'What can members gain?'].includes(f.q)
)

/* the "Who it's for" card for students and emerging talent, with its list */
const STUDENT_GETS = WHO.filter((w) => w.title === 'Students & emerging talent').concat(
  WHO.filter((w) => w.title === 'Developers & technologists')
)

export default function RedClubStudents() {
  return (
    <div>
      <PageHero
        id="red-club-students"
        aside={
          <div className="rc-hero-art" aria-hidden="true">
            <img src="/images/ac-students.jpg" alt="" decoding="async" fetchpriority="high" />
          </div>
        }
        eyebrow="IBA Red Club · For Students"
        title="Students build the future."
        lede="From classroom knowledge to industry-ready capability: a structured combination of learning, applied projects, mentoring, career support and international exposure."
        actions={
          <>
            <Btn enquiry={LEARNER}>
              Enquire About Membership <Arrow />
            </Btn>
            <Btn href="#rc-advantage" variant="ghost">
              Discover Student Opportunities
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
        id="rc-advantage"
        eyebrow="Student advantage"
        title="From classroom knowledge to industry-ready capability"
        lede="Students can engage with a structured combination of learning, applied projects, mentoring, career support and international exposure."
      >
        <Cards cols={4} items={STUDENT_BENEFITS} />
      </Section>

      <Section
        id="rc-what-you-get"
        tone="dark"
        eyebrow="Who it's for"
        title="For curious minds and builders"
        lede="Whether you're exploring Web3 or already building, Red Club is a place to learn, contribute and grow."
      >
        <Cards cols={2} items={STUDENT_GETS} />
      </Section>

      <Section
        id="rc-journey"
        eyebrow="Your journey"
        title="A simple path from interest to impact."
        lede="Make the most of the community through an active, progressive member journey."
      >
        <Steps items={MEMBER_JOURNEY} />
      </Section>

      <Section id="rc-ecosystem" eyebrow="Extended student ecosystem" title="Digital credentials, communities and career tools">
        <Cards cols={3} items={STUDENT_ECOSYSTEM} />
      </Section>

      <Section id="rc-faq" eyebrow="Frequently asked" title="Good to know.">
        <Faq items={STUDENT_FAQ} />
      </Section>

      <Section
        id="rc-join"
        tone="red"
        eyebrow="Your next chapter starts here"
        title="Don't just watch the future take shape. Help build it."
        lede="Join a community of learners, thinkers and builders working towards a more capable, connected Web3 ecosystem."
      >
        <div className="pk-actions" data-rise>
          <Btn enquiry={LEARNER}>
            Enquire About Membership <Arrow />
          </Btn>
          <Btn href="/red-club/institutions" variant="ghost">
            Bring Red Club to Your Institution
          </Btn>
        </div>
      </Section>
    </div>
  )
}
