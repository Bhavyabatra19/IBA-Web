/**
 * 8.4 — the enquiry form.
 *
 * One component, two homes: inside the modal and inline on the Connect page.
 * Same fields, same validation, same handler, because 8.4 says so and because
 * two copies of an eight-field form is two places for a field to go missing.
 *
 * ---------------------------------------------------------------------------
 * Validation is on BLUR, never on submit-and-scold. A form that waits until the
 * end to say six things were wrong makes the reader hunt for six fields; a form
 * that speaks as you leave each one is answering while there is still context
 * for the answer. So: a field is checked when it is left, and re-checked on
 * every keystroke ONLY once it is already in error — which is what lets a
 * message clear the moment it stops being true, without a field turning red
 * while it is still being typed into for the first time.
 *
 * Required fields are marked with an asterisk AND a legend above the form.
 * Colour alone would be the whole marking for a reader who cannot see it.
 *
 * The fields are uncontrolled — they hold their own text and nothing re-renders
 * per keystroke — and every change is mirrored into the store so a closed and
 * reopened modal comes back with what was typed. See remember().
 */

import { useRef, useState } from 'react'
import {
  Area,
  Check,
  FileField,
  Honeypot,
  Radio,
  RequiredLegend,
  Select,
  Text,
  Go,
} from './library/FormBlocks'
import { COUNTRIES } from '../library'
import { CONTACT, PENDING } from '../nav'
import {
  CONTACT_METHODS,
  FAILED,
  HONEYPOT,
  SUCCESS,
  TOPICS,
  UNWIRED,
  waLink,
} from '../enquiry'
import {
  NO_ENDPOINT,
  SENT,
  SEND_FAILED,
  clearEnquiry,
  remember,
  remembered,
  submitEnquiry,
} from '../lib/enquiryStore'

/* ------------------------------------------------------------------ */
/* validation                                                          */
/* ------------------------------------------------------------------ */

/**
 * One rule per field, and the message it fails with.
 *
 * Written as data rather than as a chain of ifs in the submit handler, because
 * blur and submit have to agree exactly: a field that passes on blur and fails
 * on submit is a form that lied twice.
 *
 * The email pattern is deliberately loose. Anything stricter rejects addresses
 * that are perfectly valid — new TLDs, plus-addressing, apostrophes — and the
 * only check that actually proves an address works is sending to it.
 */
const RULES = {
  name: (v) => (v.trim() ? '' : 'Please tell us your name.'),
  email: (v) =>
    !v.trim()
      ? 'We need an email address to reply to.'
      : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
        ? ''
        : "That doesn't look like an email address.",
  organisation: (v) => (v.trim() ? '' : 'Please tell us your organisation.'),
  /* Loose on purpose, like email: a scheme is optional because nobody types
     one, so this only asks for something shaped like a domain. */
  website: (v) =>
    !v.trim()
      ? 'Please add your organisation’s website.'
      : /^(https?:\/\/)?[^\s/.]+\.[^\s]+$/i.test(v.trim())
        ? ''
        : "That doesn't look like a web address.",
  linkedin: (v) =>
    !v.trim()
      ? 'Please add your company’s LinkedIn page.'
      : /^(https?:\/\/)?([a-z]{2,3}\.)?linkedin\.com\/\S+$/i.test(v.trim())
        ? ''
        : 'Please paste the full LinkedIn page address, e.g. linkedin.com/company/your-company.',
  topic: (v) => (v ? '' : 'Pick the closest match — you can explain below.'),
  message: (v) => (v.trim() ? '' : 'Tell us what you’re working on.'),
  consent: (v) => (v ? '' : 'We need your agreement before we can reply.'),
  document: (f) => {
    if (!f || !f.name) return 'Please attach your company profile, pitch deck or info deck.'
    const ext = f.name.split('.').pop().toLowerCase()
    if (!DOC_TYPES.includes(ext)) return 'Please attach a PDF, Word, PowerPoint, Excel or image file.'
    if (f.size > DOC_MAX_MB * 1024 * 1024) return `That file is over ${DOC_MAX_MB} MB — please attach a smaller one.`
    return ''
  },
}

/** The document upload: what it accepts, and the size limit. */
const DOC_TYPES = ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'png', 'jpg', 'jpeg']
const DOC_MAX_MB = 10

