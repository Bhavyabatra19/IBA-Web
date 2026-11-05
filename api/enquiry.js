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

export default async function handler(req, res) {
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
  if (!data.name || !isEmail(data.email) || !data.message) return reply(res, 422, { error: 'invalid' })

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
    if (!r.ok) return reply(res, 502, { error: 'send-failed' })
    return reply(res, 200, { ok: true })
  } catch {
    return reply(res, 502, { error: 'send-failed' })
  }
}
