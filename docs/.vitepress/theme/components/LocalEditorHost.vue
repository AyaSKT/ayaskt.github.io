<script setup lang="ts">
import { computed, markRaw, onMounted, ref, shallowRef, watch } from 'vue'
import type { Component } from 'vue'
import { useData, useRoute } from 'vitepress'

const route = useRoute()
const { page } = useData()

const mounted = ref(false)
const isOpen = ref(false)
const isLoadingPanel = ref(false)
const editorPanel = shallowRef<Component | null>(null)

const relativePath = computed(() => {
  const value = page.value?.relativePath
  return typeof value === 'string' ? value : ''
})

const canEdit = computed(() => {
  if (!import.meta.env.DEV || !mounted.value) return false
  if (page.value?.isNotFound) return false
  return relativePath.value.endsWith('.md')
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

watch(() => route.path, () => {
  isOpen.value = false
})

onMounted(() => {
  mounted.value = true
})
</script>

<template>
  <Teleport v-if="canEdit" to="body">
    <button
      class="local-editor-trigger"
      type="button"
      :disabled="isLoadingPanel"
      title="本地编辑"
      aria-label="本地编辑"
      @click="openEditor"
    >
      {{ isLoadingPanel ? '...' : '编辑' }}
    </button>

    <component
      :is="editorPanel"
      v-if="isOpen && editorPanel"
      :key="relativePath"
      :relative-path="relativePath"
      :page-path="route.path"
      @close="closeEditor"
    />
  </Teleport>
</template>

<style scoped>
.local-editor-trigger {
  position: fixed;
  z-index: 90;
  bottom: 22px;
  left: 22px;
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
  .local-editor-trigger {
    bottom: 16px;
    left: 16px;
  }
}

@media print {
  .local-editor-trigger {
    display: none;
  }
}
</style>
