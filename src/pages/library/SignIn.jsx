/**
 * 7.3 — Welcome back.
 *
 * Three fields and two ways out: forgotten password, and no account yet.
 *
 * ⚠ Nothing is submitted anywhere. See lib/previewSession.js.
 */

import { useState } from 'react'
import {
  FormPage,
  FormFoot,
  FormNotice,
  Text,
  Check,
  Go,
} from '../../sections/library/FormBlocks'
import { navigate } from '../../lib/router'
import { startPreview } from '../../lib/previewSession'

export default function SignIn() {
  const [notice, setNotice] = useState(null)

  const submit = (e) => {
    e.preventDefault()
    /* TODO: POST to the real sign-in endpoint. Nothing is verified here — this
       opens the same local preview the sign-up form does. */
    const email = String(new FormData(e.currentTarget).get('email') || '')
    setNotice('Nothing was verified — there is no sign-in backend yet. Opening a local preview of the Library instead.')
    startPreview(email.split('@')[0])
    setTimeout(() => navigate('/library/dashboard'), 1400)
  }

  return (
    <FormPage eyebrow="Library" title="Welcome back" sub="Sign in to open the Library.">
      <form className="form" onSubmit={submit}>
        <Text label="Email" name="email" type="email" autoComplete="email" required />
        <Text
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />

        <div className="form__row">
          <Check name="remember" label="Remember me" />
          <Go className="form__link" href="/library/reset">
            Forgot password?
          </Go>
        </div>

        {notice && <FormNotice>{notice}</FormNotice>}

        <button type="submit" className="btn btn--primary btn--block">
          Sign In
        </button>
      </form>

      <FormFoot>
        New here? <Go href="/library/join">Create a free account</Go>
      </FormFoot>
    </FormPage>
  )
}
