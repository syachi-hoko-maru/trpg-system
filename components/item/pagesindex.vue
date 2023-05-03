<template>
  <card-list :title="title">
    <card v-for="page of pageSettingList" :key="page.to">
      <template #tbefore>
        <item-img :src="`${$templateText.basePath}/webp/${page.img}`" :alt="`ページ「${page.title}」のサムネイル画像`" />
      </template>
      <template #title>
        {{ page.title }}
      </template>
      <div class="text">
        {{ page.explain }}
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