/**
 * 6.0 — The Studio.
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
  CORRIDOR_INTRO,
  COUNCILS,
  COUNCILS_NOTE,
  GOV_CLIENTS,
  GOV_PROJECTS,
  GOV_PROJECTS_MORE,
  STUDIO_INTRO,
  STUDIO_SECTIONS,
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
      eyebrow="Studio"
      lines={[
        'The',
        <>
          <em>Studio</em>
        </>,
      ]}
      sub="Our ecosystem — the partners, clients, governments and corridors we build with."
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
        label: 'The ecosystem, in four views',
        rail: STUDIO_SECTIONS.map((s, i) => ({
          n: `0${i + 1}`,
          name: s.label,
          href: s.href,
        })),
        spectrum: COUNCILS,
      }}
    >
      {/* Shares the hero's dark ground rather than opening a band: it is the
          intro's two figures shown, not a section of its own. Two dark bands
          meeting are spaced as one region — see .band--dark + .band--dark. */}
      <Band tone="dark" id="reach">
        <Stats items={REACH} cols={2} />
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
          note={CORRIDOR_INTRO}
        />
        <Pending items={CORRIDORS} />
        <Cta label="Partner on a Corridor" />
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
          title="Want to work with us rather than beside us?"
          body="The Studio is the ecosystem. Services is what IBA is brought in to do inside it."
          cta="Go to Services"
          href="/services"
        />
      </Band>
    </ServicePage>
  )
}
