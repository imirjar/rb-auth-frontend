// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-08-02',
  ssr: true,
  devtools: { enabled: true },
  
  fonts: {
    families: [
      // do not resolve this font with any provider from `@nuxt/fonts`
      { name: 'Roboto', provider: 'google' },
    ]
  },

  postcss: {
    plugins: {
      autoprefixer: {},
    },
  },

  css: ['~/assets/css/main.css'],

  modules: ["@nuxt/image", '@nuxt/icon', '@nuxt/fonts'],
  icon: {
    serverBundle: {
      collections: ['material-symbols']
    }
  },

  app: {
    baseURL: '/',
    head: {
      title: 'Авторизация', // Заголовок вкладки
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ],
    },
  },

  runtimeConfig: {
    // Приватные ключи (только на сервере)
    // apiSecret: '123',
    
    // Публичные ключи (доступны и на клиенте)
    public: {
      apiBaseUrl: process.env.AUTH_API || 'https://auth.redbeaver.ru'
    }
  }


});