<template>
  <div class="giscus-comment" style="margin-top: 2rem">
    <Giscus
      id="comments"
      :key="route.path"
      repo="AyaSKT/notes"
      repo-id="R_kgDORmImBg"
      category="Announcements"
      category-id="DIC_kwDORmImBs4C4Trq"
      mapping="pathname"
      strict="0"
      reactions-enabled="1"
      emit-metadata="0"
      input-position="top"
      lang="zh-CN"
      loading="lazy"
      :theme="isDark ? 'dark' : 'light'"
    ></Giscus>
  </div>
</template>

<script setup>
import Giscus from '@giscus/vue'
import { useRoute, useData } from 'vitepress'

const route = useRoute()
const { isDark } = useData()
</script>
