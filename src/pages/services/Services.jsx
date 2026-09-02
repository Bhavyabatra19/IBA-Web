/**
 * 4.0 — Services landing.
 *
 * Five tiles over a sixth that runs the full width. The wide one is Sector
 * Expertise, and it is wide because it is a different kind of thing: the five
 * are what IBA does, the sixth is where it has done it.
 */

import { ServicePage, Band, Head, Index, Cross } from '../../sections/service/ServiceBlocks'
import { SERVICES, SERVICE_SPECTRUM, servicePath } from '../../services'

export default function Services() {
  return (
    <ServicePage
      art="services"
      eyebrow="Services"
      lines={[
        'End-to-End Blockchain',
        <>
          Solutions Across <em>Every Stage</em>
        </>,
      ]}
      spectrum={SERVICE_SPECTRUM}
      intro={
        'Most organisations don’t fail at blockchain because the technology is wrong. They fail because the problem was never framed, the regulation was never mapped, or the model was never tested. IBA covers the full arc — from “should we?” to “it’s live, and it’s governed.”'
      }
      /* The one hero on this section that is an entrance rather than a page
         head. The rail is the six below, in their order, so the object under
         the headline is the contents of the page it opens. */
      showcase={{
        ghost: 'Services',
        cta: { label: 'Talk to our team', href: '#connect' },
        label: 'The arc — frame, structure, build, govern',
        rail: SERVICES.map((s) => ({ n: s.n, name: s.short || s.name })),
      }}
    >
      <Band tone="light" id="what-we-offer">
        <Head
          eyebrow="What We Offer"
          lines={[
            'Six Ways In,',
            <>
              One <em>Alliance</em>
            </>,
          ]}
        />
        {/* A rail rather than a grid. `wide` on the sixth is not read here —
            on a rail every card is the same size, and Sector Expertise being a
            different kind of thing is said by where it sits in the order and by
            its own page, not by being twice the width of the others. */}
        <Index
          label="The six services"
          items={SERVICES.map((s) => ({ ...s, href: servicePath(s.slug) }))}
        />
      </Band>

      <Band tone="dark" id="education-crosslink">
        <Cross
          title="Looking for education?"
          body="Students join the IBA Red Club. Institutions partner through Verifyble."
          cta="Go to Education"
          href="/education"
        />
      </Band>
    </ServicePage>
  )
}
