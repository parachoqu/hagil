#!/usr/bin/env python3
from __future__ import annotations

import argparse
import hashlib
import json
import os
import shutil
import sys
from collections import defaultdict
from pathlib import Path

from PIL import Image, ImageEnhance, ImageFilter, ImageOps
from rembg import new_session, remove


ROOT = Path(__file__).resolve().parents[1]
PRODUCT_DIR = ROOT / "assets" / "images" / "produtos"
BACKUP_DIR = ROOT / "assets" / "images" / "produtos-original-jpg-backup"
REVIEW_DIR = ROOT / "assets" / "images" / "produtos-review"
HASH_DIR = REVIEW_DIR / "processed-by-hash"
MANIFEST = REVIEW_DIR / "manifest.json"
TARGET_SIZE = 1024


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
      for chunk in iter(lambda: f.read(1024 * 1024), b""):
          h.update(chunk)
    return h.hexdigest()


def public_jpgs() -> list[Path]:
    return sorted(PRODUCT_DIR.glob("Hagil_*.jpg"))


def all_jpgs() -> list[Path]:
    return sorted(PRODUCT_DIR.glob("*.jpg"))


def ensure_backup() -> None:
    BACKUP_DIR.mkdir(parents=True, exist_ok=True)
    for path in all_jpgs():
        dest = BACKUP_DIR / path.name
        if dest.exists():
            if sha256(dest) != sha256(path):
                raise RuntimeError(f"Backup diferente ja existe para {path.name}")
            continue
        shutil.copy2(path, dest)


def alpha_bbox(img: Image.Image) -> tuple[int, int, int, int]:
    alpha = img.getchannel("A")
    bbox = alpha.point(lambda p: 255 if p > 8 else 0).getbbox()
    if not bbox:
        raise RuntimeError("recorte sem pixels opacos")
    return bbox


def clean_alpha(img: Image.Image) -> Image.Image:
    r, g, b, a = img.split()
    a = a.filter(ImageFilter.MedianFilter(size=3))
    a = a.filter(ImageFilter.GaussianBlur(radius=0.35))
    a = a.point(lambda p: 0 if p < 8 else (255 if p > 246 else p))
    return Image.merge("RGBA", (r, g, b, a))


def fit_to_canvas(img: Image.Image) -> Image.Image:
    img = img.convert("RGBA")
    img = clean_alpha(img)
    crop = img.crop(alpha_bbox(img))

    max_side = int(TARGET_SIZE * 0.76)
    scale = min(max_side / crop.width, max_side / crop.height)
    new_size = (max(1, round(crop.width * scale)), max(1, round(crop.height * scale)))
    crop = crop.resize(new_size, Image.Resampling.LANCZOS)

    rgb = crop.convert("RGB")
    rgb = ImageOps.autocontrast(rgb, cutoff=0.25)
    rgb = ImageEnhance.Sharpness(rgb).enhance(1.18)
    rgb = ImageEnhance.Contrast(rgb).enhance(1.04)
    crop = Image.merge("RGBA", (*rgb.split(), crop.getchannel("A")))

    canvas = Image.new("RGBA", (TARGET_SIZE, TARGET_SIZE), (0, 0, 0, 0))
    x = (TARGET_SIZE - crop.width) // 2
    y = (TARGET_SIZE - crop.height) // 2
    canvas.alpha_composite(crop, (x, y))
    return canvas


def process_one(src: Path, dest: Path, session) -> dict[str, object]:
    img = Image.open(src).convert("RGB")
    cut = remove(
        img,
        session=session,
        alpha_matting=True,
        alpha_matting_foreground_threshold=235,
        alpha_matting_background_threshold=16,
        alpha_matting_erode_size=6,
        post_process_mask=True,
    )
    final = fit_to_canvas(cut)
    dest.parent.mkdir(parents=True, exist_ok=True)
    final.save(dest, "PNG", optimize=True)
    return validate_png(dest)


