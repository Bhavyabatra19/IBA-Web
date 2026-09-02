/**
 * 7.1 — The IBA Library, before sign-in.
 *
 * The public face of the gate. Its whole job is to be worth making an account
 * for, so what is inside is listed in full and the terms of the account are
 * stated on the page rather than left to the privacy policy — "we don't sell
 * your data" is the objection being answered, and it belongs next to the button.
 *
 * A reader who already has a preview session is sent to the dashboard instead
 * of being asked to sign up again.
 */

import { ServicePage, Band, Head, Chips, Actions, Cross } from '../../sections/service/ServiceBlocks'
import { usePreview } from '../../lib/previewSession'
import { INTERESTS, LIB_BODY, LIB_SHELF_NAMES, LIB_TRUST, LIB_VALUE } from '../../library'

export default function Library() {
  const preview = usePreview()

  return (
    <ServicePage
      art="library"
      eyebrow="Library"
      lines={[
        'The IBA',
        <>
          <em>Library</em>
        </>,
      ]}
      sub="Free resources from the alliance. No paywall."
      intro={LIB_BODY}
      /* The shelves as a rail, so what is behind the gate is visible before the
         account is asked for — the whole argument of this page. The button
         follows the reader's session for the same reason the one below does:
         asking someone with a preview to sign up again is asking twice. */
      showcase={{
        /* The page's own claim rather than its name — the H1 already says
           Library, and the word behind it should add something. */
        ghost: 'No Paywall',
        cta: preview
          ? { label: 'Open the Library', href: '/library/dashboard' }
          : { label: 'Create free account', href: '/library/join' },
        label: 'Six shelves, one free account',
        rail: LIB_SHELF_NAMES.map((name, i) => ({ n: `0${i + 1}`, name })),
        spectrum: INTERESTS,
      }}
    >
      <Band tone="light" id="inside">
        <Head
          eyebrow="What's Inside"
          lines={[
            'Six Shelves,',
            <>
              One Free <em>Account</em>
            </>,
          ]}
        />
        <Chips items={LIB_VALUE} />
        <Actions
          items={
            preview
              ? [{ label: 'Open the Library', href: '/library/dashboard' }]
              : [
                  { label: 'Create Free Account', href: '/library/join' },
                  { label: 'Already a member? Sign in', href: '/library/sign-in', tone: 'ghost' },
                ]
          }
        />
        {/* the terms of the account, next to the button that accepts them */}
        <p className="lib__trust" data-rise>
          {LIB_TRUST}
        </p>
      </Band>

      <Band tone="dark" id="education-crosslink">
        <Cross
          title="Studying, or teaching?"
          body="The Library is free to everyone. The Red Club and Verifyble are what come after it."
          cta="Go to Education"
          href="/education"
        />
      </Band>
    </ServicePage>
  )
}
