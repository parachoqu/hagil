#!/usr/bin/env python3
"""Upgrade the local catalog with exact product images from hagil.com.br.

The default mode is a network-only dry run. Pass ``--apply`` to create a dated
backup, replace safe matches, and write the final manifest/contact sheet.
"""

from __future__ import annotations

import argparse
import hashlib
import html
import io
import json
import os
import re
import shutil
import ssl
import sys
import time
import unicodedata
from dataclasses import dataclass, field
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import urldefrag, urljoin, urlparse
from urllib.request import Request, urlopen

import numpy as np
from PIL import Image, ImageEnhance, ImageFilter, ImageOps
from scipy import ndimage

try:
    from rembg import new_session as rembg_new_session
    from rembg import remove as rembg_remove
except ImportError:  # Deterministic local fallback for environments without ONNX.
    rembg_new_session = None
    rembg_remove = None


ROOT = Path(__file__).resolve().parents[1]
PRODUCT_DIR = ROOT / "assets/images/produtos"
BACKUP_ROOT = ROOT / "backups/product-images"
REVIEW_DIR = ROOT / "prints/product-images-review"
MANIFEST_PATH = ROOT / "assets/images/produtos_upscale_manifest.json"
OFFICIAL_BASE = "https://www.hagil.com.br/"
USER_AGENT = "Mozilla/5.0 (compatible; HagilProductImageUpgrade/1.0)"
TARGET_SIZE = 2048
TARGET_MIN = 1920
MIN_COVERAGE = 0.003
MIN_COVERAGE_RATIO = 0.30
REMBG_MODEL = "isnet-general-use"
_REMBG_SESSION = None

CATEGORY_SEEDS = {
    "Aves": "produtos-homeopaticos-para-aves",
    "Bovinos": "produtos-homeopaticos-para-bovinos",
    "Equinos": "produtos-homeopaticos-para-equinos",
    "Ovinos": "produtos-homeopaticos-para-ovinos",
    "Suínos": "produtos-homeopaticos-para-suinos",
    "Pet": "produtos-homeopaticos-para-pet",
    "Caprinos": "produtos-homeopaticos-para-caprinos",
    "Bubalinos": "produtos-homeopaticos-para-bubalinos",
    "Peixes": "produtos-homeopaticos-para-peixes",
}
CATEGORY_FROM_PATH = {
    "aves": "Aves",
    "bovinos": "Bovinos",
    "equinos": "Equinos",
    "ovinos": "Ovinos",
    "suinos": "Suínos",
    "pet": "Pet",
    "caprinos": "Caprinos",
    "bubalinos": "Bubalinos",
    "peixes": "Peixes",
}
SEGMENT_SYNONYMS = {
    "aves-de-corte": {"aves-de-corte"},
    "aves-de-postura": {"aves-de-postura", "aves-postura"},
    "bovinos-de-corte": {"bovinos-de-corte", "gado-de-corte"},
    "bovinos-de-leite": {"bovinos-de-leite", "gado-leiteiro", "leiteiro"},
    "bovinos-1-fase": {
        "bovinos-1-fase",
        "bovinos-1a-fase",
        "1-fase",
        "primeira-fase",
    },
}

HTML_LINK_RE = re.compile(r'href=["\']([^"\']+)["\']', re.I)
SUBCATEGORY_RE = re.compile(
    r'<a[^>]+class=["\'][^"\']*subcategoria[^"\']*["\'][^>]+href=["\']([^"\']+)["\'][^>]*>(.*?)</a>',
    re.I | re.S,
)
CARD_RE = re.compile(
    r'<div class=["\']card-header["\']>\s*(.*?)\s*</div>.*?'
    r'<a href=["\']([^"\']*produto-homeopatico[^"\']*)["\'][^>]*>.*?'
    r'<img[^>]+src=["\']([^"\']*painel/imagens/icone/produto_[^"\']+\.jpg)["\']',
    re.I | re.S,
)
H1_RE = re.compile(r"<h1[^>]*>(.*?)</h1>", re.I | re.S)
CAROUSEL_RE = re.compile(
    r'id=["\']slide_produto["\'].*?<!--\s*fim slide_produto\s*-->', re.I | re.S
)
HIGH_IMAGE_RE = re.compile(
    r"https://www\.hagil\.com\.br/painel/imagens/produto_[a-f0-9]+\.jpg(?:\?image=\d+)?",
    re.I,
)


