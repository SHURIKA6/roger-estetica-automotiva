# Revisão de segurança, SEO e funcionamento — 30/09/2026

Revisão solicitada a partir das quatro imagens de checklist. Foram inspecionados o código, a configuração de publicação, as dependências e o build local da landing. Este registro distingue correções locais de verificações externas; não representa um pentest exaustivo nem uma validação do deploy atual.

## Alterações aplicadas

- Vite atualizado de 5.4.21 para 6.4.3, removendo os avisos conhecidos do Vite/esbuild encontrados pelo `npm audit`. Lockfile atualizado; React e Tailwind preservados.
- Home com um `h1`; a seção de experiência passou para dentro do `main`. Textos pequenos dos serviços e rodapé receberam tamanho/contraste mais legível. O ano do rodapé acompanha o ano do build/renderização.
- Menu móvel com foco contido no botão e nos links visíveis, foco inicial no primeiro link, Escape para fechar e desbloqueio ao redimensionar para desktop. Main e footer ficam inertes durante o menu.
- Página 404 própria, pré-renderizada em `dist/404.html`, com retorno ao início e `noindex`. Caminhos desconhecidos deixaram de renderizar a home. Preview retorna HTTP 404 também para recursos ausentes e caminhos como `/.env` e `/.git/config`.
- `/index.html` e `/devs/index.html` redirecionam para `/` e `/devs`, evitando divergência entre HTML pré-renderizado e hidratação. Compatibilidade de `/desenvolvedores` mantida pelo redirecionamento anterior.
- Cabeçalhos de segurança configurados na Vercel e reproduzidos no preview: CSP, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` e `Permissions-Policy`. Respostas 404 e redirects locais também recebem os cabeçalhos.
- CSP restringe scripts à própria origem, bloqueia objetos, formulários e enquadramento por outros sites, e permite apenas as origens usadas por fontes, avatares e mapa. Estilos inline continuam permitidos porque o efeito e o React os utilizam. `upgrade-insecure-requests` fica na configuração de publicação e é omitido no preview HTTP local.
- Serialização de atributos HTML, JSON-LD e validação de origem extraídas para `src/seo.js`, com testes separados para fechamento de atributos/scripts, preservação de texto e rejeição de origens inadequadas.
- Favicon PNG 32×32 e ícone Apple 180×180 derivados do logo existente. O cenário recebeu prioridade de carregamento. O JavaScript do easter egg é carregado por importação dinâmica somente em `/devs`.
- Anexos e capturas locais passaram a ser ignorados pelo Git. Nenhum conteúdo histórico da documentação foi apagado.

## Segurança: aplicabilidade das imagens

| Item das imagens | Situação e evidência |
|---|---|
| HTTPS e criptografia em trânsito | A origem configurada precisa ser HTTPS e a política de publicação solicita upgrade dos recursos. Certificado, redirecionamento HTTP e headers efetivos da produção dependem de conferência após deploy. |
| Senhas com hash, senhas no banco, MFA, autenticação fraca e força bruta | Não aplicáveis à arquitetura atual: não há cadastro, login, banco de senhas ou autenticação na landing. |
| Rate limit | Não existe endpoint de escrita ou autenticação da aplicação. Proteção de volume/WAF pertence à hospedagem; nenhuma regra de conta foi criada nesta revisão. |
| Validação frontend/backend e sanitização | Não há formulários de entrada. A origem do build é validada; atributos e JSON-LD têm escape contextual e testes com payloads de injeção. |
| SQL injection, migrations e backups de banco | Não aplicáveis: não há banco de dados nem migrations neste repositório. |
| Controle de acesso e IDOR | Não há recursos por usuário nem endpoints com identificadores privados. `/devs` é acessível pela URL; ocultação e noindex não são autenticação. Os créditos contêm informações públicas. |
| Sessões, expiração, tokens e cookies inseguros | A aplicação não mantém sessão, tokens ou cookies próprios. Cookies eventualmente utilizados por sites externos não foram auditados. |
| Secrets, `.env` e dados sensíveis | Arquivos de ambiente são ignorados pelo Git; não havia `.env` rastreado. O build publica `dist`, sem anexos locais. Inspeção do fluxo de configuração não encontrou credencial necessária ao navegador. Requests locais a `/.env` e `/.git/config` retornaram 404. Isso não é varredura completa do histórico Git. |
| CORS | Não há API própria consumida pelo navegador. Não foi adicionado CORS permissivo. |
| Logs e monitoramento | Falhas de build são visíveis no processo. Logs de hospedagem, alertas e monitoramento contínuo não foram configurados. |
| Rollback e plano de recuperação | Procedimento recomendado abaixo; nenhuma publicação nem restauração foi executada. |
| Backups de arquivos | Código e assets precisam continuar versionados e enviados ao remoto pelo fluxo de publicação. Esta revisão ficou sem commit/push; não foi criado nem alegado backup externo. |
| Criptografia em repouso | Não há armazenamento de dados pessoais da aplicação. Controles de conta da hospedagem e Git ficam fora desta revisão local. |
| Dependências vulneráveis | Corrigido: auditoria inicial com 1 aviso alto e 1 moderado; auditoria após atualização com zero vulnerabilidades conhecidas. |
| Upload sem validação, bloqueio durante envio, CSRF e SSRF | Não aplicáveis ao fluxo atual: não há upload, submissão de formulário, operação autenticada ou busca de URL pelo servidor em tempo de requisição. |
| Informações internas expostas | Recursos inexistentes agora retornam 404 no preview; caminhos e entradas não são interpolados na página de erro. Erros de validação de origem não exibem os valores fornecidos. |
| PMP | A sigla não é definida na imagem. Foram limitadas permissões de câmera, microfone, localização e pagamentos, sem presumir outro requisito. |

## SEO e experiência: resultado dos checklists

| Item | Resultado |
|---|---|
| Meta títulos, descrições, canonical, Open Graph e schema | Existentes e conferidos no HTML de produção sintético; schema `AutomotiveBusiness` usa os sete serviços e os contatos confirmados. Canonical/OG absoluto exigem a origem real da hospedagem. |
| Tags noindex | Home indexável apenas com origem configurada e ambiente de produção. Previews, `/devs` e 404 continuam com noindex intencionalmente. Não remover globalmente. |
| Sitemap e robots.txt | Gerados no build. Sitemap de produção inclui somente a home; preview sem URLs indexáveis. `/devs` também permanece fora do `llms.txt`. |
| Hierarquia de títulos e um h1 | Corrigido na home e conferido nas três páginas. |
| Alt das imagens | Fotos informativas com descrições; duplicatas do carrossel e imagens decorativas permanecem com alt vazio. Dimensões intrínsecas conferidas. |
| Imagens e otimização móvel | WebP local na galeria/cenário, ícones pequenos, dimensões explícitas, prioridade do cenário e lazy loading nas seções inferiores. Carrossel usa eager para evitar fotos vazias durante transformações CSS. |
| Core Web Vitals | Medição de laboratório descrita abaixo; dados reais de campo e INP não foram aferidos. |
| Links quebrados, internos, footer, logo, telefone e redes sociais | Âncoras da home existem; logo volta ao início; telefone e WhatsApp usam o número confirmado; links externos mantêm proteção `noreferrer`. URLs dos perfis foram conferidas, sem enviar mensagens ou verificar todas as respostas dos serviços externos. |
| Slugs e 404 | `/` e `/devs` preservados; aliases antigos redirecionam; rota desconhecida apresenta 404 com HTTP 404 no preview. |
| Menu mobile, botões e overflow | Playwright conferiu foco, Tab, Escape, redimensionamento, pausa da galeria e botão já existente para pular o detalhamento. Sem overflow horizontal de 320 a 1920px. A rolagem vertical da landing é intencional. |
| Favicon e ano | Ícones apropriados adicionados e ano automatizado nos rodapés. |
| Mensagens de sucesso/erro e placeholders | Não há formulários. Página de erro 404 tem explicação e retorno ao início; não foram acrescentadas mensagens artificiais. |
| Search Console, backlinks e descoberta local | Pendentes externos: verificar a propriedade real, enviar sitemap, conferir Perfil da Empresa e consistência do endereço. Nenhum backlink, mensagem ou alteração de conta foi criado. |

## Evidências executadas

- `npm test`: 16 testes aprovados; `npm run build`: aprovado; `git diff --check`: limpo.
- `npm audit --json`: zero vulnerabilidades conhecidas após a atualização. O npm mostrou aviso de limpeza de um executável antigo do esbuild em uso no Windows; instalação, auditoria e build concluíram. O aviso não correspondeu a falha de build.
- Builds sintéticos com `SITE_URL=https://roger.example.test`: em produção, home indexável, canonical/OG absolutos, JSON-LD parseável com sete serviços e créditos fora do sitemap; em preview, home com noindex e sitemap vazio. Variáveis temporárias removidas e build local final restaurado sem domínio fictício.
- Playwright/Chromium em 320, 390, 640, 768, 1080, 1440 e 1920px, nas rotas `/`, `/devs` e uma rota inexistente: um h1, um main, sem overflow horizontal, sem erros JavaScript/hidratação e sem bloqueios CSP observados no conteúdo da aplicação.
- HTTP do preview: home/créditos/ícones/robots/sitemap/llms com 200; rotas e arquivos ausentes com 404; aliases HTML com 308. Cabeçalhos presentes também nos 404/redirects.
- Home sem download do chunk `DetailingEasterEgg`; entrada automática e botão de pular continuam funcionais em `/devs`. Movimento reduzido e Escape já haviam sido verificados na etapa anterior e o comportamento foi preservado.
- Laboratório móvel: Chromium, 390×844, cache frio, CPU 4× mais lenta, latência de 150ms, download de 1,6Mbps. Uma execução observou FCP 940ms, LCP 2440ms, CLS acumulado 0,0242; menu abriu/fechou e não houve overflow. Esses valores locais não garantem Core Web Vitals da produção; não houve medição de INP de campo.

