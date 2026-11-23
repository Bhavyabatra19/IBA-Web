/**
 * The India Entry Strategy graphic: the client's render (11-23) of a glass
 * globe on a lit platform, India glowing at its centre with arcs to Europe,
 * the UAE, the Americas and Africa. public/images/india-entry-globe.webp,
 * cut from the supplied hero mockup (india-entry-hero-source.webp, kept
 * beside it): its dark ground made transparent, so the render sits on each
 * section's own background, as the Tokenization render does.
 *
 * Moves like the site's other hero renders (by request): a slow 3D sway, the
 * globe turning gently in perspective, while it floats over a soft red glow.
 * (A flat spin, as the Corridor globe has, would turn the labels and the
 * platform upside down.) Used on the India Entry Strategy hero and the
 * Expertise page's India Entry band. Reduced motion: still.
 * Styles in brandbook.css (.ieg).
 */

export default function IndiaGateway() {
  return (
    <div className="ieg">
      <span className="ieg__glow" aria-hidden="true" />
      <div className="ieg__stage">
        <img
          className="ieg__img"
          src="/images/india-entry-globe.webp"
          alt="A glass globe on a lit platform, India glowing at its centre, with arcs to Europe, the UAE, the Americas and Africa"
          width="975"
          height="775"
          decoding="async"
        />
      </div>
    </div>
  )
}
