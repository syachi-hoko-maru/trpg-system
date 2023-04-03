<template>
  <card-list>
    <card v-for="page of pageSettingList" :key="page.to">
      <template #tbefore>
        <v-img :src="`${$templateText.basePath}/webp/${page.img}`" />
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
}
const Props = defineProps<Props>();
</script>