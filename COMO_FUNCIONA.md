# Como Esta Aplicação Funciona — Guia Técnico

Este documento é um resumo técnico e direto ao ponto sobre a arquitetura, estrutura de arquivos e tags fundamentais desta aplicação.

---

## 1. Visão Geral da Arquitetura (Mental Model)

Apesar de usar **React 18** e **Vite 5**, a aplicação **não é uma SPA comum** e dispensa frameworks pesados como Next.js ou React Router.

Trata-se de um **SSG (Static Site Generation) artesanal**:

1. **Em Desenvolvimento (`npm run dev`)**:
   - Funciona como SPA clássica.
   - `index.html` carrega `src/main.jsx`.
   - O React inicializa via `createRoot` e renderiza no navegador.

2. **No Build de Produção (`npm run build`)**:
   - O script `scripts/build.mjs` compila o bundle com Vite e inicializa um servidor Vite SSR em memória.
   - Executa `src/entry-server.jsx` chamando `renderToString(<App />)` para cada rota (`/` e `/desenvolvedores`).
   - O HTML final já sai com o DOM pré-renderizado e metadados de SEO/JSON-LD injetados no `<head>`.
   - Gera `dist/index.html`, `dist/desenvolvedores/index.html`, `sitemap.xml`, `robots.txt` e `llms.txt`.

3. **Hidratação no Cliente**:
   - `src/main.jsx` verifica: `if (root.hasChildNodes()) hydrateRoot(...) else createRoot(...)`.
   - Como o HTML já vem com conteúdo do servidor/build, o React apenas "hidrata" (anexa event listeners), garantindo First Contentful Paint (FCP) quase instantâneo e SEO perfeito sem depender de execução de JavaScript pelos crawlers.

---

## 2. Mapa dos Arquivos: Quem Faz o Quê

### Configuração e Build
- **`package.json`**: Dependências mínimas (`react`, `react-dom`, `@tailwindcss/vite`, `vite`). Scripts `dev`, `build`, `test`, `preview`.
- **`vite.config.js`**: Conecta o plugin do React e o novo plugin do Tailwind CSS v4 (`@tailwindcss/vite`).
- **`scripts/build.mjs`**: O coração do SSG. Orquestra o build do Vite, renderiza as rotas em HTML estático com metadados únicos, gera Schema.org (`AutomotiveBusiness`), `robots.txt`, `sitemap.xml` e `llms.txt`.

### Camada de Entrada e Roteamento
- **`index.html`**: O esqueleto HTML base com preconnect de fontes, favicons e a tag `<div id="root"></div>`.
- **`src/main.jsx`**: Ponto de entrada do browser. Detecta se faz hidratação (`hydrateRoot`) ou renderização limpa (`createRoot`).
- **`src/entry-server.jsx`**: Ponto de entrada usado exclusivamente pelo script de build via Node para chamar `renderToString(<App pathname={...} />)`.
- **`src/App.jsx`**: Micro-roteador condicional. Se `resolvePage(pathname) === 'developers'`, renderiza `<DevelopersPage />`, senão `<LandingPage />`.
- **`src/route.js`**: Função pura `resolvePage(pathname)` que normaliza barras e compara a URL.

### Conteúdo e Estilos
- **`src/content.js`**: **Única fonte de verdade** para textos, links (WhatsApp, Maps), lista de serviços e equipe. **Sem JSX propositalmente**, permitindo que o script de build (`build.mjs`) o importe diretamente em Node puro sem precisar de transpilação.
- **`src/index.css`**: Único arquivo CSS. Usa **Tailwind CSS v4** (`@import "tailwindcss"` + `@theme static`). Define cores, fontes, breakpoints e resets de tipografia/acessibilidade no `@layer base`.

### Componentes (`src/components/`)
*Regra do projeto: componentes só existem quando há reuso em mais de uma página.*
- **`SiteHeader.jsx`**: Cabeçalho fixo com navegação responsiva (drawer mobile com trava de foco/scroll; menu inline no desktop).
- **`Brand.jsx`**: O logotipo da Roger com texto estilizado.
- **`SkipLink.jsx`**: Link de acessibilidade ("Pular para o conteúdo"), oculto visualmente até receber foco via `Tab`.
- **`src/icons.jsx`**: SVGs inline padronizados (`ArrowIcon`, `PinIcon`, `InstagramIcon`, `GithubIcon`, etc.).

### Páginas (`src/pages/`)
- **`LandingPage.jsx`**: A página principal com todas as suas seções montadas inline: Hero (`#inicio`), Carrossel automático de fotos (faixa contínua em CSS, com botão de pausa), A experiência (`#essencia`), Serviços (`#servicos`, só os nomes), Rodapé com endereço e contato (`#visite`) e botão flutuante de WhatsApp.
- **`DevelopersPage.jsx`**: Página da rota `/desenvolvedores` com créditos da equipe, links de portfólio e troca dinâmica de `document.title`. A rota é **oculta**: nenhum link da landing aponta para ela, fica fora do `sitemap.xml` e do `llms.txt` e sai sempre com `noindex`. Só abre digitando a URL.

