<template>
  <nav
    class="fixed bottom-0 left-0 right-0 z-50 border-t max-w-[480px] mx-auto"
    style="background: rgba(15,23,42,0.95); backdrop-filter: blur(24px); border-color: rgba(255,255,255,0.06); padding-bottom: env(safe-area-inset-bottom, 0px);"
  >
    <div class="flex items-center justify-around px-1 pt-2 pb-2">
      <NuxtLink
        v-for="item in navItems"
        :key="item.href"
        :to="item.href"
        class="flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all duration-200"
        custom
        v-slot="{ isActive, navigate }"
      >
        <button @click="navigate" class="flex flex-col items-center gap-1 px-3 py-1 rounded-xl">
          <div
            class="relative flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200"
            :style="isActive
              ? 'background: rgba(147,51,234,0.18); box-shadow: 0 0 12px rgba(147,51,234,0.2);'
              : 'background: transparent;'"
          >
            <component
              :is="item.icon"
              :active="isActive"
            />
            <span
              v-if="isActive"
              class="absolute -bottom-0.5 w-1 h-1 rounded-full"
              style="background: linear-gradient(135deg, #9333EA, #DB2777);"
            />
          </div>
          <span
            class="text-[10px] font-medium"
            :style="isActive ? 'color: #C084FC; font-weight: 700;' : 'color: #334155; font-weight: 500;'"
          >
            {{ item.label }}
          </span>
        </button>
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup>
import IconHome from './icons/IconHome.vue'
import IconDiscover from './icons/IconDiscover.vue'
import IconSearch from './icons/IconSearch.vue'
import IconCommunity from './icons/IconCommunity.vue'
import IconProfile from './icons/IconProfile.vue'

const navItems = [
  { href: '/', label: 'Beranda', icon: IconHome },
  { href: '/discover', label: 'Jelajahi', icon: IconDiscover },
  { href: '/search', label: 'Cari', icon: IconSearch },
  { href: '/community', label: 'Komunitas', icon: IconCommunity },
  { href: '/profile', label: 'Profil', icon: IconProfile },
]
</script>
