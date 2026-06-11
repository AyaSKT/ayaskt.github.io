# 课程 README 卡片式目录设计

## 背景

这个仓库是一个基于 VitePress 的中文大学课程笔记博客。当前主题是在 VitePress 默认主题之上扩展出来的自定义主题，已经有首页 feature 方框、玻璃效果、渐变色、页面转场、暗色模式等视觉语言。

目前各科目的 README 页面使用普通 Markdown 列表作为课程目录。新的目标是把部分课程 README 的目录区改成更接近首页 feature 方框的卡片式结构，同时保留文档页本身的阅读体验。

## 目标

为选定课程 README 页面新增一个可复用的课程目录卡片容器。第一期只覆盖：

- `docs/Y3S2/DSP/DSP-README.md`
- `docs/Y3S2/CCD/CCD-README.md`
- `docs/Y3S2/EMFT/EMFT-README.md`

卡片目录需要展示章节分组、章节卡片和章节封面图，并且兼容暗色模式、移动端布局和桌面端 hover 悬浮预览。

## 范围

- 新增一个可复用的 `CourseIndex` 组件，并注册给 Markdown 使用。
- 只替换上面三份 README 的目录区域。
- 尽量保留 README 原有开头介绍、个人化句子、提示块和课程级封面图。
- 左侧 VitePress sidebar 必须正常显示，不被卡片布局占用。
- 这三份 README 页面可以使用原正文区域加右侧 outline 区域的横向空间。
- 普通章节页面保持原样，包括右侧 outline 的显示方式。

## 不做什么

- 不修改任何章节笔记正文文件。
- 不重写课程内容、公式、解释、章节标题或附件。
- 不重做全局 VitePress 布局、导航栏、侧边栏或首页。
- 不在浏览器运行时扫描文件系统。

## 已确认的用户决策

- 桌面端视觉使用方案 A：类似首页 feature 方框，封面图在上，章节文字在下。
- 移动端视觉使用方案 B：更紧凑的横向卡片，封面图在左，章节文字在右，方便滑动浏览。
- Part / Block 分组标题需要比最初 mockup 更大、更清楚。
- 章节封面可以手动指定。
- 如果没有手动指定，初始实现时默认使用对应章节笔记中引用的第一张本地图片。
- 如果章节没有可用图片，显示渐变编号 fallback 封面。
- 第一期只处理 DSP、CCD、EMFT。

## 架构

新增组件：

- `docs/.vitepress/theme/components/CourseIndex.vue`

在 `docs/.vitepress/theme/index.ts` 中全局注册，让 README Markdown 可以直接使用：

```vue
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
        }
      ]
    }
  ]"
/>
```

三份 README 只维护各自课程的目录数据。组件统一负责布局、样式、暗色模式、hover 预览和无封面 fallback。

## 数据模型

`CourseIndex` 接收：

- `course`：课程短名称，用于可访问性描述和可选 UI 标签。
- `groups`：有序课程分组列表。

每个 group 包含：

- `title`：可见分组标题，例如 `Part I 离散时间信号与系统`。
- `items`：该分组下的章节卡片列表。

每个 item 包含：

- `code`：章节短编号，例如 `Ch 2` 或 `Lecture 11-12`。
- `title`：主要章节标题。
- `subtitle`：副标题，通常为英文标题或补充说明。
- `link`：原始章节 Markdown 链接目标。
- `cover`：可选封面图路径，相对于当前 README。

组件不在运行时推断课程结构。README 里的数据保持显式，这样后续修改更可控。

## 封面选择规则

实现时按以下规则填入初始 `cover`：

1. 如果用户为某个章节指定了封面图，使用指定图片。
2. 如果没有指定，实施时扫描该章节 Markdown，取其中引用的第一张本地图片。
3. 如果章节没有可用图片，不写 `cover`，由组件显示带 `code` 的渐变 fallback 封面。

实施完成后，如果以后要替换封面，只需要改 README 中对应 item 的 `cover` 字段。

