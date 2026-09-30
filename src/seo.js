import { ADDRESS, developers, MAPS_URL, PHONE, serviceGroups, WHATSAPP_URL } from './content.js'

// Serialização contextual: atributos HTML e JSON-LD têm limites diferentes.
export function escapeHtmlAttribute(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

export function serializeJsonLd(value) {
  return JSON.stringify(value).replaceAll('<', '\\u003c')
}

export function getPublicationOrigin(env) {
  const configured = env.SITE_URL || (env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}` : '')
  if (!configured) return ''
  const url = new URL(configured)
  if (url.protocol !== 'https:' || url.pathname !== '/' || url.search || url.hash || url.username || url.password) {
    throw new Error('SITE_URL deve ser a origem HTTPS pública, sem caminho, credenciais ou parâmetros.')
  }
  return url.origin
}

// A geração é pura para validar a política de publicação sem executar o Vite.
export function getPublicationSeo(env) {
  const origin = getPublicationOrigin(env)
  const indexable = Boolean(origin) && (!env.VERCEL_ENV || env.VERCEL_ENV === 'production')
  const absolute = (path) => `${origin}${path}`
  const description = 'Estética automotiva em Sinop-MT: polimento, vitrificação, restauração de farol e mais. Rua dos Guapuruvús, 366. Agende pelo WhatsApp.'
  const routes = [
    { path: '/', file: 'dist/index.html', title: 'Estética Automotiva em Sinop | Roger', description },
    { path: '/404.html', file: 'dist/404.html', title: 'Página não encontrada | Roger', description: 'Este endereço não existe. Volte à página inicial da Roger Estética Automotiva.', hidden: true },
    { path: '/devs', file: 'dist/devs/index.html', title: 'Desenvolvedores | Roger Estética Automotiva', description: 'Conheça Eduardo Gobatto e Fernando Riad, desenvolvedores do site da Roger Estética Automotiva.' },
  ].map(route => ({
    ...route,
    robots: indexable && !route.hidden ? 'index, follow, max-image-preview:large' : 'noindex, follow',
  }))
  const robots = `User-agent: *\nAllow: /\nAllow: /devs\n${indexable ? `\nSitemap: ${absolute('/sitemap.xml')}\n` : ''}`
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexable ? routes.filter(route => !route.hidden).map(route => `  <url><loc>${escapeHtmlAttribute(absolute(route.path))}</loc></url>`).join('\n') : ''}\n</urlset>\n`
  const llms = `# Roger Estética Automotiva\n\n> Estética automotiva em Sinop, Mato Grosso, Brasil.\n\nEndereço: ${ADDRESS.street}, ${ADDRESS.neighborhood}, ${ADDRESS.city}.\nTelefone: +${PHONE}. Agendamento pelo WhatsApp.\n\n## Serviços\n\n${serviceGroups.flatMap(group => group.services.map(service => `- ${service.name}: ${service.detail}`)).join('\n')}\n\n## Desenvolvedores\n\n${developers.map(developer => `- ${developer.name}: ${developer.role}.`).join('\n')}\n\n## Contato e páginas\n\n- [Site](${absolute('/')}): serviços e informações da Roger.\n- [Desenvolvedores](${absolute('/devs')}): créditos de criação do site.\n- [WhatsApp](${WHATSAPP_URL}): dúvidas e agendamento.\n- [Localização](${MAPS_URL}): endereço no Google Maps.\n\nPreços, disponibilidade e horários devem ser consultados diretamente com a empresa.\n`
  return { origin, indexable, description, routes, robots, sitemap, llms }
}
