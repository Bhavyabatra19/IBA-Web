/**
 * Web3 Corridor — after the client's design (IBA Site Review, 11-02-2026,
 * 07:30 PM): Bridging Global Regions, the network, corridor partners, three
 * core objectives, focus pillars, what the corridor opens, services, the
 * forum and membership. The hero image is kept as it was (by request).
 *
 * ⚠ The design was captured mid-animation, so a few items were hidden. Those
 * are filled as noted below (marked "to confirm") and need IBA's sign-off.
 */

import { PageHero, Section, Cards, Stats, Btn } from '../../components/Kit'
import CorridorNetwork from '../../components/CorridorNetwork'

/* the hero graphic: the client's Web3 Corridor logo, cut out of its own
   ground (public/images/web3-corridor-logo.webp; styles .w3l) */
const HeroMap = () => (
  <div className="w3l">
    <img
      className="w3l__img"
      src="/images/web3-corridor-logo.webp"
      alt="Web3 Corridor"
      width="784"
      height="896"
      decoding="async"
      fetchpriority="high"
    />
  </div>
)

const NETWORK = [
  { icon: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z" /></>, title: 'Global Connection', text: 'Join through one country and reach every partner in the corridor.' },
  { icon: <><ellipse cx="12" cy="6" rx="7" ry="3" /><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" /></>, title: 'Asset Pooling', text: 'Pool capital and real-world assets across borders through tokenization.' },
  { icon: <><path d="M3 17 9 11l4 4 8-8" /><path d="M15 7h6v6" /></>, title: 'Capital & Investment', text: 'Vetted deal flow for investors, and funding paths for founders.' },
  { icon: <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" />, title: 'Technology Transfer', text: 'India’s developer depth, shared with every market in the corridor.' },
]

const FIGURES = [
  { value: '2.8B+', label: 'People across the corridor' },
  { value: '4', label: 'Partner regions, the Americas next' },
  { value: '1,250+', label: 'Active Web3 ventures in India' },
  { value: '$1T', label: 'Opportunity the corridor maps' },
]

/* simple flags, drawn */
const FLAGS = {
  india: (
    <svg viewBox="0 0 36 24">
      <rect width="36" height="8" fill="#ff9933" />
      <rect y="8" width="36" height="8" fill="#ffffff" />
      <rect y="16" width="36" height="8" fill="#138808" />
      <circle cx="18" cy="12" r="3" fill="none" stroke="#000080" strokeWidth="0.8" />
    </svg>
  ),
  uae: (
    <svg viewBox="0 0 36 24">
      <rect width="36" height="8" fill="#00732f" />
      <rect y="8" width="36" height="8" fill="#ffffff" />
      <rect y="16" width="36" height="8" fill="#000000" />
      <rect width="9" height="24" fill="#ff0000" />
    </svg>
  ),
  spain: (
    <svg viewBox="0 0 36 24">
      <rect width="36" height="24" fill="#aa151b" />
      <rect y="6" width="36" height="12" fill="#f1bf00" />
    </svg>
  ),
  zambia: (
    <svg viewBox="0 0 36 24">
      <rect width="36" height="24" fill="#198a00" />
      <rect x="24" y="10" width="4" height="14" fill="#de2010" />
      <rect x="28" y="10" width="4" height="14" fill="#000000" />
      <rect x="32" y="10" width="4" height="14" fill="#ef7d00" />
      <path d="M27 5h6l-3 3Z" fill="#ef7d00" />
    </svg>
  ),
}

const PARTNERS = [
  { flag: 'india', role: 'Technical Engine & Implementation Hub', name: 'India', where: 'Home of IBA', text: 'One of the world’s largest blockchain developer pools and 1,250+ active Web3 ventures.' },
  { flag: 'uae', role: 'Financial Hub & Global Launchpad', name: 'United Arab Emirates', where: 'Dubai', text: 'Regulatory clarity, capital access and free-zone campuses incubating Web3 startups.' },
  { flag: 'spain', role: 'Governance & Mature Market Integration', name: 'Spain', where: 'Europe', text: 'Institutional compliance, standards and Europe’s lead on Web3 regulation.' },
  { flag: 'zambia', role: 'High-Growth Adoption & Real-World Utility', name: 'Zambia', where: 'Africa', text: 'Mobile-first innovation, unbanked growth and real-world DeFi, with fast-growing developer talent.' },
]

/* ⚠ to confirm: the design shows Connect and Transfer; the third card was
   hidden, so it carries the earlier third objective */
const OBJECTIVES = [
  { num: '01', title: 'Connect', text: 'A sustainable innovation corridor connecting nations with global technology, investment and innovation.' },
  { num: '02', title: 'Transfer', text: 'Technology transfer, knowledge exchange and capacity building in emerging technologies.' },
  { num: '03', title: 'Create Pathways', text: 'For startups, SMEs, innovation hubs, women entrepreneurs and young innovators to access markets and funding.' },
]

/* ⚠ to confirm: the lower row's titles were partly hidden in the design */
const FOCUS = [
  { title: 'Web3 Technologies & Digital Transformation', text: 'Literacy, adoption and digital skills.' },
  { title: 'Blockchain, Web3 & Tokenization', text: 'Digital identity, tokenization and smart contracts.' },
  { title: 'Hubs & Co-Working Ecosystems', text: 'Hub development, startup incubation and collaborative workspaces.' },
  { title: 'Startups & Investment', text: 'Acceleration, investor readiness and market access.' },
  { title: 'Women in Emerging Tech', text: 'Leadership, skills, entrepreneurship and mentorship.' },
  { title: 'Capacity Building', text: 'Certifications, training and academic partnerships.' },
]

const OPENS = [
  { num: '01', title: 'Web3 Resources', text: 'Templates, frameworks and learning on RWA, tokenomics and regulation.' },
  { num: '02', title: 'Partnerships', text: 'Investors, family offices, mentors and members in every partner country.' },
  { num: '03', title: 'Growth', text: 'Advisory, mentoring and investor readiness, from founder to fundable venture.' },
  { num: '04', title: 'Expansion', text: 'Business setup, go-to-market plans and visibility in new markets.' },
]

/* ⚠ to confirm: cards 02 and 03 were hidden in the design (only their last
   words show), and 01's text was partly hidden */
const SERVICES = [
  { num: '01', title: 'Tech Support', text: 'Technical support and development resources for corridor businesses.' },
  { num: '02', title: 'Compliance & KYC', text: 'Regulatory guidance and onboarding, including advanced KYC and KYB.' },
  { num: '03', title: 'Investor Access', text: 'Introductions to investors and funding across borders, plus expert mentor sessions.' },
  { num: '04', title: 'Global Visibility', text: 'Marketing, networking and forums that put you in front of global decision-makers and investors.' },
  { num: '05', title: 'Go-To-Market Plans', text: 'Blueprints to launch and scale in high-demand markets, with separate tokenization plans.' },
  { num: '06', title: 'Asset Pooling', text: 'Cross-border pooling of capital and tokenized real-world assets.' },
]

export default function Corridor() {
  return (
    <div className="w3p">
      <PageHero
        id="corridor"
        aside={<HeroMap />}
        eyebrow="IBA Web3 Corridor · A high-velocity initiative by India Blockchain Alliance"
        title={
          <>
            Bridging
            <br />
            Global Regions
          </>
        }
        lede="Mapping a trillion-dollar opportunity across India, the UAE, Africa and Europe, with the Americas next. One corridor for shared Web3 resources, capital, partnerships and markets, home to more than 2.8 billion people."
        actions={
          <>
            <Btn href="/memberships">
              Become a Member <span aria-hidden="true">→</span>
            </Btn>
            <Btn href="#country-corridors" variant="ghost">
              Meet the Corridor Partners
            </Btn>
          </>
        }
      />

      <Section
        id="how-corridors-work"
        tone="dark"
        eyebrow="The Network"
        title="A corridor for shared growth."
        lede="Connecting Africa, the UAE, India and Europe through innovation, technology, investment and partnerships, with IBA as the central catalyst."
      >
        {/* the network map, live: pulsing pins and light along the routes */}
        <CorridorNetwork />
        <Cards items={NETWORK} cols={4} />
        <Stats items={FIGURES} />
      </Section>

      <Section id="country-corridors" eyebrow="Corridor Partners" title="Four regions, one corridor">
        <ul className="w3p-partners">
          {PARTNERS.map((p) => (
            <li className="w3p-partner" key={p.name} data-rise>
              <span className="w3p-flag" aria-hidden="true">
                {FLAGS[p.flag]}
              </span>
              <p className="w3p-partner__role">{p.role}</p>
              <h3 className="w3p-partner__name">{p.name}</h3>
              <p className="w3p-partner__where">{p.where}</p>
              <p className="w3p-partner__text">{p.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="corridor-objectives" eyebrow="The Corridor Objectives" title="Three Core Objectives">
        <Cards items={OBJECTIVES} cols={3} />
      </Section>

      <Section id="focus-pillars" eyebrow="Focus Pillars" title="Where the Corridor Focuses">
        <Cards items={FOCUS} cols={3} />
      </Section>

      <Section
        id="corridor-opens"
        eyebrow="Build. Fund. Scale."
        title="What the Corridor Opens"
        lede="One infrastructure for cross-border tech and business: startups become founders, founders become fundable ventures, and ventures graduate into the Corridor Club."
      >
        <Cards items={OPENS} cols={4} />
      </Section>

      <Section
        id="corridor-services"
        eyebrow="Corridor Services"
        title="Services Across the Network"
        lede="Advanced support stacks that speed up tech and business outcomes for every corridor venture."
      >
        <Cards items={SERVICES} cols={3} />
      </Section>

      <Section
        id="corridor-forum"
        tone="red"
        eyebrow="Launch · WTC 2026 · November · Barcelona"
        title="Global Innovation Corridor Forum"
        lede="The corridor launches at the World Token Congress in Barcelona, where its partner countries, investors and innovators meet and set the roadmap."
      >
        <div className="pk-actions" data-rise>
          <Btn enquiry="Web3 Corridor">
            Participate in WTC 2026 <span aria-hidden="true">→</span>
          </Btn>
        </div>
      </Section>

      {/* ⚠ to confirm: the design's heading for this block was hidden */}
      <Section
        id="join-corridor"
        eyebrow="Membership · Web360 Club"
        title="Join the corridor through the Web360 Club"
        lede="Membership runs through the Web360 Club, and every stage is earned: Bronze for starters and early builders, Silver for multi-country growth, and Gold, invite-only, for global activations."
      >
        <div className="pk-actions" data-rise>
          <Btn href="/memberships#web360">
            See the Web360 Club Tiers <span aria-hidden="true">→</span>
          </Btn>
          <Btn enquiry="Web3 Corridor" variant="ghost">
            Get in Touch
          </Btn>
        </div>
      </Section>
    </div>
  )
}
