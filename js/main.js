/* Hágil Terapêutica - redesign conceitual
   Comportamentos comuns: header, menu, reveals e mapa de distribuição. */

(function () {
  "use strict";

  /* ---------- Header: estado ao rolar ---------- */
  const header = document.querySelector(".site-header");
  const aoRolar = () => header.classList.toggle("rolou", window.scrollY > 24);
  aoRolar();
  window.addEventListener("scroll", aoRolar, { passive: true });

  /* ---------- Menu mobile ---------- */
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const aberto = nav.classList.toggle("aberto");
      toggle.setAttribute("aria-expanded", String(aberto));
    });
    nav.addEventListener("click", (e) => {
      if (e.target.closest("a")) {
        nav.classList.remove("aberto");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Reveals no scroll ---------- */
  const revelaveis = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revelaveis.length) {
    const io = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("visivel");
            io.unobserve(entrada.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -6% 0px" }
    );
    revelaveis.forEach((el) => io.observe(el));
  } else {
    revelaveis.forEach((el) => el.classList.add("visivel"));
  }

  /* ---------- Carrossel de campanhas ----------
     Aprimoramento progressivo: sem este script a trilha continua
     sendo um empilhamento vertical com os três banners visíveis e os
     controles ocultos. Aqui ela vira um scroller com snap horizontal
     — o gesto de arrastar é nativo do navegador, então a rolagem
     vertical da página nunca é interceptada.

     Sem autoplay, sem loop, sem mexer em foco, URL ou histórico. */
  const campanhas = document.querySelector("[data-carrossel-raiz]");
  const trilha = campanhas && campanhas.querySelector("[data-carrossel-trilha]");
  const banners = trilha
    ? Array.from(trilha.querySelectorAll("[data-carrossel-banner]"))
    : [];

  if (trilha && banners.length > 1) {
    const barra = campanhas.querySelector("[data-carrossel-controles]");
    const anterior = campanhas.querySelector('[data-carrossel-ir="anterior"]');
    const seguinte = campanhas.querySelector('[data-carrossel-ir="seguinte"]');
    const marcas = Array.from(campanhas.querySelectorAll("[data-carrossel-para]"));
    const indice = campanhas.querySelector(".campanhas__posicao-indice");
    const nome = campanhas.querySelector(".campanhas__posicao-nome");
    const anuncio = campanhas.querySelector("[data-carrossel-anuncio]");
    const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Nome de cada campanha: vem do aria-label ("Campanha 1 de 3: Nome"),
    // sem duplicar o texto em nenhum outro lugar.
    const nomes = banners.map((banner) => {
      const rotulo = banner.getAttribute("aria-label") || "";
      return rotulo.slice(rotulo.indexOf(":") + 1).trim() || rotulo;
    });

    const total = banners.length;
    const doisDigitos = (n) => String(n).padStart(2, "0");
    let atual = 0;
    let pendente = 0;

    campanhas.dataset.modo = "carrossel";
    barra.hidden = false;
    trilha.tabIndex = 0;

    const indisponivel = (botao, off) => {
      botao.setAttribute("aria-disabled", String(off));
      botao.classList.toggle("indisponivel", off);
    };

    const sincroniza = (anunciar) => {
      banners.forEach((banner, i) => {
        // `inert` tira o banner fora de vista da tabulação e da árvore
        // de acessibilidade. `aria-hidden` seria errado: há links dentro.
        banner.inert = i !== atual;
      });
      marcas.forEach((marca, i) => {
        if (i === atual) marca.setAttribute("aria-current", "true");
        else marca.removeAttribute("aria-current");
      });
      // `aria-disabled` em vez de `disabled`: desabilitar o botão que
      // está com o foco faria o navegador jogar o foco no body — e a
      // troca de banner não pode mexer no foco de ninguém.
      indisponivel(anterior, atual === 0);
      indisponivel(seguinte, atual === total - 1);
      if (indice) indice.textContent = doisDigitos(atual + 1);
      if (nome) nome.textContent = nomes[atual];
      if (anunciar && anuncio) {
        anuncio.textContent = `Campanha ${atual + 1} de ${total}: ${nomes[atual]}`;
      }
    };

    const vaPara = (alvo, anunciar) => {
      const destino = Math.min(Math.max(alvo, 0), total - 1);
      trilha.scrollTo({
        left: destino * trilha.clientWidth,
        behavior: semMovimento.matches ? "auto" : "smooth"
      });
      if (destino !== atual) {
        atual = destino;
        sincroniza(anunciar);
      }
    };

    // O scroll é a fonte da verdade: cobre setas, teclado e gesto touch.
    trilha.addEventListener("scroll", () => {
      if (pendente) return;
      pendente = window.requestAnimationFrame(() => {
        pendente = 0;
        const visto = Math.round(trilha.scrollLeft / trilha.clientWidth);
        if (visto !== atual && visto >= 0 && visto < total) {
          atual = visto;
          sincroniza(true);
        }
      });
    }, { passive: true });

    anterior.addEventListener("click", () => vaPara(atual - 1, true));
    seguinte.addEventListener("click", () => vaPara(atual + 1, true));
    marcas.forEach((marca, i) => {
      marca.addEventListener("click", () => vaPara(i, true));
    });

    campanhas.addEventListener("keydown", (evento) => {
      if (evento.altKey || evento.ctrlKey || evento.metaKey) return;
      const alvo = evento.target;
      if (alvo.closest("input, textarea, select")) return;
      const teclas = { ArrowLeft: atual - 1, ArrowRight: atual + 1, Home: 0, End: total - 1 };
      if (!(evento.key in teclas)) return;
      evento.preventDefault();
      vaPara(teclas[evento.key], true);
    });

    // Ao redimensionar, o scrollLeft desalinha do novo clientWidth.
    let redimensionando = 0;
    window.addEventListener("resize", () => {
      window.clearTimeout(redimensionando);
      redimensionando = window.setTimeout(() => {
        trilha.scrollTo({ left: atual * trilha.clientWidth, behavior: "auto" });
      }, 150);
    }, { passive: true });

    sincroniza(false);
  }

  /* ---------- Diretório estático e mapa de distribuidores ---------- */
  const svgMapa = document.getElementById("mapa-brasil");
  const listaDist = document.getElementById("dist-lista");
  const contagemDist = document.getElementById("dist-contagem");
  const vazioDist = document.getElementById("dist-vazio");
  const modalDist = document.getElementById("modal-distribuidores");
  const abrirModalDist = document.getElementById("abrir-modal-distribuidores");
  const fecharModalDist = document.getElementById("fechar-modal-distribuidores");
  const distBuscaInput = document.getElementById("dist-busca-input");
  const distBuscaLimpar = document.getElementById("dist-busca-limpar");
  const dadosDist = window.HAGIL_DISTRIBUIDORES;

  if (svgMapa && listaDist && contagemDist && modalDist && abrirModalDist && fecharModalDist && dadosDist) {
    const ns = "http://www.w3.org/2000/svg";
    const coords = {
      AC: [-9.974, -67.81], AL: [-9.665, -35.735], AP: [0.035, -51.07],
      AM: [-3.119, -60.02], BA: [-12.971, -38.501], CE: [-3.732, -38.527],
      DF: [-15.794, -47.883], ES: [-20.315, -40.312], GO: [-16.686, -49.264],
      MA: [-2.53, -44.302], MT: [-15.601, -56.097], MS: [-20.469, -54.62],
      MG: [-19.916, -43.934], PA: [-1.455, -48.49], PB: [-7.119, -34.845],
      PR: [-25.429, -49.271], PE: [-8.047, -34.877], PI: [-5.091, -42.803],
      RJ: [-22.907, -43.173], RN: [-5.795, -35.209], RS: [-30.034, -51.217],
      RO: [-8.761, -63.9], RR: [2.823, -60.675], SC: [-27.595, -48.548],
      SP: [-23.55, -46.633], SE: [-10.947, -37.073], TO: [-10.184, -48.333]
    };
    const projecao = { minLon: -73.9833, maxLat: 5.2718, escala: 9.739693866, x: 33.196475256, y: 18 };
    const ordemRegioes = ["Norte", "Nordeste", "Centro-Oeste", "Sudeste", "Sul"];
    const escapa = (valor) => String(valor || "")
      .replaceAll("&", "&amp;").replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;").replaceAll('"', "&quot;");
    const normaliza = (str) =>
      String(str || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();

    let segmentoAtivo = "todos";
    let termoBusca = "";
    let selecionado = "";
    let origemModal = null;

    const pontoProjetado = (uf, indice, total) => {
      const [lat, lon] = coords[uf] || [-15.8, -47.9];
      const baseX = projecao.x + (lon - projecao.minLon) * projecao.escala;
      const baseY = projecao.y + (projecao.maxLat - lat) * projecao.escala;
      if (total === 1) return [baseX, baseY];
      const anel = Math.floor(indice / 8) + 1;
      const posicao = indice % 8;
      const raio = 5.2 * anel;
      const angulo = (Math.PI * 2 * posicao / Math.min(8, total)) - Math.PI / 2;
      return [baseX + Math.cos(angulo) * raio, baseY + Math.sin(angulo) * raio];
    };

    const destaca = (id, rolar) => {
      selecionado = id;
      document.querySelectorAll(".dist-marker, .dist-card").forEach((el) => {
        el.classList.toggle("selecionado", el.dataset.id === id);
        if (el.classList.contains("dist-marker")) {
          if (el.dataset.id === id) el.setAttribute("aria-current", "true");
          else el.removeAttribute("aria-current");
        }
      });
      const ficha = document.getElementById("dist-" + id);
      if (ficha && rolar) {
        ficha.scrollIntoView({ behavior: "smooth", block: "center" });
        const titulo = ficha.querySelector("h5");
        if (titulo) {
          titulo.tabIndex = -1;
          titulo.focus({ preventScroll: true });
        }
      }
    };

    const renderizaMapa = (itens) => {
      svgMapa.querySelectorAll(".brasil-base, .dist-marker").forEach((el) => el.remove());
      const brasil = document.createElementNS(ns, "path");
      brasil.setAttribute("class", "brasil-base");
      brasil.setAttribute("d", dadosDist.brasilPath);
      svgMapa.insertBefore(brasil, svgMapa.firstElementChild?.nextSibling || null);

      const porUf = itens.reduce((grupos, item) => {
        (grupos[item.uf] ||= []).push(item);
        return grupos;
      }, {});
      Object.values(porUf).forEach((grupo) => {
        grupo.forEach((item, indice) => {
          const [cx, cy] = pontoProjetado(item.uf, indice, grupo.length);
          const link = document.createElementNS(ns, "a");
          link.setAttribute("href", "#dist-" + item.id);
          link.setAttribute("class", "dist-marker dist-marker--" + item.segmento);
          link.setAttribute("data-id", item.id);
          link.setAttribute("aria-label", `${item.nome}, ${item.cidade}/${item.uf}`);
          const titulo = document.createElementNS(ns, "title");
          titulo.textContent = `${item.nome} - ${item.cidade}/${item.uf}`;
          const alvo = document.createElementNS(ns, "circle");
          alvo.setAttribute("class", "dist-marker__alvo");
          // r=31 no viewBox rende ~44px de alvo na renderização real,
          // o mínimo de toque que o sistema exige.
          alvo.setAttribute("cx", cx); alvo.setAttribute("cy", cy); alvo.setAttribute("r", 31);
          const halo = document.createElementNS(ns, "circle");
          halo.setAttribute("class", "dist-marker__halo");
          halo.setAttribute("cx", cx); halo.setAttribute("cy", cy); halo.setAttribute("r", 5.4);
          const ponto = document.createElementNS(ns, "circle");
          ponto.setAttribute("class", "dist-marker__ponto");
          ponto.setAttribute("cx", cx); ponto.setAttribute("cy", cy); ponto.setAttribute("r", 2.5);
          link.append(titulo, alvo, halo, ponto);
          link.addEventListener("click", (evento) => {
            evento.preventDefault();
            abreDiretorio(item.id, link);
          });
          svgMapa.appendChild(link);
        });
      });
    };

    const contatos = (item) => {
      const links = [];
      if (item.telefone) {
        const numero = item.telefone.split("/")[0].replace(/\D/g, "");
        links.push(`<a href="tel:+55${numero}">${escapa(item.telefone)}</a>`);
      }
      if (item.email) links.push(`<a href="mailto:${escapa(item.email)}">${escapa(item.email)}</a>`);
      if (item.href) links.push(`<a href="${escapa(item.href)}" target="_blank" rel="noopener">Abrir contato ou ficha</a>`);
      return links.join("");
    };

    const renderizaLista = (itens) => {
      listaDist.innerHTML = ordemRegioes.map((regiao) => {
        const regionais = itens.filter((item) => item.regiao === regiao);
        if (!regionais.length) return "";
        const fichas = regionais.map((item) => {
          const cobertura = item.segmento === "grandes" && item.cobertura > 1
            ? ` • cobertura cadastrada em ${item.cobertura} municípios${item.ufs?.length ? ` (${item.ufs.join(", ")})` : ""}` : "";
          return `<article class="dist-card${selecionado === item.id ? " selecionado" : ""}" id="dist-${escapa(item.id)}" data-id="${escapa(item.id)}">
            <span class="dist-card__segmento">${item.segmento === "pet" ? "Pet" : "Grandes animais"}</span>
            <h5>${escapa(item.nome)}</h5>
            <p class="dist-card__local">${escapa(item.cidade)}/${escapa(item.uf)}${escapa(cobertura)}</p>
            <div class="dist-card__contatos">${contatos(item)}</div>
          </article>`;
        }).join("");
        return `<section class="dist-regiao" aria-labelledby="regiao-${regiao.toLowerCase().replace(/[^a-z]/g, "-")}">
          <h4 id="regiao-${regiao.toLowerCase().replace(/[^a-z]/g, "-")}">${regiao} • ${regionais.length}</h4>
          <div class="dist-regiao__grid">${fichas}</div>
        </section>`;
      }).join("");
      vazioDist.hidden = itens.length > 0;
      if (itens.length === 0) {
        vazioDist.textContent = termoBusca
          ? `Nenhum distribuidor encontrado para "${termoBusca}".`
          : "Nenhum distribuidor encontrado para este segmento.";
      }
      const sufixoBusca = termoBusca ? ` para "${termoBusca}"` : "";
      contagemDist.textContent = `${itens.length} ${itens.length === 1 ? "distribuidor encontrado" : "distribuidores encontrados"}${sufixoBusca}`;
      listaDist.querySelectorAll(".dist-card").forEach((ficha) => {
        ficha.addEventListener("click", () => destaca(ficha.dataset.id, false));
      });
    };

    const itensAtivos = () => {
      let base = segmentoAtivo === "todos"
        ? dadosDist.items
        : dadosDist.items.filter((item) => item.segmento === segmentoAtivo);

      if (termoBusca) {
        const termo = normaliza(termoBusca);
        const termoDigitos = termoBusca.replace(/\D/g, "");
        base = base.filter((item) => {
          const nome = normaliza(item.nome);
          const cidade = normaliza(item.cidade);
          const uf = normaliza(item.uf);
          const regiao = normaliza(item.regiao);
          const ufs = normaliza((item.ufs || []).join(" "));
          const email = normaliza(item.email);
          const tel = String(item.telefone || "").replace(/\D/g, "");

          return (
            nome.includes(termo) ||
            cidade.includes(termo) ||
            uf.includes(termo) ||
            regiao.includes(termo) ||
            ufs.includes(termo) ||
            email.includes(termo) ||
            (termoDigitos.length >= 2 && tel.includes(termoDigitos))
          );
        });
      }
      return base;
    };

    const abreDiretorio = (id, origem) => {
      termoBusca = "";
      if (distBuscaInput) distBuscaInput.value = "";
      if (distBuscaLimpar) distBuscaLimpar.hidden = true;
      const itens = itensAtivos();
      selecionado = id && itens.some((item) => item.id === id) ? id : "";
      renderizaLista(itens);
      origemModal = origem || document.activeElement;
      if (typeof modalDist.showModal === "function") modalDist.showModal();
      else modalDist.setAttribute("open", "");
      document.body.classList.add("dist-modal-aberto");
      window.requestAnimationFrame(() => {
        if (selecionado) destaca(selecionado, true);
        else if (distBuscaInput) distBuscaInput.focus();
        else fecharModalDist.focus();
      });
    };

    const fechaDiretorio = () => {
      if (typeof modalDist.close === "function" && modalDist.open) modalDist.close();
      else {
        modalDist.removeAttribute("open");
        document.body.classList.remove("dist-modal-aberto");
        if (origemModal && document.contains(origemModal)) origemModal.focus();
      }
    };

    const atualizaMapa = () => {
      const itens = segmentoAtivo === "todos"
        ? dadosDist.items
        : dadosDist.items.filter((item) => item.segmento === segmentoAtivo);
      if (!itens.some((item) => item.id === selecionado)) selecionado = "";
      renderizaMapa(itens);
    };

    if (distBuscaInput) {
      distBuscaInput.addEventListener("input", (e) => {
        termoBusca = e.target.value;
        if (distBuscaLimpar) {
          distBuscaLimpar.hidden = !termoBusca;
        }
        renderizaLista(itensAtivos());
      });
      if (distBuscaLimpar) {
        distBuscaLimpar.addEventListener("click", () => {
          distBuscaInput.value = "";
          termoBusca = "";
          distBuscaLimpar.hidden = true;
          distBuscaInput.focus();
          renderizaLista(itensAtivos());
        });
      }
    }

    document.querySelectorAll("[data-segmento]").forEach((botao) => {
      botao.addEventListener("click", () => {
        segmentoAtivo = botao.dataset.segmento;
        selecionado = "";
        document.querySelectorAll("[data-segmento]").forEach((item) => {
          const ativo = item === botao;
          item.setAttribute("aria-pressed", String(ativo));
          item.classList.toggle("ativo", ativo);
        });
        atualizaMapa();
        if (modalDist.open || modalDist.hasAttribute("open")) {
          renderizaLista(itensAtivos());
        }
      });
    });
    abrirModalDist.addEventListener("click", () => abreDiretorio("", abrirModalDist));
    fecharModalDist.addEventListener("click", fechaDiretorio);
    modalDist.addEventListener("cancel", (evento) => {
      evento.preventDefault();
      fechaDiretorio();
    });
    modalDist.addEventListener("close", () => {
      document.body.classList.remove("dist-modal-aberto");
      if (origemModal && document.contains(origemModal)) origemModal.focus();
      origemModal = null;
    });
    modalDist.addEventListener("click", (evento) => {
      if (evento.target !== modalDist) return;
      const caixa = modalDist.getBoundingClientRect();
      const fora = evento.clientX < caixa.left || evento.clientX > caixa.right ||
        evento.clientY < caixa.top || evento.clientY > caixa.bottom;
      if (fora) fechaDiretorio();
    });
    atualizaMapa();
  }
})();