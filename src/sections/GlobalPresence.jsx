/**
 * 3.4 — Global Presence.
 *
 * The map is an ENHANCEMENT and the list underneath is the information. That is
 * the brief's own rule and it decides the whole component: every country is in
 * the region-grouped list whether or not the map draws, whether or not a pointer
 * exists, and whether or not a reader can see it. Nothing is only on the map.
 *
 * ---------------------------------------------------------------------------
 * DATA. One JSON config — data/presence.json — with the schema the brief sets
 * out: country, ISO code, region, presence type, count. Nothing is hardcoded
 * into the drawing, so the nine countries still to be supplied are a data edit
 * and not a component change.
 *
 *   country   display name
 *   iso2      ISO 3166-1 alpha-2, or null for an entry that is not one country
 *             ("LATAM markets" is a region reached through a corridor)
 *   region    one of regionOrder, which is also the order the list is grouped in
 *   lat, lon  where the marker goes. Real coordinates — see WorldMap
 *   presence  any of: Headquarters · Members · Advisors · Affiliate ·
 *             Active Programme · Corridor
 *   count     a number when one is known, null otherwise — and null RENDERS
 *             NOTHING rather than a zero
 *   note      one line of context, optional
 *
 * ⚠ FIVE OF FOURTEEN. `total` says 14 and the file lists the five the source
 * decks evidence. The section says so on the page rather than quietly showing
 * five and letting the headline claim fourteen — a map with nine countries
 * missing is worse than a map that admits it.
 *
 * ---------------------------------------------------------------------------
 * ⚠ ONE DEVIATION FROM THE SPEC, and it is deliberate.
 *
 * The brief asks for active countries FILLED red. Filling a country needs that
 * country's boundary polygon, and this map is drawn from continent outlines —
 * there are no per-country shapes in the project, and adding them means a
 * TopoJSON boundary dataset and the loader for it. Two reasons that is not the
 * right trade today: nine of the fourteen countries are unknown, so most of the
 * fill would be missing anyway; and the brief's own Markers row asks for a dot
 * per country, scaled by activity, which is what is built here and which is
 * legible at every size a country fill is not.
 *
 * If the fill is wanted once the fourteen are supplied: world-atlas countries
 * at 110m, matched on the `iso2` already in the config.
 */

import { useState } from 'react'
import WorldMap, { CORRIDOR_ARCS, pct } from '../components/WorldMap'
import PRESENCE from '../data/presence.json'

const { countries: COUNTRIES, regionOrder: REGIONS, total: TOTAL } = PRESENCE

/**
 * Marker size from how many kinds of presence a country carries.
 *
 * The brief allows scaling "if the data supports it", and this is the reading
 * of the data that is actually supported: India carries five presence types and
 * Spain carries two, which is a real difference in how much is happening there.
 * A member COUNT would be the better basis and every one of them is null.
 */
const weight = (c) => Math.min(4, c.presence.length)

/** The list, grouped the way the brief groups it. */
const byRegion = REGIONS.map((region) => ({
  region,
  items: COUNTRIES.filter((c) => c.region === region),
})).filter((g) => g.items.length > 0)

export default function GlobalPresence() {
  /* Hovered or focused — what the tooltip is showing. */
  const [active, setActive] = useState(null)
  /* Clicked — what the list below is filtered to. The brief marks this
     optional; it is here because with five entries the filter is the only thing
     that makes clicking a marker do anything, and a marker that looks pressable
     and is not is worse than one that is plainly decorative. */
  const [only, setOnly] = useState(null)

  const shown = only
    ? byRegion
        .map((g) => ({ ...g, items: g.items.filter((c) => c.country === only) }))
        .filter((g) => g.items.length > 0)
    : byRegion

  return (
    <section className="section band band--dark gp" id="global-presence">
      <div className="wrap">
        <div className="ab__head">
          <p className="eyebrow" data-rise>
            Global Presence
          </p>
          {/* an h2, not the h1 the brief gives it — the page already has one,
              and two would leave a screen reader without a single title */}
          <h2 className="h2 display" data-clip>
            <span className="line">
              <span className="line__inner">Present in</span>
            </span>
            <span className="line">
              <span className="line__inner">
                <em>{TOTAL} Countries</em>
              </span>
            </span>
          </h2>
          <p className="gp__intro" data-rise>
            IBA operates where policy, capital and code meet — with members, advisors,
            affiliations and active programmes across Asia, MENA, Europe, Africa and
            the Americas.
          </p>
        </div>

        <div className="gp__map" data-rise>
          <WorldMap
            /* the labelled corridor pins belong to the corridor page; here the
               markers are the countries and they carry their own tooltip */
            markets={[]}
            arcs={CORRIDOR_ARCS}
            className="corr__map--plain"
          >
            <ul className="gp__markers">
              {COUNTRIES.map((c) => {
                const on = active?.country === c.country
                return (
                  <li key={c.country} style={{ ...pct(c), '--w': weight(c) }}>
                    <button
                      type="button"
                      className="gp__dot"
                      data-on={on ? '' : undefined}
                      data-picked={only === c.country ? '' : undefined}
                      aria-pressed={only === c.country}
                      onPointerEnter={() => setActive(c)}
                      onPointerLeave={() => setActive(null)}
                      onFocus={() => setActive(c)}
                      onBlur={() => setActive(null)}
                      onClick={() => setOnly(only === c.country ? null : c.country)}
                    >
                      <span className="sr-only">
                        {c.country} — {c.presence.join(', ')}
                      </span>
                    </button>

                    {/* Rendered beside the marker it belongs to rather than in
                        one floating card positioned by script: the dot already
                        knows where it is, so the tooltip inherits the position
                        and nothing has to be measured. */}
                    {on && (
                      <span className="gp__tip" role="presentation">
                        <span className="gp__tipName">{c.country}</span>
                        <span className="gp__tipKinds">{c.presence.join(' · ')}</span>
                        {c.count != null && (
                          <span className="gp__tipCount">{c.count} members</span>
                        )}
                        {c.note && <span className="gp__tipNote">{c.note}</span>}
                      </span>
                    )}
                  </li>
                )
              })}
            </ul>
          </WorldMap>
        </div>

        {/* The information, and the reason the map is allowed to be an
            enhancement. Every country above is here, in text, grouped. */}
        <div className="gp__list" data-rise>
          <div className="gp__listHead">
            <h3 className="gp__listH">Where we are</h3>
            {only && (
              <button type="button" className="gp__clear" onClick={() => setOnly(null)}>
                Showing {only} — show all
              </button>
            )}
          </div>

          <div className="gp__regions">
            {shown.map((g) => (
              <section className="gp__region" key={g.region}>
                <h4 className="gp__regionH">{g.region}</h4>
                <ul>
                  {g.items.map((c) => (
                    <li key={c.country}>
                      <span className="gp__country">{c.country}</span>
                      <span className="gp__kinds">
                        {c.presence.join(' · ')}
                        {c.count != null && ` · ${c.count} members`}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          {/* Said on the page, not only in a comment. The headline claims
              fourteen and the map can show five; a reader is entitled to know
              which of those is the map's limit rather than IBA's. */}
          {COUNTRIES.length < TOTAL && (
            <p className="gp__pending">
              {COUNTRIES.length} of {TOTAL} shown. The full country list and the presence
              type for each are to be supplied.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
