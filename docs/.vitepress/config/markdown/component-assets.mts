type ResolveComponentAsset = (specifier: string) => string

interface ComponentAssetRule {
  componentName: string
  attrNames: string[]
  variablePrefix: string
}

const componentAssetRules: ComponentAssetRule[] = [
  { componentName: 'SongCard', attrNames: ['cover'], variablePrefix: '__songCardCover' },
  { componentName: 'LyricCard', attrNames: ['album-cover'], variablePrefix: '__lyricCardAlbumCover' },
]

function safeDecodeUri(value: string) {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function escapeSingleQuotedAttribute(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
}

function isRelativeComponentAsset(value: string) {
  const src = value.trim()
  if (!src) return false
  if (src.startsWith('/') || src.startsWith('#') || src.startsWith('//')) return false
  return !/^[a-z][a-z\d+.-]*:/i.test(src)
}

function normalizeComponentAssetSpecifier(value: string) {
  const src = safeDecodeUri(value.trim())
  return src.startsWith('./') || src.startsWith('../') ? src : `./${src}`
}

function toStaticAssetExpression(specifier: string) {
  return JSON.stringify(specifier)
}

function transformComponentAssetAttrs(
  src: string,
  componentName: string,
  attrNames: string[],
  resolveRelativeAsset: ResolveComponentAsset = toStaticAssetExpression,
) {
  const tagPattern = new RegExp(`<${escapeRegExp(componentName)}\\b(?:[^<>"']|"[^"]*"|'[^']*')*>`, 'g')

  return src.replace(tagPattern, (tag) => {
    return attrNames.reduce((currentTag, attrName) => {
      const escapedAttr = escapeRegExp(attrName)
      const boundAttrPattern = new RegExp(`(?:^|\\s)(?::${escapedAttr}|v-bind:${escapedAttr})\\s*=`)
      if (boundAttrPattern.test(currentTag)) return currentTag

      const attrPattern = new RegExp(`(\\s)${escapedAttr}\\s*=\\s*("([^"]*)"|'([^']*)')`)

      return currentTag.replace(attrPattern, (match, leadingSpace, _quoted, doubleQuoted, singleQuoted) => {
        const rawValue = (doubleQuoted ?? singleQuoted ?? '').trim()
        if (!isRelativeComponentAsset(rawValue)) return match

        const expression = resolveRelativeAsset(normalizeComponentAssetSpecifier(rawValue))
        return `${leadingSpace}:${attrName}='${escapeSingleQuotedAttribute(expression)}'`
      })
    }, tag)
  })
}

export function transformSongCardCoverAttrs(
  src: string,
  resolveRelativeAsset?: ResolveComponentAsset,
) {
  return transformComponentAssetAttrs(src, 'SongCard', ['cover'], resolveRelativeAsset)
}

export function transformLyricCardAlbumCoverAttrs(
  src: string,
  resolveRelativeAsset?: ResolveComponentAsset,
) {
  return transformComponentAssetAttrs(src, 'LyricCard', ['album-cover'], resolveRelativeAsset)
}


function transformMarkdownComponentAssetAttrs(
  src: string,
  resolveRuleAsset: (rule: ComponentAssetRule, specifier: string) => string = (_rule, specifier) => {
    return toStaticAssetExpression(specifier)
  },
) {
  return componentAssetRules.reduce((currentSrc, rule) => {
    return transformComponentAssetAttrs(
      currentSrc,
      rule.componentName,
      rule.attrNames,
      (specifier) => resolveRuleAsset(rule, specifier),
    )
  }, src)
}

export function registerComponentAssetImports(md: any) {
  const render = md.renderer.render.bind(md.renderer)

  md.renderer.render = (tokens: any[], options: any, env: any) => {
    const imports = new Map<string, string>()

    const resolveRuleAsset = (rule: ComponentAssetRule, specifier: string) => {
      const key = `${rule.componentName}:${specifier}`
      const existing = imports.get(key)
      if (existing) return existing

      const variable = `${rule.variablePrefix}${imports.size}`
      imports.set(key, variable)
      return variable
    }

    const transformToken = (token: any) => {
      if (
        typeof token.content === 'string'
        && (token.type === 'html_block' || token.type === 'html_inline')
      ) {
        const shouldTransform = componentAssetRules.some((rule) => {
          return token.content.includes(`<${rule.componentName}`)
        })

        if (shouldTransform) {
          token.content = transformMarkdownComponentAssetAttrs(token.content, resolveRuleAsset)
        }
      }

      token.children?.forEach(transformToken)
    }

    tokens.forEach(transformToken)
    const html = render(tokens, options, env)
    injectComponentAssetImports(env, imports)

    return html
  }
}

function injectComponentAssetImports(env: any, imports: Map<string, string>) {
  if (!env.sfcBlocks || imports.size === 0) return

  const importCode = [...imports]
    .map(([key, variable]) => {
      const specifier = key.slice(key.indexOf(':') + 1)
      return `import ${variable} from ${JSON.stringify(specifier)}`
    })
    .join('\n')
  const scriptSetup = env.sfcBlocks.scriptSetup

  if (scriptSetup) {
    scriptSetup.content = scriptSetup.content.replace(
      /(<script\b[^>]*>)/i,
      `$1\n${importCode}`,
    )
    return
  }

  env.sfcBlocks.scripts.push({
    content: `<script setup>\n${importCode}\n</script>`,
  })
}
