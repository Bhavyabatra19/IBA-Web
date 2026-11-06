/**
 * Impact, measured, headline proof points, set quietly.
 *
 * Sits between the counters and the Web3 Corridor. A split header (title
 * left, lede and link right) over four figures divided by hairlines, each
 * with a line icon that draws itself in as the figure counts up, and a slow
 * ticker of the portfolio record along the foot.
 *
 * Every figure is in the markup as written, so it is correct before any
 * animation runs and stays correct if none does (see buildCounters in
 * lib/scroll). Reduced motion gets the finished state and a still list.
 */

import { useLayoutEffect, useRef } from 'react'
import { gsap, revealRise, reducedMotion } from '../lib/scroll'
import { FACTS } from '../data/facts'

/* line icons, 24px grid; the effect gives each stroke pathLength=1 so one
   dash tween draws them all */
const ICONS = {
  coin: (
    <>
      <ellipse cx="12" cy="6.5" rx="7" ry="3" />
      <path d="M5 6.5v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5M5 11.5v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.4 2.4 3.6 5.2 3.6 8.5s-1.2 6.1-3.6 8.5c-2.4-2.4-3.6-5.2-3.6-8.5s1.2-6.1 3.6-8.5Z" />
    </>
  ),
  network: (
    <>
      <circle cx="12" cy="5" r="2.2" />
      <circle cx="5" cy="18" r="2.2" />
      <circle cx="19" cy="18" r="2.2" />
      <path d="M10.9 6.9 6.1 16.1M13.1 6.9l4.8 9.2M7.2 18h9.6" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3.5 20.5 8 12 12.5 3.5 8 12 3.5Z" />
      <path d="M3.5 12 12 16.5 20.5 12M3.5 16 12 20.5 20.5 16" />
    </>
  ),
}

/* Each figure once on the home page (content review): the members,
   advisors, countries and affiliations sit in the strip under the hero, so
   this band carries the tokenization record. */
const n = (v, prefix = '', suffix = '') => ({ n: v, prefix, suffix, text: `${prefix}${v}${suffix}` })
const FIGURES = [
  { fig: FACTS.tokenized, label: 'Tokenized Assets', note: 'Real-world value brought on-chain', icon: 'coin' },
  { fig: n(12, '$', 'B+'), label: 'Consortium AUM', note: 'Assets under management across the consortium', icon: 'network' },
  { fig: FACTS.sectors, label: 'Tokenization Sectors', note: 'From real estate to gold and logistics', icon: 'layers' },
  { fig: n(11), label: 'Impact Projects', note: 'Tokenized for measurable social and climate outcomes', icon: 'globe' },
]

/* the asset classes IBA tokenizes, under the figures (by request, in place
   of the project cards): 3D medallions cut from the hero's coin artwork
   (the emblem on the coin's face, with a red metal rim), so they match the
   coins (public/images/sector-icons) */
const SECTORS = [
  { label: 'Precious Ores', img: '/images/sector-icons/precious-ores.png' },
  { label: 'Real Estate', img: '/images/sector-icons/real-estate.png' },
  { label: 'Consumables', img: '/images/sector-icons/consumables.png' },
  { label: 'Infrastructure', img: '/images/sector-icons/infrastructure.png' },
  { label: 'Financial Services', img: '/images/sector-icons/financial-services.png' },
]

/** Count a [data-count] figure from 0, keeping its decimals and affixes. */
function countUp(el, duration) {
  const to = Number(el.dataset.count)
  const places = (String(to).split('.')[1] || '').length
  const { prefix = '', suffix = '' } = el.dataset
  el.style.minWidth = `${el.offsetWidth}px`
  const state = { v: 0 }
  return gsap.to(state, {
    v: to,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      el.textContent = `${prefix}${state.v.toFixed(places)}${suffix}`
    },
  })
}

export default function ImpactBand() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const el = root.current
    const figures = Array.from(el.querySelectorAll('[data-count]'))
    const cleanups = []
    const ctx = gsap.context(() => {
      if (reducedMotion()) return
      revealRise(el, { trigger: el, start: 'top 82%', stagger: 0.09 })

      const strokes = el.querySelectorAll('.ib__icon *')
      // the start state, set only when it is going to be animated out of
      if (el.getBoundingClientRect().bottom > 0) {
        gsap.set(strokes, { attr: { pathLength: 1 }, strokeDasharray: 1, strokeDashoffset: 1 })
      }

      const io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return
          io.disconnect()
          figures.forEach((fig, i) => gsap.delayedCall(0.2 + i * 0.15, () => countUp(fig, 2)))
          gsap.to(strokes, { strokeDashoffset: 0, duration: 1.4, ease: 'power2.inOut', stagger: 0.05, delay: 0.2 })
        },
        { threshold: 0.3 }
      )
      io.observe(el)
      cleanups.push(() => io.disconnect())

      // hover a figure: it counts again, faster
      el.querySelectorAll('.ib__fig').forEach((item) => {
        const fig = item.querySelector('[data-count]')
        const replay = () => countUp(fig, 1)
        item.addEventListener('mouseenter', replay)
        cleanups.push(() => item.removeEventListener('mouseenter', replay))
      })

    }, root)
    return () => {
      cleanups.forEach((fn) => fn())
      ctx.revert()
      figures.forEach((fig) => {
        fig.textContent = `${fig.dataset.prefix || ''}${fig.dataset.count}${fig.dataset.suffix || ''}`
        fig.style.minWidth = ''
      })
    }
  }, [])

  return (
    <section className="ib band band--light band--own" ref={root} aria-labelledby="ib-title">
      <div className="ib__panel">
        <header className="ib__head">
          <div>
            <p className="ib__eyebrow" data-rise>
              Impact, Measured, Executed
            </p>
            <h2 className="ib__title" id="ib-title" data-rise>
              Real assets, real markets, <span className="ib__accent">real numbers.</span>
            </h2>
          </div>
          <div className="ib__aside">
            <p className="ib__lede" data-rise>
              The alliance in figures: what has been tokenized, where, and with whom.
            </p>
          </div>
        </header>

        <ul className="ib__figs">
          {FIGURES.map(({ fig, label, note, icon }) => (
            <li className="ib__fig" key={label} data-rise>
              <svg className="ib__icon" viewBox="0 0 24 24" aria-hidden="true">
                {ICONS[icon]}
              </svg>
              <span className="ib__k" data-count={fig.n} data-prefix={fig.prefix} data-suffix={fig.suffix}>
                {fig.text}
              </span>
              <span className="ib__label">{label}</span>
              <span className="ib__note">{note}</span>
            </li>
          ))}
        </ul>

        <ul className="ib__sectors" aria-label="Asset classes we tokenize">
          {SECTORS.map((sec) => (
            <li className="ib__sector" key={sec.label} data-rise>
              <img className="ib__sectorIcon" src={sec.img} alt="" width="320" height="320" loading="lazy" decoding="async" />
              <span className="ib__sectorLabel">{sec.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
