import { useEffect } from 'react'
import Brand from '../components/Brand.jsx'
import SiteHeader from '../components/SiteHeader.jsx'
import SkipLink from '../components/SkipLink.jsx'
import { ADDRESS, developers, MAPS_URL, PHONE_DISPLAY, TEL_URL } from '../content.js'
import { GithubIcon, InstagramIcon } from '../icons.jsx'

const GRID = 'mx-auto w-[calc(100%_-_40px)] sm:w-[min(100%_-_52px,760px)] lg:w-[min(1240px,calc(100%_-_64px))]'
const FOOTER_LINK = 'inline-flex min-h-10 w-max items-center text-[10px] font-extrabold tracking-[.09em] uppercase transition-colors hover:text-red'

export default function DevelopersPage() {
  // Troca o título enquanto a página está montada e restaura o anterior ao sair.
  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Desenvolvedores | Roger Estética Automotiva'
    return () => { document.title = previousTitle }
  }, [])

  return (
    <div className="min-h-screen overflow-clip bg-ink">
      <SkipLink />
      <SiteHeader developersActive />

      <main id="main" className="pt-[var(--header-height)]">
        <section className={`${GRID} relative min-h-[auto] pt-[18px] pb-[79px] before:absolute before:z-0 before:top-[27%] before:right-[-12vw] before:h-px before:w-[62vw] before:bg-red-45 before:content-[''] before:[transform:rotate(-11deg)] sm:min-h-[calc(100vh_-_var(--header-height))] sm:pt-[21px] sm:pb-[102px]`}>
          <a className="relative z-[1] inline-flex min-h-11 items-center text-[11px] font-extrabold tracking-[.1em] text-paper-soft uppercase transition-colors hover:text-red" href="/">← Voltar ao site</a>

          <div className="relative z-[1] mt-[43px] block sm:mt-12 sm:grid sm:grid-cols-[1fr_2.2fr] sm:items-start sm:gap-10">
            <div className="mb-10 font-display text-[12px] font-semibold tracking-[.15em] text-red uppercase sm:mb-0">/ quem fez</div>
            <div>
              {/* Fonte do h1 reduzida: era clamp(78px,10vw,150px) */}
              <h1 className="mb-[25px] max-w-none font-display text-[clamp(48px,14vw,72px)] leading-[.8] font-bold tracking-[-.035em] uppercase sm:text-[clamp(56px,7vw,96px)] sm:tracking-[-.04em]">Desenvolvedores</h1>
              <p className="m-0 mt-[27px] max-w-[480px] text-[13px] leading-[1.8] text-paper-soft sm:mt-0 sm:text-[14px]">Quem transforma ideia, detalhe e código em uma experiência que representa a Roger.</p>
            </div>
          </div>

          <div className="relative z-[1] mt-[59px] mb-[25px] flex items-center gap-[17px] text-[10px] font-extrabold tracking-[.14em] text-muted uppercase sm:mt-[68px] sm:ml-[25%] lg:mt-[79px]">
            <span className="max-w-[160px] leading-[1.35] sm:max-w-none">Roger Estética Automotiva</span><i className="h-px w-[min(200px,23vw)] bg-line" />
          </div>

          <div className="relative z-[1] mt-5 block sm:ml-[25%] sm:mt-0 sm:grid sm:grid-cols-[repeat(2,minmax(0,1fr))] sm:gap-6">
            {developers.map((developer) => (
              /* Removido hover translateY(-5px) e bg-ink-hover — era excessivo/IA. Mantido hover de borda. */
              <article className="relative mb-[17px] flex min-h-[310px] flex-col items-center justify-center overflow-hidden border border-line border-t-[3px] border-t-red bg-ink-soft-92 px-[30px] pt-[38px] pb-[30px] text-center transition-colors hover:border-red-70 after:absolute after:right-[-45px] after:bottom-[-105px] after:size-[240px] after:rounded-full after:border after:border-red-17 after:content-[''] sm:mb-0 sm:min-h-[335px]" key={developer.name}>
                <div className={`relative z-[1] mb-6 grid size-[110px] place-items-center rounded-full border bg-ink font-display text-[40px] leading-none font-bold tracking-[.05em] text-paper before:absolute before:z-[2] before:inset-[7px] before:rounded-full before:border before:border-paper-24 before:content-[''] before:pointer-events-none sm:size-[126px] sm:text-[47px] ${developer.accent === 'gold' ? 'border-gold' : 'border-red'}`} aria-hidden="true">
                  <span className="relative z-0">{developer.initials}</span>
                  <img className="absolute z-[1] inset-[8px] h-[calc(100%_-_16px)] w-[calc(100%_-_16px)] rounded-full object-cover" src={developer.avatar} alt="" />
                  <i className={`absolute right-[-14px] bottom-[19px] h-[7px] w-[31px] [transform:rotate(-42deg)] ${developer.accent === 'gold' ? 'bg-gold' : 'bg-red'}`} />
                </div>
                <h2 className="relative z-[1] mb-2 font-display text-[26px] leading-none font-medium tracking-[.01em] uppercase sm:text-[28px]">{developer.name}</h2>
                <p className="relative z-[1] mb-[23px] text-[11px] text-muted">{developer.role}</p>
                <div className="relative z-[1] flex items-center gap-[21px]">
                  <a className="inline-flex min-h-11 items-center gap-[7px] border-b border-b-paper-22 pb-[7px] text-[10px] font-extrabold tracking-[.04em] text-paper-soft transition-colors hover:border-red hover:text-paper" href={developer.instagram} target="_blank" rel="noreferrer" aria-label={`Instagram de ${developer.name}`}><InstagramIcon className="size-[15px]" /><span>{developer.instagramLabel}</span></a>
                  <a className="inline-flex min-h-11 items-center gap-[7px] border-b border-b-paper-22 pb-[7px] text-[10px] font-extrabold tracking-[.04em] text-paper-soft transition-colors hover:border-red hover:text-paper" href={developer.github} target="_blank" rel="noreferrer" aria-label={`GitHub de ${developer.name}`}><GithubIcon className="size-[15px]" /><span>GitHub</span></a>
                </div>
              </article>
            ))}
          </div>

          <div className="relative z-[1] mt-[56px] flex items-center gap-4 sm:mt-[81px] sm:ml-[25%]">
            <img className="size-[33px] object-contain" src="/assets/roger-logo.jpg" alt="Logo Roger" width="33" height="33" />
            <p className="m-0 font-display text-[16px] leading-[.9] tracking-[.04em] text-paper-soft uppercase sm:text-[18px]">Presença digital<br /><em className="text-red not-italic">com acabamento.</em></p>
            <span className="ml-auto h-px w-[74px] bg-line" />
          </div>
        </section>
      </main>

      <footer className={`${GRID} block pb-[91px] border-t border-t-line pt-9 sm:grid sm:grid-cols-[1fr_1fr] sm:items-end sm:gap-[45px] sm:pb-10 lg:grid-cols-[1.1fr_.8fr_1fr]`}>
        <div>
          <Brand />
          <p className="my-[38px] font-display text-[16px] leading-[.95] tracking-[.03em] text-paper uppercase sm:mt-[30px] sm:mb-0 sm:text-[18px]">Seu carro. Seu estilo.<br /><span className="text-red">Seu melhor detalhe.</span></p>
        </div>
        <div className="mb-[33px] grid gap-[14px] self-end sm:mb-0">
          <a className={`${FOOTER_LINK} text-paper-soft`} href="/#servicos">Serviços</a>
          <a className={`${FOOTER_LINK} text-paper-soft`} href="/#visite">Onde estamos</a>
          <a className={`${FOOTER_LINK} text-red`} href="/desenvolvedores">Desenvolvedores</a>
        </div>
        <div className="grid gap-3 sm:justify-items-end lg:gap-[13px]">
          <a className={`${FOOTER_LINK} text-paper-soft`} href={TEL_URL}>WhatsApp: {PHONE_DISPLAY}</a>
          <a className={`${FOOTER_LINK} text-paper-soft`} href={MAPS_URL} target="_blank" rel="noreferrer">{ADDRESS.city}</a>
          <small className="mt-[18px] text-left text-[9px] tracking-[.08em] text-muted uppercase lg:text-right">© 2026 Roger Estética Automotiva</small>
        </div>
      </footer>
    </div>
  )
}
