import SiteBackdrop from './components/SiteBackdrop.jsx'
import DevelopersPage from './pages/DevelopersPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import LandingPage from './pages/LandingPage.jsx'
import { resolvePage } from './route.js'

// Raiz da aplicação: escolhe a página a partir do caminho atual. O cenário é
// irmão da página, fixo atrás do conteúdo em ambas as rotas.
export default function App({ pathname = '/' }) {
  const page = resolvePage(pathname)
  return (
    <>
      <SiteBackdrop page={page} />
      {page === 'developers' ? <DevelopersPage /> : page === 'landing' ? <LandingPage /> : <NotFoundPage />}
    </>
  )
}
