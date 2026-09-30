import assert from 'node:assert/strict'
import test from 'node:test'
import { escapeHtmlAttribute, getPublicationOrigin, serializeJsonLd } from './seo.js'

test('atributos HTML não permitem fechar o atributo e injetar marcação', () => {
  assert.equal(escapeHtmlAttribute('"/><script>alert(1)</script>&'), '&quot;/&gt;&lt;script&gt;alert(1)&lt;/script&gt;&amp;')
})
test('JSON-LD não permite encerrar a tag script', () => {
  const encoded = serializeJsonLd({ name: '</script><script>alert(1)</script>' })
  assert.equal(encoded.includes('<'), false)
  assert.deepEqual(JSON.parse(encoded), { name: '</script><script>alert(1)</script>' })
})
test('JSON-LD preserva texto com acentos, aspas e caracteres especiais', () => {
  const payload = { name: 'Estética "Roger" & proteção', value: '<>&' }
  assert.deepEqual(JSON.parse(serializeJsonLd(payload)), payload)
})
test('origem sem configuração não inventa domínio e SITE_URL tem prioridade', () => {
  assert.equal(getPublicationOrigin({}), '')
  assert.equal(getPublicationOrigin({ VERCEL_PROJECT_PRODUCTION_URL: 'example.test' }), 'https://example.test')
  assert.equal(getPublicationOrigin({ SITE_URL: 'https://roger.example.test/', VERCEL_PROJECT_PRODUCTION_URL: 'example.test' }), 'https://roger.example.test')
})
for (const [name, url] of Object.entries({ http: 'http://example.test', caminho: 'https://example.test/admin', credenciais: 'https://user:password@example.test', query: 'https://example.test/?token=abc', fragmento: 'https://example.test/#inicio' })) {
  test(`origem rejeita ${name}`, () => assert.throws(() => getPublicationOrigin({ SITE_URL: url })))
}
