/**
 * Get in touch — the ask, in a dark panel the width of the hero, after the
 * knowledge base. Copy and the direct lines on the left; on the right a card
 * that starts an enquiry on the right topic.
 *
 * The panel reuses the hero's ground — IBA black crossed by the red light
 * beam — so the page closes in the same frame it opened in. Email and phone
 * come from CONTACT in nav.js, the one place they are kept.
 */

import { useLayoutEffect, useRef } from 'react'
import { gsap, revealRise, reducedMotion } from '../lib/scroll'
import { CONTACT } from '../nav'
import { waLink } from '../enquiry'

/* each row opens the site's enquiry form already set to that topic */
const TOPICS = [
  { label: 'Memberships', note: 'Join the alliance and its network', topic: 'Ecosystem partnership' },
  { label: 'Web3 Corridor', note: 'Enter a market through a corridor', topic: 'Web3 Corridor' },
  { label: 'Consulting', note: 'Scope an advisory or delivery project', topic: 'Consulting' },
  { label: 'Red Club', note: 'Events, programmes and labs', topic: 'Red Club (learner)' },
]

export default function GetInTouch() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const el = root.current
    const ctx = gsap.context(() => {
      if (reducedMotion()) return
      revealRise(el, { trigger: el, start: 'top 82%', stagger: 0.08 })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="git band band--light band--own" ref={root} id="connect" aria-labelledby="git-title">
      <div className="git__panel">
        <div className="git__beam" aria-hidden="true" />

        <div className="git__copy">
          <p className="hero__kicker" data-rise>
            <svg className="hero__kicker-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2.5 20.5 7v10L12 21.5 3.5 17V7L12 2.5Z" />
              <path d="M3.5 7 12 11.5 20.5 7M12 11.5v10" />
            </svg>
            Get in Touch
          </p>
          <h2 className="git__title" id="git-title" data-rise>
            IBA: Connecting Economies.
            <br />
            Rewriting the Rules.
          </h2>
          <p className="git__lede" data-rise>
            Connecting Economies. Block by Block.
            <br />
            Talk to our team about memberships, corridors, consulting or the Red Club.
          </p>
          <div className="git__actions" data-rise>
            <a className="git__btn git__btn--primary" href="#connect" data-enquiry="">
              Connect With Us <span aria-hidden="true">→</span>
            </a>
          </div>
          {/* the direct lines, as three icon buttons — email, phone, WhatsApp;
              the address itself is the label (screen readers, hover tooltip) */}
          <ul className="git__lines git__lines--icons" data-rise>
            <li>
              <a href={CONTACT.email.href} aria-label={`Email ${CONTACT.email.label}`} title={CONTACT.email.label}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="1.5" />
                  <path d="m3.5 6.5 8.5 6 8.5-6" />
                </svg>
              </a>
            </li>
            <li>
              <a href={CONTACT.phone.href} aria-label={`Call ${CONTACT.phone.label}`} title={CONTACT.phone.label}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z" />
                </svg>
              </a>
            </li>
            <li>
              <a
                href={waLink('IBA membership, corridors or consulting')}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`WhatsApp ${CONTACT.whatsapp.label}`}
                title={`WhatsApp ${CONTACT.whatsapp.label}`}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 20l1.3-4A8.5 8.5 0 1 1 8.6 19Z" />
                  <path d="M9 8.5c0 3.5 2.6 6.5 6.5 6.5l1-1.6-2-1-1 .8a4 4 0 0 1-2.6-2.6l.8-1-1-2Z" />
                </svg>
              </a>
            </li>
          </ul>
        </div>

        <div className="git__side">

          {/* a white card that starts an enquiry already on the right topic */}
          <div className="git__card" data-rise>
            <p className="git__card-title">Start a conversation</p>
            <ul className="git__topics">
              {TOPICS.map((t) => (
                <li key={t.label}>
                  <a href="/connect" data-enquiry={t.topic}>
                    <span>
                      <strong>{t.label}</strong>
                      <small>{t.note}</small>
                    </span>
                    <span className="git__arrow" aria-hidden="true">
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
