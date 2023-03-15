<template>
  <card-array-by-andml v-if="pageSetting.tags.indexOf('sw25_new') >= 0" :andml="sourceAndml" />
  <layouts-tail-card-osusume v-if="pageSetting.to !== '/policy'" :page-setting="pageSetting" type="kanren" />
  <item-amazon v-if="pageSetting.tags.findIndex(tag => tag.indexOf('sw25') >= 0) >= 0" />
  <card>
    <template v-for="(pageTree, i) of pageTrees" :key="pageTree.to">
      <span v-if="i" class="user-select-none"> &gt; </span>
      <atom-link :to="pageTree.to" deco>
        {{ pageTree.title }}
      </atom-link>
    </template>
    <item-share :text="shareSetting.text" :url="shareSetting.url">このページをツイート</item-share>
    ぜひTwitterでシェアして広めてください
  </card>
  <card id="recent">
    <template #title>
      最近更新されたページ
    </template>
    <div v-for="[date, pages] of Object.entries(recent)" :key="date" class="mt-2">
      {{ date }}
      <div v-for="page of pages" :key="page.to" class="pl-3">
        <atom-link :to="page.to" deco>
          {{ page.to.indexOf("/blog/") === 0 ? `ブログ「${page.title}」` : page.title }}
        </atom-link>
      </div>
    </div>
  </card>
  <layouts-tail-card-osusume v-if="pageSetting.to !== '/policy'" :page-setting="pageSetting" />
</template>

<script setup lang="ts">
interface Props {
  pageSetting: PageSetting
}
const Props = defineProps<Props>();

const { $pageSettingList, $templateText } = useNuxtApp()

const pageTrees = computed(() => {
  const result: {
    title: string,
    to: string
  }[] = []
  const urls: string[] = []
  Props.pageSetting.to.split("/").filter(u => u).forEach(u => {
    urls.push(u)
    const to = "/" + urls.join("/")
    const pageSetting = $pageSettingList.find(p => p.to === to)
    if (!pageSetting) throw `[ERROR] page ${to} not found`
    result.push({
      title: pageSetting.title,
      to: pageSetting.to
    })
  })
  return result
})
const shareSetting = computed(() => {
  const text = Props.pageSetting.title
  const url = $templateText.baseUrl + Props.pageSetting.to
  return {
    text,
    url
  }
})

const recent: { [date: string]: PageSetting[] } = {}
let count = 0
$pageSettingList.filter(p => !p.hidden).sort((a, b) => new Date(b.lastmod).getTime() - new Date(a.lastmod).getTime()).slice(0, 15).forEach(p => {
  if (!recent[p.lastmod] || !recent[p.lastmod].length) {
    if (count < 10) recent[p.lastmod] = []
    else return
  }
  recent[p.lastmod].push(p)
  count++
})

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
