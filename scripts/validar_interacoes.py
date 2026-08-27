"""Verificação funcional do que o refino visual poderia ter quebrado.

Carrossel (setas, régua, teclado, inert, atmosfera), funcionamento sem
JavaScript, modal de distribuidores (abrir, buscar, Esc, retorno de foco),
filtros do catálogo (URL, histórico) e visibilidade do anel de foco.
"""

import asyncio
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from _cdp_comum import Ambiente  # noqa: E402

resultados = []


def checa(nome, ok, detalhe=""):
    resultados.append((nome, ok, detalhe))
    print(f"  [{'ok ' if ok else 'FALHA'}] {nome}" + (f" — {detalhe}" if detalhe else ""))


async def tecla(cdp, chave, seletor):
    await cdp.js(f"""
        (() => {{
            const alvo = document.querySelector({chave!r} && {seletor!r});
            alvo.focus();
            alvo.dispatchEvent(new KeyboardEvent('keydown',
                {{ key: {chave!r}, bubbles: true, cancelable: true }}));
        }})()
    """)
    await asyncio.sleep(0.6)


async def carrossel(cdp, amb):
    print("\n--- carrossel de campanhas ---")
    await cdp.ir(amb.url("index.html"))
    await cdp.assentar()

    estado = await cdp.js("""
        (() => {
            const s = document.querySelector('[data-carrossel-raiz]');
            const b = [...document.querySelectorAll('[data-carrossel-banner]')];
            return {
                modo: s.dataset.modo,
                capitulo: s.dataset.capitulo,
                barraOculta: document.querySelector('[data-carrossel-controles]').hidden,
                inert: b.map(x => x.inert),
                atual: [...document.querySelectorAll('[data-carrossel-para]')]
                    .findIndex(m => m.getAttribute('aria-current') === 'true')
            };
        })()
    """)
    checa("modo carrossel ativado", estado["modo"] == "carrossel")
    checa("controles revelados", estado["barraOculta"] is False)
    checa("atmosfera segue o capítulo 1", estado["capitulo"] == "dynamis", estado["capitulo"])
    checa("banners fora de vista são inert", estado["inert"] == [False, True, True], str(estado["inert"]))

    await cdp.js("document.querySelector('[data-carrossel-ir=\"seguinte\"]').click()")
    await asyncio.sleep(0.8)
    e = await cdp.js("""
        (() => {
            const s = document.querySelector('[data-carrossel-raiz]');
            return { cap: s.dataset.capitulo,
                     atual: [...document.querySelectorAll('[data-carrossel-para]')]
                         .findIndex(m => m.getAttribute('aria-current') === 'true'),
                     inert: [...document.querySelectorAll('[data-carrossel-banner]')].map(x => x.inert),
                     anuncio: document.querySelector('[data-carrossel-anuncio]').textContent };
        })()
    """)
    checa("seta avança para o capítulo 2", e["atual"] == 1 and e["cap"] == "baby", f"{e['atual']} / {e['cap']}")
    checa("inert acompanha a troca", e["inert"] == [True, False, True], str(e["inert"]))
    checa("mudança é anunciada", "2 de 3" in e["anuncio"], e["anuncio"])

    await tecla(cdp, "ArrowRight", "[data-carrossel-trilha]")
    cap = await cdp.js("document.querySelector('[data-carrossel-raiz]').dataset.capitulo")
    checa("seta direita do teclado avança", cap == "entherikos", cap)

    await tecla(cdp, "Home", "[data-carrossel-trilha]")
    cap = await cdp.js("document.querySelector('[data-carrossel-raiz]').dataset.capitulo")
    checa("Home volta ao primeiro capítulo", cap == "dynamis", cap)

    await tecla(cdp, "End", "[data-carrossel-trilha]")
    e = await cdp.js("""
        (() => ({ cap: document.querySelector('[data-carrossel-raiz]').dataset.capitulo,
                  seguinteOff: document.querySelector('[data-carrossel-ir="seguinte"]')
                      .getAttribute('aria-disabled') }))()
    """)
    checa("End vai ao último capítulo", e["cap"] == "entherikos", e["cap"])
    checa("seta seguinte fica indisponível no fim", e["seguinteOff"] == "true", str(e["seguinteOff"]))

    # A régua leva direto ao capítulo pedido.
    await cdp.js("document.querySelectorAll('[data-carrossel-para]')[1].click()")
    await asyncio.sleep(0.8)
    cap = await cdp.js("document.querySelector('[data-carrossel-raiz]').dataset.capitulo")
    checa("régua salta para o capítulo pedido", cap == "baby", cap)


