/**
 * After `vite build`: give every page its own HTML, and write the sitemap.
 *
 * The site is a single-page app, so the build makes one index.html. Without
 * this step every URL is served that one file, and Google, LinkedIn,
 * WhatsApp and the rest read the home page's title and description for every
 * page. This writes dist/<route>/index.html for every route in src/seo.js,
 * the same page with that route's title, description, canonical and share
 * tags between the <!--seo--> markers, and dist/sitemap.xml listing them.
 *
 * vercel.json rewrites each route to its file; everything else still falls
 * through to index.html, so the app behaves exactly as before.
 *
 * Run by `npm run build` (package.json). SEO pass, 11-16.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { createServer } from 'vite'

const OUT = 'dist'

/* src/seo.js uses the app's own import style, so load it the way the app is
   built rather than with plain Node */
const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' })
const { SEO, SITE_NAME, SITE_URL, OG_IMAGE } = await vite.ssrLoadModule('/src/seo.js')
await vite.close()

const esc = (v) =>
  String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/* each page's short name, for the breadcrumb trail Google shows under a
   result ("indiablockchainalliance.org › Red Club › Institutions") */
const NAMES = {
  '/about': 'About',
  '/expertise': 'Expertise',
  '/tokenization': 'Tokenization',
  '/ecosystem': 'Ecosystem',
  '/initiatives': 'Initiatives',
  '/corridor': 'Web3 Corridor',
  '/membership': 'Membership',
  '/red-club': 'Red Club',
  '/red-club/institutions': 'For Institutions',
  '/red-club/learners': 'For Learners',
  '/library': 'Library',
  '/connect': 'Contact',
  '/privacy': 'Privacy Policy',
  '/india-entry': 'India Market Entry',
}

/* the services IBA offers, described for Google on the pages that sell them */
const SERVICES = {
  '/expertise': { name: 'Web3 Advisory and Consulting', type: 'Web3 advisory, compliance and market expansion consulting' },
  '/tokenization': { name: 'Real-World Asset Tokenization', type: 'Asset tokenization advisory' },
  '/corridor': { name: 'Web3 Corridor Market Entry', type: 'Cross-border market entry and expansion' },
  '/india-entry': { name: 'India Market Entry', type: 'Market entry, compliance, go-to-market and expansion in India' },
}

/* structured data for one page: the page itself, its breadcrumb trail and,
   where it applies, the service it describes; all tied to the Organization
   in index.html by its @id */
const schema = (path, { title, description }) => {
  const url = SITE_URL + path
  const org = { '@id': `${SITE_URL}/#organization` }
  const graph = [
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: title,
      description,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: org,
      inLanguage: 'en',
    },
  ]
  if (path !== '/') {
    const parts = path.split('/').filter(Boolean)
    const crumbs = [{ name: 'Home', url: `${SITE_URL}/` }].concat(
      parts.map((_, i) => {
        const p = '/' + parts.slice(0, i + 1).join('/')
        return { name: NAMES[p] || p, url: SITE_URL + p }
      }),
    )
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.url })),
    })
    graph[0].breadcrumb = { '@id': `${url}#breadcrumb` }
    graph[1]['@id'] = `${url}#breadcrumb`
  }
  if (SERVICES[path]) {
    graph.push({
      '@type': 'Service',
      name: SERVICES[path].name,
      serviceType: SERVICES[path].type,
      description,
      url,
      provider: org,
      areaServed: ['India', 'United Arab Emirates', 'Europe', 'Africa', 'Americas'],
    })
  }
  /* "<" escaped so nothing in the text can close the script tag */
  return `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')}</script>`
}

const tags = (path, { title, description, noindex }) => {
  const url = SITE_URL + path
  return [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<link rel="canonical" href="${esc(url)}" />`,
    noindex ? `<meta name="robots" content="noindex, follow" />` : '',
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(SITE_NAME)}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:image" content="${esc(OG_IMAGE)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    `<meta name="twitter:image" content="${esc(OG_IMAGE)}" />`,
    schema(path, { title, description }),
  ]
    .filter(Boolean)
    .join('\n    ')
}

const shell = readFileSync(join(OUT, 'index.html'), 'utf8')
const MARK = /<!--seo-->[\s\S]*?<!--\/seo-->/
if (!MARK.test(shell)) throw new Error('seo-pages: the <!--seo--> markers are missing from dist/index.html')

const page = (path) => shell.replace(MARK, `<!--seo-->\n    ${tags(path, SEO[path])}\n    <!--/seo-->`)

/* `/` replaces index.html itself, and every other route gets a folder */
const routes = Object.keys(SEO)
for (const path of routes) {
  const file = path === '/' ? join(OUT, 'index.html') : join(OUT, path.slice(1), 'index.html')
  mkdirSync(join(file, '..'), { recursive: true })
  writeFileSync(file, page(path))
}

/* the sitemap: every indexable route, the home page first */
const today = new Date().toISOString().slice(0, 10)
const urls = routes
  .filter((p) => !SEO[p].noindex)
  .map(
    (p) =>
      `  <url>\n    <loc>${esc(SITE_URL + p)}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${p === '/' ? '1.0' : p.split('/').length > 2 ? '0.6' : '0.8'}</priority>\n  </url>`,
  )
writeFileSync(
  join(OUT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`,
)

console.log(`seo-pages: ${routes.length} pages and sitemap.xml written`)
