# 歌词容器

这里记录 `LyricCard` / `LyricLine` 的用法样例，方便在正式笔记里复用前先检查展示效果。

## LyricCard

<LyricCard
  title="再下一场太阳雨吧"
  artist="虹ヶ咲学園スクールアイドル同好会"
  lang="ja"
  qq-url="https://y.qq.com/"
  netease-url="https://music.163.com/"
>
  <LyricLine
    original="雨上(あめあ)がりの空(そら)に、小(ちい)さな光(ひかり)を置(お)いた"
    translation="雨后的天空里，我放下一点小小的光"
  />
  <LyricLine
    original="君(きみ)と見(み)たい景色(けしき)だけ、まだ胸(むね)の奥(おく)で鳴(な)っている"
    translation="只想与你看见的风景，还在心底轻轻作响"
  />
  <LyricLine
    original="愛しい｜時間(じかん)ほど、そっと名前(なまえ)を呼(よ)びたくなる"
    translation="越是珍贵的时间，越想轻轻呼唤它的名字"
  />
</LyricCard>

<LyricCard
  title="Paper Moon Signal"
  artist="Aya Sketch"
  lang="en"
  title-style="italic"
  qq-url="https://y.qq.com/"
>
  <LyricLine
    original="A paper moon keeps watch above the station lights"
    translation="纸月亮守在车站灯光之上"
  />
  <LyricLine
    original="I fold the night, and save the quieter side"
    translation="我折起夜晚，留下更安静的一面"
  />
</LyricCard>

<LyricCard
  title="Дорога к дождю"
  artist="Sever Notebook"
  lang="ru"
  netease-url="https://music.163.com/"
>
  <LyricLine
    original="Свет у окна медленно тает"
    translation="窗边的光慢慢融化"
  />
  <LyricLine
    original="Город хранит дорогу к дождю"
    translation="城市保存着通向雨的路"
  />
</LyricCard>

## 使用方法

最常用的写法是直接在 Markdown 里写 HTML/Vue 组件：

```html
<LyricCard
  title="再下一场太阳雨吧"
  artist="虹ヶ咲学園スクールアイドル同好会"
  lang="ja"
  qq-url="https://y.qq.com/"
  netease-url="https://music.163.com/"
>
  <LyricLine
    original="雨上(あめあ)がりの空(そら)"
    translation="雨后的天空"
  />
  <LyricLine
    original="愛しい｜時間(じかん)"
    translation="珍贵的时间"
  />
</LyricCard>
```

`qq-url` 和 `netease-url` 会在歌词块左下角生成裸露的 SVG 图标。它们默认隐藏，鼠标进入歌词块或键盘聚焦歌词块内部时显示；歌词块本体不会跳转。

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
