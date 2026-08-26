/* Hágil Terapêutica — catálogo Campo Vivo.

   O acervo é grande (167 produtos). A experiência resolve isso em três
   decisões, na ordem que o sistema define:
   espécie > necessidade/fase > produto.

   Os dados vêm de js/catalogo.js, gerado por scripts/gerar_catalogo.py.
*/

(function () {
  "use strict";

  const dados = window.HAGIL_CATALOGO;
  if (!dados) return;

  const PRODUTOS = dados.produtos;
  const FAMILIAS = dados.familias;
  const POR_PAGINA = 24;

  const ESPECIES = [
    ["todos", "Todos"],
    ["bovinos", "Bovinos"],
    ["pet", "Pet"],
    ["caprinos", "Caprinos"],
    ["bubalinos", "Bubalinos"],
    ["equinos", "Equinos"],
    ["ovinos", "Ovinos"],
    ["aves", "Aves"],
    ["suinos", "Suínos"],
    ["peixes", "Peixes"]
  ];

  const grid = document.getElementById("catalogo-grid");
  const listaEspecies = document.getElementById("filtros-especies");
  const listaSegmentos = document.getElementById("filtros-segmentos");
  const listaFamilias = document.getElementById("filtros-familias");
  const contagem = document.getElementById("filtros-contagem");
  const campoBusca = document.getElementById("catalogo-busca");
  const limparBusca = document.getElementById("catalogo-busca-limpar");
  const vazio = document.getElementById("catalogo-vazio");
  const limparTudo = document.getElementById("catalogo-limpar");
  const destaques = document.getElementById("catalogo-destaques");
  const sentinela = document.getElementById("catalogo-sentinela");

  if (!grid) return;

  const estado = { especie: "todos", segmento: "", familia: "", busca: "", visiveis: POR_PAGINA };
  let resultados = PRODUTOS;

  /* ---------- Utilidades ---------- */

  const esc = (valor) =>
    String(valor == null ? "" : valor).replace(/[&<>"']/g, (ch) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[ch]));

  // Mesmo padrão do diretório de distribuidores: NFD separa os acentos
  // e o range de combining marks os remove, para que "suinos" encontre
  // "Suínos".
  const normaliza = (texto) =>
    String(texto || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

  const setaSVG =
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  /* ---------- Filtragem ---------- */

  function filtra() {
    const termo = normaliza(estado.busca);
    return PRODUTOS.filter((p) => {
      if (estado.especie !== "todos") {
        const espMatch =
          (p.especies && p.especies.includes(estado.especie)) ||
          (p.categorias && p.categorias.includes(estado.especie)) ||
          p.especie === estado.especie;
        if (!espMatch) return false;
      }
      if (estado.segmento) {
        const segMatch =
          (p.segmentos && p.segmentos.some((s) => normaliza(s).includes(normaliza(estado.segmento)))) ||
          (p.segmentoSlugs && p.segmentoSlugs.includes(estado.segmento)) ||
          p.segmentoSlug === estado.segmento;
        if (!segMatch) return false;
      }
      if (termo && p.busca.indexOf(termo) === -1) return false;
      return true;
    });
  }

  // Segmentos só existem para bovinos e aves; a faixa some nas demais
  // espécies em vez de mostrar um filtro vazio.
  function segmentosDisponiveis() {
    const vistos = new Map();
    PRODUTOS.forEach((p) => {
      const matchEsp = estado.especie === "todos" ||
        (p.especies && p.especies.includes(estado.especie)) ||
        p.especie === estado.especie;
      if (!matchEsp) return;
      if (p.segmentos && p.segmentos.length) {
        p.segmentos.forEach((seg, idx) => {
          const sSlug = p.segmentoSlugs ? p.segmentoSlugs[idx] : normaliza(seg).replace(/\s+/g, '-');
          vistos.set(sSlug, seg);
        });
      } else if (p.segmento) {
        vistos.set(p.segmentoSlug, p.segmento);
      }
    });
    return [...vistos.entries()];
  }

  function familiasDisponiveis() {
    return [];
  }

  /* ---------- Render dos filtros ---------- */

  function montaEspecies() {
    listaEspecies.innerHTML = ESPECIES.map(([valor, rotulo]) => {
      const ativo = valor === estado.especie;
      const n = valor === "todos"
        ? PRODUTOS.length
        : PRODUTOS.filter((p) =>
            (p.especies && p.especies.includes(valor)) ||
            (p.categorias && p.categorias.includes(valor)) ||
            p.especie === valor
          ).length;
      return (
        '<button class="filtro" type="button" data-especie="' + valor + '"' +
        ' data-tema="' + valor + '" aria-pressed="' + ativo + '">' +
        esc(rotulo) + '<span class="filtro__n">' + n + "</span></button>"
      );
    }).join("");
  }

  function montaSegmentos() {
    const itens = segmentosDisponiveis();
    listaSegmentos.hidden = itens.length === 0;
    if (!itens.length) {
      estado.segmento = "";
      listaSegmentos.innerHTML = "";
      return;
    }
    listaSegmentos.innerHTML =
      '<span class="filtros__rotulo">Fase</span>' +
      '<button class="filtro filtro--fino" type="button" data-segmento=""' +
      ' aria-pressed="' + (estado.segmento === "") + '">Todas</button>' +
      itens.map(([valor, rotulo]) =>
        '<button class="filtro filtro--fino" type="button" data-segmento="' + esc(valor) + '"' +
        ' aria-pressed="' + (estado.segmento === valor) + '">' + esc(rotulo) + "</button>"
      ).join("");
  }

  function montaFamilias() {
    if (!listaFamilias) return;
    listaFamilias.innerHTML = "";
  }

  /* ---------- Render da grade ---------- */

  function cardHTML(p) {
    const largura = p.cardLargura || 460;
    const altura = p.cardAltura || 460;
    return (
      '<li class="card-prod" data-tema="' + esc(p.especie) + '">' +
      '<a href="produto.html?id=' + encodeURIComponent(p.id) + '">' +
      '<span class="card-prod__img' + (p.largo ? " card-prod__img--largo" : "") + '">' +
      '<img src="' + esc(p.imagemCard) + '" alt="Embalagem do ' + esc(p.nome) + '"' +
      ' width="' + largura + '" height="' + altura + '" loading="lazy" decoding="async">' +
      "</span>" +
      '<span class="card-prod__corpo">' +
      "<strong>" + esc(p.nome) + "</strong>" +
      '<span class="card-prod__cats">' + esc(p.categoriaRotulo || "") + "</span>" +
      "</span></a></li>"
    );
  }

  function montaGrid(preservaScroll) {
    const total = resultados.length;
    const fatia = resultados.slice(0, estado.visiveis);

    grid.innerHTML = fatia.map(cardHTML).join("");
    vazio.hidden = total !== 0;
    grid.hidden = total === 0;

    if (total === 0) {
      vazio.innerHTML =
        "<strong>Nenhum produto encontrado.</strong>" +
        "<span>" + sugestao() + "</span>" +
        '<button class="btn btn--fantasma" type="button" id="catalogo-vazio-limpar">' +
        "Limpar filtros</button>";
      const botao = document.getElementById("catalogo-vazio-limpar");
      if (botao) botao.addEventListener("click", limparFiltros);
    }

    const rotulo = total === 1 ? " produto" : " produtos";
    contagem.textContent =
      total === 0 ? "Nenhum resultado"
        : (estado.visiveis < total ? "Mostrando " + fatia.length + " de " + total + rotulo
          : total + rotulo);

    if (sentinela) sentinela.hidden = estado.visiveis >= total;
    if (limparTudo) limparTudo.hidden = !temFiltro();
    if (!preservaScroll) atualizaUrl();
  }

  // Estado vazio útil: aponta qual filtro está restringindo demais.
  function sugestao() {
    if (estado.busca && (estado.especie !== "todos" || estado.familia)) {
      return "Tente buscar sem os filtros de espécie e linha.";
    }
    if (estado.busca) return "Verifique a grafia ou busque pelo nome da linha, como Dynamis ou Curae.";
    if (estado.familia && estado.especie !== "todos") {
      return "Essa linha não atende à espécie selecionada.";
    }
    return "Ajuste os filtros para ver mais resultados.";
  }

  function temFiltro() {
    return estado.especie !== "todos" || estado.segmento || estado.familia || estado.busca;
  }

  /* ---------- Destaques editoriais ----------
     Descoberta antes do acervo: três linhas com presença, no topo,
     antes da grade completa. */
  function montaDestaques() {
    if (!destaques) return;
    const mostrar = !temFiltro();
    destaques.hidden = !mostrar;
    if (!mostrar || destaques.dataset.pronto) return;

    destaques.innerHTML = FAMILIAS.slice(0, 3).map((f, i) =>
      '<a class="destaque-linha" href="?familia=' + encodeURIComponent(f.slug) + '" style="--i:' + i + '">' +
      '<span class="destaque-linha__img"><img src="' + esc(f.capa) + '" alt="" ' +
      'width="346" height="460" loading="lazy" decoding="async"></span>' +
      '<span class="destaque-linha__corpo">' +
      '<span class="eyebrow">Linha ' + esc(f.nome) + "</span>" +
      "<strong>" + esc(f.total) + " apresentações</strong>" +
      "<span>" + esc(f.especies.join(" · ")) + "</span>" +
      '<span class="destaque__link">Ver a linha ' + setaSVG + "</span>" +
      "</span></a>"
    ).join("");
    destaques.dataset.pronto = "1";
  }

  /* ---------- URL compartilhável ---------- */

  function atualizaUrl() {
    const params = new URLSearchParams();
    if (estado.especie !== "todos") params.set("especie", estado.especie);
    if (estado.segmento) params.set("segmento", estado.segmento);
    if (estado.familia) params.set("familia", estado.familia);
    if (estado.busca) params.set("q", estado.busca);
    const query = params.toString();
    const url = window.location.pathname + (query ? "?" + query : "");
    window.history.replaceState(null, "", url);
  }

  function leUrl() {
    const params = new URLSearchParams(window.location.search);
    const especie = params.get("especie") || "todos";
    estado.especie = ESPECIES.some(([v]) => v === especie) ? especie : "todos";
    estado.segmento = params.get("segmento") || "";
    estado.familia = params.get("familia") || "";
    estado.busca = params.get("q") || "";
    if (campoBusca) campoBusca.value = estado.busca;
  }

  /* ---------- Ações ---------- */

  function aplica(preservaScroll) {
    estado.visiveis = POR_PAGINA;
    resultados = filtra();
    montaEspecies();
    montaSegmentos();
    montaFamilias();
    montaDestaques();
    montaGrid(preservaScroll);
  }

  function limparFiltros() {
    estado.especie = "todos";
    estado.segmento = "";
    estado.familia = "";
    estado.busca = "";
    if (campoBusca) campoBusca.value = "";
    if (limparBusca) limparBusca.hidden = true;
    aplica();
  }

  listaEspecies.addEventListener("click", (e) => {
    const botao = e.target.closest("[data-especie]");
    if (!botao || botao.dataset.especie === estado.especie) return;
    estado.especie = botao.dataset.especie;
    estado.segmento = "";
    aplica();
  });

  listaSegmentos.addEventListener("click", (e) => {
    const botao = e.target.closest("[data-segmento]");
    if (!botao) return;
    const valor = botao.dataset.segmento;
    if (valor === estado.segmento) return;
    estado.segmento = valor;
    aplica();
  });

  if (listaFamilias) {
    listaFamilias.addEventListener("click", (e) => {
      const botao = e.target.closest("[data-familia]");
      if (!botao) return;
      const valor = botao.dataset.familia;
      if (valor === estado.familia) return;
      estado.familia = valor;
      aplica();
    });
  }

  if (campoBusca) {
    let timer = 0;
    campoBusca.addEventListener("input", () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        estado.busca = campoBusca.value.trim();
        if (limparBusca) limparBusca.hidden = !estado.busca;
        aplica();
      }, 160);
    });
  }

  if (limparBusca) {
    limparBusca.addEventListener("click", () => {
      estado.busca = "";
      campoBusca.value = "";
      limparBusca.hidden = true;
      campoBusca.focus();
      aplica();
    });
  }

  if (limparTudo) limparTudo.addEventListener("click", limparFiltros);

  /* ---------- Carregamento progressivo ----------
     Nunca as 167 imagens de uma vez. */
  if (sentinela && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;
        if (estado.visiveis >= resultados.length) return;
        estado.visiveis += POR_PAGINA;
        montaGrid(true);
      });
    }, { rootMargin: "600px 0px" });
    io.observe(sentinela);
  }

  // Botão de reserva quando o observer não está disponível.
  const maisBotao = document.getElementById("catalogo-mais");
  if (maisBotao) {
    maisBotao.addEventListener("click", () => {
      estado.visiveis += POR_PAGINA;
      montaGrid(true);
    });
  }

  window.addEventListener("popstate", () => {
    leUrl();
    aplica(true);
  });

  leUrl();
  aplica(true);
})();
