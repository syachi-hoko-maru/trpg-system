<template>
  <card>
    <template #title>
      Amazon商品リンク
    </template>
    <div class="d-flex flex-row" id="amazon-list">
      <div v-for="item of items" :key="item.title" class="mx-2">
        <iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin"
          style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0"
          :src="item.src" />
      </div>
    </div>
    <item-button url="https://amzn.to/3T30UvM">
      「ソード・ワールド2.5」を検索
    </item-button>
    <item-caption>
      ※ Amazonアソシエイト・プログラムに参加しています
    </item-caption>
  </card>
</template>

<script setup lang="ts">
const items = [
  {
    title: "ブルライト博物誌",
    src: "//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=syachihokotrp-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=404074876X&linkId=5dd76d077ddec9f2e9c0737ca601d36d"
  },
  {
    title: "エンシェントブルー",
    src: "//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=syachihokotrp-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4040749146&linkId=531153ff4d2e8cfb3ae449814ab8dd12"
  },
  {
    title: "ルールブックI",
    src: "//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=syachihokotrp-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4040728076&linkId=caab8103d8951f3873671769f5b34c52"
  },
  {
    title: "ルールブックII",
    src: "//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=syachihokotrp-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4040728114&linkId=7edd08670f55d98302891d10389f15bd"
  },
  {
    title: "ルールブックIII",
    src: "//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=syachihokotrp-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4040728122&linkId=b5838eb57d409fdd1b3dc14fe79c681b"
  },
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
]
</script>

<style lang="scss" scoped>
#amazon-list {
  width: 100%;
  overflow-x: scroll;
}
</style>