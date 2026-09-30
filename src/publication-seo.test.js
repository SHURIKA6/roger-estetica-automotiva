import assert from 'node:assert/strict'
import test from 'node:test'
import { getPublicationSeo } from './seo.js'

const production = { SITE_URL: 'https://roger.example.test', VERCEL_ENV: 'production' }
const locations = sitemap => [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1])

test('produção permite indexar a home e /devs, mantendo a 404 com noindex', () => {
  const seo = getPublicationSeo(production)
  assert.equal(seo.indexable, true)
  assert.deepEqual(seo.routes.map(({ path, robots }) => ({ path, robots })), [
    { path: '/', robots: 'index, follow, max-image-preview:large' },
    { path: '/404.html', robots: 'noindex, follow' },
    { path: '/devs', robots: 'index, follow, max-image-preview:large' },
  ])
})

test('sitemap de produção contém apenas a home e /devs na origem canônica', () => {
  const seo = getPublicationSeo(production)
  assert.deepEqual(locations(seo.sitemap), [
    'https://roger.example.test/',
    'https://roger.example.test/devs',
  ])
})

test('robots permite /devs explicitamente e anuncia o sitemap absoluto em produção', () => {
  const seo = getPublicationSeo(production)
  assert.equal(seo.robots, 'User-agent: *\nAllow: /\nAllow: /devs\n\nSitemap: https://roger.example.test/sitemap.xml\n')
})

test('llms de produção apresenta o link canônico dos créditos, os dois nomes e funções', () => {
  const seo = getPublicationSeo(production)
  assert.match(seo.llms, /\[Desenvolvedores\]\(https:\/\/roger\.example\.test\/devs\)/)
  assert.match(seo.llms, /Eduardo Gobatto: Front-end e back-end/)
  assert.match(seo.llms, /Fernando Riad: Front-end e back-end/)
})

test('preview permanece noindex mesmo quando possui uma origem de produção', () => {
  const seo = getPublicationSeo({ ...production, VERCEL_ENV: 'preview' })
  assert.equal(seo.indexable, false)
  assert.equal(seo.origin, 'https://roger.example.test')
  assert.ok(seo.routes.every(route => route.robots === 'noindex, follow'))
  assert.deepEqual(locations(seo.sitemap), [])
  assert.doesNotMatch(seo.robots, /Sitemap:/)
})

test('build local sem origem não inventa domínio nem permite indexação', () => {
  const seo = getPublicationSeo({})
  assert.equal(seo.indexable, false)
  assert.equal(seo.origin, '')
  assert.ok(seo.routes.every(route => route.robots === 'noindex, follow'))
  assert.deepEqual(locations(seo.sitemap), [])
  assert.doesNotMatch(seo.robots, /Sitemap:/)
  assert.match(seo.llms, /\[Desenvolvedores\]\(\/devs\)/)
})

test('build local com origem e sem VERCEL_ENV preserva a indexação', () => {
  const seo = getPublicationSeo({ SITE_URL: 'https://roger.example.test/' })
  assert.equal(seo.indexable, true)
  assert.deepEqual(locations(seo.sitemap), ['https://roger.example.test/', 'https://roger.example.test/devs'])
  assert.equal(seo.routes.find(route => route.path === '/devs').robots, 'index, follow, max-image-preview:large')
})

test('ambiente development da Vercel permanece com noindex', () => {
  const seo = getPublicationSeo({ ...production, VERCEL_ENV: 'development' })
  assert.equal(seo.indexable, false)
  assert.ok(seo.routes.every(route => route.robots === 'noindex, follow'))
  assert.deepEqual(locations(seo.sitemap), [])
})
