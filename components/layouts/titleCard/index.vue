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
  <card v-if="pageSetting.tags.join('').indexOf('sw25') >= 0">
    <template #pbefore>
      <div class="text-caption text-medium-emphasis py-3" data-nosnippet>
        当ページの全てまたは一部のコンテンツは、「北沢慶」「グループSNE」及び「株式会社KADOKAWA」が権利を有する『ソード・ワールド2.5』の二次創作物です。<br>
        （C）北沢慶／グループSNE
      </div>
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

// const rand = ref(Math.random())
// watch(Props, () => {
//   rand.value = Math.random()
// })
</script>

<style lang="scss" scoped>
.share-icon {
  display: inline;
}
</style>