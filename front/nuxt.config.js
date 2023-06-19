export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Teste Grupo Plan',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icon.png' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vue-tools.js',
    '~/plugins/chart.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    '@nuxtjs/auth-next',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: `${process.env.BASE_URL || 'http://localhost:4002'}/api`,
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      'defu'
    ],
    babel: {compact: true}
  },

  auth: {
    strategies: {
      laravelSanctum: {
        provider: 'laravel/sanctum',
        url: `${process.env.BASE_URL || 'http://localhost:4002'}`,
        token: {
          property: 'token',
          maxAge: 60 * 60,
          type: 'Bearer',
          global: true,
          required: true,
        },
        user: {
          autoFetch: true,
        },

        endpoints: {
          login: {
            url: '/api/login'
          },
          logout: {
            url: '/api/logout'
          },
          user: {
            url: '/api/user'
          }
        },
        redirect: {
          login: '/',
          logout: '/',
        }
      }
    }
  },

  router: {
    middleware: ['auth']
  },

  bootstrapVue: {
    icons: true
  },

  env: {
    BASE_URL: `${process.env.BASE_URL || 'http://localhost:4002'}/api`,

  },

  store: {
    modules: {
      homeAppliance: '~/store/homeAppliance',
    },
  },
}
