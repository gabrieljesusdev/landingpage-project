# Landing Page AC - Design Tokens

Documento base para agentes de IA implementarem a landing page com alta fidelidade visual.

## 1) Direcao Visual

- Estilo: servico tecnico premium, confiavel, humano.
- Tom: profissional, direto, sem excesso decorativo.
- Contraste: alto no hero, medio nas secoes claras.
- Curvatura: predominante arredondada (cards e botoes pill).

## 2) Core Brand Tokens

### Brand obrigatorio

- `--color-primary: #F17432;`
- `--color-secondary: #3A90CD;`

### Blurs obrigatorios

- `--blur-orange-rgb: 241, 116, 50;`
- `--blur-blue-rgb: 58, 144, 205;`
- `--blur-alpha: 0.25;`
- `--blur-orange: rgba(var(--blur-orange-rgb), var(--blur-alpha));`
- `--blur-blue: rgba(var(--blur-blue-rgb), var(--blur-alpha));`

## 3) Palette Tokens (extraidos da referencia)

### Cores de fundo e superficie

- `--bg-page: #F4F4F5;` (fundo secoes claras)
- `--bg-surface: #FFFFFF;` (cards)
- `--bg-hero-overlay: rgba(6, 16, 26, 0.62);` (escurecimento imagem hero)
- `--bg-footer: #0E1116;`

### Cores de texto

- `--text-strong: #231A1A;`
- `--text-body: #454045;`
- `--text-soft: #7A767A;`
- `--text-inverse: #FFFFFF;`

### Cores funcionais

- `--status-danger: #F35A5A;` (icones de problema)
- `--status-success: #25D366;` (icone WhatsApp)
- `--star: #F6A23A;`
- `--border-soft: #E9E9EB;`

## 4) Typography Tokens

Fonte visual recomendada para aproximar a imagem: `Poppins`.
Fallback: `"Nunito Sans", "Segoe UI", sans-serif`.

- `--font-family-base: "Poppins", "Nunito Sans", "Segoe UI", sans-serif;`
- `--font-family-display: "Poppins", "Nunito Sans", sans-serif;`

### Escala tipografica

- `--fs-hero-title: clamp(2rem, 4.2vw, 3.6rem);`
- `--fs-h2: clamp(1.7rem, 2.4vw, 2.5rem);`
- `--fs-h3: clamp(1.2rem, 1.8vw, 1.8rem);`
- `--fs-body-lg: 1.125rem;`
- `--fs-body: 1rem;`
- `--fs-small: 0.875rem;`

### Pesos

- `--fw-regular: 400;`
- `--fw-medium: 500;`
- `--fw-semibold: 600;`
- `--fw-bold: 700;`

### Linha e tracking

- `--lh-tight: 1.12;`
- `--lh-body: 1.45;`
- `--tracking-normal: 0;`

## 5) Spacing Tokens

Grid de 4px para consistencia.

- `--space-1: 0.25rem;` (4)
- `--space-2: 0.5rem;` (8)
- `--space-3: 0.75rem;` (12)
- `--space-4: 1rem;` (16)
- `--space-5: 1.25rem;` (20)
- `--space-6: 1.5rem;` (24)
- `--space-8: 2rem;` (32)
- `--space-10: 2.5rem;` (40)
- `--space-12: 3rem;` (48)
- `--space-16: 4rem;` (64)

## 6) Radius, Shadow, Blur

- `--radius-sm: 0.625rem;` (10)
- `--radius-md: 0.875rem;` (14)
- `--radius-lg: 1.25rem;` (20)
- `--radius-pill: 999px;`

- `--shadow-soft: 0 8px 30px rgba(0, 0, 0, 0.08);`
- `--shadow-button: 0 8px 20px rgba(58, 144, 205, 0.28);`

- `--blur-navbar: 12px;`
- `--blur-hero-glow: 80px;`

## 7) Layout Tokens

- `--container-max: 1180px;`
- `--container-gutter: clamp(1rem, 3vw, 2.5rem);`
- `--section-gap: clamp(3rem, 7vw, 6rem);`
- `--hero-min-height: 86vh;`
- `--navbar-height: 74px;`

## 8) Component Tokens

### 8.1 Navbar (obrigatorio)

Regra exigida: **progressive blur with fill #3A90CD**.

- `--nav-fill-rgb: 58, 144, 205;`
- `--nav-fill-top: rgba(var(--nav-fill-rgb), 0.36);`
- `--nav-fill-mid: rgba(var(--nav-fill-rgb), 0.20);`
- `--nav-fill-bottom: rgba(var(--nav-fill-rgb), 0.00);`

Implementacao recomendada:

```css
.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(var(--blur-navbar));
  -webkit-backdrop-filter: blur(var(--blur-navbar));
  background:
    linear-gradient(
      to bottom,
      var(--nav-fill-top) 0%,
      var(--nav-fill-mid) 52%,
      var(--nav-fill-bottom) 100%
    );
  border-bottom: 1px solid rgba(255, 255, 255, 0.16);
}
```

### 8.2 Hero

- Fundo com imagem full-bleed.
- Overlay escuro para legibilidade.
- Glow azul e laranja difusos ao fundo:
  - spot 1: `var(--blur-blue)`
  - spot 2: `var(--blur-orange)`
- Titulo com palavras destacadas:
  - azul: `--color-secondary`
  - laranja: `--color-primary`

