/* Hágil Terapêutica — página de detalhe do produto.

   Lê ?id=<slug> e monta a página a partir de js/catalogo.js.

   Regra que governa esta página: o design não inventa informação
   veterinária. Espécie, fase e linha vêm da estrutura oficial e são
   exibidas. Benefício, indicações, composição, modo de uso e registro
   ficam marcados como pendentes até o responsável técnico preenchê-los
   em scripts/gerar_catalogo.py — nunca preenchidos aqui.
*/

(function () {
  "use strict";

  const dados = window.HAGIL_CATALOGO;
  const raiz = document.getElementById("produto-raiz");
  if (!dados || !raiz) return;

  const PRODUTOS = dados.produtos;

  const esc = (valor) =>
    String(valor == null ? "" : valor).replace(/[&<>"']/g, (ch) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[ch]));

  const setaSVG =
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  const alertaSVG =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/></svg>';

  const produto = (() => {
    const rawId = new URLSearchParams(window.location.search).get("id") || "";
    const id = rawId.toLowerCase().trim();
    if (!id) return PRODUTOS[0] || null;
    return (
      PRODUTOS.find((p) => p.id === rawId || p.id === id) ||
      PRODUTOS.find((p) => id.includes(p.id) || p.id.includes(id) || (p.busca && p.busca.includes(id))) ||
      null
    );
  })();

  if (!produto) {
    raiz.innerHTML =
      '<section class="secao"><div class="container catalogo__vazio">' +
      "<strong>Produto não encontrado.</strong>" +
      "<span>O endereço pode estar incompleto ou o produto saiu do catálogo.</span>" +
      '<a class="btn btn--primario" href="produtos.html">Ver o catálogo ' + setaSVG + "</a>" +
      "</div></section>";
    document.title = "Produto não encontrado | Hágil Terapêutica";
    return;
  }

  document.title = produto.nome + " | Hágil Terapêutica";

  const irmaos = PRODUTOS.filter((p) => p.especie === produto.especie && p.id !== produto.id).slice(0, 5);

  /* Bloco de ficha: mostra o conteúdo quando validado, ou o aviso de
     pendência — nunca um texto de preenchimento. */
  function blocoFicha(titulo, valor, oQueFalta) {
    return (
      '<section class="ficha__bloco">' +
      "<h2>" + esc(titulo) + "</h2>" +
      (valor
        ? "<p>" + esc(valor) + "</p>"
        : '<p class="pendente">' + alertaSVG +
          "<span>" + esc(oQueFalta) + "</span></p>") +
      "</section>"
    );
  }

  const taxonomia = [
    produto.categoriaRotulo,
    produto.segmentos && produto.segmentos.length ? produto.segmentos.join(", ") : produto.segmento,
    produto.familia
  ]
    .filter(Boolean)
    .map((t) => "<li>" + esc(t) + "</li>")
    .join("");

  raiz.innerHTML =
    /* ---------- Hero com a atmosfera da espécie ---------- */
    '<section class="produto-hero" data-tema="' + esc(produto.especie) + '">' +
    '<picture class="produto-hero__media">' +
    '<img src="assets/images/campo/especies/' + esc(produto.especie) + '-4x5.webp" alt="" ' +
    'width="1080" height="1350" fetchpriority="high">' +
    "</picture>" +
    '<div class="produto-hero__veu" aria-hidden="true"></div>' +
    '<div class="container produto-hero__inner">' +

    '<div class="produto-hero__texto">' +
    '<ol class="produto__migalhas">' +
    '<li><a href="produtos.html">Catálogo</a></li>' +
    '<li aria-hidden="true">/</li>' +
    '<li><a href="produtos.html?especie=' + esc(produto.especie) + '">' +
    esc(produto.categoriaRotulo) + "</a></li>" +
    '<li aria-hidden="true">/</li>' +
    '<li>' + esc(produto.nome) + "</li>" +
    "</ol>" +
    "<h1>" + esc(produto.nome) + "</h1>" +
    (produto.beneficio
      ? '<p class="campaign__apoio">' + esc(produto.beneficio) + "</p>"
      : "") +
    '<ul class="produto__taxonomia">' + taxonomia + "</ul>" +
    '<a class="btn btn--luz" href="index.html#distribuidores">Falar com um distribuidor ' +
    setaSVG + "</a>" +
    "</div>" +

    '<div class="produto-hero__palco">' +
    '<span class="campaign__ground" aria-hidden="true"></span>' +
    '<img class="produto__packshot' + (produto.largo ? " produto__packshot--largo" : "") +
    '" src="' + esc(produto.imagem) + '" alt="Embalagem do ' + esc(produto.nome) + '" ' +
    'width="' + (produto.largura || 900) + '" height="' + (produto.altura || 1100) + '" ' +
    'fetchpriority="high">' +
    "</div>" +

    "</div></section>" +

    /* ---------- Ficha técnica ---------- */
    '<section class="produto-corpo"><div class="container produto-corpo__grid">' +

    '<div class="ficha">' +
    blocoFicha("Benefício principal", produto.beneficio,
      "O benefício deste produto ainda não foi validado pelo responsável técnico da Hágil.") +
    blocoFicha("Indicações", produto.indicacoesTecnicas,
      "As indicações precisam ser confirmadas no material oficial antes de publicadas.") +
    blocoFicha("Composição", produto.composicao,
      "A composição será publicada conforme a bula oficial do produto.") +
    blocoFicha("Modo de uso", produto.modoUso,
      "A posologia e o modo de uso dependem da orientação do responsável técnico.") +
    blocoFicha("Registro", produto.registroMapa,
      "O número de registro no MAPA será informado a partir do material oficial.") +
    '<p class="produto__aviso">Uso veterinário. Este é um estudo conceitual de interface: ' +
    "as informações técnicas deste produto seguem o material oficial da Hágil Terapêutica. " +
    "Consulte o distribuidor ou o responsável técnico da sua região antes de qualquer uso.</p>" +
    "</div>" +

    /* ---------- Lateral: ação, família e credenciais ---------- */
    '<aside class="produto-lateral">' +

    '<div class="produto-cta">' +
    '<h2>Onde encontrar</h2>' +
    "<p>A rede Hágil está nas cinco regiões do Brasil e presta assistência técnica " +
    "conforme a necessidade da propriedade.</p>" +
    '<a class="btn btn--luz" href="index.html#distribuidores">Encontrar distribuidor ' +
    setaSVG + "</a>" +
    "</div>" +

    (irmaos.length > 0
      ? '<nav class="produto-familia" aria-label="Outros produtos">' +
        "<h2>Outros produtos para " + esc(produto.categoriaRotulo) + "</h2>" +
        "<ul>" +
        irmaos.map((p) =>
          "<li><a href=\"produto.html?id=" + encodeURIComponent(p.id) + "\">" +
          esc(p.nome) + "<span>" + esc(p.categoriaRotulo || "") + "</span></a></li>"
        ).join("") +
        "</ul></nav>"
      : "") +

    '<div class="produto__certs">' +
    '<img src="assets/images/certificacoes/iso-9001-14001.png" alt="Selo ISO 9001 e ISO 14001" ' +
    'width="1026" height="891" loading="lazy" decoding="async">' +
    '<img src="assets/images/certificacoes/ibd.jpeg" alt="Selo IBD, insumo aprovado" ' +
    'width="1043" height="1043" loading="lazy" decoding="async">' +
    "<span>ISO 9001 · ISO 14001 · IBD · Reg. MAPA</span>" +
    "</div>" +

    "</aside></div></section>";
})();
