/**
 * 2.7 — Library teaser. Light band.
 *
 * The shelf shown as the thing itself: a window onto the Library, with the four
 * kinds of document in it and the gate along the bottom. These are documents,
 * so showing what is actually on the shelf — and exactly what the account is
 * for — is a stronger reason to make one than a stock image of a screen.
 *
 * And the window is used rather than merely shown: a query types itself into
 * the search field and the rows it lands on light up. What the picture is
 * arguing is that there is something in here worth searching, which a still of
 * a search box asserts and a search happening demonstrates.
 */

import { useLayoutEffect, useRef } from 'react'
import { gsap, revealLines, revealRise, reducedMotion, whileOnScreen } from '../lib/scroll'
import { Go } from './service/ServiceBlocks'

const DOC = (
  <>
    <path d="M4 1.6h5l3.2 3.2V14.4H4z" />
    <path d="M8.9 1.6v3.3h3.3" />
    <path d="M6.2 8.6h4M6.2 11h2.8" />
  </>
)

const PLAY = (
  <>
    <circle cx="8" cy="8" r="6.3" />
    <path d="M6.6 5.4l4.1 2.6-4.1 2.6z" />
  </>
)

const SHELF = [
  { n: '01', label: 'Research & Reports', icon: DOC },
  { n: '02', label: 'Policy Briefs', icon: DOC },
  { n: '03', label: 'Playbooks', icon: DOC },
  { n: '04', label: 'Recorded Sessions & Webinars', icon: PLAY },
]

/** What is in the field when nothing has been typed into it. */
const PLACEHOLDER = 'Search the Library'

/**
 * The four searches the window runs, and the rows each one lands on.
 *
 * `hits` names the rows rather than the query being matched against the labels
 * at runtime: "policy" does not appear in the words "Research & Reports", but a
 * policy search does land there, and a string match would quietly say it does
 * not. These are the four things a reader actually arrives looking for.
 */
const QUERIES = [
  { text: 'tokenization', hits: ['01', '03'] },
  { text: 'policy', hits: ['02'] },
  { text: 'esg', hits: ['01', '02'] },
  { text: 'webinar', hits: ['04'] },
]

/* Per character. Typing is slower than deleting, the way it is at a keyboard. */
const TYPE = 0.058
const ERASE = 0.03
/* after the last character, before the rows answer */
const THINK = 0.4
/* how long the result stands before the field is cleared */
const READ = 1.9

