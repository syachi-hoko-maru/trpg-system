<template>
    <card>
        <template #title>
            検索
        </template>
        <!-- <div v-if="mounted">
            <item-form-input :form-setting="form" @keydown.enter="changeSetting" />
            <item-tags-chip v-for="pageTag of $pageTags" :label="$pageTagSettings[pageTag].label" :key="pageTag"
                :color="selectTag === pageTag ? 'primary' : ''"
                @click="() => selectTag = (selectTag === pageTag ? undefined : pageTag)" />
            <item-button @click="changeSetting">
                検索する
            </item-button>
        </div> -->
        <item-searchbox :word="words.join(' ')" />
    </card>
    <card>
        <template #title> {{ title }} </template>
        <template #default>
            <div v-html="explain" class="mb-5" />
            <template v-if="!showPageSettings.length">
                検索結果はありません。
                <div class="my-2" v-if="sortSetting !== 'default'">
                    デフォルト（関連度順）では、関連が少しでもあるものが表示されます。<br>
                    他の順序の場合、関連が薄いものは除外され、「検索結果はありません。」と表示されることがあります。
                    <item-button @click="() => sortSetting = 'default'">デフォルト（関連度順）で表示</item-button>
                </div>
                <div v-else>
                    他のキーワードで検索してください。
                </div>
            </template>
            <template v-else>
                <v-select label="並び順" prepend-inner-icon="mdi-sort" v-model="sortSetting" :items="sortValues"
                    item-title="label" item-value="value" density="comfortable" v-if="mounted" />
                <pages-search :results="showPageSettings" />
                <item-head2>{{ results.length }}件中{{ showPageSettings.length }}件を表示中</item-head2>
                <item-button v-if="results.length > showPageSettings.length" @click="showCount++">もっと見る</item-button>
            </template>
        </template>
    </card>
</template>
  
<script setup lang="ts">
import { search } from '~/src/search';
import { fetchSearchJSON } from '~/src/search/fetch';
import { isSortType, sort, SortType, sortValues } from '~/src/search/sort';

const route = useRoute();
const router = useRouter()
const { $templateText } = useNuxtApp()
const { getNowPage, getQueryValue } = usePages()
const params: string | string[] = route.params.params

const sortSetting = ref("default" as SortType)
const mounted = ref(false)

const title = ref("")
const explain = ref("")
const results = ref([] as SearchResult[])
const allFlag = ref(true as boolean)
const description = ref("")
const tags = ref([] as PageTag[])
const words = ref([] as string[])
const sortedResults = ref([] as SearchResult[])
const showCount = ref(0)

// const selectTag: Ref<PageTag | undefined> = ref(undefined);

const showPageSettings = computed(() => sortedResults.value.map(({ pageSetting }) => pageSetting).slice(0, (showCount.value + 1) * 10))

const searchJSON = ref({} as SearchJSON)
fetchSearchJSON().then(result => {
    searchJSON.value = result
    if (mounted.value) {
        searchPages()
    }
})

const checkQuery = () => {
    const rawSortSetting = getQueryValue("sort")
    // 旧URLならrouter replaceする
    const rawTag = getQueryValue("tag")
    const rawWord = getQueryValue("word")
    if (rawTag || rawWord) {
        router.replace("/search/" + [rawTag, rawWord].join("/") + `?sort=${rawSortSetting}`)
    }
    // そうでなければ検索方法を設定する
    if (rawSortSetting && isSortType(rawSortSetting)) {
        sortSetting.value = rawSortSetting
    }
}
const changeHead = () => {
    useHead({
        title: title.value,
        meta: [
            { hid: "og:url", name: 'og:url', content: $templateText.baseUrl + getNowPage(), },
            { hid: "og:title", name: 'og:title', content: title.value, },
            { hid: "og:description", name: "og:description", content: description.value },
            { hid: "og:image", name: "og:image", content: $templateText.baseUrl + "/image/page-image/search.png" },
            { hid: "description", name: "description", content: description.value },
        ]
    })
}
const sortPages = () => {
    showCount.value = 0
    sortedResults.value = sort(results.value, sortSetting.value, allFlag.value)
}
const searchPages = () => {
    checkQuery()
    const searchResult = search(params, searchJSON.value)
    title.value = searchResult.title
    explain.value = searchResult.explain
    results.value = searchResult.results
    allFlag.value = searchResult.allFlag
    description.value = searchResult.description
    tags.value = searchResult.tags
    words.value = searchResult.words
    sortPages()
    // console.log(sortedResults.value.map(({ pageSetting, kanren }) => `${pageSetting.to}, ${kanren}`))
    changeHead()
}

searchPages()

onMounted(() => {
    mounted.value = true
    searchPages()
    watch(sortSetting, sortPages)
})
</script>
  
  