# 课程 README 卡片式目录 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为 DSP、CCD、EMFT 三个课程 README 添加可复用的卡片式章节目录，支持桌面多列、移动端紧凑列表、暗色模式和桌面 hover/focus 预览。

**Architecture:** 新增 `CourseIndex.vue` 作为唯一展示容器，README 只维护课程分组数据和封面路径。组件内部处理链接转换、封面 fallback、宽文档索引页样式、响应式布局、暗色模式和预览交互；三个 README 只替换目录区，不改任何章节正文。

**Tech Stack:** VitePress 2.0.0-alpha.16, Vue 3 Composition API, Markdown 内联 Vue 组件, CSS media queries, VitePress frontmatter `aside: false` / `pageClass`.

---

## File Structure

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `docs/.vitepress/theme/components/CourseIndex.vue` | 通用课程目录卡片组件，包含布局、样式、链接解析、封面 fallback、hover/focus 预览 |
| Modify | `docs/.vitepress/theme/index.ts` | 全局注册 `CourseIndex`，让 Markdown 可直接使用 |
| Modify | `docs/Y3S2/DSP/DSP-README.md` | 添加宽索引 frontmatter，用 `CourseIndex` 替换 DSP 目录列表 |
| Modify | `docs/Y3S2/CCD/CCD-README.md` | 添加宽索引 frontmatter，用 `CourseIndex` 替换 CCD 目录列表 |
| Modify | `docs/Y3S2/EMFT/EMFT-README.md` | 添加宽索引 frontmatter，用 `CourseIndex` 替换 EMFT 目录列表 |

Guardrail: do not edit chapter-note Markdown files such as `docs/Y3S2/DSP/DSP Chapter 2.md`, `docs/Y3S2/CCD/Part 1/CCD Lecture 1 Introduction.md`, or `docs/Y3S2/EMFT/EMFT Chapter 2.md`.

---

### Task 1: Baseline And Guardrails

**Files:**
- Read: `docs/superpowers/specs/2026-06-11-course-readme-card-index-design.md`
- No code changes

- [ ] **Step 1: Confirm current git status**

Run:

```bash
git status --short
```

Expected: note any existing user changes. Do not revert unrelated changes.

- [ ] **Step 2: Read the approved Chinese spec**

Run:

```bash
sed -n '1,260p' docs/superpowers/specs/2026-06-11-course-readme-card-index-design.md
```

Expected: spec says first implementation covers only DSP, CCD, and EMFT; it also says no chapter-note Markdown files should be edited.

- [ ] **Step 3: Run the baseline build**

Run:

```bash
npm run docs:build
```

Expected: command exits with status `0`. If it fails before any edits, capture the failure and stop before implementation.

- [ ] **Step 4: Commit nothing**

This task is a baseline check only. Do not create a commit.

---

### Task 2: Create `CourseIndex.vue`

**Files:**
- Create: `docs/.vitepress/theme/components/CourseIndex.vue`

- [ ] **Step 1: Create the component**

Create `docs/.vitepress/theme/components/CourseIndex.vue` with this content:

