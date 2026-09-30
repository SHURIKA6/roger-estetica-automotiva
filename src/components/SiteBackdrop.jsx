// Cenário decorativo compartilhado pelas rotas: RAM ilustrativa, escura e
// desfocada, fixa atrás da página. `picture` escolhe o recorte pela viewport
// antes de baixar a imagem; o véu escuro vive no CSS (.site-backdrop::after).
export default function SiteBackdrop() {
  return (
    <div className="site-backdrop" aria-hidden="true">
      <picture>
        <source
          media="(max-width: 640px)"
          srcSet="/assets/ram-background-mobile.webp"
          width="1080"
          height="1440"
        />
        <img
          src="/assets/ram-background-desktop.webp"
          alt=""
          width="1920"
          height="1080"
          loading="eager"
          decoding="async"
          onError={(event) => {
            event.currentTarget.style.visibility = 'hidden'
          }}
        />
      </picture>
    </div>
  )
}
