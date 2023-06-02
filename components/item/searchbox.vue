<template>
    <andml :andmls="andml1" />
    <v-text-field label="検索キーワード" v-model="word" density="comfortable" class="mt-3" />
    <item-button :url="`/search?word=${word}`" :disabled="!word" type="right">
        検索する
    </item-button>
</template>

<script setup lang="ts">
const word = ref("")

const samplewords = ["ソード・ワールド2.5", "初心者", "エンシェントブルー", "SW2.5 サプリメント", "SW2.5 新刊", "SW2.5 種族", "SW2.5 技能", "オンセ 素材", "デモンズライン"]

const shuffle = <T>(array: Array<T>) => {
    for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const setAndml = (word: string) => `「 &link_/search?word=${word.replace(/\s/g, "and")},${word.replace(/\s/g, "¥s")} 」`

const andml1 = ref(`
${(samplewords).slice(0, 3).map(setAndml).join()}など気になるワードを検索してみてください。
`)

const route = useRoute()
onMounted(() => {
    watch(route, () => {
        andml1.value = `
${shuffle(samplewords).slice(0, 3).map(setAndml).join()}など気になるワードを検索してみてください。
`
    })
})

</script>