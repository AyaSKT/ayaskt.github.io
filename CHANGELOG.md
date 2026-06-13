# 更新日志

本文件记录项目每次版本更新中的新增、调整、修复与删减内容。

记录规则：
- 新版本写在最上方。
- 每个版本尽量包含：新增、调整、修复、删减。
- 如果某一类没有内容，写“暂无”即可。

整理说明：
- 本轮历史日志基于 `main` 分支中提交标题包含 `V数字` 的提交生成。
- 同名版本或重复版本号会保留为独立条目，并使用短 hash 区分。
- 条目中的统计来自对应 git commit 的 shortstat。

## V6.5.1 - 2026-06-13

### 新增

- 新增 `SongCard` 全局组件，用于展示专辑封面、歌曲名、艺人等信息，支持玻璃拟态卡片样式与语言自动标点。
- 新增金曲板块（`/others/songs/`），收录三首歌词：
  - 自己肯定感爆上げ↑↑しゅきしゅきソング（藤田ことね）
  - ヒッチコック（ヨルシカ）
  - 夢が僕らの太陽さ（虹ヶ咲学園スクールアイドル同好会）
- 新增实验室板块（`/others/lab/`），包含歌词容器与 SongCard 用法文档。
- 补全 EMFT Chapter 5 页首《ヒッチコック》的日文原词，并保留对应中文翻译。

### 调整

- 歌词原词字号略微放大，并将原词字重调整为 `600`；翻译保持小一号显示。
- 将日语假名注音间距恢复为初始版本，取消压缩与下移处理。
- EMFT Chapter 5 歌词块语言改为日语，使原词使用日文字体栈、中文翻译继续使用简体中文字体栈。
- 减弱 SongCard 暗色模式下的反光参数（高光渐变去除、顶部内阴影减半）。
- LyricCard 标题为空时不再显示书名号等空壳标点。
- 将原 `docs/others/test.md` 替换为正式的实验室首页。

### 修复

- LyricCard 日文标题样式 `ja-kagi` / `ja-double-kagi` 在 `lang="ja"` 时自动生效。

### 删减

- 移除 `docs/others/test.md`（已被实验室板块替代）。

## V6.5 - 2026-06-13

### 新增

- 新增 `LyricCard` / `LyricLine` 全局 Markdown 组件，用于在正文中展示歌词、作品名、作者、翻译、日文注音与音乐平台链接。
- 新增日文注音短写解析，支持 `漢字(かな)` 与 `｜文字(かな)` 写法，并提供 `default-furigana`、`force-furigana`、`furigana` 等显示控制。
- 新增 QQ 音乐与网易云音乐 SVG 图标资源，音乐链接以左下角裸 SVG 形式显示，卡片本体不参与跳转。
- 新增 `/others/test` 实验室页面与导航入口，用于集中展示新组件效果、用法与参数列表。
- 新增 `AGENTS.md` 中的标准正文歌词块复用规范。

### 调整

- 将歌词组件注册到 VitePress 自定义主题，支持在所有 Markdown 笔记中直接使用。
- 将歌词组件视觉从独立卡片改为正文内嵌块，移除外层背景、边框、阴影、毛玻璃与整体悬浮位移，同时保留注音切换、音乐跳转、标题与作者展示功能。
- 恢复歌词块右下角歌曲名的原有视觉层级，保持深色、大字号和加粗显示。
- 为 CCD 正文笔记锁定 `lastUpdated`，避免后续歌词维护影响页面最后更新时间。
- 将 CCD 正文笔记页首旧歌词块替换为 `LyricCard` / `LyricLine`，补充网易云音乐链接，并为日文原词写入注音数据；CCD README 保持原有展示方式。
- 为 EMFT 多篇正文笔记锁定 `lastUpdated`，并将页首旧歌词块替换为 `LyricCard` / `LyricLine`，补充 QQ 音乐与网易云音乐链接。
- 调整第三学年导航 activeMatch，使课程 README 与课程目录下所有正文页面都能正确高亮。
- 在 `AGENTS.md` 与 `CLAUDE.md` 补充课程导航 activeMatch 维护说明。

### 修复

- 修复日文歌词卡片中的中文翻译可能继承日文字形的问题，翻译行默认使用 `lang="zh-CN"` 并强制采用 `Noto Serif CJK SC` 字体栈。
- 修复日文原词字体选择，日文歌词默认优先使用 `Noto Serif CJK JP`，中文歌词默认优先使用 `Noto Serif CJK SC`。
- 修复音乐平台链接点击后返回页面时交互焦点状态残留的问题。
- 调整日文注音与正文汉字的行距，使假名更贴近原词。

### 删减

- 移除 CCD 与 EMFT 相关正文页首旧的粗体歌词和右对齐署名写法。
- 移除歌词组件外层卡片化视觉效果，包括背景、边框、阴影、反射感和整体 hover 抬升。

## V6.4.8 - 2026-06-13

### 新增

- 新增文档元信息日期解析工具，支持 frontmatter 手动指定 `lastUpdated`、ISO 时间、日期隐藏与 git 时间回退。
- 新增 `npm run test:doc-meta-date`，覆盖手动更新时间、git 回退、ISO 时区、隐藏日期和展示格式。
- 为 CPS 与 AIML 顶层 Markdown 页面写入源仓库对应文件的固定 `lastUpdated`，避免后续站点维护改动刷新老笔记更新时间。
- 为 DSP Chapter 2-6 写入固定 `lastUpdated`，保留老笔记页面显示的历史更新时间。

### 调整

- `DocMeta` 与旧 `update` 组件统一使用新的日期格式化逻辑，页面日期不再显示“最后更新：/更新时间:”前缀。
- 日期显示格式调整为 `YYYY/MM/DD HH:mm`；当源时间显式包含秒时显示为 `YYYY/MM/DD HH:mm:ss CST`。
- 刷新课程正文预览缓存，使 DSP Chapter 2 的预览同步知识性修正后的内容。

### 修复

- 修正 DSP Chapter 2-6 中若干知识性错误与打字问题，包括离散时间索引范围、范数说明、共轭反对称分解、归一化角频率、Parseval/ESD 表述、采样定理术语、DFT/DFS 正负号与下标、循环卷积、Z 变换 ROC/卷积性质等。

### 删减

- 移除文档更新时间显示中的固定中文前缀，仅保留日期和时间本身。

## V6.4.7 - 2026-06-13

### 新增

- EPMF Block 4 Lecture 15 补充事业部结构、扁平结构、矩阵结构等组织结构配图，并生成对应课程封面缩略图。
- EPMF Block 4 Lecture 16 补充公司战略层级配图。
- EPMF README 更换结尾展示图。

### 调整

- EPMF Block 3/4 正文中的经济、财务与商业术语统一补充中文标注，采用“中文术语 English Term”格式；公式块保留原样。
- EPMF Block 3/4 部分标题、目录锚点、定义容器和表格项统一为中文在前、英文在后的写作风格。
- EPMF Block 3 Lecture 13 Part 1/2 与 13-2 Extended Version 补充 cost、price、interest、asset、depreciation、CapEx、OpEx、TCO 等术语中文。
- EPMF Block 4 Lecture 14/15/16 补充 ownership、shares、valuation、share price、market share、revenue、profit、strategy、KPI 等术语中文。
- 刷新课程卡片封面与预览缓存，使 CourseIndex 展示最新 EPMF 封面和正文摘要。
- 调整 EPMF README 的提示语气与页面分隔。