```vue
<script setup lang="ts">
import { withBase } from 'vitepress'

interface CourseIndexItem {
  code: string
  title: string
  subtitle?: string
  link: string
  cover?: string
}

interface CourseIndexGroup {
  title: string
  items: CourseIndexItem[]
}

const props = withDefaults(defineProps<{
  course?: string
  groups: CourseIndexGroup[]
}>(), {
  course: 'Course',
})

function stripAngleBrackets(value: string) {
  return value.trim().replace(/^<|>$/g, '')
}

function isSpecialLink(value: string) {
  return /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(value)
}

function replaceMarkdownExtension(value: string) {
  return value.replace(/\.md(?=([?#]|$))/i, '.html')
}

function resolveLink(link: string) {
  const clean = stripAngleBrackets(link)
  if (isSpecialLink(clean)) return clean

  const normalized = replaceMarkdownExtension(clean)
  return normalized.startsWith('/') ? withBase(normalized) : normalized
}

function resolveCover(cover?: string) {
  if (!cover) return ''

  const clean = stripAngleBrackets(cover)
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|data:)/i.test(clean)) return clean

  return clean.startsWith('/') ? withBase(clean) : clean
}

function coverAlt(item: CourseIndexItem) {
  return `${props.course} ${item.code} ${item.title} 封面`
}
</script>

<template>
  <section class="course-index" :aria-label="`${course} 课程目录`">
    <section
      v-for="group in groups"
      :key="group.title"
      class="course-index-group"
    >
      <h2 class="course-index-group-title">
        <span class="course-index-group-dot"></span>
        <span>{{ group.title }}</span>
      </h2>

      <div class="course-index-grid">
        <a
          v-for="item in group.items"
          :key="item.link"
          class="course-index-card"
          :href="resolveLink(item.link)"
        >
          <span class="course-index-cover" :class="{ 'is-fallback': !item.cover }">
            <img
              v-if="item.cover"
              :src="resolveCover(item.cover)"
              :alt="coverAlt(item)"
              loading="lazy"
            >
            <span v-else class="course-index-cover-code">{{ item.code }}</span>
          </span>

          <span class="course-index-card-body">
            <span class="course-index-card-code">{{ item.code }}</span>
            <span class="course-index-card-title">{{ item.title }}</span>
            <span v-if="item.subtitle" class="course-index-card-subtitle">
              {{ item.subtitle }}
            </span>
          </span>

          <span class="course-index-preview" aria-hidden="true">
            <span class="course-index-preview-cover" :class="{ 'is-fallback': !item.cover }">
              <img
                v-if="item.cover"
                :src="resolveCover(item.cover)"
                alt=""
                loading="lazy"
              >
              <span v-else class="course-index-cover-code">{{ item.code }}</span>
            </span>
            <span class="course-index-preview-body">
              <span class="course-index-preview-code">{{ item.code }}</span>
              <span class="course-index-preview-title">{{ item.title }}</span>
              <span v-if="item.subtitle" class="course-index-preview-subtitle">
                {{ item.subtitle }}
              </span>
            </span>
          </span>
        </a>
      </div>
    </section>
  </section>
</template>

<style scoped>
:global(.course-index-page .VPDoc .container) {
  max-width: calc(var(--vp-layout-max-width) - var(--vp-sidebar-width)) !important;
}

:global(.course-index-page .VPDoc .content) {
  max-width: none !important;
}

:global(.course-index-page .VPDoc .content-container) {
  max-width: min(1120px, 100%) !important;
}

.course-index {
  --course-index-cover-h: 98px;
  --course-index-radius: 8px;
  --course-index-gap: 14px;
  display: grid;
  gap: 34px;
  margin: 30px 0 36px;
}

.course-index-group {
  min-width: 0;
}

.course-index-group-title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 16px;
  border: 0;
  padding: 0;
  color: var(--vp-c-text-1);
  font-family: 'Noto Serif SC', 'SimSun', 'Songti SC', 'STSong', serif;
  font-size: 1.45rem;
  font-weight: 700;
  line-height: 1.3;
}

.course-index-group-dot {
  width: 9px;
  height: 9px;
  border-radius: 999px;
  flex: 0 0 auto;
  background: linear-gradient(
    var(--aya-gradient-angle, 140deg),
    var(--aya-gradient-start, #98CBEA) 0%,
    var(--aya-gradient-middle, #C2C7F8) 52%,
    var(--aya-gradient-end, #F1DCE4) 100%
  );
  box-shadow: 0 0 0 4px rgb(152 203 234 / 13%);
}

.course-index-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 230px), 1fr));
  gap: var(--course-index-gap);
  overflow: visible;
}

.course-index-card {
  position: relative;
  display: grid;
  min-width: 0;
  min-height: 194px;
  border: 1px solid color-mix(in srgb, var(--vp-c-divider) 84%, transparent);
  border-radius: var(--course-index-radius);
  overflow: visible;
  background: color-mix(in srgb, var(--vp-c-bg-soft) 88%, transparent);
  color: var(--vp-c-text-1);
  text-decoration: none;
  box-shadow: 0 10px 28px rgb(34 42 60 / 5%);
  transition:
    transform 0.22s var(--ease-ios-fade, ease),
    border-color 0.22s ease,
    background-color 0.22s ease,
    box-shadow 0.22s ease;
}

.course-index-card:hover,
.course-index-card:focus-visible {
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 58%, var(--vp-c-divider));
  background: color-mix(in srgb, var(--vp-c-brand-1) 10%, var(--vp-c-bg-soft));
  box-shadow: 0 16px 42px rgb(34 42 60 / 11%);
  transform: translateY(-3px);
}

.course-index-card:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--vp-c-brand-1) 76%, white);
  outline-offset: 3px;
}

.course-index-cover,
.course-index-preview-cover {
  position: relative;
  display: block;
  overflow: hidden;
  background:
    radial-gradient(circle at 18% 22%, rgb(255 255 255 / 70%) 0 9%, transparent 10%),
    linear-gradient(
      var(--aya-gradient-angle, 140deg),
      var(--aya-gradient-start, #98CBEA) 0%,
      var(--aya-gradient-middle, #C2C7F8) 52%,
      var(--aya-gradient-end, #F1DCE4) 100%
    );
}

.course-index-cover {
  height: var(--course-index-cover-h);
  border-radius: var(--course-index-radius) var(--course-index-radius) 0 0;
}

.course-index-cover::after,
.course-index-preview-cover::after {
  content: "";
  position: absolute;
  inset: auto -20% -35%;
  height: 70%;
  background:
    repeating-linear-gradient(90deg, rgb(255 255 255 / 30%) 0 1px, transparent 1px 18px),
    linear-gradient(180deg, transparent, rgb(255 255 255 / 55%));
  transform: rotate(-8deg);
}

.course-index-cover img,
.course-index-preview-cover img {
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.course-index-cover.is-fallback,
.course-index-preview-cover.is-fallback {
  display: grid;
  place-items: center;
}

.course-index-cover-code {
  position: relative;
  z-index: 2;
  color: rgb(31 40 53 / 76%);
  font-size: 0.95rem;
  font-weight: 800;
  line-height: 1;
}

.course-index-card-body {
  display: grid;
  gap: 5px;
  min-width: 0;
  padding: 12px 13px 14px;
}

.course-index-card-code,
.course-index-preview-code {
  color: var(--vp-c-brand-1);
  font-size: 0.78rem;
  font-weight: 750;
  line-height: 1.2;
}

.course-index-card-title,
.course-index-preview-title {
  color: var(--vp-c-text-1);
  font-size: 0.96rem;
  font-weight: 650;
  line-height: 1.42;
}

.course-index-card-subtitle,
.course-index-preview-subtitle {
  color: var(--vp-c-text-2);
  font-size: 0.82rem;
  line-height: 1.45;
}

.course-index-preview {
  position: absolute;
  left: 12px;
  right: 12px;
  top: calc(100% + 10px);
  z-index: 20;
  display: block;
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 45%, var(--vp-c-divider));
  border-radius: 10px;
  overflow: hidden;
  background: color-mix(in srgb, var(--vp-c-bg) 94%, transparent);
  box-shadow: 0 24px 70px rgb(34 42 60 / 20%);
  opacity: 0;
  pointer-events: none;
  transform: translateY(8px) scale(0.98);
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}

.course-index-preview-cover {
  height: 150px;
}

.course-index-preview-body {
  display: grid;
  gap: 6px;
  padding: 13px 15px 15px;
}

@media (hover: hover) and (pointer: fine) and (min-width: 769px) {
  .course-index-card:hover .course-index-preview,
  .course-index-card:focus-visible .course-index-preview {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (max-width: 768px) {
  .course-index {
    gap: 28px;
    margin: 24px 0 30px;
  }

  .course-index-group-title {
    margin-bottom: 12px;
    font-size: 1.18rem;
  }

  .course-index-grid {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .course-index-card {
    grid-template-columns: 92px minmax(0, 1fr);
    min-height: 84px;
    overflow: hidden;
  }

  .course-index-cover {
    height: 100%;
    min-height: 84px;
    border-radius: var(--course-index-radius) 0 0 var(--course-index-radius);
  }

  .course-index-card-body {
    align-content: center;
    padding: 10px 12px;
  }

  .course-index-card-code {
    font-size: 0.72rem;
  }

  .course-index-card-title {
    font-size: 0.9rem;
  }

  .course-index-card-subtitle {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    font-size: 0.78rem;
  }

  .course-index-preview {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .course-index-card,
  .course-index-preview {
    transition: none;
  }

  .course-index-card:hover,
  .course-index-card:focus-visible {
    transform: none;
  }
}
</style>
```

