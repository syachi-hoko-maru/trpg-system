<template>
  <card-array-by-andml :andml="first" />
  <card-list v-if="images.length" title="歴代Twitterアイコン">
    <card
      v-for="image of images.filter(({ date }) => new Date().getTime() >= new Date(date.split('/').map(s => s.length >= 2 ? s : '0' + s).join('-')).getTime())"
      :id="image.title">
      <template #tbefore>
        <item-img
          :src="`${$templateText.basePath}/webp/icon-image/${image.date.split('/').map(s => s.length >= 2 ? s : '0' + s).join('')}.webp`"
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
        <item-img :src="`${$templateText.basePath}/webp/icon-image/mi_${image.src}.webp`"
          :alt="`${image.title}をイメージしたアイコン画像`" />
      </template>
      <template #title>{{ image.title }}</template>
      <andml :andmls="image.explain" v-if="image.explain" />
    </card>
  </card-list>
  <card-list title="その他">
    <card>
      <template #tbefore>
        <item-img :src="`${$templateText.basePath}/webp/icon-image/syachi.webp`" alt="シャリタツ風しゃちほこ丸画像" />
      </template>
      <template #title>
        シャリタツ（しゃちほこ丸のすがた）
      </template>
    </card>
  </card-list>
  <card-list v-if="miimages.length" title="おともだち（？）">
    <card v-for="image of friends" :id="image.title">
      <template #tbefore>
        <item-img :src="`${$templateText.basePath}/webp/icon-image/${image.src}.webp`" :alt="`${image.title}のイメージ画像`" />
      </template>
      <template #title>{{ image.title }}</template>
      <andml :andmls="image.explain" v-if="image.explain" />
    </card>
  </card-list>
</template>

<script setup lang="ts">
const { $templateText } = useNuxtApp()

const first = `
しゃちほこ丸と申します。
&br
&em_「しゃち」模様で「ほこ」を持った「丸」い「しゃちほこ」 です。
色と模様がときどき変わることがあるので、それを記録としてここに残します。
&br
自己紹介はこちら。
&button_/me
`

const images = [
  {
    title: "通常",
    date: "2022/12/14",
    explain: ""
  },
  {
    title: "夏",
    date: "2023/7/1",
    explain: "みなさん、熱中症には気をつけてください。"
  },
  {
    title: "梅雨",
    date: "2023/6/24",
    explain: "とりあえず折り畳み傘を持っておくと幸せになれる季節。"
  },
  {
    title: "白いシャチ",
    date: "2023/6/14",
    explain: "知床に現れたという「白いシャチ」カラーです。"
  },
  {
    title: "誕生日",
    date: "2023/5/23",
    explain: "誕生日ブログは &link_/blog/matome,こちら 。風船が飛びます。割って遊んでください。"
  },
  {
    title: "こどもの日",
    date: "2023/5/5",
    explain: "こどもの日なので鯉のぼりバージョンになってみました。"
  },
  {
    title: "ゴールデンウィーク",
    date: "2023/5/2",
    explain: "GWなので金色に。2023年のGWは「2日休めば最大9連休」です。"
  },

  {
    title: "Misskey（TRPGがすきー！）",
    date: "2023/4/16",
    explain: "&link_https://trpger.us/@syachi_hoko_trp,MisskeyのTRPGがすきー！(TRPGer.us) に参加したのでその際のデフォルトアイコンの色を使ってアイコンを作りました。"
  },
  {
    title: "夜桜",
    date: "2023/4/2",
    explain: "桜の一部色換えです。"
  },
  {
    title: "WBC 侍ジャパン",
    date: "2023/3/21",
    explain: "準決勝メキシコ戦の逆転勝利祝い。翌日はアメリカに勝って優勝。最高でした。"
  },
  {
    title: "桜",
    date: "2023/3/15",
    explain: "背景には &link_https://haikei.app/,こちら を使用させていただきました。"
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