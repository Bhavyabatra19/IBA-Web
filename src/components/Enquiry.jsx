/**
 * 8.1 — the enquiry overlay.
 *
 * Rendered once, by App, and opened from everywhere. A modal on desktop and a
 * full-height sheet on mobile; the page behind stays exactly where it was,
 * which is the whole reason this is not a page — a reader halfway down the
 * Verifyble tiers who clicks Request Pricing should still be halfway down the
 * Verifyble tiers when they close it.
 *
 * ---------------------------------------------------------------------------
 * It also owns the TRIGGERS, as one delegated listener on the document rather
 * than a handler on each of the forty controls that open it.
 *
 * Any element carrying `data-enquiry` opens the form. The attribute's value is
 * the topic to pre-select; empty means "use whatever this page is about", which
 * PAGE_CONTEXT answers. That is why the closing band's button on ten different
 * pages needs no per-page wiring, and why adding a new CTA is an attribute
 * rather than an import, a hook and a handler.
 *
 * Delegation also survives the thing per-element handlers do not: these
 * controls are inside pages that App remounts on every route change.
 *
 * ---------------------------------------------------------------------------
 * The reach-out pane comes FIRST in the DOM, and that ordering is load-bearing
 * in two directions. On mobile it stacks first, which is 8.1's requirement —
 * someone in a hurry can call or WhatsApp without scrolling past a form. On
 * desktop it is the left pane, which is where it reads. So the order is the
 * markup's and the columns are the grid's, and neither needs a media query to
 * reorder anything.
 */

import { useCallback, useEffect, useRef } from 'react'
import ReachOut from './ReachOut'
import EnquiryForm from '../sections/EnquiryForm'
import { ENQUIRY, contextFor } from '../enquiry'
import {
  closeEnquiry,
  openEnquiry,
  useEnquiry,
  wantsEnquiry,
} from '../lib/enquiryStore'
import { lockScroll, unlockScroll } from '../lib/scroll'

/* Everything that can hold focus, in DOM order. The list is the standard one;
   `:not([disabled])` matters because the submit button IS disabled while a
   submission is in flight, and a trap that tabs to a disabled control is a trap
   the reader can fall out of. */
const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

export default function Enquiry() {
  const { open, topic, phrase } = useEnquiry()
  const panel = useRef(null)

  /* ---------------------------------------------------------------- */
  /* triggers                                                          */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    const onClick = (e) => {
      const el = e.target.closest?.('[data-enquiry]')
      if (!el) return
      /* Let a modified click do what the reader asked. These triggers are real
         anchors to a real destination, so cmd-click still opens it in a tab
         rather than being swallowed by an overlay they cannot see. */
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
      e.preventDefault()
      /* CAPTURE PHASE, and stopPropagation, because most of these triggers are
         `Go` components whose own onClick already calls preventDefault and
         scrolls to the closing band. On the bubble path React's handler runs
         first: this listener would see an event already defaulted-prevented and
         the page would scroll away underneath the opening modal. Taking the
         click on the way down means the React handler never runs at all. */
      e.stopPropagation()
      const page = contextFor(window.location.pathname)
      openEnquiry({
        /* the trigger's own topic wins; the page's is the fallback */
        topic: el.dataset.enquiry || page.topic,
        phrase: el.dataset.enquiryPhrase || page.phrase,
        from: el,
      })
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  /* ?enquiry=open, so a campaign or an email can link straight to the form. */
  useEffect(() => {
    if (wantsEnquiry()) {
      const page = contextFor(window.location.pathname)
      openEnquiry({ topic: page.topic, phrase: page.phrase })
    }
  }, [])

  /* ---------------------------------------------------------------- */
  /* the dialog                                                        */
  /* ---------------------------------------------------------------- */

  const close = useCallback(() => closeEnquiry(), [])

  /* The page behind does not scroll. lockScroll stops Lenis and sets the class
     the reduced-motion path needs, and it counts — the mobile drawer uses the
     same pair, and the drawer's Connect With Us opens this. */
  useEffect(() => {
    if (!open) return
    lockScroll()
    return () => unlockScroll()
  }, [open])

  /* Focus into the panel on open, and held there until it closes. Focus going
     back to the trigger is closeEnquiry's job — it is the only thing that knows
     which control opened this. */
  useEffect(() => {
    if (!open) return
    const el = panel.current
    /* the heading, not the first field: a reader arriving is told what this is
       before being put inside it. It is tabindex="-1" for exactly this. */
    el?.querySelector('[data-autofocus]')?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        close()
        return
      }
      if (e.key !== 'Tab') return
      const items = [...el.querySelectorAll(FOCUSABLE)].filter(
        (n) => n.offsetParent !== null || n === document.activeElement
      )
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      /* Wrap at both ends. Without this, tabbing past the last control lands in
         the page behind the overlay — which is still there, still scrolled to
         where it was, and now taking keystrokes the reader thinks are going to
         the form. */
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    /* capture, so Escape reaches this before the nav's own Escape handler and
       the two do not both act on one press */
    document.addEventListener('keydown', onKey, true)
    return () => document.removeEventListener('keydown', onKey, true)
  }, [open, close])

  if (!open) return null

  return (
    <div className="enq" role="presentation">
      {/* A real button under the panel rather than a click handler on the
          backdrop div: a div that closes on click is invisible to anyone not
          using a pfointer, and it swallows the drag that ends outside the panel
          when someone is selecting text inside it. */}
      <button
        type="button"
        className="enq__scrim"
        aria-label="Close the enquiry form"
        tabIndex={-1}
        onClick={close}
      />

      <div
        className="enq__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="enq-title"
        ref={panel}
        /* lockScroll stops Lenis, and a stopped Lenis still takes every wheel
           and touch event and cancels it — including the ones meant for this
           panel's own overflow. This tells it to leave the panel's alone. */
        data-lenis-prevent
      >
        <button type="button" className="enq__x" onClick={close} aria-label="Close">
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M4 4l8 8M12 4l-8 8" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>

        <div className="enq__head">
          <h2 className="enq__title display" id="enq-title" tabIndex={-1} data-autofocus>
            {ENQUIRY.heading}
          </h2>
          <p className="enq__sub">{ENQUIRY.sub}</p>
        </div>

        <div className="enq__body">
          {/* first in the DOM — see the note at the top of this file */}
          <div className="enq__reach">
            <ReachOut phrase={phrase} heading="Or reach us directly" as="p" />
          </div>
          <div className="enq__formPane">
            <EnquiryForm topic={topic} phrase={phrase} onDone={close} />
          </div>
        </div>
      </div>
    </div>
  )
}
