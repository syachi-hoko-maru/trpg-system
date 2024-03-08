<template>
  <card-list :title="title">
    <card
      v-for="page of pageSettingList.filter((p) => !p.noSearch)"
      :key="page.to"
      :comingsoon="isHidden(page)"
    >
      <template #tbefore v-if="page.img">
        <item-img
          :src="page.img"
          :alt="`ページ「${page.title}」のサムネイル画像`"
        />
      </template>
      <div class="text">
        <div class="pagesindex-explain">
          <item-head2>
            {{ page.title }}
          </item-head2>
          {{ page.explain }}
        </div>
      </div>
      <item-button :url="page.to" normal-button> こちら </item-button>
    </card>
    <slot />
  </card-list>
</template>

<script setup lang="ts">
import { isHidden } from "~/src/pages/getPageSetting";

interface Props {
  pageSettingList: PageSetting[];
  title?: string;
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
