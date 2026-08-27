"""Capturas do refino visual v2 → prints/refino_v2/

prints/interface_atual/ é preservado como o "antes"; nada é sobrescrito.

Desktop 1440x900 e mobile 390x844, as duas leituras que a direção de arte
precisa comparar lado a lado.
"""

import asyncio
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from _cdp_comum import Ambiente, RAIZ  # noqa: E402

SAIDA = RAIZ / "prints" / "refino_v2"

# Isola um capítulo do carrossel para a captura.
#
# Forçar `trilha.scrollLeft` não funciona: a captura usa
# captureBeyondViewport, que refaz o layout e zera o scroll horizontal da
# trilha — as três capturas saíam idênticas ao capítulo 1. Então navega-se
# pelo controle real, o mesmo caminho do usuário, e os banners fora de vista
# são ocultados. Sem trilha rolável não há scroll para o relayout perder.
ISOLA = """
    (n => {
        const banners = [...document.querySelectorAll('[data-carrossel-banner]')];
        const marcas = document.querySelectorAll('[data-carrossel-para]');
        if (marcas[n]) marcas[n].click();
        banners.forEach((b, i) => { b.style.display = i === n ? '' : 'none'; });
        const t = document.querySelector('[data-carrossel-trilha]');
        if (t) { t.style.overflow = 'hidden'; t.scrollLeft = 0; }
    })(%d)
"""

RESTAURA = """
    (() => {
        document.querySelectorAll('[data-carrossel-banner]')
            .forEach(b => { b.style.display = ''; });
        const t = document.querySelector('[data-carrossel-trilha]');
        if (t) t.style.overflow = '';
        const marcas = document.querySelectorAll('[data-carrossel-para]');
        if (marcas[0]) marcas[0].click();
    })()
"""

CAPITULOS = ["dynamis", "maximo_baby", "entherikos"]


async def home(cdp, amb, pre):
    await cdp.ir(amb.url("index.html"))
    await cdp.assentar()
    await cdp.recorta("section.campaign.hero", SAIDA / f"{pre}_01_hero.png")
    await cdp.recorta("section.secao.especies", SAIDA / f"{pre}_02_especies.png")

    for i, nome in enumerate(CAPITULOS):
        await cdp.js(ISOLA % i)
        await asyncio.sleep(0.9)
        await cdp.recorta("section.campanhas", SAIDA / f"{pre}_03_campanha_{i+1}_{nome}.png")
    await cdp.js(RESTAURA)
    await asyncio.sleep(0.5)

    await cdp.recorta("section.secao.destaques", SAIDA / f"{pre}_04_destaques.png")
    await cdp.recorta("section.secao.empresa", SAIDA / f"{pre}_05_empresa.png")
    await cdp.recorta("section#ciencia", SAIDA / f"{pre}_06_ciencia.png")
    await cdp.recorta("section.secao.conteudo", SAIDA / f"{pre}_07_conteudo.png")
    await cdp.recorta("section#distribuidores", SAIDA / f"{pre}_08_distribuidores.png")
    await cdp.recorta("section.secao.cta-final", SAIDA / f"{pre}_09_cta_final.png")
    await cdp.recorta("footer.footer", SAIDA / f"{pre}_10_rodape.png")


async def catalogo(cdp, amb, pre):
    await cdp.ir(amb.url("produtos.html"))
    await cdp.assentar()
    await cdp.recorta("section.catalogo-hero", SAIDA / f"{pre}_11_catalogo_hero.png")
    await cdp.recorta("section.catalogo", SAIDA / f"{pre}_12_catalogo_grade.png")


async def produto(cdp, amb, pre):
    await cdp.ir(amb.url("produto.html?id=dynamis-mh1000"))
    await cdp.assentar()
    await cdp.recorta("section.produto-hero", SAIDA / f"{pre}_13_produto_hero.png")
    await cdp.recorta("section.produto-corpo", SAIDA / f"{pre}_14_produto_corpo.png")


async def modal(cdp, amb, pre):
    await cdp.ir(amb.url("index.html"))
    await cdp.assentar()
    await cdp.js("document.getElementById('abrir-modal-distribuidores').click()")
    await asyncio.sleep(0.7)
    await cdp.recorta(".dist-modal__painel", SAIDA / f"{pre}_15_modal_distribuidores.png")


# Larguras onde a composição muda de regime: a recomposição dos
# diferenciais, a troca do palco dos banners e o empilhamento vertical.
BREAKPOINTS = [(1920, 1080, 1, False), (1280, 800, 2, False),
               (1024, 768, 2, False), (768, 1024, 2, True),
               (360, 800, 3, True)]


async def sweep(cdp, amb):
    """Uma amostra por largura crítica, para conferir as viradas de layout."""
    for larg, alt, dsf, movel in BREAKPOINTS:
        await cdp.viewport(larg, alt, dsf=dsf, mobile=movel)
        await cdp.ir(amb.url("index.html"))
        await cdp.assentar()
        pre = f"bp{larg}"
        await cdp.recorta("section.campaign.hero", SAIDA / f"{pre}_hero.png")
        await cdp.recorta("section.campanhas", SAIDA / f"{pre}_campanhas.png")
        await cdp.recorta("section#ciencia", SAIDA / f"{pre}_ciencia.png")
        await cdp.recorta("section.secao.destaques", SAIDA / f"{pre}_destaques.png")


async def main():
    SAIDA.mkdir(parents=True, exist_ok=True)
    alvos = sys.argv[1:] or ["desktop", "mobile"]

    async with Ambiente() as amb:
        cdp = amb.cdp

        if "desktop" in alvos:
            print("\n--- desktop 1440x900 ---")
            await cdp.viewport(1440, 900, dsf=2)
            await home(cdp, amb, "desktop")
            await catalogo(cdp, amb, "desktop")
            await produto(cdp, amb, "desktop")
            await modal(cdp, amb, "desktop")

        if "mobile" in alvos:
            print("\n--- mobile 390x844 ---")
            await cdp.viewport(390, 844, dsf=3, mobile=True)
            await home(cdp, amb, "mobile")
            await catalogo(cdp, amb, "mobile")
            await produto(cdp, amb, "mobile")

        if "sweep" in alvos:
            print("\n--- viradas de layout ---")
            await sweep(cdp, amb)

        if cdp.problemas:
            print("\n[!] o navegador reportou:")
            for tipo, texto in cdp.problemas:
                print(f"    {tipo}: {texto[:180]}")
        else:
            print("\n[ok] console limpo durante as capturas.")

    print(f"\nCapturas em {SAIDA}")


if __name__ == "__main__":
    asyncio.run(main())
