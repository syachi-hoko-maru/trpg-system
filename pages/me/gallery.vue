<template>
  <card-array-by-andml :andml="first" />
  <card-list v-if="iconImages.length" title="歴代Twitterアイコン">
    <card v-for="image of iconImages.filter(({ date }) => isPast(date))" :id="image.title">
      <template #tbefore>
        <item-img :src="`/icon-image/${image.date.split('/').map(s => s.length >= 2 ? s : '0' + s).join('')}.webp`"
          :alt="`${image.title}をイメージしたアイコン画像`" />
      </template>
      <template #title>{{ image.title }}</template>
      <template #subtitle>{{ image.date }}</template>
      <andml :andmls="image.explain" v-if="image.explain" />
    </card>
  </card-list>
  <card-list v-if="miimages.length" title="Twitter未公開アイコン">
    <card v-for="image of miimages" :id="image.title">
      <template #tbefore>
        <item-img :src="`/icon-image/mi_${image.src}.webp`" :alt="`${image.title}をイメージしたアイコン画像`" />
      </template>
      <template #title>{{ image.title }}</template>
      <andml :andmls="image.explain" v-if="image.explain" />
    </card>
  </card-list>
  <card-list title="その他">
    <card>
      <template #tbefore>
        <item-img :src="`/icon-image/syachi.webp`" alt="シャリタツ風しゃちほこ丸画像" />
      </template>
      <template #title>
        シャリタツ（しゃちほこ丸のすがた）
      </template>
    </card>
  </card-list>
  <card-list v-if="miimages.length" title="おともだち（？）">
    <card v-for="image of friends" :id="image.title">
      <template #tbefore>
        <item-img :src="`/icon-image/${image.src}.webp`" :alt="`${image.title}のイメージ画像`" />
      </template>
      <template #title>{{ image.title }}</template>
      <andml :andmls="image.explain" v-if="image.explain" />
    </card>
  </card-list>
  <card-list title="いただいたイラスト！">
    <card>
      <template #tbefore>
        <item-img src="/other/dagon/illust.webp" alt="Dagonさんからいただいた記念イラスト" />
      </template>
      <template #title>Dagonさんからいただいた記念イラスト</template>
      <andml andmls="&link_/sw25/fav/dagon,こちらのインタビュー の記念でいただきました。ぜひインタビュー読んでください！" />
    </card>
  </card-list>
</template>

<script setup lang="ts">
import { iconImages } from '~/src/dict/icons';
import { isPast } from '~/src/util/date';

const first = `
しゃちほこ丸と申します。
&br
&em_「しゃち」模様で「ほこ」を持った「丸」い「しゃちほこ」 です。
色と模様がときどき変わることがあるので、それを記録としてここに残します。
&br
自己紹介はこちら。
&button_/me
`

const miimages = [
  {
    title: "ダルマ",
    src: "daruma",
    explain: ""
  },
  {
    title: "海老天",
    src: "ebi",
    explain: "金色が海老天に見えてしまったので、海老天カラーも作ってみました。"
  },
  {
    title: "柏餅",
    src: "kashiwa",
    explain: ""
  },
  {
    title: "花火",
    src: "fireworks",
    explain: ""
  },
  {
    title: "紅葉",
    src: "koyo",
    explain: ""
  },
]

const friends = [
  {
    title: "サカバンバスピス",
    src: "sacabambaspis",
    explain: "フィンランドのヘルシンキ自然史博物館に展示されているという復元模型の写真がバズりました"
  },
  {
    title: "サカバンバスピス",
    src: "sacabambaspis2",
    explain: "&link_http://paleontology.sakura.ne.jp/sakabanbasupisu.html,古世界の住人 さんを参考にしたデザイン"
  },
]

</script>