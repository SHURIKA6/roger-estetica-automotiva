export const MAPS_URL = 'https://maps.app.goo.gl/zEgB5ubvbBt3L4Wx6'
export const PHONE = '5566996126664'
export const ADDRESS = {
  street: 'Rua dos Guapuruvús, 366',
  neighborhood: 'Jardim das Violetas',
  city: 'Sinop/MT',
}

export const WHATSAPP_MESSAGE = 'Olá, Roger! Quero agendar um cuidado para o meu carro.'
export const WHATSAPP_URL = `https://wa.me/${PHONE}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

export const proofPoints = [
  { value: '7', label: 'serviços para cuidar do carro por inteiro' },
  { value: 'Sinop', label: 'atendimento local, perto de você' },
  { value: 'Direto', label: 'fale com a Roger pelo WhatsApp' },
]

export const journeySteps = [
  { number: '01', title: 'Conte o que seu carro precisa', copy: 'Mande uma mensagem e explique qual detalhe você quer recuperar ou proteger.' },
  { number: '02', title: 'Escolha o cuidado certo', copy: 'A Roger orienta o próximo passo entre recuperação, proteção e acabamento.' },
  { number: '03', title: 'Combine seu atendimento', copy: 'Agende pelo WhatsApp e leve seu carro para receber atenção de verdade.' },
]

export const serviceGroups = [
  {
    label: 'Recuperação',
    title: 'Devolver presença',
    copy: 'Para o que já viu dias melhores — e ainda pode voltar a chamar atenção.',
    services: [
      { name: 'Restauração de farol', detail: 'Mais transparência no olhar do carro e um acabamento que muda a primeira impressão.' },
      { name: 'Micro pintura', detail: 'Correções localizadas para devolver uniformidade aos detalhes da pintura.' },
    ],
  },
  {
    label: 'Proteção',
    title: 'Preservar o que importa',
    copy: 'Camadas de cuidado para a pintura, os bancos e tudo aquilo que você quer manter bonito.',
    services: [
      { name: 'Vitrificação em pintura', detail: 'Proteção e brilho profundo para a superfície da pintura.' },
      { name: 'Cristalização com teflon', detail: 'Um acabamento protegido, liso e com presença.' },
      { name: 'Hidratação de bancos sem couro', detail: 'Cuidado para bancos sem couro, com toque renovado e aparência mais uniforme.' },
    ],
  },
  {
    label: 'Acabamento',
    title: 'Fazer o detalhe aparecer',
    copy: 'O toque final que tira o carro do comum e faz cada linha ganhar luz.',
    services: [
      { name: 'Polimento', detail: 'Refino visual para recuperar brilho e valorizar a pintura.' },
      { name: 'Espelhamento', detail: 'Acabamento de alto brilho para uma presença que se percebe de longe.' },
    ],
  },
]
