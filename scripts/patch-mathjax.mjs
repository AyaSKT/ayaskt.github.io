#!/usr/bin/env node
/**
 * 移除 @mdit/plugin-mathjax 传给 MathJax 的 enableAssistiveMml 选项，
 * 避免 MathJax 4 报错：Invalid option "enableAssistiveMml" (no default value)
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const target = path.join(__dirname, '../node_modules/@mdit/plugin-mathjax/dist/index.js')

if (!fs.existsSync(target)) {
  console.warn('patch-mathjax: target not found, skip')
  process.exit(0)
}

let code = fs.readFileSync(target, 'utf8')
// 匹配 enableAssistiveMml 项（可能带逗号或前有逗号），兼容不同压缩格式
const regex = /,?enableAssistiveMml:e\.a11y!==!1/g
if (!regex.test(code)) {
  console.warn('patch-mathjax: already patched or version changed, skip')
  process.exit(0)
}

code = code.replace(/,?enableAssistiveMml:e\.a11y!==!1/g, '')
try {
  fs.writeFileSync(target, code)
  console.log('patch-mathjax: applied (removed enableAssistiveMml from documentOptions)')
} catch (err) {
  if (err.code === 'EACCES') {
    console.error('patch-mathjax: 无写入 node_modules 的权限，请用可写权限执行 npm install，或手动运行: node scripts/patch-mathjax.mjs')
  }
  throw err
}
