<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue'
import katex from 'katex'
import { Transformer } from 'markmap-lib'
import { Markmap, deriveOptions } from 'markmap-view'
import type { IMarkmapJSONOptions } from 'markmap-view'
import 'katex/dist/katex.min.css'

type ExportFormat = 'svg' | 'png' | 'pdf'

interface MarkmapLayoutRect {
  x: number
  y: number
  width: number
  height: number
}

interface MarkmapLayoutNode {
  content?: string
  children?: MarkmapLayoutNode[]
  payload?: {
    fold?: number
  }
  state: {
    rect: MarkmapLayoutRect
  }
}

interface MarkmapLayoutBounds {
  minX: number
  minY: number
  maxX: number
  maxY: number
}

type PatchedMarkmap = Markmap & {
  state: Markmap['state'] & {
    data?: MarkmapLayoutNode
    rect: {
      x1: number
      y1: number
      x2: number
      y2: number
    }
  }
  _relayout: () => void
  __mindMapRelayoutPatched?: boolean
}

declare global {
  interface Window {
    katex?: typeof katex
  }
}

if (typeof window !== 'undefined') {
  window.katex = katex
}

const props = withDefaults(defineProps<{
  source: string
  title?: string
  height?: string
  initialExpandLevel?: number
}>(), {
  title: '',
  height: '420px',
  initialExpandLevel: -1,
})

const svgRef = ref<SVGElement | null>(null)
const surfaceRef = ref<HTMLElement | null>(null)
const exportMenuRef = ref<HTMLElement | null>(null)
const error = ref('')
const isExpanded = ref(false)
const isClosingExpanded = ref(false)
const isExportMenuOpen = ref(false)
const transformer = new Transformer()
const exportMenuId = `${useId()}-export-menu`

let markmap: Markmap | undefined
let resizeObserver: ResizeObserver | undefined
let fitTimer: number | undefined
let expandedCloseTimer: number | undefined
let renderVersion = 0

const displayTitle = computed(() => props.title.trim())
const hasTitle = computed(() => displayTitle.value.length > 0)
const ariaLabel = computed(() => {
  return hasTitle.value ? `${displayTitle.value} 思维导图` : '思维导图'
})
const expandLabel = computed(() => {
  return isExpanded.value ? '收起思维导图' : '展开思维导图'
})
const surfaceStyle = computed(() => ({
  '--mind-map-height': props.height,
}))
const isModalActive = computed(() => isExpanded.value || isClosingExpanded.value)
const backdropMotionClass = computed(() => {
  return isClosingExpanded.value
    ? 'animate__animated animate__fadeOut mind-map-backdrop-motion'
    : 'animate__animated animate__fadeIn mind-map-backdrop-motion'
})
const panelMotionClass = computed(() => {
  if (isClosingExpanded.value) return 'animate__animated animate__zoomOut mind-map-panel-motion'
  if (isExpanded.value) return 'animate__animated animate__zoomIn mind-map-panel-motion'
  return ''
})

