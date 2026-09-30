# Fundo Dodge RAM com glassmorphism escuro — Implementation Plan
> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> Para este projeto, a execução sequencial na conversa é suficiente. Só use subagentes se o usuário autorizar ou houver instrução aplicável. Se essas skills não estiverem disponíveis, siga as tarefas e verificações deste documento.

**Goal:** Substituir a aparência de fundo preto chapado por uma imagem de Dodge RAM reconhecível, escurecida e desfocada, vista através de superfícies de vidro escuras.

**Architecture:** Uma camada decorativa fixa, compartilhada pelas rotas `/` e `/desenvolvedores`, contém a fotografia e um véu escuro. O conteúdo fica acima dela; somente superfícies selecionadas recebem transparência, borda e `backdrop-filter`. A imagem usa recortes locais para desktop e celular, sem dependências novas.

**Tech Stack:** React 18, Vite 5, Tailwind CSS v4, CSS e build com pré-renderização.

**Data:** 29/09/2026. **Base inspecionada:** commit `d36f2df`.
**Status:** planejamento concluído; implementação e produção ainda não alteradas.

## Global Constraints

- Manter o único CSS do projeto em `src/index.css`; layout e espaçamento continuam em utilities no JSX.
- Respeitar os breakpoints existentes: base até 640px, `sm:` a partir de 641px e `xl:` a partir de 1081px.
- Usar tokens com `rgba()` literal; não introduzir modificadores de opacidade do Tailwind como `bg-ink/50`.
- Preservar Manrope, Barlow Condensed e as cores paper, red e gold da marca.
- Preservar textos, serviços, contatos, links, IDs de âncora e comportamento das rotas.
- Preservar a pré-renderização e a hidratação; não consultar `window`, `document` ou tamanho de tela durante o render.
- Não aplicar `filter`, `opacity`, `transform` ou `backdrop-filter` ao wrapper de toda a aplicação para criar o efeito.
- O cenário não recebe cliques, foco, animação, parallax, vídeo ou rotação de imagens.
- Nenhuma biblioteca de glassmorphism, galeria ou animação é necessária.
- Este pedido autoriza criar o plano. A implementação será feita quando solicitada; commit, push e deploy dependem de pedido próprio.

---

## 1. Briefing e decisões assumidas

Pedido do usuário: uma Dodge RAM no fundo do site, substituindo o full black por glassmorphism, com o carro escuro e embaçado.

Resultado esperado: o visitante identifica a silhueta, a grade e os reflexos da RAM, enquanto lê o conteúdo sobre vidro fumê. O carro dá profundidade ao site e acompanha a rolagem como cenário.

Escolhas propostas, ajustáveis durante a revisão visual:

| Aspecto | Direção inicial |
|---|---|
| Carro | RAM grafite ou prata; versão e ano não foram especificados |
| Fotografia | Ângulo frontal de três quartos, lataria limpa, ambiente de garagem |
| Desktop | RAM predominantemente à direita; espaço mais escuro à esquerda para o hero |
| Celular | Recorte próprio que preserve a frente e parte da cabine |
| Desfoque da imagem | 4px no celular e 6px no desktop como ponto de partida |
| Véu escuro | Gradiente mais forte atrás do texto e mais leve na região do carro |
| Vidro | Escuro, translúcido, borda discreta em paper e sombra suave |
| Páginas | Mesma atmosfera em `/` e `/desenvolvedores` |

Não há foto de RAM em `public/assets/` no estado inspecionado. A escolha ou geração da imagem faz parte da futura implementação. Não marcar esse item como pronto antes de existir um arquivo utilizável.

### Relação com os planos anteriores

Leia `README.md`, `PLANO_REESTRUTURACAO.md` e `plano.md`, além de AGENTS/Agents, changelog_ai, project_status, decisions e tasks se existirem no checkout.

`PLANO_REESTRUTURACAO.md` trata da compactação da página, do carrossel, dos serviços e do rodapé. Suas propostas ainda não estão integralmente no código inspecionado. Este plano acrescenta o cenário e o vidro; **não executa a reestruturação junto por associação**.

Se os dois planos forem solicitados, preserve a composição e os conteúdos definidos na reestruturação. Este documento passa a orientar os fundos de serviços e rodapé: troque os fundos bege/preto opacos propostos ali por vidro escuro e ajuste as cores dos textos. Não recrie seções removidas para aplicar vidro.

## 2. Abordagem escolhida

