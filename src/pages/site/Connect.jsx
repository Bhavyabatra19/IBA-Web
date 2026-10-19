/**
 * Connect — four ways in, the direct lines, and the enquiry form.
 *
 * The email is CONTACT in nav.js (hello@indiablockchainalliance.org), the one
 * address used on every page.
 */

import { PageHero, Section, Form, Btn } from '../../components/Kit'
import { CONTACT } from '../../nav'

const WAYS = [
  { title: 'Global Exposure', text: 'Join the IBA Red Club: programmes, projects, placements.', enquiry: 'Red Club (learner)', cta: 'Join Red Club' },
  { title: 'For Institutions', text: 'Bring Red Club programmes and campus labs to your university.', enquiry: 'Red Club / Verifyble (institution)', cta: 'Request Prospectus' },
  { title: 'For Enterprises & Governments', text: 'Scope an advisory or delivery engagement.', enquiry: 'Consulting', cta: 'Book a Call' },
  { title: 'For Partners', text: 'Join the ecosystem or the Global Innovation Corridor.', enquiry: 'Ecosystem partnership', cta: 'Partner With Us' },
]

const INTERESTS = [
  'Consulting',
  'Red Club (learner)',
  'Red Club (institution)',
  'Verifyble',
  'Web3 Corridor',
  'Ecosystem partnership',
  'Tech4Good / Green Chain Protocol',
  'Media / Speaking',
  'Something else',
]

const LINES = [
  { label: 'Email', value: CONTACT.email.label, href: CONTACT.email.href },
  { label: 'Phone', value: CONTACT.phone.label, href: CONTACT.phone.href },
  { label: 'WhatsApp', value: CONTACT.whatsapp.label, href: `https://wa.me/${CONTACT.whatsapp.number}` },
  { label: 'LinkedIn', value: 'linkedin.com/in/indieblock', href: CONTACT.linkedin.href },
]

export default function Connect() {
  return (
    <div>
      <PageHero
        id="connect-page"
        eyebrow="Connect"
        title="Let the Journey Begin"
        lede="Whether you're a government, an enterprise, a university, a founder or a learner, start with a conversation."
      />

      <Section eyebrow="Start Here" title="Four Ways In" tone="red">
        <div className="pk-cards pk-cards--4">
          {WAYS.map((w) => (
            <article className="pk-card" key={w.title} data-rise>
              <h3 className="pk-card__title">{w.title}</h3>
              <p className="pk-card__text">{w.text}</p>
              <span className="pk-card__go">
                <Btn enquiry={w.enquiry} variant="ghost">
                  {w.cta} <span aria-hidden="true">→</span>
                </Btn>
              </span>
            </article>
          ))}
        </div>
      </Section>

      <Section id="reach" eyebrow="Or Reach Us Directly" title="Talk to the IBA Team">
        <div className="pk-split">
          <div className="pk-init">
            <ul className="pk-lines">
              {LINES.map((l) => (
                <li key={l.label} data-rise>
                  <span>{l.label}</span>
                  <a href={l.href} {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer noopener' } : {})}>
                    {l.value}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <Form
            subject="Enquiry via indiablockchainalliance.org"
            submit="Submit Enquiry"
            consent="I agree to the Privacy Policy and to being contacted about my enquiry."
            fields={[
              { name: 'name', label: 'Name' },
              { name: 'org', label: 'Organisation and Website' },
              { name: 'email', label: 'Work email', type: 'email' },
              { name: 'phone', label: 'Phone / WhatsApp', type: 'tel', required: false },
              { name: 'topic', label: "I'm interested in", type: 'select', wide: true, options: INTERESTS },
              { name: 'message', label: 'Message', type: 'textarea' },
            ]}
          />
        </div>
      </Section>
    </div>
  )
}