### 修复

- 修复 EPMF Block 3/4 笔记中部分正文英文经济学名词未标注中文的问题。

### 删减

- 暂无。

## V6.4.5 - 2026-06-13

### 新增

- EPMF 笔记页面通过 `transformPageData` 显式限定右侧目录深度为 h2 ~ h3（特例，为后续目录结构预留）。
- 新增 View Transition CSS 防回归校验脚本，覆盖导航栏命名快照、正文快照选择器、正文快照层级与 doc/contentless 页面切换类名。

### 调整

- 课程索引卡片（CourseIndex）改用双层阴影（羽化光晕 + 投影），营造微悬浮质感，与导航栏胶囊和侧边栏窗口风格统一。
- 首页 feature 卡片复用统一的玻璃卡片边框、羽化阴影和深度阴影变量。
- 课程 README 页面（`pageClass: course-index-page`）不再显示字数 / 阅读时间 / 作者 / 下载 PDF（在 `config.mts` 的 `formatDocMeta` 中判断 frontmatter 跳过注入）。
- 正文切入淡入动画放慢：桌面端 `--dur-doc-enter` 调整为 `0.94s`，移动端调整为 `0.82s`。

### 修复

- 修复页面切换时导航栏 / 本地导航栏因独立 View Transition 快照导致的异常放大、重叠与跟随正文位移动画的问题。
- 修复正文进入动画被 root 快照承载导致 nav 一起横向运动的问题，改为只对真实正文列建立 `doc-content` 命名快照。
- 修复 `.VPDoc .content` 过宽选择器同时命中正文与右侧目录，造成重复 `view-transition-name: doc-content` 并让 Chrome 中止正文动画的问题。
- 修复从有正文页面切换到站内无正文页面时，正文右向淡出动画缺失的问题。
- 修复从有 sidebar 的 doc 页面切换到无 sidebar 的 doc 页面时，sidebar 淡出后短暂出现玻璃模糊矩形残留的问题（新增 `vt-hide-sidebar` 类将 sidebar 并入 root 快照离场）。

### 删减

- 移除导航栏与本地导航栏的独立命名 View Transition 快照规则，避免玻璃态导航在路由切换时生成额外异常快照。

## V6.4.4 - 2026-06-12

### 新增

- CourseIndex 组件新增课程封面 fallback 支持，笔记内封面缺失时回退到课程 README 封面图。
- 抽取 `course-index-utils.mjs` 公共模块，供缩略图与预览生成脚本复用。
- 新增 `course-index-utils.test.mjs` 单元测试及 `npm run test:course-index-assets` 测试脚本。
- EPMF Lecture 7 田口参数设计区域新增 DOE 术语说明 NOTE（因子、水准、实验、处理）。
- EPMF Lecture 7/11/13 公式首次出现的参数新增 NOTE 说明。

### 调整

- `generate-course-thumbnails.mjs` 重构，路径解析逻辑迁移至 `course-index-utils.mjs`。

### 修复

- 暂无。

### 删减

- 暂无。

## V6.4.3 - 2026-06-12

### 新增

- 暂无。

### 调整

- 合并导航栏“第一学年”和“第二学年”为“早期资料”下拉菜单。

### 修复

- 暂无。

### 删减

- 暂无。

## V6.4.2 - 2026-06-12

### 新增

- 新增导航栏“杂项”下拉菜单，并添加站内“更新日志”入口。
- 新增站内更新日志页面 `/changelog`，复用根目录 `CHANGELOG.md` 内容。

### 调整

- 将“更新日志”入口从 GitHub 外链改为站内路由。

### 修复

- 暂无。

### 删减

- 暂无。

## V6.4.1 - 2026-06-12

### 新增

- 暂无。

### 调整

- 暂无。

### 修复

- 修复从文档页面返回首页时，桌面端 sidebar 独立 View Transition 快照残留造成的短暂玻璃模糊层。

### 删减

- 暂无。

## V6.4 Creation & Beyond - 2026-06-12 (9a42ed3)

- 统计：72 个文件变更，新增 1679 行，删除 219 行。

### 新增

- 新增通用课程卡片目录组件 `CourseIndex`。
- 新增课程封面缩略图生成脚本。
- 新增课程卡片正文预览生成脚本。
- 新增课程卡片预览缓存文件。
- 新增/补充 CCD README、CCD Part 1/CCD Lecture 1 Introduction、CCD Part 1/CCD Lecture 2 Electronic Communications、CCD Part 1/CCD Lecture 2b Semiconductors Basics 等 46 项相关笔记、图片或附件。

### 调整

- 调整 CCD README、CCD Part 1/CCD Lecture 2b Semiconductors Basics、CCD Part 1/CCD Lecture 3-4 Transistors、CCD Part 2/CCD Lecture 8 LC Circuits and Matching Networks 等 13 项的笔记、README 或配图引用。
- 调整 VitePress 导航、侧边栏或站点配置。
- 调整自定义主题组件。
- 调整主题样式、动效或响应式表现。
- 调整首页内容与公共资源。
- 调整 npm 脚本或依赖锁定。
- 调整 GitHub Pages 部署流程。

### 修复

- 暂无。

### 删减

- 精简/替换 CCD README、CCD Part 1/CCD Lecture 1 Introduction、CCD Part 1/CCD Lecture 2 Electronic Communications、CCD Part 1/CCD Lecture 2b Semiconductors Basics 等 48 项中的旧内容。

## V6.3 - 2026-06-11 (5f45d15)

- 统计：15 个文件变更，新增 859 行，删除 32 行。

### 新增

- 新增 VitePress 自定义主题、自动化脚本相关内容。

### 调整

- 调整 VitePress 导航、侧边栏或站点配置。
- 调整自定义主题组件。
- 调整主题样式、动效或响应式表现。
- 调整首页内容与公共资源。

### 修复

- 暂无。

### 删减

- 精简/替换 导航、侧边栏与站点配置、主题组件、VitePress 自定义主题、主题样式 等 6 项中的旧内容。

## V6.2 fix - 2026-06-11 (b839373)

- 统计：1 个文件变更，新增 1 行，删除 1 行。

### 新增

- 补充对应文件中的内容。

### 调整

- 调整 VitePress 导航、侧边栏或站点配置。

### 修复

- 修复 导航、侧边栏与站点配置 中的问题。

### 删减

- 精简/替换 导航、侧边栏与站点配置 中的旧内容。

## V6.2 fix - 2026-06-11 (33866e9)

- 统计：1 个文件变更，新增 1 行，删除 1 行。

### 新增

- 补充对应文件中的内容。

### 调整

- 调整主题样式、动效或响应式表现。

### 修复

- 修复 主题样式 中的问题。

### 删减

- 精简/替换 主题样式 中的旧内容。

## V6.2 - 2026-06-11 (96ee51e)

- 统计：19 个文件变更，新增 491 行，删除 102 行。

### 新增

- 新增首页或公共展示资源。
- 新增前端动画或样式 vendor 资源。

### 调整

- 调整 VitePress 导航、侧边栏或站点配置。
- 调整自定义主题组件。
- 调整主题样式、动效或响应式表现。
- 调整首页内容与公共资源。

### 修复

- 暂无。

### 删减

- 精简/替换 导航、侧边栏与站点配置、VitePress 自定义主题、主题组件、主题样式 等 6 项中的旧内容。

## V6.1 - 2026-06-11 (726bce2)

