import { useState } from 'react'
import Brand from '../components/Brand.jsx'
import SiteHeader from '../components/SiteHeader.jsx'
import SkipLink from '../components/SkipLink.jsx'
import {
  ADDRESS,
  featuredService,
  journeySteps,
  MAPS_URL,
  PHONE_DISPLAY,
  proofPoints,
  serviceGroups,
  TEL_URL,
  WHATSAPP_URL,
} from '../content.js'
import { ArrowIcon, PhoneIcon, PinIcon } from '../icons.jsx'

// Mobile-first: as classes sem prefixo valem para o celular; `md:` (768px) e
// `lg:` (1080px) só acrescentam o que muda em telas maiores.
const GRID = 'mx-auto w-full max-w-[1240px] px-5 md:px-8'

const BUTTON = 'inline-flex min-h-[52px] items-center justify-center px-6 text-[14px] font-bold transition hover:[transform:translateY(-2px)]'
const BUTTON_RED = `${BUTTON} bg-red text-paper hover:bg-red-deep`
const BUTTON_LIGHT = `${BUTTON} bg-paper text-ink hover:bg-paper-soft`

const H2 = 'font-display text-[clamp(30px,9.5vw,40px)] leading-[.95] font-semibold tracking-[-.01em] uppercase md:text-[54px] lg:text-[68px]'
const BODY = 'text-[15px] leading-[1.65] md:text-[16px]'

