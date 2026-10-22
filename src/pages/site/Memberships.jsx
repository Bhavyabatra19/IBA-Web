/**
 * Web3 Corridor Memberships — the landing page and the detail page every
 * membership card opens. Content lives in memberships.js; read its header for
 * what is still awaited and the rules the copy follows (no prices, partner
 * grids as supplied, every enquiry through IBA).
 *
 * Partner pages carry the partner's logo, but the page itself stays IBA's:
 * the same black hero, white and red panels and square boxes as the rest of
 * the site.
 */

import { PageHero, Section, Cards, Btn, Bullets } from '../../components/Kit'
import { Go } from '../../sections/service/ServiceBlocks'
import {
  TRACKS,
  PARTNERS,
  ALL_MEMBERSHIPS,
  MEMBERSHIPS_PATH,
  MEMBERSHIP_TOPIC,
  STEPS,
  SCREENING_NOTE,
  membershipPath,
  isPartner,
} from '../../memberships'

/**
 * Where the source material has not been supplied yet. Labelled as a
 * placeholder on purpose: it must be filled in, not mistaken for content.
 */
function Awaiting({ what, items = [], compact = false }) {
  return (
    <div className={`mb-await${compact ? ' mb-await--compact' : ''}`} data-rise>
      <p className="mb-await__label">Placeholder · awaiting source material</p>
      <p className="mb-await__what">{what}</p>
      {!compact && items.length > 0 && <Bullets items={items} />}
    </div>
  )
}

/** The partner's logo on a white tile, so any logo reads on any panel. */
const Logo = ({ m, large = false }) =>
  m.logo ? (
    <span className={`mb-logo${large ? ' mb-logo--large' : ''}`}>
      <img src={m.logo} alt={`${m.fullName || m.name} logo`} loading="lazy" decoding="async" />
    </span>
  ) : (
    <span className={`mb-logo mb-logo--empty${large ? ' mb-logo--large' : ''}`} aria-hidden="true">
      Logo
    </span>
  )

/** A membership's card on the landing page, in the site's box format. */
function MembershipCards({ items, cols }) {
  return (
    <div className={`pk-cards pk-cards--${cols}`}>
      {items.map((m) => (
        <article className="pk-card pk-card--link mb-card" key={m.slug} data-rise>
          <div className="pk-card__top">
            {isPartner(m) ? <Logo m={m} /> : <span className="wd__tag">{m.tag}</span>}
          </div>
          <h3 className="pk-card__title">
            <Go className="pk-card__link" href={membershipPath(m)}>
              {m.name}
            </Go>
          </h3>
          {m.fullName && <p className="pk-card__sub">{m.fullName}</p>}
          {m.summary ? (
            <p className="pk-card__text">{m.summary}</p>
          ) : (
            <Awaiting compact what="Short description" />
          )}
          <span className="pk-card__cta" aria-hidden="true">
            Explore <span>→</span>
          </span>
        </article>
      ))}
    </div>
  )
}

/** How an enquiry works, and that it is not a guarantee. */
function HowItWorks({ phrase }) {
  return (
    <Section
      id="memberships-how"
      tone="red"
      eyebrow="Enquiries & Applications"
      title="Every Membership Starts with IBA"
      lede="Whichever membership interests you, your enquiry comes to IBA first. We advise you, screen your application and direct you to the membership that fits."
    >
      <Cards items={STEPS} cols={4} />
      <p className="mb-note" data-rise>
        {SCREENING_NOTE}
      </p>
      <div className="pk-actions" data-rise>
        <Btn enquiry={MEMBERSHIP_TOPIC} phrase={phrase}>
          Enquire Through IBA <span aria-hidden="true">→</span>
        </Btn>
      </div>
    </Section>
  )
}

