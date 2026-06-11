import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('desktop nav flyouts are wired to AnimXYZ for open and close motion', () => {
  const motion = read('docs/.vitepress/theme/components/LibraryMotion.vue')
  const css = read('docs/.vitepress/theme/style/library-motion.css')
  const index = read('docs/.vitepress/theme/style/index.css')

  assert.match(index, /vendor\/animxyz\/animxyz\.min\.css/, 'AnimXYZ should be imported globally')
  assert.match(motion, /const NAV_MENU_XYZ = 'fade small-2 up-1/, 'nav flyouts should declare an AnimXYZ recipe')
  assert.match(motion, /function enhanceNavFlyouts\(\)/, 'LibraryMotion should enhance generated VitePress flyouts')
  assert.match(motion, /MutationObserver/, 'flyouts should react to aria-expanded changes')
  assert.match(motion, /aya-nav-menu-motion/, 'flyout panels should receive a dedicated motion class')
  assert.match(motion, /xyz-in/, 'flyouts should animate into the open state')
  assert.match(motion, /xyz-out/, 'flyouts should animate out when closing')
  assert.doesNotMatch(motion, /flyout\.contains\(document\.activeElement\)/, 'focus alone should not keep a clicked flyout in the open state')

  assert.match(css, /\.VPNavBar \.VPFlyout > \.menu\.aya-nav-menu-motion/, 'motion CSS should target enhanced nav flyouts')
  assert.match(css, /--xyz-out-duration: var\(--dur-menu-out/, 'close motion should have an explicit duration')
  assert.doesNotMatch(css, /VPFlyout[\s\S]{0,120}animation: fadeIn/, 'flyouts should not rely on a one-way fadeIn only')
})

test('nav menu fallback CSS keeps the panel visible long enough to close smoothly', () => {
  const navTabs = read('docs/.vitepress/theme/style/nav-tabs.css')
  const vars = read('docs/.vitepress/theme/style/var.css')
  const css = read('docs/.vitepress/theme/style/library-motion.css')

  assert.match(vars, /--dur-menu-out: 0\.22s;/, 'close duration token should be defined')
  assert.match(navTabs, /visibility 0s linear var\(--dur-menu-out\)/, 'hidden state should delay visibility until close motion ends')
  assert.match(navTabs, /opacity var\(--dur-menu-out\)/, 'fallback close should transition opacity')
  assert.match(navTabs, /transform var\(--dur-menu-out\)/, 'fallback close should transition transform')
  assert.match(css, /prefers-reduced-motion: reduce[\s\S]*\.VPNavBar \.VPFlyout > \.menu\.aya-nav-menu-motion/, 'reduced motion should disable nav flyout animations')
})
