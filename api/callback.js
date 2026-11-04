/**
 * Admin console sign-in, step 2: GitHub sends the editor back here with a
 * code; this swaps it for an access token and hands the token to the Decap
 * window that opened the sign-in popup — only if that window is on this
 * same site. Needs OAUTH_GITHUB_CLIENT_ID and OAUTH_GITHUB_CLIENT_SECRET.
 *
 * Signing in does not grant anything by itself: GitHub only lets the token
 * save to the repository if that GitHub account has write access to it.
 */

const page = (origin, status, payload) => `<!doctype html><html><body><script>
(function () {
  var origin = ${JSON.stringify(origin)};
  var message = 'authorization:github:${status}:' + ${JSON.stringify(JSON.stringify(payload))};
  function receive(e) {
    if (e.origin !== origin) return;
    window.opener.postMessage(message, origin);
    window.removeEventListener('message', receive, false);
  }
  window.addEventListener('message', receive, false);
  window.opener && window.opener.postMessage('authorizing:github', origin);
})();
</script></body></html>`

const cookie = (req, name) =>
  (req.headers.cookie || '')
    .split(';')
    .map((c) => c.trim().split('='))
    .find(([k]) => k === name)?.[1]

export default async function handler(req, res) {
  const origin = `https://${req.headers['x-forwarded-host'] || req.headers.host}`
  const url = new URL(req.url, origin)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.setHeader('Set-Cookie', 'iba_oauth_state=; Path=/api; HttpOnly; Secure; SameSite=Lax; Max-Age=0')

  if (!code || !state || state !== cookie(req, 'iba_oauth_state')) {
    return res.end(page(origin, 'error', { message: 'Sign-in could not be verified. Please try again.' }))
  }
  try {
    const r = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: process.env.OAUTH_GITHUB_CLIENT_ID,
        client_secret: process.env.OAUTH_GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: `${origin}/api/callback`,
      }),
    })
    const data = await r.json()
    if (!data.access_token) throw new Error(data.error_description || 'No token returned')
    res.end(page(origin, 'success', { token: data.access_token, provider: 'github' }))
  } catch (e) {
    res.end(page(origin, 'error', { message: `GitHub sign-in failed: ${e.message}` }))
  }
}
