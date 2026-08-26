import os
import sys
import time
import json
import re
import asyncio
import subprocess
import base64
import shutil
from pathlib import Path

# Clear proxy variables for local loopback
os.environ['NO_PROXY'] = 'localhost,127.0.0.1,::1'
os.environ['no_proxy'] = 'localhost,127.0.0.1,::1'
for k in ['HTTP_PROXY', 'HTTPS_PROXY', 'ALL_PROXY', 'http_proxy', 'https_proxy', 'all_proxy']:
    os.environ.pop(k, None)

import websockets

PORT = 8765
OUTPUT_DIR = Path('/home/https/Área de trabalho/workspace/hagil/prints/interface_atual')
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

class CDPClient:
    def __init__(self, ws_url):
        self.ws_url = ws_url
        self.ws = None
        self.msg_id = 0
        self.pending_responses = {}
        self.session_id = None
        self.loop_task = None

    async def connect(self):
        self.ws = await websockets.connect(self.ws_url, max_size=100*1024*1024)
        self.loop_task = asyncio.create_task(self._listen())

    async def _listen(self):
        try:
            async for message in self.ws:
                data = json.loads(message)
                if 'id' in data and data['id'] in self.pending_responses:
                    self.pending_responses[data['id']].set_result(data)
        except asyncio.CancelledError:
            pass
        except Exception as e:
            print("WebSocket listen error:", e)

    async def send_cmd(self, method, params=None, session_id=None):
        self.msg_id += 1
        msg_id = self.msg_id
        fut = asyncio.get_running_loop().create_future()
        self.pending_responses[msg_id] = fut
        payload = {'id': msg_id, 'method': method}
        if params is not None:
            payload['params'] = params
        target_session = session_id or self.session_id
        if target_session:
            payload['sessionId'] = target_session
        await self.ws.send(json.dumps(payload))
        res = await fut
        del self.pending_responses[msg_id]
        if 'error' in res:
            raise Exception(f"CDP Error in {method}: {res['error']}")
        return res.get('result', {})

    async def create_and_attach_page(self, url="about:blank"):
        res = await self.send_cmd("Target.createTarget", {"url": url}, session_id=None)
        target_id = res["targetId"]
        res2 = await self.send_cmd("Target.attachToTarget", {"targetId": target_id, "flatten": True}, session_id=None)
        self.session_id = res2["sessionId"]
        return self.session_id

    async def set_viewport(self, width, height, dsf=2):
        await self.send_cmd("Emulation.setDeviceMetricsOverride", {
            "width": width,
            "height": height,
            "deviceScaleFactor": dsf,
            "mobile": False
        })
        await self.send_cmd("Emulation.setVisibleSize", {"width": width, "height": height})

    async def navigate(self, url):
        await self.send_cmd("Page.enable")
        await self.send_cmd("DOM.enable")
        await self.send_cmd("Runtime.enable")
        await self.send_cmd("Page.navigate", {"url": url})
        for _ in range(50):
            res = await self.eval("document.readyState")
            if res == "complete":
                break
            await asyncio.sleep(0.1)
        await self.eval("""
            new Promise(async (resolve) => {
                try {
                    await document.fonts.ready;
                } catch(e){}
                const imgs = Array.from(document.images);
                await Promise.all(imgs.map(img => {
                    if (img.complete) return Promise.resolve();
                    return new Promise(r => {
                        img.onload = r;
                        img.onerror = r;
                        setTimeout(r, 2000);
                    });
                }));
                resolve(true);
            })
        """, await_promise=True)
        await asyncio.sleep(0.5)

    async def eval(self, expr, await_promise=False):
        res = await self.send_cmd("Runtime.evaluate", {
            "expression": expr,
            "returnByValue": True,
            "awaitPromise": await_promise
        })
        result = res.get("result", {})
        return result.get("value")

    async def reveal_all_animations(self):
        await self.eval("""
            document.querySelectorAll('[data-reveal], [data-entrada], .revelado').forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'none';
                el.style.visibility = 'visible';
                el.classList.add('visivel', 'revelado');
            });
            const style = document.createElement('style');
            style.textContent = `
                *, *::before, *::after {
                    transition-duration: 0s !important;
                    animation-duration: 0s !important;
                    animation-delay: 0s !important;
                }
            `;
            document.head.appendChild(style);
        """)
        await self.force_eager_images()
        await asyncio.sleep(0.2)

    async def force_eager_images(self):
        """Carrega tudo que está marcado como lazy e espera a decodificação.

        `Page.captureScreenshot` com `captureBeyondViewport` amplia o clipe
        sem rolar a página, então o IntersectionObserver de `loading="lazy"`
        nunca dispara para o que está abaixo da dobra. As capturas de página
        inteira saíam com blocos de cor sólida no lugar das fotografias —
        um falso negativo que faz o projeto parecer quebrado quando não está.
        """
        await self.eval("""
            (() => {
                document.querySelectorAll('img[loading="lazy"]')
                    .forEach(img => { img.loading = 'eager'; });
                return document.querySelectorAll('img').length;
            })()
        """)
        # Espera as imagens completarem, com teto para não travar a captura.
        for _ in range(40):
            pendentes = await self.eval("""
                [...document.querySelectorAll('img')].filter(i => !i.complete).length
            """)
            try:
                if int(pendentes) == 0:
                    break
            except (TypeError, ValueError):
                break
            await asyncio.sleep(0.1)

    async def capture_element(self, selector, filepath, padding=0):
        box = await self.eval(f"""
            (() => {{
                const el = document.querySelector('{selector}');
                if (!el) return null;
                el.scrollIntoView({{ block: 'start', inline: 'nearest' }});
                const rect = el.getBoundingClientRect();
                return {{
                    x: window.scrollX + rect.left,
                    y: window.scrollY + rect.top,
                    width: rect.width,
                    height: rect.height
                }};
            }})()
        """)
        if not box:
            print(f"[!] Selector not found: {selector}")
            return False

        await asyncio.sleep(0.3)
        box = await self.eval(f"""
            (() => {{
                const el = document.querySelector('{selector}');
                const rect = el.getBoundingClientRect();
                return {{
                    x: Math.max(0, window.scrollX + rect.left - {padding}),
                    y: Math.max(0, window.scrollY + rect.top - {padding}),
                    width: rect.width + ({padding} * 2),
                    height: rect.height + ({padding} * 2)
                }};
            }})()
        """)

        clip = {
            "x": box["x"],
            "y": box["y"],
            "width": max(10, box["width"]),
            "height": max(10, box["height"]),
            "scale": 1
        }
        res = await self.send_cmd("Page.captureScreenshot", {
            "format": "png",
            "clip": clip,
            "captureBeyondViewport": True
        })
        img_bytes = base64.b64decode(res["data"])
        filepath.write_bytes(img_bytes)
        print(f"[OK] Saved {filepath.name} ({len(img_bytes):,} bytes)")
        return True

    async def capture_viewport(self, filepath):
        res = await self.send_cmd("Page.captureScreenshot", {
            "format": "png",
            "captureBeyondViewport": False
        })
        img_bytes = base64.b64decode(res["data"])
        filepath.write_bytes(img_bytes)
        print(f"[OK] Saved viewport {filepath.name} ({len(img_bytes):,} bytes)")
        return True

    async def capture_fullpage(self, filepath):
        metrics = await self.send_cmd("Page.getLayoutMetrics")
        content_size = metrics.get("contentSize", metrics.get("cssContentSize", {}))
        width = int(content_size.get("width", 1440))
        height = int(content_size.get("height", 3000))
        
        clip = {
            "x": 0,
            "y": 0,
            "width": width,
            "height": height,
            "scale": 1
        }
        res = await self.send_cmd("Page.captureScreenshot", {
            "format": "png",
            "clip": clip,
            "captureBeyondViewport": True
        })
        img_bytes = base64.b64decode(res["data"])
        filepath.write_bytes(img_bytes)
        print(f"[OK] Saved fullpage {filepath.name} ({len(img_bytes):,} bytes)")
        return True

    async def close(self):
        if self.loop_task:
            self.loop_task.cancel()
        if self.ws:
            await self.ws.close()

