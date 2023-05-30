<template>
  <card>
    ブログでは僕が考えたことを、基本的に考えた順に書いています。<br>
    お読みになってくださる場合、読みやすい文章ではないことをご了承の上、お読みいただければ幸いです。
  </card>
  <card-array-by-andml :andml="aboutswnews" v-if="pagetitle.indexOf('ソドワニュース！') === 0" />
  <card-array-by-andml :andml="mainandml" />
  <card>
    <template #title>
      他のブログ記事
    </template>
    <template #pafter>
      <pages-search :results="results" />
    </template>
  </card>
  <card>
    駄文を最後までお読みいただきありがとうございました。<br>
    よければ他のブログやページもご覧ください。
    <item-button url="/blog" normal-button>ブログトップへ</item-button>
  </card>
</template>

<script setup lang="ts">
import blogs from "@/assets/blog.json"
import { setBlogExplain } from "~~/src/pages/blogExplain";

const { $templateText, $pageSettingList } = useNuxtApp()
const { params } = useRoute()

const pagetitle = ref("")
const date = ref("")
const mainandml = ref("")
const id: string = Array.isArray(params.id) ? params.id[0] : params.id

const blog: Blog | undefined = (blogs as Blog[]).find(blo => blo.id === id)

if (!(
  blog
  && blog.title && typeof blog.title === "string"
  && blog.date && typeof blog.date === "string"
  && blog.andml && typeof blog.andml === "string"
)) {
  showError("")
} else {
  pagetitle.value = blog.title
  date.value = blog.date
  mainandml.value = blog.andml

  const title = `${blog.title} - ブログ@${$templateText.title}`;
  const description = setBlogExplain(blog, 140)
  const meta = [
    {
      hid: "og:url",
      name: 'og:url',
      content: `${$templateText.baseUrl}/blog/${id}`,
    }, {
      hid: "og:title",
      name: 'og:title',
      content: title,
    },
    {
      hid: "description",
      name: "description",
      content: description
    },
    {
      hid: "og:description",
      name: "og:description",
      content: description
    },
    {
      hid: "og:image",
      name: "og:image",
      content: `${$templateText.baseUrl}/image/blog-image/${id}.png`
    }
  ]
  useHead({
    title,
    meta
  });
}

const results = $pageSettingList.filter(pageSetting =>
  pageSetting.to.indexOf("/blog/") >= 0
  && pageSetting.osusume
  && pageSetting.to.indexOf(id) === -1
).slice(0, 3)

const aboutswnews = `
&1 「ソドワニュース！」とは？
「ソドワニュース！」は &em_ソード・ワールド2.5（SW2.5）の最新情報 をお届けする不定期更新のブログシリーズです。
ソード・ワールド2.5の &em_ビッグニュース が入ってきた際に随時執筆・公開します。
&br
「ソドワの最新情報が知りたい！」って方、ぜひ読んでください！
&br
なお、 &em_ソード・ワールド2.5の新刊情報は以下のページにまとめていますので併せてご覧ください。
&button_/sw25/new
`
</script>