- 统计：18 个文件变更，新增 503 行，删除 368 行。

### 新增

- 新增 VitePress 自定义主题相关内容。

### 调整

- 调整 VitePress 导航、侧边栏或站点配置。
- 调整自定义主题组件。
- 调整主题样式、动效或响应式表现。
- 调整首页内容与公共资源。

### 修复

- 暂无。

### 删减

- 移除 VitePress 自定义主题、主题组件 中的旧文件。

## V6.0 fix - 2026-06-10 (a313568)

- 统计：3 个文件变更，新增 209 行，删除 80 行。

### 新增

- 补充对应文件中的内容。

### 调整

- 调整自定义主题组件。
- 调整主题样式、动效或响应式表现。

### 修复

- 修复 项目维护文档、主题组件、主题样式 中的问题。

### 删减

- 精简/替换 项目维护文档、主题组件、主题样式 中的旧内容。

## V6.0 - 2026-06-10 (a4f5b30)

- 统计：6 个文件变更，新增 486 行，删除 354 行。

### 新增

- 新增 主题样式相关内容。

### 调整

- 调整自定义主题组件。
- 调整主题样式、动效或响应式表现。

### 修复

- 暂无。

### 删减

- 精简/替换 主题组件、主题样式 中的旧内容。

## V5.7 - 2026-06-10 (9e23c96)

- 统计：34 个文件变更，新增 2863 行，删除 17 行。

### 新增

- 补充 EMFT Chapter 2、EMFT Chapter 8 P II 内容。

### 调整

- 调整 EMFT Chapter 2、EMFT Chapter 8 P II 的笔记、README 或配图引用。
- 调整自定义主题组件。
- 调整主题样式、动效或响应式表现。

### 修复

- 暂无。

### 删减

- 精简/替换 EMFT Chapter 2、EMFT Chapter 8 P II 中的旧内容。

## V5.6.3 - 2026-06-07 (4eb2bbc)

- 统计：4 个文件变更，新增 21 行，删除 1 行。

### 新增

- 新增/补充 CCD Part 3/CCD Lecture 14 Frequency Modulation and Phase Modulation、CCD Part 3/CCD Lecture 15 Antennas in a Circuit 相关笔记、图片或附件。

### 调整

- 调整 CCD Part 3/CCD Lecture 14 Frequency Modulation and Phase Modulation、CCD Part 3/CCD Lecture 15 Antennas in a Circuit 的笔记、README 或配图引用。

### 修复

- 暂无。

### 删减

- 精简/替换 CCD Part 3/CCD Lecture 14 Frequency Modulation and Phase Modulation、CCD Part 3/CCD Lecture 15 Antennas in a Circuit 中的旧内容。

## V5.6.2 - 2026-06-06 (203fa0f)

- 统计：2 个文件变更，新增 11 行。

### 新增

- 新增/补充 CCD Part 3/CCD Lecture 13 Single-Sideband Communication SSB 相关笔记、图片或附件。

### 调整

- 调整 CCD Part 3/CCD Lecture 13 Single-Sideband Communication SSB 的笔记、README 或配图引用。

### 修复

- 暂无。

### 删减

- 暂无。

## V5.6.1 - 2026-06-05 (106ce6a)

- 统计：2 个文件变更，新增 21 行。

### 新增

- 新增/补充 CCD Part 3/CCD Lecture 11-12 Amplitude Modulation 相关笔记、图片或附件。

### 调整

- 调整 CCD Part 3/CCD Lecture 11-12 Amplitude Modulation 的笔记、README 或配图引用。

### 修复

- 暂无。

### 删减

- 暂无。

## V5.6 - 2026-06-05 (240ba76)

- 统计：72 个文件变更，新增 5449 行，删除 21 行。

### 新增

- 新增/补充 CCD Part 3/CCD Lecture 11-12 Amplitude Modulation、CCD Part 3/CCD Lecture 13 Single-Sideband Communication SSB、CCD Part 3/CCD Lecture 14 Frequency Modulation and Phase Modulation、CCD Part 3/CCD Lecture 15 Antennas in a Circuit 等 10 项相关笔记、图片或附件。

### 调整

- 调整 CCD README、CCD Part 3/CCD Lecture 11-12 Amplitude Modulation、CCD Part 3/CCD Lecture 13 Single-Sideband Communication SSB、CCD Part 3/CCD Lecture 14 Frequency Modulation and Phase Modulation 等 13 项的笔记、README 或配图引用。
- 调整 VitePress 导航、侧边栏或站点配置。

### 修复

- 暂无。

### 删减

- 移除 EPMF Lecture 14、EPMF Lecture 15、EPMF Lecture 16 中的旧文件或附件。

## V5.5 - 2026-06-04 (01f9c1c)

- 统计：6 个文件变更，新增 161 行，删除 7 行。

### 新增

- 新增 主题组件相关内容。

### 调整

- 调整自定义主题组件。
- 调整主题样式、动效或响应式表现。

### 修复

- 暂无。

### 删减

- 精简/替换 项目维护文档、主题组件、主题样式 中的旧内容。

## V5.4.0 beta - 2026-06-04 (a2acfa6)

- 统计：3 个文件变更，新增 182 行。

### 新增

- 新增 主题样式相关内容。

### 调整

- 调整主题样式、动效或响应式表现。

### 修复

- 暂无。

### 删减

- 暂无。

## V5.3.1 - 2026-06-03 (c7f31fa)

- 统计：1 个文件变更，新增 2 行，删除 2 行。

### 新增

- 补充对应文件中的内容。

### 调整

- 调整 VitePress 导航、侧边栏或站点配置。

### 修复

- 暂无。

### 删减

- 精简/替换 导航、侧边栏与站点配置 中的旧内容。

## V5.3 - 2026-06-03 (ab991c2)

- 统计：9 个文件变更，新增 901 行，删除 839 行。

### 新增

- 新增/补充 EMFT EFMT Extra 1、EMFT Chapter 8 P I、EMFT Chapter 8 P II、EMFT README 相关笔记、图片或附件。

### 调整

- 调整 EMFT EFMT Extra 1、EMFT README 的笔记、README 或配图引用。
- 调整 VitePress 导航、侧边栏或站点配置。

### 修复

- 暂无。

### 删减

- 移除 EMFT Chapter 8 中的旧文件或附件。

## V5.2.2 bug fix - 2026-06-03 (8a7e7e5)

- 统计：2 个文件变更，新增 15 行。

### 新增

- 补充对应文件中的内容。

### 调整

- 调整自定义主题组件。
- 调整主题样式、动效或响应式表现。

### 修复

- 修复 主题组件、主题样式 中的问题。

### 删减

- 暂无。

## V5.2.1 Fix - 2026-06-03 (ea5d837)

- 统计：1 个文件变更，新增 81 行。

### 新增

- 补充 EMFT Chapter 8 内容。

### 调整

- 调整 EMFT Chapter 8 的笔记、README 或配图引用。

### 修复

- 修复 EMFT Chapter 8相关问题。

### 删减

- 暂无。

## V5.2 - 2026-06-03 (20c4dc6)

- 统计：6 个文件变更，新增 79 行，删除 33 行。

### 新增

- 新增首页或公共展示资源。

### 调整

- 调整自定义主题组件。
- 调整主题样式、动效或响应式表现。
- 调整首页内容与公共资源。

### 修复

- 暂无。

### 删减

- 精简/替换 主题组件、主题样式、首页与公共资源 中的旧内容。

