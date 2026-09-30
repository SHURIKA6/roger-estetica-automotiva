import assert from 'node:assert/strict'
import test from 'node:test'
import { resolvePage } from './route.js'

test('a rota de desenvolvedores abre a página de créditos', () => {
  assert.equal(resolvePage('/devs'), 'developers')
  assert.equal(resolvePage('/devs/'), 'developers')
})

test('rotas desconhecidas mostram a página não encontrada', () => {
  assert.equal(resolvePage('/'), 'landing')
  assert.equal(resolvePage('/qualquer-coisa'), 'not-found')
  // O endereço antigo é redirecionado pela hospedagem antes da renderização.
  assert.equal(resolvePage('/desenvolvedores'), 'not-found')
})
