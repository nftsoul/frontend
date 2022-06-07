import colors from "vuetify/es5/util/colors";
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  server: {
    port: process.env.PORT,
    host: "0.0.0.0",
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
        name: "description",
        content:
          "Exhibit and Earn From Your NFT Collections. Create galleries, showcase your best NFTs and earn from them.",
      },
      // { property: "og:locale", content: "en_US" },
      // { property: "og:type", content: "website" },
      // { property: "og:title", content: "NFTsoul | Exhibit your NFT" },
      // {
      //   property: "og:description",
      //   content:
      //     "Exhibit and Earn From Your NFT Collections. Create galleries, showcase your best NFTs and earn from them.",
      // },
      // { property: "og:url", content: process.env.SITE_URL },
      // {
      //   property: "og:site_name",
      //   content:
      //     "Exhibit and Earn From Your NFT Collections. Create galleries, showcase your best NFTs and earn from them.",
      // },
      // { name: "twitter:card", content: "summary_large_image" },
      // { name: "twitter:title", content: "NFTsoul | Exhibit your NFT" },
      // {
      //   name: "twitter:description",
      //   content:
      //     "Exhibit and Earn From Your NFT Collections. Create galleries, showcase your best NFTs and earn from them.",
      // },
      // {
      //   name: "twitter:image",
      //   content: "/mini-log.png"
      // },
      // { name: "theme-color", content: "#000229" },
      // {
      //   property: "og:image:url",
      //   content: "/mini-log.png",
      // },
      {
        name: "keywords",
        content:
          "nftsoul,nftsoul collection,nft collection,nft marketplace, nft crypto art,nft art nft collection,show nfts, exhibit your nft,nfts,earn from nfts,exhibit and earn from nft collection,showcase your best NFTs and earn from them,nft store",
      },
      {name:'robots',content:"index,follow"}
    ],
    script: [
      {
        "@context": process.env.SITE_URL,
        "@type": "WebSite",
        url: process.env.SITE_URL,
        name: "NFTsoul | Exhibit your NFT",
        // potentialAction: {
        //   "@type": "SearchAction",
        //   target: "http://localhost/search/{search_term_string}/",
        //   "query-input": "required name=search_term_string",
        // },
      },
      {
        "@context": process.env.SITE_URL,
        "@type": "Organization",
        url: process.env.SITE_URL,
        name: "NFTsoul | Exhibit your NFT",
        logo: '/mini-log.png',
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/mini-log.png" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

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
    "@nuxtjs/vuetify",
    "@nuxtjs/moment",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", "@nuxtjs/toast", "@nuxtjs/dotenv"],
  axios: {
    baseURL: process.env.API_URL,
    // credentials: true,
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: "#030537",
          background: "#000229",
          notification:"#1b024d",
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  env: {
    baseUrl: process.env.API_URL,
  },
};
