/**
 * 在多视口宽度下检测正文页轨道装饰的重叠/越界问题。
 * BASE=http://localhost:5199 PLAYWRIGHT_MODULE=/path/to/playwright/index.mjs node scripts/verify-doc-orbit-overlap.mjs
 * 已本地安装 playwright 时可省略 PLAYWRIGHT_MODULE。
 *
 * 装饰位置（doc-orbit.css）：
 *   h2::before 节点    left:0,    top:-5px    10x10
 *   h2::after  刻度    left:0,    top:1px, right:0, h:5px
 *   h3::before 节点    left:-1px, top:-15px   5x5
 *   h3::after  虚线    left:0,    top:-13px   w:64px h:1px
 *
 * 断言：
 *   A. 装饰不得侵入内容栏左侧 gutter（否则压到侧栏）
 *   B. 装饰不得与 .header-anchor 重叠
 *   C. 装饰不得与标题文字盒子重叠
 *   D. 右侧目录的珠子与刻点留在 .content 内、离文字 ≥ 4px，珠子对准当前条目
 *   E. 装饰不得溢出视口
 */
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright')

const BASE = process.env.BASE || 'http://localhost:5199'
const PAGES = [
  { name: 'lecture', path: '/Y3S2/CCD/Part%202/CCD%20Lecture%2010%20Revision' },
  { name: 'lecture-long', path: '/Y3S2/CCD/Part%201/CCD%20Lecture%201%20Introduction' },
  { name: 'course-index', path: '/Y3S2/CCD/CCD-README' },
]
const WIDTHS = [320, 375, 390, 430, 640, 767, 768, 820, 959, 960, 1024, 1152, 1279, 1280, 1366, 1440, 1600, 1920, 2048]

const browser = await chromium.launch()
const results = []

