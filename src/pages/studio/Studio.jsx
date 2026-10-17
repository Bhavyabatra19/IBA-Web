/**
 * 5.0 — The Ecosystem landing.
 *
 * One page, four bands, not four pages. The brief sets 6.1–6.4 as H2s under a
 * single H1, and it is right to: Clients, Government Projects, Corridors and
 * Councils are four views of one ecosystem, and a reader who came for the
 * ecosystem wants to see it whole. The nav's five Studio items are anchors into
 * this page rather than five destinations.
 *
 * Its two headline figures — 75+ ecosystem partners, 70+ global affiliations —
 * are the counters the rest of the site already publishes, imported rather than
 * restated. See the note at the top of content.js.
 *
 * ⚠ The client and government walls are typeset names, not logos. See the
 * warning at the top of studio.js before publishing either.
 */

import {
  ServicePage,
  Band,
  Head,
  LogoWall,
  Stats,
  Tiles,
  Tags,
  Chips,
  Index,
  Pending,
  Cta,
  Cross,
} from '../../sections/service/ServiceBlocks'
import { CRED_STATS, IMPACT_PRIMARY } from '../../content'
/* Written by scripts/fetch-logos.mjs. Imported rather than fetched, so a client
   with no mark renders its name from the first paint — no 404, no broken image. */
import LOGOS from '../../logos.json'
import {
  CLIENT_GROUPS,
  CORRIDORS,
  CORRIDOR_TEASER,
  COUNCILS,
  COUNCILS_NOTE,
  GOV_CLIENTS,
  GOV_PROJECTS,
  GOV_PROJECTS_MORE,
  ECOSYSTEM_ENTRIES,
  STUDIO_INTRO,
} from '../../studio'

/* the two the intro names, taken from the counters the site already publishes
   rather than typed into the copy a second time */
const REACH = [
  ...IMPACT_PRIMARY.filter((s) => s.label === 'Ecosystem Partners'),
  ...CRED_STATS.filter((s) => s.label === 'Global Affiliations'),
]

export default function Studio() {
  return (
    <ServicePage
      art="studio"
      eyebrow="Ecosystem"
      lines={[
        'The IBA',
        <>
          <em>Ecosystem</em>
        </>,
      ]}
      sub="Initiatives, organisations, communities and people. Everything we convene rather than sell."
      intro={STUDIO_INTRO}
      /* The four sections are the rail, and every node is a link: the console is
         this page's contents list as well as its picture, which is why the jump
         list that used to sit under the figures below is gone — the same four
         anchors twice inside one screen is one time too many. */
      showcase={{
        /* Not "Studio": the H1 is already that word, and the same word set
           twice at two sizes on one line reads as a rendering fault rather than
           a watermark. So the ghost says what the Studio is instead. */
        ghost: 'Ecosystem',
        cta: { label: 'Become an ecosystem partner', href: '#connect' },
        label: 'The ecosystem, in five parts',
        rail: ECOSYSTEM_ENTRIES.map((e) => ({ n: e.n, name: e.name, href: e.href })),
        spectrum: COUNCILS,
      }}
    >
      {/* Shares the hero's dark ground rather than opening a band: it is the
          intro's two figures shown, not a section of its own. Two dark bands
          meeting are spaced as one region — see .band--dark + .band--dark. */}
      <Band tone="dark" id="reach">
        <Stats items={REACH} cols={2} />
      </Band>

      {/* The five ways in. Three of them are anchors further down this page and
          two are on pages that already hold the material — so this is a table
          of contents for the ecosystem rather than a menu of five destinations
          that would each need building first. */}
      <Band tone="light" id="ways-in" className="band--own">
        <Head
          eyebrow="Ways In"
          lines={[
            'Five Doors Into',
            <>
              One <em>Ecosystem</em>
            </>,
          ]}
        />
        <Index label="The five parts of the ecosystem" items={ECOSYSTEM_ENTRIES} />
        <Cta label="Become an Ecosystem Partner" />
      </Band>

      <Band tone="light" id="clients">
        <Head
          eyebrow="Clients"
          lines={[
            'Trusted Across',
            <>
              Sectors and <em>Borders</em>
            </>,
          ]}
        />
        <LogoWall groups={CLIENT_GROUPS} manifest={LOGOS} />
      </Band>

      <Band tone="dark" id="government-projects">
        <Head
          eyebrow="Government Projects"
          lines={[
            'Building the',
            <>
              Blockchain-Powered <em>Nation</em>
            </>,
          ]}
        />
        <Tiles items={GOV_PROJECTS} cols={2} />
        <p className="svc__note svc__note--after" data-rise>
          {GOV_PROJECTS_MORE}
        </p>
        <div className="stu__govClients">
          <p className="eyebrow" data-rise>
            Government Clients
          </p>
          <Tags items={GOV_CLIENTS} label="Government bodies IBA has worked with" />
        </div>
      </Band>

      <Band tone="light" id="web3-corridors">
        <Head
          eyebrow="Web3 Corridors"
          lines={[
            'Bridging Nations',
            <>
              Through <em>Blockchain</em>
            </>,
          ]}
          note={CORRIDOR_TEASER}
        />
        <Pending items={CORRIDORS} />
        {/* At the flagship page, not at this page's connect band: the corridors
            have a page of their own now, and it is where both the four pillars
            and the application form live. */}
        <Cta label="Explore Web3 Corridors" href="/corridor" />
      </Band>

      <Band tone="dark" id="councils">
        <Head
          eyebrow="Councils & Affiliations"
          lines={[
            'Where the Standards',
            <>
              Get <em>Written</em>
            </>,
          ]}
          note={COUNCILS_NOTE}
        />
        <Chips items={COUNCILS} />
        <Cta label="Become an Ecosystem Partner" />
      </Band>

      <Band tone="light" id="services-crosslink">
        <Cross
          title="Want us working for you rather than beside you?"
          body="Ecosystem is everything IBA convenes. Expertise is what it is brought in to do."
          cta="Go to Expertise"
          href="/services"
        />
      </Band>
    </ServicePage>
  )
}
