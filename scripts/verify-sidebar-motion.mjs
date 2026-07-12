import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8')

test('sidebar expand and collapse motion uses the existing Animate.css library', () => {
  const pkg = JSON.parse(read('package.json'))
  const deps = { ...pkg.dependencies, ...pkg.devDependencies }

  assert.ok(deps['animate.css'], 'expected Animate.css to remain installed (subset generation source)')
  assert.match(
    read('docs/.vitepress/theme/index.ts'),
    /import ['"]\.\/vendor\/animate\/animate-subset\.min\.css['"]/,
    'expected the Animate.css subset to be loaded by the theme'
  )
  assert.match(
    read('docs/.vitepress/theme/sidebar-motion.ts'),
    /animate__animated/,
    'expected sidebar motion helper to apply Animate.css classes during expand/collapse'
  )
})

test('sidebar motion helper is attached from the existing sidebar lifecycle', () => {
  const pageTransition = read('docs/.vitepress/theme/components/PageTransition.vue')

  assert.match(
    pageTransition,
    /attachSidebarMotion/,
    'expected PageTransition to attach sidebar motion near the existing sidebar observer'
  )
  assert.match(
    pageTransition,
    /detachSidebarMotion\?\.\(\)/,
    'expected PageTransition to detach sidebar motion on unmount'
  )
})

test('sidebar CSS keeps collapsing items paintable while Animate.css runs', () => {
  const css = read('docs/.vitepress/theme/style/sidebar-window.css')

  assert.match(
    css,
    /\.VPSidebarItem\.collapsed > \.items\[data-sidebar-motion]/,
    'expected collapsed sidebar items to stay paintable while Animate.css and height transitions run'
  )
})
