import colors from "vuetify/es5/util/colors";

const environment = process.env.NODE_ENV || "development";
const envSet = require(`./env/${environment}.js`);

const title = "しゃちほこ丸のTRPGシステム";
const description =
  "このサイトではTRPGに役立つシステムの提供などを行なっていく予定です。";

export default {
  env: envSet,

  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    // titleTemplate: "%s - trpg-system",
    title: title,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: description },
      { name: "format-detection", content: "telephone=no" },
      { charset: "utf-8" },
      {
        hid: "description",
        name: "description",
        content: description,
      },
      { hid: "og:site_name", property: "og:site_name", content: title },
      { hid: "og:type", property: "og:type", content: "website" },
      {
        hid: "og:url",
        property: "og:url",
        content: "https://syachi-hoko-maru.github.io/trpg-system",
      },
      { hid: "og:title", property: "og:title", content: title },
      {
        hid: "og:description",
        property: "og:description",
        content: description,
      },
      {
        hid: "og:image",
        property: "og:image",
        content: `https://syachi-hoko-maru.github.io/trpg-system/syachi.png`,
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@syachi_hoko_trp" },
    ],

    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: `${envSet.baseUrl}favicon.ico`,
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~/plugins/diceBot.ts"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: "/",
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: title,
      lang: "ja",
      short_name: title,
      title: title,
      "og:title": title,
      description: description,
      "og:description": description,
      theme_color: "#1c5616",
      background_color: "#1c5616",
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
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

  router: {
    base: envSet.baseUrl,
  },

  generate: {
    dir: process.env.NODE_ENV === "githubPages" ? "docs" : "dist",
  },
};
