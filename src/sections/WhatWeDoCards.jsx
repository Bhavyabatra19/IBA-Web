/**
 * What IBA Does, as a switcher (by request, 11-23: seven cards in rows ran
 * too long): the pillars listed down the left, and the chosen one shown
 * large on the right, its photo whole above the tag, title, copy and
 * "Know more" on a dark ground. Hover, focus, click or the arrow keys choose a pillar.
 * The section stays one panel tall however many pillars there are. On a
 * phone the list becomes an accordion, the chosen pillar opening in place.
 * Light band. Styles in brandbook.css (.wdx).
 *
 * Follows the flagship-programme panel, at the hero's width. Each card has
 * a photo header in a red hue, with an icon badge; the copy sits beneath. On
 * hover the card turns red and the photo eases in.
 *
 * Photos: Unsplash, under the Unsplash License (free for commercial use, no
 * attribution required), saved locally in public/images:
 *   wd-advise.jpg  Vitaly Gariev     unsplash.com/photos/8k5j5z6ZYT4
 *   wd-build.jpg   GuerrillaBuzz     unsplash.com/photos/7hA2wqBcSF8
 */

import { useLayoutEffect, useRef, useState } from 'react'
import { gsap, revealRise, reducedMotion } from '../lib/scroll'
import { ICONS } from '../components/PillarCards'
import { Go } from './service/ServiceBlocks'

/* in the order of the content review (11-06-2026), with India Entry
   Strategy after Tokenization (11-23): Web3 Advisory, Tokenization, India
   Entry Strategy, Web3 Corridor, Red Club Experience, UAE Experience Centre
   (TheBlock), Global Market Expansion */
const CARDS = [
  {
    key: 'advise',
    tag: 'De-risk the decision',
    title: 'Web3 Advisory',
    body:
      'Policy, compliance, standards, taxation, forensics and risk mitigation, the right blockchain decision before a single line of code is written.',
    href: '/expertise#consulting-stack',
    /* the same art as the reference site: the advisory team over a holographic map */
    img: '/images/card-advisory-art.jpg',
  },
  {
    key: 'build',
    tag: 'Take assets on-chain',
    title: 'Tokenization',
    body:
      'Asset selection, token design, issuance structure and tokenomics for real-world and digital assets, taking an asset from idea to a compliant, investable token.',
    /* the Tokenization page's End-to-End Framework section */
    href: '/tokenization#framework',
    /* the same art as the reference site: the team over a tokenized-property model */
    img: '/images/card-tokenization-art.jpg',
  },
  /* the Expertise page's India Entry Strategy band, and its page (11-23) */
  {
    key: 'india',
    tag: 'Your gateway to India',
    title: 'India Entry Strategy',
    body:
      'Market intelligence, regulatory and legal structuring, entity formation, partnerships, first customers and capital: a structured pathway into India for global technology companies.',
    href: '/india-entry',
    img: '/images/corridor-hero-map.jpg',
  },
  {
    key: 'corridor',
    tag: 'Five regions, one network',
    title: 'Web3 Corridor',
    body:
      'One corridor across India, the UAE, Europe, Africa and the Americas: market access, capital, technology transfer and memberships for cross-border growth.',
    href: '/corridor',
    img: '/images/corridor-globe-team.jpg',
  },
  {
    key: 'redclub',
    tag: 'Talent for Web3',
    title: 'Red Club Experience',
    body:
      'Experience Centers on campus and programmes for learners: blockchain and AI training, live projects, mentorship and international pathways.',
    href: '/red-club',
    img: '/images/card-students-art.jpg',
  },
  {
    key: 'block',
    tag: 'Dubai launchpad',
    title: 'UAE Experience Centre: TheBlock',
    body:
      'IBA at TheBlock, Dubai: a workspace and community for virtual-asset companies, with a real-time experience of the UAE ecosystem and investor access.',
    href: '/corridor#the-block',
    img: '/images/the-block-event.jpg',
  },
  /* the full content for this pillar is the Expertise page's
     #global-market-expansion section (the client's GTM page, 11-10) */
  {
    key: 'expand',
    tag: 'Grow across borders',
    title: 'Global Market Expansion',
    body:
      'Market-entry strategy, business setup, partner access and go-to-market support for companies scaling into new markets across the corridor.',
    href: '/expertise#global-market-expansion',
    img: '/images/corridor-expansion.jpg',
  },
]