const valueOf = (form, name) => {
  const el = form.elements[name]
  if (!el) return ''
  if (el.type === 'file') return el.files?.[0] || null
  return el.type === 'checkbox' ? el.checked : el.value
}

/* ------------------------------------------------------------------ */

/**
 * @param {object} p
 * @param {string} [p.topic]  the pre-selected "I'm interested in"
 * @param {string} [p.phrase] the page's own subject, for the WhatsApp fallback
 *   offered in the success and unwired states
 * @param {Function} [p.onDone] called when the reader closes the success panel.
 *   The modal closes itself; the Connect page has nothing to close, so it
 *   passes nothing and the panel simply stays.
 */
export default function EnquiryForm({ topic = '', phrase, onDone }) {
  const form = useRef(null)
  const [errors, setErrors] = useState({})
  const [busy, setBusy] = useState(false)
  const [outcome, setOutcome] = useState(null)
  /* The one controlled field: a CTA sets the topic, so the select has to follow
     a value from outside itself. Everything else is uncontrolled. */
  const [chosen, setChosen] = useState(topic || remembered().topic || '')

  const kept = remembered()

  /** Check one field and keep or clear its message. */
  const check = (name) => {
    const rule = RULES[name]
    if (!rule) return true
    const msg = rule(valueOf(form.current, name))
    setErrors((e) => (e[name] === msg ? e : { ...e, [name]: msg }))
    return !msg
  }

  /* Only re-check a field that is already complaining. Validating on every
     keystroke from the start puts a field into error at the first character of
     a value that is going to be perfectly fine. */
  const recheck = (name) => (e) => {
    remember(name, e.target.type === 'checkbox' ? e.target.checked : e.target.value)
    if (errors[name]) check(name)
  }

  const submit = async (e) => {
    e.preventDefault()
    /* On submit every rule runs again — blur is skipped by anyone who tabs
       straight to the button or fills the form from a password manager. */
    const failed = Object.keys(RULES).filter((n) => !check(n))
    if (failed.length) {
      /* Focus the first thing that is wrong. The messages are already on
         screen; this is so a keyboard reader is put at the first of them
         rather than told six things happened somewhere above. */
      form.current.elements[failed[0]]?.focus()
      return
    }

    setBusy(true)
    const fields = Object.fromEntries(new FormData(form.current).entries())
    try {
      const result = await submitEnquiry(fields)
      setOutcome(result)
      if (result === SENT) clearEnquiry()
    } catch {
      setOutcome(SEND_FAILED)
    } finally {
      setBusy(false)
    }
  }

  /* ---- the three end states ---- */

  if (outcome === SENT) {
    return (
      <div className="enq__end" role="status">
        <h3 className="enq__endTitle display">{SUCCESS.title}</h3>
        <p>{SUCCESS.body}</p>
        <p>
          {SUCCESS.urgent}{' '}
          <a href={waLink(phrase)} target="_blank" rel="noreferrer noopener">
            {CONTACT.whatsapp.label}
          </a>
          .
        </p>
        <div className="enq__endRow">
          <Go className="btn btn--primary btn--sm" href="/library">
            Browse the Library
          </Go>
          {onDone && (
            <button type="button" className="btn btn--ghost btn--sm" onClick={onDone}>
              Close
            </button>
          )}
        </div>
      </div>
    )
  }

  if (outcome === NO_ENDPOINT || outcome === SEND_FAILED) {
    /* Two panels, one shape. FAILED is what a reader sees once there is a
       server that can fail; NO_ENDPOINT is what is true today. Neither claims
       the other's story — see UNWIRED in enquiry.js. */
    const copy = outcome === NO_ENDPOINT ? UNWIRED : FAILED
    return (
      <div className="enq__end" data-bad role="alert">
        <h3 className="enq__endTitle display">{copy.title}</h3>
        <p>
          {copy.body}{' '}
          {outcome === SEND_FAILED && <a href={CONTACT.email.href}>{CONTACT.email.label}</a>}
        </p>
        <div className="enq__endRow">
          <a className="btn btn--primary btn--sm" href={CONTACT.email.href}>
            Email us instead
          </a>
          <a
            className="btn btn--ghost btn--sm"
            href={waLink(phrase)}
            target="_blank"
            rel="noreferrer noopener"
          >
            WhatsApp us
          </a>
        </div>
        <button
          type="button"
          className="enq__again"
          onClick={() => setOutcome(null)}
        >
          ← Back to the form
        </button>
      </div>
    )
  }

  return (
    <form className="form enq__form" ref={form} onSubmit={submit} noValidate>
      <RequiredLegend />

      <Text
        label="Name"
        name="name"
        autoComplete="name"
        required
        mark="required"
        error={errors.name}
        defaultValue={kept.name}
        onBlur={() => check('name')}
        onChange={recheck('name')}
      />
      <Text
        label="Work email"
        name="email"
        type="email"
        autoComplete="email"
        required
        mark="required"
        error={errors.email}
        defaultValue={kept.email}
        onBlur={() => check('email')}
        onChange={recheck('email')}
      />
      <Text
        label="Phone / WhatsApp"
        name="phone"
        type="tel"
        autoComplete="tel"
        mark="required"
        defaultValue={kept.phone}
        onChange={recheck('phone')}
      />
      <Text
        label="Organisation"
        name="organisation"
        autoComplete="organization"
        required
        mark="required"
        error={errors.organisation}
        defaultValue={kept.organisation}
        onBlur={() => check('organisation')}
        onChange={recheck('organisation')}
      />
      <Text
        label="Organisation website"
        name="website"
        type="url"
        autoComplete="url"
        inputMode="url"
        placeholder="yourcompany.com"
        required
        mark="required"
        error={errors.website}
        defaultValue={kept.website}
        onBlur={() => check('website')}
        onChange={recheck('website')}
      />
      <Text
        label="Company LinkedIn page"
        name="linkedin"
        type="url"
        inputMode="url"
        placeholder="linkedin.com/company/your-company"
        required
        mark="required"
        error={errors.linkedin}
        defaultValue={kept.linkedin}
        onBlur={() => check('linkedin')}
        onChange={recheck('linkedin')}
      />
      <Select
        label="I'm interested in"
        name="topic"
        options={TOPICS}
        required
        mark="required"
        placeholder="Select a topic"
        error={errors.topic}
        value={chosen}
        onChange={(e) => {
          setChosen(e.target.value)
          remember('topic', e.target.value)
          if (errors.topic) setErrors((x) => ({ ...x, topic: '' }))
        }}
        onBlur={() => check('topic')}
      />
      <Select
        label="Country"
        name="country"
        options={COUNTRIES}
        mark="required"
        placeholder="Select your country"
        defaultValue={kept.country || ''}
        onChange={recheck('country')}
      />
      <Area
        label="Message"
        name="message"
        rows={4}
        required
        mark="required"
        error={errors.message}
        defaultValue={kept.message}
        onBlur={() => check('message')}
        onChange={recheck('message')}
      />
      {/* the company profile / pitch deck — kept with the enquiry; it is sent
          once the form has a server to send to (see submitEnquiry). A file
          input cannot be refilled, so a reopened modal asks for it again. */}
      <FileField
        label="Upload document"
        name="document"
        accept={DOC_TYPES.map((t) => '.' + t).join(',')}
        required
        mark="required"
        hint={`Company profile, pitch deck or info deck · PDF, Word, PowerPoint, Excel or image · up to ${DOC_MAX_MB} MB`}
        error={errors.document}
        onPick={() => check('document')}
      />
      <Radio
        legend="Preferred contact method"
        name="preferred"
        options={CONTACT_METHODS}
        defaultValue={kept.preferred}
        onChange={recheck('preferred')}
      />

      <div className="form__consents">
        <Check
          name="consent"
          required
          error={errors.consent}
          defaultChecked={!!kept.consent}
          onBlur={() => check('consent')}
          onChange={recheck('consent')}
          label={
            <>
              I agree to the <Go href={PENDING.privacy}>Privacy Policy</Go> and to being
              contacted about my enquiry
            </>
          }
        />
      </div>

      <Honeypot name={HONEYPOT} />

      <button type="submit" className="btn btn--primary btn--block" disabled={busy}>
        {busy ? 'Sending…' : 'Submit Enquiry'}
      </button>
    </form>
  )
}
