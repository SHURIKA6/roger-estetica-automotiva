# Plano — Carrossel de trabalhos já feitos

## Contexto

A landing hoje fala do que a Roger faz, mas não mostra resultado nenhum. As únicas imagens do site são o flyer do hero e o logo. Falta a prova visual, que é o que mais convence em estética automotiva.

Decisões já tomadas:

- **Galeria simples** — uma foto por slide, sem par antes/depois. O "antes" quase sempre não existe no celular do Roger, e exigir isso travaria a seção.
- **Entra depois de Serviços**, antes de "Como começar". O visitante lê o que a Roger faz e vê a prova em seguida.
- **As fotos ainda não existem.** A seção precisa nascer pronta para recebê-las e não pode quebrar o site enquanto estiver vazia.
- **Sem autoplay.** Carrossel que anda sozinho exige pausar no hover, no foco e em `prefers-reduced-motion`, e rouba o controle de quem está lendo. Foge do "simples e funcional".

## Abordagem: scroll-snap nativo do CSS

Um `<ul>` com rolagem horizontal e pontos de encaixe. **Sem biblioteca.**

Por que este caminho e não um carrossel controlado por estado do React:

- Funciona **sem JavaScript** — o conteúdo rola e encaixa só com CSS. Como o site é pré-renderizado no build, os slides já aparecem no HTML.
- **Swipe no celular sai de graça**, é a rolagem nativa do sistema. Um carrossel com `translateX` precisaria de código de toque para igualar.
- O Tailwind já traz `snap-x`, `snap-mandatory` e `snap-start` prontos.
- O único JavaScript são as setas: ~10 linhas chamando `scrollBy`.

As setas ficam escondidas no celular (lá o gesto é o swipe) e aparecem no desktop.

## Onde o código vive

O projeto tem uma regra: **componente só para código usado em mais de um lugar.** O carrossel aparece uma vez, então fica **inline em `LandingPage.jsx`**, como as outras seções.

Só vale mover para arquivo próprio se depois ganhar bolinhas de paginação, lightbox ou autoplay. Aí passa a ter lógica suficiente para justificar.

## Arquivos a tocar

| Arquivo | O que muda |
|---|---|
| `src/content.js` | novo export `works` |
| `src/pages/LandingPage.jsx` | a seção `#trabalhos` + `useRef` e a função das setas |
| `src/components/SiteHeader.jsx` | item "Trabalhos" no menu |
| `src/index.css` | proteção de `prefers-reduced-motion` |
| `public/assets/trabalhos/` | as fotos |
| `scripts/build.mjs` | opcional: fotos no JSON-LD |

## Passo 1 — Dados em `src/content.js`

```js
// Trabalhos já feitos, exibidos no carrossel da landing.
// Enquanto estiver vazio, a seção e o item de menu não aparecem.
export const works = [
  // { src: '/assets/trabalhos/polimento-01.webp', alt: 'Capô de Civic prata após polimento, refletindo o céu' },
]
```

`alt` é obrigatório em cada item: é o que leitor de tela lê e o que o Google usa para entender a foto. Descreva o carro e o serviço, não escreva "foto de trabalho".

`caption` é opcional. Se vier preenchido, aparece embaixo da foto.

## Passo 2 — A seção em `LandingPage.jsx`

Entre o `</section>` de `#servicos` e o `<section id="como-comecar">`.

Esqueleto (as classes seguem o padrão mobile-first do projeto, `sm:` 641px e `lg:` 1081px):

```jsx
const scroller = useRef(null)

const scrollWorks = (direction) => {
  const el = scroller.current
  if (!el) return
  const card = el.firstElementChild
  const step = card ? card.getBoundingClientRect().width + 16 : el.clientWidth
  el.scrollBy({ left: step * direction, behavior: 'smooth' })
}
```

```jsx
{works.length > 0 && (
  <section id="trabalhos" aria-labelledby="works-title" className={`${GRID} pt-[75px] pb-[88px] sm:pt-[110px] sm:pb-[140px]`}>
    <p className={`${SECTION_TAG} text-red`}>/ trabalhos</p>
    <h2 id="works-title" className={`mt-[34px] mb-9 ${H2}`}>O detalhe<br /><em>que ficou pronto.</em></h2>

    {/* setas: só no desktop, onde não há swipe */}
    <div className="hidden sm:flex sm:justify-end sm:gap-3">
      <button type="button" aria-label="Ver trabalhos anteriores" onClick={() => scrollWorks(-1)} …>…</button>
      <button type="button" aria-label="Ver próximos trabalhos" onClick={() => scrollWorks(1)} …>…</button>
    </div>

    <ul
      ref={scroller}
      tabIndex={0}
      role="region"
      aria-label="Galeria de trabalhos"
      className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {works.map((work) => (
        <li key={work.src} className="w-[85%] shrink-0 snap-start sm:w-[48%] lg:w-[32%]">
          <img
            src={work.src}
            alt={work.alt}
            width="1200"
            height="800"
            loading="lazy"
            decoding="async"
            className="aspect-[3/2] w-full object-cover"
          />
          {work.caption && <p className="mt-3 text-[11px] text-muted">{work.caption}</p>}
        </li>
      ))}
    </ul>
  </section>
)}
```

