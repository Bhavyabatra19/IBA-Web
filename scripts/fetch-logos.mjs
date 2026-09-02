/**
 * Fetch a brand mark for every client that has a confirmed domain.
 *
 *   node scripts/fetch-logos.mjs
 *
 * Images land in public/logos/ and the manifest in src/logos.json, which the
 * wall imports. They are NOT hotlinked at runtime, for three reasons: a
 * third-party image request per client would tell that third party every
 * visitor who opened the page, the wall would break the day the service
 * changes, and vendored files can be swapped one at a time for licensed assets
 * without touching any code.
 *
 * The manifest is what the page reads, so a client either has a mark or renders
 * as its typeset name — there is no runtime 404 and no broken-image flash.
 *
 * ⚠ WHAT THIS FETCHES IS A FAVICON, NOT A LICENSED LOGO.
 * Google's S2 endpoint serves the icon a site declares for browser tabs. For
 * most brands that is their mark, which is why it looks right — but it is not a
 * press-kit asset and it does not come with permission to use it. Before this
 * page goes live, every organisation on the wall has to have agreed to be
 * listed, and each file here should be replaced with the logo they supply.
 * See the warning at the top of src/studio.js.
 *
 * Clearbit's free logo API (the usual answer to this) shut down in December
 * 2024; Brandfetch's CDN needs a client ID; faviconkit is dead. S2 is what is
 * left that works without an account.
 */

import { createHash } from 'node:crypto'
import { mkdir, readdir, rm, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { CLIENT_GROUPS, logoKey } from '../src/studio.js'

const HERE = dirname(fileURLToPath(import.meta.url))
/* Images go in public/ so Vite copies them verbatim and the page can reference
   them by URL. The manifest goes in src/ so the page can import it — Vite is
   explicit that public/ is for things referenced by URL, not imported. */
const OUT = resolve(HERE, '../public/logos')
const MANIFEST = resolve(HERE, '../src/logos.json')
const SIZE = 256
/* Below this a favicon is the 16px tab icon upscaled, which next to a 256px
   mark reads as a broken image rather than as a logo. The name is better. */
const MIN_PX = 64

const src = (domain) =>
  `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=${SIZE}`

/** Intrinsic size straight from the file header — no image library needed. */
function measure(b) {
  if (b.length > 24 && b[0] === 0x89 && b.toString('ascii', 1, 4) === 'PNG') {
    return { ext: 'png', w: b.readUInt32BE(16), h: b.readUInt32BE(20) }
  }
  if (b.length > 4 && b[0] === 0xff && b[1] === 0xd8) {
    for (let i = 2; i < b.length - 9; ) {
      if (b[i] !== 0xff) {
        i += 1
        continue
      }
      const m = b[i + 1]
      /* SOF0..SOF15, minus the marker types that are not frame headers */
      if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) {
        return { ext: 'jpg', h: b.readUInt16BE(i + 5), w: b.readUInt16BE(i + 7) }
      }
      i += 2 + b.readUInt16BE(i + 2)
    }
  }
  if (b.length > 12 && b.toString('ascii', 0, 4) === 'RIFF' && b.toString('ascii', 8, 12) === 'WEBP') {
    return { ext: 'webp', w: 0, h: 0 } // unmeasured; accepted on byte size alone
  }
  return null
}

const all = CLIENT_GROUPS.flatMap((g) => g.items)
const entries = all.filter((i) => i.domain)
const noDomain = all.filter((i) => !i.domain)

/* Rebuilt from scratch, so a domain removed from studio.js does not leave its
   file behind to be served by a manifest that no longer lists it. */
await rm(OUT, { recursive: true, force: true })
await mkdir(OUT, { recursive: true })

const byHash = new Map()
const manifest = {}
const written = []
const rejected = []

for (const { name, domain } of entries) {
  try {
    const res = await fetch(src(domain), { redirect: 'follow', signal: AbortSignal.timeout(15000) })
    if (!res.ok) {
      rejected.push(`${name} (${domain}) — HTTP ${res.status}`)
      continue
    }
    const buf = Buffer.from(await res.arrayBuffer())
    const dim = measure(buf)
    if (!dim) {
      rejected.push(`${name} (${domain}) — not a recognisable image`)
      continue
    }
    if (dim.w && dim.w < MIN_PX) {
      rejected.push(`${name} (${domain}) — ${dim.w}×${dim.h}, under the ${MIN_PX}px floor`)
      continue
    }
    /* Same bytes for two domains means the service had nothing and handed back
       its generic globe. That placeholder beside real marks reads worse than
       the name alone, so it is dropped rather than written. */
    const hash = createHash('sha1').update(buf).digest('hex')
    if (byHash.has(hash)) {
      rejected.push(`${name} (${domain}) — identical to ${byHash.get(hash)}, generic fallback`)
      continue
    }
    byHash.set(hash, name)

    const file = `${logoKey(domain)}.${dim.ext}`
    await writeFile(resolve(OUT, file), buf)
    manifest[domain] = file
    written.push(
      `${name.padEnd(38)} ${String(dim.w || '?').padStart(4)}×${String(dim.h || '?').padEnd(4)} ${file}`
    )
  } catch (e) {
    rejected.push(`${name} (${domain}) — ${e.name}: ${e.message}`)
  }
}

await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')

console.log(`\n── written (${written.length}) ──`)
written.forEach((l) => console.log('  ' + l))
if (rejected.length) {
  console.log(`\n── rejected (${rejected.length}) — these keep their typeset name ──`)
  rejected.forEach((l) => console.log('  ' + l))
}
console.log(`\n── no domain on record (${noDomain.length}) — these keep their typeset name ──`)
console.log('  ' + noDomain.map((s) => s.name).join(', '))
console.log(
  `\n${written.length} of ${all.length} clients have a mark. ` +
    `Add a confirmed \`domain\` in src/studio.js and re-run to fill in more.`
)
console.log(`Files: ${(await readdir(OUT)).length} in public/logos/\n`)
