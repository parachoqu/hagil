#!/usr/bin/env python3
"""Prepara os packshots para o sistema Campo Vivo.

Os originais são PNGs de 2048×2048 com 1,4 MB em média — 234 MB no total.
Além do peso, o conteúdo fica centralizado com folga transparente variável,
o que faz a embalagem "flutuar" quando alinhada pela base numa composição.

Este script resolve os dois problemas de uma vez:

  1. recorta ao conteúdo real (bounding box do alpha), de modo que a base
     da imagem seja a base da embalagem — `object-position: bottom` passa
     a assentar o produto na linha de chão da cena;
  2. converte para WebP com alpha em duas escalas, dentro do orçamento
     de 250 KB por packshot.

Saída, espelhando o nome do original:
    assets/images/produtos/otimizados/<nome>.webp        altura 1100 (campanhas, detalhe)
    assets/images/produtos/otimizados/<nome>-card.webp   altura  460 (grade do catálogo)

A embalagem em si não é alterada: sem recolorir, sem distorcer, sem
recompor. Apenas recorte da área transparente e reamostragem.

    python3 scripts/otimizar_packshots.py
"""

from __future__ import annotations

import json
from pathlib import Path

from PIL import Image

RAIZ = Path(__file__).resolve().parent.parent
ORIGEM = RAIZ / "assets" / "images" / "produtos"
DESTINO = ORIGEM / "otimizados"

ALTURA_GRANDE = 1100
ALTURA_CARD = 460
QUALIDADE = 86
# Respiro mínimo para a sombra do drop-shadow não ser cortada no CSS.
MARGEM = 8


def recorta(imagem: Image.Image) -> Image.Image:
    """Recorta à área não transparente, com uma margem de respiro."""
    caixa = imagem.getbbox()
    if not caixa:
        return imagem
    x0, y0, x1, y1 = caixa
    x0 = max(0, x0 - MARGEM)
    y0 = max(0, y0 - MARGEM)
    x1 = min(imagem.width, x1 + MARGEM)
    y1 = min(imagem.height, y1 + MARGEM)
    return imagem.crop((x0, y0, x1, y1))


def reduz(imagem: Image.Image, altura_alvo: int) -> Image.Image:
    if imagem.height <= altura_alvo:
        return imagem
    largura = round(imagem.width * altura_alvo / imagem.height)
    return imagem.resize((largura, altura_alvo), Image.LANCZOS)


def main() -> None:
    DESTINO.mkdir(parents=True, exist_ok=True)
    originais = sorted(ORIGEM.glob("*.png"))
    if not originais:
        print("Nenhum PNG encontrado em assets/images/produtos/")
        return

    manifesto: dict[str, dict[str, object]] = {}
    peso_antes = peso_depois = 0

    for indice, caminho in enumerate(originais, 1):
        imagem = Image.open(caminho).convert("RGBA")
        peso_antes += caminho.stat().st_size

        conteudo = recorta(imagem)
        proporcao = round(conteudo.width / conteudo.height, 3)

        grande = reduz(conteudo, ALTURA_GRANDE)
        card = reduz(conteudo, ALTURA_CARD)

        saida_grande = DESTINO / f"{caminho.stem}.webp"
        saida_card = DESTINO / f"{caminho.stem}-card.webp"
        grande.save(saida_grande, "WEBP", quality=QUALIDADE, method=6)
        card.save(saida_card, "WEBP", quality=QUALIDADE, method=6)
        peso_depois += saida_grande.stat().st_size + saida_card.stat().st_size

        manifesto[caminho.name] = {
            "grande": f"assets/images/produtos/otimizados/{saida_grande.name}",
            "card": f"assets/images/produtos/otimizados/{saida_card.name}",
            "largura": grande.width,
            "altura": grande.height,
            "cardLargura": card.width,
            "cardAltura": card.height,
            # Acima de 1.3 a embalagem é deitada e pede outra regra de escala
            # nas composições — o palco dimensiona por largura, não por altura.
            "largo": proporcao > 1.3,
        }

        if indice % 40 == 0 or indice == len(originais):
            print(f"  {indice}/{len(originais)}")

    (ORIGEM / "manifesto-otimizados.json").write_text(
        json.dumps(manifesto, ensure_ascii=False, indent=2), encoding="utf-8"
    )

    largos = sum(1 for v in manifesto.values() if v["largo"])
    print(f"\n{len(manifesto)} packshots processados ({largos} deitados)")
    print(f"antes  {peso_antes / 1024 / 1024:7.1f} MB")
    print(f"depois {peso_depois / 1024 / 1024:7.1f} MB  (grande + card)")
    print(f"redução {(1 - peso_depois / peso_antes) * 100:.1f}%")
    print(f"maior arquivo: {max(p.stat().st_size for p in DESTINO.glob('*.webp')) / 1024:.0f} KB")


if __name__ == "__main__":
    main()
