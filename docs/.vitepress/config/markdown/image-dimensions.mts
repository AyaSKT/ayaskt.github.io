import fs from 'node:fs'
import path from 'node:path'
import { docsRoot, publicRoot } from '../paths.mts'

function safeDecodeUri(value: string) {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

interface ImageDimensions {
  width: number
  height: number
}

interface CachedImageDimensions {
  mtimeMs: number
  size: number
  dimensions: ImageDimensions | null
}

const imageDimensionCache = new Map<string, CachedImageDimensions>()
const supportedImageDimensionExtensions = new Set([
  '.gif',
  '.jpg',
  '.jpeg',
  '.png',
  '.svg',
  '.webp',
])

function isExternalImageSrc(value: string) {
  const src = value.trim()
  return (
    !src ||
    src.startsWith('#') ||
    src.startsWith('//') ||
    src.startsWith('data:') ||
    src.startsWith('blob:') ||
    /^[a-z][a-z\d+.-]*:/i.test(src)
  )
}

function stripUrlSuffix(value: string) {
  const index = value.search(/[?#]/)
  return index === -1 ? value : value.slice(0, index)
}

function isInsideDocsRoot(filePath: string) {
  const relative = path.relative(docsRoot, filePath)
  return relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative))
}

function getExistingImageFile(candidates: string[]) {
  for (const candidate of candidates) {
    const filePath = path.normalize(candidate)
    if (!isInsideDocsRoot(filePath)) continue

    const stat = fs.statSync(filePath, { throwIfNoEntry: false })
    if (stat?.isFile()) return filePath
  }

  return undefined
}

function markdownFilePathFromEnv(env: any) {
  const candidates = [env?.path, env?.filePath, env?.relativePath]

  for (const candidate of candidates) {
    if (typeof candidate !== 'string' || !candidate.trim()) continue

    const cleanPath = candidate.split(/[?#]/, 1)[0]
    const filePath = path.isAbsolute(cleanPath)
      ? cleanPath
      : path.resolve(docsRoot, cleanPath.replace(/^\/+/, ''))

    if (isInsideDocsRoot(filePath)) return filePath
  }

  return undefined
}

function resolveMarkdownImageFile(src: string, env: any) {
  const cleanSrc = safeDecodeUri(stripUrlSuffix(src).trim())
  if (isExternalImageSrc(cleanSrc)) return undefined

  const extension = path.extname(cleanSrc).toLowerCase()
  if (!supportedImageDimensionExtensions.has(extension)) return undefined

  if (cleanSrc.startsWith('/')) {
    const localPath = cleanSrc.replace(/^\/+/, '')
    return getExistingImageFile([
      path.resolve(publicRoot, localPath),
      path.resolve(docsRoot, localPath),
    ])
  }

  const markdownFilePath = markdownFilePathFromEnv(env)
  const baseDir = markdownFilePath ? path.dirname(markdownFilePath) : docsRoot
  return getExistingImageFile([path.resolve(baseDir, cleanSrc)])
}

function readUInt16(buffer: Buffer, offset: number, littleEndian: boolean) {
  return littleEndian ? buffer.readUInt16LE(offset) : buffer.readUInt16BE(offset)
}

function readUInt32(buffer: Buffer, offset: number, littleEndian: boolean) {
  return littleEndian ? buffer.readUInt32LE(offset) : buffer.readUInt32BE(offset)
}

function readUInt24LE(buffer: Buffer, offset: number) {
  return buffer[offset] + (buffer[offset + 1] << 8) + (buffer[offset + 2] << 16)
}

function applyJpegOrientation(dimensions: ImageDimensions, orientation: number | undefined) {
  return orientation && orientation >= 5 && orientation <= 8
    ? { width: dimensions.height, height: dimensions.width }
    : dimensions
}

function readExifOrientation(buffer: Buffer, offset: number, segmentLength: number) {
  const segmentStart = offset + 2
  const segmentEnd = offset + segmentLength
  if (segmentEnd > buffer.length || segmentStart + 14 > segmentEnd) return undefined
  if (buffer.toString('ascii', segmentStart, segmentStart + 6) !== 'Exif\0\0') return undefined

  const tiffStart = segmentStart + 6
  const endian = buffer.toString('ascii', tiffStart, tiffStart + 2)
  const littleEndian = endian === 'II'
  if (!littleEndian && endian !== 'MM') return undefined
  if (readUInt16(buffer, tiffStart + 2, littleEndian) !== 42) return undefined

  const ifdOffset = readUInt32(buffer, tiffStart + 4, littleEndian)
  const ifdStart = tiffStart + ifdOffset
  if (ifdStart + 2 > segmentEnd) return undefined

  const entryCount = readUInt16(buffer, ifdStart, littleEndian)
  for (let index = 0; index < entryCount; index++) {
    const entryOffset = ifdStart + 2 + index * 12
    if (entryOffset + 12 > segmentEnd) break

    const tag = readUInt16(buffer, entryOffset, littleEndian)
    const type = readUInt16(buffer, entryOffset + 2, littleEndian)
    const count = readUInt32(buffer, entryOffset + 4, littleEndian)
    if (tag === 0x0112 && type === 3 && count >= 1) {
      return readUInt16(buffer, entryOffset + 8, littleEndian)
    }
  }

  return undefined
}

function readJpegDimensions(buffer: Buffer): ImageDimensions | null {
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) return null

  let offset = 2
  let orientation: number | undefined

  while (offset + 4 <= buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1
      continue
    }

    while (buffer[offset] === 0xff) offset += 1
    const marker = buffer[offset]
    offset += 1

    if (marker === 0xd9 || marker === 0xda) break
    if (marker >= 0xd0 && marker <= 0xd7) continue
    if (offset + 2 > buffer.length) break

    const segmentLength = buffer.readUInt16BE(offset)
    if (segmentLength < 2 || offset + segmentLength > buffer.length) break

    if (marker === 0xe1 && !orientation) {
      orientation = readExifOrientation(buffer, offset, segmentLength)
    }

    const isStartOfFrame = (
      (marker >= 0xc0 && marker <= 0xc3) ||
      (marker >= 0xc5 && marker <= 0xc7) ||
      (marker >= 0xc9 && marker <= 0xcb) ||
      (marker >= 0xcd && marker <= 0xcf)
    )

    if (isStartOfFrame && offset + 7 < buffer.length) {
      return applyJpegOrientation({
        height: buffer.readUInt16BE(offset + 3),
        width: buffer.readUInt16BE(offset + 5),
      }, orientation)
    }

    offset += segmentLength
  }

  return null
}

function readPngDimensions(buffer: Buffer): ImageDimensions | null {
  if (
    buffer.length < 24 ||
    buffer[0] !== 0x89 ||
    buffer.toString('ascii', 1, 4) !== 'PNG' ||
    buffer.toString('ascii', 12, 16) !== 'IHDR'
  ) {
    return null
  }

  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  }
}

