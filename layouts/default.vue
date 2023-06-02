<template>
  <Html lang="ja" />
  <noscript>
    当サイトはjavascriptの実行が許可されていることが前提となっています！<br>
    あなたが現在使用しているブラウザではjavascriptの実行が許可されていませんので、許可してからご覧いただければ幸いです。<br>
    よろしくお願いいたします。
  </noscript>
  <v-app>
    <game-balloons v-if="pageSetting?.to === '/blog/matome'
      || new Date().getDate() === 23 && new Date().getMonth() + 1 === 5
      // SW2.5の誕生日
      || new Date().getDate() === 20 && new Date().getMonth() + 1 === 7
      // SW2.0の誕生日
      || new Date().getDate() === 18 && new Date().getMonth() + 1 === 4" />
    {{ pageSetting?.to }}
    <layouts-header />
    <aside>
      <layouts-dialogo />
    </aside>
    <div id="app" :class="fixed ? 'fixed' : ''" :style="fixed ? `top: -${top}px` : ''">
      <layouts-main>
        <article>
          <layouts-title-card />
          <div id="page">
            <slot />
          </div>
          <lazy-layouts-paging />
        </article>
        <aside>
          <lazy-layouts-tail-card />
        </aside>
      </layouts-main>
    </div>
    <aside>
      <layouts-snack />
    </aside>
    <footer>
      <lazy-layouts-footer />
    </footer>
  </v-app>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'

const route = useRoute();
const router = useRouter();
const theme = useTheme()

const { fixed } = useDialogo()
const { getNowPath, nowPageSetting } = usePages()
const { $getPageSetting, $templateText } = useNuxtApp()

// const mountedPageSetting: Ref<PageSetting | undefined> = ref(undefined)

const top = ref(0)
const path = ref("")

let originalHheadFlag = false
const pageSetting = computed(() => {
  const pageUrl = getNowPath()
  if (!pageUrl && pageUrl !== "") return
  if (pageUrl.indexOf("/blog/") >= 0 || pageUrl === "/search") {
    originalHheadFlag = true
  } else {
    originalHheadFlag = false
  }
  const pageSetting = $getPageSetting(pageUrl)
  return pageSetting
})

const changePage = () => {
  if (!pageSetting.value) return
  if (originalHheadFlag) {
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
  const description = pageSetting.value.explain?.length
    ? (Array.isArray(pageSetting.value.explain) ? pageSetting.value.explain.join("\n") : pageSetting.value.explain)
    : "このサイトではTRPG、特にSW2.5のシナリオの公開や、役立つツールの提供などを行なっています。"
  meta.push({
    hid: "og:description",
    name: "og:description",
    content: description
  })
  meta.push({
    hid: "description",
    name: "description",
    content: description
  })
  if (pageSetting.value.img) {
    meta.push({
      hid: "og:image",
      name: "og:image",
      content: $templateText.baseUrl + "/image/" + pageSetting.value.img.replace(".webp", ".png")
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
  // mountedPageSetting.value = pageSetting.value
  theme.global.name.value = localStorage.getItem('theme') === "light" ? "myCustomLightTheme" : "myCustomDarkTheme"
  console.log(ok.value)
  watch(ok, () => {
    console.log(ok.value)
    if (ok.value) router.replace(route.fullPath.replace(route.fullPath, decodeURI(route.fullPath)))
  })
  watch(route, () => {
    changePage()
    // mountedPageSetting.value = pageSetting.value
  })
  watch(fixed, () => {
    if (fixed.value) {
      top.value = window.scrollY
      path.value = route.fullPath
    }
    else {
      setTimeout(() => {
        if (path.value === route.fullPath) {
          window.scrollTo(0, top.value)
        } else {
          window.scrollTo(0, 0)
        }
      }, 0.01 * 1000)
    }
    console.log(top.value)
  })
})
</script>

<style lang="scss" scoped>
#app {
  width: 100vw;

  &.fixed {
    position: fixed;
    height: 100vh;
  }
}
</style>