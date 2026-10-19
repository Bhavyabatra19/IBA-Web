/**
 * Experience Zone — programmes, the wallet, investor readiness, the AI tool,
 * the 90-day plan, and the member login.
 *
 * Red Club is IBA's only membership: paid and by invitation. The site's one
 * Member Login (nav bar, drawer, footer) lands on #login here.
 *
 * ⚠ ACCOUNTS ARE NOT LIVE. There is no auth backend, so the login form says
 * so on submit rather than pretending to open an account.
 */

import { PageHero, Section, Cards, Bullets, Form, Btn } from '../../components/Kit'
import { Go } from '../../sections/service/ServiceBlocks'
import { CONTACT, MEMBER_LOGIN } from '../../nav'

const ACCOUNTS_NOTE =
  'Member accounts are not live yet, so nothing has been sent. Email ' +
  CONTACT.email.label +
  ' and the IBA team will help you into your account.'
/* The hero graphic: the supplied artwork (public/images/rc-hero.jpg). The
   drawn alternative is components/RedClubHolo.jsx. */
const HeroImage = () => (
  <figure className="rc-hero-img">
    <img
      src="/images/rc-hero.jpg"
      alt="A graduation cap over a lit pedestal, linked to Experience Zone programmes, labs, projects and placements"
      width="1400"
      height="933"
      decoding="async"
    />
  </figure>
)

const JUMP = [
  ['#rc-about', 'About'],
  ['#rc-wallet', 'Wallet'],
  ['#rc-investor-ready', 'Investor Ready Programme'],
  ['#rc-ai-tool', 'AI Tool for Businesses'],
  ['#rc-plan', '30-60-90 Day Plan'],
]

