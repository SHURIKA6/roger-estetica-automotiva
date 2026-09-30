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


## Atualização técnica — 30/09/2026

O App resolve a página uma vez e passa seu identificador ao SiteBackdrop. O atributo `data-page` permite reduzir o blur na home sem alterar o cenário desktop dos créditos. O `<picture>` usa agora o recorte móvel 900×1800 até 640px; as dimensões intrínsecas acompanham o novo arquivo. O hero recebe `hero-surface` com preenchimento .36 e blur 2px, mantendo o fallback do vidro.

A lista `galleryPhotos` em `content.js` reúne oito imagens locais com `src`, `alt`, `width` e `height`. A landing duplica a lista para fechar o loop em CSS; a segunda metade é decorativa para acessibilidade e fica oculta quando movimento reduzido está ativo. Nesse modo, a faixa permite rolagem manual. O teste de conteúdo verifica arquivos, unicidade e descrições.

O plugin `preview-prerender-routes` em `vite.config.js` espelha no preview a reescrita existente da Vercel para `/desenvolvedores/index.html`, inclusive preservando query string. Isso evita que a rota sem barra final receba o HTML da home e provoque recuperação de hidratação.

Correções ao guia histórico acima: os breakpoints usados são `sm:` e `xl:`; o hero atual não tem flyer; a galeria fica antes dos serviços. Os registros antigos permanecem para contexto, e o README descreve o estado atual.


Ajuste final da galeria: a inspeção visual revelou que o lazy loading nativo não carregava algumas fotos ao entrarem na tela apenas pelo transform da animação CSS. O carrossel passou a usar `loading="eager"` para suas oito imagens distintas (~284 KiB no total; as cópias reutilizam os mesmos URLs). As demais seções mantêm lazy loading. Este ajuste substitui o registro de lazy loading da galeria acima.


## Rota oculta /devs e entrada automática — 30/09/2026

A rota dos créditos passa a ser `/devs` (também aceita `/devs/`). Build, resolução de página, links internos dos créditos e rewrites foram atualizados. `/desenvolvedores` e `/desenvolvedores/` redirecionam permanentemente para `/devs`, preservando os favoritos antigos; o preview e o servidor de desenvolvimento espelham o redirect da Vercel. A página continua sem links na landing, com `noindex` e fora de sitemap/llms.txt.

Ao entrar nos créditos, o easter egg inicia uma vez por montagem, após a hidratação: espuma → polimento → vitrificação. A entrada automática é silenciosa para respeitar autoplay; Escape cancela e limpa o efeito. Após cancelar, digitar `devs` permite repetir pelo teclado, com o áudio já existente após interação. Com movimento reduzido, a cinemática é pulada e o estado final é aplicado diretamente. Nenhum efeito foi adicionado à home.

Validação: `npm test` 7/7, build aprovado e diff check limpo. Playwright no preview conferiu a sequência completa automática, `/devs` e `/devs/`, cancelamento por Escape, movimento reduzido, redirect antigo com query string preservada, noindex e ausência de canvas/link dos créditos na home. Sem erros JavaScript/hidratação. Confirmados `dist/devs/index.html` presente, pasta antiga ausente e nenhum crédito em sitemap/llms.txt. A configuração da Vercel foi atualizada localmente; nenhum deploy foi feito.


## Revisão de segurança, SEO e funcionamento — 30/09/2026

O estado atual usa Vite 6.4.3. A revisão corrigiu h1/main da home, foco e redimensionamento do menu móvel, legibilidade dos textos pequenos, favicon e ano dos rodapés. Acrescentou uma página 404 pré-renderizada, redirects dos caminhos HTML, cabeçalhos CSP e demais proteções na Vercel/preview, testes de serialização de metadados/JSON-LD e validação da origem. O código do easter egg passou a ser baixado apenas em `/devs`; a entrada automática permanece.

As informações acima sobre Vite 5 e fallback de URLs desconhecidas para a home descrevem o histórico. Agora URLs desconhecidas mostram a página 404 e o preview responde HTTP 404. A configuração da Vercel usa `dist/404.html` para esse fim. `/devs` continua oculta e com noindex; a home só fica indexável no build de produção com origem válida.

Resultado: 16 testes, build e diff check aprovados; npm audit sem vulnerabilidades conhecidas. Playwright conferiu três páginas em sete larguras, foco, headers, redirects, recursos ausentes e ausência de erros de hidratação/CSP. Uma simulação local móvel com CPU 4x e rede limitada observou LCP 2,44s e CLS 0,0242; métricas de campo continuam pendentes.

A matriz completa dos itens das quatro imagens, evidências, limitações e procedimento de publicação/recuperação está em [Revisão do site](docs/revisao-site-2026-09-30.md). Os registros anteriores foram preservados. Não houve commit, push ou deploy.

