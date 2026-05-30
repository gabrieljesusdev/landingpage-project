# Landing Page Entrans + CMS

Landing page Astro com CMS open source (Decap CMS) para editar:

- textos
- imagens
- cores
- cards e listas
- seções exibidas/ocultas

## Rodar projeto

```bash
pnpm install
pnpm dev
```

Site: http://localhost:4321

## Rodar CMS local (gratis)

Em outro terminal:

```bash
pnpm cms:proxy
```

Painel CMS: http://localhost:4321/admin

## Onde o CMS salva

- Conteudo completo: src/data/site.json
- Imagens enviadas: public/uploads
- Config painel CMS: public/admin/config.yml

## Como editar tudo

No painel /admin voce pode:

- trocar textos globais e SEO
- trocar paleta de cores
- mudar fontes
- adicionar/remover cards
- editar hero, servicos, avaliacoes, mapa e rodape
- editar cards e galerias da pagina de servicos

## Observacao deploy

Configuracao atual usa local_backend para editar localmente de forma gratuita.
Para edicao online por equipe, conecte backend Git (GitHub/Netlify).
