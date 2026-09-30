import SiteBackdrop from './components/SiteBackdrop.jsx'
import DevelopersPage from './pages/DevelopersPage.jsx'
import LandingPage from './pages/LandingPage.jsx'
import { resolvePage } from './route.js'

// Raiz da aplicação: escolhe a página a partir do caminho atual. O cenário é
// irmão da página, fixo atrás do conteúdo em ambas as rotas.
export default function App({ pathname = '/' }) {
  return (
    <>
      <SiteBackdrop />
      {resolvePage(pathname) === 'developers' ? <DevelopersPage /> : <LandingPage />}
    </>
  )
}
