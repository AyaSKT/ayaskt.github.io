<script setup lang="ts">
import { computed, markRaw, onMounted, ref, shallowRef, watch } from 'vue'
import type { Component } from 'vue'
import { useData, useRoute } from 'vitepress'
import LocalEditorNewNoteDialog from './LocalEditorNewNoteDialog.vue'

const route = useRoute()
const { page } = useData()

const isDev = import.meta.env.DEV
const mounted = ref(false)
const isOpen = ref(false)
const isLoadingPanel = ref(false)
const isNewNoteOpen = ref(false)
const editorPanel = shallowRef<Component | null>(null)

const relativePath = computed(() => {
  const value = page.value?.relativePath
  return typeof value === 'string' ? value : ''
})

const canShowHost = computed(() => isDev && mounted.value)

const canEdit = computed(() => {
  if (!isDev || !mounted.value) return false
  if (page.value?.isNotFound) return false
  return relativePath.value.endsWith('.md')
})

const defaultNoteDir = computed(() => {
  const parts = relativePath.value.split('/').filter(Boolean)
  if (parts.length < 2) return parts[0] || ''
  return `${parts[0]}/${parts[1]}`
})

const defaultCoursePrefix = computed(() => {
  const parts = relativePath.value.split('/').filter(Boolean)
  if (parts.length < 2) return ''
  return `/${parts[0]}/${parts[1]}/`
})

async function openEditor() {
  if (!canEdit.value || isLoadingPanel.value) return

  if (!editorPanel.value) {
    isLoadingPanel.value = true
    try {
      editorPanel.value = markRaw((await import('./LocalMarkdownEditor.vue')).default)
    } finally {
      isLoadingPanel.value = false
    }
  }

  isOpen.value = true
}

function closeEditor() {
  isOpen.value = false
}

function openNewNoteDialog() {
  if (!isDev || !mounted.value) return
  isNewNoteOpen.value = true
}

function handleNoteCreated(payload: { path: string, link: string }) {
  isNewNoteOpen.value = false
  window.location.assign(payload.link)
}

watch(() => route.path, () => {
  isOpen.value = false
})

onMounted(() => {
  mounted.value = true
})
</script>

<template>
  <Teleport v-if="canShowHost" to="body">
    <div class="local-editor-host-actions">
      <button
        class="local-editor-trigger"
        type="button"
        :disabled="!canEdit || isLoadingPanel"
        title="本地编辑"
        aria-label="本地编辑"
        @click="openEditor"
      >
        {{ isLoadingPanel ? '...' : '编辑' }}
      </button>

      <button
        class="local-editor-trigger is-secondary"
        type="button"
        title="新建笔记"
        aria-label="新建笔记"
        @click="openNewNoteDialog"
      >
        新建
      </button>
    </div>

    <component
      :is="editorPanel"
      v-if="isOpen && editorPanel"
      :key="relativePath"
      :relative-path="relativePath"
      :page-path="route.path"
      @close="closeEditor"
    />

    <LocalEditorNewNoteDialog
      :open="isNewNoteOpen"
      :default-dir="defaultNoteDir"
      :default-prefix="defaultCoursePrefix"
      @close="isNewNoteOpen = false"
      @created="handleNoteCreated"
    />
  </Teleport>
</template>

<style scoped>
.local-editor-host-actions {
  position: fixed;
  z-index: 90;
  bottom: 22px;
  left: 22px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.local-editor-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 54px;
  height: 34px;
  border: 1px solid color-mix(in srgb, var(--vp-c-divider) 72%, transparent);
  border-radius: 999px;
  padding: 0 14px;
  background: color-mix(in srgb, var(--vp-c-bg) 84%, transparent);
  box-shadow: 0 10px 30px rgb(15 23 42 / 14%);
  color: var(--vp-c-text-2);
  font-size: 13px;
  font-weight: 600;
  line-height: 1;
  cursor: pointer;
  backdrop-filter: blur(18px) saturate(1.18);
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;
}

.local-editor-trigger.is-secondary {
  min-width: 48px;
}

.local-editor-trigger:hover,
.local-editor-trigger:focus-visible {
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 42%, var(--vp-c-divider));
  box-shadow: 0 14px 34px rgb(15 23 42 / 18%);
  color: var(--vp-c-brand-1);
  transform: translateY(-1px);
}

.local-editor-trigger:disabled {
  cursor: wait;
  opacity: 0.68;
}

@media (max-width: 768px) {
  .local-editor-host-actions {
    bottom: 16px;
    left: 16px;
  }
}

@media print {
  .local-editor-host-actions {
    display: none;
  }
}
</style>
