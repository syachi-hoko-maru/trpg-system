<template>
    <div class="mb-3">
        <item-head3>{{ book.title }}</item-head3>
        <div class="my-2">
            <dl class="d-flex my-1" v-for="[key, value] of Object
                .entries(book)
                .filter(([key], i, arr) =>
                    key !== 'title' && key !== 'amazon' && (key !== 'date' || arr.map(a => a[0]).indexOf('dispDate') === -1)
                )">
                <dt>{{ langList[key as BookAttr] }}</dt>
                <dd>{{ value }}</dd>
            </dl>
        </div>
        <andml v-if="book.type === 'GMウォーロック'" :andmls="aboutgmw" />
        <andml v-if="book.type === '異世界冒険ガイド'" :andmls="aboutisekai" />
        <item-amazon-sw25 :item="[book.title || '', book.amazon || '']" mini />
        <item-button v-if="!book.explain" :url="`/search/?word=${book.title}&tag=sw25_new`">
            詳細・紹介はこちら
        </item-button>
    </div>
</template>

<script setup lang="ts">
import { Book, BookAttr, langList } from '~/src/dict/new';

interface Props {
    book: Book
}
const Props = defineProps<Props>();

const aboutgmw = `
※ GMウォーロックとはグループSNEが刊行している雑誌。
ソード・ワールド2.5に関しても &em_サポート情報 や &em_シナリオ・ソロアドベンチャー（GM不要な1人用シナリオ） 、 &em_新刊情報 などが掲載される。 
&link_https://www.fujisan.co.jp/product/1281702551/,定期購読の申し込みはこちら
&link_https://sne-ec.com/category/item/supportmagazine/gm_warlock/,購入はこちら（グループSNE公式アンテナショップ「SNE-EC」）
`
const aboutisekai = `
「異世界冒険ガイド」シリーズについては以下のページで詳しく解説しています！
&button_/sw25/forbeginner/isekai
`

</script>

<style lang="scss" scoped>
dl {
    dt {
        width: 30%;
    }

    dd {
        width: 70%;
    }
}
</style>