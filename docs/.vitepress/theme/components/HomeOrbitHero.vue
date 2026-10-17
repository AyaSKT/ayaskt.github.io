<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useTemplateRef, watch } from 'vue'
import { useData, withBase } from 'vitepress'
import HeroHitokoto from './HeroHitokoto.vue'
import timelineEntries from '../generated/timeline-entries.json'
import { readMotionDuration, readMotionEasing } from '../motion-tokens'

interface CourseItem {
  text: string
  link?: string
}

interface CourseGroup {
  id: string
  label: string
  title: string
  rows?: { items: CourseItem[] }[]
  items?: CourseItem[]
}

interface OrbitCourse {
  code: string
  name: string
  note: string
  href?: string
  external: boolean
}

interface OrbitNode {
  id: string
  key: string
  title: string
  meta: string
  now?: boolean
  href?: string
  courses: OrbitCourse[]
}

interface Geometry {
  mode: 'mobile' | 'tablet' | 'desktop'
  cx: number
  cy: number
  R: number
  kx: number
  ky: number
  art: boolean
  fx: number
  fy: number
  fw: number
  fh: number
  from: number
  to: number
  angles: number[]
  size: number
}

const props = defineProps<{ image?: string }>()

const { frontmatter } = useData()

const hero = computed(() => (frontmatter.value as any)?.homeHero ?? {})
const photoLink = computed<string | undefined>(() => hero.value.image?.link)

function resolveLink(link: string) {
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(link)) return link
  const url = new URL(link, 'http://vitepress.local')
  const pathname = url.pathname.endsWith('.md') ? url.pathname.replace(/\.md$/, '.html') : url.pathname
  return withBase(`${pathname}${url.search}${url.hash}`)
}

function parseCourse(item: CourseItem): OrbitCourse {
  const match = item.text.match(/^(.*?)\s+([A-Z][A-Za-z&]*)(?:\s*\((.+)\))?$/)
  const external = !!item.link && /^https?:/i.test(item.link)
  return {
    name: match ? match[1] : item.text,
    code: match ? match[2] : '',
    note: match?.[3] ?? '',
    href: item.link ? resolveLink(item.link) : undefined,
    external,
  }
}

const groups = computed<CourseGroup[]>(() => (frontmatter.value as any)?.homeCourseGroups ?? [])

const timeline = timelineEntries as { notes?: unknown[] }[]
const noteCount = timeline.reduce((sum, entry) => sum + (entry.notes?.length ?? 0), 0)

const nodes = computed<OrbitNode[]>(() => {
  const list = groups.value.map((g, i) => {
    const match = g.title.match(/^(.*?)\s+(\d{4}.*)$/)
    return {
      id: `N-${String(i + 1).padStart(2, '0')}`,
      key: g.label.replace(/^Y(\d+)\s*&\s*Y(\d+)$/, 'Y$1·$2'),
      title: match ? match[1] : g.title,
      meta: match ? match[2].toUpperCase().replace(/\s*-\s*/, ' — ') : '',
      now: i === 0,
      courses: (g.rows ?? [{ items: g.items ?? [] }]).flatMap((row) => row.items.map(parseCourse)),
    }
  }).reverse()
  list.push({ id: 'T-00', key: '時', title: '时间线', meta: `${noteCount} NOTES`, href: withBase('/timeline'), courses: [] })
  return list
})

const yearRange = computed(() => {
  const years = groups.value.flatMap((g) => g.title.match(/\d{4}/g) ?? []).map(Number)
  return years.length ? `${Math.min(...years)}—${Math.max(...years)}` : ''
})

const root = ref<HTMLElement | null>(null)
const figure = useTemplateRef<HTMLElement>('figure')
const stage = ref<SVGSVGElement | null>(null)
const titleEl = ref<HTMLElement | null>(null)
const panelEl = ref<HTMLElement | null>(null)

const ready = ref(false)
const entering = ref(true)
const leaving = ref(false)
const titleChars = computed(() => [...String(hero.value.title ?? '工作站')])
const geo = ref<Geometry | null>(null)
const openIndex = ref(-1)
const panelPos = ref<{ left: number, top: number, origin: string } | null>(null)
const tether = ref<{ x: number, y: number, length: number, angle: number } | null>(null)
const titleStyle = ref<Record<string, string>>({})
const minHeight = ref('')

const openNode = computed(() => (openIndex.value >= 0 ? nodes.value[openIndex.value] : null))
// 关闭时面板要带着内容一起退场，所以内容跟随最后一次打开的节点，而不是 openIndex
const panelIndex = ref(-1)
const panelNode = computed(() => (panelIndex.value >= 0 ? nodes.value[panelIndex.value] : null))
// 每次打开或切换都换一个 key，让面板内容和连接线重新播放入场
const panelRun = ref(0)

const NS = 'http://www.w3.org/2000/svg'
const rad = (d: number) => d * Math.PI / 180
const CONTENT_MAX = 1152
// 低于该宽度改为竖排（弧在上、标题在下），与样式里的 max-width: 799px 对应
const MOBILE_MAX = 800

function pt(g: { cx: number, cy: number, kx?: number, ky?: number, R?: number }, deg: number, r = g.R ?? 0): [number, number] {
  return [g.cx + r * (g.kx ?? 1) * Math.cos(rad(deg)), g.cy + r * (g.ky ?? 1) * Math.sin(rad(deg))]
}

/** 与下方各区块同一条内容栏：最宽 1152px，两侧留白跟随 VPFeatures */
function column(W: number) {
  const pad = W >= 960 ? 64 : W >= 640 ? 48 : 24
  const width = Math.min(CONTENT_MAX, W - pad * 2)
  return { left: (W - width) / 2, width }
}

function titleSlot(g: Geometry, W: number, H: number, right: number) {
  const title = titleEl.value!
  const bottom = parseFloat(getComputedStyle(title).bottom)
  const top = H - bottom - title.offsetHeight
  let edge = 0
  for (let a = g.to; a <= g.from; a += 1) {
    const [x, y] = pt(g, a)
    if (y >= top - 24 && y <= H) edge = Math.max(edge, x)
  }
  // 节点及其下方两行标签也要让开
  for (const a of g.angles) {
    const [x, y] = pt(g, a)
    if (y + g.size / 2 + 56 >= top - 12) edge = Math.max(edge, x + 80 - 56)
  }
  const left = Math.max(edge + 56, W * 0.5)
  return { left, width: W - right - left }
}

function geometry(W: number, H: number): Geometry {
  if (W < MOBILE_MAX) {
    const cx = W * 0.5
    // 竖屏平板（640–799）放大弧半径，圆心随之下移，避免顶到导航栏
    // 两侧节点（24° / 156°）的圆盘外缘至少离屏幕边 16px
    const sideFit = (W / 2 - 16 - 26) / Math.cos((24 * Math.PI) / 180)
    const R = Math.min(W * 0.44, sideFit, W >= 640 ? 240 : 180)
    const cy = Math.max(196, Math.min(H * 0.26, 236)) + Math.max(0, R - 180) * 0.75
    const fw = R * 1.9
    return {
      mode: 'mobile', cx, cy, R, kx: 1, ky: 1, art: false, fx: cx, fy: cy - R * 0.06, fw, fh: fw * 0.66,
      from: 192, to: -12, angles: [156, 118, 62, 24], size: 52,
    }
  }
  const col = column(W)
  const tablet = col.width < 1000
  const kx = tablet ? 1.2 : 1.25
  const build = (R: number): Geometry => {
    // 横幅主视觉填满椭圆内侧，羽化边缘允许略微越出内容栏
    const fw = R * kx * 1.16
    const fh = fw * 0.62
    const cx = col.left + fw / 2 - 28
    const cy = H * 0.43
    return {
      mode: tablet ? 'tablet' : 'desktop', cx, cy, R, kx, ky: 0.86, art: true,
      fx: cx, fy: cy - R * 0.08, fw, fh,
      from: 128, to: -38, angles: tablet ? [114, 84, 54, 6] : [112, 84, 56, 4], size: tablet ? 58 : 64,
    }
  }
  // 先取最大半径，标题放不下时逐步收小
  let R = tablet ? Math.min(H * 0.48, col.width * 0.42) : Math.min(H * 0.5, col.width * 0.38)
  let g = build(R)
  const right = W - col.left - col.width
  const need = tablet ? 330 : 420
  for (let i = 0; i < 12 && titleSlot(g, W, H, right).width < need; i++) g = build(R *= 0.96)
  return g
}

