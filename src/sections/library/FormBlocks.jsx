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

/**
 * The label's second half.
 *
 * Two vocabularies for "you have to fill this in", and the site now uses both
 * in two places. The Library forms mark what is OPTIONAL, which is right when
 * one field in eight is; the enquiry form marks what is REQUIRED with an
 * asterisk, because 8.4 asks for it and because six of its eight are.
 *
 * `mark` picks which. The asterisk is `aria-hidden` and paired with a legend
 * above the form — an asterisk alone is a convention, not an explanation, and
 * a screen reader already has `required` on the input itself.
 */
function Mark({ required, mark }) {
  if (mark === 'required') {
    return required ? (
      <em className="field__req" aria-hidden="true">
        *
      </em>
    ) : null
  }
  return required ? null : <em className="field__opt">Optional</em>
}

/** The line that says what the asterisks mean. */
export function RequiredLegend() {
  return (
    <p className="form__legend">
      <span aria-hidden="true">*</span> Required
    </p>
  )
}

/**
 * The inline error, under the field it belongs to.
 *
 * `role="alert"` rather than a live region on the form: an error appears one at
 * a time, on blur, and belongs to the control the reader has just left.
 */
function Err({ id, children }) {
  return children ? (
    <small className="field__err" id={id} role="alert">
      {children}
    </small>
  ) : null
}

export function Text({ label, name, type = 'text', hint, required, error, mark, ...rest }) {
  const id = useId()
  return (
    <label className="field" htmlFor={id}>
      <span>
        {label}
        <Mark required={required} mark={mark} />
      </span>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-err` : undefined}
        {...rest}
      />
      <Err id={`${id}-err`}>{error}</Err>
      {hint && <small className="field__hint">{hint}</small>}
    </label>
  )
}

/**
 * A choice among three, as radios.
 *
 * A dropdown would hide two of the three options behind a click for no saving
 * in space, and this is the one field on the form that is genuinely optional —
 * so all of it is visible and none of it is pre-selected. "Email" chosen by
 * default is an answer the reader never gave.
 */
export function Radio({ legend, name, options, hint, defaultValue, onChange }) {
  const id = useId()
  return (
    <fieldset className="radio">
      <legend>
        {legend}
        <em className="field__opt">Optional</em>
      </legend>
      {hint && <small className="field__hint">{hint}</small>}
      <div className="radio__row">
        {options.map((o) => (
          <label key={o}>
            <input
              type="radio"
              name={name}
              value={o}
              id={`${id}-${o}`}
              defaultChecked={defaultValue === o}
              onChange={onChange}
            />
            <span>{o}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

/**
 * The field nobody can see and only a bot fills in.
 *
 * Off screen rather than `display:none` or `hidden`: the crude scrapers this
 * catches skip anything the browser reports as unrendered, and a field they
 * skip catches nothing. `tabIndex={-1}` and `aria-hidden` keep it away from
 * everyone reaching the form by keyboard or by screen reader, and
 * `autoComplete="off"` stops a browser helpfully filling it in — which would
 * flag a real person as a bot.
 *
 * It is half the protection. See submitEnquiry for the other half.
 */
export function Honeypot({ name }) {
  return (
    <div className="hp" aria-hidden="true">
      <label htmlFor={`hp-${name}`}>Leave this field empty</label>
      <input id={`hp-${name}`} type="text" name={name} tabIndex={-1} autoComplete="off" />
    </div>
  )
}

/**
 * A free-text answer.
 *
 * The corridor enquiry is the first form on the site to ask an open question,
 * and "what you're looking for" is the field the reply is actually written
 * from — so it is a textarea rather than another single line, and it wears the
 * same `.field` the inputs do.
 */
export function Area({ label, name, hint, required, error, mark, rows = 4, ...rest }) {
  const id = useId()
  return (
    <label className="field" htmlFor={id}>
      <span>
        {label}
        <Mark required={required} mark={mark} />
      </span>
      <textarea
        id={id}
        name={name}
        rows={rows}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-err` : undefined}
        {...rest}
      />
      <Err id={`${id}-err`}>{error}</Err>
      {hint && <small className="field__hint">{hint}</small>}
    </label>
  )
}

/**
 * A file picker in the same field frame as the others: a visible button and
 * the chosen file's name (or "No file chosen"), over a real <input type=file>
 * that keeps keyboard and screen-reader behaviour native.
 */
export function FileField({ label, name, hint, accept, error, required, mark, onPick, ...rest }) {
  const id = useId()
  const [picked, setPicked] = useState('')
  return (
    <div className="field field--file">
      <label htmlFor={id}>
        {label}
        <Mark required={required} mark={mark} />
      </label>
      <div className="file__row">
        <input
          id={id}
          className="file__input"
          type="file"
          name={name}
          accept={accept}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={`${id}-hint${error ? ` ${id}-err` : ''}`}
          onChange={(e) => {
            const f = e.target.files?.[0]
            setPicked(f ? f.name : '')
            onPick?.(f || null)
          }}
          {...rest}
        />
        <label htmlFor={id} className="file__btn" aria-hidden="true">
          Choose file
        </label>
        <span className="file__name" aria-live="polite">
          {picked || 'No file chosen'}
        </span>
      </div>
      <Err id={`${id}-err`}>{error}</Err>
      {hint && (
        <small className="field__hint" id={`${id}-hint`}>
          {hint}
        </small>
      )}
    </div>
  )
}

/**
 * `value`/`onChange` are optional. Every Library form leaves the select
 * uncontrolled; the corridor form drives one from the page, because its
 * secondary call to action is this field set to its fourth option. Passing
 * neither keeps the original behaviour exactly.
 */
export function Select({
  label,
  name,
  options,
  required,
  placeholder = 'Select one',
  value,
  onChange,
  defaultValue = '',
  error,
  mark,
  ...rest
}) {
  const id = useId()
  /* Controlled only when a `value` is actually given. `onChange` is passed
     either way — it was inside this branch once, which silently dropped the
     handler on every uncontrolled select on the site. */
  const bind = value === undefined ? { defaultValue } : { value }
  return (
    <label className="field" htmlFor={id}>
      <span>
        {label}
        <Mark required={required} mark={mark} />
      </span>
      <div className="field__select">
        <select
          id={id}
          name={name}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-err` : undefined}
          onChange={onChange}
          {...bind}
          {...rest}
        >
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
      <Err id={`${id}-err`}>{error}</Err>
    </label>
  )
}

export function Check({ label, name, required, defaultChecked, error, onBlur, onChange }) {
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
        onBlur={onBlur}
        onChange={onChange}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-err` : undefined}
      />
      <label htmlFor={id} onClick={onClick}>
        {label}
        <Err id={`${id}-err`}>{error}</Err>
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
