import assert from 'node:assert/strict'
import test from 'node:test'
import {
  ADDRESS,
  PHONE,
  WHATSAPP_URL,
  serviceGroups,
} from './landing-content.js'

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
