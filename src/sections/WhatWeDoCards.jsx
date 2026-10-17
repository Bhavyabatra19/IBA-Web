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
}

const CARDS = [
  {
    key: 'advise',
    tag: 'De-risk the decision',
    title: 'Web3 Advisory',
    body:
      'Policy, compliance, standards, taxation, forensics and risk mitigation, the right blockchain decision before a single line of code is written.',
    cta: 'See Expertise',
    href: '/expertise#consulting-stack',
    img: '/images/card-advisory.jpg',
  },
  {
    key: 'build',
    tag: 'Take assets on-chain',
    title: 'Tokenization',
    body:
      'Asset selection, token design, issuance structure and tokenomics for real-world and digital assets, taking an asset from idea to a compliant, investable token.',
    cta: 'See the Consulting Stack',
    href: '/expertise#consulting-stack',
    img: '/images/card-tokenization.jpg',
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
    <section className="wd wd--duo band band--light band--own" ref={root} aria-labelledby="wd-title">
      <div className="wd__inner">
        <p className="hero__kicker wd__eyebrow" id="wd-title" data-rise>
          <svg className="hero__kicker-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2.5 20.5 7v10L12 21.5 3.5 17V7L12 2.5Z" />
            <path d="M3.5 7 12 11.5 20.5 7M12 11.5v10" />
          </svg>
          What We Do
        </p>

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
                <Go className="wd__go" href={c.href}>
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
