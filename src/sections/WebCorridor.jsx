/**
 * Web3 Corridor feature band. Light.
 *
 * The flagship programme, sitting directly under the counters — so the reader
 * meets the numbers that say IBA is real and then immediately the thing it most
 * wants to be known for.
 *
 * The map is components/WorldMap, which this band used to own outright. Section
 * 7 asks for the same map on the corridor page with routes drawn on it, and two
 * copies of nineteen coastlines would drift apart the first time either was
 * corrected — so the map moved out and this band passes it the four markets.
 *
 * No arcs here, deliberately. This is where the corridors REACH; the flagship
 * page is where they travel, and giving the teaser the same picture as the page
 * it is teasing leaves the page with nothing to arrive at.
 */

import { useLayoutEffect, useRef } from 'react'
import { gsap, revealLines, revealRise, reducedMotion } from '../lib/scroll'
import WorldMap from '../components/WorldMap'
import { Go } from './service/ServiceBlocks'

export default function WebCorridor() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const el = root.current
    const ctx = gsap.context(() => {
      if (reducedMotion()) return
      revealLines(el, { trigger: el })
      revealRise(el, { trigger: el })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section
      className="corr section band band--light band--own"
      ref={root}
      id="web3-corridor"
    >
      <div className="wrap corr__inner">
        <div className="corr__copy">
          <p className="eyebrow corr__eyebrow" data-rise>
            Flagship Programme
          </p>
          <h2 className="h2 h2--col display" data-clip>
            <span className="line">
              <span className="line__inner">Web3 Corridors —</span>
            </span>
            <span className="line">
              <span className="line__inner">
                <em>Connecting Economies</em>
              </span>
            </span>
          </h2>
          <p className="corr__body" data-rise>
            Structured cross-border programmes linking regulators, capital, talent and
            projects between markets that should be trading with each other, and mostly
            aren’t yet.
          </p>

          {/* The two corridors, named and described on the home page rather
              than only on the flagship page. They are the proof the sentence
              above is a programme and not an ambition. */}
          <ul className="corr__live" data-rise>
            {[
              {
                name: 'India – UAE',
                body: "Live corridor connecting two of the alliance's most active regulatory and capital markets.",
              },
              {
                name: 'India – Spain – LATAM',
                body: 'Live corridor opening talent and project flow between India, Europe and Latin America.',
              },
            ].map((c) => (
              <li key={c.name}>
                <h3 className="corr__liveName">{c.name}</h3>
                <p className="corr__liveBody">{c.body}</p>
              </li>
            ))}
          </ul>

          <Go className="btn btn--primary btn--row" href="/corridor" data-rise>
            Explore Web3 Corridors
            <span aria-hidden="true">→</span>
          </Go>
        </div>

        <WorldMap data-rise />
      </div>
    </section>
  )
}
