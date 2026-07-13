/** @type {Map<string, { content: string, updatedAt: number }>} */
const draftStore = new Map()

/**
 * @param {string} relativePath
 */
export function normalizeDraftPath(relativePath) {
  return String(relativePath).replace(/\\/g, '/').replace(/^\/+/, '')
}

/**
 * @param {string} relativePath
 * @param {string} content
 */
export function setLocalEditorDraft(relativePath, content) {
  const key = normalizeDraftPath(relativePath)
  if (!key) return
  draftStore.set(key, { content, updatedAt: Date.now() })
}

/**
 * @param {string} relativePath
 */
export function getLocalEditorDraft(relativePath) {
  return draftStore.get(normalizeDraftPath(relativePath))?.content
}

/**
 * @param {string} relativePath
 */
export function clearLocalEditorDraft(relativePath) {
  draftStore.delete(normalizeDraftPath(relativePath))
}

/**
 * @param {string} fileId Vite 模块 id
 */
export function resolveDraftFromModuleId(fileId) {
  const normalized = fileId.replace(/\\/g, '/')
  const marker = '/docs/'
  const index = normalized.lastIndexOf(marker)
  if (index === -1) return undefined
  const relative = normalized.slice(index + marker.length)
  if (!relative.endsWith('.md')) return undefined
  return getLocalEditorDraft(relative)
}
