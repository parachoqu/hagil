#!/usr/bin/env python3
"""Gera os placeholders cromáticos do sistema Campo Vivo.

Cada slot de mídia do site nasce com um arquivo real nas dimensões e
proporções finais. Quando a fotografia existir, basta sobrescrever o
arquivo: nenhuma linha de HTML ou CSS precisa mudar.

O placeholder não é cinza: herda a cor do tema do seu slot, de modo que
a composição já se lê como Campo Vivo antes da foto chegar.

    python3 scripts/gerar_placeholders_campo.py
"""

from __future__ import annotations

import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

RAIZ = Path(__file__).resolve().parent.parent
DESTINO = RAIZ / "assets" / "images" / "campo"

# Paleta oficial Campo Vivo.
PALETA = {
    "profundo": (0x0B, 0x21, 0x17),
    "floresta": (0x17, 0x4A, 0x34),
    "marinho": (0x0F, 0x2C, 0x4C),
    "lima": (0xA9, 0xC8, 0x4F),
    "creme": (0xF4, 0xF0, 0xE5),
    "areia": (0xDC, 0xC9, 0xA4),
    "ocre": (0xC3, 0x8B, 0x32),
    "terra": (0xA5, 0x51, 0x35),
    "ceu": (0x64, 0xBF, 0xC9),
}

# Cada slot: (caminho, largura, altura, cor base, cor de profundidade, rótulo).
# As nove espécies recebem atmosferas distintas dentro da paleta oficial,
# para que o mosaico não se leia como nove variações do mesmo verde.
SLOTS: list[tuple[str, int, int, str, str, str]] = [
    # Hero — a abertura cinematográfica.
    ("hero/campo-hero-16x9.webp", 1920, 1080, "floresta", "profundo", "HERO / CAMPO 16:9"),
    ("hero/campo-hero-4x5.webp", 1080, 1350, "floresta", "profundo", "HERO / CAMPO 4:5"),
    ("hero/campo-hero-poster.webp", 1920, 1080, "floresta", "profundo", "HERO / POSTER"),
    # Descoberta por espécie — 4:5 vertical.
    ("especies/bovinos-4x5.webp", 1080, 1350, "areia", "terra", "BOVINOS"),
    ("especies/equinos-4x5.webp", 1080, 1350, "floresta", "profundo", "EQUINOS"),
    ("especies/suinos-4x5.webp", 1080, 1350, "terra", "profundo", "SUÍNOS"),
    ("especies/aves-4x5.webp", 1080, 1350, "ocre", "terra", "AVES"),
    ("especies/pet-4x5.webp", 1080, 1350, "ceu", "marinho", "PET"),
    ("especies/caprinos-4x5.webp", 1080, 1350, "areia", "floresta", "CAPRINOS"),
    ("especies/ovinos-4x5.webp", 1080, 1350, "creme", "areia", "OVINOS"),
    ("especies/bubalinos-4x5.webp", 1080, 1350, "profundo", "floresta", "BUBALINOS"),
    ("especies/peixes-4x5.webp", 1080, 1350, "marinho", "profundo", "PEIXES"),
    # Campanhas — 16:7, cada uma com o tema definido no sistema.
    ("campanhas/dynamis-16x7.webp", 1600, 700, "floresta", "profundo", "DYNAMIS / CAMPO"),
    ("campanhas/maximo-baby-16x7.webp", 1600, 700, "ceu", "marinho", "MÁXIMO BABY / PRIMEIRA FASE"),
    ("campanhas/entherikos-16x7.webp", 1600, 700, "marinho", "profundo", "ENTHÉRIKOS / MANEJO"),
    # Ciência e assistência — 3:2 editorial.
    ("ciencia/laboratorio-3x2.webp", 1200, 800, "marinho", "profundo", "LABORATÓRIO"),
    ("ciencia/assistencia-3x2.webp", 1200, 800, "floresta", "profundo", "ASSISTÊNCIA TÉCNICA"),
    ("ciencia/manejo-3x2.webp", 1200, 800, "terra", "profundo", "MANEJO NO CAMPO"),
    ("ciencia/controle-qualidade-3x2.webp", 1200, 800, "ocre", "terra", "CONTROLE DE QUALIDADE"),
]

FONTES_MONO = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf",
    "/usr/share/fonts/truetype/liberation/LiberationMono-Bold.ttf",
    "/usr/share/fonts/TTF/DejaVuSansMono-Bold.ttf",
]


def carrega_fonte(tamanho: int) -> ImageFont.ImageFont:
    for caminho in FONTES_MONO:
        if Path(caminho).exists():
            return ImageFont.truetype(caminho, tamanho)
    return ImageFont.load_default()


def clareia(cor: tuple[int, int, int], fator: float) -> tuple[int, int, int]:
    """Mistura a cor com branco. fator 0 = cor original, 1 = branco."""
    return tuple(round(c + (255 - c) * fator) for c in cor)


