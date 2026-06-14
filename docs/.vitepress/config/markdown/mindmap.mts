import { escapeSingleQuotedAttribute } from './component-assets.mts'

function escapeHtml(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function renderMindMapFence(src: string, info = '') {
  const title = info.replace(/^mindmap\b\s*/, '').trim()
  const titleAttr = title ? ` title="${escapeHtml(title)}"` : ''
  const sourceAttr = escapeSingleQuotedAttribute(JSON.stringify(src))

  return `<MindMap${titleAttr} :source='${sourceAttr}'></MindMap>\n`
}

export function registerMindMapFence(md: any) {
  const defaultFence = md.renderer.rules.fence?.bind(md.renderer.rules)

  md.renderer.rules.fence = (tokens: any[], idx: number, options: any, env: any, self: any) => {
    const info = (tokens[idx].info || '').trim()
    if (/^mindmap(?:\s|$)/.test(info)) {
      return renderMindMapFence(tokens[idx].content, info)
    }

    if (defaultFence) return defaultFence(tokens, idx, options, env, self)
    return self.renderToken(tokens, idx, options)
  }
}
