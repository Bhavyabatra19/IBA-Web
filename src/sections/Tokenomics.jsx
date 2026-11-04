/**
 * 3.5b — When Code Becomes Capital. Sits inside the Impact band, dark.
 *
 * A ring of the disclosed portfolio beside the record it is drawn from, so the
 * shape of the book is readable at a glance and the exact figures are still
 * there to be read.
 *
 * Three decisions worth keeping:
 *
 * 1. ONE hue for every segment. The four projects are nominal — a ramp that ran
 *    darker as the arcs got longer would encode length twice and say nothing the
 *    arc has not already said. The 4px surface gaps separate the segments and the
 *    labels identify them, so colour is free to mean nothing at all.
 * 2. The centre reads DISCLOSED, not "portfolio". The table ends with "And
 *    more.", so a ring presented as the whole book would be a claim the data
 *    does not make. Every share is a share of the total shown.
 * 3. Ring and table are one hover group. Identity is carried by the label, but
 *    a segment and its row lighting together is what makes an arc a project
 *    rather than a wedge.
 */

import { useLayoutEffect, useRef, useState } from 'react'
import { gsap, reducedMotion } from '../lib/scroll'
import { TOKENOMICS, usd } from '../content'

/* ---- geometry, all derived ---- */
const R = 86 // ring radius within the 240 viewBox
const C = 2 * Math.PI * R
const GAP = 5 // arc-px of surface between segments

const TOTAL = TOKENOMICS.reduce((n, t) => n + t.usdM, 0)

/** Ranked, so the ring reads big-to-small clockwise from the top. */
const RANKED = [...TOKENOMICS].sort((a, b) => b.usdM - a.usdM)

/**
 * How far out the labels sit, in % of the square the ring is centred in.
 *
 * Paired with `.tk__ring`'s inset and `.tk__label`'s width in the stylesheet:
 * the ring's outer edge lands at 26.1% of the box, and a 20%-wide label centred
 * at 38% reaches inward to 28%. Move any of the three and the labels start
 * sitting on the arcs.
 */
const LABEL_R = 38

let acc = 0
const SEGMENTS = RANKED.map((t) => {
  const frac = t.usdM / TOTAL
  const start = acc
  acc += frac
  const rad = (((start + frac / 2) * 360 - 90) * Math.PI) / 180
  return {
    ...t,
    /* one decimal: 47.6 and 25.2 are meaningfully different, 48 and 25 lose it */
    pct: Math.round(frac * 1000) / 10,
    dash: frac * C - GAP,
    offset: -start * C,
    lx: 50 + Math.cos(rad) * LABEL_R,
    ly: 50 + Math.sin(rad) * LABEL_R,
  }
})

export default function Tokenomics() {
  const root = useRef(null)
  const [active, setActive] = useState(null)

  useLayoutEffect(() => {
    const el = root.current
    const ctx = gsap.context(() => {
      if (reducedMotion()) return
      /* The arcs draw on. Tweening the dash pattern rather than an offset keeps
         each segment growing from its own start angle instead of the whole ring
         sweeping — four projects arriving, not one dial filling. */
      gsap.from('.tk__seg', {
        attr: { 'stroke-dasharray': `0 ${C}` },
        duration: 1.15,
        ease: 'power2.out',
        stagger: 0.09,
        scrollTrigger: { trigger: el, start: 'top 82%', once: true },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <div className="tk" ref={root}>
      {/* ---------------- the ring ---------------- */}
      <figure className="tk__figure" data-rise>
        <div className="tk__chart">
          <svg className="tk__ring" viewBox="0 0 240 240" aria-hidden="true">
            <circle className="tk__track" cx="120" cy="120" r={R} />
            {SEGMENTS.map((s) => (
              <circle
                className="tk__seg"
                key={s.project}
                cx="120"
                cy="120"
                r={R}
                strokeDasharray={`${s.dash} ${C - s.dash}`}
                strokeDashoffset={s.offset}
                data-on={active === s.project ? '' : undefined}
                onPointerEnter={() => setActive(s.project)}
                onPointerLeave={() => setActive(null)}
              />
            ))}
          </svg>

          <div className="tk__centre">
            <span className="tk__total">{usd(TOTAL)}</span>
            <span className="tk__totalV">Disclosed to date</span>
          </div>

          {SEGMENTS.map((s) => (
            <div
              className="tk__label"
              key={s.project}
              style={{ left: `${s.lx}%`, top: `${s.ly}%` }}
              data-on={active === s.project ? '' : undefined}
              onPointerEnter={() => setActive(s.project)}
              onPointerLeave={() => setActive(null)}
            >
              <span className="tk__pct">{s.pct}%</span>
              <span className="tk__name">{s.project}</span>
            </div>
          ))}
        </div>
        <figcaption className="tk__caption">
          Share of the {usd(TOTAL)} disclosed across the projects below.
        </figcaption>
      </figure>

      {/* ---------------- the record ---------------- */}
      <div className="tk__record" data-rise>
        <div className="tk__tableWrap">
          <table className="tk__table">
            <caption className="sr-only">
              Tokenized projects, their sector and value in US dollars
            </caption>
            <thead>
              <tr>
                <th scope="col">Project</th>
                <th scope="col">Sector</th>
                <th scope="col">Share</th>
                <th scope="col">Value</th>
              </tr>
            </thead>
            <tbody onPointerLeave={() => setActive(null)}>
              {SEGMENTS.map((s) => (
                <tr
                  key={s.project}
                  data-on={active === s.project ? '' : undefined}
                  onPointerEnter={() => setActive(s.project)}
                >
                  <th scope="row">{s.project}</th>
                  <td>{s.sector}</td>
                  <td className="tk__share">{s.pct}%</td>
                  <td className="tk__value">{usd(s.usdM)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th scope="row">Disclosed</th>
                <td />
                <td className="tk__share">100%</td>
                <td className="tk__value">{usd(TOTAL)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <p className="tk__more">And more.</p>
      </div>
    </div>
  )
}
