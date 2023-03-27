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
  <card-array-by-andml :andml="andml" />
  <card>
    <template #title>
      Blog
    </template>
    最新のブログ記事{{ recentBlog.length }}件を表示中
    <pages-search :results="recentBlog" />
    <item-button url="/blog" normal-button>ブログはこちら</item-button>
  </card>
</template>

<script setup lang="ts">
const { $pageSettingList } = useNuxtApp()
const andml = `
&1 Welcome
このサイトでは &info_trpg 、特に &info_sw25 （SW2.5）のシナリオの公開や、役立つツールの提供、サプリメントの紹介などを行なっています。
&button_/scenario 
&button_/sw25/tool 
&button_/sw25/forbeginner/suppliment/1 
&br
今後も随時、機能の追加等を行なっていきます。
最新の更新情報は &itwitter にて発信します。
また、ご意見ご要望などもお待ちしております。
よろしければTwitterのフォローをお願いします。

&1 News
&date_today 更新作業中
&date_2023/3/1 仮公開
&date_2023/1/11 更新準備開始
&button_#recent 最近更新されたページはこちら
`

const recentBlog = $pageSettingList.filter(page => !page.hidden && page.to.indexOf('/blog/') === 0).slice(0, 2)
</script>

