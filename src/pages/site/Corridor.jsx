/** Web3 Corridor — the Global Innovation Corridor Initiative. */

import { PageHero, Section, Cards, Stats, Prose, SubHead, Form, Btn } from '../../components/Kit'
import { REGIONS_LINE } from '../../data/facts'

/* The hero graphic: the supplied map artwork, a glowing red dotted world
   with the five regions pinned (public/images/corridor-hero-map.jpg), on a
   plain black hero. Earlier versions are kept as alternatives: the drawn
   dotted map (components/WorldMap.jsx), the tunnel (CorridorTunnel.jsx) and
   the drawn globe with routes (CorridorHolo.jsx). */
const HeroMap = () => (
  <figure className="cx-map">
    <img
      src="/images/corridor-hero-map.jpg"
      alt="World map with the corridor's regions pinned: the Americas, Europe, Africa, the UAE and India"
      width="1832"
      height="859"
      decoding="async"
    />
  </figure>
)

const OBJECTIVES = [
  { num: '01', title: 'Build', text: 'A sustainable innovation corridor connecting nations with global technology, investment and innovation ecosystems.' },
  { num: '02', title: 'Facilitate', text: 'Technology transfer, knowledge exchange and capacity building in emerging technologies.' },
  { num: '03', title: 'Create Pathways', text: 'For startups, SMEs, innovation hubs, women entrepreneurs and young innovators to access markets and funding.' },
]

/* the core dimensions, each with a line icon in place of a number (by
   request): screen, block, hub, rocket, women, learning */
