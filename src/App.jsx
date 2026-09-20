import { useEffect, useRef, useState } from 'react'
import { resolvePage } from './route.js'
import {
  ADDRESS,
  journeySteps,
  MAPS_URL,
  PHONE,
  proofPoints,
  serviceGroups,
  WHATSAPP_URL,
} from './landing-content.js'

function ArrowIcon({ direction = 'up-right' }) {
  const paths = direction === 'down'
    ? <path d="M5 9l7 7 7-7M12 16V3" />
    : <><path d="M5 19 19 5M8 5h11v11" /></>

  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths}</svg>
}

function PinIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>
}

function SparkIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="m12 2 1.65 6.35L20 10l-6.35 1.65L12 18l-1.65-6.35L4 10l6.35-1.65L12 2Z" /><path d="m19 17 .65 2.35L22 20l-2.35.65L19 23l-.65-2.35L16 20l2.35-.65L19 17Z" /></svg>
}

function PhoneIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16.5v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 1.12 3.8 2 2 0 0 1 3.11 1.6h3a2 2 0 0 1 2 1.72c.12.9.34 1.78.66 2.62a2 2 0 0 1-.45 2.11L7.05 9.3a16 16 0 0 0 6 6l1.25-1.25a2 2 0 0 1 2.11-.45c.84.32 1.72.54 2.62.66A2 2 0 0 1 21 16.5Z" /></svg>
}

function InstagramIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".7" fill="currentColor" stroke="none" /></svg>
}

function GithubIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .8a11.2 11.2 0 0 0-3.54 21.82c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.28-1.23-1.62-1.23-1.62-1-.69.08-.68.08-.68 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.58 1.2 3.2.92.1-.71.38-1.2.7-1.48-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.43-2.22 1.13-3-.11-.28-.49-1.42.11-2.96 0 0 .92-.3 3.08 1.15A10.7 10.7 0 0 1 12 6.2c.93 0 1.86.13 2.73.4 2.16-1.46 3.08-1.15 3.08-1.15.6 1.54.22 2.68.11 2.96.7.78 1.13 1.78 1.13 3 0 4.29-2.62 5.23-5.11 5.51.4.35.75 1.03.75 2.08v3.08c0 .3.2.65.77.54A11.2 11.2 0 0 0 12 .8Z" /></svg>
}

function Brand({ homeHref = '/#inicio', onClick }) {
  return (
    <a className="brand" href={homeHref} aria-label="Roger Estética Automotiva — início" onClick={onClick}>
      <span className="brand-mark">R</span>
      <span className="brand-copy"><strong>ROGER</strong><small>estética automotiva</small></span>
    </a>
  )
}

