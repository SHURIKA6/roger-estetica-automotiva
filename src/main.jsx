import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const root = document.getElementById('root')
const app = <App pathname={window.location.pathname} />
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
