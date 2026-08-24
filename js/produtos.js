/* Hágil Terapêutica - catálogo de produtos gerado a partir das imagens finais. */

(function () {
  "use strict";

  const CATEGORIAS = [
    ["todos", "Todos"],
    ["aves", "Aves"],
    ["bovinos", "Bovinos"],
    ["equinos", "Equinos"],
    ["ovinos", "Ovinos"],
    ["suinos", "Suínos"],
    ["pet", "Pet"],
    ["caprinos", "Caprinos"],
    ["bubalinos", "Bubalinos"],
    ["peixes", "Peixes"]
  ];
  const ROTULO = Object.fromEntries(CATEGORIAS);

  const PRODUTOS = [
    {
        "id": "aves-aves-de-corte-curae-hc1000",
        "nome": "Curae HC1000",
        "linha": "Aves de Corte",
        "foto": "assets/images/produtos/Hagil_Aves_Aves de Corte_Curae HC1000.png",
        "frase": "Curae HC1000 para Aves de Corte.",
        "descricao": "Produto Hágil cadastrado na categoria Aves, segmento Aves de Corte. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Aves · Segmento: Aves de Corte.",
        "categorias": [
            "aves"
        ],
        "categoriaRotulo": "Aves",
        "segmento": "Aves de Corte"
    },
    {
        "id": "aves-aves-de-corte-dynamis-mh1000",
        "nome": "Dynamis MH1000",
        "linha": "Aves de Corte",
        "foto": "assets/images/produtos/Hagil_Aves_Aves de Corte_Dynamis MH1000.png",
        "frase": "Dynamis MH1000 para Aves de Corte.",
        "descricao": "Produto Hágil cadastrado na categoria Aves, segmento Aves de Corte. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Aves · Segmento: Aves de Corte.",
        "categorias": [
            "aves"
        ],
        "categoriaRotulo": "Aves",
        "segmento": "Aves de Corte"
    },
    {
        "id": "aves-aves-de-corte-endecthon-hp1000",
        "nome": "Endecthon HP1000",
        "linha": "Aves de Corte",
        "foto": "assets/images/produtos/Hagil_Aves_Aves de Corte_Endecthon HP1000.png",
        "frase": "Endecthon HP1000 para Aves de Corte.",
        "descricao": "Produto Hágil cadastrado na categoria Aves, segmento Aves de Corte. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Aves · Segmento: Aves de Corte.",
        "categorias": [
            "aves"
        ],
        "categoriaRotulo": "Aves",
        "segmento": "Aves de Corte"
    },
    {
        "id": "aves-aves-de-corte-hepathor-h1000",
        "nome": "Hepathor H1000",
        "linha": "Aves de Corte",
        "foto": "assets/images/produtos/Hagil_Aves_Aves de Corte_Hepathor H1000.png",
        "frase": "Hepathor H1000 para Aves de Corte.",
        "descricao": "Produto Hágil cadastrado na categoria Aves, segmento Aves de Corte. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Aves · Segmento: Aves de Corte.",
        "categorias": [
            "aves"
        ],
        "categoriaRotulo": "Aves",
        "segmento": "Aves de Corte"
    },
    {
        "id": "aves-aves-de-corte-macru-h1000",
        "nome": "Macru H1000",
        "linha": "Aves de Corte",
        "foto": "assets/images/produtos/Hagil_Aves_Aves de Corte_Macru H1000.png",
        "frase": "Macru H1000 para Aves de Corte.",
        "descricao": "Produto Hágil cadastrado na categoria Aves, segmento Aves de Corte. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Aves · Segmento: Aves de Corte.",
        "categorias": [
            "aves"
        ],
        "categoriaRotulo": "Aves",
        "segmento": "Aves de Corte"
    },
    {
        "id": "aves-aves-de-corte-maximo-l-h1000",
        "nome": "Máximo L H1000",
        "linha": "Aves de Corte",
        "foto": "assets/images/produtos/Hagil_Aves_Aves de Corte_Máximo L H1000.png",
        "frase": "Máximo L H1000 para Aves de Corte.",
        "descricao": "Produto Hágil cadastrado na categoria Aves, segmento Aves de Corte. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Aves · Segmento: Aves de Corte.",
        "categorias": [
            "aves"
        ],
        "categoriaRotulo": "Aves",
        "segmento": "Aves de Corte"
    },
    {
        "id": "aves-aves-de-corte-verruther-hp1000",
        "nome": "Verruther HP1000",
        "linha": "Aves de Corte",
        "foto": "assets/images/produtos/Hagil_Aves_Aves de Corte_Verruther HP1000.png",
        "frase": "Verruther HP1000 para Aves de Corte.",
        "descricao": "Produto Hágil cadastrado na categoria Aves, segmento Aves de Corte. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Aves · Segmento: Aves de Corte.",
        "categorias": [
            "aves"
        ],
        "categoriaRotulo": "Aves",
        "segmento": "Aves de Corte"
    },
    {
        "id": "aves-aves-de-postura-ciclantur-h1000",
        "nome": "Ciclantur H1000",
        "linha": "Aves de Postura",
        "foto": "assets/images/produtos/Hagil_Aves_Aves de Postura_Ciclantur H1000.png",
        "frase": "Ciclantur H1000 para Aves de Postura.",
        "descricao": "Produto Hágil cadastrado na categoria Aves, segmento Aves de Postura. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Aves · Segmento: Aves de Postura.",
        "categorias": [
            "aves"
        ],
        "categoriaRotulo": "Aves",
        "segmento": "Aves de Postura"
    },
    {
        "id": "aves-aves-de-postura-curae-hc1000",
        "nome": "Curae HC1000",
        "linha": "Aves de Postura",
        "foto": "assets/images/produtos/Hagil_Aves_Aves de Postura_Curae HC1000.png",
        "frase": "Curae HC1000 para Aves de Postura.",
        "descricao": "Produto Hágil cadastrado na categoria Aves, segmento Aves de Postura. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Aves · Segmento: Aves de Postura.",
        "categorias": [
            "aves"
        ],
        "categoriaRotulo": "Aves",
        "segmento": "Aves de Postura"
    },
    {
        "id": "aves-aves-de-postura-dynamis-mh1000",
        "nome": "Dynamis MH1000",
        "linha": "Aves de Postura",
        "foto": "assets/images/produtos/Hagil_Aves_Aves de Postura_Dynamis MH1000.png",
        "frase": "Dynamis MH1000 para Aves de Postura.",
        "descricao": "Produto Hágil cadastrado na categoria Aves, segmento Aves de Postura. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Aves · Segmento: Aves de Postura.",
        "categorias": [
            "aves"
        ],
        "categoriaRotulo": "Aves",
        "segmento": "Aves de Postura"
    },
    {
        "id": "aves-aves-de-postura-endecthon-hp1000",
        "nome": "Endecthon HP1000",
        "linha": "Aves de Postura",
        "foto": "assets/images/produtos/Hagil_Aves_Aves de Postura_Endecthon HP1000.png",
        "frase": "Endecthon HP1000 para Aves de Postura.",
        "descricao": "Produto Hágil cadastrado na categoria Aves, segmento Aves de Postura. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Aves · Segmento: Aves de Postura.",
        "categorias": [
            "aves"
        ],
        "categoriaRotulo": "Aves",
        "segmento": "Aves de Postura"
    },
    {
        "id": "aves-aves-de-postura-hepathor-h1000",
        "nome": "Hepathor H1000",
        "linha": "Aves de Postura",
        "foto": "assets/images/produtos/Hagil_Aves_Aves de Postura_Hepathor H1000.png",
        "frase": "Hepathor H1000 para Aves de Postura.",
        "descricao": "Produto Hágil cadastrado na categoria Aves, segmento Aves de Postura. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Aves · Segmento: Aves de Postura.",
        "categorias": [
            "aves"
        ],
        "categoriaRotulo": "Aves",
        "segmento": "Aves de Postura"
    },
    {
        "id": "aves-aves-de-postura-macru-h1000",
        "nome": "Macru H1000",
        "linha": "Aves de Postura",
        "foto": "assets/images/produtos/Hagil_Aves_Aves de Postura_Macru H1000.png",
        "frase": "Macru H1000 para Aves de Postura.",
        "descricao": "Produto Hágil cadastrado na categoria Aves, segmento Aves de Postura. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Aves · Segmento: Aves de Postura.",
        "categorias": [
            "aves"
        ],
        "categoriaRotulo": "Aves",
        "segmento": "Aves de Postura"
    },
    {
        "id": "aves-aves-de-postura-maximo-l-h1000",
        "nome": "Máximo L H1000",
        "linha": "Aves de Postura",
        "foto": "assets/images/produtos/Hagil_Aves_Aves de Postura_Máximo L H1000.png",
        "frase": "Máximo L H1000 para Aves de Postura.",
        "descricao": "Produto Hágil cadastrado na categoria Aves, segmento Aves de Postura. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Aves · Segmento: Aves de Postura.",
        "categorias": [
            "aves"
        ],
        "categoriaRotulo": "Aves",
        "segmento": "Aves de Postura"
    },
    {
        "id": "aves-aves-de-postura-verruther-hp1000",
        "nome": "Verruther HP1000",
        "linha": "Aves de Postura",
        "foto": "assets/images/produtos/Hagil_Aves_Aves de Postura_Verruther HP1000.png",
        "frase": "Verruther HP1000 para Aves de Postura.",
        "descricao": "Produto Hágil cadastrado na categoria Aves, segmento Aves de Postura. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Aves · Segmento: Aves de Postura.",
        "categorias": [
            "aves"
        ],
        "categoriaRotulo": "Aves",
        "segmento": "Aves de Postura"
    },
    {
        "id": "bovinos-bovinos-1a-fase-aliviatto",
        "nome": "Aliviatto",
        "linha": "Bovinos 1ª Fase",
        "foto": "assets/images/produtos/Hagil_Bovinos_Bovinos 1ª Fase_Aliviatto.png",
        "frase": "Aliviatto para Bovinos 1ª Fase.",
        "descricao": "Produto Hágil cadastrado na categoria Bovinos, segmento Bovinos 1ª Fase. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bovinos · Segmento: Bovinos 1ª Fase.",
        "categorias": [
            "bovinos"
        ],
        "categoriaRotulo": "Bovinos",
        "segmento": "Bovinos 1ª Fase"
    },
    {
        "id": "bovinos-bovinos-1a-fase-curae-hc1000",
        "nome": "Curae HC1000",
        "linha": "Bovinos 1ª Fase",
        "foto": "assets/images/produtos/Hagil_Bovinos_Bovinos 1ª Fase_Curae HC1000.png",
        "frase": "Curae HC1000 para Bovinos 1ª Fase.",
        "descricao": "Produto Hágil cadastrado na categoria Bovinos, segmento Bovinos 1ª Fase. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bovinos · Segmento: Bovinos 1ª Fase.",
        "categorias": [
            "bovinos"
        ],
        "categoriaRotulo": "Bovinos",
        "segmento": "Bovinos 1ª Fase"
    },
    {
        "id": "bovinos-bovinos-1a-fase-dynamis-mh1000",
        "nome": "Dynamis MH1000",
        "linha": "Bovinos 1ª Fase",
        "foto": "assets/images/produtos/Hagil_Bovinos_Bovinos 1ª Fase_Dynamis MH1000.png",
        "frase": "Dynamis MH1000 para Bovinos 1ª Fase.",
        "descricao": "Produto Hágil cadastrado na categoria Bovinos, segmento Bovinos 1ª Fase. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bovinos · Segmento: Bovinos 1ª Fase.",
        "categorias": [
            "bovinos"
        ],
        "categoriaRotulo": "Bovinos",
        "segmento": "Bovinos 1ª Fase"
    },
    {
        "id": "bovinos-bovinos-1a-fase-ecthon-hb1000",
        "nome": "Ecthon HB1000",
        "linha": "Bovinos 1ª Fase",
        "foto": "assets/images/produtos/Hagil_Bovinos_Bovinos 1ª Fase_Ecthon HB1000.png",
        "frase": "Ecthon HB1000 para Bovinos 1ª Fase.",
        "descricao": "Produto Hágil cadastrado na categoria Bovinos, segmento Bovinos 1ª Fase. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bovinos · Segmento: Bovinos 1ª Fase.",
        "categorias": [
            "bovinos"
        ],
        "categoriaRotulo": "Bovinos",
        "segmento": "Bovinos 1ª Fase"
    },
    {
        "id": "bovinos-bovinos-1a-fase-ecthon-pour-on",
        "nome": "Ecthon Pour-On",
        "linha": "Bovinos 1ª Fase",
        "foto": "assets/images/produtos/Hagil_Bovinos_Bovinos 1ª Fase_Ecthon Pour-On.png",
        "frase": "Ecthon Pour-On para Bovinos 1ª Fase.",
        "descricao": "Produto Hágil cadastrado na categoria Bovinos, segmento Bovinos 1ª Fase. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bovinos · Segmento: Bovinos 1ª Fase.",
        "categorias": [
            "bovinos"
        ],
        "categoriaRotulo": "Bovinos",
        "segmento": "Bovinos 1ª Fase"
    },
    {
        "id": "bovinos-bovinos-1a-fase-endecthon-hp1000",
        "nome": "Endecthon HP1000",
        "linha": "Bovinos 1ª Fase",
        "foto": "assets/images/produtos/Hagil_Bovinos_Bovinos 1ª Fase_Endecthon HP1000.png",
        "frase": "Endecthon HP1000 para Bovinos 1ª Fase.",
        "descricao": "Produto Hágil cadastrado na categoria Bovinos, segmento Bovinos 1ª Fase. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bovinos · Segmento: Bovinos 1ª Fase.",
        "categorias": [
            "bovinos"
        ],
        "categoriaRotulo": "Bovinos",
        "segmento": "Bovinos 1ª Fase"
    },
    {
        "id": "bovinos-bovinos-1a-fase-entherikos",
        "nome": "Enthérikos",
        "linha": "Bovinos 1ª Fase",
        "foto": "assets/images/produtos/Hagil_Bovinos_Bovinos 1ª Fase_Enthérikos.png",
        "frase": "Enthérikos para Bovinos 1ª Fase.",
        "descricao": "Produto Hágil cadastrado na categoria Bovinos, segmento Bovinos 1ª Fase. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bovinos · Segmento: Bovinos 1ª Fase.",
        "categorias": [
            "bovinos"
        ],
        "categoriaRotulo": "Bovinos",
        "segmento": "Bovinos 1ª Fase"
    },
    {
        "id": "bovinos-bovinos-1a-fase-hepathor-h1000",
        "nome": "Hepathor H1000",
        "linha": "Bovinos 1ª Fase",
        "foto": "assets/images/produtos/Hagil_Bovinos_Bovinos 1ª Fase_Hepathor H1000.png",
        "frase": "Hepathor H1000 para Bovinos 1ª Fase.",
        "descricao": "Produto Hágil cadastrado na categoria Bovinos, segmento Bovinos 1ª Fase. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bovinos · Segmento: Bovinos 1ª Fase.",
        "categorias": [
            "bovinos"
        ],
        "categoriaRotulo": "Bovinos",
        "segmento": "Bovinos 1ª Fase"
    },
    {
        "id": "bovinos-bovinos-1a-fase-macru-h1000",
        "nome": "Macru H1000",
        "linha": "Bovinos 1ª Fase",
        "foto": "assets/images/produtos/Hagil_Bovinos_Bovinos 1ª Fase_Macru H1000.png",
        "frase": "Macru H1000 para Bovinos 1ª Fase.",
        "descricao": "Produto Hágil cadastrado na categoria Bovinos, segmento Bovinos 1ª Fase. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bovinos · Segmento: Bovinos 1ª Fase.",
        "categorias": [
            "bovinos"
        ],
        "categoriaRotulo": "Bovinos",
        "segmento": "Bovinos 1ª Fase"
    },
    {
        "id": "bovinos-bovinos-1a-fase-maximo-baby-h1000",
        "nome": "Máximo Baby H1000",
        "linha": "Bovinos 1ª Fase",
        "foto": "assets/images/produtos/Hagil_Bovinos_Bovinos 1ª Fase_Máximo Baby H1000.png",
        "frase": "Máximo Baby H1000 para Bovinos 1ª Fase.",
        "descricao": "Produto Hágil cadastrado na categoria Bovinos, segmento Bovinos 1ª Fase. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bovinos · Segmento: Bovinos 1ª Fase.",
        "categorias": [
            "bovinos"
        ],
        "categoriaRotulo": "Bovinos",
        "segmento": "Bovinos 1ª Fase"
    },
    {
        "id": "bovinos-bovinos-1a-fase-verruther-hp1000",
        "nome": "Verruther HP1000",
        "linha": "Bovinos 1ª Fase",
        "foto": "assets/images/produtos/Hagil_Bovinos_Bovinos 1ª Fase_Verruther HP1000.png",
        "frase": "Verruther HP1000 para Bovinos 1ª Fase.",
        "descricao": "Produto Hágil cadastrado na categoria Bovinos, segmento Bovinos 1ª Fase. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bovinos · Segmento: Bovinos 1ª Fase.",
        "categorias": [
            "bovinos"
        ],
        "categoriaRotulo": "Bovinos",
        "segmento": "Bovinos 1ª Fase"
    },
    {
        "id": "bovinos-bovinos-de-corte-aliviatto",
        "nome": "Aliviatto",
        "linha": "Bovinos de Corte",
        "foto": "assets/images/produtos/Hagil_Bovinos_Bovinos de Corte_Aliviatto.png",
        "frase": "Aliviatto para Bovinos de Corte.",
        "descricao": "Produto Hágil cadastrado na categoria Bovinos, segmento Bovinos de Corte. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bovinos · Segmento: Bovinos de Corte.",
        "categorias": [
            "bovinos"
        ],
        "categoriaRotulo": "Bovinos",
        "segmento": "Bovinos de Corte"
    },
    {
        "id": "bovinos-bovinos-de-corte-ciclantur-h1000",
        "nome": "Ciclantur H1000",
        "linha": "Bovinos de Corte",
        "foto": "assets/images/produtos/Hagil_Bovinos_Bovinos de Corte_Ciclantur H1000.png",
        "frase": "Ciclantur H1000 para Bovinos de Corte.",
        "descricao": "Produto Hágil cadastrado na categoria Bovinos, segmento Bovinos de Corte. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bovinos · Segmento: Bovinos de Corte.",
        "categorias": [
            "bovinos"
        ],
        "categoriaRotulo": "Bovinos",
        "segmento": "Bovinos de Corte"
    },
    {
        "id": "bovinos-bovinos-de-corte-curae-hc1000",
        "nome": "Curae HC1000",
        "linha": "Bovinos de Corte",
        "foto": "assets/images/produtos/Hagil_Bovinos_Bovinos de Corte_Curae HC1000.png",
        "frase": "Curae HC1000 para Bovinos de Corte.",
        "descricao": "Produto Hágil cadastrado na categoria Bovinos, segmento Bovinos de Corte. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bovinos · Segmento: Bovinos de Corte.",
        "categorias": [
            "bovinos"
        ],
        "categoriaRotulo": "Bovinos",
        "segmento": "Bovinos de Corte"
    },
    {
        "id": "bovinos-bovinos-de-corte-dynamis-mh1000",
        "nome": "Dynamis MH1000",
        "linha": "Bovinos de Corte",
        "foto": "assets/images/produtos/Hagil_Bovinos_Bovinos de Corte_Dynamis MH1000.png",
        "frase": "Dynamis MH1000 para Bovinos de Corte.",
        "descricao": "Produto Hágil cadastrado na categoria Bovinos, segmento Bovinos de Corte. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bovinos · Segmento: Bovinos de Corte.",
        "categorias": [
            "bovinos"
        ],
        "categoriaRotulo": "Bovinos",
        "segmento": "Bovinos de Corte"
    },
    {
        "id": "bovinos-bovinos-de-corte-ecthon-hb1000",
        "nome": "Ecthon HB1000",
        "linha": "Bovinos de Corte",
        "foto": "assets/images/produtos/Hagil_Bovinos_Bovinos de Corte_Ecthon HB1000.png",
        "frase": "Ecthon HB1000 para Bovinos de Corte.",
        "descricao": "Produto Hágil cadastrado na categoria Bovinos, segmento Bovinos de Corte. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bovinos · Segmento: Bovinos de Corte.",
        "categorias": [
            "bovinos"
        ],
        "categoriaRotulo": "Bovinos",
        "segmento": "Bovinos de Corte"
    },
    {
        "id": "bovinos-bovinos-de-corte-ecthon-pour-on",
        "nome": "Ecthon Pour-On",
        "linha": "Bovinos de Corte",
        "foto": "assets/images/produtos/Hagil_Bovinos_Bovinos de Corte_Ecthon Pour-On.png",
        "frase": "Ecthon Pour-On para Bovinos de Corte.",
        "descricao": "Produto Hágil cadastrado na categoria Bovinos, segmento Bovinos de Corte. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bovinos · Segmento: Bovinos de Corte.",
        "categorias": [
            "bovinos"
        ],
        "categoriaRotulo": "Bovinos",
        "segmento": "Bovinos de Corte"
    },
    {
        "id": "bovinos-bovinos-de-corte-endecthon-hp1000",
        "nome": "Endecthon HP1000",
        "linha": "Bovinos de Corte",
        "foto": "assets/images/produtos/Hagil_Bovinos_Bovinos de Corte_Endecthon HP1000.png",
        "frase": "Endecthon HP1000 para Bovinos de Corte.",
        "descricao": "Produto Hágil cadastrado na categoria Bovinos, segmento Bovinos de Corte. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bovinos · Segmento: Bovinos de Corte.",
        "categorias": [
            "bovinos"
        ],
        "categoriaRotulo": "Bovinos",
        "segmento": "Bovinos de Corte"
    },
    {
        "id": "bovinos-bovinos-de-corte-entherikos",
        "nome": "Enthérikos",
        "linha": "Bovinos de Corte",
        "foto": "assets/images/produtos/Hagil_Bovinos_Bovinos de Corte_Enthérikos.png",
        "frase": "Enthérikos para Bovinos de Corte.",
        "descricao": "Produto Hágil cadastrado na categoria Bovinos, segmento Bovinos de Corte. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bovinos · Segmento: Bovinos de Corte.",
        "categorias": [
            "bovinos"
        ],
        "categoriaRotulo": "Bovinos",
        "segmento": "Bovinos de Corte"
    },
    {
        "id": "bovinos-bovinos-de-corte-hepathor-h1000",
        "nome": "Hepathor H1000",
        "linha": "Bovinos de Corte",
        "foto": "assets/images/produtos/Hagil_Bovinos_Bovinos de Corte_Hepathor H1000.png",
        "frase": "Hepathor H1000 para Bovinos de Corte.",
        "descricao": "Produto Hágil cadastrado na categoria Bovinos, segmento Bovinos de Corte. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bovinos · Segmento: Bovinos de Corte.",
        "categorias": [
            "bovinos"
        ],
        "categoriaRotulo": "Bovinos",
        "segmento": "Bovinos de Corte"
    },
    {
        "id": "bovinos-bovinos-de-corte-macru-h1000",
        "nome": "Macru H1000",
        "linha": "Bovinos de Corte",
        "foto": "assets/images/produtos/Hagil_Bovinos_Bovinos de Corte_Macru H1000.png",
        "frase": "Macru H1000 para Bovinos de Corte.",
        "descricao": "Produto Hágil cadastrado na categoria Bovinos, segmento Bovinos de Corte. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bovinos · Segmento: Bovinos de Corte.",
        "categorias": [
            "bovinos"
        ],
        "categoriaRotulo": "Bovinos",
        "segmento": "Bovinos de Corte"
    },
    {
        "id": "bovinos-bovinos-de-corte-masthe-hmc1000",
        "nome": "Masthe HMC1000",
        "linha": "Bovinos de Corte",
        "foto": "assets/images/produtos/Hagil_Bovinos_Bovinos de Corte_Masthe HMC1000.png",
        "frase": "Masthe HMC1000 para Bovinos de Corte.",
        "descricao": "Produto Hágil cadastrado na categoria Bovinos, segmento Bovinos de Corte. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bovinos · Segmento: Bovinos de Corte.",
        "categorias": [
            "bovinos"
        ],
        "categoriaRotulo": "Bovinos",
        "segmento": "Bovinos de Corte"
    },
    {
        "id": "bovinos-bovinos-de-corte-maximo-c-h1000",
        "nome": "Máximo C H1000",
        "linha": "Bovinos de Corte",
        "foto": "assets/images/produtos/Hagil_Bovinos_Bovinos de Corte_Máximo C H1000.png",
        "frase": "Máximo C H1000 para Bovinos de Corte.",
        "descricao": "Produto Hágil cadastrado na categoria Bovinos, segmento Bovinos de Corte. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bovinos · Segmento: Bovinos de Corte.",
        "categorias": [
            "bovinos"
        ],
        "categoriaRotulo": "Bovinos",
        "segmento": "Bovinos de Corte"
    },
    {
        "id": "bovinos-bovinos-de-corte-maximo-l-h1000",
        "nome": "Máximo L H1000",
        "linha": "Bovinos de Corte",
        "foto": "assets/images/produtos/Hagil_Bovinos_Bovinos de Corte_Máximo L H1000.png",
        "frase": "Máximo L H1000 para Bovinos de Corte.",
        "descricao": "Produto Hágil cadastrado na categoria Bovinos, segmento Bovinos de Corte. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bovinos · Segmento: Bovinos de Corte.",
        "categorias": [
            "bovinos"
        ],
        "categoriaRotulo": "Bovinos",
        "segmento": "Bovinos de Corte"
    },
    {
        "id": "bovinos-bovinos-de-corte-reproducao-gold",
        "nome": "Reprodução Gold",
        "linha": "Bovinos de Corte",
        "foto": "assets/images/produtos/Hagil_Bovinos_Bovinos de Corte_Reprodução Gold.png",
        "frase": "Reprodução Gold para Bovinos de Corte.",
        "descricao": "Produto Hágil cadastrado na categoria Bovinos, segmento Bovinos de Corte. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bovinos · Segmento: Bovinos de Corte.",
        "categorias": [
            "bovinos"
        ],
        "categoriaRotulo": "Bovinos",
        "segmento": "Bovinos de Corte"
    },
    {
        "id": "bovinos-bovinos-de-corte-verruther-hp1000",
        "nome": "Verruther HP1000",
        "linha": "Bovinos de Corte",
        "foto": "assets/images/produtos/Hagil_Bovinos_Bovinos de Corte_Verruther HP1000.png",
        "frase": "Verruther HP1000 para Bovinos de Corte.",
        "descricao": "Produto Hágil cadastrado na categoria Bovinos, segmento Bovinos de Corte. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bovinos · Segmento: Bovinos de Corte.",
        "categorias": [
            "bovinos"
        ],
        "categoriaRotulo": "Bovinos",
        "segmento": "Bovinos de Corte"
    },
    {
        "id": "bovinos-bovinos-de-leite-aliviatto",
        "nome": "Aliviatto",
        "linha": "Bovinos de Leite",
        "foto": "assets/images/produtos/Hagil_Bovinos_Bovinos de Leite_Aliviatto.png",
        "frase": "Aliviatto para Bovinos de Leite.",
        "descricao": "Produto Hágil cadastrado na categoria Bovinos, segmento Bovinos de Leite. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bovinos · Segmento: Bovinos de Leite.",
        "categorias": [
            "bovinos"
        ],
        "categoriaRotulo": "Bovinos",
        "segmento": "Bovinos de Leite"
    },
    {
        "id": "bovinos-bovinos-de-leite-ciclantur-h1000",
        "nome": "Ciclantur H1000",
        "linha": "Bovinos de Leite",
        "foto": "assets/images/produtos/Hagil_Bovinos_Bovinos de Leite_Ciclantur H1000.png",
        "frase": "Ciclantur H1000 para Bovinos de Leite.",
        "descricao": "Produto Hágil cadastrado na categoria Bovinos, segmento Bovinos de Leite. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bovinos · Segmento: Bovinos de Leite.",
        "categorias": [
            "bovinos"
        ],
        "categoriaRotulo": "Bovinos",
        "segmento": "Bovinos de Leite"
    },
    {
        "id": "bovinos-bovinos-de-leite-dynamis-mh1000",
        "nome": "Dynamis MH1000",
        "linha": "Bovinos de Leite",
        "foto": "assets/images/produtos/Hagil_Bovinos_Bovinos de Leite_Dynamis MH1000.png",
        "frase": "Dynamis MH1000 para Bovinos de Leite.",
        "descricao": "Produto Hágil cadastrado na categoria Bovinos, segmento Bovinos de Leite. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bovinos · Segmento: Bovinos de Leite.",
        "categorias": [
            "bovinos"
        ],
        "categoriaRotulo": "Bovinos",
        "segmento": "Bovinos de Leite"
    },
    {
        "id": "bovinos-bovinos-de-leite-ecthon-hb1000",
        "nome": "Ecthon HB1000",
        "linha": "Bovinos de Leite",
        "foto": "assets/images/produtos/Hagil_Bovinos_Bovinos de Leite_Ecthon HB1000.png",
        "frase": "Ecthon HB1000 para Bovinos de Leite.",
        "descricao": "Produto Hágil cadastrado na categoria Bovinos, segmento Bovinos de Leite. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bovinos · Segmento: Bovinos de Leite.",
        "categorias": [
            "bovinos"
        ],
        "categoriaRotulo": "Bovinos",
        "segmento": "Bovinos de Leite"
    },
    {
        "id": "bovinos-bovinos-de-leite-ecthon-pour-on",
        "nome": "Ecthon Pour-On",
        "linha": "Bovinos de Leite",
        "foto": "assets/images/produtos/Hagil_Bovinos_Bovinos de Leite_Ecthon Pour-On.png",
        "frase": "Ecthon Pour-On para Bovinos de Leite.",
        "descricao": "Produto Hágil cadastrado na categoria Bovinos, segmento Bovinos de Leite. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bovinos · Segmento: Bovinos de Leite.",
        "categorias": [
            "bovinos"
        ],
        "categoriaRotulo": "Bovinos",
        "segmento": "Bovinos de Leite"
    },
    {
        "id": "bovinos-bovinos-de-leite-endecthon-hp1000",
        "nome": "Endecthon HP1000",
        "linha": "Bovinos de Leite",
        "foto": "assets/images/produtos/Hagil_Bovinos_Bovinos de Leite_Endecthon HP1000.png",
        "frase": "Endecthon HP1000 para Bovinos de Leite.",
        "descricao": "Produto Hágil cadastrado na categoria Bovinos, segmento Bovinos de Leite. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bovinos · Segmento: Bovinos de Leite.",
        "categorias": [
            "bovinos"
        ],
        "categoriaRotulo": "Bovinos",
        "segmento": "Bovinos de Leite"
    },
    {
        "id": "bovinos-bovinos-de-leite-entherikos",
        "nome": "Enthérikos",
        "linha": "Bovinos de Leite",
        "foto": "assets/images/produtos/Hagil_Bovinos_Bovinos de Leite_Enthérikos.png",
        "frase": "Enthérikos para Bovinos de Leite.",
        "descricao": "Produto Hágil cadastrado na categoria Bovinos, segmento Bovinos de Leite. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bovinos · Segmento: Bovinos de Leite.",
        "categorias": [
            "bovinos"
        ],
        "categoriaRotulo": "Bovinos",
        "segmento": "Bovinos de Leite"
    },
    {
        "id": "bovinos-bovinos-de-leite-hepathor-h1000",
        "nome": "Hepathor H1000",
        "linha": "Bovinos de Leite",
        "foto": "assets/images/produtos/Hagil_Bovinos_Bovinos de Leite_Hepathor H1000.png",
        "frase": "Hepathor H1000 para Bovinos de Leite.",
        "descricao": "Produto Hágil cadastrado na categoria Bovinos, segmento Bovinos de Leite. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bovinos · Segmento: Bovinos de Leite.",
        "categorias": [
            "bovinos"
        ],
        "categoriaRotulo": "Bovinos",
        "segmento": "Bovinos de Leite"
    },
    {
        "id": "bovinos-bovinos-de-leite-intramasthe-10",
        "nome": "IntraMasthe 10",
        "linha": "Bovinos de Leite",
        "foto": "assets/images/produtos/Hagil_Bovinos_Bovinos de Leite_IntraMasthe 10.png",
        "frase": "IntraMasthe 10 para Bovinos de Leite.",
        "descricao": "Produto Hágil cadastrado na categoria Bovinos, segmento Bovinos de Leite. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bovinos · Segmento: Bovinos de Leite.",
        "categorias": [
            "bovinos"
        ],
        "categoriaRotulo": "Bovinos",
        "segmento": "Bovinos de Leite"
    },
    {
        "id": "bovinos-bovinos-de-leite-macru-h1000",
        "nome": "Macru H1000",
        "linha": "Bovinos de Leite",
        "foto": "assets/images/produtos/Hagil_Bovinos_Bovinos de Leite_Macru H1000.png",
        "frase": "Macru H1000 para Bovinos de Leite.",
        "descricao": "Produto Hágil cadastrado na categoria Bovinos, segmento Bovinos de Leite. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bovinos · Segmento: Bovinos de Leite.",
        "categorias": [
            "bovinos"
        ],
        "categoriaRotulo": "Bovinos",
        "segmento": "Bovinos de Leite"
    },
    {
        "id": "bovinos-bovinos-de-leite-masthe-hmc1000",
        "nome": "Masthe HMC1000",
        "linha": "Bovinos de Leite",
        "foto": "assets/images/produtos/Hagil_Bovinos_Bovinos de Leite_Masthe HMC1000.png",
        "frase": "Masthe HMC1000 para Bovinos de Leite.",
        "descricao": "Produto Hágil cadastrado na categoria Bovinos, segmento Bovinos de Leite. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bovinos · Segmento: Bovinos de Leite.",
        "categorias": [
            "bovinos"
        ],
        "categoriaRotulo": "Bovinos",
        "segmento": "Bovinos de Leite"
    },
    {
        "id": "bovinos-bovinos-de-leite-maximo-l-h1000",
        "nome": "Máximo L H1000",
        "linha": "Bovinos de Leite",
        "foto": "assets/images/produtos/Hagil_Bovinos_Bovinos de Leite_Máximo L H1000.png",
        "frase": "Máximo L H1000 para Bovinos de Leite.",
        "descricao": "Produto Hágil cadastrado na categoria Bovinos, segmento Bovinos de Leite. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bovinos · Segmento: Bovinos de Leite.",
        "categorias": [
            "bovinos"
        ],
        "categoriaRotulo": "Bovinos",
        "segmento": "Bovinos de Leite"
    },
    {
        "id": "bovinos-bovinos-de-leite-qualis-h1000",
        "nome": "Qualis H1000",
        "linha": "Bovinos de Leite",
        "foto": "assets/images/produtos/Hagil_Bovinos_Bovinos de Leite_Qualis H1000.png",
        "frase": "Qualis H1000 para Bovinos de Leite.",
        "descricao": "Produto Hágil cadastrado na categoria Bovinos, segmento Bovinos de Leite. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bovinos · Segmento: Bovinos de Leite.",
        "categorias": [
            "bovinos"
        ],
        "categoriaRotulo": "Bovinos",
        "segmento": "Bovinos de Leite"
    },
    {
        "id": "bovinos-bovinos-de-leite-reproducao-gold",
        "nome": "Reprodução Gold",
        "linha": "Bovinos de Leite",
        "foto": "assets/images/produtos/Hagil_Bovinos_Bovinos de Leite_Reprodução Gold.png",
        "frase": "Reprodução Gold para Bovinos de Leite.",
        "descricao": "Produto Hágil cadastrado na categoria Bovinos, segmento Bovinos de Leite. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bovinos · Segmento: Bovinos de Leite.",
        "categorias": [
            "bovinos"
        ],
        "categoriaRotulo": "Bovinos",
        "segmento": "Bovinos de Leite"
    },
    {
        "id": "bovinos-bovinos-de-leite-verruther-hp1000",
        "nome": "Verruther HP1000",
        "linha": "Bovinos de Leite",
        "foto": "assets/images/produtos/Hagil_Bovinos_Bovinos de Leite_Verruther HP1000.png",
        "frase": "Verruther HP1000 para Bovinos de Leite.",
        "descricao": "Produto Hágil cadastrado na categoria Bovinos, segmento Bovinos de Leite. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bovinos · Segmento: Bovinos de Leite.",
        "categorias": [
            "bovinos"
        ],
        "categoriaRotulo": "Bovinos",
        "segmento": "Bovinos de Leite"
    },
    {
        "id": "bubalinos-aliviatto",
        "nome": "Aliviatto",
        "linha": "Linha Bubalinos",
        "foto": "assets/images/produtos/Hagil_Bubalinos_Aliviatto.png",
        "frase": "Aliviatto para Bubalinos.",
        "descricao": "Produto Hágil cadastrado na categoria Bubalinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bubalinos.",
        "categorias": [
            "bubalinos"
        ],
        "categoriaRotulo": "Bubalinos",
        "segmento": ""
    },
    {
        "id": "bubalinos-ciclantur-h1000",
        "nome": "Ciclantur H1000",
        "linha": "Linha Bubalinos",
        "foto": "assets/images/produtos/Hagil_Bubalinos_Ciclantur H1000.png",
        "frase": "Ciclantur H1000 para Bubalinos.",
        "descricao": "Produto Hágil cadastrado na categoria Bubalinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bubalinos.",
        "categorias": [
            "bubalinos"
        ],
        "categoriaRotulo": "Bubalinos",
        "segmento": ""
    },
    {
        "id": "bubalinos-curae-hc1000",
        "nome": "Curae HC1000",
        "linha": "Linha Bubalinos",
        "foto": "assets/images/produtos/Hagil_Bubalinos_Curae HC1000.png",
        "frase": "Curae HC1000 para Bubalinos.",
        "descricao": "Produto Hágil cadastrado na categoria Bubalinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bubalinos.",
        "categorias": [
            "bubalinos"
        ],
        "categoriaRotulo": "Bubalinos",
        "segmento": ""
    },
    {
        "id": "bubalinos-dynamis-mh1000",
        "nome": "Dynamis MH1000",
        "linha": "Linha Bubalinos",
        "foto": "assets/images/produtos/Hagil_Bubalinos_Dynamis MH1000.png",
        "frase": "Dynamis MH1000 para Bubalinos.",
        "descricao": "Produto Hágil cadastrado na categoria Bubalinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bubalinos.",
        "categorias": [
            "bubalinos"
        ],
        "categoriaRotulo": "Bubalinos",
        "segmento": ""
    },
    {
        "id": "bubalinos-ecthon-hb1000",
        "nome": "Ecthon HB1000",
        "linha": "Linha Bubalinos",
        "foto": "assets/images/produtos/Hagil_Bubalinos_Ecthon HB1000.png",
        "frase": "Ecthon HB1000 para Bubalinos.",
        "descricao": "Produto Hágil cadastrado na categoria Bubalinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bubalinos.",
        "categorias": [
            "bubalinos"
        ],
        "categoriaRotulo": "Bubalinos",
        "segmento": ""
    },
    {
        "id": "bubalinos-ecthon-pour-on",
        "nome": "Ecthon Pour-On",
        "linha": "Linha Bubalinos",
        "foto": "assets/images/produtos/Hagil_Bubalinos_Ecthon Pour-On.png",
        "frase": "Ecthon Pour-On para Bubalinos.",
        "descricao": "Produto Hágil cadastrado na categoria Bubalinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bubalinos.",
        "categorias": [
            "bubalinos"
        ],
        "categoriaRotulo": "Bubalinos",
        "segmento": ""
    },
    {
        "id": "bubalinos-endecthon-hp1000",
        "nome": "Endecthon HP1000",
        "linha": "Linha Bubalinos",
        "foto": "assets/images/produtos/Hagil_Bubalinos_Endecthon HP1000.png",
        "frase": "Endecthon HP1000 para Bubalinos.",
        "descricao": "Produto Hágil cadastrado na categoria Bubalinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bubalinos.",
        "categorias": [
            "bubalinos"
        ],
        "categoriaRotulo": "Bubalinos",
        "segmento": ""
    },
    {
        "id": "bubalinos-entherikos",
        "nome": "Enthérikos",
        "linha": "Linha Bubalinos",
        "foto": "assets/images/produtos/Hagil_Bubalinos_Enthérikos.png",
        "frase": "Enthérikos para Bubalinos.",
        "descricao": "Produto Hágil cadastrado na categoria Bubalinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bubalinos.",
        "categorias": [
            "bubalinos"
        ],
        "categoriaRotulo": "Bubalinos",
        "segmento": ""
    },
    {
        "id": "bubalinos-hepathor-h1000",
        "nome": "Hepathor H1000",
        "linha": "Linha Bubalinos",
        "foto": "assets/images/produtos/Hagil_Bubalinos_Hepathor H1000.png",
        "frase": "Hepathor H1000 para Bubalinos.",
        "descricao": "Produto Hágil cadastrado na categoria Bubalinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bubalinos.",
        "categorias": [
            "bubalinos"
        ],
        "categoriaRotulo": "Bubalinos",
        "segmento": ""
    },
    {
        "id": "bubalinos-macru-h1000",
        "nome": "Macru H1000",
        "linha": "Linha Bubalinos",
        "foto": "assets/images/produtos/Hagil_Bubalinos_Macru H1000.png",
        "frase": "Macru H1000 para Bubalinos.",
        "descricao": "Produto Hágil cadastrado na categoria Bubalinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bubalinos.",
        "categorias": [
            "bubalinos"
        ],
        "categoriaRotulo": "Bubalinos",
        "segmento": ""
    },
    {
        "id": "bubalinos-masthe-hmc1000",
        "nome": "Masthe HMC1000",
        "linha": "Linha Bubalinos",
        "foto": "assets/images/produtos/Hagil_Bubalinos_Masthe HMC1000.png",
        "frase": "Masthe HMC1000 para Bubalinos.",
        "descricao": "Produto Hágil cadastrado na categoria Bubalinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bubalinos.",
        "categorias": [
            "bubalinos"
        ],
        "categoriaRotulo": "Bubalinos",
        "segmento": ""
    },
    {
        "id": "bubalinos-maximo-baby-h1000",
        "nome": "Máximo Baby H1000",
        "linha": "Linha Bubalinos",
        "foto": "assets/images/produtos/Hagil_Bubalinos_Máximo Baby H1000.png",
        "frase": "Máximo Baby H1000 para Bubalinos.",
        "descricao": "Produto Hágil cadastrado na categoria Bubalinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bubalinos.",
        "categorias": [
            "bubalinos"
        ],
        "categoriaRotulo": "Bubalinos",
        "segmento": ""
    },
    {
        "id": "bubalinos-maximo-c-h1000",
        "nome": "Máximo C H1000",
        "linha": "Linha Bubalinos",
        "foto": "assets/images/produtos/Hagil_Bubalinos_Máximo C H1000.png",
        "frase": "Máximo C H1000 para Bubalinos.",
        "descricao": "Produto Hágil cadastrado na categoria Bubalinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bubalinos.",
        "categorias": [
            "bubalinos"
        ],
        "categoriaRotulo": "Bubalinos",
        "segmento": ""
    },
    {
        "id": "bubalinos-maximo-l-h1000",
        "nome": "Máximo L H1000",
        "linha": "Linha Bubalinos",
        "foto": "assets/images/produtos/Hagil_Bubalinos_Máximo L H1000.png",
        "frase": "Máximo L H1000 para Bubalinos.",
        "descricao": "Produto Hágil cadastrado na categoria Bubalinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bubalinos.",
        "categorias": [
            "bubalinos"
        ],
        "categoriaRotulo": "Bubalinos",
        "segmento": ""
    },
    {
        "id": "bubalinos-qualis-h1000",
        "nome": "Qualis H1000",
        "linha": "Linha Bubalinos",
        "foto": "assets/images/produtos/Hagil_Bubalinos_Qualis H1000.png",
        "frase": "Qualis H1000 para Bubalinos.",
        "descricao": "Produto Hágil cadastrado na categoria Bubalinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bubalinos.",
        "categorias": [
            "bubalinos"
        ],
        "categoriaRotulo": "Bubalinos",
        "segmento": ""
    },
    {
        "id": "bubalinos-reproducao-gold",
        "nome": "Reprodução Gold",
        "linha": "Linha Bubalinos",
        "foto": "assets/images/produtos/Hagil_Bubalinos_Reprodução Gold.png",
        "frase": "Reprodução Gold para Bubalinos.",
        "descricao": "Produto Hágil cadastrado na categoria Bubalinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bubalinos.",
        "categorias": [
            "bubalinos"
        ],
        "categoriaRotulo": "Bubalinos",
        "segmento": ""
    },
    {
        "id": "bubalinos-verruther-hp1000",
        "nome": "Verruther HP1000",
        "linha": "Linha Bubalinos",
        "foto": "assets/images/produtos/Hagil_Bubalinos_Verruther HP1000.png",
        "frase": "Verruther HP1000 para Bubalinos.",
        "descricao": "Produto Hágil cadastrado na categoria Bubalinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bubalinos.",
        "categorias": [
            "bubalinos"
        ],
        "categoriaRotulo": "Bubalinos",
        "segmento": ""
    },
    {
        "id": "bubalinos-intramasthe-10",
        "nome": "intramasthe-10",
        "linha": "Linha Bubalinos",
        "foto": "assets/images/produtos/Hagil_Bubalinos_intramasthe-10.png",
        "frase": "intramasthe-10 para Bubalinos.",
        "descricao": "Produto Hágil cadastrado na categoria Bubalinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Bubalinos.",
        "categorias": [
            "bubalinos"
        ],
        "categoriaRotulo": "Bubalinos",
        "segmento": ""
    },
    {
        "id": "caprinos-aliviatto",
        "nome": "Aliviatto",
        "linha": "Linha Caprinos",
        "foto": "assets/images/produtos/Hagil_Caprinos_Aliviatto.png",
        "frase": "Aliviatto para Caprinos.",
        "descricao": "Produto Hágil cadastrado na categoria Caprinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Caprinos.",
        "categorias": [
            "caprinos"
        ],
        "categoriaRotulo": "Caprinos",
        "segmento": ""
    },
    {
        "id": "caprinos-ciclantur-h1000",
        "nome": "Ciclantur H1000",
        "linha": "Linha Caprinos",
        "foto": "assets/images/produtos/Hagil_Caprinos_Ciclantur H1000.png",
        "frase": "Ciclantur H1000 para Caprinos.",
        "descricao": "Produto Hágil cadastrado na categoria Caprinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Caprinos.",
        "categorias": [
            "caprinos"
        ],
        "categoriaRotulo": "Caprinos",
        "segmento": ""
    },
    {
        "id": "caprinos-curae-hc1000",
        "nome": "Curae HC1000",
        "linha": "Linha Caprinos",
        "foto": "assets/images/produtos/Hagil_Caprinos_Curae HC1000.png",
        "frase": "Curae HC1000 para Caprinos.",
        "descricao": "Produto Hágil cadastrado na categoria Caprinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Caprinos.",
        "categorias": [
            "caprinos"
        ],
        "categoriaRotulo": "Caprinos",
        "segmento": ""
    },
    {
        "id": "caprinos-dynamis-mh1000",
        "nome": "Dynamis MH1000",
        "linha": "Linha Caprinos",
        "foto": "assets/images/produtos/Hagil_Caprinos_Dynamis MH1000.png",
        "frase": "Dynamis MH1000 para Caprinos.",
        "descricao": "Produto Hágil cadastrado na categoria Caprinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Caprinos.",
        "categorias": [
            "caprinos"
        ],
        "categoriaRotulo": "Caprinos",
        "segmento": ""
    },
    {
        "id": "caprinos-ecthon-hb1000",
        "nome": "Ecthon HB1000",
        "linha": "Linha Caprinos",
        "foto": "assets/images/produtos/Hagil_Caprinos_Ecthon HB1000.png",
        "frase": "Ecthon HB1000 para Caprinos.",
        "descricao": "Produto Hágil cadastrado na categoria Caprinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Caprinos.",
        "categorias": [
            "caprinos"
        ],
        "categoriaRotulo": "Caprinos",
        "segmento": ""
    },
    {
        "id": "caprinos-ecthon-pour-on",
        "nome": "Ecthon Pour-On",
        "linha": "Linha Caprinos",
        "foto": "assets/images/produtos/Hagil_Caprinos_Ecthon Pour-On.png",
        "frase": "Ecthon Pour-On para Caprinos.",
        "descricao": "Produto Hágil cadastrado na categoria Caprinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Caprinos.",
        "categorias": [
            "caprinos"
        ],
        "categoriaRotulo": "Caprinos",
        "segmento": ""
    },
    {
        "id": "caprinos-endecthon-hp1000",
        "nome": "Endecthon HP1000",
        "linha": "Linha Caprinos",
        "foto": "assets/images/produtos/Hagil_Caprinos_Endecthon HP1000.png",
        "frase": "Endecthon HP1000 para Caprinos.",
        "descricao": "Produto Hágil cadastrado na categoria Caprinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Caprinos.",
        "categorias": [
            "caprinos"
        ],
        "categoriaRotulo": "Caprinos",
        "segmento": ""
    },
    {
        "id": "caprinos-entherikos",
        "nome": "Enthérikos",
        "linha": "Linha Caprinos",
        "foto": "assets/images/produtos/Hagil_Caprinos_Enthérikos.png",
        "frase": "Enthérikos para Caprinos.",
        "descricao": "Produto Hágil cadastrado na categoria Caprinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Caprinos.",
        "categorias": [
            "caprinos"
        ],
        "categoriaRotulo": "Caprinos",
        "segmento": ""
    },
    {
        "id": "caprinos-hepathor-h1000",
        "nome": "Hepathor H1000",
        "linha": "Linha Caprinos",
        "foto": "assets/images/produtos/Hagil_Caprinos_Hepathor H1000.png",
        "frase": "Hepathor H1000 para Caprinos.",
        "descricao": "Produto Hágil cadastrado na categoria Caprinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Caprinos.",
        "categorias": [
            "caprinos"
        ],
        "categoriaRotulo": "Caprinos",
        "segmento": ""
    },
    {
        "id": "caprinos-macru-h1000",
        "nome": "Macru H1000",
        "linha": "Linha Caprinos",
        "foto": "assets/images/produtos/Hagil_Caprinos_Macru H1000.png",
        "frase": "Macru H1000 para Caprinos.",
        "descricao": "Produto Hágil cadastrado na categoria Caprinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Caprinos.",
        "categorias": [
            "caprinos"
        ],
        "categoriaRotulo": "Caprinos",
        "segmento": ""
    },
    {
        "id": "caprinos-masthe-hmc1000",
        "nome": "Masthe HMC1000",
        "linha": "Linha Caprinos",
        "foto": "assets/images/produtos/Hagil_Caprinos_Masthe HMC1000.png",
        "frase": "Masthe HMC1000 para Caprinos.",
        "descricao": "Produto Hágil cadastrado na categoria Caprinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Caprinos.",
        "categorias": [
            "caprinos"
        ],
        "categoriaRotulo": "Caprinos",
        "segmento": ""
    },
    {
        "id": "caprinos-maximo-baby-h1000",
        "nome": "Máximo Baby H1000",
        "linha": "Linha Caprinos",
        "foto": "assets/images/produtos/Hagil_Caprinos_Máximo Baby H1000.png",
        "frase": "Máximo Baby H1000 para Caprinos.",
        "descricao": "Produto Hágil cadastrado na categoria Caprinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Caprinos.",
        "categorias": [
            "caprinos"
        ],
        "categoriaRotulo": "Caprinos",
        "segmento": ""
    },
    {
        "id": "caprinos-maximo-c-h1000",
        "nome": "Máximo C H1000",
        "linha": "Linha Caprinos",
        "foto": "assets/images/produtos/Hagil_Caprinos_Máximo C H1000.png",
        "frase": "Máximo C H1000 para Caprinos.",
        "descricao": "Produto Hágil cadastrado na categoria Caprinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Caprinos.",
        "categorias": [
            "caprinos"
        ],
        "categoriaRotulo": "Caprinos",
        "segmento": ""
    },
    {
        "id": "caprinos-maximo-l-h1000",
        "nome": "Máximo L H1000",
        "linha": "Linha Caprinos",
        "foto": "assets/images/produtos/Hagil_Caprinos_Máximo L H1000.png",
        "frase": "Máximo L H1000 para Caprinos.",
        "descricao": "Produto Hágil cadastrado na categoria Caprinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Caprinos.",
        "categorias": [
            "caprinos"
        ],
        "categoriaRotulo": "Caprinos",
        "segmento": ""
    },
    {
        "id": "caprinos-reproducao-gold",
        "nome": "Reprodução Gold",
        "linha": "Linha Caprinos",
        "foto": "assets/images/produtos/Hagil_Caprinos_Reprodução Gold.png",
        "frase": "Reprodução Gold para Caprinos.",
        "descricao": "Produto Hágil cadastrado na categoria Caprinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Caprinos.",
        "categorias": [
            "caprinos"
        ],
        "categoriaRotulo": "Caprinos",
        "segmento": ""
    },
    {
        "id": "caprinos-verruther-hp1000",
        "nome": "Verruther HP1000",
        "linha": "Linha Caprinos",
        "foto": "assets/images/produtos/Hagil_Caprinos_Verruther HP1000.png",
        "frase": "Verruther HP1000 para Caprinos.",
        "descricao": "Produto Hágil cadastrado na categoria Caprinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Caprinos.",
        "categorias": [
            "caprinos"
        ],
        "categoriaRotulo": "Caprinos",
        "segmento": ""
    },
    {
        "id": "caprinos-virtus-hv1000",
        "nome": "Virtus HV1000",
        "linha": "Linha Caprinos",
        "foto": "assets/images/produtos/Hagil_Caprinos_Virtus HV1000.png",
        "frase": "Virtus HV1000 para Caprinos.",
        "descricao": "Produto Hágil cadastrado na categoria Caprinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Caprinos.",
        "categorias": [
            "caprinos"
        ],
        "categoriaRotulo": "Caprinos",
        "segmento": ""
    },
    {
        "id": "caprinos-intramasthe-10",
        "nome": "intramasthe-10",
        "linha": "Linha Caprinos",
        "foto": "assets/images/produtos/Hagil_Caprinos_intramasthe-10.png",
        "frase": "intramasthe-10 para Caprinos.",
        "descricao": "Produto Hágil cadastrado na categoria Caprinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Caprinos.",
        "categorias": [
            "caprinos"
        ],
        "categoriaRotulo": "Caprinos",
        "segmento": ""
    },
    {
        "id": "equinos-aliviatto",
        "nome": "Aliviatto",
        "linha": "Linha Equinos",
        "foto": "assets/images/produtos/Hagil_Equinos_Aliviatto.png",
        "frase": "Aliviatto para Equinos.",
        "descricao": "Produto Hágil cadastrado na categoria Equinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Equinos.",
        "categorias": [
            "equinos"
        ],
        "categoriaRotulo": "Equinos",
        "segmento": ""
    },
    {
        "id": "equinos-ciclantur-h1000",
        "nome": "Ciclantur H1000",
        "linha": "Linha Equinos",
        "foto": "assets/images/produtos/Hagil_Equinos_Ciclantur H1000.png",
        "frase": "Ciclantur H1000 para Equinos.",
        "descricao": "Produto Hágil cadastrado na categoria Equinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Equinos.",
        "categorias": [
            "equinos"
        ],
        "categoriaRotulo": "Equinos",
        "segmento": ""
    },
    {
        "id": "equinos-curae-hc1000",
        "nome": "Curae HC1000",
        "linha": "Linha Equinos",
        "foto": "assets/images/produtos/Hagil_Equinos_Curae HC1000.png",
        "frase": "Curae HC1000 para Equinos.",
        "descricao": "Produto Hágil cadastrado na categoria Equinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Equinos.",
        "categorias": [
            "equinos"
        ],
        "categoriaRotulo": "Equinos",
        "segmento": ""
    },
    {
        "id": "equinos-dynamis-mh1000",
        "nome": "Dynamis MH1000",
        "linha": "Linha Equinos",
        "foto": "assets/images/produtos/Hagil_Equinos_Dynamis MH1000.png",
        "frase": "Dynamis MH1000 para Equinos.",
        "descricao": "Produto Hágil cadastrado na categoria Equinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Equinos.",
        "categorias": [
            "equinos"
        ],
        "categoriaRotulo": "Equinos",
        "segmento": ""
    },
    {
        "id": "equinos-ecthon-hb1000",
        "nome": "Ecthon HB1000",
        "linha": "Linha Equinos",
        "foto": "assets/images/produtos/Hagil_Equinos_Ecthon HB1000.png",
        "frase": "Ecthon HB1000 para Equinos.",
        "descricao": "Produto Hágil cadastrado na categoria Equinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Equinos.",
        "categorias": [
            "equinos"
        ],
        "categoriaRotulo": "Equinos",
        "segmento": ""
    },
    {
        "id": "equinos-ecthon-pour-on",
        "nome": "Ecthon Pour-On",
        "linha": "Linha Equinos",
        "foto": "assets/images/produtos/Hagil_Equinos_Ecthon Pour-On.png",
        "frase": "Ecthon Pour-On para Equinos.",
        "descricao": "Produto Hágil cadastrado na categoria Equinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Equinos.",
        "categorias": [
            "equinos"
        ],
        "categoriaRotulo": "Equinos",
        "segmento": ""
    },
    {
        "id": "equinos-endecthon-hp1000",
        "nome": "Endecthon HP1000",
        "linha": "Linha Equinos",
        "foto": "assets/images/produtos/Hagil_Equinos_Endecthon HP1000.png",
        "frase": "Endecthon HP1000 para Equinos.",
        "descricao": "Produto Hágil cadastrado na categoria Equinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Equinos.",
        "categorias": [
            "equinos"
        ],
        "categoriaRotulo": "Equinos",
        "segmento": ""
    },
    {
        "id": "equinos-entherikos",
        "nome": "Enthérikos",
        "linha": "Linha Equinos",
        "foto": "assets/images/produtos/Hagil_Equinos_Enthérikos.png",
        "frase": "Enthérikos para Equinos.",
        "descricao": "Produto Hágil cadastrado na categoria Equinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Equinos.",
        "categorias": [
            "equinos"
        ],
        "categoriaRotulo": "Equinos",
        "segmento": ""
    },
    {
        "id": "equinos-hepathor-h1000",
        "nome": "Hepathor H1000",
        "linha": "Linha Equinos",
        "foto": "assets/images/produtos/Hagil_Equinos_Hepathor H1000.png",
        "frase": "Hepathor H1000 para Equinos.",
        "descricao": "Produto Hágil cadastrado na categoria Equinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Equinos.",
        "categorias": [
            "equinos"
        ],
        "categoriaRotulo": "Equinos",
        "segmento": ""
    },
    {
        "id": "equinos-macru-h1000",
        "nome": "Macru H1000",
        "linha": "Linha Equinos",
        "foto": "assets/images/produtos/Hagil_Equinos_Macru H1000.png",
        "frase": "Macru H1000 para Equinos.",
        "descricao": "Produto Hágil cadastrado na categoria Equinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Equinos.",
        "categorias": [
            "equinos"
        ],
        "categoriaRotulo": "Equinos",
        "segmento": ""
    },
    {
        "id": "equinos-masthe-hmc1000",
        "nome": "Masthe HMC1000",
        "linha": "Linha Equinos",
        "foto": "assets/images/produtos/Hagil_Equinos_Masthe HMC1000.png",
        "frase": "Masthe HMC1000 para Equinos.",
        "descricao": "Produto Hágil cadastrado na categoria Equinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Equinos.",
        "categorias": [
            "equinos"
        ],
        "categoriaRotulo": "Equinos",
        "segmento": ""
    },
    {
        "id": "equinos-maximo-baby-h1000",
        "nome": "Máximo Baby H1000",
        "linha": "Linha Equinos",
        "foto": "assets/images/produtos/Hagil_Equinos_Máximo Baby H1000.png",
        "frase": "Máximo Baby H1000 para Equinos.",
        "descricao": "Produto Hágil cadastrado na categoria Equinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Equinos.",
        "categorias": [
            "equinos"
        ],
        "categoriaRotulo": "Equinos",
        "segmento": ""
    },
    {
        "id": "equinos-maximo-c-h1000",
        "nome": "Máximo C H1000",
        "linha": "Linha Equinos",
        "foto": "assets/images/produtos/Hagil_Equinos_Máximo C H1000.png",
        "frase": "Máximo C H1000 para Equinos.",
        "descricao": "Produto Hágil cadastrado na categoria Equinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Equinos.",
        "categorias": [
            "equinos"
        ],
        "categoriaRotulo": "Equinos",
        "segmento": ""
    },
    {
        "id": "equinos-maximo-l-h1000",
        "nome": "Máximo L H1000",
        "linha": "Linha Equinos",
        "foto": "assets/images/produtos/Hagil_Equinos_Máximo L H1000.png",
        "frase": "Máximo L H1000 para Equinos.",
        "descricao": "Produto Hágil cadastrado na categoria Equinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Equinos.",
        "categorias": [
            "equinos"
        ],
        "categoriaRotulo": "Equinos",
        "segmento": ""
    },
    {
        "id": "equinos-reproducao-gold",
        "nome": "Reprodução Gold",
        "linha": "Linha Equinos",
        "foto": "assets/images/produtos/Hagil_Equinos_Reprodução Gold.png",
        "frase": "Reprodução Gold para Equinos.",
        "descricao": "Produto Hágil cadastrado na categoria Equinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Equinos.",
        "categorias": [
            "equinos"
        ],
        "categoriaRotulo": "Equinos",
        "segmento": ""
    },
    {
        "id": "equinos-verruther-hp1000",
        "nome": "Verruther HP1000",
        "linha": "Linha Equinos",
        "foto": "assets/images/produtos/Hagil_Equinos_Verruther HP1000.png",
        "frase": "Verruther HP1000 para Equinos.",
        "descricao": "Produto Hágil cadastrado na categoria Equinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Equinos.",
        "categorias": [
            "equinos"
        ],
        "categoriaRotulo": "Equinos",
        "segmento": ""
    },
    {
        "id": "equinos-intramasthe-10",
        "nome": "intramasthe-10",
        "linha": "Linha Equinos",
        "foto": "assets/images/produtos/Hagil_Equinos_intramasthe-10.png",
        "frase": "intramasthe-10 para Equinos.",
        "descricao": "Produto Hágil cadastrado na categoria Equinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Equinos.",
        "categorias": [
            "equinos"
        ],
        "categoriaRotulo": "Equinos",
        "segmento": ""
    },
    {
        "id": "ovinos-aliviatto",
        "nome": "Aliviatto",
        "linha": "Linha Ovinos",
        "foto": "assets/images/produtos/Hagil_Ovinos_Aliviatto.png",
        "frase": "Aliviatto para Ovinos.",
        "descricao": "Produto Hágil cadastrado na categoria Ovinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Ovinos.",
        "categorias": [
            "ovinos"
        ],
        "categoriaRotulo": "Ovinos",
        "segmento": ""
    },
    {
        "id": "ovinos-ciclantur-h1000",
        "nome": "Ciclantur H1000",
        "linha": "Linha Ovinos",
        "foto": "assets/images/produtos/Hagil_Ovinos_Ciclantur H1000.png",
        "frase": "Ciclantur H1000 para Ovinos.",
        "descricao": "Produto Hágil cadastrado na categoria Ovinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Ovinos.",
        "categorias": [
            "ovinos"
        ],
        "categoriaRotulo": "Ovinos",
        "segmento": ""
    },
    {
        "id": "ovinos-curae-hc1000",
        "nome": "Curae HC1000",
        "linha": "Linha Ovinos",
        "foto": "assets/images/produtos/Hagil_Ovinos_Curae HC1000.png",
        "frase": "Curae HC1000 para Ovinos.",
        "descricao": "Produto Hágil cadastrado na categoria Ovinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Ovinos.",
        "categorias": [
            "ovinos"
        ],
        "categoriaRotulo": "Ovinos",
        "segmento": ""
    },
    {
        "id": "ovinos-dynamis-mh1000",
        "nome": "Dynamis MH1000",
        "linha": "Linha Ovinos",
        "foto": "assets/images/produtos/Hagil_Ovinos_Dynamis MH1000.png",
        "frase": "Dynamis MH1000 para Ovinos.",
        "descricao": "Produto Hágil cadastrado na categoria Ovinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Ovinos.",
        "categorias": [
            "ovinos"
        ],
        "categoriaRotulo": "Ovinos",
        "segmento": ""
    },
    {
        "id": "ovinos-endecthon-hp1000",
        "nome": "Endecthon HP1000",
        "linha": "Linha Ovinos",
        "foto": "assets/images/produtos/Hagil_Ovinos_Endecthon HP1000.png",
        "frase": "Endecthon HP1000 para Ovinos.",
        "descricao": "Produto Hágil cadastrado na categoria Ovinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Ovinos.",
        "categorias": [
            "ovinos"
        ],
        "categoriaRotulo": "Ovinos",
        "segmento": ""
    },
    {
        "id": "ovinos-entherikos",
        "nome": "Enthérikos",
        "linha": "Linha Ovinos",
        "foto": "assets/images/produtos/Hagil_Ovinos_Enthérikos.png",
        "frase": "Enthérikos para Ovinos.",
        "descricao": "Produto Hágil cadastrado na categoria Ovinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Ovinos.",
        "categorias": [
            "ovinos"
        ],
        "categoriaRotulo": "Ovinos",
        "segmento": ""
    },
    {
        "id": "ovinos-hepathor-h1000",
        "nome": "Hepathor H1000",
        "linha": "Linha Ovinos",
        "foto": "assets/images/produtos/Hagil_Ovinos_Hepathor H1000.png",
        "frase": "Hepathor H1000 para Ovinos.",
        "descricao": "Produto Hágil cadastrado na categoria Ovinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Ovinos.",
        "categorias": [
            "ovinos"
        ],
        "categoriaRotulo": "Ovinos",
        "segmento": ""
    },
    {
        "id": "ovinos-intramasthe-10",
        "nome": "IntraMasthe 10",
        "linha": "Linha Ovinos",
        "foto": "assets/images/produtos/Hagil_Ovinos_IntraMasthe 10.png",
        "frase": "IntraMasthe 10 para Ovinos.",
        "descricao": "Produto Hágil cadastrado na categoria Ovinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Ovinos.",
        "categorias": [
            "ovinos"
        ],
        "categoriaRotulo": "Ovinos",
        "segmento": ""
    },
    {
        "id": "ovinos-macru-h1000",
        "nome": "Macru H1000",
        "linha": "Linha Ovinos",
        "foto": "assets/images/produtos/Hagil_Ovinos_Macru H1000.png",
        "frase": "Macru H1000 para Ovinos.",
        "descricao": "Produto Hágil cadastrado na categoria Ovinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Ovinos.",
        "categorias": [
            "ovinos"
        ],
        "categoriaRotulo": "Ovinos",
        "segmento": ""
    },
    {
        "id": "ovinos-masthe-hmc1000",
        "nome": "Masthe HMC1000",
        "linha": "Linha Ovinos",
        "foto": "assets/images/produtos/Hagil_Ovinos_Masthe HMC1000.png",
        "frase": "Masthe HMC1000 para Ovinos.",
        "descricao": "Produto Hágil cadastrado na categoria Ovinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Ovinos.",
        "categorias": [
            "ovinos"
        ],
        "categoriaRotulo": "Ovinos",
        "segmento": ""
    },
    {
        "id": "ovinos-maximo-baby-h1000",
        "nome": "Máximo Baby H1000",
        "linha": "Linha Ovinos",
        "foto": "assets/images/produtos/Hagil_Ovinos_Máximo Baby H1000.png",
        "frase": "Máximo Baby H1000 para Ovinos.",
        "descricao": "Produto Hágil cadastrado na categoria Ovinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Ovinos.",
        "categorias": [
            "ovinos"
        ],
        "categoriaRotulo": "Ovinos",
        "segmento": ""
    },
    {
        "id": "ovinos-maximo-c-h1000",
        "nome": "Máximo C H1000",
        "linha": "Linha Ovinos",
        "foto": "assets/images/produtos/Hagil_Ovinos_Máximo C H1000.png",
        "frase": "Máximo C H1000 para Ovinos.",
        "descricao": "Produto Hágil cadastrado na categoria Ovinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Ovinos.",
        "categorias": [
            "ovinos"
        ],
        "categoriaRotulo": "Ovinos",
        "segmento": ""
    },
    {
        "id": "ovinos-maximo-l-h1000",
        "nome": "Máximo L H1000",
        "linha": "Linha Ovinos",
        "foto": "assets/images/produtos/Hagil_Ovinos_Máximo L H1000.png",
        "frase": "Máximo L H1000 para Ovinos.",
        "descricao": "Produto Hágil cadastrado na categoria Ovinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Ovinos.",
        "categorias": [
            "ovinos"
        ],
        "categoriaRotulo": "Ovinos",
        "segmento": ""
    },
    {
        "id": "ovinos-reproducao-gold",
        "nome": "Reprodução Gold",
        "linha": "Linha Ovinos",
        "foto": "assets/images/produtos/Hagil_Ovinos_Reprodução Gold.png",
        "frase": "Reprodução Gold para Ovinos.",
        "descricao": "Produto Hágil cadastrado na categoria Ovinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Ovinos.",
        "categorias": [
            "ovinos"
        ],
        "categoriaRotulo": "Ovinos",
        "segmento": ""
    },
    {
        "id": "ovinos-verruther-hp1000",
        "nome": "Verruther HP1000",
        "linha": "Linha Ovinos",
        "foto": "assets/images/produtos/Hagil_Ovinos_Verruther HP1000.png",
        "frase": "Verruther HP1000 para Ovinos.",
        "descricao": "Produto Hágil cadastrado na categoria Ovinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Ovinos.",
        "categorias": [
            "ovinos"
        ],
        "categoriaRotulo": "Ovinos",
        "segmento": ""
    },
    {
        "id": "ovinos-virtus-hv1000",
        "nome": "Virtus HV1000",
        "linha": "Linha Ovinos",
        "foto": "assets/images/produtos/Hagil_Ovinos_Virtus HV1000.png",
        "frase": "Virtus HV1000 para Ovinos.",
        "descricao": "Produto Hágil cadastrado na categoria Ovinos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Ovinos.",
        "categorias": [
            "ovinos"
        ],
        "categoriaRotulo": "Ovinos",
        "segmento": ""
    },
    {
        "id": "peixes-curae-hc1000",
        "nome": "Curae HC1000",
        "linha": "Linha Peixes",
        "foto": "assets/images/produtos/Hagil_Peixes_Curae HC1000.png",
        "frase": "Curae HC1000 para Peixes.",
        "descricao": "Produto Hágil cadastrado na categoria Peixes. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Peixes.",
        "categorias": [
            "peixes"
        ],
        "categoriaRotulo": "Peixes",
        "segmento": ""
    },
    {
        "id": "peixes-dynamis-mh1000",
        "nome": "Dynamis MH1000",
        "linha": "Linha Peixes",
        "foto": "assets/images/produtos/Hagil_Peixes_Dynamis MH1000.png",
        "frase": "Dynamis MH1000 para Peixes.",
        "descricao": "Produto Hágil cadastrado na categoria Peixes. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Peixes.",
        "categorias": [
            "peixes"
        ],
        "categoriaRotulo": "Peixes",
        "segmento": ""
    },
    {
        "id": "peixes-endecthon-hp1000",
        "nome": "Endecthon HP1000",
        "linha": "Linha Peixes",
        "foto": "assets/images/produtos/Hagil_Peixes_Endecthon HP1000.png",
        "frase": "Endecthon HP1000 para Peixes.",
        "descricao": "Produto Hágil cadastrado na categoria Peixes. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Peixes.",
        "categorias": [
            "peixes"
        ],
        "categoriaRotulo": "Peixes",
        "segmento": ""
    },
    {
        "id": "peixes-hmais-h1000",
        "nome": "HMAIS H1000",
        "linha": "Linha Peixes",
        "foto": "assets/images/produtos/Hagil_Peixes_HMAIS H1000.png",
        "frase": "HMAIS H1000 para Peixes.",
        "descricao": "Produto Hágil cadastrado na categoria Peixes. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Peixes.",
        "categorias": [
            "peixes"
        ],
        "categoriaRotulo": "Peixes",
        "segmento": ""
    },
    {
        "id": "peixes-hepathor-h1000",
        "nome": "Hepathor H1000",
        "linha": "Linha Peixes",
        "foto": "assets/images/produtos/Hagil_Peixes_Hepathor H1000.png",
        "frase": "Hepathor H1000 para Peixes.",
        "descricao": "Produto Hágil cadastrado na categoria Peixes. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Peixes.",
        "categorias": [
            "peixes"
        ],
        "categoriaRotulo": "Peixes",
        "segmento": ""
    },
    {
        "id": "peixes-macru-h1000",
        "nome": "Macru H1000",
        "linha": "Linha Peixes",
        "foto": "assets/images/produtos/Hagil_Peixes_Macru H1000.png",
        "frase": "Macru H1000 para Peixes.",
        "descricao": "Produto Hágil cadastrado na categoria Peixes. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Peixes.",
        "categorias": [
            "peixes"
        ],
        "categoriaRotulo": "Peixes",
        "segmento": ""
    },
    {
        "id": "peixes-maximo-c-h1000",
        "nome": "Máximo C H1000",
        "linha": "Linha Peixes",
        "foto": "assets/images/produtos/Hagil_Peixes_Máximo C H1000.png",
        "frase": "Máximo C H1000 para Peixes.",
        "descricao": "Produto Hágil cadastrado na categoria Peixes. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Peixes.",
        "categorias": [
            "peixes"
        ],
        "categoriaRotulo": "Peixes",
        "segmento": ""
    },
    {
        "id": "peixes-verruther-hp1000",
        "nome": "Verruther HP1000",
        "linha": "Linha Peixes",
        "foto": "assets/images/produtos/Hagil_Peixes_Verruther HP1000.png",
        "frase": "Verruther HP1000 para Peixes.",
        "descricao": "Produto Hágil cadastrado na categoria Peixes. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Peixes.",
        "categorias": [
            "peixes"
        ],
        "categoriaRotulo": "Peixes",
        "segmento": ""
    },
    {
        "id": "pet-actio-creme-para-pentear",
        "nome": "Actio Creme para Pentear",
        "linha": "Linha Pet",
        "foto": "assets/images/produtos/Hagil_Pet_Actio Creme para Pentear.png",
        "frase": "Actio Creme para Pentear para Pet.",
        "descricao": "Produto Hágil cadastrado na categoria Pet. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Pet.",
        "categorias": [
            "pet"
        ],
        "categoriaRotulo": "Pet",
        "segmento": ""
    },
    {
        "id": "pet-actio-shampoo",
        "nome": "Actio Shampoo",
        "linha": "Linha Pet",
        "foto": "assets/images/produtos/Hagil_Pet_Actio Shampoo.png",
        "frase": "Actio Shampoo para Pet.",
        "descricao": "Produto Hágil cadastrado na categoria Pet. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Pet.",
        "categorias": [
            "pet"
        ],
        "categoriaRotulo": "Pet",
        "segmento": ""
    },
    {
        "id": "pet-actio",
        "nome": "Actio",
        "linha": "Linha Pet",
        "foto": "assets/images/produtos/Hagil_Pet_Actio.png",
        "frase": "Actio para Pet.",
        "descricao": "Produto Hágil cadastrado na categoria Pet. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Pet.",
        "categorias": [
            "pet"
        ],
        "categoriaRotulo": "Pet",
        "segmento": ""
    },
    {
        "id": "pet-aliviatto",
        "nome": "Aliviatto",
        "linha": "Linha Pet",
        "foto": "assets/images/produtos/Hagil_Pet_Aliviatto.png",
        "frase": "Aliviatto para Pet.",
        "descricao": "Produto Hágil cadastrado na categoria Pet. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Pet.",
        "categorias": [
            "pet"
        ],
        "categoriaRotulo": "Pet",
        "segmento": ""
    },
    {
        "id": "pet-andhir",
        "nome": "Andhir",
        "linha": "Linha Pet",
        "foto": "assets/images/produtos/Hagil_Pet_Andhir.png",
        "frase": "Andhir para Pet.",
        "descricao": "Produto Hágil cadastrado na categoria Pet. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Pet.",
        "categorias": [
            "pet"
        ],
        "categoriaRotulo": "Pet",
        "segmento": ""
    },
    {
        "id": "pet-arlevh",
        "nome": "Arlevh",
        "linha": "Linha Pet",
        "foto": "assets/images/produtos/Hagil_Pet_Arlevh.png",
        "frase": "Arlevh para Pet.",
        "descricao": "Produto Hágil cadastrado na categoria Pet. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Pet.",
        "categorias": [
            "pet"
        ],
        "categoriaRotulo": "Pet",
        "segmento": ""
    },
    {
        "id": "pet-avivar-pet",
        "nome": "Avivar pet",
        "linha": "Linha Pet",
        "foto": "assets/images/produtos/Hagil_Pet_Avivar pet.png",
        "frase": "Avivar pet para Pet.",
        "descricao": "Produto Hágil cadastrado na categoria Pet. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Pet.",
        "categorias": [
            "pet"
        ],
        "categoriaRotulo": "Pet",
        "segmento": ""
    },
    {
        "id": "pet-billifort",
        "nome": "Billifort",
        "linha": "Linha Pet",
        "foto": "assets/images/produtos/Hagil_Pet_Billifort.png",
        "frase": "Billifort para Pet.",
        "descricao": "Produto Hágil cadastrado na categoria Pet. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Pet.",
        "categorias": [
            "pet"
        ],
        "categoriaRotulo": "Pet",
        "segmento": ""
    },
    {
        "id": "pet-curae-pet",
        "nome": "Curae PET",
        "linha": "Linha Pet",
        "foto": "assets/images/produtos/Hagil_Pet_Curae PET.png",
        "frase": "Curae PET para Pet.",
        "descricao": "Produto Hágil cadastrado na categoria Pet. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Pet.",
        "categorias": [
            "pet"
        ],
        "categoriaRotulo": "Pet",
        "segmento": ""
    },
    {
        "id": "pet-dhermus-creme",
        "nome": "Dhermus Creme",
        "linha": "Linha Pet",
        "foto": "assets/images/produtos/Hagil_Pet_Dhermus Creme.png",
        "frase": "Dhermus Creme para Pet.",
        "descricao": "Produto Hágil cadastrado na categoria Pet. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Pet.",
        "categorias": [
            "pet"
        ],
        "categoriaRotulo": "Pet",
        "segmento": ""
    },
    {
        "id": "pet-dhermus",
        "nome": "Dhermus",
        "linha": "Linha Pet",
        "foto": "assets/images/produtos/Hagil_Pet_Dhermus.png",
        "frase": "Dhermus para Pet.",
        "descricao": "Produto Hágil cadastrado na categoria Pet. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Pet.",
        "categorias": [
            "pet"
        ],
        "categoriaRotulo": "Pet",
        "segmento": ""
    },
    {
        "id": "pet-durin",
        "nome": "Durin",
        "linha": "Linha Pet",
        "foto": "assets/images/produtos/Hagil_Pet_Durin.png",
        "frase": "Durin para Pet.",
        "descricao": "Produto Hágil cadastrado na categoria Pet. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Pet.",
        "categorias": [
            "pet"
        ],
        "categoriaRotulo": "Pet",
        "segmento": ""
    },
    {
        "id": "pet-dynamis-pet",
        "nome": "Dynamis pet",
        "linha": "Linha Pet",
        "foto": "assets/images/produtos/Hagil_Pet_Dynamis pet.png",
        "frase": "Dynamis pet para Pet.",
        "descricao": "Produto Hágil cadastrado na categoria Pet. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Pet.",
        "categorias": [
            "pet"
        ],
        "categoriaRotulo": "Pet",
        "segmento": ""
    },
    {
        "id": "pet-ecthon-hb1000",
        "nome": "Ecthon HB1000",
        "linha": "Linha Pet",
        "foto": "assets/images/produtos/Hagil_Pet_Ecthon HB1000.png",
        "frase": "Ecthon HB1000 para Pet.",
        "descricao": "Produto Hágil cadastrado na categoria Pet. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Pet.",
        "categorias": [
            "pet"
        ],
        "categoriaRotulo": "Pet",
        "segmento": ""
    },
    {
        "id": "pet-entherikos-pet",
        "nome": "Enthérikos Pet",
        "linha": "Linha Pet",
        "foto": "assets/images/produtos/Hagil_Pet_Enthérikos Pet.png",
        "frase": "Enthérikos Pet para Pet.",
        "descricao": "Produto Hágil cadastrado na categoria Pet. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Pet.",
        "categorias": [
            "pet"
        ],
        "categoriaRotulo": "Pet",
        "segmento": ""
    },
    {
        "id": "pet-ethos",
        "nome": "Ethos",
        "linha": "Linha Pet",
        "foto": "assets/images/produtos/Hagil_Pet_Ethos.png",
        "frase": "Ethos para Pet.",
        "descricao": "Produto Hágil cadastrado na categoria Pet. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Pet.",
        "categorias": [
            "pet"
        ],
        "categoriaRotulo": "Pet",
        "segmento": ""
    },
    {
        "id": "pet-muhlus",
        "nome": "Muhlus",
        "linha": "Linha Pet",
        "foto": "assets/images/produtos/Hagil_Pet_Muhlus.png",
        "frase": "Muhlus para Pet.",
        "descricao": "Produto Hágil cadastrado na categoria Pet. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Pet.",
        "categorias": [
            "pet"
        ],
        "categoriaRotulo": "Pet",
        "segmento": ""
    },
    {
        "id": "pet-olhim",
        "nome": "Olhim",
        "linha": "Linha Pet",
        "foto": "assets/images/produtos/Hagil_Pet_Olhim.png",
        "frase": "Olhim para Pet.",
        "descricao": "Produto Hágil cadastrado na categoria Pet. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Pet.",
        "categorias": [
            "pet"
        ],
        "categoriaRotulo": "Pet",
        "segmento": ""
    },
    {
        "id": "pet-pipih-pet",
        "nome": "Pipih pet",
        "linha": "Linha Pet",
        "foto": "assets/images/produtos/Hagil_Pet_Pipih pet.png",
        "frase": "Pipih pet para Pet.",
        "descricao": "Produto Hágil cadastrado na categoria Pet. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Pet.",
        "categorias": [
            "pet"
        ],
        "categoriaRotulo": "Pet",
        "segmento": ""
    },
    {
        "id": "pet-silencio",
        "nome": "Silencio",
        "linha": "Linha Pet",
        "foto": "assets/images/produtos/Hagil_Pet_Silencio.png",
        "frase": "Silencio para Pet.",
        "descricao": "Produto Hágil cadastrado na categoria Pet. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Pet.",
        "categorias": [
            "pet"
        ],
        "categoriaRotulo": "Pet",
        "segmento": ""
    },
    {
        "id": "suinos-aliviatto",
        "nome": "Aliviatto",
        "linha": "Linha Suínos",
        "foto": "assets/images/produtos/Hagil_Suínos_Aliviatto.png",
        "frase": "Aliviatto para Suínos.",
        "descricao": "Produto Hágil cadastrado na categoria Suínos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Suínos.",
        "categorias": [
            "suinos"
        ],
        "categoriaRotulo": "Suínos",
        "segmento": ""
    },
    {
        "id": "suinos-ciclantur-h1000",
        "nome": "Ciclantur H1000",
        "linha": "Linha Suínos",
        "foto": "assets/images/produtos/Hagil_Suínos_Ciclantur H1000.png",
        "frase": "Ciclantur H1000 para Suínos.",
        "descricao": "Produto Hágil cadastrado na categoria Suínos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Suínos.",
        "categorias": [
            "suinos"
        ],
        "categoriaRotulo": "Suínos",
        "segmento": ""
    },
    {
        "id": "suinos-curae-hc1000",
        "nome": "Curae HC1000",
        "linha": "Linha Suínos",
        "foto": "assets/images/produtos/Hagil_Suínos_Curae HC1000.png",
        "frase": "Curae HC1000 para Suínos.",
        "descricao": "Produto Hágil cadastrado na categoria Suínos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Suínos.",
        "categorias": [
            "suinos"
        ],
        "categoriaRotulo": "Suínos",
        "segmento": ""
    },
    {
        "id": "suinos-dynamis-mh1000",
        "nome": "Dynamis MH1000",
        "linha": "Linha Suínos",
        "foto": "assets/images/produtos/Hagil_Suínos_Dynamis MH1000.png",
        "frase": "Dynamis MH1000 para Suínos.",
        "descricao": "Produto Hágil cadastrado na categoria Suínos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Suínos.",
        "categorias": [
            "suinos"
        ],
        "categoriaRotulo": "Suínos",
        "segmento": ""
    },
    {
        "id": "suinos-ecthon-pour-on",
        "nome": "Ecthon Pour-On",
        "linha": "Linha Suínos",
        "foto": "assets/images/produtos/Hagil_Suínos_Ecthon Pour-On.png",
        "frase": "Ecthon Pour-On para Suínos.",
        "descricao": "Produto Hágil cadastrado na categoria Suínos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Suínos.",
        "categorias": [
            "suinos"
        ],
        "categoriaRotulo": "Suínos",
        "segmento": ""
    },
    {
        "id": "suinos-endecthon-hp1000",
        "nome": "Endecthon HP1000",
        "linha": "Linha Suínos",
        "foto": "assets/images/produtos/Hagil_Suínos_Endecthon HP1000.png",
        "frase": "Endecthon HP1000 para Suínos.",
        "descricao": "Produto Hágil cadastrado na categoria Suínos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Suínos.",
        "categorias": [
            "suinos"
        ],
        "categoriaRotulo": "Suínos",
        "segmento": ""
    },
    {
        "id": "suinos-entherikos",
        "nome": "Enthérikos",
        "linha": "Linha Suínos",
        "foto": "assets/images/produtos/Hagil_Suínos_Enthérikos.png",
        "frase": "Enthérikos para Suínos.",
        "descricao": "Produto Hágil cadastrado na categoria Suínos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Suínos.",
        "categorias": [
            "suinos"
        ],
        "categoriaRotulo": "Suínos",
        "segmento": ""
    },
    {
        "id": "suinos-hepathor-h1000",
        "nome": "Hepathor H1000",
        "linha": "Linha Suínos",
        "foto": "assets/images/produtos/Hagil_Suínos_Hepathor H1000.png",
        "frase": "Hepathor H1000 para Suínos.",
        "descricao": "Produto Hágil cadastrado na categoria Suínos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Suínos.",
        "categorias": [
            "suinos"
        ],
        "categoriaRotulo": "Suínos",
        "segmento": ""
    },
    {
        "id": "suinos-macru-h1000",
        "nome": "Macru H1000",
        "linha": "Linha Suínos",
        "foto": "assets/images/produtos/Hagil_Suínos_Macru H1000.png",
        "frase": "Macru H1000 para Suínos.",
        "descricao": "Produto Hágil cadastrado na categoria Suínos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Suínos.",
        "categorias": [
            "suinos"
        ],
        "categoriaRotulo": "Suínos",
        "segmento": ""
    },
    {
        "id": "suinos-masthe-hmc1000",
        "nome": "Masthe HMC1000",
        "linha": "Linha Suínos",
        "foto": "assets/images/produtos/Hagil_Suínos_Masthe HMC1000.png",
        "frase": "Masthe HMC1000 para Suínos.",
        "descricao": "Produto Hágil cadastrado na categoria Suínos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Suínos.",
        "categorias": [
            "suinos"
        ],
        "categoriaRotulo": "Suínos",
        "segmento": ""
    },
    {
        "id": "suinos-maximo-baby-h1000",
        "nome": "Máximo Baby H1000",
        "linha": "Linha Suínos",
        "foto": "assets/images/produtos/Hagil_Suínos_Máximo Baby H1000.png",
        "frase": "Máximo Baby H1000 para Suínos.",
        "descricao": "Produto Hágil cadastrado na categoria Suínos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Suínos.",
        "categorias": [
            "suinos"
        ],
        "categoriaRotulo": "Suínos",
        "segmento": ""
    },
    {
        "id": "suinos-maximo-l-h1000",
        "nome": "Máximo L H1000",
        "linha": "Linha Suínos",
        "foto": "assets/images/produtos/Hagil_Suínos_Máximo L H1000.png",
        "frase": "Máximo L H1000 para Suínos.",
        "descricao": "Produto Hágil cadastrado na categoria Suínos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Suínos.",
        "categorias": [
            "suinos"
        ],
        "categoriaRotulo": "Suínos",
        "segmento": ""
    },
    {
        "id": "suinos-reproducao-gold",
        "nome": "Reprodução Gold",
        "linha": "Linha Suínos",
        "foto": "assets/images/produtos/Hagil_Suínos_Reprodução Gold.png",
        "frase": "Reprodução Gold para Suínos.",
        "descricao": "Produto Hágil cadastrado na categoria Suínos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Suínos.",
        "categorias": [
            "suinos"
        ],
        "categoriaRotulo": "Suínos",
        "segmento": ""
    },
    {
        "id": "suinos-verruther-hp1000",
        "nome": "Verruther HP1000",
        "linha": "Linha Suínos",
        "foto": "assets/images/produtos/Hagil_Suínos_Verruther HP1000.png",
        "frase": "Verruther HP1000 para Suínos.",
        "descricao": "Produto Hágil cadastrado na categoria Suínos. As indicações, modo de uso e informações técnicas devem seguir o material oficial da marca.",
        "informacoes": [
            "Imagem tratada a partir do catálogo visual original.",
            "Produto apresentado sem bula técnica detalhada nesta versão do site.",
            "Consulte o distribuidor Hágil ou o responsável técnico para orientações de uso."
        ],
        "indicacoes": "Categoria: Suínos.",
        "categorias": [
            "suinos"
        ],
        "categoriaRotulo": "Suínos",
        "segmento": ""
    }
];

  const AVISO_PADRAO = "Uso veterinário. Consulte o distribuidor Hágil ou o responsável técnico da sua região para confirmar indicações, modo de uso e material oficial atualizado.";

  const listaFiltros = document.getElementById("filtros-lista");
  const contagem = document.getElementById("filtros-contagem");
  const grid = document.getElementById("catalogo-grid");
  const modal = document.getElementById("modal-produto");
  const modalVisual = document.getElementById("modal-visual");
  const modalConteudo = document.getElementById("modal-conteudo");
  const modalSair = document.getElementById("modal-sair");
  const backdrop = modal.querySelector(".modal__backdrop");

  let filtroAtivo = "todos";
  let origemFoco = null;
  let produtoAberto = "";
  let timerFechamento = 0;

  const setaSVG = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  function esc(valor) {
    return String(valor).replace(/[&<>"']/g, function (ch) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }[ch];
    });
  }

  function imagemHTML(p) {
    return '<img src="' + esc(p.foto) + '" alt="Embalagem do ' + esc(p.nome) + '" loading="lazy">';
  }

  function montaFiltros() {
    listaFiltros.innerHTML = CATEGORIAS.map(function (par) {
      const ativo = par[0] === filtroAtivo;
      return (
        '<button class="filtro" type="button" data-cat="' + par[0] +
        '" aria-pressed="' + ativo + '">' + par[1] + "</button>"
      );
    }).join("");
  }

  listaFiltros.addEventListener("click", function (e) {
    const botao = e.target.closest(".filtro");
    if (!botao || botao.dataset.cat === filtroAtivo) return;
    filtroAtivo = botao.dataset.cat;
    listaFiltros.querySelectorAll(".filtro").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.cat === filtroAtivo));
    });
    montaGrid();
  });

  function produtosFiltrados() {
    if (filtroAtivo === "todos") return PRODUTOS;
    return PRODUTOS.filter(function (p) {
      return p.categorias.indexOf(filtroAtivo) !== -1;
    });
  }

  function cardHTML(p, indice) {
    const amplo = indice === 0;
    const atraso = Math.min(indice, 12);
    return (
      '<article class="card-prod' + (amplo ? " card-prod--amplo" : "") +
      ' entrando" style="--i:' + atraso + '" tabindex="0" role="button" ' +
      'aria-haspopup="dialog" data-id="' + esc(p.id) + '" ' +
      'aria-label="Ver detalhes de ' + esc(p.nome) + '">' +
      '<div class="card-prod__img">' + imagemHTML(p) + "</div>" +
      '<div class="card-prod__info">' +
      '<span class="card-prod__linha">' + esc(p.linha) + "</span>" +
      "<h3>" + esc(p.nome) + "</h3>" +
      (amplo ? '<span class="card-prod__frase">' + esc(p.frase) + "</span>" : "") +
      '<div class="card-prod__cats">' +
      p.categorias.map(function (c) { return "<span>" + ROTULO[c] + "</span>"; }).join("") +
      "</div></div>" +
      '<span class="card-prod__mais" aria-hidden="true">' +
      '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>' +
      "</span></article>"
    );
  }

  function montaGrid() {
    const itens = produtosFiltrados();
    grid.innerHTML = itens.map(cardHTML).join("");
    const rotulo = filtroAtivo === "todos" ? "na linha completa" : "em " + ROTULO[filtroAtivo];
    contagem.textContent = itens.length + (itens.length === 1 ? " produto " : " produtos ") + rotulo;
  }

  grid.addEventListener("click", function (e) {
    const card = e.target.closest(".card-prod");
    if (card) abreModal(card.dataset.id, card);
  });
  grid.addEventListener("keydown", function (e) {
    if (e.key !== "Enter" && e.key !== " ") return;
    const card = e.target.closest(".card-prod");
    if (card) {
      e.preventDefault();
      abreModal(card.dataset.id, card);
    }
  });

  function abreModal(id, origem, atualizaUrl) {
    const p = PRODUTOS.find(function (item) { return item.id === id; });
    if (!p) return;
    if (produtoAberto === id && !modal.hidden) return;
    window.clearTimeout(timerFechamento);
    origemFoco = origem || null;
    produtoAberto = id;

    if (atualizaUrl !== false) {
      window.history.pushState({ produtoId: id }, "", "#" + encodeURIComponent(id));
    }

    modalVisual.innerHTML =
      imagemHTML(p) +
      '<span class="modal__frase">' + esc(p.frase) + "</span>";

    modalConteudo.innerHTML =
      '<p class="eyebrow"><span class="gota" aria-hidden="true"></span>' +
      esc(p.linha) + "</p>" +
      '<h2 id="modal-titulo">' + esc(p.nome) + "</h2>" +
      '<p class="modal__desc">' + esc(p.descricao) + "</p>" +
      '<div class="bula"><h3>Informações</h3><ul>' +
      p.informacoes.map(function (b) {
        return '<li><span class="gota" aria-hidden="true"></span>' + esc(b) + "</li>";
      }).join("") +
      "</ul></div>" +
      '<div class="bula"><h3>Categoria</h3><p>' + esc(p.indicacoes) + "</p>" +
      '<div class="bula__especies">' +
      p.categorias.map(function (c) { return "<span>" + ROTULO[c] + "</span>"; }).join("") +
      "</div></div>" +
      '<div class="bula"><h3>Orientação técnica</h3>' +
      '<p class="bula__aviso">' + AVISO_PADRAO + "</p></div>" +
      '<div class="modal__acoes">' +
      '<a class="btn btn--primario" href="index.html#contato">Localizar distribuidor ' + setaSVG + "</a>" +
      "</div>";

    modal.hidden = false;
    requestAnimationFrame(function () {
      modal.classList.add("aberto");
    });
    document.body.classList.add("modal-travado");
    modalSair.focus();
    document.addEventListener("keydown", teclasModal);
  }

  function fechaModalSemHistorico() {
    if (!produtoAberto || modal.hidden) return;
    produtoAberto = "";
    modal.classList.remove("aberto");
    document.body.classList.remove("modal-travado");
    document.removeEventListener("keydown", teclasModal);
    timerFechamento = window.setTimeout(function () {
      modal.hidden = true;
      if (origemFoco && document.contains(origemFoco)) origemFoco.focus();
      origemFoco = null;
    }, 360);
  }

  function fechaModal() {
    if (!produtoAberto) return;
    if (window.history.state && window.history.state.produtoId === produtoAberto) {
      window.history.back();
      return;
    }
    window.history.replaceState(null, "", window.location.pathname + window.location.search + "#catalogo-grid");
    fechaModalSemHistorico();
  }

  function produtoDaUrl() {
    const id = decodeURIComponent(window.location.hash.replace(/^#/, ""));
    return PRODUTOS.some(function (item) { return item.id === id; }) ? id : "";
  }

  function sincronizaModalComUrl() {
    const id = produtoDaUrl();
    if (id) abreModal(id, null, false);
    else fechaModalSemHistorico();
  }

  function teclasModal(e) {
    if (e.key === "Escape") {
      fechaModal();
      return;
    }
    if (e.key !== "Tab") return;
    const focaveis = modal.querySelectorAll(
      'button:not([tabindex="-1"]), a[href], [tabindex="0"]'
    );
    if (!focaveis.length) return;
    const primeiro = focaveis[0];
    const ultimo = focaveis[focaveis.length - 1];
    if (e.shiftKey && document.activeElement === primeiro) {
      e.preventDefault();
      ultimo.focus();
    } else if (!e.shiftKey && document.activeElement === ultimo) {
      e.preventDefault();
      primeiro.focus();
    }
  }

  modalSair.addEventListener("click", fechaModal);
  backdrop.addEventListener("click", fechaModal);
  window.addEventListener("popstate", sincronizaModalComUrl);
  window.addEventListener("hashchange", sincronizaModalComUrl);

  montaFiltros();
  montaGrid();
  sincronizaModalComUrl();
})();
