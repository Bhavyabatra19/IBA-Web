/**
 * The Tokenization graphic: the client's render of a token on a glowing
 * platform, wired to five real-world assets (an institution, a building,
 * a certificate, gold and forest land), public/images/tokenization-hero.webp,
 * from the supplied PNG (kept beside it).
 *
 * Shown as supplied, like the other pages' hero renders, with its black
 * ground made transparent in the WebP (alpha from brightness, colour
 * un-premultiplied), so only the lit render shows over each section's own
 * gradient; it floats slowly over a soft red glow. Used on the Tokenization hero and the Expertise page's
 * Tokenization band. Reduced motion: still. Styles in brandbook.css (.tkh).
 */

export default function TokenHero() {
  return (
    <div className="tkh">
      <span className="tkh__glow" aria-hidden="true" />
      <img
        className="tkh__img"
        src="/images/tokenization-hero.webp"
        alt="A token on a glowing platform, connected to real-world assets: an institution, a building, a certificate, gold and land"
        width="920"
        height="920"
        decoding="async"
      />
    </div>
  )
}
