import type { Router } from 'vitepress'

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
    if (!btn) return

    if (states[i]) {
      el.removeAttribute('data-collapsed')
      btn.textContent = '[收起答案]'
    } else {
      btn.textContent = '[展开答案]'
    }

    btn.addEventListener('click', () => {
      if (el.hasAttribute('data-collapsed')) {
        el.removeAttribute('data-collapsed')
        btn.textContent = '[收起答案]'
        states[i] = true
      } else {
        el.setAttribute('data-collapsed', '')
        btn.textContent = '[展开答案]'
        states[i] = false
      }
      localStorage.setItem(key, JSON.stringify(states))
    })
  })
}

export function setupSolutionCollapse(router: Router) {
  if (typeof window !== 'undefined') {
    setTimeout(initSolutionCollapse, 100)
  }

  router.onAfterRouteChanged = () => {
    if (typeof window !== 'undefined') {
      setTimeout(initSolutionCollapse, 100)
    }
  }
}
