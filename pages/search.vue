<template>
  <card>
    <template #title>
      検索
    </template>
    <div v-if="mounted">
      <item-form-input :form-setting="form" @keydown.enter="changeSetting" />
      <item-tags-chip v-for="pageTag of $pageTags" :label="$pageTagSettings[pageTag].label" :key="pageTag"
        :color="selectTag === pageTag ? 'primary' : ''"
        @click="() => selectTag = (selectTag === pageTag ? undefined : pageTag)" />
      <item-button @click="changeSetting">
        検索する
      </item-button>
    </div>
  </card>
  <card>
    <template #title> {{ setTitle }} </template>
    <template #default v-if="explain">{{ explain }}</template>
    <template #default v-else-if="!results.length">
      検索結果はありません。
      <div class="my-2" v-if="sortValue!=='デフォルト（関連度順）'">
        デフォルト（関連度順）では、関連が少しでもあるものが表示されます。<br>
        他の順序の場合、関連が薄いものは除外され、「検索結果はありません。」と表示されることがあります。
        <item-button @click="sortValue='デフォルト（関連度順）'">デフォルト（関連度順）で表示</item-button>
      </div>
      <div v-else>
        他のキーワードで検索してください。
      </div>
    </template>
    <template #pafter v-if="results.length">
      <v-select label="並び順" prepend-inner-icon="mdi-sort" v-model="sortValue" :items="sortValues" density="comfortable"
        v-if="mounted" />
      <pages-search :results="results.map(d => d.pageSetting)" />
    </template>
  </card>
</template>

<script setup lang="ts">
import { Ref } from 'vue';

const route = useRoute();
const router = useRouter()

const { $pageSettingList, $isPageTag, $pageTagSettings, $pageTags, $templateText } = useNuxtApp()
const { getNowPage, getQuerys, getNowPath } = usePages()
const { ok, setLoad } = useLoad()

const form: Ref<FormSettingString> = ref({
  name: "search",
  label: "検索キーワード",
  type: "string",
  value: "",
} as FormSettingString)

const selectTag: Ref<PageTag | undefined> = ref(undefined);

const querys: Ref<{
  [key: string]: string;
}[]> = ref([])

const results: Ref<{ pageSetting: PageSetting, kanren: number }[]> = ref([])
const setTitle = ref("ページ一覧")
const explain = ref("")

const changeHead = () => {
  const description = (explain.value
    ? explain.value
    : `${setTitle.value}の一覧です。ページ：${results.value.slice(0, 3).map(page => `「${page.pageSetting.title}」`).join("・")}など。`) + `このページではサイト内検索ができます。`
  useHead({
    title: setTitle.value, meta: [
      { hid: "og:url", name: 'og:url', content: $templateText.baseUrl + getNowPage(), },
      { hid: "og:title", name: 'og:title', content: setTitle.value, },
      { hid: "og:description", name: "og:description", content: description },
      { hid: "og:image", name: "og:image", content: $templateText.baseUrl + "/ogp.png" },
      { hid: "description", name: "description", content: description },
    ]
  })
}
watch(explain, changeHead)
watch(setTitle, changeHead)

const sortValues = ["デフォルト（関連度順）", "更新日が新しい順", "更新日が古い順"] as const
const sortValue = ref("デフォルト（関連度順）" as typeof sortValues[number])

const mounted = ref(false)

const searchSetting: {
  word?: string,
  tag?: PageTag,
} = {}


const changeSetting = () => {
  searchSetting.word = form.value.value?.replace(/[,、\s+]/g, "and") || ""
  searchSetting.tag = selectTag.value
  const newPath = getNowPath() + "?" + Object.entries(searchSetting).filter(([key, value]) => value).map(([key, value]) => `${key}=${value}`).join("&")
  if (newPath !== getNowPage()) {
    router.replace(newPath)
  }
  search()
}

const changeRoute = () => {
  const nowQuerys = getQuerys()
  if (!nowQuerys || querys.value === nowQuerys) return
  querys.value = nowQuerys
  querys.value.forEach((query) =>
    Object.entries(query).map(([key, value]) => {
      if (key === "word") {
        const word = decodeURIComponent(value)
        searchSetting.word = word
        form.value.value = word ? word.replace(/and/g, " ") : ""
      } else if (key === "tag" && $isPageTag(value)) {
        searchSetting.tag = value
        selectTag.value = value
      }
    })
  )
}

