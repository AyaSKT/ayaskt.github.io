import { computed, reactive, ref } from 'vue'

const route = reactive({
  path: '/',
  data: {},
})

const frontmatter = ref<Record<string, unknown>>({})
const page = ref<Record<string, unknown>>({})
const theme = ref<Record<string, unknown>>({})
const isDark = ref(false)

export function withBase(path: string) {
  if (!path) return path
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(path)) return path
  const normalized = path.replace(/\.md(?=([?#]|$))/i, '').replace(/\.html(?=([?#]|$))/i, '')
  return normalized.startsWith('/') ? normalized : `/${normalized}`
}

export function useData() {
  return {
    frontmatter,
    page,
    theme,
    isDark,
    site: computed(() => ({})),
  }
}

export function useRoute() {
  return route
}

export function useRouter() {
  return {
    route,
    go(to: string) {
      window.location.href = withBase(to)
      return Promise.resolve()
    },
  }
}

export function __setVitePressCompatState(next: {
  path?: string
  frontmatter?: Record<string, unknown>
  page?: Record<string, unknown>
  theme?: Record<string, unknown>
}) {
  if (next.path) route.path = next.path
  if (next.frontmatter) frontmatter.value = next.frontmatter
  if (next.page) page.value = next.page
  if (next.theme) theme.value = next.theme
  route.data = next.page ?? {}
}
