import { mathjax, createMathjaxInstance } from '@mdit/plugin-mathjax'

type MathJaxTexInputOptionsWithMacros = import('@mdit/plugin-mathjax').MathJaxTexInputOptions & {
  macros: Record<string, string | [string, number]>
}

// 插件默认 TeX 包列表去掉 bboldx，避免 "Invalid variant: -bboldx"（newcm 字体无此变体）
const TEX_PACKAGES_WITHOUT_BBOLDX = [
  'action', 'ams', 'amscd', 'bbm', 'bbox', 'begingroup', 'boldsymbol', 'braket', 'bussproofs',
  'cancel', 'cases', 'centernot', 'color', 'colortbl', 'colorv2', 'configmacros', 'dsfont', 'empheq',
  'enclose', 'extpfeil', 'gensymb', 'html', 'mathtools', 'mhchem', 'newcommand', 'noerrors', 'noundefined',
  'physics', 'setoptions', 'tagformat', 'texhtml', 'textcomp', 'textmacros', 'unicode', 'units', 'upgreek', 'verb'
] as const

const TEX_MACROS = {
  pounds: '\\unicode{xA3}',
} as const

export async function configureMathjax(md: any) {
  // MathJax 4：服务端 SVG 输出，$...$ 与 $$...$$ 分隔符。排除 bboldx 避免 "Invalid variant: -bboldx"。
  // 用 transformer 包裹 v-pre，防止 Vue hydration 时把公式再处理一次导致重复显示。
  const mathjaxInstance = await createMathjaxInstance({
    output: 'svg',
    delimiters: 'dollars',
    a11y: false, // 关闭辅助输出，避免与主 SVG 同时显示导致公式“重影”
    tex: {
      packages: ['base', ...TEX_PACKAGES_WITHOUT_BBOLDX] as unknown as import('@mdit/plugin-mathjax').TexPackage[],
      macros: TEX_MACROS,
    } as MathJaxTexInputOptionsWithMacros,
    transformer: (html, displayMode) =>
      displayMode
        ? `<span class="mathjax-block" v-pre>${html}</span>`
        : `<span v-pre>${html}</span>`
  })

  if (mathjaxInstance) {
    await mathjaxInstance.outputStyle()
    md.use(mathjax, mathjaxInstance)
  }
}
