#!/usr/bin/env python3
"""Confere e normaliza o acervo fotográfico do Campo Vivo.

Rode depois de gerar as imagens do briefing (docs/briefing-imagens.md).

O que faz em cada slot:
  1. aceita a imagem em .webp, .png, .jpg ou .jpeg;
  2. corta ao centro para a proporção exata do slot, se necessário;
  3. redimensiona para a dimensão final e salva em .webp;
  4. remove o arquivo de origem quando ele não era .webp;
  5. avisa o que ainda é placeholder e o que passou do orçamento de peso.

É seguro rodar quantas vezes quiser: um slot já correto é deixado como está.

    python3 scripts/verificar_acervo.py
    python3 scripts/verificar_acervo.py --so-conferir   # não escreve nada
"""

from __future__ import annotations

import importlib.util
import sys
from pathlib import Path

from PIL import Image

RAIZ = Path(__file__).resolve().parent.parent
DESTINO = RAIZ / "assets" / "images" / "campo"
QUALIDADE = 84
EXTENSOES = (".webp", ".png", ".jpg", ".jpeg")

# Orçamento do sistema, por tipo de slot.
LIMITES_KB = {"hero": 350, "campanhas": 450, "especies": 450, "ciencia": 450}


def carrega_slots() -> list[tuple[str, int, int]]:
    """Lê os slots do gerador de placeholders — a fonte da verdade."""
    caminho = RAIZ / "scripts" / "gerar_placeholders_campo.py"
    spec = importlib.util.spec_from_file_location("placeholders", caminho)
    modulo = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(modulo)
    return [(c, w, h) for c, w, h, *_ in modulo.SLOTS]


def eh_placeholder(caminho: Path) -> bool:
    """Placeholders são gerados por nós e ficam bem abaixo de 40 KB;
    uma fotografia real nessas dimensões nunca chega tão leve."""
    return caminho.stat().st_size < 40 * 1024


def corta_para_proporcao(imagem: Image.Image, alvo_w: int, alvo_h: int) -> Image.Image:
    """Corte central para a proporção do slot, preservando o enquadramento."""
    alvo = alvo_w / alvo_h
    atual = imagem.width / imagem.height
    if abs(atual - alvo) < 0.01:
        return imagem
    if atual > alvo:
        nova_l = round(imagem.height * alvo)
        x = (imagem.width - nova_l) // 2
        return imagem.crop((x, 0, x + nova_l, imagem.height))
    nova_a = round(imagem.width / alvo)
    y = (imagem.height - nova_a) // 2
    return imagem.crop((0, y, imagem.width, y + nova_a))


def main() -> None:
    so_conferir = "--so-conferir" in sys.argv
    slots = carrega_slots()

    pendentes, prontos, ajustados, pesados = [], [], [], []

    for relativo, alvo_w, alvo_h in slots:
        destino = DESTINO / relativo
        grupo = relativo.split("/")[0]

        # Um PNG/JPG no caminho do slot é sempre entrega nova e tem
        # prioridade sobre o .webp, que a essa altura ainda é o placeholder.
        origem = None
        for ext in (".png", ".jpg", ".jpeg"):
            candidato = destino.with_suffix(ext)
            if candidato.exists():
                origem = candidato
                break

        if origem is None:
            if not destino.exists():
                pendentes.append((relativo, "arquivo ausente"))
                continue
            if eh_placeholder(destino):
                pendentes.append((relativo, "ainda é placeholder"))
                continue
            origem = destino

        imagem = Image.open(origem)
        precisa = (
            origem.suffix != ".webp"
            or imagem.size != (alvo_w, alvo_h)
        )

        if precisa and not so_conferir:
            convertida = imagem.convert("RGB")
            convertida = corta_para_proporcao(convertida, alvo_w, alvo_h)
            if convertida.size != (alvo_w, alvo_h):
                convertida = convertida.resize((alvo_w, alvo_h), Image.LANCZOS)
            convertida.save(destino, "WEBP", quality=QUALIDADE, method=6)
            if origem != destino:
                origem.unlink()
            ajustados.append((relativo, f"{imagem.width}×{imagem.height} → {alvo_w}×{alvo_h}"))
        elif precisa:
            ajustados.append((relativo, f"{imagem.width}×{imagem.height} precisa virar {alvo_w}×{alvo_h}"))
        else:
            prontos.append(relativo)

        final = destino if destino.exists() else origem
        kb = final.stat().st_size / 1024
        limite = LIMITES_KB.get(grupo, 450)
        if kb > limite:
            pesados.append((relativo, f"{kb:.0f} KB (limite {limite} KB)"))

    def bloco(titulo, itens, detalhe=True):
        if not itens:
            return
        print(f"\n{titulo} ({len(itens)})")
        for item in itens:
            if detalhe and isinstance(item, tuple):
                print(f"  {item[0]:44} {item[1]}")
            else:
                print(f"  {item}")

    print(f"Acervo Campo Vivo — {len(slots)} slots\n" + "─" * 58)
    bloco("✓ Prontos", prontos, detalhe=False)
    bloco("↻ Normalizados agora" if not so_conferir else "↻ Precisam de ajuste", ajustados)
    bloco("⚠ Acima do orçamento — recomprimir", pesados)
    bloco("· Ainda pendentes", pendentes)

    faltam = len(pendentes)
    print("\n" + "─" * 58)
    if faltam:
        print(f"{len(slots) - faltam}/{len(slots)} entregues · faltam {faltam}")
        print("Briefing com os prompts: docs/briefing-imagens.md")
    else:
        print(f"Acervo completo: {len(slots)}/{len(slots)} imagens reais.")
        print("Confira ainda: direitos de uso registrados e alt text revisado.")


if __name__ == "__main__":
    main()
