import { useEffect } from 'react'
import Brand from '../components/Brand.jsx'
import DetailingEasterEgg from '../components/DetailingEasterEgg.jsx'
import SiteHeader from '../components/SiteHeader.jsx'
import SkipLink from '../components/SkipLink.jsx'
import { ADDRESS, developers, MAPS_URL, PHONE_DISPLAY, TEL_URL } from '../content.js'
import { GithubIcon, InstagramIcon } from '../icons.jsx'

const GRID = 'mx-auto w-[calc(100%_-_40px)] sm:w-[min(100%_-_52px,760px)] xl:w-[min(1240px,calc(100%_-_64px))]'
const FOOTER_LINK = 'inline-flex min-h-10 w-max items-center text-[10px] font-extrabold tracking-[.09em] uppercase transition-colors hover:text-red'

export default function DevelopersPage() {
  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Desenvolvedores | Roger Estética Automotiva'
    return () => {
      document.title = previousTitle
    }
  }, [])

  return (
    <div className="min-h-screen overflow-clip bg-ink">
      <SkipLink />
      <DetailingEasterEgg />
      <SiteHeader developersActive />

      <main id="main" className="pt-[var(--header-height)]">
        <section className={`${GRID} pb-16 pt-6 sm:pb-20 sm:pt-8 xl:pb-24`}>
          <a className="inline-flex min-h-11 items-center text-xs font-semibold text-paper-soft transition-colors hover:text-red" href="/">← Voltar ao site</a>

          <div className="mt-10 grid gap-5 sm:mt-14 sm:grid-cols-[.8fr_2fr] sm:items-end sm:gap-10 xl:mt-16">
            <p className="m-0 text-xs font-bold tracking-[.12em] text-red uppercase">Quem fez</p>
            <div>
              <h1 className="m-0 font-display text-[clamp(38px,8vw,64px)] leading-[.95] font-bold tracking-[-.04em] uppercase">Desenvolvedores</h1>
              <p className="mb-0 mt-4 max-w-[520px] text-sm leading-7 text-paper-soft">Quem transforma ideia, detalhe e código em uma experiência que representa a Roger.</p>
            </div>
          </div>

          <div className="mt-12 border-t border-line pt-5 sm:mt-16 xl:mt-20">
            <p className="m-0 text-xs font-semibold tracking-[.08em] text-muted uppercase">Roger Estética Automotiva</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 sm:gap-5">
              {developers.map((developer) => (
                <article className="flex min-h-[190px] items-center gap-5 border border-line bg-ink-soft-92 p-5 sm:min-h-[220px] sm:gap-6 sm:p-7" key={developer.name}>
                  <div className={`relative grid size-[84px] shrink-0 place-items-center overflow-hidden rounded-full border bg-ink font-display text-3xl font-bold text-paper sm:size-[104px] sm:text-4xl ${developer.accent === 'gold' ? 'border-gold' : 'border-red'}`} aria-hidden="true">
                    <span>{developer.initials}</span>
                    <img className="absolute inset-1 size-[calc(100%_-_8px)] rounded-full object-cover" src={developer.avatar} alt="" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="m-0 font-display text-xl leading-tight font-semibold uppercase sm:text-2xl">{developer.name}</h2>
                    <p className="mb-4 mt-2 text-xs leading-5 text-muted">{developer.role}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      <a className="inline-flex min-h-10 items-center gap-2 text-xs font-semibold text-paper-soft transition-colors hover:text-red" href={developer.instagram} target="_blank" rel="noreferrer" aria-label={`Instagram de ${developer.name}`}><InstagramIcon className="size-4" /><span>{developer.instagramLabel}</span></a>
                      <a className="inline-flex min-h-10 items-center gap-2 text-xs font-semibold text-paper-soft transition-colors hover:text-red" href={developer.github} target="_blank" rel="noreferrer" aria-label={`GitHub de ${developer.name}`}><GithubIcon className="size-4" /><span>GitHub</span></a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-12 flex items-center gap-4 border-t border-line pt-6 sm:mt-16">
            <img className="size-9 object-contain" src="/assets/roger-logo.jpg" alt="Logo Roger" width="36" height="36" />
            <p className="m-0 font-display text-sm font-semibold tracking-[.04em] text-paper-soft uppercase sm:text-base">Presença digital <span className="text-red">com acabamento.</span></p>
          </div>
        </section>
      </main>

      <footer className={`${GRID} grid gap-8 border-t border-line py-8 sm:grid-cols-[1fr_1fr] sm:items-end xl:grid-cols-[1.1fr_.8fr_1fr]`}>
        <div>
          <Brand />
          <p className="mb-0 mt-5 font-display text-base leading-tight tracking-[.03em] text-paper uppercase">Seu carro. Seu estilo.<br /><span className="text-red">Seu melhor detalhe.</span></p>
        </div>
        <div className="grid gap-1 self-end sm:justify-items-center">
          <a className={`${FOOTER_LINK} text-paper-soft`} href="/#servicos">Serviços</a>
          <a className={`${FOOTER_LINK} text-paper-soft`} href="/#visite">Onde estamos</a>
          <a className={`${FOOTER_LINK} text-red`} href="/desenvolvedores">Desenvolvedores</a>
        </div>
        <div className="grid gap-1 sm:justify-items-end">
          <a className={`${FOOTER_LINK} text-paper-soft`} href={TEL_URL}>WhatsApp: {PHONE_DISPLAY}</a>
          <a className={`${FOOTER_LINK} text-paper-soft`} href={MAPS_URL} target="_blank" rel="noreferrer">{ADDRESS.city}</a>
          <small className="mt-2 text-[9px] tracking-[.08em] text-muted uppercase sm:text-right">© 2026 Roger Estética Automotiva</small>
        </div>
      </footer>
    </div>
  )
}
