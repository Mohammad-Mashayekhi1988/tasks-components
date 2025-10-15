// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: [
      'vuetify/styles',
      '@mdi/font/css/materialdesignicons.css',
      '@/assets/css/globalcss.css'
    ],
  build: {
    transpile: ['vuetify'],
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})
