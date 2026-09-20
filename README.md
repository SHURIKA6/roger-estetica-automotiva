# Roger Estética Automotiva

Landing page da Roger Estética Automotiva, em Sinop-MT.

A rota `/desenvolvedores` apresenta os créditos públicos de quem construiu a experiência digital, com a mesma identidade visual da Roger.

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
