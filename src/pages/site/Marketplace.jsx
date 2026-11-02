/**
 * Marketplace — every partner company in the IBA ecosystem and what it
 * offers members, as a searchable, filterable directory.
 *
 * The layout follows a startup directory: a search bar across the top,
 * filters down the left (offerings, then locations), and one row per partner
 * with its logo, a brief and its offerings. A row opens the partner's
 * membership tiers in the same pop-up the Memberships page uses.
 *
 * Partners come from two places:
 *   ECOSYSTEM (Memberships.jsx)   partners whose tiers are on the site, with
 *                                 their brief, offerings and locations
 *   PARTNERS (data/partners.js)   everyone else in the alliance's partner
 *                                 list, shown as "coming soon" until IBA
 *                                 supplies what they offer
 *
 * ⚠ The other partners have no brief, offerings or locations yet, so the
 * filters cannot find them. Give one a row in ECOSYSTEM (with its tiers) and
 * it moves into the filters on its own; nothing here needs to change.
 */

import { useMemo, useState } from 'react'
import { PageHero, Section, Btn } from '../../components/Kit'
import { ECOSYSTEM, MembershipDialog, useMembershipDialog } from './Memberships'
import { PARTNERS, initials } from '../../data/partners'

/** Entries in PARTNERS that ECOSYSTEM already carries, under their own names. */
const LISTED = ['TheBlock.', 'Token Asset Foundation (STO)', 'The Circle']

function SoonDetails({ name }) {
  return (
    <div className="mk-soon">
      <p>This partner's profile and membership tiers are coming soon.</p>
      <Btn enquiry={`Marketplace: ${name}`}>Ask About {name}</Btn>
    </div>
  )
}

/** Partners kept out of the marketplace, by request. */
const HIDDEN = ['World Token Congress']

const OTHERS = PARTNERS.filter((p) => !LISTED.includes(p.name) && !HIDDEN.includes(p.name)).map((p) => ({
  id: p.name,
  name: p.name,
  logo: p.logo,
  offerings: [],
  locations: [],
  title: p.name,
  lede: 'A partner of India Blockchain Alliance.',
  Details: () => <SoonDetails name={p.name} />,
}))

const ALL = [...ECOSYSTEM, ...OTHERS]

/** Every option a filter offers, in the order partners first use it. */
const options = (key) => [...new Set(ALL.flatMap((p) => p[key]))]
const OFFERINGS = options('offerings')
const LOCATIONS = options('locations')

/** A partner matches when it has any checked option in each group used. */
const matches = (p, picked, key) => !picked.length || picked.some((o) => p[key].includes(o))

const searchable = (p) => [p.name, p.partner, p.brief, ...p.offerings, ...p.locations].join(' ').toLowerCase()

function FilterGroup({ title, list, picked, setPicked, counts }) {
  const toggle = (o) => setPicked(picked.includes(o) ? picked.filter((x) => x !== o) : [...picked, o])
  return (
    <fieldset className="mk__group">
      <legend>{title}</legend>
      {list.map((o) => {
        const id = `mk-${title}-${o}`.replace(/\W+/g, '-').toLowerCase()
        return (
          <label className="mk__check" htmlFor={id} key={o}>
            <input id={id} type="checkbox" checked={picked.includes(o)} onChange={() => toggle(o)} />
            <span>{o}</span>
            <span className="mk__n">{counts[o] || 0}</span>
          </label>
        )
      })}
    </fieldset>
  )
}

function Logo({ p }) {
  if (p.Logo) return <p.Logo />
  if (p.logo) return <img src={p.logo} alt="" width="40" height="40" loading="lazy" />
  return <span className="mk__mono">{initials(p.name)}</span>
}

export default function Marketplace() {
  const { open, show, hide } = useMembershipDialog()
  const [query, setQuery] = useState('')
  const [offerings, setOfferings] = useState([])
  const [locations, setLocations] = useState([])

  const q = query.trim().toLowerCase()
  const bySearch = useMemo(() => ALL.filter((p) => !q || searchable(p).includes(q)), [q])
  const shown = bySearch.filter((p) => matches(p, offerings, 'offerings') && matches(p, locations, 'locations'))

  /* each option's count is what checking it would add, given the other group */
  const count = (key, other, otherKey) =>
    Object.fromEntries(
      options(key).map((o) => [o, bySearch.filter((p) => p[key].includes(o) && matches(p, other, otherKey)).length])
    )
  const filtered = offerings.length > 0 || locations.length > 0 || q !== ''

  return (
    <>
      <PageHero
        eyebrow="IBA Ecosystem"
        title="Partner Marketplace"
        lede="Every partner company in the IBA ecosystem and the services they offer our members. Search, filter by offering or location, and open a partner to see its membership tiers."
        actions={
          <>
            <Btn enquiry="Join the marketplace as a partner company">Join as a Partner Company</Btn>
            <Btn enquiry="Join as an ecosystem member" variant="ghost">
              Join as an Ecosystem Member
            </Btn>
          </>
        }
      />

      <Section id="directory" tone="card">
        <div className="mk">
          <label className="mk__search" htmlFor="mk-q">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-4-4" />
            </svg>
            <span className="mb-sr">Search partners</span>
            <input
              id="mk-q"
              type="search"
              placeholder="Search partners and services"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
            />
          </label>

          <div className="mk__body">
            <aside className="mk__filters" aria-label="Filters">
              <FilterGroup
                title="Offerings"
                list={OFFERINGS}
                picked={offerings}
                setPicked={setOfferings}
                counts={count('offerings', locations, 'locations')}
              />
              <FilterGroup
                title="Locations"
                list={LOCATIONS}
                picked={locations}
                setPicked={setLocations}
                counts={count('locations', offerings, 'offerings')}
              />
              {filtered && (
                <button
                  type="button"
                  className="mk__clear"
                  onClick={() => {
                    setQuery('')
                    setOfferings([])
                    setLocations([])
                  }}
                >
                  Clear all
                </button>
              )}
            </aside>

            <div className="mk__results">
              <p className="mk__count" aria-live="polite">
                Showing {shown.length} of {ALL.length} partners
              </p>
              {shown.length ? (
                <ul className="mk__list">
                  {shown.map((p) => (
                    <li key={p.id}>
                      <button type="button" className="mk__row" onClick={(e) => show(p, e.currentTarget)}>
                        <span className="mk__logo">
                          <Logo p={p} />
                        </span>
                        <span className="mk__main">
                          <span className="mk__name">{p.partner || p.name}</span>
                          <span className="mk__brief">{p.brief || 'Profile and membership tiers coming soon.'}</span>
                          {(p.offerings.length > 0 || p.locations.length > 0) && (
                            <span className="mk__chips">
                              {p.locations.map((l) => (
                                <span className="mk__chip mk__chip--place" key={l}>
                                  {l}
                                </span>
                              ))}
                              {p.offerings.map((o) => (
                                <span className="mk__chip" key={o}>
                                  {o}
                                </span>
                              ))}
                            </span>
                          )}
                        </span>
                        <span className="mk__go" aria-hidden="true">
                          {p.brief ? 'View tiers' : 'Details'} →
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mk-soon">
                  <p>No partners match those filters yet.</p>
                  <Btn enquiry="Join the marketplace as a partner company">Join as a Partner Company</Btn>
                </div>
              )}
            </div>
          </div>
        </div>
      </Section>

      <MembershipDialog membership={open} onClose={hide} />
    </>
  )
}