### 8.3 CTA primario

- Fundo azul dominante (`--color-secondary`).
- Texto branco.
- Formato pill.
- Hover: elevar brilho e sombra.

### 8.4 Cards de servico

- Fundo branco.
- Borda suave `--border-soft`.
- Radius `--radius-md`.
- Icone escuro, titulo semibold, texto pequeno.

### 8.5 Testemunhos

- Cards horizontais compactos.
- Avatar circular pequeno.
- Estrelas em `--star`.

### 8.6 Mapa

- Bloco largo com radius alto.
- Overlay minimo (nao escurecer excessivamente).
- Link "Abrir Mapa" no canto inferior direito.

### 8.7 Footer

- Fundo escuro `--bg-footer`.
- Texto principal branco e secundario em cinza claro.
- Icones lineares pequenos.

## 9) Motion Tokens

Animacao discreta e objetiva.

- `--ease-standard: cubic-bezier(0.22, 1, 0.36, 1);`
- `--dur-fast: 160ms;`
- `--dur-base: 240ms;`
- `--dur-slow: 380ms;`

Sugestao:
- fade + rise de 16px na entrada de secoes.
- hover de botoes com translateY(-1px).

## 10) Breakpoints

- `--bp-sm: 480px;`
- `--bp-md: 768px;`
- `--bp-lg: 1024px;`
- `--bp-xl: 1280px;`

Comportamento:
- Mobile: navbar compacta, hero mais curto, cards empilhados.
- Tablet: grade 2 colunas nos servicos.
- Desktop: grade 3 colunas nos servicos.

## 11) CSS Variables - pacote pronto

```css
:root {
  --color-primary: #F17432;
  --color-secondary: #3A90CD;

  --blur-orange-rgb: 241, 116, 50;
  --blur-blue-rgb: 58, 144, 205;
  --blur-alpha: 0.25;
  --blur-orange: rgba(var(--blur-orange-rgb), var(--blur-alpha));
  --blur-blue: rgba(var(--blur-blue-rgb), var(--blur-alpha));

  --bg-page: #F4F4F5;
  --bg-surface: #FFFFFF;
  --bg-hero-overlay: rgba(6, 16, 26, 0.62);
  --bg-footer: #0E1116;

  --text-strong: #231A1A;
  --text-body: #454045;
  --text-soft: #7A767A;
  --text-inverse: #FFFFFF;

  --status-danger: #F35A5A;
  --status-success: #25D366;
  --star: #F6A23A;
  --border-soft: #E9E9EB;

  --font-family-base: "Poppins", "Nunito Sans", "Segoe UI", sans-serif;
  --font-family-display: "Poppins", "Nunito Sans", sans-serif;

  --fs-hero-title: clamp(2rem, 4.2vw, 3.6rem);
  --fs-h2: clamp(1.7rem, 2.4vw, 2.5rem);
  --fs-h3: clamp(1.2rem, 1.8vw, 1.8rem);
  --fs-body-lg: 1.125rem;
  --fs-body: 1rem;
  --fs-small: 0.875rem;

  --fw-regular: 400;
  --fw-medium: 500;
  --fw-semibold: 600;
  --fw-bold: 700;

  --lh-tight: 1.12;
  --lh-body: 1.45;
  --tracking-normal: 0;

  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;

  --radius-sm: 0.625rem;
  --radius-md: 0.875rem;
  --radius-lg: 1.25rem;
  --radius-pill: 999px;

  --shadow-soft: 0 8px 30px rgba(0, 0, 0, 0.08);
  --shadow-button: 0 8px 20px rgba(58, 144, 205, 0.28);

  --blur-navbar: 12px;
  --blur-hero-glow: 80px;

  --container-max: 1180px;
  --container-gutter: clamp(1rem, 3vw, 2.5rem);
  --section-gap: clamp(3rem, 7vw, 6rem);
  --hero-min-height: 86vh;
  --navbar-height: 74px;

  --ease-standard: cubic-bezier(0.22, 1, 0.36, 1);
  --dur-fast: 160ms;
  --dur-base: 240ms;
  --dur-slow: 380ms;

  --bp-sm: 480px;
  --bp-md: 768px;
  --bp-lg: 1024px;
  --bp-xl: 1280px;

  --nav-fill-rgb: 58, 144, 205;
  --nav-fill-top: rgba(var(--nav-fill-rgb), 0.36);
  --nav-fill-mid: rgba(var(--nav-fill-rgb), 0.20);
  --nav-fill-bottom: rgba(var(--nav-fill-rgb), 0);
}
```

## 12) Checklist de Fidelidade

- [ ] Hero com overlay escuro e destaque azul/laranja no titulo.
- [ ] Navbar com blur progressivo azul (`#3A90CD`).
- [ ] CTA principal em azul com texto branco.
- [ ] Lista de problemas com icones vermelhos.
- [ ] Secao de servicos em cards claros arredondados.
- [ ] Depoimentos compactos com estrelas laranja.
- [ ] Bloco de mapa com canto arredondado.
- [ ] Footer escuro com informacoes de contato.

## 13) Observacoes

- Valores foram extraidos visualmente da referencia anexada.
- Pequenos ajustes finos podem ser feitos durante QA visual.
- Nao descaracterizar os tokens obrigatorios de marca.
