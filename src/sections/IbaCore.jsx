/**
 * 3.2 — The IBA Core. Light band.
 *
 * Six dimensions as a bento rather than a six-up grid. The point of the uneven
 * sizes is that they are not decorative: the widest claim gets the tallest
 * card, the two that are inherently wide subjects — a region, a set of
 * seventeen goals — get the wide cells, and the rest sit square. A 3x2 of
 * identical tiles said all six were the same size of claim.
 *
 * Extracted from About.jsx, which otherwise keeps its sections inline. That
 * rule is about a document that reads top to bottom; this is a set-piece with
 * six drawings of its own, and inlining it would bury the page's argument under
 * two hundred lines of SVG.
 *
 * The card language is the home page's What We Do: a drawn panel over the copy,
 * hairline border, the panel lighting as the card arrives. Same site, one
 * vocabulary.
 */

import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger, reducedMotion } from '../lib/scroll'

/* ------------------------------------------------------------------ */
/* Artwork                                                             */
/* ------------------------------------------------------------------ */

/**
 * All six are drawn on the same 200x130 field, then each viewBox is cropped to
 * its own content. That crop is what makes them comparable: the stylesheet
 * sizes every drawing as a percentage of its panel's height, and a drawing left
 * floating in the uncropped field would come out visibly smaller than its
 * neighbours for no reason a reader could see.
 *
 * `currentColor` is the card's own ink — near-black on the plain cards, white
 * on the red ones — so every neutral is an alpha of it. The one literal colour
 * is `.core__accent`, which flips the same way. Nothing is filled with an
 * opaque white, which is what lets a single drawing sit correctly on either
 * ground rather than needing a red variant of itself.
 *
 * Weight is carried by three classes rather than by a stroke-opacity on each
 * shape — l1 is the subject, l2 the structure around it, l3 the faintest
 * scaffolding. The tiers are CSS variables, so the red cards can lift all three
 * at once: white at 0.1 on red is invisible, and hand-tuning forty opacity
 * attributes for two grounds is how a drawing ends up only working on one.
 */

/** The seventeen goals, as a ring of segments. */
const SDG_SEGMENTS = Array.from({ length: 17 }, (_, i) => {
  const R = 40
  const pt = (deg) => {
    const a = ((deg - 90) * Math.PI) / 180
    return [(100 + Math.cos(a) * R).toFixed(1), (65 + Math.sin(a) * R).toFixed(1)]
  }
  /* 3.5deg of air at each end, so the ring reads as seventeen things rather
     than as one circle with hairlines drawn over it */
  const [x0, y0] = pt((i / 17) * 360 + 3.5)
  const [x1, y1] = pt(((i + 1) / 17) * 360 - 3.5)
  return { d: `M${x0} ${y0}A${R} ${R} 0 0 1 ${x1} ${y1}`, on: i % 3 === 0 }
})

/** Sixteen verticals, as a 4x4 field. */
const SECTOR_TILES = Array.from({ length: 16 }, (_, i) => ({
  x: 58 + (i % 4) * 23,
  y: 27 + Math.floor(i / 4) * 23,
  on: [1, 6, 11].includes(i),
}))

