import { watch, nextTick } from 'vue'
import type { Router } from 'vitepress'

const SOLUTION_MOTION_MS = 560
const SOLUTION_MOTION_EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'
const SOLUTION_MOTION_CLASSES = [
  'solution-content-motion',
  'animate__animated',
  'animate__fadeIn',
  'animate__fadeOut',
]

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function clearContentMotion(content: HTMLElement) {
  content.getAnimations().forEach((animation) => animation.cancel())
  content.classList.remove(...SOLUTION_MOTION_CLASSES)
  content.style.removeProperty('--animate-duration')
  content.style.removeProperty('height')
  content.style.removeProperty('overflow')
  content.style.removeProperty('pointer-events')
}

function setButtonState(btn: HTMLElement, expanded: boolean) {
  btn.textContent = expanded ? '[收起答案]' : '[展开答案]'
  btn.setAttribute('aria-expanded', String(expanded))
}

function settleContent(content: HTMLElement) {
  content.classList.remove(...SOLUTION_MOTION_CLASSES)
  content.style.removeProperty('--animate-duration')
  content.style.removeProperty('height')
  content.style.removeProperty('overflow')
  content.style.removeProperty('pointer-events')
}

function animateSolution(
  el: Element,
  content: HTMLElement,
  btn: HTMLElement,
  expanded: boolean,
  states: Record<number, boolean>,
  index: number,
  storageKey: string,
) {
  const currentHeight = content.getBoundingClientRect().height
  clearContentMotion(content)

  if (prefersReducedMotion() || !content.animate) {
    el.toggleAttribute('data-collapsed', !expanded)
    el.removeAttribute('data-solution-motion')
    setButtonState(btn, expanded)
    states[index] = expanded
    localStorage.setItem(storageKey, JSON.stringify(states))
    return
  }

  el.setAttribute('data-solution-motion', expanded ? 'expanding' : 'collapsing')
  content.style.setProperty('--animate-duration', `${SOLUTION_MOTION_MS}ms`)
  content.style.overflow = 'hidden'
  content.style.pointerEvents = 'none'
  content.classList.add('solution-content-motion', 'animate__animated')

  if (expanded) {
    content.style.height = `${Math.max(currentHeight, 0)}px`
    el.removeAttribute('data-collapsed')
    setButtonState(btn, true)

    const targetHeight = content.scrollHeight
    content.classList.add('animate__fadeIn')

    const animation = content.animate(
      [
        { height: `${Math.max(currentHeight, 0)}px`, transform: 'translateY(-6px)', filter: 'blur(3px)' },
        { height: `${targetHeight}px`, transform: 'translateY(0)', filter: 'blur(0)' },
      ],
      { duration: SOLUTION_MOTION_MS, easing: SOLUTION_MOTION_EASE, fill: 'forwards' },
    )

    animation.finished
      .then(() => {
        animation.cancel()
        el.removeAttribute('data-solution-motion')
        settleContent(content)
        states[index] = true
        localStorage.setItem(storageKey, JSON.stringify(states))
      })
      .catch(() => {})
    return
  }

  const startHeight = currentHeight || content.scrollHeight
  content.style.height = `${startHeight}px`
  content.classList.add('animate__fadeOut')
  setButtonState(btn, false)

  const animation = content.animate(
    [
      { height: `${startHeight}px`, transform: 'translateY(0)', filter: 'blur(0)' },
      { height: '0px', transform: 'translateY(-6px)', filter: 'blur(3px)' },
    ],
    { duration: SOLUTION_MOTION_MS, easing: SOLUTION_MOTION_EASE, fill: 'forwards' },
  )

  animation.finished
    .then(() => {
      el.setAttribute('data-collapsed', '')
      animation.cancel()
      el.removeAttribute('data-solution-motion')
      settleContent(content)
      states[index] = false
      localStorage.setItem(storageKey, JSON.stringify(states))
    })
    .catch(() => {})
}

function initSolutionCollapse() {
  const solutions = document.querySelectorAll('.example-solution')
  if (!solutions.length) return

  const key = `sol-states:${location.pathname}`
  let states: Record<number, boolean> = {}
  try {
    states = JSON.parse(localStorage.getItem(key) || '{}')
  } catch {}

  solutions.forEach((el, i) => {
    const btn = el.querySelector('.solution-toggle') as HTMLElement | null
    const content = el.querySelector('.solution-content') as HTMLElement | null
    if (!btn) return
    if (!content) return

    // 恢复状态
    if (states[i]) {
      el.removeAttribute('data-collapsed')
      setButtonState(btn, true)
    } else {
      setButtonState(btn, false)
    }

    // 避免重复绑定：先克隆替换旧按钮
    const newBtn = btn.cloneNode(true) as HTMLElement
    btn.parentNode!.replaceChild(newBtn, btn)

    newBtn.addEventListener('click', () => {
      const shouldExpand =
        el.hasAttribute('data-collapsed') || el.getAttribute('data-solution-motion') === 'collapsing'
      animateSolution(el, content, newBtn, shouldExpand, states, i, key)
    })
  })
}

export function setupSolutionCollapse(router: Router) {
  if (typeof document === 'undefined') return

  watch(
    () => router.route.data.relativePath,
    () => {
      nextTick(() => {
        setTimeout(initSolutionCollapse, 50)
      })
    },
    { immediate: true, flush: 'post' }
  )
}
