import DevelopersPage from './pages/DevelopersPage.jsx'
import LandingPage from './pages/LandingPage.jsx'
import { resolvePage } from './route.js'

// Raiz da aplicação: escolhe a página a partir do caminho atual.
export default function App({ pathname = '/' }) {
  return resolvePage(pathname) === 'developers' ? <DevelopersPage /> : <LandingPage />
}