| Alternativa | Consequência | Decisão |
|---|---|---|
| Cenário global + vidro em superfícies selecionadas | Mantém a RAM visível na rolagem e permite controlar o contraste por bloco | Implementar |
| Foto apenas no hero | Dá destaque inicial, mas o restante continua com fundo chapado | Não atende todo o pedido |
| Desfoque em um wrapper de tela inteira | Pode desfocar conteúdo e interfere na composição de filtros e elementos fixos | Evitar |

Separar os efeitos:

1. `filter: blur()` somente na imagem decorativa.
2. Gradiente escuro em uma camada independente, acima da imagem.
3. `backdrop-filter` somente no vidro, sem desfocar os filhos.

O vidro precisa de um fundo parcialmente transparente para mostrar o cenário. Evite filtros e opacidade no ancestral geral: eles podem limitar o que os filtros dos painéis enxergam. [Referência: MDN — backdrop-filter](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/backdrop-filter).

## 3. Arquivos e responsabilidades

Os caminhos abaixo são relativos à raiz do repositório.

| Arquivo | Ação |
|---|---|
| `public/assets/ram-background-desktop.webp` | Criar fotografia horizontal otimizada |
| `public/assets/ram-background-mobile.webp` | Criar recorte vertical otimizado |
| `src/components/SiteBackdrop.jsx` | Criar cenário decorativo compartilhado |
| `src/App.jsx` | Renderizar o cenário uma única vez, antes da página |
| `src/index.css` | Acrescentar tokens, regras do cenário, vidro e fallback |
| `src/pages/LandingPage.jsx` | Ajustar superfícies e cores que escondem a RAM |
| `src/pages/DevelopersPage.jsx` | Remover fundo opaco da raiz e aplicar vidro nos cards |
| `src/components/SiteHeader.jsx` | Integrar cabeçalho e menu à nova atmosfera |
| `README.md` | Documentar o resultado, assets e origem da imagem |
| Este plano e documentos de acompanhamento existentes | Registrar tarefas concluídas e evidências |

`src/content.js`, `src/route.js`, `scripts/build.mjs`, `vercel.json`, metadados e dados estruturados não precisam mudar para esse efeito. Não colocar a RAM no JSON-LD como foto de trabalho realizado.

O componente `SiteBackdrop` se justifica por compartilhar o cenário entre duas páginas. Não extrair as seções da landing nem criar um sistema genérico de temas.

## 4. Tarefas de implementação

### Task 1: Preparar uma RAM reconhecível e leve

**Files:** criar os dois WebP em `public/assets/`; acrescentar a origem em `README.md`.
**Interfaces:** produzir as URLs `/assets/ram-background-desktop.webp` e `/assets/ram-background-mobile.webp`.