## V5.1.1 fix - 2026-06-02 (68351c0)

- 统计：2 个文件变更，新增 2 行，删除 2 行。

### 新增

- 补充 EMFT EFMT Extra 1、EMFT EFMT Extra 2 内容。

### 调整

- 调整 EMFT EFMT Extra 1、EMFT EFMT Extra 2 的笔记、README 或配图引用。

### 修复

- 修复 EMFT EFMT Extra 1、EMFT EFMT Extra 2相关问题。

### 删减

- 精简/替换 EMFT EFMT Extra 1、EMFT EFMT Extra 2 中的旧内容。

## V5.1.1 - 2026-06-02 (0b43b09)

- 统计：6 个文件变更，新增 187 行，删除 105 行。

### 新增

- 新增/补充 EMFT EFMT Extra 2 相关笔记、图片或附件。

### 调整

- 调整 EMFT EFMT Extra 1、EMFT EFMT Extra 2 的笔记、README 或配图引用。
- 调整 VitePress 导航、侧边栏或站点配置。
- 调整课程笔记写作规范。

### 修复

- 暂无。

### 删减

- 精简/替换 EMFT EFMT Extra 1、EMFT EFMT Extra 2 中的旧内容。

## V5.1 - 2026-06-02 (2de1cb9)

- 统计：9 个文件变更，新增 1529 行，删除 2462 行。

### 新增

- 新增/补充 EMFT EFMT Extra 1、EMFT EFMT Extra 2 相关笔记、图片或附件。

### 调整

- 调整 EMFT Chapter 7、EMFT Chapter 8、EMFT README 的笔记、README 或配图引用。
- 调整 VitePress 导航、侧边栏或站点配置。
- 调整课程笔记写作规范。

### 修复

- 暂无。

### 删减

- 移除 EMFT Chapter 8 Ex 1 公式复习、EMFT Chapter 8 P I、EMFT Chapter 8 P II 中的旧文件或附件。

## V5.0 - 2026-05-31 (552a555)

- 统计：4 个文件变更，新增 167 行，删除 47 行。

### 新增

- 补充对应文件中的内容。

### 调整

- 调整自定义主题组件。
- 调整主题样式、动效或响应式表现。

### 修复

- 暂无。

### 删减

- 精简/替换 主题组件、主题样式 中的旧内容。

## V4.9.2 - 2026-05-31 (84e22bd)

- 统计：2 个文件变更，新增 73 行，删除 38 行。

### 新增

- 补充对应文件中的内容。

### 调整

- 调整自定义主题组件。
- 调整主题样式、动效或响应式表现。

### 修复

- 暂无。

### 删减

- 精简/替换 主题组件、主题样式 中的旧内容。

## V4.9.1 Left anime - 2026-05-31 (8957205)

- 统计：6 个文件变更，新增 203 行，删除 741 行。

### 新增

- 补充对应文件中的内容。

### 调整

- 调整自定义主题组件。
- 调整主题样式、动效或响应式表现。
- 调整 npm 脚本或依赖锁定。
- 调整课程笔记写作规范。

### 修复

- 暂无。

### 删减

- 精简/替换 项目维护文档、主题组件、VitePress 自定义主题、主题样式 等 5 项中的旧内容。

## V4.9 - 2026-05-31 (e05f2c3)

- 统计：14 个文件变更，新增 53 行，删除 22 行。

### 新增

- 新增/补充 CCD Part 2/CCD Lecture 8 LC Circuits and Matching Networks、CCD Part 2/CCD Lecture 9 Oscillators、CCD Part 3/CCD Lecture 11-12 Amplitude Modulation、CCD Part 3/CCD Lecture 13 Single-Sideband Communication SSB 等 6 项相关笔记、图片或附件。

### 调整

- 调整 CCD README、CCD Part 2/CCD Lecture 10 Revision、CCD Part 2/CCD Lecture 7 Mixers、CCD Part 2/CCD Lecture 8 LC Circuits and Matching Networks 等 6 项的笔记、README 或配图引用。
- 调整 VitePress 导航、侧边栏或站点配置。

### 修复

- 暂无。

### 删减

- 精简/替换 CCD README、CCD Part 2/CCD Lecture 10 Revision、CCD Part 2/CCD Lecture 7 Mixers、CCD Part 2/CCD Lecture 8 LC Circuits and Matching Networks 等 10 项中的旧内容。

## V4.8 - 2026-05-31 (017166e)

- 统计：6 个文件变更，新增 543 行，删除 13 行。

### 新增

- 新增/补充 EMFT Chapter 8 相关笔记、图片或附件。

### 调整

- 调整 EMFT Chapter 8 Ex 1 公式复习、EMFT Chapter 8 的笔记、README 或配图引用。
- 调整课程笔记写作规范。

### 修复

- 暂无。

### 删减

- 移除 EMFT Chapter 11 中的旧文件或附件。

## V4.7 - 2026-05-30 (674f1b1)

- 统计：10 个文件变更，新增 3087 行，删除 21 行。

### 新增

- 新增/补充 EMFT Chapter 8 Ex 1 公式复习、EMFT Chapter 8 P II、EMFT Chapter 8 相关笔记、图片或附件。

### 调整

- 调整 EMFT Chapter 8 P II、EMFT README 的笔记、README 或配图引用。
- 调整 VitePress 导航、侧边栏或站点配置。
- 调整课程笔记写作规范。

### 修复

- 暂无。

### 删减

- 精简/替换 EMFT Chapter 8 Ex 1 公式复习、EMFT Chapter 8 P II、EMFT Chapter 8、EMFT README 中的旧内容。

## V4.6.0 EFMT Chap8 P1 Init - 2026-05-30 (d348f3e)

- 统计：17 个文件变更，新增 1513 行，删除 14 行。

### 新增

- 新增/补充 EMFT Chapter 8 P I 相关笔记、图片或附件。

### 调整

- 调整 CCD Part 1/CCD Lecture 5-6 Amplifiers、CCD Part 2/CCD Lecture 7 Mixers、CCD Part 2/CCD Lecture 8 LC Circuits and Matching Networks、CCD Part 2/CCD Lecture 9 Oscillators 等 5 项的笔记、README 或配图引用。
- 调整主题样式、动效或响应式表现。

### 修复

- 暂无。

### 删减

- 精简/替换 CCD Part 1/CCD Lecture 5-6 Amplifiers、CCD Part 2/CCD Lecture 7 Mixers、CCD Part 2/CCD Lecture 8 LC Circuits and Matching Networks、CCD Part 2/CCD Lecture 9 Oscillators 等 5 项中的旧内容。

## V4.5.2 - 2026-05-29 (a216593)

- 统计：43 个文件变更，新增 253 行，删除 38 行。

### 新增

- 新增/补充 CCD Part 1/CCD Lecture 5-6 Amplifiers、CCD Part 2/CCD Lecture 10 Revision、CCD Part 2/CCD Lecture 7 Mixers、CCD Part 2/CCD Lecture 8 LC Circuits and Matching Networks 等 5 项相关笔记、图片或附件。

### 调整

- 调整 CCD Part 1/CCD Lecture 5-6 Amplifiers、CCD Part 2/CCD Lecture 10 Revision、CCD Part 2/CCD Lecture 7 Mixers、CCD Part 2/CCD Lecture 8 LC Circuits and Matching Networks 等 5 项的笔记、README 或配图引用。
- 调整主题样式、动效或响应式表现。
- 调整首页内容与公共资源。

