import assert from 'node:assert/strict'
import test from 'node:test'
import { resolvePage } from './route.js'

test('a rota de desenvolvedores abre a página de créditos', () => {
  assert.equal(resolvePage('/desenvolvedores'), 'developers')
  assert.equal(resolvePage('/desenvolvedores/'), 'developers')
})

test('rotas desconhecidas continuam abrindo a landing principal', () => {
  assert.equal(resolvePage('/'), 'landing')
  assert.equal(resolvePage('/qualquer-coisa'), 'landing')
})
