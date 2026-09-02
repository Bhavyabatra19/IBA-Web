/**
 * 4.3 — Legal Advisory for Digital Assets.
 *
 * The disclaimer is marked required in the brief and is treated as such: it is
 * a section of the page with its own ground, not a footnote set in grey under
 * the fold. A reader who reaches the call to action has passed it.
 */

import { ServicePage, Band, Head, Chips, Cta } from '../../sections/service/ServiceBlocks'
import { LEGAL_SERVICES, LEGAL_NOTE, LEGAL_DISCLAIMER } from '../../services'

export default function LegalAdvisory() {
  return (
    <ServicePage
      back="/services"
      eyebrow="Services · 03"
      lines={[
        'Legal Advisory',
        <>
          for <em>Digital Assets</em>
        </>,
      ]}
      sub="Regulation is not a barrier. It is a design constraint. We help you design for it."
    >
      <Band tone="light" id="legal-services">
        <Head
          eyebrow="Services"
          lines={[
            'Where Counsel',
            <>
              Is <em>Brought In</em>
            </>,
          ]}
        />
        <Chips items={LEGAL_SERVICES} />
      </Band>

      <Band tone="dark" id="standards">
        <div className="svc__note-block" data-rise>
          <p className="eyebrow">Standards & Policy</p>
          <p className="svc__lede">{LEGAL_NOTE}</p>
        </div>

        {/* Required. Given a panel of its own so it reads as a term of the
            engagement rather than as small print. */}
        <aside className="svc__disclaimer" data-rise>
          <p className="svc__disclaimerK">Disclaimer</p>
          <p>{LEGAL_DISCLAIMER}</p>
        </aside>

        <Cta label="Request a Regulatory Review" />
      </Band>
    </ServicePage>
  )
}
