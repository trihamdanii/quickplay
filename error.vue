<template>
  <div class="dark">
    <div
      class="flex flex-col items-center justify-center min-h-dvh max-w-[480px] mx-auto px-6"
      style="background: #0F172A;"
    >
      <div class="w-20 h-20 rounded-2xl flex items-center justify-center mb-6" style="background: linear-gradient(135deg,#9333EA,#DB2777);">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 8v4M12 16h.01"/>
        </svg>
      </div>
      <h1 class="text-4xl font-black text-white mb-2">{{ error?.statusCode || 404 }}</h1>
      <p class="text-base font-bold text-white mb-2">Halaman tidak ditemukan</p>
      <p class="text-sm text-center mb-8" style="color: rgba(255,255,255,0.4);">
        Halaman yang kamu cari mungkin sudah dipindahkan atau tidak tersedia.
      </p>
      <NuxtLink
        to="/"
        class="px-8 py-3 rounded-xl font-bold text-sm text-white active:scale-95 transition-all"
        style="background: linear-gradient(135deg,#9333EA,#DB2777);"
      >
        Kembali ke Beranda
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
defineProps({
  error: Object,
})
</script>
