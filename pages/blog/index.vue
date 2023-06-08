<template>
  <card class="pt-5">
    ブログでは僕が考えたことを、基本的に考えた順に書いています。<br>
    お読みになってくださる場合、読みやすい文章ではないことをご了承の上、お読みいただければ幸いです。
  </card>
  <card>
    <template #title>
      最近の記事一覧
    </template>
    <template #pafter>
      <pages-search :results="results" />
    </template>
  </card>
</template>

<script setup lang="ts">
const { $pageSettingList } = useNuxtApp()

const results = $pageSettingList.filter(pageSetting => pageSetting.to.indexOf("/blog/") >= 0)
</script>