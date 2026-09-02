/**
 * 4.6 — Cross-Industry Blockchain Consulting.
 *
 * One panel per sector, first open. The count beside each name is the number of
 * capabilities inside it, so the collapsed page still says how deep each sector
 * goes rather than presenting nine identical closed rows.
 *
 * The headline's "16+ verticals" is the brief's claim; nine are on record. See
 * the note in services.js.
 */

import { ServicePage, Band, Head, Panels, Cta } from '../../sections/service/ServiceBlocks'
import { SECTORS } from '../../services'

export default function SectorExpertise() {
  return (
    <ServicePage
      back="/services"
      eyebrow="Services · 06"
      lines={[
        'Cross-Industry',
        <>
          Blockchain <em>Consulting</em>
        </>,
      ]}
      sub="Specialized knowledge across 16+ high-impact verticals."
    >
      <Band tone="light" id="sectors">
        <Head
          eyebrow="Sectors"
          lines={[
            'Where the Work',
            <>
              Has <em>Landed</em>
            </>,
          ]}
        />
        <Panels items={SECTORS} />
        <Cta label="Scope a Project With Us" />
      </Band>
    </ServicePage>
  )
}
