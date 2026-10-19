/**
 * 2.8 — Closing CTA band. Dark.
 *
 * The last thing on the page is the ask, so the ask is the whole layout: the
 * claim, one line under it, the action, and then the three ways to actually
 * reach IBA as cards rather than a row of links a reader has to squint at.
 *
 * This band used to claim the WebGL stage — the object returned here, held open
 * behind the type with a slow drift. It no longer does; the stage is live in
 * the hero alone. What is left in its place is a static field, warm in the same
 * way the hero's is, so the page still closes on the ground it started from.
 *
 * Contact details come from nav.js, which the footer also reads. A phone number
 * that is right in the footer and stale here is the exact failure that having
 * one source prevents.
 */

import { useLayoutEffect, useRef } from 'react'
import { gsap, revealLines, revealRise, reducedMotion } from '../lib/scroll'
import { channels } from '../components/ReachOut'
import { contextFor } from '../enquiry'

/**
 * One cube, drawn once around the origin so every placement is a
 * translate/rotate/scale.
 *
 * The faces are near-black on a near-black band, which sounds like it should
 * be invisible and is the whole point: what draws the object is the lit rim,
 * not the fill. Blur the rim, keep the faces dark, and the form arrives the
 * way it does on a rendered metal block.
 */
const Cube = ({ x, y, s, r = 0, o = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={o}>
    <path d="M0-30 30-15 0 0-30-15Z" fill="url(#cbTop)" />
    <path d="M-30-15 0 0V30l-30-15Z" fill="url(#cbLeft)" />
    <path d="M30-15 0 0v30l30-15Z" fill="url(#cbRight)" />

    {/* a sheen laid across the top face, so it reads polished rather than matte */}
    <path d="M0-30 30-15 12-6-18-21Z" fill="url(#cbSheen)" opacity=".5" />

    <g filter="url(#cbGlow)">
      <path
        d="M0-30 30-15 0 0-30-15Z"
        stroke="#ff5f49"
        strokeOpacity=".95"
        strokeWidth="1.35"
        fill="none"
      />
      <path d="M-30-15v30M30-15v30M0 0v30" stroke="#ff4a50" strokeOpacity=".6" strokeWidth="1.1" />
      {/* the underside catches bounce off the floor */}
      <path d="M-30 15 0 30 30 15" stroke="#ff5f49" strokeOpacity=".45" strokeWidth="1.1" fill="none" />
    </g>

    {/* the hard specular on the one edge facing the light */}
    <path d="M-30-15 0-30" stroke="#ffd9d0" strokeOpacity=".55" strokeWidth="1.2" />
  </g>
)

/* Low and to the edges, out of the band the contact list runs down. They were
   a right-hand cluster when the right half was theirs; now that it carries the
   ways to reach IBA, the blocks fall to the floor and the frame's edges — where
   they still set the scene without sitting behind a phone number.

   Size and opacity move together, so the small faint ones sit back and the
   large solid ones come forward; that is the only depth cue a flat drawing
   gets. Several run off the frame, which is what stops the group reading as an
   arrangement placed on the page rather than a field continuing past it. */
const CUBES = [
  { x: 1006, y: 622, s: 0.78, r: -16, o: 0.32 },
  { x: 1398, y: 168, s: 1.25, r: 16, o: 0.42 },
  { x: 1472, y: 452, s: 1.95, r: -6, o: 0.62 },
  { x: 916, y: 790, s: 1.15, r: 20, o: 0.45 },
  { x: 1148, y: 726, s: 1.75, r: 10, o: 0.8 },
  { x: 1372, y: 782, s: 2.15, r: -12, o: 0.9 },
]

const CUBE_FIELD = (
  <svg viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true">
    <defs>
      {/* Near-black, with the red arriving as a reflection at the lit corner and
          falling away fast. The rim, not the fill, carries the form. */}
      <linearGradient id="cbTop" x1="-30" y1="-30" x2="24" y2="4" gradientUnits="userSpaceOnUse">
        <stop stopColor="#5e181c" />
        <stop offset=".45" stopColor="#210b0d" />
        <stop offset="1" stopColor="#0b0506" />
      </linearGradient>
      <linearGradient id="cbLeft" x1="-30" y1="-12" x2="4" y2="30" gradientUnits="userSpaceOnUse">
        <stop stopColor="#370f12" />
        <stop offset=".55" stopColor="#150708" />
        <stop offset="1" stopColor="#070304" />
      </linearGradient>
      <linearGradient id="cbRight" x1="30" y1="-12" x2="0" y2="30" gradientUnits="userSpaceOnUse">
        <stop stopColor="#26090c" />
        <stop offset="1" stopColor="#050203" />
      </linearGradient>
      <linearGradient id="cbSheen" x1="-18" y1="-24" x2="24" y2="-6" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ff8a76" stopOpacity=".55" />
        <stop offset="1" stopColor="#ff8a76" stopOpacity="0" />
      </linearGradient>
      {/* a gradient, not a flat fill — a solid ellipse shows its own outline */}
      <radialGradient id="cbPool">
        <stop stopColor="#d71920" stopOpacity=".3" />
        <stop offset=".5" stopColor="#d71920" stopOpacity=".13" />
        <stop offset="1" stopColor="#d71920" stopOpacity="0" />
      </radialGradient>

      <filter id="cbGlow" x="-70%" y="-70%" width="240%" height="240%">
        <feGaussianBlur stdDeviation="3.2" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      {/* the floor fades out as it recedes, rather than stopping at an edge */}
      <linearGradient id="cbFloorFade" x1="1150" y1="300" x2="900" y2="820" gradientUnits="userSpaceOnUse">
        <stop stopColor="#000" />
        <stop offset=".4" stopColor="#fff" />
        <stop offset="1" stopColor="#fff" />
      </linearGradient>
      <mask id="cbFloorMask">
        <rect x="700" y="260" width="900" height="560" fill="url(#cbFloorFade)" />
      </mask>
    </defs>

    {/* the pool the grid sits in — the light the whole cluster is lit by */}
    <ellipse cx="1230" cy="770" rx="520" ry="290" fill="url(#cbPool)" />

    {/* A perspective floor under the cluster, converging on one vanishing point.
        Row spacing grows by a square law, so the rows read as receding. */}
    <g mask="url(#cbFloorMask)" opacity=".62" stroke="#ff5f49">
      {Array.from({ length: 17 }, (_, i) => (
        <path key={`v${i}`} d={`M1150 260 ${-260 + i * 165} 830`} strokeOpacity=".32" strokeWidth="1" />
      ))}
      {Array.from({ length: 9 }, (_, i) => {
        const y = 260 + 570 * Math.pow((i + 1) / 9, 2.3)
        return <path key={`h${i}`} d={`M-100 ${y}H1560`} strokeOpacity=".28" strokeWidth="1" />
      })}
    </g>

    {/* dust in the light */}
    {[
      [905, 214, 2.2, 0.5], [1012, 596, 1.6, 0.35], [1338, 268, 1.9, 0.4],
      [828, 690, 2.4, 0.3], [1244, 470, 1.5, 0.45], [1396, 612, 2, 0.28],
    ].map(([px, py, pr, po]) => (
      <circle key={`${px}-${py}`} cx={px} cy={py} r={pr} fill="#ff4a50" opacity={po} />
    ))}

    {CUBES.map((c) => (
      <Cube key={`${c.x}-${c.y}`} {...c} />
    ))}
  </svg>
)

export default function Closing() {
  const root = useRef(null)
  /* The WhatsApp opener says what this page is about — see PAGE_CONTEXT. Read
     at render rather than passed in: this band is rendered by ServicePage for
     ten pages that would otherwise each have to tell it where they are. */
  const { phrase } = contextFor(window.location.pathname)
  const WAYS = channels(phrase)

  useLayoutEffect(() => {
    const el = root.current
    const ctx = gsap.context(() => {
      if (reducedMotion()) return
      revealLines(el, { trigger: el })
      revealRise(el, { trigger: el })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="close section band band--dark" ref={root} id="connect">
      <div className="close__cubes" aria-hidden="true">{CUBE_FIELD}</div>

      {/* .wrap owns the page gutter; the measure lives on a child, or .wrap's
          auto margins would centre the column it is meant to hold left */}
      <div className="wrap close__grid">
        <div className="close__inner">
          <p className="eyebrow" data-rise>Get In Touch</p>
          {/* the column step: this head now shares its row with the cubes, and
              at the full step "Rewriting the Rules." wraps inside its own
              .line — which is the one thing the clip-reveal cannot take */}
          <h2 className="h2 h2--col display" data-clip>
            <span className="line">
              <span className="line__inner">IBA — Connecting</span>
            </span>
            <span className="line">
              <span className="line__inner">Economies.</span>
            </span>
            <span className="line">
              <span className="line__inner">
                <em>Rewriting the Rules.</em>
              </span>
            </span>
          </h2>
          <p className="close__sub" data-rise>
            Connecting Economies. Block by Block. Talk to our team about corridors,
            consulting or Red Club membership.
          </p>
          {/* 8.1: the closing-band CTA is one of the enquiry triggers. The href
              is the real page, so it still works with no JS and still opens in a
              tab on a modified click; the delegated listener in Enquiry.jsx
              intercepts the plain one and opens the overlay instead — which is
              the point, since the reader is at the foot of a page they were
              reading and should not lose it. */}
          {/* Black, not primary. Section 06: the Black button is "the button on
              the red CTA band" — a red button on a red ground is not a button,
              and the book's CTA diagram shows exactly this pairing. */}
          <a className="btn btn--black" href="/connect" data-enquiry="" data-rise>
            Connect With Us
          </a>
          {/* the field under the copy, holding the column's foot down against
              the weight of the contact list opposite it */}
          <div className="close__dots" aria-hidden="true" data-rise />
        </div>

        <div className="close__contact">
          <ul className="close__ways" data-rise>
            {WAYS.map((w) => (
              <li key={w.k}>
                <a
                  href={w.href}
                  {...(w.external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                >
                  <span className="close__ico" aria-hidden="true">
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {w.icon}
                    </svg>
                  </span>
                  <span className="close__k">{w.k}</span>
                  <span className="close__v">{w.v}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
