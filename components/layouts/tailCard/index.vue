<template>
  <card-array-by-andml v-if="pageSetting.tags.indexOf('sw25_new') >= 0" :andml="sourceAndml" />
  <layouts-tail-card-osusume v-if="pageSetting.to !== '/policy' && pageSetting.to !== '/'" type="kanren" />
  <card>
    <item-pagetree class="mt-3" />
    <item-share-page withcopy>このページをツイート</item-share-page>
    <div class="mt-3">
      ぜひTwitterなどでシェアしてこのウェブサイトを広めてください！
    </div>
  </card>
  <card-array-by-andml :andml="newbooks" />
  <item-banner />
  <item-notice title="しゃちほこ丸からのお知らせ" />
  <template v-if="!pageSetting.noamazon && pageSetting.tags.findIndex(tag => tag.indexOf('sw25') >= 0) >= 0">
    <card>
      <template #title>
        ルールブックを買うならHarry Harry
      </template>
      <andml :andmls="andml1" />
    </card>
    <item-amazon-sw25 />
  </template>
  <!-- <item-amazon-box v-if="!pageSetting.noamazon" /> -->
  <card v-if="recent.length && mounted">
    <template #title>
      最近更新されたページ
    </template>
    最近更新されたページ{{ recent.length }}件を表示中
    <item-pagecard v-for="r of recent" :page-setting="r" />
    <item-button to="/search?sort=recent">最近更新されたページ一覧はこちら</item-button>
  </card>
  <layouts-tail-card-aboutme />
  <layouts-tail-card-osusume type="osusume" />
  <layouts-tail-card-osusume type="popular" />
  <item-banner />
  <card>
    <item-button @click="scrollTop">上へ戻る</item-button>
    <item-button v-if="pageSetting.to.indexOf('/blog/') === 0" url="/blog" normal-button>ブログトップへ</item-button>
    <item-button v-if="pageSetting.to !== '/'" url="/" normal-button>トップページへ</item-button>
  </card>
  <game-halloween-ghost />
</template>

<script setup lang="ts">
import { bookList } from '~/src/dict/new';
import { isHidden } from '~/src/pages/getPageSetting';
import { isPast, sortByDate } from '~/src/util/date';

const { $pageSettingList } = useNuxtApp()
const { nowPageSetting } = usePages()
const pageSetting = nowPageSetting

const recent = $pageSettingList
  .filter(p => !isHidden(p))
  .sort((a, b) => new Date(b.lastmod).getTime() - new Date(a.lastmod).getTime())
  .slice(0, 10)

const scrollTop = () => {
  scrollTo(0, 0)
}

const newBook = bookList
  .filter(b => !isPast(b.date))
  .sort((a, b) => sortByDate(false)(a.date, b.date))
[0]
const recentBook = bookList
  .filter(b => isPast(b.date))
  .sort((a, b) => sortByDate(true)(a.date, b.date))
[0]

const newbooks = (newBook ? `
&1 最新刊『${newBook.title}』（${newBook.dispDate ? newBook.dispDate : newBook.date}発売予定）特集中！
当サイトでは &em_ソード・ワールド2.5（SW2.5/ソドワ） の最新刊となる &em_『${newBook.long ? newBook.long : newBook.title}』 （${newBook.dispDate ? newBook.dispDate : newBook.date}発売予定）を全力で特集中です！
&br
ぜひみていってください！
&button_/search?word=${newBook.title} 『${newBook.title}』関連ページはこちら
&br
&3 ${recentBook.title}
他にも最近発売された『${recentBook.long ? recentBook.long : recentBook.title}』（${newBook.dispDate ? newBook.dispDate : newBook.date}発売）などについての情報も多数あります！
&button_/search?word=${recentBook.title} 『${recentBook.title}』関連ページはこちら
&br
&3 他にも新刊情報いろいろ！
その他にもソード・ワールド2.5の最新情報を多数扱っています！
&br
新刊情報についてはこちらをご覧ください！
&button_/sw25/feature/new
&br
`: "")
  + (!pageSetting.value.noamazon ? `
&amazon_${bookList
      .map(b => [b.title, b.amazon ? b.amazon : ""])
      .flat()
      .filter(f => f)
      .join("・")}
`: "")

const andml1 = `
ソード・ワールド2.5（SW2.5/ソドワ）のルールブックを購入する際はぜひ「HarryHarry」をご利用ください！
&br
ルールブックを購入するとオーナーのハリィさんがGMをしてくださるため、 &em_「ルールブックを買ったのに遊ぶ人がいない……」って状況を回避 できます！
&harry
ハリィさんについて詳しくは以下のページをご覧ください。
&button_/sw25/fav/harry
`

const sourceAndml = computed(() => `
&1 ソース
ソード・ワールド2.5（SW2.5/ソドワ）の新刊情報は主に以下より入手しています。
&&tatami_詳しくみる
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
- &link_https://www.kadokawa.co.jp/calendar/,KADOKAWA新刊カレンダー
-- 毎月初めに来月分の新刊情報が公開されます。

&2 リンク
` + (pageSetting.value.to !== "/sw25/feature/new" ? `
ソード・ワールド2.5の新刊情報は以下のページでまとめています。
あわせてご覧ください。
&button_/sw25/feature/new
`: "") + `
&button_/search?tag=sw25_new&sort=recent 新刊情報の一覧はこちら
&br
最近更新されたソード・ワールド2.5の新刊情報に関するページ3件
${$pageSettingList
    .filter(page => !isHidden(page) && page.tags.indexOf("sw25_new") >= 0)
    .sort((a, b) => new Date(b.lastmod).getTime() - new Date(a.lastmod).getTime())
    .slice(0, 3)
    .map(page => `&button_${page.to}`)
    .join("\n")
  }
&&&`)

const mounted = ref(false)
onMounted(() => {
  mounted.value = true
})
</script>

<style scoped>
.user-select-none {
  user-select: none;
}
</style>
