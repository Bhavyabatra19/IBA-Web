/**
 * Password reset request — the screen behind "Forgot password?" on 7.3.
 *
 * The email this sends is EMAIL_RESET in library.js, and it is shown on this
 * page rather than only living in a spec: the copy is written, nothing sends it
 * yet, and the person wiring the mail provider should be able to find it from
 * the screen that triggers it.
 *
 * ⚠ No email is sent. See lib/previewSession.js.
 */

import { useState } from 'react'
import { FormPage, FormFoot, FormNotice, Text, Go } from '../../sections/library/FormBlocks'
import { EMAIL_RESET } from '../../library'

export default function Reset() {
  const [notice, setNotice] = useState(null)

  const submit = (e) => {
    e.preventDefault()
    /* TODO: POST to the reset endpoint, which sends EMAIL_RESET. Do not show a
       "check your inbox" confirmation until something is actually sending. */
    setNotice('No email was sent — password reset is not connected yet. Email hello@indiablockchainalliance.org and we will reset it by hand.')
  }

  return (
    <FormPage
      eyebrow="Library"
      title="Reset your password"
      sub="Give us the email on your account and we will send a link to set a new password."
      aside={
        /* the copy, on the page that triggers it, marked as not yet sending */
        <div className="form__trust">
          <p className="eyebrow">The email this sends</p>
          <p className="form__mailSubject">{EMAIL_RESET.subject}</p>
          {EMAIL_RESET.body.map((line) => (
            <p key={line}>{line}</p>
          ))}
          <p className="form__mailNote">Not wired to a mail provider yet.</p>
        </div>
      }
    >
      <form className="form" onSubmit={submit}>
        <Text label="Email" name="email" type="email" autoComplete="email" required />

        {notice && <FormNotice>{notice}</FormNotice>}

        <button type="submit" className="btn btn--primary btn--block">
          Send Reset Link
        </button>
      </form>

      <FormFoot>
        Remembered it? <Go href="/library/sign-in">Sign in</Go>
      </FormFoot>
    </FormPage>
  )
}
