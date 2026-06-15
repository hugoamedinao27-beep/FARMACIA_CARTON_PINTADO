// client/nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  ssr: false,
  devtools: { enabled: process.env.NODE_ENV !== 'production' },
  devServer: {
    port: 5000 
  },
  runtimeConfig: {
    public: {
      apiBase: 'https://farmaciacartonpintado-production.up.railway.app/api/v1'
    }
  }
})