async def main():
    print(f"Starting server on port {PORT}...")
    server = subprocess.Popen(["python3", "-m", "http.server", str(PORT)], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(0.5)

    # Porta livre e perfil descartável por execução. Com porta e diretório
    # fixos, um Chromium que não encerrou na rodada anterior deixa um
    # SingletonLock que faz o novo processo sair na hora — e o script
    # falhava com "Failed to find DevTools WebSocket URL" sem dizer por quê.
    import socket
    import tempfile

    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        debug_port = s.getsockname()[1]
    perfil = tempfile.mkdtemp(prefix="cdp-sections-")

    print(f"Launching Chromium (porta {debug_port})...")
    chrome = subprocess.Popen([
        "/usr/bin/chromium",
        "--headless=new",
        "--no-sandbox",
        "--disable-gpu",
        f"--remote-debugging-port={debug_port}",
        f"--user-data-dir={perfil}",
        "about:blank"
    ], stderr=subprocess.PIPE, text=True)

    ws_url = None
    diagnostico = []
    for line in chrome.stderr:
        diagnostico.append(line.rstrip())
        m = re.search(r"DevTools listening on (ws://[^\s]+)", line)
        if m:
            ws_url = m.group(1)
            break

    if not ws_url:
        print("Failed to find DevTools WebSocket URL")
        for linha in diagnostico[-15:]:
            print("  chromium:", linha)
        chrome.terminate()
        server.terminate()
        return

    print(f"Connected to Chromium CDP: {ws_url}")
    cdp = CDPClient(ws_url)
    await cdp.connect()

    try:
        await cdp.create_and_attach_page()
        await cdp.set_viewport(1440, 900, dsf=2)

        # -------------------------------------------------------------
        # 1. INDEX.HTML (Home)
        # -------------------------------------------------------------
        print("\n--- Capturing index.html (Home) ---")
        await cdp.navigate(f"http://127.0.0.1:{PORT}/index.html")
        await cdp.reveal_all_animations()

        # Section 01: Hero
        await cdp.capture_element("section.campaign.hero", OUTPUT_DIR / "01_home_hero.png")

        # Section 02: Espécies
        await cdp.capture_element("section.secao.especies", OUTPUT_DIR / "02_home_especies.png")

        # Section 03: Campanhas — um capítulo por captura.
        #
        # Forçar `trilha.scrollLeft` não funciona aqui: a captura usa
        # `captureBeyondViewport`, que refaz o layout da página e zera o
        # scroll horizontal da trilha. As três capturas saíam idênticas ao
        # capítulo 1 mesmo com o carrossel funcionando.
        #
        # Então navega-se pelo controle real — o mesmo caminho do usuário —
        # e os banners fora de vista são ocultados. Sem trilha rolável não há
        # scroll para o relayout perder, e o que sobra na captura é
        # exatamente o capítulo pedido.
        ISOLA_CAPITULO = """
            (n => {
                const banners = [...document.querySelectorAll('[data-carrossel-banner]')];
                const marcas = document.querySelectorAll('[data-carrossel-para]');
                if (marcas[n]) marcas[n].click();
                banners.forEach((b, i) => { b.style.display = i === n ? '' : 'none'; });
                const trilha = document.querySelector('[data-carrossel-trilha]');
                if (trilha) {
                    trilha.style.overflow = 'hidden';
                    trilha.scrollLeft = 0;
                }
            })(%d)
        """

        for indice, nome in enumerate([
            "03_home_campanhas_capitulo1_dynamis.png",
            "04_home_campanhas_capitulo2_maximo_baby.png",
            "05_home_campanhas_capitulo3_entherikos.png",
        ]):
            await cdp.eval(ISOLA_CAPITULO % indice)
            await asyncio.sleep(1.0)
            await cdp.capture_element("section.campanhas", OUTPUT_DIR / nome)

        # Restaura a trilha para as capturas seguintes da mesma página.
        await cdp.eval("""
            (() => {
                document.querySelectorAll('[data-carrossel-banner]')
                    .forEach(b => { b.style.display = ''; });
                const trilha = document.querySelector('[data-carrossel-trilha]');
                if (trilha) trilha.style.overflow = '';
                const marcas = document.querySelectorAll('[data-carrossel-para]');
                if (marcas[0]) marcas[0].click();
            })()
        """)
        await asyncio.sleep(0.6)

        # Section 04: Destaques de Produtos
        await cdp.capture_element("section.secao.destaques", OUTPUT_DIR / "06_home_destaques_produtos.png")

        # Section 05: Empresa (padrão)
        await cdp.capture_element("section.secao.empresa", OUTPUT_DIR / "07_home_empresa.png")

        # Section 05: Empresa com sanfonas/details abertos
        await cdp.eval("""
            document.querySelectorAll('.institucional__item').forEach(d => d.open = true);
        """)
        await asyncio.sleep(0.3)
        await cdp.capture_element("section.secao.empresa", OUTPUT_DIR / "08_home_empresa_institucional_expandido.png")

        # Section 06: Ciência & Diferenciais
        await cdp.capture_element("section.secao.secao--tecnica#ciencia", OUTPUT_DIR / "09_home_ciencia_diferenciais.png")

        # Section 07: Conteúdo & Conhecimento
        await cdp.capture_element("section.secao.conteudo", OUTPUT_DIR / "10_home_conteudo_editorial.png")

        # Section 08: Distribuidores & Prova (com Mapa do Brasil)
        await cdp.capture_element("section.secao.secao--escura.prova#distribuidores", OUTPUT_DIR / "11_home_distribuidores_mapa.png")

        # Section 09: CTA Final
        await cdp.capture_element("section.secao.cta-final", OUTPUT_DIR / "12_home_cta_final.png")

        # Section 10: Footer / Contato
        await cdp.capture_element("footer.footer#contato", OUTPUT_DIR / "13_home_footer.png")

        # Modal 1: Modal de Distribuidores Aberto (Visão Geral)
        await cdp.eval("""
            (() => {
                const btn = document.getElementById('abrir-modal-distribuidores');
                if (btn) btn.click();
            })()
        """)
        await asyncio.sleep(0.6)
        await cdp.capture_element(".dist-modal__painel", OUTPUT_DIR / "14_modal_distribuidores_geral.png")

        # Modal 1: Modal de Distribuidores com Busca Ativa
        await cdp.eval("""
            (() => {
                const input = document.getElementById('dist-busca-input');
                if (input) {
                    input.value = 'Minas Gerais';
                    input.dispatchEvent(new Event('input', { bubbles: true }));
                }
            })()
        """)
        await asyncio.sleep(0.4)
        await cdp.capture_element(".dist-modal__painel", OUTPUT_DIR / "15_modal_distribuidores_busca.png")

        # Fechar modal para Full Page
        await cdp.eval("""
            (() => {
                const btn = document.getElementById('fechar-modal-distribuidores');
                if (btn) btn.click();
            })()
        """)
        await asyncio.sleep(0.3)

        # Full Page Home
        await cdp.capture_fullpage(OUTPUT_DIR / "16_home_fullpage.png")

        # -------------------------------------------------------------
        # 2. PRODUTOS.HTML (Catálogo Deduplicado)
        # -------------------------------------------------------------
        print("\n--- Capturing produtos.html (Catálogo) ---")
        await cdp.navigate(f"http://127.0.0.1:{PORT}/produtos.html")
        await cdp.reveal_all_animations()
        await asyncio.sleep(0.5)

        # Section 01: Hero do Catálogo
        await cdp.capture_element("section.catalogo-hero", OUTPUT_DIR / "17_catalogo_hero.png")

        # Section 02 & 03: Filtros e Grade de Produtos
        await cdp.capture_element("#filtros", OUTPUT_DIR / "18_catalogo_filtros.png")
        await cdp.capture_element("section.catalogo", OUTPUT_DIR / "19_catalogo_grade_produtos.png")

        # Catálogo Filtrado por Bovinos
        await cdp.eval("""
            (() => {
                const btnBovinos = Array.from(document.querySelectorAll('#filtros-especies button')).find(b => b.textContent.includes('Bovinos'));
                if (btnBovinos) btnBovinos.click();
            })()
        """)
        await asyncio.sleep(0.5)
        await cdp.capture_element(".catalogo", OUTPUT_DIR / "20_catalogo_filtrado_bovinos.png")

        # Full Page Catálogo
        await cdp.capture_fullpage(OUTPUT_DIR / "21_catalogo_fullpage.png")

        # -------------------------------------------------------------
        # 3. PRODUTO.HTML (Detalhe de Produto: Dynamis MH1000)
        # -------------------------------------------------------------
        print("\n--- Capturing produto.html (Detalhe de Produto) ---")
        await cdp.navigate(f"http://127.0.0.1:{PORT}/produto.html?id=dynamis-mh1000")
        await cdp.reveal_all_animations()
        await asyncio.sleep(0.5)

        # Section 01: Produto Hero & Packshot
        await cdp.capture_element("section.produto-hero", OUTPUT_DIR / "22_produto_detalhe_hero.png")

        # Section 02: Produto Ficha Técnica
        await cdp.capture_element("section.produto-corpo", OUTPUT_DIR / "23_produto_detalhe_corpo.png")

        # Full Page Produto
        await cdp.capture_fullpage(OUTPUT_DIR / "24_produto_detalhe_fullpage.png")

        # -------------------------------------------------------------
        # 4. MOBILE VIEWS (390x844 iPhone 14 / Mobile Moderno)
        # -------------------------------------------------------------
        print("\n--- Capturing Mobile Views (390px) ---")
        await cdp.set_viewport(390, 844, dsf=3)
        await cdp.navigate(f"http://127.0.0.1:{PORT}/index.html")
        await cdp.reveal_all_animations()
        await asyncio.sleep(0.5)

        # Mobile Hero Viewport
        await cdp.capture_viewport(OUTPUT_DIR / "25_mobile_home_hero.png")

        # Mobile Menu Aberto
        await cdp.eval("""
            (() => {
                const btn = document.querySelector('.menu-toggle');
                if (btn) btn.click();
            })()
        """)
        await asyncio.sleep(0.4)
        await cdp.capture_viewport(OUTPUT_DIR / "26_mobile_menu_aberto.png")

        # Mobile Modal Distribuidores
        await cdp.eval("""
            (() => {
                const closeMenu = document.querySelector('.menu-toggle');
                if (closeMenu && closeMenu.getAttribute('aria-expanded') === 'true') closeMenu.click();
                const btn = document.getElementById('abrir-modal-distribuidores');
                if (btn) btn.click();
            })()
        """)
        await asyncio.sleep(0.5)
        await cdp.capture_viewport(OUTPUT_DIR / "27_mobile_modal_distribuidores.png")

        print("\nAll screenshots successfully captured!")

    finally:
        await cdp.close()
        chrome.terminate()
        server.terminate()
        shutil.rmtree(perfil, ignore_errors=True)

if __name__ == "__main__":
    asyncio.run(main())
