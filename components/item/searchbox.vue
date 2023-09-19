<template>
    <andml :andmls="andml1" />
    <v-text-field label="検索キーワード" v-model="word" density="comfortable" class="mt-3" />
    <item-tags-chip v-for="pageTag of $pageTags" :label="$pageTagSettings[pageTag].label" :key="pageTag"
        :color="selectTags.indexOf(pageTag) >= 0 ? 'primary' : ''" @click="() => clickTag(pageTag)" />
    <item-button :url="`/search/${searchParams}`" prepend-icon="mdi-magnify" :disabled="!searchParams" type="right"
        normal-button>
        検索する
    </item-button>
</template>

<script setup lang="ts">
import { sampleWords } from "~/src/search/sampleWords"
import { shuffle } from '~/src/util';

interface Props {
    word?: string,
    tag?: PageTag[]
}
const Props = defineProps<Props>()

const word = ref(Props.word ? Props.word : "")
const selectTags = ref(Array.isArray(Props.tag) ? Props.tag : []);

const searchParams = computed(() => [...selectTags.value, ...word.value.split(" ")].join("/"))

const andml1 = ref("")

const setSampleAndml = (words: string[]) => {
    const setAndmlLink = (word: string) => `「 &link_/search/${word.replace(/\s/g, "/")},${word.replace(/\s/g, "¥s")} 」`
    andml1.value = `${(words).slice(0, 3).map(setAndmlLink).join()}など気になるワードを検索してみてください。`
}

const clickTag = (pageTag: PageTag) => {
    const index = selectTags.value.indexOf(pageTag)
    if (index >= 0) {
        selectTags.value.splice(index, 1)
    } else {
        selectTags.value.push(pageTag)
    }
}

const route = useRoute()
onMounted(() => {
    setSampleAndml(shuffle(sampleWords))
    watch(route, () => {
        setSampleAndml(shuffle(sampleWords))
    })
})

</script>