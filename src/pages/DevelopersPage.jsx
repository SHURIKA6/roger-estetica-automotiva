import { useEffect } from 'react'
import Brand from '../components/Brand.jsx'
import SiteHeader from '../components/SiteHeader.jsx'
import SkipLink from '../components/SkipLink.jsx'
import { ADDRESS, developers, MAPS_URL, PHONE_DISPLAY, TEL_URL } from '../content.js'
import { GithubIcon, InstagramIcon } from '../icons.jsx'

const GRID = 'mx-auto w-[min(1240px,calc(100%_-_64px))] lg-down:w-[min(100%_-_52px,760px)] sm-down:w-[calc(100%_-_40px)]'
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
        <section className={`${GRID} relative min-h-[calc(100vh_-_var(--header-height))] pt-[21px] pb-[102px] before:absolute before:z-0 before:top-[27%] before:right-[-12vw] before:h-px before:w-[62vw] before:bg-red-45 before:content-[''] before:[transform:rotate(-11deg)] sm-down:min-h-[auto] sm-down:pt-[18px] sm-down:pb-[79px]`}>
          <a className="relative z-[1] inline-flex min-h-11 items-center text-[11px] font-extrabold tracking-[.1em] text-paper-soft uppercase transition-colors hover:text-red" href="/">← Voltar ao site</a>

          <div className="relative z-[1] mt-12 grid grid-cols-[1fr_2.2fr] items-start gap-10 sm-down:mt-[43px] sm-down:block">
            <div className="font-display text-[12px] font-semibold tracking-[.15em] text-red uppercase sm-down:mb-10 sm-down:block">/ quem fez</div>
            <div>
              <h1 className="mb-[25px] max-w-none font-display text-[clamp(78px,10vw,150px)] leading-[.8] font-bold tracking-[-.04em] uppercase sm-down:text-[clamp(48px,14vw,72px)] sm-down:tracking-[-.035em]">Desenvolvedores</h1>
              <p className="m-0 max-w-[480px] text-[14px] leading-[1.8] text-paper-soft sm-down:mt-[27px] sm-down:text-[13px]">Quem transforma ideia, detalhe e código em uma experiência que representa a Roger.</p>
            </div>
          </div>

          <div className="relative z-[1] mt-[79px] mb-[25px] ml-[25%] flex items-center gap-[17px] text-[10px] font-extrabold tracking-[.14em] text-muted uppercase lg-down:mt-[68px] lg-down:ml-0 sm-down:mt-[59px]">
            <span className="sm-down:max-w-[160px] sm-down:leading-[1.35]">Roger Estética Automotiva</span><i className="h-px w-[min(200px,23vw)] bg-line" />
          </div>

          <div className="relative z-[1] ml-[25%] grid grid-cols-[repeat(2,minmax(0,1fr))] gap-6 lg-down:ml-0 sm-down:mt-5 sm-down:block">
            {developers.map((developer) => (
              <article className="relative flex min-h-[335px] flex-col items-center justify-center overflow-hidden border border-line border-t-[3px] border-t-red bg-ink-soft-92 px-[30px] pt-[38px] pb-[30px] text-center transition hover:border-red-70 hover:bg-ink-hover hover:[transform:translateY(-5px)] after:absolute after:right-[-45px] after:bottom-[-105px] after:size-[240px] after:rounded-full after:border after:border-red-17 after:content-[''] sm-down:mb-[17px] sm-down:min-h-[310px]" key={developer.name}>
                <div className={`relative z-[1] mb-6 grid size-[126px] place-items-center rounded-full border bg-ink font-display text-[47px] leading-none font-bold tracking-[.05em] text-paper before:absolute before:z-[2] before:inset-[7px] before:rounded-full before:border before:border-paper-24 before:content-[''] before:pointer-events-none ${developer.accent === 'gold' ? 'border-gold' : 'border-red'}`} aria-hidden="true">
                  <span className="relative z-0">{developer.initials}</span>
                  <img className="absolute z-[1] inset-[8px] h-[calc(100%_-_16px)] w-[calc(100%_-_16px)] rounded-full object-cover" src={developer.avatar} alt="" />
                  <i className={`absolute right-[-14px] bottom-[19px] h-[7px] w-[31px] [transform:rotate(-42deg)] ${developer.accent === 'gold' ? 'bg-gold' : 'bg-red'}`} />
                </div>
                <h2 className="relative z-[1] mb-2 font-display text-[31px] leading-none font-medium tracking-[.01em] uppercase">{developer.name}</h2>
                <p className="relative z-[1] mb-[23px] text-[11px] text-muted">{developer.role}</p>
                <div className="relative z-[1] flex items-center gap-[21px]">
                  <a className="inline-flex min-h-11 items-center gap-[7px] border-b border-b-paper-22 pb-[7px] text-[10px] font-extrabold tracking-[.04em] text-paper-soft transition-colors hover:border-red hover:text-paper" href={developer.instagram} target="_blank" rel="noreferrer" aria-label={`Instagram de ${developer.name}`}><InstagramIcon className="size-[15px]" /><span>{developer.instagramLabel}</span></a>
                  <a className="inline-flex min-h-11 items-center gap-[7px] border-b border-b-paper-22 pb-[7px] text-[10px] font-extrabold tracking-[.04em] text-paper-soft transition-colors hover:border-red hover:text-paper" href={developer.github} target="_blank" rel="noreferrer" aria-label={`GitHub de ${developer.name}`}><GithubIcon className="size-[15px]" /><span>GitHub</span></a>
                </div>
              </article>
            ))}
          </div>

          <div className="relative z-[1] mt-[81px] ml-[25%] flex items-center gap-4 lg-down:ml-0 sm-down:mt-[56px]">
            <span className="grid size-[33px] place-items-center bg-red font-display text-[24px] font-extrabold text-paper [transform:skew(-8deg)]">R</span>
            <p className="m-0 font-display text-[18px] leading-[.9] tracking-[.04em] text-paper-soft uppercase">Presença digital<br /><em className="text-red not-italic">com acabamento.</em></p>
            <span className="ml-auto h-px w-[74px] bg-line" />
          </div>
        </section>
      </main>

      <footer className={`${GRID} grid grid-cols-[1.1fr_.8fr_1fr] items-end gap-[45px] border-t border-t-line pt-9 pb-10 lg-down:grid-cols-[1fr_1fr] sm-down:block sm-down:pb-[91px]`}>
        <div>
          <Brand />
          <p className="mt-[30px] font-display text-[19px] leading-[.95] tracking-[.03em] text-paper uppercase sm-down:my-[38px]">Seu carro. Seu estilo.<br /><span className="text-red">Seu melhor detalhe.</span></p>
        </div>
        <div className="grid gap-[14px] self-end sm-down:mb-[33px]">
          <a className={`${FOOTER_LINK} text-paper-soft`} href="/#servicos">Serviços</a>
          <a className={`${FOOTER_LINK} text-paper-soft`} href="/#visite">Onde estamos</a>
          <a className={`${FOOTER_LINK} text-red`} href="/desenvolvedores">Desenvolvedores</a>
        </div>
        <div className="grid justify-items-end gap-[13px] lg-down:justify-items-start sm-down:gap-3">
          <a className={`${FOOTER_LINK} text-paper-soft`} href={TEL_URL}>WhatsApp: {PHONE_DISPLAY}</a>
          <a className={`${FOOTER_LINK} text-paper-soft`} href={MAPS_URL} target="_blank" rel="noreferrer">{ADDRESS.city}</a>
          <small className="mt-[18px] text-right text-[9px] tracking-[.08em] text-muted uppercase lg-down:text-left">© 2026 Roger Estética Automotiva</small>
        </div>
      </footer>
    </div>
  )
}
