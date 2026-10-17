import Hero from '../sections/Hero'
import Credibility from '../sections/Credibility'
import ImpactBand from '../sections/ImpactBand'
import CorridorBand from '../sections/CorridorBand'
import WhatWeDoCards from '../sections/WhatWeDoCards'
import AcademiaCards from '../sections/AcademiaCards'
import PresenceGlobe from '../sections/PresenceGlobe'
import EcosystemMarquee from '../sections/EcosystemMarquee'
import KnowledgeBase from '../sections/KnowledgeBase'
import GetInTouch from '../sections/GetInTouch'

/**
 * The home page, in the supplied running order.
 *
 *   Hero             dark    centred, with the rolling claim
 *   Credibility      light   the four figures, as cards
 *   Impact band      dark    the headline figures as one sentence
 *   Corridor band    light   the flagship programme, left-aligned
 *   What we do       light   train, advise, build — three cards
 *   Academia cards   light   students and institutions — two cards
 *   Presence globe   light   present in 14 countries, the curved map
 *   Ecosystem        light   partner chips in two opposing marquees
 *   Knowledge base   light   four library items, two up, and the sign-up
 *   Get in touch     dark    the ask, directly above the footer
 *
 * The founder band moved to /about (by request), where the founder's letter
 * and portrait already sit.
 *
 * These replace the earlier home bands (WebCorridor, WhatWeDo, Academia,
 * GlobalPresence, TrustedBy, Impact, Library, Closing). Their files are kept:
 * GlobalPresence and ImpactSlab still run on /about, and the rest are there
 * to reuse. The anchors they carried moved with them — #library is now the
 * knowledge base, #connect is get in touch.
 */
export default function Home() {

  /**
   * ⚠ THE DARK-BAND PARALLAX IS GONE, and it was removed rather than left
   * running on nothing.
   *
   * It scrubbed `background-position` on every dark band, and the only layer
   * that moved was the 84px grid in each band's ambient background. The brand
   * guidelines took that background away — section 01 asks for flat colour and
   * no gradients, so a dark band is now flat IBA Black (see the note in
   * styles.css). With no grid to move, the effect animated a property with
   * nothing in it: a ScrollTrigger per band, a scrub per frame, and no pixel
   * changing anywhere.
   *
   * Section 07 is the other half of the reason: "nothing decorative that
   * doesn't carry meaning."
   */

  return (
    <div>
      <Hero />
      <Credibility />
      <ImpactBand />
      <CorridorBand />
      <WhatWeDoCards />
      <AcademiaCards />
      <PresenceGlobe />
      <EcosystemMarquee />
      <KnowledgeBase />
      <GetInTouch />
    </div>
  )
}
