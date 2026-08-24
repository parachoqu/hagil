#!/usr/bin/env python3
from __future__ import annotations

import json
import re
import unicodedata
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PRODUCT_DIR = ROOT / "assets" / "images" / "produtos"
JS_FILE = ROOT / "js" / "produtos.js"

CATEGORY_SLUGS = {
    "Aves": "aves",
    "Bovinos": "bovinos",
    "Equinos": "equinos",
    "Ovinos": "ovinos",
    "Suínos": "suinos",
    "Pet": "pet",
    "Caprinos": "caprinos",
    "Bubalinos": "bubalinos",
    "Peixes": "peixes",
}


def slugify(value: str) -> str:
    value = unicodedata.normalize("NFKD", value)
    value = "".join(ch for ch in value if not unicodedata.combining(ch))
    value = value.lower()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-")


def parse_product(path: Path) -> dict[str, object]:
    stem = path.stem
    if not stem.startswith("Hagil_"):
        raise ValueError(f"Nome inesperado: {path.name}")
    parts = stem.removeprefix("Hagil_").split("_")
    if len(parts) == 2:
        category, name = parts
        segment = ""
    elif len(parts) == 3:
        category, segment, name = parts
    else:
        raise ValueError(f"Formato inesperado: {path.name}")
    if category not in CATEGORY_SLUGS:
        raise ValueError(f"Categoria desconhecida em {path.name}: {category}")

    category_slug = CATEGORY_SLUGS[category]
    line = segment or f"Linha {category}"
    scope = segment or category
    item_id = slugify(f"{category} {segment} {name}")
    photo = f"assets/images/produtos/{path.name}"

    return {
        "id": item_id,
        "nome": name,
        "linha": line,
        "foto": photo,
        "frase": f"{name} para {scope}.",
        "descricao": (
            f"Produto Hágil cadastrado na categoria {category}"
            + (f", segmento {segment}" if segment else "")
            + ". As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca."
        ),
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso.",
        ],
        "indicacoes": (
            f"Categoria: {category}"
            + (f" · Segmento: {segment}" if segment else "")
            + "."
        ),
        "categorias": [category_slug],
        "categoriaRotulo": category,
        "segmento": segment,
    }


