/**
 * Memberships — after the client's design (IBA Site Review, 11-02-2026):
 * the hero, the Web360 Club tiers, the ecosystem members' services, and the
 * cohort memberships for institutes and students.
 *
 * ⚠ COPY TO CONFIRM: the design's ecosystem-member cards are too faint in the
 * supplied PDF to read in full. Their names, logos and links are from the
 * design; the one-line descriptions below are set from the legible words and
 * need IBA's confirmation. "Membership 03" and "Membership 04" are the
 * design's own placeholders, kept as drawn.
 */

import { PageHero, Section, Btn } from '../../components/Kit'
import CardRail from '../../components/CardRail'
import TierShield from '../../components/TierShield'
import { Go } from '../../sections/service/ServiceBlocks'

const ENQUIRY = 'Membership'

const TIERS = [
  {
    key: 'bronze',
    name: 'Bronze',
    who: 'Founders finding product-market fit',
    why: 'Build with the right people around you while you shape the product. Bronze connects you to founders, mentors and early customers across the IBA network, so you can test, learn and find your fit faster.',
    cta: 'Apply for Bronze',
  },
  {
    key: 'silver',
    name: 'Silver',
    who: 'Companies established in one country, ready to expand globally',
    why: 'Take what works at home into new markets. Silver opens global networking across the IBA corridor, introductions in each market you enter, and real-time insight from members already operating there.',
    cta: 'Apply for Silver',
  },
  {
    key: 'gold',
    name: 'Gold',
    who: 'Top global leaders',
    why: 'Premium, exclusive access for the leaders shaping the industry. A closed circle of global peers, priority access across the IBA ecosystem, and a seat where policy and capital meet.',
    cta: 'Request an Invitation',
    invite: true,
  },
]

/* ⚠ descriptions to confirm (see the note at the top); "Explore" goes to the
   Ecosystem page's partners until each partner has a page of its own */
const PARTNERS = [
  {
    name: 'The IBA Circle',
    tag: 'Investor access',
    text: 'A members’ circle where founders meet investors, mentors and peers, and work towards becoming investor-ready.',
    mono: 'TC',
    href: '/ecosystem#organisations',
  },
  {
    name: 'IBA Block',
    tag: 'Dubai ecosystem',
    text: 'IBA at The Block, Dubai: a workspace and community for virtual-asset companies, with a real-time experience of the Dubai ecosystem.',
    logo: '/logos/eco/theblock-ae.png',
    href: '/ecosystem#organisations',
  },
  {
    name: 'Tokenized Asset Foundation',
    tag: 'Tokenization',
    text: 'Issuer profiles, research and events across the tokenization industry, open to IBA members.',
    logo: '/logos/partners/token-asset-foundation.jpg',
    href: '/ecosystem#organisations',
  },
]

const COHORTS = [
  { name: 'Red Club Experience Zone', who: 'B2B · For institutes' },
  { name: 'Student Experience', who: 'For students' },
  { name: 'Membership 03', who: '' },
  { name: 'Membership 04', who: '' },
]

const Arrow = () => <span aria-hidden="true">→</span>

export default function Memberships() {
  return (
    <div className="mbr">
      <PageHero
        id="memberships"
        aside={
          <div className="mbr-hero-art" aria-hidden="true">
            <img src="/images/membership-hero.png" alt="" />
          </div>
        }
        eyebrow="IBA Memberships"
        title="Memberships"
        lede="IBA offers a range of memberships through its partner ecosystem, each built for a different stage and sector."
        actions={
          <>
            <Btn href="#web360">Web360 Club</Btn>
            <Btn href="#ecosystem-members" variant="ghost">
              Ecosystem Memberships
            </Btn>
            <Btn href="/library#login" variant="ghost">
              Member Login
            </Btn>
          </>
        }
      />

      <Section
        id="web360"
        eyebrow="Web360 Club"
        title="Find the tier that fits where you are"
        lede="IBA’s own memberships, from founders finding their fit to the leaders shaping the industry worldwide."
      >
        <CardRail label="Web360 Club tiers" cols={3}>
          {TIERS.map((t) => (
            <li className={`mbr-tier mbr-tier--${t.key}`} key={t.key}>
              <div className="mbr-tier__top">
                <TierShield metal={t.key} />
                {t.invite && <span className="mbr-tier__note">Invite only</span>}
              </div>
              <h3 className="mbr-tier__name">{t.name}</h3>
              <p className="mbr-tier__label">Who it is for</p>
              <p className="mbr-tier__who">{t.who}</p>
              <p className="mbr-tier__label">Why join</p>
              <p className="mbr-tier__why">{t.why}</p>
              <a
                className={`mbr-tier__cta${t.invite ? ' mbr-tier__cta--invite' : ''}`}
                href="/connect"
                data-enquiry={ENQUIRY}
              >
                {t.cta}
              </a>
            </li>
          ))}
        </CardRail>
      </Section>

      <Section
        id="ecosystem-members"
        eyebrow="Our Ecosystem Members"
        title="Services from across the ecosystem"
        lede="Partner companies in the IBA ecosystem offer their services to our members, from investor access to events and tokenization. Join through IBA for global networking, global expansion and real-time experience of each partner’s community."
      >
        <CardRail label="Ecosystem member services" cols={4}>
          {PARTNERS.map((p) => (
            <li className="mbr-svc" key={p.name}>
              <h3 className="mbr-svc__name">{p.name}</h3>
              <p className="mbr-svc__tag">{p.tag}</p>
              <p className="mbr-svc__text">{p.text}</p>
              <div className="mbr-svc__foot">
                <Go className="mbr-svc__go" href={p.href} aria-label={`Explore ${p.name}`}>
                  Explore <Arrow />
                </Go>
                <span className="mbr-svc__logo">
                  {p.logo ? (
                    <img src={p.logo} alt="" loading="lazy" decoding="async" />
                  ) : (
                    <span className="mbr-svc__mono" aria-hidden="true">
                      {p.mono}
                    </span>
                  )}
                </span>
              </div>
            </li>
          ))}
          {/* the last card: the way to every partner */}
          <li className="mbr-svc mbr-svc--all">
            <h3 className="mbr-svc__name">Explore the Marketplace</h3>
            <p className="mbr-svc__text">
              Every partner company in the IBA ecosystem, and the services each offers to members, in one place.
            </p>
            <Go className="mbr-svc__all" href="/ecosystem#organisations">
              Explore the Marketplace <Arrow />
            </Go>
          </li>
        </CardRail>
      </Section>

      <Section
        id="cohort-memberships"
        eyebrow="Cohort Memberships"
        title="Memberships for institutes and their students"
        lede="Cohort memberships through the IBA Red Club Experience Zone, for institutes and the students they enrol. Details are coming soon."
      >
        <CardRail label="Cohort memberships" cols={4}>
          {COHORTS.map((c) => (
            <li className="mbr-cohort" key={c.name}>
              <h3 className="mbr-cohort__name">{c.name}</h3>
              {c.who && <p className="mbr-cohort__who">{c.who}</p>}
              <div className="mbr-cohort__foot">
                <span>Details coming soon.</span>
                <span className="mbr-cohort__dot" aria-hidden="true" />
              </div>
            </li>
          ))}
        </CardRail>
      </Section>
    </div>
  )
}
