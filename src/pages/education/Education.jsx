/**
 * 5.0 — Education landing.
 *
 * Two doors and nothing else. The Education tab lands here rather than on a
 * combined page because a student and a registrar want different things from
 * the same section, and a page that serves both makes each of them read half a
 * page that is not for them before finding the half that is.
 *
 * So this page's only job is the question "which are you", answered once.
 */

import { ServicePage, Band, Head, Doors } from '../../sections/service/ServiceBlocks'
import { EDU_DOORS, EDU_INTRO, EDU_STRANDS } from '../../education'

export default function Education() {
  return (
    <ServicePage
      eyebrow="Education"
      lines={[
        'Two Doors Into',
        <>
          Emerging <em>Tech</em>
        </>,
      ]}
      intro={EDU_INTRO}
      /* The console is the page's question drawn: two nodes, the audience under
         each, and both of them live — a reader who already knows which one they
         are can leave from the hero rather than scroll to the doors to do it. */
      showcase={{
        ghost: 'Education',
        cta: { label: 'Choose your door', href: '/education#choose' },
        label: 'Two doors — one for the learner, one for the campus',
        rail: EDU_DOORS.map((d, i) => ({
          n: `0${i + 1}`,
          name: d.name,
          note: d.audience,
          href: d.href,
        })),
        spectrum: EDU_STRANDS,
      }}
    >
      <Band tone="light" id="choose">
        <Head
          eyebrow="Choose Your Door"
          lines={[
            'Built From',
            <>
              Both <em>Ends</em>
            </>,
          ]}
          note="One programme trains the people. The other builds the place that trains them. Most campuses end up needing both — start with whichever one you are."
        />
        <Doors items={EDU_DOORS} />
      </Band>
    </ServicePage>
  )
}