@dataclass
class LocalProduct:
    id: str
    name: str
    category: str
    segment: str
    photo: str
    path: Path
    name_key: str
    category_key: str
    segment_key: str
    target_bbox: tuple[int, int, int, int]
    before_size: tuple[int, int]
    before_sha256: str
    before_coverage: float


@dataclass
class OfficialItem:
    detail_url: str
    name: str
    source_page: str
    category: str
    segment: str
    icon_url: str
    high_url: str
    detail_name: str = ""
    detail_high_urls: list[str] = field(default_factory=list)


def relative(path: Path) -> str:
    return str(path.relative_to(ROOT))


def clean_text(value: str) -> str:
    value = re.sub(r"<[^>]*>", " ", value)
    return re.sub(r"\s+", " ", html.unescape(value)).strip()


def slugify(value: str) -> str:
    value = unicodedata.normalize("NFKD", value)
    value = "".join(char for char in value if not unicodedata.combining(char))
    return re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def alpha_coverage(image: Image.Image) -> float:
    alpha = np.asarray(image.convert("RGBA").getchannel("A"), dtype=np.uint8)
    return float(np.count_nonzero(alpha) / alpha.size)


def request_url(url: str) -> bytes:
    request = Request(url, headers={"User-Agent": USER_AGENT})
    context = ssl.create_default_context()
    with urlopen(request, timeout=30, context=context) as response:
        return response.read()


def fetch_html(url: str) -> str:
    return request_url(url).decode("utf-8", errors="replace")


def canonical_url(base: str, href: str) -> str | None:
    href = html.unescape(href).strip()
    if not href or href.startswith(("mailto:", "tel:", "javascript:", "#")):
        return None
    url = urldefrag(urljoin(base, href))[0]
    parsed = urlparse(url)
    if parsed.scheme not in {"http", "https"}:
        return None
    if parsed.netloc not in {"hagil.com.br", "www.hagil.com.br"}:
        return None
    return url


def category_from_listing_url(url: str) -> str:
    path = urlparse(url).path.lower()
    match = re.search(r"produtos-homeopaticos-para-([^/]+)", path)
    return CATEGORY_FROM_PATH.get(match.group(1), "") if match else ""


def subcategory_base(url: str) -> str:
    match = re.search(r"(/subcategoria-\d+)(?:/\d+)?/?$", urlparse(url).path)
    return match.group(1) if match else ""


def high_url_from_icon(icon_url: str) -> str:
    return icon_url.replace("/icone/", "/").split("?", 1)[0] + "?image=251"


def parse_catalog() -> list[LocalProduct]:
    text = (ROOT / "js/produtos.js").read_text(encoding="utf-8")
    match = re.search(r"const PRODUTOS = (\[.*?\]);\s+const AVISO_PADRAO", text, re.S)
    if not match:
        raise RuntimeError("Nao foi possivel extrair const PRODUTOS de js/produtos.js")
    raw_products = json.loads(match.group(1))
    products: list[LocalProduct] = []
    for item in raw_products:
        photo = item["foto"]
        path = ROOT / photo
        if not path.exists():
            raise RuntimeError(f"Imagem ausente no catalogo: {photo}")
        image = Image.open(path).convert("RGBA")
        bbox = image.getchannel("A").point(lambda value: 255 if value > 8 else 0).getbbox()
        if not bbox:
            raise RuntimeError(f"Imagem sem area opaca: {photo}")
        products.append(
            LocalProduct(
                id=item["id"],
                name=item["nome"],
                category=item["categoriaRotulo"],
                segment=item["segmento"],
                photo=photo,
                path=path,
                name_key=slugify(item["nome"]),
                category_key=slugify(item["categoriaRotulo"]),
                segment_key=slugify(item["segmento"]),
                target_bbox=bbox,
                before_size=image.size,
                before_sha256=sha256(path),
                before_coverage=alpha_coverage(image),
            )
        )
    if len(products) != 167:
        raise RuntimeError(f"Esperados 167 produtos no catalogo, encontrados {len(products)}")
    return products


