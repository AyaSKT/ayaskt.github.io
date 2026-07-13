<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import { localEditorFrontmatterFields } from '../../local-editor/registry.mjs'
import { buildFrontmatterBlock, splitFrontmatter } from '../../local-editor/frontmatter.mjs'

const props = defineProps<{
  source: string
}>()

const emit = defineEmits<{
  apply: [content: string]
}>()

const values = reactive<Record<string, unknown>>({})

const hasFrontmatter = computed(() => Boolean(splitFrontmatter(props.source).rawFrontmatter))

function syncFromSource(content: string) {
  const { frontmatter } = splitFrontmatter(content)
  for (const field of localEditorFrontmatterFields) {
    const current = frontmatter[field.key]
    if (field.type === 'checkbox') {
      values[field.key] = current === true
      continue
    }
    if (field.type === 'select') {
      values[field.key] = current === false ? 'false' : current === true ? 'true' : String(current ?? '')
      continue
    }
    values[field.key] = current ?? ''
  }
}

function applyFrontmatter() {
  const { body } = splitFrontmatter(props.source)
  const frontmatter: Record<string, unknown> = {}

  for (const field of localEditorFrontmatterFields) {
    const value = values[field.key]
    if (field.type === 'checkbox') {
      if (value === true) frontmatter[field.key] = true
      continue
    }
    if (field.type === 'select') {
      if (value === 'true') frontmatter[field.key] = true
      else if (value === 'false') frontmatter[field.key] = false
      continue
    }
    const text = String(value ?? '').trim()
    if (text) frontmatter[field.key] = text
  }

  const block = buildFrontmatterBlock(frontmatter)
  emit('apply', block ? `${block}\n${body.replace(/^\n+/, '')}` : body)
}

function removeFrontmatter() {
  const { body } = splitFrontmatter(props.source)
  emit('apply', body)
}

watch(() => props.source, (content) => {
  syncFromSource(content)
}, { immediate: true })
</script>

<template>
  <section class="local-editor-frontmatter">
    <div class="local-editor-frontmatter-head">
      <span>Frontmatter</span>
      <span>{{ hasFrontmatter ? '已启用' : '未设置' }}</span>
    </div>

    <div class="local-editor-frontmatter-grid">
      <label
        v-for="field in localEditorFrontmatterFields"
        :key="field.key"
        class="local-editor-frontmatter-field"
      >
        <span>{{ field.label }}</span>
        <input
          v-if="field.type === 'text'"
          v-model="values[field.key]"
          type="text"
          :placeholder="field.placeholder"
        >
        <textarea
          v-else-if="field.type === 'textarea'"
          v-model="values[field.key]"
          :rows="field.rows || 2"
          :placeholder="field.placeholder"
        />
        <select
          v-else-if="field.type === 'select'"
          v-model="values[field.key]"
        >
          <option
            v-for="option in field.options"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
        <input
          v-else-if="field.type === 'checkbox'"
          v-model="values[field.key]"
          type="checkbox"
        >
      </label>
    </div>

    <div class="local-editor-frontmatter-actions">
      <button type="button" @click="removeFrontmatter">移除 Frontmatter</button>
      <button class="is-primary" type="button" @click="applyFrontmatter">应用到正文</button>
    </div>
  </section>
</template>

<style scoped>
.local-editor-frontmatter {
  display: grid;
  gap: 10px;
  border-top: 1px solid var(--vp-c-divider);
  padding: 10px;
  background: color-mix(in srgb, var(--vp-c-bg-soft) 62%, transparent);
}

.local-editor-frontmatter-head,
.local-editor-frontmatter-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.local-editor-frontmatter-head span:first-child {
  color: var(--vp-c-text-2);
  font-size: 13px;
  font-weight: 700;
}

.local-editor-frontmatter-head span:last-child {
  color: var(--vp-c-text-3);
  font-size: 12px;
}

.local-editor-frontmatter-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.local-editor-frontmatter-field {
  display: grid;
  gap: 4px;
}

.local-editor-frontmatter-field span {
  color: var(--vp-c-text-3);
  font-size: 12px;
}

.local-editor-frontmatter-field input,
.local-editor-frontmatter-field textarea,
.local-editor-frontmatter-field select,
.local-editor-frontmatter-actions button {
  border: 1px solid color-mix(in srgb, var(--vp-c-divider) 82%, transparent);
  border-radius: 6px;
  padding: 6px 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font: inherit;
  font-size: 12px;
}

.local-editor-frontmatter-actions .is-primary {
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 72%, var(--vp-c-divider));
  color: var(--vp-c-brand-1);
}

@media (max-width: 900px) {
  .local-editor-frontmatter-grid {
    grid-template-columns: 1fr;
  }
}
</style>
