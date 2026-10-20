/**
 * Privacy Policy — a basic notice describing what the site actually does.
 *
 * Written against the site as built: the forms open the reader's own email
 * app (there is no form backend), nothing is stored in the browser on the
 * routed pages, and there are no analytics or advertising scripts. When any
 * of that changes (a form endpoint, analytics, member accounts) this page
 * must change with it. ⚠ Have it reviewed by IBA's legal counsel before
 * launch; it is a starting point, not legal advice.
 */

import { PageHero, Section, Bullets } from '../../components/Kit'
import { CONTACT } from '../../nav'

const UPDATED = '20 October 2026'

/** The policy, one block per heading, in reading order. */
const SECTIONS = [
  {
    id: 'who-we-are',
    title: 'Who We Are',
    paras: [
      'This website is run by India Blockchain Alliance (“IBA”, “we”, “us”). This policy explains what personal information we collect through the site, why, and the choices you have. It applies to this website only, not to other sites we link to.',
    ],
  },
  {
    id: 'what-we-collect',
    title: 'What We Collect',
    paras: ['We only collect what you choose to give us, and a small amount of technical information every website receives.'],
    list: [
      'Enquiry and partnership details: when you use a form on the site, your name, organisation, organisation website, LinkedIn page, work email, phone or WhatsApp number, country, the topic you are interested in, your message, and any document you choose to attach.',
      'Messages you send us directly by email, phone or WhatsApp.',
      'Technical information: like any website, our hosting provider receives your IP address, browser type and the pages you request, in its server logs.',
    ],
  },
  {
    id: 'how-forms-work',
    title: 'How Our Forms Work',
    paras: [
      'Our forms do not send anything to a server. When you submit one, your own email app opens with your details written into a message to ' +
        CONTACT.email.label +
        '. Nothing reaches us unless you press send, and you can review or change the message first. If you attach a document, you attach it to that email yourself.',
    ],
  },
  {
    id: 'how-we-use',
    title: 'How We Use Your Information',
    list: [
      'To reply to your enquiry and talk with you about the programme, membership, partnership or service you asked about.',
      'To route your enquiry to the right IBA team, and to keep a record of our correspondence with you.',
      'To send you IBA research and event updates, only if you have asked for them. You can unsubscribe at any time.',
      'To keep the website secure and working.',
    ],
    after: 'We do not sell your personal information, and we do not use it for advertising.',
  },
  {
    id: 'sharing',
    title: 'Who We Share It With',
    paras: [
      'We share your information only where it is needed to respond to you: with IBA team members and advisors working on your enquiry, with a corridor or programme partner when you have asked to be introduced to them, and with service providers who host this website and our email. We may also disclose information where the law requires it.',
    ],
  },
  {
    id: 'cookies',
    title: 'Cookies and Third-Party Services',
    paras: [
      'This website does not use advertising or analytics cookies, and does not store anything in your browser to track you. The site loads its fonts from Google Fonts, which means your browser connects to Google’s servers. Links to LinkedIn, WhatsApp and other sites take you to services with their own privacy policies.',
    ],
  },
  {
    id: 'retention',
    title: 'How Long We Keep It',
    paras: [
      'We keep enquiry correspondence for as long as we need it to respond to you and maintain our relationship with you, and then delete it, unless we have to keep it longer by law.',
    ],
  },
  {
    id: 'your-rights',
    title: 'Your Rights',
    paras: [
      'You can ask us to tell you what personal information we hold about you, to correct or update it, or to delete it, and you can withdraw your consent to being contacted at any time. Depending on where you live, including under India’s Digital Personal Data Protection Act, 2023 and the EU and UK GDPR, you may have further rights, including the right to complain to your data protection authority. To use any of these rights, email us at the address below.',
    ],
  },
  {
    id: 'security',
    title: 'Security',
    paras: [
      'We take reasonable steps to protect the information you send us. No method of sending information over the internet is completely secure, so please do not send us confidential information you do not need to.',
    ],
  },
  {
    id: 'children',
    title: 'Children',
    paras: ['This website is not directed at children under 18, and we do not knowingly collect their personal information.'],
  },
  {
    id: 'changes',
    title: 'Changes to This Policy',
    paras: ['We may update this policy as the site changes. The date at the top of the page shows when it was last updated.'],
  },
]

export default function Privacy() {
  return (
    <div>
      <PageHero id="privacy-page" eyebrow={`Last updated ${UPDATED}`} title="Privacy Policy" lede="How India Blockchain Alliance collects, uses and protects the information you share with us through this website." />

      <section className="band band--light pv" aria-label="Privacy Policy">
        <article className="pv__doc">
          {SECTIONS.map((s) => (
            <section className="pv__sec" id={s.id} key={s.id}>
              <h2>{s.title}</h2>
              {s.paras?.map((p) => <p key={p}>{p}</p>)}
              {s.list && <Bullets items={s.list} />}
              {s.after && <p>{s.after}</p>}
            </section>
          ))}
        </article>
      </section>

      <Section id="privacy-contact" title="Contact Us" lede="Questions about this policy or your information? Get in touch.">
        <ul className="pk-lines">
          <li data-rise>
            <span>Email</span>
            <a href={`mailto:${CONTACT.email.label}?subject=${encodeURIComponent('Privacy request')}`}>{CONTACT.email.label}</a>
          </li>
          <li data-rise>
            <span>Phone</span>
            <a href={CONTACT.phone.href}>{CONTACT.phone.label}</a>
          </li>
        </ul>
      </Section>
    </div>
  )
}
