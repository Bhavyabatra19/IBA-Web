/**
 * IBA Red Club — the community and the Experience Centers, from the client's
 * two reference pages (11-04-2026): "IBA Red Club · Web3 Corridor" (the
 * institution and student programme, from the IBA Red Club 2026 prospectus)
 * and "Red Club smart webpage" (the community and membership journey). The
 * copy is theirs; the layout is the site's own blocks, so the page keeps the
 * site's type, colours and theme.
 *
 * Order: who Red Club is for and how to take part, then what it gives
 * institutions and students, then how an Experience Center runs, then the
 * questions and the ask.
 */

import { PageHero, Section, SubHead, Cards, Bullets, Prose, Btn } from '../../components/Kit'
import { Go, Steps, Groups, Faq } from '../../sections/service/ServiceBlocks'
import EzStairs from '../../components/EzStairs'

const LEARNER = 'Red Club (learner)'
const INSTITUTION = 'Red Club / Verifyble (institution)'

const JUMP = [
  ['#rc-about', 'About'],
  ['#rc-experience', 'The Experience'],
  ['#rc-who', "Who It's For"],
  ['#rc-institutions', 'Institutions'],
  ['#rc-students', 'Students'],
  ['#rc-centers', 'Experience Centers'],
  ['#rc-membership', 'Membership'],
  ['#rc-operating-model', 'How It Works'],
  ['#rc-faq', 'FAQ'],
]

const HIGHLIGHTS = [
  { title: 'Industry + Academia', text: 'Collaborative learning ecosystem' },
  { title: 'Blockchain · AI', text: 'Frontier technology capabilities' },
  { title: 'Real-World Projects', text: 'Applied, practical experience' },
  { title: 'Global Pathways', text: 'Cross-border learning and networking' },
]

const PROPOSITION = [
  { num: '01 / Advance', title: 'Strengthen institutional capability', text: 'Build emerging-technology research, training and industry engagement capacity on campus.' },
  { num: '02 / Activate', title: 'Translate learning into practice', text: 'Bring curricula, labs, industry problem statements, capstones and live projects together.' },
  { num: '03 / Connect', title: 'Open international pathways', text: 'Facilitate overseas academic collaboration, global mentoring, joint sessions and professional networks.' },
]

const EXPERIENCE = [
  { num: '01 — Learn', title: 'Build knowledge', text: 'Understand blockchain, Web3, digital assets and tokenisation through accessible learning and industry-led programmes.' },
  { num: '02 — Experience', title: 'Learn by doing', text: 'Engage with practical challenges, live projects and experience-centre initiatives that connect concepts to real applications.' },
  { num: '03 — Connect', title: 'Find your people', text: 'Build relationships with peers, mentors, practitioners, founders and organisations across the IBA ecosystem.' },
  { num: '04 — Build', title: 'Turn ideas into action', text: 'Explore use cases, collaborate on solutions and develop the confidence to contribute to Web3 projects.' },
  { num: '05 — Grow', title: 'Access opportunities', text: 'Discover pathways to mentorship, events, industry exposure, collaboration and professional development.' },
  { num: '06 — Lead', title: 'Shape what comes next', text: 'Progress from learner to contributor, builder and community leader in a fast-evolving digital economy.' },
]

const WHO = [
  {
    title: 'Students & emerging talent',
    text: 'For curious minds ready to develop future-facing skills and discover career pathways.',
    list: ['Foundational and applied Web3 learning', 'Mentorship and peer community', 'Exposure to industry use cases and projects'],
  },
  {
    title: 'Developers & technologists',
    text: 'For builders looking to deepen their expertise and connect with real-world challenges.',
    list: ['Technical knowledge and ecosystem engagement', 'Collaboration with practitioners', 'Opportunities to showcase work and ideas'],
  },
  {
    title: 'Founders & entrepreneurs',
    text: 'For people turning ideas into ventures, products and practical solutions.',
    list: ['Founder and operator connections', 'Mentor and advisor access pathways', 'Visibility across a wider Web3 network'],
  },
  {
    title: 'Professionals & organisations',
    text: 'For individuals and teams building capability and exploring blockchain adoption.',
    list: ['Industry insights and capacity building', 'Cross-sector networking and collaboration', 'Access to relevant IBA initiatives and programmes'],
  },
]

const MEMBER_JOURNEY = [
  { n: 'Step 01', name: 'Join the community', body: 'Choose the membership pathway that reflects your goals and interests.' },
  { n: 'Step 02', name: 'Explore & learn', body: 'Access learning opportunities, events, resources and community conversations.' },
  { n: 'Step 03', name: 'Participate & build', body: 'Engage with peers, mentors, projects and the wider IBA ecosystem.' },
  { n: 'Step 04', name: 'Grow your impact', body: 'Build your capabilities, network and contribution to the Web3 economy.' },
]

