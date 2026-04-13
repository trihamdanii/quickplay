<template>
  <header
    class="sticky top-0 z-40 flex items-center justify-between px-4 py-3 border-b"
    style="background: rgba(15,23,42,0.92); backdrop-filter: blur(24px); border-color: rgba(255,255,255,0.06);"
  >
    <!-- Logo -->
    <div class="flex items-center gap-2.5">
      <div class="w-8 h-8 rounded-xl flex items-center justify-center">
        <img
          src="/icon.png"
          alt="QuickPlay"
          width="24"
          height="24"
          class="rounded-lg"
        />
      </div>
      <span class="text-base font-black tracking-tight text-white">QuickPlay</span>
    </div>

    <!-- Right side actions -->
    <div class="flex gap-x-2 items-center">
      <!-- Language button -->
      <button
        class="w-8 h-8 rounded-xl flex items-center justify-center transition-all active:scale-90"
        style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.07);"
        @click="toggleLang"
        aria-label="Toggle Language"
      >
        <span class="text-base leading-none">🌐</span>
      </button>

      <!-- Search bar placeholder / user area -->
      <div class="px-2 py-2.5">
        <div
          class="h-10 w-36 rounded-xl flex items-center justify-center gap-2 px-3"
          style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.07);"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="2">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          <span class="text-xs text-white/50 font-medium">Masuk</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
const toggleLang = () => {
  // Language toggle logic
}
</script>
