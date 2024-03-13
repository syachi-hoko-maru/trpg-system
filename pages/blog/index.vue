<template>
  <card class="pt-5">
    ブログでは僕が考えたことを、基本的に考えた順に書いています。<br />
    お読みになってくださる場合、読みやすい文章ではないことをご了承の上、お読みいただければ幸いです。
  </card>
  <card>
    <template #title> 最近の記事一覧 </template>
    <template #pafter>
      <!-- <item-form-boolean :form-setting="form" /> -->
      <andml :andmls="andml1" />
      <pages-search
        :results="results"
        :defaultCount="defaultCount"
        :step="10"
      />
      <br />
    </template>
  </card>
  <card>
    <template #title> 「ソード・ワールド2.5」に関する記事一覧 </template>
    <template #pafter>
      <pages-search
        :results="results.filter((r) => r.tags.join().indexOf('sw25') >= 0)"
        :defaultCount="
          Math.max(
            results
              .slice(0, defaultCount)
              .filter((r) => r.tags.join().indexOf('sw25') >= 0).length + 3,
            5
          )
        "
        :step="10"
      />
      <br />
    </template>
  </card>
  <card>
    <template #title> 「TRPGいろいろ」に関する記事一覧 </template>
    <template #pafter>
      <pages-search
        :results="results.filter((r) => r.tags.join().indexOf('otrpg') >= 0)"
        :defaultCount="
          Math.max(
            results
              .slice(0, defaultCount)
              .filter((r) => r.tags.join().indexOf('otrpg') >= 0).length + 3,
            5
          )
        "
        :step="10"
      />
      <br />
    </template>
  </card>
</template>

<script setup lang="ts">
import { isHidden } from "~/src/pages/getPageSetting";
import { getDateCount } from "~/src/util/date";
const { $pageSettingList } = useNuxtApp();

// const form = ref({
//   name: "only",
//   label: "TRPG/ソード・ワールド2.5関連のみを表示",
//   type: "boolean",
//   value: false,
// } as FormSettingBoolean);
const andml1 = `
&link_search,検索ページ にてキーワードやタグによる検索をすることも可能です。
ぜひご活用ください。
&br
`;
const results = computed(() =>
  $pageSettingList.filter(
    (pageSetting) =>
      pageSetting.to.indexOf("/blog/") >= 0 &&
      !isHidden(pageSetting) &&
      !pageSetting.noSearch // &&
    // (form.value.value
    //   ? pageSetting.tags.join().indexOf("sw25") >= 0 ||
    //     pageSetting.tags.join().indexOf("trpg") >= 0
    //   : true)
  )
);

/** 5以上8以下になる */
const defaultCount = Math.min(
  8,
  Math.max(
    results.value.filter((r) => {
      const dateCount = getDateCount(
        new Date(),
        r.created ? r.created : r.lastmod
      );
      return dateCount < 31;
    }).length,
    5
  )
);
</script>
