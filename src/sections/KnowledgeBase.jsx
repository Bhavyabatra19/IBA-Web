/**
 * Open knowledge base — four recent library items, two up, then the sign-up.
 * Light band, after the ecosystem marquee.
 *
 * Built from the what-we-do card (.wd__*): photo header toned into the
 * brand, glass icon badge for the format, red on hover. The badge shows what
 * KIND of item it is — article, recording, report — since that is what a
 * reader decides on first.
 *
 * Items: real coverage of IBA and its founder (by request, 11-04-2026), each
 * opening the source in a new tab. The tag is the platform; the icon and the
 * meta line give the format. Thumbnails are generated in the site's light
 * studio style (public/images/kb-*.jpg: a silver and red platform with glass
 * tiles carrying red line icons, the item's format on the main tile), not
 * taken from the sources.
 *
 * ⚠ Titles for the Yahoo Finance and YouTube items, and the CoinGeek date,
 * are to confirm: the source pages could not be opened when this was set.
 */

import { useLayoutEffect, useRef } from 'react'
import { gsap, revealRise, reducedMotion } from '../lib/scroll'

/* format icons, drawn on a 48 grid in currentColor */
const ICONS = {
  article: (
    <>
      <path d="M12 6h17l9 9v27H12Z" />
      <path d="M29 6v9h9M18 24h14M18 31h14M18 38h9" />
    </>
  ),
  webinar: (
    <>
      <rect x="6" y="10" width="36" height="26" rx="3" />
      <path d="m21 17 9 6-9 6Z" />
      <path d="M16 42h16" />
    </>
  ),
  report: (
    <>
      <path d="M12 6h24v36H12Z" />
      <path d="M18 34v-6M24 34V20M30 34v-10" />
    </>
  ),
  interview: (
    <>
      <path d="M6 10h24v16H16l-6 5v-5H6Z" />
      <path d="M22 30h4v-0M30 18h12v16h-4v5l-6-5H22v-4" />
    </>
  ),
  profile: (
    <>
      <circle cx="24" cy="17" r="7" />
      <path d="M10 40c1.5-8 7-12 14-12s12.5 4 14 12" />
    </>
  ),
  press: (
    <>
      <path d="M8 20h8l18-10v28L16 28H8Z" />
      <path d="M16 28l3 10h5l-3-10M38 18l4-3M38 30l4 3M39 24h5" />
    </>
  ),
}

