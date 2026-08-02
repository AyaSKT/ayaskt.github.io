<script lang="ts">
import { ref, type Ref } from 'vue'

interface HitokotoState {
  text: Ref<string>
  pending?: Promise<void>
}

const hitokotoStates = new Map<string, HitokotoState>()

function normalizeScope(scope: string) {
  return scope.trim() || 'home'
}

function fallbackHitokoto(scope: string) {
  return scope === 'timeline'
    ? '回望来路，每一页都算数。'
    : ':D 你今天过得如何？'
}

function getHitokotoState(scope: string) {
  const key = normalizeScope(scope)
  const existing = hitokotoStates.get(key)
  if (existing) return existing

  const state: HitokotoState = {
    text: ref(fallbackHitokoto(key)),
  }
  hitokotoStates.set(key, state)
  return state
}

function isUsedByAnotherScope(scope: string, sentence: string) {
  return [...hitokotoStates.entries()].some(([key, state]) => (
    key !== scope && state.text.value === sentence
  ))
}

async function loadHitokoto(scope: string) {
  const key = normalizeScope(scope)
  const state = getHitokotoState(key)
  if (state.pending) return state.pending

  state.pending = (async () => {
    try {
      for (let attempt = 0; attempt < 4; attempt += 1) {
        const res = await fetch('https://v1.hitokoto.cn', { cache: 'no-store' })
        if (!res.ok) throw new Error(`Hitokoto request failed with ${res.status}`)

        const data = await res.json()
        const sentence = typeof data.hitokoto === 'string' ? data.hitokoto.trim() : ''
        if (sentence && !isUsedByAnotherScope(key, sentence)) {
          state.text.value = sentence
          return
        }
      }

      state.text.value = fallbackHitokoto(key)
    } catch {
      state.text.value = fallbackHitokoto(key)
    }
  })()

  return state.pending
}
</script>

<script setup lang="ts">
import { onMounted } from 'vue'

const { scope = 'home' } = defineProps<{
  scope?: string
}>()

const hitokotoText = getHitokotoState(scope).text

onMounted(() => {
  void loadHitokoto(scope)
})
</script>

<template>
  <p class="hero-hitokoto">
    {{ hitokotoText }}
  </p>
</template>

<style scoped>
.hero-hitokoto {
  margin: 0;
  text-align: center;
  font-size: 1.02rem;
  line-height: 1.6;
  color: var(--vp-c-text-3);
  opacity: 0.95;
}

.hero-hitokoto.mobile-hitokoto {
  margin: 18px auto 0;
  width: min(88vw, 360px);
}

.hero-hitokoto.desktop-hitokoto {
  display: none;
  position: absolute;
  top: calc(50% + 140px);
  left: 50%;
  transform: translateX(-50%);
  width: min(88vw, 360px);
}

@media (min-width: 640px) {
  .hero-hitokoto.mobile-hitokoto {
    margin-top: 22px;
  }

  .hero-hitokoto.desktop-hitokoto {
    top: calc(50% + 172px);
  }
}

@media (min-width: 960px) {
  .hero-hitokoto.mobile-hitokoto {
    display: none;
  }

  .hero-hitokoto.desktop-hitokoto {
    display: block;
    top: calc(50% + 200px);
    width: 360px;
  }
}
</style>
