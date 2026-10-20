/**
 * The page kit — the parts every inner page is built from, in the home page's
 * theme: hero-width rounded panels on the light grey ground, the gradient
 * eyebrow, Questrial headings, square cards — see brandbook.css.
 *
 * Pages hand these components content and nothing else, so the theme lives in
 * one place (the `.pk` block in styles.css) and a page file reads as its copy.
 */

import { useLayoutEffect, useRef, useState } from 'react'
import { gsap, revealRise, reducedMotion, buildCounters } from '../lib/scroll'
import { Go } from '../sections/service/ServiceBlocks'
import { CONTACT } from '../nav'

/* the block mark every eyebrow carries */
const Block = () => (
  <svg className="hero__kicker-icon" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2.5 20.5 7v10L12 21.5 3.5 17V7L12 2.5Z" />
    <path d="M3.5 7 12 11.5 20.5 7M12 11.5v10" />
  </svg>
)

/** The eyebrow pill. `dark` for use on a dark panel, light otherwise. */
export function Eyebrow({ children, dark = false }) {
  return (
    <p className={`hero__kicker${dark ? '' : ' wd__eyebrow'} pk-eyebrow`} data-rise>
      <Block />
      {children}
    </p>
  )
}

/** Fades every [data-rise] in `ref` up as it scrolls into view. */
function useRise(ref) {
  useLayoutEffect(() => {
    const el = ref.current
    if (!el || reducedMotion()) return
    const ctx = gsap.context(() => {
      revealRise(el, { trigger: el, start: 'top 85%', stagger: 0.07 })
      buildCounters(el)
    }, ref)
    return () => ctx.revert()
  }, [ref])
}

/** A pill button. Internal hrefs go through the router; `enquiry` opens the
    site's enquiry form, as every other data-enquiry control does. */
export function Btn({ href = '#', enquiry, variant = 'primary', children }) {
  const cls = `pk-btn pk-btn--${variant}`
  if (enquiry !== undefined)
    return (
      <a className={cls} href="/connect" data-enquiry={enquiry}>
        {children}
      </a>
    )
  if (/^(https?:|mailto:|tel:)/.test(href))
    return (
      <a className={cls} href={href} {...(href.startsWith('http') ? { target: '_blank', rel: 'noreferrer noopener' } : {})}>
        {children}
      </a>
    )
  return (
    <Go className={cls} href={href}>
      {children}
    </Go>
  )
}

