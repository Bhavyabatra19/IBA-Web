/**
 * Figures that appear in more than one place.
 *
 * The credibility strip runs on the home page and again on About; the impact
 * counters run as four-plus-four on home and as one eight-tile grid on About.
 * Same numbers, different arrangements — so they are held here rather than
 * typed into each section, where "800+" and "850+" could quietly disagree.
 */

/**
 * The strip under the home hero, and inside About's own hero.
 *
 * `lead` is copy that reads before the figure rather than after it — "Presence
 * in 14 Countries", where the other three are "800+ Global Members". Only the
 * inline strip uses it; the stacked bar puts the label on its own line above the
 * number, where a lead-in would have nothing to lead into.
 */
export const CRED_STATS = [
  { to: 800, suffix: '+', label: 'Global Members' },
  { to: 100, suffix: '+', label: 'Global Advisories' },
  { to: 14, suffix: '', label: 'Countries', lead: 'Presence in' },
  { to: 70, suffix: '+', label: 'Global Affiliations' },
]

/** Counted — a running tally still growing. */
export const IMPACT_PRIMARY = [
  { to: 5, prefix: '$', suffix: 'B+', label: 'Tokenized Assets' },
  { to: 20, prefix: '', suffix: '+', label: 'Jurisdictions' },
  { to: 14, prefix: '', suffix: '+', label: 'Live Blockchains' },
  { to: 75, prefix: '', suffix: '+', label: 'Ecosystem Partners' },
]

/** Stated — settled portfolio facts, so they are printed, not animated. */
export const IMPACT_SECONDARY = [
  { k: '$12B+', v: 'Consortium AUM' },
  { k: '$500M+', v: 'Pipeline Yield' },
  { k: '300+', v: 'Assets' },
  { k: '11', v: 'Impact Projects' },
]

/**
 * When Code Becomes Capital — the tokenomics record.
 *
 * `usdM` is the figure in millions, and the only place the number lives: the
 * table's cell, the ring's arc, each share and the disclosed total are all
 * derived from it. A display string alongside it is how "USD 473 Million" and
 * a 47.6% slice quietly stop agreeing.
 *
 * The record is explicitly partial — see the "And more." under the table — so
 * anything built from it has to say what its whole is: the total DISCLOSED,
 * never the portfolio.
 */
export const TOKENOMICS = [
  { project: 'DNA Real Estate', sector: 'Real Estate', usdM: 473 },
  { project: 'KULA', sector: 'Impact Projects', usdM: 110 },
  { project: 'nGRND', sector: 'Gold', usdM: 160 },
  { project: 'FRE8', sector: 'Logistics', usdM: 250 },
]

/** The one formatter, so every rendering of a figure reads the same. */
export const usd = (m) => `USD ${m.toLocaleString('en-US')} Million`