function Panel({ c, inline = false }) {
  return (
    <div className={`wdx__copy${inline ? ' wdx__copy--inline' : ''}`}>
      <span className="wdx__tag">{c.tag}</span>
      <h3 className="wdx__title">{c.title}</h3>
      <p className="wdx__text">{c.body}</p>
      <Go className="wdx__go" href={c.href} aria-label={`Know more about ${c.title}`}>
        Know more <span aria-hidden="true">→</span>
      </Go>
    </div>
  )
}

export default function WhatWeDoCards() {
  const root = useRef(null)
  const tabs = useRef([])
  const [active, setActive] = useState(0)

  useLayoutEffect(() => {
    const el = root.current
    const ctx = gsap.context(() => {
      if (reducedMotion()) return
      revealRise(el, { trigger: el, start: 'top 82%', stagger: 0.1 })
    }, root)
    return () => ctx.revert()
  }, [])

  /* the arrow keys move along the list, as in any tab list */
  const onKey = (e) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key]
    let next = step ? (active + step + CARDS.length) % CARDS.length : null
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = CARDS.length - 1
    if (next === null) return
    e.preventDefault()
    setActive(next)
    tabs.current[next]?.focus()
  }

  const c = CARDS[active]

  return (
    <section className="wd wdx-band band band--light band--own" ref={root} aria-labelledby="wd-title">
      <div className="wd__inner">
        {/* the section's main heading (by request), set like the other home
            section titles: the site's H2 face, size and colour, centred */}
        <header className="kb__head wd__head">
          <h2 className="kb__title" id="wd-title" data-rise>
            What IBA Does
          </h2>
        </header>

        <div className="wdx" data-rise>
          <div className="wdx__list" role="tablist" aria-label="What IBA does" aria-orientation="vertical" onKeyDown={onKey}>
            {CARDS.map((card, i) => {
              const on = i === active
              return (
                <div className={`wdx__item${on ? ' is-active' : ''}`} key={card.key}>
                  <button
                    type="button"
                    role="tab"
                    id={`wdx-tab-${card.key}`}
                    aria-selected={on}
                    aria-controls="wdx-panel"
                    tabIndex={on ? 0 : -1}
                    className="wdx__tab"
                    ref={(n) => (tabs.current[i] = n)}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                  >
                    <span className="wdx__icon" aria-hidden="true">
                      <svg viewBox="0 0 48 48">{ICONS[card.icon ?? card.key]}</svg>
                    </span>
                    <span className="wdx__label">
                      <span className="wdx__num">{String(i + 1).padStart(2, '0')}</span>
                      <span className="wdx__name">{card.title}</span>
                    </span>
                    <span className="wdx__arrow" aria-hidden="true">→</span>
                  </button>
                  {/* on a phone, the chosen pillar opens here, under its name */}
                  {on && (
                    <div className="wdx__inline">
                      <img className="wdx__inline-img" src={card.img} alt="" loading="lazy" decoding="async" />
                      <Panel c={card} inline />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="wdx__panel" id="wdx-panel" role="tabpanel" aria-labelledby={`wdx-tab-${c.key}`}>
            {/* the art whole (9:4), every photo in place and the chosen one
                faded in; the copy on the dark beneath it */}
            <div className="wdx__media">
              {CARDS.map((card, i) => (
                <img
                  key={card.key}
                  className={`wdx__img${i === active ? ' is-on' : ''}`}
                  src={card.img}
                  alt=""
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              ))}
            </div>
            <Panel c={c} key={c.key} />
          </div>
        </div>
      </div>
    </section>
  )
}
