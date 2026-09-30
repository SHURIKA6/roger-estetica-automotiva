import { useState } from 'react'
import Brand from '../components/Brand.jsx'
import SiteHeader from '../components/SiteHeader.jsx'
import SkipLink from '../components/SkipLink.jsx'
import {
  ADDRESS,
  MAPS_URL,
  PHONE_DISPLAY,
  serviceGroups,
  TEL_URL,
  WHATSAPP_URL,
} from '../content.js'
import { ArrowIcon, PhoneIcon, PinIcon } from '../icons.jsx'

const GRID = 'mx-auto w-[calc(100%_-_40px)] sm:w-[min(100%_-_52px,760px)] xl:w-[min(1240px,calc(100%_-_64px))]'
const EYEBROW = 'mb-4 text-[10px] leading-[1.4] font-extrabold tracking-[.14em] uppercase'
const SECTION_TAG = 'text-[10px] font-extrabold tracking-[.14em] uppercase'
const BUTTON = 'inline-flex min-h-12 items-center justify-center gap-3 px-5 text-[10px] font-extrabold tracking-[.1em] uppercase transition-colors'
// Título de destaque: mesmo tamanho do hero, usado também em experiência e serviços.
const DISPLAY_XL = 'font-display text-[clamp(38px,8vw,52px)] leading-[.96] font-semibold tracking-[-.025em] uppercase sm:text-[clamp(46px,6vw,56px)] xl:text-[56px]'
const FOOTER_LINK = 'inline-flex min-h-10 items-center gap-2 text-[10px] font-extrabold tracking-[.1em] text-paper-soft uppercase transition-colors hover:text-red'

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

// Cada metade da faixa precisa ser mais larga que a tela, senão aparece um vão
// no fim do ciclo. Com poucas fotos, repetimos a lista dentro de cada metade.
const GALLERY_REPEAT = 3
const galleryHalf = Array.from({ length: GALLERY_REPEAT }, () => galleryPhotos).flat()

// A landing mostra só os nomes; categorias e descrições continuam em content.js
// porque o build usa `detail` no JSON-LD e no llms.txt.
const services = serviceGroups.flatMap((group) => group.services)

