---
aside: true
outline: deep
---

# SongCard

这里记录 `SongCard` 的用法样例。它适合写在正文中，用来展示歌曲的专辑封面、专辑名、歌曲名、作者或歌手等信息。设置网易云歌曲 ID 后，封面会优先从网易云歌曲详情中获取。

## 样例

<SongCard
  cover="/1.jpg"
  album="光るなら"
  song="光るなら"
  artist="Goose house"
  lang="ja"
  song-id="29732992"
  lyric-preview="雨上がりの空"
  translation-preview="雨后的天空"
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
  album="光るなら"
  song="光るなら"
  artist="Goose house"
  lang="ja"
  song-id="29732992"
  lyric-preview="雨上がりの空"
  translation-preview="雨后的天空"
>
  可在这里补充发行年份、作曲、编曲、引用来源或正文备注。
</SongCard>
```

`cover` 可以是站点 public 路径、相对路径或外链。以 `/` 开头的路径会自动经过 VitePress `base` 处理；相对路径保持原样，适合引用当前文档附近的附件图片。若设置了 `song-id`、`netease-id` 或 `netease-url`，组件会优先使用网易云接口返回的专辑封面，`cover` 仅作为接口失败或无网易云 ID 时的兜底。

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

## 播放功能

给 `SongCard` 添加 `song-id`、`netease-id` 或 `netease-url` 后，卡片会显示一个迷你播放控制条。首次点击播放时，组件会通过网易云代理接口获取真实音频地址和歌词，并自动暂停页面内其他正在播放的 `SongCard`。

```html
<SongCard
  cover="/covers/hitchcock.jpg"
  album="負け犬にアンコールはいらない"
  song="ヒッチコック"
  artist="ヨルシカ"
  lang="ja"
  netease-url="https://music.163.com/song?id=1865418518"
/>
```

这类卡片可以省略 `cover`。组件挂载后会请求 `/song/detail` 读取 `al.picUrl` 作为封面；如果请求失败，再回退到手动传入的 `cover`。播放开始前，歌词预览区域保持留白；真正开始播放后，第一句歌词向上淡入，后续歌词切换时旧句向上淡出，新句从下方向上淡入。歌词过长时会按视觉长度自动缩小字号，并最多换行显示两行，避免直接截断。没有专辑名的卡片会把歌词区切换为原文队列：第一行显示当前原文，第二行用较浅颜色预览下一句原文，不显示翻译。

默认接口来自 `NeteaseMiniPlayer` 的公开代理：`https://api.hypcvgm.top/NeteaseMiniPlayer/nmp.php`。该接口可能受网络、版权或服务状态影响；需要更稳定时可部署自己的 NeteaseCloudMusicApi 兼容代理，并用 `api-base` 覆盖：

```html
<SongCard
  cover="/covers/hitchcock.jpg"
  song="ヒッチコック"
  artist="ヨルシカ"
  song-id="1865418518"
  api-base="https://your-api.example.com"
  audio-level="standard"
/>
```

如果已经有可直接播放的音频文件，可以使用 `audio-url`，此时不会请求网易云接口：

```html
<SongCard
  cover="/covers/local.jpg"
  song="Local Demo"
  artist="Aya Sketch"
  audio-url="/audio/local-demo.mp3"
/>
```

本地音频若需要同步歌词，可以传入 LRC 文本：

```html
<SongCard
  cover="/covers/local.jpg"
  song="Local Demo"
  artist="Aya Sketch"
  audio-url="/audio/local-demo.mp3"
  lyrics="[00:00.00]第一句歌词
[00:05.00]第二句歌词"
  translated-lyrics="[00:00.00]First line
[00:05.00]Second line"
/>
```

## SongCard 参数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `cover` | `string` | `''` | 专辑封面图片兜底。显示为左侧圆角方形图，默认 `object-fit: cover`；设置网易云歌曲 ID 时优先使用网易云封面。 |
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
| `song-id` | `string \| number` | `''` | 网易云单曲 ID。设置后显示播放控制条。 |
| `netease-id` | `string \| number` | `''` | `song-id` 的别名。 |
| `netease-url` | `string` | `''` | 网易云歌曲链接。组件会自动提取链接中的歌曲 ID。 |
| `audio-url` | `string` | `''` | 可直接播放的音频文件地址。设置后优先使用它，不请求网易云接口。 |
| `api-base` | `string` | NMP 公开代理 | 网易云 API 兼容代理地址。 |
| `audio-level` | `string` | `'exhigh'` | 网易云 `/song/url/v1` 的音质参数。获取失败时会降级为 `standard`。 |
| `autoplay` | `boolean` | `false` | 是否挂载后尝试自动播放；浏览器通常要求用户交互后才能真正出声。 |
| `lyric-preview` | `string` | `''` | 歌词原文预览兜底。网易云或 LRC 歌词不可用时，播放开始后显示这一句。 |
| `preview` | `string` | `''` | `lyric-preview` 的短别名。 |
| `translation-preview` | `string` | `''` | 歌词翻译预览兜底。固定使用简中 Noto Serif 字体栈，避免日文卡片中的中文翻译继承日文字形。 |
| `lyrics` | `string` | `''` | 本地 LRC 原文歌词。适合 `audio-url` 绑定本地音频时使用。 |
| `translated-lyrics` | `string` | `''` | 本地 LRC 翻译歌词。时间戳与 `lyrics` 对齐时会同步显示。 |

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
- 设置网易云歌曲 ID 时，封面优先来自网易云 `/song/detail` 的专辑图；未返回时使用 `cover` 兜底。
- 卡片样式参考 README 课程跳转卡片，保留轻微悬浮、柔和阴影和低反射高光。
- 歌词预览的字体规则参考 `LyricCard` / `LyricLine`：原文按 `lang` 选择 JP / SC serif 字体栈，翻译始终使用 `Noto Serif CJK SC` / `Noto Serif SC`。
- 歌词预览播放前保持留白；开始播放后第一句向上淡入，后续切换时旧句向上淡出，新句从下方向上淡入。
- 歌词预览支持长句自适应：原文和翻译都会按视觉长度分档缩小字号，并允许最多两行换行显示。
- 未设置 `album` 时，歌词预览改为两行原文队列：当前句在第一行，下一句以浅色显示在第二行，翻译会隐藏。
- 播放控制条包含播放/暂停、进度拖动、时间显示与音量按钮；桌面端鼠标悬停或键盘聚焦音量按钮时弹出音量条，移动端会隐藏音量控制以保证排版稳定。
