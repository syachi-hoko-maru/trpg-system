<template>
  <item-share :text="shareSetting.text" :url="shareSetting.url" :icon="icon">
    <slot />
  </item-share>
  <item-button
    v-if="withcopy"
    prepend-icon="mdi-content-copy"
    @click.stop="() => $copy(shareSetting.url)"
  >
    このページのURLをコピー
  </item-button>
</template>

<script setup lang="ts">
import { getPageSetting } from "~/src/pages/getPageSetting";

interface Props {
  icon?: boolean;
  withcopy?: boolean;
}
const Props = defineProps<Props>();

const { $templateText } = useNuxtApp();
const route = useRoute();
const pageSetting = ref(getPageSetting(route.fullPath));
watch(
  () => route.fullPath,
  () => {
    pageSetting.value = getPageSetting(route.fullPath);
  }
);

const shareSetting = computed(() => {
  const text =
    pageSetting.value.to.indexOf("blog/") >= 0
      ? `ブログ「${pageSetting.value.title}」`
      : pageSetting.value.title;
  const url =
    $templateText.baseUrl +
    (pageSetting.value.to !== "/" ? pageSetting.value.to + "/" : "/");
  return {
    text,
    url,
  };
});
</script>
