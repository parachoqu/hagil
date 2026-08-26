#!/usr/bin/env python3
"""Gera as versões web dos arquivos de marca.

Os originais têm 3000×2061 px e ~180 KB cada, para aparecerem a 64 px de
altura no cabeçalho — sozinhos, pesavam mais que todo o resto da primeira
dobra somado.

A marca não é redesenhada: apenas reamostrada e convertida. Os arquivos
originais permanecem intactos como fonte.

    python3 scripts/otimizar_marca.py
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image

RAIZ = Path(__file__).resolve().parent.parent

# (origem, destino, altura alvo)  — 160 px cobre 64 px em telas 2x.
ATIVOS = [
    ("img/logo.png", "img/logo.webp", 160),
    (
        "assets/images/marca/logo-hagil-branco-oficial.png",
        "assets/images/marca/logo-hagil-branco-oficial.webp",
        160,
    ),
    ("img/logo.png", "img/favicon.png", 64),
]


def main() -> None:
    for origem, destino, altura in ATIVOS:
        entrada = RAIZ / origem
        saida = RAIZ / destino
        if not entrada.exists():
            print(f"  ausente: {origem}")
            continue

        imagem = Image.open(entrada).convert("RGBA")
        largura = round(imagem.width * altura / imagem.height)
        reduzida = imagem.resize((largura, altura), Image.LANCZOS)

        if saida.suffix == ".webp":
            reduzida.save(saida, "WEBP", quality=92, method=6)
        else:
            reduzida.save(saida, "PNG", optimize=True)

        antes = entrada.stat().st_size / 1024
        depois = saida.stat().st_size / 1024
        print(f"  {destino:52} {largura}×{altura}  {antes:6.0f} KB → {depois:5.1f} KB")


if __name__ == "__main__":
    main()
