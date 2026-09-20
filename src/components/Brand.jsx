// Assinatura da Roger: usada no header e nos dois rodapés.
export default function Brand({ homeHref = '/#inicio', onClick }) {
  return (
    <a className="inline-flex w-max items-center gap-[11px] sm-down:gap-[9px]" href={homeHref} aria-label="Roger Estética Automotiva — início" onClick={onClick}>
      <span className="grid size-[39px] place-items-center bg-red font-display text-[28px] leading-none font-extrabold text-paper [transform:skew(-8deg)] sm-down:size-[34px] sm-down:text-[24px]">R</span>
      <span className="grid gap-px leading-none">
        <strong className="font-display text-[19px] font-extrabold tracking-[.08em] sm-down:text-[16px]">ROGER</strong>
        <small className="font-display text-[10px] tracking-[.14em] text-paper-soft uppercase sm-down:text-[8px]">estética automotiva</small>
      </span>
    </a>
  )
}