const INSTITUTION_BENEFITS = [
  { title: 'World-class partnerships', text: 'Access industry-academia relationships and emerging-tech collaborations.' },
  { title: 'Low-cost models', text: 'Explore institution-friendly participation structures; commercial terms require confirmation.' },
  { title: 'Curriculum customization', text: 'Bespoke modules aligned with institutional curricula and industry skill needs.' },
  { title: 'Joint research & consulting', text: 'Collaborate on problem statements, research assignments and consultancy work.' },
  { title: 'Joint certifications', text: 'Explore professional certification and joint credential opportunities.' },
  { title: 'International participation', text: 'Engage in global events, overseas academic sessions and networking.' },
  { title: 'Blockchain-enabled university', text: 'Explore blockchain credentialing and digitally verifiable achievements.' },
  { title: 'Campus placement support', text: 'Connect student readiness with internships, career assistance and placement recommendations.' },
]

const STUDENT_BENEFITS = [
  { num: 'Learn', title: 'World-class programmes', text: 'Technical and non-technical blockchain training, integrated modules, diploma pathways and professional certifications.' },
  { num: 'Build', title: 'Live projects', text: 'Industry cases, capstones, problem statements and hands-on project opportunities.' },
  { num: 'Experience', title: 'Internships', text: 'Virtual and on-site opportunities, including domestic and international pathways.' },
  { num: 'Explore', title: 'International pathways', text: 'Overseas joint sessions and opportunities to connect with global academic and industry communities.' },
  { num: 'Research', title: 'Research & consulting', text: 'Participate in emerging-technology research and collaborative industry assignments.' },
  { num: 'Connect', title: 'Expert mentorship', text: 'Domestic and international mentors supporting academic, startup and project development.' },
  { num: 'Prepare', title: 'Career assistance', text: 'CV development, question banks, interview preparation and internship or placement assistance.' },
  { num: 'Grow', title: 'Industry-ready profile', text: 'Develop practical skills, project portfolios and verifiable learning achievements.' },
]

const CONNECTED_JOURNEY = [
  { n: '01', name: 'Institution joins', body: 'Establish Red Club participation and objectives.' },
  { n: '02', name: 'Campus activates', body: 'Coordinate faculty, infrastructure and programmes.' },
  { n: '03', name: 'Students learn', body: 'Expert-led modules, certifications and lab exploration.' },
  { n: '04', name: 'Students build', body: 'Projects, research, hackathons and internships.' },
  { n: '05', name: 'Talent connects', body: 'Mentoring, career support and global pathways.' },
]

const CENTERS = [
  { title: 'Training', text: 'Certified technical and non-technical learning programmes across blockchain concepts.' },
  { title: 'Projects', text: 'Live assignments for enrolled certification students and collaborative problem solving.' },
  { title: 'Research', text: 'Blockchain-related research, consulting and academic-industry projects.' },
  { title: 'Placements', text: 'Domestic and international placement recommendations and assistance.' },
]

const AGENDA = [
  'Bespoke training aligned to curriculum and industry',
  'Industry-specific problem statements and collaborative research',
  'Emerging-technology partnerships',
  'Industry trends, insights and best practices',
  'Startup accelerators and entrepreneurship programmes',
]

const PROGRAMMES = [
  { title: 'Programme formats', text: 'Customized modules, integrated courses, professional emerging-tech certifications and diploma programmes.' },
  { title: 'Learning methodology', text: 'Contextual content, expert-led sessions, periodic assessments, blockchain certifications and career assistance.' },
  { title: 'Applied impact', text: 'Live online sessions, industry case studies, capstone projects, hands-on practice and current skillsets.' },
]

const STUDENT_ECOSYSTEM = [
  { title: 'IBA Student Clubs', text: 'Access to labs and sandbox environments for experimentation with tokenization, blockchain and AI.' },
  { title: 'Credentialing services', text: 'Blockchain-enabled wallets, portfolios, badges and microcredentials, including GreenCredentials and verifiable credentials for education and employment checks.' },
  { title: 'Social & professional networks', text: 'Verified networking, learner communities, content sharing and employability connections.' },
  { title: 'Immersive learning support', text: 'Web3-enabled courses, virtual experiences and gamified emerging-technology environments.' },
  { title: 'AI-powered career preparation', text: 'Mock interviews, multilingual practice, automated résumé feedback and soft-skills development.' },
  { title: 'Flexible skill building', text: 'Project-based learning, self-paced academic modules and portable, privacy-respecting credentials.' },
]

