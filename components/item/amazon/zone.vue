<template>
    <card>
        <template #title>
            Amazon商品リンク
        </template>
        <div>
            <andml :andmls="andml1" />
            <div>
                <div class="my-5 flex-area amazon-zone">
                    <div v-for="item of items" :key="item.title" class="zone">
                        <iframe :title="`${item.title}のAmazonリンク`" loading="lazy"
                            sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" marginwidth="0"
                            style="width:120px;height:240px;" marginheight="0" scrolling="no" frameborder="0"
                            :src="item.src" />
                    </div>
                </div>
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

// interface Props { }
// const Props = defineProps<Props>();

const andml1 = `
  こちらから購入いただくとAmazonから紹介料をいただけます。
  &em_活動支援としてポチっていただけたら 幸いです。
  `

const andml2 = `
  ※ ソード・ワールド2.5のおすすめサプリメントについては以下をご覧ください。
&button_/sw25/forbeginner/suppliment
  `

const items = amazonItems.filter((item, i) => {
    return true
})

onMounted(() => {
    const araEls = document.querySelectorAll(".amazon-zone")
    for (let araEl of araEls) {
        const width = araEl.clientWidth
        const count = Math.floor(width / 128)
        const margin = (width - count * 128) / (count * 2)
        console.log(width, count, margin)
        console.log(width)
        const els = araEl.querySelectorAll("div.zone")
        for (let el of els) {
            el.setAttribute("style", `margin: ${margin}px`)
        }
    }
})
</script>

<style scoped lang="scss">
div.flex-area {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;

    div.zone {
        display: flex;
        width: 120px;
    }
}
</style>