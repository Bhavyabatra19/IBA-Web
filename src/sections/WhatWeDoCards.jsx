/**
 * What IBA Does, the six pillars as photo-header cards. Light band.
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
import PillarCards from '../components/PillarCards'

/* in the order of the content review (11-06-2026): Web3 Advisory,
   Tokenization, Web3 Corridor, Red Club Experience, UAE Experience Centre
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
  {
    key: 'corridor',
    tag: 'Five regions, one network',
    title: 'Web3 Corridor',
    body:
      'One corridor across India, the UAE, Europe, Africa and the Americas: market access, capital, technology transfer and memberships for cross-border growth.',
    href: '/corridor',
    img: '/images/card-globe.jpg',
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
    img: '/images/the-block-card.jpg',
  },
  /* ⚠ the full content for this pillar is on its way (content review,
     11-06); it will sit on the Expertise page at #global-market-expansion,
     which this card already links to. Until that section exists the link
     opens the Expertise page at the top. */
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

        <PillarCards cards={CARDS} />
      </div>
    </section>
  )
}
