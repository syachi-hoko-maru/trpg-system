<template>
  <card v-show="!pageSetting.specialPage">
    <template #title>{{ pageSetting.title }}</template>
    <template #subtitle v-if="pageSetting.to.indexOf('/blog/') === 0">{{ pageSetting.lastmod }}</template>
    <template #after v-if="pageSetting.tags?.length">
      <item-tags :tags="pageSetting.tags" class="py-0" />
    </template>
  </card>
  <card v-if="!pageSetting.specialPage && pageSetting.img">
    <template #tbefore>
      <v-img :src="`${$templateText.basePath}/${pageSetting.img}`" alt="サムネイル画像" />
    </template>
  </card>
</template>

<script setup lang="ts">
interface Props {
  pageSetting: PageSetting
}
const Props = defineProps<Props>();
</script>