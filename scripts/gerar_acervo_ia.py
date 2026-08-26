#!/usr/bin/env python3
"""Gera o acervo fotográfico Campo Vivo com a API Gemini (Nano Banana Pro).

Substitui, nos mesmos caminhos, os placeholders criados por
`gerar_placeholders_campo.py`. O site não muda: só os arquivos.

Pré-requisitos:
    pip install google-genai pillow
    export GEMINI_API_KEY="..."

Uso:
    python3 scripts/gerar_acervo_ia.py               # tudo
    python3 scripts/gerar_acervo_ia.py hero especies # só esses grupos
    python3 scripts/gerar_acervo_ia.py --listar

Os prompts seguem a direção de fotografia do sistema:
olhar e interação entre animais, luz natural lateral ou de fim de tarde,
ambiente brasileiro reconhecível, textura real de pelo, solo e vegetação,
e área negativa prevista para o texto e o packshot.

O que a direção proíbe está codificado em NEGATIVO: animal recortado sem
contato com o chão, espécies demais na mesma imagem, iluminação plástica,
cenários estrangeiros, sofrimento animal como apelo.
"""

from __future__ import annotations

import os
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
DESTINO = RAIZ / "assets" / "images" / "campo"

MODELO = "gemini-3-pro-image-preview"

BASE = (
    "Fotografia documental de pecuária brasileira, realista e editorial, "
    "qualidade de campanha publicitária de saúde animal. "
    "Luz natural lateral de fim de tarde, temperatura quente, sombras longas e suaves. "
    "Textura real de pelo, solo e vegetação. Animais visivelmente saudáveis, limpos e fortes. "
    "Profundidade de campo média, fundo legível mas não competindo com o primeiro plano. "
    "Sem qualquer texto, marca d'água, logotipo ou embalagem na imagem."
)

NEGATIVO = (
    "Evitar: animal flutuando ou recortado sem contato com o chão; várias espécies "
    "na mesma imagem; iluminação plástica ou saturação artificial; cenário europeu "
    "ou norte-americano; celeiro de madeira vermelha; neve; animais magros, feridos "
    "ou em sofrimento; pessoas olhando para a câmera; texto sobreposto."
)

# grupo → lista de (caminho relativo, proporção, prompt específico)
ACERVO: dict[str, list[tuple[str, str, str]]] = {
    "hero": [
        (
            "hero/campo-hero-16x9.webp",
            "16:9",
            "Pastagem brasileira ao entardecer com um pequeno grupo de bovinos de corte "
            "avermelhados em primeiro plano à direita, corpo inteiro e cascos firmes no solo. "
            "Metade esquerda do quadro deliberadamente aberta e limpa — céu e pasto — "
            "reservada para título e embalagem. Horizonte baixo, sensação de amplitude.",
        ),
        (
            "hero/campo-hero-4x5.webp",
            "4:5",
            "Mesma pastagem brasileira ao entardecer, enquadramento vertical. "
            "Uma vaca de corte avermelhada centralizada na metade inferior, cascos no solo, "
            "olhando levemente para fora do quadro. Terço superior aberto com céu, "
            "reservado para título.",
        ),
        (
            "hero/campo-hero-poster.webp",
            "16:9",
            "Primeiro frame de um vídeo de pastagem ao entardecer: bovinos de corte ao longe "
            "à direita, capim em movimento suave em primeiro plano, luz rasante. "
            "Metade esquerda aberta. Composição idêntica ao hero horizontal.",
        ),
    ],
    "especies": [
        (
            "especies/bovinos-4x5.webp",
            "4:5",
            "Retrato vertical de uma vaca nelore branca com seu bezerro encostado nela, "
            "pastagem brasileira, luz de fim de tarde. Foco no olhar da matriz e no vínculo "
            "entre os dois animais. Proximidade, ternura e força.",
        ),
        (
            "especies/equinos-4x5.webp",
            "4:5",
            "Retrato vertical de um cavalo marrom de pelagem lustrosa em pastagem brasileira, "
            "crina em movimento, cabeça em três quartos, olhar atento. Luz lateral quente.",
        ),
        (
            "especies/suinos-4x5.webp",
            "4:5",
            "Retrato vertical de suínos saudáveis em baia limpa e bem cuidada de granja "
            "brasileira moderna, luz natural entrando pela lateral. Pele rosada limpa, "
            "ambiente seco e organizado.",
        ),
        (
            "especies/aves-4x5.webp",
            "4:5",
            "Retrato vertical de galinhas poedeiras brancas e ruivas em aviário brasileiro "
            "claro e ventilado, plumagem íntegra, luz natural difusa entrando pelas laterais.",
        ),
        (
            "especies/pet-4x5.webp",
            "4:5",
            "Retrato vertical de um cão de porte médio e um gato juntos em ambiente doméstico "
            "brasileiro com luz natural de janela. Pelagem brilhante, olhar tranquilo, "
            "sensação de cuidado cotidiano.",
        ),
        (
            "especies/caprinos-4x5.webp",
            "4:5",
            "Retrato vertical de cabras leiteiras em terreno semiárido brasileiro com "
            "vegetação de caatinga ao fundo, luz dourada de fim de tarde, olhar curioso.",
        ),
        (
            "especies/ovinos-4x5.webp",
            "4:5",
            "Retrato vertical de ovelhas de lã densa e limpa em pastagem brasileira, "
            "uma matriz com seu cordeiro ao lado, luz suave de manhã.",
        ),
        (
            "especies/bubalinos-4x5.webp",
            "4:5",
            "Retrato vertical de búfalos de pelagem escura em várzea brasileira alagada, "
            "reflexo na água, luz rasante do fim de tarde, presença física imponente.",
        ),
        (
            "especies/peixes-4x5.webp",
            "4:5",
            "Vista vertical de tanque de piscicultura brasileira ao ar livre, tilápias "
            "saudáveis próximas à superfície, água limpa e esverdeada, luz natural refletindo.",
        ),
    ],
    "campanhas": [
        (
            "campanhas/dynamis-16x7.webp",
            "21:9",
            "Bovinos de corte avermelhados em grupo em pastagem brasileira ao entardecer, "
            "posicionados no terço direito do quadro, cascos firmes no solo. "
            "Dois terços à esquerda abertos com pasto e céu, reservados para título e embalagem. "
            "Atmosfera de energia e desempenho, verde-floresta e ocre.",
        ),
        (
            "campanhas/maximo-baby-16x7.webp",
            "21:9",
            "Vaca nelore branca com bezerro recém-nascido ao lado, pastagem brasileira sob "
            "luz clara de manhã, céu azul suave. Animais no terço direito, "
            "dois terços esquerdos abertos. Atmosfera de cuidado, primeira fase e leveza.",
        ),
        (
            "campanhas/entherikos-16x7.webp",
            "21:9",
            "Produtor brasileiro em manejo cuidadoso de bezerros em curral limpo e bem "
            "estruturado, fim de tarde. Cena no terço direito, dois terços esquerdos abertos. "
            "Atmosfera de manejo real, trabalho e equilíbrio.",
        ),
    ],
    "ciencia": [
        (
            "ciencia/laboratorio-3x2.webp",
            "3:2",
            "Laboratório farmacêutico veterinário brasileiro, técnico de jaleco branco e "
            "óculos de proteção manipulando vidraria com precisão. Bancada limpa, "
            "luz fria e controlada, foco curto nas mãos e no material.",
        ),
        (
            "ciencia/assistencia-3x2.webp",
            "3:2",
            "Veterinário brasileiro conversando com produtor rural no curral, prancheta na mão, "
            "bovinos ao fundo desfocados, fim de tarde. Relação de confiança e orientação técnica.",
        ),
        (
            "ciencia/manejo-3x2.webp",
            "3:2",
            "Mãos de produtor rural brasileiro em manejo cuidadoso de um bezerro, "
            "close nas mãos e no pelo do animal, luz natural quente, solo de curral ao fundo.",
        ),
        (
            "ciencia/controle-qualidade-3x2.webp",
            "3:2",
            "Detalhe de controle de qualidade em indústria farmacêutica veterinária: "
            "frascos alinhados em bancada de inox sob luz controlada, mão enluvada conferindo "
            "um deles. Rigor técnico, sem rótulos legíveis.",
        ),
    ],
}


