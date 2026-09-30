import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { build, createServer, loadEnv } from 'vite'
import { escapeHtmlAttribute as escape, getPublicationSeo, serializeJsonLd } from '../src/seo.js'
import { ADDRESS, MAPS_URL, PHONE, serviceGroups } from '../src/content.js'

// Build de produção: gera os assets com o Vite, pré-renderiza cada rota em HTML
// com os próprios metadados e escreve os arquivos de SEO.

// SITE_URL tem prioridade sobre a URL automática da Vercel. Sem nenhuma das duas,
// o build sai com noindex em vez de inventar um domínio.
const env = { ...loadEnv('production', process.cwd(), ''), ...process.env }
const { origin, indexable, description, routes, robots, sitemap, llms } = getPublicationSeo(env)
const absolute = (path) => `${origin}${path}`

await build()
const template = await readFile('dist/index.html', 'utf8')
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
try {
  const { render } = await server.ssrLoadModule('/src/entry-server.jsx')
  for (const route of routes) {
    const tags = [
      `<title>${escape(route.title)}</title>`,
      `<meta name="description" content="${escape(route.description)}" />`,
      `<meta name="robots" content="${route.robots}" />`,
      '<meta property="og:type" content="website" />',
      '<meta property="og:locale" content="pt_BR" />',
      '<meta property="og:site_name" content="Roger Estética Automotiva" />',
      `<meta property="og:title" content="${escape(route.title)}" />`,
      `<meta property="og:description" content="${escape(route.description)}" />`,
      '<meta name="twitter:card" content="summary_large_image" />',
      `<meta name="twitter:title" content="${escape(route.title)}" />`,
      `<meta name="twitter:description" content="${escape(route.description)}" />`,
    ]
    if (origin && route.path !== '/404.html') tags.push(
      `<link rel="canonical" href="${escape(absolute(route.path))}" />`,
      `<meta property="og:url" content="${escape(absolute(route.path))}" />`,
      `<meta property="og:image" content="${escape(absolute('/assets/roger-logo.jpg'))}" />`,
      '<meta property="og:image:width" content="1024" />',
      '<meta property="og:image:height" content="1024" />',
      '<meta property="og:image:alt" content="Logo da Roger Estética Automotiva" />',
      `<meta name="twitter:image" content="${escape(absolute('/assets/roger-logo.jpg'))}" />`,
    )
    if (route.path === '/') {
      const business = {
        '@context': 'https://schema.org', '@type': 'AutomotiveBusiness',
        name: 'Roger Estética Automotiva', description, telephone: `+${PHONE}`,
        address: { '@type': 'PostalAddress', streetAddress: ADDRESS.street, addressLocality: 'Sinop', addressRegion: 'MT', addressCountry: 'BR' },
        areaServed: { '@type': 'City', name: 'Sinop' }, hasMap: MAPS_URL,
        ...(origin ? { '@id': absolute('/#empresa'), url: absolute('/'), image: absolute('/assets/roger-logo.jpg'), logo: absolute('/assets/roger-logo.jpg') } : {}),
        hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Serviços de estética automotiva', itemListElement: serviceGroups.flatMap(group => group.services.map(service => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: service.name, description: service.detail } }))) },
      }
      tags.push(`<script type="application/ld+json">${serializeJsonLd(business)}</script>`)
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

await writeFile('dist/robots.txt', robots)
await writeFile('dist/sitemap.xml', sitemap)
await writeFile('dist/llms.txt', llms)
console.log(indexable ? `SEO: produção indexável em ${origin}` : 'SEO: build com noindex; configure SITE_URL ou VERCEL_PROJECT_PRODUCTION_URL para produção. Previews da Vercel permanecem noindex.')
