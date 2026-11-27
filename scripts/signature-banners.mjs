/**
 * signature-banners.mjs
 * ------------------------------------------------------------------
 * Renders the IBA email-signature banners into public/signatures/.
 *
 *   node scripts/signature-banners.mjs
 *
 * Each banner is drawn at 600x150 CSS px (the usual signature width) and
 * captured at 2x, so it stays sharp on retina screens when the <img> in the
 * signature is given width="600". Brand rules from styles.css hold: red /
 * black / white only, square corners, flat colour, Questrial 400.
 */
import { createRequire } from 'node:module'
import { readFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

// playwright is not a project dependency; resolve the globally installed one
const { chromium } = createRequire(import.meta.url)('playwright')

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const out = path.join(root, 'public/signatures')
mkdirSync(out, { recursive: true })

const img = (f) =>
  `data:image/png;base64,${readFileSync(path.join(root, 'public', f)).toString('base64')}`
const LOGO_ON_LIGHT = img('iba-logo-light.png')
const LOGO_ON_DARK = img('iba-logo-dark.png')

const RED = '#d71920'
const BLACK = '#111111'

const COPY = {
  kicker: 'Evolution of Value',
  headline: 'Connecting India to the global Web3 economy',
  services: 'Tokenization · Advisory · Memberships',
  url: 'indiablockchainalliance.org',
}

const banners = [
  { name: 'iba-signature-dark', bg: BLACK, fg: '#fff', muted: '#b3b3b3', kicker: '#ff4a50', logo: LOGO_ON_DARK, rule: RED },
  { name: 'iba-signature-light', bg: '#fff', fg: '#0e0e0e', muted: '#5c5c5c', kicker: RED, logo: LOGO_ON_LIGHT, rule: RED, bar: RED, border: '#e2dfdd' },
  { name: 'iba-signature-red', bg: RED, fg: '#fff', muted: 'rgba(255,255,255,.82)', kicker: '#fff', logo: LOGO_ON_LIGHT, rule: '#fff', panel: '#fff' },
]

const html = (b) => `<!doctype html><html><head>
<link href="https://fonts.googleapis.com/css2?family=Questrial&display=block" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:600px;height:150px;font-family:Questrial,Helvetica,Arial,sans-serif;font-weight:400}
  .b{position:relative;width:600px;height:150px;background:${b.bg};color:${b.fg};display:flex;align-items:center;overflow:hidden;
     ${b.border ? `box-shadow:inset 0 0 0 1px ${b.border};` : ''}}
  .logo{flex:none;height:150px;width:${b.panel ? 196 : 180}px;display:flex;align-items:center;justify-content:center;${b.panel ? `background:${b.panel};` : ''}}
  .logo img{height:${b.panel ? 104 : 100}px;width:auto;display:block}
  .rule{flex:none;width:2px;height:${b.panel ? 0 : 86}px;background:${b.rule};margin-right:22px}
  .t{flex:1;padding-right:24px;${b.panel ? 'padding-left:24px;' : ''}}
  .k{font-size:10.5px;letter-spacing:.2em;text-transform:uppercase;color:${b.kicker};margin-bottom:8px}
  .h{font-size:21px;line-height:1.18;letter-spacing:-.005em;margin-bottom:12px}
  .row{display:flex;justify-content:space-between;align-items:baseline;gap:10px;font-size:11px;white-space:nowrap;color:${b.muted}}
  .u{color:${b.fg};letter-spacing:.02em}
  .bar{position:absolute;left:0;right:0;bottom:0;height:5px;background:${b.bar}}
</style></head><body>
<div class="b">
  <div class="logo"><img src="${b.logo}" alt=""></div>
  <div class="rule"></div>
  <div class="t">
    <div class="k">${COPY.kicker}</div>
    <div class="h">${COPY.headline}</div>
    <div class="row"><span>${COPY.services}</span><span class="u">${COPY.url}</span></div>
  </div>
  ${b.bar ? '<div class="bar"></div>' : ''}
</div></body></html>`

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 600, height: 150 }, deviceScaleFactor: 2 })
for (const b of banners) {
  await page.setContent(html(b), { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  const ok = await page.evaluate(() => document.fonts.check('16px Questrial'))
  if (!ok) console.warn(`! Questrial did not load for ${b.name}; fell back to Helvetica/Arial`)
  await page.screenshot({ path: path.join(out, `${b.name}.png`), clip: { x: 0, y: 0, width: 600, height: 150 } })
  console.log(`wrote public/signatures/${b.name}.png`)
}
await browser.close()
