<template>
  <card>
    ブログでは僕が考えたことを、基本的に考えた順に書いています。<br>
    お読みになってくださる場合、読みやすい文章ではないことをご了承の上、お読みいただければ幸いです。
  </card>
  <card-array-by-andml :andml="andml" />
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

const { $templateText, $pageSettingList } = useNuxtApp()
const { params } = useRoute()

const pagetitle = ref("")
const date = ref("")
const andml = ref("")
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
  andml.value = blog.andml

  const title = `${blog.title} - ブログ@${$templateText.title}`;
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
      hid: "og:description",
      name: "og:description",
      content: blog.andml
        .replace(/&[^\s]*\s/g, "")
        .replace(/[\s_]/g, "")
        .replace(/\n/g, " &br ")
        .slice(0, 120),
    },
    {
      hid: "og:image",
      name: "og:image",
      content: `${$templateText.baseUrl}/blog-image/${id}.png`
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

</script>