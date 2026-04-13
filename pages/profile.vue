<template>
  <div class="px-4 py-4">
    <!-- Avatar & Name -->
    <div class="flex flex-col items-center py-8">
      <div class="w-20 h-20 rounded-full flex items-center justify-center mb-4" style="background: linear-gradient(135deg,#9333EA,#DB2777);">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      </div>
      <h2 class="text-lg font-black text-white mb-1">Pengguna QuickPlay</h2>
      <p class="text-sm mb-6" style="color:rgba(255,255,255,0.4);">Masuk untuk menikmati fitur lengkap</p>
      <button class="px-8 py-3 rounded-xl font-bold text-sm text-white active:scale-95 transition-all" style="background:linear-gradient(135deg,#9333EA,#DB2777);">
        Masuk / Daftar
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-3 gap-3 mb-6">
      <div v-for="stat in stats" :key="stat.label" class="flex flex-col items-center py-4 rounded-2xl" style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06);">
        <span class="text-xl font-black text-white mb-1">{{ stat.value }}</span>
        <span class="text-[10px]" style="color:rgba(255,255,255,0.4);">{{ stat.label }}</span>
      </div>
    </div>

    <!-- Menu -->
    <div class="space-y-2">
      <button
        v-for="menu in menus"
        :key="menu.label"
        class="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all active:scale-[0.98]"
        style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06);"
      >
        <div class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" :style="`background: ${menu.bg};`">
          <component :is="menu.icon" />
        </div>
        <span class="text-sm font-semibold text-white flex-1 text-left">{{ menu.label }}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
      </button>
    </div>

    <!-- Version -->
    <p class="text-center text-xs mt-8" style="color: rgba(255,255,255,0.2);">QuickPlay v1.0.0</p>
  </div>
</template>

<script setup>
useHead({ title: 'Profil | QuickPlay' })

const stats = [
  { value: '0', label: 'Ditonton' },
  { value: '0', label: 'Disimpan' },
  { value: '0', label: 'Komentar' },
]

const BookmarkIcon = { template: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>` }
const HistoryIcon = { template: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>` }
const SettingsIcon = { template: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>` }
const HelpIcon = { template: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/></svg>` }

const menus = [
  { label: 'Daftar Tonton', bg: 'rgba(147,51,234,0.2)', icon: BookmarkIcon },
  { label: 'Riwayat Tonton', bg: 'rgba(219,39,119,0.2)', icon: HistoryIcon },
  { label: 'Pengaturan', bg: 'rgba(255,255,255,0.08)', icon: SettingsIcon },
  { label: 'Bantuan', bg: 'rgba(255,255,255,0.08)', icon: HelpIcon },
]
</script>
