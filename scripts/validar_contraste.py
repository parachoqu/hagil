"""Contraste medido nos pixels renderizados, não estimado no papel.

O refino introduziu véus tingidos, superfícies alternadas e faixas de
dissolução. Qualquer uma dessas camadas pode clarear o fundo sob um texto
pequeno e derrubar a razão de contraste sem que nada pareça errado.

Como funciona: para cada alvo, lê-se a cor computada do texto, captura-se a
caixa inteira do elemento e toma-se a MEDIANA dos pixels como fundo. A
mediana é o fundo por construção — glifos cobrem bem menos da metade de uma
caixa de texto — e é imune à borda antialiasada das letras, que era o que
fazia uma amostragem por ponto acusar falso positivo. A decodificação do PNG
acontece num canvas dentro da própria página, sem tocar no DOM.

Limiar: 4,5:1 para texto normal e 3:1 para texto grande (>=24px, ou >=18.66px
em peso 700), conforme WCAG 2.2 AA.
"""

import asyncio
import base64
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from _cdp_comum import Ambiente  # noqa: E402

# Os banners fora do capítulo ativo vivem à direita do scroller horizontal.
# Um recorte de tela sobre eles captura o creme da seção, não a cena — e a
# medição sairia falsamente aprovada ou falsamente reprovada. Isolar o
# capítulo (o mesmo caminho que o usuário percorre) põe a cena sob o recorte.
ISOLA = """
(n => {
    const b = [...document.querySelectorAll('[data-carrossel-banner]')];
    const marcas = document.querySelectorAll('[data-carrossel-para]');
    if (marcas[n]) marcas[n].click();
    b.forEach((x, i) => { x.style.display = i === n ? '' : 'none'; });
    const t = document.querySelector('[data-carrossel-trilha]');
    if (t) { t.style.overflow = 'hidden'; t.scrollLeft = 0; }
})(%d)
"""

ALVOS = [
    ("contagem · tile bovinos (tinta ocre)", "index.html",
     '.especie[data-especie="bovinos"] .especie__contagem'),
    ("contagem · tile caprinos (tinta areia, a mais clara)", "index.html",
     '.especie[data-especie="caprinos"] .especie__contagem'),
    ("contagem · tile pet (tinta céu)", "index.html",
     '.especie[data-especie="pet"] .especie__contagem'),
    ("contagem · tile bubalinos (tinta profundo)", "index.html",
     '.especie[data-especie="bubalinos"] .especie__contagem'),
    ("nome do tile de espécie", "index.html",
     '.especie[data-especie="caprinos"] .especie__rotulo strong'),
    ("apoio do Máximo Baby sobre a névoa", "index.html",
     1, '.campanha--baby .campanha__apoio'),
    ("ficha do Máximo Baby", "index.html", 1, '.campanha--baby .campanha__ficha'),
    ("título do Máximo Baby", "index.html", 1, '.campanha--baby .campanha__editorial h3'),
    ("apoio do Dynamis", "index.html", 0, '.campanha--dynamis .campanha__apoio'),
    ("ficha do Enthérikos", "index.html", 2, '.campanha--entherikos .campanha__ficha'),
    ("texto do diferencial em destaque", "index.html", '.dif:nth-child(1) p'),
    ("registro técnico 03", "index.html", '.dif:nth-child(3) p'),
    ("indicador de rolagem sobre a dissolução", "index.html", '.hero__rolar'),
    ("legenda REG. MAPA na hero", "index.html", '.hero__chip--b'),
    ("marco da trajetória sobre a areia", "index.html",
     '.trajetoria li:last-child span'),
    ("data no editorial", "index.html", '.editorial__data'),
    ("apoio da CTA final", "index.html", '.cta-final p'),
    ("credencial sobre a superfície elevada", "index.html", '.cert p'),
    ("categoria em card de superfície alternada", "produtos.html",
     '.card-prod:nth-child(3n+2) .card-prod__cats'),
    ("nota do catálogo", "produtos.html", '.catalogo__nota'),
    ("aviso de pendência", "produto.html?id=dynamis-mh1000", '.pendente'),
    ("legenda de fases na hero de produto", "produto.html?id=dynamis-mh1000",
     '.produto__fases'),
]

