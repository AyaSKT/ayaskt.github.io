<script setup lang="ts">
import { useData } from 'vitepress'
import { computed } from 'vue'
import { formatResolvedLastUpdated } from '../doc-meta-date.mjs'

const { page, frontmatter } = useData()

const lastUpdatedText = computed(() => {
  return formatResolvedLastUpdated(
    frontmatter.value.lastUpdated,
    page.value.lastUpdated
  )
})
</script>

<template>
  <div v-if="lastUpdatedText" class="LastUpdated">
    <p>{{ lastUpdatedText }}</p>
  </div>
</template>

<style>
.LastUpdated {
  color: var(--vp-c-text-2);
}
</style>
