/** 正文轨道装饰的状态机，写在 html[data-doc-orbit]：
 *   enter   首次加载 / 无 VT 导航：装饰描出，正文局部进场
 *   pending 路由 VT 进行中、新快照尚未开始：装饰先隐藏
 *   draw    VT 动画开始后只描装饰；正文交给 VT 的整页进场，不二次淡入
 *   exit    离开正文页前装饰收回，收完才开始 VT，旧快照里装饰已经收起
 *   idle    静态
 *
 * 正文页之间不走 VT，而是 html[data-doc-leaving] 失焦退场、与新页加载并行；
 * 换页后 html[data-doc-arrive] 让首屏各块按 --orbit-focus-i 错峰对焦。
 */
import { readMotionDuration } from './motion-tokens'

const ATTR = 'data-doc-orbit'
const PASSED = 'data-orbit-passed'
const REVEALED = 'data-orbit-in'
const LEAVING = 'data-doc-leaving'
const LEFT = 'data-doc-left'
const ARRIVE = 'data-doc-arrive'
const FOCUS = 'data-orbit-focus'
const REVEAL_TARGETS = '.vp-doc > div > :is(h2, h3), .vp-doc .custom-block.example, .VPDocFooter .prev-next'
const FOCUS_TARGETS = '.vp-doc > div > *, .VPDoc .VPDocFooter'
const FOCUS_MAX_STEPS = 8
let entranceRun = 0
let arrivePending = false
let arriveWithSidebar = false
let disposeTracking = () => {}
let disposePending = () => {}

const prefersMotion = () => window.matchMedia('(prefers-reduced-motion: no-preference)').matches

/** 路由 View Transition 是否正在进行（不包括日夜外观切换）。 */
export function vtInFlight() {
  if (typeof document === 'undefined') return false
  return Array.from(document.documentElement.classList).some(name =>
    name.startsWith('vt-home-to-') || name.startsWith('vt-doc-to-'),
  )
}

export function playDocOrbitEntrance({ viaTransition = false } = {}) {
  if (typeof document === 'undefined' || !document.querySelector('.VPDoc')) return

  const root = document.documentElement
  // 每个路由由 stop 重置；重复调度不能重新播放，也不依赖毫秒去重窗口。
  if (root.hasAttribute(ATTR)) return
  const run = ++entranceRun
  writeSheetLabel(root)

  if (!prefersMotion()) {
    arrivePending = false
    clearArrival()
    root.setAttribute(ATTR, 'idle')
    disposeTracking = startTracking()
    return
  }

  if (arrivePending) {
    // 标记首屏块与解除失焦必须在同一任务里完成：新页内容此时仍被 leaving 隐藏，
    // 对焦关键帧以 opacity 0 起步（backwards），中间不会露出未模糊的一帧。
    arrivePending = false
    markFocusTargets(arriveWithSidebar)
    root.setAttribute(ARRIVE, '')
    root.removeAttribute(LEAVING)
    root.removeAttribute(LEFT)
    root.setAttribute(ATTR, 'enter')
    disposeTracking = startTracking()
    settleWhenFinished(run)
    return
  }

  if (!viaTransition) {
    root.setAttribute(ATTR, 'enter')
    disposeTracking = startTracking()
    settleWhenFinished(run)
    return
  }

  // VT 的新快照是实时画面：装饰在 ready 之后开始描，就能和整页淡入同时播放；
  // 更早开始会在渲染被挂起时把动画白白耗掉。done 只是兜底。
  root.setAttribute(ATTR, 'pending')
  disposeTracking = startTracking()
  const begin = () => {
    disposePending()
    if (run !== entranceRun) return
    root.setAttribute(ATTR, 'draw')
    settleWhenFinished(run)
  }
  window.addEventListener('vt-transition-ready', begin, { once: true })
  window.addEventListener('vt-transition-done', begin, { once: true })
  disposePending = () => {
    window.removeEventListener('vt-transition-ready', begin)
    window.removeEventListener('vt-transition-done', begin)
    disposePending = () => {}
  }
}

export function stopDocOrbitEntrance() {
  if (typeof document === 'undefined') return
  entranceRun += 1
  disposePending()
  disposeTracking()
  disposeTracking = () => {}
  if (!arrivePending) clearArrival()
  document.documentElement.removeAttribute(ATTR)
  document.documentElement.style.removeProperty('--doc-orbit-sheet')
}

