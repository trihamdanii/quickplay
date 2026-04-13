<template>
  <div class="px-4 py-4">
    <!-- Input -->
    <div class="relative mb-4">
      <svg class="absolute left-3.5 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="2">
        <path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/>
      </svg>
      <input
        v-model="query"
        type="search"
        placeholder="Cari judul, anime, drama, film..."
        class="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm outline-none"
        style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.08); color: #fff;"
        @input="onSearch"
      />
      <button v-if="query" class="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center" style="background: rgba(255,255,255,0.1);" @click="query=''; results=[]">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
    </div>

    <!-- Provider filter (hanya provider yang support search) -->
    <div v-if="query" class="flex gap-2 overflow-x-auto mb-4" style="scrollbar-width: none;">
      <button
        v-for="p in searchableProviders"
        :key="p.id"
        class="flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
        :style="searchProvider === p.id
          ? 'background: linear-gradient(135deg,#9333EA,#DB2777); color:#fff;'
          : 'background: rgba(255,255,255,0.06); color:rgba(255,255,255,0.5); border: 1px solid rgba(255,255,255,0.08);'"
        @click="searchProvider = p.id; onSearch()"
      >
        {{ p.emoji }} {{ p.label }}
      </button>
    </div>

    <!-- Empty -->
    <div v-if="!query && !results.length" class="flex flex-col items-center pt-12 gap-3">
      <div class="w-16 h-16 rounded-2xl flex items-center justify-center mb-2" style="background: rgba(147,51,234,0.1);">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9333EA" stroke-width="1.5"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>
      </div>
      <p class="text-sm font-bold text-white">Cari konten favoritmu</p>
      <p class="text-xs text-center" style="color:rgba(255,255,255,0.35);">Ketik judul anime, drama, atau film</p>
      <div v-if="recentSearches.length" class="w-full mt-4">
        <div class="flex justify-between mb-3">
          <p class="text-xs font-bold text-white">Terkini</p>
          <button class="text-xs" style="color:#9333EA;" @click="recentSearches=[]">Hapus</button>
        </div>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="s in recentSearches" :key="s"
            class="px-3 py-1.5 rounded-xl text-xs font-medium"
            style="background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.7); border: 1px solid rgba(255,255,255,0.08);"
            @click="query=s; onSearch()"
          >{{ s }}</button>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-else-if="searching" class="grid grid-cols-2 gap-3">
      <div v-for="i in 6" :key="i" class="animate-pulse rounded-2xl" style="height: 200px; background: rgba(255,255,255,0.05);" />
    </div>

    <!-- No results -->
    <div v-else-if="query && !results.length && !searching" class="flex flex-col items-center pt-12 gap-2">
      <p class="text-sm font-bold text-white">Tidak ditemukan</p>
      <p class="text-xs" style="color:rgba(255,255,255,0.4);">Coba kata kunci atau provider lain</p>
    </div>

    <!-- Results -->
    <div v-else class="grid grid-cols-2 gap-3">
      <NuxtLink
        v-for="item in results" :key="item.id"
        :to="`/watch/${searchProvider}/${item.id}`"
        class="block active:opacity-80 transition-opacity"
      >
        <div class="w-full rounded-2xl mb-2 overflow-hidden relative" style="height: 200px; background: rgba(255,255,255,0.05);">
          <img v-if="item.cover" :src="item.cover" :alt="item.title" class="w-full h-full object-cover" loading="lazy" />
          <div v-else class="w-full h-full flex items-center justify-center" style="background: linear-gradient(135deg,#1e1b4b,#0d0d1a);">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(147,51,234,0.4)" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="2"/></svg>
          </div>
          <div v-if="item.rating" class="absolute top-2 left-2 flex items-center gap-0.5 px-1.5 py-0.5 rounded-lg" style="background: rgba(0,0,0,0.75);">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="#FBBF24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <span class="text-[10px] font-bold text-white">{{ item.rating }}</span>
          </div>
        </div>
        <p class="text-xs font-bold text-white truncate">{{ item.title }}</p>
        <p v-if="item.genre" class="text-[10px] mt-0.5 truncate" style="color:rgba(255,255,255,0.4);">{{ item.genre.split(',')[0] }}</p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSearch, PROVIDERS, type Provider, type ContentItem } from '~/composables/useApi'

useHead({ title: 'Cari | QuickPlay' })

// Provider yang support search endpoint
const searchableProviders = PROVIDERS.filter(p =>
  ['anime', 'moviebox', 'freereels', 'reelshort', 'flickreels', 'melolo'].includes(p.id)
)

const query = ref('')
const results = ref<ContentItem[]>([])
const searching = ref(false)
const searchProvider = ref<Provider>('anime')
const recentSearches = ref<string[]>(['Romance', 'Action', 'Isekai', 'Comedy'])

let debounceTimer: any
const onSearch = () => {
  clearTimeout(debounceTimer)
  if (!query.value.trim()) { results.value = []; return }
  searching.value = true
  debounceTimer = setTimeout(async () => {
    results.value = await useSearch(searchProvider.value, query.value)
    if (!recentSearches.value.includes(query.value)) {
      recentSearches.value.unshift(query.value)
      recentSearches.value = recentSearches.value.slice(0, 6)
    }
    searching.value = false
  }, 500)
}
</script>