## Publicação e recuperação

1. Revisar e versionar as alterações com o lockfile e assets; publicar pelo fluxo existente da Vercel quando autorizado.
2. Conferir a origem real em `SITE_URL` ou `VERCEL_PROJECT_PRODUCTION_URL`, sem usar o endereço temporário de um deploy como canonical.
3. Após publicar, conferir HTTPS, headers efetivos, home indexável, `/devs` com noindex, 404 real, mapa, fontes, avatares e links de contato. O preview local reproduz a configuração, mas não comprova a aplicação dela na Vercel.
4. Em regressão de publicação, promover o último deployment funcional na Vercel e corrigir a alteração em um novo commit, preservando o histórico. Não usar reset destrutivo do repositório como plano de recuperação.

Safari/iOS, dispositivo físico, Search Console, WAF/rate limit, alertas e configuração de conta não foram validados. Não foi realizado scan formal do Codex Security, commit, push ou deploy.

Referências consultadas: [404 estática na Vercel](https://vercel.com/kb/guide/custom-404-page), [configuração de redirects/rewrites/headers](https://vercel.com/docs/project-configuration/vercel-json), [CSP no MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy).

## Complemento: cena animada da 404 — 30/09/2026

A 404 estática descrita acima ganhou uma cena vetorial de 3 segundos: carro entra pela esquerda, toca uma barreira, recua e mostra “Não foi possível chegar ao destino.”. Seguem 5 segundos de contagem antes de substituir a URL por `/`. O usuário pode voltar imediatamente ou cancelar. Abrir o menu ou interagir com outro item do cabeçalho cancela o retorno para não disputar a navegação escolhida.

Sem JavaScript, a cena final, a explicação e o link continuam no HTML. Com movimento reduzido, não há animações na cena e a contagem começa após hidratar. Ativar essa preferência durante a entrada também termina a cena imediatamente. O cancelamento mantém o foco no botão, agora rotulado “Retorno cancelado”. Não foram adicionadas dependências, arquivos de imagem ou alterações aos contratos de rotas/metadados.

Verificações desta etapa, sobre o preview local de produção em Chromium:

- `npm test`: 16/16; `npm run build`: aprovado; `git diff --check`: sem erros. O Git avisa sobre normalização futura de LF para CRLF em arquivos editados, sem erro de whitespace.
- Retorno automático completo em 1440×1000 e 390×844: animação, aviso de 5 segundos, decremento e chegada à home. O histórico confirmou `replace`: Voltar retorna à página anterior à 404.
- Cancelamento durante a animação e durante a contagem: permanência na URL após ultrapassar o prazo original. Ativação por Enter preservou o foco no botão.
- “Voltar agora” levou à home; abrir o menu cancelou o timer, aplicou inert no main e Escape fechou o menu.
- Movimento reduzido inicial: cena sem animações e retorno após a contagem. Preferência alterada durante a cena: estado final imediato. JavaScript desativado: HTTP 404, mensagem visível, ausência de contagem falsa e link de retorno funcional.
- Larguras 320, 390, 640, 768, 1080, 1440 e 1920px: sem overflow horizontal, exatamente um h1 e um main, HTTP 404 e `noindex, follow`.
- Sem erros JavaScript, de hidratação ou violações CSP observadas. O erro de rede do documento HTTP 404 no console é esperado.
- Inspeção visual de mobile/desktop e dos quadros de entrada (1200ms), impacto (2160ms) e repouso (2820ms). Capturas locais em `.playwright-mcp/404-cena-*.png`; os quadros foram pausados apenas para inspeção, enquanto o retorno automático foi validado em execução normal.

Uma segunda revisão somente de leitura conferiu timers, SSR e acessibilidade. Safari/iOS e aparelho físico não foram testados nesta etapa. Sem commit, push ou deploy.

## Complemento: oferta, fotografias e descoberta de `/devs` — 30/09/2026

Depois dos checklists e da 404, o usuário aprovou a melhoria da oferta e solicitou `/devs` nos arquivos de descoberta. Este complemento substitui a política histórica de noindex dos créditos e sitemap só com home apresentada nas tabelas e no procedimento de publicação acima. O histórico das verificações continua preservado.

### Mudanças desta etapa

- Abertura com “Brilho e proteção para seu carro em Sinop”, bairro/cidade, CTA de orçamento no WhatsApp e “Ver serviços”. A lista de serviços vem antes da galeria e recebe outro CTA; atendimento e localização aparecem na sequência.
- Legendas mais legíveis e descrições mais específicas para os serviços, sem promessa de duração. Correção para “Hidratação de bancos de couro”, com imagem e descrição correspondentes na página e nos arquivos derivados do conteúdo.
- Quatro novas fontes de stock no Pexels, com cinco arquivos locais WebP: polimento em atendimento; couro no serviço e substituindo tecido na galeria; painel e espuma acrescentados à galeria. Dez fotos distintas, proporção visual 4:3, loop de 66s, pausa e movimento reduzido. Fontes e dimensões estão no README; cada seção identifica as imagens como ilustrativas.
- Créditos indexáveis em produção com origem válida, título/descrição próprios, canonical `/devs`, Open Graph e Twitter Card. `Allow: /devs` no robots, URLs canônicas de `/` e `/devs` no sitemap e link/dados dos dois desenvolvedores no `llms.txt`.
- Preview da Vercel e build sem origem continuam noindex e com sitemap vazio. 404 segue excluída, redirects dos aliases e ausência de link de navegação para créditos na landing são preservados.

Sem avaliações, antes/depois, fotos apresentadas como equipe/trabalhos da Roger, preços ou horários não confirmados. RAM e identidade visual mantidas; sem novas dependências, commit, push ou deploy.

### Evidências desta etapa

Resultados executados para este complemento:

- `npm test`: 24/24, zero falhas. Três execuções sequenciais de `node scripts/build.mjs`, o mesmo script de `npm run build`, aprovadas. Produção sintética: `SITE_URL=https://roger.example.test` e `VERCEL_ENV=production`; preview: mesma origem e `VERCEL_ENV=preview`; local: sem origem nem `VERCEL_ENV`. O build final local foi restaurado sem domínio fictício.
- Assertivas lendo `dist` confirmaram home e créditos com `index, follow` em produção, 404 noindex, canonical exato de `/devs` sem barra final, sitemap com exatamente `/` e `/devs`, robots com `Allow: /devs` e referência ao sitemap de produção. Preview e build sem origem conservaram noindex e sitemap vazio.
- `llms.txt` contém o link dos créditos e os nomes/funções dos dois desenvolvedores. O JSON-LD contém os sete serviços, incluindo hidratação de couro, sem reviews/aggregateRating. Nome antigo ausente no HTML, JSON-LD e `llms.txt`; ordem das seções e dois CTAs de orçamento confirmados no HTML.
- Playwright/Chromium sobre o preview, em `/` e `/devs`, nas larguras 320, 390, 640, 768, 1080, 1440 e 1920px com altura de 900px: um h1 por página, sem overflow horizontal e sem erros JavaScript/hidratação. A home tem dois CTAs de orçamento, sete serviços, dez fotos distintas e dez cópias com `aria-hidden`; legendas de serviços com 13px.
- Menu móvel até 1080px: abertura, inert, foco contido no cabeçalho, Escape e retorno do foco ao botão conferidos. O link “Ver serviços” alcança a seção sem ficar encoberta pelo header. O menu mostra “Atendimento”, preservando a âncora `#essencia`.
- Vinte imagens do carrossel decodificadas, com dimensões conferidas; inspeção dos recortes de polimento, couro e espuma. Pausa deixa a animação parada; retomada restaura `aria-pressed=false`. Quadros em 0, 65999 e 66000ms confirmaram metades iguais de 2920px, sem vão no reinício em 1920px. Movimento reduzido: animação desligada, dez itens visíveis e rolagem manual.
- Redirects: `/desenvolvedores?ref=seo` → 308 para `/devs?ref=seo`; `/devs/index.html` → 308 para `/devs`; `/devs/` → 200, sem `X-Robots-Tag`. A última navegação observada teve zero erros e zero avisos no console.
- Inspeção visual em desktop 1440px e celular 390×844, com capturas em `.playwright-mcp/`, ignoradas pelo Git. Revisão independente sem achados pendentes. `git diff --check` da documentação passou; os únicos avisos foram de futura normalização LF/CRLF.

As evidências das etapas anteriores continuam históricas. Nesta etapa não foram testados Safari/iOS ou aparelho físico, nem realizada nova medição de Core Web Vitals. Sem commit, push ou deploy.

Após publicação autorizada, conferir home e `/devs` indexáveis, canonical/OG com a origem real, sitemap com as duas URLs, créditos no `llms.txt`, robots, aliases antigos e 404. A conferência local não comprova o deploy, a indexação no Google nem os resultados de campo.
