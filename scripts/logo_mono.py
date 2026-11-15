"""Smooth, high-resolution one-colour silhouettes of the partner logos.

Takes each logo's transparency (the cut-out where there is one), upscales
it to SIZE px, softens the JPEG stair-steps, then re-sharpens the edge with
a narrow smoothstep: the result renders crisp at any size, like a vector.
Usage: logo_mono.py LIST CUTDIR OUTDIR
  LIST: one public-relative logo path per line; a cut-out of the same name
  in CUTDIR (from logo_cutout.py) is used in place of the original.
Run all of it with scripts/logos-mono.sh."""
import sys, os
import numpy as np
from PIL import Image, ImageFilter

SIZE = 512
GREY = (217, 217, 217)
# extra softening where the source art itself has stair-stepped edges
BLUR = {'unify-platform': 3.0, 'hype-ventures': 0.8, 'naapbooks': 1.0}

def silhouette(src, blur=0.45):
    im = Image.open(src).convert('RGBA')
    a = np.asarray(im.getchannel('A')).astype(float) / 255
    a[a < 0.25] = 0                     # drop faint halo left from the old ground
    lo = Image.fromarray((a * 255).astype(np.uint8))
    bbox = lo.point(lambda v: 255 if v > 60 else 0).getbbox()
    lo = lo.crop(bbox)
    s = max(lo.size); pad = round(s * 0.04)
    sq = Image.new('L', (s + 2 * pad, s + 2 * pad), 0)
    sq.paste(lo, ((sq.width - lo.width) // 2, (sq.height - lo.height) // 2))
    k = SIZE / sq.width
    hi = sq.resize((SIZE, SIZE), Image.LANCZOS).filter(ImageFilter.GaussianBlur(k * blur))
    h = np.asarray(hi).astype(float) / 255
    t = np.clip((h - 0.40) / 0.20, 0, 1)
    edge = t * t * (3 - 2 * t)           # smoothstep: a crisp, anti-aliased rim
    out = np.zeros((SIZE, SIZE, 4), np.uint8)
    out[..., :3] = GREY
    out[..., 3] = (edge * 255).round().astype(np.uint8)
    return Image.fromarray(out)

listfile, cutdir, outdir = sys.argv[1:4]
os.makedirs(outdir, exist_ok=True)
for line in open(listfile):
    path = line.strip().split('|')[0]
    if not path: continue
    name = os.path.splitext(os.path.basename(path))[0]
    cut = os.path.join(cutdir, name + '.png')
    src = cut if os.path.exists(cut) else os.path.join('public', path)
    silhouette(src, BLUR.get(name, 0.45)).save(os.path.join(outdir, name + '.png'), optimize=True)
    print('ok', name)
