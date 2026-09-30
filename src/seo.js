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
