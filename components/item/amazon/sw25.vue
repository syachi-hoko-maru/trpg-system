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
import { amazonItems } from '~/src/dict/amazon';

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

const items = amazonItems.filter((item, i) => {
  if (item.genre !== "sw25") return false
  if (!Props.item)
    if (i < 10) return true
    else return false
  if (Props.item.find(i => item.title.indexOf(i) >= 0)) return true
  return false
})
</script>
