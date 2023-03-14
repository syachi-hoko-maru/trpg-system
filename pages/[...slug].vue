<template>
  <card>
    <template #title>
      {{ path }} は存在しません
    </template>
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
const { $redirectList, $templateText } = useNuxtApp()

const { params } = useRoute()
const path = ref("")

const redirect = () => {
  if (params.slug.length > 0) {
    path.value = (Array.isArray(params.slug) ? params.slug.join("/") : params.slug).replace(/\/$/, "")
    if (Object.entries($redirectList).length > 0) {
      Object.entries($redirectList).forEach(([key, value]) => {
        if (path.value === key) navigateTo(value)
      })
    }
  }
}
redirect()
onMounted(() => {
  redirect()
})
</script>