def crawl_official() -> tuple[list[OfficialItem], dict[str, object]]:
    queue = [urljoin(OFFICIAL_BASE, seed) for seed in CATEGORY_SEEDS.values()]
    seen: set[str] = set()
    html_cache: dict[str, str] = {}
    category_by_subcategory: dict[str, str] = {}
    segment_by_subcategory: dict[str, str] = {}
    cards: dict[tuple[str, str, str, str], OfficialItem] = {}
    errors: list[dict[str, str]] = []

    while queue:
        page = queue.pop(0)
        if page in seen:
            continue
        seen.add(page)
        try:
            source = fetch_html(page)
            html_cache[page] = source
        except (HTTPError, URLError, TimeoutError, OSError) as exc:
            errors.append({"url": page, "error": repr(exc)})
            continue

        page_category = category_from_listing_url(page)
        base = subcategory_base(page)
        if base:
            page_category = category_by_subcategory.get(base, page_category)
        page_segment = segment_by_subcategory.get(base, "") if base else ""

        for href, label in SUBCATEGORY_RE.findall(source):
            full = canonical_url(page, href)
            if not full:
                continue
            sub_base = subcategory_base(full)
            if sub_base:
                category_by_subcategory[sub_base] = page_category
                segment_by_subcategory[sub_base] = clean_text(label)
            queue.append(full)

        for href in HTML_LINK_RE.findall(source):
            full = canonical_url(page, href)
            if not full:
                continue
            path = urlparse(full).path
            if (
                re.search(r"/subcategoria-\d+(?:/\d+)?/?$", path)
                or re.search(r"/produtos-homeopaticos-para-[^/]+(?:/\d+)?/?$", path)
                or path.startswith("/produto-homeopatico-")
            ):
                queue.append(full)

        if urlparse(page).path.startswith("/produto-homeopatico-"):
            continue

        for raw_name, detail, icon in CARD_RE.findall(source):
            detail_url = canonical_url(page, detail)
            icon_url = canonical_url(page, icon)
            if not detail_url or not icon_url:
                continue
            item = OfficialItem(
                detail_url=detail_url,
                name=clean_text(raw_name),
                source_page=page,
                category=page_category,
                segment=page_segment,
                icon_url=icon_url,
                high_url=high_url_from_icon(icon_url),
            )
            key = (item.detail_url, item.category, item.segment, item.name)
            cards[key] = item

    # Fetch each detail once. Images are read only from slide_produto, so the
    # recommendations section cannot accidentally supply a similar package.
    detail_cache: dict[str, tuple[str, list[str]]] = {}
    for item in cards.values():
        if item.detail_url not in detail_cache:
            try:
                source = html_cache.get(item.detail_url) or fetch_html(item.detail_url)
                heading = H1_RE.search(source)
                carousel = CAROUSEL_RE.search(source)
                detail_name = clean_text(heading.group(1)) if heading else ""
                urls = HIGH_IMAGE_RE.findall(carousel.group(0)) if carousel else []
                detail_cache[item.detail_url] = (detail_name, list(dict.fromkeys(urls)))
            except (HTTPError, URLError, TimeoutError, OSError) as exc:
                errors.append({"url": item.detail_url, "error": repr(exc)})
                detail_cache[item.detail_url] = ("", [])
        item.detail_name, item.detail_high_urls = detail_cache[item.detail_url]
        if item.detail_high_urls:
            item.high_url = item.detail_high_urls[0]

    metadata = {
        "visited_pages": len(seen),
        "html_pages": len(html_cache),
        "official_cards": len(cards),
        "subcategories": len(segment_by_subcategory),
        "errors": errors,
        "error_count": len(errors),
    }
    return list(cards.values()), metadata


