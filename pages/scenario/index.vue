<template>
  <card-array-by-andml :andml="andml1" />
  <card-list>
    <card v-for="sd of $scenarioData" :key="sd.id">
      <template #tbefore>
        <v-img :src="`${$templateText.basePath}/webp/${sd.img}`" :alt="`${sd.title}サムネイル画像`" />
      </template>
      <template #title>{{ sd.title }}</template>
      <template #subtitle>
        {{ sd.system }} / {{ sd.author }}
      </template>
      <div class="text">
        <andml :andmls="sd.explain" />
      </div>
      <item-button v-for="u of sd.url" :url="u.url" :key="u.url" normal-button>
        {{ u.site }}
      </item-button>
    </card>
  </card-list>
  <card-array-by-andml :andml="andml2" />
</template>

<script setup lang="ts">
const andml1 = `
&1 このページについて
このページでは当ウェブサイトの管理人しゃちほこ丸が作ったTRPGシナリオを公開しております。
よければ見ていってください。
&br
なお、ページ下部には &em_おすすめシナリオの紹介 ページへのリンクもあるので、併せてご覧ください。

&2 注意点
&3 シナリオ改変OK
シナリオを改変して遊ぶことは、 &em_参加者が楽しめるようにする目的 において、全面的にOKです。
&br
なお、今後の参考のため、改変した内容を &itwitter へ教えていただけると助かります。
「改変したものを公開したい」という場合は &itwitter へ連絡いただければ前向きに検討いたします。

&3 配信等OK
また、該当のTRPGシステムが許す範囲において、シナリオとしては収益化を含め配信OK、場所代などをとるセッションでの使用もOKです。
その他心配な点があれば、お気軽に &itwitter までご相談ください。
`

const andml2 = `
&1 おすすめシナリオ一覧
ソード・ワールド2.5の &em_おすすめのシナリオ一覧 を以下のページで公開しています。
よければこちらも併せてご覧ください。
&button_/sw25/forbeginner/scenario#おすすめシナリオ一覧 こちら

&1 シナリオの探し方
ソード・ワールド2.5の &em_初心者GM 向けに、シナリオの探し方を掲載しています。
よければこちらも併せてご覧ください。
&button_/sw25/forbeginner/scenario こちら

`

</script>