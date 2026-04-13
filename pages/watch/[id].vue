<template>
  <div>
    <!-- Loading -->
    <div v-if="loading" class="animate-pulse">
      <div class="w-full" style="height: 230px; background: rgba(255,255,255,0.05);" />
      <div class="px-4 mt-4 space-y-3">
        <div class="h-6 rounded-xl" style="background: rgba(255,255,255,0.05); width: 70%;" />
        <div class="h-4 rounded-xl" style="background: rgba(255,255,255,0.04); width: 50%;" />
        <div class="h-20 rounded-xl" style="background: rgba(255,255,255,0.03);" />
      </div>
    </div>

    <!-- Content -->
    <div v-else-if="drama">
      <!-- Video Player Area -->
      <div
        class="relative w-full flex items-center justify-center"
        style="height: 230px; background: #000;"
      >
        <div class="flex flex-col items-center gap-3">
          <button
            class="w-16 h-16 rounded-full flex items-center justify-center transition-all active:scale-90"
            style="background: linear-gradient(135deg, #9333EA, #DB2777);"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M5 3l14 9-14 9V3z"/></svg>
          </button>
          <span class="text-xs font-medium" style="color: rgba(255,255,255,0.5);">Klik untuk menonton</span>
        </div>
        <!-- Back button -->
        <button
          class="absolute top-4 left-4 w-9 h-9 rounded-xl flex items-center justify-center"
          style="background: rgba(0,0,0,0.5);"
          @click="$router.back()"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
        </button>
      </div>

      <!-- Info -->
      <div class="px-4 py-4">
        <!-- Title & Actions -->
        <div class="flex items-start justify-between gap-3 mb-3">
          <h1 class="text-xl font-black text-white tracking-tight leading-tight flex-1">{{ drama.title }}</h1>
          <button
            class="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
            style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.08);"
            @click="saved = !saved"
          >
            <svg v-if="!saved" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
            <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="#9333EA" stroke="none"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
          </button>
        </div>

        <!-- Meta badges -->
        <div class="flex items-center gap-2 flex-wrap mb-4">
          <div class="flex items-center gap-1 px-2 py-1 rounded-lg" style="background: rgba(251,191,36,0.1);">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="#FBBF24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <span class="text-xs font-bold" style="color: #FBBF24;">{{ drama.rating }}</span>
          </div>
          <span class="text-xs px-2 py-1 rounded-lg font-medium" style="background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.6);">{{ drama.episode }} Episode</span>
          <span class="text-xs px-2 py-1 rounded-lg font-medium" style="background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.6);">{{ drama.year }}</span>
          <span class="text-xs px-2 py-1 rounded-lg font-medium" style="background: rgba(147,51,234,0.15); color: #C084FC;">{{ drama.genre }}</span>
        </div>

        <!-- Synopsis -->
        <div class="mb-5">
          <h2 class="text-sm font-bold text-white mb-2">Sinopsis</h2>
          <p class="text-sm leading-relaxed" style="color: rgba(255,255,255,0.55);">
            {{ drama.synopsis }}
          </p>
        </div>

        <!-- Episode List -->
        <div>
          <h2 class="text-sm font-bold text-white mb-3">Daftar Episode</h2>
          <div class="grid grid-cols-5 gap-2">
            <button
              v-for="ep in drama.episode"
              :key="ep"
              class="py-2 rounded-xl text-sm font-bold transition-all active:scale-95"
              :style="ep === activeEp
                ? 'background: linear-gradient(135deg,#9333EA,#DB2777); color: white;'
                : 'background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.6);'"
              @click="activeEp = ep"
            >
              {{ ep }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Error -->
    <div v-else class="flex flex-col items-center justify-center py-20 px-4">
      <p class="text-white font-bold text-lg mb-2">Drama tidak ditemukan</p>
      <NuxtLink to="/" class="text-sm font-medium" style="color:#9333EA;">Kembali ke Beranda</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGetDramaDetail } from '~/composables/useApi'

const route = useRoute()
const id = route.params.id as string

useHead({ title: 'Nonton Drama | QuickPlay' })

const loading = ref(true)
const drama = ref<any>(null)
const saved = ref(false)
const activeEp = ref(1)

onMounted(async () => {
  drama.value = await useGetDramaDetail(id)
  if (drama.value) {
    useHead({ title: `${drama.value.title} | QuickPlay` })
  }
  loading.value = false
})
</script>
