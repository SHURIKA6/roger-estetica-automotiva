// Ícones do site. Cada um recebe o tamanho por className no ponto de uso.

export function ArrowIcon({ className, direction = 'up-right' }) {
  const paths = direction === 'down'
    ? <path d="M5 9l7 7 7-7M12 16V3" />
    : <path d="M5 19 19 5M8 5h11v11" />

  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>{paths}</svg>
}

export function PinIcon({ className }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>
}

export function SparkIcon({ className }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 2 1.65 6.35L20 10l-6.35 1.65L12 18l-1.65-6.35L4 10l6.35-1.65L12 2Z" /><path d="m19 17 .65 2.35L22 20l-2.35.65L19 23l-.65-2.35L16 20l2.35-.65L19 17Z" /></svg>
}

export function PhoneIcon({ className }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 16.5v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 1.12 3.8 2 2 0 0 1 3.11 1.6h3a2 2 0 0 1 2 1.72c.12.9.34 1.78.66 2.62a2 2 0 0 1-.45 2.11L7.05 9.3a16 16 0 0 0 6 6l1.25-1.25a2 2 0 0 1 2.11-.45c.84.32 1.72.54 2.62.66A2 2 0 0 1 21 16.5Z" /></svg>
}

export function InstagramIcon({ className }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".7" fill="currentColor" stroke="none" /></svg>
}

export function GithubIcon({ className }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 .8a11.2 11.2 0 0 0-3.54 21.82c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.28-1.23-1.62-1.23-1.62-1-.69.08-.68.08-.68 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.58 1.2 3.2.92.1-.71.38-1.2.7-1.48-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.43-2.22 1.13-3-.11-.28-.49-1.42.11-2.96 0 0 .92-.3 3.08 1.15A10.7 10.7 0 0 1 12 6.2c.93 0 1.86.13 2.73.4 2.16-1.46 3.08-1.15 3.08-1.15.6 1.54.22 2.68.11 2.96.7.78 1.13 1.78 1.13 3 0 4.29-2.62 5.23-5.11 5.51.4.35.75 1.03.75 2.08v3.08c0 .3.2.65.77.54A11.2 11.2 0 0 0 12 .8Z" /></svg>
}