def segment_matches(product: LocalProduct, item: OfficialItem) -> bool:
    if not item.segment:
        return True
    item_segment = slugify(item.segment)
    synonyms = SEGMENT_SYNONYMS.get(product.segment_key, {product.segment_key})
    haystacks = {item_segment, slugify(item.source_page), slugify(item.detail_url)}
    return any(token in haystack for token in synonyms for haystack in haystacks)


def score_match(product: LocalProduct, item: OfficialItem) -> int:
    item_names = {slugify(item.name), slugify(item.detail_name)} - {""}
    if product.name_key not in item_names:
        return -1
    if item.category and slugify(item.category) != product.category_key:
        return -1
    if not segment_matches(product, item):
        return -1
    score = 100
    if slugify(item.detail_name) == product.name_key:
        score += 20
    if slugify(item.category) == product.category_key:
        score += 10
    if item.segment and product.segment_key == slugify(item.segment):
        score += 5
    if item.detail_high_urls:
        score += 3
    return score


def choose_matches(
    products: list[LocalProduct], items: list[OfficialItem]
) -> dict[str, OfficialItem]:
    matches: dict[str, OfficialItem] = {}
    for product in products:
        candidates = [(score_match(product, item), item) for item in items]
        candidates = [pair for pair in candidates if pair[0] >= 0]
        if candidates:
            candidates.sort(key=lambda pair: (pair[0], pair[1].high_url), reverse=True)
            matches[product.id] = candidates[0][1]
    return matches


def download_image(url: str) -> tuple[Image.Image, bytes]:
    data = request_url(url)
    return Image.open(io.BytesIO(data)).convert("RGB"), data


def remove_light_background(image: Image.Image) -> Image.Image:
    rgb = np.asarray(image.convert("RGB"), dtype=np.float32)
    height, width, _ = rgb.shape
    border = np.concatenate(
        [rgb[0], rgb[-1], rgb[:, 0], rgb[:, -1]], axis=0
    )
    border_color = np.median(border, axis=0)
    diff = np.sqrt(np.mean((rgb - border_color) ** 2, axis=2))
    chroma = rgb.max(axis=2) - rgb.min(axis=2)
    near_border_color = (diff < 24) & (rgb.mean(axis=2) > 205)
    near_white = (rgb.min(axis=2) > 238) & (chroma < 16)
    very_white = rgb.min(axis=2) > 250
    candidate = near_border_color | near_white | very_white

    seeds = np.zeros((height, width), dtype=bool)
    seeds[[0, -1], :] = candidate[[0, -1], :]
    seeds[:, [0, -1]] = candidate[:, [0, -1]]
    background = ndimage.binary_propagation(seeds, mask=candidate)
    # The outside of the image is background too. Without border_value=1 the
    # erosion phase clears the outermost pixels and leaves a faint white frame.
    background = ndimage.binary_closing(
        background, structure=np.ones((3, 3)), border_value=1
    )
    alpha = np.where(background, 0, 255).astype(np.uint8)
    alpha_image = Image.fromarray(alpha, "L").filter(ImageFilter.MedianFilter(3))
    alpha_image = alpha_image.filter(ImageFilter.GaussianBlur(0.7))
    return Image.merge("RGBA", (*image.convert("RGB").split(), alpha_image))


def remove_background(
    image: Image.Image, preserve_white: bool = False
) -> tuple[Image.Image, str]:
    global _REMBG_SESSION
    if rembg_new_session is not None and rembg_remove is not None:
        if _REMBG_SESSION is None:
            _REMBG_SESSION = rembg_new_session(REMBG_MODEL)
        foreground_threshold = 240 if preserve_white else 235
        background_threshold = 10 if preserve_white else 16
        erode_size = 10 if preserve_white else 6
        cutout = rembg_remove(
            image.convert("RGB"),
            session=_REMBG_SESSION,
            alpha_matting=True,
            alpha_matting_foreground_threshold=foreground_threshold,
            alpha_matting_background_threshold=background_threshold,
            alpha_matting_erode_size=erode_size,
            post_process_mask=not preserve_white,
        ).convert("RGBA")
        # rembg clears hidden RGB. Preserve the official source RGB so guarded
        # repairs inside white packaging reveal the real pixels, not black.
        return Image.merge(
            "RGBA", (*image.convert("RGB").split(), cutout.getchannel("A"))
        ), f"rembg:{REMBG_MODEL}{':white-preserving' if preserve_white else ''}"
    return remove_light_background(image), "local-edge-connected"