const PILLARS = [
  { icon: <><rect x="3" y="4" width="18" height="12" /><path d="M8 20h8M12 16v4M7 10l3-3 3 3 4-4" /></>, title: 'Web3 Technologies and Digital Transformation', focus: 'Web3 technology literacy, adoption, digital skills development and Web3-powered solutions.', outcome: 'Workforce readiness, increased digital competitiveness and accelerated transformation.' },
  { icon: <><path d="m12 2 8 4.5v9L12 20l-8-4.5v-9Z" /><path d="m4 6.5 8 4.5 8-4.5M12 11v9" /></>, title: 'Blockchain, Web3 and Tokenization', focus: 'Digital identity, tokenization, smart contracts, Web3 innovation and decentralized technologies.', outcome: 'Technology adoption, innovation acceleration and cross-border collaboration.' },
  { icon: <><path d="M3 21V9l9-6 9 6v12" /><path d="M9 21v-6h6v6M3 21h18" /></>, title: 'Hubs and Co-Working Ecosystems', focus: 'Hub development, startup incubation, innovation exchange and collaborative workspaces.', outcome: 'Stronger innovation infrastructure, regional collaboration and entrepreneurial growth.' },
  { icon: <><path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2" /><path d="M9 15l-3-3c1-4 4-8 11-9 0 7-5 10-9 11Z" /><circle cx="14" cy="8" r="1.5" /></>, title: 'Startup Development and Investment', focus: 'Startup acceleration, venture development, investor readiness and market access.', outcome: 'More funding opportunities, stronger scaling pathways and international partnerships for high-potential startups.' },
  { icon: <><circle cx="12" cy="8" r="4" /><path d="M12 12v9M8.5 17.5h7" /></>, title: 'Girls and Women in Emerging Technologies', focus: 'Leadership development, skills training, entrepreneurship and mentorship for girls and women.', outcome: 'Greater participation, inclusion and women-led innovation across technology sectors.' },
  { icon: <><path d="M2 9.5 12 5l10 4.5L12 14Z" /><path d="M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5M22 9.5V15" /></>, title: 'Knowledge, Research and Capacity Building', focus: 'Certifications, training, research collaboration and academic partnerships.', outcome: 'Industry-ready talent, deeper knowledge exchange and sustainable capacity building.' },
]

const PROGRAMMES = [
  { title: 'Tech4Good', href: '/initiatives#init-tech4good', cta: 'Explore' },
  { title: 'Blockchain Council', href: '/ecosystem#communities', cta: 'Explore' },
  { title: 'Emerging Tech Council', href: '/ecosystem#communities', cta: 'Explore' },
  { title: 'Green Chain Protocol', href: '/initiatives#init-green-chain', cta: 'Explore' },
  { title: 'Verifyble', href: '/initiatives#init-verifyble', cta: 'Explore' },
  { title: 'Red Club', href: '/red-club', cta: 'Explore' },
]

const STRANDS = [
  { title: 'Tokenization Networks', text: 'Connecting tokenization innovation hubs and co-working ecosystems globally.' },
  { title: 'Ecosystem Connections', text: 'Connecting innovators, investors, governments, academia, startups and technology leaders.' },
  { title: 'Adoption & Inclusion', text: 'Supporting innovation, financial inclusion, digital trust and emerging technology adoption.' },
  { title: 'Women’s Initiatives', text: 'Advancing women and girls in AI, blockchain, Web3, entrepreneurship and innovation.' },
]

const AUDIENCES = [
  { title: 'Startups & Projects', text: 'Market entry, regulatory clarity, capital introductions.' },
  { title: 'Investors & Funds', text: 'Startup and investor engagement across the corridor regions.' },
  { title: 'Governments & Regulators', text: 'Peer engagement and shared standards work.' },
  { title: 'Institutions', text: 'Learner pathways, joint research and faculty exchange.' },
  { title: 'Corporates', text: 'Supply chain, payments and trade finance pilots across the corridor.' },
]

const COUNTRIES = [
  { tag: 'The Activation Hub', title: 'UAE · Dubai', text: 'The strategic global gateway for innovation: investment and collaboration platform, partnership facilitator, startup and investor engagement centre, and corridor activation venue. TheBlock serves as the physical and relational platform for corridor activation.' },
  { tag: 'Strategic Advisory Lead', title: 'India', text: 'India Blockchain Alliance is the leading strategic advisory partner: global Web3 services connector, knowledge-sharing partner, membership and services facilitator, and international collaboration enabler for technology transfer, startup development and ecosystem collaboration.' },
  { tag: 'The Talent Hub', title: 'Africa', text: 'Talent hub for ecosystem partners: ecosystem coordinator, programme delivery, innovation hub facilitator and capacity-building coordinator.' },
  { tag: 'The Launch Stage', title: 'Spain · Barcelona', text: 'Home of the Global Innovation Corridor Forum, launching at WTC 2026 in November, where the corridor is launched, partners are introduced and the implementation roadmap is established.' },
]

export default function Corridor() {
  return (
    <div>
      <PageHero
        id="corridor"
        aside={<HeroMap />}
        eyebrow="IBA Web3 Corridor"
        title="Global Innovation Corridor Initiative"
        lede={`Connecting ${REGIONS_LINE} through innovation, technology, investment and partnerships.`}
        actions={
          <>
            <Btn href="#join-corridor">
              Join the Corridor <span aria-hidden="true">→</span>
            </Btn>
            <Btn href="#country-corridors" variant="ghost">
              See the Country Corridors
            </Btn>
          </>
        }
      />

      <Section
        id="corridor-overview"
        eyebrow="A Broader Corridor for Shared Growth"
        title="From a Web3 & AI Corridor to a Global Innovation Platform"
        lede={`The initiative expands across borders into a global innovation platform connecting ${REGIONS_LINE}. It is designed to accelerate technology transfer, investment, entrepreneurship and ecosystem collaboration across regions.`}
      >
        <SubHead lede="The concept was initiated by Raj Kapoor of the India Blockchain Alliance, stemming from several cross-border sessions and summits on emerging technologies and global collaboration. One message came through everywhere: the need to explore practical implementation pathways and expand the vision into a broader corridor model.">
          Origin Story: From India to a Global Corridor
        </SubHead>
      </Section>

      <Section id="corridor-rationale" tone="dark" eyebrow="Why the Corridor Matters" title="Stronger Cross-Border Collaboration">
        <div className="pk-split">
          <Prose paras={['The initiative responds to the need for stronger cross-border collaboration in emerging technologies, startup growth and digital transformation. It aims to unlock opportunities across regions that together represent a population of more than 2.8 billion people.']} />
          <Stats items={[{ value: '2.8B+', count: 2.8, suffix: 'B+', label: 'People across the corridor regions' }]} />
        </div>
      </Section>

      <Section
        id="corridor-vision"
        eyebrow="Vision"
        title="A Globally Connected Innovation Ecosystem"
        lede="A globally connected innovation ecosystem that accelerates technology transfer, investment, entrepreneurship, talent development and inclusive participation in emerging technologies across India and global partner regions."
      >
        <SubHead>Core Objectives</SubHead>
        <Cards items={OBJECTIVES} cols={3} />
      </Section>

      <Section id="how-corridors-work" tone="red" eyebrow="How Corridors Work" title="Core Dimensions of the Corridor">
        <Cards items={PILLARS} cols={3} />
      </Section>

      <Section id="corridor-initiatives" eyebrow="Flagship Initiatives" title="Programmes That Bring the Corridor to Life">
        <Cards items={PROGRAMMES} cols={3} />
        <Cards items={STRANDS} cols={4} />
      </Section>

      <Section
        id="corridor-forum" tone="dark"
        eyebrow="Forum Announcement"
        title="Global Innovation Corridor Forum"
        lede="Launching at WTC 2026 · November · Barcelona"
      >
        <div className="pk-split">
          <div className="pk-init">
            <Prose paras={['IBA will launch the Corridor at the World Token Congress and introduce strategic partners, connect investors and innovators, promote technology transfer, facilitate startup partnerships and establish the implementation roadmap.']} />
            <div className="pk-actions" data-rise>
              <Btn enquiry="Web3 Corridor">
                Participate in WTC 2026 <span aria-hidden="true">→</span>
              </Btn>
            </div>
          </div>
          <Stats items={[{ value: 'Nov 2026', label: 'Barcelona, Spain' }]} />
        </div>
      </Section>

      <Section id="corridor-impact" tone="red" eyebrow="From Vision to Execution" title="Expected Impact and Going Forward">
        <Cards
          cols={2}
          items={[
            {
              title: 'Expected Impact',
              list: ['Technology transfer', 'Startup growth', 'Investment mobilization', 'Innovation hub development', 'Skills development', 'Women’s participation in technology', 'Cross-border collaboration'],
            },
            {
              title: 'Immediate Next Steps',
              list: ['Finalize the partnership agreement', 'Establish a joint working group', 'Define participation structures', 'Develop the roadmap', 'Engage partners', 'Plan global activation', 'Launch pilot initiatives'],
            },
          ]}
        />
      </Section>

      <Section id="join-corridor" eyebrow="Join the Corridor" title="Who the Corridor Is For">
        <div className="pk-split">
          <Cards items={AUDIENCES} cols={1} />
          <Form
            subject="Corridor application"
            submit="Apply to Join a Corridor"
            consent="I agree to be contacted about my enquiry."
            fields={[
              { name: 'name', label: 'Name' },
              { name: 'org', label: 'Organisation' },
              { name: 'email', label: 'Work email', type: 'email' },
              { name: 'country', label: 'Country' },
              { name: 'region', label: 'Region', type: 'select', options: ['Africa', 'India', 'UAE', 'Europe / Spain', 'Americas', 'Proposing a new corridor'] },
              { name: 'role', label: 'I am a', type: 'select', options: ['Startup / Project', 'Investor / Fund', 'Government / Regulator', 'Institution', 'Corporate'] },
              { name: 'looking', label: "What you're looking for", type: 'textarea' },
            ]}
          />
        </div>
      </Section>

      <Section
        id="country-corridors" tone="dark"
        eyebrow="The Partnership Architecture"
        title="Country Corridors"
        lede="The initial focus is established with the UAE as the hub, with ecosystem partner countries incorporated through strategic partnerships as the corridor expands. The corridor is anchored by collaboration with the UAE, India and Europe as key international ecosystem partners, supporting global connectivity, knowledge exchange, market access and capital flow."
      >
        <Cards items={COUNTRIES} cols={4} />
      </Section>
    </div>
  )
}
