<script setup lang="ts">
import { computed, ref, watch } from 'vue'

interface SidebarGroup {
  prefix: string
  groups: string[]
}

const props = defineProps<{
  open: boolean
  defaultDir?: string
  defaultPrefix?: string
  defaultTitle?: string
}>()

const emit = defineEmits<{
  close: []
  created: [payload: { path: string, link: string }]
}>()

const parentDir = ref('')
const fileName = ref('')
const title = ref('')
const sidebarPrefix = ref('')
const sidebarGroup = ref('')
const sidebarText = ref('')
const addToSidebar = ref(true)
const loading = ref(false)
const errorText = ref('')
const sidebarGroups = ref<string[]>([])

const previewLink = computed(() => {
  const cleanDir = parentDir.value.replace(/\\/g, '/').replace(/^\/+|\/+$/g, '')
  const cleanName = fileName.value.replace(/\.md$/i, '').trim()
  if (!cleanDir || !cleanName) return ''
  return `/${cleanDir}/${cleanName}`
})

async function readJson<T>(response: Response): Promise<T> {
  const payload = await response.json().catch(() => ({}))
  if (!response.ok) {
    const message = typeof payload?.error === 'string'
      ? payload.error
      : `请求失败：${response.status}`
    throw new Error(message)
  }
  return payload as T
}

async function loadSidebarGroups(prefix: string) {
  if (!prefix) {
    sidebarGroups.value = []
    return
  }

  const response = await fetch(
    `/__local-editor__/sidebar?prefix=${encodeURIComponent(prefix)}`,
    { headers: { Accept: 'application/json' } },
  )
  const payload = await readJson<SidebarGroup>(response)
  sidebarGroups.value = payload.groups
  if (!sidebarGroup.value && payload.groups.length) {
    sidebarGroup.value = payload.groups[payload.groups.length - 1]
  }
}

async function createNote() {
  if (loading.value) return
  loading.value = true
  errorText.value = ''

  try {
    const response = await fetch('/__local-editor__/article', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        parentDir: parentDir.value,
        fileName: fileName.value,
        title: title.value,
      }),
    })

    const payload = await readJson<{
      path: string
      link: string
      coursePrefix?: string
      title?: string
    }>(response)

    if (addToSidebar.value && sidebarPrefix.value && sidebarText.value && payload.link) {
      await fetch('/__local-editor__/sidebar', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prefix: sidebarPrefix.value,
          groupText: sidebarGroup.value || undefined,
          text: sidebarText.value || payload.title || title.value,
          link: payload.link,
        }),
      }).then(readJson)
    }

    emit('created', { path: payload.path, link: payload.link })
    emit('close')
  } catch (error) {
    errorText.value = error instanceof Error ? error.message : '创建失败'
  } finally {
    loading.value = false
  }
}

watch(() => props.open, async (open) => {
  if (!open) return
  parentDir.value = props.defaultDir || ''
  title.value = props.defaultTitle || ''
  fileName.value = props.defaultTitle ? `${props.defaultTitle}.md` : ''
  sidebarPrefix.value = props.defaultPrefix || ''
  sidebarText.value = props.defaultTitle || ''
  addToSidebar.value = Boolean(props.defaultPrefix)
  errorText.value = ''
  await loadSidebarGroups(sidebarPrefix.value)
}, { immediate: true })

watch(sidebarPrefix, (prefix) => {
  void loadSidebarGroups(prefix)
})

watch(title, (nextTitle) => {
  if (!fileName.value || fileName.value.endsWith('.md') && fileName.value.replace(/\.md$/i, '') === '') {
    fileName.value = nextTitle ? `${nextTitle}.md` : ''
  }
  if (!sidebarText.value) sidebarText.value = nextTitle
})
</script>

