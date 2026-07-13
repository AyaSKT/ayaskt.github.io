/**
 * @param {string} relativePath 例如 Y3S2/DSP/DSP Chapter 9.md
 */
export function coursePrefixFromRelativePath(relativePath) {
  const parts = String(relativePath).replace(/\\/g, '/').split('/').filter(Boolean)
  if (parts.length < 2) return ''
  return `/${parts[0]}/${parts[1]}/`
}

/**
 * @param {string} relativePath
 */
export function markdownLinkFromRelativePath(relativePath) {
  const clean = String(relativePath).replace(/\\/g, '/').replace(/\.md$/i, '')
  return `/${clean}`
}

/**
 * @param {string} configSource
 */
export function listSidebarPrefixes(configSource) {
  const matches = configSource.matchAll(/['"](\/[^'"]+\/)['"]:\s*\[/g)
  return [...new Set([...matches].map((match) => match[1]))].sort()
}

/**
 * @param {string} configSource
 * @param {string} prefix 例如 /Y3S2/DSP/
 */
export function extractSidebarBlock(configSource, prefix) {
  const escaped = prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const startRe = new RegExp(`['"]${escaped}['"]:\\s*\\[`)
  const startMatch = startRe.exec(configSource)
  if (!startMatch || startMatch.index === undefined) {
    return { ok: false, error: `未找到 sidebar 前缀 ${prefix}` }
  }

  const openBracket = configSource.indexOf('[', startMatch.index)
  let depth = 0
  let end = -1

  for (let index = openBracket; index < configSource.length; index++) {
    const char = configSource[index]
    if (char === '[') depth += 1
    if (char === ']') {
      depth -= 1
      if (depth === 0) {
        end = index
        break
      }
    }
  }

  if (end === -1) {
    return { ok: false, error: `sidebar 块 ${prefix} 括号未闭合` }
  }

  return {
    ok: true,
    start: openBracket,
    end,
    block: configSource.slice(openBracket, end + 1),
  }
}

/**
 * @param {string} block
 */
export function listSidebarGroups(block) {
  const groups = []
  const re = /text:\s*['"]([^'"]+)['"]/g
  for (const match of block.matchAll(re)) {
    groups.push(match[1])
  }
  return [...new Set(groups)]
}

/**
 * @param {string} configSource
 * @param {{ prefix: string, groupText?: string, text: string, link: string }} options
 */
export function appendSidebarItem(configSource, options) {
  const prefix = options.prefix
  const text = String(options.text || '').trim()
  const link = String(options.link || '').trim()
  if (!prefix || !text || !link) {
    return { ok: false, error: 'sidebar 参数不完整' }
  }

  const extracted = extractSidebarBlock(configSource, prefix)
  if (!extracted.ok || extracted.block === undefined || extracted.start === undefined || extracted.end === undefined) {
    return extracted
  }

  const insertion = `            { text: '${text.replace(/'/g, "\\'")}', link: '${link.replace(/'/g, "\\'")}' },\n`
  let block = extracted.block

  if (options.groupText) {
    const groupRe = new RegExp(
      `\\{\\s*text:\\s*['"]${options.groupText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"][\\s\\S]*?items:\\s*\\[`,
    )
    const groupMatch = groupRe.exec(block)
    if (!groupMatch || groupMatch.index === undefined) {
      return { ok: false, error: `未找到 sidebar 分组 ${options.groupText}` }
    }

    const itemsOpen = block.indexOf('[', groupMatch.index)
    let depth = 0
    let close = -1
    for (let index = itemsOpen; index < block.length; index++) {
      const char = block[index]
      if (char === '[') depth += 1
      if (char === ']') {
        depth -= 1
        if (depth === 0) {
          close = index
          break
        }
      }
    }

    if (close === -1) {
      return { ok: false, error: '分组 items 括号未闭合' }
    }

    if (block.slice(itemsOpen + 1, close).includes(`link: '${link}'`) || block.slice(itemsOpen + 1, close).includes(`link: "${link}"`)) {
      return { ok: true, changed: false, content: configSource }
    }

    block = `${block.slice(0, close)}${insertion}${block.slice(close)}`
  } else {
    const topItemsRe = /items:\s*\[/
    const topMatch = topItemsRe.exec(block)
    if (!topMatch || topMatch.index === undefined) {
      return { ok: false, error: '未找到顶层 items 数组' }
    }

    const itemsOpen = block.indexOf('[', topMatch.index)
    let depth = 0
    let close = -1
    for (let index = itemsOpen; index < block.length; index++) {
      const char = block[index]
      if (char === '[') depth += 1
      if (char === ']') {
        depth -= 1
        if (depth === 0) {
          close = index
          break
        }
      }
    }

    if (close === -1) {
      return { ok: false, error: '顶层 items 括号未闭合' }
    }

    if (block.slice(itemsOpen + 1, close).includes(`link: '${link}'`) || block.slice(itemsOpen + 1, close).includes(`link: "${link}"`)) {
      return { ok: true, changed: false, content: configSource }
    }

    block = `${block.slice(0, close)}${insertion}${block.slice(close)}`
  }

  const next = `${configSource.slice(0, extracted.start)}${block}${configSource.slice(extracted.end + 1)}`
  return { ok: true, changed: true, content: next }
}
