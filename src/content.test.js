import assert from 'node:assert/strict'
import test from 'node:test'
import {
  ADDRESS,
  featuredService,
  PHONE,
  PHONE_DISPLAY,
  serviceGroups,
  WHATSAPP_URL,
} from './content.js'

test('mantém os sete serviços públicos organizados por categoria', () => {
  const services = serviceGroups.flatMap((group) => group.services.map((service) => service.name))

  assert.deepEqual(services, [
    'Restauração de farol',
    'Micro pintura',
    'Vitrificação em pintura',
    'Cristalização com teflon',
    'Hidratação de bancos sem couro',
    'Polimento',
    'Espelhamento',
  ])
})

test('usa o contato confirmado para os CTAs da landing', () => {
  assert.equal(PHONE, '5566996126664')
  assert.equal(ADDRESS.street, 'Rua dos Guapuruvús, 366')
  assert.match(WHATSAPP_URL, /^https:\/\/wa\.me\/5566996126664\?text=/)
})

test('o telefone exibido corresponde ao número usado nos links', () => {
  assert.equal(`55${PHONE_DISPLAY.replace(/\D/g, '')}`, PHONE)
})

test('o serviço em destaque existe na lista pública', () => {
  const services = serviceGroups.flatMap((group) => group.services.map((service) => service.name))

  assert.ok(services.includes(featuredService))
})
