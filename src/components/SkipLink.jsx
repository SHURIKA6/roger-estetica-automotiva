// Atalho de teclado para pular a navegação e ir direto ao conteúdo.
export default function SkipLink() {
  return (
    <a
      className="fixed top-3 left-4 z-30 bg-paper px-4 py-3 text-[11px] font-extrabold tracking-[.08em] text-ink uppercase transition-transform [transform:translateY(-160%)] focus:[transform:translateY(0)]"
      href="#main"
    >
      Pular para o conteúdo
    </a>
  )
}
