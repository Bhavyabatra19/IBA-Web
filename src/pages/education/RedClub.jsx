/**
 * 5.1 — IBA Red Club. For students.
 *
 * The page is ordered the way a student decides: what it is, who is behind it,
 * what you do, what you come out holding, what you get access to, why, and only
 * then how to join. The credentials band sits before access on purpose — the
 * wallet is the thing that makes everything after it portable.
 *
 * The stat strip is the site's four credibility figures, imported rather than
 * retyped. See the note at the top of content.js.
 */

import {
  ServicePage,
  Band,
  Head,
  Stats,
  Tiles,
  Groups,
  Chips,
  Steps,
  Faq,
  Actions,
  Cross,
} from '../../sections/service/ServiceBlocks'
import { CRED_STATS } from '../../content'
import {
  RC_ACCESS,
  RC_BLOCKS,
  RC_CREDENTIALS,
  RC_CREDENTIALS_LEDE,
  RC_FAQ,
  RC_INTRO,
  RC_JOIN,
  RC_PROGRAM,
  RC_WHY,
} from '../../education'

export default function RedClub() {
  return (
    <ServicePage
      back="/education"
      backLabel="Education"
      eyebrow="Education · For Students"
      lines={[
        'IBA',
        <>
          Red <em>Club</em>
        </>,
      ]}
      sub="Learn it. Build it. Prove it. Get hired for it."
      intro={RC_INTRO}
    >
      {/* Shares the hero's dark ground rather than taking a band of its own —
          the same reason the home page's credibility bar does. It is a strip of
          four numbers, and giving it a band would break the alternation. */}
      <Band tone="dark" id="by-the-numbers">
        <Stats items={CRED_STATS} cols={4} />
      </Band>

      <Band tone="light" id="building-blocks">
        <Head
          eyebrow="The Four Building Blocks"
          lines={[
            'Training, Projects,',
            <>
              Research, <em>Placements</em>
            </>,
          ]}
        />
        <Tiles items={RC_BLOCKS} cols={2} />
      </Band>

      <Band tone="dark" id="how-it-runs">
        <Head
          eyebrow="How the Program Runs"
          lines={[
            'Taught by People Who',
            <>
              Do It for a <em>Living</em>
            </>,
          ]}
        />
        <Groups items={RC_PROGRAM} cols={3} />
      </Band>

      <Band tone="light" id="credentials">
        <Head
          eyebrow="Your Credentials, On-Chain"
          lines={[
            'Records You',
            <>
              Actually <em>Hold</em>
            </>,
          ]}
          note={RC_CREDENTIALS_LEDE}
        />
        <Tiles items={RC_CREDENTIALS} cols={3} />
        <p className="svc__note svc__note--after" data-rise>
          Credentialing runs on Verifyble, IBA’s institutional infrastructure.
        </p>
      </Band>

      <Band tone="dark" id="access">
        <Head
          eyebrow="What You Get Access To"
          lines={[
            'Labs, Mentors,',
            <>
              Routes <em>Out</em>
            </>,
          ]}
        />
        <Tiles items={RC_ACCESS} cols={3} />
      </Band>

      <Band tone="light" id="why-join">
        <Head
          eyebrow="Why Students Join"
          lines={[
            'Eight Reasons,',
            <>
              One <em>Profile</em>
            </>,
          ]}
        />
        <Chips items={RC_WHY} />
      </Band>

      <Band tone="dark" id="how-to-join">
        <Head
          eyebrow="How to Join"
          lines={[
            'Two Ways',
            <>
              <em>In</em>
            </>,
          ]}
        />
        <Steps items={RC_JOIN} />
        <Actions
          items={[
            { label: 'Join the Red Club', href: '#connect' },
            { label: 'Ask IBA to Come to My Campus', href: '#connect', tone: 'ghost' },
            {
              label: 'Browse the Free IBA Library',
              href: '/#library',
              tone: 'link',
              note: 'No membership needed',
            },
          ]}
        />
      </Band>

      <Band tone="light" id="student-faq">
        <Head
          eyebrow="Student FAQ"
          lines={[
            'The Questions',
            <>
              Worth <em>Asking</em>
            </>,
          ]}
        />
        <Faq items={RC_FAQ} />
      </Band>

      <Band tone="dark" id="institution-crosslink">
        <Cross
          title="Are you the institution?"
          body="Campuses partner through Verifyble — labs, faculty development and credentials issued under your own name."
          cta="Explore Verifyble"
          href="/education/verifyble"
        />
      </Band>
    </ServicePage>
  )
}
