import { readFileSync, statSync } from 'node:fs'
import { resolve, sep } from 'node:path'
import { resolvePage } from './src/route.js'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

function response404(response, request, html) {
  response.writeHead(404, { ...previewHeaders, 'Content-Type': 'text/html; charset=utf-8' })
  response.end(request.method === 'HEAD' ? undefined : html)
}

// Mantém compatibilidade com os favoritos antigos, como na Vercel.
function redirectLegacyRoute(request, response, next) {
  const [path, query] = (request.url || '').split('?')
  const destination = path === '/desenvolvedores' || path === '/desenvolvedores/' || path === '/devs/index.html' ? '/devs' : path === '/index.html' ? '/' : null
  if (destination) {
    response.writeHead(308, { ...previewHeaders, Location: `${destination}${query ? `?${query}` : ''}` })
    response.end()
    return
  }
  next()
}

const hosting = JSON.parse(readFileSync(new URL('./vercel.json', import.meta.url), 'utf8'))
const previewHeaders = Object.fromEntries(hosting.headers[0].headers.map(({ key, value }) => [key, value.replace('; upgrade-insecure-requests', '')]))

export default defineConfig({
  preview: { headers: previewHeaders },
  plugins: [react(), tailwindcss(), {
    name: 'prerender-routes',
    configureServer(server) {
      server.middlewares.use(redirectLegacyRoute)
    },
    configurePreviewServer(server) {
      server.middlewares.use(redirectLegacyRoute)
      // Espelha os rewrites da Vercel para hidratar o HTML correto.
      server.middlewares.use((request, _response, next) => {
        const [path, query] = (request.url || '').split('?')
        if (resolvePage(path) === 'not-found') {
          const outputDir = resolve(server.config.root, server.config.build.outDir)
          let existingAsset = false
          try {
            const asset = resolve(outputDir, `.${decodeURIComponent(path)}`)
            existingAsset = asset.startsWith(`${outputDir}${sep}`) && statSync(asset).isFile()
          } catch { /* Arquivo ausente ou caminho inválido: responde 404. */ }
          if (path === '/404.html' || !existingAsset) {
            try {
              response404(_response, request, readFileSync(resolve(outputDir, '404.html')))
            } catch {
              _response.writeHead(404, { ...previewHeaders, 'Content-Type': 'text/plain; charset=utf-8' })
              _response.end('Página não encontrada')
            }
            return
          }
        }
        if (path === '/devs' || path === '/devs/') {
          request.url = `/devs/index.html${query ? `?${query}` : ''}`
        }
        next()
      })
    },
  }],
})