function prefersReducedMotion() {
  return typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function getOptions() {
  const reduceMotion = prefersReducedMotion()
  const jsonOptions: Partial<IMarkmapJSONOptions> = {
    color: ['#6BAFD4', '#9EA7F4', '#E5B8CC', '#82C6A5', '#E6BD6D'],
    colorFreezeLevel: 2,
    duration: reduceMotion ? 0 : 360,
    fitRatio: 0.9,
    initialExpandLevel: props.initialExpandLevel,
    lineWidth: 1.35,
    maxInitialScale: 1.5,
    maxWidth: 260,
    nodeMinHeight: 18,
    paddingX: 12,
    spacingHorizontal: 86,
    spacingVertical: 8,
  }

  return deriveOptions(jsonOptions)
}

function hasInvisibleRoot(root: { content?: string; children?: unknown[] }) {
  return !String(root.content || '').trim() && !!root.children?.length
}

function createEmptyBounds(): MarkmapLayoutBounds {
  return {
    minX: Number.POSITIVE_INFINITY,
    minY: Number.POSITIVE_INFINITY,
    maxX: Number.NEGATIVE_INFINITY,
    maxY: Number.NEGATIVE_INFINITY,
  }
}

function includeRect(bounds: MarkmapLayoutBounds, rect: MarkmapLayoutRect) {
  bounds.minX = Math.min(bounds.minX, rect.x)
  bounds.minY = Math.min(bounds.minY, rect.y)
  bounds.maxX = Math.max(bounds.maxX, rect.x + rect.width)
  bounds.maxY = Math.max(bounds.maxY, rect.y + rect.height)
}

function includeBounds(bounds: MarkmapLayoutBounds, next: MarkmapLayoutBounds) {
  bounds.minX = Math.min(bounds.minX, next.minX)
  bounds.minY = Math.min(bounds.minY, next.minY)
  bounds.maxX = Math.max(bounds.maxX, next.maxX)
  bounds.maxY = Math.max(bounds.maxY, next.maxY)
}

function hasBounds(bounds: MarkmapLayoutBounds) {
  return Number.isFinite(bounds.minX)
    && Number.isFinite(bounds.minY)
    && Number.isFinite(bounds.maxX)
    && Number.isFinite(bounds.maxY)
}

function walkVisibleTree(node: MarkmapLayoutNode, visitor: (node: MarkmapLayoutNode) => void) {
  visitor(node)
  if (node.payload?.fold) return
  node.children?.forEach((child) => walkVisibleTree(child, visitor))
}

function getVisibleTreeBounds(node: MarkmapLayoutNode) {
  const bounds = createEmptyBounds()

  walkVisibleTree(node, (current) => {
    includeRect(bounds, current.state.rect)
  })

  return bounds
}

function translateVisibleTree(node: MarkmapLayoutNode, dx: number, dy: number) {
  walkVisibleTree(node, (current) => {
    current.state.rect.x += dx
    current.state.rect.y += dy
  })
}

function alignInvisibleRootHeadings(markmapInstance: PatchedMarkmap) {
  const root = markmapInstance.state.data
  if (!root || !hasInvisibleRoot(root) || !root.children || root.children.length < 2) return

  const rowGap = Math.max(72, markmapInstance.options.spacingHorizontal || 0)
  const headingY = 0
  const nextBounds = createEmptyBounds()
  let nextMinX = 0

  for (const child of root.children) {
    const bounds = getVisibleTreeBounds(child)
    if (!hasBounds(bounds)) continue

    const dx = nextMinX - bounds.minX
    const dy = headingY - child.state.rect.y
    translateVisibleTree(child, dx, dy)

    const movedBounds = {
      minX: bounds.minX + dx,
      minY: bounds.minY + dy,
      maxX: bounds.maxX + dx,
      maxY: bounds.maxY + dy,
    }

    includeBounds(nextBounds, movedBounds)
    nextMinX = movedBounds.maxX + rowGap
  }

  if (!hasBounds(nextBounds)) return

  root.state.rect = {
    x: nextBounds.minX,
    y: headingY,
    width: 0,
    height: 0,
  }
  markmapInstance.state.rect = {
    x1: nextBounds.minX,
    y1: nextBounds.minY,
    x2: nextBounds.maxX,
    y2: nextBounds.maxY,
  }
}

function patchRelayout(markmapInstance: Markmap) {
  const patched = markmapInstance as PatchedMarkmap
  if (patched.__mindMapRelayoutPatched) return

  const relayout = patched._relayout.bind(patched)

  patched._relayout = () => {
    relayout()
    alignInvisibleRootHeadings(patched)
  }
  patched.__mindMapRelayoutPatched = true
}

function waitForAnimationFrame() {
  return new Promise<void>((resolve) => {
    window.requestAnimationFrame(() => resolve())
  })
}

async function waitForMindMapFonts() {
  const fontSet = document.fonts
  if (!fontSet) return

  try {
    await fontSet.ready
  } catch {
    // Font loading failures should not block the map itself from rendering.
  }
}

async function settleFormulaLayout(version: number) {
  if (typeof window === 'undefined') return

  await waitForMindMapFonts()
  await nextTick()
  await waitForAnimationFrame()

  if (version !== renderVersion || !markmap) return

  await markmap.renderData()
  await nextTick()
  await waitForAnimationFrame()

  if (version !== renderVersion || !markmap) return

  await fitMap()
}

async function renderMap() {
  if (!svgRef.value || !props.source.trim()) return

  try {
    const version = ++renderVersion
    error.value = ''
    const { root } = transformer.transform(props.source)
    const options = getOptions()
    svgRef.value.classList.toggle('has-invisible-root', hasInvisibleRoot(root))

    if (!markmap) {
      markmap = Markmap.create(svgRef.value, options)
      patchRelayout(markmap)
    }

    markmap.setOptions(options)
    await markmap.setData(root)
    await nextTick()
    await fitMap()
    void settleFormulaLayout(version)
  } catch (err) {
    error.value = err instanceof Error ? err.message : '思维导图渲染失败'
  }
}

async function fitMap() {
  if (!markmap) return
  await markmap.fit()
}

async function zoomIn() {
  if (!markmap) return
  await markmap.rescale(1.16)
}

async function zoomOut() {
  if (!markmap) return
  await markmap.rescale(0.86)
}

function clearExpandedCloseTimer() {
  if (!expandedCloseTimer) return
  window.clearTimeout(expandedCloseTimer)
  expandedCloseTimer = undefined
}

function openExpanded() {
  clearExpandedCloseTimer()
  isClosingExpanded.value = false
  isExpanded.value = true
  isExportMenuOpen.value = false
}

function toggleExpanded() {
  if (isExpanded.value) {
    closeExpanded()
  } else {
    openExpanded()
  }
}

function closeExpanded() {
  if (!isExpanded.value && !isClosingExpanded.value) return

  clearExpandedCloseTimer()
  isExpanded.value = false
  isClosingExpanded.value = true
  isExportMenuOpen.value = false

  expandedCloseTimer = window.setTimeout(() => {
    expandedCloseTimer = undefined
    isClosingExpanded.value = false
  }, prefersReducedMotion() ? 0 : 220)
}

function toggleExportMenu() {
  isExportMenuOpen.value = !isExportMenuOpen.value
}

function closeExportMenu() {
  isExportMenuOpen.value = false
}

function handleDocumentPointerdown(event: PointerEvent) {
  if (!isExportMenuOpen.value) return
  const target = event.target

  if (target instanceof Node && exportMenuRef.value?.contains(target)) return
  closeExportMenu()
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key !== 'Escape') return

  if (isExportMenuOpen.value) {
    closeExportMenu()
    return
  }

  if (isExpanded.value) {
    closeExpanded()
  }
}

