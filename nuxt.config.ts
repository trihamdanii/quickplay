// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss'],

  // Expose env vars ke client-side
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL ?? '',
      apiKey: process.env.NUXT_PUBLIC_API_KEY ?? '',
    },
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
      title: 'Beranda | QuickPlay',
      meta: [
        { name: 'description', content: 'Aplikasi streaming drama gratis dengan koleksi terlengkap. Nikmati pengalaman menonton terbaik tanpa gangguan.' },
        { name: 'keywords', content: 'drama,nonton drama,quickplay,beranda' },
        { name: 'robots', content: 'index, follow' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'theme-color', content: '#0a0a0a' },
        { name: 'apple-mobile-web-app-title', content: 'QuickPlay' },
        { property: 'og:title', content: 'Beranda | QuickPlay' },
        { property: 'og:description', content: 'Aplikasi streaming drama gratis dengan koleksi terlengkap. Nikmati pengalaman menonton terbaik tanpa gangguan.' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Beranda | QuickPlay' },
        { name: 'twitter:description', content: 'Aplikasi streaming drama gratis dengan koleksi terlengkap. Nikmati pengalaman menonton terbaik tanpa gangguan.' },
      ],
      link: [
        { rel: 'canonical', href: 'https://m.quickplay.my.id' },
        { rel: 'icon', href: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
        { rel: 'icon', href: '/icon.png', sizes: '180x180', type: 'image/png' },
      ],
      script: [
        { src: 'https://telegram.org/js/telegram-web-app.js', defer: true }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2024-11-01',
})
