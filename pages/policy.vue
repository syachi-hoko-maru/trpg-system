<template>
  <card-array-by-andml :andml="andml" />
  <pages-contact />
  <card>
    <item-button url="/?">
      トップページへ
    </item-button>
  </card>
</template>

<script setup lang="ts">
const { $templateText } = useNuxtApp()

const andml = `
&1 サイトポリシー
このウェブサイトは、${$templateText.title} （ 以下「本サイト」 ）です。
本サイトは、${$templateText.name}が作成・管理しています。
&br
サイトポリシーの内容は予告なしに変更する場合があります。
あらかじめご了承ください。

&1 免責事項
本サイトは個人が管理するTRPGのファンサイトです。
情報の正確性などには注意しておりますが、ミスもあることをご了承ください。

&1 動作環境
本サイトは &link_https://www.google.com/intl/ja_jp/chrome/,GoogleChrome の最新版で動作確認をしています。

&1 著作権
本サイトおよび本サイトに掲載されている画像等のコンテンツは、特記されているものを除いて${$templateText.name}に帰属します。
著作権法によって認められる場合を除き、許可なくこれらを利用することはできません。
&2 書影
書影に関しては &link_https://www.hanmoto.com/about_bookdata,「版元ドットコム」の「書影や書誌は自由にお使いください」というページ に基づき、本の紹介などのため、トリミングなどを使用せず利用しています。

&1 リンク
本サイトへのリンクは、自由に掲載することができます。
連絡不要ですが、連絡いただけると喜びます。

&2 コンテンツへの直リンク
画像などのコンテンツへの直リンクを掲載することは禁止します。
ページへのリンクをご利用ください。

&2 フレーム
ウェブサイトのフレーム内に本サイトを表示することは禁止します。

&1 Googleアナリティクス
本サイトは &link_https://marketingplatform.google.com/intl/ja/about/analytics/,Googleアナリティクス を使用しています。

&1 Amazonアソシエイト
Amazonのアソシエイトとして、しゃちほこ丸は適格販売により収入を得ています。
`
</script>

