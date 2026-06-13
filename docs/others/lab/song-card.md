---
aside: true
outline: deep
---

# SongCard

这里记录 `SongCard` 的用法样例。它适合写在正文中，用来展示歌曲的专辑封面、专辑名、歌曲名、作者或歌手等信息。

## 样例

<SongCard
  cover="/1.jpg"
  album="透明な色"
  song="何度目の青空か？"
  artist="乃木坂46"
  lang="ja"
>
  可在这里补充发行年份、作曲、编曲、引用来源或正文备注。
</SongCard>

<SongCard
  cover="/2.jpg"
  album="The Book"
  title="Tracing Light"
  artist="Aya Sketch"
  lang="en"
>
  `title` 可以作为 `song` 的别名；英文标题默认使用斜体。
</SongCard>

<SongCard
  cover="/3.PNG"
  album="迁徙的雨"
  song="回到山海之间"
  author="北屿笔记"
  lang="zh"
>
  `author` 可以作为 `artist` 的别名；中文标题默认使用书名号。
</SongCard>

## 使用方法

最常用的写法是直接在 Markdown 里写 HTML/Vue 组件：

```html
<SongCard
  cover="/covers/album.jpg"
  album="透明な色"
  song="何度目の青空か？"
  artist="乃木坂46"
  lang="ja"
>
  可在这里补充发行年份、作曲、编曲、引用来源或正文备注。
</SongCard>
```

`cover` 可以是站点 public 路径、相对路径或外链。以 `/` 开头的路径会自动经过 VitePress `base` 处理；相对路径保持原样，适合引用当前文档附近的附件图片。

正文备注写在默认插槽里即可。如果只想展示基础信息，可以省略内部内容：

```html
<SongCard
  cover="/covers/single.jpg"
  album="迁徙的雨"
  song="回到山海之间"
  artist="北屿笔记"
  lang="zh"
/>
```

## SongCard 参数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `cover` | `string` | 必填 | 专辑封面图片。显示为左侧圆角方形图，默认 `object-fit: cover`。 |
| `album` | `string` | `''` | 专辑名。默认不自动加标题标点。 |
| `song` | `string` | `''` | 歌曲名。会按 `lang` 自动选择标题样式。 |
| `title` | `string` | `''` | `song` 的别名；当 `song` 为空时使用。 |
| `artist` | `string` | `''` | 作者、歌手或组合名。 |
| `author` | `string` | `''` | `artist` 的别名；当 `artist` 为空时使用。 |
| `lang` | `string` | `'auto'` | 信息语言。影响标题标点和字体栈，常用值有 `zh`、`ja`、`en`、`ru`、`fr`、`de`、`es`、`it`。 |
| `alt` | `string` | 自动 | 封面图片的替代文本。未设置时会根据歌曲名和专辑名生成。 |
| `title-style` | `string` | `'auto'` | 歌曲名样式。可选 `auto`、`plain`、`italic`、`cn-book`、`ja-kagi`、`ja-double-kagi`、`guillemet`、`french-guillemet`、`double-quote`、`single-quote`、`german-quote`。 |
| `title-prefix` | `string` | 自动 | 手动覆盖歌曲名左侧标点。 |
| `title-suffix` | `string` | 自动 | 手动覆盖歌曲名右侧标点。 |
| `album-style` | `string` | `'plain'` | 专辑名样式。设为 `auto` 时按 `lang` 自动加标点。 |
| `album-prefix` | `string` | 自动 | 手动覆盖专辑名左侧标点。 |
| `album-suffix` | `string` | 自动 | 手动覆盖专辑名右侧标点。 |
| `cover-position` | `string` | `'center'` | 封面裁切位置，对应 CSS `object-position`。封面容器固定占卡片正文宽度的约 `1/3`。 |

## 标题样式规则

歌曲名默认按 `lang` 自动处理，规则与歌词容器一致：

| `lang` | 自动样式 |
| --- | --- |
| `zh` | `《标题》` |
| `ja` | `「タイトル」` |
| `en` | 斜体 |
| `ru`、`uk`、`bg`、`sr` | `«标题»` |
| `fr` | `« 标题 »` |
| `de` | `„Titel“` |
| `es`、`it`、`pt` | `«标题»` |

如果不想自动加标点，可以手动指定：

```html
<SongCard
  cover="/covers/plain.jpg"
  album="Album"
  song="Song Title"
  artist="Artist"
  title-style="plain"
/>
```

专辑名默认保持原文。如果希望专辑名也自动加标点，可以设置 `album-style="auto"`：

```html
<SongCard
  cover="/covers/album.jpg"
  album="透明な色"
  album-style="auto"
  song="何度目の青空か？"
  artist="乃木坂46"
  lang="ja"
/>
```

## 字体与排版

`SongCard` 的字体兼容逻辑参考歌词容器：

- `lang="ja"` 时，标题优先使用 `Noto Serif CJK JP` / `Noto Serif JP`，作者信息优先使用日文字体栈。
- `lang="zh"` 时，标题优先使用 `Noto Serif CJK SC` / `Noto Serif SC`，作者信息优先使用简体中文字体栈。
- 文字设置了 `overflow-wrap: anywhere`，长标题、长作者名和多语言内容不会撑破正文宽度。
- 封面固定为圆角正方形，始终保持左图右文，并占卡片正文宽度的约 `1/3`。
- 卡片样式参考 README 课程跳转卡片，保留轻微悬浮、柔和阴影和低反射高光。