/** 正文页 → 正文页：旧页失焦并收回装饰，返回的 Promise 交给路由在换页前等待，
 *  页面模块的加载与之并行。sidebar 为 true 时侧栏一起失焦（切换课程）。 */
export async function playDocLeave({ sidebar = false } = {}) {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  arrivePending = true
  arriveWithSidebar = sidebar
  clearFocusMarks()
  root.removeAttribute(ARRIVE)
  root.removeAttribute(LEFT)
  root.setAttribute(LEAVING, sidebar ? 'sidebar' : '')
  const defocus = orbitAnimations(name => name === 'doc-orbit-defocus')
  const timeout = readMotionDuration('--dur-doc-orbit-exit-timeout', 700)
  await Promise.race([
    Promise.allSettled([
      playDocOrbitExit(),
      ...defocus.map(animation => animation.finished),
    ]),
    new Promise(resolve => window.setTimeout(resolve, timeout)),
  ])
  if (arrivePending) root.setAttribute(LEFT, '')
}

/** 换页后新页没有正文（404 等）或进场没有接手时，解除失焦。 */
export function finishDocLeave() {
  if (typeof document === 'undefined' || !arrivePending) return
  arrivePending = false
  clearArrival()
}

function clearArrival() {
  const root = document.documentElement
  root.removeAttribute(LEAVING)
  root.removeAttribute(LEFT)
  root.removeAttribute(ARRIVE)
  clearFocusMarks()
}

function clearFocusMarks() {
  for (const el of document.querySelectorAll<HTMLElement>(`[${FOCUS}]`)) {
    el.removeAttribute(FOCUS)
    el.style.removeProperty('--orbit-focus-i')
  }
}

// 只给首屏块编号；VitePress 换页后滚回顶部（带 hash 时滚到锚点），按目标位置判断。
function markFocusTargets(sidebar: boolean) {
  const fold = window.innerHeight
  const offset = location.hash ? 0 : window.scrollY
  let i = 0
  const mark = (el: HTMLElement | null, step: number) => {
    if (!el) return
    el.setAttribute(FOCUS, '')
    el.style.setProperty('--orbit-focus-i', String(Math.min(step, FOCUS_MAX_STEPS)))
  }
  if (sidebar) mark(document.querySelector<HTMLElement>('.VPSidebar .nav'), 0)
  for (const el of document.querySelectorAll<HTMLElement>(FOCUS_TARGETS)) {
    const rect = el.getBoundingClientRect()
    if (rect.height === 0 && rect.width === 0) continue
    if (rect.top + offset >= fold) break
    mark(el, i++)
  }
  // 不能标 .aside：filter / transform 会让它成为内部 fixed 容器的包含块，目录随之偏移，收尾时再跳回。
  const aside = document.querySelector<HTMLElement>('.VPDoc .aside-content')
  if (aside && aside.getBoundingClientRect().width > 0) mark(aside, 2)
}

/** 离开正文页前收回装饰。新路由的 stop 会清掉 exit 状态。 */
export async function playDocOrbitExit() {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  if (!root.hasAttribute(ATTR) || !prefersMotion()) return

  entranceRun += 1
  disposePending()
  root.setAttribute(ATTR, 'exit')
  const animations = orbitAnimations(name => name.startsWith('doc-orbit-out-'))
  if (!animations.length) return
  const timeout = readMotionDuration('--dur-doc-orbit-exit-timeout', 700)
  await Promise.race([
    Promise.allSettled(animations.map(animation => animation.finished)),
    new Promise(resolve => window.setTimeout(resolve, timeout)),
  ])
}

// 查询会刷新样式，包含伪元素上的 CSSAnimation。
function orbitAnimations(match: (name: string) => boolean) {
  return document.getAnimations().filter((animation): animation is CSSAnimation =>
    animation instanceof CSSAnimation
    && animation.animationName.startsWith('doc-orbit-')
    && match(animation.animationName)
    && animation.effect?.getTiming().iterations !== Infinity,
  )
}

