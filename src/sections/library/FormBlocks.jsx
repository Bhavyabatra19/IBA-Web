/**
 * The parts the Library's forms are built from.
 *
 * Separate from ServiceBlocks because these are inputs, not layout: a text
 * field, a select, a checkbox, a multi-select and the shell that holds them.
 * The `.field` class they wear is the site's existing one, already used by the
 * auth modal, so a form on a page and a form in the modal look the same.
 *
 * ⚠ None of these submit anywhere. See lib/previewSession.js.
 */

import { useId, useState } from 'react'
import { Go } from '../service/ServiceBlocks'

/* ------------------------------------------------------------------ */
/* The shell                                                           */
/* ------------------------------------------------------------------ */

/**
 * A form page: a narrow column on a dark band, with the heading above it.
 *
 * Its own layout rather than a ServicePage, because a form is a task. The
 * long scrolled hero a content page opens with puts the first field below the
 * fold, and everything a reader needs in order to fill it in is the form.
 */
export function FormPage({ eyebrow, title, sub, children, aside }) {
  return (
    <section className="section band band--dark form__page">
      <div className="wrap form__wrap">
        <div className="form__main">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="h2 display form__title">{title}</h1>
          {sub && <p className="form__sub">{sub}</p>}
          {children}
        </div>
        {aside && <div className="form__aside">{aside}</div>}
      </div>
    </section>
  )
}

/**
 * The honest submit.
 *
 * Every form on the site says the same thing when there is no endpoint behind
 * it, in one place, so none of them can start faking a success state on its own.
 * `role="status"` so a screen reader is told without the focus moving.
 */
export function FormNotice({ children }) {
  return (
    <p className="form__notice" role="status">
      {children}
    </p>
  )
}

/* ------------------------------------------------------------------ */
/* Inputs                                                              */
/* ------------------------------------------------------------------ */

export function Text({ label, name, type = 'text', hint, required, ...rest }) {
  const id = useId()
  return (
    <label className="field" htmlFor={id}>
      <span>
        {label}
        {!required && <em className="field__opt">Optional</em>}
      </span>
      <input id={id} name={name} type={type} required={required} {...rest} />
      {hint && <small className="field__hint">{hint}</small>}
    </label>
  )
}

export function Select({ label, name, options, required, placeholder = 'Select one' }) {
  const id = useId()
  return (
    <label className="field" htmlFor={id}>
      <span>
        {label}
        {!required && <em className="field__opt">Optional</em>}
      </span>
      <div className="field__select">
        <select id={id} name={name} required={required} defaultValue="">
          {/* An empty default rather than a pre-picked first option: "Student"
              selected by default is an answer the reader never gave. */}
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => {
            const value = typeof o === 'string' ? o : o.code
            const text = typeof o === 'string' ? o : o.label
            return (
              <option key={value} value={value}>
                {text}
              </option>
            )
          })}
        </select>
        <svg viewBox="0 0 10 6" aria-hidden="true">
          <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </div>
    </label>
  )
}

export function Check({ label, name, required, defaultChecked }) {
  const id = useId()
  /* The consent label contains the Terms and Privacy links, and a click on a
     link inside a label toggles the box on the way past. Swallow that one case
     rather than moving the links out of the sentence they belong in. */
  const onClick = (e) => {
    if (e.target.closest('a')) e.preventDefault()
  }
  return (
    <div className="check">
      <input
        id={id}
        type="checkbox"
        name={name}
        required={required}
        defaultChecked={defaultChecked}
      />
      <label htmlFor={id} onClick={onClick}>
        {label}
      </label>
    </div>
  )
}

/**
 * The interests multi-select, as toggle chips.
 *
 * A native multiple-select needs ctrl-click to pick a second option, which most
 * readers never discover — so six things you can tap are six buttons. It is a
 * real fieldset with real checkboxes underneath, so it submits and reads to a
 * screen reader like the checkbox group it is.
 */
export function Multi({ legend, name, options, hint }) {
  const [picked, setPicked] = useState([])
  const toggle = (o) =>
    setPicked((p) => (p.includes(o) ? p.filter((x) => x !== o) : [...p, o]))

  return (
    <fieldset className="multi">
      <legend>
        {legend}
        <em className="field__opt">Optional</em>
      </legend>
      {hint && <small className="field__hint">{hint}</small>}
      <ul>
        {options.map((o) => {
          const on = picked.includes(o)
          return (
            <li key={o}>
              <label data-on={on ? '' : undefined}>
                <input
                  type="checkbox"
                  name={name}
                  value={o}
                  checked={on}
                  onChange={() => toggle(o)}
                />
                {o}
              </label>
            </li>
          )
        })}
      </ul>
    </fieldset>
  )
}

/**
 * The third-party sign-up buttons.
 *
 * Rendered disabled with the reason on them rather than as live buttons that
 * do nothing — a Google button that silently fails is worse than no button.
 */
export function Federated({ providers }) {
  return (
    <div className="fed">
      <p className="fed__rule">
        <span>or</span>
      </p>
      <div className="fed__row">
        {providers.map((p) => (
          <button key={p} type="button" className="btn btn--ghost" disabled>
            Sign up with {p}
          </button>
        ))}
      </div>
      <small className="field__hint">
        Not connected yet — use the form above.
      </small>
    </div>
  )
}

/** The line under a form that points at the other one. */
export function FormFoot({ children }) {
  return <p className="form__foot">{children}</p>
}

export { Go }
