<template>
  <div class="py-4">
    <div class="px-4 mb-4">
      <h1 class="text-xl font-black text-white">Jelajahi</h1>
    </div>

    <!-- Provider tabs scroll -->
    <div class="flex gap-2 px-4 overflow-x-auto mb-5" style="scrollbar-width: none;">
      <button
        v-for="p in PROVIDERS"
        :key="p.id"
        class="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all active:scale-95"
        :style="activeProvider === p.id
          ? 'background: linear-gradient(135deg,#9333EA,#DB2777); color: #fff;'
          : 'background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.6); border: 1px solid rgba(255,255,255,0.08);'"
        @click="setProvider(p.id)"
      >
        <span style="font-size:14px;">{{ p.emoji }}</span>
        {{ p.label }}
      </button>
    </div>

    <!-- Sections or flat grid -->
    <template v-if="loading">
      <div class="px-4 grid grid-cols-2 gap-3">
        <div v-for="i in 8" :key="i" class="animate-pulse rounded-2xl" style="height: 210px; background: rgba(255,255,255,0.05);" />
      </div>
    </template>

    <template v-else-if="sections.length">
      <div v-for="sec in sections" :key="sec.name" class="mb-6">
        <h2 v-if="sec.name" class="text-sm font-black text-white px-4 mb-3">{{ sec.name }}</h2>
        <div class="px-4 grid grid-cols-2 gap-3">
          <NuxtLink
            v-for="item in sec.items"
            :key="item.id"
            :to="`/watch/${activeProvider}/${item.id}`"
            class="block active:opacity-80 transition-opacity"
          >
            <div class="w-full rounded-2xl mb-2 overflow-hidden relative" style="height: 210px; background: rgba(255,255,255,0.05);">
              <img v-if="item.cover" :src="item.cover" :alt="item.title" class="w-full h-full object-cover" loading="lazy" />
              <div v-else class="w-full h-full flex items-center justify-center" style="background: linear-gradient(135deg,#1e1b4b,#0d0d1a);">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(147,51,234,0.4)" stroke-width="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="2"/><path d="M7 2v20M17 2v20M2 12h20"/>
                </svg>
              </div>
              <div v-if="item.rating" class="absolute top-2 left-2 flex items-center gap-0.5 px-1.5 py-0.5 rounded-lg" style="background: rgba(0,0,0,0.75);">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="#FBBF24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                <span class="text-[10px] font-bold text-white">{{ item.rating }}</span>
              </div>
              <div v-if="item.episodeCount" class="absolute bottom-2 right-2 px-1.5 py-0.5 rounded-lg" style="background: rgba(147,51,234,0.85);">
                <span class="text-[10px] font-bold text-white">Ep {{ item.episodeCount }}</span>
              </div>
            </div>
            <p class="text-xs font-bold text-white truncate">{{ item.title }}</p>
            <p v-if="item.genre" class="text-[10px] mt-0.5 truncate" style="color: rgba(255,255,255,0.4);">{{ item.genre.split(',')[0] }}</p>
          </NuxtLink>
        </div>
      </div>
    </template>

    <div v-else class="flex flex-col items-center py-16">
      <p class="text-sm" style="color: rgba(255,255,255,0.3);">Tidak ada konten tersedia</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRank, PROVIDERS, type Provider, type RankSection } from '~/composables/useApi'

useHead({ title: 'Jelajahi | QuickPlay' })

const route = useRoute()
const activeProvider = ref<Provider>((route.query.provider as Provider) ?? 'melolo')
const loading = ref(true)
const sections = ref<RankSection[]>([])

const setProvider = async (id: Provider) => {
  activeProvider.value = id
  loading.value = true
  sections.value = []
  sections.value = await useRank(id, 1, 20)
  loading.value = false
}

onMounted(() => setProvider(activeProvider.value))
</script>
