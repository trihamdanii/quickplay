<template>
  <section class="mb-6">
    <div class="flex items-center justify-between px-4 mb-3">
      <h2 class="text-base font-black text-white tracking-tight">{{ title }}</h2>
      <NuxtLink
        :to="`/discover?provider=${provider}`"
        class="flex items-center gap-0.5 text-xs font-bold transition-opacity active:opacity-60"
        style="color: #9333EA;"
      >
        Lihat Semua
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      </NuxtLink>
    </div>

    <div class="flex gap-3 px-4 overflow-x-auto" style="scrollbar-width: none;">
      <template v-if="loading">
        <div v-for="i in 6" :key="i" class="flex-shrink-0 animate-pulse" style="width: 136px;">
          <div class="w-full rounded-2xl mb-2" style="height: 210px; background: rgba(255,255,255,0.05);" />
          <div class="h-3 rounded-full mb-1.5" style="background: rgba(255,255,255,0.05); width: 80%;" />
          <div class="h-3 rounded-full" style="background: rgba(255,255,255,0.03); width: 50%;" />
        </div>
      </template>

      <template v-else-if="items.length">
        <NuxtLink
          v-for="item in items"
          :key="item.id"
          :to="`/watch/${provider}/${item.id}`"
          class="flex-shrink-0 active:opacity-80 transition-opacity"
          style="width: 136px;"
        >
          <div class="w-full rounded-2xl mb-2 overflow-hidden relative" style="height: 210px; background: rgba(255,255,255,0.05);">
            <img
              v-if="item.cover"
              :src="item.cover"
              :alt="item.title"
              class="w-full h-full object-cover"
              loading="lazy"
            />
            <div v-else class="w-full h-full flex items-center justify-center" style="background: linear-gradient(135deg,#1e1b4b,#0d0d1a);">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(147,51,234,0.4)" stroke-width="1.5">
                <rect x="2" y="2" width="20" height="20" rx="2"/><path d="M7 2v20M17 2v20M2 12h20"/>
              </svg>
            </div>
            <!-- Rating badge -->
            <div v-if="item.rating" class="absolute top-2 left-2 flex items-center gap-0.5 px-1.5 py-0.5 rounded-lg" style="background: rgba(0,0,0,0.75);">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="#FBBF24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <span class="text-[10px] font-bold text-white">{{ item.rating }}</span>
            </div>
            <!-- Episode count -->
            <div v-if="item.episodeCount" class="absolute bottom-2 right-2 px-1.5 py-0.5 rounded-lg" style="background: rgba(147,51,234,0.85);">
              <span class="text-[10px] font-bold text-white">Ep {{ item.episodeCount }}</span>
            </div>
          </div>
          <p class="text-xs font-bold text-white truncate">{{ item.title }}</p>
          <p class="text-[10px] mt-0.5" style="color: rgba(255,255,255,0.4);">
            {{ providerLabel }} {{ item.year ? '• ' + item.year : '' }}
          </p>
        </NuxtLink>
      </template>

      <div v-else class="px-2 py-8 text-xs" style="color: rgba(255,255,255,0.3);">Tidak ada konten</div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { PROVIDERS, type ContentItem, type Provider } from '~/composables/useApi'

const props = defineProps<{
  title: string
  provider: Provider
  items: ContentItem[]
  loading: boolean
}>()

const providerLabel = computed(
  () => PROVIDERS.find(p => p.id === props.provider)?.label ?? props.provider
)
</script>
