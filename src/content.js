// Conteúdo do site: contatos, serviços e créditos.
// Sem JSX de propósito — o script de build importa este mesmo arquivo para gerar
// o JSON-LD, o sitemap e o llms.txt.

export const MAPS_URL = 'https://maps.app.goo.gl/zEgB5ubvbBt3L4Wx6'

export const PHONE = '5566996126664'
export const PHONE_DISPLAY = '(66) 99612-6664'
export const TEL_URL = `tel:+${PHONE}`

export const ADDRESS = {
  street: 'Rua dos Guapuruvús, 366',
  neighborhood: 'Jardim das Violetas',
  city: 'Sinop/MT',
}

// Embed sem API key: o Google aceita uma busca por endereço com output=embed.
export const MAPS_EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(
  `${ADDRESS.street} - ${ADDRESS.neighborhood}, Sinop - MT`,
)}&output=embed`

export const WHATSAPP_MESSAGE = 'Olá, Roger! Gostaria de um orçamento para cuidar do meu carro.'
export const WHATSAPP_URL = `https://wa.me/${PHONE}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

export const landingContent = {
  hero: {
    eyebrow: 'Estética automotiva · Sinop/MT',
    title: 'Brilho e proteção para seu carro em Sinop',
    description: 'Polimento, vitrificação, restauração de faróis e cuidados com bancos de couro. Consulte o serviço indicado para o seu veículo.',
  },
  budgetCta: 'Pedir orçamento no WhatsApp',
  servicesCta: 'Ver serviços',
  services: {
    title: 'Serviços para o seu carro',
    help: 'Não sabe qual escolher? Fale com a Roger.',
    photoNotice: 'Imagens dos serviços são ilustrativas.',
  },
  gallery: {
    title: 'Detalhes do cuidado automotivo',
    photoNotice: 'Fotos ilustrativas',
  },
  attendance: {
    navLabel: 'Atendimento',
    title: 'Converse com a Roger sobre o seu carro',
    description: 'Conte pelo WhatsApp o que deseja melhorar no veículo. Consulte os serviços disponíveis e combine o atendimento diretamente com a Roger.',
    image: '/assets/experiencia-polimento.webp',
    imageAlt: 'Politriz em contato com a pintura de um carro durante o polimento.',
    imageWidth: 1000,
    imageHeight: 750,
    photoNotice: 'Imagem ilustrativa de polimento automotivo.',
  },
}

export const serviceGroups = [
  {
    label: 'Recuperação',
    title: 'Devolver presença',
    copy: 'Para o que já viu dias melhores — e ainda pode voltar a chamar atenção.',
    services: [
      { name: 'Restauração de farol', detail: 'Tratamento para recuperar a transparência da superfície dos faróis.', image: '/assets/servico-farol.webp', caption: 'Recuperação da transparência dos faróis.' },
      { name: 'Micro pintura', detail: 'Correções localizadas para devolver uniformidade aos detalhes da pintura.', image: '/assets/servico-micro-pintura.webp', caption: 'Retoques localizados na pintura.' },
    ],
  },
  {
    label: 'Proteção',
    title: 'Preservar o que importa',
    copy: 'Camadas de cuidado para a pintura, os bancos e tudo aquilo que você quer manter bonito.',
    services: [
      { name: 'Vitrificação em pintura', detail: 'Aplicação de uma camada de proteção sobre a superfície da pintura.', image: '/assets/servico-vitrificacao.webp', caption: 'Camada de proteção sobre a pintura.' },
      { name: 'Cristalização com teflon', detail: 'Tratamento com teflon para proteger o acabamento da pintura.', image: '/assets/servico-cristalizacao.webp', caption: 'Tratamento com teflon para o acabamento.' },
      { name: 'Hidratação de bancos de couro', detail: 'Tratamento de hidratação para preservar o toque e a aparência dos bancos de couro.', image: '/assets/servico-couro.webp', caption: 'Cuidado para preservar o toque do couro.' },
    ],
  },
  {
    label: 'Acabamento',
    title: 'Fazer o detalhe aparecer',
    copy: 'O toque final que tira o carro do comum e faz cada linha ganhar luz.',
    services: [
      { name: 'Polimento', detail: 'Refino da superfície da pintura para recuperar o brilho.', image: '/assets/servico-polimento.webp', caption: 'Refino da pintura para recuperar o brilho.' },
      { name: 'Espelhamento', detail: 'Acabamento de alto brilho para valorizar os reflexos da pintura.', image: '/assets/servico-espelhamento.webp', caption: 'Acabamento para destacar os reflexos.' },
    ],
  },
]

export const galleryPhotos = [
  {
    src: '/assets/galeria-detalhamento.webp', width: 499, height: 750,
    alt: 'Profissional cuidando da pintura de um carro esportivo em uma oficina.',
  },
  {
    src: '/assets/galeria-brilho.webp', width: 500, height: 750,
    alt: 'Carro preto polido com reflexos de luz em uma garagem coberta.',
  },
  {
    src: '/assets/galeria-reflexo.webp', width: 500, height: 750,
    alt: 'Detalhe de um carro preto brilhante com reflexos na lataria.',
  },
  { src: '/assets/galeria-farol.webp', width: 600, height: 750, alt: 'Farol de carro sendo polido com uma politriz.' },
  { src: '/assets/galeria-couro.webp', width: 600, height: 450, alt: 'Detalhe do revestimento e das costuras de um banco de couro.' },
  { src: '/assets/galeria-polimento.webp', width: 600, height: 750, alt: 'Profissional polindo a pintura de um carro branco.' },
  { src: '/assets/galeria-protecao.webp', width: 600, height: 750, alt: 'Gotas de água sobre a superfície de um carro branco.' },
  { src: '/assets/galeria-lavagem.webp', width: 600, height: 750, alt: 'Aplicação de produto de limpeza em uma esponja azul para lavar um carro.' },
  { src: '/assets/galeria-painel.webp', width: 600, height: 450, alt: 'Limpeza do painel de um carro com um pano de microfibra.' },
  { src: '/assets/galeria-espuma.webp', width: 600, height: 450, alt: 'Espuma sobre o capô de um carro durante a lavagem.' },
]

export const developers = [
  {
    initials: 'EG',
    avatar: 'https://avatars.githubusercontent.com/Edu4rdo-Gobatto?s=256',
    name: 'Eduardo Gobatto',
    role: 'Front-end e back-end',
    instagram: 'https://instagram.com/e.gobatto/',
    instagramLabel: '@e.gobatto',
    github: 'https://github.com/Edu4rdo-Gobatto',
    accent: 'red',
  },
  {
    initials: 'FR',
    avatar: 'https://avatars.githubusercontent.com/SHURIKA6?s=256',
    name: 'Fernando Riad',
    role: 'Front-end e back-end',
    instagram: 'https://instagram.com/_riad777/',
    instagramLabel: '@_riad777',
    github: 'https://github.com/SHURIKA6',
    accent: 'gold',
  },
]
