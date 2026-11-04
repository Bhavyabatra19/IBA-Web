/**
 * About — the four mission pillars (Advocate, Connect, Enable, Educate) as
 * frosted glass cards over the client's red light-arcs image
 * (public/images/mission-bg.jpg). Each icon is drawn for its pillar and sits
 * in a neon ring with an orbiting spark.
 *
 * Hover: the card lifts and its glass brightens, a light runs round its
 * edge, and the icon's ring turns and the spark orbits.
 *
 * Each card shows a short summary; "Read more" (a click or tap, never a
 * hover) opens the full statement inside the same card, which grows to hold
 * it (by request). Styles in brandbook.css (.mp).
 */

import { useState } from 'react'

export const PILLARS = [
  {
    key: 'advocate',
    title: 'Advocate',
    /* a megaphone, its sound waves spreading */
    icon: (
      <>
        <path d="M4 13.5V10.5a1 1 0 0 1 1-1h3l8-4.5v14l-8-4.5H5a1 1 0 0 1-1-1Z" />
        <path d="M8 14.5 9.5 20h2.5L11 15.8" />
        <path d="M19 9.5a3.5 3.5 0 0 1 0 5" className="mp__wave" />
        <path d="M21 7.5a6.5 6.5 0 0 1 0 9" className="mp__wave mp__wave--2" />
      </>
    ),
    short:
      'Shaping regulatory frameworks, global standards and taxation policy to grow tokenization and blockchain innovation.',
    full: 'We champion the growth of tokenization and blockchain innovation by shaping regulatory frameworks, global standards, and taxation policies through our councils and engagement with governments, industry leaders, and policymakers. We facilitate bridging policy and technology by fostering cross-border collaboration and connect Web3 ecosystems to accelerate the adoption of tokenized assets and build a trusted, interoperable digital economy.',
  },
  {
    key: 'connect',
    title: 'Connect',
    /* a network: one hub linked to three markets */
    icon: (
      <>
        <path d="M12 12 5.5 6.5M12 12l6.5-5.5M12 12v7" />
        <circle cx="12" cy="12" r="2.6" className="mp__fill" />
        <circle cx="4.5" cy="5.5" r="2" />
        <circle cx="19.5" cy="5.5" r="2" />
        <circle cx="12" cy="20.5" r="2" />
      </>
    ),
    short:
      'Corridors that bring governments, institutions, investors and innovators together, with trusted pathways between markets.',
    full: 'Our corridors facilitate connections to bring together governments, institutions, investors, enterprises, and innovators to create trusted pathways for market entry, tokenization, investment, and cross-border collaboration. We build pathways between jurisdictions with policy, capital, technology, and market access working together. Promoting institutional and commercial rails, easing Web3 ecosystems to move between markets—turning fragmented opportunities into connected, scalable corridors for the digital economy.',
  },
  {
    key: 'enable',
    title: 'Enable',
    /* a rocket lifting off: intent to production */
    icon: (
      <>
        <path d="M12 2.5c3 2.2 4.5 5.4 4.5 9.2V16h-9v-4.3c0-3.8 1.5-7 4.5-9.2Z" />
        <circle cx="12" cy="9.5" r="1.8" className="mp__fill" />
        <path d="M7.5 12.5 5 15v3l2.5-2M16.5 12.5 19 15v3l-2.5-2" />
        <path d="M10.5 18.5 12 21.5l1.5-3" className="mp__wave" />
      </>
    ),
    short:
      'Advisory, tokenization expertise and technical capability that turn Web3 ambition into production-ready reality.',
    full: 'We bridge the gap between intent, infrastructure, and adoption. Enabling Web3 ambition to evolve into production-ready reality through sophisticated infrastructure with structured strategy for growth and scale. IBA provides the strategic advisory, tokenization expertise, consulting, and technical capabilities organizations need to design, build, and deploy blockchain solutions at scale—from market strategy and ecosystem design to technology implementation and launch.',
  },
  {
    key: 'educate',
    title: 'Educate',
    /* a graduation cap, its tassel hanging */
    icon: (
      <>
        <path d="M1.5 9 12 4.5 22.5 9 12 13.5Z" className="mp__fill" />
        <path d="M6 11v4.5c0 1.6 2.7 3 6 3s6-1.4 6-3V11" />
        <path d="M22.5 9v5.5" />
        <circle cx="22.5" cy="16" r="1.1" />
      </>
    ),
    short:
      'A steady pool of trained Web3 talent, built through the Red Club, Experience Centers and industry-led programs.',
    full: 'Creating a systematic talent pool with enhanced holistic learning programs to enhance education with practical experiences and industry validation for real-world opportunities. Building a steady resource of trained Web3 talent by connecting students, developers, professionals, and entrepreneurs with practical skills, expert mentors, live projects, and industry networks through the Red Club and Experience Centers programs, and industry-led programs—equipping learners to develop, deploy, and scale blockchain and tokenization solutions across global ecosystems.',
  },
]

/* `items` lets another section use the same cards (the Expertise page's Who
   We Work With); a card without `full` shows its text alone, with no popup. */
export default function MissionPillars({ items = PILLARS }) {
  /* The full statement opens only on "Read more" (by request: no hover
     popup), inside its own card, and closes on Show less, Escape or another
     card's Read more. */
  const [open, setOpen] = useState(null)

  return (
    <ul className="mp">
      {items.map((p, i) => {
        const isOpen = open === p.key
        return (
          <li
            className={`mp__card mp__card--${i < 2 ? 'start' : 'end'}`}
            key={p.key}
            data-open={isOpen || undefined}
            data-rise
            onKeyDown={(e) => e.key === 'Escape' && setOpen(null)}
          >
            {/* the light that runs round the card's edge on hover */}
            <span className="mp__rim" aria-hidden="true" />
            {/* the icon in a neon ring: a glass disc, a ring of light that
                turns on hover, and a spark orbiting it */}
            <span className="mp__badge" aria-hidden="true">
              <span className="mp__ring" />
              <span className="mp__orbit">
                <i />
              </span>
              <svg viewBox="0 0 24 24">{p.icon}</svg>
            </span>
            <h3 className="mp__title">{p.title}</h3>
            <p className="mp__text">{p.short}</p>
            {p.full && (
              <>
            <button
              type="button"
              className="mp__more"
              aria-expanded={isOpen}
              aria-controls={`mp-full-${p.key}`}
              onClick={() => setOpen(isOpen ? null : p.key)}
            >
              Read more <span aria-hidden="true">→</span>
            </button>

            {/* the full statement, in place of the summary; its own button closes it */}
            <div className="mp__pop" id={`mp-full-${p.key}`} role="region" aria-label={`${p.title}, in full`}>
              <h4 className="mp__popTitle">{p.title}</h4>
              <p>{p.full}</p>
              {isOpen && (
                <button type="button" className="mp__more mp__close" onClick={() => setOpen(null)}>
                  Show less <span aria-hidden="true">↑</span>
                </button>
              )}
            </div>
              </>
            )}
          </li>
        )
      })}
    </ul>
  )
}
