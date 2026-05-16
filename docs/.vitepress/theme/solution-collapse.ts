import { watch, nextTick } from 'vue'
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

    // 恢复状态
    if (states[i]) {
      el.removeAttribute('data-collapsed')
      btn.textContent = '[收起答案]'
    } else {
      btn.textContent = '[展开答案]'
    }

    // 避免重复绑定：先克隆替换旧按钮
    const newBtn = btn.cloneNode(true) as HTMLElement
    btn.parentNode!.replaceChild(newBtn, btn)

    newBtn.addEventListener('click', () => {
      if (el.hasAttribute('data-collapsed')) {
        el.removeAttribute('data-collapsed')
        newBtn.textContent = '[收起答案]'
        states[i] = true
      } else {
        el.setAttribute('data-collapsed', '')
        newBtn.textContent = '[展开答案]'
        states[i] = false
      }
      localStorage.setItem(key, JSON.stringify(states))
    })
  })
}

export function setupSolutionCollapse(router: Router) {
  // 使用 watch 监听路由变化，flush: 'post' 确保 DOM 更新完成后再执行
  watch(
    () => router.route.data.relativePath,
    () => {
      nextTick(() => {
        // 额外延迟确保水合完成
        setTimeout(initSolutionCollapse, 50)
      })
    },
    { immediate: true, flush: 'post' }
  )
}
