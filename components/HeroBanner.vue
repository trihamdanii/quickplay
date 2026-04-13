<template>
  <div class="relative w-full overflow-hidden" style="height: 400px;">
    <div v-if="loading || !slideItems.length" class="w-full h-full animate-pulse" style="background: rgba(255,255,255,0.03);" />
    <div v-else class="relative w-full h-full">
      <transition name="fade">
        <div :key="current" class="absolute inset-0">
          <div class="absolute inset-0" :style="`background: linear-gradient(135deg, ${bgColors[current % bgColors.length]})`" />
          <img
            v-if="currentItem && currentItem.cover"
            :src="currentItem.cover"
            :alt="currentItem.title"
            class="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </transition>
      <div class="absolute inset-0" style="background: linear-gradient(to top, rgba(15,23,42,0.97) 0%, rgba(15,23,42,0.2) 55%, transparent 100%);" />
      <div class="absolute inset-0 flex flex-col justify-end p-5 pb-7">
        <div class="flex gap-2 mb-2">
          <span class="text-xs px-2.5 py-0.5 rounded-full font-semibold" style="background: rgba(147,51,234,0.35); color: #C084FC;">
            {{ providerLabel }}
          </span>
          <span v-if="currentItem && currentItem.genre" class="text-xs px-2.5 py-0.5 rounded-full font-semibold" style="background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.7);">
            {{ currentItem.genre.split(',')[0] }}
          </span>
        </div>
        <h1 class="text-2xl font-black text-white mb-1 tracking-tight leading-tight">
          {{ currentItem ? currentItem.title : '' }}
        </h1>
        <div class="flex items-center gap-3 mb-4">
          <div v-if="currentItem && currentItem.rating" class="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#FBBF24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <span class="text-xs font-bold text-white">{{ currentItem.rating }}</span>
          </div>
          <span v-if="currentItem && currentItem.episodeCount" class="text-xs" style="color:rgba(255,255,255,0.5);">
            {{ currentItem.episodeCount }} Episode
          </span>
          <span v-if="currentItem && currentItem.year" class="text-xs" style="color:rgba(255,255,255,0.5);">
            {{ currentItem.year }}
          </span>
        </div>
        <div class="flex gap-3">
          <NuxtLink
            v-if="currentItem"
            :to="`/watch/${currentItem.provider}/${currentItem.id}`"
            class="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white transition-all active:scale-95"
            style="background: linear-gradient(135deg, #9333EA, #DB2777);"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3l14 9-14 9V3z"/></svg>
            Tonton
          </NuxtLink>
          <button
            class="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white transition-all active:scale-95"
            style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15);"
            @click="saved = !saved"
          >
            <svg v-if="!saved" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
            <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>
            {{ saved ? 'Tersimpan' : 'Simpan' }}
          </button>
        </div>
      </div>
      <div class="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
        <button
          v-for="(_, i) in slideItems"
          :key="i"
          class="rounded-full transition-all duration-300"
          :style="i === current ? 'width:20px;height:4px;background:#9333EA;' : 'width:4px;height:4px;background:rgba(255,255,255,0.25);'"
          @click="current = i"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PROVIDERS, type ContentItem } from '~/composables/useApi'

const props = defineProps<{
  items: ContentItem[]
  loading: boolean
}>()

const bgColors = [
  '#1e1b4b 0%, #0F172A 60%, #1a0533 100%',
  '#0c1a2e 0%, #0F172A 60%, #0d1f3c 100%',
  '#1a0f2e 0%, #0F172A 60%, #2d0b3a 100%',
  '#0f1a1a 0%, #0F172A 60%, #0a2020 100%',
  '#1f1000 0%, #0F172A 60%, #2a1500 100%',
]

const current = ref(0)
const saved = ref(false)
const slideItems = computed(() => props.items.slice(0, 5))
const currentItem = computed(() => slideItems.value[current.value] ?? null)
const providerLabel = computed(() => {
  if (!currentItem.value) return ''
  return PROVIDERS.find(p => p.id === currentItem.value!.provider)?.label ?? ''
})

let timer: any
onMounted(() => {
  timer = setInterval(() => {
    if (slideItems.value.length > 1) {
      current.value = (current.value + 1) % slideItems.value.length
    }
  }, 4500)
})
onUnmounted(() => clearInterval(timer))
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.6s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