## Fluxo da 404 animada — 30/09/2026

`NotFoundPage.jsx` começa em `ready`, idêntico no HTML pré-renderizado e no primeiro render do cliente. Após a hidratação, consulta `prefers-reduced-motion`: inicia `driving` por 3000ms ou vai diretamente a `arrived`. Os keyframes de `src/index.css` compartilham a duração informada pelo componente em `--crash-duration`; carro, rodas, barreira, impacto, fumaça e mensagem compõem uma única cena sem loops.

Em `arrived`, cinco passos de 1 segundo atualizam o aviso acessível antes de `window.location.replace('/')`. Isso substitui a entrada da 404 no histórico. Os efeitos removem seus timers e o listener de preferência de movimento ao desmontar. Cancelar usa estado e uma ref para impedir a navegação também antes do próximo render; não interrompe a conclusão visual da cena. O botão continua na tela como “Retorno cancelado”, com `aria-disabled`, preservando o foco de teclado. O link para `/` permanece funcional sem JavaScript.

`SiteHeader` aceita `onInteract` opcional. Somente a 404 fornece esse callback para cancelar o retorno em qualquer clique no cabeçalho, inclusive abertura do menu pelo teclado. As outras páginas mantêm o comportamento anterior. A cena SVG é decorativa; h1, main, status HTTP e metadados noindex continuam preservados. Validações detalhadas em `docs/revisao-site-2026-09-30.md`.

## Conteúdo da oferta e SEO de `/devs` — 30/09/2026

Este complemento substitui as descrições históricas acima de ordem da landing, galeria com oito itens, serviço para bancos sem couro e exclusão dos créditos dos arquivos de descoberta. Os registros anteriores são mantidos para explicar as etapas do projeto.

A landing usa a sequência apresentação (`#inicio`) → serviços (`#servicos`) → galeria → atendimento (`#essencia`) → localização e contato (`#visite`, no rodapé). A abertura contém “Brilho e proteção para seu carro em Sinop”, localização, CTA de orçamento e link “Ver serviços”; outro CTA aparece depois dos serviços. `src/content.js` concentra o conteúdo atualizado e os sete serviços, inclusive “Hidratação de bancos de couro”, para que o HTML, o JSON-LD e o `llms.txt` usem as mesmas informações.

`galleryPhotos` passa a ter dez fontes locais distintas. A foto de tecido sai da lista ativa e entram couro, painel e espuma. As imagens são mostradas em 4:3; a lista continua duplicada em duas metades idênticas para o loop CSS, agora de 66s. As cópias têm `aria-hidden` e alt vazio, desaparecem com movimento reduzido e reutilizam os arquivos baixados pelo navegador. O carregamento eager da galeria permanece; serviços e foto de atendimento mantêm lazy loading. A nova foto de polimento em atendimento evita repetir a imagem usada anteriormente nessa seção. Os avisos de imagens ilustrativas acompanham as seções com fotografias de stock.

O gerador de SEO pré-renderiza `/`, `/devs` e a 404. A indexação depende de origem HTTPS válida e de ambiente de produção: home e créditos recebem `index, follow, max-image-preview:large`; 404, preview da Vercel e build sem origem recebem `noindex, follow`. `/devs` mantém metadados próprios e canonical `/devs`, enquanto aliases antigos continuam redirecionando para essa rota.

O `robots.txt` explicita `Allow: /devs` e, quando o build é indexável, publica o endereço absoluto do sitemap. O sitemap lista `/` e `/devs` apenas em produção indexável; preview e ausência de origem deixam a lista vazia. O `llms.txt` passa a incluir o link dos créditos e identificar Eduardo Gobatto e Fernando Riad a partir dos dados públicos de `content.js`. Não há link de navegação para os créditos na landing.

As cinco saídas WebP das quatro novas fontes, dimensões e links de origem estão no README. Não foram acrescentados avaliações, preços, horários ou durações não confirmados. Sem mudança de contratos de contatos, âncoras, aliases ou comportamento da 404/easter egg. O menu usa “Atendimento” para a seção, preservando `#essencia`.

Validação desta etapa: `npm test` 24/24; três execuções de `node scripts/build.mjs` aprovadas em produção sintética, preview e local sem origem, com assertivas nos arquivos gerados. O build final ficou local, sem domínio fictício. Playwright/Chromium conferiu home e créditos de 320 a 1920px, CTAs, menu/foco/âncoras, imagens, loop, pausa, movimento reduzido e redirects, sem overflow ou erros de hidratação. Revisão independente sem achados pendentes e diff check da documentação limpo. As evidências completas estão no README e no relatório; os testes históricos acima permanecem relativos às etapas anteriores. Sem nova medição de Core Web Vitals, Safari/iOS, aparelho físico, commit, push ou deploy.