<template>
  <div
    v-if="open"
    class="local-editor-dialog-backdrop"
    @click.self="emit('close')"
  >
    <div class="local-editor-dialog" role="dialog" aria-modal="true" aria-label="新建笔记">
      <header class="local-editor-dialog-header">
        <strong>新建笔记</strong>
        <button type="button" @click="emit('close')">关闭</button>
      </header>

      <form class="local-editor-note-form" @submit.prevent="createNote">
        <label class="local-editor-field">
          <span>保存目录（相对 docs/）</span>
          <input v-model="parentDir" type="text" placeholder="Y3S2/DSP">
        </label>

        <label class="local-editor-field">
          <span>文件名</span>
          <input v-model="fileName" type="text" placeholder="DSP Chapter 12.md">
        </label>

        <label class="local-editor-field">
          <span>标题</span>
          <input v-model="title" type="text" placeholder="章节标题">
        </label>

        <p v-if="previewLink" class="local-editor-note-preview">链接预览：{{ previewLink }}</p>

        <label class="local-editor-checkbox">
          <input v-model="addToSidebar" type="checkbox">
          <span>同时写入 sidebar</span>
        </label>

        <template v-if="addToSidebar">
          <label class="local-editor-field">
            <span>Sidebar 前缀</span>
            <input v-model="sidebarPrefix" type="text" placeholder="/Y3S2/DSP/">
          </label>

          <label class="local-editor-field">
            <span>分组（可选）</span>
            <select v-model="sidebarGroup">
              <option value="">顶层 items</option>
              <option v-for="group in sidebarGroups" :key="group" :value="group">{{ group }}</option>
            </select>
          </label>

          <label class="local-editor-field">
            <span>Sidebar 显示文字</span>
            <input v-model="sidebarText" type="text" placeholder="侧栏条目名称">
          </label>
        </template>

        <p v-if="errorText" class="local-editor-note-error">{{ errorText }}</p>

        <div class="local-editor-dialog-actions">
          <button type="button" @click="emit('close')">取消</button>
          <button class="is-primary" type="submit" :disabled="loading">
            {{ loading ? '创建中' : '创建' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.local-editor-dialog-backdrop {
  position: fixed;
  z-index: 10010;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgb(15 23 42 / 42%);
  backdrop-filter: blur(10px);
}

.local-editor-dialog {
  width: min(560px, 100%);
  border: 1px solid color-mix(in srgb, var(--vp-c-divider) 82%, transparent);
  border-radius: 12px;
  background: var(--vp-c-bg);
  box-shadow: 0 24px 72px rgb(15 23 42 / 24%);
  overflow: hidden;
}

.local-editor-dialog-header,
.local-editor-dialog-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.local-editor-dialog-header {
  border-bottom: 1px solid var(--vp-c-divider);
  padding: 12px 14px;
}

.local-editor-note-form {
  display: grid;
  gap: 12px;
  padding: 14px;
}

.local-editor-field,
.local-editor-checkbox {
  display: grid;
  gap: 6px;
}

.local-editor-checkbox {
  grid-template-columns: auto 1fr;
  align-items: center;
}

.local-editor-field span,
.local-editor-checkbox span {
  color: var(--vp-c-text-2);
  font-size: 13px;
  font-weight: 600;
}

.local-editor-field input,
.local-editor-field select,
.local-editor-dialog-header button,
.local-editor-dialog-actions button {
  border: 1px solid color-mix(in srgb, var(--vp-c-divider) 82%, transparent);
  border-radius: 6px;
  padding: 8px 10px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font: inherit;
  font-size: 13px;
}

.local-editor-dialog-actions {
  justify-content: flex-end;
}

.local-editor-dialog-actions .is-primary,
.local-editor-dialog-header button:hover {
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 72%, var(--vp-c-divider));
  color: var(--vp-c-brand-1);
}

.local-editor-note-preview {
  margin: 0;
  color: var(--vp-c-text-3);
  font-size: 12px;
}

.local-editor-note-error {
  margin: 0;
  color: var(--vp-c-danger-1);
  font-size: 13px;
}
</style>
