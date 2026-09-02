/**
 * 2.6 — Verifyble. Dark band.
 *
 * Copy and the four things Verifyble carries on the left; a drawn diagram of
 * the same four on the right.
 *
 * This band used to claim the WebGL stage and pin for three viewports while the
 * coin opened. It no longer does either — the section is a normal band now, and
 * the stage is live only in the hero and the closing. The icons in the diagram
 * are the same fragments as the list beside it, so the two cannot drift.
 */

import { useLayoutEffect, useRef } from 'react'
import { gsap, revealLines, revealRise, reducedMotion, REVEAL_RISE } from '../lib/scroll'
import { Go } from './service/ServiceBlocks'

/* Drawn once, used twice: once at 16px in the list, once at 20px in the
   diagram. One definition means a change to an icon reaches both. */
const ICONS = {
  seal: (
    <>
      <circle cx="8" cy="6.6" r="4.3" />
      <path d="M6.1 6.7l1.3 1.3 2.5-2.6" />
      <path d="M5.5 10.2L4.7 14 8 12.5 11.3 14l-.8-3.8" />
    </>
  ),
  wallet: (
    <>
      <rect x="2" y="4.2" width="12" height="8.6" rx="2.2" />
      <path d="M2 7.1h12M10.4 9.9h2.2" />
    </>
  ),
  lab: (
    <>
      <path d="M6.4 2v4.2L3.2 12a1.2 1.2 0 001 1.9h7.6a1.2 1.2 0 001-1.9L9.6 6.2V2" />
      <path d="M5.4 2h5.2M4.6 10h6.8" />
    </>
  ),
  tiers: (
    <>
      <path d="M8 2l5.2 2.7L8 7.4 2.8 4.7z" />
      <path d="M2.8 8L8 10.7 13.2 8M2.8 11.3L8 14l5.2-2.7" />
    </>
  ),
}

/* What used to be one long sentence listing four things. A paragraph is the
   wrong shape for a list — the reader has to hold four items in a clause to
   count them — so the four are the list and the paragraph is the one line that
   says what they add up to.

   The order is the diagram's, not a ranking: these four are the four satellites
   in NODES below, in the corners they occupy there. See the note on .vfy__list. */
const INCLUDES = [
  { key: 'seal', label: 'IBA Seal of Trust credentialing standard' },
  { key: 'wallet', label: 'Blockchain-enabled career wallets' },
  { key: 'lab', label: 'On-campus Blockchain and AI labs' },
  { key: 'tiers', label: 'Alpha to Premium to Experience Center' },
]

/** Outermost first, so the DOM order is also the paint order. */
const RINGS = [
  { s: 390, rx: 78, o: 0.05 },
  { s: 310, rx: 62, o: 0.09 },
  { s: 230, rx: 48, o: 0.15 },
  { s: 150, rx: 34, o: 0.22 },
]

/** The four satellites, on the diagonals where the second ring passes. */
const NODES = [
  { key: 'seal', x: 138, y: 138 },
  { key: 'wallet', x: 302, y: 138 },
  { key: 'lab', x: 138, y: 302 },
  { key: 'tiers', x: 302, y: 302 },
]

const iconGlyph = (key) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {ICONS[key]}
  </svg>
)

/**
 * Rings of rounded diamonds around one issuing node, with the four carried
 * things sitting on the second ring.
 *
 * The rings are squares rotated 45°, which is why the satellites land where
 * they do: along a diagonal, a rotated square's edge sits at half its side, so
 * nodes at 82px on the diagonal fall exactly on the 230px ring rather than
 * being eyeballed into place.
 */
const ART = (
  <svg viewBox="0 0 440 440" fill="none" aria-hidden="true">
    <defs>
      <radialGradient id="vfyGlow" cx="0.5" cy="0.5" r="0.5">
        <stop stopColor="#c0392b" stopOpacity=".38" />
        <stop offset=".55" stopColor="#c0392b" stopOpacity=".1" />
        <stop offset="1" stopColor="#c0392b" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="vfyCore" x1="178" y1="178" x2="262" y2="262" gradientUnits="userSpaceOnUse">
        <stop stopColor="#e0503f" />
        <stop offset="1" stopColor="#a02e22" />
      </linearGradient>
    </defs>

    {/* Two nested groups around every moving part: the outer one carries the
        entrance, the inner one the endless drift. On one element the loop
        would inherit whatever transform the entrance settled on, and the two
        would fight over the same property. */}
    <g className="vf-glowIn">
      <circle className="vf-glow" cx="220" cy="220" r="210" fill="url(#vfyGlow)" />
    </g>

    {/* the outermost is cut by the viewport, which is what keeps the rings
        reading as continuing past the frame rather than stopping at it */}
    <g transform="rotate(45 220 220)" stroke="currentColor">
      {RINGS.map((r) => (
        <g className="vf-ringIn" key={r.s}>
          <rect
            className="vf-ring"
            x={220 - r.s / 2}
            y={220 - r.s / 2}
            width={r.s}
            height={r.s}
            rx={r.rx}
            strokeOpacity={r.o}
          />
        </g>
      ))}
    </g>

    {NODES.map((n) => (
      <g className="vf-nodeIn" key={n.key}>
        <g className="vf-node">
          <rect
            x={n.x - 24}
            y={n.y - 24}
            width="48"
            height="48"
            rx="15"
            fill="#0a0a0a"
            stroke="#c0392b"
            strokeOpacity=".42"
          />
          <g
            transform={`translate(${n.x - 10} ${n.y - 10}) scale(1.25)`}
            stroke="#e0503f"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {ICONS[n.key]}
          </g>
        </g>
      </g>
    ))}

    {/* the issuing node */}
    <g className="vf-coreIn">
      <g className="vf-core">
        <rect x="178" y="178" width="84" height="84" rx="26" fill="url(#vfyCore)" />
        <g
          transform="translate(200 200) scale(2.5)"
          stroke="#fff"
          strokeWidth="1.15"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {ICONS.seal}
        </g>
      </g>
    </g>
  </svg>
)