- [ ] **Step 2: Build after creating the unused component**

Run:

```bash
npm run docs:build
```

Expected: command exits with status `0`. The component is not registered yet, but the SFC should compile when VitePress scans theme files after registration in the next task.

- [ ] **Step 3: Commit the component**

Run:

```bash
git add docs/.vitepress/theme/components/CourseIndex.vue
git commit -m "feat: add reusable course index component"
```

Expected: commit succeeds. Only `CourseIndex.vue` is included.

---

### Task 3: Register `CourseIndex`

**Files:**
- Modify: `docs/.vitepress/theme/index.ts`

- [ ] **Step 1: Add the import**

In `docs/.vitepress/theme/index.ts`, add this import next to the other component imports:

```ts
import CourseIndex from './components/CourseIndex.vue'
```

- [ ] **Step 2: Register the component in `enhanceApp`**

In the existing `enhanceApp({app , router })` block, add:

```ts
    app.component('CourseIndex', CourseIndex)
```

The surrounding block should include this registration near the other global Markdown components:

```ts
    app.component('Mycomponent' , Mycomponent)
    app.component('Confetti' , defineAsyncComponent(() => import('./components/confetti.vue')))
    app.component('MouseClick' , MouseClick)
    app.component('update' , update)
    app.component('BackToTop', BackToTop)
    app.component('PageTransition', PageTransition)
    app.component('ScrollReveal', ScrollReveal)
    app.component('DocMeta', DocMeta)
    app.component('CourseIndex', CourseIndex)
```

