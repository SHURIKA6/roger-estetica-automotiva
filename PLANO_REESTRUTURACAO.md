# Plano de reestruturação da landing — Roger Estética Automotiva

> **Documento de passagem de contexto.** Foi escrito numa conversa anterior para ser colado ou lido numa conversa nova, que vai **implementar** as mudanças. Ele é autossuficiente: explica o projeto, o pedido original do usuário, as decisões já tomadas, as interpretações que ainda podem ser ajustadas, o passo a passo de implementação com trechos de código sugeridos, as armadilhas conhecidas e como verificar o resultado.
>
> Data de referência: 29/09/2026. Números de linha valem para o commit `9b43d33` (branch `main`). Se o código tiver mudado, localize os trechos pelo conteúdo, não pela linha.

---

## Sumário

0. [Como usar este documento](#0-como-usar-este-documento)
1. [O projeto em 2 minutos](#1-o-projeto-em-2-minutos)
2. [O pedido original do usuário](#2-o-pedido-original-do-usuário-na-íntegra)
3. [Decisões que o usuário já tomou](#3-decisões-que-o-usuário-já-tomou)
4. [Interpretações assumidas (podem ser revistas)](#4-interpretações-assumidas-podem-ser-revistas)
5. [Mapa da landing hoje](#5-mapa-da-landing-hoje)
6. [Estrutura-alvo](#6-estrutura-alvo)
7. [Implementação, item por item](#7-implementação-item-por-item)
8. [O carrossel automático em detalhe](#8-o-carrossel-automático-em-detalhe)
9. [Esconder /desenvolvedores (build e SEO)](#9-esconder-desenvolvedores-build-e-seo)
10. [Limpeza de código e documentação](#10-limpeza-de-código-e-documentação)
11. [Armadilhas conhecidas](#11-armadilhas-conhecidas)
12. [Verificação](#12-verificação)
13. [Fora de escopo](#13-fora-de-escopo)

---

## 0. Como usar este documento

Se você é o assistente da conversa nova:

1. **Leia este arquivo inteiro antes de mexer em qualquer coisa.**
2. Depois leia no repositório, nesta ordem:
   - `src/pages/LandingPage.jsx`, onde está quase todo o trabalho;
   - `src/content.js`;
   - `src/components/SiteHeader.jsx`;
   - `src/index.css`;
   - `scripts/build.mjs`.
3. Antes de começar, confirme com o usuário os pontos da [seção 4](#4-interpretações-assumidas-podem-ser-revistas), ou pergunte se pode seguir com eles como estão.
4. Implemente na ordem da [seção 7](#7-implementação-item-por-item). Os itens são quase independentes, mas remover as seções primeiro deixa o arquivo menor e mais fácil de editar.
5. Rode a [verificação](#12-verificação) no final.
6. **Não faça commit nem push** sem o usuário pedir. A branch é `main`.
7. Responda ao usuário em **português**.

---

## 1. O projeto em 2 minutos

**O que é:** landing page de uma estética automotiva em Sinop/MT ("Roger"), com uma página secundária de créditos (`/desenvolvedores`). O objetivo comercial é levar o visitante ao **WhatsApp**.

**Stack**

| Item | Detalhe |
|---|---|
| UI | React 18, sem roteador (a rota é resolvida em `src/route.js`) |
| Build | Vite 5 + `scripts/build.mjs`, que pré-renderiza cada rota com `renderToString` e gera `dist/index.html`, `dist/desenvolvedores/index.html`, `sitemap.xml`, `robots.txt` e `llms.txt` |
| CSS | **Tailwind CSS v4** (`@import "tailwindcss"` + `@theme static` em `src/index.css`), único arquivo CSS |
| Testes | `node --test` (arquivos `src/content.test.js` e `src/route.test.js`) |
| Deploy | Vercel (`vercel.json` reescreve `/desenvolvedores` para `/desenvolvedores/index.html`) |

**Scripts** (`package.json`): `npm run dev` (vite), `npm test` (`node --test`), `npm run build` (`node scripts/build.mjs`), `npm run preview`.

**Estrutura relevante**

```
src/
  App.jsx                 escolhe LandingPage ou DevelopersPage via resolvePage(pathname)
  route.js                '/desenvolvedores' → 'developers', resto → 'landing'
  content.js              ÚNICA fonte de textos/links/serviços. SEM JSX de propósito (o build.mjs importa em Node puro)
  icons.jsx               ArrowIcon (direction 'up-right' | 'down'), PinIcon, PhoneIcon, SparkIcon, InstagramIcon, GithubIcon
  index.css               tokens, breakpoints, base, keyframes do easter egg
  components/
    Brand.jsx             logo + "ROGER / estética automotiva" (link para /#inicio)
    SiteHeader.jsx        header fixo; abaixo de 1081px vira overlay de tela cheia
    SkipLink.jsx
    DetailingEasterEgg.jsx  (só na página de devs)
  pages/
    LandingPage.jsx       todas as seções da landing, inline
    DevelopersPage.jsx    créditos (Eduardo Gobatto e Fernando Riad)
public/assets/
  roger-logo.jpg
  WhatsApp.svg.webp       250×251, fundo TRANSPARENTE, logo oficial (balão verde com borda branca)
  galeria-detalhamento.webp  499×750 (retrato 2:3)
  galeria-brilho.webp        500×750 (retrato 2:3)
  galeria-reflexo.webp       500×750 (retrato 2:3)
scripts/build.mjs
plano.md                  plano ANTIGO de um carrossel de "trabalhos" com setas (superado por este)
COMO_FUNCIONA.md          documentação didática do projeto (não rastreada no git)
```

**Convenções do projeto (siga-as)**

- **Mobile-first.** Breakpoints customizados em `index.css`: `sm:` = `min-width: 641px`, `lg:` e `xl:` = `min-width: 1081px`. Os breakpoints padrão do Tailwind estão desligados. **Use `sm:` e `xl:`**, como o resto do código.
- **Componente só existe quando é reusado em mais de uma página.** Seções da landing ficam inline no `LandingPage.jsx`. O carrossel também fica inline.
- **Constantes de classes** no topo do `LandingPage.jsx`: `GRID`, `EYEBROW`, `SECTION_TAG`, `BUTTON`, `BUTTON_LIGHT`, `BUTTON_DARK`, `H2`. Reaproveite ou crie constantes no mesmo estilo em vez de repetir strings longas.
- **Comentários em português**, curtos, explicando o *porquê*. Cada seção do JSX tem um cabeçalho: `{/* Nome da seção ------------------ */}`.
- **Tokens de cor** (`@theme` em `index.css`): `ink #0d0d0c`, `ink-soft #151513`, `ink-light #21201d`, `paper #f0e7d9` (o bege), `paper-soft #d7cdbf`, `muted #978f86`, `muted-paper #5d554d`, `red #ea4436`, `red-deep #b5221c`, `gold #d6b788`. Fios: `line` (paper 18%), `ink-16`, `paper-24` e outros. **Não use o modificador `/opacidade` do Tailwind**: o projeto usa tokens `rgba()` literais porque o `/xx` gera `color-mix()` em oklab e muda a cor.
- **Fontes:** `font-sans` = Manrope (texto), `font-display` = Barlow Condensed (títulos, sempre `uppercase`).
- **Transições:** o padrão já é `200ms ease`, então basta um `transition-colors` seco.
- Foco visível global: `outline 2px gold, offset 5px`.

---

## 2. O pedido original do usuário (na íntegra)

O usuário anexou 6 prints (botão do WhatsApp em hover, rodapé, faixa bege de destaques, seção "A experiência", seção de serviços e seção "Como começar") e escreveu:

> Preciso de um plano de reestruturação do site para que fique mais compacto no geral.
> Estou pensando em ter um carrosel de imagens também...
>
> Vamos debater sobre:
> 1- Rodapé que cobre todo o width do site;
> 2- Deixe o logo do WhatsApp ser o botão completo, sem hover ou margen dos lados;
> 3- Tem uma transição das imagens para um campo em bege com alguns destaque que está cagando o site, acho melhor nem existir...
> 4- Logo abaixo temos essa parte do site:
> "A experiência
>
> Mais que limpeza. É cuidado que aparece."
> Onde há essa quebra de font e titulo, prefiro que o titulo fique grande o subtitulo em caption, e uma imagem a direita.
> 5- Botão de "Quero Cuidar" desnecessário, remova.
> 6- Essa parte do sistema, novamente com uma repartição com fonte pequena a esquerda.
> Remova:
> "Serviços"
> E deixe o titulo central bem evidente:
> "Sete formas de cuidar melhor
> Escolha o próximo nível de cuidado."
> 7- Abaixo desse titulo "Serviços" - (Remova) eu quero apenas os títulos em destaque não precisa de subtitulos explicando, e sem a descrição também como: "Recuperação", "Proteção" e etc...
> 8-Toda essa parte do site pode ser removida:
> "Como começar
>
> Seu carro pede cuidado. A Roger resolve."
> 9- A tag do "Visite a gente" pode ser acoplada no rodapé. Deixe ele mais denso com informações.
> 10- Remova o link que leva para /desenvolvedores deixe oculto, quero que a tela ainda exista, mas só se escrever na url diretamente.

**O que se lê nas entrelinhas:** o usuário não gosta do padrão "rótulo pequeno numa coluna à esquerda + título na coluna à direita" (aparece em "A experiência" e em "Serviços"). Quer títulos fortes, menos texto explicativo, menos CTAs repetidos e uma página mais curta.

---

## 3. Decisões que o usuário já tomou

Estas foram perguntadas explicitamente e respondidas. **Não reabra.**

| Pergunta | Resposta do usuário |
|---|---|
| Como deve ser o carrossel? | *"Como um carrossel com transição que 'move' as imagens sozinho."* Ou seja, **movimento automático**. Ele entra no lugar da galeria atual de 3 fotos, logo abaixo do hero. |
| Como exibir os 7 serviços (só os nomes)? | **Lista editorial centralizada**: nomes grandes em linha, centralizados, separados por um marcador vermelho (`/`). |
| Qual imagem vai à direita de "Mais que limpeza…"? | **`galeria-detalhamento.webp`** (profissional cuidando da pintura). |

---

## 4. Interpretações assumidas (podem ser revistas)

Pontos em que o pedido era ambíguo e a conversa anterior **escolheu uma leitura sem confirmar com o usuário**. Na conversa nova, apresente estes pontos e pergunte se pode seguir. Se o usuário não se importar, siga como está.

1. **Tipo de movimento do carrossel.** A escolha foi uma **faixa contínua** (estilo *marquee*), feita só com CSS, que desliza sem parar e pausa no hover. A alternativa é avançar **foto por foto** a cada N segundos (precisa de JS com `setInterval` e scroll-snap). A contínua é mais simples, não tem estado e não "pula".
2. **Botão de pausar no carrossel.** O usuário **não pediu**. Foi incluído porque conteúdo que se move sozinho por mais de 5 segundos precisa de um controle de pausa (WCAG 2.2.2). É um botão discreto de texto ("Pausar" / "Retomar").
3. **Item 2, "sem margem dos lados".** Lido como: tirar o círculo bege e o espaço entre o círculo e o logo, de modo que o botão **seja** o logo. O botão continua fixo a 16px (celular) / 24px (desktop) da borda da tela. Se o usuário quiser o botão encostado na borda, é outra leitura.
4. **Item 4, o rótulo "A experiência".** Foi **removido por completo** (não vira eyebrow acima do título). O link "A experiência" no header continua apontando para `#essencia`.
5. **Item 4, o que é "subtítulo em caption".** O parágrafo "Seu carro tem linhas, textura e personalidade…" vira uma legenda pequena abaixo do título grande.
6. **Item 10, escopo do "oculto".** Além de tirar os links, a proposta também **tira a página do `sitemap.xml` e do `llms.txt`** e marca a rota como **`noindex`**. Sem isso o Google continuaria achando a página. Vai um pouco além do pedido literal.
7. **Item 9, conteúdo extra no rodapé.** Foram acrescentados uma coluna "Navegue" (Início, A experiência, Serviços), uma linha de descrição sob o logo e a faixa inferior "Sinop · Mato Grosso". **Não** foi incluído horário de funcionamento, para não inventar dado. Se o usuário informar o horário, entra na coluna "Visite a gente".
8. **A foto `galeria-detalhamento` aparece duas vezes** (no carrossel e na seção da experiência). Foi aceito como está. Se incomodar, tire-a da lista do carrossel.

---

## 5. Mapa da landing hoje

`src/pages/LandingPage.jsx` (241 linhas), de cima para baixo:

| Linhas | Seção | Destino |
|---|---|---|
| 16–22 | Constantes `GRID`, `EYEBROW`, `SECTION_TAG`, `BUTTON*`, `H2` | ajustar |
| 24–37 | `galleryPhotos` (3 fotos com `alt`) | **mantém**, alimenta o carrossel |
| 46–69 | **Hero** `#inicio`: eyebrow, `h1` "Seu carro pronto para aparecer.", parágrafo, botões "Agendar pelo WhatsApp" e "Ver serviços" | **não mexer** |
| 71–92 | **Galeria**: título "Cuidado automotivo", "Fotos ilustrativas", grid de 3 fotos | **vira carrossel** |
| 94–107 | **Informações rápidas**: faixa bege com `proofPoints` (7 / Sinop / Direto) | **remover** (item 3) |
| 109–125 | **A experiência** `#essencia`: tag à esquerda, H2, parágrafo, botão "Quero cuidar" | **refazer** (itens 4 e 5) |
| 127–156 | **Serviços** `#servicos`: tag "Serviços", eyebrow, H2, 3 `<article>` por grupo com label, título, copy e lista com nome e descrição | **refazer** (itens 6 e 7) |
| 158–182 | **Como começar** `#como-comecar`: H2, botão, `journeySteps` 01–03 | **remover** (item 8) |
| 184–214 | **Endereço e contato** `#visite`: cartão bege com endereço e Maps, cartão escuro com telefone e WhatsApp | **mover para o rodapé** (item 9) |
| 217–227 | **Rodapé**: `Brand`, nav (WhatsApp, Google Maps, **Desenvolvedores**, Ligar), © | **refazer** (itens 1, 9 e 10) |
| 229–238 | **Botão flutuante WhatsApp**: círculo `bg-paper` 56px, `hover:bg-red`, logo 32px dentro | **refazer** (item 2) |

Outros pontos que tocam no pedido:

- `src/components/SiteHeader.jsx:76-90`: o nav tem "Serviços" (`/#servicos`), "A experiência" (`/#essencia`), "Onde estamos" (`/#visite`), "Desenvolvedores" (link comum na landing, CTA vermelho com `aria-current` na página de devs) e o CTA "Falar pelo WhatsApp".
- `src/pages/DevelopersPage.jsx:74-76`: o rodapé da página de devs linka `/#servicos`, `/#visite` e `/desenvolvedores`. **Os dois primeiros precisam continuar funcionando**, então o `id="visite"` tem que existir em algum lugar da landing.
- `src/content.js`: `proofPoints` (linhas 20–24) e `journeySteps` (26–30) só são usados na landing. `serviceGroups` (32–61) é usado pela landing, pelo `build.mjs` (JSON-LD `hasOfferCatalog` e `llms.txt` usam `service.detail`) e pelo `content.test.js`.
- `scripts/build.mjs:24-27` (lista de rotas), `:38` (meta robots), `:79` (sitemap) e `:80` (`llms.txt`, que tem uma linha "[Desenvolvedores](…)").

---

## 6. Estrutura-alvo

```
┌───────────────────────────────────────────────┐
│ Header fixo (sem link "Desenvolvedores")      │
├───────────────────────────────────────────────┤
│ 1. HERO #inicio  (inalterado)                 │
├───────────────────────────────────────────────┤
│ 2. CARROSSEL  ← → ← → desliza sozinho,        │
│    faixa sangra de borda a borda da tela      │
├───────────────────────────────────────────────┤
│ 3. #essencia                                  │
│    MAIS QUE LIMPEZA.        ┌──────────┐      │
│    É CUIDADO QUE APARECE.   │  foto    │      │
│    legenda pequena…         │ detalhe  │      │
│                             └──────────┘      │
├─────────────── fundo bege ────────────────────┤
│ 4. #servicos                                  │
│          SETE FORMAS DE CUIDAR MELHOR         │
│      ESCOLHA O PRÓXIMO NÍVEL DE CUIDADO.      │
│  RESTAURAÇÃO DE FAROL / MICRO PINTURA /       │
│   VITRIFICAÇÃO EM PINTURA / CRISTALIZAÇÃO…    │
├──────── rodapé largura total, ink-soft ───────┤
│ 5. <footer id="visite">                       │
│  Marca   │ Visite a gente │ Fale com │ Navegue│
│  ─────────────────────────────────────────    │
│  © 2026 Roger…               Sinop · MT       │
└───────────────────────────────────────────────┘
                                   (●) WhatsApp (só o logo)
```

**Saem da página:** a faixa bege de destaques, o botão "Quero cuidar", a seção "Como começar" inteira, a seção "Visite a gente" como bloco separado (o conteúdo vai para o rodapé) e todos os links para `/desenvolvedores`.

---

## 7. Implementação, item por item

> Os trechos abaixo são **sugestões completas o bastante para colar e ajustar**. Confira nomes de constantes e tokens contra o arquivo real.

### 7.0 Preparação: uma constante de título grande

Hero, experiência e serviços vão usar o mesmo tamanho de título. Hoje a classe do `h1` do hero está inline (`LandingPage.jsx:54`). Extraia para uma constante e reuse:

```js
// Título de destaque: mesmo tamanho do hero, usado também em experiência e serviços.
const DISPLAY_XL = 'font-display text-[clamp(38px,8vw,52px)] leading-[.96] font-semibold tracking-[-.025em] uppercase sm:text-[clamp(46px,6vw,56px)] xl:text-[56px]'
```

O `h1` do hero passa a usar `className={`mb-5 max-w-[980px] ${DISPLAY_XL}`}`, com o mesmo visual de hoje.

A constante `H2` vai ficar sem uso no fim (as seções que a usavam foram removidas ou passam a usar `DISPLAY_XL`). **Apague-a** depois de confirmar com uma busca.

### 7.1 Item 3: remover a faixa bege de destaques

- Apague as linhas 94–107 (o comentário `{/* Informações rápidas … */}` e a `<section>` com `proofPoints.map`).
- Tire `proofPoints` do import (linha 9).
- Em `src/content.js`, apague o `export const proofPoints = [...]`.

### 7.2 Itens 4 e 5: "A experiência" com título grande, legenda e imagem

Substitua a seção das linhas 109–125 por:

```jsx
{/* A experiência ---------------------------------------------------- */}
<section id="essencia" aria-labelledby="essence-title" className={`${GRID} grid items-center gap-8 py-14 sm:grid-cols-2 sm:gap-10 sm:py-20`}>
  <div>
    <h2 id="essence-title" className={`mb-5 ${DISPLAY_XL}`}>
      Mais que limpeza. <span className="text-paper-soft">É cuidado que aparece.</span>
    </h2>
    <p className="m-0 max-w-[420px] text-[12px] leading-[1.7] text-muted">
      Seu carro tem linhas, textura e personalidade. O trabalho da Roger é revelar tudo isso com técnica, paciência e olho para o detalhe.
    </p>
  </div>
  <figure className="m-0 overflow-hidden bg-ink-light">
    <img
      className="block aspect-[4/3] w-full object-cover sm:aspect-[4/5]"
      src="/assets/galeria-detalhamento.webp"
      alt="Profissional cuidando da pintura de um carro esportivo em uma oficina."
      width="499"
      height="750"
      loading="lazy"
      decoding="async"
    />
  </figure>
</section>
```

Notas:

- **O botão "Quero cuidar" some junto** (item 5). Não recrie outro CTA aqui.
- A tag `<p>` "A experiência" em `SECTION_TAG` some (ver [seção 4, ponto 4](#4-interpretações-assumidas-podem-ser-revistas)).
- A foto é retrato (2:3). No celular, `aspect-[4/3]` evita uma imagem altíssima abaixo do texto. No desktop, `4/5` equilibra com o bloco de texto. O `object-cover` faz o recorte.
- `id="essencia"` e `id="essence-title"` continuam iguais: o header aponta para `#essencia`.

### 7.3 Item 6: título central de serviços

Substitua o cabeçalho da seção de serviços (linhas 129–137, o grid `[.8fr_2.2fr]` com a tag "Serviços") por um bloco centralizado. A seção inteira fica assim (itens 6 e 7 juntos):

```jsx
{/* Serviços --------------------------------------------------------- */}
<section id="servicos" aria-labelledby="services-title" className="bg-paper py-12 text-ink sm:py-16">
  <div className={`${GRID} text-center`}>
    <p className={`${EYEBROW} text-muted-paper`}>Sete formas de cuidar melhor</p>
    <h2 id="services-title" className={`mx-auto mb-0 max-w-[900px] ${DISPLAY_XL}`}>
      Escolha o próximo <span className="text-red-deep">nível de cuidado.</span>
    </h2>

    <ul className="mx-auto mt-10 mb-0 flex max-w-[1040px] list-none flex-wrap justify-center gap-x-4 gap-y-2 p-0 sm:mt-12">
      {services.map((service, index) => (
        <li className="font-display text-[clamp(24px,5vw,40px)] leading-[1.1] font-semibold uppercase" key={service.name}>
          {service.name}
          {/* Separador só visual: aria-hidden para o leitor de tela não ler as barras. */}
          {index < services.length - 1 && <span className="ml-4 text-red-deep" aria-hidden="true">/</span>}
        </li>
      ))}
    </ul>
  </div>
</section>
```

E, fora do componente (junto de `galleryPhotos`) ou no topo da função:

```js
// A landing mostra só os nomes; categorias e descrições continuam em content.js
// porque o build usa `detail` no JSON-LD e no llms.txt.
const services = serviceGroups.flatMap((group) => group.services)
```

### 7.4 Item 7: só os nomes, sem categoria nem descrição

O código acima já faz isso. Somem da tela:

- `group.label` ("Recuperação", "Proteção", "Acabamento");
- `group.title` ("Devolver presença"…);
- `group.copy` (o parágrafo do grupo);
- `service.detail` (a descrição de cada serviço).

**Não apague nada disso de `content.js`.** Continua sendo usado em `scripts/build.mjs:64` (JSON-LD) e `:80` (`llms.txt`), e testado em `src/content.test.js`.

Os 7 nomes, na ordem: Restauração de farol, Micro pintura, Vitrificação em pintura, Cristalização com teflon, Hidratação de bancos sem couro, Polimento, Espelhamento.

Detalhe de layout: com `flex-wrap`, uma linha pode terminar com `/`. Isso é aceitável no estilo editorial. Se incomodar, a alternativa é usar um separador `·` ou colocar a barra **antes** de cada item exceto o primeiro.

### 7.5 Item 8: remover "Como começar"

- Apague as linhas 158–182 (comentário + `<section id="como-comecar">`).
- Tire `journeySteps` do import.
- Em `content.js`, apague o `export const journeySteps = [...]`.
- `BUTTON_LIGHT` fica sem uso: apague a constante.

### 7.6 Itens 1, 9 e 10: rodapé com largura total, denso, com "Visite a gente"

1. **Apague** a `<section id="visite">` (linhas 184–214). Com ela saem o cartão bege "Seu carro sabe o caminho." e o cartão escuro com o telefone.
2. `BUTTON_DARK` fica sem uso: apague a constante.
3. **Substitua** o `<footer>` (linhas 217–227) por:

```jsx
{/* Rodapé ------------------------------------------------------------- */}
{/* Fundo e fio ocupam a largura toda; o conteúdo segue alinhado ao GRID.
    O id "visite" vive aqui porque o header e a página de devs apontam para /#visite. */}
<footer id="visite" className="border-t border-t-line bg-ink-soft">
  <div className={`${GRID} grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 sm:gap-8 sm:py-14 xl:grid-cols-[1.3fr_1fr_1fr_.8fr]`}>
    <div>
      <Brand />
      <p className="mt-5 mb-0 max-w-[260px] text-[12px] leading-[1.7] text-muted">
        Estética automotiva em Sinop/MT. Polimento, vitrificação, restauração de farol e cuidado com cada detalhe.
      </p>
    </div>

    <div>
      <p className={`${SECTION_TAG} mb-4 flex items-center gap-2 text-red`}>
        <PinIcon className="size-4" /> Visite a gente
      </p>
      <address className="mb-4 text-[13px] leading-[1.7] text-paper-soft not-italic">
        {ADDRESS.street}<br />{ADDRESS.neighborhood} · {ADDRESS.city}
      </address>
      <a className={FOOTER_LINK} href={MAPS_URL} target="_blank" rel="noreferrer">
        Abrir no Google Maps <ArrowIcon className="size-4" />
      </a>
    </div>

    <div>
      <p className={`${SECTION_TAG} mb-4 flex items-center gap-2 text-red`}>
        <PhoneIcon className="size-4" /> Fale com a Roger
      </p>
      <a className="mb-3 block font-display text-[28px] leading-none font-medium tracking-[-.01em] text-paper transition-colors hover:text-red" href={TEL_URL}>
        {PHONE_DISPLAY}
      </a>
      <a className={FOOTER_LINK} href={WHATSAPP_URL} target="_blank" rel="noreferrer">
        WhatsApp <ArrowIcon className="size-4" />
      </a>
    </div>

    <nav aria-label="Links do rodapé">
      <p className={`${SECTION_TAG} mb-4 text-red`}>Navegue</p>
      <ul className="m-0 grid list-none gap-1 p-0">
        <li><a className={FOOTER_LINK} href="#inicio">Início</a></li>
        <li><a className={FOOTER_LINK} href="#essencia">A experiência</a></li>
        <li><a className={FOOTER_LINK} href="#servicos">Serviços</a></li>
      </ul>
    </nav>
  </div>

  <div className="border-t border-t-line">
    <div className={`${GRID} flex flex-col gap-1 py-5 text-[10px] text-muted sm:flex-row sm:justify-between`}>
      <small>© 2026 Roger Estética Automotiva</small>
      <span>Sinop · Mato Grosso</span>
    </div>
  </div>
</footer>
```

Com a constante (junto das outras, no topo):

```js
const FOOTER_LINK = 'inline-flex min-h-10 items-center gap-2 text-[10px] font-extrabold tracking-[.1em] text-paper-soft uppercase transition-colors hover:text-red'
```

Notas:

- **Item 1 (largura total):** o `<footer>` **não** recebe mais `${GRID}`. Fundo `bg-ink-soft` e fios `border-t` vão de ponta a ponta. O `GRID` fica nos `<div>` internos.
- **Item 10:** o link "Desenvolvedores" **não existe mais** no rodapé.
- `<address>` é itálico por padrão e o Preflight do Tailwind não reseta isso. **Precisa do `not-italic`.**
- `min-h-10` nos links garante área de toque decente no celular.
- O `id="visite"` no `<footer>` mantém funcionando o "Onde estamos" do header e o `/#visite` da `DevelopersPage`. O `scroll-padding-top` do `html` já compensa o header fixo.
- Não invente horário de funcionamento. Se o usuário fornecer, acrescente uma linha na coluna "Visite a gente".

### 7.7 Item 2: botão do WhatsApp = só o logo

Substitua o `<a>` das linhas 229–238 por:

```jsx
{/* Atalho fixo de WhatsApp: o próprio logo é o botão. --------------- */}
<a
  className="fixed right-4 bottom-[calc(16px_+_env(safe-area-inset-bottom))] z-[19] block size-14 drop-shadow-[0_8px_18px_rgba(0,0,0,.35)] sm:right-6 sm:bottom-[calc(24px_+_env(safe-area-inset-bottom))]"
  href={WHATSAPP_URL}
  target="_blank"
  rel="noreferrer"
  aria-label="Falar com a Roger pelo WhatsApp"
>
  <img className="block size-full" src="/assets/WhatsApp.svg.webp" alt="" width="56" height="56" />
</a>
```

O que muda em relação a hoje:

- **Sai** `bg-paper`, `rounded-full`, `grid place-items-center`, `shadow-[…]`, `transition-colors` e `hover:bg-red`. **Sem hover.**
- O `<img>` deixa de ser `size-8` dentro de um círculo de 56px e passa a ocupar os 56px inteiros.
- O arquivo `WhatsApp.svg.webp` já tem **fundo transparente** e borda branca própria (é o logo oficial), então funciona sozinho sobre fundo escuro e sobre o bege.
- `drop-shadow` (filtro) em vez de `box-shadow`: a sombra segue o contorno do balão, não um quadrado.
- O foco pelo teclado continua visível (o `:focus-visible` global desenha o contorno dourado).

### 7.8 Item 10 no header

Em `src/components/SiteHeader.jsx:79-85`, troque o ternário por uma renderização condicional: o link comum para `/desenvolvedores` some, e o CTA ativo continua existindo **só na própria página de devs**.

```jsx
{developersActive && (
  <a className={`${NAV_CTA} border-red bg-red text-ink`} href="/desenvolvedores" aria-current="page" onClick={closeMenu}>
    Desenvolvedores <ArrowIcon className="size-[15px]" />
  </a>
)}
```

Não mexa em `route.js`, `App.jsx`, `vercel.json` nem no `DevelopersPage.jsx`. A página precisa continuar abrindo quando alguém digita `/desenvolvedores`. O link para `/desenvolvedores` dentro do rodapé da própria `DevelopersPage` pode ficar (é a própria página).

---

## 8. O carrossel automático em detalhe

Substitui a seção "Galeria ilustrativa" (`LandingPage.jsx:71-92`). **Sem biblioteca**: o movimento é uma animação CSS. O único JS é o `useState` do botão de pausa.

### 8.1 Como funciona

- Uma `<ul>` horizontal (`flex w-max`) com as fotos repetidas em **duas metades idênticas**.
- Uma animação CSS move a faixa de `translateX(0)` até `translateX(-50%)` em loop linear infinito. Quando chega em −50%, a segunda metade está exatamente onde a primeira começou, e o loop reinicia **sem emenda visível**.
- A segunda metade é marcada com `aria-hidden="true"` e `alt=""`, para o leitor de tela não anunciar fotos repetidas.
- A faixa **sangra até as bordas da tela** (fica fora do `GRID`). Isso dá leitura clara de carrossel e economiza altura. O título da seção fica dentro do `GRID`.
- A animação **pausa** no hover, quando algo dentro recebe foco (`:focus-within`) e quando o botão "Pausar" é clicado (`data-paused`).
- Com **"reduzir movimento"** ativo no sistema, a animação desliga, a segunda metade some e a faixa vira uma rolagem horizontal comum.

### 8.2 Por que as fotos são repetidas várias vezes em cada metade

**Cada metade precisa ser mais larga que a tela.** Senão, perto do fim do ciclo, aparece um vão vazio à direita. Com só 3 fotos de ~280px, uma metade teria ~880px, menos que um monitor de 1440px. Por isso cada metade repete as 3 fotos **3 vezes** (9 slides ≈ 2.600px), o que cobre até telas de 2560px. As imagens são as mesmas 3 URLs, então o navegador baixa cada uma uma vez só.

Quando existirem fotos reais de trabalhos (ver o `plano.md` antigo sobre como fotografá-las), é só acrescentar itens em `galleryPhotos`. Com 9 fotos ou mais, dá para baixar `GALLERY_REPEAT` para 1.

### 8.3 JSX sugerido

No topo do arquivo:

```js
import { useState } from 'react'
```

Junto de `galleryPhotos`:

```js
// Cada metade da faixa precisa ser mais larga que a tela, senão aparece um vão
// no fim do ciclo. Com poucas fotos, repetimos a lista dentro de cada metade.
const GALLERY_REPEAT = 3
const galleryHalf = Array.from({ length: GALLERY_REPEAT }, () => galleryPhotos).flat()
```

Dentro do componente:

```js
const [galleryPaused, setGalleryPaused] = useState(false)
```

A seção:

```jsx
{/* Carrossel ------------------------------------------------------- */}
{/* Faixa contínua em CSS: duas metades iguais deslizam até -50% e recomeçam
    sem emenda. A segunda metade é só visual (aria-hidden). */}
<section aria-labelledby="gallery-title" className="gallery pb-12 sm:pb-14" data-paused={galleryPaused || undefined}>
  <div className={`${GRID} mb-4 flex items-center justify-between gap-4`}>
    <h2 id="gallery-title" className="font-display text-[18px] font-semibold tracking-[.02em] text-paper uppercase sm:text-[20px]">Cuidado automotivo</h2>
    <div className="flex items-center gap-4">
      <p className="m-0 text-[10px] text-muted">Fotos ilustrativas</p>
      <button
        type="button"
        className="gallery-toggle min-h-10 text-[10px] font-extrabold tracking-[.1em] text-paper-soft uppercase transition-colors hover:text-paper"
        aria-pressed={galleryPaused}
        onClick={() => setGalleryPaused((paused) => !paused)}
      >
        {galleryPaused ? 'Retomar' : 'Pausar'}
      </button>
    </div>
  </div>

  <div className="gallery-viewport">
    <ul className="gallery-track m-0 flex w-max list-none p-0">
      {[...galleryHalf, ...galleryHalf].map((photo, index) => {
        // Só a primeira ocorrência de cada foto é anunciada ao leitor de tela.
        const repeated = index >= galleryPhotos.length
        return (
          <li className="mr-3 w-[64vw] shrink-0 sm:w-[36vw] xl:w-[280px]" key={index} aria-hidden={repeated || undefined}>
            <img
              className="block aspect-[4/5] w-full object-cover"
              src={photo.src}
              alt={repeated ? '' : photo.alt}
              width="500"
              height="750"
              loading="lazy"
              decoding="async"
            />
          </li>
        )
      })}
    </ul>
  </div>
</section>
```

Pontos deliberados:

- **`mr-3` em cada `<li>`, e não `gap-3` na `<ul>`.** Com `gap`, a faixa tem `2N` slides e `2N−1` vãos, e −50% cai meio vão fora do lugar, o que dá um "tranco" a cada ciclo. Com margem em todos os itens, as duas metades têm exatamente a mesma largura.
- **`aspect-[4/5]`**: as fotos são retrato (2:3). Recortar em paisagem perderia muito. Um 4:5 com 280px dá ~350px de altura no desktop, o que mantém a seção compacta. Largura e proporção são os ajustes para deixar mais ou menos alto.
- **`key={index}`** está correto aqui: a lista é estática e tem itens repetidos, então `src` não serve como chave.
- **`data-paused={galleryPaused || undefined}`**: com `false`, o React não escreve o atributo, e o seletor CSS `[data-paused]` fica limpo.
- O SSR (`renderToString` no build) funciona sem ajuste: `useState` é seguro no servidor, e nada acessa `window` durante a renderização.

### 8.4 CSS em `src/index.css`

Acrescente **fora** do `@layer base`, perto dos keyframes do easter egg:

```css
/* Carrossel da landing ------------------------------------------------------ */

@keyframes gallery-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.gallery-viewport { overflow: hidden; }

/* ~45px/s com 18 slides de 292px; ajuste a duração para mudar a velocidade. */
.gallery-track { animation: gallery-marquee 60s linear infinite; }

.gallery:hover .gallery-track,
.gallery:focus-within .gallery-track,
.gallery[data-paused] .gallery-track {
  animation-play-state: paused;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }

  /* Sem movimento: vira uma faixa rolável comum, sem as cópias e sem o botão. */
  .gallery-track { animation: none; }
  .gallery-viewport { overflow-x: auto; }
  .gallery-track > [aria-hidden="true"] { display: none; }
  .gallery-toggle { display: none; }
}
```

Observações:

- `html { scroll-behavior: auto }` sob `prefers-reduced-motion` corrige, de passagem, uma lacuna que já existe (o `@layer base` define `scroll-behavior: smooth` sem ressalva). O `plano.md` antigo já apontava isso.
- **Não coloque utilitários `translate-*` do Tailwind na `.gallery-track`.** Na v4 eles usam a propriedade CSS `translate`, que **se soma** ao `transform` da animação. O próprio `index.css` já comenta isso no `detail-toast-in`.
- CSS fora de `@layer` tem prioridade sobre os utilitários do Tailwind (que ficam em `@layer utilities`). Por isso `overflow` do viewport é definido no CSS e não com a classe `overflow-hidden`: a regra de movimento reduzido consegue sobrescrever sem briga de especificidade.
- A duração de 60s é um ponto de partida. Com 18 slides de ~292px (280 + 12 de margem), metade da faixa tem ~2.630px, o que dá ~44px/s. Mais lento fica mais "premium", mais rápido cansa.

### 8.5 O que o `plano.md` antigo tem de útil

O `plano.md` na raiz descreve um carrossel de "trabalhos" **com setas e sem autoplay**. O usuário agora escolheu **autoplay**, então a abordagem de lá está superada. **Continua valendo** a seção "Passo 5 — As fotos", com as orientações para fotografar e exportar (WebP, ~200 KB, nomes descritivos em `public/assets/…`). Não apague o `plano.md` sem perguntar ao usuário.

---

## 9. Esconder /desenvolvedores (build e SEO)

Em `scripts/build.mjs`:

1. **Marque a rota como oculta** (linhas 24–27):

   ```js
   const routes = [
     { path: '/', file: 'dist/index.html', title: 'Estética Automotiva em Sinop | Roger', description },
     // Oculta: continua acessível pela URL, mas sem links, fora do sitemap e com noindex.
     { path: '/desenvolvedores', file: 'dist/desenvolvedores/index.html', title: '…', description: '…', hidden: true },
   ]
   ```

2. **Meta robots** (linha 38):

   ```js
   `<meta name="robots" content="${indexable && !route.hidden ? 'index, follow, max-image-preview:large' : 'noindex, follow'}" />`,
   ```

3. **Sitemap** (linha 79): troque `routes.map(...)` por `routes.filter((route) => !route.hidden).map(...)`.

4. **`llms.txt`** (linha 80): apague o trecho `\n- [Desenvolvedores](${absolute('/desenvolvedores')}): créditos do site.`. Cuidado para não quebrar a template string, que é uma linha longa só.

5. **Não** acrescente `Disallow: /desenvolvedores` no `robots.txt`. Se o robô for proibido de acessar a página, ele nunca lê o `noindex` e a URL pode continuar indexada por links externos. O `noindex` sozinho é o caminho certo.

Mantenha a pré-renderização da rota, a entrada no `vercel.json` e o `route.js` exatamente como estão.

---

## 10. Limpeza de código e documentação

**`src/pages/LandingPage.jsx`**

- Imports de `content.js` finais: `ADDRESS`, `MAPS_URL`, `PHONE_DISPLAY`, `serviceGroups`, `TEL_URL`, `WHATSAPP_URL`. Saem `journeySteps` e `proofPoints`.
- Imports de ícones: `ArrowIcon`, `PhoneIcon`, `PinIcon` continuam em uso (no hero e no rodapé).
- Adicionar `import { useState } from 'react'`.
- Constantes: saem `BUTTON_LIGHT`, `BUTTON_DARK` e `H2`. Entram `DISPLAY_XL` e `FOOTER_LINK`. `GRID`, `EYEBROW`, `SECTION_TAG` e `BUTTON` continuam. Confira cada uma com uma busca antes de apagar.

**`src/content.js`**: apagar `proofPoints` e `journeySteps`. Manter todo o resto, inclusive `serviceGroups` com `label`, `title`, `copy` e `detail`.

**`COMO_FUNCIONA.md`**

- Linha 56 lista as seções da landing ("Hero, Provas sociais, Filosofia, Serviços, Processo, Endereço, Rodapé…"). Atualizar para: Hero (`#inicio`), Carrossel, A experiência (`#essencia`), Serviços (`#servicos`), Rodapé com endereço e contato (`#visite`) e botão flutuante de WhatsApp.
- A seção sobre `<article>` (perto da linha 68) cita "cada passo da jornada em 'Como começar'". Ajustar, porque isso não existe mais.

**`README.md`**: a linha 5 descreve `/desenvolvedores` como parte do site. Opcionalmente, mencione que a rota é oculta (sem links, `noindex`).

---

## 11. Armadilhas conhecidas

| Armadilha | Como evitar |
|---|---|
| Apagar `detail`/`label` de `serviceGroups` para "limpar" | Não apague: `build.mjs` e `content.test.js` dependem deles. Só a **landing** deixa de exibir. |
| Quebrar `/#visite` ao remover a seção de endereço | O `id="visite"` vai para o `<footer>`. O header ("Onde estamos") e a `DevelopersPage` usam esse link. |
| Carrossel com "tranco" a cada ciclo | Margem em cada `<li>` (`mr-3`), **não** `gap` na `<ul>`. |
| Vão vazio à direita no fim do ciclo em telas largas | Cada metade da faixa tem que ser mais larga que a tela: `GALLERY_REPEAT = 3` com 3 fotos. |
| `translate-*` do Tailwind somando com o keyframe | Não use utilitários de translate na faixa animada. |
| Rolagem horizontal na página inteira | O wrapper raiz já tem `overflow-clip` e o viewport do carrossel tem `overflow: hidden`. Confira com `document.body.scrollWidth === document.body.clientWidth`. |
| Leitor de tela anunciando fotos repetidas ou "barra" entre serviços | Cópias com `aria-hidden` + `alt=""`, e separador `/` num `<span aria-hidden="true">`. (Conteúdo gerado via `::after` **é** lido por vários leitores de tela, por isso não use.) |
| `<address>` em itálico | `not-italic`. |
| Usar `md:`/`lg:` esperando os breakpoints padrão do Tailwind | O projeto redefine: `sm` = 641px, `lg`/`xl` = 1081px. Use `sm:` e `xl:`. |
| Cores com `/opacidade` (`bg-paper/20`) | Use os tokens `rgba()` do `@theme` (`paper-24`, `ink-16`, `line`…). |
| `Disallow` no `robots.txt` para esconder a página | Não. Use só `noindex` (ver [seção 9](#9-esconder-desenvolvedores-build-e-seo)). |
| Mexer no hero | O usuário não pediu. Só o `h1` troca a string de classes pela constante `DISPLAY_XL`, sem mudança visual. |

---

## 12. Verificação

**Automática**

1. `npm test`: os 5 testes (3 em `content.test.js`, 2 em `route.test.js`) devem passar sem alteração.
2. `npm run build` deve terminar sem erro. Depois:
   - `dist/index.html` **não** contém `desenvolvedores`, `como-comecar`, `Quero cuidar`, `Recuperação` nem `Devolver presença`.
   - `dist/index.html` **contém** `id="visite"` (no `<footer>`), `id="essencia"`, `id="servicos"` e `gallery-track`.
   - `dist/sitemap.xml` lista **só** `/` (se o build for indexável; sem `SITE_URL` o sitemap sai vazio de propósito).
   - `dist/llms.txt` não tem a linha de Desenvolvedores, mas mantém os 7 serviços **com descrição**.
   - `dist/desenvolvedores/index.html` existe e tem `<meta name="robots" content="noindex, follow" />`.

   No PowerShell, por exemplo: `Select-String -Path dist/index.html -Pattern 'desenvolvedores','como-comecar','Quero cuidar'` não deve retornar nada.

**Manual** (`npm run dev`)

3. **Desktop, 1440px**
   - O carrossel desliza sozinho, suave e sem tranco no reinício.
   - Passar o mouse pausa. "Pausar" congela e muda para "Retomar". Tab até o botão também pausa.
   - "Mais que limpeza…" aparece grande à esquerda, com a foto à direita, e sem botão.
   - Serviços: eyebrow + título centralizados; os 7 nomes em linhas centralizadas com `/` vermelho; nenhuma categoria ou descrição.
   - Rodapé: fundo e fios de borda a borda; 4 colunas (Marca / Visite a gente / Fale com a Roger / Navegue); faixa inferior com ©.
   - Botão do WhatsApp: só o logo, sem círculo bege, sem mudança no hover.
4. **Celular, 390px**
   - Nada estoura na horizontal: no console, `document.body.scrollWidth === document.body.clientWidth` retorna `true`.
   - O carrossel mostra ~1,5 slide e continua se movendo.
   - A foto da experiência fica abaixo do texto, em 4:3.
   - Os serviços quebram de linha e continuam centralizados.
   - O rodapé fica em 1 coluna, com links com área de toque ≥ 40px.
5. **Navegação**
   - No header, "Serviços", "A experiência" e "Onde estamos" rolam até o lugar certo ("Onde estamos" leva ao rodapé).
   - Não há link para Desenvolvedores em lugar nenhum da landing (header desktop, overlay mobile e rodapé).
6. **Rota oculta**
   - Digitar `/desenvolvedores` abre a página normalmente, com o CTA vermelho ativo no header e o easter egg funcionando.
   - Os links "Serviços" e "Onde estamos" do rodapé dessa página voltam para a landing no lugar certo.
7. **Movimento reduzido** (Windows: Configurações → Acessibilidade → Efeitos visuais → desligar "Efeitos de animação")
   - O carrossel fica parado e rolável com o dedo/trackpad, sem fotos repetidas e sem botão "Pausar".
8. **Leitor de tela / teclado** (rápido)
   - Tab passa pelo botão "Pausar" e pelos links do rodapé, com contorno dourado visível.
   - As fotos repetidas do carrossel não são anunciadas.

---

## 13. Fora de escopo

Não faça sem o usuário pedir:

- Mudanças no **hero** (texto, botões, layout).
- Mudanças na **página de desenvolvedores** além do header compartilhado.
- Lightbox, setas, bolinhas de paginação ou filtro no carrossel.
- Novas fotos (o usuário ainda vai produzir; ver "Passo 5" do `plano.md`).
- Horário de funcionamento, preços ou qualquer dado que não esteja em `content.js`.
- Commit, push ou deploy.
