import { useState } from 'react'
import Brand from '../components/Brand.jsx'
import SiteHeader from '../components/SiteHeader.jsx'
import SkipLink from '../components/SkipLink.jsx'
import {
  ADDRESS,
  MAPS_URL,
  MAPS_EMBED_URL,
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
const FOOTER_LINK = 'inline-flex min-h-10 items-center gap-2 text-[10px] font-extrabold tracking-[.1em] text-paper-soft uppercase transition-colors hover:text-paper'

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

// A landing mostra só o nome e a foto; categorias e descrições continuam em
// content.js porque o build usa `detail` no JSON-LD e no llms.txt.
const services = serviceGroups.flatMap((group) => group.services)

// No desktop, Hidratação (o nome mais longo) fecha a lista sozinha e centralizada.
const SOLO_SERVICE = 'Hidratação de bancos sem couro'
const soloService = services.find((service) => service.name === SOLO_SERVICE)
const listedServices = [...services.filter((service) => service !== soloService), soloService]

export default function LandingPage() {
  const [galleryPaused, setGalleryPaused] = useState(false)

  return (
    <div className="site-page overflow-clip">
      <SkipLink />
      <SiteHeader />

      <main id="main">
        {/* Apresentação ----------------------------------------------------- */}
        <section
          id="inicio"
          aria-labelledby="hero-title"
          className={`${GRID} pt-[calc(var(--header-height)_+_48px)] pb-10 sm:pt-[calc(var(--header-height)_+_56px)] sm:pb-12 xl:pt-[calc(var(--header-height)_+_48px)] xl:pb-14`}
        >
          <div className="glass-surface max-w-[790px] p-6 sm:p-8">
            <p id="hero-title" className={`mb-5 max-w-[980px] ${DISPLAY_XL}`}>
              A melhor versão do seu veículo é o nosso compromisso
            </p>
            <p className="mb-7 max-w-[620px] text-[16px] leading-[1.75] text-paper-soft sm:text-[15px]">
              Estética automotiva em Sinop: polimento, vitrificação, restauração de farol e cuidado com os detalhes do seu carro. Conheça os serviços e agende direto com a Roger.
            </p>
          </div>
        </section>

        {/* Carrossel -------------------------------------------------------- */}
        {/* Faixa contínua em CSS: duas metades iguais deslizam até -50% e recomeçam
            sem emenda. A segunda metade é só visual (aria-hidden). */}
        <section aria-labelledby="gallery-title" className="gallery pb-12 sm:pb-14" data-paused={galleryPaused || undefined}>
          <div className={`${GRID} mb-4 flex items-center justify-between gap-4`}>
            <h2 id="gallery-title" className="font-display text-[18px] font-semibold tracking-[.02em] text-paper uppercase sm:text-[20px]">Cuidado automotivo</h2>
            <div className="flex items-center gap-4">
              <p className="m-0 text-[10px] text-paper-soft">Fotos ilustrativas</p>
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

        
        {/* Serviços --------------------------------------------------------- */}
        <section id="servicos" aria-labelledby="services-title" className="glass-band py-10 text-paper sm:py-12">
          <div className={`${GRID} text-center`}>
           
            <h2 id="services-title" className={`mx-auto mb-0 max-w-[900px] ${DISPLAY_XL}`}>
              Escolha o <span className="text-red">cuidado</span> que seu carro merece
            </h2>

            {/* No desktop a grade corre por coluna (grid-flow-col, 4 linhas): 3 serviços à
                esquerda, 3 à direita. O solo tem coluna e linha definidas, então é posto
                antes e ocupa a linha 4; sem col-span-full ele abriria uma 3ª coluna. */}
            <ul className="mx-auto mt-6 mb-0 grid max-w-[340px] list-none grid-cols-1 gap-y-3 p-0 text-left sm:mt-8 xl:max-w-[720px] xl:grid-flow-col xl:grid-cols-2 xl:grid-rows-4 xl:gap-x-16">
              {listedServices.map((service) => (
                <li
                  className={`flex items-center justify-between gap-3 ${service === soloService ? 'xl:col-span-full xl:row-start-4 xl:justify-self-center' : ''}`}
                  key={service.name}
                >
                  <span>
                    <span className="block font-display text-[clamp(12px,2.5vw,20px)] leading-[1.1] font-semibold uppercase">{service.name}</span>
                    <span className="mt-1 block text-[11px] leading-[1.3] text-red">{service.caption}</span>
                  </span>
                  {/* Decorativa: o nome ao lado já diz o que é. */}
                  <img
                    className="relative block aspect-[4/3] w-[78px] shrink-0 bg-ink-16 rounded-md object-cover shadow-[0_8px_20px_rgba(13,13,12,.45)] transition duration-500 hover:z-10 hover:scale-125 sm:w-[101px] xl:w-28"
                    src={service.image}
                    alt=""
                    width="400"
                    height="300"
                    loading="lazy"
                    decoding="async"
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      {/* A experiência ---------------------------------------------------- */}
        <section id="essencia" aria-labelledby="essence-title" className={`${GRID} grid items-center gap-8 py-14 sm:grid-cols-2 sm:gap-10 sm:py-20`}>
          <div className="glass-surface p-6 sm:p-8">
            <h2 id="essence-title" className={`mb-5 ${DISPLAY_XL}`}>
              Todo o cuidado que seu carro merece
            </h2>
            <p className="m-0 max-w-[420px] text-[16px] leading-[1.7] text-muted">
              Sabemos o que o seu carro significa para você. Por isso, trabalhamos com paciência e dedicação. A equipe da Roger foca em cada detalhe para que o seu carro saia daqui com a melhor aparência possível</p>
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


      {/* Rodapé ------------------------------------------------------------- */}
      {/* Fundo e fio ocupam a largura toda; o conteúdo segue alinhado ao GRID.
          O id "visite" vive aqui porque o header e a página de devs apontam para /#visite. */}
      <footer id="visite" className="glass-band">
        <div className={`${GRID} grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 sm:gap-8 sm:py-14 xl:grid-cols-[repeat(4,auto)] xl:justify-between`}>
          <div>
            <Brand />
            <p className="mt-5 mb-0 max-w-[260px] text-[12px] leading-[1.7] text-muted">
              Estética automotiva em Sinop/MT. Polimento, vitrificação, restauração de farol e cuidado com cada detalhe.
            </p>
          </div>

          <div>
            <p className={`${SECTION_TAG} mb-4 flex items-center gap-1 text-red`}>
              <PinIcon className="size-4" /> Visite a gente
            </p>
            {/* O Preflight não tira o itálico padrão de <address>. */}
            <address className="mb-4 text-[13px] leading-[1.7] text-paper-soft not-italic">
              {ADDRESS.street}<br />{ADDRESS.neighborhood} · {ADDRESS.city}
            </address>
            <a className={`${FOOTER_LINK} xl:hidden`} href={MAPS_URL} target="_blank" rel="noreferrer">
              Abrir no Google Maps <ArrowIcon className="size-4" />
            </a>
          </div>

          {/* Mapa só no desktop: no mobile o link "Abrir no Google Maps" já resolve. */}
          <iframe
            className="hidden h-35 rounded-xl border-0 xl:block xl:w-75"
            src={MAPS_EMBED_URL}
            title={`Mapa: ${ADDRESS.street}, ${ADDRESS.city}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />

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