### 修复

- 暂无。

### 删减

- 精简/替换 CCD Part 1/CCD Lecture 5-6 Amplifiers、CCD Part 2/CCD Lecture 10 Revision、CCD Part 2/CCD Lecture 7 Mixers、CCD Part 2/CCD Lecture 8 LC Circuits and Matching Networks 等 5 项中的旧内容。

## V4.5.1 - 2026-05-29 (add0dd4)

- 统计：142 个文件变更，新增 7240 行，删除 9 行。

### 新增

- 新增/补充 CCD Part 1/CCD Lecture 5-6 Amplifiers、CCD Part 2/CCD Lecture 7 Mixers、CCD Part 2/CCD Lecture 8 LC Circuits and Matching Networks、CCD Part 2/CCD Lecture 9 Oscillators 相关笔记、图片或附件。
- 新增首页或公共展示资源。

### 调整

- 调整 CCD Part 1/CCD Lecture 5-6 Amplifiers、CCD Part 2/CCD Lecture 10 Revision、CCD Part 2/CCD Lecture 7 Mixers、CCD Part 2/CCD Lecture 8 LC Circuits and Matching Networks 等 6 项的笔记、README 或配图引用。
- 调整自定义主题组件。
- 调整主题样式、动效或响应式表现。
- 调整首页内容与公共资源。

### 修复

- 暂无。

### 删减

- 精简/替换 CCD Part 1/CCD Lecture 5-6 Amplifiers、CCD Part 2/CCD Lecture 10 Revision、CCD Part 2/CCD Lecture 7 Mixers、CCD Part 2/CCD Lecture 8 LC Circuits and Matching Networks 等 6 项中的旧内容。

## V4.5 - 2026-05-29 (5894c84)

- 统计：1 个文件变更，新增 1 行，删除 1 行。

### 新增

- 补充对应文件中的内容。

### 调整

- 调整 VitePress 导航、侧边栏或站点配置。

### 修复

- 暂无。

### 删减

- 精简/替换 导航、侧边栏与站点配置 中的旧内容。

## V4.4.1 - 2026-05-27 (85163a6)

- 统计：14 个文件变更，新增 60 行，删除 10 行。

### 新增

- 新增/补充 EPMF Block 3 Additional Reading、EPMF Course Revisit、EPMF Lecture 10、EPMF Lecture 11 等 12 项相关笔记、图片或附件。

### 调整

- 调整 EPMF README 的笔记、README 或配图引用。
- 调整 VitePress 导航、侧边栏或站点配置。

### 修复

- 暂无。

### 删减

- 精简/替换 EPMF Block 3 Additional Reading、EPMF Course Revisit、EPMF Lecture 10、EPMF Lecture 11 等 13 项中的旧内容。

## V4.4 - 2026-05-27 (5f33c3b)

- 统计：14 个文件变更，新增 1176 行，删除 201 行。

### 新增

- 新增/补充 EPMF Block 1 Examples、EPMF Lecture 7、EPMF Lecture 8 相关笔记、图片或附件。

### 调整

- 调整 EPMF Lecture 1、EPMF Lecture 2、EPMF Lecture 3、EPMF Lecture 4 等 8 项的笔记、README 或配图引用。
- 调整 VitePress 导航、侧边栏或站点配置。
- 调整主题样式、动效或响应式表现。
- 调整课程笔记写作规范。

### 修复

- 暂无。

### 删减

- 精简/替换 EPMF Block 1 Examples、EPMF Lecture 1、EPMF Lecture 2、EPMF Lecture 3 等 9 项中的旧内容。

## V4.3 - 2026-05-27 (7308fb9)

- 统计：47 个文件变更，新增 1153 行，删除 362 行。

### 新增

- 新增/补充 EPMF Block 2 Examples、EPMF Lecture 5、EPMF Lecture 6、EPMF Lecture 7 等 5 项相关笔记、图片或附件。

### 调整

- 调整 EPMF Lecture 5、EPMF Lecture 6、EPMF Lecture 7、EPMF Lecture 8 等 5 项的笔记、README 或配图引用。
- 调整 VitePress 导航、侧边栏或站点配置。
- 调整课程笔记写作规范。

### 修复

- 暂无。

### 删减

- 精简/替换 EPMF Block 2 Examples、EPMF Lecture 5、EPMF Lecture 6、EPMF Lecture 7 等 6 项中的旧内容。

## V4.2.3 - 2026-05-26 (2e64398)

- 统计：2 个文件变更，新增 12 行，删除 12 行。

### 新增

- 补充 CCD Part 1/CCD Lecture 1 Introduction、CCD Part 1/CCD Lecture 2b Semiconductors Basics 内容。

### 调整

- 调整 CCD Part 1/CCD Lecture 1 Introduction、CCD Part 1/CCD Lecture 2b Semiconductors Basics 的笔记、README 或配图引用。

### 修复

- 暂无。

### 删减

- 精简/替换 CCD Part 1/CCD Lecture 1 Introduction、CCD Part 1/CCD Lecture 2b Semiconductors Basics 中的旧内容。

## V4.2.2 - 2026-05-26 (bbe4f66)

- 统计：9 个文件变更，新增 29 行，删除 5 行。

### 新增

- 新增/补充 CCD README、CCD Part 1/CCD Lecture 2b Semiconductors Basics、CCD Part 1/CCD Lecture 3-4 Transistors、DSP Chapter 11 相关笔记、图片或附件。

### 调整

- 调整 CCD README、CCD Part 1/CCD Lecture 2b Semiconductors Basics、CCD Part 1/CCD Lecture 3-4 Transistors、DSP README 的笔记、README 或配图引用。
- 调整 VitePress 导航、侧边栏或站点配置。

### 修复

- 暂无。

### 删减

- 精简/替换 CCD README、CCD Part 1/CCD Lecture 2b Semiconductors Basics、CCD Part 1/CCD Lecture 3-4 Transistors、DSP Chapter 11 等 5 项中的旧内容。

## V4.2.1 fix - 2026-05-26 (5839c80)

- 统计：2 个文件变更，新增 1 行，删除 1 行。

### 新增

- 新增/补充 CCD Part 1/CCD Lecture 1 Introduction 相关笔记、图片或附件。

### 调整

- 调整 CCD Part 1/CCD Lecture 1 Introduction 的笔记、README 或配图引用。

### 修复

- 修复 CCD Part 1/CCD Lecture 1 Introduction相关问题。

### 删减

- 精简/替换 CCD Part 1/CCD Lecture 1 Introduction 中的旧内容。

## V4.2.1 - 2026-05-26 (bcb2858)

- 统计：1 个文件变更，新增 10 行，删除 2 行。

### 新增

- 补充 CCD Part 1/CCD Lecture 1 Introduction 内容。

### 调整

- 调整 CCD Part 1/CCD Lecture 1 Introduction 的笔记、README 或配图引用。

### 修复

- 暂无。

### 删减

- 精简/替换 CCD Part 1/CCD Lecture 1 Introduction 中的旧内容。

## V4.2 CCD supply - 2026-05-26 (c9b95e4)

- 统计：49 个文件变更，新增 1213 行，删除 7 行。

### 新增

- 新增/补充 CCD README、CCD Part 1/CCD Lecture 1 Introduction、CCD Part 1/CCD Lecture 2 Electronic Communications、CCD Part 1/CCD Lecture 2b Semiconductors Basics 等 5 项相关笔记、图片或附件。