def resize_rgba_alpha_safe(image: Image.Image, size: tuple[int, int]) -> Image.Image:
    rgba = np.asarray(image.convert("RGBA"), dtype=np.float32)
    alpha = rgba[..., 3:4] / 255.0
    rgba[..., :3] *= alpha
    premultiplied = Image.fromarray(np.clip(rgba, 0, 255).astype(np.uint8), "RGBA")
    resized = np.asarray(
        premultiplied.resize(size, Image.Resampling.LANCZOS), dtype=np.float32
    )
    resized_alpha = resized[..., 3:4]
    safe_alpha = np.maximum(resized_alpha, 1.0)
    rgb = np.where(resized_alpha > 0, resized[..., :3] * 255.0 / safe_alpha, 0)
    output = np.concatenate([np.clip(rgb, 0, 255), resized_alpha], axis=2).astype(np.uint8)
    return Image.fromarray(output, "RGBA")


def fit_to_canvas(
    cutout: Image.Image,
    target_bbox: tuple[int, int, int, int],
    enhance: bool = True,
) -> Image.Image:
    alpha = cutout.getchannel("A").point(lambda value: 255 if value > 8 else 0)
    bbox = alpha.getbbox()
    if not bbox:
        raise RuntimeError("recorte sem pixels opacos")
    crop = cutout.crop(bbox)
    left, top, right, bottom = target_bbox
    target_width = max(1, right - left)
    target_height = max(1, bottom - top)
    scale = min(target_width / crop.width, target_height / crop.height)
    new_size = (max(1, round(crop.width * scale)), max(1, round(crop.height * scale)))
    if enhance:
        resized = resize_rgba_alpha_safe(crop, new_size)
        visible_alpha = resized.getchannel("A")
        visible_rgb = ImageOps.autocontrast(resized.convert("RGB"), cutoff=0.2)
        visible_rgb = visible_rgb.filter(
            ImageFilter.UnsharpMask(radius=1.6, percent=135, threshold=3)
        )
        visible_rgb = ImageEnhance.Sharpness(visible_rgb).enhance(1.10)
        visible_rgb = ImageEnhance.Contrast(visible_rgb).enhance(1.025)
    else:
        visible_alpha = crop.getchannel("A").resize(new_size, Image.Resampling.LANCZOS)
        visible_rgb = crop.convert("RGB").resize(new_size, Image.Resampling.LANCZOS)
        visible_rgb = visible_rgb.filter(
            ImageFilter.UnsharpMask(radius=1.2, percent=105, threshold=3)
        )
    x = left + (target_width - visible_rgb.width) // 2
    y = top + (target_height - visible_rgb.height) // 2
    resized = Image.merge("RGBA", (*visible_rgb.split(), visible_alpha))
    canvas = Image.new("RGBA", (TARGET_SIZE, TARGET_SIZE), (0, 0, 0, 0))
    canvas.alpha_composite(resized, (x, y))
    return canvas


def validate_image(image: Image.Image, name: str) -> dict[str, object]:
    image = image.convert("RGBA")
    if image.size != (TARGET_SIZE, TARGET_SIZE):
        raise RuntimeError(f"{name}: tamanho {image.size}, esperado {(TARGET_SIZE, TARGET_SIZE)}")
    alpha = image.getchannel("A")
    extrema = alpha.getextrema()
    corners = [
        alpha.getpixel((0, 0)),
        alpha.getpixel((TARGET_SIZE - 1, 0)),
        alpha.getpixel((0, TARGET_SIZE - 1)),
        alpha.getpixel((TARGET_SIZE - 1, TARGET_SIZE - 1)),
    ]
    coverage = alpha_coverage(image)
    if extrema[0] != 0 or extrema[1] != 255 or any(corners) or coverage < MIN_COVERAGE:
        raise RuntimeError(
            f"{name}: validacao falhou alpha={extrema} corners={corners} coverage={coverage:.4f}"
        )
    return {
        "size": list(image.size),
        "mode": image.mode,
        "alpha_extrema": list(extrema),
        "bbox": list(alpha.point(lambda value: 255 if value > 8 else 0).getbbox()),
        "coverage": round(coverage, 5),
    }


