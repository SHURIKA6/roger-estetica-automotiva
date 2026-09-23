import { useEffect, useRef, useState } from 'react'
import { WHATSAPP_URL } from '../content.js'
import { ArrowIcon } from '../icons.jsx'
import Brand from './Brand.jsx'

const NAV_LINK = 'transition-colors hover:text-paper'
// `transition` seco em vez de uma lista arbitrária: na v4 o translate é uma
// propriedade própria, e `transition-[...,transform]` não animaria o hover.
const NAV_CTA = 'inline-flex min-h-12 items-center border border-line px-[18px] text-paper transition hover:border-red hover:bg-red hover:[transform:translateY(-2px)] lg-down:mt-4 lg-down:font-sans lg-down:text-[15px] lg-down:font-bold lg-down:normal-case lg-down:tracking-normal'

// O overlay original encadeia `visibility 0s linear .25s` com opacity/transform.
// São duas strings completas, uma por estado, para nunca depender da ordem entre
// uma shorthand e sua longhand.
const NAV_BASE = 'flex items-center gap-[clamp(18px,2.3vw,36px)] text-[14px] font-semibold text-paper-soft lg-down:fixed lg-down:uppercase lg-down:inset-0 lg-down:z-[21] lg-down:h-screen lg-down:min-h-[100dvh] lg-down:flex-col lg-down:items-start lg-down:justify-center lg-down:bg-ink lg-down:font-display lg-down:leading-[.85] lg-down:tracking-[.03em]'
const NAV_SIZING = 'lg-down:gap-[23px] lg-down:px-[26px] lg-down:pt-[110px] lg-down:pb-[50px] lg-down:text-[40px] sm-down:gap-5 sm-down:px-5 sm-down:pt-24 sm-down:pb-10 sm-down:text-[clamp(26px,10vw,36px)]'
const NAV_OPEN = 'lg-down:visible lg-down:opacity-100 lg-down:[transform:translateY(0)] lg-down:[transition:visibility_0s_linear_0s,opacity_.25s_ease,transform_.25s_ease]'
const NAV_CLOSED = 'lg-down:invisible lg-down:pointer-events-none lg-down:opacity-0 lg-down:[transform:translateY(-12px)] lg-down:[transition:visibility_0s_linear_.25s,opacity_.25s_ease,transform_.25s_ease]'

// Header fixo. Abaixo de 1080px a navegação vira um overlay de tela cheia
// controlado pelo botão sanduíche.
export default function SiteHeader({ developersActive = false }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef(null)
  const navId = developersActive ? 'developers-nav' : 'main-nav'

  // Com o menu aberto: trava o scroll, tira o <main> da árvore de acessibilidade
  // e devolve o foco ao botão quando o usuário aperta Esc.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
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
      document.body.style.overflow = ''
      if (main) {
        main.removeAttribute('inert')
        main.removeAttribute('aria-hidden')
      }
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`fixed top-0 left-0 z-20 flex h-[var(--header-height)] w-full items-center justify-between border-b bg-ink-82 px-8 py-[18px] backdrop-blur-[18px] lg-down:px-[26px] sm-down:px-5 sm-down:py-[14px] ${developersActive ? 'border-b-red-38' : 'border-b-paper-13'}`}>
      <Brand onClick={closeMenu} />

      <button
        ref={menuButtonRef}
        className="hidden size-12 bg-transparent p-2 lg-down:relative lg-down:z-[22] lg-down:block"
        type="button"
        aria-expanded={menuOpen}
        aria-controls={navId}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className="sr-only">{menuOpen ? 'Fechar menu' : 'Abrir menu'}</span>
        <span className="mx-auto my-[6px] block h-px w-[26px] bg-paper transition-transform" />
        <span className="mx-auto my-[6px] block h-px w-[26px] bg-paper transition-transform" />
      </button>

      <nav id={navId} aria-label="Navegação principal" className={`${NAV_BASE} ${NAV_SIZING} ${menuOpen ? NAV_OPEN : NAV_CLOSED}`}>
        <a className={NAV_LINK} href="/#servicos" onClick={closeMenu}>Serviços</a>
        <a className={NAV_LINK} href="/#essencia" onClick={closeMenu}>A experiência</a>
        <a className={NAV_LINK} href="/#visite" onClick={closeMenu}>Onde estamos</a>
        {developersActive ? (
          <a className={`${NAV_CTA} border-red bg-red`} href="/desenvolvedores" aria-current="page" onClick={closeMenu}>
            Desenvolvedores <ArrowIcon className="size-[15px]" />
          </a>
        ) : (
          <a className={NAV_LINK} href="/desenvolvedores" onClick={closeMenu}>Desenvolvedores</a>
        )}
        {!developersActive && (
          <a className={NAV_CTA} href={WHATSAPP_URL} target="_blank" rel="noreferrer" onClick={closeMenu}>
            Falar pelo WhatsApp
          </a>
        )}
      </nav>
    </header>
  )
}
