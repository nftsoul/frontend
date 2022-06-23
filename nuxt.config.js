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
      {
        hid: "twitter:card",
        name: "twitter:card",
        content: "summary_large_image",
      },
      { hid: "twitter:site", name: "twitter:site", content: "@nftsoul_io" },
      {
        hid: "twitter:url",
        name: "twitter:url",
        content: "https://twitter.com/nftsoul_io",
      },
      {
        hid: "twitter:title",
        name: "twitter:title",
        content: "Nftsoul | Exhibit your NFT",
      },
      {
        hid: "twitter:description",
        name: "twitter:description",
        content:
          "Exhibit and Earn From Your NFT Collections. Create galleries, showcase your best NFTs and earn from them.",
      },
      {
        hid: "twitter:image",
        name: "twitter:image",
        content: "https://res.cloudinary.com/doxa4k3b0/image/upload/v1655883374/Nftsoul/logo_ljmkk8.svg",
      },

      // Open Graph
      { hid: "og:site_name", property: "og:site_name", content: "Nftsoul" },
      { hid: "og:type", property: "og:type", content: "website" },
      {
        hid: "og:url",
        property: "og:url",
        content: "https://nftsoul.io",
      },
      {
        hid: "og:title",
        property: "og:title",
        content: "Nftsoul | Exhibit your NFT",
      },
      {
        hid: "og:description",
        property: "og:description",
        content:
          "Exhibit and Earn From Your NFT Collections. Create galleries, showcase your best NFTs and earn from them.",
      },
      {
        hid: "og:image",
        property: "og:image",
        content: "https://res.cloudinary.com/doxa4k3b0/image/upload/v1655883374/Nftsoul/logo_ljmkk8.svg",
      },
      {
        hid: "og:image:secure_url",
        property: "og:image:secure_url",
        content: "https://res.cloudinary.com/doxa4k3b0/image/upload/v1655883374/Nftsoul/logo_ljmkk8.svg",
      },
      {
        hid: "og:image:alt",
        property: "og:image:alt",
        content: "Nftsoul",
      },
    ],
    link: [
      {
        hid: 'canonical',
        rel: 'canonical',
        href: `https://nftsoul.io`
      },
      { rel: "icon", type: "image/x-icon", href: "/mini-log.png" }
    ],
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
  modules: ["@nuxtjs/axios", "@nuxtjs/toast", "@nuxtjs/dotenv",'@nuxtjs/auth-next'],
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
          maxAge: 60 * 60 * 24
        },
        user: {
          property: false,
          autoFetch: false
        },
        endpoints: {
          login: { url: "/auth/login", method: "post" },
          logout: { url: "/logout", method: "get" },
          user: { url: "/profile", method: "get" }
        }
      },
    },
    redirect:false
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
          notification: "#1b024d",
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