def validate_png(path: Path) -> dict[str, object]:
    return validate_image(Image.open(path).convert("RGBA"), path.name)


def make_backup(products: list[LocalProduct]) -> Path:
    backup = BACKUP_ROOT / time.strftime("official-hd-before_%Y%m%d_%H%M%S")
    backup.mkdir(parents=True, exist_ok=False)
    for product in products:
        shutil.copy2(product.path, backup / product.path.name)
    return backup


def make_contact_sheet(paths: list[Path], output: Path) -> None:
    cols, cell = 10, 260
    rows = (len(paths) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * cell, rows * cell), "white")
    for index, path in enumerate(paths):
        image = Image.open(path).convert("RGBA")
        image.thumbnail((cell - 24, cell - 24), Image.Resampling.LANCZOS)
        preview = Image.new("RGBA", (cell, cell), (255, 255, 255, 255))
        preview.alpha_composite(image, ((cell - image.width) // 2, (cell - image.height) // 2))
        sheet.paste(preview.convert("RGB"), ((index % cols) * cell, (index // cols) * cell))
    output.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(output, "JPEG", quality=90, optimize=True)


def process(
    products: list[LocalProduct], matches: dict[str, OfficialItem], apply: bool
) -> dict[str, object]:
    backup = make_backup(products) if apply else None
    manifest: dict[str, object] = {
        "started_at": time.strftime("%Y-%m-%dT%H:%M:%S%z"),
        "target_size": [TARGET_SIZE, TARGET_SIZE],
        "target_min_dimension": TARGET_MIN,
        "method": "official hagil.com.br source image + rembg ISNet when available (local edge-connected fallback) + alpha-safe resize/sharpen",
        "source_policy": "official exact match only; current PNG fallback for unmatched products",
        "backup_dir": relative(backup) if backup else None,
        "items": [],
    }
    failures: list[dict[str, str]] = []
    download_cache: dict[str, tuple[Image.Image, bytes]] = {}
    cutout_cache: dict[tuple[str, bool], tuple[Image.Image, str]] = {}

    for index, product in enumerate(products, 1):
        record: dict[str, object] = {
            "file": product.photo,
            "product": product.name,
            "category": product.category,
            "segment": product.segment,
            "before_size": list(product.before_size),
            "before_sha256": product.before_sha256,
            "before_coverage": round(product.before_coverage, 5),
        }
        official = matches.get(product.id)
        if not official:
            record.update(
                status="fallback",
                reason="no exact official source match",
                after_size=list(product.before_size),
                after_sha256=product.before_sha256,
                validation=validate_png(product.path),
            )
            print(f"[{index:03d}/{len(products)}] FALLBACK {product.path.name}")
            manifest["items"].append(record)
            continue

        try:
            if official.high_url not in download_cache:
                download_cache[official.high_url] = download_image(official.high_url)
            source_image, source_bytes = download_cache[official.high_url]
            preserve_white = product.name == "Dhermus Creme"
            cutout_key = (official.high_url, preserve_white)
            if cutout_key not in cutout_cache:
                cutout_cache[cutout_key] = remove_background(
                    source_image.copy(), preserve_white=preserve_white
                )
            cutout, removal_method = cutout_cache[cutout_key]
            final = fit_to_canvas(
                cutout, product.target_bbox, enhance=not preserve_white
            )
            validation = validate_image(final, product.path.name)
            coverage = float(validation["coverage"])
            ratio = coverage / product.before_coverage if product.before_coverage else 0.0
            record.update(
                official_url=official.high_url,
                official_detail_url=official.detail_url,
                official_source_page=official.source_page,
                official_source_sha256=sha256_bytes(source_bytes),
                official_source_size=list(source_image.size),
                background_removal=removal_method,
                matched_name=official.detail_name or official.name,
                matched_category=official.category,
                matched_segment=official.segment,
                candidate_coverage=round(coverage, 5),
                coverage_ratio_to_previous=round(ratio, 5),
            )
            if ratio < MIN_COVERAGE_RATIO:
                record.update(
                    status="fallback",
                    reason="cutout_quality_guard",
                    after_size=list(product.before_size),
                    after_sha256=product.before_sha256,
                    validation=validate_png(product.path),
                )
                print(
                    f"[{index:03d}/{len(products)}] FALLBACK {product.path.name} "
                    f"(coverage ratio {ratio:.3f})"
                )
            elif apply:
                temporary = product.path.with_suffix(product.path.suffix + ".tmp")
                final.save(temporary, format="PNG", optimize=True, compress_level=6)
                os.replace(temporary, product.path)
                record.update(
                    status="official",
                    after_size=list(final.size),
                    after_sha256=sha256(product.path),
                    validation=validate_png(product.path),
                )
                print(f"[{index:03d}/{len(products)}] OFFICIAL {product.path.name} <- {official.high_url}")
            else:
                record.update(
                    status="official-dry-run",
                    planned_size=list(final.size),
                    validation=validation,
                )
        except Exception as exc:  # Keep a complete partial manifest for auditing.
            record.update(status="error", error=repr(exc))
            failures.append({"file": product.path.name, "error": repr(exc)})
            print(f"[{index:03d}/{len(products)}] ERROR {product.path.name}: {exc}")
        manifest["items"].append(record)

    items = manifest["items"]
    manifest.update(
        finished_at=time.strftime("%Y-%m-%dT%H:%M:%S%z"),
        count=len(products),
        official_count=sum(item["status"] in {"official", "official-dry-run"} for item in items),
        fallback_count=sum(item["status"] == "fallback" for item in items),
        failure_count=len(failures),
        failures=failures,
    )
    if apply:
        MANIFEST_PATH.write_text(
            json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8"
        )
        make_contact_sheet(
            sorted(PRODUCT_DIR.glob("Hagil_*.png")),
            REVIEW_DIR / "contact-sheet-official-hd.jpg",
        )
    if failures:
        raise RuntimeError(f"{len(failures)} produto(s) falharam; ver manifesto parcial")
    return manifest


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--apply", action="store_true", help="substitui os PNGs atuais")
    parser.add_argument(
        "--dry-run-manifest",
        type=Path,
        default=REVIEW_DIR / "official-hd-dry-run.json",
        help="caminho do manifesto de dry-run",
    )
    args = parser.parse_args()
    products = parse_catalog()
    official_items, crawl = crawl_official()
    matches = choose_matches(products, official_items)
    print(f"Produtos locais: {len(products)}")
    print(f"Cards oficiais: {len(official_items)}")
    print(f"Matches exatos: {len(matches)}")
    print(f"Fallbacks planejados: {len(products) - len(matches)}")
    print(f"Erros de crawl: {crawl['error_count']}")

    if args.apply:
        manifest = process(products, matches, apply=True)
        print(f"Manifest: {MANIFEST_PATH}")
        print(f"Official: {manifest['official_count']}")
        print(f"Fallback: {manifest['fallback_count']}")
        print(f"Failures: {manifest['failure_count']}")
    else:
        dry_run = {
            "started_at": time.strftime("%Y-%m-%dT%H:%M:%S%z"),
            "mode": "dry-run",
            "crawl": crawl,
            "local_count": len(products),
            "official_card_count": len(official_items),
            "exact_match_count": len(matches),
            "fallback_count": len(products) - len(matches),
            "matches": {
                product.id: {
                    "file": product.photo,
                    "official_url": matches[product.id].high_url,
                    "detail_url": matches[product.id].detail_url,
                }
                for product in products
                if product.id in matches
            },
        }
        args.dry_run_manifest.parent.mkdir(parents=True, exist_ok=True)
        args.dry_run_manifest.write_text(
            json.dumps(dry_run, ensure_ascii=False, indent=2), encoding="utf-8"
        )
        print(f"Dry-run manifest: {args.dry_run_manifest}")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:
        print(f"ERRO: {exc}", file=sys.stderr)
        raise SystemExit(1)
