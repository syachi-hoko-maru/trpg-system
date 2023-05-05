<template>
  <card>
    <template #before>
      <div class="thumbnail-div">
        <div class="thumbnail-img">
          <item-img src="./webp/page-image/main.webp" alt="ヘッダー画像" />
        </div>
      </div>
      <item-caption>
        背景画像は
        <item-textlink to="https://gakaisozai.seesaa.net/">
          きまぐれアフター背景素材置き場様
        </item-textlink>
        より使用しております
      </item-caption>
    </template>
  </card>
  <item-carousel />
  <card-array-by-andml :andml="andml1" />
  <layouts-title-card-infodarkmode />
  <card-array-by-andml :andml="andml2" />
  <card>
    <template #title>
      Blog
    </template>
    最新のブログ記事{{ recentBlog.length }}件を表示中
    <pages-search :results="recentBlog" />
    <item-button url="/blog" normal-button>ブログはこちら</item-button>
  </card>
  <card-array-by-andml :andml="andml3" />
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
&ltwitter
`
const andml2 = `
&1 Contents
おすすめのコンテンツを3つ紹介します。
ページ一覧は &link_/search,こちら からご覧ください。
&button_/sw25/tool
&button_/scenario
&button_/sw25/forbeginner/suppliment/1

&1 For Beginner
ソード・ワールド2.5初心者向けの情報やTRPG初心者向けの情報は以下にまとめてあります。
ぜひご確認ください。
&button_/trpg
&button_/sw25/forbeginner

&1 News
&date_today 更新作業中
&date_2023/3/1 仮公開
&date_2023/1/11 更新準備開始
&button_#最近更新されたページ 最近更新されたページはこちら

&2 SW2.5
ソード・ワールド2.5の新刊情報はこちら。刊行予想もしています。
&button_/sw25/new
`

const andml3 = `
&1 About Me
管理人のしゃちほこ丸については以下をご覧ください。
&button_/me
`

const recentBlog = $pageSettingList.filter(page => !page.hidden && page.to.indexOf('/blog/') === 0).slice(0, 2)
</script>

<style lang="scss" scoped>
div.thumbnail-div {
  width: 100%;
  position: relative;

  &::before {
    content: "";
    display: block;
    padding-top: 50%;
  }

  .thumbnail-img {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
  }
}
</style>