import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  server:{
    port:process.env.PORT
  },
  head: {
    titleTemplate: '%s - nftsoul',
    title: 'nftsoul',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/vue-slick-carousel", mode: "client" },
    { src: "~/plugins/vue-carousel-3d", mode: "client" },
    { src: "~/plugins/spinner", mode: "client" },
    { src: "~/plugins/twitter-auth.js", mode: "client" },

  ],
  cloudinary: {
    cloudName: 'dtj1m4wvd',
    apiKey: '936617525278493',
    apiSecret: 'ZrJtyCEer4AhvYuQflWkq-EZosU',
    useComponent:true
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/toast',
    '@nuxtjs/cloudinary',
    '@nuxtjs/auth-next'
  ],
  axios: {
    baseURL: process.env.API_URL,
    // credentials: true,
  },
  auth: {
    strategies: {
      'local': {
        token: {
          property: "token",
          required: true,
          maxAge: 60 * 60 * 24 * 7
        },
        user: {
          property: false,
          autoFetch: false
        },
        endpoints: {
         
        }
      },
    },
    redirect:false
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: '#030537',
          background:'#000229',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  env: {
    baseUrl: process.env.API_URL,
  }
}