function getExportFilename(ext: ExportFormat) {
  const base = (displayTitle.value || 'mind-map')
    .trim()
    .replace(/[\\/:*?"<>|]+/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

  return `${base || 'mind-map'}.${ext}`
}

function getExportSize() {
  const rect = (surfaceRef.value || svgRef.value)?.getBoundingClientRect()
  return {
    width: Math.max(1, Math.round(rect?.width || 1200)),
    height: Math.max(1, Math.round(rect?.height || 800)),
  }
}

function getExportBackground() {
  return document.documentElement.classList.contains('dark') ? '#131417' : '#fbfcfe'
}

function getExportTextColor() {
  return document.documentElement.classList.contains('dark') ? '#e8e8ec' : '#1f2937'
}

function getKatexExportStyle() {
  return [
    '.katex{display:inline-block;line-height:1.2;text-rendering:auto;white-space:nowrap}',
    '.katex .katex-mathml{display:none}',
    '.katex .katex-html{display:inline-block;white-space:nowrap}',
    '.katex-display{margin:0;text-align:left}',
  ].join('')
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function getSvgMarkup() {
  if (!svgRef.value) throw new Error('思维导图还没有渲染完成')

  const { width, height } = getExportSize()
  const clone = svgRef.value.cloneNode(true) as SVGElement
  const style = document.createElementNS('http://www.w3.org/2000/svg', 'style')
  const background = document.createElementNS('http://www.w3.org/2000/svg', 'rect')

  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  clone.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink')
  clone.setAttribute('width', String(width))
  clone.setAttribute('height', String(height))
  clone.setAttribute('viewBox', `0 0 ${width} ${height}`)

  style.textContent = [
    ".markmap-node{font-family:'Noto Sans SC','PingFang SC','Microsoft YaHei',sans-serif}",
    `.markmap-foreign{overflow:visible;color:${getExportTextColor()}}`,
    '.markmap-link{opacity:.82}',
    '.has-invisible-root .markmap-node[data-depth="1"],.has-invisible-root .markmap-link[data-depth="2"]{display:none}',
    getKatexExportStyle(),
  ].join('')

  background.setAttribute('x', '0')
  background.setAttribute('y', '0')
  background.setAttribute('width', '100%')
  background.setAttribute('height', '100%')
  background.setAttribute('rx', '8')
  background.setAttribute('fill', getExportBackground())

  clone.insertBefore(background, clone.firstChild)
  clone.insertBefore(style, clone.firstChild)

  return `<?xml version="1.0" encoding="UTF-8"?>\n${new XMLSerializer().serializeToString(clone)}`
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.rel = 'noopener'
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}

function saveSvg() {
  try {
    const markup = getSvgMarkup()
    downloadBlob(
      new Blob([markup], { type: 'image/svg+xml;charset=utf-8' }),
      getExportFilename('svg'),
    )
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'SVG 保存失败'
  }
}

function loadImage(src: string, errorMessage = '图片生成失败') {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error(errorMessage))
    image.src = src
  })
}

async function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality: number,
  errorMessage: string,
) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob)
      } else {
        reject(new Error(errorMessage))
      }
    }, type, quality)
  })
}

function canvasToPngBlob(canvas: HTMLCanvasElement) {
  return canvasToBlob(canvas, 'image/png', 0.95, 'PNG 生成失败')
}

async function createExportCanvas(errorMessage: string) {
  let url = ''

  try {
    const markup = getSvgMarkup()
    const { width, height } = getExportSize()
    const scale = Math.min(3, Math.max(1, window.devicePixelRatio || 1))
    url = URL.createObjectURL(new Blob([markup], { type: 'image/svg+xml;charset=utf-8' }))

    const image = await loadImage(url, errorMessage)
    const canvas = document.createElement('canvas')
    canvas.width = Math.round(width * scale)
    canvas.height = Math.round(height * scale)

    const context = canvas.getContext('2d')
    if (!context) throw new Error(errorMessage)

    context.fillStyle = getExportBackground()
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.drawImage(image, 0, 0, canvas.width, canvas.height)

    return { canvas, width, height }
  } finally {
    if (url) URL.revokeObjectURL(url)
  }
}

