import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8')

test('custom entry files exist with expected exports', () => {
  assert.match(read('docs/.vitepress/theme/custom/components.ts'), /export const customComponents/)
  assert.match(read('docs/.vitepress/theme/custom/slots.ts'), /export const customSlots/)
  assert.match(read('docs/.vitepress/theme/custom/enhance.ts'), /export function customEnhanceApp/)
  assert.equal(fs.existsSync(path.join(root, 'docs/.vitepress/theme/custom/tokens.css')), true)
})

test('theme index wires the custom entries', () => {
  const index = read('docs/.vitepress/theme/index.ts')

  assert.match(index, /import ['"]\.\/custom\/tokens\.css['"]/, 'tokens.css should be imported')
  assert.match(
    index,
    /import ['"]\.\/custom\.css['"][\s\S]*import ['"]\.\/custom\/tokens\.css['"]/,
    'tokens.css must be imported after custom.css so overrides win'
  )
  assert.match(index, /customComponents/, 'custom components should be registered')
  assert.match(index, /customEnhanceApp\(ctx\)/, 'custom enhanceApp hook should be called')
})

test('MyLayout renders custom slots including passthrough', () => {
  const layout = read('docs/.vitepress/theme/components/MyLayout.vue')

  assert.match(layout, /import \{ customSlots \} from '\.\.\/custom\/slots'/)
  assert.match(layout, /passthroughSlots/)
  assert.match(layout, /#\[name\]/, 'unowned slots should pass through by dynamic slot name')
  for (const name of ['layout-top', 'nav-bar-content-after', 'doc-after', 'home-hero-info-after', 'home-hero-image']) {
    assert.match(layout, new RegExp(`slotComponents\\('${name}'\\)`), `${name} should append custom components`)
  }
})

test('frontmatter switches are honored', () => {
  const layout = read('docs/.vitepress/theme/components/MyLayout.vue')
  const config = read('docs/.vitepress/config.mts')

  assert.match(layout, /frontmatter\.comments !== false/)
  assert.match(layout, /frontmatter\.backToTop !== false/)
  assert.match(config, /frontmatter\.docMeta === false/)
  assert.match(config, /frontmatter\.pdf === false/)
})

test('JS motion is driven by CSS tokens with matching fallbacks', () => {
  const tokens = read('docs/.vitepress/theme/motion-tokens.ts')
  assert.match(tokens, /export function readMotionDuration/)
  assert.match(tokens, /export function readMotionEasing/)

  const varCss = read('docs/.vitepress/theme/style/var.css')
  for (const token of [
    '--dur-solution', '--ease-solution', '--dur-sidebar-collapse',
    '--dur-sidebar-indicator', '--dur-outline-out', '--dur-outline-in', '--ripple-size',
  ]) {
    assert.match(varCss, new RegExp(`${token}:`), `${token} should be declared in var.css`)
  }

  assert.match(read('docs/.vitepress/theme/solution-collapse.ts'), /readMotionDuration\('--dur-solution'/)
  assert.match(read('docs/.vitepress/theme/solution-collapse.ts'), /readMotionEasing\('--ease-solution'/)
  assert.match(read('docs/.vitepress/theme/sidebar-motion.ts'), /readMotionDuration\('--dur-sidebar-collapse'/)
  assert.match(read('docs/.vitepress/theme/outline-jump-motion.ts'), /readMotionDuration\('--dur-outline-out'/)
  assert.match(read('docs/.vitepress/theme/outline-jump-motion.ts'), /readMotionDuration\('--dur-outline-in'/)
  assert.match(read('docs/.vitepress/theme/style/sidebar-window.css'), /var\(--dur-sidebar-indicator/)
  assert.match(read('docs/.vitepress/theme/style/transitions.css'), /var\(--ripple-size/)
})

test('customization spec documents every interface', () => {
  const spec = read('CUSTOMIZATION.md')

  for (const section of [
    'tokens.css', 'components.ts', 'slots.ts', 'enhance.ts',
    '--dur-solution', 'vt-transition-done', 'vt-show-sidebar',
    'generate-motion-css-subsets', 'comments: false', 'docMeta: false',
  ]) {
    assert.ok(spec.includes(section), `CUSTOMIZATION.md should mention ${section}`)
  }
})
