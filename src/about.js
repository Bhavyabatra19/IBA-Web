/**
 * 3.2 and 3.3 — the vision and the mission, as content.
 *
 * Kept out of About.jsx because these two are the paragraphs most likely to be
 * rewritten by someone who is not editing a React file, and one of them is
 * explicitly unapproved.
 */

/**
 * ⚠ NOT AN APPROVED VISION STATEMENT.
 *
 * The brief is explicit: "confirm or replace this wording. It is drafted from
 * the positioning in the decks, not quoted from an approved vision statement."
 *
 * It ships because a vision section with no vision in it is worse than a draft
 * the page is honest about — but it is the one paragraph on this site written
 * FOR IBA rather than BY IBA, and it is signed as such on the page. Replace the
 * text here and delete `draft` when the approved wording arrives; the note
 * disappears with it.
 */
export const VISION = {
  statement:
    'A world where value moves as freely as information — where economies connect on open, verifiable infrastructure, and where the people building it are trained, credentialed and connected regardless of which country they were born in.',
  support:
    'Blockchain’s promise was never speculation. It was trust without a gatekeeper. IBA exists to make that promise operational — in policy, in enterprise systems, in public infrastructure, and in classrooms.',
  draft: true,
}

export const MISSION = {
  statement:
    'To advance the development, adoption and implementation of blockchain technology across Asia, MENA and beyond — by shaping policy, building capability, connecting economies and holding every initiative to a measurable standard of impact.',
}

/**
 * The four pillars, and the four verbs of the mission statement above it in
 * order: shaping policy, building capability, building the pipeline, connecting
 * economies. Reordering these silently contradicts the sentence they open out.
 */
export const MISSION_PILLARS = [
  {
    n: '01',
    name: 'Advocate',
    body: 'Shape regulatory frameworks, global standards and taxation policy through our councils and our work with governments.',
  },
  {
    n: '02',
    name: 'Enable',
    body: 'Deliver the advisory, consulting and technical capability organisations need to move from intent to production.',
  },
  {
    n: '03',
    name: 'Educate',
    body: 'Build the talent pipeline through the IBA Red Club, Experience Centers and verifiable credentialing.',
  },
  {
    n: '04',
    name: 'Connect',
    body: 'Open cross-border corridors so capital, talent and projects can find each other across jurisdictions.',
  },
]

/**
 * ⚠ 3.6 asks for a grid of 8–12 advisor cards — "names, photos and one-line
 * credentials to be supplied". None have been.
 *
 * So the grid is not built with eight invented advisors, or eight grey
 * silhouettes standing in for real people who have not agreed to be listed.
 * What ships is the count IBA already publishes and a line saying the profiles
 * are coming. When the names arrive this becomes the array and the section
 * grows a grid.
 */
export const ADVISORS = []
export const ADVISORS_PENDING =
  'Advisor profiles — names, photographs and credentials — to be supplied.'
