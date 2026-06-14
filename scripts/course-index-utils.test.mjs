import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import test from 'node:test'

import { collectCourseCovers } from './course-index-utils.mjs'

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