const ART = {
  /* One centre, rings of members around it, and the connections that make it a
     network rather than a directory. */
  ecosystem: (
    <svg viewBox="38 3 131 127" fill="none" aria-hidden="true">
      <circle className="core__l3" cx="100" cy="65" r="24" />
      <circle className="core__l3" cx="100" cy="65" r="41" />
      <circle className="core__l3" cx="100" cy="65" r="58" />
      <path
        className="core__l2"
        d="M100 65 78 47M100 65 130 44M100 65 62 84M100 65 143 88M100 65 101 121M100 65 46 60M100 65 161 50"
      />
      <circle className="core__l1" cx="78" cy="47" r="6.5" />
      <circle className="core__l1" cx="130" cy="44" r="6.5" />
      <circle className="core__l1" cx="62" cy="84" r="6.5" />
      <circle className="core__l1" cx="143" cy="88" r="6.5" />
      <circle className="core__l2" cx="101" cy="121" r="4.5" />
      <circle className="core__l2" cx="46" cy="60" r="4.5" />
      <circle className="core__l2" cx="161" cy="50" r="4.5" />
      <circle className="core__accent" cx="100" cy="65" r="11" />
    </svg>
  ),

  /* Two regions on one sphere, and the corridor that is the actual subject. */
  region: (
    <svg viewBox="50 15 100 100" fill="none" aria-hidden="true">
      <circle className="core__l1" cx="100" cy="65" r="46" />
      <path className="core__l3" d="M57 50h86M54 65h92M57 80h86" />
      <path
        className="core__l3"
        d="M100 19c-15 12-15 80 0 92M100 19c15 12 15 80 0 92M100 19v92"
      />
      <path
        d="M76 76c9-13 23-15 36-8"
        className="core__accentStroke"
        strokeWidth="1.8"
        strokeDasharray="3 4"
      />
      <circle cx="76" cy="76" r="11" className="core__accentStroke" strokeOpacity=".4" />
      <circle cx="112" cy="68" r="11" className="core__accentStroke" strokeOpacity=".4" />
      <circle cx="76" cy="76" r="5" className="core__accent" />
      <circle cx="112" cy="68" r="5" className="core__accent" />
    </svg>
  ),

  /* A framework with one clause settled and sealed — advocacy is the work of
     closing them one at a time. */
  policy: (
    <svg viewBox="51 11 98 108" fill="none" aria-hidden="true">
      <rect className="core__l1" x="56" y="16" width="88" height="98" rx="9" />
      <path
        className="core__l2"
        d="M71 38h46M71 51h58M71 64h40"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <path d="M71 77h28" className="core__accentStroke" strokeWidth="3.4" strokeLinecap="round" />
      <circle cx="126" cy="92" r="15" className="core__accent" />
      <path
        d="M120 92.2l4.4 4.4 8.1-8.6"
        className="core__onAccent"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  /* Capacity added course by course, each one standing on the last. */
  resource: (
    <svg viewBox="42 8 121 104" fill="none" aria-hidden="true">
      <path className="core__l2" d="M46 108h108" />
      <rect className="core__l1" x="54" y="82" width="21" height="26" rx="4" />
      <rect className="core__l1" x="82" y="65" width="21" height="43" rx="4" />
      <rect className="core__l1" x="110" y="48" width="21" height="60" rx="4" />
      <rect className="core__accent" x="138" y="31" width="21" height="77" rx="4" />
      <path
        d="M64.5 72v-9M92.5 55v-9M120.5 38v-9M148.5 21v-9"
        className="core__accentStroke"
        strokeWidth="2"
        strokeLinecap="round"
        strokeOpacity=".55"
      />
    </svg>
  ),

  /* Seventeen goals as a ring, anchored at the centre — which is what Tech Zero
     is in the sentence under it. */
  sdg: (
    <svg viewBox="52 17 96 96" fill="none" aria-hidden="true">
      {SDG_SEGMENTS.map((s, i) => (
        <path
          key={i}
          d={s.d}
          className={s.on ? 'core__accentStroke' : 'core__l1'}
          strokeWidth="7"
        />
      ))}
      <circle className="core__l2" cx="100" cy="65" r="17" />
      <circle className="core__accent" cx="100" cy="65" r="6" />
    </svg>
  ),

  /* Sixteen verticals, held as a field rather than a list — the claim is
     breadth, and a list of sixteen names is not readable at this size. */
  sectors: (
    <svg viewBox="54 23 94 94" fill="none" aria-hidden="true">
      {SECTOR_TILES.map((t, i) => (
        <rect
          key={i}
          className={t.on ? 'core__accent' : 'core__l1'}
          x={t.x}
          y={t.y}
          width="17"
          height="17"
          rx="5"
        />
      ))}
    </svg>
  ),
}

/* ------------------------------------------------------------------ */
/* The six                                                             */
/* ------------------------------------------------------------------ */

/**
 * `hot` marks the red cards. Alternating them is the brief; doing it from a
 * flag rather than :nth-child means the pattern survives a reorder.
 *
 * `cell` is the bento placement. Everything else auto-flows into the gaps, so
 * only the three cards that break the grid have to say anything about it.
 */
const CORE = [
  {
    hot: true,
    cell: 'tall',
    art: ART.ecosystem,
    name: 'Largest Industry Ecosystem',
    body: 'The most extensive blockchain industry network across Asia and Africa.',
  },
  {
    cell: 'wide-top',
    art: ART.region,
    name: 'Asia & MENA Focused',
    body: 'Deep regional expertise and on-ground presence across emerging markets.',
  },
  {
    art: ART.policy,
    name: 'Policy, Advocacy & Standards',
    body: 'Shaping regulatory frameworks and global blockchain standards.',
  },
  {
    hot: true,
    art: ART.resource,
    name: 'Resource Building',
    body: 'Capacity building, talent development and knowledge transfer at scale.',
  },
  {
    hot: true,
    cell: 'wide-bottom',
    art: ART.sdg,
    name: 'SDG Aligned',
    body: 'Every initiative mapped to the UN Sustainable Development Goals, anchored by Tech Zero.',
  },
  {
    art: ART.sectors,
    name: 'Sectoral Expertise',
    body: 'Specialized knowledge across 16+ high-impact industry verticals.',
  },
]

/* ================================================================== */

export default function IbaCore() {
  const root = useRef(null)

  /* Only the panel glow. The headline and the cards themselves are revealed by
     About's own pass over every section, and running a second one here would
     animate the same nodes twice. */
  useLayoutEffect(() => {
    const el = root.current
    const ctx = gsap.context(() => {
      if (reducedMotion()) return
      gsap.utils.toArray('.core__card', el).forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: 'top 88%',
          once: true,
          onEnter: () => gsap.delayedCall(i * 0.09, () => card.classList.add('is-in')),
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="section band band--light" ref={root} id="the-iba-core">
      <div className="wrap">
        <div className="ab__head">
          <p className="eyebrow" data-rise>The IBA Core</p>
          <h2 className="h2 display" data-clip>
            <span className="line">
              <span className="line__inner">Six Dimensions That</span>
            </span>
            <span className="line">
              <span className="line__inner">
                Define Our <em>Leadership</em>
              </span>
            </span>
          </h2>
        </div>

        <ul className="core__grid">
          {CORE.map((c, i) => (
            <li
              className="core__card"
              key={c.name}
              data-cell={c.cell}
              data-hot={c.hot ? '' : undefined}
              data-rise
            >
              <div className="core__art">
                <span className="core__n">{String(i + 1).padStart(2, '0')}</span>
                {c.art}
              </div>
              <div className="core__meta">
                <h3 className="core__name">{c.name}</h3>
                <p className="core__body">{c.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