function SiteHeader({ menuOpen, setMenuOpen, developersActive = false }) {
  const menuButtonRef = useRef(null)
  const navId = developersActive ? 'developers-nav' : 'main-nav'

  useEffect(() => {
    document.body.classList.toggle('menu-is-open', menuOpen)
    const main = document.querySelector('main')
    if (main) {
      main.toggleAttribute('inert', menuOpen)
      if (menuOpen) main.setAttribute('aria-hidden', 'true')
      else main.removeAttribute('aria-hidden')
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('menu-is-open')
      if (main) {
        main.removeAttribute('inert')
        main.removeAttribute('aria-hidden')
      }
    }
  }, [menuOpen, setMenuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <Brand onClick={closeMenu} />

      <button
        ref={menuButtonRef}
        className="menu-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls={navId}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className="sr-only">{menuOpen ? 'Fechar menu' : 'Abrir menu'}</span>
        <span className="menu-line" /><span className="menu-line" />
      </button>

      <nav id={navId} className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Navegação principal">
        <a href="/#servicos" onClick={closeMenu}>Serviços</a>
        <a href="/#essencia" onClick={closeMenu}>A experiência</a>
        <a href="/#visite" onClick={closeMenu}>Onde estamos</a>
        {developersActive ? (
          <a className="nav-cta developers-nav-active" href="/desenvolvedores" aria-current="page" onClick={closeMenu}>Desenvolvedores <ArrowIcon /></a>
        ) : (
          <a className="nav-link-developers" href="/desenvolvedores" onClick={closeMenu}>Desenvolvedores</a>
        )}
        {!developersActive && (
          <a className="nav-cta" href={WHATSAPP_URL} target="_blank" rel="noreferrer" onClick={closeMenu}>
            Falar pelo WhatsApp <ArrowIcon />
          </a>
        )}
      </nav>
    </header>
  )
}

function SiteFooter() {
  return (
    <footer className="site-footer section-grid">
      <Brand />
      <p>Seu carro. Seu estilo.<br /><span>Seu melhor detalhe.</span></p>
      <div className="footer-links">
        <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">WhatsApp</a>
        <a href={MAPS_URL} target="_blank" rel="noreferrer">Google Maps</a>
        <a href="/desenvolvedores">Desenvolvedores</a>
        <a href={`tel:+${PHONE}`}>Ligar</a>
      </div>
      <small className="copyright">© 2026 Roger Estética Automotiva</small>
    </footer>
  )
}

function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeService, setActiveService] = useState('Vitrificação em pintura')

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">Pular para o conteúdo</a>
      <SiteHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <main id="main">
        <section className="hero section-grid" id="inicio" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" /> Estética automotiva · Sinop/MT</p>
            <h1 id="hero-title">Seu carro<br /><em>pronto para aparecer.</em></h1>
            <p className="hero-lede">Estética automotiva em Sinop: polimento, vitrificação, restauração de farol e cuidado com os detalhes do seu carro. Conheça os serviços e agende direto com a Roger.</p>
            <div className="hero-actions">
              <a className="button button-primary" href={WHATSAPP_URL} target="_blank" rel="noreferrer">Agendar pelo WhatsApp <ArrowIcon /></a>
              <a className="text-link" href="#servicos">Ver serviços <ArrowIcon direction="down" /></a>
            </div>
            <div className="hero-meta" aria-label="Especialidades">
              <span>Polimento</span><i /><span>Proteção</span><i /><span>Restauração</span>
            </div>
          </div>

          <div className="hero-art" role="img" aria-label="Flyer da Roger Estética Automotiva com um carro esportivo vermelho">
            <div className="hero-art-label">01 <span>cuidado em cada linha</span></div>
            <div className="hero-beam" />
            <div className="hero-photo-wrap">
              <img className="hero-photo" src="/assets/roger-flyer.png" alt="Flyer da Roger Estética Automotiva com um carro esportivo vermelho" width="1600" height="900" fetchPriority="high" />
            </div>
            <div className="hero-art-caption"><span>ROGER</span><span>EST. AUTOMOTIVA</span></div>
            <div className="hero-art-note">A estética<br />começa no olhar.</div>
          </div>
          <div className="scroll-cue"><span /> role para explorar</div>
        </section>

        <section className="proof-strip" aria-label="Por que falar com a Roger">
          <div className="section-grid proof-grid">
            {proofPoints.map((point) => (
              <div className="proof-point" key={point.value}>
                <strong>{point.value}</strong>
                <span>{point.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="essence section-grid" id="essencia" aria-labelledby="essence-title">
          <div className="section-tag">/ a experiência</div>
          <div className="essence-content">
            <h2 id="essence-title">Mais que limpeza.<br /><span>É cuidado que aparece.</span></h2>
            <div className="essence-lower">
              <p>Seu carro tem linhas, textura e personalidade. O trabalho da Roger é revelar tudo isso com técnica, paciência e olho para o detalhe.</p>
              <a className="circle-link" href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="Conversar com a Roger pelo WhatsApp"><span>Quero<br />cuidar</span><ArrowIcon /></a>
            </div>
          </div>
          <div className="essence-side-note"><SparkIcon /><span>brilho que<br />se percebe</span></div>
        </section>

        <section className="services-section" id="servicos" aria-labelledby="services-title">
          <div className="section-grid services-heading">
            <div className="section-tag">/ o que fazemos</div>
            <div>
              <p className="eyebrow">Sete formas de cuidar melhor</p>
              <h2 id="services-title">Escolha o próximo<br /><em>nível de cuidado.</em></h2>
            </div>
            <div className="services-heading-mark">R<span>•</span></div>
          </div>

          <div className="section-grid services-grid">
            {serviceGroups.map((group, groupIndex) => (
              <article className="service-group" key={group.label}>
                <div className="service-group-top"><span>{group.label}</span><span className="service-group-line" /></div>
                <h3>{group.title}</h3>
                <p>{group.copy}</p>
                <div className="service-list">
                  {group.services.map((service, serviceIndex) => {
                    const serviceId = `service-${groupIndex}-${serviceIndex}`
                    const isActive = activeService === service.name
                    return (
                      <div className={`service-item ${isActive ? 'is-active' : ''}`} key={service.name}>
                        <button id={`${serviceId}-trigger`} type="button" aria-expanded={isActive} aria-controls={`${serviceId}-detail`} onClick={() => setActiveService(isActive ? '' : service.name)}>
                          <span>{service.name}</span><span className="service-plus" aria-hidden="true">{isActive ? '−' : '+'}</span>
                        </button>
                        <div id={`${serviceId}-detail`} className="service-detail" role="region" aria-labelledby={`${serviceId}-trigger`} aria-hidden={!isActive}><span>{service.detail}</span></div>
                      </div>
                    )
                  })}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="journey-section" id="como-comecar" aria-labelledby="journey-title">
          <div className="section-grid journey-inner">
            <div className="journey-heading">
              <p className="section-tag">/ como começar</p>
              <h2 id="journey-title">Seu carro pede cuidado.<br /><em>A Roger resolve.</em></h2>
              <a className="button button-light" href={WHATSAPP_URL} target="_blank" rel="noreferrer">Falar com a Roger <ArrowIcon /></a>
            </div>
            <div className="journey-steps">
              {journeySteps.map((step) => (
                <article className="journey-step" key={step.number}>
                  <span className="journey-number">{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="visit-section section-grid" id="visite" aria-labelledby="visit-title">
          <div className="visit-card">
            <div className="visit-card-top"><span className="section-tag">/ visite a gente</span><span className="visit-pin"><PinIcon /></span></div>
            <h2 id="visit-title">Seu carro sabe<br /><em>o caminho.</em></h2>
            <p>{ADDRESS.street}<br />{ADDRESS.neighborhood} · {ADDRESS.city}</p>
            <a className="button button-light" href={MAPS_URL} target="_blank" rel="noreferrer">Abrir no Google Maps <ArrowIcon /></a>
          </div>
          <div className="contact-card">
            <p className="eyebrow">Fale direto com a Roger</p>
            <a className="phone-number" href={`tel:+${PHONE}`}> (66) 99612-6664</a>
            <p>Agende seu horário ou tire suas dúvidas pelo WhatsApp.</p>
            <a className="contact-link" href={WHATSAPP_URL} target="_blank" rel="noreferrer"><PhoneIcon /> WhatsApp <ArrowIcon /></a>
            <div className="contact-card-mark" aria-hidden="true">R<span>EA</span></div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <a className="floating-cta" href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="Falar com a Roger pelo WhatsApp"><span>WhatsApp</span><ArrowIcon /></a>
    </div>
  )
}

const developers = [
  {
    initials: 'EG',
    avatar: 'https://avatars.githubusercontent.com/Edu4rdo-Gobatto?s=256',
    name: 'Eduardo Gobatto',
    role: 'Front-end e back-end',
    instagram: 'https://instagram.com/e.gobatto/',
    instagramLabel: '@e.gobatto',
    github: 'https://github.com/Edu4rdo-Gobatto',
    accent: 'developer-avatar-red',
  },
  {
    initials: 'FR',
    avatar: 'https://avatars.githubusercontent.com/SHURIKA6?s=256',
    name: 'Fernando Riad',
    role: 'Front-end e back-end',
    instagram: 'https://instagram.com/_riad777/',
    instagramLabel: '@_riad777',
    github: 'https://github.com/SHURIKA6',
    accent: 'developer-avatar-gold',
  },
]

function DeveloperCard({ developer }) {
  return (
    <article className="developer-card">
      <div className={`developer-avatar ${developer.accent}`} aria-hidden="true">
        <span>{developer.initials}</span>
        <img className="developer-avatar-photo" src={developer.avatar} alt="" />
        <i />
      </div>
      <h2>{developer.name}</h2>
      <p>{developer.role}</p>
      <div className="developer-links">
        <a href={developer.instagram} target="_blank" rel="noreferrer" aria-label={`Instagram de ${developer.name}`}><InstagramIcon /><span>{developer.instagramLabel}</span></a>
        <a href={developer.github} target="_blank" rel="noreferrer" aria-label={`GitHub de ${developer.name}`}><GithubIcon /><span>GitHub</span></a>
      </div>
    </article>
  )
}

function DevelopersPage() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Desenvolvedores | Roger Estética Automotiva'
    return () => { document.title = previousTitle }
  }, [])

  return (
    <div className="site-shell developers-page">
      <a className="skip-link" href="#main">Pular para o conteúdo</a>
      <SiteHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} developersActive />

      <main id="main" className="developers-main">
        <section className="developers-hero section-grid">
          <a className="developers-back" href="/">← Voltar ao site</a>
          <div className="developers-heading-grid">
            <div className="section-tag">/ quem fez</div>
            <div>
              <h1>Desenvolvedores</h1>
              <p>Quem transforma ideia, detalhe e código em uma experiência que representa a Roger.</p>
            </div>
          </div>

          <div className="developers-rule"><span>Roger Estética Automotiva</span><i /></div>

          <div className="developers-grid">
            {developers.map((developer) => <DeveloperCard developer={developer} key={developer.name} />)}
          </div>

          <div className="developers-signature"><span className="signature-mark">R</span><p>Presença digital<br /><em>com acabamento.</em></p><span className="signature-line" /></div>
        </section>
      </main>

      <footer className="dev-footer section-grid">
        <div className="dev-footer-brand">
          <Brand />
          <p>Seu carro. Seu estilo.<br /><span>Seu melhor detalhe.</span></p>
        </div>
        <div className="dev-footer-links"><a href="/#servicos">Serviços</a><a href="/#visite">Onde estamos</a><a className="is-current" href="/desenvolvedores">Desenvolvedores</a></div>
        <div className="dev-footer-contact"><a href={`tel:+${PHONE}`}>WhatsApp: (66) 99612-6664</a><a href={MAPS_URL} target="_blank" rel="noreferrer">{ADDRESS.city}</a><small>© 2026 Roger Estética Automotiva</small></div>
      </footer>
    </div>
  )
}

export default function App({ pathname = '/' }) {
  return resolvePage(pathname) === 'developers' ? <DevelopersPage /> : <LandingPage />
}
