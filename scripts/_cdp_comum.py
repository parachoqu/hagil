"""Infraestrutura compartilhada de captura e validação via CDP.

Extraído de scripts/capture_sections.py para que a captura do refino e a
validação de viewports não repitam o mesmo cliente Chrome DevTools Protocol.
Sem dependência nova: só `websockets`, que o projeto já usa.
"""

import asyncio
import base64
import json
import os
import re
import shutil
import socket
import subprocess
import tempfile
import time
from pathlib import Path

# Loopback nunca passa por proxy. Sem isto o Chromium tenta resolver
# 127.0.0.1 pelo proxy do ambiente e a navegação trava sem mensagem.
os.environ["NO_PROXY"] = "localhost,127.0.0.1,::1"
os.environ["no_proxy"] = "localhost,127.0.0.1,::1"
for _k in ("HTTP_PROXY", "HTTPS_PROXY", "ALL_PROXY",
           "http_proxy", "https_proxy", "all_proxy"):
    os.environ.pop(_k, None)

import websockets  # noqa: E402

RAIZ = Path(__file__).resolve().parent.parent


class CDP:
    def __init__(self, ws_url):
        self.ws_url = ws_url
        self.ws = None
        self.msg_id = 0
        self.pendentes = {}
        self.session_id = None
        self.tarefa = None
        # Tudo que o navegador reportou como problema nesta sessão.
        self.problemas = []

    # ---------- transporte ----------

    async def conectar(self):
        self.ws = await websockets.connect(self.ws_url, max_size=100 * 1024 * 1024)
        self.tarefa = asyncio.create_task(self._escuta())

    async def _escuta(self):
        try:
            async for bruto in self.ws:
                dado = json.loads(bruto)
                if "id" in dado and dado["id"] in self.pendentes:
                    self.pendentes[dado["id"]].set_result(dado)
                    continue
                self._registra_problema(dado)
        except asyncio.CancelledError:
            pass
        except Exception as e:
            print("erro de escuta:", e)

    def _registra_problema(self, dado):
        metodo = dado.get("method")
        p = dado.get("params", {})
        if metodo == "Runtime.exceptionThrown":
            d = p.get("exceptionDetails", {})
            texto = d.get("exception", {}).get("description") or d.get("text", "")
            self.problemas.append(("exception", texto.strip()))
        elif metodo == "Log.entryAdded":
            e = p.get("entry", {})
            if e.get("level") in ("error",):
                self.problemas.append(("log", f"{e.get('source')}: {e.get('text')}"))
        elif metodo == "Runtime.consoleAPICalled":
            if p.get("type") == "error":
                args = " ".join(
                    str(a.get("value", a.get("description", "")))
                    for a in p.get("args", [])
                )
                self.problemas.append(("console", args.strip()))

    async def cmd(self, metodo, params=None, session_id=None):
        self.msg_id += 1
        mid = self.msg_id
        fut = asyncio.get_running_loop().create_future()
        self.pendentes[mid] = fut
        payload = {"id": mid, "method": metodo}
        if params is not None:
            payload["params"] = params
        alvo = session_id or self.session_id
        if alvo:
            payload["sessionId"] = alvo
        await self.ws.send(json.dumps(payload))
        res = await fut
        del self.pendentes[mid]
        if "error" in res:
            raise RuntimeError(f"CDP {metodo}: {res['error']}")
        return res.get("result", {})

    # ---------- página ----------

    async def abrir_pagina(self):
        r = await self.cmd("Target.createTarget", {"url": "about:blank"}, session_id=None)
        r2 = await self.cmd(
            "Target.attachToTarget",
            {"targetId": r["targetId"], "flatten": True},
            session_id=None,
        )
        self.session_id = r2["sessionId"]
        await self.cmd("Page.enable")
        await self.cmd("DOM.enable")
        await self.cmd("Runtime.enable")
        await self.cmd("Log.enable")
        return self.session_id

    async def viewport(self, largura, altura, dsf=2, mobile=False):
        await self.cmd("Emulation.setDeviceMetricsOverride", {
            "width": largura, "height": altura,
            "deviceScaleFactor": dsf, "mobile": mobile,
        })
        await self.cmd("Emulation.setVisibleSize", {"width": largura, "height": altura})

    async def movimento_reduzido(self, ligado):
        await self.cmd("Emulation.setEmulatedMedia", {
            "features": [{"name": "prefers-reduced-motion",
                          "value": "reduce" if ligado else "no-preference"}]
        })

    async def ir(self, url):
        await self.cmd("Page.navigate", {"url": url})
        for _ in range(60):
            if await self.js("document.readyState") == "complete":
                break
            await asyncio.sleep(0.1)
        await self.js("""
            new Promise(async (ok) => {
                try { await document.fonts.ready; } catch(e) {}
                await Promise.all([...document.images].map(i => i.complete
                    ? Promise.resolve()
                    : new Promise(r => { i.onload = r; i.onerror = r; setTimeout(r, 2000); })));
                ok(true);
            })
        """, aguarda=True)
        await asyncio.sleep(0.4)

    async def js(self, expr, aguarda=False):
        r = await self.cmd("Runtime.evaluate", {
            "expression": expr, "returnByValue": True, "awaitPromise": aguarda,
        })
        if "exceptionDetails" in r:
            det = r["exceptionDetails"]
            raise RuntimeError(det.get("exception", {}).get("description", det.get("text")))
        return r.get("result", {}).get("value")

    async def assentar(self):
        """Revela o que depende de IntersectionObserver e zera as animações."""
        await self.js("""
            (() => {
              document.querySelectorAll('[data-reveal], [data-entrada]').forEach(el => {
                el.classList.add('visivel');
              });
              document.querySelectorAll('img[loading="lazy"]').forEach(i => { i.loading = 'eager'; });
              if (!document.getElementById('captura-estatica')) {
                const s = document.createElement('style');
                s.id = 'captura-estatica';
                s.textContent = `.js [data-entrada]{opacity:1!important;animation:none!important;transform:none!important}
                  .js [data-reveal]{opacity:1!important;transform:none!important}
                  *,*::before,*::after{animation-duration:0s!important;transition-duration:0s!important}`;
                document.head.appendChild(s);
              }
            })()
        """)
        for _ in range(40):
            if (await self.js("[...document.images].filter(i => !i.complete).length")) == 0:
                break
            await asyncio.sleep(0.1)
        await asyncio.sleep(0.25)

    # ---------- captura ----------

    async def _png(self, clip=None, alem=True):
        params = {"format": "png", "captureBeyondViewport": alem}
        if clip:
            params["clip"] = clip
        r = await self.cmd("Page.captureScreenshot", params)
        return base64.b64decode(r["data"])

    async def recorta(self, seletor, destino, folga=0):
        caixa = await self.js(f"""
            (() => {{
                const el = document.querySelector({json.dumps(seletor)});
                if (!el) return null;
                el.scrollIntoView({{ block: 'start', inline: 'nearest' }});
                return true;
            }})()
        """)
        if not caixa:
            print(f"  [!] seletor ausente: {seletor}")
            return False
        await asyncio.sleep(0.3)
        caixa = await self.js(f"""
            (() => {{
                const el = document.querySelector({json.dumps(seletor)});
                const r = el.getBoundingClientRect();
                return {{
                    x: Math.max(0, window.scrollX + r.left - {folga}),
                    y: Math.max(0, window.scrollY + r.top - {folga}),
                    width: r.width + {folga} * 2,
                    height: r.height + {folga} * 2
                }};
            }})()
        """)
        dados = await self._png({
            "x": caixa["x"], "y": caixa["y"],
            "width": max(10, caixa["width"]), "height": max(10, caixa["height"]),
            "scale": 1,
        })
        destino.write_bytes(dados)
        print(f"  [ok] {destino.name} ({len(dados):,} B)")
        return True

    async def tela(self, destino):
        destino.write_bytes(await self._png(alem=False))
        print(f"  [ok] {destino.name}")

    async def fechar(self):
        if self.tarefa:
            self.tarefa.cancel()
        if self.ws:
            await self.ws.close()