def falta_dependencia(mensagem: str) -> None:
    print(f"\n  {mensagem}\n", file=sys.stderr)
    print("  Para habilitar a geração:", file=sys.stderr)
    print("    pip install google-genai pillow", file=sys.stderr)
    print("    export GEMINI_API_KEY='sua-chave'", file=sys.stderr)
    print("\n  Enquanto isso, os placeholders de", file=sys.stderr)
    print("  scripts/gerar_placeholders_campo.py seguem servindo o site.\n", file=sys.stderr)
    sys.exit(1)


def listar() -> None:
    for grupo, itens in ACERVO.items():
        print(f"\n{grupo}  ({len(itens)} imagens)")
        for caminho, proporcao, _ in itens:
            print(f"  {proporcao:>5}  {caminho}")
    print()


def main() -> None:
    argumentos = [a for a in sys.argv[1:] if not a.startswith("-")]
    if "--listar" in sys.argv:
        listar()
        return

    grupos = argumentos or list(ACERVO)
    desconhecidos = [g for g in grupos if g not in ACERVO]
    if desconhecidos:
        print(f"Grupo desconhecido: {', '.join(desconhecidos)}", file=sys.stderr)
        print(f"Disponíveis: {', '.join(ACERVO)}", file=sys.stderr)
        sys.exit(1)

    chave = os.environ.get("GEMINI_API_KEY")
    if not chave:
        falta_dependencia("GEMINI_API_KEY não está definida no ambiente.")

    try:
        from google import genai
        from google.genai import types
    except ImportError:
        falta_dependencia("O pacote google-genai não está instalado.")

    cliente = genai.Client(api_key=chave)
    total = sum(len(ACERVO[g]) for g in grupos)
    feito = 0

    for grupo in grupos:
        for caminho, proporcao, prompt in ACERVO[grupo]:
            feito += 1
            destino = DESTINO / caminho
            destino.parent.mkdir(parents=True, exist_ok=True)
            print(f"[{feito}/{total}] {caminho} ({proporcao})")

            resposta = cliente.models.generate_content(
                model=MODELO,
                contents=[f"{BASE}\n\n{prompt}\n\n{NEGATIVO}"],
                config=types.GenerateContentConfig(
                    response_modalities=["TEXT", "IMAGE"],
                    image_config=types.ImageConfig(aspect_ratio=proporcao, image_size="2K"),
                ),
            )

            salvou = False
            for parte in resposta.parts:
                if parte.inline_data:
                    imagem = parte.as_image()
                    imagem.convert("RGB").save(destino, "WEBP", quality=84, method=6)
                    print(f"        salvo · {destino.stat().st_size / 1024:.0f} KB")
                    salvou = True
                    break
            if not salvou:
                print("        nenhuma imagem retornada — placeholder mantido", file=sys.stderr)

    print(f"\n{feito} imagens processadas.")
    print("Confira o checklist de mídia do sistema: direitos registrados,")
    print("área segura para texto, alt text revisado e cor consistente entre as peças.")


if __name__ == "__main__":
    main()