for (const page of PAGES) {
  for (const width of WIDTHS) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 } })
    const p = await ctx.newPage()
    const runtimeErrors = []
    p.on('pageerror', error => runtimeErrors.push(error.message))
    await p.goto(BASE + page.path, { waitUntil: 'domcontentloaded' })
    await p.waitForTimeout(2100)

    const report = await p.evaluate(() => {
      const issues = []
      const info = {}
      if (document.documentElement.scrollWidth > window.innerWidth + 1) issues.push('页面出现横向溢出')
      for (const el of document.querySelectorAll('.course-index-card, .course-index-group-title, .doc-meta')) {
        const rect = el.getBoundingClientRect()
        if (rect.width && (rect.left < -1 || rect.right > innerWidth + 1 || el.scrollWidth > el.clientWidth + 1)) {
          issues.push(`${el.className} 越界或内部溢出`)
        }
      }

      const px = (v) => (Number.isFinite(parseFloat(v)) ? parseFloat(v) : 0)
      const rectOf = (el) => {
        const r = el.getBoundingClientRect()
        return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, width: r.width, height: r.height }
      }
      const overlap = (a, b) => {
        const x = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left))
        const y = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top))
        return x * y
      }

      const c = document.querySelector('.VPDoc .content-container')
      if (!c) return { issues: ['no content-container'], info }

      const content = rectOf(c)
      const sb = document.querySelector('.VPSidebar')
      let sbRight = null
      if (sb) {
        const sr = rectOf(sb)
        if (sr.width > 0) sbRight = sr.right
      }
      info.gutter = sbRight === null ? null : Math.round(content.left - sbRight)

      // --- 标题装饰 ---
      const heads = [...document.querySelectorAll('.vp-doc > div > h1, .vp-doc > div > h2, .vp-doc > div > h3')]
      info.heads = heads.length

      for (const h of heads) {
        const tag = h.tagName.toLowerCase()
        const hr = rectOf(h)
        if (hr.width === 0) continue

        for (const pseudo of ['::before', '::after']) {
          const ps = getComputedStyle(h, pseudo)
          if (ps.content === 'none' || ps.display === 'none') continue

          const w = px(ps.width), hh = px(ps.height)
          if (w <= 0 || hh <= 0) continue

          const left = hr.left + px(ps.left)
          const top = hr.top + px(ps.top)
          const deco = { left, right: left + w, top, bottom: top + hh }

          const label = `${tag}${pseudo}`

          // A. 不得侵出内容栏左侧（视觉上进入 gutter 内 12px 以内可接受，
          //    超过则可能压到侧栏）
          if (deco.left < content.left - 12) {
            const intrude = content.left - deco.left
            issues.push(`${label} 侵入左侧留白 ${intrude.toFixed(1)}px${sbRight !== null && deco.left < sbRight ? '（已压到侧栏）' : ''}`)
          }

          // B. 不得与锚点重叠
          const a = h.querySelector('.header-anchor')
          if (a) {
            const ov = overlap(deco, rectOf(a))
            if (ov > 0) issues.push(`${label} 与 header-anchor 重叠 ${ov.toFixed(0)}px²`)
          }

          // C. 不得侵入文字行
          //    文字盒子 = 标题 content box（去掉 border/padding）
          const bt = px(getComputedStyle(h).borderTopWidth)
          const pt = px(getComputedStyle(h).paddingTop)
          const pb = px(getComputedStyle(h).paddingBottom)
          const bl = px(getComputedStyle(h).borderLeftWidth)
          const pl = px(getComputedStyle(h).paddingLeft)
          const pr = px(getComputedStyle(h).paddingRight)
          const textBox = {
            left: hr.left + bl + pl,
            right: hr.right - px(getComputedStyle(h).borderRightWidth) - pr,
            top: hr.top + bt + pt,
            bottom: hr.bottom - pb,
          }
          const textOv = overlap(deco, textBox)
          if (textOv > 0) issues.push(`${label} 与标题文字重叠 ${textOv.toFixed(0)}px²`)

          // E. 视口越界
          if (deco.left < -1) issues.push(`${label} 溢出视口左侧 (${deco.left.toFixed(1)})`)
        }
      }

      // --- 目录点线轨道 ---
      // 注意：<1280px 时 VitePress 把整个 .aside 设为 display:none，
      // 此时所有矩形均为 0，必须跳过，否则会误报越界。
      const links = [...document.querySelectorAll('.VPDocAsideOutline .outline-link')]
      info.tocLinks = links.length
      const asideEl = document.querySelector('.VPDoc .aside')
      const asideVisible = asideEl
        && getComputedStyle(asideEl).display !== 'none'
        && asideEl.getBoundingClientRect().width > 0

      info.asideVisible = Boolean(asideVisible)

      if (asideVisible) {
        const outlineContent = document.querySelector('.VPDocAsideOutline .content')
        if (outlineContent) {
          const box = rectOf(outlineContent)
          const textLeft = Math.min(...links.map(link => link.getBoundingClientRect().left))
          const marker = outlineContent.querySelector('.outline-marker')
          if (marker && getComputedStyle(marker).opacity !== '0') {
            const m = rectOf(marker)
            if (m.left < box.left) issues.push(`目录珠子被裁出 .content (${(m.left - box.left).toFixed(1)})`)
            if (m.right > textLeft - 4) issues.push(`目录珠子贴近文字 (${(textLeft - m.right).toFixed(1)}px)`)
            const active = outlineContent.querySelector('.outline-link.active')
            if (active) {
              const a = rectOf(active)
              const dy = (m.top + m.height / 2) - (a.top + a.height / 2)
              if (Math.abs(dy) > 1.5) issues.push(`目录珠子未对准当前条目 (dy=${dy.toFixed(1)})`)
            }
          }
          // 一级刻点借 li 的静态位置绘制：li 起点 + margin-left，宽度取计算值
          for (const li of outlineContent.querySelectorAll('.VPDocOutlineItem.root > li')) {
            const ps = getComputedStyle(li, '::before')
            if (['none', 'normal'].includes(ps.content)) continue
            const left = li.getBoundingClientRect().left + px(ps.marginLeft)
            const right = left + px(ps.width)
            if (left < box.left) issues.push(`目录刻点被裁出 .content (${(left - box.left).toFixed(1)})`)
            if (right > textLeft - 4) issues.push('目录刻点贴近文字')
          }
        }
      }

      // --- 进度条 / 返回顶部 ---
      const btt = document.querySelector('.back-top-container')
      if (btt) {
        const br = rectOf(btt)
        if (br.right > window.innerWidth + 1 || br.left < -1) issues.push('返回顶部按钮越界')
      }

      return { issues, info }
    })

    report.issues.push(...runtimeErrors.map(error => `运行错误: ${error}`))
    results.push({ page: page.name, width, ...report })
    await ctx.close()
  }
}

await browser.close()

let total = 0
for (const r of results) {
  const tag = `${r.page.padEnd(13)} @${String(r.width).padStart(4)}`
  if (!r.issues.length) {
    console.log(`OK   ${tag}  gutter=${r.info.gutter}  heads=${r.info.heads}  toc=${r.info.tocLinks}`)
  } else {
    total += r.issues.length
    console.log(`FAIL ${tag}  gutter=${r.info.gutter}`)
    for (const i of r.issues) console.log(`       - ${i}`)
  }
}
console.log(`\n${total} issue(s) in ${results.length} combinations`)
process.exit(total ? 1 : 0)