### 调整

- 调整 CCD README、CCD Part 1/CCD Lecture 2 Electronic Communications、CCD Part 1/CCD Lecture 2b Semiconductors Basics、CCD Part 1/CCD Lecture 3-4 Transistors 的笔记、README 或配图引用。
- 调整 VitePress 导航、侧边栏或站点配置。

### 修复

- 暂无。

### 删减

- 精简/替换 CCD README、CCD Part 1/CCD Lecture 1 Introduction、CCD Part 1/CCD Lecture 2 Electronic Communications、CCD Part 1/CCD Lecture 2b Semiconductors Basics 等 5 项中的旧内容。

## V4.1.1 A NEW ERA fix - 2026-05-25 (92feddb)

- 统计：2 个文件变更，新增 40 行。

### 新增

- 补充 EMFT Chapter 6、EMFT Chapter 7 内容。

### 调整

- 调整 EMFT Chapter 6、EMFT Chapter 7 的笔记、README 或配图引用。

### 修复

- 修复 EMFT Chapter 6、EMFT Chapter 7相关问题。

### 删减

- 暂无。

## V4.1 A NEW ERA - 2026-05-25 (2502ae6)

- 统计：5 个文件变更，新增 132 行，删除 94 行。

### 新增

- 新增 主题样式相关内容。

### 调整

- 调整自定义主题组件。
- 调整主题样式、动效或响应式表现。

### 修复

- 暂无。

### 删减

- 精简/替换 主题组件、VitePress 自定义主题、主题样式 中的旧内容。

## V4.0 Homepage UI - 2026-05-25 (86b65dc)

- 统计：3 个文件变更，新增 421 行，删除 46 行。

### 新增

- 新增 主题组件相关内容。

### 调整

- 调整自定义主题组件。
- 调整首页内容与公共资源。

### 修复

- 暂无。

### 删减

- 精简/替换 主题组件、首页与公共资源 中的旧内容。

## V3.8 C6C7 - 2026-05-25 (79f6165)

- 统计：12 个文件变更，新增 1640 行，删除 446 行。

### 新增

- 新增/补充 EMFT Chapter 7 相关笔记、图片或附件。

### 调整

- 调整 EMFT Chapter 6、EMFT Chapter 7、EMFT README 的笔记、README 或配图引用。
- 调整 VitePress 导航、侧边栏或站点配置。

### 修复

- 暂无。

### 删减

- 移除 EMFT Chapter 10、EMFT Chapter 9 中的旧文件或附件。

## V3.7.4 Fix - 2026-05-16 (69df966)

- 统计：1 个文件变更，新增 2 行，删除 2 行。

### 新增

- 补充对应文件中的内容。

### 调整

- 调整 VitePress 自定义主题。

### 修复

- 修复 VitePress 自定义主题 中的问题。

### 删减

- 精简/替换 VitePress 自定义主题 中的旧内容。

## V3.7.3 Fix - 2026-05-16 (c3c089b)

- 统计：1 个文件变更，新增 20 行，删除 12 行。

### 新增

- 补充对应文件中的内容。

### 调整

- 调整 VitePress 自定义主题。

### 修复

- 修复 VitePress 自定义主题 中的问题。

### 删减

- 精简/替换 VitePress 自定义主题 中的旧内容。

## V3.7.2 EXPAND & COLLAPSE - 2026-05-16 (fae5d5b)

- 统计：11 个文件变更，新增 167 行，删除 6 行。

### 新增

- 新增/补充 EMFT Chapter 6 相关笔记、图片或附件。

### 调整

- 调整 EMFT Chapter 6 的笔记、README 或配图引用。
- 调整 VitePress 导航、侧边栏或站点配置。
- 调整主题样式、动效或响应式表现。

### 修复

- 暂无。

### 删减

- 精简/替换 EMFT Chapter 6 中的旧内容。

## V3.7 Old Notes Fix - 2026-05-15 (2142042)

- 统计：24 个文件变更，新增 308 行，删除 679 行。

### 新增

- 补充 AIML EC Lecture 1、AIML EC Lecture 2、AIML EC Lecture 3、AIML EC Lecture 4 等 23 项 内容。

### 调整

- 调整 AIML EC Lecture 1、AIML EC Lecture 2、AIML EC Lecture 3、AIML EC Lecture 4 等 23 项的笔记、README 或配图引用。
- 调整 VitePress 导航、侧边栏或站点配置。

### 修复

- 修复 AIML EC Lecture 1、AIML EC Lecture 2、AIML EC Lecture 3、AIML EC Lecture 4 等 23 项相关问题。

### 删减

- 精简/替换 AIML EC Lecture 1、AIML EC Lecture 2、AIML EC Lecture 3、AIML EC Lecture 4 等 23 项中的旧内容。

## V3.6 EPMF 2~4 - 2026-05-15 (d99c472)

- 统计：25 个文件变更，新增 1973 行，删除 4 行。

### 新增

- 新增/补充 EPMF Lecture 2、EPMF Lecture 3、EPMF Lecture 4 相关笔记、图片或附件。

### 调整

- 调整 EPMF Lecture 2、EPMF Lecture 3、EPMF Lecture 4、EPMF README 的笔记、README 或配图引用。

### 修复

- 暂无。

### 删减

- 精简/替换 EPMF Lecture 2、EPMF Lecture 3、EPMF Lecture 4、EPMF README 中的旧内容。

## V3.5.1 CCD Sturcture - 2026-05-14 (53c8fd3)

- 统计：10 个文件变更，新增 94 行。

### 新增

- 新增/补充 CCD README、CCD Part 1/CCD Lecture 2 Electronic Communications、CCD Part 1/CCD Lecture 2b Semiconductors Basics、CCD Part 1/CCD Lecture 3-4 Transistors 等 9 项相关笔记、图片或附件。

### 调整

- 调整 VitePress 导航、侧边栏或站点配置。

### 修复

- 修正课程结构或目录组织。

### 删减

- 暂无。

## V3.5 WordCount - 2026-05-14 (24bee7f)

- 统计：8 个文件变更，新增 79 行，删除 7 行。

### 新增

- 新增/补充 EMFT Chapter 6、EMFT Chapter 7、EMFT Chapter 8 相关笔记、图片或附件。

### 调整

- 调整 EMFT Chapter 6、EMFT Chapter 7、EMFT Chapter 8 的笔记、README 或配图引用。
- 调整 VitePress 导航、侧边栏或站点配置。
- 调整自定义主题组件。

### 修复

- 暂无。

### 删减

- 精简/替换 EMFT Chapter 6、EMFT Chapter 7、EMFT Chapter 8 中的旧内容。

## V3.4.1 - 2026-05-13 (0781295)

- 统计：1 个文件变更，新增 11 行。

### 新增

- 补充对应文件中的内容。

### 调整

- 调整主题样式、动效或响应式表现。

### 修复

- 暂无。

### 删减

- 暂无。

## V3.4 - 2026-05-13 (90d37f2)

- 统计：12 个文件变更，新增 358 行，删除 80 行。

### 新增

- 补充 DSP README、EMFT README 内容。

### 调整

- 调整 DSP README、EMFT README 的笔记、README 或配图引用。
- 调整 VitePress 导航、侧边栏或站点配置。
- 调整自定义主题组件。
- 调整主题样式、动效或响应式表现。

### 修复

- 暂无。

### 删减

- 精简/替换 DSP README、EMFT README 中的旧内容。