- [ ] **Step 3: Build after registration**

Run:

```bash
npm run docs:build
```

Expected: command exits with status `0`.

- [ ] **Step 4: Commit registration**

Run:

```bash
git add docs/.vitepress/theme/index.ts
git commit -m "feat: register course index component"
```

Expected: commit succeeds. Only `index.ts` is included.

---

### Task 4: Convert DSP README

**Files:**
- Modify: `docs/Y3S2/DSP/DSP-README.md`

- [ ] **Step 1: Add frontmatter at the top of the README**

Add this block before the first `# DSP 数字信号处理笔记 Introduction & Outline` heading:

```markdown
---
aside: false
pageClass: course-index-page
---
```

- [ ] **Step 2: Replace the DSP index section**

In `docs/Y3S2/DSP/DSP-README.md`, replace everything from `## 目录 Index` through the `- [Ch 11: DSP 算法实现 DSP Algorithm Implementation (FFT)](...)` list item with this block. Leave the final README image `![alt text](DSP-README.attachments/1773557775504.PNG)` in place after the component.

```markdown
## 目录 Index

<CourseIndex
  course="DSP"
  :groups="[
    {
      title: 'Part I 离散时间信号与系统',
      items: [
        {
          code: 'Ch 2',
          title: '时域离散时间信号',
          subtitle: 'Discrete-Time Signals in the Time Domain',
          link: 'DSP Chapter 2.md',
          cover: 'DSP Chapter 2.attachments/1773557886618.PNG'
        },
        {
          code: 'Ch 3 I',
          title: '频域离散时间信号',
          subtitle: 'Discrete-Time Signals in the Frequency Domain',
          link: 'DSP Chapter 3 I.md',
          cover: 'DSP Chapter 3 I.attachments/1773557929285.PNG'
        },
        {
          code: 'Ch 3 II',
          title: '频域离散时间信号',
          subtitle: 'Discrete-Time Signals in the Frequency Domain',
          link: 'DSP Chapter 3 II.md',
          cover: 'DSP Chapter 3 II.attachments/1773557978013.PNG'
        },
        {
          code: 'Ch 4',
          title: '离散时间系统',
          subtitle: 'Discrete-Time Systems',
          link: 'DSP Chapter 4.md',
          cover: 'DSP Chapter 4.attachments/1773557639355.PNG'
        }
      ]
    },
    {
      title: 'Part II 离散变换',
      items: [
        {
          code: 'Ch 5',
          title: '离散傅里叶变换',
          subtitle: 'Discrete Fourier Transform, DFT',
          link: 'DSP Chapter 5.md',
          cover: 'DSP Chapter 5.attachments/1773562401264.png'
        },
        {
          code: 'Ch 6',
          title: 'Z 变换',
          subtitle: 'Z-Transform',
          link: 'DSP Chapter 6.md',
          cover: 'DSP Chapter 6.attachments/1773645596770.JPG'
        },
        {
          code: 'Ch 7',
          title: '变换域中的离散 LTI 系统',
          subtitle: 'LTI Discrete-Time Systems in the Transform Domain',
          link: 'DSP Chapter 7.md',
          cover: 'DSP Chapter 7.attachments/1773645635605.JPG'
        }
      ]
    },
    {
      title: 'Part III 数字滤波器设计',
      items: [
        {
          code: 'Ch 8',
          title: '数字滤波器架构',
          subtitle: 'Digital Filter Structures',
          link: 'DSP Chapter 8.md',
          cover: 'DSP Chapter 8.attachments/1773652978344.JPG'
        },
        {
          code: 'Ch 9',
          title: 'IIR 数字滤波器设计',
          subtitle: 'IIR Digital Filter Design',
          link: 'DSP Chapter 9.md',
          cover: 'DSP Chapter 9.attachments/1773653064083.JPG'
        },
        {
          code: 'Ch 10',
          title: 'FIR 数字滤波器设计',
          subtitle: 'FIR Digital Filter Design',
          link: 'DSP Chapter 10.md',
          cover: '../EMFT/EMFT-README.attachments/1773463099101.png'
        }
      ]
    },
    {
      title: 'Part IV DSP 算法实现',
      items: [
        {
          code: 'Ch 11',
          title: 'DSP 算法实现',
          subtitle: 'DSP Algorithm Implementation (FFT)',
          link: 'DSP Chapter 11.md'
        }
      ]
    }
  ]"
/>
```