function readGifDimensions(buffer: Buffer): ImageDimensions | null {
  if (buffer.length < 10 || !/^GIF8[79]a$/.test(buffer.toString('ascii', 0, 6))) return null

  return {
    width: buffer.readUInt16LE(6),
    height: buffer.readUInt16LE(8),
  }
}

function readWebpDimensions(buffer: Buffer): ImageDimensions | null {
  if (
    buffer.length < 30 ||
    buffer.toString('ascii', 0, 4) !== 'RIFF' ||
    buffer.toString('ascii', 8, 12) !== 'WEBP'
  ) {
    return null
  }

  const chunkType = buffer.toString('ascii', 12, 16)
  if (chunkType === 'VP8X') {
    return {
      width: readUInt24LE(buffer, 24) + 1,
      height: readUInt24LE(buffer, 27) + 1,
    }
  }

  if (chunkType === 'VP8L' && buffer[20] === 0x2f) {
    return {
      width: 1 + buffer[21] + ((buffer[22] & 0x3f) << 8),
      height: 1 + ((buffer[22] >> 6) | (buffer[23] << 2) | ((buffer[24] & 0x0f) << 10)),
    }
  }

  if (chunkType === 'VP8 ' && buffer.toString('hex', 23, 26) === '9d012a') {
    return {
      width: buffer.readUInt16LE(26) & 0x3fff,
      height: buffer.readUInt16LE(28) & 0x3fff,
    }
  }

  return null
}

function readSvgDimensions(buffer: Buffer): ImageDimensions | null {
  const svgTag = buffer.toString('utf8', 0, Math.min(buffer.length, 4096)).match(/<svg\b[^>]*>/i)?.[0]
  if (!svgTag) return null

  const width = svgTag.match(/\bwidth=(["'])([\d.]+)(?:px)?\1/i)?.[2]
  const height = svgTag.match(/\bheight=(["'])([\d.]+)(?:px)?\1/i)?.[2]
  if (width && height) {
    return {
      width: Math.round(Number(width)),
      height: Math.round(Number(height)),
    }
  }

  const viewBox = svgTag.match(/\bviewBox=(["'])\s*[-\d.]+\s+[-\d.]+\s+([\d.]+)\s+([\d.]+)\s*\1/i)
  if (viewBox) {
    return {
      width: Math.round(Number(viewBox[2])),
      height: Math.round(Number(viewBox[3])),
    }
  }

  return null
}

function readImageDimensionsFromBuffer(buffer: Buffer, extension: string): ImageDimensions | null {
  switch (extension) {
    case '.gif':
      return readGifDimensions(buffer)
    case '.jpg':
    case '.jpeg':
      return readJpegDimensions(buffer)
    case '.png':
      return readPngDimensions(buffer)
    case '.svg':
      return readSvgDimensions(buffer)
    case '.webp':
      return readWebpDimensions(buffer)
    default:
      return null
  }
}

function getImageDimensions(filePath: string) {
  const stat = fs.statSync(filePath, { throwIfNoEntry: false })
  if (!stat?.isFile()) return null

  const cached = imageDimensionCache.get(filePath)
  if (cached && cached.mtimeMs === stat.mtimeMs && cached.size === stat.size) {
    return cached.dimensions
  }

  const dimensions = readImageDimensionsFromBuffer(
    fs.readFileSync(filePath),
    path.extname(filePath).toLowerCase(),
  )

  imageDimensionCache.set(filePath, {
    mtimeMs: stat.mtimeMs,
    size: stat.size,
    dimensions,
  })

  return dimensions
}

export function registerMarkdownImageDimensions(md: any) {
  const defaultImage = md.renderer.rules.image?.bind(md.renderer.rules)

  md.renderer.rules.image = (tokens: any[], idx: number, options: any, env: any, self: any) => {
    const token = tokens[idx]
    const src = token.attrGet('src')

    if (
      typeof src === 'string' &&
      token.attrGet('width') == null &&
      token.attrGet('height') == null
    ) {
      const imageFile = resolveMarkdownImageFile(src, env)
      const dimensions = imageFile ? getImageDimensions(imageFile) : null

      if (dimensions?.width > 0 && dimensions.height > 0) {
        token.attrSet('width', String(dimensions.width))
        token.attrSet('height', String(dimensions.height))
      }
    }

    if (defaultImage) return defaultImage(tokens, idx, options, env, self)
    return self.renderToken(tokens, idx, options)
  }
}
