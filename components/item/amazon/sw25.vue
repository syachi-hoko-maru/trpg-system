<template>
  <div v-if="mini && items.length" class="my-5">
    <item-scrollx :nobutton="items.length >= 3">
      <div v-for="item of items" :key="item.name" class="mx-2">
        <item-amazon-core :item="item" />
        <!-- <iframe :title="`${item.title}のAmazonリンク`" loading="lazy"
          sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin"
          style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0"
          :src="item.src" /> -->
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
          <div v-for="item of items" :key="item.name" class="mx-2">
            <item-amazon-core :item="item" />
            <!-- <iframe :title="`${item.title}のAmazonリンク`" loading="lazy"
              sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin"
              style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0"
              :src="item.src" /> -->
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
// import { amazonItems } from '~/src/dict/amazon';
import amazonItems from '~/src/temp/amazon.json';
import { AmazonSearchResult } from "~/src/amazon-paapi/types";
import { shuffle } from '~/src/util';
import { bookList } from '~/src/dict/new';
import { sortByDate } from '~/src/util/date';

interface Props {
  mini?: boolean,
  item?: string[]
}
const Props = defineProps<Props>();

const andml1 = `
こちらから購入いただくとAmazonから紹介料をいただけます。
&em_活動支援としてポチっていただけたら 幸いです。
&br
なお、稀に在庫切れなどにより高額転売が行われています。
定価を確認の上、購入するようお願いします。
`

const andml2 = `
※ おすすめのサプリメントについては以下をご覧ください。
&button_/sw25/forbeginner/suppliment
`
const kohoList: string[] | undefined = Props.item
if (kohoList && kohoList[0] === "recent") {
  kohoList.unshift(...bookList
    .sort((a, b) => sortByDate(true)(a.date, b.date))
    .flatMap(b => [b.title, b.amazon ? b.amazon : ""])
    .filter(f => f)
  )
}
const items: AmazonSearchResult<string>[] =
  Array.isArray(amazonItems) ?
    Array.isArray(kohoList) ?
      kohoList.reduce((prev, koho) => {
        if (koho) {
          prev.push(
            ...amazonItems
              .filter(({ name }) => !prev.find(p => p.name === name) && name.indexOf(koho) >= 0)
          )
        }
        return prev
      }, [] as AmazonSearchResult<string>[])
      : // 一旦ランダムで10個を表示するように
      shuffle(amazonItems.filter(i => i.prefix.indexOf("ソード・ワールド") >= 0)).slice(0, 10)
    : []

</script>
