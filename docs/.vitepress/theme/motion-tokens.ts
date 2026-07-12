/**
 * 动效令牌读取工具：让 JS 驱动的动画（WAAPI / setTimeout / transition 字符串）
 * 与 CSS 动画共用同一套 --dur-* / --ease-* 令牌。
 *
 * 令牌声明在 style/var.css，覆盖入口在 custom/tokens.css（见 CUSTOMIZATION.md）。
 * 每次调用都重新读取，因此媒体查询（如移动端时长覆盖）能即时生效。
 */

function readToken(token: string): string {
  if (typeof window === 'undefined') return ''
  return window
    .getComputedStyle(document.documentElement)
    .getPropertyValue(token)
    .trim()
}

/** 读取时长令牌，返回毫秒。支持 `0.56s` / `560ms`，读取失败时用 fallback。 */
export function readMotionDuration(token: string, fallbackMs: number): number {
  const raw = readToken(token)
  if (!raw) return fallbackMs

  const amount = Number.parseFloat(raw)
  if (!Number.isFinite(amount)) return fallbackMs

  if (raw.endsWith('ms')) return amount
  if (raw.endsWith('s')) return amount * 1000
  return fallbackMs
}

/** 读取缓动令牌（如 cubic-bezier(...) / ease-out），读取失败时用 fallback。 */
export function readMotionEasing(token: string, fallback: string): string {
  return readToken(token) || fallback
}
