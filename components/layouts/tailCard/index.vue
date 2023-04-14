<template>
  <card-array-by-andml v-if="pageSetting.tags.indexOf('sw25_new') >= 0" :andml="sourceAndml" />
  <layouts-tail-card-osusume v-if="pageSetting.to !== '/policy' && pageSetting.to !== '/'" :page-setting="pageSetting"
    type="kanren" />
  <item-amazon v-if="pageSetting.tags.findIndex(tag => tag.indexOf('sw25') >= 0) >= 0" />
  <card>
    <div class="mt-3" v-if="pageTrees.length">
      <atom-link to="/" deco title="トップページへのリンク" type="tailcard">トップ</atom-link>
      <template v-for="(pageTree, i) of pageTrees" :key="pageTree.to">
        <span class="user-select-none"> &gt; </span>
        <atom-link :to="pageTree.to" deco :title="`ページ「${pageTree.title}」へのリンク`" type="tailcard">{{ pageTree.title
        }}</atom-link>
      </template>
      <span class="user-select-none">
        &gt; <br>
        {{ pageSetting.title }}
      </span>
    </div>
    <item-share-page :page-setting="pageSetting">このページをツイート</item-share-page>
    <item-button prepend-icon="mdi-content-copy" @click.stop="() => $copy($templateText.baseUrl + pageSetting.to)">
      このページのURLをコピー
    </item-button>
    <div class="mt-3">
      ぜひTwitterなどでシェアしてこのウェブサイトを広めてください！
    </div>
  </card>
  <layouts-tail-card-amazon />
  <card>
    <template #title>
      最近更新されたページ
    </template>
    最近更新されたページ{{ recent.length }}件を表示中
    <item-pagecard v-for="r of recent" :page-setting="r" />
    <!-- <div v-for="[date, pages] of Object.entries(recent)" :key="date" class="mt-2">
      {{ date }}
      <div v-for="page of pages" :key="page.to" class="pl-3 pb-2">
        <item-textlink :to="page.to" deco>
          {{ page.to.indexOf("/blog/") === 0 ? `ブログ「${page.title}」` : page.title }}
        </item-textlink>
      </div>
    </div> -->
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
    if (to === Props.pageSetting.to) return
    const pageSetting = $getPageSetting(to)
    if (!pageSetting) throw `[ERROR] page ${to} not found`
    result.push({
      title: pageSetting.title,
      to: pageSetting.to
    })
  })
  return result
})
// const shareSetting = computed(() => {
//   const text = Props.pageSetting.to.indexOf("blog/") >= 0 ? `ブログ「${Props.pageSetting.title}」` : Props.pageSetting.title
//   const url = $templateText.baseUrl + Props.pageSetting.to
//   return {
//     text,
//     url
//   }
// })

// const recent: { [date: string]: PageSetting[] } = {}
let count = 0
// $pageSettingList.filter(p => !p.hidden)
//   .sort((a, b) => new Date(b.lastmod).getTime() - new Date(a.lastmod).getTime())
//   .slice(0, 15)
//   .forEach(p => {
//     if (!recent[p.lastmod] || !recent[p.lastmod].length) {
//       if (count < 10) recent[p.lastmod] = []
//       else return
//     }
//     recent[p.lastmod].push(p)
//     count++
//   })
const recent = $pageSettingList
  .filter(p => !p.hidden)
  .sort((a, b) => new Date(b.lastmod).getTime() - new Date(a.lastmod).getTime())
  .slice(0, 10)

const scrollTop = () => {
  scrollTo(0, 0)
}

const sourceAndml = computed(() => `
&1 ソース
SW2.5の新刊情報は主に以下より入手しています。
&br
- &link_http://www.groupsne.co.jp/news/book.html,グループSNEオフィシャルサイト「新刊情報」
-- 毎月上旬にだいたい2か月後までの新刊情報が更新されます。
- ＧＭウォーロック
-- 本誌
--- &link_https://www.fujisan.co.jp/product/1281702551/,定期購読の申し込みはこちら
--- &link_https://sne-ec.com/category/item/supportmagazine/gm_warlock/,購入はこちら（グループSNE公式アンテナショップ「SNE-EC」） 
-- &link_http://www.groupsne.co.jp/news/book.html,公式Twitter
-- &link_http://www.groupsne.co.jp/products/magazine/GMW/index.html,グループSNEオフィシャルサイト「製品案内」
- &link_https://twitter.com/dragonbook_game,富士見ドラゴンブック編集部Twitter
-- 書影の公開はここ（かAmazon）が最初になることが多いです。

&2 リンク
` + (Props.pageSetting.to !== "/sw25/new" ? `
ソード・ワールド2.5の新刊情報は以下のページでまとめています。
あわせてご覧ください。
&button_/sw25/new
`: "") + `
&button_/search?tag=sw25_new 新刊情報の一覧はこちら
`)
</script>

<style scoped>
.user-select-none {
  user-select: none;
}
</style>