export default function LandingPage() {
  const [activeService, setActiveService] = useState(featuredService)
  const toggleService = (name) => setActiveService((current) => (current === name ? '' : name))

  return (
    <div className="overflow-clip">
      <SkipLink />
      <SiteHeader />

      <main id="main">
        {/* Hero ------------------------------------------------------------ */}
        <section id="inicio" aria-labelledby="hero-title" className={`${GRID} grid gap-10 pt-[104px] pb-14 md:pt-[132px] md:pb-20 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-14 lg:pt-[150px] lg:pb-24`}>
          <div>
            <p className="mb-4 text-[14px] font-semibold text-paper-soft">Estética automotiva em Sinop/MT</p>
            <h1 id="hero-title" className="mb-5 font-display text-[clamp(34px,11vw,46px)] leading-[.92] font-bold tracking-[-.02em] uppercase md:text-[68px] lg:text-[88px]">
              Seu carro pronto para aparecer.
            </h1>
            <p className={`mb-8 max-w-[460px] text-paper-soft ${BODY}`}>Polimento, vitrificação, restauração de farol e cuidado com os detalhes do seu carro. Veja os serviços e agende direto com a Roger.</p>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
              <a className={BUTTON_RED} href={WHATSAPP_URL} target="_blank" rel="noreferrer">Agendar pelo WhatsApp</a>
              <a className="inline-flex min-h-12 items-center justify-center gap-2 text-[14px] font-semibold text-paper-soft transition-colors hover:text-paper md:justify-start" href="#servicos">Ver serviços <ArrowIcon className="size-4" direction="down" /></a>
            </div>
          </div>

          <figure className="m-0">
            <img className="block aspect-[16/9] w-full rounded-md bg-ink-light object-cover" src="/assets/roger-flyer.png" alt="Flyer da Roger Estética Automotiva com um carro esportivo vermelho" width="1600" height="900" fetchPriority="high" />
          </figure>
        </section>

        {/* Faixa de provas --------------------------------------------------- */}
        <section className="bg-red text-paper" aria-label="Por que falar com a Roger">
          <div className={`${GRID} grid divide-y divide-paper-32 md:grid-cols-3 md:divide-x md:divide-y-0`}>
            {proofPoints.map((point) => (
              <div className="flex items-baseline gap-4 py-5 md:flex-col md:gap-1 md:px-6 md:py-7 md:first:pl-0" key={point.value}>
                <strong className="w-[84px] shrink-0 font-display text-[30px] leading-none font-semibold uppercase md:w-auto md:text-[34px]">{point.value}</strong>
                <span className="text-[15px] leading-snug">{point.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* A experiência ----------------------------------------------------- */}
        <section id="essencia" aria-labelledby="essence-title" className={`${GRID} py-20 md:py-28 lg:grid lg:grid-cols-[1fr_1fr] lg:gap-16 lg:py-32`}>
          <h2 id="essence-title" className={`mb-6 ${H2}`}>Mais que limpeza. Cuidado que aparece.</h2>
          <div className="lg:pt-3">
            <p className={`mb-8 max-w-[520px] text-muted ${BODY}`}>Seu carro tem linhas, textura e personalidade. O trabalho da Roger é revelar tudo isso com técnica, paciência e olho para o detalhe.</p>
            <a className="inline-flex min-h-12 items-center border-b-2 border-red text-[15px] font-bold text-paper transition-colors hover:text-red" href={WHATSAPP_URL} target="_blank" rel="noreferrer">Conversar com a Roger</a>
          </div>
        </section>

        {/* Serviços ---------------------------------------------------------- */}
        <section id="servicos" aria-labelledby="services-title" className="bg-paper py-20 text-ink md:py-28">
          <div className={GRID}>
            <h2 id="services-title" className={`mb-4 ${H2}`}>Serviços</h2>
            <p className={`mb-12 max-w-[520px] text-muted-paper md:mb-16 ${BODY}`}>Sete formas de cuidar do seu carro, da recuperação ao acabamento. Toque em um serviço para ver o que ele faz.</p>

            <div className="grid gap-12 md:grid-cols-3 md:gap-8">
              {serviceGroups.map((group, groupIndex) => (
                <article key={group.label}>
                  <h3 className="mb-2 font-display text-[30px] leading-none font-semibold uppercase md:text-[32px]">{group.label}</h3>
                  <p className="mb-5 text-[15px] leading-[1.6] text-muted-paper">{group.copy}</p>
                  <div className="border-t border-t-ink-16">
                    {group.services.map((service, serviceIndex) => {
                      const id = `service-${groupIndex}-${serviceIndex}`
                      const isActive = activeService === service.name
                      return (
                        <div className="border-b border-b-ink-16" key={service.name}>
                          <button id={`${id}-trigger`} type="button" aria-expanded={isActive} aria-controls={`${id}-detail`} onClick={() => toggleService(service.name)} className="flex min-h-[56px] w-full items-center justify-between gap-4 bg-transparent py-3 text-left text-[16px] font-bold text-ink transition-colors hover:text-red-deep">
                            <span>{service.name}</span><span className="font-display text-[26px] leading-none font-normal text-red-deep" aria-hidden="true">{isActive ? '−' : '+'}</span>
                          </button>
                          <div id={`${id}-detail`} role="region" aria-labelledby={`${id}-trigger`} aria-hidden={!isActive} className={`grid overflow-hidden text-[15px] leading-[1.6] text-muted-paper transition-[grid-template-rows,padding-bottom] duration-300 ${isActive ? 'grid-rows-[1fr] pb-4' : 'grid-rows-[0fr]'}`}><span className="min-h-0">{service.detail}</span></div>
                        </div>
                      )
                    })}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Como começar ------------------------------------------------------ */}
        <section id="como-comecar" aria-labelledby="journey-title" className="bg-ink-soft py-20 md:py-28">
          <div className={`${GRID} lg:grid lg:grid-cols-[1fr_1.2fr] lg:gap-16`}>
            <div className="mb-12 lg:mb-0">
              <h2 id="journey-title" className={`mb-8 ${H2}`}>Como agendar</h2>
              <a className={BUTTON_LIGHT} href={WHATSAPP_URL} target="_blank" rel="noreferrer">Falar com a Roger</a>
            </div>
            <ol className="m-0 list-none p-0">
              {journeySteps.map((step) => (
                <li className="grid grid-cols-[44px_1fr] gap-x-3 border-t border-t-paper-24 py-6 last:border-b last:border-b-paper-24 md:grid-cols-[60px_1fr]" key={step.number}>
                  <span className="font-display text-[24px] leading-none text-gold">{step.number}</span>
                  <div>
                    <h3 className="mb-2 font-display text-[26px] leading-none font-medium uppercase md:text-[30px]">{step.title}</h3>
                    <p className="m-0 text-[15px] leading-[1.6] text-paper-soft">{step.copy}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Onde estamos ------------------------------------------------------ */}
        <section id="visite" aria-labelledby="visit-title" className={`${GRID} grid gap-4 py-20 md:grid-cols-2 md:gap-6 md:py-28`}>
          <div className="flex flex-col items-start rounded-md bg-red p-7 md:p-10">
            <PinIcon className="mb-10 size-7" />
            <h2 id="visit-title" className={`mb-4 ${H2}`}>Onde estamos</h2>
            <p className="mb-8 text-[16px] leading-[1.6] font-semibold">{ADDRESS.street}<br />{ADDRESS.neighborhood}, {ADDRESS.city}</p>
            <a className={`${BUTTON_LIGHT} mt-auto`} href={MAPS_URL} target="_blank" rel="noreferrer">Abrir no Google Maps</a>
          </div>
          <div className="flex flex-col items-start rounded-md border border-line p-7 md:p-10">
            <p className="mb-6 text-[15px] font-semibold text-muted">Fale direto com a Roger</p>
            <a className="mb-4 block font-display text-[clamp(30px,10vw,40px)] leading-none font-medium text-paper transition-colors hover:text-red md:text-[56px]" href={TEL_URL}>{PHONE_DISPLAY}</a>
            <p className={`mb-8 text-muted ${BODY}`}>Agende seu horário ou tire suas dúvidas pelo WhatsApp.</p>
            <a className="mt-auto inline-flex min-h-12 items-center gap-3 border-b-2 border-red text-[15px] font-bold text-paper transition-colors hover:text-red" href={WHATSAPP_URL} target="_blank" rel="noreferrer"><PhoneIcon className="size-5 text-red" /> Chamar no WhatsApp</a>
          </div>
        </section>
      </main>

      {/* Rodapé -------------------------------------------------------------- */}
      <footer className={`${GRID} grid gap-8 border-t border-t-line pt-10 pb-28 md:grid-cols-[1fr_auto] md:items-center md:pb-10`}>
        <Brand />
        <nav aria-label="Links do rodapé" className="flex flex-wrap gap-x-6 gap-y-3 text-[14px] font-semibold text-muted">
          <a className="hover:text-paper" href={WHATSAPP_URL} target="_blank" rel="noreferrer">WhatsApp</a>
          <a className="hover:text-paper" href={MAPS_URL} target="_blank" rel="noreferrer">Google Maps</a>
          <a className="hover:text-paper" href={TEL_URL}>Ligar</a>
          <a className="hover:text-paper" href="/desenvolvedores">Desenvolvedores</a>
        </nav>
        <small className="text-[13px] text-muted md:col-span-2">© 2026 Roger Estética Automotiva</small>
      </footer>

      {/* Atalho fixo de WhatsApp --------------------------------------------- */}
      <a
        className="fixed right-4 bottom-[calc(16px_+_env(safe-area-inset-bottom))] z-[19] block size-14 transition hover:[transform:translateY(-3px)] md:right-6 md:bottom-[calc(24px_+_env(safe-area-inset-bottom))]"
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar com a Roger pelo WhatsApp"
      >
        <img className="block size-full object-contain" src="/assets/WhatsApp.svg.webp" alt="WhatsApp" />
      </a>
    </div>
  )
}