// 无限旋转、已读脉冲、退场不参与收尾；使用真实 finished 而非固定计时器，
// 允许自定义时长与错峰完整播放。
function settleWhenFinished(run: number) {
  const animations = orbitAnimations(name =>
    name !== 'doc-orbit-pass' && name !== 'doc-orbit-defocus' && !name.startsWith('doc-orbit-out-'),
  )
  void Promise.allSettled(animations.map(animation => animation.finished)).then(() => {
    if (run !== entranceRun) return
    if (!arrivePending) clearArrival()
    document.documentElement.setAttribute(ATTR, 'idle')
  })
}

/** 刻度尺右端的图纸标签：取路由的目录段，例如 Y3S2 · CCD · PART 2。 */
function writeSheetLabel(root: HTMLElement) {
  const dirs = decodeURIComponent(location.pathname).split('/').filter(Boolean).slice(0, -1)
  if (dirs.length) root.style.setProperty('--doc-orbit-sheet', JSON.stringify(dirs.join(' · ')))
  else root.style.removeProperty('--doc-orbit-sheet')
}

/** 已读进度：正文 h2 节点越过阅读线后点亮；右侧目录的实线与珠子跟随 VitePress 的 marker。
 *  滚动描出：首屏以下的标题刻度、例题刻度、翻页点线进入视口时再描。 */
function startTracking() {
  let frame = 0
  let headings: HTMLElement[] = []
  const collect = () => {
    headings = Array.from(document.querySelectorAll<HTMLElement>('.vp-doc > div > h2'))
  }

  const syncHeadings = () => {
    frame = 0
    const line = window.innerHeight * 0.32
    for (const h of headings) h.toggleAttribute(PASSED, h.getBoundingClientRect().top < line)
  }
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(syncHeadings)
  }

  // marker 的 top 由 VitePress 写入，按它同步实线长度和已经经过的一级条目。
  const syncOutline = () => {
    const content = document.querySelector<HTMLElement>('.VPDocAsideOutline .content')
    const marker = content?.querySelector<HTMLElement>('.outline-marker')
    if (!content || !marker) return
    const active = content.querySelector('.outline-link.active')
    const shown = active && marker.style.opacity !== '0'
    const y = shown ? marker.style.top : '0px'
    if (content.style.getPropertyValue('--doc-orbit-toc-y') !== y) content.style.setProperty('--doc-orbit-toc-y', y)
    content.toggleAttribute('data-orbit-has-active', Boolean(shown))
    const items = Array.from(content.querySelectorAll<HTMLElement>('.VPDocOutlineItem.root > li'))
    const reached = shown ? items.findIndex(item => item.contains(active)) : -1
    items.forEach((item, i) => item.toggleAttribute(PASSED, i <= reached))
  }

  // 视口内与视口上方的目标同步标记，避免首帧先隐藏再描出；其余等滚到再描。
  const revealer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      entry.target.setAttribute(REVEALED, '')
      revealer.unobserve(entry.target)
    }
  }, { rootMargin: '0px 0px -10% 0px' })
  const watchReveals = () => {
    const fold = window.innerHeight * 0.9
    for (const el of document.querySelectorAll<HTMLElement>(REVEAL_TARGETS)) {
      if (el.hasAttribute(REVEALED)) continue
      if (el.getBoundingClientRect().top < fold) el.setAttribute(REVEALED, '')
      else revealer.observe(el)
    }
  }

  const aside = document.querySelector('.VPDoc .aside')
  const outlineObserver = new MutationObserver(syncOutline)
  if (aside) {
    outlineObserver.observe(aside, { subtree: true, childList: true, attributes: true, attributeFilter: ['style', 'class'] })
  }

  // 标题由 VitePress 在内容更新后才写入，晚到的 DOM 用一次 RAF 补齐。
  const contentObserver = new MutationObserver(() => { collect(); watchReveals(); schedule() })
  const doc = document.querySelector('.vp-doc')
  if (doc) contentObserver.observe(doc, { childList: true, subtree: false })

  collect()
  watchReveals()
  syncHeadings()
  syncOutline()
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule, { passive: true })

  return () => {
    if (frame) cancelAnimationFrame(frame)
    revealer.disconnect()
    outlineObserver.disconnect()
    contentObserver.disconnect()
    window.removeEventListener('scroll', schedule)
    window.removeEventListener('resize', schedule)
  }
}