export default function Verifyble() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const el = root.current
    const ctx = gsap.context(() => {
      if (reducedMotion()) return
      revealLines(el, { trigger: el })
      revealRise(el, { trigger: el })

      /* ---- the diagram assembles from the middle out ----
         The order is the argument: the issuing node first, then the rings it
         reaches through, then the four things carried on them. `from: 'end'`
         on the rings reverses the paint order, so they arrive innermost first
         instead of the outermost appearing before there is anything to issue. */
      gsap
        .timeline({
          defaults: { ease: 'power3.out' },
          /* the same depth the copy beside it arrives at: the diagram is the
             other half of this band, not a thing that happens after it */
          scrollTrigger: { trigger: el, start: REVEAL_RISE, once: true },
        })
        .from('.vf-glowIn', { opacity: 0, duration: 1.5 }, 0)
        .from('.vf-coreIn', { scale: 0.68, opacity: 0, duration: 0.85, ease: 'back.out(1.6)' }, 0)
        .from(
          '.vf-ringIn',
          { scale: 0.8, opacity: 0, duration: 1, stagger: { each: 0.1, from: 'end' } },
          0.2
        )
        .from(
          '.vf-nodeIn',
          { scale: 0.55, opacity: 0, duration: 0.75, stagger: 0.09, ease: 'back.out(1.8)' },
          0.5
        )

      /* ---- then it issues, endlessly ----
         The rings breathe out of phase, innermost leading, which reads as a
         signal leaving the node rather than the whole diagram resizing.
         Paused off screen — an infinite tween behind the viewport is work the
         reader never sees. Built per tween: GSAP writes onto a trigger config. */
      const whileOnScreen = () => ({
        trigger: el,
        start: 'top 85%',
        end: 'bottom top',
        toggleActions: 'play pause resume pause',
      })
      const drift = { ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.5 }

      gsap.to('.vf-ring', {
        ...drift,
        scale: 1.045,
        duration: 3,
        stagger: { each: 0.24, from: 'end' },
        scrollTrigger: whileOnScreen(),
      })
      gsap.to('.vf-core', {
        ...drift,
        scale: 1.05,
        duration: 2.6,
        scrollTrigger: whileOnScreen(),
      })
      gsap.to('.vf-node', {
        ...drift,
        y: -5,
        duration: 3.3,
        stagger: 0.3,
        scrollTrigger: whileOnScreen(),
      })
      gsap.to('.vf-glow', {
        ...drift,
        opacity: 0.55,
        duration: 3.2,
        scrollTrigger: whileOnScreen(),
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="vfy section band band--dark" ref={root} id="verifyble">
      <div className="wrap">
        {/* Everything the band says is in the left column — the claim, the four
            things Verifyble carries, the way through — and the object it all
            describes is beside it. The column takes the wider share of the row,
            because the four are set two by two inside it. */}
        <div className="vfy__inner">
          <div className="vfy__copy">
            <p className="eyebrow" data-rise>Our Product — For Institutions</p>
            <h2 className="h2 h2--col display" data-clip>
              <span className="line">
                <span className="line__inner">Verifyble —</span>
              </span>
              <span className="line">
                <span className="line__inner">
                  Trust, Issued <em>On-Chain</em>
                </span>
              </span>
            </h2>
            <p className="lede" data-rise>
              How a university becomes a blockchain-enabled institution.
            </p>

            {/* The rise is per item rather than on the list, so the four arrive
                one after another — the same order the diagram assembles its
                four nodes in, beside them. */}
            <ul className="vfy__list">
              {INCLUDES.map((it) => (
                <li key={it.key} data-rise>
                  <span className="vfy__ico" aria-hidden="true">
                    {iconGlyph(it.key)}
                  </span>
                  <span className="vfy__itemLabel">{it.label}</span>
                </li>
              ))}
            </ul>

            {/* the band is the teaser; 5.2 is the page it teases */}
            <Go className="arrow" href="/education/verifyble" data-rise>
              Explore Verifyble
              <span aria-hidden="true">→</span>
            </Go>
          </div>

          <div className="vfy__art" data-rise>
            {ART}
          </div>
        </div>
      </div>
    </section>
  )
}
