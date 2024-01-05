<template>
  <card>
    <template #title>
      {{ path }} は存在しません
    </template>
    <!-- {{ $pageSettingList
      .filter(page => page.page)
      .forEach((page) => {
        if ("/" + path === page.to) navigateTo(page.to + "/1")
      })
    }} -->
    <item-button url="/">
      トップページに戻る
    </item-button>
    <item-button v-if="pageArray && pageArray.length >= 2" :url="pageArray[1]">
      1つ前のページへ戻る
    </item-button>
  </card>
</template>

<script setup lang="ts">
const { pageArray } = usePages()
const { $redirectList, $pageSettingList } = useNuxtApp()

const { params } = useRoute()
const router = useRouter()

const path = ref("")

const redirect = () => {
  if (params.slug.length > 0) {
    path.value = (Array.isArray(params.slug) ? params.slug.join("/") : params.slug).replace(/\/$/, "")
    // console.log("target", path.value)
    if (Object.entries($redirectList).length > 0) {
      console.log(Object.entries($redirectList).length)
      Object.entries($redirectList).forEach(([key, value]) => {
        if (path.value === key) {
          console.log("replace", path.value, value)
          router.replace(value)
        }
      })
    }
    if ($pageSettingList.length > 0) {
      $pageSettingList
        .filter(pageSetting => pageSetting.page?.length)
        .forEach((page) => {
          if ("/" + path.value === page.to) router.replace(page.to + "/1")
        })
    }

  }
}
redirect()
onMounted(() => {
  redirect()
})
</script>