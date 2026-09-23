import { useEffect, useRef, useState } from 'react'
import { WHATSAPP_URL } from '../content.js'
import { ArrowIcon } from '../icons.jsx'
import Brand from './Brand.jsx'

const NAV_LINK = 'transition-colors hover:text-paper'
// `transition` seco em vez de uma lista arbitrária: na v4 o translate é uma
// propriedade própria, e `transition-[...,transform]` não animaria o hover.
const NAV_CTA = 'inline-flex min-h-12 items-center gap-[11px] border border-line px-[17px] text-paper transition-colors hover:border-red hover:bg-red mt-4 font-sans text-[13px] font-bold tracking-[.08em] lg:mt-0 lg:min-h-11 lg:text-[12px]'

// O overlay original encadeia `visibility 0s linear .25s` com opacity/transform.
// São duas strings completas, uma por estado, para nunca depender da ordem entre
// uma shorthand e sua longhand.
// Mobile-first: base = overlay de tela cheia; lg = nav inline.
const NAV_BASE = 'fixed inset-0 z-[21] h-screen min-h-[100dvh] flex flex-col items-start justify-center bg-ink font-display leading-[.85] tracking-[.03em] font-extrabold text-paper-soft uppercase lg:relative lg:inset-auto lg:z-auto lg:h-auto lg:min-h-0 lg:flex-row lg:items-center lg:bg-transparent lg:font-sans lg:leading-normal lg:font-semibold lg:tracking-[.08em]'
const NAV_SIZING = 'gap-[22px] px-5 pt-24 pb-10 text-[clamp(30px,9vw,40px)] sm:gap-[23px] sm:px-[26px] sm:pt-[110px] sm:pb-[50px] sm:text-[42px] lg:gap-[clamp(20px,2.4vw,40px)] lg:px-0 lg:pt-0 lg:pb-0 lg:text-[13px]'
const NAV_OPEN = 'visible opacity-100 [transform:translateY(0)] [transition:visibility_0s_linear_0s,opacity_.25s_ease,transform_.25s_ease] lg:visible lg:opacity-100 lg:[transform:none]'
const NAV_CLOSED = 'invisible pointer-events-none opacity-0 [transform:translateY(-12px)] [transition:visibility_0s_linear_.25s,opacity_.25s_ease,transform_.25s_ease] lg:visible lg:pointer-events-auto lg:opacity-100 lg:[transform:none]'

// Header fixo. Abaixo de 1081px a navegação vira um overlay de tela cheia
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
    <header className={`fixed top-0 left-0 z-20 flex h-[var(--header-height)] w-full items-center justify-between border-b bg-ink-82 px-5 py-[14px] backdrop-blur-[18px] sm:px-[26px] sm:py-[18px] lg:px-8 ${developersActive ? 'border-b-red-38' : 'border-b-paper-13'}`}>
      <Brand onClick={closeMenu} />

      <button
        ref={menuButtonRef}
        className="relative z-[22] block size-12 bg-transparent p-2 lg:hidden"
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
            Falar pelo WhatsApp <ArrowIcon className="size-[15px]" />
          </a>
        )}
      </nav>
    </header>
  )
}
