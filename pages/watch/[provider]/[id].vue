<template>
  <div>
    <div v-if="loading" class="animate-pulse">
      <div class="w-full" style="height: 230px; background: rgba(255,255,255,0.05);" />
      <div class="px-4 mt-4 space-y-3">
        <div class="h-6 rounded-xl" style="background: rgba(255,255,255,0.05); width: 70%;" />
        <div class="h-4 rounded-xl" style="background: rgba(255,255,255,0.04); width: 50%;" />
        <div class="h-24 rounded-xl" style="background: rgba(255,255,255,0.03);" />
      </div>
    </div>

    <div v-else-if="detail">
      <!-- Video Area -->
      <div class="relative w-full flex items-center justify-center" style="height: 230px; background: #000;">
        <video
          v-if="watchData && watchData.videoUrl && !watchData.isM3u8"
          :src="watchData.videoUrl"
          class="w-full h-full object-contain"
          controls autoplay playsinline
        />
        <iframe
          v-else-if="watchData && watchData.embedUrl"
          :src="watchData.embedUrl"
          class="w-full h-full"
          frameborder="0" allowfullscreen
        />
        <div v-else class="flex flex-col items-center gap-3">
          <div class="w-16 h-16 rounded-full flex items-center justify-center" style="background: linear-gradient(135deg,#9333EA,#DB2777);">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M5 3l14 9-14 9V3z"/></svg>
          </div>
          <span class="text-xs font-medium" style="color: rgba(255,255,255,0.5);">
            {{ watchLoading ? 'Memuat video...' : 'Pilih episode untuk mulai' }}
          </span>
        </div>
        <button
          class="absolute top-4 left-4 w-9 h-9 rounded-xl flex items-center justify-center"
          style="background: rgba(0,0,0,0.6);"
          @click="$router.back()"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <div class="absolute top-4 right-4 px-2.5 py-1 rounded-lg text-[10px] font-bold" style="background: rgba(147,51,234,0.8); color: white;">
          {{ providerLabel }}
        </div>
      </div>

      <!-- Detail Info -->
      <div class="px-4 py-4">
        <div class="flex items-start justify-between gap-3 mb-3">
          <h1 class="text-xl font-black text-white tracking-tight leading-tight flex-1">{{ detail.item.title }}</h1>
          <button
            class="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
            style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.08);"
            @click="bookmarked = !bookmarked"
          >
            <svg v-if="!bookmarked" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
            <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="#9333EA" stroke="none"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
          </button>
        </div>

        <div class="flex items-center gap-2 flex-wrap mb-4">
          <div v-if="detail.item.rating" class="flex items-center gap-1 px-2 py-1 rounded-lg" style="background: rgba(251,191,36,0.1);">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="#FBBF24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <span class="text-xs font-bold" style="color:#FBBF24;">{{ detail.item.rating }}</span>
          </div>
          <span v-if="detail.item.episodeCount" class="text-xs px-2 py-1 rounded-lg font-medium" style="background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.6);">{{ detail.item.episodeCount }} Ep</span>
          <span v-if="detail.item.year" class="text-xs px-2 py-1 rounded-lg font-medium" style="background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.6);">{{ detail.item.year }}</span>
          <span v-if="detail.item.genre" class="text-xs px-2 py-1 rounded-lg font-medium" style="background: rgba(147,51,234,0.15); color: #C084FC;">{{ detail.item.genre.split(',')[0] }}</span>
        </div>

        <div v-if="detail.item.actors && detail.item.actors.length" class="mb-4">
          <p class="text-[10px] uppercase tracking-wider mb-1" style="color:rgba(255,255,255,0.3);">Pemeran</p>
          <p class="text-xs" style="color:rgba(255,255,255,0.65);">{{ detail.item.actors.slice(0,4).join(', ') }}</p>
        </div>

        <div v-if="detail.item.synopsis" class="mb-5">
          <h2 class="text-sm font-bold text-white mb-2">Sinopsis</h2>
          <p class="text-sm leading-relaxed" style="color: rgba(255,255,255,0.55);" :class="{ 'line-clamp-3': !showFull }">
            {{ detail.item.synopsis }}
          </p>
          <button v-if="detail.item.synopsis.length > 120" class="text-xs mt-1 font-bold" style="color:#9333EA;" @click="showFull = !showFull">
            {{ showFull ? 'Sembunyikan' : 'Selengkapnya' }}
          </button>
        </div>

        <!-- Extra: streams, subtitles, servers -->
        <div v-if="watchData && watchData.streams && watchData.streams.length" class="mb-4">
          <h2 class="text-sm font-bold text-white mb-2">Kualitas</h2>
          <div class="flex gap-2 flex-wrap">
            <button v-for="s in watchData.streams" :key="s.quality" class="px-3 py-1.5 rounded-xl text-xs font-bold" style="background: rgba(147,51,234,0.2); color: #C084FC;">{{ s.quality }}</button>
          </div>
        </div>
        <div v-if="watchData && watchData.subtitles && watchData.subtitles.length" class="mb-4">
          <h2 class="text-sm font-bold text-white mb-2">Subtitle</h2>
          <div class="flex gap-2 flex-wrap">
            <button v-for="sub in watchData.subtitles" :key="sub.lang" class="px-3 py-1.5 rounded-xl text-xs font-bold" style="background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.7);">{{ sub.lang }}</button>
          </div>
        </div>
        <div v-if="watchData && watchData.servers && watchData.servers.length" class="mb-4">
          <h2 class="text-sm font-bold text-white mb-2">Server</h2>
          <div class="flex gap-2 flex-wrap">
            <button v-for="srv in watchData.servers" :key="srv.name" class="px-3 py-1.5 rounded-xl text-xs font-bold" style="background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.7);">{{ srv.name }}</button>
          </div>
        </div>

        <!-- Episodes -->
        <div v-if="detail.episodes.length">
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-sm font-bold text-white">
              Daftar Episode
              <span class="text-xs font-medium ml-1" style="color:rgba(255,255,255,0.35);">{{ detail.episodes.length }} ep</span>
            </h2>
          </div>
          <div class="grid grid-cols-5 gap-2">
            <button
              v-for="ep in detail.episodes"
              :key="ep.id"
              class="py-2 rounded-xl text-sm font-bold transition-all active:scale-95"
              :style="activeEpId === ep.id
                ? 'background: linear-gradient(135deg,#9333EA,#DB2777); color: white;'
                : 'background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.6);'"
              @click="selectEpisode(ep)"
            >
              {{ ep.sequence ?? ep.episode ?? (ep.title?.replace(/[^0-9]/g,'') || '?') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="flex flex-col items-center justify-center py-20 px-4">
      <p class="text-white font-bold text-lg mb-2">Konten tidak ditemukan</p>
      <NuxtLink to="/" class="text-sm font-medium" style="color:#9333EA;">Kembali ke Beranda</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDetail, useWatch, PROVIDERS, type DetailResult, type Episode, type WatchResult, type Provider } from '~/composables/useApi'

const route = useRoute()
const provider = route.params.provider as Provider
const id = route.params.id as string

useHead({ title: 'Nonton | QuickPlay' })

const loading = ref(true)
const detail = ref<DetailResult | null>(null)
const watchData = ref<WatchResult | null>(null)
const activeEpId = ref<string | number | null>(null)
const bookmarked = ref(false)
const showFull = ref(false)
const watchLoading = ref(false)

const providerLabel = computed(() => PROVIDERS.find(p => p.id === provider)?.label ?? provider)

const selectEpisode = async (ep: Episode) => {
  activeEpId.value = ep.id
  watchLoading.value = true
  watchData.value = null
  const extra: Record<string, string> = {}
  if (provider === 'reelshort' && detail.value?.item._raw) {
    extra.bookId = String(detail.value.item._raw.bookId ?? '')
    extra.chapterId = String(ep.id)
    extra.filteredTitle = String(detail.value.item._raw.filteredTitle ?? id)
  }
  watchData.value = await useWatch(provider, ep.id, extra)
  watchLoading.value = false
}

onMounted(async () => {
  detail.value = await useDetail(provider, id)
  if (detail.value) {
    useHead({ title: `${detail.value.item.title} | QuickPlay` })
    if (detail.value.episodes.length) {
      await selectEpisode(detail.value.episodes[0])
    }
  }
  loading.value = false
})
</script>
