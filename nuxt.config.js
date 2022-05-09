import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  server:{
    port:process.env.PORT,
		host: "0.0.0.0"
	},
  head: {
    titleTemplate: "Nftsoul | %s",
    title: "Exhibit your NFT",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "Exhibit and Earn From Your NFT Collections. Create galleries, showcase your best NFTs and earn from them. ",
      },
      // { name: "format-detection", content: "phone number" },
      {
        name: "keywords",
        content:
          "nftsoul,nftsoul collection,nft collection,nft marketplace, nft crypto art,nft art nft collection,show nfts, exhibit your nft,nfts,earn from nfts,exhibit and earn from nft collection,showcase your best NFTs and earn from them,nft store",
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/mini-log.png' }
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
    { src: "~/plugins/social-share", mode: "client" },

  ],

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
    '@nuxtjs/dotenv'
  ],
  axios: {
    baseURL: process.env.API_URL,
    // credentials: true,
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