def luminancia(cor: tuple[int, int, int]) -> float:
    """Luminância relativa, para decidir tinta clara ou escura por cima."""
    canais = []
    for c in cor:
        s = c / 255
        canais.append(s / 12.92 if s <= 0.04045 else ((s + 0.055) / 1.055) ** 2.4)
    r, g, b = canais
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def gradiente_diagonal(
    largura: int, altura: int, topo: tuple[int, int, int], base: tuple[int, int, int]
) -> Image.Image:
    """Gradiente diagonal suave — a luz entra pelo canto superior esquerdo,
    como a luz lateral de fim de tarde que a direção de fotografia pede."""
    # Desenhado pequeno e ampliado: barato e sem bandas visíveis.
    p = 64
    campo = Image.new("RGB", (p, p))
    pixels = campo.load()
    for y in range(p):
        for x in range(p):
            t = (x / (p - 1) * 0.42 + y / (p - 1) * 0.58)
            pixels[x, y] = tuple(round(topo[i] + (base[i] - topo[i]) * t) for i in range(3))
    return campo.resize((largura, altura), Image.LANCZOS)


def desenha_gota(
    camada: Image.Image, cx: float, cy: float, raio: float, cor: tuple[int, int, int, int]
) -> None:
    """A gota da marca: círculo com um dos cantos em ponta, girado 45°.

    Usada como máscara e forma de fundo — o PDF autoriza a gota a inspirar
    recortes e transições, desde que o símbolo oficial não seja redesenhado.
    """
    lado = int(raio * 2)
    forma = Image.new("RGBA", (lado, lado), (0, 0, 0, 0))
    pincel = ImageDraw.Draw(forma)
    pincel.pieslice((0, 0, lado - 1, lado - 1), 90, 360, fill=cor)
    pincel.polygon([(lado / 2, lado / 2), (lado, lado / 2), (lado, lado)], fill=cor)
    pincel.polygon([(lado / 2, lado / 2), (lado / 2, lado), (lado, lado)], fill=cor)
    forma = forma.rotate(45, resample=Image.BICUBIC, expand=True)
    camada.alpha_composite(forma, (int(cx - forma.width / 2), int(cy - forma.height / 2)))


def gera(caminho: str, largura: int, altura: int, base: str, fundo: str, rotulo: str) -> Path:
    cor_base = PALETA[base]
    cor_fundo = PALETA[fundo]

    imagem = gradiente_diagonal(largura, altura, clareia(cor_base, 0.12), cor_fundo).convert("RGBA")

    # Duas gotas em escalas muito diferentes criam o contraste de escala e a
    # sensação de profundidade que o sistema pede, sem virar ornamento.
    formas = Image.new("RGBA", (largura, altura), (0, 0, 0, 0))
    clara = clareia(cor_base, 0.5)
    desenha_gota(formas, largura * 0.74, altura * 0.30, min(largura, altura) * 0.46, (*clara, 30))
    desenha_gota(formas, largura * 0.22, altura * 0.82, min(largura, altura) * 0.26, (*cor_fundo, 46))
    formas = formas.filter(ImageFilter.GaussianBlur(radius=max(largura, altura) / 220))
    imagem.alpha_composite(formas)

    # Vinheta suave: assenta a composição e protege a legibilidade do texto
    # que será sobreposto pelo véu da campanha.
    vinheta = Image.new("L", (largura, altura), 0)
    ImageDraw.Draw(vinheta).ellipse(
        (-largura * 0.25, -altura * 0.35, largura * 1.25, altura * 1.35), fill=90
    )
    vinheta = vinheta.filter(ImageFilter.GaussianBlur(radius=max(largura, altura) / 12))
    escuro = Image.new("RGBA", (largura, altura), (*cor_fundo, 255))
    imagem = Image.composite(imagem, escuro, vinheta.point(lambda v: 255 - (255 - v) // 2))

    # Rótulo técnico: identifica o slot durante o desenvolvimento sem
    # disputar a composição. Some assim que a fotografia substituir o
    # arquivo, então fica deliberadamente discreto.
    pincel = ImageDraw.Draw(imagem, "RGBA")
    corpo = max(11, round(min(largura, altura) * 0.013))
    base_clara = luminancia(cor_base) > 0.4
    tinta = (11, 33, 23, 90) if base_clara else (255, 255, 255, 80)
    # Fica no topo: a base de quase todo slot recebe rótulo ou texto
    # sobreposto pelo layout.
    margem = round(min(largura, altura) * 0.04)
    pincel.text(
        (margem, margem),
        f"{rotulo}  ·  {largura}×{altura}  ·  PLACEHOLDER",
        font=carrega_fonte(corpo),
        fill=tinta,
    )

    destino = DESTINO / caminho
    destino.parent.mkdir(parents=True, exist_ok=True)
    imagem.convert("RGB").save(destino, "WEBP", quality=82, method=6)
    return destino


def main() -> None:
    print(f"Gerando {len(SLOTS)} placeholders em {DESTINO.relative_to(RAIZ)}\n")
    total = 0
    for slot in SLOTS:
        destino = gera(*slot)
        peso = destino.stat().st_size
        total += peso
        print(f"  {destino.relative_to(DESTINO)}  ({peso / 1024:.0f} KB)")
    print(f"\n{len(SLOTS)} arquivos · {total / 1024:.0f} KB no total")


if __name__ == "__main__":
    main()
