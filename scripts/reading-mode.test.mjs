import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('reading mode control is mounted through the VitePress nav slot', () => {
  const layout = read('docs/.vitepress/theme/components/MyLayout.vue')

  assert.match(layout, /import ReadingModeControl from ['"]\.\/ReadingModeControl\.vue['"]/)
  assert.match(layout, /<template #nav-bar-content-after>\s*<ReadingModeControl\s*\/>\s*<\/template>/)
})

test('reading mode stylesheet is imported by the theme', () => {
  const css = read('docs/.vitepress/theme/style/index.css')

  assert.match(css, /@import ['"]\.\/reading-mode\.css['"];/)
})

test('package exposes a focused reading mode contract test', () => {
  const pkg = JSON.parse(read('package.json'))

  assert.equal(pkg.scripts['test:reading-mode'], 'node --test scripts/reading-mode.test.mjs')
})
