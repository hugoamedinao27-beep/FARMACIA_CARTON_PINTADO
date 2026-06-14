// client/nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  devServer: {
    port: 5000 
  },
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:4000/api/v1'
    }
  },
  nitro: {
    preset: 'vercel'
  }
})