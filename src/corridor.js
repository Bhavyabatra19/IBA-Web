/**
 * 7 — Web3 Corridor, as content.
 *
 * The flagship programme, and the one page on the site with a section of the
 * brief to itself. It is pulled out of the Ecosystem deliberately: a corridor is
 * not a partner list, and one level down would waste it.
 *
 * The two corridors themselves are NOT here. They are CORRIDORS in studio.js,
 * where the Ecosystem page already reads them, and both pages import that one
 * array — a corridor named on two pages under two spellings is the failure this
 * file exists to avoid.
 */

/* ================================================================== */
/* 7.0 — the landing                                                  */
/* ================================================================== */

/**
 * Two paragraphs, not one. The second is a claim about how IBA operates —
 * programmes, not events — and folding it onto the end of the definition is
 * what would bury it.
 */
export const CORRIDOR_INTRO = [
  'A Web3 Corridor is a structured cross-border programme that connects two or more markets across four dimensions: regulation, capital, talent and projects. It exists because the friction between emerging markets is rarely technical — it is regulatory ambiguity, missing introductions and no shared standard for what “credible” looks like.',
  'IBA runs corridors as long-term programmes, not events.',
]

/* ================================================================== */
/* 7.1 — how corridors work                                           */
/* ================================================================== */

/**
 * The four dimensions the intro names, in the same order it names them.
 *
 * That ordering is the point: the intro says "regulation, capital, talent and
 * projects" and this is that sentence opened out. Reordering these cards
 * silently contradicts the paragraph above them.
 *
 * Unnumbered on purpose. They are four dimensions running at once, not four
 * stages — and the site's numbered block (`Steps`) would assert a sequence in
 * which capital comes after regulation and talent after both.
 */
export const CORRIDOR_PILLARS = [
  {
    name: 'Regulation',
    body: 'Mapping the regulatory position in each market, engaging regulators through the Blockchain Governance Council, and publishing what actually applies rather than what people assume.',
  },
  {
    name: 'Capital',
    body: "Connecting projects to investors, launchpads and listing infrastructure across both markets, with structuring and tokenomics support from IBA's advisory teams.",
  },
  {
    name: 'Talent',
    body: 'Moving skills across the corridor through Red Club programmes, international pathways, credentialing via Verifyble and mentor networks in both markets.',
  },
  {
    name: 'Projects',
    body: 'Sourcing and supporting the actual ventures that use the corridor — pilots, tokenized assets, public infrastructure and enterprise deployments.',
  },
]

/**
 * ⚠ NOT WRITTEN. The brief marks the cadence a placeholder and says so in as
 * many words: "describe the recurring rhythm — delegations, roundtables, cohort
 * intakes, reporting. To be supplied by IBA."
 *
 * So the four headings ship and the rhythm does not. A corridor that claims a
 * quarterly delegation nobody has scheduled is a commitment the website made on
 * IBA's behalf.
 */
export const CORRIDOR_CADENCE = {
  name: 'Programme cadence',
  fields: ['Delegations', 'Roundtables', 'Cohort intakes', 'Reporting'],
  pending: true,
}

/* ================================================================== */
/* 7.2 — join a corridor                                              */
/* ================================================================== */

/**
 * Who corridors are for, and the "I am a" dropdown on the form below.
 *
 * One list for both, because they ARE one list — the brief writes the field as
 * "(dropdown, five options above)". Read as prose the entries need the sentence
 * after the name; read as options they need the name alone, which is why each
 * carries both rather than the dropdown slicing the label off a paragraph.
 */
export const CORRIDOR_AUDIENCES = [
  {
    name: 'Startups & Projects',
    body: 'Market entry, regulatory clarity, capital introductions.',
  },
  {
    name: 'Investors & Funds',
    body: 'Vetted deal flow across two regulatory environments.',
  },
  {
    name: 'Governments & Regulators',
    body: 'Peer engagement and shared standards work.',
  },
  {
    name: 'Institutions',
    body: 'Student pathways, joint research and faculty exchange.',
  },
  {
    name: 'Corporates',
    body: 'Supply chain, payments and trade finance pilots across the corridor.',
  },
]

/** The five, as the dropdown reads them. Derived, so the two cannot diverge. */
export const CORRIDOR_ROLES = CORRIDOR_AUDIENCES.map((a) => a.name)

/**
 * The corridor field.
 *
 * The fourth option is what the page's secondary call to action does — see
 * Corridor.jsx. "Propose a New Corridor" is not a second form, it is this
 * option on this one, and building it as a second form would be two enquiry
 * inboxes for the same enquiry.
 */
export const CORRIDOR_OPTIONS = [
  'India–UAE',
  'India–Spain–LATAM',
  'Both',
  'Proposing a new corridor',
]

export const CORRIDOR_PROPOSE = 'Proposing a new corridor'
