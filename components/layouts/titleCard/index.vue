<template>
  <card v-show="!pageSetting.specialPage">
    <template #title>
      <div class="d-flex align-end">
        <span>{{ pageSetting.title }} {{ pageSetting.page ? page : "" }}</span>
        <v-spacer />
        <item-share-page :page-setting="pageSetting" icon />
      </div>
    </template>
    <template #subtitle v-if="pageSetting.to.indexOf('/blog/') === 0">{{ pageSetting.lastmod }}</template>
    <template #after v-if="pageSetting.tags?.length">
      <item-tags :tags="pageSetting.tags" class="py-0" />
    </template>
  </card>
  <card v-if="!pageSetting.specialPage && pageSetting.img">
    <template #tbefore>
      <v-img :src="`${$templateText.basePath}/webp/${pageSetting.img}`" :alt="`${pageSetting.title}サムネイル画像`" />
    </template>
  </card>
</template>

<script setup lang="ts">
interface Props {
  pageSetting: PageSetting
}
const Props = defineProps<Props>();

const { getNowPagePage } = usePages()
const page = computed(getNowPagePage)

</script>

<style lang="scss" scoped>
.share-icon {
  display: inline;
}
</style>