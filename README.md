# Roger Estética Automotiva

Landing page da Roger Estética Automotiva, em Sinop-MT.

A rota `/devs` apresenta os créditos de quem construiu a experiência digital, com a mesma identidade visual da Roger. Ela é indexável em produção com origem HTTPS válida, aparece no `sitemap.xml`, no `llms.txt` e no `robots.txt`, e mantém metadados próprios. A landing continua sem link de navegação para os créditos. Previews e builds sem origem configurada recebem `noindex`. Os registros anteriores sobre ocultação e exclusão do SEO foram preservados como histórico e são substituídos pelo complemento mais recente abaixo.

## Estrutura do projeto

Estilo com **Tailwind CSS v4**. Só existe um arquivo `.css` no projeto: [`src/index.css`](src/index.css), com o tema e as regras globais. Todo o resto é classe utilitária no JSX.

Componente aqui só existe quando o código aparece em mais de um lugar. Seção usada uma vez fica inline na própria página.

```
src/
  App.jsx              escolhe a página pelo caminho da URL
  main.jsx             entrada do navegador (hydrate ou render)
  entry-server.jsx     entrada de SSR usada pelo build
  route.js             resolvePage()               + route.test.js
  content.js           textos, serviços, contatos  + content.test.js
  index.css            @import tailwindcss + @theme + @layer base
  icons.jsx            os 6 SVGs do site
  components/          só o que se repete: Brand (3x), SiteHeader (2x), SkipLink (2x)
  pages/               LandingPage e DevelopersPage, com as seções inline
scripts/
  build.mjs            Vite, pré-render das rotas e arquivos de SEO
```

### Tailwind neste projeto

O design é **mobile-first**. As classes sem prefixo definem o layout de telas pequenas; `sm:` atende tablets e `xl:` aplica as regras de desktop:

- sem prefixo → base, até 640px
- `sm:` → a partir de 641px
- `xl:` → a partir de 1081px nas páginas e no cabeçalho

As variantes são próprias sobre `min-width`; `xl:` é usado para que as regras de desktop prevaleçam sobre as de tablet na cascata do Tailwind. Os breakpoints padrão do Tailwind ficam desativados no tema do projeto.

Três armadilhas que já custaram bug aqui:

- **Duas classes de cor na mesma string não se sobrescrevem pela ordem que você escreveu.** Quem ganha é a ordem no CSS gerado. Por isso constantes como `EYEBROW` e `SECTION_TAG` não trazem cor: cada uso declara a sua.
- **Use `transition` seco, não `transition-[...,transform]`.** Na v4 `translate`, `rotate` e `scale` são propriedades próprias; uma lista arbitrária com `transform` não anima o hover.
- **Para `transform` com mais de uma função, use `[transform:...]`.** As utilities `rotate-*`/`translate-*` aplicam sempre translate antes de rotate, o que inverte um `rotate(...) translateX(...)` sem avisar.

Cores com transparência estão no tema como `--color-paper-24` e afins, em vez de modificadores `/opacidade`, porque o modificador gera `color-mix()` em oklab e não dá exatamente a mesma cor.

Texto, serviço ou contato novo entra em `src/content.js`, nunca direto no JSX: o build lê o mesmo arquivo para gerar o JSON-LD, o `sitemap.xml` e o `llms.txt`.

### Imagens ilustrativas

