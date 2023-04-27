<template>
  <card>
    <template #title>
      設定
    </template>
    <pages-setting-darkmode />
    <item-button v-if="pageArray && pageArray.length >= 2" :to="pageArray[1]">
      1つ前のページへ戻る
    </item-button>
  </card>
  <!-- <game /> -->
</template>

<script setup lang="ts">
const { pageArray } = usePages()
</script>