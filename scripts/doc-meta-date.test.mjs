import assert from 'node:assert/strict'
import test from 'node:test'

import {
  formatResolvedLastUpdated,
  resolveLastUpdatedTimestamp,
} from '../docs/.vitepress/theme/doc-meta-date.mjs'

const gitTimestamp = new Date(2026, 5, 11, 12, 0).getTime()

test('prefers frontmatter lastUpdated over the git timestamp', () => {
  assert.equal(
    resolveLastUpdatedTimestamp('2024-01-02 03:04', gitTimestamp),
    new Date(2024, 0, 2, 3, 4).getTime(),
  )
})

test('falls back to the git timestamp when frontmatter lastUpdated is not set', () => {
  assert.equal(resolveLastUpdatedTimestamp(undefined, gitTimestamp), gitTimestamp)
  assert.equal(resolveLastUpdatedTimestamp(null, gitTimestamp), gitTimestamp)
  assert.equal(resolveLastUpdatedTimestamp('', gitTimestamp), gitTimestamp)
})

test('parses date-only frontmatter lastUpdated as local midnight', () => {
  assert.equal(
    resolveLastUpdatedTimestamp('2024-01-02', gitTimestamp),
    new Date(2024, 0, 2).getTime(),
  )
})

test('defaults omitted minutes and seconds in local frontmatter lastUpdated to zero', () => {
  assert.equal(
    resolveLastUpdatedTimestamp('2024-01-02 03', gitTimestamp),
    new Date(2024, 0, 2, 3, 0, 0).getTime(),
  )
})

test('accepts ISO frontmatter lastUpdated values with timezone offsets', () => {
  const iso = '2024-01-02T03:04:00+08:00'

  assert.equal(resolveLastUpdatedTimestamp(iso, gitTimestamp), Date.parse(iso))
})

test('allows frontmatter lastUpdated false to hide the date', () => {
  assert.equal(resolveLastUpdatedTimestamp(false, gitTimestamp), undefined)
})

test('formats minute-precision lastUpdated without label or timezone', () => {
  assert.equal(
    formatResolvedLastUpdated('2026-06-13 16:56', gitTimestamp),
    '2026/06/13 16:56',
  )
})

test('formats second-precision lastUpdated with seconds and timezone', () => {
  assert.equal(
    formatResolvedLastUpdated('2026-06-13T16:56:17+08:00', gitTimestamp),
    '2026/06/13 16:56:17 CST',
  )
})
