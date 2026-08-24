#!/usr/bin/env python3
from pathlib import Path
from PIL import Image, ImageFilter, ImageEnhance
import json, time, hashlib, os

SRC = Path('/home/https/Área de trabalho/workspace/hagil/assets/images/produtos')
OUT_MANIFEST = Path('/home/https/Área de trabalho/workspace/hagil/assets/images/produtos_upscale_manifest.json')
SCALE = 2
TARGET_MIN = 1920

def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open('rb') as f:
        for chunk in iter(lambda: f.read(1024*1024), b''):
            h.update(chunk)
    return h.hexdigest()

def alpha_safe_upscale(im: Image.Image, scale: int = 2) -> Image.Image:
    # Preserve real transparency and avoid RGB color bleed/white halos by resizing
    # premultiplied RGB and alpha separately, then unpremultiplying.
    im = im.convert('RGBA')
    w, h = im.size
    new_size = (w * scale, h * scale)
    r, g, b, a = im.split()
    # Premultiply against transparent black, resize, then unpremultiply.
    # Pillow 12 removed/changed older ImageMath helpers, so use numpy here.
    import numpy as np
    arr = np.asarray(im).astype(np.float32)
    alpha = arr[..., 3:4] / 255.0
    arr[..., :3] *= alpha
    premul = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), 'RGBA')
    up = premul.resize(new_size, Image.Resampling.LANCZOS)
    up_arr = np.asarray(up).astype(np.float32)
    up_alpha = up_arr[..., 3:4]
    safe_alpha = np.maximum(up_alpha, 1.0)
    rgb = np.where(up_alpha > 0, up_arr[..., :3] * 255.0 / safe_alpha, 0)
    out_arr = np.concatenate([np.clip(rgb, 0, 255), up_alpha], axis=2).astype(np.uint8)
    out = Image.fromarray(out_arr, 'RGBA')
    ua = out.getchannel('A')

    # Detail enhancement on visible product only; keep alpha unchanged.
    rgb = out.convert('RGB')
    rgb = rgb.filter(ImageFilter.UnsharpMask(radius=1.6, percent=125, threshold=3))
    rgb = ImageEnhance.Sharpness(rgb).enhance(1.08)
    rgb = ImageEnhance.Contrast(rgb).enhance(1.03)
    out = Image.merge('RGBA', (*rgb.split(), ua))
    return out

def main():
    files = sorted([p for p in SRC.iterdir() if p.is_file() and p.suffix.lower() == '.png'])
    manifest = {
        'source_dir': str(SRC),
        'started_at': time.strftime('%Y-%m-%dT%H:%M:%S%z'),
        'scale': SCALE,
        'target_min_dimension': TARGET_MIN,
        'method': 'alpha-safe 2x Lanczos super-resolution + visible-layer sharpening; attempted RealESRGAN install was unavailable on Python 3.13/basicsr build',
        'files': []
    }
    failures = []
    for i, path in enumerate(files, 1):
        before_hash = sha256(path)
        try:
            im = Image.open(path).convert('RGBA')
            before_size = im.size
            if before_size[0] * SCALE < TARGET_MIN or before_size[1] * SCALE < TARGET_MIN:
                scale = max(SCALE, (TARGET_MIN + min(before_size) - 1)//min(before_size))
            else:
                scale = SCALE
            out = alpha_safe_upscale(im, scale)
            tmp = path.with_suffix(path.suffix + '.tmp')
            out.save(tmp, format='PNG', optimize=True, compress_level=6)
            os.replace(tmp, path)
            after = Image.open(path)
            alpha_extrema = after.getchannel('A').getextrema()
            rec = {
                'file': path.name,
                'before_size': before_size,
                'after_size': after.size,
                'mode': after.mode,
                'alpha_extrema': alpha_extrema,
                'before_sha256': before_hash,
                'after_sha256': sha256(path),
                'ok': after.mode == 'RGBA' and after.size[0] >= TARGET_MIN and after.size[1] >= TARGET_MIN and alpha_extrema[0] < 255
            }
            if not rec['ok']:
                failures.append(rec)
            manifest['files'].append(rec)
            print(f'[{i:03d}/{len(files)}] OK {path.name}: {before_size} -> {after.size}, alpha={alpha_extrema}')
        except Exception as e:
            failures.append({'file': path.name, 'error': repr(e)})
            print(f'[{i:03d}/{len(files)}] FAIL {path.name}: {e}')
    manifest['finished_at'] = time.strftime('%Y-%m-%dT%H:%M:%S%z')
    manifest['count'] = len(files)
    manifest['failures'] = failures
    OUT_MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding='utf-8')
    print('manifest', OUT_MANIFEST)
    if failures:
        print('failures', len(failures))
        raise SystemExit(1)
    print('all_ok', len(files))

if __name__ == '__main__':
    main()