Detalhes que importam:

- **`w-[85%]` no celular é de propósito.** A borda do próximo slide fica aparecendo e é isso que avisa o visitante de que dá para arrastar. Slide de 100% parece uma foto parada.
- **`tabIndex={0}` + `role="region"`** deixam quem usa teclado entrar na faixa e rolar com as setas. Sem isso a galeria fica inacessível sem mouse.
- **`loading="lazy"`** em todas: a seção está longe do topo, não faz sentido baixar as fotos no primeiro carregamento.
- **`width`/`height` + `aspect-[3/2]`** reservam o espaço antes da imagem chegar e evitam o pulo de layout.
- A barra de rolagem é escondida porque destoa do visual editorial; quem indica que há mais conteúdo são as setas e o slide cortado.

## Passo 3 — Item no menu

Em `SiteHeader.jsx`, importar `works` e inserir depois de "Serviços":

```jsx
{works.length > 0 && <a className={NAV_LINK} href="/#trabalhos" onClick={closeMenu}>Trabalhos</a>}
```

Condicional pelo mesmo motivo da seção: sem fotos, um link que rola para lugar nenhum é pior do que link nenhum.

## Passo 4 — Proteção de movimento em `src/index.css`

O `@layer base` hoje tem `scroll-behavior: smooth` sem ressalva, e o carrossel acrescenta `scroll-smooth`. Quem marcou "reduzir movimento" no sistema deve receber rolagem instantânea:

```css
@media (prefers-reduced-motion: reduce) {
  html, .snap-x { scroll-behavior: auto; }
}
```

Isso corrige de passagem uma lacuna que já existe hoje, independente do carrossel.

## Passo 5 — As fotos

Ainda não existem. Especificação para o Roger tirar e exportar:

**Na hora de fotografar**
- Carro limpo e **seco** — gota d'água aparece muito na foto.
- Deitado (horizontal), nunca em pé.
- Evitar o reflexo de quem está fotografando na lataria; fotografar de lado, não de frente.
- Luz de fim de tarde ou sombra aberta. Sol a pino estoura o brilho e some com o resultado do polimento.
- Enquadrar o detalhe trabalhado (capô, farol, banco), não o carro inteiro de longe.
- 6 a 10 fotos já é bastante.

**Na hora de exportar**
- Formato **WebP** (o site já exige navegador moderno, então não precisa de fallback).
- **1200 × 800 px**, proporção 3:2, todas iguais.
- Qualidade ~80, mirando **no máximo 200 KB por foto**.
- Converter em [squoosh.app](https://squoosh.app) — arrasta a foto, escolhe WebP, ajusta a qualidade e baixa. Não precisa instalar nada.
- Salvar em `public/assets/trabalhos/` com nome descritivo: `polimento-civic-01.webp`.

Depois é só acrescentar uma linha por foto em `works`, no `content.js`. A seção e o menu aparecem sozinhos.

## Passo 6 (opcional) — Fotos no JSON-LD

Em `scripts/build.mjs`, o nó `AutomotiveBusiness` já tem `image` com o flyer. Dá para passar a lista:

```js
image: [absolute('/assets/roger-flyer.png'), ...works.map((w) => absolute(w.src))],
```

Ajuda o Google a associar as fotos ao perfil da empresa. Baixo esforço, mas só faz diferença depois que as fotos existirem e o site estiver publicado com `SITE_URL` configurado.

## Risco separado que vale resolver junto

`public/assets/roger-flyer.png` está com **2,8 MB** e carrega no topo da página, com `fetchPriority="high"`. Isso é hoje o maior peso do site — mais do que a galeria inteira vai pesar depois de otimizada.

Converter o flyer para WebP (mesmo processo do Passo 5) deve derrubar para uns 200–300 KB. É uma troca de uma linha no `LandingPage.jsx` e resolve um problema que o carrossel só vai agravar.

Não é obrigatório para o carrossel funcionar, mas é o item de melhor retorno em cima desse mesmo trabalho.

## Verificação

1. `npm test` — nada deve quebrar; os testes não tocam nessa área.
2. `npm run build` — confirmar que a seção aparece no HTML pré-renderizado de `dist/index.html` (busque por `id="trabalhos"`). Se não aparecer, a seção está sendo escondida por engano.
3. **Com `works` vazio**: a seção e o item de menu não podem aparecer, e a página não pode ter buraco nem link morto.
4. **Com 3+ fotos**, no celular (390 px): arrastar encaixa uma foto por vez; a borda da próxima aparece.
5. **No desktop (1440 px)**: as setas rolam de um slide por clique e param no fim sem travar.
6. **Teclado**: `Tab` entra na galeria e as setas do teclado rolam. As setas na tela têm `aria-label`.
7. **Sem rolagem horizontal na página inteira** — no console, `document.body.scrollWidth === document.body.clientWidth` deve dar `true`. É o erro mais comum ao colocar faixa rolável dentro de um container.
8. Com "reduzir movimento" ligado no sistema, a rolagem deve ser instantânea.

## Fora de escopo

Bolinhas de paginação, lightbox ao clicar, autoplay, filtro por serviço e vídeo. Todos cabem depois, em cima dessa mesma estrutura, sem refazer nada.
