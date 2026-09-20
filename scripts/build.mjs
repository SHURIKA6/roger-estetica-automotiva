import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { build, createServer, loadEnv } from 'vite'
import { ADDRESS, MAPS_URL, PHONE, serviceGroups, WHATSAPP_URL } from '../src/landing-content.js'

const env = { ...loadEnv('production', process.cwd(), ''), ...process.env }
const configuredUrl = env.SITE_URL || (env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}` : '')
let origin = ''
if (configuredUrl) {
  const url = new URL(configuredUrl)
  if (url.protocol !== 'https:' || url.pathname !== '/' || url.search || url.hash || url.username || url.password) {
    throw new Error('SITE_URL deve ser a origem HTTPS pública, sem caminho, credenciais ou parâmetros.')
  }
  origin = url.origin
}
const indexable = Boolean(origin) && (!env.VERCEL_ENV || env.VERCEL_ENV === 'production')
const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
const absolute = (path) => `${origin}${path}`
const description = 'Estética automotiva em Sinop-MT: polimento, vitrificação, restauração de farol e mais. Rua dos Guapuruvús, 366. Agende pelo WhatsApp.'
const routes = [
  { path: '/', file: 'dist/index.html', title: 'Estética Automotiva em Sinop | Roger', description },
  { path: '/desenvolvedores', file: 'dist/desenvolvedores/index.html', title: 'Desenvolvedores | Roger Estética Automotiva', description: 'Conheça Eduardo Gobatto e Fernando Riad, desenvolvedores do site da Roger Estética Automotiva.' },
]

await build()
const template = await readFile('dist/index.html', 'utf8')
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
try {
  const { render } = await server.ssrLoadModule('/src/entry-server.jsx')
  for (const route of routes) {
    const tags = [
      `<title>${escape(route.title)}</title>`,
      `<meta name="description" content="${escape(route.description)}" />`,
      `<meta name="robots" content="${indexable ? 'index, follow, max-image-preview:large' : 'noindex, follow'}" />`,
      '<meta property="og:type" content="website" />',
      '<meta property="og:locale" content="pt_BR" />',
      '<meta property="og:site_name" content="Roger Estética Automotiva" />',
      `<meta property="og:title" content="${escape(route.title)}" />`,
      `<meta property="og:description" content="${escape(route.description)}" />`,
      '<meta name="twitter:card" content="summary_large_image" />',
      `<meta name="twitter:title" content="${escape(route.title)}" />`,
      `<meta name="twitter:description" content="${escape(route.description)}" />`,
    ]
    if (origin) tags.push(
      `<link rel="canonical" href="${escape(absolute(route.path))}" />`,
      `<meta property="og:url" content="${escape(absolute(route.path))}" />`,
      `<meta property="og:image" content="${escape(absolute('/assets/roger-flyer.png'))}" />`,
      '<meta property="og:image:width" content="1600" />',
      '<meta property="og:image:height" content="900" />',
      '<meta property="og:image:alt" content="Flyer da Roger Estética Automotiva" />',
      `<meta name="twitter:image" content="${escape(absolute('/assets/roger-flyer.png'))}" />`,
    )
    if (route.path === '/') {
      const business = {
        '@context': 'https://schema.org', '@type': 'AutomotiveBusiness',
        name: 'Roger Estética Automotiva', description, telephone: `+${PHONE}`,
        address: { '@type': 'PostalAddress', streetAddress: ADDRESS.street, addressLocality: 'Sinop', addressRegion: 'MT', addressCountry: 'BR' },
        areaServed: { '@type': 'City', name: 'Sinop' }, hasMap: MAPS_URL,
        ...(origin ? { '@id': absolute('/#empresa'), url: absolute('/'), image: absolute('/assets/roger-flyer.png') } : {}),
        hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Serviços de estética automotiva', itemListElement: serviceGroups.flatMap(group => group.services.map(service => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: service.name, description: service.detail } }))) },
      }
      tags.push(`<script type="application/ld+json">${JSON.stringify(business).replaceAll('<', '\\u003c')}</script>`)
    }
    const html = template.replace(/<title>[\s\S]*?<\/title>/g, '').replace(/<meta\s+(?:name="description"|property="og:[^"]+")[^>]*>/g, '')
      .replace('</head>', `${tags.join('\n    ')}\n  </head>`)
      .replace('<div id="root"></div>', () => `<div id="root">${render(route.path)}</div>`)
    await mkdir(new URL(`../${route.file.substring(0, route.file.lastIndexOf('/'))}/`, import.meta.url), { recursive: true })
    await writeFile(route.file, html)
  }
} finally {
  await server.close()
}

await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\n${indexable ? `\nSitemap: ${absolute('/sitemap.xml')}\n` : ''}`)
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexable ? routes.map(route => `  <url><loc>${escape(absolute(route.path))}</loc></url>`).join('\n') : ''}\n</urlset>\n`)
await writeFile('dist/llms.txt', `# Roger Estética Automotiva\n\n> Estética automotiva em Sinop, Mato Grosso, Brasil.\n\nEndereço: ${ADDRESS.street}, ${ADDRESS.neighborhood}, ${ADDRESS.city}.\nTelefone: +${PHONE}. Agendamento pelo WhatsApp.\n\n## Serviços\n\n${serviceGroups.flatMap(group => group.services.map(service => `- ${service.name}: ${service.detail}`)).join('\n')}\n\n## Contato e páginas\n\n- [Site](${absolute('/')}): serviços e informações da Roger.\n- [WhatsApp](${WHATSAPP_URL}): dúvidas e agendamento.\n- [Localização](${MAPS_URL}): endereço no Google Maps.\n- [Desenvolvedores](${absolute('/desenvolvedores')}): créditos do site.\n\nPreços, disponibilidade e horários devem ser consultados diretamente com a empresa.\n`)
console.log(indexable ? `SEO: produção indexável em ${origin}` : 'SEO: build com noindex; configure SITE_URL ou VERCEL_PROJECT_PRODUCTION_URL para produção. Previews da Vercel permanecem noindex.')
