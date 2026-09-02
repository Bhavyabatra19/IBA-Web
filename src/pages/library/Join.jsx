/**
 * 7.2 — Join the IBA Library.
 *
 * The full field set, on a page rather than in the nav's modal: eight fields is
 * more than a modal should hold, and the modal stays what it is — a quick way
 * back in for someone who already has an account.
 *
 * ⚠ Nothing is submitted anywhere. The button starts a local preview of the
 * signed-in state so the flow can be walked, and says so. See
 * lib/previewSession.js before wiring a real endpoint here.
 */

import { useState } from 'react'
import {
  FormPage,
  FormFoot,
  FormNotice,
  Text,
  Select,
  Check,
  Multi,
  Federated,
  Go,
} from '../../sections/library/FormBlocks'
import { navigate } from '../../lib/router'
import { startPreview } from '../../lib/previewSession'
import { PENDING } from '../../nav'
import { COUNTRIES, INTERESTS, LIB_TRUST, ROLES } from '../../library'

export default function Join() {
  const [notice, setNotice] = useState(null)

  const submit = (e) => {
    e.preventDefault()
    /* TODO: POST to the real sign-up endpoint, then let the server decide where
       the reader goes. Until one exists, do not pretend an account was made —
       say what actually happened and open the preview. */
    const name = new FormData(e.currentTarget).get('name')
    setNotice('No account was created — there is no sign-up backend yet. Opening a local preview of the Library instead.')
    startPreview(name)
    setTimeout(() => navigate('/library/dashboard'), 1400)
  }

  return (
    <FormPage
      eyebrow="Library"
      title="Join the IBA Library"
      sub="One account. Full access. No cost."
      aside={
        <div className="form__trust">
          <p className="eyebrow">The terms</p>
          <p>{LIB_TRUST}</p>
        </div>
      }
    >
      <form className="form" onSubmit={submit} noValidate={false}>
        <Text label="Full name" name="name" autoComplete="name" required />
        <Text label="Work email" name="email" type="email" autoComplete="email" required />
        <Text
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={8}
          hint="At least 8 characters."
          required
        />
        <Text label="Organisation" name="organisation" autoComplete="organization" required />
        <Select label="Role" name="role" options={ROLES} required placeholder="Select your role" />
        <Select
          label="Country"
          name="country"
          options={COUNTRIES}
          required
          placeholder="Select your country"
        />
        <Multi
          legend="Interests"
          name="interests"
          options={INTERESTS}
          hint="Pick any number. We use these to decide what to send you, nothing else."
        />

        <div className="form__consents">
          <Check
            name="consent"
            required
            label={
              <>
                I agree to the <Go href={PENDING.terms}>Terms</Go> and{' '}
                <Go href={PENDING.privacy}>Privacy Policy</Go>
              </>
            }
          />
          <Check name="newsletter" label="Send me IBA research and event updates" />
        </div>

        {notice && <FormNotice>{notice}</FormNotice>}

        <button type="submit" className="btn btn--primary btn--block">
          Create Account
        </button>
      </form>

      <Federated providers={['Google', 'LinkedIn']} />

      <FormFoot>
        Already have an account? <Go href="/library/sign-in">Sign in</Go>
      </FormFoot>
    </FormPage>
  )
}
