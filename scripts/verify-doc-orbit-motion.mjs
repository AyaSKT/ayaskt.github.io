/** Run against docs:dev or docs:preview.
 * BASE=http://127.0.0.1:5199 PLAYWRIGHT_MODULE=/path/to/playwright/index.mjs node --test scripts/verify-doc-orbit-motion.mjs
 * Omit PLAYWRIGHT_MODULE when playwright is installed locally.
 */
import test from 'node:test'
import assert from 'node:assert/strict'

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright')
const base = process.env.BASE || 'http://localhost:5199'
const course = '/Y3S2/CCD/CCD-README'
// 作用在正文 / 目录文字 / 课程卡片本身的进场；VT 已负责整页进场，这些不能再播。
// 刻度、节点、轨道这类装饰允许在 VT 里重新描出。
const CONTENT_ANIMATIONS = ['doc-orbit-rise', 'doc-orbit-slide', 'doc-orbit-card', 'doc-orbit-fade']

async function withPage(options, run) {
  const browser = await chromium.launch()
  try {
    const page = await browser.newPage(options)
    const errors = []
    page.on('pageerror', error => errors.push(error.message))
    await page.addInitScript(() => {
      window.orbitEvents = []
      document.addEventListener('animationstart', event => {
        if (event.animationName.startsWith('doc-orbit-') || event.pseudoElement.includes('view-transition')) {
          window.orbitEvents.push({ name: event.animationName, pseudo: event.pseudoElement })
        }
      })
      window.addEventListener('vt-transition-done', () => window.orbitEvents.push({ name: 'VT-DONE' }))
    })
    await run(page)
    assert.deepEqual(errors, [], 'no browser runtime errors')
  } finally {
    await browser.close()
  }
}

