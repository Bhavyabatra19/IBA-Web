/**
 * 7 — Web3 Corridor. The flagship page.
 *
 * The brief gives this section "the most distinct visual treatment on the site —
 * dark background, red arc motifs, map-led", and that is what decides the shape
 * here: the hero's object is the world map with the corridors drawn travelling
 * across it, rather than the numbered console every other landing page opens on.
 * A corridor is a route, and a route is the one thing a rail of six names cannot
 * show.
 *
 * The two corridors are imported from studio.js, where the Ecosystem page reads
 * the same array. Both are marked pending there and both are still pending here:
 * objectives, partners, programmes and how to participate are all outstanding.
 * A cross-border programme with invented objectives is a commitment the website
 * made on IBA's behalf, so the headings ship and the copy does not.
 *
 * ⚠ THE FORM SUBMITS NOWHERE. Same position as every other form on the site —
 * see lib/previewSession.js. It says so on screen rather than showing a success
 * state for an application nobody received.
 */

import { useRef, useState } from 'react'
import {
  ServicePage,
  Band,
  Head,
  Tiles,
  Pending,
  Cross,
  Go,
} from '../../sections/service/ServiceBlocks'
import {
  Area,
  Check,
  FormNotice,
  Select,
  Text,
} from '../../sections/library/FormBlocks'
import WorldMap, { CORRIDOR_ARCS } from '../../components/WorldMap'
import { scrollToId } from '../../lib/scroll'
import { COUNTRIES } from '../../library'
import { PENDING, LEGAL } from '../../nav'
import { CORRIDORS } from '../../studio'
import {
  CORRIDOR_AUDIENCES,
  CORRIDOR_CADENCE,
  CORRIDOR_INTRO,
  CORRIDOR_OPTIONS,
  CORRIDOR_PROPOSE,
  CORRIDOR_PILLARS,
  CORRIDOR_ROLES,
} from '../../corridor'

export default function Corridor() {
  const [notice, setNotice] = useState(null)
  /* The one controlled field on the page. "Propose a New Corridor" is this
     select's fourth option, not a second form — see the note on
     CORRIDOR_OPTIONS. */
  const [corridor, setCorridor] = useState('')
  const form = useRef(null)

  const propose = () => {
    setCorridor(CORRIDOR_PROPOSE)
    scrollToId('#join')
    /* after the scroll, so the browser does not fight it to bring focus into
       view; the reader lands on the form with the answer already filled in */
    setTimeout(() => form.current?.querySelector('textarea')?.focus(), 700)
  }

  const submit = (e) => {
    e.preventDefault()
    /* TODO: POST to the real enquiry endpoint. Until one exists, do not pretend
       an application was received — say what actually happened. */
    setNotice(
      'Nothing was sent — there is no enquiry backend yet. Email hello@indiablockchainalliance.org and we will pick it up from there.'
    )
  }

  return (
    <ServicePage
      eyebrow="Flagship Programme"
      lines={[
        'Web3 Corridors —',
        <>
          Connecting <em>Economies</em>
        </>,
      ]}
      sub="Bridging nations through blockchain."
      intro={CORRIDOR_INTRO}
      showcase={{
        ghost: 'Corridors',
        cta: { label: 'Apply to Join a Corridor', href: '#join' },
        /* The global presence map, filtered to the corridor countries, with the
           three legs drawn travelling between them. */
        visual: <WorldMap arcs={CORRIDOR_ARCS} className="corr__map--hero" />,
      }}
    >
      <Band tone="light" id="corridors">
        <Head
          eyebrow="Live Corridors"
          lines={[
            'Two Corridors,',
            <>
              Four <em>Markets</em>
            </>,
          ]}
          note="Each corridor is a standing programme with its own partners, regulators and intake. The write-ups below are outstanding — the four headings are what each will carry."
        />
        <Pending items={CORRIDORS} />
      </Band>

      <Band tone="dark" id="how-corridors-work">
        <Head
          eyebrow="How Corridors Work"
          lines={[
            'Four Dimensions,',
            <>
              One <em>Programme</em>
            </>,
          ]}
        />
        <Tiles items={CORRIDOR_PILLARS} cols={2} />

        {/* The rhythm the four pillars run on, and the brief marks it a
            placeholder in as many words. It is shown as outstanding rather than
            filled in with a plausible quarterly calendar. */}
        <div className="cor__cadence">
          <Pending items={[CORRIDOR_CADENCE]} />
        </div>
      </Band>

      <Band tone="light" id="who">
        <Head
          eyebrow="Join a Corridor"
          lines={[
            'Who Corridors',
            <>
              Are <em>For</em>
            </>,
          ]}
        />
        <Tiles items={CORRIDOR_AUDIENCES} cols={3} />
      </Band>

      <Band tone="dark" id="join">
        <Head
          eyebrow="Apply"
          lines={[
            'Tell Us Which',
            <>
              Corridor, and <em>Why</em>
            </>,
          ]}
          note="One form for both corridors — and for a corridor that does not exist yet."
        />

        <div className="cor__apply" data-rise>
          <form className="form" ref={form} onSubmit={submit}>
            <Text label="Name" name="name" autoComplete="name" required />
            <Text
              label="Organisation"
              name="organisation"
              autoComplete="organization"
              required
            />
            <Text
              label="Work email"
              name="email"
              type="email"
              autoComplete="email"
              required
            />
            <Select
              label="Country"
              name="country"
              options={COUNTRIES}
              required
              placeholder="Select your country"
            />
            <Select
              label="Corridor"
              name="corridor"
              options={CORRIDOR_OPTIONS}
              required
              placeholder="Select a corridor"
              value={corridor}
              onChange={(e) => setCorridor(e.target.value)}
            />
            <Select
              label="I am a"
              name="role"
              options={CORRIDOR_ROLES}
              required
              placeholder="Select one"
            />
            <Area
              label="What you’re looking for"
              name="looking"
              rows={5}
              required
              hint="Market entry, capital, talent, a pilot — whatever brought you here."
            />

            <div className="form__consents">
              <Check
                name="consent"
                required
                label={
                  <>
                    I agree to the <Go href={PENDING.terms}>Terms</Go> and{' '}
                    <Go href={LEGAL.privacy}>Privacy Policy</Go>
                  </>
                }
              />
            </div>

            {notice && <FormNotice>{notice}</FormNotice>}

            <button type="submit" className="btn btn--primary btn--block">
              Apply to Join a Corridor
            </button>

            {/* The secondary action, and it is a button rather than a link
                because it goes nowhere: it answers the Corridor field above
                with its fourth option and puts the cursor in the one field that
                then matters. A second page for a proposal would be a second
                inbox for the same enquiry. */}
            <button type="button" className="btn btn--ghost btn--block" onClick={propose}>
              Propose a New Corridor
            </button>
          </form>
        </div>
      </Band>

      <Band tone="light" id="ecosystem-crosslink">
        <Cross
          title="Everything else IBA convenes."
          body="Corridors are the flagship. The initiatives, organisations and councils around them are the ecosystem they run through."
          cta="Go to Ecosystem"
          href="/studio"
        />
      </Band>
    </ServicePage>
  )
}
