<template>
  <card-array-by-andml v-if="pageSetting.tags.indexOf('sw25_new') >= 0" :andml="sourceAndml" />
  <layouts-tail-card-osusume v-if="pageSetting.to !== '/policy' && pageSetting.to !== '/'" :page-setting="pageSetting"
    type="kanren" />
  <item-amazon v-if="pageSetting.tags.findIndex(tag => tag.indexOf('sw25') >= 0) >= 0" />
  <card>
    <template v-for="(pageTree, i) of pageTrees" :key="pageTree.to">
      <span v-if="i" class="user-select-none"> &gt; </span>
      <atom-link :to="pageTree.to" deco>
        {{ pageTree.title }}
      </atom-link>
    </template>
    <item-share-page :page-setting="pageSetting">このページをツイート</item-share-page>
    ぜひTwitterでシェアして広めてください！ m(_ _)m
  </card>
  <card>
    <template #title>
      最近更新されたページ
    </template>
    <div v-for="[date, pages] of Object.entries(recent)" :key="date" class="mt-2">
      {{ date }}
      <div v-for="page of pages" :key="page.to" class="pl-3 pb-2">
        <item-textlink :to="page.to" deco>
          {{ page.to.indexOf("/blog/") === 0 ? `ブログ「${page.title}」` : page.title }}
        </item-textlink>
      </div>
    </div>
  </card>
  <layouts-tail-card-osusume v-if="pageSetting.to !== '/policy'" :page-setting="pageSetting" />
  <card>
    <item-button @click="scrollTop">上へ戻る</item-button>
    <item-button v-if="pageSetting.to.indexOf('/blog/') === 0" url="/blog" normal-button>ブログトップへ</item-button>
    <item-button v-if="pageSetting.to !== '/'" url="/" normal-button>トップページへ</item-button>
  </card>
</template>

<script setup lang="ts">
interface Props {
  pageSetting: PageSetting
}
const Props = defineProps<Props>();

const { $pageSettingList, $getPageSetting, $templateText } = useNuxtApp()

const pageTrees = computed(() => {
  const result: {
    title: string,
    to: string
  }[] = []
  const urls: string[] = []
  Props.pageSetting.to.split("/").filter(u => u).forEach(u => {
    urls.push(u)
    const to = "/" + urls.join("/")
    const pageSetting = $getPageSetting(to)
    if (!pageSetting) throw `[ERROR] page ${to} not found`
    result.push({
      title: pageSetting.title,
      to: pageSetting.to
    })
  })
  return result
})
const shareSetting = computed(() => {
  const text = Props.pageSetting.to.indexOf("blog/") >= 0 ? `ブログ「${Props.pageSetting.title}」` : Props.pageSetting.title
  const url = $templateText.baseUrl + Props.pageSetting.to
  return {
    text,
    url
  }
})

const recent: { [date: string]: PageSetting[] } = {}
let count = 0
$pageSettingList.filter(p => !p.hidden)
  .sort((a, b) => new Date(b.lastmod).getTime() - new Date(a.lastmod).getTime())
  .slice(0, 15)
  .forEach(p => {
    if (!recent[p.lastmod] || !recent[p.lastmod].length) {
      if (count < 10) recent[p.lastmod] = []
      else return
    }
    recent[p.lastmod].push(p)
    count++
  })
const scrollTop = () => {
  scrollTo(0, 0)
}

const sourceAndml = `
&1 ソース
SW2.5の新刊情報は主に以下より入手しています。
- &link_http://www.groupsne.co.jp/news/book.html,グループSNEオフィシャルサイト「新刊情報」
- ＧＭウォーロック
-- &link_http://www.groupsne.co.jp/news/book.html,公式Twitter
-- &link_http://www.groupsne.co.jp/products/magazine/GMW/index.html,グループSNEオフィシャルサイト「製品案内」
- &link_https://twitter.com/dragonbook_game,富士見ドラゴンブック編集部Twitter
`
</script>

<style scoped>
.user-select-none {
  user-select: none;
}
</style>
