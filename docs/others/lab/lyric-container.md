# 歌词容器

这里记录 `LyricCard` / `LyricLine` 的用法样例，方便在正式笔记里复用前先检查展示效果。

## LyricCard

<LyricCard
  title="夢が僕らの太陽さ"
  artist="虹ヶ咲学園スクールアイドル同好会"
  lang="ja"
  qq-url="https://y.qq.com/n/ryqq/search?w=夢が僕らの太陽さ"
  netease-url="https://yq3.music.163.com/m/program?id=2500986660"
  album-cover="../songs/yume-taiyou.attachments/cover.JPG"
  album-cover-alt="夢が僕らの太陽さ 专辑封面"
>
  <LyricLine
    original="どんな時(とき)も夢(ゆめ)が僕(ぼく)らの太陽(たいよう)さ"
    translation="无论何时 梦想是我们的太阳"
  />
  <LyricLine
    original="風(かぜ)が雨(あめ)が激(はげ)しくても"
    translation="任凭狂风作乱暴雨作势"
  />
  <LyricLine
    original="思(おも)いだすんだ僕(ぼく)らを照(て)らす光(ひかり)があるよ"
    translation="也始终牢记 有一道光一直在照耀着我们"
  />
</LyricCard>

<LyricCard
  title="I Really Want to Stay at Your House"
  artist="Rosa Walton & Hallie Coggins"
  lang="en"
  title-style="italic"
  qq-url="https://y.qq.com/n/ryqq/search?w=I%20Really%20Want%20to%20Stay%20at%20Your%20House%20Rosa%20Walton"
  netease-url="https://music.163.com/#/search/m/?s=I%20Really%20Want%20to%20Stay%20at%20Your%20House"
>
  <LyricLine
    original="Because I miss you all the time"
    translation="因为我却时刻思念着你"
  />
</LyricCard>

<LyricCard
  title="Мёртвый вечер"
  artist="мой друг магнитофон"
  lang="ru"
  qq-url="https://y.qq.com/n/ryqq/search?w=Мёртвый%20вечер%20мой%20друг%20магнитофон"
  netease-url="https://music.163.com/#/search/m/?s=Мёртвый%20вечер%20мой%20друг%20магнитофон"
>
  <LyricLine
    original="Мёртвый вечер"
    translation="死去的夜晚"
  />
</LyricCard>

## 使用方法

最常用的写法是直接在 Markdown 里写 HTML/Vue 组件：

```html
<LyricCard
  title="夢が僕らの太陽さ"
  artist="虹ヶ咲学園スクールアイドル同好会"
  lang="ja"
  qq-url="https://y.qq.com/n/ryqq/search?w=夢が僕らの太陽さ"
  netease-url="https://yq3.music.163.com/m/program?id=2500986660"
  album-cover="../songs/yume-taiyou.attachments/cover.JPG"
  album-cover-alt="夢が僕らの太陽さ 专辑封面"
>
  <LyricLine
    original="どんな時(とき)も夢(ゆめ)が僕(ぼく)らの太陽(たいよう)さ"
    translation="无论何时 梦想是我们的太阳"
  />
  <LyricLine
    original="風(かぜ)が雨(あめ)が激(はげ)しくても"
    translation="任凭狂风作乱暴雨作势"
  />
  <LyricLine
    original="思(おも)いだすんだ僕(ぼく)らを照(て)らす光(ひかり)があるよ"
    translation="也始终牢记 有一道光一直在照耀着我们"
  />
</LyricCard>
```

`qq-url` 和 `netease-url` 会在歌词块左下角生成裸露的 SVG 图标。它们默认隐藏，鼠标进入歌词块或键盘聚焦歌词块内部时显示；歌词块本体不会跳转。

`album-cover` 会在歌词块右上角显示专辑图片，样式是较大的圆角矩形。它可以使用 public 路径、相对路径或外链；相对路径会自动转换成当前 Markdown 附近的 Vite 资源 URL。日语歌词块同时出现注音按钮时，注音按钮会自动排到封面左侧。歌词或翻译行数较少时，正文区会自动延展到专辑封面需要的最低高度，避免歌曲名贴近封面。

