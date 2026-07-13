const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/

/**
 * @param {string} content
 * @returns {{ frontmatter: Record<string, string | boolean | number>, body: string, rawFrontmatter: string }}
 */
export function splitFrontmatter(content) {
  const match = content.match(FRONTMATTER_RE)
  if (!match) {
    return { frontmatter: {}, body: content, rawFrontmatter: '' }
  }

  const rawFrontmatter = match[1]
  const body = content.slice(match[0].length)
  const frontmatter = parseSimpleYaml(rawFrontmatter)
  return { frontmatter, body, rawFrontmatter }
}

/**
 * @param {string} yaml
 * @returns {Record<string, string | boolean | number>}
 */
export function parseSimpleYaml(yaml) {
  /** @type {Record<string, string | boolean | number>} */
  const result = {}
  const lines = yaml.split(/\r?\n/)

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    const colon = trimmed.indexOf(':')
    if (colon === -1) continue

    const key = trimmed.slice(0, colon).trim()
    let value = trimmed.slice(colon + 1).trim()

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
      result[key] = value
      continue
    }

    if (value === 'true') {
      result[key] = true
      continue
    }
    if (value === 'false') {
      result[key] = false
      continue
    }

    if (/^-?\d+(?:\.\d+)?$/.test(value)) {
      result[key] = Number(value)
      continue
    }

    result[key] = value
  }

  return result
}

/**
 * @param {Record<string, unknown>} frontmatter
 */
export function serializeFrontmatterValue(value) {
  if (typeof value === 'boolean') return value ? 'true' : 'false'
  if (typeof value === 'number') return String(value)
  const text = String(value ?? '').trim()
  if (!text) return ''
  if (/[:#{}[\],&*!|>'"%@`]|^\s|\s$/.test(text)) {
    return `"${text.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`
  }
  return text
}

/**
 * @param {Record<string, unknown>} frontmatter
 */
export function buildFrontmatterBlock(frontmatter) {
  const lines = Object.entries(frontmatter)
    .filter(([, value]) => value !== '' && value !== undefined && value !== null)
    .map(([key, value]) => {
      const serialized = serializeFrontmatterValue(value)
      return serialized ? `${key}: ${serialized}` : ''
    })
    .filter(Boolean)

  if (!lines.length) return ''
  return `---\n${lines.join('\n')}\n---\n`
}

/**
 * @param {string} content
 * @param {Record<string, unknown>} frontmatter
 */
export function mergeFrontmatter(content, frontmatter) {
  const { body } = splitFrontmatter(content)
  const block = buildFrontmatterBlock(frontmatter)
  return block ? `${block}\n${body.replace(/^\n+/, '')}` : body
}

/**
 * @param {string} relativePath
 */
export function defaultNoteTemplate(relativePath, title = '') {
  const heading = title || relativePath.replace(/\.md$/i, '').split('/').pop() || '新笔记'
  const now = new Date()
  const pad = (n) => String(n).padStart(2, '0')
  const offset = -now.getTimezoneOffset()
  const sign = offset >= 0 ? '+' : '-'
  const offsetHours = pad(Math.floor(Math.abs(offset) / 60))
  const offsetMinutes = pad(Math.abs(offset) % 60)
  const lastUpdated = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}${sign}${offsetHours}:${offsetMinutes}`

  return `---
lastUpdated: ${lastUpdated}
---

# ${heading}

`
}
