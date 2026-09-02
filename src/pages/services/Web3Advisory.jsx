/**
 * 4.2 — Web3 Advisory.
 *
 * Note on the brief: Strategy Management is described there as "four pillars"
 * and then six are listed. All six are on the page — dropping two to match a
 * count would lose content, and the count is the easier thing to be wrong.
 */

import { ServicePage, Band, Head, Chips, Groups, Tiles, Cta } from '../../sections/service/ServiceBlocks'
import { WEB3_CAPABILITIES, WEB3_OFFERINGS, WEB3_PILLARS } from '../../services'

export default function Web3Advisory() {
  return (
    <ServicePage
      back="/services"
      eyebrow="Services · 02"
      lines={[
        'Web3',
        <>
          <em>Advisory</em>
        </>,
      ]}
      sub="A potent and versatile vision for a new blockchain-based future."
      intro="Web3 is a potent and versatile vision for a new blockchain-based future, including elements such as Web3 crypto. Many businesses are considering the real-world implications of Web3 to leverage the potential of a decentralized economy. We help them separate the signal from the noise."
    >
      <Band tone="light" id="capabilities">
        <Head
          eyebrow="Advisory Capabilities"
          lines={[
            'Six Places We',
            <>
              Take the <em>Weight</em>
            </>,
          ]}
        />
        <Chips items={WEB3_CAPABILITIES} />
      </Band>

      <Band tone="dark" id="offerings">
        <Head
          eyebrow="Power Consulting Offerings"
          lines={[
            'Everything an Offering',
            <>
              Actually <em>Takes</em>
            </>,
          ]}
        />
        <Groups items={WEB3_OFFERINGS} cols={2} />
      </Band>

      <Band tone="light" id="strategy">
        <Head
          eyebrow="Strategy Management"
          lines={[
            'The Pillars We',
            <>
              Manage <em>Against</em>
            </>,
          ]}
        />
        <Tiles items={WEB3_PILLARS} cols={3} />
        <Cta label="Book an Advisory Call" />
      </Band>
    </ServicePage>
  )
}
