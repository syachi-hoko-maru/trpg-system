<template>
    <andml :andmls="andml1" />
    <v-text-field label="検索キーワード" v-model="word" density="comfortable" class="mt-3" />
    <item-button :url="`/search/${searchParams}`" prepend-icon="mdi-magnify" :disabled="!word" type="right" normal-button>
        検索する
    </item-button>
</template>

<script setup lang="ts">

interface Props {
    word?: string,
    title?: string
}
const Props = defineProps<Props>()

const word = ref(Props.word ? Props.word : "")
const searchParams = computed(() => word.value.replace(/\s/g, "/"))

const samplewords = [
    "ソード・ワールド2.5",
    "TRPG 初心者",
    "初心者向け",
    "SW2.5 サプリメント",
    "SW2.5 新刊",
    "SW2.5 種族",
    "SW2.5 技能",
    "オンセ 素材",
    "ココフォリア",
    "自己紹介シート",
    // シナリオ
    "シナリオ",
    "おすすめシナリオ",
    "初心者向けシナリオ",
    "ウォフトルーバの研究所跡",
    // 冒険者の旅路関連
    "冒険者の旅路",
    "ふきのとうを採りに",
    "C102",
    "夏コミ",
    // ラクシアライフ
    "ラクシアライフ",
    "一般技能",
    // アーケインレリック関連
    "アーケインレリック",
    "SW2.5 5周年",
    "スプリガン", "アビスボーン", "フロウライト", "ハイマン", "ダークドワーフ",
    // エンシェントブルー
    "エンシェントブルー",
    // おすすめサプリメント
    "おすすめサプリメント",
    "エピックトレジャリー",
    "デモンズライン",
    // アルケリンガ
    "アルケリンガ"
]

const shuffle = <T>(array: Array<T>) => {
    for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const setAndmlLink = (word: string) => `「 &link_/search/${word.replace(/\s/g, "/")},${word.replace(/\s/g, "¥s")} 」`
const setSampleAndml = (words: string[]) => `
${(words).slice(0, 3).map(setAndmlLink).join()}など気になるワードを検索してみてください。
`

const andml1 = ref(setSampleAndml(shuffle(samplewords)))

const route = useRoute()
onMounted(() => {
    watch(route, () => {
        andml1.value = setSampleAndml(shuffle(samplewords))
    })
})

</script>