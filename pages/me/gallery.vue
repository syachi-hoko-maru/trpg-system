<template>
  <card-array-by-andml :andml="andml" />
  <card-list>
    <card v-for="image of images" v-if="images.length">
      <template #tbefore>
        <v-img
          :src="`${$templateText.basePath}/webp/icon-image/${image.date.split('/').map(s => s.length >= 2 ? s : '0' + s).join('')}.webp`"
          :alt="image.title" />
      </template>
      <template #title>{{ image.title }}</template>
      <template #subtitle>{{ image.date }}</template>
      {{ image.explain }}
    </card>
  </card-list>
  <card>
    <template #title>その他</template>
    <template #pbefore>
      <card>
        <template #tbefore>
          <v-img :src="`${$templateText.basePath}/webp/icon-image/syachi.webp`" alt="シャリタツ風" />
        </template>
        <template #title>
          シャリタツ（しゃちほこ丸のすがた）
        </template>
      </card>
    </template>
  </card>
</template>

<script setup lang="ts">
const { $templateText } = useNuxtApp()

const andml = `
しゃちほこ丸と申します。
&br
&em_「しゃち」模様で「ほこ」を持った「丸」い「しゃちほこ」 です。
色とときどき模様が変わることがあるので、それを記録としてここに残します。
&br
自己紹介はこちら。
&button_/me
`

const images = [
  {
    title: "通常",
    date: "2025/1/1",
    explain: ""
  },
  {
    title: "桜",
    date: "2023/3/15",
    explain: ""
  },
  {
    title: "ホワイトデー",
    date: "2023/3/14",
    explain: "白にするか迷いましたが、「ホワイトデー」で画像検索すると水色が多かったので水色です。"
  },
  {
    title: "ひな祭り",
    date: "2023/3/3",
    explain: "色だけ。"
  },
  {
    title: "バレンタインデー",
    date: "2023/2/14",
    explain: ""
  },
  {
    title: "雪うさぎ",
    date: "2023/1/2",
    explain: "卯年なので雪うさぎも。"
  },
  {
    title: "正月",
    date: "2023/1/1",
    explain: "卯年なので……。もう少し可愛いうさみみを研究中。"
  },
  {
    title: "大晦日",
    date: "2022/12/31",
    explain: "2022年の干支は寅でした。"
  },
  {
    title: "クリスマス",
    date: "2022/12/24",
    explain: "2021年はサンタコスをしたので、2022年はトナカイコスをしました。"
  },
  {
    title: "12月",
    date: "2022/12/1",
    explain: "冬っぽい色と、クリスマスツリーな「ほこ」"
  },

]
</script>