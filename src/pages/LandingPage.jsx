import Brand from '../components/Brand.jsx'
import SiteHeader from '../components/SiteHeader.jsx'
import SkipLink from '../components/SkipLink.jsx'
import {
  ADDRESS,
  journeySteps,
  MAPS_URL,
  PHONE_DISPLAY,
  proofPoints,
  serviceGroups,
  TEL_URL,
  WHATSAPP_URL,
} from '../content.js'
import { ArrowIcon, PhoneIcon, PinIcon } from '../icons.jsx'

const GRID = 'mx-auto w-[calc(100%_-_40px)] sm:w-[min(100%_-_52px,760px)] xl:w-[min(1240px,calc(100%_-_64px))]'
const EYEBROW = 'mb-4 text-[10px] leading-[1.4] font-extrabold tracking-[.14em] uppercase'
const SECTION_TAG = 'text-[10px] font-extrabold tracking-[.14em] uppercase'
const BUTTON = 'inline-flex min-h-12 items-center justify-center gap-3 px-5 text-[10px] font-extrabold tracking-[.1em] uppercase transition-colors'
const BUTTON_LIGHT = `${BUTTON} bg-paper text-ink hover:bg-red hover:text-ink`
const BUTTON_DARK = `${BUTTON} bg-ink text-paper hover:bg-red hover:text-ink`
const H2 = 'font-display text-[clamp(36px,9vw,44px)] leading-[.96] font-semibold tracking-[-.025em] uppercase sm:text-[clamp(42px,5vw,48px)]'

const galleryPhotos = [
  {
    src: '/assets/galeria-detalhamento.webp',
    alt: 'Profissional cuidando da pintura de um carro esportivo em uma oficina.',
  },
  {
    src: '/assets/galeria-brilho.webp',
    alt: 'Carro preto polido com reflexos de luz em uma garagem coberta.',
  },
  {
    src: '/assets/galeria-reflexo.webp',
    alt: 'Detalhe de um carro preto brilhante com reflexos na lataria.',
  },
]

