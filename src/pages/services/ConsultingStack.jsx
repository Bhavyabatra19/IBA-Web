/**
 * 4.1 — The IBA Consulting Stack.
 *
 * Capabilities, then the order they happen in, then the two tracks that run
 * before a line is written, then what it is built on. The page is a sequence
 * because the engagement is.
 */

import { ServicePage, Band, Head, Tiles, Orbit, Tracks, Tags, Cta } from '../../sections/service/ServiceBlocks'
import { STACK_CAPABILITIES, STACK_STEPS, STACK_TRACKS, STACK_TOOLS } from '../../services'

export default function ConsultingStack() {
  return (
    <ServicePage
      back="/services"
      eyebrow="Services · 01"
      lines={[
        'The IBA',
        <>
          Consulting <em>Stack</em>
        </>,
      ]}
      sub="Insights | Impact | Innovation"
    >
      <Band tone="light" id="capabilities">
        <Head
          eyebrow="Capabilities"
          lines={[
            'Six Things We',
            <>
              Are Brought <em>In</em> For
            </>,
          ]}
        />
        <Tiles items={STACK_CAPABILITIES} cols={3} />
      </Band>

      <Band tone="dark" id="how-we-work">
        <Head
          eyebrow="How We Work"
          lines={[
            'Assessment to',
            <>
              <em>Ecosystem</em>
            </>,
          ]}
        />
        {/* The one block on this page that is a sequence rather than a set, so
            it is the one taken a step at a time — see Orbit. */}
        <Orbit items={STACK_STEPS} />
      </Band>

      <Band tone="light" id="tech-process">
        <Head
          eyebrow="The Tech Process"
          lines={[
            'Two Tracks, Run',
            <>
              Before a Line is <em>Written</em>
            </>,
          ]}
        />
        <Tracks items={STACK_TRACKS} />
      </Band>

      <Band tone="dark" id="tools">
        <Head
          eyebrow="Tools & Technology"
          lines={[
            'What We',
            <>
              Build <em>On</em>
            </>,
          ]}
        />
        <Tags items={STACK_TOOLS} label="Blockchain platforms and frameworks IBA works with" />
        <Cta label="Scope a Project With Us" />
      </Band>
    </ServicePage>
  )
}
