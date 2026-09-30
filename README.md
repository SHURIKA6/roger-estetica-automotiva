# Roger Estética Automotiva

Landing page da Roger Estética Automotiva, em Sinop-MT.

A rota `/desenvolvedores` apresenta os créditos de quem construiu a experiência digital, com a mesma identidade visual da Roger. Ela é oculta: não há links para ela na landing, fica fora do sitemap e do `llms.txt` e sai com `noindex`. Só abre digitando a URL.

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

O carrossel da home usa fotos de stock para ilustrar detalhamento automotivo; elas não representam serviços realizados pela Roger. Os arquivos WebP otimizados ficam em `public/assets/`. Fotos e origens: [WAVYVISUALS no Pexels](https://www.pexels.com/photo/man-wiping-hood-of-sports-car-20051461/), [Bradley De Melo no Pexels](https://www.pexels.com/photo/black-bmw-in-garage-26936247/) e [Matheus Bertelli no Pexels](https://www.pexels.com/photo/shiny-black-car-parked-on-a-garage-10182836/). Confira a [licença do Pexels](https://www.pexels.com/license/) ao substituir ou adicionar imagens.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Build de produção

```bash
npm run build
npm run preview
```

Os CTAs de atendimento usam o telefone fornecido na arte de referência. O endereço do bloco de localização segue o cadastro público do Google Maps enviado no briefing.

## SEO e publicação na Vercel

O build pré-renderiza a landing e `/desenvolvedores` em HTML, com metadados próprios, Open Graph, Twitter Card e dados estruturados `AutomotiveBusiness` na landing. Gera também `dist/robots.txt`, `dist/sitemap.xml` e `dist/llms.txt`, usando os mesmos serviços e contatos da página.

Na Vercel, habilite as variáveis de sistema: `VERCEL_PROJECT_PRODUCTION_URL` fornece automaticamente o endereço público do projeto. Para usar um domínio próprio, defina `SITE_URL` com a origem HTTPS completa (sem caminho) nas variáveis de produção e refaça o deploy. Essa variável tem prioridade sobre a URL automática. Não use o endereço temporário de cada deploy.

Sem URL configurada, o build local recebe `noindex` e sitemap vazio, sem inventar um domínio. Deploys com `VERCEL_ENV=preview` também recebem `noindex`. Os arquivos de SEO são gerados no build: valide com `npm run build` e `npm run preview`, não apenas com o servidor de desenvolvimento.

Após publicar, verifique a propriedade no Google Search Console, envie `/sitemap.xml`, inspecione a URL inicial e associe o site ao Perfil da Empresa no Google. Confira o endereço oficial: Rua dos Guapuruvús, 366, Jardim das Violetas, Sinop/MT. Ao trocar de domínio, configure o redirecionamento permanente do endereço anterior na hospedagem.

O foco do conteúdo é a busca local por “estética automotiva em Sinop”. SEO não garante indexação nem posição nos resultados. `llms.txt` é um resumo para ferramentas de IA; não é requisito do Google nem garantia de ranqueamento. Não foram adicionadas avaliações, horários ou preços não confirmados.
