<template>
  <div v-if="mini && items.length" class="my-5">
    <item-scrollx>
      <div v-for="item of items" :key="item.title" class="mx-2">
        <iframe :title="`${item.title}のAmazonリンク`" loading="lazy"
          sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin"
          style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0"
          :src="item.src" />
      </div>
    </item-scrollx>
    <item-caption>
      ※ Amazonアソシエイト・プログラムに参加しています
    </item-caption>
  </div>
  <card v-else-if="items.length">
    <template #title>
      Amazon商品リンク
    </template>
    <div>
      <andml :andmls="andml1" />
      <div class="my-5">
        <item-scrollx>
          <div v-for="item of items" :key="item.title" class="mx-2">
            <iframe :title="`${item.title}のAmazonリンク`" loading="lazy"
              sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin"
              style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0"
              :src="item.src" />
          </div>
        </item-scrollx>
        <item-button url="https://amzn.to/3T30UvM">
          「ソード・ワールド2.5」を検索
        </item-button>
        <item-caption>
          ※ Amazonアソシエイト・プログラムに参加しています
        </item-caption>
      </div>
      <andml :andmls="andml2" />
    </div>
  </card>
</template>

<script setup lang="ts">
interface Props {
  mini?: boolean,
  item?: string[]
}
const Props = defineProps<Props>();

const andml1 = `
こちらから購入いただくとAmazonから紹介料をいただけます。
&em_活動支援としてポチっていただけたら 幸いです。
`

const andml2 = `
※ おすすめのサプリメントについては以下をご覧ください。
&button_/sw25/forbeginner/suppliment
`

const items: { title: string, src: string }[] = [
  {
    title: "リプレイ 時の魔域と秘宝の守り人",
    src: "//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=syachihokotrp-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4040750241&linkId=6d2bf0e7dbf9aaf6f8fa577e14236b7e"
  },
  {
    title: "アーケインレリック",
    src: "//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=syachihokotrp-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4040750640&linkId=a2dbb02933e972a78fbe9abd89190817"
  }, {
    title: "ノベル+シナリオ 猫と星と秘宝",
    src: "//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=syachihokotrp-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4040751167&linkId=946eccfc502b3e03bee511b5111b2656"
  },
  {
    title: "異世界冒険ガイド2",
    src: "//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=syachihokotrp-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B0C3ZHJ68W&linkId=30059ced40c6b20087ec994b0ed8a53b"
  },
  {
    title: "エンシェントブルー",
    src: "//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=syachihokotrp-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4040749146&linkId=531153ff4d2e8cfb3ae449814ab8dd12"
  },
  {
    title: "ブルライト博物誌",
    src: "//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=syachihokotrp-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=404074876X&linkId=5dd76d077ddec9f2e9c0737ca601d36d"
  },
  // {
  //   title: "ルールブックI",
  //   src: "//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=syachihokotrp-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4040728076&linkId=caab8103d8951f3873671769f5b34c52"
  // },
  // {
  //   title: "ルールブックII",
  //   src: "//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=syachihokotrp-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4040728114&linkId=7edd08670f55d98302891d10389f15bd"
  // },
  // {
  //   title: "ルールブックIII",
  //   src: "//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=syachihokotrp-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4040728122&linkId=b5838eb57d409fdd1b3dc14fe79c681b"
  // },
  {
    title: "エピックトレジャリー",
    src: "//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=syachihokotrp-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4040733711&linkId=a7e11b51f30b22ba9a73c8d8a37d3677"
  },
  {
    title: "モンストラスロア",
    src: "//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=syachihokotrp-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4040738209&linkId=f3fee570c86df68a12cc5abc5d4c9796"
  },
  {
    title: "メイガスアーツ",
    src: "//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=syachihokotrp-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4040742834&linkId=a5825d6b386671cb1760f7f39e8883aa"
  },
  {
    title: "バトルマスタリー",
    src: "//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=syachihokotrp-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4040747003&linkId=37cb411fa79d8c5271089bb8d071801a"
  },
  {
    title: "アウトロープロファイルブック",
    src: "//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=syachihokotrp-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4040741617&linkId=c186cd01eae19a61bd222de58eb8917f"
  },
  {
    title: "魔導の学府ユーシズ",
    src: "//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=syachihokotrp-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4040743571&linkId=700ccbc814466b9d63db95badcf788c1"
  },
  {
    title: "ヴァイスシティ",
    src: "//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=syachihokotrp-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4040731581&linkId=d1f7922005cbb59b2b72244745db728a"
  },
  {
    title: "デモンズライン",
    src: "//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=syachihokotrp-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4040737261&linkId=2b12e3f9a5cf86ce9cd0f8cb417e5d75"
  },
  {
    title: "グリフォンロード",
    src: "//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=syachihokotrp-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4040744721&linkId=1df8349424f1b1ddb8ef4d06c84ef72b"
  },
  {
    title: "異世界冒険ガイド",
    src: "//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=syachihokotrp-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B0B3432N2N&linkId=2ae2556161d75a1d0352544df9aa8a9f"
  },
  {
    title: "異世界冒険ガイド 異世界武器ぺディア",
    src: "//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=syachihokotrp-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=404074764X&linkId=9b14ba0bb637abb2157bee3e39c9cdf5"
  },
  {
    title: "リプレイ ALLグララン総進撃!",
    src: "//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=syachihokotrp-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4040748549&linkId=13191204b52e8df9727f5079c4d977fe"
  },
  {
    title: "GMウォーロック",
    src: "//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=syachihokotrp-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4775320904&linkId=5d472c4b9250a8e37f3a06425f193214"
  },
  {
    title: "TRPGのデザイン",
    src: "//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=syachihokotrp-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B0C4TFYGF6&linkId=7b6e37a646ee45449ad904f81b603455"
  },
].filter((item, i) => {
  if (!Props.item)
    if (i < 10) return true
    else return false
  if (Props.item.find(i => item.title.indexOf(i) >= 0)) return true
  return false
})
</script>
