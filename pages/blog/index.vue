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
      <item-form-boolean :form-setting="form" />
      <andml :andmls="andml1" />
      <pages-search :results="results" />
      <br>
    </template>
  </card>
</template>

<script setup lang="ts">
import { isHidden } from '~/src/pages/getPageSetting';
const { $pageSettingList } = useNuxtApp()

const form = ref({
  name: "only",
  label: "TRPG/ソード・ワールド2.5関連のみを表示",
  type: "boolean",
  value: false
} as FormSettingBoolean)
const andml1 = `
&link_search,検索ページ にてキーワードやタグによる検索をすることも可能です。
ぜひご活用ください。
&br
`
const results = computed(() =>
  $pageSettingList.filter(pageSetting =>
    pageSetting.to.indexOf("/blog/") >= 0
    && !isHidden(pageSetting)
    && !pageSetting.noSearch
    && (form.value.value ? (pageSetting.tags.join().indexOf("sw25") >= 0 || pageSetting.tags.join().indexOf("trpg") >= 0) : true)))
</script>