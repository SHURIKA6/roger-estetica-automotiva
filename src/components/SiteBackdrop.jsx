// Cenário decorativo compartilhado pelas rotas: RAM ilustrativa, escura e
// desfocada, fixa atrás da página. `picture` escolhe o recorte pela viewport
// antes de baixar a imagem; o véu escuro vive no CSS (.site-backdrop::after).
export default function SiteBackdrop({ page }) {
  return (
    <div className="site-backdrop" data-page={page} aria-hidden="true">
      <picture>
        <source
          media="(max-width: 640px)"
          srcSet="/assets/ram-background-mobile.webp"
          width="900"
          height="1800"
        />
        <img
          src="/assets/ram-background-desktop.webp"
          alt=""
          width="1920"
          height="1080"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          onError={(event) => {
            event.currentTarget.style.visibility = 'hidden'
          }}
        />
      </picture>
    </div>
  )
}
