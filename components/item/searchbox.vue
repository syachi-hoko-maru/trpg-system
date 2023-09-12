<template>
    <andml :andmls="andml1" />
    <v-text-field label="検索キーワード" v-model="word" density="comfortable" class="mt-3" />
    <item-button :url="`/search/${searchParams}`" prepend-icon="mdi-magnify" :disabled="!word" type="right" normal-button>
        検索する
    </item-button>
</template>

<script setup lang="ts">
import { sampleWords } from "~/src/search/sampleWords"

interface Props {
    word?: string,
    title?: string
}
const Props = defineProps<Props>()

const word = ref(Props.word ? Props.word : "")
const searchParams = computed(() => word.value.replace(/\s/g, "/"))

const andml1 = ref("")

const shuffle = <T>(array: Array<T>) => {
    for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const setSampleAndml = (words: string[]) => {
    const setAndmlLink = (word: string) => `「 &link_/search/${word.replace(/\s/g, "/")},${word.replace(/\s/g, "¥s")} 」`
    andml1.value = `${(words).slice(0, 3).map(setAndmlLink).join()}など気になるワードを検索してみてください。`
}
setSampleAndml(shuffle(sampleWords))

const route = useRoute()
onMounted(() => {
    watch(route, () => {
        setSampleAndml(shuffle(sampleWords))
    })
})

</script>