// 新页内容在解除失焦时必须已处于对焦起点，记录每帧 h1 的可见状态以捕捉闪烁。
async function watchDocSwap(page) {
  await page.evaluate(() => {
    window.orbitEvents = []
    window.swapFrames = []
    const startPath = location.pathname
    const tick = () => {
      const html = document.documentElement
      const h1 = document.querySelector('.vp-doc > div > h1')
      const swapped = h1 && h1.closest('.VPDoc') && location.pathname !== startPath && !html.hasAttribute('data-doc-leaving')
      if (swapped) {
        const style = getComputedStyle(h1)
        window.swapFrames.push({ opacity: Number(style.opacity), focus: h1.hasAttribute('data-orbit-focus') })
      }
      if (window.swapFrames.length < 3) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
    // 目录的 fixed 容器在整个换页过程中不能被祖先的 transform / filter 带偏。
    window.asideTops = new Set()
    const t0 = performance.now()
    const sampleAside = () => {
      const container = document.querySelector('.VPDoc .aside-container')
      if (container && getComputedStyle(container).display !== 'none') {
        window.asideTops.add(Math.round(container.getBoundingClientRect().top))
      }
      if (performance.now() - t0 < 3000) requestAnimationFrame(sampleAside)
    }
    requestAnimationFrame(sampleAside)
  })
}

for (const width of [390, 960, 1440]) {
  test(`doc to doc swaps without View Transition and focuses in at ${width}px`, async () => {
    await withPage({ viewport: { width, height: 900 } }, async page => {
      await page.goto(base + course)
      await page.waitForFunction(() => document.documentElement.getAttribute('data-doc-orbit') === 'idle')
      await watchDocSwap(page)
      await page.locator('.course-index-card').first().click()
      await page.waitForFunction(() => document.documentElement.getAttribute('data-doc-orbit') === 'idle', null, { timeout: 5000 })
      const events = await page.evaluate(() => window.orbitEvents)
      const frames = await page.evaluate(() => window.swapFrames)
      assert.ok(events.some(e => e.name === 'doc-orbit-defocus'), 'old page defocuses out')
      assert.ok(events.some(e => e.name === 'doc-orbit-focus'), 'new page focuses in')
      assert.ok(!events.some(e => e.pseudo?.includes('view-transition')), 'no view transition between doc pages')
      assert.deepEqual(events.filter(e => CONTENT_ANIMATIONS.includes(e.name)), [],
        'focus-in replaces the per-block content entrance')
      assert.ok(frames[0]?.focus && frames[0].opacity < 0.05, `first swapped frame starts hidden (${JSON.stringify(frames[0])})`)
      if (width >= 960) {
        assert.ok(events.some(e => e.name === 'doc-orbit-ruler'), 'decorations redraw on the new page')
      }
      if (width >= 1280) {
        await page.waitForTimeout(800)
        const tops = await page.evaluate(() => [...window.asideTops])
        assert.deepEqual(tops, [0], 'outline container stays pinned instead of jumping after the focus-in')
      }
      const leftover = await page.evaluate(() => ({
        attrs: [...document.documentElement.attributes].map(a => a.name).filter(n => /^data-doc-(leaving|left|arrive)$/.test(n)),
        marks: document.querySelectorAll('[data-orbit-focus]').length,
      }))
      assert.deepEqual(leftover, { attrs: [], marks: 0 })
    })
  })
}

test('switching courses defocuses the sidebar as well', async () => {
  await withPage({ viewport: { width: 1440, height: 900 } }, async page => {
    await page.goto(base + course)
    await page.waitForFunction(() => document.documentElement.getAttribute('data-doc-orbit') === 'idle')
    const href = await page.evaluate(() => {
      const link = [...document.querySelectorAll('.VPNavBarMenu a[href]')]
        .find(a => /\/Y\dS\d\//.test(a.pathname) && !a.pathname.startsWith('/Y3S2/CCD/'))
      return link?.href
    })
    assert.ok(href, 'another course link exists in the nav')
    await page.evaluate(() => { window.orbitEvents = [] })
    await page.evaluate((target) => {
      const link = [...document.querySelectorAll('.VPNavBarMenu a[href]')].find(a => a.href === target)
      link.click()
    }, href)
    await page.waitForFunction(() => document.documentElement.getAttribute('data-doc-orbit') === 'idle', null, { timeout: 5000 })
    await page.waitForTimeout(400)
    const state = await page.evaluate(() => {
      const nav = document.querySelector('.VPSidebar .nav')
      return {
        frameAnimations: document.querySelector('.VPSidebar').getAnimations().filter(a => a.playState === 'running').length,
        navOpacity: getComputedStyle(nav).opacity,
        navFocusMark: nav.hasAttribute('data-orbit-focus'),
      }
    })
    assert.deepEqual(state, { frameAnimations: 0, navOpacity: '1', navFocusMark: false },
      'sidebar list refocuses and the window frame does not replay its first-load fade')
  })
})

test('direct loads play the per-block entrance once', async () => {
  await withPage({ viewport: { width: 1440, height: 900 } }, async page => {
    await page.goto(base + '/Y3S2/CCD/Part%202/CCD%20Lecture%207%20Mixers')
    await page.waitForFunction(() => document.documentElement.getAttribute('data-doc-orbit') === 'idle', null, { timeout: 4000 })
    const events = await page.evaluate(() => window.orbitEvents)
    assert.equal(events.filter(e => e.name === 'doc-orbit-rise').length, 1)
    assert.equal(events.filter(e => e.name === 'doc-orbit-focus').length, 0)
  })
})

test('leaving a doc page for home retracts decorations before the transition snapshot', async () => {
  await withPage({ viewport: { width: 1440, height: 900 } }, async page => {
    await page.goto(base + course)
    await page.waitForFunction(() => document.documentElement.getAttribute('data-doc-orbit') === 'idle')
    await page.evaluate(() => {
      window.orbitEvents = []
      window.exitState = null
      const html = document.documentElement
      new MutationObserver(() => {
        if (html.getAttribute('data-doc-orbit') === 'exit') window.exitState = 'seen'
      }).observe(html, { attributes: true, attributeFilter: ['data-doc-orbit'] })
    })
    await page.locator('.VPNavBarTitle a').click()
    await page.waitForFunction(() => window.orbitEvents.some(e => e.name === 'VT-DONE'))
    const events = await page.evaluate(() => window.orbitEvents)
    assert.equal(await page.evaluate(() => window.exitState), 'seen')
    const firstOut = events.findIndex(e => e.name.startsWith('doc-orbit-out-'))
    const firstVt = events.findIndex(e => e.pseudo?.includes('view-transition'))
    assert.ok(firstOut >= 0, 'exit animations run')
    assert.ok(firstOut < firstVt, 'exit plays before the view transition starts')
    assert.ok(!events.some(e => e.name === 'doc-orbit-defocus'), 'defocus is limited to doc-to-doc navigation')
    await page.waitForTimeout(600)
    assert.equal(await page.locator('html').getAttribute('data-doc-orbit'), null)
  })
})

test('decorations below the fold draw in when scrolled into view', async () => {
  await withPage({ viewport: { width: 1440, height: 900 } }, async page => {
    await page.goto(base + '/Y3S2/CCD/Part%202/CCD%20Lecture%207%20Mixers')
    await page.waitForFunction(() => document.documentElement.getAttribute('data-doc-orbit') === 'idle')
    const before = await page.evaluate(() => {
      const heads = [...document.querySelectorAll('.vp-doc > div > h2')]
      const far = heads.find(h => h.getBoundingClientRect().top > innerHeight * 2)
      far.id ||= 'orbit-probe'
      window.orbitProbe = far
      return { revealed: far.hasAttribute('data-orbit-in'), opacity: getComputedStyle(far, '::after').opacity }
    })
    assert.deepEqual(before, { revealed: false, opacity: '0' })
    await page.evaluate(() => window.orbitProbe.scrollIntoView({ block: 'center' }))
    await page.waitForTimeout(1400)
    const after = await page.evaluate(() => ({
      revealed: window.orbitProbe.hasAttribute('data-orbit-in'),
      opacity: getComputedStyle(window.orbitProbe, '::after').opacity,
      transform: getComputedStyle(window.orbitProbe, '::after').transform,
    }))
    assert.deepEqual(after, { revealed: true, opacity: '1', transform: 'none' })
  })
})

test('outline bead follows the active entry and read progress stays in sync', async () => {
  await withPage({ viewport: { width: 1440, height: 900 } }, async page => {
    await page.goto(base + course)
    await page.locator('.course-index-card').first().click()
    await page.waitForTimeout(2300)
    await page.evaluate(() => {
      const heads = document.querySelectorAll('.vp-doc > div > h2')
      const target = heads[Math.min(2, heads.length - 1)]
      window.scrollTo(0, target.getBoundingClientRect().top + scrollY - 120)
    })
    await page.waitForTimeout(1200)
    const state = await page.evaluate(() => {
      const content = document.querySelector('.VPDocAsideOutline .content')
      const marker = content.querySelector('.outline-marker').getBoundingClientRect()
      const active = content.querySelector('.outline-link.active')?.getBoundingClientRect()
      return {
        hasActive: content.hasAttribute('data-orbit-has-active'),
        dy: active ? Math.abs((marker.top + marker.height / 2) - (active.top + active.height / 2)) : null,
        tocPassed: content.querySelectorAll('.VPDocOutlineItem.root > li[data-orbit-passed]').length,
        docPassed: document.querySelectorAll('.vp-doc > div > h2[data-orbit-passed]').length,
      }
    })
    assert.ok(state.hasActive, 'outline marks an active entry after scrolling')
    assert.ok(state.dy !== null && state.dy <= 1.5, `bead sits on the active entry (dy=${state.dy})`)
    assert.ok(state.docPassed > 0, 'headings above the reading line light up')
    assert.ok(state.tocPassed > 0, 'outline ticks up to the active entry light up')
  })
})

test('custom animation durations are allowed to finish', async () => {
  await withPage({ viewport: { width: 1440, height: 900 } }, async page => {
    await page.goto(base + course)
    const href = await page.locator('.course-index-card').first().getAttribute('href')
    await page.goto(new URL(href, page.url()).href)
    await page.waitForTimeout(1800)
    await page.addInitScript(() => {
      document.addEventListener('DOMContentLoaded', () => {
        document.documentElement.style.setProperty('--dur-doc-orbit-node', '3s')
      })
    })
    await page.reload()
    await page.waitForTimeout(1900)
    assert.equal(await page.locator('html').getAttribute('data-doc-orbit'), 'enter', 'do not cut off a longer node animation')
    await page.waitForFunction(() => document.documentElement.getAttribute('data-doc-orbit') === 'idle')
  })
})
