import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeKatex from 'rehype-katex'
import rehypeStringify from 'rehype-stringify'
import { visit } from 'unist-util-visit'
import { transformMarkdownComponents } from './components'
import { transformContainers } from './containers'
import { resolveMarkdownAssetHref, resolveMarkdownHref } from '../routing/vitepressPaths'

export interface RenderedMarkdown {
  html: string
  headings: Heading[]
}

export interface Heading {
  depth: number
  text: string
  slug: string
}

export async function renderMarkdown(source: string, docsPath: string): Promise<RenderedMarkdown> {
  const transformed = transformMarkdownComponents(transformContainers(source), docsPath)
  const headings: Heading[] = []
  const slugCounts = new Map<string, number>()

  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(() => (tree) => {
      visit(tree, 'link', (node: any) => {
        if (typeof node.url === 'string') node.url = resolveMarkdownHref(node.url, docsPath)
      })
      visit(tree, 'image', (node: any) => {
        if (typeof node.url === 'string') node.url = resolveMarkdownAssetHref(node.url, docsPath)
      })
      visit(tree, 'heading', (node: any) => {
        const text = plainText(node)
        const base = slugify(text)
        const count = slugCounts.get(base) ?? 0
        slugCounts.set(base, count + 1)
        const slug = count === 0 ? base : `${base}-${count}`
        node.data ??= {}
        node.data.hProperties ??= {}
        node.data.hProperties.id = slug
        headings.push({ depth: node.depth, text, slug })
      })
    })
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeKatex, {
      strict: false,
      trust: true,
      macros: {
        '\\dd': '\\mathop{}\\!d',
        '\\rect': '\\operatorname{rect}',
        '\\sinc': '\\operatorname{sinc}',
      },
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(transformed)

  return {
    html: String(file),
    headings,
  }
}

function plainText(node: any): string {
  if (!node) return ''
  if (node.type === 'text' || node.type === 'inlineCode') return node.value ?? ''
  if (!Array.isArray(node.children)) return ''
  return node.children.map(plainText).join('')
}

function slugify(value: string) {
  return encodeURIComponent(
    value
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[!'()*]/g, (char) => `%${char.charCodeAt(0).toString(16).toUpperCase()}`),
  )
}