def validate_png(path: Path) -> dict[str, object]:
    img = Image.open(path)
    if img.mode != "RGBA":
        raise RuntimeError(f"{path.name}: modo {img.mode}, esperado RGBA")
    if img.size != (TARGET_SIZE, TARGET_SIZE):
        raise RuntimeError(f"{path.name}: tamanho {img.size}, esperado {TARGET_SIZE}x{TARGET_SIZE}")

    alpha = img.getchannel("A")
    extrema = alpha.getextrema()
    if extrema[0] != 0 or extrema[1] < 220:
        raise RuntimeError(f"{path.name}: alpha invalido {extrema}")

    corners = [
        alpha.getpixel((0, 0)),
        alpha.getpixel((TARGET_SIZE - 1, 0)),
        alpha.getpixel((0, TARGET_SIZE - 1)),
        alpha.getpixel((TARGET_SIZE - 1, TARGET_SIZE - 1)),
    ]
    if any(c > 0 for c in corners):
        raise RuntimeError(f"{path.name}: cantos nao transparentes {corners}")

    opaque_bbox = alpha.point(lambda p: 255 if p > 12 else 0).getbbox()
    coverage = sum(1 for p in alpha.getdata() if p > 12) / (TARGET_SIZE * TARGET_SIZE)
    if not opaque_bbox or coverage < 0.025:
        raise RuntimeError(f"{path.name}: area opaca pequena demais {coverage:.4f}")

    return {
        "file": str(path.relative_to(ROOT)),
        "size": img.size,
        "alpha": extrema,
        "coverage": round(coverage, 5),
        "bbox": opaque_bbox,
    }


def make_contact_sheet(paths: list[Path], out: Path, cols: int = 5) -> None:
    thumbs: list[Image.Image] = []
    for path in paths:
        base = Image.new("RGBA", (220, 220), (246, 248, 243, 255))
        img = Image.open(path).convert("RGBA")
        img.thumbnail((190, 190), Image.Resampling.LANCZOS)
        base.alpha_composite(img, ((220 - img.width) // 2, (220 - img.height) // 2))
        thumbs.append(base.convert("RGB"))

    if not thumbs:
        return
    rows = (len(thumbs) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * 220, rows * 220), (255, 255, 255))
    for i, thumb in enumerate(thumbs):
        sheet.paste(thumb, ((i % cols) * 220, (i // cols) * 220))
    out.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(out, quality=92)


def remove_original_jpgs() -> None:
    for path in all_jpgs():
        backup = BACKUP_DIR / path.name
        if not backup.exists():
            raise RuntimeError(f"Backup ausente para {path.name}")
        if sha256(path) != sha256(backup):
            raise RuntimeError(f"Backup nao confere para {path.name}")
        path.unlink()


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--model", default="isnet-general-use")
    parser.add_argument("--limit", type=int, default=0)
    parser.add_argument("--finalize", action="store_true")
    args = parser.parse_args()

    os.environ.setdefault("U2NET_HOME", str(ROOT / ".rembg-models"))
    REVIEW_DIR.mkdir(parents=True, exist_ok=True)
    HASH_DIR.mkdir(parents=True, exist_ok=True)
    ensure_backup()

    files = public_jpgs()
    if args.limit:
        files = files[: args.limit]
    if not files:
        raise RuntimeError("Nenhum Hagil_*.jpg encontrado para processar")

    groups: dict[str, list[Path]] = defaultdict(list)
    for path in files:
        groups[sha256(path)].append(path)

    print(f"Arquivos publicaveis: {len(files)}")
    print(f"Imagens unicas por hash: {len(groups)}")
    print(f"Modelo: {args.model}")

    session = new_session(args.model)
    manifest: dict[str, object] = {
        "target_size": TARGET_SIZE,
        "model": args.model,
        "source_count": len(files),
        "unique_hash_count": len(groups),
        "items": [],
    }

    png_outputs: list[Path] = []
    for digest, paths in groups.items():
        representative = paths[0]
        hash_png = HASH_DIR / f"{digest}.png"
        info = process_one(representative, hash_png, session)
        for src in paths:
            png_path = src.with_suffix(".png")
            shutil.copy2(hash_png, png_path)
            validate_png(png_path)
            png_outputs.append(png_path)
        manifest["items"].append({
            "hash": digest,
            "representative": str(representative.relative_to(ROOT)),
            "copies": [str(p.relative_to(ROOT)) for p in paths],
            "png": str(hash_png.relative_to(ROOT)),
            "validation": info,
        })
        print(f"OK {representative.name} -> {len(paths)} copia(s)")

    make_contact_sheet(png_outputs[:30], REVIEW_DIR / "contact-sheet-publicados.jpg")
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")

    if args.finalize:
        if len(list(PRODUCT_DIR.glob("Hagil_*.png"))) != 167:
            raise RuntimeError("Contagem final de PNGs publicaveis diferente de 167")
        remove_original_jpgs()

    print(f"Manifesto: {MANIFEST.relative_to(ROOT)}")
    print(f"Contact sheet: {(REVIEW_DIR / 'contact-sheet-publicados.jpg').relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:
        print(f"ERRO: {exc}", file=sys.stderr)
        raise
