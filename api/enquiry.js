/**
 * The Let's Talk form → email (content review, 11-05-2026: "connect form to
 * email"). Each enquiry is sent to the IBA inbox through Resend's HTTP API,
 * with Reply-To set to the person who wrote, so a reply goes straight to them.
 *
 * Environment (Vercel → Settings → Environment Variables; see ADMIN.md):
 *   RESEND_API_KEY  required. Without it this answers 503 and the form shows
 *                   its "email us instead" panel, so nothing is lost silently.
 *   ENQUIRY_TO      optional; defaults to hello@indiablockchainalliance.org
 *   ENQUIRY_FROM    optional; a sender on a domain verified in Resend, e.g.
 *                   "IBA Website <website@indiablockchainalliance.org>"
 */

const TO = process.env.ENQUIRY_TO || 'hello@indiablockchainalliance.org'
const FROM = process.env.ENQUIRY_FROM || 'IBA Website <onboarding@resend.dev>'
const HONEYPOT = 'company_website'

/* the fields the form sends, in the order the email lists them */
const FIELDS = [
  ['name', 'Name'],
  ['email', 'Work email'],
  ['phone', 'Phone / WhatsApp'],
  ['organisation', 'Organisation and website'],
  ['topic', 'Interested in'],
  ['country', 'Country'],
  ['preferred', 'Preferred contact'],
  ['message', 'Message'],
]

const clean = (v, max) => String(v ?? '').replace(/\r/g, '').slice(0, max).trim()
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

async function readJson(req) {
  if (req.body && typeof req.body === 'object') return req.body
  const chunks = []
  for await (const c of req) chunks.push(c)
  const raw = Buffer.concat(chunks).toString('utf8')
  if (raw.length > 20000) throw new Error('too large')
  return JSON.parse(raw || '{}')
}

const reply = (res, status, body) => {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(body))
}

/* the sender's address alone, for the status check (never the key) */
const senderAddress = () => (FROM.match(/<([^>]+)>/) || [null, FROM])[1]

export default async function handler(req, res) {
  /* A status check anyone can open in a browser (/api/enquiry): whether the
     key is set and which addresses the form uses. It never shows the key.
     Added 11-16 so a form that will not send can be diagnosed without
     access to the Vercel logs. */
  if (req.method === 'GET') {
    const sender = senderAddress()
    return reply(res, 200, {
      configured: Boolean(process.env.RESEND_API_KEY),
      sends_to: TO,
      sends_from: sender,
      note: sender.endsWith('@resend.dev')
        ? 'Sending from Resend’s test address: Resend only delivers to the email the Resend account was created with until the domain is verified and ENQUIRY_FROM is set.'
        : 'Sending from your own domain: it must show Verified in Resend → Domains.',
    })
  }
  if (req.method !== 'POST') return reply(res, 405, { error: 'method' })
  if (!process.env.RESEND_API_KEY) return reply(res, 503, { error: 'not-configured' })

  let body
  try {
    body = await readJson(req)
  } catch {
    return reply(res, 400, { error: 'bad-request' })
  }
  /* a bot filled the field no person can see: say it worked, send nothing */
  if (body[HONEYPOT]) return reply(res, 200, { ok: true })

  const data = Object.fromEntries(FIELDS.map(([k]) => [k, clean(body[k], k === 'message' ? 5000 : 300)]))
  if (!data.name || !isEmail(data.email)) return reply(res, 422, { error: 'invalid' })

  const lines = FIELDS.filter(([k]) => data[k]).map(([k, label]) => `${label}: ${data[k]}`)
  const text = [
    `New enquiry from the IBA website${data.topic ? ` (${data.topic})` : ''}.`,
    '',
    ...lines,
    '',
    body.document ? 'The sender attached a document in the form; ask them to email it if it is needed.' : '',
    `Consent to be contacted: ${body.consent ? 'yes' : 'no'}`,
  ]
    .filter((l) => l !== null)
    .join('\n')

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: data.email,
        subject: `Website enquiry: ${data.topic || 'General'} · ${data.name}`,
        text,
      }),
    })
    if (!r.ok) {
      /* Resend's own reason (e.g. an unverified domain, or the test sender
         used for someone other than the account owner), in the Vercel logs
         and in the response, so the cause is visible */
      let reason = ''
      try {
        const j = await r.json()
        reason = j.message || j.error || ''
      } catch {
        /* no body */
      }
      console.error('enquiry: Resend refused the email', r.status, reason)
      return reply(res, 502, { error: 'send-failed', status: r.status, reason })
    }
    return reply(res, 200, { ok: true })
  } catch (e) {
    console.error('enquiry: could not reach Resend', e?.message)
    return reply(res, 502, { error: 'send-failed', reason: 'could not reach Resend' })
  }
}