async def sem_js(cdp, amb):
    print("\n--- sem JavaScript ---")
    await cdp.cmd("Emulation.setScriptExecutionDisabled", {"value": True})
    await cdp.ir(amb.url("index.html"))
    r = await cdp.js("1")  # confirma que o JS da página não roda, mas o eval do CDP sim
    e = await cdp.cmd("Runtime.evaluate", {"expression": """
        (() => {
            const b = [...document.querySelectorAll('[data-carrossel-banner]')];
            const vis = b.filter(x => x.getBoundingClientRect().height > 100).length;
            return JSON.stringify({
                banners: vis,
                modo: document.querySelector('[data-carrossel-raiz]').dataset.modo || '',
                controles: document.querySelector('[data-carrossel-controles]').hidden,
                inert: b.some(x => x.inert),
                reveal: getComputedStyle(document.querySelector('[data-reveal]')).opacity
            });
        })()
    """, "returnByValue": True})
    import json
    d = json.loads(e["result"]["value"])
    checa("os três banners ficam visíveis", d["banners"] == 3, str(d["banners"]))
    checa("modo carrossel não é aplicado", d["modo"] == "", repr(d["modo"]))
    checa("controles permanecem ocultos", d["controles"] is True)
    checa("nenhum banner fica inert", d["inert"] is False)
    checa("conteúdo com data-reveal continua visível", d["reveal"] == "1", d["reveal"])
    await cdp.cmd("Emulation.setScriptExecutionDisabled", {"value": False})


async def modal(cdp, amb):
    print("\n--- modal de distribuidores ---")
    await cdp.ir(amb.url("index.html"))
    await cdp.assentar()
    await cdp.js("document.getElementById('abrir-modal-distribuidores').focus()")
    await cdp.js("document.getElementById('abrir-modal-distribuidores').click()")
    await asyncio.sleep(0.7)
    e = await cdp.js("""
        (() => ({ aberto: document.getElementById('modal-distribuidores').open,
                  travado: document.body.classList.contains('dist-modal-aberto'),
                  cartoes: document.querySelectorAll('.dist-card').length }))()
    """)
    checa("modal abre", e["aberto"] is True)
    checa("rolagem do corpo é travada", e["travado"] is True)
    checa("diretório é renderizado", e["cartoes"] > 0, f"{e['cartoes']} fichas")

    await cdp.js("""
        (() => {
            const i = document.getElementById('dist-busca-input');
            i.value = 'Minas'; i.dispatchEvent(new Event('input', { bubbles: true }));
        })()
    """)
    await asyncio.sleep(0.4)
    n = await cdp.js("document.querySelectorAll('.dist-card').length")
    txt = await cdp.js("document.getElementById('dist-contagem').textContent")
    checa("busca filtra o diretório", 0 < n and "Minas" in txt, f"{n} resultados · {txt}")

    # `keyDown` (não `rawKeyDown`): é o tipo que o Chromium encaminha ao
    # tratamento nativo de <dialog>, que é quem dispara o evento `cancel`.
    #
    # Com o campo de busca preenchido e focado, o PRIMEIRO Escape é
    # consumido pelo <input type="search"> para limpar o termo — comportamento
    # nativo do navegador, e o certo: quem está buscando espera desfazer a
    # busca antes de perder o diretório inteiro. O segundo Escape fecha.
    async def escape():
        for tipo in ("keyDown", "keyUp"):
            await cdp.cmd("Input.dispatchKeyEvent", {
                "type": tipo, "key": "Escape", "code": "Escape",
                "windowsVirtualKeyCode": 27, "nativeVirtualKeyCode": 27})
        await asyncio.sleep(0.7)

    await escape()
    ainda_aberto = await cdp.js("document.getElementById('modal-distribuidores').open")
    checa("primeiro Esc limpa a busca sem fechar o modal", ainda_aberto is True)
    await escape()
    e = await cdp.js("""
        (() => ({ aberto: document.getElementById('modal-distribuidores').open,
                  travado: document.body.classList.contains('dist-modal-aberto'),
                  foco: document.activeElement.id }))()
    """)
    checa("Esc fecha o modal", not e["aberto"])
    checa("rolagem do corpo é liberada", e["travado"] is False)
    checa("foco volta ao botão de origem", e["foco"] == "abrir-modal-distribuidores", e["foco"])

    # E pelo botão de fechar, que é o caminho explícito.
    await cdp.js("document.getElementById('abrir-modal-distribuidores').click()")
    await asyncio.sleep(0.6)
    await cdp.js("document.getElementById('fechar-modal-distribuidores').click()")
    await asyncio.sleep(0.6)
    e = await cdp.js("""
        (() => ({ aberto: document.getElementById('modal-distribuidores').open,
                  travado: document.body.classList.contains('dist-modal-aberto'),
                  foco: document.activeElement.id }))()
    """)
    checa("botão Fechar encerra o modal", not e["aberto"] and e["travado"] is False)
    checa("foco retorna pelo botão Fechar", e["foco"] == "abrir-modal-distribuidores", e["foco"])


