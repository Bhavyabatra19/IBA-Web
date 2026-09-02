/**
 * 4.5 — White Label Solutions.
 *
 * Two groups of deployable platforms. Each entry is a name and what it is, so
 * they are set as a described list rather than as bare chips — "Blockchain IoT"
 * on its own tells a reader nothing they did not already guess.
 */

import { ServicePage, Band, Head, Tiles, Cta } from '../../sections/service/ServiceBlocks'
import { WHITE_LABEL } from '../../services'

export default function WhiteLabel() {
  const [financial, platforms] = WHITE_LABEL

  return (
    <ServicePage
      back="/services"
      eyebrow="Services · 05"
      lines={[
        'White Label',
        <>
          <em>Solutions</em>
        </>,
      ]}
      sub="Deployable platforms. Your brand. Our rails."
    >
      <Band tone="light" id="financial-infrastructure">
        <Head
          eyebrow={financial.group}
          lines={[
            'Rails That Already',
            <>
              Move <em>Money</em>
            </>,
          ]}
        />
        <Tiles items={financial.items} cols={3} />
      </Band>

      <Band tone="dark" id="platforms-issuance">
        <Head
          eyebrow={platforms.group}
          lines={[
            'Stacks You Can',
            <>
              Put Your <em>Name</em> On
            </>,
          ]}
        />
        <Tiles items={platforms.items} cols={3} />
        <Cta label="Request a Demo" />
      </Band>
    </ServicePage>
  )
}
