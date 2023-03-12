<template>
  <card-array-by-andml :andml="andml" />
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

const andml = `
&1 ブログ
ブログでは僕が考えたことを、基本的に考えた順に書いています。
お読みになる場合は読みやすい文章ではないことをご理解の上お読みいただければ幸いです。
`

const results = $pageSettingList.filter(pageSetting => pageSetting.to.indexOf("/blog/") >= 0)
</script>