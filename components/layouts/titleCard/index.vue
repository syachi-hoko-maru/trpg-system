<template>
  <layouts-title-card-titlecard :page-setting="pageSetting" />
  <v-alert v-if="pageSetting.hidden && pageSetting.to !== 'error'" class="my-5" type="error"
    :text="`このページは動作実験中の未公開ページです。見つけた方はそっと閉じてください。`" />
  <card v-if="!pageSetting.specialPage && pageSetting.img">
    <template #tbefore>
      <v-img :src="`${$templateText.basePath}/webp/${pageSetting.img}`" :alt="`${pageSetting.title}サムネイル画像`" />
    </template>
  </card>
  <layouts-paging v-if="pageSetting && pageSetting.page" :page-setting="pageSetting" top />
  <layouts-title-card-pageindex :page-setting="pageSetting" v-if="!pageSetting.specialPage" />
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
</script>

<style lang="scss" scoped>
.share-icon {
  display: inline;
}
</style>