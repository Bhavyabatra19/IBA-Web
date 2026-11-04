/**
 * Admin console sign-in, step 1 (Decap CMS → GitHub OAuth).
 * Sends the editor to GitHub to approve access; GitHub returns them to
 * /api/callback. Needs OAUTH_GITHUB_CLIENT_ID in the Vercel project's
 * environment variables (see ADMIN.md).
 */
import { randomBytes } from 'node:crypto'

export default function handler(req, res) {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID
  if (!clientId) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    return res.end('Admin sign-in is not set up: OAUTH_GITHUB_CLIENT_ID is missing. See ADMIN.md.')
  }
  const origin = `https://${req.headers['x-forwarded-host'] || req.headers.host}`
  const state = randomBytes(16).toString('hex')
  const url = new URL('https://github.com/login/oauth/authorize')
  url.searchParams.set('client_id', clientId)
  url.searchParams.set('redirect_uri', `${origin}/api/callback`)
  url.searchParams.set('scope', process.env.OAUTH_GITHUB_SCOPE || 'repo')
  url.searchParams.set('state', state)
  res.setHeader('Set-Cookie', `iba_oauth_state=${state}; Path=/api; HttpOnly; Secure; SameSite=Lax; Max-Age=600`)
  res.statusCode = 302
  res.setHeader('Location', url.toString())
  res.end()
}