---

## 3. As Tags e Atributos Mais Importantes

### A. Tags Semânticas de Estrutura
- **`<header>`**: Contém o cabeçalho fixo do site e o controle de navegação.
- **`<nav aria-label="Navegação principal">`**: Agrupa os links de salto interno e rotas. O `aria-label` identifica a navegação para leitores de tela caso haja mais de um `<nav>` na página.
- **`<main id="main">`**: O container principal do conteúdo único da página. É o destino do `<SkipLink>` para permitir que deficientes visuais e usuários de teclado pulem o menu repetitivo.
- **`<section>`** (com `aria-labelledby` ou `aria-label`): Divide o documento em regiões com significado temático (`#inicio`, `#essencia`, `#servicos`). Leitores de tela usam isso como marcos (landmarks).
- **`<article>`**: Usado em cada card de desenvolvedor, pois representam blocos independentes e autocontidos de informação.
- **`<footer id="visite">`**: Rodapé de largura total com endereço, telefone, WhatsApp, links de navegação e direitos autorais. Leva o `id="visite"` porque o "Onde estamos" do header aponta para `/#visite`.

### B. Atributos de Acessibilidade (A11y)
- **`inert`** (`main.toggleAttribute('inert', menuOpen)`):
  - *Como funciona*: Quando o menu mobile abre, `inert` desativa completamente cliques, seleção e navegação via tecla `Tab` no `<main>`, impedindo que o usuário interaja acidentalmente com o conteúdo que está atrás do menu.
- **`aria-expanded={menuOpen}`**:
  - *Como funciona*: Informa ao leitor de tela se o menu controlado por aquele botão está atualmente expandido (`true`) ou recolhido (`false`).
- **`aria-controls={navId}`**:
  - *Como funciona*: Liga programaticamente o botão hambúrguer ao elemento `<nav>` que ele abre/fecha.
- **`aria-labelledby="hero-title"`**:
  - *Como funciona*: Em vez de dar um nome estático para a seção, aponta para o ID do título (`<h1>` ou `<h2>`) correspondente, fazendo o leitor de tela anunciar o nome exato daquela seção.
- **`aria-hidden="true"`**:
  - *Como funciona*: Esconde ícones SVG decorativos e avatares visuais de leitores de tela para não poluir a leitura de quem usa tecnologia assistiva.
- **`<span className="sr-only">`**:
  - *Como funciona*: Texto visível apenas para leitores de tela (ex: "Abrir menu", "Fechar menu").

### C. Metadados e Tags Críticas no `<head>` (Injetadas pelo Build)
- **`<link rel="canonical" href="...">`**:
  - Indica aos buscadores a URL oficial e definitiva daquela página, evitando canibalização por variações de parâmetros ou protocolos.
- **`<script type="application/ld+json">`**:
  - Injeta dados estruturados no formato JSON-LD do **Schema.org** do tipo `AutomotiveBusiness`. O Google usa isso para exibir cards ricos na busca local (telefone, endereço em Sinop, catálogo de serviços e coordenadas).
- **`<meta name="robots" content="...">`**:
  - Se houver domínio configurado (`SITE_URL` ou produção da Vercel), emite `index, follow`. Se for ambiente de teste/preview local, emite `noindex, follow` para evitar indexação acidental de rascunhos.
- **`fetchpriority="high"`** (na tag `<img>` do flyer no Hero):
  - Sinaliza ao navegador para priorizar imediatamente o download da imagem principal do Hero, reduzindo o tempo de LCP (Largest Contentful Paint).

---

## 4. Nuances do Tailwind CSS v4 no Projeto

1. **Sem arquivo `tailwind.config.js`**:
   - O Tailwind v4 unificou as configurações diretamente no CSS através da diretiva `@theme static` dentro de `src/index.css`.
2. **Breakpoints Mobile-First**:
   - Definidos via `--breakpoint-sm: 641px` e `--breakpoint-lg: 1081px`.
   - O CSS padrão (sem prefixo) atende celular; `sm:` atende tablets; `lg:` atende desktops.
3. **Cores com Transparência**:
   - Foram declaradas variáveis como `--color-paper-24: rgba(...)` em vez de usar utilitários como `bg-paper/24`. O modificador de barra `/` na v4 calcula `color-mix()` no espaço de cor `oklab`, o que causava sutis distorções na tonalidade exata desejada.
4. **Transições**:
   - Utiliza-se `transition` seco ou transições específicas, pois propriedades como `translate`, `rotate` e `scale` agora são propriedades CSS nativas e independentes da propriedade `transform`.