def build_js(products: list[dict[str, object]]) -> str:
    data = json.dumps(products, ensure_ascii=False, indent=4)
    return f'''/* Hágil Terapêutica — catálogo de produtos gerado a partir das imagens finais. */

(function () {{
  "use strict";

  const CATEGORIAS = [
    ["todos", "Todos"],
    ["aves", "Aves"],
    ["bovinos", "Bovinos"],
    ["equinos", "Equinos"],
    ["ovinos", "Ovinos"],
    ["suinos", "Suínos"],
    ["pet", "Pet"],
    ["caprinos", "Caprinos"],
    ["bubalinos", "Bubalinos"],
    ["peixes", "Peixes"]
  ];
  const ROTULO = Object.fromEntries(CATEGORIAS);

  const PRODUTOS = {data};

  const AVISO_PADRAO = "Uso veterinário. Consulte o distribuidor Hágil ou o responsável técnico da sua região para confirmar indicações, modo de uso e material oficial atualizado.";

  const listaFiltros = document.getElementById("filtros-lista");
  const contagem = document.getElementById("filtros-contagem");
  const grid = document.getElementById("catalogo-grid");
  const modal = document.getElementById("modal-produto");
  const modalVisual = document.getElementById("modal-visual");
  const modalConteudo = document.getElementById("modal-conteudo");
  const modalSair = document.getElementById("modal-sair");
  const backdrop = modal.querySelector(".modal__backdrop");

  let filtroAtivo = "todos";
  let origemFoco = null;

  const setaSVG = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  function esc(valor) {{
    return String(valor).replace(/[&<>"']/g, function (ch) {{
      return {{
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }}[ch];
    }});
  }}

  function imagemHTML(p) {{
    return '<img src="' + esc(p.foto) + '" alt="Embalagem do ' + esc(p.nome) + '" loading="lazy">';
  }}

  function montaFiltros() {{
    listaFiltros.innerHTML = CATEGORIAS.map(function (par) {{
      const ativo = par[0] === filtroAtivo;
      return (
        '<button class="filtro" type="button" data-cat="' + par[0] +
        '" aria-pressed="' + ativo + '">' + par[1] + "</button>"
      );
    }}).join("");
  }}

  listaFiltros.addEventListener("click", function (e) {{
    const botao = e.target.closest(".filtro");
    if (!botao || botao.dataset.cat === filtroAtivo) return;
    filtroAtivo = botao.dataset.cat;
    listaFiltros.querySelectorAll(".filtro").forEach(function (b) {{
      b.setAttribute("aria-pressed", String(b.dataset.cat === filtroAtivo));
    }});
    montaGrid();
  }});

  function produtosFiltrados() {{
    if (filtroAtivo === "todos") return PRODUTOS;
    return PRODUTOS.filter(function (p) {{
      return p.categorias.indexOf(filtroAtivo) !== -1;
    }});
  }}

  function cardHTML(p, indice) {{
    const amplo = indice === 0;
    const atraso = Math.min(indice, 12);
    return (
      '<article class="card-prod' + (amplo ? " card-prod--amplo" : "") +
      ' entrando" style="--i:' + atraso + '" tabindex="0" role="button" ' +
      'aria-haspopup="dialog" data-id="' + esc(p.id) + '" ' +
      'aria-label="Ver detalhes de ' + esc(p.nome) + '">' +
      '<div class="card-prod__img">' + imagemHTML(p) + "</div>" +
      '<div class="card-prod__info">' +
      '<span class="card-prod__linha">' + esc(p.linha) + "</span>" +
      "<h3>" + esc(p.nome) + "</h3>" +
      (amplo ? '<span class="card-prod__frase">' + esc(p.frase) + "</span>" : "") +
      '<div class="card-prod__cats">' +
      p.categorias.map(function (c) {{ return "<span>" + ROTULO[c] + "</span>"; }}).join("") +
      "</div></div>" +
      '<span class="card-prod__mais" aria-hidden="true">' +
      '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>' +
      "</span></article>"
    );
  }}

  function montaGrid() {{
    const itens = produtosFiltrados();
    grid.innerHTML = itens.map(cardHTML).join("");
    const rotulo = filtroAtivo === "todos" ? "na linha completa" : "em " + ROTULO[filtroAtivo];
    contagem.textContent = itens.length + (itens.length === 1 ? " produto " : " produtos ") + rotulo;
  }}

  grid.addEventListener("click", function (e) {{
    const card = e.target.closest(".card-prod");
    if (card) abreModal(card.dataset.id, card);
  }});
  grid.addEventListener("keydown", function (e) {{
    if (e.key !== "Enter" && e.key !== " ") return;
    const card = e.target.closest(".card-prod");
    if (card) {{
      e.preventDefault();
      abreModal(card.dataset.id, card);
    }}
  }});

  function abreModal(id, origem) {{
    const p = PRODUTOS.find(function (item) {{ return item.id === id; }});
    if (!p) return;
    origemFoco = origem || null;

    modalVisual.innerHTML =
      imagemHTML(p) +
      '<span class="modal__frase">' + esc(p.frase) + "</span>";

    modalConteudo.innerHTML =
      '<p class="eyebrow"><span class="gota" aria-hidden="true"></span>' +
      esc(p.linha) + "</p>" +
      '<h2 id="modal-titulo">' + esc(p.nome) + "</h2>" +
      '<p class="modal__desc">' + esc(p.descricao) + "</p>" +
      '<div class="bula"><h3>Informações</h3><ul>' +
      p.informacoes.map(function (b) {{
        return '<li><span class="gota" aria-hidden="true"></span>' + esc(b) + "</li>";
      }}).join("") +
      "</ul></div>" +
      '<div class="bula"><h3>Categoria</h3><p>' + esc(p.indicacoes) + "</p>" +
      '<div class="bula__especies">' +
      p.categorias.map(function (c) {{ return "<span>" + ROTULO[c] + "</span>"; }}).join("") +
      "</div></div>" +
      '<div class="bula"><h3>Orientação técnica</h3>' +
      '<p class="bula__aviso">' + AVISO_PADRAO + "</p></div>" +
      '<div class="modal__acoes">' +
      '<a class="btn btn--primario" href="index.html#contato">Localizar distribuidor ' + setaSVG + "</a>" +
      "</div>";

    modal.hidden = false;
    requestAnimationFrame(function () {{
      modal.classList.add("aberto");
    }});
    document.body.classList.add("modal-travado");
    modalSair.focus();
    document.addEventListener("keydown", teclasModal);
  }}

  function fechaModal() {{
    modal.classList.remove("aberto");
    document.body.classList.remove("modal-travado");
    document.removeEventListener("keydown", teclasModal);
    window.setTimeout(function () {{
      modal.hidden = true;
      if (origemFoco) origemFoco.focus();
    }}, 360);
  }}

  function teclasModal(e) {{
    if (e.key === "Escape") {{
      fechaModal();
      return;
    }}
    if (e.key !== "Tab") return;
    const focaveis = modal.querySelectorAll(
      'button:not([tabindex="-1"]), a[href], [tabindex="0"]'
    );
    if (!focaveis.length) return;
    const primeiro = focaveis[0];
    const ultimo = focaveis[focaveis.length - 1];
    if (e.shiftKey && document.activeElement === primeiro) {{
      e.preventDefault();
      ultimo.focus();
    }} else if (!e.shiftKey && document.activeElement === ultimo) {{
      e.preventDefault();
      primeiro.focus();
    }}
  }}

  modalSair.addEventListener("click", fechaModal);
  backdrop.addEventListener("click", fechaModal);

  montaFiltros();
  montaGrid();
}})();
'''


def main() -> int:
    pngs = sorted(PRODUCT_DIR.glob("Hagil_*.png"))
    if len(pngs) != 167:
        raise RuntimeError(f"Esperados 167 PNGs publicaveis, encontrados {len(pngs)}")

    products = [parse_product(path) for path in pngs]
    JS_FILE.write_text(build_js(products), encoding="utf-8")
    print(f"Catalogo gerado com {len(products)} produtos em {JS_FILE.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
