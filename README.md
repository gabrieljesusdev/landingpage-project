# Landing Page Entrans + Storyblok

Landing page Astro com CMS no Storyblok.

## Rodar projeto

```bash
pnpm install
pnpm dev
```

Site local: http://localhost:4321

## Variaveis de ambiente

Crie um arquivo `.env` com:

```bash
STORYBLOK_PREVIEW_TOKEN=seu_token_preview
STORYBLOK_SPACE_ID=123456
STORYBLOK_REGION=eu
STORYBLOK_CONTENT_SLUG=site
```

## Painel CMS

- Atalho local: http://localhost:4321/admin
- O atalho abre o painel do Storyblok.

## Modelo de conteudo usado pelo site

O site espera um story no slug `site` com um destes formatos:

- Campo `site_json` (string JSON completa).
- Campo `data` (objeto completo do site).
- Conteudo raiz ja no formato de `src/data/site.json`.

Sem token ou com erro no Storyblok, o site usa fallback local em `src/data/site.json`.

## Migracao concluida

- Decap CMS removido do projeto.
- Proxy `decap-server` removido.
- Pagina `/admin` convertida para entrada do Storyblok.