const searchJson: Ref<{ [key: string]: string }> = ref({});
let count = 0
const fetch = async () => {
  try {
    const json = (await useFetch($templateText.basePath + '/search.json').catch(err => {
      console.error(err)
      return { data: ref({}) }
    })).data.value as { [key: string]: string }
    if (json["/"]) {
      searchJson.value = json
      search()
    }
    else throw ""
  } catch {
    count++
    if (count < 5) setTimeout(fetch, 0.5 * count * 1000)
  }
}

let searchFlag = false
const search = (): void => {
  searchFlag = true
  explain.value = "";

  const setting = Object.entries(searchSetting).filter(([key, value]) => value)
  if (!setting.length) {
    setTitle.value = "ページ一覧"
  } else {
    setTitle.value = "検索結果"
  }

  const filters: ((ps: PageSetting) => number)[] = []
  setting.map(([key, value]) => {
    if (key === "tag" && $isPageTag(value)) {
      filters.push(pageSetting => {
        if (pageSetting.tags.findIndex(tag => tag.indexOf(value) >= 0) >= 0) return 1
        else return 0
      })
      if (setting.length === 1) {
        setTitle.value = `タグ「${$pageTagSettings[value].label}」がついたページ`
        explain.value = $pageTagSettings[value].explanation
      }
    }
    if (key === "word") {
      const words = decodeURIComponent(value).split("and")
      const lang = (pageSetting: PageSetting): [string, string] => {
        let result = "";
        result += (Array.isArray(pageSetting.explain) ? pageSetting.explain.join() : pageSetting.explain)
        result += pageSetting.tags.map(tag => $pageTagSettings[tag].label + $pageTagSettings[tag].explanation).join()
        try {
          result += searchJson.value[pageSetting.to]
        } catch { }
        return [pageSetting.title, result]
      }
      filters.push(pageSetting => {
        let count = 0
        let point = 0
        // だいたいの単語数
        const [title, str] = lang(pageSetting)
        const wordCount = str.length / words.join("").length
        for (let word of words) {
          if (title.indexOf(word) >= 0) {
            // タイトルに一致するものがあれば1を返す
            point += 1
          } else if (str.indexOf(word) >= 0) {
            // pointには「マッチ度」（=マッチした数/だいたいの単語数）を入れる
            point += Math.min((str.match(new RegExp(word, "g")) || []).length / wordCount, 1)
          } else {
            // 一致するものがなければcountを-1する
            count -= 1
          }
        }
        if (count >= 0) {
          return 1 + point / words.length
        } else {
          return point / words.length
        }
      })
      if (setting.length === 1) {
        setTitle.value = `「${words.join(" ")}」に関連するページ`
      }
    }
  })
  results.value = $pageSettingList
    .filter(pageSetting => {
      if (pageSetting.to === "/search") return false
      if (pageSetting.to === "error") return false
      return true
    })
    .map(pageSetting => {
      let kanren = 0
      for (let filter of filters) {
        kanren += filter(pageSetting) / filters.length
      }
      return { pageSetting, kanren }
    })
    .filter(({ kanren }) => filters.length ? kanren > 0 : kanren >= 0)
    .sort((a, b) => -a.kanren + b.kanren)
  // console.log(results.value)
  sort()
  changeHead()
  searchFlag = false
}


const sort = () => {
  if (searchFlag) {
    if (sortValue.value !== "デフォルト（関連度順）") sortValue.value = "デフォルト（関連度順）"
    return
  }
  if (sortValue.value === "デフォルト（関連度順）") {
    search()
    return
  }
  const kanrenResult = results.value
    .filter(({ kanren }) => kanren >= 1)
  results.value = (kanrenResult.length ? kanrenResult : results.value)
    .sort((a, b) => {
      if (sortValue.value === "更新日が古い順") return - new Date(b.pageSetting.lastmod).getTime() + new Date(a.pageSetting.lastmod).getTime()
      if (sortValue.value === "更新日が新しい順") return new Date(b.pageSetting.lastmod).getTime() - new Date(a.pageSetting.lastmod).getTime()
      else return 0
    })
}

changeRoute()
fetch()
search()

onMounted(() => {
  changeRoute()
  mounted.value = true

  watch(route, changeRoute)
  watch(sortValue, sort)
  watch(ok, search)
})

</script>

