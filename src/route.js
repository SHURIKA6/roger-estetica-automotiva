// Resolve qual página renderizar a partir do caminho da URL.
export function resolvePage(pathname = '/') {
  const normalizedPath = pathname.replace(/\/+$/, '') || '/'
  return normalizedPath === '/desenvolvedores' ? 'developers' : 'landing'
}
