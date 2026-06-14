import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const configRoot = path.dirname(fileURLToPath(import.meta.url))
export const vitepressRoot = path.resolve(configRoot, '..')
export const docsRoot = path.resolve(vitepressRoot, '..')
export const publicRoot = path.resolve(docsRoot, 'public')
