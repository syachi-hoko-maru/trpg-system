<template>
  <layouts-title-card-titlecard :page-setting="pageSetting" />
  <v-alert v-if="pageSetting && pageSetting.hidden && pageSetting.to !== 'error'" class="my-5" type="error"
    :text="`このページは動作実験中の未公開ページです。見つけた方はそっと閉じてください。`" />
  <card v-if="pageSetting && !pageSetting.specialPage && pageSetting.img">
    <template #tbefore>
      <!-- <v-responsive width="100%" aspect-ratio="40/21"> -->
      <item-img :src="`${$templateText.basePath}/webp/${pageSetting.img}`" :alt="`「${pageSetting.title}」ページのサムネイル画像`" />
      <!-- </v-responsive> -->
    </template>
  </card>
  <layouts-paging v-if="pageSetting && pageSetting.page" :page-setting="pageSetting" top />
  <layouts-title-card-pageindex v-if="pageSetting && !pageSetting.specialPage" :page-setting="pageSetting" />
  <card v-if="pageSetting && pageSetting.tags.join('').indexOf('sw25') >= 0">
    <template #pbefore>
      <div class="text-caption text-medium-emphasis py-3" data-nosnippet>
        当ページの全てまたは一部のコンテンツは、「北沢慶」「グループSNE」及び「株式会社KADOKAWA」が権利を有する『ソード・ワールド2.5』の二次創作物です。<br>
        （C）北沢慶／グループSNE
      </div>
    </template>
  </card>
</template>

<script setup lang="ts">
// interface Props {
//   pageSetting?: PageSetting
// }
// const Props = defineProps<Props>();

const { nowPageSetting } = usePages()
const pageSetting = nowPageSetting
</script>

<style lang="scss" scoped>
.share-icon {
  display: inline;
}
</style>