const MEMBERSHIP_SCOPE = [
  {
    name: 'Experience Center inclusions: core support',
    items: [
      'Starter-pack awareness webinars',
      'Open-source software',
      'Mentorship and design/layout support',
      'Assistance with consulting and research projects',
      'Domestic and international internship assistance',
      'Live projects and placement assistance',
      'Platform for institution-issued blockchain credentials',
    ],
  },
  {
    name: 'Separately charged / excluded: items to scope independently',
    items: [
      'Red Club membership fees and paid IBA membership services',
      'Paid software where required',
      'Online and on-site courses',
      'Certification and blockchain credentialing fees',
      'Guest lectures and faculty training / train-the-trainer programmes',
    ],
  },
]

const LABS = [
  { title: 'Blockchain & tokenization', text: 'Curriculum co-creation, advanced blockchain node setup, tokenization experience lab and external-accreditation certification options.' },
  { title: 'Innovation & incubation', text: 'Hackathon support, startup incubation, ideathons, showcases and Web3 experiences within a Centre of Excellence plan.' },
  { title: 'AI & advanced infrastructure', text: 'AI project lab, LLM integration, private ChatGPT lab and on-premise GPU-node-as-a-service options.' },
]

const OPERATING_MODEL = [
  {
    name: 'IBA contributes',
    items: [
      'Courses and curriculum integrations',
      'Hands-on projects and industry problem statements',
      'Internship and placement assistance',
      'Industry–academia connections',
      'Joint research opportunities',
      'Mentoring and career guidance',
      'Executive programme curation',
    ],
  },
  {
    name: 'The institution contributes',
    items: [
      'Space and logistics for the Experience Center',
      'Equipment, internet connectivity and cloud storage',
      'Promotion of programmes among students',
      'Faculty for on-site training as mutually convenient',
      'Support for college fests and hackathons',
      'Maintenance of trained faculty for IBA lab technology',
    ],
  },
]

const SUSTAINABILITY = [
  { title: 'Corporate training', text: 'Offer industry-oriented training programmes to corporate audiences.' },
  { title: 'Consulting projects', text: 'Develop consulting services and joint assignments that create value for industry partners.' },
  { title: 'International networking', text: 'Participate in speaking events, professional networks and international projects that can strengthen institutional reach.' },
]

const FAQ = [
  { q: 'Who can join Red Club?', a: "Red Club is designed for students, developers, professionals, founders, entrepreneurs and organisations interested in blockchain, Web3 and the digital economy. Final eligibility and membership categories should be confirmed against the programme's current terms." },
  { q: 'Do I need prior blockchain experience?', a: 'No prior experience is assumed. The programme can welcome newcomers as well as experienced builders through appropriate learning and engagement pathways.' },
  { q: 'What can members gain?', a: 'Depending on the membership tier and programme calendar, members may benefit from learning, mentorship, industry exposure, networking, events, practical projects and ecosystem opportunities.' },
  { q: 'Is Red Club only for students?', a: 'No. Red Club runs an institution-led Experience Center model that benefits students, faculty and the wider industry–academia ecosystem.' },
  { q: 'Are internships and placements guaranteed?', a: 'No. Red Club offers internship opportunities, recommendations and placement assistance, not guaranteed placements or employment outcomes.' },
  { q: 'Are all labs and certifications included in membership?', a: 'No. Several courses, certification fees, credentialing fees and advanced lab capabilities are excluded or optional. The exact scope should be confirmed in an institutional agreement.' },
  { q: 'How does the Red Club connect to the Web3 Corridor?', a: 'Red Club sits within the IBA Web3 Corridor, with an emphasis on international learning, overseas academic collaboration, industry networking and cross-border pathways.' },
  { q: 'How is Red Club connected to IBA?', a: "Red Club is part of the India Blockchain Alliance ecosystem, complementing IBA's wider work in education, capacity building, industry collaboration and Web3 adoption." },
]

const Arrow = () => <span aria-hidden="true">→</span>

