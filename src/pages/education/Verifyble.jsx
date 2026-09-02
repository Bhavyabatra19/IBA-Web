/**
 * 5.2 — Verifyble. For institutions.
 *
 * The long page of the two, because the decision behind it is a procurement
 * one. It answers in the order a committee asks: what it is, what it costs to
 * belong, what it is for, what physically arrives on campus, what it is worth,
 * what each side owes the other, and what is not included.
 *
 * Pricing is deliberately absent. The brief is explicit — publish the terms,
 * not the figures — so the bands, the per-student fee and the surcharge all sit
 * behind Request Pricing. See the note on VFY_TERMS in education.js.
 *
 * Named Verifyble like the home page's band of the same name; that one is the
 * 2.6 teaser and this is the page it now links to.
 */

import {
  ServicePage,
  Band,
  Head,
  Chips,
  Tags,
  Tiles,
  Groups,
  Table,
  Pairs,
  Actions,
  Cross,
} from '../../sections/service/ServiceBlocks'
import {
  VFY_ADDONS,
  VFY_BENEFITS,
  VFY_CREDENTIALING,
  VFY_ENGAGEMENT,
  VFY_ENGAGEMENT_NOTE,
  VFY_EXPERIENCE_CENTERS,
  VFY_INTRO,
  VFY_LABS,
  VFY_MATRIX,
  VFY_OBJECTIVES,
  VFY_OUTCOME,
  VFY_REVENUE,
  VFY_SCOPE,
  VFY_TERMS,
  VFY_TIERS,
  VFY_VALUE,
} from '../../education'

export default function Verifyble() {
  return (
    <ServicePage
      back="/education"
      backLabel="Education"
      eyebrow="Education · For Institutions"
      lines={[
        <>
          <em>Verifyble</em>
        </>,
      ]}
      sub="Trust, issued on-chain. Capability, built on campus."
      intro={VFY_INTRO}
    >
      <Band tone="light" id="what-it-delivers">
        <Head
          eyebrow="What Verifyble Delivers"
          lines={[
            'Credentials Out,',
            <>
              Capability <em>In</em>
            </>,
          ]}
        />
        <Groups
          items={[
            { name: 'Credentialing Infrastructure', items: VFY_CREDENTIALING },
            { name: 'Experience Centers', items: [VFY_EXPERIENCE_CENTERS] },
          ]}
          cols={2}
        />
      </Band>

      <Band tone="dark" id="membership-tiers">
        <Head
          eyebrow="Membership Tiers"
          lines={[
            'Three Ways to',
            <>
              <em>Belong</em>
            </>,
          ]}
        />
        <Table head={VFY_TIERS.head} rows={VFY_TIERS.rows} caption="IBA institutional membership tiers" />
        <Actions
          items={[
            { label: 'Request Pricing', href: '#connect' },
            { label: 'Book a Campus Consultation', href: '#connect', tone: 'ghost' },
          ]}
          note="Annual charges are quoted against cohort size. The terms are published below; the figures come with the quote."
        />
      </Band>

      <Band tone="light" id="objectives">
        <Head
          eyebrow="Primary Objectives"
          lines={[
            'Research, Training,',
            <>
              Industry <em>Connect</em>
            </>,
          ]}
        />
        <Groups items={VFY_OBJECTIVES} cols={3} />
      </Band>

      <Band tone="dark" id="the-labs">
        <Head
          eyebrow="The Labs"
          lines={[
            'What Actually Arrives',
            <>
              on <em>Campus</em>
            </>,
          ]}
        />
        <Groups items={VFY_LABS} cols={2} />
      </Band>

      <Band tone="light" id="add-ons">
        <Head
          eyebrow="Optional Add-Ons"
          lines={[
            'Everything Else',
            <>
              You Can <em>Bolt On</em>
            </>,
          ]}
        />
        <Tags items={VFY_ADDONS} label="Optional Verifyble add-ons" />
      </Band>

      <Band tone="dark" id="value-add">
        <Head
          eyebrow="The Value Add"
          lines={[
            'Programs, Internships,',
            <>
              <em>Mentorship</em>
            </>,
          ]}
        />
        <Tiles items={VFY_VALUE} cols={3} />
      </Band>

      <Band tone="light" id="outcome">
        <Head
          eyebrow="The Outcome"
          lines={[
            'What the Institute',
            <>
              Ends Up <em>Owning</em>
            </>,
          ]}
        />
        <Pairs items={VFY_OUTCOME} />
      </Band>

      <Band tone="dark" id="benefits">
        <Head
          eyebrow="Benefits for Institutions"
          lines={[
            'Eight Reasons a',
            <>
              Campus <em>Signs</em>
            </>,
          ]}
        />
        <Chips items={VFY_BENEFITS} />
      </Band>

      <Band tone="light" id="revenue">
        <Head
          eyebrow="Revenue Opportunities"
          lines={[
            'The Center Earns',
            <>
              Its Own <em>Keep</em>
            </>,
          ]}
        />
        <Tiles items={VFY_REVENUE} cols={3} />
      </Band>

      <Band tone="dark" id="responsibilities">
        <Head
          eyebrow="Responsibility Matrix"
          lines={[
            'Who Owes',
            <>
              <em>What</em>
            </>,
          ]}
        />
        <Groups items={VFY_MATRIX} cols={2} />
      </Band>

      <Band tone="light" id="whats-included">
        <Head
          eyebrow="What's Included"
          lines={[
            'Inclusions and',
            <>
              <em>Exclusions</em>
            </>,
          ]}
          note="Said in full rather than left to the contract — an exclusion a partner discovers late is a worse surprise than one they read here."
        />
        <Groups items={VFY_SCOPE} cols={2} />
      </Band>

      <Band tone="dark" id="engagement-model">
        <Head
          eyebrow="Engagement Model"
          lines={[
            'What IBA Runs,',
            <>
              and On What <em>Terms</em>
            </>,
          ]}
          note={VFY_ENGAGEMENT_NOTE}
        />
        <Groups items={VFY_ENGAGEMENT} cols={2} />
        <div className="edu__terms">
          <p className="eyebrow" data-rise>
            Commercial Terms
          </p>
          <Chips items={VFY_TERMS} />
        </div>
        <Actions
          items={[
            { label: 'Request the Verifyble Prospectus', href: '#connect' },
            { label: 'Book a Campus Consultation', href: '#connect', tone: 'ghost' },
          ]}
        />
      </Band>

      <Band tone="light" id="student-crosslink">
        <Cross
          title="Your students don't have to wait."
          body="They can join the IBA Red Club whether or not your campus is a member."
          cta="Red Club for Students"
          href="/education/red-club"
        />
      </Band>
    </ServicePage>
  )
}
