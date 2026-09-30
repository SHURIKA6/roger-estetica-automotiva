import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import test from 'node:test'
import {
  ADDRESS,
  galleryPhotos,
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
    'Hidratação de bancos de couro',
    'Polimento',
    'Espelhamento',
  ])
})

test('cada serviço aponta para uma foto existente em public/assets', () => {
  for (const service of serviceGroups.flatMap((group) => group.services)) {
    assert.ok(existsSync(new URL(`../public${service.image}`, import.meta.url)), service.name)
  }
})

test('usa o contato confirmado para os CTAs da landing', () => {
  assert.equal(PHONE, '5566996126664')
  assert.equal(ADDRESS.street, 'Rua dos Guapuruvús, 366')
  assert.match(WHATSAPP_URL, /^https:\/\/wa\.me\/5566996126664\?text=/)
})

test('o telefone exibido corresponde ao número usado nos links', () => {
  assert.equal(`55${PHONE_DISPLAY.replace(/\D/g, '')}`, PHONE)
})

test('galeria oferece dez fotos distintas com arquivos locais e descrições', () => {
  assert.equal(galleryPhotos.length, 10)
  assert.equal(new Set(galleryPhotos.map(photo => photo.src)).size, 10)
  for (const photo of galleryPhotos) {
    assert.ok(existsSync(new URL(`../public${photo.src}`, import.meta.url)), photo.src)
    assert.ok(photo.alt.trim())
    assert.ok(photo.width > 0 && photo.height > 0)
  }
})