- [ ] **Step 3: Build after DSP conversion**

Run:

```bash
npm run docs:build
```

Expected: command exits with status `0`.

- [ ] **Step 4: Verify only expected files changed**

Run:

```bash
git diff --name-only HEAD | sed -n '1,80p'
```

Expected: output includes `docs/Y3S2/DSP/DSP-README.md` and no `docs/Y3S2/DSP/DSP Chapter*.md` chapter body files.

- [ ] **Step 5: Commit DSP README**

Run:

```bash
git add docs/Y3S2/DSP/DSP-README.md
git commit -m "feat: convert DSP README to card index"
```

Expected: commit succeeds. Only `DSP-README.md` is included.

---

### Task 5: Convert CCD README

**Files:**
- Modify: `docs/Y3S2/CCD/CCD-README.md`

- [ ] **Step 1: Add frontmatter at the top of the README**

Add this block before the first `# CCD 通信电路设计笔记 Introduction & Outline` heading:

```markdown
---
aside: false
pageClass: course-index-page
---
```

- [ ] **Step 2: Replace the CCD index section**

In `docs/Y3S2/CCD/CCD-README.md`, replace everything from `## 目录 Index` through the last Part 4 list item with this block. Leave the final README image `![alt text](CCD-README.attachments/1779785178403.JPG)` in place after the component.