export default function Library() {
  const root = useRef(null)
  const fieldRef = useRef(null)
  const queryRef = useRef(null)
  const rowsRef = useRef(null)

  useLayoutEffect(() => {
    const el = root.current
    /* the observer is not GSAP's to undo, so it is torn down alongside it */
    let stopWatching = () => {}
    const ctx = gsap.context(() => {
      if (reducedMotion()) return
      revealLines(el, { trigger: el })
      revealRise(el, { trigger: el })

      /* ---- the window searching itself ----
         Nothing below this runs under reduced motion, and nothing below it is
         in the markup either: the shelf's resting state is the shelf, and every
         attribute this writes is added by the animation. So the still version
         is not a degraded one — it is the picture the band shipped with. */
      const field = fieldRef.current
      const query = queryRef.current
      const rows = rowsRef.current
      if (!field || !query || !rows) return

      const items = gsap.utils.toArray('li', rows)

      /* Marked on the rows rather than tweened onto them: what a hit looks like
         belongs in the stylesheet with the rest of the shelf, and this way the
         timeline never has to know a colour. */
      const land = (hits) => {
        items.forEach((li) => {
          if (hits.includes(li.dataset.n)) li.dataset.hit = ''
          else delete li.dataset.hit
        })
        /* absent while a query is being typed, so the shelf only dims once
           there is a result to dim it against */
        if (hits.length) rows.dataset.found = ''
        else delete rows.dataset.found
      }

      /* The caret and the entered-text colour are the field's, not the text's —
         they say the box is being typed into, which stays true between one
         query being cleared and the next one starting. */
      field.dataset.typing = ''

      const tl = gsap.timeline({ repeat: -1, paused: true })
      const cursor = { at: 0 }
      const write = (text) => () => {
        const n = Math.round(cursor.at)
        query.textContent = n === 0 ? PLACEHOLDER : text.slice(0, n)
        /* the placeholder is not entered text, and must not be coloured as if
           it were — the one thing the field cannot tell from the text alone */
        if (n === 0) query.dataset.empty = ''
        else delete query.dataset.empty
      }

      QUERIES.forEach(({ text, hits }) => {
        tl.call(() => land([]))
          .fromTo(
            cursor,
            { at: 0 },
            { at: text.length, duration: text.length * TYPE, ease: 'none', onUpdate: write(text) }
          )
          .call(() => land(hits), null, `+=${THINK}`)
          .to(cursor, {
            at: 0,
            duration: text.length * ERASE,
            ease: 'none',
            delay: READ,
            onUpdate: write(text),
          })
      })

      /* Only while the band is on screen. A loop that never stops is a wake-up
         every frame for a picture nobody is looking at.

         Watched rather than measured. This band sits below the hero's
         five-viewport pin, and a ScrollTrigger created before that pin exists
         records a position a pin's worth too high — a gate wrong in that
         direction never opens, and the window never types. See whileOnScreen. */
      stopWatching = whileOnScreen(el, () => tl.play(), () => tl.pause())
    }, root)
    return () => {
      stopWatching()
      ctx.revert()
    }
  }, [])

  return (
    <section className="lib section band band--light" ref={root} id="library">
      <div className="wrap lib__inner">
        <div className="lib__media" data-rise>
          <div className="lib__shot">
            <div className="lib__bar">
              <span className="lib__dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              {/* aria-hidden, so the typing is never announced — it is a
                  picture of a search, and a live region here would read a
                  half-typed word out four times a minute */}
              <span className="lib__search" aria-hidden="true" ref={fieldRef}>
                <span className="lib__q" ref={queryRef}>
                  {PLACEHOLDER}
                </span>
                <i className="lib__caret" />
              </span>
            </div>

            <ul className="lib__rows" ref={rowsRef}>
              {SHELF.map((s) => (
                <li key={s.n} data-n={s.n}>
                  <span className="lib__n">{s.n}</span>
                  <span className="lib__type" aria-hidden="true">
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {s.icon}
                    </svg>
                  </span>
                  <span className="lib__label">{s.label}</span>
                  <span className="lib__go" aria-hidden="true">
                    →
                  </span>
                </li>
              ))}
            </ul>

            {/* the gate, stated on the shelf rather than discovered at the click */}
            <p className="lib__gate">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
                <rect x="3.2" y="7" width="9.6" height="7" rx="2" />
                <path d="M5.6 7V5.2a2.4 2.4 0 014.8 0V7" strokeLinecap="round" />
              </svg>
              Free access — sign in to download
            </p>
          </div>
        </div>

        <div className="lib__head">
          <p className="eyebrow" data-rise>Open Knowledge Base</p>
          <h2 className="h2 h2--col display" data-clip>
            <span className="line">
              <span className="line__inner">Built by practitioners,</span>
            </span>
            <span className="line">
              <span className="line__inner">
                open to the <em>community.</em>
              </span>
            </span>
          </h2>
          <p className="lede" data-rise>
            An open-source knowledge base of articles, videos, research and policy
            briefs, developed by IBA’s industry experts and advisors for the wider
            blockchain community — searchable, categorised and free to every
            registered member.
          </p>
          {/* the band is the teaser; 7.1 is the page it teases */}
          <Go className="btn btn--primary btn--sm" href="/library" data-rise>
            Create Free Account
          </Go>
        </div>
      </div>
    </section>
  )
}