class Ambiente:
    """Servidor estático + Chromium headless, com limpeza garantida."""

    def __init__(self):
        self.porta = None
        self.servidor = None
        self.chrome = None
        self.perfil = None
        self.cdp = None

    async def __aenter__(self):
        with socket.socket() as s:
            s.bind(("127.0.0.1", 0))
            self.porta = s.getsockname()[1]
        self.servidor = subprocess.Popen(
            ["python3", "-m", "http.server", str(self.porta)],
            cwd=str(RAIZ), stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
        )
        time.sleep(0.6)

        with socket.socket() as s:
            s.bind(("127.0.0.1", 0))
            porta_dbg = s.getsockname()[1]
        # Perfil descartável por execução: um Chromium que não encerrou na
        # rodada anterior deixa um SingletonLock e o novo processo sai na hora.
        self.perfil = tempfile.mkdtemp(prefix="cdp-hagil-")
        self.chrome = subprocess.Popen([
            "/usr/bin/chromium", "--headless=new", "--no-sandbox", "--disable-gpu",
            f"--remote-debugging-port={porta_dbg}",
            f"--user-data-dir={self.perfil}", "about:blank",
        ], stderr=subprocess.PIPE, text=True)

        ws_url = None
        for linha in self.chrome.stderr:
            m = re.search(r"DevTools listening on (ws://\S+)", linha)
            if m:
                ws_url = m.group(1)
                break
        if not ws_url:
            raise RuntimeError("Chromium não expôs o WebSocket do DevTools.")

        self.cdp = CDP(ws_url)
        await self.cdp.conectar()
        await self.cdp.abrir_pagina()
        return self

    def url(self, caminho):
        return f"http://127.0.0.1:{self.porta}/{caminho}"

    async def __aexit__(self, *_):
        if self.cdp:
            await self.cdp.fechar()
        if self.chrome:
            self.chrome.terminate()
        if self.servidor:
            self.servidor.terminate()
        if self.perfil:
            shutil.rmtree(self.perfil, ignore_errors=True)