function el(name: string, attrs: Record<string, string | number>, parent?: Element) {
  const n = document.createElementNS(NS, name)
  for (const k in attrs) n.setAttribute(k, String(attrs[k]))
  parent?.appendChild(n)
  return n
}

function arcPath(g: Geometry, from: number, to: number, r = g.R) {
  const steps = Math.ceil(Math.abs(from - to) / 1.5)
  let d = ''
  for (let i = 0; i <= steps; i++) {
    const [x, y] = pt(g, from + (to - from) * (i / steps), r)
    d += `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`
  }
  return d
}

function draw(g: Geometry, W: number, H: number) {
  const svg = stage.value!
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`)
  // 手机端 hero 会按内容撑高，坐标须保持 1:1 并贴顶
  svg.setAttribute('preserveAspectRatio', 'xMinYMin meet')
  // hero 可能比视口矮；固定 SVG 高度，避免 meet 缩小弧线后与 HTML 节点错位。
  svg.style.height = g.mode === 'mobile' ? `${H}px` : ''
  svg.replaceChildren()

  const defs = el('defs', {}, svg)
  const [sx, sy] = pt(g, g.from)
  const [ex, ey] = pt(g, g.to)
  const grad = el('linearGradient', { id: 'orbitArcGrad', gradientUnits: 'userSpaceOnUse', x1: sx, y1: sy, x2: ex, y2: ey }, defs)
  for (const [offset, cls] of [['0', 'stop-edge'], ['.2', 'stop-mid'], ['.8', 'stop-mid'], ['1', 'stop-edge']]) {
    el('stop', { offset, class: cls }, grad)
  }

  const mobile = g.mode === 'mobile'

  // 内容栏参考线 + 四角套准标记
  if (!mobile) {
    const col = column(W)
    const top = 96
    const bottom = H - 36
    const guides = el('g', { class: 'fade', style: '--o:1' }, svg)
    for (const x of [col.left, col.left + col.width]) {
      el('line', { class: 'guide', x1: x, y1: 0, x2: x, y2: H }, guides)
      for (const y of [top, bottom]) {
        el('line', { class: 'mark', x1: x - 6, y1: y, x2: x + 6, y2: y }, guides)
        el('line', { class: 'mark', x1: x, y1: y - 6, x2: x, y2: y + 6 }, guides)
      }
    }
  }

  // 外侧点状轨道
  el('path', { class: 'arc-dots', d: arcPath(g, g.from + 6, g.to - 8, g.R + (mobile ? 16 : 24)) }, svg)

  const arc = el('path', { class: 'arc', d: arcPath(g, g.from, g.to) }, svg) as SVGGeometryElement
  arc.style.setProperty('--len', String(arc.getTotalLength()))

  // 主弧上的刻点：避开节点，每 15° 一枚加大；--f 是它在弧上的进度，描线经过时才亮起
  const beads = el('g', { class: 'beads' }, svg)
  const lo = Math.min(g.from, g.to) + 8
  const hi = Math.max(g.from, g.to) - 8
  for (let a = Math.ceil(lo / 5) * 5; a <= hi; a += 5) {
    if (g.angles.some((n) => Math.abs(n - a) < 9)) continue
    const [x, y] = pt(g, a)
    const f = ((g.from - a) / (g.from - g.to)).toFixed(3)
    el('circle', { class: a % 15 === 0 ? 'bead-major' : 'bead', cx: x, cy: y, r: a % 15 === 0 ? 2.2 : 1.2, style: `--f:${f}` }, beads)
  }

  // 两端端点
  const caps = el('g', { class: 'fade', style: '--o:9' }, svg)
  for (const deg of [g.from - 4, g.to + 4]) {
    const [x, y] = pt(g, deg)
    el('circle', { class: 'cap-ring', cx: x, cy: y, r: 6 }, caps)
    el('circle', { class: 'cap', cx: x, cy: y, r: 2.4 }, caps)
  }
}

const nodePositions = computed(() => {
  const g = geo.value
  if (!g) return []
  return nodes.value.map((_, i) => {
    const angle = g.angles[i] ?? g.angles[g.angles.length - 1]
    const [x, y] = pt(g, angle)
    return {
      '--x': `${x}px`, '--y': `${y}px`, '--size': `${g.size}px`, '--i': String(i),
      '--label-shift': `${Math.max(0, 76 - x)}px`,
    }
  })
})

function layout() {
  const hero = root.value
  if (!hero || !titleEl.value) return
  const W = hero.clientWidth
  const mobile = W < MOBILE_MAX
  const H = mobile ? window.innerHeight : hero.clientHeight

  titleStyle.value = {}
  titleEl.value.style.left = ''
  titleEl.value.style.width = ''
  const col = column(W)
  hero.style.setProperty('--col-right', `${W - col.left - col.width}px`)

  const g = geometry(W, H)
  geo.value = g

  hero.style.setProperty('--fw', `${g.fw}px`)
  hero.style.setProperty('--fh', `${g.fh}px`)
  hero.style.setProperty('--fx', `${g.fx}px`)
  hero.style.setProperty('--fy', `${g.fy}px`)
  hero.style.setProperty('--cx', `${g.cx}px`)
  hero.style.setProperty('--cy', `${g.cy}px`)
  // 回首页的椭圆光圈从弧心展开（视口坐标，供 ::view-transition-new(root) 读取）
  const top = hero.getBoundingClientRect().top
  document.documentElement.style.setProperty('--home-iris-x', `${g.cx}px`)
  document.documentElement.style.setProperty('--home-iris-y', `${top + g.cy}px`)

  draw(g, W, H)
  syncStageEntrance()

  if (mobile) {
    const titleTop = g.cy + g.R + 84
    hero.style.setProperty('--title-top', `${titleTop}px`)
    minHeight.value = `${titleTop + titleEl.value.offsetHeight + 56}px`
  } else {
    minHeight.value = ''
    const slot = titleSlot(g, W, H, W - col.left - col.width)
    titleStyle.value = { left: `${slot.left}px`, width: `${slot.width}px` }
  }

  if (openIndex.value >= 0) nextTick(place)
}

function place() {
  const g = geo.value
  const hero = root.value
  const panel = panelEl.value
  if (panel) panel.style.maxHeight = ''
  if (!g || !hero || !panel || g.mode === 'mobile') {
    panelPos.value = null
    tether.value = null
    return
  }
  const w = panel.offsetWidth
  const natural = panel.offsetHeight
  const left = Math.max(24, Math.min(hero.clientWidth - w - 24, g.fx - w / 2))

  // 面板底边停在横向重叠的圆盘（含 NOW 角标和选中环）上方；放不下时列表在面板内滚动
  const s = g.size / 2
  let floor = hero.clientHeight - 24
  for (const a of g.angles) {
    const [x, y] = pt(g, a)
    if (x + s + 12 > left && x - s - 12 < left + w) floor = Math.min(floor, y - s - 16)
  }
  const h = Math.min(natural, Math.max(200, floor - 84))
  if (h < natural) panel.style.maxHeight = `${h}px`
  const top = Math.max(84, Math.min(g.fy - h / 2, floor - h))

  // 点线从圆盘外缘连到面板边上离它最近的点；面板以圆盘方向为原点展开
  const index = openIndex.value >= 0 ? openIndex.value : panelIndex.value
  const [nx, ny] = pt(g, g.angles[index] ?? g.angles[g.angles.length - 1])
  const inset = 18
  let px = Math.max(left + inset, Math.min(left + w - inset, nx))
  let py = Math.max(top + inset, Math.min(top + h - inset, ny))
  if (ny >= top + h) py = top + h
  else if (ny <= top) py = top
  else if (nx >= left + w) px = left + w
  else if (nx <= left) px = left
  const dx = px - nx
  const dy = py - ny
  const dist = Math.hypot(dx, dy)
  const gap = g.size / 2 + 10
  panelPos.value = { top, left, origin: `${(nx - left).toFixed(1)}px ${(ny - top).toFixed(1)}px` }
  tether.value = dist > gap + 12
    ? {
        x: nx + (dx / dist) * gap,
        y: ny + (dy / dist) * gap,
        length: dist - gap,
        angle: Math.atan2(dy, dx) * 180 / Math.PI,
      }
    : null
}

function toggle(i: number) {
  if (openIndex.value === i) return close()
  openIndex.value = i
  panelIndex.value = i
  panelRun.value += 1
  nextTick(place)
}

function close() {
  openIndex.value = -1
}

function onDocumentClick(e: MouseEvent) {
  if (openIndex.value < 0) return
  if (panelEl.value?.contains(e.target as Node)) return
  close()
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}

function motionEnabled() {
  return window.matchMedia('(prefers-reduced-motion: no-preference)').matches
}

let heroPointerFrame = 0
let heroPointerX = 0
let heroPointerY = 0

function resetHeroPointer() {
  if (heroPointerFrame) window.cancelAnimationFrame(heroPointerFrame)
  heroPointerFrame = 0
  figure.value?.style.removeProperty('--orbit-pointer-x')
  figure.value?.style.removeProperty('--orbit-pointer-y')
}

function onHeroPointerMove(event: PointerEvent) {
  if (event.pointerType !== 'mouse' || openIndex.value >= 0 || leaving.value || !motionEnabled()) {
    resetHeroPointer()
    return
  }

  heroPointerX = event.clientX
  heroPointerY = event.clientY
  if (heroPointerFrame) return
  heroPointerFrame = window.requestAnimationFrame(() => {
    heroPointerFrame = 0
    const target = figure.value
    if (!target) return
    // 读取固定外框，避免移动后的图片反过来改变指针坐标，造成边缘抖动。
    const rect = target.getBoundingClientRect()
    if (!rect.width || !rect.height) return
    const x = Math.max(-1, Math.min(1, (heroPointerX - rect.left) / rect.width * 2 - 1))
    const y = Math.max(-1, Math.min(1, (heroPointerY - rect.top) / rect.height * 2 - 1))
    target.style.setProperty('--orbit-pointer-x', `${-x * 5}px`)
    target.style.setProperty('--orbit-pointer-y', `${-y * 5}px`)
  })
}

/** 沿弧从 fromDeg 走到 toDeg 的 translate 关键帧，终点落在节点自身位置 */
function orbitFrames(g: Geometry, fromDeg: number, toDeg: number, home: [number, number], fade: 'in' | 'out') {
  const steps = 18
  return Array.from({ length: steps + 1 }, (_, k) => {
    const t = k / steps
    const [x, y] = pt(g, fromDeg + (toDeg - fromDeg) * t)
    const opacity = fade === 'in' ? Math.min(1, t * 4) : Math.min(1, (1 - t) * 3)
    return { transform: `translate(${(x - home[0]).toFixed(1)}px, ${(y - home[1]).toFixed(1)}px)`, opacity, offset: t }
  })
}

function nodeElements() {
  return [...(root.value?.querySelectorAll<HTMLElement>('.orbit-node') ?? [])]
}

/** 进场：各节点从弧的起点出发，沿轨道滑行到自己的位置，越远的越晚到 */
function launchNodes() {
  const g = geo.value
  if (!g || !motionEnabled()) return
  const duration = readMotionDuration('--dur-home-orbit', 1300)
  const step = readMotionDuration('--orbit-step', 100)
  const easing = readMotionEasing('--ease-home-orbit', 'ease-out')
  nodeElements().forEach((node, i) => {
    const angle = g.angles[i] ?? g.angles[g.angles.length - 1]
    const span = Math.abs(angle - g.from) / Math.abs(g.from - g.to)
    node.animate(orbitFrames(g, g.from, angle, pt(g, angle), 'in'), {
      duration: duration * (0.55 + span * 0.6),
      delay: step * (5 + i * 0.8),
      easing,
      fill: 'backwards',
    })
  })
}

/** 离场：节点被收回弧的起点，弧线、镜头和标题同步收束（CSS 由 .is-leaving 驱动） */
function onHomeExitRequest(event: Event) {
  const detail = (event as CustomEvent<{ handled: boolean, complete: () => void }>).detail
  const hero = root.value
  const g = geo.value
  if (!detail || !hero || !g || !motionEnabled()) return
  if (hero.getBoundingClientRect().bottom < window.innerHeight * 0.35) return

  detail.handled = true
  close()
  leaving.value = true
  const duration = readMotionDuration('--dur-home-exit', 520)
  const step = readMotionDuration('--orbit-step', 100)
  const easing = readMotionEasing('--ease-home-exit', 'ease-in')
  const nodes = nodeElements()
  nodes.forEach((node, i) => {
    node.getAnimations().forEach((a) => a.cancel())
    const angle = g.angles[i] ?? g.angles[g.angles.length - 1]
    node.animate(orbitFrames(g, angle, g.from, pt(g, angle), 'out'), {
      duration,
      delay: step * 0.5 * (nodes.length - 1 - i),
      easing,
      fill: 'forwards',
    })
  })
  exitTimer = window.setTimeout(detail.complete, duration + step * 0.5 * nodes.length)
}

let exitTimer = 0
let resizeTimer = 0
let resizeObserver: ResizeObserver | null = null
let lastWidth = 0

let enterStart = 0

function entranceElapsed() {
  if (!enterStart) return Infinity
  const elapsed = performance.now() - enterStart
  const span = readMotionDuration('--dur-orbit-draw', 1600) * 1.5 + readMotionDuration('--orbit-step', 100) * 12
  return elapsed < span ? elapsed : Infinity
}

/** 进场途中重绘（字体就绪等）时，新 SVG 元素的动画快进到已进行的时间，避免描线中途跳成终态 */
function syncStageEntrance() {
  const elapsed = entranceElapsed()
  if (!entering.value || !Number.isFinite(elapsed)) return
  stage.value?.getAnimations({ subtree: true }).forEach((a) => { a.currentTime = elapsed })
}

function relayout() {
  if (!Number.isFinite(entranceElapsed())) entering.value = false
  window.clearTimeout(resizeTimer)
  resizeTimer = window.setTimeout(layout, 80)
}

function onResize() {
  const W = root.value?.clientWidth ?? 0
  // 手机滚动时地址栏伸缩只改变高度，不重排避免画面跳动
  if (W === lastWidth && W < MOBILE_MAX) return
  lastWidth = W
  relayout()
}

onMounted(() => {
  lastWidth = root.value?.clientWidth ?? 0
  layout()
  ready.value = true
  enterStart = performance.now()
  launchNodes()
  window.addEventListener('home-page-exit-request', onHomeExitRequest)
  document.addEventListener('click', onDocumentClick)
  document.addEventListener('keydown', onKeydown)
  window.addEventListener('resize', onResize)
  window.addEventListener('aya-fonts-ready', relayout)
  if (typeof ResizeObserver !== 'undefined' && titleEl.value) {
    let firstObserve = true
    resizeObserver = new ResizeObserver(() => {
      if (firstObserve) {
        firstObserve = false
        return
      }
      relayout()
    })
    resizeObserver.observe(titleEl.value)
  }
})

onBeforeUnmount(() => {
  resetHeroPointer()
  window.clearTimeout(resizeTimer)
  window.clearTimeout(exitTimer)
  window.removeEventListener('home-page-exit-request', onHomeExitRequest)
  document.removeEventListener('click', onDocumentClick)
  document.removeEventListener('keydown', onKeydown)
  window.removeEventListener('resize', onResize)
  window.removeEventListener('aya-fonts-ready', relayout)
  resizeObserver?.disconnect()
})

watch(() => groups.value, () => nextTick(layout))
watch([openIndex, leaving], resetHeroPointer)
</script>

<template>
  <section
    ref="root"
    class="orbit-hero"
    :class="{ 'is-ready': ready, 'is-entering': entering, 'is-leaving': leaving, 'panel-open': openIndex >= 0 }"
    :data-mode="geo?.mode"
    :style="minHeight ? { minHeight } : undefined"
  >
    <div class="orbit-dotgrid" aria-hidden="true" />
    <svg ref="stage" class="orbit-stage" :class="{ 'is-static': !entering }" aria-hidden="true" />

    <div
      ref="figure"
      class="orbit-figure"
      :class="{ art: geo?.art }"
      @pointerenter="onHeroPointerMove"
      @pointermove="onHeroPointerMove"
      @pointerleave="resetHeroPointer"
      @pointercancel="resetHeroPointer"
    >
      <img v-if="props.image" class="orbit-haze" :src="props.image" alt="" aria-hidden="true" />
      <a
        v-if="photoLink"
        class="orbit-photo"
        :href="photoLink"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img v-if="props.image" :src="props.image" alt="Ayaskt" />
      </a>
      <div v-else class="orbit-photo">
        <img v-if="props.image" :src="props.image" alt="Ayaskt" />
      </div>
      <span class="orbit-caption" aria-hidden="true"><b>Neuro</b><i />{{ hero.ghost ?? 'Ayaskt' }}</span>
    </div>

    <div ref="titleEl" class="orbit-title" :style="titleStyle">
      <div class="orbit-eyebrow">NOTES · RESOURCES · {{ yearRange }}</div>
      <span class="orbit-ghost" aria-hidden="true">{{ hero.ghost ?? 'Ayaskt' }}</span>
      <h1 :aria-label="`${titleChars.join('')} ${hero.text ?? '笔记 / 资源汇总'}`">
        <span class="orbit-chars" aria-hidden="true">
          <span v-for="(c, i) in titleChars" :key="i" class="orbit-char" :style="{ '--c': i }">{{ c }}</span>
        </span>
        <small aria-hidden="true">{{ hero.text ?? '笔记 / 资源汇总' }}</small>
      </h1>
      <p v-if="hero.tagline" class="orbit-tagline">{{ hero.tagline }}</p>
      <HeroHitokoto class="orbit-hitokoto" />
    </div>

    <nav class="orbit-nodes" aria-label="课程学年">
      <template v-for="(n, i) in nodes" :key="n.id">
        <a v-if="n.href" class="orbit-node" :href="n.href" :style="nodePositions[i]">
          <span class="orbit-node-disc">{{ n.key }}</span>
          <span class="orbit-node-label"><b>{{ n.title }}</b><small>{{ n.meta }}</small></span>
        </a>
        <button
          v-else
          type="button"
          class="orbit-node"
          :style="nodePositions[i]"
          :aria-expanded="openIndex === i"
          aria-controls="orbit-panel"
          @click.stop="toggle(i)"
        >
          <span class="orbit-node-disc">
            {{ n.key }}
            <span v-if="n.now" class="orbit-badge">NOW</span>
          </span>
          <span class="orbit-node-label"><b>{{ n.title }}</b><small>{{ n.meta }}</small></span>
        </button>
      </template>
    </nav>

    <div
      v-if="tether"
      :key="`tether-${panelRun}`"
      class="orbit-tether"
      :class="{ open: !!openNode }"
      aria-hidden="true"
      :style="{
        left: `${tether.x}px`,
        top: `${tether.y}px`,
        width: `${tether.length}px`,
        transform: `rotate(${tether.angle}deg)`,
      }"
    />

    <div
      id="orbit-panel"
      ref="panelEl"
      class="orbit-panel"
      :class="{ open: !!openNode }"
      role="dialog"
      :aria-label="panelNode?.title"
      :aria-hidden="!openNode"
      :inert="openNode ? undefined : true"
      :style="panelPos ? { left: `${panelPos.left}px`, top: `${panelPos.top}px`, transformOrigin: panelPos.origin } : undefined"
    >
      <button type="button" class="orbit-panel-close" aria-label="关闭" @click="close">
        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" /></svg>
      </button>
      <div v-if="panelNode" :key="`panel-${panelRun}`" class="orbit-panel-body">
        <header style="--r: 0">
          <small>{{ panelNode.meta }}</small>
          <div class="orbit-panel-heading">
            <h3>{{ panelNode.title }}</h3>
            <span class="orbit-panel-count">{{ String(panelNode.courses.length).padStart(2, '0') }} COURSES</span>
          </div>
        </header>
        <i class="orbit-panel-rule" aria-hidden="true" />
        <ul>
          <li v-for="(c, ci) in panelNode.courses" :key="c.code + c.name" :style="{ '--r': ci + 2 }">
            <a
              :href="c.href"
              :target="c.external ? '_blank' : undefined"
              :rel="c.external ? 'noopener noreferrer' : undefined"
            >
              <code>{{ c.code }}</code>
              <span>{{ c.name }}</span>
              <i>{{ c.note || '' }}<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" /></svg></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="orbit-scrim" @click="close" />
  </section>
</template>

<style>
.Layout .VPHome:has(> .orbit-hero) { margin-bottom: 96px; }

/* 友情链接卡片自带 -8px 外边距，补齐到与 01 标题下方一致的 28px */
.VPHome:has(> .orbit-hero) .home-section-head + .VPFeatures { margin-top: 8px; }

@media (max-width: 799px) {
  .Layout .VPHome:has(> .orbit-hero) { margin-bottom: 64px; }
}

.orbit-hero {
  --o-accent: var(--vp-c-brand-1);
  --o-ink: var(--vp-c-text-1);
  --o-ink-2: var(--vp-c-text-2);
  --o-ink-3: var(--vp-c-text-3);
  --o-card: var(--vp-c-bg);
  --o-line: color-mix(in srgb, var(--o-accent) 22%, var(--vp-c-divider));
  --o-serif-latin: 'Bodoni Moda', Didot, 'Bodoni 72', 'Bodoni MT', 'Times New Roman', serif;
  --o-serif-zh: 'Noto Serif SC', 'Songti SC', serif;
  --o-mono: ui-monospace, 'SF Mono', 'JetBrains Mono', Menlo, Consolas, monospace;
  --o-ease: var(--ease-ios-fade, cubic-bezier(0.16, 1, 0.3, 1));

  position: relative;
  height: clamp(660px, 100svh, 900px);
  margin-top: calc(var(--vp-nav-height) * -1);
  overflow: hidden;
  isolation: isolate;
  color: var(--o-ink);
}

.dark .orbit-hero { --o-card: var(--vp-c-bg-elv); }

.orbit-hero a { color: inherit; text-decoration: none; }

@media (max-width: 959px) {
  .orbit-hero {
    height: clamp(600px, calc(100svh - var(--vp-nav-height)), 820px);
    margin-top: 0;
  }
}

/* 点阵底纹：以弧心为中心淡出 */
.orbit-hero .orbit-dotgrid {
  position: absolute;
  inset: 0;
  z-index: -1;
  background-image: radial-gradient(circle, color-mix(in srgb, var(--o-accent) 32%, transparent) 1px, transparent 1.4px);
  background-size: 22px 22px;
  background-position: var(--cx, 30%) var(--cy, 40%);
  mask-image: radial-gradient(ellipse 46% 52% at var(--cx, 30%) var(--cy, 40%), #000 0%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse 46% 52% at var(--cx, 30%) var(--cy, 40%), #000 0%, transparent 100%);
  opacity: 0;
}

.orbit-hero.is-ready .orbit-dotgrid {
  animation: orbit-grid-in calc(var(--dur-orbit-fade) * 1.8) var(--o-ease) 0s forwards;
}

/* 弧线 */
.orbit-hero .orbit-stage {
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;
}

.orbit-stage .arc { fill: none; stroke: url(#orbitArcGrad); stroke-width: 1.4; stroke-linecap: round; }
.orbit-stage .stop-edge { stop-color: var(--o-accent); stop-opacity: 0; }
.orbit-stage .stop-mid { stop-color: var(--o-accent); stop-opacity: 0.75; }

.orbit-stage .arc {
  stroke-dasharray: var(--len);
  stroke-dashoffset: var(--len);
  animation: orbit-draw var(--dur-orbit-draw) var(--o-ease) calc(var(--orbit-step) * 3) forwards;
}

.orbit-stage .arc-dots {
  fill: none;
  stroke: color-mix(in srgb, var(--o-accent) 45%, transparent);
  stroke-width: 2;
  stroke-linecap: round;
  stroke-dasharray: 0 9;
}

.orbit-stage .bead { fill: color-mix(in srgb, var(--o-accent) 55%, transparent); }
.orbit-stage .bead-major { fill: var(--o-card); stroke: var(--o-accent); stroke-width: 1; }
.orbit-stage .cap { fill: var(--o-accent); }
.orbit-stage .cap-ring { fill: none; stroke: color-mix(in srgb, var(--o-accent) 40%, transparent); stroke-width: 1; }
.orbit-stage .guide { stroke: color-mix(in srgb, var(--o-accent) 14%, transparent); stroke-width: 1; stroke-dasharray: 2 6; }
.orbit-stage .mark { stroke: color-mix(in srgb, var(--o-accent) 60%, transparent); stroke-width: 1; }

.orbit-stage .fade {
  opacity: 0;
  animation: orbit-fade-in var(--dur-orbit-fade) var(--o-ease) calc(var(--o) * var(--orbit-step)) forwards;
}

/* 进场：外圈点阵顺着轨道流入；刻点在描线经过时弹出；端点外环收拢；参考线自上而下生长 */
.orbit-stage .arc-dots {
  animation: orbit-dots-flow calc(var(--dur-orbit-draw) * 1.4) var(--o-ease) calc(var(--orbit-step) * 4) backwards;
}

.orbit-stage .beads circle,
.orbit-stage .cap-ring,
.orbit-stage .mark,
.orbit-stage .guide {
  transform-box: fill-box;
  transform-origin: center;
}

.orbit-stage .beads circle {
  animation: orbit-bead calc(var(--dur-orbit-pop) * 0.7) var(--ease-ios-spring) calc(var(--orbit-step) * 3 + var(--dur-orbit-draw) * var(--f) * 0.55) backwards;
}

.orbit-stage .cap-ring {
  animation: orbit-cap var(--dur-orbit-fade) var(--o-ease) calc(var(--orbit-step) * 9) backwards;
}

.orbit-stage .guide {
  transform-origin: 50% 0;
  animation: orbit-grow-y calc(var(--dur-orbit-draw) * 1.1) var(--o-ease) calc(var(--orbit-step) * 1) backwards;
}

.orbit-stage .mark {
  animation: orbit-mark var(--dur-orbit-fade) var(--o-ease) calc(var(--orbit-step) * 6) backwards;
}

.orbit-stage.is-static .arc { stroke-dasharray: none; stroke-dashoffset: 0; animation: none; }
.orbit-stage.is-static .fade { opacity: 1; animation: none; }
.orbit-stage.is-static :is(.arc-dots, .beads circle, .cap-ring, .guide, .mark) { animation: none; }

/* 主视觉 */
.orbit-hero .orbit-figure {
  --figure-scale: 1.22;
  position: absolute;
  z-index: 1;
  width: calc(var(--fw) * var(--figure-scale));
  height: calc(var(--fh) * var(--figure-scale));
  left: calc(var(--fx) - var(--fw) * var(--figure-scale) / 2);
  top: calc(var(--fy) - var(--fh) * var(--figure-scale) / 2);
  opacity: 0;
  transition: opacity var(--dur-orbit-panel) var(--o-ease), filter var(--dur-orbit-panel) var(--o-ease);
}

.orbit-hero.is-ready .orbit-figure {
  animation: orbit-rise calc(var(--dur-orbit-fade) * 1.1) var(--o-ease) calc(var(--orbit-step) * 1) forwards;
}

.orbit-hero .orbit-photo,
.orbit-hero .orbit-photo img {
  display: block;
  width: 100%;
  height: 100%;
}

/* 中央主体清晰，边缘羽化后与下层模糊光晕融合。 */
.orbit-hero .orbit-photo img,
.orbit-hero .orbit-haze {
  object-fit: contain;
  object-position: center;
}

.orbit-hero .orbit-photo img {
  mask-image: radial-gradient(ellipse farthest-side at 50% 48%, #000 58%, rgb(0 0 0 / 90%) 72%, rgb(0 0 0 / 40%) 88%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse farthest-side at 50% 48%, #000 58%, rgb(0 0 0 / 90%) 72%, rgb(0 0 0 / 40%) 88%, transparent 100%);
  mask-size: 100% 100%;
  -webkit-mask-size: 100% 100%;
  mask-position: center;
  -webkit-mask-position: center;
  mask-repeat: no-repeat;
  -webkit-mask-repeat: no-repeat;
}

/* 镜头开合：羽化遮罩从中心张开，同时由虚到实 */
.orbit-hero.is-ready .orbit-photo img {
  animation: orbit-lens-open calc(var(--dur-orbit-draw) * 1.05) var(--ease-home-orbit) calc(var(--orbit-step) * 1) backwards;
}

.orbit-hero.is-ready .orbit-haze {
  animation: orbit-haze-in calc(var(--dur-orbit-fade) * 1.6) var(--o-ease) calc(var(--orbit-step) * 6) backwards;
}

.orbit-hero .orbit-haze {
  position: absolute;
  inset: -4%;
  width: 108%;
  height: 108%;
  filter: blur(14px) saturate(1.1);
  opacity: 0.6;
  mask-image: radial-gradient(ellipse farthest-side at 50% 48%, transparent 38%, #000 66%, rgb(0 0 0 / 70%) 82%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse farthest-side at 50% 48%, transparent 38%, #000 66%, rgb(0 0 0 / 70%) 82%, transparent 100%);
  pointer-events: none;
}

.dark .orbit-hero .orbit-haze { opacity: 0.35; }

.orbit-hero .orbit-photo { position: relative; }

.orbit-hero .orbit-photo img,
.orbit-hero .orbit-haze {
  translate: var(--orbit-pointer-x, 0px) var(--orbit-pointer-y, 0px);
  transition: translate var(--dur-orbit-panel) var(--o-ease);
}

.orbit-hero .orbit-caption {
  position: absolute;
  top: calc(100% - 4px);
  left: 30%;
  right: 30%;
  display: flex;
  align-items: center;
  gap: 10px;
  font: 500 10px/1 var(--o-mono);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--o-ink-3);
  white-space: nowrap;
}

.orbit-hero .orbit-caption b { font-weight: 500; color: var(--o-accent); }

.orbit-hero .orbit-caption i {
  flex: 1;
  height: 1px;
  background-image: radial-gradient(circle, color-mix(in srgb, var(--o-accent) 60%, transparent) 0.8px, transparent 1px);
  background-size: 5px 1px;
}

.orbit-hero .orbit-figure:not(.art) .orbit-caption { display: none; }

/* 标题 */
.orbit-hero .orbit-title {
  position: absolute;
  z-index: 3;
  right: var(--col-right, 64px);
  bottom: 8%;
  width: min(36vw, 480px);
  opacity: 0;
}

.orbit-hero.is-ready .orbit-title {
  animation: orbit-fade-in calc(var(--dur-orbit-fade) * 0.4) linear calc(var(--orbit-step) * 4) forwards;
}

/* 标题进场：字距收拢、描边字擦出、主标题逐字由虚到实升起 */
.orbit-hero.is-ready .orbit-eyebrow {
  animation: orbit-track-in calc(var(--dur-orbit-fade) * 1.3) var(--o-ease) calc(var(--orbit-step) * 4) backwards;
}

.orbit-hero.is-ready .orbit-eyebrow::before {
  transform-origin: left;
  animation: orbit-grow-x var(--dur-orbit-fade) var(--o-ease) calc(var(--orbit-step) * 5) backwards;
}

.orbit-hero.is-ready .orbit-ghost {
  animation: orbit-wipe calc(var(--dur-orbit-draw) * 0.9) var(--ease-home-orbit) calc(var(--orbit-step) * 5) backwards;
}

.orbit-hero .orbit-char { display: inline-block; }

.orbit-hero.is-ready .orbit-char {
  animation: orbit-char-in calc(var(--dur-orbit-fade) * 0.9) var(--ease-home-orbit) calc(var(--orbit-step) * (6.5 + var(--c) * 1.4)) backwards;
}

.orbit-hero.is-ready .orbit-title h1 small,
.orbit-hero.is-ready .orbit-tagline,
.orbit-hero.is-ready .orbit-title .orbit-hitokoto {
  animation: orbit-rise-sm var(--dur-orbit-fade) var(--o-ease) calc(var(--orbit-step) * 10) backwards;
}

.orbit-hero.is-ready .orbit-tagline { animation-delay: calc(var(--orbit-step) * 11.5); }
.orbit-hero.is-ready .orbit-title .orbit-hitokoto { animation-delay: calc(var(--orbit-step) * 13); }

.orbit-hero .orbit-eyebrow {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  font: 500 11px/1 var(--o-mono);
  letter-spacing: 0.18em;
  color: var(--o-accent);
  white-space: nowrap;
}

.orbit-hero .orbit-eyebrow::before {
  content: "";
  width: 22px;
  height: 1px;
  background: currentColor;
  opacity: 0.6;
}

.orbit-hero .orbit-ghost {
  display: block;
  font-family: var(--o-serif-latin);
  font-size: clamp(52px, 7vw, 112px);
  font-style: italic;
  font-weight: 400;
  line-height: 0.9;
  color: transparent;
  -webkit-text-stroke: 1px color-mix(in srgb, var(--o-accent) 55%, transparent);
}

.orbit-hero .orbit-title h1 {
  margin: -0.3em 0 0;
  border: 0;
  padding: 0;
  font-family: var(--o-serif-zh);
  font-size: clamp(46px, 6.2vw, 96px);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: 0.02em;
  color: var(--o-ink);
}

:root:not(.dark) .orbit-hero .orbit-title h1 { color: #141413; }

.orbit-hero .orbit-title h1 small {
  display: block;
  margin-top: 0.4em;
  font-size: 0.32em;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: var(--o-ink-2);
}

.orbit-hero .orbit-tagline {
  margin: 20px 0 0;
  padding-top: 16px;
  border-top: 1px solid var(--o-line);
  font-family: var(--o-serif-latin);
  font-size: clamp(16px, 1.4vw, 20px);
  font-style: italic;
  color: var(--o-ink-2);
}

.orbit-hero .orbit-title .orbit-hitokoto {
  margin: 8px 0 0;
  width: auto;
  font-size: 13px;
  text-align: left;
  color: var(--o-ink-3);
}

/* 弧上节点 */
.orbit-hero .orbit-node {
  position: absolute;
  z-index: 4;
  left: var(--x, -999px);
  top: var(--y, -999px);
  display: grid;
  justify-items: center;
  gap: 10px;
  width: 160px;
  margin: calc(var(--size, 64px) / -2) 0 0 -80px;
  padding: 0;
  border: 0;
  background: none;
  color: var(--o-ink);
  font: inherit;
  cursor: pointer;
  opacity: 0;
}

.orbit-hero.is-ready .orbit-node {
  animation: orbit-pop var(--dur-orbit-pop) var(--o-ease) 0s forwards;
}

.orbit-hero.is-ready.is-entering .orbit-node {
  animation-delay: calc(var(--orbit-step) * (6 + var(--i) * 1.2));
}

.orbit-hero .orbit-node-disc {
  position: relative;
  display: grid;
  place-items: center;
  width: var(--size);
  height: var(--size);
  border: 1px solid color-mix(in srgb, var(--vp-c-divider) 70%, transparent);
  border-radius: 50%;
  background: var(--o-card);
  box-shadow: var(--aya-elevation-2);
  font-family: var(--o-serif-latin);
  font-size: calc(var(--size) * 0.3);
  font-style: normal;
  font-weight: 700;
  color: var(--o-accent);
  transition:
    translate var(--dur-menu, 0.32s) var(--o-ease),
    box-shadow var(--dur-menu, 0.32s) var(--o-ease),
    border-color var(--dur-menu, 0.32s) var(--o-ease);
}

.orbit-hero .orbit-node:hover .orbit-node-disc,
.orbit-hero .orbit-node:focus-visible .orbit-node-disc,
.orbit-hero .orbit-node[aria-expanded="true"] .orbit-node-disc {
  border-color: color-mix(in srgb, var(--o-accent) 45%, transparent);
  box-shadow: var(--aya-elevation-3);
}

/* 选中的圆盘是点线的起点，不再上浮 */
.orbit-hero .orbit-node:not([aria-expanded="true"]):is(:hover, :focus-visible) .orbit-node-disc {
  translate: 0 -3px;
}

.orbit-hero .orbit-node:focus-visible { outline: none; }
.orbit-hero .orbit-node:focus-visible .orbit-node-label b { text-decoration: underline; text-underline-offset: 4px; }

.orbit-hero .orbit-node-label {
  display: grid;
  justify-items: center;
  gap: 5px;
  margin-top: 4px;
  text-align: center;
  transform: translateX(var(--label-shift, 0px));
}

.orbit-hero .orbit-node-label b {
  font-family: var(--o-serif-zh);
  font-size: 15px;
  font-weight: 700;
}

.orbit-hero .orbit-node-label small {
  font: 400 10px/1 var(--o-mono);
  letter-spacing: 0.08em;
  color: var(--o-ink-3);
}

.orbit-hero .orbit-badge {
  position: absolute;
  top: -6px;
  right: -12px;
  padding: 3px 7px;
  border-radius: var(--aya-radius-pill);
  background: var(--o-accent);
  color: #fff;
  font: normal 500 9px/1 var(--o-mono);
  letter-spacing: 0.1em;
}

/* 课程面板：从被点的圆盘方向展开（transform-origin 由 place() 写入），内容逐行对焦 */
.orbit-hero .orbit-panel {
  --panel-in: var(--dur-orbit-panel);
  --panel-out: var(--dur-menu-out, 0.22s);
  position: absolute;
  z-index: 10;
  display: flex;
  flex-direction: column;
  width: 352px;
  overflow: hidden;
  padding: 20px 14px 10px;
  border: 1px solid color-mix(in srgb, var(--vp-c-divider) 70%, transparent);
  border-radius: var(--aya-radius-lg);
  background: color-mix(in srgb, var(--o-card) 92%, transparent);
  box-shadow: var(--aya-elevation-4);
  backdrop-filter: var(--aya-frosted-blur-panel, blur(30px)) saturate(170%);
  -webkit-backdrop-filter: var(--aya-frosted-blur-panel, blur(30px)) saturate(170%);
  opacity: 0;
  visibility: hidden;
  filter: blur(6px);
  transform: scale(0.94);
  pointer-events: none;
  transition:
    opacity var(--panel-out) var(--ease-home-exit, ease-in),
    filter var(--panel-out) var(--ease-home-exit, ease-in),
    transform var(--panel-out) var(--ease-home-exit, ease-in),
    visibility 0s linear var(--panel-out);
}

.orbit-hero .orbit-panel.open {
  opacity: 1;
  visibility: visible;
  filter: none;
  transform: none;
  pointer-events: auto;
  transition:
    opacity calc(var(--panel-in) * 0.7) var(--o-ease),
    filter var(--panel-in) var(--o-ease),
    transform var(--panel-in) var(--ease-home-orbit),
    visibility 0s;
}

.orbit-hero .orbit-panel-body > header,
.orbit-hero .orbit-panel-body li {
  animation: orbit-panel-row calc(var(--panel-in) * 1.15) var(--o-ease)
    calc(var(--panel-in) * 0.25 + var(--r, 0) * var(--orbit-step) * 0.5) backwards;
}

.orbit-hero .orbit-panel header {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 8px 12px;
}

.orbit-hero .orbit-panel header small {
  padding-right: 30px;
  font: 500 10.5px/1.5 var(--o-mono);
  letter-spacing: 0.16em;
  color: var(--o-accent);
}

.orbit-hero .orbit-panel-heading {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
}

.orbit-hero .orbit-panel-count {
  flex-shrink: 0;
  font: 500 10px/1 var(--o-mono);
  letter-spacing: 0.14em;
  color: var(--o-ink-3);
}

.orbit-hero .orbit-panel h3 {
  margin: 0;
  font-family: var(--o-serif-zh);
  font-size: 21px;
  font-weight: 700;
  line-height: 1.3;
  color: var(--o-ink);
}

:root:not(.dark) .orbit-hero .orbit-panel h3 { color: #141413; }

/* 标题下的点线：和正文刻度同一套语言，从左向右描出 */
.orbit-hero .orbit-panel-rule {
  display: block;
  height: 1px;
  margin: 0 8px 4px;
  background-image: radial-gradient(circle, color-mix(in srgb, var(--o-accent) 60%, transparent) 0.8px, transparent 1px);
  background-size: 6px 1px;
  mask-image: linear-gradient(90deg, #000 0%, #000 70%, transparent 100%);
  -webkit-mask-image: linear-gradient(90deg, #000 0%, #000 70%, transparent 100%);
  transform-origin: left center;
  animation: orbit-grow-x calc(var(--panel-in) * 1.6) var(--ease-home-orbit) calc(var(--panel-in) * 0.3) backwards;
}

.orbit-hero .orbit-panel-body {
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.orbit-hero .orbit-panel ul {
  position: relative;
  min-height: 0;
  margin: 2px 0 0;
  padding: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  list-style: none;
}

.orbit-hero .orbit-panel li a {
  position: relative;
  display: grid;
  grid-template-columns: 56px 1fr auto;
  align-items: center;
  gap: 10px;
  padding: 11px 8px;
  border-radius: var(--aya-radius-sm);
  color: var(--o-ink);
  text-decoration: none;
  transition: background-color var(--dur-menu, 0.32s) var(--o-ease);
}

.orbit-hero .orbit-panel li + li a::before {
  content: "";
  position: absolute;
  top: 0;
  left: 8px;
  right: 8px;
  height: 1px;
  background-image: radial-gradient(circle, color-mix(in srgb, var(--vp-c-divider) 100%, transparent) 0.7px, transparent 1px);
  background-size: 4px 1px;
  transition: opacity var(--dur-menu, 0.32s) var(--o-ease);
}

.orbit-hero .orbit-panel li a:hover,
.orbit-hero .orbit-panel li a:focus-visible {
  outline: none;
  background: color-mix(in srgb, var(--o-accent) 8%, transparent);
}

.orbit-hero .orbit-panel li a:hover::before,
.orbit-hero .orbit-panel li a:focus-visible::before,
.orbit-hero .orbit-panel li:has(a:hover) + li a::before,
.orbit-hero .orbit-panel li:has(a:focus-visible) + li a::before {
  opacity: 0;
}

.orbit-hero .orbit-panel li code {
  padding: 0;
  background: none;
  font: italic 400 15px/1 var(--o-serif-latin);
  color: var(--o-accent);
  transition: translate var(--dur-menu, 0.32s) var(--o-ease);
}

.orbit-hero .orbit-panel li span {
  font-size: 14px;
  transition: color var(--dur-menu, 0.32s) var(--o-ease);
}

.orbit-hero .orbit-panel li i {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-style: normal;
  color: var(--o-ink-3);
}

.orbit-hero .orbit-panel li i svg {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.4;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: translate var(--dur-menu, 0.32s) var(--ease-ios-spring), color var(--dur-menu, 0.32s) var(--o-ease);
}

.orbit-hero .orbit-panel li a:is(:hover, :focus-visible) code { translate: 3px 0; }
.orbit-hero .orbit-panel li a:is(:hover, :focus-visible) span { color: var(--o-accent); }
.orbit-hero .orbit-panel li a:is(:hover, :focus-visible) i svg { translate: 4px 0; color: var(--o-accent); }

.orbit-hero .orbit-panel-close {
  position: absolute;
  z-index: 1;
  top: 12px;
  right: 12px;
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  color: var(--o-ink-3);
  transition:
    background-color var(--dur-menu, 0.32s) var(--o-ease),
    color var(--dur-menu, 0.32s) var(--o-ease),
    rotate var(--dur-menu, 0.32s) var(--ease-ios-spring);
}

.orbit-hero .orbit-panel-close svg {
  width: 12px;
  height: 12px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
}

.orbit-hero .orbit-panel-close:is(:hover, :focus-visible) {
  outline: none;
  rotate: 90deg;
  color: var(--o-accent);
  background: color-mix(in srgb, var(--o-accent) 9%, transparent);
}

/* 圆盘到面板的点线：从圆盘一端描出，末端一枚小圆点 */
.orbit-hero .orbit-tether {
  position: absolute;
  z-index: 9;
  height: 1px;
  margin-top: -0.5px;
  transform-origin: 0 50%;
  pointer-events: none;
  opacity: 0;
  transition: opacity var(--dur-menu-out, 0.22s) var(--ease-home-exit, ease-in);
}

.orbit-hero .orbit-tether.open {
  opacity: 1;
  transition: none;
}

.orbit-hero .orbit-tether::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, color-mix(in srgb, var(--o-accent) 70%, transparent) 0.9px, transparent 1.2px);
  background-size: 6px 1px;
  transform-origin: left center;
  animation: orbit-grow-x calc(var(--dur-orbit-panel) * 1.3) var(--ease-home-orbit) backwards;
}

.orbit-hero .orbit-tether::after {
  content: "";
  position: absolute;
  top: -2.5px;
  right: -3px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--o-accent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--o-accent) 16%, transparent);
  animation: orbit-tether-dot calc(var(--dur-orbit-panel) * 0.9) var(--ease-ios-spring)
    calc(var(--dur-orbit-panel) * 0.9) backwards;
}

/* 选中的圆盘：强调色底 + 一圈慢转的点线环；其余节点退后 */
.orbit-hero .orbit-node-disc::after {
  content: "";
  position: absolute;
  inset: -8px;
  border: 1.5px dotted color-mix(in srgb, var(--o-accent) 70%, transparent);
  border-radius: 50%;
  opacity: 0;
  scale: 0.8;
  pointer-events: none;
  transition: opacity var(--dur-menu, 0.32s) var(--o-ease), scale var(--dur-orbit-panel) var(--ease-ios-spring);
}

.orbit-hero .orbit-node[aria-expanded="true"] .orbit-node-disc {
  background: color-mix(in srgb, var(--o-accent) 10%, var(--o-card));
}

.orbit-hero .orbit-node[aria-expanded="true"] .orbit-node-disc::after {
  opacity: 1;
  scale: 1;
  animation: orbit-ring-spin 14s linear infinite;
}

.orbit-hero .orbit-node .orbit-node-label {
  transition: opacity var(--dur-menu, 0.32s) var(--o-ease);
}

.orbit-hero.panel-open .orbit-node:not([aria-expanded="true"]) .orbit-node-label {
  opacity: 0.5;
}

.orbit-hero.panel-open .orbit-node[aria-expanded="true"] .orbit-node-label b {
  color: var(--o-accent);
}

.orbit-hero .orbit-scrim { display: none; }

@media (min-width: 800px) {
  .orbit-hero.panel-open .orbit-figure { opacity: 0.18 !important; filter: blur(6px); }
}

/* 离场：弧线从末端缩回起点，点线淡出，镜头合拢，标题上浮虚化 */
.orbit-hero.is-leaving .orbit-stage .arc {
  stroke-dasharray: var(--len);
  animation: orbit-undraw var(--dur-home-exit) var(--ease-ios-slide) forwards;
}

.orbit-hero.is-leaving .orbit-stage :is(.arc-dots, .beads, .fade) {
  animation: orbit-fade-out calc(var(--dur-home-exit) * 0.7) var(--ease-home-exit) forwards;
}

.orbit-hero.is-leaving .orbit-photo img {
  animation: orbit-lens-close var(--dur-home-exit) var(--ease-ios-slide) forwards;
}

.orbit-hero.is-leaving :is(.orbit-haze, .orbit-dotgrid, .orbit-caption) {
  animation: orbit-fade-out calc(var(--dur-home-exit) * 0.8) var(--ease-home-exit) forwards;
}

.orbit-hero.is-leaving .orbit-title > :not(h1),
.orbit-hero.is-leaving .orbit-title h1 small,
.orbit-hero.is-leaving .orbit-char {
  animation: orbit-float-out var(--dur-home-exit) var(--ease-home-exit) forwards;
}

.orbit-hero.is-leaving .orbit-char { animation-delay: calc(var(--c) * var(--orbit-step) * 0.4); }

@keyframes orbit-draw { to { stroke-dashoffset: 0; } }
@keyframes orbit-undraw { from { stroke-dashoffset: 0; } to { stroke-dashoffset: var(--len); } }
@keyframes orbit-fade-in { to { opacity: 1; } }
/* 光晕淡入到当前主题的静态透明度，避免动画结束时从 1 突然回落。 */
@keyframes orbit-haze-in { from { opacity: 0; } }
@keyframes orbit-fade-out { to { opacity: 0; } }
@keyframes orbit-grid-in { from { opacity: 0; transform: scale(1.12); } to { opacity: 1; transform: none; } }
@keyframes orbit-dots-flow { from { opacity: 0; stroke-dashoffset: 180; } to { opacity: 1; stroke-dashoffset: 0; } }
@keyframes orbit-bead { from { opacity: 0; transform: scale(0); } }
@keyframes orbit-cap { from { opacity: 0; transform: scale(3.2); } }
@keyframes orbit-grow-y { from { transform: scaleY(0); } }
@keyframes orbit-grow-x { from { transform: scaleX(0); } }
@keyframes orbit-mark { from { opacity: 0; transform: rotate(-90deg) scale(0.4); } }
@keyframes orbit-lens-open {
  from {
    mask-size: 18% 18%;
    -webkit-mask-size: 18% 18%;
    filter: blur(14px) saturate(1.4);
    scale: 1.12;
  }
}
@keyframes orbit-lens-close {
  to {
    mask-size: 0% 0%;
    -webkit-mask-size: 0% 0%;
    filter: blur(10px);
    scale: 0.92;
  }
}
@keyframes orbit-track-in { from { opacity: 0; letter-spacing: 0.7em; } }
@keyframes orbit-wipe {
  from { clip-path: inset(-20% 100% -20% -10%); opacity: 0.2; }
  to { clip-path: inset(-20% -10% -20% -10%); opacity: 1; }
}
@keyframes orbit-char-in { from { opacity: 0; transform: translateY(0.45em) rotate(4deg); filter: blur(10px); } }
@keyframes orbit-rise-sm { from { opacity: 0; transform: translateY(10px); } }
@keyframes orbit-float-out { to { opacity: 0; transform: translateY(-16px); filter: blur(8px); } }
@keyframes orbit-rise { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
@keyframes orbit-slide-in { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
@keyframes orbit-pop { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
@keyframes orbit-panel-row { from { opacity: 0; transform: translateY(6px); filter: blur(4px); } }
@keyframes orbit-tether-dot { from { opacity: 0; scale: 0; } }
@keyframes orbit-ring-spin { to { rotate: 360deg; } }

/* 竖屏平板：标题与下方区块共用 48px 内容栏 */
@media (min-width: 640px) and (max-width: 799px) {
  .orbit-hero[data-mode="mobile"] .orbit-title { right: 48px; left: 48px; }
}

/* 手机：头像在上，节点沿下方弧线，标题在最下 */
@media (max-width: 799px) {
  .orbit-hero .orbit-figure { --figure-scale: 1.12; }
  .orbit-hero { height: auto; min-height: 640px; }
  .orbit-hero .orbit-title {
    top: var(--title-top, 520px);
    right: 24px;
    bottom: auto;
    left: 24px;
    width: auto;
  }
  .orbit-hero .orbit-node { width: 110px; margin-left: -55px; gap: 4px; }
  .orbit-hero .orbit-node-label { transform: none; }
  .orbit-hero .orbit-node-label b { font-size: 13px; }
  .orbit-hero .orbit-node-label small { display: none; }
  .orbit-hero .orbit-panel {
    position: fixed;
    right: 12px;
    bottom: calc(12px + env(safe-area-inset-bottom));
    left: 12px !important;
    top: auto !important;
    z-index: 70;
    width: auto;
    max-height: 70svh;
    overflow-y: auto;
    padding-top: 26px;
    border-radius: var(--aya-radius-xl);
    filter: none;
    transform: translateY(calc(100% + 24px));
    transform-origin: center bottom !important;
  }
  .orbit-hero .orbit-panel.open { transform: none; }
  /* 底部抽屉的把手 */
  .orbit-hero .orbit-panel::before {
    content: "";
    position: absolute;
    top: 9px;
    left: 50%;
    width: 36px;
    height: 4px;
    margin-left: -18px;
    border-radius: 2px;
    background: color-mix(in srgb, var(--o-ink-3) 30%, transparent);
  }
  .orbit-hero .orbit-panel-close { top: 16px; }
  .orbit-hero .orbit-tether { display: none; }
  .orbit-hero .orbit-scrim {
    position: fixed;
    inset: 0;
    z-index: 69;
    display: block;
    background: rgb(20 26 34 / 22%);
    backdrop-filter: var(--aya-frosted-blur-backdrop, blur(4px));
    -webkit-backdrop-filter: var(--aya-frosted-blur-backdrop, blur(4px));
    opacity: 0;
    pointer-events: none;
    transition: opacity var(--dur-overlay) var(--o-ease);
  }
  .orbit-hero.panel-open .orbit-scrim { opacity: 1; pointer-events: auto; }
}

@media (prefers-reduced-motion: reduce) {
  .orbit-hero .orbit-photo img,
  .orbit-hero .orbit-haze {
    translate: none !important;
  }

  .orbit-hero *,
  .orbit-hero *::before,
  .orbit-hero *::after {
    animation-duration: 0.01ms !important;
    animation-delay: 0s !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
