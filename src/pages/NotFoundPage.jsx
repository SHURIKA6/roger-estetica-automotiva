import { useEffect, useRef, useState } from 'react'
import Brand from '../components/Brand.jsx'
import SiteHeader from '../components/SiteHeader.jsx'
import SkipLink from '../components/SkipLink.jsx'

const DRIVE_DURATION = 3000
const RETURN_SECONDS = 5

export default function NotFoundPage() {
  // O primeiro render também serve ao HTML pré-renderizado, sem depender de window.
  const [phase, setPhase] = useState('ready')
  const [seconds, setSeconds] = useState(RETURN_SECONDS)
  const [cancelled, setCancelled] = useState(false)
  const cancelledRef = useRef(false)

  const cancelReturn = () => {
    cancelledRef.current = true
    setCancelled(true)
  }

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let sceneTimer
    const finishScene = () => {
      window.clearTimeout(sceneTimer)
      setPhase('arrived')
    }
    const handleMotion = () => { if (motion.matches) finishScene() }

    if (motion.matches) finishScene()
    else {
      setPhase('driving')
      sceneTimer = window.setTimeout(finishScene, DRIVE_DURATION)
    }
    motion.addEventListener('change', handleMotion)
    return () => {
      window.clearTimeout(sceneTimer)
      motion.removeEventListener('change', handleMotion)
    }
  }, [])

  useEffect(() => {
    if (phase !== 'arrived' || cancelled) return

    const timer = window.setTimeout(() => {
      if (cancelledRef.current) return
      if (seconds === 1) window.location.replace('/')
      else setSeconds((current) => current - 1)
    }, 1000)
    return () => window.clearTimeout(timer)
  }, [phase, seconds, cancelled])

  const status = cancelled
    ? 'Retorno automático cancelado. Você pode voltar quando quiser.'
    : phase === 'arrived'
      ? `Voltando à página principal em ${seconds} ${seconds === 1 ? 'segundo' : 'segundos'}…`
      : 'Este caminho não existe. Vamos voltar ao início?'

  return (
    <div className="site-page min-h-screen">
      <SkipLink />
      <SiteHeader onInteract={cancelReturn} />
      <main id="main" tabIndex={-1} className="not-found-main">
        <div className="glass-surface not-found-panel" data-phase={phase} style={{ '--crash-duration': `${DRIVE_DURATION}ms` }}>
          <p className="not-found-eyebrow"><span>Erro 404</span><span>Rota interrompida</span></p>

          <svg className="not-found-scene" viewBox="0 0 640 230" aria-hidden="true" focusable="false">
            <defs>
              <linearGradient id="crash-paint" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#ff7160" />
                <stop offset="0.52" stopColor="#ea4436" />
                <stop offset="1" stopColor="#ac241f" />
              </linearGradient>
              <linearGradient id="crash-glass" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#535958" />
                <stop offset="1" stopColor="#171e20" />
              </linearGradient>
              <pattern id="crash-stripes" width="32" height="32" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
                <rect width="32" height="32" fill="#f0e7d9" />
                <rect width="14" height="32" fill="#ea4436" />
              </pattern>
            </defs>

            <path d="M24 196H616" stroke="#d6b788" strokeOpacity=".4" />
            <path d="M30 215H98M142 215H210M254 215H322M366 215H434M478 215H546M590 215H616" stroke="#f0e7d9" strokeOpacity=".12" strokeWidth="2" />
            <path d="M66 83H142M102 99H168M40 118H99" stroke="#d6b788" strokeOpacity=".18" strokeWidth="2" strokeLinecap="round" />
            <circle cx="557" cy="58" r="29" fill="#d6b788" fillOpacity=".05" />
            <path d="M557 44V63M557 70V73" stroke="#d6b788" strokeWidth="3" strokeLinecap="round" />

            <g className="crash-barrier">
              <path d="M489 153L481 195M532 153L540 195" stroke="#a69e92" strokeWidth="7" />
              <rect x="474" y="130" width="73" height="37" rx="3" fill="url(#crash-stripes)" stroke="#f0e7d9" strokeWidth="2" />
              <path d="M471 196H491M530 196H550" stroke="#d7cdbf" strokeWidth="3" strokeLinecap="round" />
            </g>

            <g className="crash-car">
              <ellipse cx="125" cy="83" rx="123" ry="6" fill="#000" fillOpacity=".3" />
              <path d="M8 42L46 35L68 12Q73 6 84 6H139Q150 6 157 15L179 34L220 40Q237 43 242 56L244 67H9Q2 67 1 57V51Q1 46 8 42Z" fill="url(#crash-paint)" stroke="#ff8b77" strokeWidth="1.5" />
              <path d="M55 34L75 14H101V34ZM109 14H137Q144 14 149 20L162 34H109Z" fill="url(#crash-glass)" stroke="#ffad95" strokeWidth="1.5" />
              <path d="M111 40H123M12 53H225" stroke="#7e211d" strokeWidth="2" strokeLinecap="round" />
              <path d="M174 37L171 55M105 39V56" stroke="#8d261f" strokeWidth="1.5" />
              <path d="M15 40L31 38M182 37L216 43" stroke="#ffb395" strokeWidth="2" strokeLinecap="round" />
              <path d="M231 48L240 53V58H227Z" fill="#f5dab0" />
              <path d="M4 48H14V55H3" fill="#7b1d1c" />
              <rect x="225" y="62" width="20" height="5" rx="2" fill="#d7cdbf" />
              <path d="M74 68H168" stroke="#631f1e" strokeWidth="6" />
              {[48, 192].map((x) => (
                <g key={x} transform={`translate(${x} 66)`}>
                  <circle r="21" fill="#111315" />
                  <circle r="14" fill="#666a68" stroke="#c4c3b9" strokeWidth="2" />
                  <g className="crash-wheel" stroke="#d7d4c9" strokeWidth="3">
                    <path d="M0-11V11M-11 0H11M-8-8L8 8M-8 8L8-8" />
                  </g>
                  <circle r="4" fill="#2b2e2e" />
                </g>
              ))}
            </g>

            <g className="crash-impact" stroke="#d6b788" strokeWidth="3" strokeLinecap="round">
              <path d="M457 123L451 111M469 119L473 104M480 126L491 117M453 139L439 136" />
            </g>
            <g className="crash-dust" fill="none" stroke="#d7cdbf" strokeOpacity=".55" strokeWidth="2" strokeLinecap="round">
              <path d="M443 141Q433 133 441 126Q450 120 445 112M457 144Q465 134 460 128" />
            </g>
          </svg>

          <div className="not-found-copy">
            <h1>Não foi possível chegar ao destino.</h1>
            <p className="not-found-description">O endereço que você procurou não está por aqui.<br className="hidden sm:block" /> A gente te leva de volta para a Roger.</p>
          </div>
          <p className="not-found-status" role="status" aria-live="polite" aria-atomic="true">{status}</p>
          <div className="not-found-actions">
            <a className="not-found-home" href="/" onClick={cancelReturn}>
              <span aria-hidden="true">←</span> Voltar agora
            </a>
            {phase !== 'ready' && (
              <button className="not-found-cancel" type="button" aria-disabled={cancelled} onClick={cancelReturn}>
                {cancelled ? 'Retorno cancelado' : 'Cancelar retorno automático'}
              </button>
            )}
          </div>
        </div>
      </main>
      <footer className="not-found-footer border-t border-line py-8"><Brand /></footer>
    </div>
  )
}
