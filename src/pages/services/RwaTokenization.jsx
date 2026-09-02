/**
 * 4.4 — Real World Asset Tokenization.
 *
 * The track record here is the About page's tokenomics record — the same four
 * projects and the same figures — so it is the same component reading the same
 * data, not a second table typed out beside it. The aggregate is likewise the
 * three Impact counters that already exist.
 */

import { ServicePage, Band, Head, Chips, Stats, Cta } from '../../sections/service/ServiceBlocks'
import Tokenomics from '../../sections/Tokenomics'
import { RWA_LIFECYCLE } from '../../services'
import { IMPACT_PRIMARY } from '../../content'

/* the three the brief names as the aggregate, taken from the counters the rest
   of the site already publishes rather than restated as copy */
const AGGREGATE = IMPACT_PRIMARY.filter((s) =>
  ['Tokenized Assets', 'Jurisdictions', 'Live Blockchains'].includes(s.label)
)

export default function RwaTokenization() {
  return (
    <ServicePage
      back="/services"
      eyebrow="Services · 04"
      lines={[
        'Real World Asset',
        <>
          <em>Tokenization</em>
        </>,
      ]}
      sub="Structuring, issuance and investor access."
      intro="IBA supports the tokenization of real world assets — from structuring and issuance through to listing and ongoing ecosystem support. We work across the full lifecycle."
    >
      <Band tone="light" id="lifecycle">
        <Head
          eyebrow="The Lifecycle"
          lines={[
            'Six Stages,',
            <>
              One <em>Engagement</em>
            </>,
          ]}
        />
        <Chips items={RWA_LIFECYCLE} />
      </Band>

      <Band tone="dark" id="aggregate">
        <Head
          eyebrow="Aggregate"
          lines={[
            'What Has Been',
            <>
              Put <em>On Chain</em>
            </>,
          ]}
        />
        <Stats items={AGGREGATE} cols={3} />
      </Band>

      <Band tone="light" id="track-record">
        <Head
          eyebrow="Track Record"
          lines={[
            'When Code Becomes',
            <>
              <em>Capital</em>
            </>,
          ]}
        />
        <Tokenomics />
        <Cta label="Tokenize an Asset" />
      </Band>
    </ServicePage>
  )
}
