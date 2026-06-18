import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function assertTokenDefined(css, token) {
  assert.match(css, new RegExp(`(^|\\n)\\s*${escapeRegExp(token)}\\s*:`), `${token} should be defined`)
}

function getRuleBody(css, selector) {
  const rulePattern = /([^{}]+)\{([^{}]*)\}/g

  for (const match of css.matchAll(rulePattern)) {
    const selectors = match[1].split(',').map((part) => part.trim())
    if (selectors.includes(selector)) return match[2]
  }

  assert.fail(`${selector} rule should exist`)
}

test('theme imports flat surface tokens before material consumers', () => {
  const css = read('docs/.vitepress/theme/style/index.css')
  const surfaceImport = css.indexOf("@import './surface.css';")
  const blurImport = css.indexOf("@import './blur.css';")
  const navImport = css.indexOf("@import './nav-tabs.css';")

  assert.notEqual(surfaceImport, -1, 'index.css should import surface.css')
  assert.notEqual(blurImport, -1, 'index.css should import blur.css')
  assert.notEqual(navImport, -1, 'index.css should import nav-tabs.css')
  assert.ok(surfaceImport < blurImport, 'surface tokens should load before blur.css')
  assert.ok(surfaceImport < navImport, 'surface tokens should load before nav-tabs.css')
})

test('surface token file uses flat frosted vocabulary', () => {
  const css = read('docs/.vitepress/theme/style/surface.css')

  for (const token of [
    '--aya-surface-bg',
    '--aya-surface-bg-strong',
    '--aya-surface-bg-soft',
    '--aya-surface-bg-hover',
    '--aya-surface-bg-active',
    '--aya-surface-border',
    '--aya-frosted-blur-lg',
    '--aya-frosted-blur-md',
    '--aya-frosted-blur-sm',
    '--aya-shadow-card-feather',
    '--aya-shadow-card-depth',
    '--aya-shadow-nav',
    '--aya-shadow-menu',
    '--aya-shadow-sidebar-window',
    '--aya-search-mark-bg',
    '--aya-surface-inverse-bg',
  ]) {
    assertTokenDefined(css, token)
  }

  assert.doesNotMatch(css, /liquid|glass|highlight/i, 'surface.css should not use old material vocabulary')
  assert.doesNotMatch(css, /linear-gradient\(135deg,\s*rgb\(255 255 255/i, 'surface.css should not define directional white reflection layers')
})

test('global material styles no longer expose old reflection tokens', () => {
  const files = [
    'docs/.vitepress/theme/style/blur.css',
    'docs/.vitepress/theme/style/nav-tabs.css',
    'docs/.vitepress/theme/style/sidebar-window.css',
    'docs/.vitepress/theme/style/reading-mode.css',
  ]

  for (const file of files) {
    const source = read(file)
    assert.doesNotMatch(source, /--aya-[\w-]*(?:liquid|glass|highlight)[\w-]*/i, `${file} should not define or consume old material token names`)
    assert.doesNotMatch(source, /linear-gradient\(135deg,\s*rgb\(255 255 255/i, `${file} should not contain directional white reflection gradients`)
  }
})

test('content component surfaces no longer use reflection variables', () => {
  const files = [
    'docs/.vitepress/theme/components/MindMap.vue',
    'docs/.vitepress/theme/components/CourseIndex.vue',
    'docs/.vitepress/theme/components/SongCard.vue',
  ]

  for (const file of files) {
    const source = read(file)
    assert.doesNotMatch(source, /--(?:mind-map|course-index|song-card)-[\w-]*highlight/i, `${file} should not use highlight variables for surface reflection`)
    assert.doesNotMatch(source, /linear-gradient\(135deg,\s*rgb\(255 255 255/i, `${file} should not contain directional white reflection gradients`)
  }
})

test('reading mode keeps the live frosted navbar behavior', () => {
  const css = read('docs/.vitepress/theme/style/reading-mode.css')
  const hiddenNavBody = getRuleBody(css, 'html.reading-mode-active .VPNavBar')
  const visibleTopZoneBody = getRuleBody(css, 'html.reading-mode-nav-visible .reading-mode-top-zone')

  assert.match(hiddenNavBody, /(^|\n)\s*opacity:\s*0\.001;/)
  assert.match(hiddenNavBody, /(^|\n)\s*visibility:\s*visible;/)
  assert.match(css, /will-change:\s*backdrop-filter, opacity;/)
  assert.match(visibleTopZoneBody, /(^|\n)\s*pointer-events:\s*none;/)
})