## 页面布局

选定的 README 页面需要增加 frontmatter，使其成为宽文档索引页：

```yaml
---
aside: false
pageClass: course-index-page
---
```

组件或主题 CSS 只对 `.course-index-page` 做宽度调整。左侧 sidebar 保持正常。右侧 outline 区域在这些 README 页面上让位给卡片网格。

桌面端和宽平板：

- 使用 feature 风格卡片。
- 封面图在卡片上方。
- 标题和副标题在封面下方。
- 网格根据可用宽度自适应。
- 宽屏最多每行 4 张卡片。
- 中等宽度显示 3 张或 2 张卡片。

移动端：

- 使用紧凑横向列表卡片。
- 封面图在左侧。
- 文字在右侧。
- 不显示 hover 悬浮预览。
- 保持适合连续滑动浏览的密度。

Part / Block 分组标题：

- 使用更大的标题样式，整体气质接近当前文档标题。
- 分组之间保留足够间距。
- 保留原 README 中的分组顺序。

## 交互

每张卡片整体都是指向章节的链接。

桌面端：

- hover 时卡片轻微上浮。
- 键盘 `focus-visible` 时展示同样清晰的状态。
- hover 或 focus 时显示轻量悬浮预览。
- 预览中展示封面大图、章节编号、标题和副标题。

移动端：

- 不显示 hover 预览。
- 点击卡片直接进入章节。

动画：

- 尊重 `prefers-reduced-motion`。
- 用户开启减少动画时，关闭位移和缩放，只保留颜色、边框等反馈。

## 暗色模式

组件应尽量使用 VitePress 主题变量：

- 文字：`var(--vp-c-text-*)`
- 表面：`var(--vp-c-bg-soft)` 及相关背景变量
- 边框：`var(--vp-c-divider)` 或局部透明边框
- 品牌强调色：现有渐变色 `#98CBEA`、`#C2C7F8`、`#F1DCE4`

暗色模式需要覆盖：

- 卡片背景
- 卡片边框
- 标题与副标题文字
- hover / focus 状态
- 悬浮预览层
- fallback 渐变封面

## 可访问性

- 卡片应使用语义化链接，而不是可点击的 `div`。
- 图片需要有合适的 `alt`，装饰性图片可使用空 `alt`。
- focus 状态必须清楚可见。
- 预览内容不能成为唯一的信息入口。
- 移动端用户不应依赖 hover 行为。

## 实施时预计修改的文件

预计修改：

- `docs/.vitepress/theme/components/CourseIndex.vue`
- `docs/.vitepress/theme/index.ts`
- `docs/Y3S2/DSP/DSP-README.md`
- `docs/Y3S2/CCD/CCD-README.md`
- `docs/Y3S2/EMFT/EMFT-README.md`

不应修改任何章节笔记 Markdown 文件。

## 验证计划

运行：

```bash
npm run docs:build
```

然后启动开发服务器：

```bash
npm run docs:dev
```

检查：

- DSP、CCD、EMFT README 页面正常渲染卡片目录。
- 这些 README 页面左侧 sidebar 仍然显示。
- 这些 README 页面右侧 outline 不显示，卡片网格使用额外宽度。
- 普通章节页面仍保持原布局和右侧 outline。
- 桌面端根据宽度显示 2、3 或 4 列。
- 移动端显示紧凑横向卡片。
- 暗色模式观感正常，不刺眼、不破坏层级。
- 桌面端 hover 和键盘 focus 能显示预览。
- 无封面 fallback 不出现破图。

## 风险

- README 内联数据会比较长。这个代价可以接受，因为它让课程结构显式、可控，也避免运行时文件系统假设。
- 靠近右边缘的 hover 预览需要保守定位或碰撞处理，避免被裁切。
- 某些章节的第一张图可能是公式或截图，不一定适合做封面。预期做法是后续通过手动 `cover` 覆盖。
