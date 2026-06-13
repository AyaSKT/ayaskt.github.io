function isValidTimestamp(value) {
  return Number.isFinite(value) && value > 0
}

const DEFAULT_TIME_ZONE = 'Asia/Shanghai'
const DEFAULT_TIME_ZONE_LABEL = 'CST'

function pad2(value) {
  return String(value).padStart(2, '0')
}

function parseLocalDateTime(value) {
  const dateOnly = value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/)
  if (dateOnly) {
    const [, year, month, day] = dateOnly
    return new Date(Number(year), Number(month) - 1, Number(day)).getTime()
  }

  const dateTime = value.match(
    /^(\d{4})[-/](\d{1,2})[-/](\d{1,2})[ T](\d{1,2})(?::(\d{1,2})(?::(\d{1,2}))?)?$/,
  )
  if (!dateTime) return undefined

  const [, year, month, day, hour, minute = '0', second = '0'] = dateTime
  return new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hour),
    Number(minute),
    Number(second),
  ).getTime()
}

function hasExplicitSeconds(value) {
  if (value instanceof Date) return value.getSeconds() !== 0

  if (typeof value === 'number') {
    return isValidTimestamp(value) && new Date(value).getSeconds() !== 0
  }

  if (typeof value !== 'string') return false

  return /[ T]\d{1,2}:\d{1,2}:\d{1,2}(?:\.\d+)?(?:Z|[+-]\d{2}:?\d{2})?$/.test(value.trim())
}

function getDateParts(date, timeZone) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  })

  return Object.fromEntries(
    formatter.formatToParts(date)
      .filter((part) => part.type !== 'literal')
      .map((part) => [part.type, part.value]),
  )
}

export function parseLastUpdatedTimestamp(value) {
  if (value === false || value == null) return undefined

  if (value instanceof Date) {
    const timestamp = value.getTime()
    return isValidTimestamp(timestamp) ? timestamp : undefined
  }

  if (typeof value === 'number') {
    return isValidTimestamp(value) ? value : undefined
  }

  if (typeof value !== 'string') return undefined

  const trimmed = value.trim()
  if (!trimmed) return undefined

  const localTimestamp = parseLocalDateTime(trimmed)
  if (isValidTimestamp(localTimestamp)) return localTimestamp

  const parsedTimestamp = Date.parse(trimmed)
  return isValidTimestamp(parsedTimestamp) ? parsedTimestamp : undefined
}

export function resolveLastUpdatedTimestamp(frontmatterLastUpdated, pageLastUpdated) {
  if (frontmatterLastUpdated === false) return undefined

  return parseLastUpdatedTimestamp(frontmatterLastUpdated)
    ?? parseLastUpdatedTimestamp(pageLastUpdated)
}

export function resolveLastUpdatedInfo(frontmatterLastUpdated, pageLastUpdated) {
  if (frontmatterLastUpdated === false) return undefined

  const frontmatterTimestamp = parseLastUpdatedTimestamp(frontmatterLastUpdated)
  if (isValidTimestamp(frontmatterTimestamp)) {
    return {
      timestamp: frontmatterTimestamp,
      showSeconds: hasExplicitSeconds(frontmatterLastUpdated),
    }
  }

  const pageTimestamp = parseLastUpdatedTimestamp(pageLastUpdated)
  if (!isValidTimestamp(pageTimestamp)) return undefined

  return {
    timestamp: pageTimestamp,
    showSeconds: hasExplicitSeconds(pageLastUpdated),
  }
}

export function formatLastUpdatedTimestamp(timestamp, options = {}) {
  if (!isValidTimestamp(timestamp)) return ''

  const date = new Date(timestamp)
  const timeZone = options.timeZone ?? DEFAULT_TIME_ZONE
  const { year, month, day, hour, minute, second } = getDateParts(date, timeZone)

  const dateText = `${year}/${month}/${day}`
  const timeText = `${hour}:${minute}`

  if (!options.showSeconds) return `${dateText} ${timeText}`

  return `${dateText} ${timeText}:${pad2(second)} ${options.timeZoneLabel ?? DEFAULT_TIME_ZONE_LABEL}`
}

export function formatResolvedLastUpdated(frontmatterLastUpdated, pageLastUpdated, options = {}) {
  const resolved = resolveLastUpdatedInfo(frontmatterLastUpdated, pageLastUpdated)
  if (!resolved) return ''

  return formatLastUpdatedTimestamp(resolved.timestamp, {
    ...options,
    showSeconds: resolved.showSeconds,
  })
}
