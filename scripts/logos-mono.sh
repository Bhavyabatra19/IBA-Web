#!/usr/bin/env bash
# Rebuild the home marquee's light-grey partner logos in public/logos/mono
# from the originals in public/logos (needs python3 with numpy and Pillow).
set -euo pipefail
cd "$(dirname "$0")/.."
tmp=$(mktemp -d); trap 'rm -rf "$tmp"' EXIT
python3 scripts/logo_cutout.py public/logos/partners "$tmp/cut" >/dev/null
node -e "import('./src/data/partners.js').then(m => m.PARTNERS.filter(p => p.logo).forEach(p => console.log(p.logo.slice(1))))" > "$tmp/list"
rm -rf public/logos/mono
python3 scripts/logo_mono.py "$tmp/list" "$tmp/cut" public/logos/mono