## V3.3.1 - 2026-05-12 (b5168eb)

- 统计：1 个文件变更，新增 15 行。

### 新增

- 补充对应文件中的内容。

### 调整

- 调整主题样式、动效或响应式表现。

### 修复

- 暂无。

### 删减

- 暂无。

## Add V3.3 changelog - 2026-05-12 (a46fb0d)

- 统计：1 个文件变更，新增 80 行。

### 新增

- 新增 `docs/CHANGELOG-V3.3.md`，记录 V3.3 的页面转场、按钮反馈、点击涟漪与滚动 reveal 更新。

### 调整

- 暂无。

### 修复

- 暂无。

### 删减

- 暂无。

## V3.3 — iOS page transitions, button feedback, ripple, scroll reveal - 2026-05-12 (e7e76c5)

- 统计：4 个文件变更，新增 4 行，删除 937 行。

### 新增

- 补充 `.gitignore` 中与动画调试/设计文档相关的忽略规则。

### 调整

- 调整动画调试与设计草稿的项目归档方式。

### 修复

- 暂无。

### 删减

- 移除 `docs/public/animation-tuner.html` 与 `docs/superpowers/` 下的 V3.3 动画计划/规格草稿。

## V3.2.2 - 2026-05-12 (0f1ce39)

- 统计：2 个文件变更，新增 5 行，删除 5 行。

### 新增

- 补充 EMFT Chapter 3 P I、EMFT Chapter 4 内容。

### 调整

- 调整 EMFT Chapter 3 P I、EMFT Chapter 4 的笔记、README 或配图引用。

### 修复

- 暂无。

### 删减

- 精简/替换 EMFT Chapter 3 P I、EMFT Chapter 4 中的旧内容。

## V3.2.1 Opt fix - 2026-05-11 (824d1e5)

- 统计：2 个文件变更，新增 8 行。

### 新增

- 补充对应文件中的内容。

### 调整

- 调整性能、体积或加载体验。

### 修复

- 修复 项目维护文档 中的问题。

### 删减

- 暂无。

## V3.2 Opt - 2026-05-11 (00bd335)

- 统计：14 个文件变更，新增 1341 行，删除 11 行。

### 新增

- 新增/补充 EMFT Chapter 5 相关笔记、图片或附件。

### 调整

- 调整 EMFT Chapter 4、EMFT Chapter 5 的笔记、README 或配图引用。
- 调整性能、体积或加载体验。

### 修复

- 暂无。

### 删减

- 精简/替换 EMFT Chapter 4、EMFT Chapter 5 中的旧内容。

## V3.1.1 bug fix - 2026-04-30 (1019458)

- 统计：1 个文件变更，新增 2 行，删除 2 行。

### 新增

- 补充 EMFT README 内容。

### 调整

- 调整 EMFT README 的笔记、README 或配图引用。

### 修复

- 修复 EMFT README相关问题。

### 删减

- 精简/替换 EMFT README 中的旧内容。

## V3.1 EFMT CH4 - 2026-04-30 (7834d71)

- 统计：12 个文件变更，新增 1424 行，删除 8 行。

### 新增

- 新增/补充 EMFT Chapter 4 相关笔记、图片或附件。

### 调整

- 调整 EMFT Chapter 4 的笔记、README 或配图引用。
- 调整自定义主题组件。

### 修复

- 暂无。

### 删减

- 精简/替换 EMFT Chapter 4 中的旧内容。

## V3.0.1 Size Reduction - 2026-04-30 (ced876a)

- 统计：5957 个文件变更，删除 1020163 行。

### 新增


### 调整

- 调整性能、体积或加载体验。

### 修复

- 暂无。

### 删减

- 清理构建产物、依赖目录、缓存或系统临时文件。
- 移除 DSP .DS_Store、EMFT .DS_Store 中的旧文件或附件。

## V3.0 Performance Optimization - 2026-04-30 (7f8f002)

- 统计：13 个文件变更，新增 770 行，删除 591 行。

### 新增

- 新增/补充 EMFT Chapter 4 相关笔记、图片或附件。

### 调整

- 调整 EMFT Chapter 4 的笔记、README 或配图引用。
- 调整自定义主题组件。
- 调整主题样式、动效或响应式表现。
- 调整性能、体积或加载体验。

### 修复

- 暂无。

### 删减

- 精简/替换 EMFT Chapter 4 中的旧内容。

## V2.7 MCDONALDS - 2026-04-04 (39b1a94)

- 统计：4 个文件变更，新增 17 行，删除 2 行。

### 新增

- 新增首页或公共展示资源。

### 调整

- 调整自定义主题组件。
- 调整首页内容与公共资源。

### 修复

- 暂无。

### 删减

- 精简/替换 主题组件、首页与公共资源 中的旧内容。

## V2.7 CONTAINERS - 2026-04-04 (973559e)

- 统计：7 个文件变更，新增 329 行，删除 100 行。

### 新增

- 补充 EMFT Chapter 3 P II、EMFT Chapter 4 内容。

### 调整

- 调整 EMFT Chapter 3 P II、EMFT Chapter 4 的笔记、README 或配图引用。
- 调整 VitePress 导航、侧边栏或站点配置。
- 调整主题样式、动效或响应式表现。

### 修复

- 暂无。

### 删减

- 精简/替换 EMFT Chapter 3 P II、EMFT Chapter 4 中的旧内容。

## V2.6 Avatars - 2026-03-29 (9d27f45)

- 统计：20 个文件变更，新增 16 行，删除 105 行。

### 新增

- 新增/补充 EMFT Chapter 3 P I、EMFT Chapter 5 相关笔记、图片或附件。

### 调整

- 调整 EMFT .DS_Store、EMFT Chapter 3 P I、EMFT Chapter 5 的笔记、README 或配图引用。
- 调整首页内容与公共资源。
- 调整课程指南页面结构或内容。

### 修复

- 暂无。

### 删减

- 移除 课程指南页面、首页与公共资源 中的旧文件。

## V2.6 Lyrics - 2026-03-29 (9bd0c33)

- 统计：3 个文件变更，新增 12 行，删除 1 行。

### 新增

- 新增/补充 EMFT Chapter 4 相关笔记、图片或附件。

### 调整

- 调整 EMFT Chapter 3 P II、EMFT Chapter 4 的笔记、README 或配图引用。
- 调整界面展示或交互体验。

### 修复

- 暂无。

### 删减

- 精简/替换 EMFT Chapter 3 P II、EMFT Chapter 4 中的旧内容。

## V2.5 EMFT C3P2 - 2026-03-29 (d8bea99)

- 统计：17 个文件变更，新增 1154 行，删除 4 行。

### 新增

- 新增/补充 EMFT Chapter 3 P II 相关笔记、图片或附件。

### 调整

- 调整 EMFT Chapter 3 P II、EMFT README 的笔记、README 或配图引用。

### 修复

- 暂无。

### 删减

- 精简/替换 EMFT Chapter 3 P II、EMFT README 中的旧内容。

## V2.5 EPMF Lec1 - 2026-03-27 (6bdca47)

- 统计：14 个文件变更，新增 666 行，删除 2 行。

### 新增

- 新增/补充 EPMF Lecture 1 相关笔记、图片或附件。

### 调整

- 调整 EPMF Lecture 1 的笔记、README 或配图引用。

### 修复

- 暂无。

### 删减

- 精简/替换 EPMF Lecture 1 中的旧内容。

