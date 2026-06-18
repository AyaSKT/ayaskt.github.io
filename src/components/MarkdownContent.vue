<script setup lang="ts">
import { computed, defineComponent, onMounted } from 'vue/dist/vue.esm-bundler.js'
import CourseIndex from '../../docs/.vitepress/theme/components/CourseIndex.vue'
import LyricCard from '../../docs/.vitepress/theme/components/LyricCard.vue'
import LyricLine from '../../docs/.vitepress/theme/components/LyricLine.vue'
import LyricCover from '../../docs/.vitepress/theme/components/LyricCover.vue'
import SongCard from '../../docs/.vitepress/theme/components/SongCard.vue'
import MindMap from '../../docs/.vitepress/theme/components/MindMap.vue'
import Linkcard from '../../docs/.vitepress/theme/components/Linkcard.vue'
import { __setVitePressCompatState } from '../runtime/vitepress'

const props = withDefaults(defineProps<{
  html: string
  path: string
  frontmatter?: Record<string, unknown>
  page?: Record<string, unknown>
}>(), {
  frontmatter: () => ({}),
  page: () => ({}),
})

const safeHtml = computed(() => props.html
  .replace(/{{/g, '&#123;&#123;')
  .replace(/}}/g, '&#125;&#125;'))

const RuntimeContent = computed(() => defineComponent({
  name: 'RuntimeMarkdownContent',
  components: {
    CourseIndex,
    courseindex: CourseIndex,
    'course-index': CourseIndex,
    LyricCard,
    lyriccard: LyricCard,
    'lyric-card': LyricCard,
    LyricLine,
    lyricline: LyricLine,
    'lyric-line': LyricLine,
    LyricCover,
    lyriccover: LyricCover,
    'lyric-cover': LyricCover,
    SongCard,
    songcard: SongCard,
    'song-card': SongCard,
    MindMap,
    mindmap: MindMap,
    'mind-map': MindMap,
    Mycomponent: Linkcard,
    mycomponent: Linkcard,
  },
  template: `<div class="vp-doc">${safeHtml.value}</div>`,
}))

onMounted(() => {
  __setVitePressCompatState({
    path: props.path,
    frontmatter: props.frontmatter,
    page: props.page,
  })
})
</script>

<template>
  <component :is="RuntimeContent" />
</template>
