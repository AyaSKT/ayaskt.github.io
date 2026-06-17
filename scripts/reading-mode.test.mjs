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

test('ReadingModeControl owns route, frontmatter, viewport, and session-only state', () => {
  const source = read('docs/.vitepress/theme/components/ReadingModeControl.vue')

  assert.match(source, /useData\(\)/, 'component should read VitePress frontmatter and page data')
  assert.match(source, /useRoute\(\)/, 'component should react to route changes')
  assert.match(source, /readingMode\s*!==\s*false/, 'frontmatter should default to enabled and allow readingMode: false')
  assert.match(source, /route\.path\s*===\s*'\/'/, 'homepage should be handled explicitly')
  assert.match(source, /route\.path\s*===\s*'\/index\.html'/, 'index.html homepage route should be handled')
  assert.match(source, /matchMedia\('\(orientation: portrait\)'\)/, 'portrait orientation should disable the control')
  assert.match(source, /active\s*=\s*ref\(false\)/, 'reading state should be in-memory for refresh reset')
  assert.doesNotMatch(source, /localStorage|sessionStorage/, 'reading mode must not persist through refresh')
})

test('ReadingModeControl applies the agreed root classes and feedback messages', () => {
  const source = read('docs/.vitepress/theme/components/ReadingModeControl.vue')

  assert.match(source, /reading-mode-active/)
  assert.match(source, /reading-mode-nav-visible/)
  assert.match(source, /reading-mode-sidebar-visible/)
  assert.match(source, /reading-mode-aside-visible/)
  assert.match(source, /这里似乎没有可以隐藏的内容\.\.\./)
  assert.match(source, /本页未启用纯净阅读模式/)
  assert.match(source, /HIDE_DELAY_MS\s*=\s*300/, 'hover leave delay should be 0.3s')
  assert.match(source, /aria-pressed/)
  assert.match(source, /aria-label/)
  assert.match(source, /fill="currentColor"/, 'book icon should inherit nav color')
})