## V2.5 EPMF Structure - 2026-03-23 (5eef96e)

- 统计：477 个文件变更，新增 12034 行，删除 304 行。

### 新增

- 新增/补充 EPMF Lecture 1、EPMF Lecture 2、EPMF Lecture 3、EPMF Lecture 4 等 9 项相关笔记、图片或附件。
- 新增构建产物或 VitePress 缓存文件。

### 调整

- 调整 EPMF README 的笔记、README 或配图引用。
- 调整 VitePress 导航、侧边栏或站点配置。
- 调整首页内容与公共资源。

### 修复

- 修正课程结构或目录组织。

### 删减

- 清理构建产物、依赖目录、缓存或系统临时文件。

## V2.5 Hitokoto - 2026-03-21 (cba4d55)

- 统计：3 个文件变更，新增 99 行，删除 31 行。

### 新增

- 新增 主题组件相关内容。

### 调整

- 调整自定义主题组件。
- 调整首页内容与公共资源。

### 修复

- 暂无。

### 删减

- 精简/替换 主题组件、首页与公共资源 中的旧内容。

## V2.5 color - 2026-03-21 (f529888)

- 统计：2 个文件变更，新增 267 行，删除 220 行。

### 新增

- 补充对应文件中的内容。

### 调整

- 调整主题样式、动效或响应式表现。

### 修复

- 暂无。

### 删减

- 精简/替换 主题样式 中的旧内容。

## V2.4 - 2026-03-18 (a9fb80b)

- 统计：5 个文件变更，新增 18 行，删除 6 行。

### 新增

- 新增/补充 EMFT Chapter 3 P II 相关笔记、图片或附件。

### 调整

- 调整 DSP Chapter 7、EMFT Chapter 3 P II 的笔记、README 或配图引用。
- 调整 VitePress 导航、侧边栏或站点配置。
- 调整首页内容与公共资源。

### 修复

- 暂无。

### 删减

- 精简/替换 DSP Chapter 7、EMFT Chapter 3 P II 中的旧内容。

## V2.3 - 2026-03-18 (b20626b)

- 统计：5 个文件变更，新增 8 行，删除 12 行。

### 新增

- 补充对应文件中的内容。

### 调整

- 调整 VitePress 导航、侧边栏或站点配置。
- 调整自定义主题组件。
- 调整首页内容与公共资源。

### 修复

- 暂无。

### 删减

- 精简/替换 导航、侧边栏与站点配置、VitePress 自定义主题、主题组件、首页与公共资源 中的旧内容。

## V2.2.1 - 2026-03-17 (b8104d9)

- 统计：9 个文件变更，新增 13 行，删除 1 行。

### 新增

- 新增/补充 EMFT Chapter 3 P I、EMFT Chapter 3 P II、EPMF README 相关笔记、图片或附件。

### 调整

- 调整 VitePress 导航、侧边栏或站点配置。
- 调整首页内容与公共资源。

### 修复

- 暂无。

### 删减

- 移除 EMFT Chapter 3 中的旧文件或附件。

## V2.2 - 2026-03-16 (6b34c1a)

- 统计：16 个文件变更，新增 97 行，删除 50 行。

### 新增

- 新增/补充 DSP Chapter 10、DSP Chapter 8、DSP Chapter 9 相关笔记、图片或附件。

### 调整

- 调整 DSP Chapter 10、DSP Chapter 2、DSP Chapter 3 I、DSP Chapter 3 II 等 12 项的笔记、README 或配图引用。
- 调整 VitePress 导航、侧边栏或站点配置。

### 修复

- 暂无。

### 删减

- 精简/替换 DSP Chapter 10、DSP Chapter 2、DSP Chapter 3 I、DSP Chapter 3 II 等 12 项中的旧内容。

## V2.1 Centering - 2026-03-14 (a6caa08)

- 统计：1 个文件变更，新增 16 行。

### 新增

- 补充对应文件中的内容。

### 调整

- 调整主题样式、动效或响应式表现。

### 修复

- 暂无。

### 删减

- 暂无。

## v1.3 - 2026-03-14 (1b0ae43)

- 统计：1 个文件变更，新增 2 行，删除 1 行。

### 新增

- 补充对应文件中的内容。

### 调整

- 调整 VitePress 导航、侧边栏或站点配置。

### 修复

- 暂无。

### 删减

- 精简/替换 导航、侧边栏与站点配置 中的旧内容。

## v1.2 - 2026-03-14 (e385e07)

- 统计：140 个文件变更，新增 57181 行，删除 6 行。

### 新增

- 新增 npm 依赖目录内容。

### 调整

- 调整首页内容与公共资源。
- 调整 npm 脚本或依赖锁定。

### 修复

- 暂无。

### 删减

- 精简/替换 首页与公共资源、依赖与 npm 脚本 中的旧内容。

## V1.1.1 - 2026-03-13 (e25ef3e)

- 统计：2 个文件变更，新增 5 行，删除 7 行。

### 新增

- 补充对应文件中的内容。

### 调整

- 调整首页内容与公共资源。

### 修复

- 暂无。

### 删减

- 移除 首页与公共资源 中的旧文件。

## V1.1 - 2026-03-13 (db425ad)

- 统计：1 个文件变更，新增 1 行，删除 1 行。

### 新增

- 补充对应文件中的内容。

### 调整

- 调整首页内容与公共资源。

### 修复

- 暂无。

### 删减

- 精简/替换 首页与公共资源 中的旧内容。

## V1.1 - 2026-03-13 (3097cdd)

- 统计：1030 个文件变更，新增 28268 行，删除 67 行。

### 新增

- 新增首页或公共展示资源。
- 新增构建产物或 VitePress 缓存文件。
- 新增 npm 依赖目录内容。

### 调整

- 调整 VitePress 导航、侧边栏或站点配置。
- 调整自定义主题组件。
- 调整首页内容与公共资源。
- 调整 npm 脚本或依赖锁定。

### 修复

- 暂无。

### 删减

- 移除 首页与公共资源 中的旧文件。

## V1 - 2026-03-13 (65a8db5)

- 统计：1 个文件变更，新增 4 行，删除 1 行。

### 新增

- 补充对应文件中的内容。

### 调整

- 调整首页内容与公共资源。

### 修复

- 暂无。

### 删减

- 精简/替换 首页与公共资源 中的旧内容。

## V1 - 2026-03-13 (9741948)

- 统计：2 个文件变更，新增 29 行，删除 45 行。

### 新增

- 新增/补充 AIML EC Lecture 4_tmp.html 相关笔记、图片或附件。

### 调整

- 调整 AIML EC Lecture 4 的笔记、README 或配图引用。

### 修复

- 暂无。

### 删减

- 精简/替换 AIML EC Lecture 4、AIML EC Lecture 4_tmp.html 中的旧内容。

## V1 - 2026-03-13 (efbde2f)

- 统计：101 个文件变更，新增 4470 行，删除 19 行。

### 新增

- 新增/补充 AIML README、AIML Assets、AIML EC Lecture 1、AIML EC Lecture 2 等 17 项相关笔记、图片或附件。

### 调整

- 调整 DSP Chapter 3 I 的笔记、README 或配图引用。
- 调整 VitePress 导航、侧边栏或站点配置。
- 调整首页内容与公共资源。

### 修复

- 暂无。

### 删减

- 精简/替换 AIML README、AIML Assets、AIML EC Lecture 1、AIML EC Lecture 2 等 18 项中的旧内容。
