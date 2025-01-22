// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
      title: "Simple Weather App",
    },
    baseURL: '/weather-app/'
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['@/assets/css/main.scss'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      weatherApiKey: process.env.NUXT_PUBLIC_WEATHER_API_KEY
    }
  },
})
