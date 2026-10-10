import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('reading mode control is mounted through the VitePress nav slot', () => {
  const layout = read('docs/.vitepress/theme/components/MyLayout.vue')

  assert.match(layout, /import ReadingModeControl from ['"]\.\/ReadingModeControl\.vue['"]/)
  // V6.12 起该插槽在 ReadingModeControl 之后追加渲染 custom/slots 的组件，
  // 因此只锁定「控件仍是插槽内第一个子节点」，不再要求插槽闭合标签紧邻其后。
  assert.match(
    layout,
    /<template #nav-bar-content-after>\s*<ReadingModeControl\s*\/>\s*<component/,
  )
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
  assert.match(source, /armedRegions/, 'hot zones should be armed deliberately after initial activation')
  assert.match(source, /armedRegions\.nav\s*=\s*false/, 'top zone should not immediately reveal navbar after clicking the button')
  assert.match(source, /function enterHotZone/, 'hot-zone entry should pass through arming logic')
  assert.match(source, /aria-pressed/)
  assert.match(source, /aria-label/)
  assert.match(source, /fill="currentColor"/, 'book icon should inherit nav color')
})

test('reading mode CSS hides portrait control and matches navbar frosted styling', () => {
  const css = read('docs/.vitepress/theme/style/reading-mode.css')

  assert.match(css, /\.VPNavBar \.reading-mode-control/)
  assert.match(css, /--aya-nav-tab-bg/)
  assert.match(css, /--aya-nav-tab-border/)
  assert.match(css, /--aya-nav-tab-frosted-blur/)
  assert.match(css, /--aya-nav-pill-frosted-blur/)
  assert.match(css, /@media \(orientation: portrait\)[\s\S]*\.reading-mode-control/)
  assert.match(css, /\.reading-mode-control\.is-active/)
  assert.match(css, /var\(--vp-c-text-1\)/, 'active state should invert against text color')
  assert.match(css, /var\(--vp-c-bg\)/, 'active state should invert against page background')
  assert.match(css, /@keyframes readingModeShake/)
})

test('reading mode CSS fades full surfaces and keeps navbar frosted blur live', () => {
  const css = read('docs/.vitepress/theme/style/reading-mode.css')

  assert.match(css, /html\.reading-mode-active \.VPNavBar\s*{[\s\S]*opacity:\s*0\.001;/, 'navbar should stay paintable at near-zero opacity')
  assert.match(css, /html\.reading-mode-active \.VPNavBar\s*{[\s\S]*visibility:\s*visible;/, 'navbar should not use visibility:hidden because it delays backdrop-filter rendering')
  assert.match(css, /html\.reading-mode-active \.VPNavBar \.VPNavBarAppearance,[\s\S]*will-change:\s*backdrop-filter, opacity;/, 'frosted nav pills should be kept in the compositor')
  assert.match(css, /html\.reading-mode-active\.reading-mode-nav-visible \.VPNavBar\s*{[\s\S]*opacity:\s*1;/)
  assert.match(css, /html\.reading-mode-active \.VPSidebar\s*{[\s\S]*opacity:\s*0;/)
  assert.match(css, /html\.reading-mode-active \.VPSidebar\s*{[\s\S]*animation:\s*none !important;/, 'sidebar entrance animation should not override reading-mode opacity')
  assert.match(css, /html\.reading-mode-active\.reading-mode-sidebar-visible \.VPSidebar\s*{[\s\S]*opacity:\s*1;/)
  assert.match(css, /html\.reading-mode-active \.VPDoc \.aside\s*{[\s\S]*opacity:\s*0;/)
  assert.match(css, /html\.reading-mode-active\.reading-mode-aside-visible \.VPDoc \.aside\s*{[\s\S]*opacity:\s*1;/)
  assert.doesNotMatch(css, /reading-mode-active[\s\S]{0,180}\.VPNavBar::before[\s\S]{0,120}opacity:\s*1/, 'navbar shadow should not be separately kept visible')
  assert.match(css, /\.reading-mode-top-zone/)
  assert.match(css, /\.reading-mode-sidebar-zone/)
  assert.match(css, /\.reading-mode-aside-zone/)
  assert.match(css, /html\.reading-mode-nav-visible \.reading-mode-top-zone,[\s\S]*pointer-events:\s*none;/, 'visible surfaces should receive clicks instead of their transparent zones')
  assert.match(css, /prefers-reduced-motion: reduce/)
})
