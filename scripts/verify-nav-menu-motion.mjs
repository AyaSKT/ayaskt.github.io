import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('desktop nav flyouts are wired to AnimXYZ for open and close motion', () => {
  const motion = read('docs/.vitepress/theme/components/LibraryMotion.vue')
  const css = read('docs/.vitepress/theme/style/library-motion.css')
  const index = read('docs/.vitepress/theme/style/index.css')

  assert.match(index, /vendor\/animxyz\/animxyz-subset\.min\.css/, 'the AnimXYZ subset should be imported globally')
  assert.match(motion, /const NAV_MENU_XYZ = 'fade small-2 up-1/, 'nav flyouts should declare an AnimXYZ recipe')
  assert.match(motion, /function enhanceNavFlyouts\(\)/, 'LibraryMotion should enhance generated VitePress flyouts')
  assert.match(motion, /MutationObserver/, 'flyouts should react to aria-expanded changes')
  assert.match(motion, /const NAV_MENU_CLOSE_DELAY_FALLBACK = 50/, 'nav flyouts should define a 0.05s close-delay fallback')
  assert.match(motion, /getPropertyValue\('--dur-menu-close-delay'\)/, 'nav close delay should be sourced from the theme duration token')
  assert.match(motion, /getPropertyValue\('--dur-menu-out'\)/, 'nav close finalization should wait for the existing exit duration')
  assert.match(motion, /forceCloseOtherNavMenus\(menu\)/, 'opening one flyout should instantly force-close the others (no overlap)')
  assert.match(motion, /aria-expanded', 'false'/, 'force-close should reset the other buttons aria-expanded')
  assert.match(motion, /window\.setTimeout\([\s\S]*getNavMenuCloseDelay\(flyout\)/, 'nav flyouts should delay close after pointer leave')
  assert.match(motion, /setNavMenuClosing\(menu\)/, 'nav flyouts should enter a closing state before being hidden')
  assert.match(motion, /menu\.dataset\.ayaNavMenuState = 'closing'[\s\S]*menu\.classList\.add\('xyz-out'\)/, 'closing state should play the original xyz-out exit animation')
  assert.match(motion, /setNavMenuState\(menu, false, false\)/, 'nav flyouts should hide only after the exit animation has had time to run')
  assert.match(motion, /clearCloseTimer/, 'nav flyouts should cancel delayed close when reopened')
  assert.match(motion, /clearCloseAnimationTimer/, 'nav flyouts should cancel in-progress close animation finalization when reopened')
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
  assert.match(vars, /--dur-menu-close-delay: 0\.05s;/, 'close delay token should be defined')
  assert.match(navTabs, /visibility 0s linear var\(--dur-menu-out\)/, 'hidden state should delay visibility until close motion ends')
  assert.match(navTabs, /opacity var\(--dur-menu-out\)/, 'fallback close should transition opacity')

  const flyoutSection = navTabs.slice(
    navTabs.indexOf('.VPNavBar .VPFlyout > .menu {'),
    navTabs.indexOf('.VPNavBar .VPMenu {')
  )
  assert.doesNotMatch(flyoutSection, /transform|isolation:\s*isolate/, 'the glass layer must never carry a transform / isolation state (degrades backdrop-filter to tint-only)')
  assert.match(flyoutSection, /backdrop-filter: var\(--aya-nav-menu-frosted-blur\)/, 'the frosted glass should live on the outer floating layer, not the inner panel')

  assert.match(navTabs, /menu\[data-aya-nav-menu-state="open"\]/, 'delayed close should keep the panel visible while the open state is held')
  assert.match(navTabs, /menu\[data-aya-nav-menu-state="closing"\][\s\S]*visibility: visible/, 'closing state should stay visible while the exit animation plays')
  assert.match(navTabs, /menu\[data-aya-nav-menu-state="closed"\][\s\S]*transition: none !important/, 'closed state should hide immediately after the exit animation finishes')
  assert.match(css, /prefers-reduced-motion: reduce[\s\S]*\.VPNavBar \.VPFlyout > \.menu\.aya-nav-menu-motion/, 'reduced motion should disable nav flyout animations')
})
