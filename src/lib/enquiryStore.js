/**
 * The enquiry, as one piece of state the whole site can reach.
 *
 * Roughly forty controls open this form — the nav, the closing band on every
 * page, and every Book a Call, Request Pricing, Request Prospectus and Partner
 * With Us across ten inner pages. Threading that through React context would
 * mean a provider wrapping the app and every one of those controls consuming
 * it; a module-level store with useSyncExternalStore is the same thing without
 * the plumbing, and a trigger only has to call a function.
 *
 * Three things live here rather than in the modal:
 *
 *   · `open` and `topic`, because the trigger sets both and the modal is not
 *     mounted at the moment it is clicked
 *   · `values`, because 8.1 asks for "field entries persist if reopened in the
 *     same session". They survive closing the modal AND navigating between
 *     pages, which a component's own state cannot — App remounts the page on
 *     every route change
 *   · `returnTo`, the element focus goes back to on close
 *
 * Session, not storage: nothing here is written to sessionStorage. A half-typed
 * enquiry is the reader's, not ours to keep on their machine after they close
 * the tab, and none of it is worth a consent conversation.
 */

import { useSyncExternalStore } from 'react'
import { ENQUIRY, HONEYPOT } from '../enquiry'

let state = {
  open: false,
  /* '' means "the reader has not chosen", which is what the dropdown shows as
     its disabled placeholder. A pre-filled topic is a real answer. */
  topic: '',
  phrase: '',
  values: {},
}

const subs = new Set()

const emit = (next) => {
  state = { ...state, ...next }
  for (const fn of subs) fn()
}

const subscribe = (fn) => {
  subs.add(fn)
  return () => subs.delete(fn)
}

/** The whole store. Reads are cheap and the object identity only changes on a
    real change, so a component re-renders when something it cares about moved
    and not on every keystroke — see `remember`. */
export const useEnquiry = () => useSyncExternalStore(subscribe, () => state, () => state)

/* ------------------------------------------------------------------ */
/* the URL                                                             */
/* ------------------------------------------------------------------ */

/**
 * `?enquiry=open`, so the form can be linked to from an email or a campaign.
 *
 * replaceState rather than pushState: the modal is a state of the page, not a
 * place. Pushing would make Back close the form instead of leaving the page,
 * which is a trap on the first click of a session — there would be nowhere to
 * go back TO.
 */
const writeParam = (on) => {
  if (!window.history?.replaceState) return
  const url = new URL(window.location.href)
  if (on) url.searchParams.set(ENQUIRY.param, 'open')
  else url.searchParams.delete(ENQUIRY.param)
  window.history.replaceState(null, '', url.pathname + url.search + url.hash)
}

/** Whether this page was arrived at with the form asked for. */
export const wantsEnquiry = () =>
  new URL(window.location.href).searchParams.get(ENQUIRY.param) === 'open'

/* ------------------------------------------------------------------ */

let returnTo = null

/**
 * @param {object} [ctx]
 * @param {string} [ctx.topic]  pre-selects "I'm interested in"
 * @param {string} [ctx.phrase] what the WhatsApp opener says the reader wants
 * @param {Element} [ctx.from]  the control that opened it, for focus on close
 */
export function openEnquiry({ topic, phrase, from } = {}) {
  returnTo = from || null
  emit({
    open: true,
    /* A trigger with no topic of its own does not wipe one the reader already
       chose — reopening from the nav after picking "Legal Advisory" should not
       silently reset the dropdown. */
    topic: topic || state.topic,
    phrase: phrase || state.phrase,
  })
  writeParam(true)
}

export function closeEnquiry() {
  emit({ open: false })
  writeParam(false)
  /* Focus goes back where it came from. Deferred a frame so it lands after the
     modal has unmounted — moving focus to an element while a dialog is still up
     is what makes a screen reader announce the dialog again on the way out. */
  const el = returnTo
  returnTo = null
  if (el?.isConnected) requestAnimationFrame(() => el.focus?.())
}

/**
 * Keep what has been typed, without re-rendering anything.
 *
 * The fields are uncontrolled — they hold their own text — and this is only the
 * copy that survives a close. So it mutates `values` in place rather than going
 * through emit: a re-render per keystroke would be a re-render of the whole
 * modal for a value nothing on screen is reading.
 */
export function remember(name, value) {
  state.values[name] = value
}

export const remembered = () => state.values

/** After a real submission there is nothing left to restore. */
export function clearEnquiry() {
  state.values = {}
}

/* ------------------------------------------------------------------ */
/* submission                                                          */
/* ------------------------------------------------------------------ */

/**
 * The states a submission can end in. The form renders one panel per state, so
 * wiring the endpoint is a change to the function below and nothing else.
 */
/* Named SEND_FAILED rather than FAILED: enquiry.js exports a FAILED already,
   and that one is the COPY a failure is shown with. Two things called FAILED,
   one a state and one a paragraph, imported into the same component, is a
   mistake waiting to be made. */
export const SENT = 'sent'
export const SEND_FAILED = 'send-failed'
export const NO_ENDPOINT = 'no-endpoint'

/**
 * ⚠ THERE IS NO ENDPOINT. This resolves to NO_ENDPOINT, every time.
 *
 * TODO, in this order, because the second is worthless without the first:
 *   1. POST to the enquiry endpoint. Store the submission in the CRM or a
 *      database AS WELL AS sending the mail — 8.5 is explicit that email-only
 *      handling loses leads, and it does: a mail that bounces, is filtered or
 *      is deleted leaves no record that anyone ever wrote in.
 *   2. Verify the Turnstile / invisible reCAPTCHA token server-side. The
 *      honeypot in the form is the cheap half of the protection and stops crude
 *      bots only; a token the server never checks stops nothing at all.
 *   3. Route on the topic using ROUTING in enquiry.js, and send the auto-reply
 *      from EMAIL_AUTOREPLY with {topic} filled in.
 *
 * Then delete NO_ENDPOINT and the branch that renders it.
 */
export async function submitEnquiry(fields) {
  /* The honeypot: a field no person can see and no person fills in. A bot that
     filled it is told nothing — it gets the same resolve a person gets, because
     an error is feedback and feedback is what lets a bot tune itself. */
  if (fields[HONEYPOT]) return SENT
  return NO_ENDPOINT
}