export default function RedClub() {
  return (
    <div>
      <PageHero
        id="red-club"
        aside={<EzStairs />}
        eyebrow="India Blockchain Alliance · Web3 Corridor"
        title={
          <>
            Where institutions lead.
            <br />
            Students build the future.
          </>
        }
        lede="The IBA Red Club Experience Centers connect universities, educators and students to practical blockchain, tokenization and AI learning, powered by industry collaboration, applied research and international pathways."
        actions={
          <>
            <Btn href="#rc-institutions">
              Explore Institutional Benefits <Arrow />
            </Btn>
            <Btn href="#rc-students" variant="ghost">
              Discover Student Opportunities
            </Btn>
          </>
        }
      />

      {/* the page's own contents, as pills */}
      <nav className="pk-jump" aria-label="On this page">
        {JUMP.map(([href, label]) => (
          <Go className="pk-jump__link" href={href} key={href}>
            {label}
          </Go>
        ))}
      </nav>

      {/* ── The community ─────────────────────────────────────────── */}

      <Section
        id="rc-about"
        eyebrow="About Red Club"
        title="Where the next wave of Web3 talent comes together."
        lede="Red Club is a learning, collaboration and opportunity network within the India Blockchain Alliance ecosystem: a community for curious minds, ambitious builders and the people shaping what comes next in blockchain, tokenisation and the digital economy."
      >
        <Prose
          paras={[
            'More than a community, Red Club is a launchpad for students, developers, professionals, founders and entrepreneurs who want to understand the Web3 economy and take an active role in building it.',
            'Through knowledge-sharing, industry engagement, mentorship, live projects and ecosystem access, members can develop the skills, relationships and confidence to participate in the next generation of digital innovation.',
          ]}
        />
        <Cards cols={4} items={HIGHLIGHTS} />
        <SubHead lede="India Blockchain Alliance promotes Web3 technologies, with emphasis on blockchain, tokenization, AI, policy and education. The Red Club is its institution-facing skills and innovation initiative within the IBA Web3 Corridor, developed with global industry organizations and partners.">
          Connecting academic excellence to the global Web3 economy
        </SubHead>
        <Cards cols={3} items={PROPOSITION} />
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
        <Cards cols={4} items={WHO} />
        <SubHead lede="Make the most of the community through an active, progressive member journey.">
          A simple path from interest to impact.
        </SubHead>
        <Steps items={MEMBER_JOURNEY} />
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

      {/* ── Institutions and students ─────────────────────────────── */}

      <Section
        id="rc-institutions"
        tone="dark"
        eyebrow="Institutional advantage"
        title="More than a campus club. An institutional growth platform."
        lede="The Red Club model is designed to position participating institutions as emerging-technology enablers, connect academic programmes with industry requirements and support meaningful student outcomes."
      >
        <Cards cols={4} items={INSTITUTION_BENEFITS} />
        <SubHead lede="Leadership in emerging-tech innovation, credible industry research papers, opportunities for joint technology patents, technology entrepreneurship programmes, consulting engagements and international pathways.">
          Institutional outcomes
        </SubHead>
      </Section>

      <Section
        id="rc-students"
        eyebrow="Student advantage"
        title="From classroom knowledge to industry-ready capability"
        lede="Students can engage with a structured combination of learning, applied projects, mentoring, career support and international exposure."
      >
        <Cards cols={4} items={STUDENT_BENEFITS} />
      </Section>

      <Section
        id="rc-journey"
        eyebrow="The institution-to-student connection"
        title="One connected journey. Shared outcomes."
        lede="As an institution builds its Red Club capabilities, students gain access to a more practical and connected learning environment."
      >
        <Steps items={CONNECTED_JOURNEY} />
      </Section>

      {/* ── The Experience Centers ────────────────────────────────── */}

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

      <Section id="rc-student-ecosystem" eyebrow="Extended student ecosystem" title="Digital credentials, communities and career tools">
        <Cards cols={3} items={STUDENT_ECOSYSTEM} />
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
        <SubHead lede="IBA supplies programme, project and ecosystem capabilities; the institution enables campus infrastructure, faculty engagement and student participation. Together, they can create a sustained bridge from academic learning to industry practice.">
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

      {/* ── Questions and the ask ─────────────────────────────────── */}

      <Section id="rc-faq" eyebrow="Frequently asked" title="Understand the Red Club model">
        <Faq items={FAQ} />
      </Section>

      <Section
        id="rc-join"
        tone="red"
        eyebrow="Your next chapter starts here"
        title="Don't just watch the future take shape. Help build it."
        lede={[
          'Join a community of learners, thinkers and builders working towards a more capable, connected Web3 ecosystem.',
          'Bring the IBA Red Club to your institution: explore an Experience Center, tailor emerging-technology programmes and connect your students to a broader industry and global learning ecosystem.',
        ]}
      >
        <div className="pk-actions" data-rise>
          <Btn enquiry={LEARNER}>
            Enquire About Membership <Arrow />
          </Btn>
          <Btn enquiry={INSTITUTION} variant="ghost">
            Enquire About Partnership
          </Btn>
        </div>
      </Section>
    </div>
  )
}