```markdown
## 目录 Index

<CourseIndex
  course="CCD"
  :groups="[
    {
      title: 'Part 1 - Week 6 - Electronic Comms, Semiconductors, Transistors, Amplifiers',
      items: [
        {
          code: 'Lecture 1',
          title: 'Introduction',
          link: 'Part 1/CCD Lecture 1 Introduction.md',
          cover: 'Part 1/CCD Lecture 1 Introduction.attachments/1779783811122.PNG'
        },
        {
          code: 'Lecture 2',
          title: 'Electronic Communications',
          link: 'Part 1/CCD Lecture 2 Electronic Communications.md',
          cover: 'Part 1/CCD Lecture 2 Electronic Communications.attachments/1778848682009.jpg'
        },
        {
          code: 'Lecture 2b',
          title: 'Semiconductors Basics',
          link: 'Part 1/CCD Lecture 2b Semiconductors Basics.md',
          cover: 'Part 1/CCD Lecture 2b Semiconductors Basics.attachments/1779784870101.JPG'
        },
        {
          code: 'Lecture 3-4',
          title: 'Transistors',
          link: 'Part 1/CCD Lecture 3-4 Transistors.md',
          cover: 'Part 1/CCD Lecture 3-4 Transistors.attachments/1779784088824.jpg'
        },
        {
          code: 'Lecture 5-6',
          title: 'Amplifiers',
          link: 'Part 1/CCD Lecture 5-6 Amplifiers.md',
          cover: 'Part 1/CCD Lecture 5-6 Amplifiers.attachments/1780057676448.JPG'
        }
      ]
    },
    {
      title: 'Part 2 - Week 8 - Mixers, Matching Networks, Oscillators',
      items: [
        {
          code: 'Lecture 7',
          title: 'Mixers',
          link: 'Part 2/CCD Lecture 7 Mixers.md',
          cover: 'Part 2/CCD Lecture 7 Mixers.attachments/1780057844904.PNG'
        },
        {
          code: 'Lecture 8',
          title: 'LC Circuits and Matching Networks',
          link: 'Part 2/CCD Lecture 8 LC Circuits and Matching Networks.md',
          cover: 'Part 2/CCD Lecture 8 LC Circuits and Matching Networks.attachments/1780209189821.JPG'
        },
        {
          code: 'Lecture 9',
          title: 'Oscillators',
          link: 'Part 2/CCD Lecture 9 Oscillators.md',
          cover: 'Part 2/CCD Lecture 9 Oscillators.attachments/1780209759050.jpg'
        },
        {
          code: 'Lecture 10',
          title: 'Revision',
          link: 'Part 2/CCD Lecture 10 Revision.md',
          cover: 'Part 2/CCD Lecture 9 Oscillators.attachments/1780209422588.JPG'
        }
      ]
    },
    {
      title: 'Part 3 - Modulation and Antennas',
      items: [
        {
          code: 'Lecture 11-12',
          title: 'Amplitude Modulation',
          link: 'Part 3/CCD Lecture 11-12 Amplitude Modulation.md',
          cover: 'Part 3/CCD Lecture 11-12 Amplitude Modulation.attachments/1780674328208.JPG'
        },
        {
          code: 'Lecture 13',
          title: 'Single-Sideband Communication (SSB)',
          link: 'Part 3/CCD Lecture 13 Single-Sideband Communication SSB.md',
          cover: 'Part 3/CCD Lecture 13 Single-Sideband Communication SSB.attachments/1780727188147.JPG'
        },
        {
          code: 'Lecture 14',
          title: 'Frequency Modulation (FM) \u0026 Phase Modulation (PM)',
          link: 'Part 3/CCD Lecture 14 Frequency Modulation and Phase Modulation.md',
          cover: 'Part 3/CCD Lecture 14 Frequency Modulation and Phase Modulation.attachments/1780839332491.png'
        },
        {
          code: 'Lecture 15',
          title: 'Antennas in a Circuit',
          link: 'Part 3/CCD Lecture 15 Antennas in a Circuit.md',
          cover: 'Part 3/CCD Lecture 15 Antennas in a Circuit.attachments/1780840132059.JPG'
        }
      ]
    },
    {
      title: 'Part 4 - PLL, DAC, ADC and Converter Errors',
      items: [
        {
          code: 'Lecture 16',
          title: 'Phase-Locked Loop (PLL)',
          link: 'Part 4/CCD Lecture 16 Phase-Locked Loop PLL.md',
          cover: 'Part 4/CCD Lecture 16 Phase-Locked Loop PLL.attachments/pll_slope_detector.jpg'
        },
        {
          code: 'Lecture 18',
          title: 'Digital to Analog Conversion',
          link: 'Part 4/CCD Lecture 18 Digital to Analog Conversion.md',
          cover: 'Part 4/CCD Lecture 18 Digital to Analog Conversion.attachments/dac_system_interface.jpg'
        },
        {
          code: 'Lecture 19-20',
          title: 'ADC and Converter Errors',
          link: 'Part 4/CCD Lecture 19-20 ADC and Converter Errors.md',
          cover: 'Part 4/CCD Lecture 19-20 ADC and Converter Errors.attachments/adc_intro.jpg'
        }
      ]
    }
  ]"
/>
```

