import Hero from '../sections/Hero'
import Credibility from '../sections/Credibility'
import WhatWeDo from '../sections/WhatWeDo'
import Impact from '../sections/Impact'
import TrustedBy from '../sections/TrustedBy'
import Verifyble from '../sections/Verifyble'
import Library from '../sections/Library'
import Closing from '../sections/Closing'

/**
 * Band rhythm — dark and light alternate the whole way down:
 *
 *   2.1 Hero + 2.2 Credibility   dark   (the evolution)
 *   2.3 What We Do               light
 *   2.4 Impact                   dark
 *   2.5 Trusted By               light
 *   2.6 Verifyble                dark
 *   2.7 Library                  light
 *   2.8 Closing                  dark
 *
 * The credibility bar deliberately shares the hero's dark ground rather than
 * taking a band of its own — it is a bar, not a section, and giving it one
 * would break the alternation for four numbers.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Credibility />
      <WhatWeDo />
      <Impact />
      <TrustedBy />
      <Verifyble />
      <Library />
      <Closing />
    </>
  )
}
