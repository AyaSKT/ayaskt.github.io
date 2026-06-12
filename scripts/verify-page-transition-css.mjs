import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8')

test('route view transitions do not create named navbar snapshots', () => {
  const css = read('docs/.vitepress/theme/style/transitions.css')

  assert.doesNotMatch(
    css,
    /\.VPNavBar\s*{[^}]*view-transition-name:/s,
    'navbar should remain in the root snapshot instead of using a separate named View Transition layer'
  )

  assert.doesNotMatch(
    css,
    /\.VPLocalNav\s*{[^}]*view-transition-name:/s,
    'local nav should remain in the root snapshot instead of using a separate named View Transition layer'
  )

  assert.doesNotMatch(
    css,
    /::view-transition-(?:old|new)\((?:nav-bar|local-nav)\)/,
    'route transitions should not animate navbar/local-nav named snapshots'
  )

  assert.match(
    css,
    /html:has\(\.VPDoc\) \.VPSidebar\s*{[^}]*view-transition-name:\s*sidebar/s,
    'sidebar should stay as the only named layout element for route transitions'
  )
})

test('document body motion is isolated from the root snapshot', () => {
  const css = read('docs/.vitepress/theme/style/transitions.css')

  assert.match(
    css,
    /html\.vt-(?:from|to)-doc-content \.VPDoc > \.container > \.content\s*{[^}]*view-transition-name:\s*doc-content/s,
    'only the direct VPDoc content column should be the named View Transition element for body motion'
  )

  assert.doesNotMatch(
    css,
    /html\.vt-(?:from|to)-doc-content \.VPDoc \.content\s*{/s,
    'doc-content naming must not use the broad .VPDoc .content selector because it also matches the right outline content'
  )

  assert.match(
    css,
    /html\.vt-doc-content-transition::view-transition-new\(doc-content\)\s*{[^}]*animation:\s*docFadeInRightShort/s,
    'new doc content should fade in from the right without moving the navbar root'
  )

  assert.match(
    css,
    /html\.vt-doc-to-contentless::view-transition-old\(doc-content\)\s*{[^}]*animation:\s*docFadeOutRightShort/s,
    'old doc content should fade out to the right when the target page has no article body'
  )

  assert.doesNotMatch(
    css,
    /html\.vt-(?:home-to-doc|doc-to-doc)::view-transition-new\(root\)\s*{[^}]*docFadeInRightShort/s,
    'root snapshots must not use the horizontal doc-content entrance animation'
  )
})

test('document body snapshots render above the root snapshot', () => {
  const css = read('docs/.vitepress/theme/style/transitions.css')

  assert.match(
    css,
    /::view-transition-group\(root\)\s*{[^}]*z-index:\s*0/s,
    'root snapshot should stay behind named content snapshots'
  )

  assert.match(
    css,
    /html\.vt-doc-content-transition::view-transition-group\(doc-content\)\s*{[^}]*z-index:\s*1/s,
    'doc-content snapshot should render above the root snapshot so its horizontal fade remains visible'
  )

  assert.match(
    css,
    /html\.vt-doc-content-transition::view-transition-(?:old|new)\(doc-content\)\s*{[^}]*mix-blend-mode:\s*normal/s,
    'doc-content snapshots should not disappear through default view-transition blending'
  )
})

test('page transition swaps doc-content naming around the route update', () => {
  const pageTransition = read('docs/.vitepress/theme/components/PageTransition.vue')

  assert.match(
    pageTransition,
    /function hasArticleContent\(/,
    'PageTransition should classify article-body pages separately from contentless pages'
  )

  assert.match(
    pageTransition,
    /classList\.toggle\('vt-from-doc-content',\s*fromArticleContent\)/,
    'old article content should be named before startViewTransition captures the old snapshot'
  )

  assert.match(
    pageTransition,
    /classList\.remove\('vt-from-doc-content'\)[\s\S]*await originalGo\(to, options\)[\s\S]*classList\.toggle\('vt-to-doc-content',\s*toArticleContent\)/,
    'the old doc-content name should be removed before navigation and the new one added after route data updates'
  )

  assert.match(
    pageTransition,
    /classList\.toggle\('vt-doc-to-contentless',\s*fromArticleContent && !toArticleContent\)/,
    'doc-to-contentless routes should get a dedicated class for the rightward exit animation'
  )
})
