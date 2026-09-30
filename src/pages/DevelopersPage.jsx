import { useEffect, useState } from 'react'
import Brand from '../components/Brand.jsx'
import SiteHeader from '../components/SiteHeader.jsx'
import SkipLink from '../components/SkipLink.jsx'
import { ADDRESS, developers, MAPS_URL, PHONE_DISPLAY, TEL_URL } from '../content.js'
import { GithubIcon, InstagramIcon } from '../icons.jsx'

const GRID = 'mx-auto w-[calc(100%_-_40px)] sm:w-[min(100%_-_52px,760px)] xl:w-[min(1240px,calc(100%_-_64px))]'
const FOOTER_LINK = 'inline-flex min-h-10 w-max items-center text-[10px] font-extrabold tracking-[.09em] uppercase transition-colors hover:text-paper'

export default function DevelopersPage() {
  const [EasterEgg, setEasterEgg] = useState(null)
  useEffect(() => {
    let active = true
    import('../components/DetailingEasterEgg.jsx').then(module => {
      if (active) setEasterEgg(() => module.default)
    }).catch(error => console.error('Falha ao carregar o efeito dos créditos:', error))
    return () => { active = false }
  }, [])
  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Desenvolvedores | Roger Estética Automotiva'
    return () => {
      document.title = previousTitle
    }
  }, [])

  return (
    <div className="site-page min-h-screen overflow-clip">
      <SkipLink />
      {EasterEgg && <EasterEgg />}
      <SiteHeader developersActive />

      <main id="main" tabIndex={-1} className="pt-[var(--header-height)]">
        <section className={`${GRID} pb-16 pt-6 sm:pb-20 sm:pt-8 xl:pb-24`}>
          <a className="inline-flex min-h-11 items-center text-xs font-semibold text-paper-soft transition-colors hover:text-paper" href="/">← Voltar ao site</a>

          <h1 className="mb-0 mt-8 font-display text-[clamp(38px,8vw,64px)] leading-[.95] font-bold tracking-[-.04em] uppercase">Desenvolvedores</h1>

          <div className="mt-8 border-t border-line pt-5 sm:mt-10">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
              {developers.map((developer) => (
                <article className="glass-surface flex min-h-[190px] items-center gap-5 p-5 sm:min-h-[220px] sm:gap-6 sm:p-7" key={developer.name}>
                  <div className={`relative grid size-[84px] shrink-0 place-items-center overflow-hidden rounded-full border bg-ink font-display text-3xl font-bold text-paper sm:size-[104px] sm:text-4xl ${developer.accent === 'gold' ? 'border-gold' : 'border-red'}`} aria-hidden="true">
                    <span>{developer.initials}</span>
                    <img className="absolute inset-1 size-[calc(100%_-_8px)] rounded-full object-cover" src={developer.avatar} alt="" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="m-0 font-display text-xl leading-tight font-semibold uppercase sm:text-2xl">{developer.name}</h2>
                    <p className="mb-4 mt-2 text-xs leading-5 text-paper-soft">{developer.role}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      <a className="inline-flex min-h-10 items-center gap-2 text-xs font-semibold text-paper-soft transition-colors hover:text-paper" href={developer.instagram} target="_blank" rel="noreferrer" aria-label={`Instagram de ${developer.name}`}><InstagramIcon className="size-4" /><span>{developer.instagramLabel}</span></a>
                      <a className="inline-flex min-h-10 items-center gap-2 text-xs font-semibold text-paper-soft transition-colors hover:text-paper" href={developer.github} target="_blank" rel="noreferrer" aria-label={`GitHub de ${developer.name}`}><GithubIcon className="size-4" /><span>GitHub</span></a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

        </section>
      </main>

      <footer className={`${GRID} grid gap-8 border-t border-line py-8 sm:grid-cols-[1fr_1fr] sm:items-end xl:grid-cols-[1.1fr_.8fr_1fr]`}>
        <div>
          <Brand />
          <p className="mb-0 mt-5 font-display text-base leading-tight tracking-[.03em] text-paper uppercase">Seu carro. Seu estilo.<br /><span className="text-gold">Seu melhor detalhe.</span></p>
        </div>
        <div className="grid gap-1 self-end sm:justify-items-center">
          <a className={`${FOOTER_LINK} text-paper-soft`} href="/#servicos">Serviços</a>
          <a className={`${FOOTER_LINK} text-paper-soft`} href="/#visite">Onde estamos</a>
          <a className={FOOTER_LINK} href="/devs">Desenvolvedores</a>
        </div>
        <div className="grid gap-1 sm:justify-items-end">
          <a className={`${FOOTER_LINK} text-paper-soft`} href={TEL_URL}>WhatsApp: {PHONE_DISPLAY}</a>
          <a className={`${FOOTER_LINK} text-paper-soft`} href={MAPS_URL} target="_blank" rel="noreferrer">{ADDRESS.city}</a>
          <small className="mt-2 text-[9px] tracking-[.08em] text-paper-soft uppercase sm:text-right">© {new Date().getFullYear()} Roger Estética Automotiva</small>
        </div>
      </footer>
    </div>
  )
}
