import { getBlogList } from "./src/pre/gene/getList";
import { redirectList } from "./src/pages/redirect";
import { pageSettingList } from "./src/pages/pageSettingList";
import { searchWordList } from "./src/after/sitemap/searchWordList";
import { fortuneScoreList } from "./src/simulater/omikuji";
let routes: string[] = [];

let env: "DEVELOP" | "PRODUCTION" = "DEVELOP";
if (process.argv.join().indexOf("generate") >= 0) {
  env = "PRODUCTION";
  try {
    routes = ([] as string[]).concat(
      // ブログ
      getBlogList().map((blog) => `/blog/${blog}`),
      // 検索
      searchWordList.map(
        ({ searchWord }) =>
          `/search/${searchWord.map(encodeURIComponent).join("/")}`
      ),
      // おみくじ
      fortuneScoreList.map((_, i) => `/sw25/tool/omikuji/result_${i}`)
      // // リダイレクト関連
      // Object.keys(redirectList)
    );
    // 複数ページあるページ関連
    pageSettingList
      .filter((page) => page.page?.length)
      .forEach((page) => {
        if (!page.page?.length) return;
        // routes.push(page.to.replace(/^\//, ""));
        for (let p = 1; p <= page.page.length; p++) {
          routes.push(page.to + `/${p}`);
        }
      });
  } catch {
    console.error("error!?");
    throw "route error";
  }
}

const title = "TRPGギルド支部〈しゃちほこの尾びれ亭〉";
const description =
  "このサイトではTRPG 、特にSW2.5のシナリオの公開や、役立つツールの提供などを行なっています。";
const baseUrl = "https://trpg.syachi.work";

export default defineNuxtConfig({
  css: ["vuetify/lib/styles/main.sass", "mdi/css/materialdesignicons.min.css"],
  app: {
    // baseURL: "/trpg-system/",
    head: {
      title,
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { hid: "description", name: "description", content: description },
        { name: "format-detection", content: "telephone=no" },
        { hid: "og:site_name", property: "og:site_name", content: title },
        { hid: "og:type", property: "og:type", content: "website" },
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
  sourcemap: env === "DEVELOP",
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