O carrossel e a lista de serviços da home usam fotos de stock para ilustrar detalhamento automotivo; elas não representam serviços realizados pela Roger. Os arquivos WebP otimizados ficam em `public/assets/`. Fotos e origens do carrossel: [WAVYVISUALS no Pexels](https://www.pexels.com/photo/man-wiping-hood-of-sports-car-20051461/), [Bradley De Melo no Pexels](https://www.pexels.com/photo/black-bmw-in-garage-26936247/) e [Matheus Bertelli no Pexels](https://www.pexels.com/photo/shiny-black-car-parked-on-a-garage-10182836/).

Na lista de serviços, cada foto (`servico-*.webp`) é ligada ao serviço pelo campo `image` em `src/content.js`, e um teste confere que o arquivo existe. As fotos vêm do CDN do Pexels já recortadas em 400×300 e em WebP (`?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop&fm=webp`):

- Restauração de farol: [Khunkorn Laowisit no Pexels](https://www.pexels.com/photo/person-using-a-polishing-machine-on-the-car-5233268/)
- Micro pintura: [Dextar Studio no Pexels](https://www.pexels.com/photo/close-up-of-man-painting-car-details-14615263/)
- Vitrificação em pintura: [WAVYVISUALS no Pexels](https://www.pexels.com/photo/applying-car-cleaner-on-blue-sponge-20051453/)
- Cristalização com teflon: [Tima Miroshnichenko no Pexels](https://www.pexels.com/photo/water-droplets-on-a-white-car-6873177/)
- Hidratação de bancos sem couro: [Khunkorn Laowisit no Pexels](https://www.pexels.com/photo/a-person-deep-cleaning-a-car-seat-5233285/)
- Polimento: [Khunkorn Laowisit no Pexels](https://www.pexels.com/photo/a-person-polishing-the-white-car-5233279/)
- Espelhamento: [chickenbunny no Pexels](https://www.pexels.com/photo/photo-of-a-hood-of-a-car-10905354/)

Confira a [licença do Pexels](https://www.pexels.com/license/) ao substituir ou adicionar imagens.

### Cenário Dodge RAM e superfícies de vidro

O fundo do site é uma fotografia ilustrativa de uma picape Ram preta sob um viaduto ([Abdullah Alsaibaie no Pexels](https://www.pexels.com/photo/truck-parked-under-overpass-18491925/), original 5585×3142, recortada para 16:9). Ela não é carro de cliente da Roger e não representa serviço realizado. Dois recortes locais em `public/assets/`, servidos por `<picture>` conforme a viewport:

| Arquivo | Dimensões | Peso | Uso |
|---|---|---|---|
| `ram-background-desktop.webp` | 1920×1080 | 106 KiB | a partir de 641px |
| `ram-background-mobile.webp` | 1080×1440 | 55 KiB | até 640px |

O cenário vive em [`src/components/SiteBackdrop.jsx`](src/components/SiteBackdrop.jsx): camada fixa, `aria-hidden`, sem interação, com desfoque (`--scene-blur`) e dois véus escuros sobre a foto. O conteúdo fica em `.site-page` acima dela. As superfícies translúcidas usam as classes de `src/index.css`:

- `glass-surface` — painel de vidro com borda clara, raio e sombra (hero, experiência, cards de desenvolvedores);
- `glass-band` — faixa full-width com fio em cima e embaixo (serviços e rodapé da landing);
- `glass-strong` — aumenta a densidade do vidro (`--color-glass-strong`), quando o texto pedir;
- `glass-header` / `glass-menu` — o vidro fica no `::before`, atrás dos filhos, e o menu de tela cheia some no desktop.

Sem suporte a `backdrop-filter`, o `@supports` mantém um preenchimento quase opaco (`rgba(13, 15, 19, .94)`), então o texto continua legível; se a foto falhar após a hidratação, o `onError` esconde a `<img>` e o gradiente base do cenário permanece. Texto pequeno sobre o cenário usa `paper`/`paper-soft`/`gold`; acentos em `red` ficam reservados a texto grande ou a áreas com vidro denso, por contraste.

## Desenvolvimento

```bash
npm install
npm run dev
```

O servidor de desenvolvimento fica acessível a outros dispositivos na mesma rede Wi-Fi. Abra no celular ou em outro computador o endereço de rede exibido pelo Vite no terminal (por exemplo, `http://192.168.1.10:5173`). Se não conectar, permita o Node.js/Vite no firewall do computador para redes privadas.

## Build de produção

```bash
npm run build
npm run preview
```

Os CTAs de atendimento usam o telefone fornecido na arte de referência. O endereço do bloco de localização segue o cadastro público do Google Maps enviado no briefing.

## SEO e publicação na Vercel

O build pré-renderiza a landing e `/devs` em HTML, com metadados próprios, Open Graph, Twitter Card e dados estruturados `AutomotiveBusiness` na landing. Gera também `dist/robots.txt`, `dist/sitemap.xml` e `dist/llms.txt`, usando os mesmos serviços e contatos da página.

Na Vercel, habilite as variáveis de sistema: `VERCEL_PROJECT_PRODUCTION_URL` fornece automaticamente o endereço público do projeto. Para usar um domínio próprio, defina `SITE_URL` com a origem HTTPS completa (sem caminho) nas variáveis de produção e refaça o deploy. Essa variável tem prioridade sobre a URL automática. Não use o endereço temporário de cada deploy.

Sem URL configurada, o build local recebe `noindex` e sitemap vazio, sem inventar um domínio. Deploys com `VERCEL_ENV=preview` também recebem `noindex`. Os arquivos de SEO são gerados no build: valide com `npm run build` e `npm run preview`, não apenas com o servidor de desenvolvimento.

Após publicar, verifique a propriedade no Google Search Console, envie `/sitemap.xml`, inspecione a URL inicial e associe o site ao Perfil da Empresa no Google. Confira o endereço oficial: Rua dos Guapuruvús, 366, Jardim das Violetas, Sinop/MT. Ao trocar de domínio, configure o redirecionamento permanente do endereço anterior na hospedagem.

O foco do conteúdo é a busca local por “estética automotiva em Sinop”. SEO não garante indexação nem posição nos resultados. `llms.txt` é um resumo para ferramentas de IA; não é requisito do Google nem garantia de ranqueamento. Não foram adicionadas avaliações, horários ou preços não confirmados.

## Planos de evolução visual

- [Reestruturação da landing](PLANO_REESTRUTURACAO.md): compactação, carrossel, serviços e rodapé.
- [Fundo Dodge RAM e glassmorphism escuro](docs/superpowers/plans/2026-09-29-fundo-ram-glassmorphism.md): cenário ilustrativo escurecido e desfocado, com vidro nas superfícies das duas páginas. Inclui arquivos, parâmetros iniciais, tarefas e verificação em celular e desktop.

Em 29/09/2026 foi acrescentado o plano da RAM. Em 30/09/2026 o plano foi implementado sobre a reestruturação já aplicada: o cenário e o vidro substituíram os fundos opacos de serviços e rodapé (`bg-paper`/`bg-ink-soft` viraram `glass-band`), o hero e a experiência receberam `glass-surface`, o header e o menu de tela cheia ganharam vidro no `::before`, e os acentos de texto pequeno passaram por correção de contraste (`red` restrito a texto grande ou vidro denso; `muted` substituído por `paper-soft`/`gold` onde o cenário clareava o fundo). O registro completo, com evidências e limitações, está na seção “Registro da implementação” do plano. Os documentos anteriores permanecem como histórico.


## Revisão visual — 30/09/2026

Implementado o ajuste aprovado após a revisão da landing:

- RAM mantida. O recorte móvel foi refeito do original do Pexels (foto 18491925), com foco na cabine e frente: crop 1570×3142 em x=2650/y=0, saída WebP 900×1800, qualidade 78, 113936 bytes (111 KiB). O registro anterior de 1080×1440/55 KiB descreve a primeira versão.
- Cenário móvel nas duas páginas: blur 1px e posição central. Na home desktop: blur 2px; no desktop de desenvolvedores: blur 6px e posição original preservados. `SiteBackdrop` recebe a página resolvida pelo App e usa `data-page` para os parâmetros locais.
- Painel inicial: preenchimento translúcido .36 e blur 2px, conservando o fallback quase opaco sem suporte a backdrop-filter.
- Créditos simplificados: título, perfis, funções, links e navegação; retirados os quatro blocos de texto aprovados e compactado o espaçamento.
- Galeria centralizada em `src/content.js`, com oito fotos distintas, dimensões e descrições. Duas metades de oito itens, ciclo de 53s (~44px/s no desktop), aviso de fotos ilustrativas, pausa e movimento reduzido preservados.
- Preview alinhado ao rewrite de `/desenvolvedores` da Vercel. Antes, o Vite entregava a home nessa URL sem barra final e o React recuperava a página no cliente com erros de hidratação. A regra só atua no preview local.

### Origem das cinco fotos acrescentadas

As fotos são ilustrativas, sem atribuição de autoria dos serviços à Roger. Licença conferida em 30/09/2026: [Pexels](https://www.pexels.com/license/). Download local pelo CDN em WebP, 600×750, qualidade 85:

| Arquivo | Autor e origem | Bytes |
|---|---|---|
| galeria-farol.webp | [Khunkorn Laowisit](https://www.pexels.com/photo/person-using-a-polishing-machine-on-the-car-5233268/) | 54042 |
| galeria-interior.webp | [Khunkorn Laowisit](https://www.pexels.com/photo/a-person-deep-cleaning-a-car-seat-5233285/) | 55974 |
| galeria-polimento.webp | [Khunkorn Laowisit](https://www.pexels.com/photo/a-person-polishing-the-white-car-5233279/) | 26346 |
| galeria-protecao.webp | [Tima Miroshnichenko](https://www.pexels.com/photo/water-droplets-on-a-white-car-6873177/) | 17722 |
| galeria-lavagem.webp | [WAVYVISUALS](https://www.pexels.com/photo/applying-car-cleaner-on-blue-sponge-20051453/) | 19380 |

As imagens originais das três fotos anteriores e os contatos, serviços, URLs e SEO foram preservados. Sem dependências adicionais, commit, push ou deploy.


### Verificação da revisão visual (30/09/2026)

- `npm test`: 7/7 aprovados, incluindo integridade das oito fotos da galeria.
- `npm run build`: aprovado; `git diff --check`: limpo.
- Playwright/Chromium no preview de produção: `/` e `/desenvolvedores` em 390×844, 640×900, 1440×900 e 1920×1080, sem erros JavaScript/hidratação e sem overflow horizontal. A rota com barra final também apresenta os créditos.
- Arquivos das oito fotos decodificados no navegador, dimensões conferidas. Para este check de integridade, o carregamento foi forçado somente na sessão de teste; o código mantém lazy loading.
- Loop inspecionado em 0ms, 52999ms e 53000ms: metades idênticas de 2336px no desktop, maiores que a viewport de 1920px, sem vão ao reiniciar.
- Botão Pausar coloca a animação em paused; menu móvel aplica inert no main e Escape fecha com aria-expanded=false. Movimento reduzido: animation=none, oito itens visíveis e rolagem horizontal manual.
- Links GitHub/Instagram preservados nos dois perfis; noindex confirmado nos créditos. A descoberta de hidratação no preview sem barra final foi corrigida pelo rewrite local; rechecagem passou.
- Inspeção visual realizada em Chromium, com capturas em `.playwright-mcp/`. Safari/iOS e aparelho físico não foram testados; a avaliação de contraste nesta revisão foi visual, sem nova medição numérica.


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

## 404 animada e retorno à home — 30/09/2026

A página 404 agora mostra um carro entrando pela esquerda, batendo em uma barreira e recuando levemente. Depois da cena de 3 segundos aparece a mensagem “Não foi possível chegar ao destino.” e começa a contagem de 5 segundos para voltar à página principal. O botão “Voltar agora” funciona desde o início; “Cancelar retorno automático” mantém a pessoa na página. Interagir com o cabeçalho também cancela o retorno, permitindo usar o menu com tranquilidade.

A ilustração usa SVG e CSS locais, sem bibliotecas novas. Movimento reduzido pula a cena e começa a contagem; sem JavaScript, a página mantém a cena estática, a explicação e o link de retorno. HTTP 404 e noindex foram preservados. Validação: 16 testes, build e diff check aprovados; Playwright verificou retorno, histórico, cancelamento, teclado, menu, movimento reduzido e sete larguras de 320 a 1920px. Detalhes no relatório da revisão. Sem commit, push ou deploy.

## Consolidação para versionamento — 30/09/2026

Após a aprovação do usuário para commit e push, as revisões desta sessão foram reunidas para publicação em `main`: fundo e galeria, `/devs` com easter egg, acessibilidade, segurança/SEO e 404 animada. Antes do commit, foram repetidos os 16 testes, o build e a checagem do diff, todos aprovados. Anexos recebidos, capturas do Playwright e saída de build ficam fora do versionamento. Os registros anteriores de “sem commit, push ou deploy” descrevem as etapas de implementação; a publicação do Git não comprova a conclusão de um deployment na hospedagem.

## Oferta, fotografias e descoberta de `/devs` — 30/09/2026

Este complemento registra o novo ajuste aprovado pelo usuário. Ele substitui, para o estado atual, a ordem anterior das seções, o serviço descrito como bancos sem couro e a decisão de excluir os créditos do SEO; os registros anteriores permanecem como histórico.

- A abertura usa “Brilho e proteção para seu carro em Sinop”, com descrição curta, localização “Jardim das Violetas · Sinop/MT”, “Pedir orçamento no WhatsApp” e “Ver serviços”. Depois da lista de serviços há outro CTA para pedir orçamento e orientação para quem tem dúvida sobre qual serviço escolher.
- A leitura segue apresentação → serviços → galeria → atendimento → localização no rodapé. A RAM, o vidro escuro e o WhatsApp flutuante continuam. As legendas dos serviços ficaram mais legíveis; as descrições distinguem polimento, espelhamento, cristalização e vitrificação sem acrescentar promessa de duração.
- O serviço correto é “Hidratação de bancos de couro”: “Tratamento de hidratação para preservar o toque e a aparência dos bancos de couro.” A foto desse serviço e a antiga foto de tecido da galeria passam a mostrar couro.
- A seção de atendimento orienta a consultar os serviços e combinar o atendimento pelo WhatsApp, com uma nova fotografia ilustrativa de polimento. Nenhuma foto é apresentada como trabalho, equipe ou instalação da Roger.
- A galeria reúne dez fotos distintas, mostradas em 4:3, com duas metades iguais e ciclo de 66s. Pausa, foco, duplicatas decorativas e rolagem manual em movimento reduzido são preservados. Ela mantém `loading="eager"` para evitar espaços vazios durante a animação CSS; são 324.800 bytes (317,2 KiB) de fotos distintas, com os mesmos URLs reutilizados pelas cópias. Fotos de serviços e atendimento usam carregamento adiado.

### Quatro novas fontes de fotografia

Downloads locais em WebP pelo CDN do Pexels, qualidade 82, com dimensões explícitas e recortes para o uso na página. A espuma usa `crop=top` para preservar o capô coberto. A imagem de couro tem duas saídas, por isso quatro fontes produzem cinco arquivos, totalizando 153.092 bytes (149,5 KiB). A [licença do Pexels](https://www.pexels.com/license/) e as fontes foram conferidas em 30/09/2026. As fontes anteriores continuam documentadas acima como histórico; a foto de tecido foi substituída no conteúdo ativo.

| Arquivo | Dimensões | Autor e fonte | Bytes |
|---|---|---|---|
| `experiencia-polimento.webp` | 1000×750 | [Dextar Studio](https://www.pexels.com/photo/person-polishing-the-surface-of-a-car-14615262/) | 42.790 |
| `servico-couro.webp` | 400×300 | [Filipp Romanovski](https://www.pexels.com/photo/leather-car-seat-16527891/) | 20.202 |
| `galeria-couro.webp` | 600×450 | [Filipp Romanovski](https://www.pexels.com/photo/leather-car-seat-16527891/) | 38.494 |
| `galeria-painel.webp` | 600×450 | [Ariyo](https://www.pexels.com/photo/crop-person-wiping-modern-car-panel-4218867/) | 33.848 |
| `galeria-espuma.webp` | 600×450 | [Jarne Aerts](https://www.pexels.com/photo/car-covered-in-foam-in-a-car-wash-5693659/) | 17.758 |

### Política atual de SEO

Em produção com `SITE_URL` ou `VERCEL_PROJECT_PRODUCTION_URL` válida, a home e `/devs` recebem `index, follow, max-image-preview:large`; os créditos têm título, descrição, canonical `/devs`, Open Graph e Twitter Card próprios. O `robots.txt` permite explicitamente `/devs` e referencia o sitemap. O `sitemap.xml` contém somente as URLs canônicas de `/` e `/devs`, sem aliases ou 404. O `llms.txt` inclui o link dos créditos e os dados públicos já existentes de Eduardo Gobatto e Fernando Riad.

Previews da Vercel e builds sem origem continuam com `noindex` e sitemap vazio; a página 404 permanece excluída. Os redirects antigos para `/devs` são preservados. O texto e os sete serviços vêm de `src/content.js`, mantendo a página, o catálogo JSON-LD e o `llms.txt` coerentes. Após a publicação autorizada, a conferência no Search Console deve incluir também `/devs`; indexabilidade não garante indexação.

Sem avaliações, antes/depois, fotos atribuídas à Roger, horários, preços ou durações não confirmados. Sem novas dependências, commit, push ou deploy nesta etapa.

### Verificação deste complemento

Resultados desta etapa, distintos das verificações históricas acima:

- `npm test`: 24/24 aprovados, zero falhas. Três builds sequenciais com `node scripts/build.mjs` (o script de `npm run build`) aprovados: produção sintética com `SITE_URL=https://roger.example.test`/`VERCEL_ENV=production`, preview com a mesma origem e `VERCEL_ENV=preview`, e local sem origem/`VERCEL_ENV`. O build local final foi restaurado, sem domínio fictício.
- Assertivas nos arquivos de `dist`: produção com home e `/devs` indexáveis, 404 noindex, canonical dos créditos sem barra final, sitemap exatamente com `/` e `/devs`, `Allow: /devs` e referência ao sitemap no robots. Preview e local com noindex e sitemap vazio. `llms.txt` contém o link dos créditos, ambos os nomes/funções e o serviço de couro; JSON-LD parseável com sete serviços, sem reviews/aggregateRating. Serviço antigo ausente no HTML, JSON-LD e `llms.txt`; ordem das seções e dois CTAs de orçamento confirmados.
- Playwright/Chromium no preview: `/` e `/devs` em 320, 390, 640, 768, 1080, 1440 e 1920px (altura 900px), com um h1, sem overflow e sem erros JavaScript/hidratação. Na home: dois CTAs de orçamento, sete serviços, dez fotos distintas e dez cópias decorativas com `aria-hidden`, legendas de 13px. Menu até 1080px: abertura, inert, foco contido e fechamento por Escape com retorno ao botão. “Ver serviços” chega à âncora sem ficar encoberta pelo cabeçalho.
- Vinte imagens da galeria decodificadas com dimensões conferidas; recortes de polimento, couro e espuma inspecionados. Pausa e retomada funcionais. Loop conferido em 0, 65999 e 66000ms: metades iguais de 2920px, sem vão em 1920px. Movimento reduzido: `animation: none`, dez itens visíveis e rolagem horizontal manual.
- Compatibilidade HTTP: `/desenvolvedores?ref=seo` retorna 308 para `/devs?ref=seo`; `/devs/index.html` retorna 308 para `/devs`; `/devs/` retorna 200 sem `X-Robots-Tag`. A última navegação observada ficou sem erros ou avisos no console.
- Inspeção visual em desktop 1440px e celular 390×844; capturas em `.playwright-mcp/`, ignoradas pelo Git. Revisão independente sem achados pendentes. `git diff --check` da documentação passou, com apenas avisos de normalização futura de LF para CRLF.

Safari/iOS e aparelho físico não foram testados; não houve nova medição de Core Web Vitals, commit, push ou deploy. A verificação local não comprova publicação nem indexação no Google.

## Versionamento deste complemento — 30/09/2026

Após o pedido explícito de commit e push, as mudanças de oferta, fotografias, hidratação de couro e SEO de `/devs` foram preparadas para publicação em `main`, incluindo os testes e esta documentação. Antes do commit, `npm test` foi repetido com 24/24 aprovados, `npm run build` passou e o diff foi conferido. Os registros anteriores de “sem commit, push ou deploy” descrevem a implementação antes dessa autorização e permanecem como histórico. A publicação do Git não comprova a conclusão de um deployment na hospedagem.
