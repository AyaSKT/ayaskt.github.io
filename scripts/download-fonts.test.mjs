import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'

function offlineFixture(t) {
  const root = mkdtempSync(join(tmpdir(), 'gp-blogs-fonts-'))
  t.after(() => rmSync(root, { recursive: true, force: true }))
  mkdirSync(join(root, 'scripts'))
  const script = join(root, 'scripts/download-fonts.mjs')
  copyFileSync(new URL('./download-fonts.mjs', import.meta.url), script)

  const fetchStub = join(root, 'offline.mjs')
  const requests = join(root, 'network-requests.txt')
  writeFileSync(fetchStub, `
    import { appendFileSync } from 'node:fs'
    globalThis.fetch = async (url) => {
      appendFileSync(${JSON.stringify(requests)}, String(url) + '\\n')
      throw new TypeError('fetch failed', {
        cause: Object.assign(new Error('TLS connection reset'), { code: 'ECONNRESET' }),
      })
    }
  `)

  const fontsDir = join(root, 'docs/public/fonts')
  return {
    fontsDir,
    cssPath: join(fontsDir, 'fonts.css'),
    requests,
    run: (...args) => spawnSync(process.execPath, ['--import', fetchStub, script, ...args], {
      cwd: root,
      encoding: 'utf8',
      timeout: 10_000,
    }),
  }
}

test('offline dev keeps cached fonts without making network requests', (t) => {
  const fixture = offlineFixture(t)
  mkdirSync(fixture.fontsDir, { recursive: true })
  const css = "@font-face { font-family: 'Noto Sans SC'; src: url(/fonts/cached.woff2); }\n"
  writeFileSync(fixture.cssPath, css)
  writeFileSync(join(fixture.fontsDir, 'cached.woff2'), 'cached font')

  const result = fixture.run('--offline')

  assert.equal(result.status, 0, result.stderr)
  assert.equal(existsSync(fixture.requests), false)
  assert.equal(readFileSync(fixture.cssPath, 'utf8'), css)
  assert.equal(readFileSync(join(fixture.fontsDir, 'cached.woff2'), 'utf8'), 'cached font')
})

test('offline dev on a fresh checkout creates a fallback stylesheet without downloading', (t) => {
  const fixture = offlineFixture(t)
  const result = fixture.run('--offline')

  assert.equal(result.status, 0, result.stderr)
  assert.equal(existsSync(fixture.requests), false)
  const css = readFileSync(fixture.cssPath, 'utf8')
  assert.ok(css.trim())
  assert.doesNotMatch(css, /@font-face|@import|url\(/)

  const secondRun = fixture.run('--offline')
  assert.equal(secondRun.status, 0, secondRun.stderr)
  assert.equal(readFileSync(fixture.cssPath, 'utf8'), css)
  assert.equal(existsSync(fixture.requests), false)
})

test('the default download used by production still fails when Google Fonts is unreachable', (t) => {
  const fixture = offlineFixture(t)
  const result = fixture.run()

  assert.equal(result.status, 1)
  assert.match(result.stderr, /ECONNRESET/)
  assert.match(readFileSync(fixture.requests, 'utf8'), /fonts\.googleapis\.com/)
  assert.equal(existsSync(fixture.cssPath), false)
})
