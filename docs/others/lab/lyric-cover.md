---
aside: true
outline: deep
---

# LyricCover

`LyricCover` 是带封面图的歌词容器。默认状态下它按普通笔记图片显示；鼠标悬停或键盘聚焦后，封面会淡化为毛玻璃背景，歌词内容复用 `LyricCard` / `LyricLine` 的排版与交互。

## 样例

<LyricCover
  image="lyric-cover.attachments/demo-cover.jpg"
  title="夜航回声"
  artist="北屿乐队"
  lang="zh"
  qq-url="https://y.qq.com/"
  netease-url="https://music.163.com/"
>
  <LyricLine
    original="雾把跑道铺成一条安静的河"
    translation="The fog turns the runway into a quiet river"
  />
  <LyricLine
    original="你在灯下回头，像星光刚刚降落"
    translation="You turn beneath the light, like starlight touching down"
  />
</LyricCover>

## 使用方法

```html
<LyricCover
  image="lyric-cover.attachments/demo-cover.jpg"
  title="夜航回声"
  artist="北屿乐队"
  lang="zh"
>
  <LyricLine
    original="雾把跑道铺成一条安静的河"
    translation="The fog turns the runway into a quiet river"
  />
</LyricCover>
```

`image` 可以使用 public 路径、相对路径或外链；相对路径会在 Markdown 编译时转换成 Vite 资源 URL。组件也接受 `src` / `cover` 作为图片路径别名。

编译时会尝试读取本地图片亮度，并自动注入 `text-tone="light"` 或 `text-tone="dark"`，让毛玻璃层和歌词文字色根据封面明暗调整。无法读取亮度时会回退到当前站点主题色。

如果某篇笔记被 `CourseIndex` 读取，并且正文里出现 `LyricCover`，课程目录会优先取正文第一个 `LyricCover` 的图片作为该笔记的预览封面图。没有 `LyricCover` 时，仍按原逻辑回退到正文第一张 Markdown 图片。

## LyricCover 参数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `image` | `string` | `''` | 封面图片路径。支持 public 路径、相对路径和外链。 |
| `src` / `cover` | `string` | `''` | `image` 的别名。 |
| `alt` / `image-alt` | `string` | 自动 | 封面图片替代文本。未设置时根据标题和作者生成。 |
| `image-position` | `string` | `'center'` | 封面与背景图裁切位置，对应 CSS `object-position`。 |
| `max-width` | `string` | `'100%'` | 图片最大宽度。默认跟随普通笔记图片的最大宽度。 |
| `aspect-ratio` | `string` | `''` | 可选固定比例，例如 `16 / 9`。未设置时优先使用图片自身比例。 |
| `text-tone` | `string` | `'auto'` | 可选 `auto`、`light`、`dark`。编译期能判断本地图片亮度时会自动补入。 |

歌词、标题、作者、注音和音乐链接参数沿用 `LyricCard`：

```html
<LyricCover
  image="cover.jpg"
  title="タイトル"
  artist="作者"
  lang="ja"
  furigana="open"
  netease-url="https://music.163.com/"
>
  <LyricLine original="君(きみ)と見(み)たい空(そら)" />
</LyricCover>
```
