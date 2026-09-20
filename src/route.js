export function resolvePage(pathname = '/') {
  const normalizedPath = pathname.replace(/\/+$/, '') || '/'
  return normalizedPath === '/desenvolvedores' ? 'developers' : 'landing'
}
