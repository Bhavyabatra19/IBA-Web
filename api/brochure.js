/**
 * Membership brochure gate → email. Each person who opens a Web3 Corridor
 * membership brochure (/brochures/<tier>/) leaves their name, email and
 * company; this emails that lead to the IBA inbox through Resend, with
 * Reply-To set to them, the same way api/enquiry.js handles the Let's Talk
 * form.
 *
 * Environment (shared with api/enquiry.js; see ADMIN.md):
 *   RESEND_API_KEY  required. Without it this answers 503; the brochure
 *                   still opens for the reader, but no lead is sent.
 *   BROCHURE_TO     optional; defaults to ENQUIRY_TO, then
 *                   hello@indiablockchainalliance.org
 *   ENQUIRY_FROM    optional; a sender on a domain verified in Resend
 */

const TO = process.env.BROCHURE_TO || process.env.ENQUIRY_TO || 'hello@indiablockchainalliance.org'
const FROM = process.env.ENQUIRY_FROM || 'IBA Website <onboarding@resend.dev>'
const HONEYPOT = 'company_website'
const TIERS = ['Club Class', 'Premier Class', 'Gold Class', 'Gold Xchange']

const clean = (v, max) => String(v ?? '').replace(/[\r\n]+/g, ' ').slice(0, max).trim()
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

async function readJson(req) {
  if (req.body && typeof req.body === 'object') return req.body
  const chunks = []
  for await (const c of req) chunks.push(c)
  const raw = Buffer.concat(chunks).toString('utf8')
  if (raw.length > 5000) throw new Error('too large')
  return JSON.parse(raw || '{}')
}

const reply = (res, status, body) => {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(body))
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return reply(res, 405, { error: 'method' })

  let body
  try {
    body = await readJson(req)
  } catch {
    return reply(res, 400, { error: 'bad-request' })
  }
  if (body[HONEYPOT]) return reply(res, 200, { ok: true })

  const name = clean(body.name, 200)
  const email = clean(body.email, 200)
  const company = clean(body.company, 200)
  const tier = TIERS.includes(body.tier) ? body.tier : 'Unknown tier'
  if (!name || !isEmail(email)) return reply(res, 422, { error: 'invalid' })
  if (!process.env.RESEND_API_KEY) return reply(res, 503, { error: 'not-configured' })

  const text = [
    `Someone opened the ${tier} membership brochure.`,
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    company ? `Company: ${company}` : '',
    `Brochure: ${tier}`,
    `Consent to be contacted: ${body.consent ? 'yes' : 'no'}`,
  ]
    .filter(Boolean)
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
        reply_to: email,
        subject: `Brochure lead: ${tier} · ${name}${company ? ` (${company})` : ''}`,
        text,
      }),
    })
    if (!r.ok) return reply(res, 502, { error: 'send-failed' })
    return reply(res, 200, { ok: true })
  } catch {
    return reply(res, 502, { error: 'send-failed' })
  }
}
