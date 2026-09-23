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

// Largura padrão das seções — mobile-first.
const GRID = 'mx-auto w-[calc(100%_-_40px)] sm:w-[min(100%_-_52px,760px)] lg:w-[min(1240px,calc(100%_-_64px))]'

const EYEBROW = 'mb-[21px] flex items-center gap-[9px] text-[10px] leading-[1.3] font-extrabold tracking-[.17em] uppercase'
const SECTION_TAG = 'font-display text-[12px] font-semibold tracking-[.15em] uppercase'
// Hovers simplificados: removido translateY(-3px) excessivo.
const BUTTON = 'inline-flex min-h-[48px] items-center justify-center gap-[14px] px-[19px] text-[10px] font-extrabold tracking-[.1em] uppercase transition-colors sm:min-h-[52px] sm:gap-[17px] sm:px-[21px]'
const BUTTON_LIGHT = `${BUTTON} bg-paper text-ink hover:bg-ink hover:text-paper`
// Fontes H2 reduzidas: era clamp(59px,7.2vw,105px), agora escala mais contido.
const H2 = 'font-display text-[clamp(38px,11vw,52px)] leading-[.86] font-semibold tracking-[-.04em] uppercase sm:text-[clamp(42px,5vw,72px)]'

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
          className={`${GRID} relative grid grid-cols-[1fr] items-center min-h-[auto] pt-[118px] pb-[61px] before:absolute before:z-[-1] before:top-[21%] before:left-[-65vw] before:h-px before:w-[150vw] before:origin-center before:bg-line before:content-[''] before:[transform:rotate(-13deg)] sm:pt-[154px] sm:pb-[82px] lg:grid-cols-[minmax(0,.93fr)_minmax(440px,.9fr)] lg:min-h-[680px] lg:pt-[110px] lg:pb-[76px] lg:after:absolute lg:after:z-[-1] lg:after:top-0 lg:after:left-[49%] lg:after:h-full lg:after:w-px lg:after:bg-line lg:after:content-['']`}
        >
          <div className="relative z-[1] pb-[26px] lg:pb-5">
            <p className={`${EYEBROW} text-paper-soft`}><span className="size-[7px] bg-red [transform:rotate(45deg)]" /> Estética automotiva · Sinop/MT</p>
            {/* Fonte do Hero H1 reduzida: era clamp(76px,10.2vw,156px) */}
            <h1 id="hero-title" className="mb-7 max-w-[680px] font-display text-[clamp(48px,12vw,72px)] leading-[.82] font-bold tracking-[-.045em] uppercase sm:text-[clamp(56px,7vw,96px)]">
              Seu carro<br /><em>pronto para aparecer.</em>
            </h1>
            <p className="mb-[34px] max-w-[330px] text-[13px] leading-[1.8] text-paper-soft sm:max-w-[420px] sm:text-[14px]">Estética automotiva em Sinop: polimento, vitrificação, restauração de farol e cuidado com os detalhes do seu carro. Conheça os serviços e agende direto com a Roger.</p>
            <div className="flex flex-col items-start gap-[18px] sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
              <a className={`${BUTTON} bg-red text-paper hover:bg-red-deep`} href={WHATSAPP_URL} target="_blank" rel="noreferrer">Agendar pelo WhatsApp <ArrowIcon className="size-[15px]" /></a>
              <a className="inline-flex min-h-11 items-center gap-[10px] border-b border-b-line pb-2 text-[10px] font-extrabold tracking-[.1em] text-paper-soft uppercase transition-colors hover:border-red hover:text-paper" href="#servicos">Ver serviços <ArrowIcon className="size-[15px]" direction="down" /></a>
            </div>
            <div className="mt-11 flex flex-wrap items-center gap-[13px] font-display text-[11px] tracking-[.08em] text-muted uppercase sm:mt-[60px] sm:text-[13px]" aria-label="Especialidades">
              <span>Polimento</span><i className="size-[4px] bg-red [transform:rotate(45deg)]" /><span>Proteção</span><i className="size-[4px] bg-red [transform:rotate(45deg)]" /><span>Restauração</span>
            </div>
          </div>

          <div
            role="img"
            aria-label="Flyer da Roger Estética Automotiva com um carro esportivo vermelho"
            className="relative self-stretch mt-[23px] min-h-[430px] w-[calc(100%_+_7px)] before:absolute before:top-[18%] before:left-[18%] before:h-[62%] before:w-[78%] before:border before:border-paper-19 before:content-[''] before:[transform:rotate(11deg)] after:absolute after:right-0 after:bottom-[10%] after:h-[51%] after:w-[51%] after:bg-red after:opacity-[.91] after:mix-blend-multiply after:content-[''] sm:mt-0 sm:ml-auto sm:w-[min(100%,580px)] lg:min-h-[520px] lg:mb-3 lg:ml-[12%] lg:w-auto"
          >
            <div className="absolute z-[2] top-[3%] left-[3%] flex items-center gap-[15px] font-display text-[18px] font-semibold tracking-[.05em] text-red sm:top-[10%] sm:text-[22px]">01 <span className="font-sans text-[8px] font-bold tracking-[.15em] text-muted uppercase sm:text-[9px]">cuidado em cada linha</span></div>
            <div className="absolute z-[2] top-[47%] left-[-5%] h-[21px] w-[117%] bg-red shadow-[0_0_40px_rgba(234,68,54,.2)] [transform:rotate(-17deg)] sm:top-[54%] sm:h-[26px]" />
            {/* Removido group-hover scale — era efeito excessivo de IA. Imagem estática. */}
            <div className="absolute z-[1] top-[12%] right-0 h-[63%] w-[92%] overflow-hidden bg-ink-light [clip-path:polygon(11%_0,100%_0,100%_89%,89%_100%,0_100%,0_11%)] sm:top-[16%] sm:right-[3%] sm:h-[59%] sm:w-[82%]">
              <img className="block size-full object-cover object-[50%_18%] [filter:saturate(1.14)_contrast(1.07)] [transform:scale(1.04)]" src="/assets/roger-flyer.png" alt="Flyer da Roger Estética Automotiva com um carro esportivo vermelho" width="1600" height="900" fetchPriority="high" />
            </div>
            <div className="absolute z-[3] top-[76%] left-[6%] flex items-baseline gap-[14px] font-display sm:top-[77%] sm:left-[8%]"><span className="text-[50px] leading-[.8] font-extrabold tracking-[.02em] text-paper sm:text-[clamp(38px,5vw,60px)]">ROGER</span><span className="text-[8px] tracking-[.15em] text-paper-soft uppercase sm:text-[10px]">EST. AUTOMOTIVA</span></div>
            <div className="absolute z-[3] right-0 bottom-[4%] text-right font-display text-[13px] leading-[1.05] tracking-[.05em] text-paper uppercase sm:bottom-[8%] sm:text-[15px]">A estética<br />começa no olhar.</div>
          </div>

          <div className="hidden lg:absolute lg:right-1 lg:bottom-[42px] lg:flex lg:items-center lg:gap-3 lg:text-[9px] lg:font-extrabold lg:tracking-[.12em] lg:text-muted lg:uppercase lg:origin-bottom-right lg:[transform:rotate(90deg)_translateX(100%)]"><span className="block h-px w-[47px] bg-red" /> role para explorar</div>
        </section>

        {/* Faixa de provas --------------------------------------------------- */}
        <section className="border-y border-y-paper-24 bg-red text-paper" aria-label="Por que falar com a Roger">
          <div className={`${GRID} block sm:grid sm:grid-cols-[repeat(3,1fr)]`}>
            {proofPoints.map((point) => (
              <div className="flex min-h-0 items-baseline gap-3 border-b border-b-paper-32 px-0 py-4 last:border-b-0 sm:grid sm:min-h-[100px] sm:content-center sm:gap-[5px] sm:border-b-0 sm:border-l sm:border-l-paper-32 sm:px-[30px] sm:py-[18px] sm:first:border-l-0" key={point.value}>
                <strong className="flex-[0_0_78px] font-display text-[27px] leading-[.9] font-semibold tracking-[.02em] uppercase sm:flex-auto sm:text-[28px]">{point.value}</strong>
                <span className="max-w-none text-[11px] leading-[1.45] sm:max-w-[210px]">{point.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* A experiência ----------------------------------------------------- */}
        <section id="essencia" aria-labelledby="essence-title" className={`${GRID} relative block pt-[90px] pb-[101px] sm:grid sm:grid-cols-[1fr_2.2fr] sm:gap-10 sm:pt-[140px] sm:pb-[160px] lg:grid-cols-[1fr_2.2fr_.4fr]`}>
          <div className={`${SECTION_TAG} text-red`}>/ a experiência</div>
          <div>
            <h2 id="essence-title" className={`mt-[49px] mb-9 ${H2} sm:mt-0 sm:mb-[52px]`}>Mais que limpeza.<br /><span className="text-paper-soft">É cuidado que aparece.</span></h2>
            <div className="flex flex-col items-start gap-[31px] sm:max-w-[720px] sm:flex-row sm:items-end sm:justify-between sm:gap-10">
              <p className="mb-[9px] max-w-[370px] text-[13px] leading-[1.9] text-muted">Seu carro tem linhas, textura e personalidade. O trabalho da Roger é revelar tudo isso com técnica, paciência e olho para o detalhe.</p>
              {/* Removido hover rotate(-7deg) — era excessivo. Mantido hover de cor. */}
              <a className="flex size-[120px] flex-[0_0_120px] items-center justify-between self-end rounded-full border border-line p-[17px] text-[10px] leading-[1.2] font-extrabold text-paper uppercase transition-colors hover:border-red hover:bg-red sm:size-[128px] sm:flex-[0_0_128px] sm:p-[19px]" href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="Conversar com a Roger pelo WhatsApp"><span>Quero<br />cuidar</span><ArrowIcon className="size-[19px] self-end" /></a>
            </div>
          </div>
          <div className="hidden lg:flex lg:items-center lg:gap-3 lg:self-end lg:pb-[10px] lg:font-display lg:text-[15px] lg:leading-[.95] lg:tracking-[.05em] lg:text-gold lg:uppercase lg:origin-bottom-right lg:[transform:rotate(-90deg)_translateX(38%)]"><SparkIcon className="size-[24px]" /><span>brilho que<br />se percebe</span></div>
        </section>

        {/* Serviços ---------------------------------------------------------- */}
        <section id="servicos" aria-labelledby="services-title" className="bg-paper pt-[75px] pb-[88px] text-ink sm:pt-[110px] sm:pb-[140px]">
          <div className={`${GRID} block sm:grid sm:grid-cols-[1fr_2.2fr] sm:items-start sm:gap-10 lg:grid-cols-[1fr_2.2fr_.4fr]`}>
            <div className={`${SECTION_TAG} text-red`}>/ o que fazemos</div>
            <div>
              <p className={`${EYEBROW} text-muted-paper`}>Sete formas de cuidar melhor</p>
              <h2 id="services-title" className={`mt-[34px] mb-9 text-ink ${H2} sm:mt-[17px] sm:mb-[72px]`}>Escolha o próximo<br /><em className="text-red-deep">nível de cuidado.</em></h2>
            </div>
            <div className="hidden lg:block lg:pt-[2px] lg:text-right lg:font-display lg:text-[80px] lg:leading-[.7] lg:font-extrabold lg:text-red-deep">R<span className="align-top text-[23px]">•</span></div>
          </div>

          <div className={`${GRID} block sm:grid sm:grid-cols-[repeat(3,1fr)] sm:gap-[17px] lg:gap-[26px]`}>
            {serviceGroups.map((group, groupIndex) => (
              <article className="mb-[53px] border-t border-t-ink-35 pt-[17px] last:mb-0 sm:mb-0" key={group.label}>
                <div className="flex items-center gap-3 text-[10px] font-extrabold tracking-[.15em] text-red-deep uppercase"><span>{group.label}</span><span className="h-px w-[28px] bg-red-deep" /></div>
                <h3 className="mt-[26px] mb-[14px] font-display text-[28px] leading-[.9] font-semibold tracking-[-.01em] uppercase sm:text-[31px] sm:mt-9 lg:text-[34px]">{group.title}</h3>
                <p className="mb-0 max-w-[285px] min-h-0 text-[12px] leading-[1.7] text-muted-paper sm:min-h-[63px]">{group.copy}</p>
                <div className="mt-6 border-t border-t-ink-16 sm:mt-[30px]">
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
        <section id="como-comecar" aria-labelledby="journey-title" className="relative overflow-hidden bg-ink-soft pt-[86px] pb-[92px] before:absolute before:top-[42%] before:right-[-55%] before:h-[34%] before:w-[135%] before:bg-red before:opacity-[.92] before:content-[''] before:[transform:skewY(-11deg)] sm:pt-[126px] sm:pb-[136px] sm:before:top-[25%] sm:before:right-[-12%] sm:before:h-[58%] sm:before:w-[62%]">
          <div className={`${GRID} relative z-[1] block sm:grid sm:grid-cols-[1fr_2.2fr] sm:gap-10`}>
            <div>
              <p className={`${SECTION_TAG} text-red`}>/ como começar</p>
              {/* Fonte reduzida: era clamp(58px,7vw,104px) */}
              <h2 id="journey-title" className="mt-[43px] mb-[35px] max-w-[560px] font-display text-[clamp(38px,11vw,56px)] leading-[.86] font-semibold tracking-[-.04em] uppercase sm:mt-11 sm:mb-[45px] sm:text-[clamp(42px,5vw,72px)]">Seu carro pede cuidado.<br /><em className="text-paper">A Roger resolve.</em></h2>
              <a className={BUTTON_LIGHT} href={WHATSAPP_URL} target="_blank" rel="noreferrer">Falar com a Roger <ArrowIcon className="size-[15px]" /></a>
            </div>
            <div className="mt-[76px] grid gap-0 sm:mt-0 sm:self-end">
              {journeySteps.map((step) => (
                <article className="grid grid-cols-[45px_minmax(0,1fr)] gap-x-3 border-t border-t-paper-24 py-6 last:border-b last:border-b-paper-24 sm:grid-cols-[60px_minmax(0,1fr)] sm:gap-x-[18px]" key={step.number}>
                  <span className="font-display text-[22px] leading-none text-gold">{step.number}</span>
                  <h3 className="mb-2 font-display text-[24px] leading-[.9] font-medium tracking-[.01em] uppercase sm:text-[26px]">{step.title}</h3>
                  <p className="col-start-2 m-0 max-w-[350px] text-[12px] leading-[1.7] text-paper-soft">{step.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Onde estamos ------------------------------------------------------ */}
        <section id="visite" aria-labelledby="visit-title" className={`${GRID} block pt-[61px] pb-[75px] sm:grid sm:grid-cols-[1fr_1fr] sm:gap-6 sm:pt-[110px] sm:pb-[112px] lg:grid-cols-[1.1fr_.9fr]`}>
          <div className="relative flex min-h-[390px] flex-col items-start overflow-hidden bg-red px-[27px] py-[28px] before:absolute before:right-[-70px] before:bottom-[-90px] before:size-[310px] before:rounded-full before:border before:border-paper-40 before:content-[''] after:absolute after:right-[-35px] after:bottom-[-55px] after:size-[225px] after:rounded-full after:border after:border-paper-28 after:content-[''] sm:min-h-[418px] sm:px-[43px] sm:py-[38px]">
            <div className="flex w-full items-center justify-between"><span className={`${SECTION_TAG} text-paper`}>/ visite a gente</span><span><PinIcon className="size-[28px]" /></span></div>
            {/* Fonte reduzida */}
            <h2 id="visit-title" className="relative z-[1] mt-auto mb-[22px] font-display text-[clamp(40px,10vw,56px)] leading-[.85] font-semibold tracking-[-.04em] uppercase sm:text-[clamp(44px,5vw,68px)]">Seu carro sabe<br /><em className="text-ink">o caminho.</em></h2>
            <p className="relative z-[1] mb-[30px] text-[12px] leading-[1.8] font-semibold">{ADDRESS.street}<br />{ADDRESS.neighborhood} · {ADDRESS.city}</p>
            <a className={BUTTON_LIGHT} href={MAPS_URL} target="_blank" rel="noreferrer">Abrir no Google Maps <ArrowIcon className="size-[15px]" /></a>
          </div>
          <div className="relative mt-4 min-h-[390px] overflow-hidden border border-line px-[27px] py-[28px] sm:mt-0 sm:min-h-[418px] sm:px-[43px] sm:py-[38px]">
            <p className={`${EYEBROW} text-muted`}>Fale direto com a Roger</p>
            {/* Fonte do telefone reduzida: era clamp(42px,5vw,69px) */}
            <a className="mt-[79px] block font-display text-[clamp(32px,8vw,48px)] leading-[.85] font-medium tracking-[-.02em] text-paper transition-colors hover:text-red sm:mt-[78px] sm:text-[clamp(36px,4vw,52px)]" href={TEL_URL}>{PHONE_DISPLAY}</a>
            <p className="mt-6 mb-[29px] max-w-[240px] text-[11px] leading-[1.75] text-muted">Agende seu horário ou tire suas dúvidas pelo WhatsApp.</p>
            <a className="inline-flex min-h-11 items-center gap-[10px] border-b border-b-red pb-2 text-[10px] font-extrabold tracking-[.12em] text-paper uppercase" href={WHATSAPP_URL} target="_blank" rel="noreferrer"><PhoneIcon className="size-[15px] text-red" /> WhatsApp <ArrowIcon className="ml-[15px] size-[14px]" /></a>
            <div className="absolute right-[30px] bottom-[10px] font-display text-[120px] leading-[.7] font-extrabold text-paper-08 sm:text-[150px]" aria-hidden="true">R<span className="align-top text-[26px] text-red sm:text-[31px]">EA</span></div>
          </div>
        </section>
      </main>

      {/* Rodapé -------------------------------------------------------------- */}
      <footer className={`${GRID} block pb-[91px] border-t border-t-line pt-[31px] sm:grid sm:grid-cols-[1fr_1fr] sm:items-end sm:gap-7 sm:pb-9 lg:grid-cols-[1.1fr_.9fr_1fr_auto]`}>
        <Brand />
        <p className="my-[38px] font-display text-[16px] leading-[.95] tracking-[.03em] text-paper uppercase sm:m-0 sm:text-[18px]">Seu carro. Seu estilo.<br /><span className="text-red">Seu melhor detalhe.</span></p>
        <div className="mb-7 flex flex-wrap justify-start gap-x-[21px] gap-y-[17px] text-[10px] font-extrabold tracking-[.08em] text-muted uppercase sm:mb-0 lg:justify-center">
          <a className="hover:text-paper" href={WHATSAPP_URL} target="_blank" rel="noreferrer">WhatsApp</a>
          <a className="hover:text-paper" href={MAPS_URL} target="_blank" rel="noreferrer">Google Maps</a>
          <a className="hover:text-paper" href="/desenvolvedores">Desenvolvedores</a>
          <a className="hover:text-paper" href={TEL_URL}>Ligar</a>
        </div>
        <small className="text-left text-[9px] tracking-[.08em] text-muted uppercase lg:text-right">© 2026 Roger Estética Automotiva</small>
      </footer>

      {/* Atalho fixo de WhatsApp --------------------------------------------- */}
      {/* Removido hover translateY(-3px) — era excessivo. Mantido hover de cor sutil. */}
      <a
        className="fixed right-[15px] bottom-[calc(15px_+_env(safe-area-inset-bottom))] z-[19] grid size-14 place-items-center rounded-full bg-paper shadow-[0_13px_32px_rgba(0,0,0,.25)] transition-colors hover:bg-red sm:right-[22px] sm:bottom-[calc(20px_+_env(safe-area-inset-bottom))]"
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
