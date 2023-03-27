<template>
  <item-share :text="shareSetting.text" :url="shareSetting.url" :icon="icon">
    <slot />
  </item-share>
</template>

<script setup lang="ts">
interface Props {
  pageSetting: PageSetting,
  icon?: boolean
}
const Props = defineProps<Props>();

const { $templateText } = useNuxtApp()

const shareSetting = computed(() => {
  const text = Props.pageSetting.to.indexOf("blog/") >= 0 ? `ブログ「${Props.pageSetting.title}」` : Props.pageSetting.title
  const url = $templateText.baseUrl + Props.pageSetting.to
  return {
    text,
    url
  }
})
</script>

