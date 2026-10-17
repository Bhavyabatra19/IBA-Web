/**
 * 4.0 — Expertise landing.
 *
 * Everything IBA sells or delivers, split by BUYER rather than by feature: six
 * things an organisation engages, and one thing a person enrols in. That split
 * is the page's whole structure, because it is the first question a reader
 * answers about themselves — and the six and the one are not alternatives to
 * each other, so a flat list of seven would ask them to choose between things
 * that are not a choice.
 *
 * ⚠ The route is still /services. The section is named Expertise everywhere it
 * is read — the nav, the headings, the footer — and only the URL still says
 * otherwise. Renaming it means moving six sub-pages, servicePath(), the router
 * table and every `back` link with them, so it is left as one deliberate piece
 * of work rather than done halfway here.
 */

import { ServicePage, Band, Head, Index, Cross } from '../../sections/service/ServiceBlocks'
import {
  SERVICES,
  SERVICE_SPECTRUM,
  EXPERTISE_STUDENTS,
  servicePath,
} from '../../services'

export default function Services() {
  return (
    <ServicePage
      art="services"
      eyebrow="Expertise"
      lines={[
        'What We',
        <>
          <em>Deliver</em>
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
        ghost: 'Expertise',
        cta: { label: 'Talk to our team', href: '#connect' },
        label: 'The arc — frame, structure, build, govern',
        rail: SERVICES.map((s) => ({ n: s.n, name: s.short || s.name })),
      }}
    >
      <Band tone="light" id="what-we-offer">
        <Head
          eyebrow="What We Offer"
          lines={[
            'Two Ways In,',
            <>
              One <em>Alliance</em>
            </>,
          ]}
        />

        {/* Each group is a rail of its own rather than one rail of seven. The
            heading between them is the information — take it away and the Red
            Club is a seventh service, which is exactly what it is not. */}
        <h3 className="svc__groupTitle" data-rise>
          For Enterprises &amp; Governments
        </h3>
        <Index
          label="What IBA delivers to enterprises and governments"
          items={SERVICES.map((s) => ({ ...s, href: servicePath(s.slug) }))}
        />

        <h3 className="svc__groupTitle" data-rise>
          For Institutions &amp; Students
        </h3>
        <Index
          label="What IBA delivers to institutions and students"
          items={EXPERTISE_STUDENTS}
        />
      </Band>

      <Band tone="dark" id="ecosystem-crosslink">
        <Cross
          title="Looking for our initiatives, partners or communities?"
          body="Expertise is what IBA is brought in to do. Ecosystem is everything it convenes."
          cta="Go to Ecosystem"
          href="/studio"
        />
      </Band>
    </ServicePage>
  )
}