```html
<LyricCard
  title="夢が僕らの太陽さ"
  artist="虹ヶ咲学園スクールアイドル同好会"
  lang="ja"
  album-cover="../songs/yume-taiyou.attachments/cover.JPG"
  album-cover-alt="夢が僕らの太陽さ 专辑封面"
  album-cover-position="center top"
>
  <LyricLine original="どんな時(とき)も夢(ゆめ)が僕(ぼく)らの太陽(たいよう)さ" />
</LyricCard>
```

日文注音短写：

```html
<LyricLine original="君(きみ)と見(み)たい空(そら)" />
```

字体默认会按组件语言区分：`lang="ja"` 的原词使用 `Noto Serif CJK JP` / `Noto Serif JP`，中文原词使用 `Noto Serif CJK SC` / `Noto Serif SC`。翻译始终强制使用 `Noto Serif CJK SC` / `Noto Serif SC`，避免中文汉字继承日文字形。

如果前面有假名，或者你想明确指定哪一段文字接受注音，用 `｜` 标记范围：

```html
<LyricLine original="愛しい｜時間(じかん)" />
```

复杂排版也可以直接写原生 ruby：

```html
<LyricLine translation="想和你一起看见那片天空">
  <ruby>君<rt>きみ</rt></ruby>と
  <ruby>空<rt>そら</rt></ruby>を見たい
</LyricLine>
```

## LyricCard 参数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `title` | `string` | 必填 | 歌曲名或作品名。 |
| `artist` | `string` | `''` | 作者、歌手或组合名。 |
| `lang` | `string` | `'auto'` | 标题语言。影响自动标点和是否显示注音按钮，常用值有 `zh`、`ja`、`en`、`ru`、`fr`、`de`、`es`、`it`。 |
| `title-style` | `string` | `'auto'` | 标题样式。可选 `auto`、`plain`、`italic`、`cn-book`、`ja-kagi`、`ja-double-kagi`、`guillemet`、`french-guillemet`、`double-quote`、`single-quote`、`german-quote`。 |
| `title-prefix` | `string` | 自动 | 手动覆盖标题左侧标点。 |
| `title-suffix` | `string` | 自动 | 手动覆盖标题右侧标点。 |
| `qq-url` | `string` | `''` | QQ 音乐链接。设置后左下角显示裸 SVG 图标。 |
| `netease-url` | `string` | `''` | 网易云音乐链接。设置后左下角显示裸 SVG 图标。 |
| `qq` | `string` | `''` | `qq-url` 的短别名。 |
| `netease` | `string` | `''` | `netease-url` 的短别名。 |
| `album-cover` | `string` | `''` | 专辑图片。设置后显示在歌词块右上角，使用圆角矩形裁切。支持 public 路径、相对路径和外链。 |
| `album-cover-alt` | `string` | 自动 | 专辑图片替代文本。未设置时根据标题和作者生成。 |
| `album-cover-position` | `string` | `'center'` | 专辑图片裁切位置，对应 CSS `object-position`。 |
| `default-furigana` | `boolean` | `false` | 初始显示日文注音，但用户仍可点击按钮关闭。 |
| `force-furigana` | `boolean` | `false` | 强制显示日文注音，按钮显示为固定状态。 |
| `furigana` | `string` | `'auto'` | 注音控制模式。可选 `auto`、`open`、`show`、`hide`、`none`；其中 `show` 等同强制显示，`none` 隐藏注音按钮。 |

## LyricLine 参数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `original` | `string` | `''` | 原词。支持 `漢字(かな)` 和 `｜文字(かな)` 注音短写。 |
| `translation` | `string` | `''` | 翻译。字号会比原词小一号。 |
| `translation-lang` | `string` | `'zh-CN'` | 翻译行的语言标记。默认强制中文简体语境，避免日文组件中的中文继承日文字形。 |

## 标题样式规则

自动规则可以覆盖，不必完全依赖：

| `lang` | 自动样式 |
| --- | --- |
| `zh` | `《标题》` |
| `ja` | `「タイトル」` |
| `en` | 斜体 |
| `ru`、`uk`、`bg`、`sr` | `«标题»` |
| `fr` | `« 标题 »` |
| `de` | `„Titel“` |
| `es`、`it`、`pt` | `«标题»` |

手动覆盖示例：

```html
<LyricCard
  title="タイトル"
  artist="作者"
  lang="ja"
  title-style="ja-double-kagi"
/>

<LyricCard
  title="Custom Marks"
  artist="Author"
  title-style="plain"
  title-prefix="["
  title-suffix="]"
/>
```
