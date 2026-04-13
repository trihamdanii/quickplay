<template>
  <div>
    <HeroBanner :items="heroItems" :loading="heroLoading" />

    <div class="mt-6 space-y-2 pb-4">
      <ContentSection
        v-for="sec in sections"
        :key="sec.provider + sec.name"
        :title="sec.name"
        :provider="sec.provider"
        :items="sec.items"
        :loading="sec.loading"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRank, PROVIDERS, type Provider, type ContentItem } from '~/composables/useApi'

useHead({ title: 'Beranda | QuickPlay' })

interface Section {
  name: string
  provider: Provider
  items: ContentItem[]
  loading: boolean
}

const heroItems = ref<ContentItem[]>([])
const heroLoading = ref(true)

// Section beranda: tampilkan satu section dari beberapa provider
const sections = ref<Section[]>([
  { name: 'Pilihan Melolo',         provider: 'melolo',     items: [], loading: true },
  { name: 'Drama Terpopuler',       provider: 'dramabox',   items: [], loading: true },
  { name: 'Anime Terbaru',          provider: 'anime',      items: [], loading: true },
  { name: 'MovieBox Highlights',    provider: 'moviebox',   items: [], loading: true },
  { name: 'ReelShort',              provider: 'reelshort',  items: [], loading: true },
  { name: 'Film Indonesia',         provider: 'sfilmindo',  items: [], loading: true },
  { name: 'FreeReels',              provider: 'freereels',  items: [], loading: true },
  { name: 'Donghua',                provider: 'donghua',    items: [], loading: true },
])

onMounted(async () => {
  // Load tiap section secara paralel, satu per satu update saat siap
  sections.value.forEach(async (sec, idx) => {
    const ranks = await useRank(sec.provider, 1, 12)
    const items = ranks.flatMap(r => r.items).slice(0, 12)
    sections.value[idx].items = items
    sections.value[idx].loading = false

    // Hero pakai section pertama yang sudah ada data
    if (heroLoading.value && items.length) {
      heroItems.value = items.slice(0, 5)
      heroLoading.value = false
    }
  })
})
</script>
