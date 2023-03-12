import { getBlogList } from "./src/bloggene/getBlogList";
import { redirectList } from "./src/pages/redirect";

let routes: string[] = [];

if (process.argv.join().indexOf("generate") >= 0) {
  try {
    routes = ([] as string[]).concat(
      getBlogList().map((blog) => `blog/${blog}`),
      Object.keys(redirectList)
    );
  } catch {
    console.error("error!?");
  }
}

const title = "TRPGギルド支部〈しゃちほこの尾びれ亭〉";
const description =
  "このサイトではTRPG 、特にSW2.5のシナリオの公開や、役立つツールの提供などを行なっています。";
const baseUrl = "https://syachi-hoko-maru.github.io/trpg-system";

export default defineNuxtConfig({
  css: ["vuetify/lib/styles/main.sass", "mdi/css/materialdesignicons.min.css"],
  app: {
    baseURL: "/trpg-system/",
    head: {
      title,
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { hid: "description", name: "description", content: description },
        { name: "format-detection", content: "telephone=no" },
        { hid: "og:site_name", property: "og:site_name", content: title },
        { hid: "og:type", property: "og:type", content: "website" },
        // {
        //   hid: "og:url",
        //   property: "og:url",
        //   content: baseUrl,
        // },
        // { hid: "og:title", property: "og:title", content: title },
        // {
        //   hid: "og:description",
        //   property: "og:description",
        //   content: description,
        // },
        // {
        //   hid: "og:image",
        //   property: "og:image",
        //   content: `${baseUrl}/ogp.png`,
        // },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@syachi_hoko_trp" },
        // Google Search Console
        {
          name: "google-site-verification",
          content: "aIjrj3FKrKlREgPRhBMIVducoebzJZrU6EDgA92_kfI",
        },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: `${baseUrl}/favicon.ico` },
      ],
    },
  },
  build: {
    transpile: ["vuetify"],
  },
  generate: {
    routes,
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
});
