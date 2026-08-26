#!/usr/bin/env python3
"""Gera js/catalogo.js — a fonte única de dados do catálogo Hágil.

Deduplica os produtos para conter apenas UM produto de cada (com suas espécies associadas),
remove o campo e referências a 'linha', e preserva imagens otimizadas e taxonomia.

    python3 scripts/gerar_catalogo.py
"""

from __future__ import annotations

import json
import re
import unicodedata
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
ORIGEM_JS = RAIZ / "js" / "catalogo.js"
ORIGEM_LEGADA = RAIZ / "scripts" / "produtos-dados-origem.js"
MANIFESTO = RAIZ / "assets" / "images" / "produtos" / "manifesto-otimizados.json"
DESTINO = RAIZ / "js" / "catalogo.js"

CODIGO = re.compile(r"\s+(?:H|HB|HC|HP|MH|HMC|HV|MHC)\d+$", re.IGNORECASE)
SUFIXO_PET = re.compile(r"\s+pet$", re.IGNORECASE)

ALIASES = {
    "intramasthe-10": "IntraMasthe 10",
    "hmais": "HMAIS",
}

NAME_ALIASES = {
    "intramasthe-10": "IntraMasthe 10",
    "intramasthe 10": "IntraMasthe 10",
}

ESP_ROTULOS = {
    "bovinos": "Bovinos",
    "equinos": "Equinos",
    "suinos": "Suínos",
    "aves": "Aves",
    "pet": "Pet",
    "caprinos": "Caprinos",
    "ovinos": "Ovinos",
    "bubalinos": "Bubalinos",
    "peixes": "Peixes",
}

PRIORIDADE_ESPECIE = {
    "bovinos": 10,
    "equinos": 8,
    "aves": 7,
    "suinos": 6,
    "pet": 5,
    "caprinos": 4,
    "ovinos": 3,
    "bubalinos": 2,
    "peixes": 1,
}


def sem_acento(texto: str) -> str:
    return "".join(
        c for c in unicodedata.normalize("NFD", texto) if unicodedata.category(c) != "Mn"
    )


def slug(texto: str) -> str:
    base = sem_acento(texto).lower()
    base = re.sub(r"[^a-z0-9]+", "-", base)
    return base.strip("-")


def familia_de(nome: str) -> str:
    base = CODIGO.sub("", nome).strip()
    base = SUFIXO_PET.sub("", base).strip()
    chave = slug(base)
    if chave in ALIASES:
        return ALIASES[chave]
    return base


def main() -> None:
    fonte = ORIGEM_LEGADA if ORIGEM_LEGADA.exists() else ORIGEM_JS
    texto = fonte.read_text(encoding="utf-8")
    marca = "const PRODUTOS = [" if "const PRODUTOS = [" in texto else '"produtos":'
    inicio = texto.index(marca)
    arr_ini = texto.index("[", inicio)
    produtos_brutos, _ = json.JSONDecoder().raw_decode(texto[arr_ini:])
    print(f"fonte: {fonte.name} ({len(produtos_brutos)} itens brutos)")

    manifesto = {}
    if MANIFESTO.exists():
        manifesto = json.loads(MANIFESTO.read_text(encoding="utf-8"))
    else:
        print("aviso: manifesto de packshots ausente — rode otimizar_packshots.py")

    dedup: dict[str, dict] = {}

    for p in produtos_brutos:
        nome_bruto = p.get("nome", "").strip()
        nome = NAME_ALIASES.get(nome_bruto.lower(), nome_bruto)
        chave = slug(nome)
        if not chave:
            continue

        nome_arquivo = Path(p.get("foto", "")).name
        info = manifesto.get(nome_arquivo, {})
        familia = familia_de(nome)
        fslug = slug(familia)

        especie = p.get("categorias", [""])[0] if p.get("categorias") else p.get("especie", "")
        prio = PRIORIDADE_ESPECIE.get(especie, 0)
        segmento = p.get("segmento", "")

        imagem = info.get("grande", p.get("imagem", p.get("foto", "")))
        imagem_card = info.get("card", p.get("imagemCard", p.get("foto", "")))
        largura = info.get("largura", p.get("largura"))
        altura = info.get("altura", p.get("altura"))
        card_largura = info.get("cardLargura", p.get("cardLargura"))
        card_altura = info.get("cardAltura", p.get("cardAltura"))
        largo = bool(info.get("largo", p.get("largo", False)))

        if chave not in dedup:
            dedup[chave] = {
                "id": chave,
                "nome": nome,
                "foto": p.get("foto", ""),
                "imagem": imagem,
                "imagemCard": imagem_card,
                "largura": largura,
                "altura": altura,
                "cardLargura": card_largura,
                "cardAltura": card_altura,
                "largo": largo,
                "familia": familia,
                "familiaSlug": fslug,
                "especie": especie,
                "especies": [especie] if especie else [],
                "categorias": [especie] if especie else [],
                "segmentos": [segmento] if segmento else [],
                "beneficio": p.get("beneficio", ""),
                "indicacoesTecnicas": p.get("indicacoesTecnicas", ""),
                "composicao": p.get("composicao", ""),
                "modoUso": p.get("modoUso", ""),
                "registroMapa": p.get("registroMapa", ""),
                "conteudoPendente": True,
                "_prio": prio,
            }
        else:
            item = dedup[chave]
            if especie and especie not in item["especies"]:
                item["especies"].append(especie)
                item["categorias"].append(especie)
            if segmento and segmento not in item["segmentos"]:
                item["segmentos"].append(segmento)
            # Prioriza imagem e tema de espécies de maior destaque
            if prio > item["_prio"]:
                item["foto"] = p.get("foto", "")
                item["imagem"] = imagem
                item["imagemCard"] = imagem_card
                item["largura"] = largura
                item["altura"] = altura
                item["cardLargura"] = card_largura
                item["cardAltura"] = card_altura
                item["largo"] = largo
                item["especie"] = especie
                item["_prio"] = prio

    produtos_finais = list(dedup.values())

    for p in produtos_finais:
        del p["_prio"]
        esp_nomes = [ESP_ROTULOS.get(e, e.title()) for e in p["especies"]]
        if len(esp_nomes) == 1:
            p["categoriaRotulo"] = esp_nomes[0]
        elif len(esp_nomes) >= 4:
            p["categoriaRotulo"] = f"Multiespécie ({len(esp_nomes)} espécies)"
        else:
            p["categoriaRotulo"] = ", ".join(esp_nomes)

        p["busca"] = sem_acento(
            f"{p['nome']} {p['familia']} {' '.join(esp_nomes)} {' '.join(p['segmentos'])}"
        ).lower()

    # Ordena alfabeticamente pelo nome do produto
    produtos_finais.sort(key=lambda p: p["nome"].lower())

    cabecalho = f"""/* Hágil Terapêutica — catálogo Campo Vivo.
   GERADO POR scripts/gerar_catalogo.py — não editar à mão.

   {len(produtos_finais)} produtos únicos · 9 espécies.
*/
window.HAGIL_CATALOGO = {{
  produtos: {json.dumps(produtos_finais, ensure_ascii=False, indent=2)}
}};
"""
    DESTINO.write_text(cabecalho, encoding="utf-8")
    print(f"Sucesso: {len(produtos_finais)} produtos únicos gerados em {DESTINO.name}")


if __name__ == "__main__":
    main()
