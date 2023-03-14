<template>
  <card v-if="mounted">
    <template #title>
      検索
    </template>
    <item-form-input :form-setting="form" />
    <item-tags-chip v-for="pageTag of $pageTags" :label="$pageTagSettings[pageTag].label" :key="pageTag"
      :color="selectTag === pageTag ? 'primary' : ''"
      @click="() => selectTag = (selectTag === pageTag ? undefined : pageTag)" />
    <item-button @click="changeSetting">
      検索する
    </item-button>
  </card>
  <card>
    <template #title>{{ setTitle }}</template>
    <template #default v-if="explain">{{ explain }}</template>
    <template #pafter v-if="results.length">
      <pages-search :results="results" />
    </template>
  </card>
</template>

<script setup lang="ts">
import { Ref } from 'vue';

const route = useRoute();
const router = useRouter()

const { $pageSettingList, $isPageTag, $pageTagSettings, $pageTags, $templateText } = useNuxtApp()
const { getQuerys, getNowPath } = usePages()

const form: Ref<FormSettingString> = ref({
  name: "search",
  label: "検索キーワード",
  type: "string",
  value: "",
} as FormSettingString)

const selectTag: Ref<PageTag | undefined> = ref(undefined)

const querys: Ref<{
  [key: string]: string;
}[]> = ref([])

const results: Ref<PageSetting[]> = ref([])
const setTitle = ref("ページ一覧")
const explain = ref("")

const searchSetting: {
  word?: string,
  tag?: PageTag,
} = {}

const setRouter = () => {
  router.replace(getNowPath() + "?" + Object.entries(searchSetting).filter(([key, value]) => value).map(([key, value]) => `${key}=${value}`).join("&"))
}
const changeSetting = () => {
  searchSetting.word = form.value.value
  searchSetting.tag = selectTag.value
  // form.value.value = ""
  // selectTag.value = undefined
  setRouter()
}

const changeRoute = () => {
  const nowQuerys = getQuerys()
  if (nowQuerys && querys.value !== nowQuerys) {
    querys.value = nowQuerys
    querys.value.forEach((d) =>
      Object.entries(d).map(([key, value]) => {
        // console.log(key, value)
        if (key === "word") {
          const word = decodeURIComponent(value)
          searchSetting.word = word
          form.value.value = word
        } else if (key === "tag" && $isPageTag(value)) {
          searchSetting.tag = value
          selectTag.value = value
        }
      })
    )
    // console.log(searchSetting)
    setRouter();
    search()
  }
}

let searchJson: Ref<{ [key: string]: string }> = ref({});
let count = 0
const fetch = async () => {
  try {
    const json = (await useFetch($templateText.basePath + '/search.json').catch(err => {
      console.error(err)
      return { data: ref({}) }
    })).data.value as { [key: string]: string }
    if (json["/"]) { searchJson.value = json }
    else throw ""
  } catch {
    count++
    if (count < 5) setTimeout(fetch, 0.5 * count * 1000)
  }
}

const search = (): void => {
  explain.value = "";

  const setting = Object.entries(searchSetting).filter(([key, value]) => value)
  if (!setting.length) {
    setTitle.value = "ページ一覧"
  } else {
    setTitle.value = "検索結果"
  }

  const filters: ((ps: PageSetting) => boolean)[] = []
  setting.map(([key, value]) => {
    if (key === "tag" && $isPageTag(value)) {
      filters.push(pageSetting => pageSetting.tags.findIndex(tag => tag.indexOf(value) >= 0) >= 0)
      if (setting.length === 1) {
        setTitle.value = `タグ「${$pageTagSettings[value].label}」がついたページ`
        explain.value = $pageTagSettings[value].explanation
      }
    }
    if (key === "word") {
      const word = decodeURIComponent(value)
      const lang = (pageSetting: PageSetting) => {
        let result = "";
        result += pageSetting.title
        result += (Array.isArray(pageSetting.explain) ? pageSetting.explain.join() : pageSetting.explain)
        result += pageSetting.tags.map(tag => $pageTagSettings[tag].label + $pageTagSettings[tag].explanation).join()
        try {
          result += searchJson.value[pageSetting.to]
        } catch { }
        return result
      }
      filters.push(pageSetting => lang(pageSetting).indexOf(word) >= 0)
      if (setting.length === 1) {
        setTitle.value = `「${word}」の検索結果`
      }
    }
  })
  results.value = $pageSettingList.filter(pageSetting => {
    for (let filter of filters) {
      if (!filter(pageSetting)) return false
    }
    return true
  })
}

const mounted = ref(false)

onMounted(() => {
  setTimeout(() => {
    changeRoute()
    mounted.value = true
    fetch()
  }, 0.1 * 1000)
  watch(route, changeRoute)
})

</script>