- [ ] **Step 3: Build after CCD conversion**

Run:

```bash
npm run docs:build
```

Expected: command exits with status `0`.

- [ ] **Step 4: Verify only expected files changed**

Run:

```bash
git diff --name-only HEAD | sed -n '1,100p'
```

Expected: output includes `docs/Y3S2/CCD/CCD-README.md` and no `docs/Y3S2/CCD/Part */CCD Lecture*.md` chapter body files.

- [ ] **Step 5: Commit CCD README**

Run:

```bash
git add docs/Y3S2/CCD/CCD-README.md
git commit -m "feat: convert CCD README to card index"
```

Expected: commit succeeds. Only `CCD-README.md` is included.

---

### Task 6: Convert EMFT README

**Files:**
- Modify: `docs/Y3S2/EMFT/EMFT-README.md`

- [ ] **Step 1: Add frontmatter at the top of the README**

Add this block before the first `# EMFT 电磁场课程笔记 Introduction & Outline` heading:

```markdown
---
aside: false
pageClass: course-index-page
---
```

- [ ] **Step 2: Replace the EMFT index section**

In `docs/Y3S2/EMFT/EMFT-README.md`, replace everything from `## 目录 Index` through `- [EMFT Extra 2: 概念默写](EFMT%20Extra%202.md)` with this block. Leave the final README image `![alt text](EMFT-README.attachments/1780470999867.JPG)` in place after the component.

```markdown
## 目录 Index

<CourseIndex
  course="EMFT"
  :groups="[
    {
      title: 'Core Chapters',
      items: [
        {
          code: 'Chapter 2',
          title: 'Vector Analysis',
          link: 'EMFT Chapter 2.md',
          cover: 'EMFT Chapter 2.attachments/1773559063473.PNG'
        },
        {
          code: 'Chapter 3 I',
          title: 'Static Electric Fields Part I',
          link: 'EMFT Chapter 3 P I.md',
          cover: 'EMFT Chapter 3 P I.attachments/1774778776536.PNG'
        },
        {
          code: 'Chapter 3 II',
          title: 'Static Electric Fields Part II',
          link: 'EMFT Chapter 3 P II.md',
          cover: 'EMFT Chapter 3 P II.attachments/1774776875485.jpg'
        },
        {
          code: 'Chapter 4',
          title: 'Solution of Electrostatic Problems',
          link: 'EMFT Chapter 4.md',
          cover: 'EMFT Chapter 4.attachments/1774777767457.jpg'
        },
        {
          code: 'Chapter 5',
          title: 'Steady Electric Currents',
          link: 'EMFT Chapter 5.md',
          cover: 'EMFT Chapter 5.attachments/1774778411631.jpg'
        },
        {
          code: 'Chapter 6',
          title: 'Static Magnetic Fields',
          link: 'EMFT Chapter 6.md',
          cover: 'EMFT Chapter 6.attachments/1778749796338.jpg'
        },
        {
          code: 'Chapter 7',
          title: 'Time-Varying Fields and Maxwell’s Equations',
          link: 'EMFT Chapter 7.md',
          cover: 'EMFT Chapter 7.attachments/1778750317994.PNG'
        },
        {
          code: 'Chapter 8 I',
          title: 'Plane Electromagnetic Waves Part I',
          link: 'EMFT Chapter 8 P I.md',
          cover: 'EMFT Chapter 8 P I.attachments/1778750856565.JPG'
        },
        {
          code: 'Chapter 8 II',
          title: 'Plane Electromagnetic Waves Part II',
          link: 'EMFT Chapter 8 P II.md',
          cover: 'EMFT Chapter 8 P II.attachments/1778848085341.JPG'
        }
      ]
    },
    {
      title: 'Additional Resources',
      items: [
        {
          code: 'Extra 1',
          title: '公式复习',
          link: 'EFMT Extra 1.md',
          cover: 'EFMT Extra 1.attachments/1780475410244.jpg'
        },
        {
          code: 'Extra 2',
          title: '概念默写',
          link: 'EFMT Extra 2.md',
          cover: 'EFMT Extra 2.attachments/1780388664426.jpg'
        }
      ]
    }
  ]"
/>
```

