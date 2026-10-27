/**
 * After `npm run build:artifact`: make the review build work from any folder.
 *
 * The site refers to its images by absolute path ("/images/…", "/logos/…",
 * "/iba-logo…"), which only works when the build sits at a site root. The
 * review build is served from a path of its own, so those become relative:
 * "./images/…" from the page and its scripts, "../images/…" from the
 * stylesheet in assets/. index.html loses its document wrapper too, since the
 * host wraps the page in one of its own, and takes the review build's name.
 */

import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const OUT = 'dist-artifact'
const ROOTS = '(images|logos|icons|iba-logo)'

const rewrite = (file, fn) => writeFileSync(file, fn(readFileSync(file, 'utf8')))

for (const name of readdirSync(join(OUT, 'assets'))) {
  const file = join(OUT, 'assets', name)
  if (name.endsWith('.js')) rewrite(file, (s) => s.replace(new RegExp(`(["'\`])/${ROOTS}`, 'g'), '$1./$2'))
  if (name.endsWith('.css')) rewrite(file, (s) => s.replace(new RegExp(`url\\((["']?)/${ROOTS}`, 'g'), 'url($1../$2'))
}

rewrite(join(OUT, 'index.html'), (s) =>
  s
    .replace(new RegExp(`(["'])/${ROOTS}`, 'g'), '$1./$2')
    .replace(/<!doctype html>/i, '')
    .replace(/<\/?(html|head|body)[^>]*>/gi, '')
    /* the review build's own name; the site's routes still set theirs as you go */
    .replace(/<title>[\s\S]*?<\/title>/i, '<title>IBA Site Review</title>')
    .trim()
)

console.log('artifact-paths: review build paths made relative')
