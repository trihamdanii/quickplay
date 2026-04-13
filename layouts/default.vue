<template>
  <div
    class="relative min-h-dvh max-w-[480px] mx-auto"
    style="background: #0F172A;"
  >
    <!-- Top Header -->
    <AppHeader />

    <!-- Page Content -->
    <main class="pb-24">
      <slot />
    </main>

    <!-- Bottom Navigation -->
    <AppNavbar />
  </div>
</template>