export default function Memberships() {
  return (
    <div>
      <PageHero
        id="memberships"
        eyebrow="IBA Web3 Corridor · Memberships"
        title="Web3 Corridor Memberships"
        lede="IBA’s own membership tracks and the partner memberships available through IBA, in one place. Explore each one, then enquire through IBA and we will help you find the right fit."
        actions={
          <>
            <Btn href="#memberships-tracks">
              Explore Memberships <span aria-hidden="true">→</span>
            </Btn>
            <Btn enquiry={MEMBERSHIP_TOPIC} variant="ghost">
              Enquire Through IBA
            </Btn>
          </>
        }
      />

      <Section
        id="memberships-tracks"
        eyebrow="IBA Membership Tracks"
        title="Memberships by IBA"
        lede="From IBA’s complete Web360 offering to a pack built for founders and startups."
      >
        <MembershipCards items={TRACKS} cols={2} />
      </Section>

      <Section
        id="memberships-partners"
        tone="card"
        eyebrow="Partner Memberships"
        title="Partner Memberships Through IBA"
        lede="Memberships from IBA’s partners, presented as each partner sets them out. Enquire through IBA and we will advise whether one suits you."
      >
        <MembershipCards items={PARTNERS} cols={3} />
      </Section>

      <HowItWorks />
    </div>
  )
}

/** One membership's own page. */
export function MembershipDetail({ m }) {
  const partner = isPartner(m)
  const phrase = `the ${m.name} membership`
  const connects = (m.connects || []).map((s) => PARTNERS.find((p) => p.slug === s)).filter(Boolean)
  return (
    <div>
      <PageHero
        id="membership"
        aside={partner ? <Logo m={m} large /> : undefined}
        eyebrow={`Web3 Corridor Memberships · ${partner ? 'Partner Membership' : 'IBA Membership'}`}
        title={m.name}
        lede={m.intro || (m.fullName ? `${m.fullName}.` : undefined)}
        actions={
          <>
            <Btn enquiry={MEMBERSHIP_TOPIC} phrase={phrase}>
              Enquire Through IBA <span aria-hidden="true">→</span>
            </Btn>
            <Btn href={MEMBERSHIPS_PATH} variant="ghost">
              All Memberships
            </Btn>
          </>
        }
      />

      {!m.intro && (
        <Section id="membership-about" center>
          <Awaiting what="Opening description" />
        </Section>
      )}

      <Section
        id="membership-grid"
        tone="card"
        eyebrow={partner ? 'Membership Levels' : 'What’s Included'}
        title={partner ? `${m.name} Memberships` : `Inside ${m.name}`}
        lede={partner ? `As set out by ${m.fullName || m.name.replace(/^IBA /, '')}.` : undefined}
      >
        {m.grid ? (
          <Cards
            items={m.grid.map((t) => ({ title: t.name, text: t.intro, list: t.benefits }))}
            cols={Math.min(m.grid.length, 4) || 1}
          />
        ) : (
          <Awaiting
            what={
              partner
                ? 'The latest supplied membership grid, reproduced word for word with prices removed.'
                : 'The benefits and grouping from IBA’s latest membership deck.'
            }
            items={m.awaiting}
          />
        )}
      </Section>

      <Section
        id="membership-iba"
        eyebrow="Through IBA"
        title="Joining Through IBA"
        lede={
          partner
            ? 'Enquiries for this membership come to IBA first, so we can advise you and screen your application before introducing you.'
            : undefined
        }
      >
        {m.viaIba ? (
          <Bullets items={m.viaIba} />
        ) : (
          <Awaiting compact what="IBA branding and ecosystem exposure benefits, from the supplied material." />
        )}
        {connects.length > 0 && (
          <div className="cx-block">
            <p className="mb-note mb-note--ink" data-rise>
              Where it fits, IBA can also connect you to:
            </p>
            <MembershipCards items={connects} cols={2} />
          </div>
        )}
      </Section>

      <HowItWorks phrase={phrase} />
    </div>
  )
}

/** Every detail page, keyed by its path, for App.jsx's PAGES. */
export const MEMBERSHIP_PAGES = Object.fromEntries(
  ALL_MEMBERSHIPS.map((m) => [membershipPath(m), () => <MembershipDetail m={m} />])
)