- [ ] **Step 3: Build after EMFT conversion**

Run:

```bash
npm run docs:build
```

Expected: command exits with status `0`.

- [ ] **Step 4: Verify only expected files changed**

Run:

```bash
git diff --name-only HEAD | sed -n '1,100p'
```

Expected: output includes `docs/Y3S2/EMFT/EMFT-README.md` and no `docs/Y3S2/EMFT/EMFT Chapter*.md` or `docs/Y3S2/EMFT/EFMT Extra*.md` chapter body files.

- [ ] **Step 5: Commit EMFT README**

Run:

```bash
git add docs/Y3S2/EMFT/EMFT-README.md
git commit -m "feat: convert EMFT README to card index"
```

Expected: commit succeeds. Only `EMFT-README.md` is included.

---

### Task 7: Final Build And Browser Verification

**Files:**
- Verify: `docs/.vitepress/theme/components/CourseIndex.vue`
- Verify: `docs/Y3S2/DSP/DSP-README.md`
- Verify: `docs/Y3S2/CCD/CCD-README.md`
- Verify: `docs/Y3S2/EMFT/EMFT-README.md`

- [ ] **Step 1: Run the final production build**

Run:

```bash
npm run docs:build
```

Expected: command exits with status `0`.

- [ ] **Step 2: Start the VitePress dev server**

Run:

```bash
npm run docs:dev
```

Expected: dev server prints a local URL such as `http://localhost:5173/`. Keep this process running until browser verification is complete.

- [ ] **Step 3: Verify the three README pages on desktop width**

Open these routes in the browser:

```text
/Y3S2/DSP/DSP-README.html
/Y3S2/CCD/CCD-README.html
/Y3S2/EMFT/EMFT-README.html
```

Expected on each page:

- left sidebar is visible
- right outline is not visible
- card grid uses the extra width
- wide viewport shows 3 or 4 cards per row depending on browser width
- Part / Block headings are larger than normal list text
- hovering a card shows the preview popover
- tab focus on a card shows the preview popover
- course-level image at the bottom of the README remains visible

- [ ] **Step 4: Verify mobile width**

Set browser viewport to a mobile width such as `390x844`.

Expected on each README page:

- cards are compact horizontal list cards
- cover image is on the left
- title and subtitle are on the right
- hover preview is not visible
- tapping a card navigates to the correct chapter route

- [ ] **Step 5: Verify dark mode**

Switch VitePress to dark mode.

Expected:

- card surfaces and preview popovers are dark-mode appropriate
- text remains readable
- borders remain subtle
- fallback gradient covers remain visible

- [ ] **Step 6: Verify normal chapter pages are unaffected**

Open these routes:

```text
/Y3S2/DSP/DSP%20Chapter%202.html
/Y3S2/CCD/Part%201/CCD%20Lecture%201%20Introduction.html
/Y3S2/EMFT/EMFT%20Chapter%202.html
```

Expected:

- ordinary chapter layout remains normal
- left sidebar remains normal
- right outline still appears where VitePress would normally show it

- [ ] **Step 7: Confirm no chapter-note files were modified**

Run:

```bash
git show --name-only --oneline HEAD~5..HEAD | rg 'docs/Y3S2/(DSP|CCD|EMFT)/.*(Chapter|Lecture|Extra).*\\.md' || true
```

Expected: no output. If output appears, inspect it; chapter-note body files must not be part of this implementation.

- [ ] **Step 8: Stop the dev server**

Stop the `npm run docs:dev` process with `Ctrl-C`.

Expected: terminal returns to the shell prompt.

- [ ] **Step 9: Final status check**

Run:

```bash
git status --short
```

Expected: clean worktree, or only intentionally untracked local artifacts outside the implementation.
