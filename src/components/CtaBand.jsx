/**
 * The closing call-to-action band — brand guidelines §05/§06: the only
 * full-red section, once per page, directly above the footer, with a black
 * button. App renders it on every page but home, whose own closing section
 * (sections/GetInTouch.jsx) is that page's red band.
 */

export default function CtaBand() {
  return (
    <section className="cta-band" aria-labelledby="cta-band-title">
      <div className="cta-band__inner">
        <div>
          <h2 className="cta-band__title" id="cta-band-title">
            Ready to start?
          </h2>
          <p className="cta-band__text">
            Talk to our team about membership, corridors, consulting or the Red Club.
          </p>
        </div>
        <a className="bb-btn bb-btn--black" href="/connect" data-enquiry="">
          Book a call
        </a>
      </div>
    </section>
  )
}
