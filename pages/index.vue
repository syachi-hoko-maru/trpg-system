<template>
  <card>
    <template #before>
      <v-img src="./webp/page-image/main.webp" alt="ヘッダー" />
      <item-caption>
        背景画像は
        <atom-link to="https://gakaisozai.seesaa.net/">
          きまぐれアフター背景素材置き場様
        </atom-link>
        より使用しております
      </item-caption>
    </template>
  </card>
  <card-array-by-andml :andml="andml1" />
  <card>
    <template #title>
      Blog
    </template>
    最新のブログ記事{{ recentBlog.length }}件を表示中
    <pages-search :results="recentBlog" />
    <item-button url="/blog" normal-button>ブログはこちら</item-button>
  </card>
  <card-array-by-andml :andml="andml2" />
</template>

<script setup lang="ts">
const { $pageSettingList } = useNuxtApp()
const andml1 = `
&1 Welcome
このサイトでは &info_trpg 、特に &info_sw25 （SW2.5）の &link_/scenario,シナリオの公開 や、 &link_,役立つツールの提供 、 &link_/sw25/forbeginner/suppliment/1,サプリメントの紹介 などを行なっています。
&br
今後も随時、 &em_機能や情報の追加・改良を行なっていきます。
最新の更新情報は &itwitter にて発信します。
また、ご意見ご要望などもお待ちしております。
よろしければTwitterのフォローをお願いします。

&1 News
&date_today 更新作業中
&date_2023/3/1 仮公開
&date_2023/1/11 更新準備開始
&button_#recent 最近更新されたページはこちら

&1 Contents
おすすめのコンテンツを3つ紹介します。
ページ一覧は &link_/search,こちら からご覧ください。
&button_/sw25/tool
&button_/scenario
&button_/sw25/forbeginner/suppliment/1

&1 For Beginner
ソード・ワールド2.5初心者向けの情報は以下にまとめてあります。
初心者向けの &em_よくある質問（FAQ） やSW2.5に限らずTRPG初心者がTRPGを始める際に &em_役立つリンク などを掲載しています。
&button_/sw25/forbeginner
`

const andml2 = `
&1 About Me
管理人のしゃちほこ丸については以下をご覧ください。
&button_/me
`

const recentBlog = $pageSettingList.filter(page => !page.hidden && page.to.indexOf('/blog/') === 0).slice(0, 2)
</script>

