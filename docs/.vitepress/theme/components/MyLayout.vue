<script lang="ts" setup>
// 1. 再次导入必要的组件
import DefaultTheme from 'vitepress/theme'
import MouseClick from "./MouseClick.vue";
import MouseFollower from "./MouseFollower.vue";
import GiscusComment from './GiscusComment.vue' // 评论模块
import BackToTop from './backtotop.vue'
</script>

<template>
  <!-- 使用默认主题的布局，并在顶部和文档之后插入自定义组件 -->
  <DefaultTheme.Layout>
    <!-- 所有页面顶部的特效组件 -->
    <template #layout-top>
      <MouseFollower />
      <MouseClick />
    </template>

    <!-- 文档内容之后的评论组件 -->
    <template #doc-after>
      <GiscusComment />
      <BackToTop />
    </template>
  </DefaultTheme.Layout>
</template>