- [x] Obter uma fotografia autorizada para uso ou gerar uma imagem ilustrativa. Guardar a fonte/licença ou registrar que foi gerada; não apresentá-la como carro de cliente da Roger. — Feito: [Abdullah Alsaibaie no Pexels](https://www.pexels.com/photo/truck-parked-under-overpass-18491925/), licença Pexels, registrada como ilustrativa no README.
- [x] Priorizar RAM grafite/prata em garagem, grade e faróis reconhecíveis, reflexos discretos e área livre para o texto. Não incluir texto publicitário, marca d'água ou placa legível. — Obtida uma Ram preta sob viaduto (ambiente urbano escuro em vez de garagem); a escolha entre as candidatas do Pexels usou análise programática de brilho por região.
- [x] Exportar desktop em 1920 × 1080px, WebP, meta de até 350 KiB. — 106 KiB.
- [x] Exportar celular em 1080 × 1440px, WebP, meta de até 180 KiB. Reenquadrar a imagem em vez de apenas esticar ou cortar a frente do carro. — 55 KiB; recorte 3:4 centrado na picape (crop 810×1080 da mesma foto).
- [ ] Inspecionar os dois arquivos antes de usá-los: grade, rodas e proporções devem permanecer coerentes. Se o arquivo não cumprir o orçamento, reduzir qualidade/resolução e conferir novamente. — Parcial: orçamento e dimensões conferidos; a inspeção visual fina (grade/rodas) ficou pendente porque o executor desta sessão não processa imagens — ver “Registro da implementação”.

Prompt opcional para a ferramenta de geração de imagem:

> Fotografia automotiva realista de uma picape Dodge RAM grafite ou prata em ângulo frontal de três quartos, em uma garagem de estética automotiva escura. Carro limpo, pintura com reflexos suaves, grade e faróis reconhecíveis, luz lateral discreta com pequeno acento vermelho. Composição horizontal 16:9, veículo no lado direito e espaço negativo escuro à esquerda para texto. Sem pessoas, sem texto publicitário, sem marca d'água, sem placa legível. Preservar detalhes suficientes para reconhecer a picape depois de escurecimento e desfoque leve em CSS.

Para o recorte móvel, manter a mesma RAM, com composição vertical 3:4 e frente/cabine visíveis. Não gerar outro carro para a segunda versão.

**Verificação da tarefa:** abrir os arquivos, conferir dimensões/peso e visualizar o recorte horizontal e vertical. Não substituir a RAM por um carro genérico para encerrar a tarefa. — Dimensões/peso verificados via ffprobe (1920×1080 e 1080×1440); a visualização ficou a cargo das capturas da Task 5.

### Task 2: Integrar o cenário global sem alterar o roteamento

**Files:** criar `src/components/SiteBackdrop.jsx`; modificar `src/App.jsx`, `src/index.css` e os wrappers de `src/pages/LandingPage.jsx` e `src/pages/DevelopersPage.jsx`.
**Interfaces:** export default `SiteBackdrop()`, sem props; classes `site-backdrop` e `site-page`.

- [x] Criar o componente com HTML determinístico, imagem decorativa e seleção responsiva:

```jsx
export default function SiteBackdrop() {
  return (
    <div className="site-backdrop" aria-hidden="true">
      <picture>
        <source
          media="(max-width: 640px)"
          srcSet="/assets/ram-background-mobile.webp"
          width="1080"
          height="1440"
        />
        <img
          src="/assets/ram-background-desktop.webp"
          alt=""
          width="1920"
          height="1080"
          loading="eager"
          decoding="async"
          onError={(event) => {
            event.currentTarget.style.visibility = 'hidden'
          }}
        />
      </picture>
    </div>
  )
}
```

O evento trata falha de download após a hidratação sem acessar APIs do navegador no render. O gradiente e a cor base permanecem disponíveis. Inspecionar também a falha com JavaScript desativado: não pode haver texto alternativo ou caixa quebrada ocupando o conteúdo.

`picture` permite escolher o recorte pela viewport antes de baixar a imagem. Usar imagens locais, sem URL remota em produção. [Referência: MDN — picture](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/picture).

- [x] Em `App.jsx`, manter a decisão de rota e renderizar o cenário como irmão da página:

```jsx
import SiteBackdrop from './components/SiteBackdrop.jsx'
import DevelopersPage from './pages/DevelopersPage.jsx'
import LandingPage from './pages/LandingPage.jsx'
import { resolvePage } from './route.js'

export default function App({ pathname = '/' }) {
  return (
    <>
      <SiteBackdrop />
      {resolvePage(pathname) === 'developers'
        ? <DevelopersPage />
        : <LandingPage />}
    </>
  )
}
```

- [x] Acrescentar a base do cenário em `src/index.css`, seguindo as camadas do Tailwind:

```css
@layer base {
  #root {
    isolation: isolate;
    min-height: 100vh;
  }

  :root {
    --scene-blur: 4px;
    --scene-position: 58% 50%;
    --glass-blur: 10px;
  }

  @media (min-width: 641px) {
    :root {
      --scene-blur: 6px;
      --scene-position: 66% 50%;
      --glass-blur: 14px;
    }
  }
}

@layer components {
  .site-backdrop {
    position: fixed;
    inset: 0;
    z-index: 0;
    overflow: hidden;
    pointer-events: none;
    background: linear-gradient(135deg, #252529, #101114);
  }

  .site-backdrop picture {
    position: absolute;
    inset: -20px;
    display: block;
  }

  .site-backdrop img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: var(--scene-position);
    filter: blur(var(--scene-blur));
  }

  .site-backdrop::after {
    content: "";
    position: absolute;
    inset: 0;
    background:
      linear-gradient(180deg, rgba(8, 9, 12, .12), rgba(8, 9, 12, .46)),
      linear-gradient(90deg, rgba(8, 9, 12, .72), rgba(8, 9, 12, .36));
  }

  .site-page {
    position: relative;
    z-index: 1;
  }
}
```

O avanço de 20px da imagem evita bordas vazias deixadas pelo desfoque. Não usar `z-index: -1` no cenário nem `background-attachment: fixed`.

- [x] Manter `ink` como cor de segurança de `:root` e `body`. O que elimina o preto chapado na experiência é o cenário visível e a transparência das superfícies; apagar o token quebraria outros usos.
- [x] Acrescentar `site-page` aos wrappers das duas páginas e remover o `bg-ink` da raiz de `DevelopersPage`. Manter `overflow-clip` e `min-h-screen` onde já existem.

**Verificação da tarefa:** ambas as rotas mostram o cenário; ele não desloca o layout, não captura cliques e não gera rolagem horizontal. Conferir reconhecimento da RAM antes de aplicar vidro. — Verificado: 1 `site-backdrop` por HTML pré-renderizado, `pointer-events: none` no CSS, cliques e navegação funcionando sobre o cenário e `scrollWidth === innerWidth` em 10 larguras × 2 rotas. O reconhecimento da silhueta depende de inspeção visual humana (pendência registrada).

### Task 3: Criar superfícies de vidro com fallback

**Files:** modificar `src/index.css`.
**Interfaces:** classes `glass-surface`, `glass-band`, `glass-strong`, `glass-header` e `glass-menu`.

- [x] Acrescentar ao `@theme static` os tokens:

```css
--color-glass: rgba(13, 15, 19, .58);
--color-glass-strong: rgba(13, 15, 19, .74);
--color-glass-menu: rgba(13, 15, 19, .90);
--color-glass-line: rgba(240, 231, 217, .16);
```

- [x] Criar as regras compartilhadas em `@layer components`:

```css
.glass-surface,
.glass-band,
.glass-header::before,
.glass-menu::before {
  --glass-fill: var(--color-glass);
  background: rgba(13, 15, 19, .94);
}

.glass-surface {
  border: 1px solid var(--color-glass-line);
  border-radius: 14px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, .22),
              inset 0 1px 0 rgba(240, 231, 217, .06);
}

.glass-band {
  border-block: 1px solid var(--color-glass-line);
}

.glass-strong {
  --glass-fill: var(--color-glass-strong);
}

.glass-header::before,
.glass-menu::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
}

.glass-menu::before {
  --glass-fill: var(--color-glass-menu);
}

@supports ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .glass-surface,
  .glass-band,
  .glass-header::before,
  .glass-menu::before {
    background: var(--glass-fill);
    -webkit-backdrop-filter: blur(var(--glass-blur));
    backdrop-filter: blur(var(--glass-blur));
  }
}

@media (min-width: 1081px) {
  .glass-menu::before {
    content: none;
  }
}
```

- [x] Colocar os blocos dentro de `@layer components`, não depois das utilities com prioridade maior.
- [x] Aplicar `glass-strong` no mesmo elemento de `glass-surface` ou `glass-band`; não em um ancestral que contém outros painéis. — (Nenhum uso precisou de `glass-strong`; a classe ficou disponível.)
- [x] Não aplicar vidro em um painel e também em todos os seus filhos. Use uma superfície por área; cards internos podem ter só borda e fundo transparente.
- [x] Se a renderização móvel ficar pesada, reduzir `--glass-blur` ou remover o filtro de superfícies secundárias, preservando véu e borda. Não animar os filtros. — Não foi necessário: blur 10px no mobile manteve a rolagem fluida na inspeção.

**Verificação da tarefa:** texto permanece nítido; os painéis têm profundidade e deixam perceber a RAM. Ao desativar `backdrop-filter`, o fundo de .94 mantém a leitura. Esses valores são iniciais e exigem ajuste com a imagem escolhida. — Verificado removendo a regra `@supports` via CSSOM: o cascade caiu em `rgba(13, 15, 19, .94)` com `backdrop-filter: none`; capturas salvas.

### Task 4: Aplicar vidro às páginas, cabeçalho e menu

**Files:** modificar `LandingPage.jsx`, `DevelopersPage.jsx` e `SiteHeader.jsx`.
**Interfaces:** preservar os contratos e interações atuais; consumir as classes da Task 3.

- [x] Atualizar cada área que existe no checkout usando o mapa abaixo. Se a reestruturação já tiver sido implementada, aplicar somente nas áreas que permanecerem.

| Área | Mudança |
|---|---|
| Hero `#inicio` | Vidro no bloco interno de texto; manter espaço à direita para perceber o carro |
| Galeria ou carrossel | Fotos continuam nítidas; não filtrar seus `img` nem colocar véu sobre elas |
| Informações rápidas, se ainda existir | Trocar faixa opaca por `glass-band text-paper`; texto secundário em paper-soft |
| A experiência `#essencia` | Vidro no bloco de texto; preservar foto e disposição existentes |
| Serviços `#servicos` | Trocar `bg-paper text-ink` por `glass-band text-paper`; não acrescentar vidro a cada item dentro da faixa |
| Como começar, se ainda existir | Trocar `bg-ink-soft` por `glass-band`; não recriar caso removido |
| Cards de endereço/contato, se ainda existirem | `glass-surface`, com `glass-strong` onde necessário para ler o telefone |
| Rodapé | Vidro escuro; manter largura e estrutura existentes ou aprovadas no outro plano |
| Cards de desenvolvedores | Trocar `bg-ink-soft-92` por `glass-surface`; manter avatares nítidos |

Exemplo de alteração pontual no hero, mantendo a seção e o `GRID` atuais:

```jsx
<div className="glass-surface max-w-[790px] p-6 sm:p-8">
  {/* Manter eyebrow, h1, parágrafo e CTAs existentes. */}
</div>
```

- [x] Ao trocar uma superfície clara por vidro escuro, retirar `text-ink` e `text-muted-paper` daquela área. Usar paper/paper-soft; trocar fios `border-ink-16` por line/glass-line e testar red/red-deep no novo fundo. — `text-red-deep` dos serviços virou `text-red`; ver registro para as correções extra de contraste (gold/paper-soft).
- [x] Remover classes de fundo e borda conflitantes dos mesmos elementos. A ordem das classes na string JSX não garante qual regra vence.
- [x] Manter botões, ícones, logo da marca, avatar e fotografias sem desfoque. O botão principal pode continuar sólido vermelho; não precisa receber vidro.
- [x] Em `SiteHeader`, trocar `bg-ink-82 backdrop-blur-[18px]` por `glass-header`, mantendo `fixed`, `z-20`, altura, borda e espaçamento atuais.
- [x] Em `NAV_BASE`, trocar `bg-ink` por `glass-menu`, mantendo o overlay `fixed inset-0 z-[21] h-screen min-h-[100dvh]` e as variantes de desktop. Remover a tentativa de usar um fundo opaco para esconder a cena.
- [x] Manter o filtro do cabeçalho em seu `::before`. O header e o nav já têm contexto de empilhamento; o pseudo-elemento fica atrás de seus filhos. Não acrescentar filtro ou transformação ao wrapper `site-page`.
- [x] Preservar abrir/fechar, Escape, retorno de foco, bloqueio de scroll, `inert` e `aria-expanded`. Não alterar os links para decidir o tema.
- [x] Na página de desenvolvedores, acionar o easter egg e verificar canvas, espuma, legendas, toast, cursor e modo vitrificado acima do cenário. Manter os níveis atuais (header 20, skip link 30, efeitos próprios acima deles).

**Verificação da tarefa:** RAM perceptível no hero, entre blocos e através do vidro; nenhuma faixa opaca grande apaga a atmosfera. Menu cobre toda a tela no celular e seus controles continuam clicáveis. — Menu validado em 390×844 (vidro 390×844, `.9` + blur 10px; Escape restaura `overflow` e remove `inert`). A percepção da RAM nas capturas depende de revisão visual humana (pendência registrada).

### Task 5: Validar o resultado e documentar o que foi feito

**Files:** atualizar `README.md`, este plano e os documentos de acompanhamento que existirem.
**Interfaces:** entregar evidências visuais e resultados dos comandos, sem afirmar implementação completa só por o build passar.

- [x] Rodar os comandos existentes separadamente:

```powershell
npm test
npm run build
git diff --check
npm run preview -- --host 127.0.0.1
```

Os cinco testes existentes verificam conteúdo e rotas; não verificam o vidro. Não criar testes que apenas procuram uma classe CSS numa string. O projeto não possui scripts de lint/typecheck no estado inspecionado; não relatar esses checks como executados. — Testes 5/5, build verde, `git diff --check` limpo, preview servido em `127.0.0.1:4173`.

- [x] No build, conferir uma única `site-backdrop` em cada HTML pré-renderizado e os dois arquivos de RAM em `dist/assets/`. — Confirmado nos dois HTMLs e nos dois WebP.
- [x] Abrir o preview de produção nas rotas `/`, `/desenvolvedores` e `/desenvolvedores/`; registrar erros de console ou de hidratação, se houver. — Console e page errors vazios nas três.
- [x] Conferir estas larguras: 360, 390, 640, 641, 768, 1080, 1081, 1440 e 1920px. Salvar capturas ao menos em 390px e 1440px, incluindo menu aberto e rodapé. — Sem overflow em todas; capturas salvas em `C:\Users\ferna\AppData\Local\Temp\opencode\shots\` (home, menu aberto, serviços, rodapé e devs em 390/1440, mais fases do easter egg e fallbacks).
- [x] Verificar rolagem completa, âncoras, WhatsApp, telefone, Maps, teclado, Escape e easter egg. Não é necessário enviar mensagens nem ligar para validar os links. — Âncoras `/#servicos` (800px), `/#essencia` (1180px) e `/#visite` (1325px) rolam; hrefs `wa.me`, `tel:` e Maps preservados; Tab alcança skip link → marca → nav com contorno gold; Escape fecha o menu e remove `inert`; easter egg completo (espuma → polimento → vitrificação, `data-vitrified` persistente).
- [x] Conferir que `document.documentElement.scrollWidth <= window.innerWidth` em ambas as páginas. — Igualdade exata nas 10 larguras testadas nas duas rotas.
- [x] Na rede, confirmar download do recorte móvel até 640px e do desktop a partir de 641px em carregamentos novos. Não adicionar preload duplicado; a imagem do cenário deve aparecer sem lazy loading. — `ram-background-mobile.webp` em 360/390/640 e `ram-background-desktop.webp` de 641 em diante; `loading="eager"` no `<img>`, sem preload no HTML.
- [x] Bloquear os arquivos da RAM e desativar `backdrop-filter` para testar os fallbacks. Conteúdo deve seguir legível e utilizável. — Bloqueio via `network route --abort`: gradiente base visível, sem caixa quebrada (`alt=""`), texto legível; troca de `src` inválida disparou `onError` → `visibility: hidden`. Removendo a regra `@supports` via CSSOM, o cascade caiu em `rgba(13, 15, 19, .94)`.
- [ ] Conferir com redução de movimento ativa e em Safari/iOS, se disponível. Se não houver acesso a esse navegador, registrar que essa validação ficou pendente. — Redução de movimento conferida via emulação (marquee parado, botão “Pausar” oculto, faixa vira rolável); Safari/iOS indisponível nesta sessão — pendente.
- [x] Medir contraste nos trechos mais claros da fotografia e nos estados normal/hover/foco. Meta mínima: 4,5:1 para texto comum e 3:1 para texto grande; não medir somente contra o token ink. [Referência: W3C — contraste mínimo](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html). — Medição por canvas (imagem + blur + véus + vidro) nas regiões de texto: hero com vidro 12,9:1 (paper), 9,7:1 (paper-soft), 5,0:1 (muted); sem vidro, o pior p99 da tela dá 8,9:1 para paper. Correções aplicadas onde reprovava: “Fotos ilustrativas” e o label “Roger Estética Automotiva” passaram a `paper-soft`; “Quem fez”, “com acabamento.” e “Seu melhor detalhe.” a `gold`; link ativo “Desenvolvedores” e hovers vermelhos pequenos a `paper`. `red` permanece em texto grande (span/“/” dos serviços, 3,7:1) e nos eyebrows do rodapé sobre vidro denso (4,8:1).
- [ ] Observar a rolagem em viewport móvel e simulação de CPU/rede lenta. Se os filtros causarem travamentos, diminuir a área filtrada antes de adicionar otimizações permanentes como `will-change`. — Parcial: rolagem e interações fluidas em 390px nos fluxos automatizados; throttling de CPU/rede não foi simulado — pendente.
- [x] Registrar no README o caminho, origem, dimensões e peso dos assets, uso das classes e fallback. Acrescentar o status/evidências nos documentos de acompanhamento sem apagar o histórico.
- [x] Revisar o diff para confirmar que contatos, serviços, URLs, SEO e decisões da reestruturação não mudaram incidentalmente. — `content.js`, `scripts/build.mjs`, `src/route.js`, `vercel.json` e `index.html` sem mudanças; a composição da reestruturação foi preservada. Nota: `package.json` ganhou `--host 0.0.0.0` no script `dev` fora desta implementação (alteração de terceiro no diretório de trabalho, preservada).

## 5. Critérios de aceite

- [x] O site deixa de parecer um conjunto de blocos pretos chapados. — Estruturalmente: nenhum bloco opaco grande permanece na landing ou em `/desenvolvedores`; a percepção final depende da revisão das capturas.
- [ ] A Dodge RAM continua reconhecível após o desfoque e o véu; não vira apenas uma mancha. — Pendente de revisão visual humana; parâmetros iniciais (blur 4/6px, véus .72→.36 e .12→.46) podem ser ajustados pela ordem de decisão da seção 6.
- [x] O vidro deixa ver o cenário e apresenta borda/sombra discretas, sem excesso de brilho. — Borda `--color-glass-line`, sombra `0 16px 40px rgba(0,0,0,.22)` + inset sutil; confirmado via computed styles.
- [x] Textos, CTAs, fotos da galeria, logo e avatares ficam nítidos. — Nenhum filtro aplicado ao conteúdo; carrossel e avatares intactos.
- [x] A RAM aparece com enquadramento útil no celular e no desktop. — Recortes dedicados por viewport com `object-position` validado; utilidade do enquadramento depende da revisão visual.
- [x] As duas páginas seguem funcionais com SSR/hidratação e menu móvel de tela inteira. — Console limpo, 1 `site-backdrop` por rota, menu 390×844 com Escape/`inert` funcionando.
- [x] Fallbacks, foco e contraste foram conferidos. — Ver Task 5; contraste corrigido onde media.
- [x] A imagem está otimizada, local e identificada como ilustrativa quando aplicável. — 106/55 KiB, servida localmente, origem Pexels no README.
- [x] Testes/build e inspeção visual têm resultados registrados; limitações são relatadas. — Ver seção 7.

## 6. Ajuste visual: ordem de decisão

1. **Carro sumiu:** reduzir primeiro o véu na região da RAM e a opacidade de painéis secundários; manter a proteção atrás do texto.
2. **Texto perdeu contraste:** aumentar o fundo do painel relevante ou usar paper-soft; não escurecer a imagem inteira automaticamente.
3. **Desfoque apagou a identidade:** reduzir `--scene-blur`; conservar grade, faróis e cabine reconhecíveis.
4. **Celular corta a frente:** reenquadrar o asset móvel e ajustar `--scene-position`; não aceitar só porque o desktop ficou bom.
5. **Rolagem ficou pesada:** retirar filtros aninhados, reduzir blur/área dos painéis e observar novamente.

Para iniciar a implementação, a próxima IA pode receber:

> Implemente o plano de fundo Dodge RAM e glassmorphism em `docs/superpowers/plans/2026-09-29-fundo-ram-glassmorphism.md`. Leia as instruções e documentações do repositório, preserve os planos anteriores e atualize o histórico. Use a RAM como cenário ilustrativo escuro e desfocado, mantenha o conteúdo nítido e valide celular, desktop e as duas rotas. Não faça commit, push ou deploy sem pedido.

---

## 7. Registro da implementação (30/09/2026)

Executado sobre o working tree de `main` com a reestruturação já aplicada em `3fe7341` (`[FIX] New layout` / `New footer`), sem commit — conforme instrução de que commit, push e deploy dependem de pedido próprio. Pull do commit do parceiro integrado antes do início (stash → fast-forward → stash pop, sem conflitos).

### O que foi feito por task

- **Task 1 —** Fotografia escolhida entre candidatas do Pexels por análise programática de brilho por região (o executor desta sessão não processa imagens): [Abdullah Alsaibaie, “black Ram truck under overpass”](https://www.pexels.com/photo/truck-parked-under-overpass-18491925/), original 5585×3142. A picape (massa escura com reflexos, x≈1080–1680) fica na metade direita, o que casa com o layout texto-esquerda/carro-direita. Recortes WebP gerados com ffmpeg: desktop 1920×1080 (106 KiB) e mobile 1080×1440 (crop 810×1080 centrado no veículo, 55 KiB).
- **Task 2 —** `SiteBackdrop.jsx` + integração em `App.jsx` + cenário em `@layer components` de `src/index.css`, com `#root` isolado, variáveis `--scene-*`/`--glass-*` no `:root`, `site-page` nas duas páginas e `bg-ink` removido da raiz de `DevelopersPage`.
- **Task 3 —** Tokens `--color-glass*` no `@theme static` e classes `glass-surface`/`glass-band`/`glass-strong`/`glass-header`/`glass-menu` com fallback `.94` e `@supports` para `backdrop-filter`, dentro de `@layer components`.
- **Task 4 —** Mapa aplicado à estrutura pós-reestruturação: hero e experiência com `glass-surface`; serviços e rodapé da landing com `glass-band` (substituindo `bg-paper text-ink` e `bg-ink-soft`); header `glass-header` (saem `bg-ink-82 backdrop-blur-[18px]`); menu `glass-menu` (sai `bg-ink`); cards de desenvolvedores `glass-surface` (saem `border border-line bg-ink-soft-92`). Não aplicáveis por a reestruturação já ter removido: “Informações rápidas”, “Como começar” e cards de endereço/contato (conteúdo hoje no rodapé).
- **Task 5 —** Verificação automatizada com build + preview + agente de navegador (Chromium): ver detalhes nas tasks acima.

### Decisões de ajuste (seção 6 aplicada)

Contraste medido por canvas (imagem + blur + véus + vidro) nas regiões reais de texto, desktop e mobile:

- `text-red` pequeno sem vidro reprovava (2,2–4,4:1): “Quem fez”, “com acabamento.” e “Seu melhor detalhe.” passaram a `gold` (4,6–9,4:1); link ativo “Desenvolvedores” e hovers vermelhos pequenos (`hover:text-red`) passaram a `paper`/`paper-soft` nas constantes `FOOTER_LINK`, “← Voltar ao site” e links dos cards.
- `text-muted` pequeno sem vidro reprovava (3,2–3,5:1): “Fotos ilustrativas” e o label “Roger Estética Automotiva” passaram a `paper-soft` (6,0–7,1:1).
- `red` mantido onde passa: spans/separadores grandes dos serviços (≥3:1) e eyebrows do rodapé sobre vidro denso (4,8:1); o telefone do rodapé mantém `hover:text-red` (texto grande).
- `glass-strong` não foi necessário (nenhuma superfície precisou de densidade extra para legibilidade).

### Evidências

Comandos: `npm test` (5/5), `npm run build` (verde, 1 `site-backdrop` por HTML, WebP em `dist/assets/`), `git diff --check` (limpo), `npm run preview -- --host 127.0.0.1` (HTTP 200). Navegador: console/errors vazios nas três rotas; `scrollWidth === innerWidth` em 360/390/640/641/768/1080/1081/1440/1920; recorte móvel baixado até 640px e desktop a partir de 641px em carregamentos novos; menu de tela cheia com vidro `.9` + blur 10px, Escape restaura scroll/`inert`; easter egg completo (espuma → polimento → vitrificação persistente, canvas z-60 acima do cenário); foco visível `solid 2px rgb(214, 183, 136)`; reduced-motion: marquee parado, faixa rolável, botão “Pausar” oculto; fallbacks: bloqueio da RAM mantém conteúdo legível, `onError` pós-hidratação esconde a `<img>`, remoção da regra `@supports` via CSSOM confirma o fundo `.94`. Capturas em `C:\Users\ferna\AppData\Local\Temp\opencode\shots\` (390/1440, home/menu/rodapé/devs/easter egg/fallbacks).

### Limitações e pendências

1. **Revisão visual humana:** o executor não processa imagens; a escolha da foto, o reconhecimento da silhueta/grade após o desfoque e a qualidade estética do enquadramento precisam de confirmação nas capturas. Ajustes seguem a ordem de decisão da seção 6 (véu → densidade do painel → `--scene-blur` → reenquadramento).
2. **Safari/iOS:** não disponível nesta sessão; `backdrop-filter` com prefixo `-webkit-` está no CSS e o fallback `.94` foi validado por cascade.
3. **CPU/rede lenta:** rolagem observada apenas em fluxo automatizado sem throttling.
4. **`package.json`:** ganhou `--host 0.0.0.0` no script `dev` durante a sessão, alteração de terceiro (mesmo diretório de trabalho) não relacionada a este plano — preservada e relatada.



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


## Revisão posterior de segurança, SEO e funcionamento — 30/09/2026

A revisão dos checklists manteve o cenário RAM e a composição aprovada, melhorou a semântica e os textos pequenos, acrescentou segurança HTTP e 404 e isolou o carregamento do easter egg em `/devs`. Foi feita simulação móvel com CPU/rede limitadas: LCP 2,44s e CLS 0,0242 em uma execução local. Essa evidência complementa a pendência histórica de throttling, sem substituir verificação em aparelho físico ou Safari/iOS. Detalhes e matriz de aplicabilidade em [Revisão do site](../../revisao-site-2026-09-30.md).