/** The page's opening panel: dark, hero width, with the red beam. */
export function PageHero({ eyebrow, title, lede, actions, aside, id }) {
  const ref = useRef(null)
  useRise(ref)
  return (
    <section className="pk-hero band band--light band--own" ref={ref} id={id}>
      <div className={`pk-hero__panel${aside ? ' pk-hero__panel--split' : ''}`}>
        <span className="pk-hero__beam" aria-hidden="true" />
        <div className="pk-hero__copy">
          {eyebrow && <Eyebrow dark>{eyebrow}</Eyebrow>}
          <h1 className="pk-hero__title" data-rise>
            {title}
          </h1>
          {lede && (
            <div className="pk-hero__lede" data-rise>
              {[].concat(lede).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}
          {actions && (
            <div className="pk-actions" data-rise>
              {actions}
            </div>
          )}
        </div>
        {aside && (
          <div className="pk-hero__aside" data-rise>
            {aside}
          </div>
        )}
      </div>
    </section>
  )
}

/**
 * A band of content. `tone`:
 *   plain  on the page's own grey
 *   card   inside a white rounded panel
 *   dark   inside a dark rounded panel, like the home page's impact band
 *   red    inside an IBA Red panel: white type, white cards and buttons
 */
export function Section({ id, eyebrow, title, lede, tone = 'plain', center = false, children }) {
  const ref = useRef(null)
  useRise(ref)
  return (
    <section className={`pk-sec pk-sec--${tone} band band--light band--own`} id={id} ref={ref}>
      <div className={`pk-sec__panel${center ? ' pk-sec__panel--center' : ''}`}>
        {(eyebrow || title || lede) && (
          <header className="pk-head">
            {eyebrow && <Eyebrow dark={tone === 'dark' || tone === 'red'}>{eyebrow}</Eyebrow>}
            {title && (
              <h2 className="pk-head__title" data-rise>
                {title}
              </h2>
            )}
            {lede &&
              [].concat(lede).map((p, i) => (
                <p className="pk-head__lede" data-rise key={i}>
                  {p}
                </p>
              ))}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}

/** A sub-heading inside a section. */
export const SubHead = ({ children, lede }) => (
  <div className="pk-sub" data-rise>
    <h3>{children}</h3>
    {lede && <p>{lede}</p>}
  </div>
)

/**
 * A grid of cards: { num?, icon?, tag?, title, text?, focus?, outcome?, list?,
 * href?, cta? }. A card with an href is a link from edge to edge.
 */
export function Cards({ items, cols = 3 }) {
  return (
    <div className={`pk-cards pk-cards--${cols}`}>
      {items.map((c) => (
        <article className={`pk-card${c.href ? ' pk-card--link' : ''}`} key={c.title} data-rise>
          {(c.num || c.icon || c.tag) && (
            <div className="pk-card__top">
              {c.icon && (
                <span className="pk-card__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">{c.icon}</svg>
                </span>
              )}
              {c.num && <span className="pk-card__num">{c.num}</span>}
              {c.tag && <span className="wd__tag">{c.tag}</span>}
            </div>
          )}
          <h3 className="pk-card__title">
            {c.href ? (
              <CardLink href={c.href}>{c.title}</CardLink>
            ) : (
              c.title
            )}
          </h3>
          {c.sub && <p className="pk-card__sub">{c.sub}</p>}
          {c.text && <p className="pk-card__text">{c.text}</p>}
          {c.focus && (
            <p className="pk-card__text">
              <strong>Focus:</strong> {c.focus}
            </p>
          )}
          {c.outcome && (
            <p className="pk-card__text">
              <strong>Outcome:</strong> {c.outcome}
            </p>
          )}
          {c.list && <Bullets items={c.list} />}
          {c.cta && (
            <span className="pk-card__cta" aria-hidden={c.href ? true : undefined}>
              {c.cta} <span>→</span>
            </span>
          )}
        </article>
      ))}
    </div>
  )
}

function CardLink({ href, children }) {
  const external = /^(https?:|mailto:|tel:)/.test(href)
  return external ? (
    <a className="pk-card__link" href={href} {...(href.startsWith('http') ? { target: '_blank', rel: 'noreferrer noopener' } : {})}>
      {children}
    </a>
  ) : (
    <Go className="pk-card__link" href={href}>
      {children}
    </Go>
  )
}

/** Stat tiles: { value, label, count?, prefix?, suffix?, decimals? } */
export function Stats({ items, dark = false }) {
  return (
    <ul className={`pk-stats${dark ? ' pk-stats--dark' : ''}`}>
      {items.map((s) => (
        <li className="pk-stat" key={s.label} data-rise>
          <strong
            {...(s.count != null
              ? { 'data-count': s.count, 'data-prefix': s.prefix || '', 'data-suffix': s.suffix || '' }
              : {})}
          >
            {s.value}
          </strong>
          <span>{s.label}</span>
        </li>
      ))}
    </ul>
  )
}

/** Running text. The first paragraph can be set large as a lead. */
export function Prose({ lead, paras = [] }) {
  return (
    <div className="pk-prose">
      {lead && (
        <p className="pk-prose__lead" data-rise>
          {lead}
        </p>
      )}
      {paras.map((p, i) => (
        <p key={i} data-rise>
          {p}
        </p>
      ))}
    </div>
  )
}

export const Bullets = ({ items }) => (
  <ul className="pk-bullets">
    {items.map((b) => (
      <li key={b}>{b}</li>
    ))}
  </ul>
)

/** A large pull quote with its attribution. */
export const Quote = ({ children, by, photo }) => (
  <figure className="pk-quote" data-rise>
    <span className="pk-quote__mark" aria-hidden="true">
      “
    </span>
    <blockquote>{children}</blockquote>
    {by && (
      <figcaption className={photo ? 'pk-quote__by' : undefined}>
        {photo && <img className="pk-quote__photo" src={photo} alt="" width="56" height="56" loading="lazy" />}
        {by}
      </figcaption>
    )}
  </figure>
)

/**
 * A form.
 *
 * ⚠ THERE IS NO BACKEND. Rather than pretend to send, an enquiry form opens
 * the reader's email app with every field already written into a message to
 * IBA — `subject` names the form. A form that cannot work that way (sign-up,
 * log-in) passes `notice` instead, which is shown on submit and says plainly
 * that it is not live yet.
 *
 * fields: { name, label, type?, options?, required?, wide?, hint?, ...input }
 *
 * Anything else on a field (placeholder, pattern, title, accept, inputMode,
 * autoComplete) goes straight onto the input. A `file` field cannot travel in
 * a mailto link, so the message names the file and the confirmation asks the
 * reader to attach it before sending.
 */
export function Form({ fields, submit, subject, consent, notice }) {
  const [status, setStatus] = useState(null)

  const onSubmit = (e) => {
    e.preventDefault()
    if (notice) {
      setStatus(notice)
      return
    }
    const data = new FormData(e.currentTarget)
    const files = fields
      .filter((f) => f.type === 'file')
      .map((f) => data.get(f.name)?.name)
      .filter(Boolean)
    const body = fields
      .filter((f) => f.type !== 'password')
      .map((f) => {
        const v = data.get(f.name)
        if (f.type === 'file') return `${f.label}: ${v?.name ? `${v.name} (attached)` : '—'}`
        return `${f.label}: ${v || '—'}`
      })
      .join('\n')
    window.location.href =
      `mailto:${CONTACT.email.label}?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`
    setStatus(
      files.length
        ? `Your email app has opened with these details filled in — attach ${files.join(', ')} to the email, press send, and the IBA team will reply within two working days.`
        : 'Your email app has opened with these details filled in — press send and the IBA team will reply within two working days.',
    )
  }

  return (
    <form className="pk-form" onSubmit={onSubmit} data-rise>
      <div className="pk-form__grid">
        {fields.map(({ hint, options, wide, ...f }) => {
          /* whatever is left after the Form's own keys goes on the input */
          const { name, label, type, required, ...input } = f
          return (
            <label className={`pk-field${wide || type === 'textarea' || type === 'file' ? ' pk-field--wide' : ''}`} key={name}>
              <span>
                {label}
                {required !== false && <i aria-hidden="true"> *</i>}
              </span>
              {type === 'select' ? (
                <select name={name} required={required !== false} defaultValue="">
                  <option value="" disabled>
                    Select one
                  </option>
                  {options.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              ) : type === 'textarea' ? (
                <textarea name={name} rows="4" required={required !== false} />
              ) : (
                <input name={name} type={type || 'text'} required={required !== false} {...input} />
              )}
              {hint && <small className="pk-field__hint">{hint}</small>}
            </label>
          )
        })}
      </div>
      {[].concat(consent || []).map((c, i) => (
        <label className="pk-check" key={c}>
          <input type="checkbox" required={i === 0} /> <span>{c}</span>
        </label>
      ))}
      <button className="pk-btn pk-btn--primary" type="submit">
        {submit}
      </button>
      {status && (
        <p className="pk-form__status" role="status">
          {status}
        </p>
      )}
    </form>
  )
}
