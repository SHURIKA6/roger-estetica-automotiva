// Rotas públicas conhecidas; caminhos desconhecidos renderizam a página 404.
export function resolvePage(pathname = '/') {
  const normalizedPath = pathname.replace(/\/+$/, '') || '/'
  if (normalizedPath === '/') return 'landing'
  if (normalizedPath === '/devs') return 'developers'
  return 'not-found'
}
