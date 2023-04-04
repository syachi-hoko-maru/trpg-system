<template>
  <item-share :text="shareSetting.text" :url="shareSetting.url" :icon="icon">
    <slot />
  </item-share>
</template>

<script setup lang="ts">
interface Props {
  icon?: boolean
}
const Props = defineProps<Props>();

const { nowPageSetting } = usePages()
const { $templateText } = useNuxtApp()

const shareSetting = computed(() => {
  const text = nowPageSetting.value.to.indexOf("blog/") >= 0 ? `ブログ「${nowPageSetting.value.title}」` : nowPageSetting.value.title
  const url = $templateText.baseUrl + nowPageSetting.value.to
  return {
    text,
    url
  }
})
</script>