async function savePng() {
  try {
    const { canvas } = await createExportCanvas('当前浏览器不支持 PNG 导出')
    const blob = await canvasToPngBlob(canvas)
    downloadBlob(blob, getExportFilename('png'))
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'PNG 保存失败'
  }
}

function buildPrintDocument(svgMarkup: string) {
  const { width, height } = getExportSize()
  const pageSize = width >= height ? 'landscape' : 'portrait'
  const title = escapeHtml(getExportFilename('pdf'))
  const label = escapeHtml(ariaLabel.value)
  const background = getExportBackground()
  const printableSvg = svgMarkup.replace(/^<\?xml[^>]*>\s*/, '')

  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <style>
    @page {
      size: ${pageSize};
      margin: 12mm;
    }

    html,
    body {
      min-height: 100%;
      margin: 0;
      background: ${background};
    }

    body {
      display: grid;
      place-items: center;
      box-sizing: border-box;
      padding: 24px;
      color: ${getExportTextColor()};
      font-family: 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif;
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
    }

    .mind-map-print-page {
      width: min(100%, ${width}px);
      max-width: ${width}px;
    }

    .mind-map-print-page svg {
      display: block;
      width: 100%;
      height: auto;
    }

    @media print {
      html,
      body {
        background: ${background};
      }

      body {
        min-height: 100vh;
        padding: 0;
      }

      .mind-map-print-page {
        width: 100%;
        max-width: none;
      }
    }
  </style>
</head>
<body>
  <main class="mind-map-print-page" aria-label="${label}">
    ${printableSvg}
  </main>
</body>
</html>`
}

function openPrintWindow(svgMarkup: string) {
  const printWindow = window.open('', '_blank', 'width=1200,height=840')

  if (!printWindow) {
    throw new Error('浏览器阻止了打印窗口，请允许弹出窗口后重试')
  }

  printWindow.document.open()
  printWindow.document.write(buildPrintDocument(svgMarkup))
  printWindow.document.close()

  const print = () => {
    printWindow.focus()
    printWindow.print()
  }

  if (printWindow.document.readyState === 'complete') {
    window.setTimeout(print, 120)
  } else {
    printWindow.addEventListener('load', () => window.setTimeout(print, 120), { once: true })
  }
}

function savePdf() {
  try {
    openPrintWindow(getSvgMarkup())
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'PDF 保存失败'
  }
}

function chooseExport(format: 'svg' | 'png' | 'pdf') {
  closeExportMenu()

  if (format === 'svg') {
    saveSvg()
  } else if (format === 'png') {
    void savePng()
  } else {
    savePdf()
  }
}

function scheduleFit() {
  if (fitTimer) window.clearTimeout(fitTimer)
  fitTimer = window.setTimeout(() => {
    void fitMap()
  }, 90)
}

onMounted(() => {
  void renderMap()
  window.addEventListener('keydown', handleKeydown)
  document.addEventListener('pointerdown', handleDocumentPointerdown)

  if (svgRef.value && typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(scheduleFit)
    resizeObserver.observe(svgRef.value)
  }
})

watch(
  () => [props.source, props.initialExpandLevel],
  () => {
    void renderMap()
  },
)

watch(
  isModalActive,
  async (active) => {
    document.documentElement.classList.toggle('mind-map-modal-open', active)
    await nextTick()
    scheduleFit()
  },
)

onBeforeUnmount(() => {
  if (fitTimer) window.clearTimeout(fitTimer)
  clearExpandedCloseTimer()
  resizeObserver?.disconnect()
  window.removeEventListener('keydown', handleKeydown)
  document.removeEventListener('pointerdown', handleDocumentPointerdown)
  document.documentElement.classList.remove('mind-map-modal-open')
  markmap?.destroy()
  markmap = undefined
})
</script>

<template>
  <section
    class="mind-map"
    :class="{
      'is-expanded': isExpanded,
      'is-modal-active': isModalActive,
      'is-modal-closing': isClosingExpanded,
    }"
    :style="surfaceStyle"
    :aria-label="ariaLabel"
  >
    <div
      v-if="isModalActive"
      class="mind-map-backdrop"
      :class="backdropMotionClass"
      aria-hidden="true"
      @click="closeExpanded"
    />

    <div
      class="mind-map-panel"
      :class="panelMotionClass"
      :role="isModalActive ? 'dialog' : undefined"
      :aria-modal="isModalActive ? 'true' : undefined"
      :aria-label="isModalActive ? ariaLabel : undefined"
    >
      <header class="mind-map-header" :class="{ 'has-no-title': !hasTitle }">
        <p v-if="hasTitle" class="mind-map-title">
          {{ displayTitle }}
        </p>

        <div class="mind-map-controls" aria-label="思维导图控制">
          <div class="mind-map-control-pill is-expand">
            <button
              type="button"
              class="mind-map-control"
              :class="{ 'is-active': isExpanded }"
              :aria-label="expandLabel"
              :aria-expanded="isExpanded ? 'true' : 'false'"
              @click="toggleExpanded"
            >
              {{ isExpanded ? '收起' : '展开' }}
            </button>
          </div>

          <div
            class="mind-map-control-pill is-tools"
            :class="{ 'is-menu-open': isExportMenuOpen }"
            aria-label="视图和导出"
          >
            <button type="button" class="mind-map-control" aria-label="适配视图" @click="fitMap">
              适配
            </button>
            <button type="button" class="mind-map-control is-square" aria-label="放大" @click="zoomIn">
              <span class="mind-map-control-symbol is-plus" aria-hidden="true" />
            </button>
            <button type="button" class="mind-map-control is-square" aria-label="缩小" @click="zoomOut">
              <span class="mind-map-control-symbol is-minus" aria-hidden="true" />
            </button>

            <div ref="exportMenuRef" class="mind-map-export">
              <button
                type="button"
                class="mind-map-control mind-map-export-trigger"
                aria-label="导出思维导图"
                aria-haspopup="menu"
                :aria-expanded="isExportMenuOpen ? 'true' : 'false'"
                :aria-controls="isExportMenuOpen ? exportMenuId : undefined"
                @click="toggleExportMenu"
              >
                导出
                <span class="mind-map-export-caret" aria-hidden="true" />
              </button>

              <Transition
                enter-active-class="animate__animated animate__fadeInDown mind-map-menu-motion"
                leave-active-class="animate__animated animate__fadeOutUp mind-map-menu-motion"
              >
                <div
                  v-if="isExportMenuOpen"
                  :id="exportMenuId"
                  class="mind-map-export-menu"
                  role="menu"
                  aria-label="选择导出格式"
                >
                  <button
                    type="button"
                    class="mind-map-export-option"
                    role="menuitem"
                    aria-label="导出 SVG"
                    @click="chooseExport('svg')"
                  >
                    <span class="mind-map-export-format">SVG</span>
                    <span class="mind-map-export-note">矢量文件</span>
                  </button>
                  <button
                    type="button"
                    class="mind-map-export-option"
                    role="menuitem"
                    aria-label="导出 PNG"
                    @click="chooseExport('png')"
                  >
                    <span class="mind-map-export-format">PNG</span>
                    <span class="mind-map-export-note">位图图片</span>
                  </button>
                  <button
                    type="button"
                    class="mind-map-export-option"
                    role="menuitem"
                    aria-label="导出 PDF"
                    @click="chooseExport('pdf')"
                  >
                    <span class="mind-map-export-format">PDF</span>
                    <span class="mind-map-export-note">文档文件</span>
                  </button>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </header>

      <div ref="surfaceRef" class="mind-map-surface" :style="surfaceStyle">
        <svg
          ref="svgRef"
          class="mind-map-svg"
          role="img"
          :aria-label="ariaLabel"
        />

        <p v-if="error" class="mind-map-error">
          {{ error }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.mind-map {
  --mind-map-border: rgb(120 130 145 / 16%);
  --mind-map-surface-bg: color-mix(in srgb, var(--vp-c-bg) 95%, var(--vp-c-bg-soft));
  --mind-map-surface-shadow:
    0 14px 34px rgb(35 38 42 / 10%),
    0 2px 8px rgb(35 38 42 / 6%);
  --mind-map-pill-bg: var(--aya-nav-tab-bg, rgb(255 255 255 / 26%));
  --mind-map-pill-bg-strong: var(--aya-nav-tab-bg-strong, rgb(255 255 255 / 64%));
  --mind-map-pill-border: var(--aya-nav-tab-border, rgb(255 255 255 / 54%));
  --mind-map-pill-text: var(--aya-nav-tab-text, rgb(56 69 83 / 70%));
  --mind-map-pill-selected: var(--aya-nav-tab-selected, #405769);
  --mind-map-pill-hover: var(--aya-nav-tab-hover, rgb(255 255 255 / 18%));
  --mind-map-pill-frosted-blur: var(--aya-nav-tab-frosted-blur, blur(24px));
  --mind-map-pill-soft-frosted-blur: var(--aya-nav-pill-frosted-blur, blur(12px));
  --mind-map-pill-shadow: var(--aya-nav-tab-shadow, 0 12px 28px rgb(0 0 0 / 7%));
  --mind-map-pill-feather-shadow: var(--aya-nav-tab-feather-shadow, 0 0 14px 4px rgb(0 0 0 / 4%));
  --mind-map-pill-active-shadow: var(--aya-nav-pill-feather-shadow, 0 0 12px 3px rgb(0 0 0 / 3.5%));
  --mind-map-menu-bg: var(--aya-nav-menu-bg, rgb(255 255 255 / 46%));
  --mind-map-menu-frosted-blur: var(--aya-nav-menu-frosted-blur, blur(30px));
  --mind-map-menu-shadow: var(--aya-nav-menu-shadow, 0 22px 54px rgb(0 0 0 / 9%));
  --mind-map-menu-feather-shadow: var(--aya-nav-menu-feather-shadow, 0 0 26px 8px rgb(0 0 0 / 7%));
  --mind-map-backdrop-bg: rgb(247 249 252 / 52%);
  --mind-map-modal-bg: color-mix(in srgb, var(--vp-c-bg) 96%, white);
  --mind-map-modal-inset: clamp(16px, 4vw, 44px);
  --mind-map-modal-shadow:
    0 28px 80px rgb(35 38 42 / 18%),
    0 8px 24px rgb(35 38 42 / 10%);
  --mind-map-motion-duration: var(--dur-menu, 0.32s);
  --mind-map-motion-duration-out: var(--dur-menu-out, 0.22s);
  --mind-map-safe-pad-x: clamp(24px, 4vw, 42px);
  --mind-map-safe-pad-y: 18px;
  --mind-map-square-size: 28px;
  --mind-map-square-symbol-size: 14px;
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  min-height: calc(var(--mind-map-height) + 46px);
  margin: 1.5rem 0 1.75rem;
}

.mind-map-panel {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  min-height: inherit;
}

.mind-map-backdrop {
  display: none;
}

.mind-map-header {
  position: relative;
  z-index: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-width: 0;
  margin-bottom: 8px;
}

.mind-map-title {
  min-width: 0;
  margin: 0;
  color: var(--vp-c-text-2);
  font-family: 'Noto Serif SC', 'Songti SC', serif;
  font-size: 0.96rem;
  font-weight: 700;
  line-height: 1.45;
  overflow-wrap: anywhere;
}

.mind-map-controls {
  display: flex;
  flex: 0 0 auto;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  margin-left: auto;
}

.mind-map-header.has-no-title .mind-map-controls {
  justify-content: flex-end;
}

.mind-map-control-pill {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 2px;
  height: 38px;
  border: 1px solid var(--mind-map-pill-border);
  border-radius: 999px;
  padding: 4px;
  background: var(--mind-map-pill-bg);
  background-clip: padding-box;
  box-shadow:
    var(--mind-map-pill-feather-shadow),
    var(--mind-map-pill-shadow);
  backdrop-filter: var(--mind-map-pill-frosted-blur);
  -webkit-backdrop-filter: var(--mind-map-pill-frosted-blur);
}

.mind-map-control-pill::before {
  content: "";
  position: absolute;
  inset: 1px;
  z-index: 0;
  border-radius: inherit;
  background: transparent;
  pointer-events: none;
}

.mind-map-control-pill > * {
  position: relative;
  z-index: 1;
}

.mind-map-control-pill.is-tools.is-menu-open {
  z-index: 40;
}

.mind-map-control {
  position: relative;
  isolation: isolate;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 54px;
  height: 28px;
  overflow: hidden;
  border: 0;
  border-radius: 999px;
  padding: 0 12px;
  background: transparent;
  color: var(--mind-map-pill-text);
  font-size: 13px;
  font-weight: 650;
  line-height: 28px;
  letter-spacing: 0;
  cursor: pointer;
  transition:
    color 0.2s var(--ease-ios-fade),
    background-color 0.2s var(--ease-ios-fade),
    box-shadow 0.2s var(--ease-ios-fade),
    transform 0.16s var(--ease-ios-press);
}

.mind-map-control::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  background: transparent;
  opacity: 0;
  pointer-events: none;
  transition:
    opacity 0.2s var(--ease-ios-fade),
    background-color 0.2s var(--ease-ios-fade);
}

.mind-map-control.is-square {
  width: var(--mind-map-square-size);
  min-width: var(--mind-map-square-size);
  height: var(--mind-map-square-size);
  flex: 0 0 var(--mind-map-square-size);
  padding: 0;
  line-height: 0;
}

.mind-map-control-symbol {
  position: relative;
  display: block;
  width: var(--mind-map-square-symbol-size);
  height: var(--mind-map-square-symbol-size);
  color: currentColor;
  line-height: 1;
}

.mind-map-control-symbol::before,
.mind-map-control-symbol::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: calc(var(--mind-map-square-symbol-size) - 3px);
  height: 2px;
  border-radius: 999px;
  background: currentColor;
  transform: translate(-50%, -50%);
}

.mind-map-control-symbol.is-plus::after {
  transform: translate(-50%, -50%) rotate(90deg);
}

.mind-map-control-symbol.is-minus::after {
  content: none;
}

.mind-map-control:hover,
.mind-map-control:focus-visible {
  color: var(--vp-c-text-1);
  background: var(--mind-map-pill-hover);
  backdrop-filter: var(--mind-map-pill-soft-frosted-blur);
  -webkit-backdrop-filter: var(--mind-map-pill-soft-frosted-blur);
}

.mind-map-control:hover::before,
.mind-map-control:focus-visible::before,
.mind-map-control.is-active::before,
.mind-map-export-trigger[aria-expanded="true"]::before {
  background: transparent;
  opacity: 1;
}

.mind-map-control:focus-visible,
.mind-map-export-option:focus-visible {
  outline: 2px solid rgb(255 255 255 / 78%);
  outline-offset: 2px;
}

.mind-map-control.is-active,
.mind-map-export-trigger[aria-expanded="true"] {
  color: var(--mind-map-pill-selected);
  background: var(--mind-map-pill-bg-strong);
  box-shadow:
    var(--mind-map-pill-active-shadow),
    0 7px 16px rgb(0 0 0 / 5%);
  backdrop-filter: var(--mind-map-pill-soft-frosted-blur);
  -webkit-backdrop-filter: var(--mind-map-pill-soft-frosted-blur);
}

.mind-map-control:active {
  transform: translateY(1px);
}

.mind-map-export {
  position: relative;
  z-index: 40;
  display: inline-flex;
}

.mind-map-export-trigger {
  gap: 6px;
  min-width: 62px;
  padding-right: 10px;
}

.mind-map-export-caret {
  width: 0;
  height: 0;
  border-top: 4px solid currentColor;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
  opacity: 0.72;
  transition:
    opacity 0.2s var(--ease-ios-fade),
    transform 0.24s var(--ease-ios-fade);
}

.mind-map-export-trigger[aria-expanded="true"] .mind-map-export-caret {
  opacity: 1;
  transform: rotate(180deg);
}

.mind-map-export-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  z-index: 30;
  min-width: 156px;
  overflow: hidden;
  border: 1px solid var(--mind-map-pill-border);
  border-radius: 16px;
  padding: 6px;
  background: var(--mind-map-menu-bg);
  background-clip: padding-box;
  box-shadow:
    var(--mind-map-menu-feather-shadow),
    var(--mind-map-menu-shadow);
  backdrop-filter: var(--mind-map-menu-frosted-blur);
  -webkit-backdrop-filter: var(--mind-map-menu-frosted-blur);
  transform-origin: top right;
}

.mind-map-export-menu::before {
  content: "";
  position: absolute;
  inset: 1px;
  z-index: 0;
  border-radius: inherit;
  background: transparent;
  pointer-events: none;
}

.mind-map-export-option {
  position: relative;
  z-index: 1;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  border: 0;
  border-radius: 10px;
  padding: 8px 9px;
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  font: inherit;
  line-height: 1;
  text-align: left;
  transition:
    background-color 0.18s var(--ease-ios-fade),
    color 0.18s var(--ease-ios-fade),
    transform 0.14s var(--ease-ios-press);
}

.mind-map-export-option:hover,
.mind-map-export-option:focus-visible {
  background: var(--mind-map-pill-hover);
  color: var(--vp-c-text-1);
}

.mind-map-export-option:active {
  transform: translateY(1px);
}

.mind-map-export-format {
  color: var(--vp-c-text-1);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.78rem;
  font-weight: 760;
  letter-spacing: 0;
}

.mind-map-export-note {
  color: var(--vp-c-text-3);
  font-size: 0.74rem;
  font-weight: 600;
  white-space: nowrap;
}

.mind-map-menu-motion {
  animation-duration: var(--mind-map-motion-duration);
  animation-timing-function: var(--ease-ios-fade);
}

.mind-map-menu-motion.animate__fadeOutUp {
  animation-duration: var(--mind-map-motion-duration-out);
  animation-timing-function: var(--ease-ios-press);
}

.mind-map-backdrop-motion {
  animation-duration: var(--mind-map-motion-duration);
  animation-timing-function: var(--ease-ios-fade);
}

.mind-map-panel-motion {
  animation-duration: var(--mind-map-motion-duration);
  animation-timing-function: var(--ease-ios-fade);
  transform-origin: center;
}

.mind-map.is-modal-active .mind-map-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: block;
  background: var(--mind-map-backdrop-bg);
  backdrop-filter: blur(18px) saturate(1.12);
  -webkit-backdrop-filter: blur(18px) saturate(1.12);
}

.mind-map.is-modal-active .mind-map-panel {
  position: fixed;
  inset: var(--mind-map-modal-inset);
  z-index: 1001;
  display: flex;
  flex-direction: column;
  width: auto;
  min-width: 0;
  min-height: 0;
  border: 1px solid var(--mind-map-border);
  border-radius: 10px;
  padding: 12px;
  background: var(--mind-map-modal-bg);
  box-shadow: var(--mind-map-modal-shadow);
}

.mind-map.is-modal-active .mind-map-header {
  flex: 0 0 auto;
  margin-bottom: 10px;
}

.mind-map.is-modal-active .mind-map-surface {
  flex: 1 1 auto;
  height: auto;
  min-height: 0;
  border: 0;
  background: transparent;
  box-shadow: none;
}

.mind-map-surface {
  position: relative;
  z-index: 2;
  width: 100%;
  min-width: 0;
  max-width: 100%;
  height: var(--mind-map-height);
  min-height: 300px;
  box-sizing: border-box;
  overflow: hidden;
  border: 1px solid var(--mind-map-border);
  border-radius: 8px;
  padding: var(--mind-map-safe-pad-y) var(--mind-map-safe-pad-x);
  background: var(--mind-map-surface-bg);
  box-shadow: var(--mind-map-surface-shadow);
}

.mind-map-svg {
  display: block;
  width: 100%;
  min-width: 0;
  max-width: 100%;
  height: 100%;
  cursor: grab;
  overflow: visible;
  touch-action: none;
}

.mind-map-svg:active {
  cursor: grabbing;
}

.mind-map-error {
  position: absolute;
  inset: auto 16px 14px;
  margin: 0;
  border-radius: 7px;
  padding: 8px 10px;
  background: color-mix(in srgb, var(--vp-c-danger-soft) 82%, var(--vp-c-bg));
  color: var(--vp-c-danger-1);
  font-size: 0.82rem;
  line-height: 1.5;
}

.mind-map :deep(.markmap-node) {
  font-family: 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.mind-map :deep(.markmap-node .markmap-foreign) {
  overflow: visible;
  color: var(--vp-c-text-1);
}

.mind-map :deep(.markmap-node .markmap-foreign > div) {
  border-radius: 6px;
  padding: 2px 3px;
}

.mind-map :deep(.markmap-node circle) {
  stroke-width: 1.6px;
}

.mind-map :deep(.markmap-link) {
  opacity: 0.78;
}

.mind-map :deep(.mind-map-svg.has-invisible-root .markmap-node[data-depth="1"]),
.mind-map :deep(.mind-map-svg.has-invisible-root .markmap-link[data-depth="2"]) {
  display: none;
}

.mind-map :deep(.katex) {
  display: inline-block;
  line-height: 1.2;
  text-rendering: auto;
  white-space: nowrap;
}

.mind-map :deep(.katex .katex-mathml) {
  display: none;
}

.mind-map :deep(.katex .katex-html) {
  display: inline-block;
  white-space: nowrap;
}

.mind-map :deep(.katex-display) {
  margin: 0;
  text-align: left;
}

:global(.dark .mind-map) {
  --mind-map-border: rgb(255 255 255 / 9%);
  --mind-map-surface-bg: rgb(19 20 23 / 96%);
  --mind-map-surface-shadow:
    0 18px 42px rgb(0 0 0 / 30%),
    0 2px 10px rgb(0 0 0 / 18%);
  --mind-map-backdrop-bg: rgb(0 0 0 / 48%);
  --mind-map-modal-bg: rgb(19 20 23 / 98%);
  --mind-map-modal-shadow:
    0 30px 90px rgb(0 0 0 / 48%),
    0 10px 28px rgb(0 0 0 / 28%);
}

:global(html.mind-map-modal-open) {
  overflow: hidden;
}

:global(.dark .mind-map :deep(.markmap-node .markmap-foreign)) {
  color: var(--vp-c-text-1);
}

@media (max-width: 640px) {
  .mind-map {
    min-height: calc(var(--mind-map-height) + 92px);
    margin: 1.25rem 0 1.5rem;
  }

  .mind-map-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .mind-map-controls {
    width: 100%;
    justify-content: flex-start;
  }

  .mind-map-control-pill.is-tools {
    flex-wrap: wrap;
    height: auto;
    min-height: 38px;
  }

  .mind-map-surface {
    --mind-map-safe-pad-x: 18px;
    --mind-map-safe-pad-y: 14px;
    min-height: 280px;
  }

  .mind-map.is-modal-active .mind-map-panel {
    inset: 10px;
    padding: 10px;
  }

  .mind-map.is-modal-active .mind-map-surface {
    min-height: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .mind-map-control,
  .mind-map-control::before,
  .mind-map-export-caret,
  .mind-map-export-option {
    transition: none;
  }

  .mind-map-control:active,
  .mind-map-export-option:active {
    transform: none;
  }

  .mind-map-menu-motion,
  .mind-map-backdrop-motion,
  .mind-map-panel-motion {
    animation: none !important;
  }
}
</style>
