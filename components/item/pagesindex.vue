<template>
  <card-list :title="title">
    <card v-for="page of pageSettingList" :key="page.to" :comingsoon="page.hidden">
      <template #tbefore>
        <item-img :src="`${$templateText.basePath}/webp/${page.img}`" :alt="`ページ「${page.title}」のサムネイル画像`" />
      </template>
      <div class="text">
        <div class="pagesindex-explain">
          <item-head2>
            {{ page.title }}
          </item-head2>
          {{ page.explain }}
        </div>
      </div>
      <item-button :to="page.to">
        こちら
      </item-button>
    </card>
    <slot />
  </card-list>
</template>

<script setup lang="ts">
interface Props {
  pageSettingList: PageSetting[]
  title?: string
}
const Props = defineProps<Props>();
</script>

<style lang="scss" scoped>
div.text {
  .pagesindex-explain {
    max-height: 218px;
    overflow: hidden;
  }
}
</style>