<template>
  <v-app>
    <header>
      <layouts-header />
    </header>
    <aside>
      <layouts-dialogo />
    </aside>
    <layouts-main>
      <article>
        <layouts-title-card v-if="mountedPageSetting" :page-setting="mountedPageSetting" />
        <div id="page">
          <slot />
        </div>
        <layouts-paging v-if="mountedPageSetting && mountedPageSetting.page" :page-setting="mountedPageSetting" />
      </article>
      <aside>
        <layouts-tail-card v-if="mountedPageSetting" :page-setting="mountedPageSetting" />
      </aside>
    </layouts-main>
    <aside>
      <layouts-snack />
    </aside>
    <footer>
      <layouts-footer />
    </footer>
  </v-app>
</template>

<script setup lang="ts">
import { Ref } from 'vue';
import { useTheme } from 'vuetify'

const route = useRoute();
const router = useRouter();
const theme = useTheme()

const { getNowPath, savePage } = usePages()
const { $getPageSetting, $templateText } = useNuxtApp()

const mountedPageSetting: Ref<PageSetting | undefined> = ref(undefined)

let blogFlag = false
const pageSetting = computed(() => {
  const pageUrl = getNowPath()
  if (!pageUrl && pageUrl !== "") return
  if (pageUrl.indexOf("/blog/") >= 0) {
    blogFlag = true
  } else {
    blogFlag = false
  }
  const pageSetting = $getPageSetting(pageUrl)
  return pageSetting
})

const changePage = () => {
  savePage()
  if (!pageSetting.value) return
  if (blogFlag) {
    // console.log("blog!!")
    return
  }
  const title = (pageSetting.value.title ? `${pageSetting.value.title} - ` : "") + $templateText.title;
  const meta = [
    {
      hid: "og:url",
      name: 'og:url',
      content: $templateText.baseUrl + pageSetting.value.to,
    }, {
      hid: "og:title",
      name: 'og:title',
      content: title,
    }
  ]
  if (pageSetting.value.explain?.length) {
    meta.push({
      hid: "og:description",
      name: "og:description",
      content: Array.isArray(pageSetting.value.explain) ? pageSetting.value.explain.join("\n") : pageSetting.value.explain
    })
  } else {
    meta.push({
      hid: "og:description",
      name: "og:description",
      content: "このサイトではTRPG、特にSW2.5のシナリオの公開や、役立つツールの提供などを行なっています。"
    })
  }
  if (pageSetting.value.img) {
    meta.push({
      hid: "og:image",
      name: "og:image",
      content: $templateText.baseUrl + "/" + pageSetting.value.img.replace(".webp", ".png")
    })
  } else {
    meta.push({
      hid: "og:image",
      name: "og:image",
      content: $templateText.baseUrl + "/ogp.png"
    })
  }
  useHead({
    title,
    meta
  });
}

changePage()

const { ok } = useLoad()

onMounted(() => {
  changePage()
  mountedPageSetting.value = pageSetting.value
  theme.global.name.value = localStorage.getItem('theme') !== "dark" ? "myCustomLightTheme" : "myCustomDarkTheme"
  console.log(ok.value)
  watch(ok, () => {
    console.log(ok.value)
    if (ok.value) router.replace(route.fullPath.replace(route.fullPath, decodeURI(route.fullPath)))
  })

  watch(route, () => {
    changePage()
    mountedPageSetting.value = pageSetting.value
  })
})
</script>

<style scoped>
#mainContainer {
  max-width: 100vw;
  width: 100vw
}
</style>