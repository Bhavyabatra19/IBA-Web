/**
 * What we do — Web3 Advisory and Tokenization — as two cards. Light band.
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

import { useLayoutEffect, useRef } from 'react'
import { gsap, revealRise, reducedMotion } from '../lib/scroll'
import { Go } from './service/ServiceBlocks'

/* line icons, drawn on a 48 grid in currentColor */
const ICONS = {
  advise: (
    <>
      <path d="M24 5 40 11v12c0 10-7 17-16 20C15 40 8 33 8 23V11Z" />
      <path d="m17 24 5 5 9-10" />
    </>
  ),
  build: (
    <>
      <path d="M24 4 42 14v20L24 44 6 34V14Z" />
      <path d="M6 14 24 24 42 14M24 24v20" />
    </>
  ),
  corridor: (
    <>
      <circle cx="24" cy="24" r="16" />
      <path d="M8 24h32M24 8c5 4.5 7.5 9.8 7.5 16S29 35.5 24 40c-5-4.5-7.5-9.8-7.5-16S19 12.5 24 8Z" />
    </>
  ),
  block: (
    <>
      <path d="M24 6 39 14.5v19L24 42 9 33.5v-19Z" />
      <path d="M9 14.5 24 23l15-8.5M24 23v19" />
    </>
  ),
  redclub: (
    <>
      <path d="M6 18 24 9l18 9-18 9Z" />
      <path d="M13 21.5v9c0 2.8 5 5.5 11 5.5s11-2.7 11-5.5v-9M42 18v11" />
    </>
  ),
}

const CARDS = [
  {
    key: 'advise',
    tag: 'De-risk the decision',
    title: 'Web3 Advisory',
    body:
      'Policy, compliance, standards, taxation, forensics and risk mitigation, the right blockchain decision before a single line of code is written.',
    cta: 'Know more',
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
    cta: 'Know more',
    /* the Tokenization page's End-to-End Framework section */
    href: '/tokenization#framework',
    /* the same art as the reference site: the team over a tokenized-property model */
    img: '/images/card-tokenization-art.jpg',
  },
  {
    key: 'corridor',
    tag: 'Five regions, one network',
    title: 'Web3 Corridor',
    body:
      'One corridor across India, the UAE, Europe, Africa and the Americas: market access, capital, technology transfer and memberships for cross-border growth.',
    cta: 'Know more',
    href: '/corridor',
    img: '/images/card-globe.jpg',
  },
  {
    key: 'block',
    tag: 'Dubai launchpad',
    title: 'UAE Experience Center, The Block',
    body:
      'IBA at The Block, Dubai: a workspace and community for virtual-asset companies, with a real-time experience of the UAE ecosystem and investor access.',
    cta: 'Know more',
    href: '/corridor#the-block',
    img: '/images/the-block-card.jpg',
  },
  {
    key: 'redclub',
    tag: 'Talent for Web3',
    title: 'Red Club',
    body:
      'Experience Centers on campus and programmes for learners: blockchain and AI training, live projects, mentorship and international pathways.',
    cta: 'Know more',
    href: '/red-club',
    img: '/images/card-students-art.jpg',
  },
]

export default function WhatWeDoCards() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const el = root.current
    const ctx = gsap.context(() => {
      if (reducedMotion()) return
      revealRise(el, { trigger: el, start: 'top 82%', stagger: 0.1 })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="wd wd--duo wd--art wd--pillars band band--light band--own" ref={root} aria-labelledby="wd-title">
      <div className="wd__inner">
        {/* the section's main heading (by request), set like the other home
            section titles: the site's H2 face, size and colour, centred */}
        <header className="kb__head wd__head">
          <h2 className="kb__title" id="wd-title" data-rise>
            What IBA Does
          </h2>
        </header>

        <div className="wd__grid">
          {CARDS.map((c) => (
            <article className={`wd__card wd__card--${c.key}`} key={c.key} data-rise>
              <div className="wd__media" aria-hidden="true">
                <img className="wd__photo" src={c.img} alt="" loading="lazy" decoding="async" />
                <span className="wd__tint" />
              </div>
              <div className="wd__body">
                <span className="wd__tag">{c.tag}</span>
                {/* the icon, below the label (by request), not on the photo */}
                <span className="wd__badge wd__badge--inline" aria-hidden="true">
                  <svg className="wd__icon" viewBox="0 0 48 48">
                    {ICONS[c.key]}
                  </svg>
                </span>
                <h3 className="wd__title">{c.title}</h3>
                <p className="wd__text">{c.body}</p>
                {/* every card reads "Know more", so the accessible name says which */}
                <Go className="wd__go" href={c.href} aria-label={`Know more about ${c.title}`}>
                  {c.cta} <span aria-hidden="true">→</span>
                </Go>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