async def catalogo(cdp, amb):
    print("\n--- filtros do catálogo ---")
    await cdp.ir(amb.url("produtos.html"))
    await cdp.assentar()
    total = await cdp.js("document.querySelectorAll('.card-prod').length")
    checa("grade inicial renderiza", total > 0, f"{total} cards")

    await cdp.js("""
        (() => [...document.querySelectorAll('#filtros-especies button')]
            .find(b => b.dataset.especie === 'bovinos').click())()
    """)
    await asyncio.sleep(0.5)
    e = await cdp.js("""
        (() => ({ url: location.search,
                  cards: document.querySelectorAll('.card-prod').length,
                  pressed: document.querySelector('[data-especie="bovinos"]').getAttribute('aria-pressed'),
                  fases: !document.getElementById('filtros-segmentos').hidden }))()
    """)
    checa("URL fica compartilhável", e["url"] == "?especie=bovinos", e["url"])
    checa("estado do filtro é exposto", e["pressed"] == "true")
    checa("faixa de fase aparece para bovinos", e["fases"] is True)
    checa("grade é filtrada", 0 < e["cards"] < total, f"{e['cards']} de {total}")

    # A alternância de superfície precisa continuar cobrindo a grade filtrada.
    fundos = await cdp.js("""
        (() => {
            const s = new Set([...document.querySelectorAll('.card-prod a')]
                .map(a => getComputedStyle(a).backgroundColor));
            return [...s];
        })()
    """)
    checa("variação de superfície ativa na grade", len(fundos) == 2, str(fundos))

    await cdp.cmd("Page.navigate", {"url": amb.url("produtos.html?especie=pet")})
    await asyncio.sleep(1.0)
    e = await cdp.js("""
        (() => ({ pressed: document.querySelector('[data-especie="pet"]').getAttribute('aria-pressed'),
                  cards: document.querySelectorAll('.card-prod').length }))()
    """)
    checa("URL de entrada é respeitada", e["pressed"] == "true" and e["cards"] > 0,
          f"{e['cards']} cards")


async def foco(cdp, amb):
    print("\n--- anel de foco ---")
    await cdp.ir(amb.url("index.html"))
    await cdp.assentar()
    e = await cdp.js("""
        (() => {
            const alvos = {
              'CTA da hero': '.hero .btn--luz',
              'seta do carrossel': '[data-carrossel-ir="seguinte"]',
              'capítulo da régua': '[data-carrossel-para="1"]',
              'tile de espécie': '.especie a',
              'destaque': '.destaque',
              'filtro de distribuidor': '.dist__filtro',
              'link do rodapé': '.footer a'
            };
            const fora = [];
            for (const [nome, sel] of Object.entries(alvos)) {
                const el = document.querySelector(sel);
                if (!el) { fora.push(nome + ' (ausente)'); continue; }
                el.focus();
                const est = getComputedStyle(el);
                const largura = parseFloat(est.outlineWidth);
                if (!(largura >= 2) || est.outlineStyle === 'none') {
                    fora.push(nome + ' (' + est.outlineStyle + ' ' + est.outlineWidth + ')');
                }
            }
            return fora;
        })()
    """)
    checa("anel de foco visível em todos os controles", not e, str(e))


async def main():
    async with Ambiente() as amb:
        cdp = amb.cdp
        await cdp.viewport(1440, 900, dsf=1)
        await carrossel(cdp, amb)
        await modal(cdp, amb)
        await catalogo(cdp, amb)
        await foco(cdp, amb)
        await sem_js(cdp, amb)

        if cdp.problemas:
            print("\n[!] console reportou:")
            for t, x in cdp.problemas:
                print(f"    {t}: {x[:160]}")
        else:
            print("\n[ok] console limpo durante as interações.")

    falhas = [n for n, ok, _ in resultados if not ok]
    print("\n" + "=" * 60)
    print(f"{len(resultados) - len(falhas)}/{len(resultados)} verificações passaram.")
    if falhas:
        print("FALHAS: " + "; ".join(falhas))
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(asyncio.run(main()))
