import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import test from 'node:test'

import { collectCourseCovers, findFirstLyricCoverImage } from './course-index-utils.mjs'

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

test('uses the first LyricCover image before ordinary note images', (t) => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'course-index-lyric-cover-'))
  t.after(() => fs.rmSync(root, { recursive: true, force: true }))

  const docsRoot = path.join(root, 'docs')
  const readmePath = path.join(docsRoot, 'Y3S2/CCD/CCD-README.md')
  const notePath = path.join(docsRoot, 'Y3S2/CCD/Part 4/Lecture 17.md')

  fs.mkdirSync(path.dirname(readmePath), { recursive: true })
  fs.mkdirSync(path.join(path.dirname(notePath), 'Lecture 17.attachments'), { recursive: true })
  fs.writeFileSync(
    path.join(path.dirname(notePath), 'Lecture 17.attachments/lyric cover.jpg'),
    'image',
  )
  fs.writeFileSync(
    path.join(path.dirname(notePath), 'Lecture 17.attachments/ordinary image.jpg'),
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
          code: 'Lecture 17',
          title: '频率合成',
          link: 'Part 4/Lecture 17.md'
        }
      ]
    }
  ]"
/>
`,
  )

  fs.writeFileSync(
    notePath,
    `# Lecture 17

\`\`\`html
<LyricCover image="Lecture 17.attachments/code sample.jpg" title="Code" />
\`\`\`

<LyricCover
  image="Lecture 17.attachments/lyric cover.jpg"
  title="夜间信标"
>
  <LyricLine original="第一句" />
</LyricCover>

![alt text](<Lecture 17.attachments/ordinary image.jpg>)
`,
  )

  const markdown = fs.readFileSync(notePath, 'utf8')
  assert.equal(findFirstLyricCoverImage(markdown), 'Lecture 17.attachments/lyric cover.jpg')

  const result = collectCourseCovers({
    docsRoot,
    readmePath,
    markdown: fs.readFileSync(readmePath, 'utf8'),
  })

  assert.deepEqual(result.fallbackCovers, {
    'Y3S2/CCD/Part 4/Lecture 17.md':
      'Y3S2/CCD/Part 4/Lecture 17.attachments/lyric cover.jpg',
  })
  assert.deepEqual(result.coverDocsPaths, [
    'Y3S2/CCD/Part 4/Lecture 17.attachments/lyric cover.jpg',
  ])
})

test('uses a note LyricCover image before a configured CourseIndex cover', (t) => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'course-index-lyric-cover-priority-'))
  t.after(() => fs.rmSync(root, { recursive: true, force: true }))

  const docsRoot = path.join(root, 'docs')
  const readmePath = path.join(docsRoot, 'Y3S2/CCD/CCD-README.md')
  const notePath = path.join(docsRoot, 'Y3S2/CCD/Part 4/Lecture 18.md')

  fs.mkdirSync(path.dirname(readmePath), { recursive: true })
  fs.mkdirSync(path.join(docsRoot, 'Y3S2/CCD/Part 4/Lecture 18.attachments'), { recursive: true })
  fs.writeFileSync(
    path.join(docsRoot, 'Y3S2/CCD/Part 4/Lecture 18.attachments/lyric cover.jpg'),
    'image',
  )
  fs.writeFileSync(
    path.join(docsRoot, 'Y3S2/CCD/Part 4/Lecture 18.attachments/configured cover.jpg'),
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
          code: 'Lecture 18',
          title: '数模转换',
          link: 'Part 4/Lecture 18.md',
          cover: 'Part 4/Lecture 18.attachments/configured cover.jpg'
        }
      ]
    }
  ]"
/>
`,
  )

  fs.writeFileSync(
    notePath,
    `# Lecture 18

<LyricCover
  image="Lecture 18.attachments/lyric cover.jpg"
  title="夜间信标"
>
  <LyricLine original="第一句" />
</LyricCover>
`,
  )

  const result = collectCourseCovers({
    docsRoot,
    readmePath,
    markdown: fs.readFileSync(readmePath, 'utf8'),
  })

  assert.deepEqual(result.fallbackCovers, {
    'Y3S2/CCD/Part 4/Lecture 18.md':
      'Y3S2/CCD/Part 4/Lecture 18.attachments/lyric cover.jpg',
  })
  assert.deepEqual(result.coverDocsPaths, [
    'Y3S2/CCD/Part 4/Lecture 18.attachments/lyric cover.jpg',
  ])
})
