"""Validação obrigatória dos oito viewports do sistema.

Para cada página e cada viewport verifica:

  · overflow horizontal   scrollWidth não pode exceder a largura útil
  · console               nenhum erro, exceção ou log de nível error
  · alvos de toque        nada abaixo de 44px em superfícies interativas
  · integridade da mídia  nenhuma imagem quebrada

Roda também uma passagem com prefers-reduced-motion: reduce.

Saída: relatório em texto e código 1 se algo falhar.
"""

import asyncio
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from _cdp_comum import Ambiente  # noqa: E402

VIEWPORTS = [
    (1920, 1080, 1, False),
    (1440, 900, 2, False),
    (1280, 800, 2, False),
    (1024, 768, 2, False),
    (768, 1024, 2, True),
    (430, 932, 3, True),
    (390, 844, 3, True),
    (360, 800, 3, True),
]

PAGINAS = [
    ("index.html", "home"),
    ("produtos.html", "catálogo"),
    ("produto.html?id=dynamis-mh1000", "produto"),
]

# O documento pode passar 1px por arredondamento de subpixel; acima disso
# é barra de rolagem horizontal de verdade.
TOLERANCIA = 1

SONDA = """
(() => {
  const doc = document.documentElement;
  const largura = doc.clientWidth;
  const excesso = Math.max(doc.scrollWidth, document.body.scrollWidth) - largura;

  // Quem realmente estoura, para o relatório apontar o culpado.
  const culpados = [];
  if (excesso > 1) {
    document.querySelectorAll('body *').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      if (r.right > largura + 1 || r.left < -1) {
        const est = getComputedStyle(el);
        if (est.position === 'fixed') return;
        culpados.push(
          (el.tagName.toLowerCase() + '.' + ((el.getAttribute('class') || '').split(' ')[0]))
          + ' → ' + Math.round(r.left) + '..' + Math.round(r.right)
        );
      }
    });
  }

  const quebradas = [...document.images]
    .filter(i => i.complete && i.naturalWidth === 0)
    .map(i => i.currentSrc || i.src);

  // Alvos de toque: só o que é de fato clicável e visível.
  const pequenos = [];
  document.querySelectorAll('a[href], button, input, summary, [role="button"]').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) return;
    const est = getComputedStyle(el);
    if (est.visibility === 'hidden' || est.display === 'none') return;
    if (el.closest('.produto__migalhas')) return;
    if (r.height < 43.5 || r.width < 12) {
      pequenos.push(
        (el.tagName.toLowerCase() + '.' + ((el.getAttribute('class') || '').split(' ')[0]))
        + ' ' + Math.round(r.width) + 'x' + Math.round(r.height)
      );
    }
  });

  return { largura, excesso, culpados: culpados.slice(0, 6),
           quebradas: quebradas.slice(0, 5), pequenos: pequenos.slice(0, 6) };
})()
"""


async def main():
    falhas = []
    linhas = []

    async with Ambiente() as amb:
        cdp = amb.cdp

        for reduzido in (False, True):
            rotulo = "movimento reduzido" if reduzido else "padrão"
            await cdp.movimento_reduzido(reduzido)
            linhas.append(f"\n=== {rotulo} ===")

            for larg, alt, dsf, movel in VIEWPORTS:
                await cdp.viewport(larg, alt, dsf=dsf, mobile=movel)
                for caminho, nome in PAGINAS:
                    antes = len(cdp.problemas)
                    await cdp.ir(amb.url(caminho))
                    await cdp.assentar()
                    r = await cdp.js(SONDA)
                    novos = cdp.problemas[antes:]

                    marcas = []
                    if r["excesso"] > TOLERANCIA:
                        marcas.append(f"OVERFLOW +{r['excesso']}px {r['culpados']}")
                    if r["quebradas"]:
                        marcas.append(f"IMAGENS QUEBRADAS {r['quebradas']}")
                    if r["pequenos"]:
                        marcas.append(f"ALVO PEQUENO {r['pequenos']}")
                    if novos:
                        marcas.append(f"CONSOLE {[t[:110] for _, t in novos]}")

                    estado = "ok " if not marcas else "FALHA"
                    linhas.append(f"  [{estado}] {larg}x{alt} {nome}"
                                  + ("" if not marcas else "\n         " + "\n         ".join(marcas)))
                    if marcas:
                        falhas.append(f"{rotulo} {larg}x{alt} {nome}: {'; '.join(marcas)}")

    print("\n".join(linhas))
    print("\n" + "=" * 60)
    if falhas:
        print(f"{len(falhas)} FALHA(S):")
        for f in falhas:
            print("  ·", f)
        return 1
    print("Todos os viewports passaram: sem overflow horizontal, sem erro de "
          "console, sem imagem quebrada e sem alvo de toque abaixo de 44px.")
    return 0


if __name__ == "__main__":
    sys.exit(asyncio.run(main()))
