<template>
  <div class="px-4 py-4">
    <h1 class="text-xl font-black text-white mb-4">Komunitas</h1>

    <!-- Tabs -->
    <div class="flex gap-1 mb-5 p-1 rounded-xl" style="background: rgba(255,255,255,0.04);">
      <button
        v-for="tab in tabs"
        :key="tab"
        class="flex-1 py-2 rounded-xl text-xs font-bold transition-all"
        :style="activeTab === tab
          ? 'background: linear-gradient(135deg,#9333EA,#DB2777); color: white;'
          : 'color: rgba(255,255,255,0.4);'"
        @click="activeTab = tab"
      >
        {{ tab }}
      </button>
    </div>

    <!-- Posts -->
    <div class="space-y-3">
      <div
        v-for="post in posts"
        :key="post.id"
        class="p-4 rounded-2xl"
        style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06);"
      >
        <div class="flex items-center gap-3 mb-3">
          <div class="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm" :style="`background: ${post.color}22; color: ${post.color};`">
            {{ post.avatar }}
          </div>
          <div class="flex-1">
            <p class="text-sm font-bold text-white">{{ post.user }}</p>
            <p class="text-[10px]" style="color: rgba(255,255,255,0.35);">{{ post.time }}</p>
          </div>
        </div>
        <p class="text-sm leading-relaxed mb-3" style="color: rgba(255,255,255,0.75);">{{ post.content }}</p>
        <div class="flex items-center gap-4">
          <button class="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            <span class="text-[11px]" style="color: rgba(255,255,255,0.4);">{{ post.likes }}</span>
          </button>
          <button class="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <span class="text-[11px]" style="color: rgba(255,255,255,0.4);">{{ post.comments }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- FAB -->
    <button
      class="fixed bottom-24 right-4 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-90"
      style="background: linear-gradient(135deg,#9333EA,#DB2777);"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
    </button>
  </div>
</template>

<script setup>
useHead({ title: 'Komunitas | QuickPlay' })

const tabs = ['Diskusi', 'Review', 'Rekomendasi']
const activeTab = ref('Diskusi')

const posts = [
  { id: 1, user: 'Rini Wahyuni', avatar: 'RW', color: '#9333EA', time: '2 jam lalu', content: 'Baru selesai nonton drama terbaru, endingnya bikin nangis banget 😭 Siapa yang udah nonton?', likes: 48, comments: 12 },
  { id: 2, user: 'Ahmad Fauzi', avatar: 'AF', color: '#DB2777', time: '4 jam lalu', content: 'Ada rekomendasi drama romance Korea yang episodenya tidak terlalu banyak? Lagi nyari yang 12-16 episode aja.', likes: 23, comments: 31 },
  { id: 3, user: 'Dewi Sartika', avatar: 'DS', color: '#0EA5E9', time: '6 jam lalu', content: 'Rating drama ini 9.2 bukan sembarangan! Akting semua pemainnya luar biasa. Highly recommended!', likes: 156, comments: 44 },
  { id: 4, user: 'Budi Santoso', avatar: 'BS', color: '#10B981', time: 'kemarin', content: 'Episode 12 ini gila banget plotnya. Gak nyangka bakal ada twist sebesar ini. Kalian udah nonton?', likes: 89, comments: 27 },
]
</script>
