"""Cut-out copies of partner logos: strip the baked-in background (and any
tile inside it) by region-growing from the edge, feather the rim, trim, and
save as a transparent PNG. Originals are left untouched.
Usage: logo_cutout.py SRCDIR OUTDIR (see scripts/logos-mono.sh)"""
import sys, os
from collections import deque
import numpy as np
from PIL import Image

def grow(rgb, alpha, tol, step):
    h, w, _ = rgb.shape
    gone = alpha < 0.5
    seeds = []
    for y in range(h):
        for x in range(w):
            if gone[y, x]: continue
            edge = x in (0, w-1) or y in (0, h-1) or any(
                0 <= y+dy < h and 0 <= x+dx < w and gone[y+dy, x+dx]
                for dy, dx in ((1,0),(-1,0),(0,1),(0,-1)))
            if edge: seeds.append((y, x))
    if not seeds: return alpha
    ref = np.median(np.array([rgb[y, x] for y, x in seeds]), axis=0)
    seen = np.zeros((h, w), bool); q = deque()
    for s in seeds:
        if np.linalg.norm(rgb[s] - ref) < tol: seen[s] = True; q.append(s)
    while q:
        y, x = q.popleft()
        for dy, dx in ((1,0),(-1,0),(0,1),(0,-1)):
            ny, nx = y+dy, x+dx
            if 0 <= ny < h and 0 <= nx < w and not seen[ny, nx] and not gone[ny, nx]:
                c = rgb[ny, nx]
                if np.linalg.norm(c - rgb[y, x]) < step and np.linalg.norm(c - ref) < tol:
                    seen[ny, nx] = True; q.append((ny, nx))
    out = alpha.copy(); out[seen] = 0
    # feather: pixels touching the removed area fade by their distance to the bg
    d = np.linalg.norm(rgb - ref, axis=2)
    near = np.zeros_like(seen)
    near[1:] |= seen[:-1]; near[:-1] |= seen[1:]; near[:, 1:] |= seen[:, :-1]; near[:, :-1] |= seen[:, 1:]
    rim = near & ~seen & (out > 0)
    out[rim] = np.minimum(out[rim], np.clip(d[rim] / (tol * 2.2), 0, 1))
    return out

def despeckle(alpha, keep=0.004):
    """drop specks: opaque islands smaller than `keep` of the image"""
    h, w = alpha.shape
    on = alpha > 0.1; lab = np.zeros((h, w), int); n = 0; sizes = {}
    for y in range(h):
        for x in range(w):
            if on[y, x] and not lab[y, x]:
                n += 1; q = deque([(y, x)]); lab[y, x] = n; c = 0
                while q:
                    cy, cx = q.popleft(); c += 1
                    for dy in (-1, 0, 1):
                        for dx in (-1, 0, 1):
                            ny, nx = cy+dy, cx+dx
                            if 0 <= ny < h and 0 <= nx < w and on[ny, nx] and not lab[ny, nx]:
                                lab[ny, nx] = n; q.append((ny, nx))
                sizes[n] = c
    out = alpha.copy()
    for k, c in sizes.items():
        if c < keep * h * w: out[lab == k] = 0
    return out

def cut(src, dst, passes):
    im = Image.open(src).convert('RGBA')
    if max(im.size) > 256: im.thumbnail((256, 256))
    a = np.asarray(im).astype(float)
    rgb, alpha = a[..., :3], a[..., 3] / 255
    for kind, *args in passes:
        if kind == 'grow':
            alpha = grow(rgb, alpha, *args)
        elif kind == 'global':      # this colour everywhere, enclosed areas too
            ref, tol = np.array(args[0], float), args[1]
            d = np.linalg.norm(rgb - ref, axis=2)
            alpha = np.minimum(alpha, np.clip((d - tol) / tol, 0, 1))
        elif kind == 'despeckle':
            alpha = despeckle(alpha, *args)
        elif kind == 'inset':       # trim a frame line off the edges
            k = args[0]; alpha[:k] = 0; alpha[-k:] = 0; alpha[:, :k] = 0; alpha[:, -k:] = 0
        elif kind == 'holes':       # light detail inside a dark shape becomes a hole,
            lo, hi = args            # so a one-colour silhouette still reads
            alpha = np.minimum(alpha, np.clip((hi - rgb.min(axis=2)) / (hi - lo), 0, 1))
        elif kind == 'blue':        # keep the blue ink only (grey and white drop out)
            lo, hi = args
            alpha = np.minimum(alpha, np.clip((rgb[..., 2] - rgb[..., 0] - lo) / (hi - lo), 0, 1))
        elif kind == 'light':       # keep only the light marks (white on a glow)
            lo, hi = args
            alpha = np.minimum(alpha, np.clip((rgb.min(axis=2) - lo) / (hi - lo), 0, 1))
    a[..., 3] = alpha * 255
    out = Image.fromarray(a.astype(np.uint8))
    bbox = out.getchannel('A').point(lambda v: 255 if v > 20 else 0).getbbox()
    out = out.crop(bbox)
    s = max(out.size); pad = round(s * 0.04)
    sq = Image.new('RGBA', (s + 2*pad, s + 2*pad), (0, 0, 0, 0))
    sq.paste(out, ((sq.width - out.width)//2, (sq.height - out.height)//2))
    sq.save(dst, optimize=True)

W = ('grow', 60, 30)           # a plain white / light ground
JOBS = {
  'enlighten-capital': [W, ('holes', 175, 225)], 'enterprise-quotient': [W], 'eyekyam': [W, ('holes', 175, 225)],
  'immverse-ai': [W, ('holes', 175, 225)], 'india-ai-alliance': [W, ('holes', 175, 225)], 'inner-compass-impact-fund': [W],
  'integra': [W], 'ispl': [W], 'mythyaverse': [W], 'naapbooks': [('blue', 25, 65)],
  'payomatix': [W, ('holes', 175, 225)], 'token-asset-foundation': [W], 'uttung': [W],
  'velocity-network-foundation': [W], 'web5-nexus': [W],
  'power': [W, ('global', (255, 255, 255), 40)],   # the white inside the ring too
  'hype-ventures': [W, ('light', 90, 200), ('despeckle', 0.004)],  # keep the white swoosh          # white, then the black tile
  'kula': [('grow', 70, 30)],                      # the green tile
  'arthachain': [('grow', 140, 30)],               # the green gradient tile
  'edon-global': [('light', 60, 140)],            # white type on a purple glow
  'edza-ai': [('grow', 160, 30)],                  # the dark purple gradient tile
  'zerodots': [('inset', 5), ('grow', 90, 40)],     # trim the rim, then the purple tile
}
srcdir, outdir = sys.argv[1], sys.argv[2]
os.makedirs(outdir, exist_ok=True)
# the organisations' own site icons, in public/logos/eco
JOBS['adlunam.png'] = [('holes', 175, 225)]
JOBS['../eco/t-hub-co.png'] = [W]
JOBS['../eco/zoniqx-com.png'] = [W]       # the white rounded tile
for name, passes in JOBS.items():
    src = f'{srcdir}/{name}' if name.endswith('.png') else f'{srcdir}/{name}.jpg'
    cut(src, f'{outdir}/{os.path.basename(name).removesuffix(".png")}.png', passes)
    print('ok', name)
