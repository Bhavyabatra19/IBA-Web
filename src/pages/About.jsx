/**
 * /about — the alliance, in five movements.
 *
 * Kept as one file rather than five section files: unlike the home page, whose
 * sections are independent set-pieces reordered and rewritten on their own,
 * this is a single document that reads top to bottom, and splitting it would
 * mean opening five files to follow one argument.
 *
 * Band rhythm alternates the same way the home page does — dark opening, light,
 * dark, light, dark — so the two pages feel like one site.
 *
 * The section ids match the nav's About items exactly, so every entry in that
 * dropdown lands on the thing it names.
 */

import { useLayoutEffect, useRef } from 'react'
import {
  gsap,
  buildCounters,
  revealLines,
  revealRise,
  reducedMotion,
} from '../lib/scroll'
import AboutHero from '../sections/AboutHero'
import Closing from '../sections/Closing'
import GlobalPresence from '../sections/GlobalPresence'
import IbaCore from '../sections/IbaCore'
/* `Go` is the app's internal link, so the two buttons on this page scroll to the
   band at its foot rather than reloading the site to reach the home page's.
   `Orbit` is the wheel the Consulting Stack's six steps are taken on — the four
   initiatives are the same shape of thing and are taken the same way. */
import { Go, Orbit } from '../sections/service/ServiceBlocks'
import ImpactSlab from '../components/ImpactSlab'
import Tokenomics from '../sections/Tokenomics'
import { IMPACT_PRIMARY, IMPACT_SECONDARY } from '../content'
import { ADVISORS_PENDING, MISSION, MISSION_PILLARS, VISION } from '../about'

/* ------------------------------------------------------------------ */
/* 3.3 — initiatives                                                   */
/* ------------------------------------------------------------------ */

const INITIATIVES = [
  {
    n: '01',
    name: 'Emerging Technology Council',
    body: "The apex body for India's technology industry, driving policy advocacy, research, education, advisory and community building to unleash the sector's full potential across newer tech frontiers.",
  },
  {
    n: '02',
    name: 'Blockchain Governance Council',
    body: 'An open global multi-stakeholder collaborative network that synergizes efforts with members and partners to co-develop innovative solutions around policy, frameworks, compliance, security, taxation and standards — empowering stakeholders to achieve their goals in the blockchain ecosystem.',
  },
  {
    n: '03',
    name: 'The Green Chain',
    body: 'A pioneering blockchain ecosystem focused on ESG initiatives. Aligned with COP28, it showcases and grows Web3 projects in the sustainability space, making green finance and governance a global reality.',
  },
  {
    n: '04',
    name: 'Tech Zero',
    body: 'A coalition of tech companies making bold climate commitments and accelerating progress toward net zero. Part of the UN Race to Zero, working alongside 350+ global businesses on a unified net zero plan.',
  },
]

/* ------------------------------------------------------------------ */
/* 3.4 — the team                                                      */
/* ------------------------------------------------------------------ */

/* The bios are marked pending rather than invented. `bio: null` renders the
   placeholder; supplying the copy is the only edit needed. */
const TEAM = [
  {
    name: 'Raj Kapoor',
    role: 'Founder',
    bio: null,
    linkedin: 'https://www.linkedin.com/in/indieblock',
  },
  { name: 'Gargi Hajela', role: 'Co-Founder', bio: null },
]

/* ================================================================== */