export default function LandingPage() {
  const [galleryPaused, setGalleryPaused] = useState(false)

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
            <h1 id="hero-title" className={`mb-5 max-w-[980px] ${DISPLAY_XL}`}>
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

        {/* Carrossel -------------------------------------------------------- */}
        {/* Faixa contínua em CSS: duas metades iguais deslizam até -50% e recomeçam
            sem emenda. A segunda metade é só visual (aria-hidden). */}
        <section aria-labelledby="gallery-title" className="gallery pb-12 sm:pb-14" data-paused={galleryPaused || undefined}>
          <div className={`${GRID} mb-4 flex items-center justify-between gap-4`}>
            <h2 id="gallery-title" className="font-display text-[18px] font-semibold tracking-[.02em] text-paper uppercase sm:text-[20px]">Cuidado automotivo</h2>
            <div className="flex items-center gap-4">
              <p className="m-0 text-[10px] text-muted">Fotos ilustrativas</p>
              <button
                type="button"
                className="gallery-toggle min-h-10 text-[10px] font-extrabold tracking-[.1em] text-paper-soft uppercase transition-colors hover:text-paper"
                aria-pressed={galleryPaused}
                onClick={() => setGalleryPaused((paused) => !paused)}
              >
                {galleryPaused ? 'Retomar' : 'Pausar'}
              </button>
            </div>
          </div>

          <div className="gallery-viewport">
            <ul className="gallery-track m-0 flex w-max list-none p-0">
              {[...galleryHalf, ...galleryHalf].map((photo, index) => {
                // Só a primeira ocorrência de cada foto é anunciada ao leitor de tela.
                const repeated = index >= galleryPhotos.length
                return (
                  <li className="mr-3 w-[64vw] shrink-0 sm:w-[36vw] xl:w-[280px]" key={index} aria-hidden={repeated || undefined}>
                    <img
                      className="block aspect-[4/5] w-full bg-ink-light object-cover"
                      src={photo.src}
                      alt={repeated ? '' : photo.alt}
                      width="500"
                      height="750"
                      loading="lazy"
                      decoding="async"
                    />
                  </li>
                )
              })}
            </ul>
          </div>
        </section>

        {/* A experiência ---------------------------------------------------- */}
        <section id="essencia" aria-labelledby="essence-title" className={`${GRID} grid items-center gap-8 py-14 sm:grid-cols-2 sm:gap-10 sm:py-20`}>
          <div>
            <h2 id="essence-title" className={`mb-5 ${DISPLAY_XL}`}>
              Mais que limpeza. <span className="text-paper-soft">É cuidado que aparece.</span>
            </h2>
            <p className="m-0 max-w-[420px] text-[12px] leading-[1.7] text-muted">
              Seu carro tem linhas, textura e personalidade. O trabalho da Roger é revelar tudo isso com técnica, paciência e olho para o detalhe.
            </p>
          </div>
          {/* Foto retrato (2:3) recortada: 4:5 na coluna estreita do tablet, 4:3 no
              celular e no desktop para a seção não ficar mais alta que o texto. */}
          <figure className="m-0 overflow-hidden bg-ink-light">
            <img
              className="block aspect-[4/3] w-full object-cover sm:aspect-[4/5] xl:aspect-[4/3]"
              src="/assets/galeria-detalhamento.webp"
              alt="Profissional cuidando da pintura de um carro esportivo em uma oficina."
              width="499"
              height="750"
              loading="lazy"
              decoding="async"
            />
          </figure>
        </section>

        {/* Serviços --------------------------------------------------------- */}
        <section id="servicos" aria-labelledby="services-title" className="bg-paper py-12 text-ink sm:py-16">
          <div className={`${GRID} text-center`}>
            <p className={`${EYEBROW} text-muted-paper`}>Sete formas de cuidar melhor</p>
            <h2 id="services-title" className={`mx-auto mb-0 max-w-[900px] ${DISPLAY_XL}`}>
              Escolha o próximo <span className="text-red-deep">nível de cuidado.</span>
            </h2>

            <ul className="mx-auto mt-10 mb-0 flex max-w-[1040px] list-none flex-wrap justify-center gap-x-4 gap-y-2 p-0 sm:mt-12">
              {services.map((service, index) => (
                <li className="font-display text-[clamp(24px,5vw,40px)] leading-[1.1] font-semibold uppercase" key={service.name}>
                  {service.name}
                  {/* Separador só visual: aria-hidden para o leitor de tela não ler as barras. */}
                  {index < services.length - 1 && <span className="ml-4 text-red-deep" aria-hidden="true">/</span>}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      {/* Rodapé ------------------------------------------------------------- */}
      {/* Fundo e fio ocupam a largura toda; o conteúdo segue alinhado ao GRID.
          O id "visite" vive aqui porque o header e a página de devs apontam para /#visite. */}
      <footer id="visite" className="border-t border-t-line bg-ink-soft">
        <div className={`${GRID} grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 sm:gap-8 sm:py-14 xl:grid-cols-[1.3fr_1fr_1fr_.8fr]`}>
          <div>
            <Brand />
            <p className="mt-5 mb-0 max-w-[260px] text-[12px] leading-[1.7] text-muted">
              Estética automotiva em Sinop/MT. Polimento, vitrificação, restauração de farol e cuidado com cada detalhe.
            </p>
          </div>

          <div>
            <p className={`${SECTION_TAG} mb-4 flex items-center gap-2 text-red`}>
              <PinIcon className="size-4" /> Visite a gente
            </p>
            {/* O Preflight não tira o itálico padrão de <address>. */}
            <address className="mb-4 text-[13px] leading-[1.7] text-paper-soft not-italic">
              {ADDRESS.street}<br />{ADDRESS.neighborhood} · {ADDRESS.city}
            </address>
            <a className={FOOTER_LINK} href={MAPS_URL} target="_blank" rel="noreferrer">
              Abrir no Google Maps <ArrowIcon className="size-4" />
            </a>
          </div>

          <div>
            <p className={`${SECTION_TAG} mb-4 flex items-center gap-2 text-red`}>
              <PhoneIcon className="size-4" /> Fale com a Roger
            </p>
            <a className="mb-3 block w-max font-display text-[28px] leading-none font-medium tracking-[-.01em] text-paper transition-colors hover:text-red" href={TEL_URL}>
              {PHONE_DISPLAY}
            </a>
            <a className={FOOTER_LINK} href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              WhatsApp <ArrowIcon className="size-4" />
            </a>
          </div>

          <nav aria-label="Links do rodapé">
            <p className={`${SECTION_TAG} mb-4 text-red`}>Navegue</p>
            <ul className="m-0 grid list-none gap-1 p-0">
              <li><a className={FOOTER_LINK} href="#inicio">Início</a></li>
              <li><a className={FOOTER_LINK} href="#essencia">A experiência</a></li>
              <li><a className={FOOTER_LINK} href="#servicos">Serviços</a></li>
            </ul>
          </nav>
        </div>

        <div className="border-t border-t-line">
          <div className={`${GRID} flex flex-col gap-1 py-5 text-[10px] text-muted sm:flex-row sm:justify-between`}>
            <small>© 2026 Roger Estética Automotiva</small>
            <span>Sinop · Mato Grosso</span>
          </div>
        </div>
      </footer>

      {/* Atalho fixo de WhatsApp: o próprio logo é o botão. ----------------- */}
      {/* drop-shadow (filtro) segue o contorno do balão, em vez de um quadrado. */}
      <a
        className="fixed right-4 bottom-[calc(16px_+_env(safe-area-inset-bottom))] z-[19] block size-14 drop-shadow-[0_8px_18px_rgba(0,0,0,.35)] sm:right-6 sm:bottom-[calc(24px_+_env(safe-area-inset-bottom))]"
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar com a Roger pelo WhatsApp"
      >
        <img className="block size-full" src="/assets/WhatsApp.svg.webp" alt="" width="56" height="56" />
      </a>
    </div>
  )
}
