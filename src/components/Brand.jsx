// Assinatura da Roger: usada no header e nos dois rodapés.
// Usa a imagem do logo "R" estilizado em vez de texto puro.
export default function Brand({ homeHref = '/#inicio', onClick }) {
  return (
    <a className="inline-flex w-max items-center gap-[9px] sm:gap-[11px]" href={homeHref} aria-label="Roger Estética Automotiva — início" onClick={onClick}>
      <img
        className="size-[34px] object-contain sm:size-[39px]"
        src="/assets/roger-logo.jpg"
        alt="Logo Roger"
        width="39"
        height="39"
      />
      <span className="grid gap-px leading-none">
        <strong className="font-display text-[16px] font-extrabold tracking-[.08em] sm:text-[19px]">ROGER</strong>
        <small className="font-display text-[8px] tracking-[.14em] text-paper-soft uppercase sm:text-[10px]">estética automotiva</small>
      </span>
    </a>
  )
}
