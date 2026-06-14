import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import test from 'node:test'

import {
  collectCourseCovers,
  resolveCourseAssetPath,
  resolveNoteImagePath,
  resolveNotePath,
} from './course-index-utils.mjs'

test('normalizes CourseIndex note and asset paths through the shared resolver', () => {
  assert.equal(
    resolveNotePath('Y3S2/CCD', 'Part%204/Lecture%2016.html#pll'),
    'Y3S2/CCD/Part 4/Lecture 16.md',
  )
  assert.equal(
    resolveNotePath('Y3S2/CCD', '/Y3S2/DSP/DSP Chapter 2.md'),
    'Y3S2/DSP/DSP Chapter 2.md',
  )
  assert.equal(
    resolveCourseAssetPath('Y3S2/CCD', '<Part 4/Lecture 16.attachments/new cover image.PNG>'),
    'Y3S2/CCD/Part 4/Lecture 16.attachments/new cover image.PNG',
  )
  assert.equal(
    resolveNoteImagePath('Y3S2/CCD/Part 4/Lecture 16.md', 'Lecture 16.attachments/cover.PNG?raw=1'),
    'Y3S2/CCD/Part 4/Lecture 16.attachments/cover.PNG',
  )
  assert.equal(
    resolveNotePath('Y3S2/CCD', 'Part%204/Lec%231%3Fintro.html?tab=notes#section'),
    'Y3S2/CCD/Part 4/Lec#1?intro.md',
  )
  assert.equal(
    resolveCourseAssetPath('Y3S2/CCD', 'covers/Lec%231%3Fintro.PNG?raw=1'),
    'Y3S2/CCD/covers/Lec#1?intro.PNG',
  )
  assert.equal(
    resolveNoteImagePath('Y3S2/CCD/Part 4/Lec#1?intro.md', 'Lec%231%3Fintro.attachments/cover.PNG#hero'),
    'Y3S2/CCD/Part 4/Lec#1?intro.attachments/cover.PNG',
  )
})

test('uses the first note image as fallback when a CourseIndex item has no cover', (t) => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'course-index-covers-'))
  t.after(() => fs.rmSync(root, { recursive: true, force: true }))

  const docsRoot = path.join(root, 'docs')
  const readmePath = path.join(docsRoot, 'Y3S2/CCD/CCD-README.md')
  const notePath = path.join(docsRoot, 'Y3S2/CCD/Part 4/Lecture 16.md')

  fs.mkdirSync(path.dirname(readmePath), { recursive: true })
  fs.mkdirSync(path.join(path.dirname(notePath), 'Lecture 16.attachments'), { recursive: true })
  fs.writeFileSync(
    path.join(path.dirname(notePath), 'Lecture 16.attachments/new cover image.PNG'),
    'image',
  )

  fs.writeFileSync(
    readmePath,
    `<CourseIndex
  basePath="Y3S2/CCD"
  :groups="[
    {
      title: 'Part 4',
      items: [
        {
          code: 'Lecture 16',
          title: '锁相环',
          link: 'Part 4/Lecture 16.md'
        }
      ]
    }
  ]"
/>
`,
  )

  fs.writeFileSync(
    notePath,
    `# Lecture 16

![alt text](<Lecture 16.attachments/new cover image.PNG>)

![alt text](Lecture 16.attachments/second.PNG)
`,
  )

  const result = collectCourseCovers({
    docsRoot,
    readmePath,
    markdown: fs.readFileSync(readmePath, 'utf8'),
  })

  assert.deepEqual(result.fallbackCovers, {
    'Y3S2/CCD/Part 4/Lecture 16.md':
      'Y3S2/CCD/Part 4/Lecture 16.attachments/new cover image.PNG',
  })
  assert.deepEqual(result.coverDocsPaths, [
    'Y3S2/CCD/Part 4/Lecture 16.attachments/new cover image.PNG',
  ])
})
