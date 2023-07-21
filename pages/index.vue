<template>
  <card>
    <template #before>
      <div class="thumbnail-div">
        <div class="thumbnail-img">
          <item-img src="/page-image/main.webp" alt="ヘッダー画像" />
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

  <div class="grid">
    <card-array-by-andml :andml="andml1" nobefore />
    <card nobefore>
      <template #title>
        Recent Updates
      </template>
      <template #pbefore>
        <item-carousel
          :page-setting-list="$pageSettingList.filter(p => p.osusume && p.img).sort(sortPagesByDate(true)).splice(0, 10)" />
      </template>
      <item-button to="/search?sort=recent">最近更新されたページ一覧はこちら</item-button>
    </card>
    <item-notice title="Notice" nobefore />
  </div>

  <div class="grid contents">
    <card-array-by-andml :andml="andml2" nobefore />
    <card nobefore>
      <template #title>
        Pick Up Pages
      </template>
      <template #pbefore>
        <item-carousel :page-setting-list="osusumePageArray.filter(pageSetting => pageSetting.img)"
          :hidden="!mounted || !osusumePageArray.length" />
      </template>
    </card>
  </div>

  <div class="grid">
    <card nobefore>
      <template #title>
        Search & Tags
      </template>
      <item-searchbox />
      <template #pafter>
        <item-head2>Tags</item-head2>
        クリックでタグのついたページ一覧を見ることができます。
      </template>
      <template #after>
        <item-tags-list />
      </template>
    </card>
    <card-array-by-andml :andml="andml4" nobefore />
    <layouts-tail-card-aboutme nobefore />
  </div>
</template>

<script setup lang="ts">
import { sortPagesByDate } from '~/src/util/date';

const { $pageSettingList } = useNuxtApp()
const { osusumePageArray } = usePages()

const andml1 = `
&1 Welcome!!
このサイトはTRPGのファンサイトです！
特にソード・ワールド2.5（SW2.5/ソドワ）をメインに扱っています！
&br
&&noandml
This site is a fan site for TRPGs, especially Sword World 2.5!
I'm sorry but most of the content on this website is written only in Japanese.
Please use translations to read this website.
&&&
`

const andml2 = `
&1 For Beginner
TRPG初心者の方向けに、TRPGやソード・ワールド2.5の紹介を行っています。
「TRPGって何？」「SW2.5って何？」って方はぜひご覧ください。
&br
&&noandml
This site introduces TRPGs and Sword World 2.5 for TRPG beginners!
&&&
&button_/trpg
&button_/sw25
&button_/sw25/forbeginner

&1 Scenario
ソード・ワールド2.5などのTRPGシナリオを公開しています。
また、ソード・ワールド2.5のおすすめシナリオを紹介しています。
&br
&&noandml
I release TRPG scenarios for Sword World 2.5 and other TRPG scenarios.
And, I present recommended scenarios for Sword World 2.5.
&&&
&button_/scenario
&button_/sw25/forbeginner/scenario

&1 Tools for SW2.5
ソード・ワールド2.5を遊ぶ際に役立つ様々なツールを公開しています。
ぜひお役立てください。
&br
&&noandml
This site has useful tools for Sword World 2.5.
&&&
&button_/sw25/tool
&button_/sw25/tool/intro
// &button_/sw25/tool/simulate
// &button_/sw25/tool/bosyu
&button_/sw25/tool/material
&button_/sw25/tool? ツール一覧はこちら

&1 SW2.5 infomation
ソード・ワールド2.5のお役立ち情報・最新情報も掲載しています。
&br
&&noandml
This site provides useful information and updates on Sword World 2.5.
&&&
&button_/sw25/forbeginner/suppliment/1
&button_/sw25/new
&button_${$pageSettingList
    .filter(page => !page.hidden && page.tags.indexOf("sw25_new") >= 0 && page.to !== "/sw25/new")
    .sort(sortPagesByDate(true))[0].to
  }

&1 SW2.5 FANMADE Data
ソード・ワールド2.5のオリジナルデータを作成・公開しています。
&br
&&noandml
This website offers Sword World 2.5 fanmade data.
&&&
&button_/sw25/data
&button_/search?tag=sw25_moso&sort=recent タグ「SW2.5妄想」がついたページ

&1 Blog
ブログにはTRPGで思ったことなどを書いています。
&br
&&noandml
I write about my thoughts on TRPGs on my blog.
&&&
${$pageSettingList.filter(page => !page.hidden && page.to.indexOf('/blog/') === 0).slice(0, 3).map(page => `&button_${page.to}`).join("\n")}
&button_/blog? ブログ一覧はこちら

&1 And More Contents
他にもTRPGに関する様々なコンテンツを用意しています！
色々と見てみてください！
&br
&&noandml
This site also has a variety of other TRPG-related contents!
&&&
&button_/search
`

const andml4 = `
&1 History & News
&date_today 随時更新中
&date_2023/6/2 本公開
&date_2023/3/1 仮公開
// &date_2023/1/11 更新準備開始
&br
最新の更新情報はTwitterにて発信します！
また、ご意見ご要望などもお待ちしております。
&br
よろしければTwitterのフォローをお願いします。
&br
&&noandml
The latest updates will be sent out via twitter!
We also welcome your comments and requests.
Please follow me on twitter!
&&&
&ltwitter
`


const mounted = ref(false)
onMounted(() => {
  mounted.value = true
})
</script>

<style lang="scss">
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

.grid {
  margin: 20px auto;
  padding: 0;
  width: 100%;
  column-count: 3;
  column-gap: 20px;

  @media screen and (max-width: 1920px) {
    column-count: 2;
  }

  @media screen and (max-width: 600px) {
    column-count: 1;
  }



  >section.card-div {
    margin-bottom: 20px;
    -webkit-column-break-inside: avoid;
    page-break-inside: avoid;
    break-inside: avoid;

    >div.v-card {
      margin: 0 !important;
    }
  }

  &.contents {
    div.page-card-div {
      margin: 20px;

      div.page-card-incard {
        aspect-ratio: 40/21;

        .pagecard-image {
          width: 100%;
          height: 100%;
        }

        .pagecard-text {
          display: none;
        }
      }
    }
  }
}
</style>