import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8')

test('outline hash jumps use the existing Animate.css library', () => {
  const pkg = JSON.parse(read('package.json'))
  const deps = { ...pkg.dependencies, ...pkg.devDependencies }

  assert.ok(deps['animate.css'], 'expected Animate.css to remain installed (subset generation source)')
  assert.match(
    read('docs/.vitepress/theme/index.ts'),
    /import ['"]\.\/vendor\/animate\/animate-subset\.min\.css['"]/,
    'expected the Animate.css subset to be loaded by the theme'
  )

  const motion = read('docs/.vitepress/theme/outline-jump-motion.ts')
  assert.match(motion, /animate__fadeOut/, 'expected outline jumps to fade out with Animate.css')
  assert.match(motion, /animate__fadeIn/, 'expected outline jumps to fade in with Animate.css')
})

test('right-side outline clicks are attached to the page transition lifecycle', () => {
  const pageTransition = read('docs/.vitepress/theme/components/PageTransition.vue')

  assert.match(
    pageTransition,
    /createOutlineJumpMotion/,
    'expected PageTransition to create the outline jump motion helper'
  )
  assert.match(
    pageTransition,
    /outlineJumpMotion\.attach/,
    'expected PageTransition to attach outline jump listeners on mount'
  )
  assert.match(
    pageTransition,
    /detachOutlineJumpMotion\?\.\(\)/,
    'expected PageTransition to detach outline jump listeners on unmount'
  )
})

test('outline panel is only independent during right-side outline jumps', () => {
  const motion = read('docs/.vitepress/theme/outline-jump-motion.ts')
  const transitions = read('docs/.vitepress/theme/style/transitions.css')

  assert.match(
    motion,
    /MOTION_TARGET_SELECTOR = ['"]\.VPDoc \.main['"]/,
    'expected outline hash fade to target only the document main area'
  )
  assert.doesNotMatch(
    motion,
    /MOTION_TARGET_SELECTOR = ['"]\.VPDoc \.content['"]/,
    'outline hash fade should not include the aside container'
  )
  assert.doesNotMatch(
    transitions,
    /doc-aside/,
    'page-level animations should keep the document and right-side outline bound together'
  )
  assert.doesNotMatch(
    transitions,
    /\.VPDoc \.aside[\s\S]{0,120}view-transition-name/,
    'the right-side outline should not be globally extracted from page transitions'
  )
})