export default function RedClub() {
  return (
    <div>
      <PageHero
        id="red-club"
        aside={<HeroImage />}
        eyebrow="IBA Experience Zone"
        title="Where Builders Get Ready"
        lede="Programmes, tools and a community that take learners, founders and businesses from learning to launching."
        actions={
          <>
            <Btn enquiry="Red Club (learner)">
              Join Experience Zone <span aria-hidden="true">→</span>
            </Btn>
            <Btn href="#login" variant="ghost">
              {MEMBER_LOGIN}
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

      <Section
        id="rc-about"
        eyebrow="About"
        title="The Talent and Venture Pipeline for Web3 and AI"
        lede="The IBA Experience Zone brings certified training, Blockchain and AI labs, live industry projects and placements together with the programmes and tools a founder needs to become investor-ready."
      >
        <Cards
          cols={3}
          items={[
            { num: '01', title: 'Learn', text: 'Certified programmes and on-campus labs in blockchain, Web3 and AI.' },
            { num: '02', title: 'Build', text: 'Live industry projects with mentors from across the alliance.' },
            { num: '03', title: 'Launch', text: 'Internships, placements and the support to turn an idea into a venture.' },
          ]}
        />
      </Section>

      <Section
        id="rc-wallet" tone="dark"
        eyebrow="Wallet"
        title="The Experience Zone Wallet"
        lede="One secure place for everything you earn and hold as an Experience Zone member."
      >
        <div className="pk-split">
          <div className="pk-init" data-rise>
            <Bullets
              items={[
                'Your membership and programme records in one place',
                'Certificates and achievements you can share and have verified',
                'Digital assets held securely and under your control',
              ]}
            />
            <div className="pk-actions">
              <Btn href="#login">
                Open Your Wallet <span aria-hidden="true">→</span>
              </Btn>
            </div>
          </div>
          {/* the wallet: the supplied artwork (public/images/rc-wallet.jpg) */}
          <figure className="rc-wallet" data-rise>
            <img
              src="/images/rc-wallet.jpg"
              alt="The IBA Experience Zone member wallet, holding membership, achievements and digital assets"
              width="1400"
              height="933"
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>
      </Section>

      <Section
        id="rc-investor-ready"
        eyebrow="Investor Ready Programme"
        title="Get Ready to Raise"
        lede="A guided programme that prepares founders to stand in front of investors with a clear story and the numbers to back it."
      >
        <Cards
          cols={4}
          items={[
            { num: '01', title: 'Pitch Deck', text: 'Build a deck that gets to the point: the problem, the solution, the market and the ask.' },
            { num: '02', title: 'Storytelling', text: 'Shape the narrative behind the venture so investors remember it and believe it.' },
            { num: '03', title: 'Business Plan', text: 'Turn the idea into a plan: model, revenue, costs, team and milestones.' },
            { num: '04', title: 'Growth Plan', text: 'Map how the business grows after the raise: markets, channels and targets.' },
          ]}
        />
        <div className="pk-actions" data-rise>
          <Btn enquiry="Red Club (learner)">
            Apply to the Programme <span aria-hidden="true">→</span>
          </Btn>
        </div>
      </Section>

      <Section
        id="rc-ai-tool" tone="red"
        eyebrow="AI Tool for Businesses"
        title="An AI Assistant for Your Business"
        lede="A practical AI tool that helps businesses plan, write and decide faster."
      >
        <Cards
          cols={3}
          items={[
            { title: 'Plan', text: 'Draft business plans, growth plans and roadmaps from your own inputs.' },
            { title: 'Create', text: 'Produce pitch material, proposals and everyday business documents.' },
            { title: 'Decide', text: 'Get structured answers to the questions that slow a growing business down.' },
          ]}
        />
      </Section>

      <Section
        id="rc-plan"
        eyebrow="30-60-90 Day Plan"
        title="Your First 90 Days, Mapped"
        lede="Every member leaves with a clear plan for the next three months, broken into three stages."
      >
        <Cards
          cols={3}
          items={[
            { num: '30', title: 'Days 1–30: Set the Foundation', text: 'Clarify the goal, complete the groundwork and put the essentials in place.' },
            { num: '60', title: 'Days 31–60: Build Momentum', text: 'Execute the plan, test with real users or partners and adjust from what you learn.' },
            { num: '90', title: 'Days 61–90: Deliver and Review', text: 'Hit the milestones, measure the results and set the plan for what comes next.' },
          ]}
        />
        <div className="pk-actions" data-rise>
          <Btn enquiry="Red Club (learner)">
            Join Experience Zone <span aria-hidden="true">→</span>
          </Btn>
          <Btn enquiry="Red Club / Verifyble (institution)" variant="ghost">
            Bring the Experience Zone to Your Institution
          </Btn>
        </div>
      </Section>

      <Section
        id="login" tone="dark"
        eyebrow="Members Only"
        title={MEMBER_LOGIN}
        lede="Red Club is a paid membership, by invitation only. Log in to open your programmes and wallet."
      >
        <div className="lg">
          <div className="lg__form">
            <div className="lg__main">
              <div className="lg__head" data-rise>
                <span className="lg__mark" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <rect x="5" y="10" width="14" height="10" />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                  </svg>
                </span>
                <h3>Log in to your account</h3>
                <p>Use the email your invitation was sent to.</p>
              </div>
              <Form
                notice={ACCOUNTS_NOTE}
                submit="Log In"
                consent={[]}
                fields={[
                  { name: 'email', label: 'Email', type: 'email', wide: true },
                  { name: 'password', label: 'Password', type: 'password', wide: true },
                ]}
              />
              <p className="lg__help" data-rise>
                Trouble logging in? Email <a href={CONTACT.email.href}>{CONTACT.email.label}</a>
              </p>
            </div>
            <p className="pk-aside" data-rise>
              Not a member yet? Membership is by invitation.{' '}
              <a href="/connect" data-enquiry="Red Club (learner)">
                Request an invitation
              </a>
            </p>
          </div>

          <aside className="lg__panel" data-rise>
            <p className="lg__eyebrow">Inside the Red Club</p>
            <ul className="lg__perks">
              <li>Your membership and programme records</li>
              <li>The Experience Zone Wallet: certificates, achievements and digital assets</li>
              <li>The Investor Ready Programme and the AI tool for businesses</li>
              <li>Your 30-60-90 day plan</li>
            </ul>
          </aside>
        </div>
      </Section>
    </div>
  )
}
