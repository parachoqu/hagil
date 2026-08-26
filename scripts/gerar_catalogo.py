#!/usr/bin/env python3
"""Gera js/catalogo.js — a fonte única de dados do catálogo Hágil.

Enriquece os produtos existentes com o que é verificável a partir da
estrutura oficial (espécie, segmento, família, imagens) e deixa
explicitamente vazios os campos que dependem de validação técnica.

O sistema é claro quanto a isso: o design não pode inventar informação
veterinária. Claims, indicações, composição e modo de uso ficam como
campos preparados, com `conteudoPendente: true`, para o responsável
técnico preencher. A camada visual usa apenas a taxonomia.

    python3 scripts/gerar_catalogo.py
"""

from __future__ import annotations

import json
import re
import unicodedata
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
# Fonte dos produtos: o catálogo já gerado, ou o arquivo legado quando
# este script roda pela primeira vez.
ORIGEM_JS = RAIZ / "js" / "catalogo.js"
ORIGEM_LEGADA = RAIZ / "scripts" / "produtos-dados-origem.js"
MANIFESTO = RAIZ / "assets" / "images" / "produtos" / "manifesto-otimizados.json"
DESTINO = RAIZ / "js" / "catalogo.js"

# Códigos de apresentação que vêm depois do nome comercial.
CODIGO = re.compile(r"\s+(?:H|HB|HC|HP|MH|HMC|HV|MHC)\d+$", re.IGNORECASE)
# Sufixo de linha pet, que não constitui família separada.
SUFIXO_PET = re.compile(r"\s+pet$", re.IGNORECASE)

# Grafias divergentes nos nomes de arquivo originais.
ALIASES = {
    "intramasthe-10": "IntraMasthe 10",
    "hmais": "HMAIS",
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
    fonte = ORIGEM_JS if ORIGEM_JS.exists() else ORIGEM_LEGADA
    texto = fonte.read_text(encoding="utf-8")
    marca = '"produtos":' if fonte is ORIGEM_JS else "const PRODUTOS = ["
    inicio = texto.index(marca)
    arr_ini = texto.index("[", inicio)
    produtos, _ = json.JSONDecoder().raw_decode(texto[arr_ini:])
    print(f"fonte: {fonte.name}")

    manifesto = {}
    if MANIFESTO.exists():
        manifesto = json.loads(MANIFESTO.read_text(encoding="utf-8"))
    else:
        print("aviso: manifesto de packshots ausente — rode otimizar_packshots.py")

    familias: dict[str, dict] = {}

    for p in produtos:
        nome_arquivo = Path(p["foto"]).name
        info = manifesto.get(nome_arquivo, {})
        familia = familia_de(p["nome"])
        fslug = slug(familia)

        p["familia"] = familia
        p["familiaSlug"] = fslug
        p["especie"] = p["categorias"][0] if p["categorias"] else ""
        p["segmentoSlug"] = slug(p.get("segmento", "")) if p.get("segmento") else ""

        # Imagens: otimizadas quando existirem, original como reserva.
        p["imagem"] = info.get("grande", p["foto"])
        p["imagemCard"] = info.get("card", p["foto"])
        p["largura"] = info.get("largura")
        p["altura"] = info.get("altura")
        p["cardLargura"] = info.get("cardLargura")
        p["cardAltura"] = info.get("cardAltura")
        p["largo"] = bool(info.get("largo", False))

        # Texto de busca pré-normalizado: evita recalcular a cada tecla.
        p["busca"] = sem_acento(
            f"{p['nome']} {familia} {p['categoriaRotulo']} {p.get('segmento', '')} {p['linha']}"
        ).lower()

        # ---- Campos que dependem de validação técnica ----
        # Preenchidos pelo responsável técnico da Hágil. Enquanto vazios,
        # a interface mostra o aviso em vez de inventar conteúdo.
        p["beneficio"] = ""
        p["indicacoesTecnicas"] = ""
        p["composicao"] = ""
        p["modoUso"] = ""
        p["registroMapa"] = ""
        p["conteudoPendente"] = True

        # Descrições geradas por script na versão anterior; não são
        # informação veterinária validada e saem do schema.
        for campo in ("descricao", "frase", "informacoes", "indicacoes"):
            p.pop(campo, None)

        familias.setdefault(
            fslug,
            {"slug": fslug, "nome": familia, "total": 0, "especies": [], "capa": p["imagemCard"]},
        )
        registro = familias[fslug]
        registro["total"] += 1
        if p["categoriaRotulo"] not in registro["especies"]:
            registro["especies"].append(p["categoriaRotulo"])

    ordenadas = sorted(familias.values(), key=lambda f: (-f["total"], f["nome"]))

    cabecalho = f"""/* Hágil Terapêutica — catálogo Campo Vivo.
   GERADO POR scripts/gerar_catalogo.py — não editar à mão.

   {len(produtos)} produtos · {len(ordenadas)} famílias · 9 espécies.

   Espécie, segmento e família vêm da estrutura oficial e governam cor,
   filtro e hierarquia. Benefício, indicações, composição, modo de uso e
   registro ficam vazios com conteudoPendente: true, aguardando validação
   do responsável técnico. A interface nunca preenche esses campos sozinha.
*/
window.HAGIL_CATALOGO = {{
  produtos: {json.dumps(produtos, ensure_ascii=False, indent=2)},
  familias: {json.dumps(ordenadas, ensure_ascii=False, indent=2)}
}};
"""
    DESTINO.write_text(cabecalho, encoding="utf-8")

    print(f"{len(produtos)} produtos · {len(ordenadas)} famílias")
    print(f"{DESTINO.relative_to(RAIZ)} · {DESTINO.stat().st_size / 1024:.0f} KB")
    print("\nMaiores famílias:")
    for f in ordenadas[:12]:
        print(f"  {f['total']:3}  {f['nome']:22} {', '.join(f['especies'][:4])}")


if __name__ == "__main__":
    main()
