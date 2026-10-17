/**
 * IBA's headline figures and footprint — the one source of truth.
 *
 * Every page, the SEO descriptions and the counters read from here, so a
 * figure is changed in one place and nowhere else. Before this file the site
 * said 14 countries, 17 jurisdictions and 40+ countries & corridors in
 * different places, and listed two different sets of regions.
 *
 * The country count comes from data/presence.json (its `total`), which the
 * Global Presence map is drawn from, so the map and the copy cannot disagree.
 *
 * ⚠ CONFIRM WITH IBA before launch: these are the figures the site used most
 * often. "17 Jurisdictions" and "40+ Countries & Corridors" were folded into
 * the country count; if IBA does report a separate jurisdiction figure, add
 * it here and use it by name rather than typing it into a page.
 */

import presence from './presence.json'

/** A figure: the number, and what goes either side of it when printed. */
const fig = (n, { prefix = '', suffix = '' } = {}) => ({
  n,
  prefix,
  suffix,
  text: `${prefix}${n}${suffix}`,
})

export const FACTS = {
  members: fig(300, { suffix: '+' }),
  advisors: fig(100, { suffix: '+' }),
  countries: fig(presence.total),
  affiliations: fig(70, { suffix: '+' }),
  partners: fig(300, { suffix: '+' }),
  tokenized: fig(3.1, { prefix: '$', suffix: 'B' }),
  sectors: fig(14),
}

/**
 * Where IBA operates — the five regions of data/presence.json (India, the
 * UAE, Spain for Europe, Zambia for Africa, LATAM for the Americas), in the
 * order the corridor copy names them.
 */
export const REGIONS = ['Africa', 'the UAE', 'India', 'the Americas', 'Europe']

/** "Africa, the UAE, India, the Americas and Europe" */
export const REGIONS_LINE = `${REGIONS.slice(0, -1).join(', ')} and ${REGIONS.at(-1)}`

/** The headquarters line: India, then every other region. */
export const HQ_LINE = `Headquarters in India, with a presence in ${REGIONS.filter((r) => r !== 'India')
  .join(', ')
  .replace(/, ([^,]*)$/, ' and $1')}`

/**
 * The five regions as map pins, at real coordinates — the home page's
 * Flagship Programme map and the Web3 Corridor hero map both draw these.
 * side / dy place each label off its dot.
 */
export const REGION_PINS = [
  { name: 'AMERICAS', lat: -8, lon: -56, side: 'left', dy: 0 },
  { name: 'EUROPE', lat: 46, lon: 4, side: 'left', dy: -6 },
  { name: 'AFRICA', lat: 2, lon: 22, side: 'right', dy: 16 },
  { name: 'UAE', lat: 24, lon: 54, side: 'right', dy: -22 },
  { name: 'INDIA', lat: 22, lon: 79, side: 'right', dy: 14 },
]
