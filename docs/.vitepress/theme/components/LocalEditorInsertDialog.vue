<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { buildRegistrySnippet, getRegistryEntry, localEditorRegistry } from '../../local-editor/registry.mjs'

interface RegistryField {
  key: string
  label: string
  type: 'text' | 'textarea' | 'select' | 'checkbox' | 'number' | 'lines'
  placeholder?: string
  defaultValue?: string | boolean | number
  options?: { label: string, value: string }[]
  rows?: number
}

const props = defineProps<{
  open: boolean
  entryId?: string
}>()

const emit = defineEmits<{
  close: []
  insert: [text: string]
}>()

const activeEntryId = ref('')
const lineInputs = ref<string[]>([''])

const values = reactive<Record<string, unknown>>({})

const entry = computed(() => getRegistryEntry(activeEntryId.value))
const groupedEntries = computed(() => {
  const groups = new Map<string, typeof localEditorRegistry>()
  for (const item of localEditorRegistry) {
    const bucket = groups.get(item.category) ?? []
    bucket.push(item)
    groups.set(item.category, bucket)
  }
  return [...groups.entries()]
})

function resetValues(nextEntryId: string) {
  activeEntryId.value = nextEntryId
  const nextEntry = getRegistryEntry(nextEntryId)
  Object.keys(values).forEach((key) => delete values[key])
  lineInputs.value = ['']

  for (const field of nextEntry?.fields ?? []) {
    if (field.type === 'lines') {
      lineInputs.value = ['']
      continue
    }
    values[field.key] = field.defaultValue ?? (field.type === 'checkbox' ? false : '')
  }
}

function openEntry(entryId: string) {
  resetValues(entryId)
}

function closeDialog() {
  emit('close')
}

function insertSnippet() {
  const current = entry.value
  if (!current) return

  const payload = { ...values }
  const linesField = current.fields?.find((field) => field.type === 'lines')
  if (linesField) {
    payload[linesField.key] = lineInputs.value.filter((line) => line.trim())
  }

  const text = buildRegistrySnippet(current.id, payload)
  if (!text) return
  emit('insert', text)
  closeDialog()
}

function addLine() {
  lineInputs.value.push('')
}

function removeLine(index: number) {
  if (lineInputs.value.length <= 1) {
    lineInputs.value = ['']
    return
  }
  lineInputs.value.splice(index, 1)
}

watch(() => props.open, (open) => {
  if (!open) return
  const nextId = props.entryId || localEditorRegistry[0]?.id || ''
  resetValues(nextId)
}, { immediate: true })

watch(() => props.entryId, (nextId) => {
  if (!props.open || !nextId) return
  resetValues(nextId)
})
</script>

<template>
  <div
    v-if="open"
    class="local-editor-dialog-backdrop"
    @click.self="closeDialog"
  >
    <div
      class="local-editor-dialog"
      role="dialog"
      aria-modal="true"
      aria-label="插入内容块"
    >
      <header class="local-editor-dialog-header">
        <strong>插入内容块</strong>
        <button type="button" @click="closeDialog">关闭</button>
      </header>

      <div class="local-editor-dialog-body">
        <aside class="local-editor-dialog-nav">
          <section
            v-for="[category, items] in groupedEntries"
            :key="category"
            class="local-editor-dialog-group"
          >
            <h3>{{ category }}</h3>
            <button
              v-for="item in items"
              :key="item.id"
              type="button"
              :class="{ 'is-active': activeEntryId === item.id }"
              @click="openEntry(item.id)"
            >
              {{ item.label }}
            </button>
          </section>
        </aside>

        <section v-if="entry" class="local-editor-dialog-form">
          <p v-if="entry.description" class="local-editor-dialog-desc">{{ entry.description }}</p>

          <template v-for="field in (entry.fields as RegistryField[])" :key="field.key">
            <label v-if="field.type !== 'lines'" class="local-editor-field">
              <span>{{ field.label }}</span>
              <input
                v-if="field.type === 'text' || field.type === 'number'"
                v-model="values[field.key]"
                :type="field.type"
                :placeholder="field.placeholder"
              >
              <textarea
                v-else-if="field.type === 'textarea'"
                v-model="values[field.key]"
                :rows="field.rows || 3"
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

            <div v-else class="local-editor-lines">
              <span>{{ field.label }}</span>
              <div
                v-for="(line, index) in lineInputs"
                :key="`${field.key}-${index}`"
                class="local-editor-line-row"
              >
                <input
                  v-model="lineInputs[index]"
                  type="text"
                  :placeholder="field.placeholder"
                >
                <button type="button" @click="removeLine(index)">删</button>
              </div>
              <button type="button" class="local-editor-line-add" @click="addLine">添加一行</button>
            </div>
          </template>

          <div class="local-editor-dialog-actions">
            <button type="button" @click="closeDialog">取消</button>
            <button class="is-primary" type="button" @click="insertSnippet">插入</button>
          </div>
        </section>
      </div>
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
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  width: min(920px, 100%);
  max-height: min(82vh, 760px);
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

.local-editor-dialog-body {
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  min-height: 0;
}

.local-editor-dialog-nav {
  border-right: 1px solid var(--vp-c-divider);
  padding: 10px;
  overflow: auto;
}

.local-editor-dialog-group + .local-editor-dialog-group {
  margin-top: 12px;
}

.local-editor-dialog-group h3 {
  margin: 0 0 6px;
  color: var(--vp-c-text-3);
  font-size: 12px;
}

.local-editor-dialog-nav button,
.local-editor-dialog-header button,
.local-editor-dialog-actions button,
.local-editor-line-row button,
.local-editor-line-add {
  border: 1px solid color-mix(in srgb, var(--vp-c-divider) 82%, transparent);
  border-radius: 6px;
  padding: 6px 10px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font: inherit;
  font-size: 13px;
  cursor: pointer;
}

.local-editor-dialog-nav button {
  display: block;
  width: 100%;
  margin-bottom: 6px;
  text-align: left;
}

.local-editor-dialog-nav button.is-active,
.local-editor-dialog-actions .is-primary {
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 72%, var(--vp-c-divider));
  color: var(--vp-c-brand-1);
}

.local-editor-dialog-form {
  display: grid;
  align-content: start;
  gap: 12px;
  padding: 14px;
  overflow: auto;
}

.local-editor-dialog-desc {
  margin: 0;
  color: var(--vp-c-text-3);
  font-size: 13px;
}

.local-editor-field,
.local-editor-lines {
  display: grid;
  gap: 6px;
}

.local-editor-field span,
.local-editor-lines > span {
  color: var(--vp-c-text-2);
  font-size: 13px;
  font-weight: 600;
}

.local-editor-field input[type='text'],
.local-editor-field input[type='number'],
.local-editor-field textarea,
.local-editor-field select,
.local-editor-line-row input {
  width: 100%;
  border: 1px solid color-mix(in srgb, var(--vp-c-divider) 82%, transparent);
  border-radius: 6px;
  padding: 8px 10px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font: inherit;
  font-size: 13px;
}

.local-editor-line-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 8px;
}

.local-editor-dialog-actions {
  justify-content: flex-end;
  margin-top: 4px;
}

@media (max-width: 768px) {
  .local-editor-dialog-body {
    grid-template-columns: 1fr;
  }

  .local-editor-dialog-nav {
    border-right: 0;
    border-bottom: 1px solid var(--vp-c-divider);
  }
}
</style>
