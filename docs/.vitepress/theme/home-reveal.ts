/**
 * 首页 hero 以下各区块的滚动入场。
 *
 * 目标元素先标记 data-reveal="out"（隐藏），进入视口时改为 "in" 播放入场动画；
 * 同一批进入的元素按从上到下、从左到右排序写入 --reveal-i 做错峰。
 * 已经在视口上方的元素（刷新时保留了滚动位置）直接标为 "done"，不播放也不隐藏。
 * 动画本身全部在 style/home-reveal.css，时长取 --dur-home-reveal / --home-reveal-step。
 */

const TARGETS: [selector: string, kind: string][] = [
  ['.home-section-head', 'head'],
  ['.recent-lead', 'lead'],
  ['.recent-card', 'card'],
  ['.VPFeatures .item', 'card'],
  ['.home-colophon .colophon-block', 'colophon'],
]

export function setupHomeReveal(): () => void {
  const home = document.querySelector<HTMLElement>('.VPHome')
  if (!home?.querySelector('.orbit-hero')) return () => {}
  if (typeof IntersectionObserver === 'undefined') return () => {}
  if (!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return () => {}

  const targets: HTMLElement[] = []
  for (const [selector, kind] of TARGETS) {
    home.querySelectorAll<HTMLElement>(selector).forEach((el) => {
      if (el.dataset.reveal) return
      el.dataset.reveal = 'out'
      el.dataset.revealKind = kind
      targets.push(el)
    })
  }
  if (!targets.length) return () => {}

  const observer = new IntersectionObserver((entries) => {
    const shown = entries
      .filter((e) => e.isIntersecting)
      .sort((a, b) => (a.boundingClientRect.top - b.boundingClientRect.top) || (a.boundingClientRect.left - b.boundingClientRect.left))

    shown.forEach((entry, i) => {
      const el = entry.target as HTMLElement
      el.style.setProperty('--reveal-i', String(i))
      el.dataset.reveal = 'in'
      observer.unobserve(el)
    })

    entries.forEach((entry) => {
      if (entry.isIntersecting || entry.boundingClientRect.bottom > 0) return
      const el = entry.target as HTMLElement
      el.dataset.reveal = 'done'
      observer.unobserve(el)
    })
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 })

  targets.forEach((el) => observer.observe(el))

  return () => {
    observer.disconnect()
    targets.forEach((el) => {
      delete el.dataset.reveal
      delete el.dataset.revealKind
      el.style.removeProperty('--reveal-i')
    })
  }
}