export default function About() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const el = root.current
    const ctx = gsap.context(() => {
      if (reducedMotion()) return
      /* The hero is excluded throughout: it runs its own intro on mount, a
         second reveal pass here would re-trigger its headline when the pin
         releases, and its stat strip counts immediately rather than on a
         trigger it would already have passed. */
      /* The closing band is excluded for a different reason: it runs its own
         pass, and two on the same elements would tween them from two triggers. */
      gsap.utils.toArray('section:not(.chero):not(.close)', el).forEach((sec) => {
        buildCounters(sec)
        revealLines(sec, { trigger: sec })
        revealRise(sec, { trigger: sec })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={root}>
      {/* ---------------- 3.1 Who We Are ---------------- */}
      {/* Carries the id, so the nav's About → Who We Are still lands here. Every
          word of the old two-column opening is still on the page: the statement
          and the two paragraphs sit in the ring, the claim is what the doors
          open onto. */}
      {/* The credibility bar used to sit here. Its four numbers are now inside
          the hero, and running them twice in a row said nothing the second
          time. It still opens the home page, which is its own section. */}
      <AboutHero />

      {/* ---------------- 3.2 Vision ---------------- */}
      {/* Centred, in display type, with a red rule above it — the brief's own
          treatment, and the right one: this is the only block on the site that
          is a single sentence asked to carry a whole section, so nothing sits
          beside it to divide the attention. */}
      <section className="section band band--light vis" id="our-vision">
        <div className="wrap vis__inner">
          <span className="vis__rule" aria-hidden="true" />
          <p className="eyebrow" data-rise>
            Our Vision
          </p>
          <p className="vis__statement display" data-rise>
            {VISION.statement}
          </p>
          <p className="vis__support" data-rise>
            {VISION.support}
          </p>
          {/* Signed, not hidden. The brief marks this wording unapproved and a
              reader of the live site would have no way to know — see VISION. */}
          {VISION.draft && (
            <p className="vis__draft" data-rise>
              Drafted from IBA’s positioning. Awaiting confirmation of the approved
              vision statement.
            </p>
          )}
        </div>
      </section>

      {/* ---------------- 3.3 Mission ---------------- */}
      <section className="section band band--dark" id="our-mission">
        <div className="wrap">
          <div className="ab__head">
            <p className="eyebrow" data-rise>
              Our Mission
            </p>
            <h2 className="h2 display" data-clip>
              <span className="line">
                <span className="line__inner">Advance. Shape.</span>
              </span>
              <span className="line">
                <span className="line__inner">
                  Build. <em>Connect.</em>
                </span>
              </span>
            </h2>
            <p className="mis__statement" data-rise>
              {MISSION.statement}
            </p>
          </div>

          {/* Four, numbered, because the statement above names them in this
              order — the cards are that sentence opened out. */}
          <ol className="mis__pillars">
            {MISSION_PILLARS.map((p) => (
              <li key={p.n} data-rise>
                <span className="mis__n display">{p.n}</span>
                <h3 className="mis__name">{p.name}</h3>
                <p className="mis__body">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- The IBA Core (3.5's six dimensions) ---------------- */}
      <IbaCore />

      {/* ---------------- 3.3 Initiatives ---------------- */}
      <section className="section band band--dark" id="initiatives">
        <div className="wrap">
          <div className="ab__head">
            <p className="eyebrow" data-rise>Initiatives</p>
            <h2 className="h2 display" data-clip>
              <span className="line">
                <span className="line__inner">Initiatives That</span>
              </span>
              <span className="line">
                <span className="line__inner">
                  <em>Impact</em>
                </span>
              </span>
            </h2>
          </div>

          <Orbit items={INITIATIVES} />
        </div>
      </section>

      {/* ---------------- 3.4 The Team ---------------- */}
      <section className="section band band--light" id="the-team">
        <div className="wrap">
          <div className="ab__head">
            <p className="eyebrow" data-rise>The Team</p>
            <h2 className="h2 display" data-clip>
              <span className="line">
                <span className="line__inner">The People Behind</span>
              </span>
              <span className="line">
                <span className="line__inner">
                  the <em>Alliance</em>
                </span>
              </span>
            </h2>
          </div>

          <ul className="ab__team">
            {TEAM.map((m) => (
              <li key={m.name} data-rise>
                <div className="ab__portrait" aria-hidden="true">
                  <span>
                    {m.name
                      .split(' ')
                      .map((w) => w[0])
                      .join('')}
                  </span>
                </div>
                <h3 className="ab__memberName">{m.name}</h3>
                <p className="ab__memberRole">{m.role}</p>
                {m.bio ? (
                  <p className="ab__memberBio">{m.bio}</p>
                ) : (
                  /* Said plainly rather than filled with lorem: a placeholder a
                     reader can see is a placeholder cannot ship by accident. */
                  <p className="ab__pending">Biography to be supplied.</p>
                )}
                {m.linkedin && (
                  <a
                    className="arrow arrow--red"
                    href={m.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    LinkedIn <span aria-hidden="true">→</span>
                  </a>
                )}
              </li>
            ))}
          </ul>

          <div className="ab__advisory" data-rise>
            <div>
              <h3 className="ab__advisoryName">Advisory Network</h3>
              <p className="ab__advisoryBody">
                100+ global advisors across policy, law, finance, engineering and academia
                support IBA mandates.
              </p>
              {/* 3.6 asks for a grid of 8–12 advisor cards. None have been
                  supplied, so there is no grid: eight grey silhouettes standing
                  in for real people who have not agreed to be named is a worse
                  outcome than a line saying the profiles are coming. See
                  ADVISORS in about.js — filling that array is the only edit. */}
              <p className="ab__pending">{ADVISORS_PENDING}</p>
            </div>
            <Go className="btn btn--primary btn--sm" href="#connect" data-enquiry="">
              Join the Alliance
            </Go>
          </div>
        </div>
      </section>

      {/* ---------------- 3.4 Global Presence ---------------- */}
      <GlobalPresence />

      {/* ---------------- 3.5 Impact ---------------- */}
      {/* band--own because Global Presence above it is dark too, and two dark
          bands are otherwise spaced as one region — which is right when the
          second is a figure strip belonging to the first, and wrong here, where
          both are full sections with their own heads. */}
      <section className="section band band--dark band--own" id="impact-numbers">
        <div className="wrap">
          <div className="ab__head">
            <p className="eyebrow" data-rise>Impact</p>
            {/* an h2, not the h1 the brief gives it — the page already has one,
                and two would leave a screen reader without a single title */}
            <h2 className="h2 display" data-clip>
              <span className="line">
                <span className="line__inner">Impact, Not</span>
              </span>
              <span className="line">
                <span className="line__inner">
                  <em>Announcements</em>
                </span>
              </span>
            </h2>
          </div>

          {/* The home page's Impact layout, and for its reason rather than for
              consistency's sake: the eight numbers are two different kinds of
              claim. The four on the left are a running tally still growing, so
              they count up as they arrive; the four in the panel are settled
              portfolio facts, so they are printed. As one flat row of eight
              tiles the page was asserting they were the same thing. */}
          <div className="impact__grid">
            <div className="impact__stats">
              {IMPACT_PRIMARY.map((s) => (
                <div className="impact__card" key={s.label} data-rise>
                  {/* the final value is in the markup, so it is correct before
                      the counter runs — and stays correct if it never does */}
                  <span
                    className="impact__k"
                    data-count={s.to}
                    data-prefix={s.prefix}
                    data-suffix={s.suffix}
                  >
                    {s.prefix}
                    {s.to}
                    {s.suffix}
                  </span>
                  <span className="impact__v">{s.label}</span>
                </div>
              ))}
            </div>

            <div className="impact__panel" data-rise>
              <div className="impact__panelCopy">
                <p className="eyebrow">Portfolio</p>
                <ul className="impact__facts">
                  {IMPACT_SECONDARY.map((s) => (
                    <li key={s.k}>
                      <strong>{s.k}</strong>
                      <span>{s.v}</span>
                    </li>
                  ))}
                </ul>
                {/* a bare hash: this page now ends on its own connect band, so
                    the ask is a scroll rather than a trip to the home page */}
                <Go className="btn btn--primary btn--sm" href="#connect" data-enquiry="">
                  See Our Work
                </Go>
              </div>
              <ImpactSlab />
            </div>
          </div>

          <div className="ab__tokens">
            <h3 className="ab__tokensName" data-rise>
              When Code Becomes Capital — <em>Tokenomics</em>
            </h3>
            <Tokenomics />
          </div>
        </div>
      </section>

      {/* ---------------- the ask ---------------- */}
      {/* The same band the home page and every section page close on. */}
      <Closing />
    </div>
  )
}