export default function LandingPage() {
  return (
    <div className="overflow-clip">
      <SkipLink />
      <SiteHeader />

      <main id="main">
        {/* Apresentação ----------------------------------------------------- */}
        <section
          id="inicio"
          aria-labelledby="hero-title"
          className={`${GRID} pt-[calc(var(--header-height)_+_48px)] pb-10 sm:pt-[calc(var(--header-height)_+_56px)] sm:pb-12 xl:pt-[calc(var(--header-height)_+_48px)] xl:pb-14`}
        >
          <div className="max-w-[790px]">
            <p className={`${EYEBROW} text-paper-soft`}>Estética automotiva em Sinop/MT</p>
            <h1 id="hero-title" className="mb-5 max-w-[980px] font-display text-[clamp(38px,8vw,52px)] leading-[.96] font-semibold tracking-[-.025em] uppercase sm:text-[clamp(46px,6vw,56px)] xl:text-[56px]">
              Seu carro pronto para aparecer.
            </h1>
            <p className="mb-7 max-w-[620px] text-[14px] leading-[1.75] text-paper-soft sm:text-[15px]">
              Estética automotiva em Sinop: polimento, vitrificação, restauração de farol e cuidado com os detalhes do seu carro. Conheça os serviços e agende direto com a Roger.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a className={`${BUTTON} bg-red text-ink hover:bg-paper`} href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                Agendar pelo WhatsApp <ArrowIcon className="size-4" />
              </a>
              <a className="inline-flex min-h-12 items-center gap-2 text-[10px] font-extrabold tracking-[.1em] text-paper-soft uppercase transition-colors hover:text-paper" href="#servicos">
                Ver serviços <ArrowIcon className="size-4" direction="down" />
              </a>
            </div>
          </div>
        </section>

        {/* Galeria ilustrativa --------------------------------------------- */}
        <section aria-label="Fotos ilustrativas de estética automotiva" className={`${GRID} pb-12 sm:pb-14`}>
          <div className="mb-4 flex items-baseline justify-between gap-4">
            <h2 className="font-display text-[18px] font-semibold tracking-[.02em] text-paper uppercase sm:text-[20px]">Cuidado automotivo</h2>
            <p className="m-0 text-right text-[10px] text-muted">Fotos ilustrativas</p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            {galleryPhotos.map((photo) => (
              <figure className="m-0 overflow-hidden bg-ink-light" key={photo.src}>
                <img
                  className="block aspect-[5/3] w-full object-cover sm:aspect-[4/3]"
                  src={photo.src}
                  alt={photo.alt}
                  width="500"
                  height="750"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            ))}
          </div>
        </section>

        {/* Informações rápidas --------------------------------------------- */}
        <section className="border-y border-y-ink-16 bg-paper text-ink" aria-label="Sobre o atendimento">
          <div className={`${GRID} grid grid-cols-1 sm:grid-cols-3`}>
            {proofPoints.map((point, index) => (
              <div
                className={`flex items-baseline gap-3 border-b border-b-ink-16 py-4 last:border-b-0 sm:grid sm:content-center sm:gap-1 sm:py-5 sm:pl-6 sm:first:pl-0 sm:border-b-0 ${index > 0 ? 'sm:border-l sm:border-l-ink-16' : ''}`}
                key={point.value}
              >
                <strong className="min-w-[72px] font-display text-[24px] leading-none font-semibold tracking-[.01em] uppercase sm:text-[26px]">{point.value}</strong>
                <span className="max-w-[220px] text-[12px] leading-[1.5] text-muted-paper">{point.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* A experiência ---------------------------------------------------- */}
        <section id="essencia" aria-labelledby="essence-title" className={`${GRID} grid gap-5 py-14 sm:grid-cols-[.8fr_2.2fr] sm:gap-8 sm:py-20`}>
          <p className={`${SECTION_TAG} m-0 text-red`}>A experiência</p>
          <div>
            <h2 id="essence-title" className={`mb-5 ${H2}`}>
              Mais que limpeza. <span className="text-paper-soft">É cuidado que aparece.</span>
            </h2>
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
              <p className="m-0 max-w-[540px] text-[14px] leading-[1.75] text-muted">
                Seu carro tem linhas, textura e personalidade. O trabalho da Roger é revelar tudo isso com técnica, paciência e olho para o detalhe.
              </p>
              <a className={`${BUTTON} bg-red text-ink hover:bg-paper`} href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="Conversar com a Roger pelo WhatsApp">
                Quero cuidar <ArrowIcon className="size-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Serviços --------------------------------------------------------- */}
        <section id="servicos" aria-labelledby="services-title" className="bg-paper py-14 text-ink sm:py-20">
          <div className={`${GRID} mb-8 grid gap-4 sm:mb-10 sm:grid-cols-[.8fr_2.2fr] sm:gap-8`}>
            <p className={`${SECTION_TAG} m-0 text-red-deep`}>Serviços</p>
            <div>
              <p className={`${EYEBROW} text-muted-paper`}>Sete formas de cuidar melhor</p>
              <h2 id="services-title" className={`m-0 max-w-[650px] text-ink ${H2}`}>
                Escolha o próximo <span className="text-red-deep">nível de cuidado.</span>
              </h2>
            </div>
          </div>

          <div className={`${GRID} grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-9 xl:grid-cols-3`}>
            {serviceGroups.map((group) => (
              <article className="border-t border-t-ink-16 pt-4" key={group.label}>
                <p className="m-0 text-[10px] font-extrabold tracking-[.12em] text-red-deep uppercase">{group.label}</p>
                <h3 className="mt-3 mb-2 font-display text-[24px] leading-[1] font-semibold uppercase">{group.title}</h3>
                <p className="mb-5 max-w-[360px] text-[13px] leading-[1.65] text-muted-paper">{group.copy}</p>
                <ul className="m-0 list-none border-y border-y-ink-16 p-0">
                  {group.services.map((service) => (
                    <li className="border-b border-b-ink-16 py-4 last:border-b-0" key={service.name}>
                      <h4 className="mb-1 text-[14px] leading-[1.4] font-bold">{service.name}</h4>
                      <p className="m-0 text-[13px] leading-[1.6] text-muted-paper">{service.detail}</p>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* Como começar ----------------------------------------------------- */}
        <section id="como-comecar" aria-labelledby="journey-title" className="bg-ink-soft py-14 sm:py-20">
          <div className={`${GRID} grid gap-8 sm:grid-cols-[.9fr_1.1fr] sm:gap-10`}>
            <div>
              <p className={`${SECTION_TAG} mb-4 text-red`}>Como começar</p>
              <h2 id="journey-title" className={`mb-6 max-w-[470px] ${H2}`}>
                Seu carro pede cuidado. <span className="text-paper">A Roger resolve.</span>
              </h2>
              <a className={BUTTON_LIGHT} href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                Falar com a Roger <ArrowIcon className="size-4" />
              </a>
            </div>
            <ol className="m-0 list-none p-0">
              {journeySteps.map((step) => (
                <li className="grid grid-cols-[44px_minmax(0,1fr)] gap-x-3 border-t border-t-paper-24 py-5 last:border-b last:border-b-paper-24 sm:grid-cols-[52px_minmax(0,1fr)] sm:gap-x-4" key={step.number}>
                  <span className="font-display text-[20px] leading-none text-gold">{step.number}</span>
                  <div>
                    <h3 className="mb-2 font-display text-[21px] leading-[1.1] font-medium uppercase">{step.title}</h3>
                    <p className="m-0 max-w-[390px] text-[13px] leading-[1.65] text-paper-soft">{step.copy}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Endereço e contato ----------------------------------------------- */}
        <section id="visite" aria-label="Endereço e contato" className={`${GRID} grid grid-cols-1 gap-4 py-12 sm:grid-cols-2 sm:gap-5 sm:py-16`}>
          <div className="flex min-h-[330px] flex-col items-start bg-paper p-6 text-ink sm:min-h-[360px] sm:p-8">
            <div className="flex w-full items-center justify-between">
              <p className={`${SECTION_TAG} m-0 text-red-deep`}>Visite a gente</p>
              <PinIcon className="size-6" />
            </div>
            <h2 className={`mt-auto mb-4 ${H2}`}>
              Seu carro sabe <span className="text-red-deep">o caminho.</span>
            </h2>
            <p className="mb-5 text-[13px] leading-[1.7] font-semibold">
              {ADDRESS.street}<br />{ADDRESS.neighborhood} · {ADDRESS.city}
            </p>
            <a className={BUTTON_DARK} href={MAPS_URL} target="_blank" rel="noreferrer">
              Abrir no Google Maps <ArrowIcon className="size-4" />
            </a>
          </div>

          <div className="min-h-[330px] border border-line bg-ink-soft p-6 sm:min-h-[360px] sm:p-8">
            <p className={`${EYEBROW} text-muted`}>Fale direto com a Roger</p>
            <a className="mt-12 block font-display text-[clamp(30px,7vw,42px)] leading-none font-medium tracking-[-.02em] text-paper transition-colors hover:text-red sm:mt-14 sm:text-[42px]" href={TEL_URL}>
              {PHONE_DISPLAY}
            </a>
            <p className="mt-5 mb-6 max-w-[280px] text-[13px] leading-[1.7] text-muted">
              Agende seu horário ou tire suas dúvidas pelo WhatsApp.
            </p>
            <a className="inline-flex min-h-11 items-center gap-2 border-b border-b-red pb-2 text-[10px] font-extrabold tracking-[.1em] text-paper uppercase transition-colors hover:text-red" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              <PhoneIcon className="size-4 text-red" /> WhatsApp <ArrowIcon className="ml-2 size-4" />
            </a>
          </div>
        </section>
      </main>

      {/* Rodapé ------------------------------------------------------------- */}
      <footer className={`${GRID} grid grid-cols-1 gap-6 border-t border-t-line py-7 sm:grid-cols-[1fr_auto] sm:items-end sm:py-8`}>
        <Brand />
        <nav aria-label="Links do rodapé" className="flex flex-wrap gap-x-5 gap-y-3 text-[10px] font-extrabold tracking-[.08em] text-muted uppercase sm:justify-end">
          <a className="transition-colors hover:text-paper" href={WHATSAPP_URL} target="_blank" rel="noreferrer">WhatsApp</a>
          <a className="transition-colors hover:text-paper" href={MAPS_URL} target="_blank" rel="noreferrer">Google Maps</a>
          <a className="transition-colors hover:text-paper" href="/desenvolvedores">Desenvolvedores</a>
          <a className="transition-colors hover:text-paper" href={TEL_URL}>Ligar</a>
        </nav>
        <small className="text-[10px] text-muted sm:col-span-2">© 2026 Roger Estética Automotiva</small>
      </footer>

      {/* Atalho fixo de WhatsApp ------------------------------------------- */}
      <a
        className="fixed right-4 bottom-[calc(16px_+_env(safe-area-inset-bottom))] z-[19] grid size-14 place-items-center rounded-full bg-paper shadow-[0_10px_26px_rgba(0,0,0,.22)] transition-colors hover:bg-red sm:right-6 sm:bottom-[calc(24px_+_env(safe-area-inset-bottom))]"
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar com a Roger pelo WhatsApp"
      >
        <img className="size-8" src="/assets/WhatsApp.svg.webp" alt="" />
      </a>
    </div>
  )
}
