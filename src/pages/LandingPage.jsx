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
import { ArrowIcon, PhoneIcon, PinIcon, SparkIcon } from '../icons.jsx'

// Largura padrão das seções.
const GRID = 'mx-auto w-[min(1240px,calc(100%_-_64px))] lg-down:w-[min(100%_-_52px,760px)] sm-down:w-[calc(100%_-_40px)]'

const EYEBROW = 'mb-[21px] flex items-center gap-[9px] text-[10px] leading-[1.3] font-extrabold tracking-[.17em] uppercase'
const SECTION_TAG = 'font-display text-[12px] font-semibold tracking-[.15em] uppercase'
// `transition` seco: na v4 o translate do hover é propriedade própria e uma
// lista arbitrária com `transform` não o animaria.
const BUTTON = 'inline-flex min-h-[52px] items-center justify-center gap-[17px] px-[21px] text-[10px] font-extrabold tracking-[.1em] uppercase transition hover:[transform:translateY(-3px)]'
const BUTTON_LIGHT = `${BUTTON} bg-paper text-ink hover:bg-ink hover:text-paper`
const H2 = 'font-display text-[clamp(59px,7.2vw,105px)] leading-[.84] font-semibold tracking-[-.04em] uppercase'

export default function LandingPage() {
  const [activeService, setActiveService] = useState(featuredService)
  const toggleService = (name) => setActiveService((current) => (current === name ? '' : name))

  return (
    <div className="overflow-clip">
      <SkipLink />
      <SiteHeader />

      <main id="main">
        {/* Hero ------------------------------------------------------------ */}
        <section
          id="inicio"
          aria-labelledby="hero-title"
          className={`${GRID} relative grid grid-cols-[minmax(0,.93fr)_minmax(440px,.9fr)] items-center min-h-[790px] pt-[126px] pb-[76px] before:absolute before:z-[-1] before:top-[20%] before:left-[-12vw] before:h-px before:w-[76vw] before:origin-center before:bg-line before:content-[''] before:[transform:rotate(-13deg)] after:absolute after:z-[-1] after:top-0 after:left-[49%] after:h-full after:w-px after:bg-line after:content-[''] lg-down:grid-cols-[1fr] lg-down:min-h-[auto] lg-down:pt-[154px] lg-down:pb-[82px] lg-down:after:hidden sm-down:pt-[118px] sm-down:pb-[61px] sm-down:before:top-[21%] sm-down:before:left-[-65vw] sm-down:before:w-[150vw]`}
        >
          <div className="relative z-[1] pb-5 lg-down:pb-[26px]">
            <p className={`${EYEBROW} text-paper-soft`}><span className="size-[7px] bg-red [transform:rotate(45deg)]" /> Estética automotiva · Sinop/MT</p>
            <h1 id="hero-title" className="mb-7 max-w-[680px] font-display text-[clamp(76px,10.2vw,156px)] leading-[.79] font-bold tracking-[-.045em] uppercase sm-down:text-[clamp(70px,22vw,118px)]">
              Seu carro<br /><em>pronto para aparecer.</em>
            </h1>
            <p className="mb-[34px] max-w-[420px] text-[14px] leading-[1.8] text-paper-soft sm-down:max-w-[330px] sm-down:text-[13px]">Estética automotiva em Sinop: polimento, vitrificação, restauração de farol e cuidado com os detalhes do seu carro. Conheça os serviços e agende direto com a Roger.</p>
            <div className="flex flex-wrap items-center gap-6 sm-down:flex-col sm-down:items-start sm-down:gap-[18px]">
              <a className={`${BUTTON} bg-red text-paper hover:bg-red-deep`} href={WHATSAPP_URL} target="_blank" rel="noreferrer">Agendar pelo WhatsApp <ArrowIcon className="size-[15px]" /></a>
              <a className="inline-flex min-h-11 items-center gap-[10px] border-b border-b-line pb-2 text-[10px] font-extrabold tracking-[.1em] text-paper-soft uppercase transition-colors hover:border-red hover:text-paper" href="#servicos">Ver serviços <ArrowIcon className="size-[15px]" direction="down" /></a>
            </div>
            <div className="mt-[60px] flex items-center gap-[13px] font-display text-[13px] tracking-[.08em] text-muted uppercase sm-down:mt-11 sm-down:flex-wrap sm-down:text-[11px]" aria-label="Especialidades">
              <span>Polimento</span><i className="size-[4px] bg-red [transform:rotate(45deg)]" /><span>Proteção</span><i className="size-[4px] bg-red [transform:rotate(45deg)]" /><span>Restauração</span>
            </div>
          </div>

          <div
            role="img"
            aria-label="Flyer da Roger Estética Automotiva com um carro esportivo vermelho"
            className="relative self-stretch min-h-[600px] mb-3 ml-[12%] before:absolute before:top-[18%] before:left-[18%] before:h-[62%] before:w-[78%] before:border before:border-paper-19 before:content-[''] before:[transform:rotate(11deg)] after:absolute after:right-0 after:bottom-[10%] after:h-[51%] after:w-[51%] after:bg-red after:opacity-[.91] after:mix-blend-multiply after:content-[''] lg-down:mb-0 lg-down:ml-auto lg-down:w-[min(100%,580px)] sm-down:mt-[23px] sm-down:min-h-[430px] sm-down:w-[calc(100%_+_7px)]"
          >
            <div className="absolute z-[2] top-[10%] left-[3%] flex items-center gap-[15px] font-display text-[24px] font-semibold tracking-[.05em] text-red sm-down:top-[3%] sm-down:text-[18px]">01 <span className="font-sans text-[9px] font-bold tracking-[.15em] text-muted uppercase sm-down:text-[8px]">cuidado em cada linha</span></div>
            <div className="absolute z-[2] top-[54%] left-[-5%] h-[29px] w-[117%] bg-red shadow-[0_0_60px_rgba(234,68,54,.28)] [transform:rotate(-17deg)] sm-down:top-[47%] sm-down:h-[21px]" />
            <div className="group absolute z-[1] top-[16%] right-[3%] h-[59%] w-[82%] overflow-hidden bg-ink-light [clip-path:polygon(11%_0,100%_0,100%_89%,89%_100%,0_100%,0_11%)] sm-down:top-[12%] sm-down:right-0 sm-down:h-[63%] sm-down:w-[92%]">
              <img className="block size-full object-cover object-[50%_18%] [filter:saturate(1.14)_contrast(1.07)] transition-transform duration-[800ms] ease-[cubic-bezier(.2,.8,.2,1)] [transform:scale(1.04)] group-hover:[transform:scale(1.08)]" src="/assets/roger-flyer.png" alt="Flyer da Roger Estética Automotiva com um carro esportivo vermelho" width="1600" height="900" fetchPriority="high" />
            </div>
            <div className="absolute z-[3] top-[77%] left-[8%] flex items-baseline gap-[14px] font-display sm-down:top-[76%] sm-down:left-[6%]"><span className="text-[clamp(38px,5vw,72px)] leading-[.8] font-extrabold tracking-[.02em] text-paper sm-down:text-[50px]">ROGER</span><span className="text-[10px] tracking-[.15em] text-paper-soft uppercase sm-down:text-[8px]">EST. AUTOMOTIVA</span></div>
            <div className="absolute z-[3] right-0 bottom-[8%] text-right font-display text-[17px] leading-[1.05] tracking-[.05em] text-paper uppercase sm-down:bottom-[4%] sm-down:text-[13px]">A estética<br />começa no olhar.</div>
          </div>

          <div className="absolute right-1 bottom-[42px] flex items-center gap-3 text-[9px] font-extrabold tracking-[.12em] text-muted uppercase origin-bottom-right [transform:rotate(90deg)_translateX(100%)] lg-down:hidden"><span className="block h-px w-[47px] bg-red" /> role para explorar</div>
        </section>

        {/* Faixa de provas --------------------------------------------------- */}
        <section className="border-y border-y-paper-24 bg-red text-paper" aria-label="Por que falar com a Roger">
          <div className={`${GRID} grid grid-cols-[repeat(3,1fr)] sm-down:block`}>
            {proofPoints.map((point) => (
              <div className="grid min-h-[100px] content-center gap-[5px] border-l border-l-paper-32 px-[30px] py-[18px] first:border-l-0 sm-down:flex sm-down:min-h-0 sm-down:items-baseline sm-down:gap-3 sm-down:border-l-0 sm-down:border-b sm-down:border-b-paper-32 sm-down:px-0 sm-down:py-4 sm-down:last:border-b-0" key={point.value}>
                <strong className="font-display text-[31px] leading-[.9] font-semibold tracking-[.02em] uppercase sm-down:flex-[0_0_78px] sm-down:text-[27px]">{point.value}</strong>
                <span className="max-w-[210px] text-[11px] leading-[1.45] sm-down:max-w-none">{point.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* A experiência ----------------------------------------------------- */}
        <section id="essencia" aria-labelledby="essence-title" className={`${GRID} relative grid grid-cols-[1fr_2.2fr_.4fr] gap-10 pt-[140px] pb-[160px] lg-down:grid-cols-[1fr_2.2fr] sm-down:block sm-down:pt-[90px] sm-down:pb-[101px]`}>
          <div className={`${SECTION_TAG} text-red`}>/ a experiência</div>
          <div>
            <h2 id="essence-title" className={`mb-[52px] ${H2} sm-down:mt-[49px] sm-down:mb-9 sm-down:text-[clamp(54px,16vw,83px)]`}>Mais que limpeza.<br /><span className="text-paper-soft">É cuidado que aparece.</span></h2>
            <div className="flex max-w-[720px] items-end justify-between gap-10 sm-down:flex-col sm-down:items-start sm-down:gap-[31px]">
              <p className="mb-[9px] max-w-[370px] text-[13px] leading-[1.9] text-muted">Seu carro tem linhas, textura e personalidade. O trabalho da Roger é revelar tudo isso com técnica, paciência e olho para o detalhe.</p>
              <a className="flex size-[128px] flex-[0_0_128px] items-center justify-between rounded-full border border-line p-[19px] text-[10px] leading-[1.2] font-extrabold text-paper uppercase transition hover:border-red hover:bg-red hover:[transform:rotate(-7deg)] sm-down:self-end" href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="Conversar com a Roger pelo WhatsApp"><span>Quero<br />cuidar</span><ArrowIcon className="size-[19px] self-end" /></a>
            </div>
          </div>
          <div className="flex items-center gap-3 self-end pb-[10px] font-display text-[15px] leading-[.95] tracking-[.05em] text-gold uppercase origin-bottom-right [transform:rotate(-90deg)_translateX(38%)] lg-down:hidden"><SparkIcon className="size-[24px]" /><span>brilho que<br />se percebe</span></div>
        </section>

        {/* Serviços ---------------------------------------------------------- */}
        <section id="servicos" aria-labelledby="services-title" className="bg-paper pt-[110px] pb-[140px] text-ink sm-down:pt-[75px] sm-down:pb-[88px]">
          <div className={`${GRID} grid grid-cols-[1fr_2.2fr_.4fr] items-start gap-10 lg-down:grid-cols-[1fr_2.2fr] sm-down:block`}>
            <div className={`${SECTION_TAG} text-red`}>/ o que fazemos</div>
            <div>
              <p className={`${EYEBROW} text-muted-paper`}>Sete formas de cuidar melhor</p>
              <h2 id="services-title" className={`mt-[17px] mb-[72px] text-ink ${H2} sm-down:mt-[34px] sm-down:mb-9 sm-down:text-[clamp(54px,16vw,83px)]`}>Escolha o próximo<br /><em className="text-red-deep">nível de cuidado.</em></h2>
            </div>
            <div className="pt-[2px] text-right font-display text-[80px] leading-[.7] font-extrabold text-red-deep lg-down:hidden">R<span className="align-top text-[23px]">•</span></div>
          </div>

          <div className={`${GRID} grid grid-cols-[repeat(3,1fr)] gap-[26px] lg-down:gap-[17px] sm-down:block`}>
            {serviceGroups.map((group, groupIndex) => (
              <article className="border-t border-t-ink-35 pt-[17px] sm-down:mb-[53px] sm-down:last:mb-0" key={group.label}>
                <div className="flex items-center gap-3 text-[10px] font-extrabold tracking-[.15em] text-red-deep uppercase"><span>{group.label}</span><span className="h-px w-[28px] bg-red-deep" /></div>
                <h3 className="mt-9 mb-[14px] font-display text-[37px] leading-[.9] font-semibold tracking-[-.01em] uppercase lg-down:text-[31px] sm-down:mt-[26px]">{group.title}</h3>
                <p className="mb-0 max-w-[285px] min-h-[63px] text-[12px] leading-[1.7] text-muted-paper sm-down:min-h-0">{group.copy}</p>
                <div className="mt-[30px] border-t border-t-ink-16 sm-down:mt-6">
                  {group.services.map((service, serviceIndex) => {
                    const id = `service-${groupIndex}-${serviceIndex}`
                    const isActive = activeService === service.name
                    return (
                      <div className="border-b border-b-ink-16" key={service.name}>
                        <button id={`${id}-trigger`} type="button" aria-expanded={isActive} aria-controls={`${id}-detail`} onClick={() => toggleService(service.name)} className="flex min-h-[54px] w-full items-center justify-between bg-transparent py-3 text-left text-[12px] font-extrabold text-ink transition-colors hover:text-red-deep">
                          <span>{service.name}</span><span className="font-display text-[23px] font-normal text-red-deep" aria-hidden="true">{isActive ? '−' : '+'}</span>
                        </button>
                        <div id={`${id}-detail`} role="region" aria-labelledby={`${id}-trigger`} aria-hidden={!isActive} className={`grid overflow-hidden text-[11px] leading-[1.65] text-muted-paper transition-[grid-template-rows,padding-bottom] duration-300 ${isActive ? 'grid-rows-[1fr] pt-0 pr-[28px] pb-[17px] pl-0' : 'grid-rows-[0fr]'}`}><span className="min-h-0">{service.detail}</span></div>
                      </div>
                    )
                  })}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Como começar ------------------------------------------------------ */}
        <section id="como-comecar" aria-labelledby="journey-title" className="relative overflow-hidden bg-ink-soft pt-[126px] pb-[136px] before:absolute before:top-[25%] before:right-[-12%] before:h-[58%] before:w-[62%] before:bg-red before:opacity-[.92] before:content-[''] before:[transform:skewY(-11deg)] sm-down:pt-[86px] sm-down:pb-[92px] sm-down:before:top-[42%] sm-down:before:right-[-55%] sm-down:before:h-[34%] sm-down:before:w-[135%]">
          <div className={`${GRID} relative z-[1] grid grid-cols-[1fr_2.2fr] gap-10 sm-down:block`}>
            <div>
              <p className={`${SECTION_TAG} text-red`}>/ como começar</p>
              <h2 id="journey-title" className="mt-11 mb-[45px] max-w-[560px] font-display text-[clamp(58px,7vw,104px)] leading-[.84] font-semibold tracking-[-.04em] uppercase sm-down:mt-[43px] sm-down:mb-[35px] sm-down:text-[clamp(53px,16vw,82px)]">Seu carro pede cuidado.<br /><em className="text-paper">A Roger resolve.</em></h2>
              <a className={BUTTON_LIGHT} href={WHATSAPP_URL} target="_blank" rel="noreferrer">Falar com a Roger <ArrowIcon className="size-[15px]" /></a>
            </div>
            <div className="grid gap-0 self-end sm-down:mt-[76px]">
              {journeySteps.map((step) => (
                <article className="grid grid-cols-[60px_minmax(0,1fr)] gap-x-[18px] border-t border-t-paper-24 py-6 last:border-b last:border-b-paper-24 sm-down:grid-cols-[45px_minmax(0,1fr)] sm-down:gap-x-3" key={step.number}>
                  <span className="font-display text-[22px] leading-none text-gold">{step.number}</span>
                  <h3 className="mb-2 font-display text-[28px] leading-[.9] font-medium tracking-[.01em] uppercase sm-down:text-[26px]">{step.title}</h3>
                  <p className="col-start-2 m-0 max-w-[350px] text-[12px] leading-[1.7] text-paper-soft">{step.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Onde estamos ------------------------------------------------------ */}
        <section id="visite" aria-labelledby="visit-title" className={`${GRID} grid grid-cols-[1.1fr_.9fr] gap-6 pt-[110px] pb-[112px] lg-down:grid-cols-[1fr_1fr] sm-down:block sm-down:pt-[61px] sm-down:pb-[75px]`}>
          <div className="relative flex min-h-[418px] flex-col items-start overflow-hidden bg-red px-[43px] py-[38px] before:absolute before:right-[-70px] before:bottom-[-90px] before:size-[310px] before:rounded-full before:border before:border-paper-40 before:content-[''] after:absolute after:right-[-35px] after:bottom-[-55px] after:size-[225px] after:rounded-full after:border after:border-paper-28 after:content-[''] sm-down:min-h-[390px] sm-down:px-[27px] sm-down:py-[28px]">
            <div className="flex w-full items-center justify-between"><span className={`${SECTION_TAG} text-paper`}>/ visite a gente</span><span><PinIcon className="size-[28px]" /></span></div>
            <h2 id="visit-title" className="relative z-[1] mt-auto mb-[22px] font-display text-[clamp(56px,6vw,88px)] leading-[.83] font-semibold tracking-[-.04em] uppercase">Seu carro sabe<br /><em className="text-ink">o caminho.</em></h2>
            <p className="relative z-[1] mb-[30px] text-[12px] leading-[1.8] font-semibold">{ADDRESS.street}<br />{ADDRESS.neighborhood} · {ADDRESS.city}</p>
            <a className={BUTTON_LIGHT} href={MAPS_URL} target="_blank" rel="noreferrer">Abrir no Google Maps <ArrowIcon className="size-[15px]" /></a>
          </div>
          <div className="relative min-h-[418px] overflow-hidden border border-line px-[43px] py-[38px] sm-down:mt-4 sm-down:min-h-[390px] sm-down:px-[27px] sm-down:py-[28px]">
            <p className={`${EYEBROW} text-muted`}>Fale direto com a Roger</p>
            <a className="mt-[78px] block font-display text-[clamp(42px,5vw,69px)] leading-[.85] font-medium tracking-[-.02em] text-paper transition-colors hover:text-red sm-down:mt-[79px] sm-down:text-[clamp(40px,13vw,65px)]" href={TEL_URL}>{PHONE_DISPLAY}</a>
            <p className="mt-6 mb-[29px] max-w-[240px] text-[11px] leading-[1.75] text-muted">Agende seu horário ou tire suas dúvidas pelo WhatsApp.</p>
            <a className="inline-flex min-h-11 items-center gap-[10px] border-b border-b-red pb-2 text-[10px] font-extrabold tracking-[.12em] text-paper uppercase" href={WHATSAPP_URL} target="_blank" rel="noreferrer"><PhoneIcon className="size-[15px] text-red" /> WhatsApp <ArrowIcon className="ml-[15px] size-[14px]" /></a>
            <div className="absolute right-[30px] bottom-[10px] font-display text-[150px] leading-[.7] font-extrabold text-paper-08" aria-hidden="true">R<span className="align-top text-[31px] text-red">EA</span></div>
          </div>
        </section>
      </main>

      {/* Rodapé -------------------------------------------------------------- */}
      <footer className={`${GRID} grid grid-cols-[1.1fr_.9fr_1fr_auto] items-end gap-7 border-t border-t-line pt-[31px] pb-9 lg-down:grid-cols-[1fr_1fr] sm-down:block sm-down:pb-[91px]`}>
        <Brand />
        <p className="m-0 font-display text-[18px] leading-[.95] tracking-[.03em] text-paper uppercase sm-down:my-[38px]">Seu carro. Seu estilo.<br /><span className="text-red">Seu melhor detalhe.</span></p>
        <div className="flex flex-wrap justify-center gap-x-[21px] gap-y-[17px] text-[10px] font-extrabold tracking-[.08em] text-muted uppercase lg-down:justify-start sm-down:mb-7">
          <a className="hover:text-paper" href={WHATSAPP_URL} target="_blank" rel="noreferrer">WhatsApp</a>
          <a className="hover:text-paper" href={MAPS_URL} target="_blank" rel="noreferrer">Google Maps</a>
          <a className="hover:text-paper" href="/desenvolvedores">Desenvolvedores</a>
          <a className="hover:text-paper" href={TEL_URL}>Ligar</a>
        </div>
        <small className="text-right text-[9px] tracking-[.08em] text-muted uppercase lg-down:text-left">© 2026 Roger Estética Automotiva</small>
      </footer>

      {/* Atalho fixo de WhatsApp --------------------------------------------- */}
      <a
        className="fixed right-[22px] bottom-[calc(20px_+_env(safe-area-inset-bottom))] z-[19] grid size-14 place-items-center rounded-full bg-paper shadow-[0_13px_32px_rgba(0,0,0,.25)] transition hover:bg-red hover:[transform:translateY(-3px)] sm-down:right-[15px] sm-down:bottom-[calc(15px_+_env(safe-area-inset-bottom))]"
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar com a Roger pelo WhatsApp"
      >
        <img className="size-8" src="/assets/WhatsApp.svg.webp" alt="WhatsApp" />
      </a>
    </div>
  )
}