const ITEMS = [
  {
    kind: 'article',
    format: 'Article',
    platform: 'Voyagers World',
    title: 'From Crypto to Credibility: Raj Kapoor’s Blockchain Vision for India',
    body: 'How IBA’s founder makes the case for blockchain beyond crypto, and for India as a credible leader in the technology.',
    date: '18 Aug 2025',
    img: '/images/kb-voyagers-vision.jpg',
    href: 'https://voyagersworld.in/2025/08/18/from-crypto-to-credibility-raj-kapoors-blockchain-vision-for-india/',
    tint: 'red',
  },
  {
    kind: 'interview',
    format: 'Video Interview',
    platform: 'CoinGeek',
    title: 'IBA Founder Raj Kapoor: India Can Dominate Web3 Despite Past Missed Opportunities',
    body: 'On CoinGeek Backstage: India missed the Web1 and Web2 buses, but has the talent and resources to lead Web3.',
    date: '2023',
    img: '/images/kb-coingeek-web3.jpg',
    href: 'https://coingeek.com/iba-founder-raj-kapoor-india-can-dominate-web3-despite-past-missed-opportunities-in-internet-evolution-video/',
    tint: 'ink',
  },
  {
    kind: 'webinar',
    format: 'Video',
    platform: 'YouTube',
    title: 'Raj Kapoor on Blockchain, Web3 and the India Blockchain Alliance',
    body: 'IBA’s founder on the alliance, its mission and where blockchain and Web3 go next.',
    img: '/images/kb-youtube-talk.jpg',
    href: 'https://www.youtube.com/watch?v=O9NtJdbwEXE',
    tint: 'deep',
  },
  {
    kind: 'press',
    format: 'Press Release',
    platform: 'EIN Presswire',
    title: 'The STO Foundation (Tokenized Asset Foundation) Appoints Raj Kapoor as Chief Strategy Advisor',
    body: 'The Tokenized Asset Foundation names IBA’s founder, a global blockchain and AI leader, as its Chief Strategy Advisor.',
    img: '/images/kb-sto-foundation.jpg',
    href: 'https://www.einpresswire.com/article/936353469/the-sto-foundation-tokenized-asset-foundation-appoints-global-blockchain-ai-leader-raj-kapoor-as-chief-strategy-advisor',
    tint: 'warm',
  },
  {
    kind: 'article',
    format: 'News',
    platform: 'Yahoo Finance',
    title: 'India Blockchain Alliance and Founder Raj Kapoor',
    body: 'Yahoo Finance coverage of the India Blockchain Alliance and the work of its founder, Raj Kapoor.',
    img: '/images/kb-yahoo-iba.jpg',
    href: 'https://finance.yahoo.com/news/india-blockchain-alliance-raj-kapoor-123000487.html',
    tint: 'red',
  },
  {
    kind: 'profile',
    format: 'Profile',
    platform: 'World Biogas Association',
    title: 'Raj Kapoor',
    body: 'IBA’s founder in the World Biogas Association’s directory of people working on sustainability and climate.',
    img: '/images/kb-wba-profile.jpg',
    href: 'https://www.worldbiogasassociation.org/raj-kapoor/',
    tint: 'ink',
  },
]

export default function KnowledgeBase() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const el = root.current
    const ctx = gsap.context(() => {
      if (reducedMotion()) return
      revealRise(el, { trigger: el, start: 'top 82%', stagger: 0.08 })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="wd wd--two kb kb--six band band--light band--own" ref={root} id="library" aria-labelledby="kb-title">
      <div className="wd__inner">
        <header className="kb__head">
          <p className="hero__kicker wd__eyebrow" data-rise>
            <svg className="hero__kicker-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2.5 20.5 7v10L12 21.5 3.5 17V7L12 2.5Z" />
              <path d="M3.5 7 12 11.5 20.5 7M12 11.5v10" />
            </svg>
            Open Knowledge Base
          </p>
          <h2 className="kb__title" id="kb-title" data-rise>
            Powered by the Community
          </h2>
          <p className="kb__lede" data-rise>
            An open-source knowledge base of articles, videos, research and policy
            briefs, developed by IBA’s ecosystem experts and advisors for the wider
            blockchain community, searchable, categorised and free to every
            registered member.
          </p>
        </header>

        <div className="wd__grid">
          {ITEMS.map((it) => (
            <article className={`wd__card kb__card kb__card--${it.tint}`} key={it.title} data-rise>
              <div className="wd__media" aria-hidden="true">
                <img className="wd__photo" src={it.img} alt="" loading="lazy" decoding="async" />
                <span className="wd__tint" />
              </div>
              <div className="wd__body">
                <span className="wd__tag">{it.platform}</span>
                {/* the icon, below the label (by request), not on the photo */}
                <span className="wd__badge wd__badge--inline" aria-hidden="true">
                  <svg className="wd__icon" viewBox="0 0 48 48">
                    {ICONS[it.kind]}
                  </svg>
                </span>
                <h3 className="wd__title kb__card-title">
                  {/* the whole card is the link; it opens the source in a new tab */}
                  <a className="kb__link" href={it.href} target="_blank" rel="noopener noreferrer">
                    {it.title}
                    <span className="sr-only"> (opens on {it.platform} in a new tab)</span>
                  </a>
                </h3>
                <p className="wd__text">{it.body}</p>
                <p className="kb__meta">
                  <span>{it.format}</span>
                  {it.date && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{it.date}</span>
                    </>
                  )}
                </p>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}