SONDA = """
(sel => {
    const el = document.querySelector(sel);
    if (!el) return null;
    el.scrollIntoView({ block: 'center' });
    const r = el.getBoundingClientRect();
    const est = getComputedStyle(el);
    return {
        x: r.left, y: r.top, w: r.width, h: r.height,
        sx: window.scrollX, sy: window.scrollY,
        cor: est.color,
        px: parseFloat(est.fontSize),
        peso: est.fontWeight
    };
})(%s)
"""

# Decodifica o recorte num canvas fora do DOM e devolve a mediana por canal.
LE_FUNDO = """
(async (b64) => {
    const img = new Image();
    img.src = 'data:image/png;base64,' + b64;
    await img.decode();
    const c = document.createElement('canvas');
    c.width = img.width; c.height = img.height;
    const g = c.getContext('2d', { willReadFrequently: true });
    g.drawImage(img, 0, 0);
    const d = g.getImageData(0, 0, img.width, img.height).data;
    const canais = [[], [], []];
    for (let i = 0; i < d.length; i += 4) {
        canais[0].push(d[i]); canais[1].push(d[i + 1]); canais[2].push(d[i + 2]);
    }
    return canais.map(v => {
        v.sort((a, b) => a - b);
        return v[Math.floor(v.length / 2)];
    });
})(%s)
"""


def canal(v):
    v /= 255
    return v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4


def luminancia(rgb):
    r, g, b = (canal(c) for c in rgb)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def razao(a, b):
    la, lb = luminancia(a), luminancia(b)
    claro, escuro = max(la, lb), min(la, lb)
    return (claro + 0.05) / (escuro + 0.05)


def compoe(cor_css, fundo):
    """Compõe uma cor CSS (possivelmente com alfa) sobre o fundo medido."""
    n = cor_css[cor_css.index("(") + 1:cor_css.rindex(")")]
    p = [float(x) for x in n.replace("/", " ").replace(",", " ").split()]
    r, g, b = p[0], p[1], p[2]
    a = p[3] if len(p) > 3 else 1.0
    return [a * c + (1 - a) * f for c, f in zip((r, g, b), fundo)]


async def main():
    falhas = []
    async with Ambiente() as amb:
        cdp = amb.cdp
        await cdp.viewport(1440, 2400, dsf=1)
        pagina_atual = None

        for alvo in ALVOS:
            if len(alvo) == 4:
                nome, pagina, capitulo, seletor = alvo
            else:
                nome, pagina, seletor = alvo
                capitulo = None

            if pagina != pagina_atual or capitulo is not None:
                await cdp.ir(amb.url(pagina))
                await cdp.assentar()
                pagina_atual = pagina
            if capitulo is not None:
                await cdp.js(ISOLA % capitulo)
                await asyncio.sleep(0.9)

            m = await cdp.js(SONDA % json.dumps(seletor))
            if not m:
                print(f"  [!] alvo ausente: {nome}")
                continue

            recorte = {"x": m["sx"] + m["x"], "y": m["sy"] + m["y"],
                       "width": max(4, m["w"]), "height": max(4, m["h"]), "scale": 1}
            r = await cdp.cmd("Page.captureScreenshot", {
                "format": "png", "clip": recorte, "captureBeyondViewport": True})
            fundo = await cdp.js(LE_FUNDO % json.dumps(r["data"]), aguarda=True)

            texto = compoe(m["cor"], fundo)
            ratio = razao(texto, fundo)
            grande = m["px"] >= 24 or (m["px"] >= 18.66 and int(m["peso"] or 400) >= 700)
            minimo = 3.0 if grande else 4.5
            ok = ratio >= minimo
            if not ok:
                falhas.append(f"{nome}: {ratio:.2f}:1 (mínimo {minimo})")
            print(f"  [{'ok ' if ok else 'FALHA'}] {ratio:5.2f}:1  (min {minimo})  {nome}"
                  f"   texto rgb({int(texto[0])},{int(texto[1])},{int(texto[2])})"
                  f" sobre rgb({fundo[0]},{fundo[1]},{fundo[2]})")

    print("\n" + "=" * 60)
    if falhas:
        print("ABAIXO DO MÍNIMO AA:")
        for f in falhas:
            print("  ·", f)
        return 1
    print("Todos os pares medidos passam no AA da WCAG 2.2.")
    return 0


if __name__ == "__main__":
    sys.exit(asyncio.run(main()))
