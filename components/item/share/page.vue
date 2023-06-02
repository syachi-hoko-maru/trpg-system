<template>
  <item-share :text="shareSetting.text" :url="shareSetting.url" :icon="icon">
    <slot />
  </item-share>
  <item-button v-if="withcopy" prepend-icon="mdi-content-copy" @click.stop="() => $copy(shareSetting.url)">
    このページのURLをコピー
  </item-button>
</template>

<script setup lang="ts">
interface Props {
  icon?: boolean
  withcopy?: boolean
}
const Props = defineProps<Props>();

const { nowPageSetting } = usePages()
const { $templateText } = useNuxtApp()

const shareSetting = computed(() => {
  const text = nowPageSetting.value.to.indexOf("blog/") >= 0 ? `ブログ「${nowPageSetting.value.title}」` : nowPageSetting.value.title
  const url = $templateText.baseUrl + (nowPageSetting.value.to !== "/" ? nowPageSetting.value.to + "/" : "/")
  return {
    text,
    url
  }
})
</script>

