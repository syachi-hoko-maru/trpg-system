<template>
  <CardArrayByAndml :andml="andml1" />
</template>

<script setup lang="ts">
import { pageSettingList } from "~/src/pages/pageSettingList";

const andml1 = `
&1 このページについて
このページではソード・ワールド2.5（SW2.5/ソドワ）のさまざまなものを一覧で紹介するページです。
種族・技能・神などなど、様々なものを一覧形式で紹介します。

&1 ソード・ワールド2.5の「一覧」ページ
種族・技能からオプションルールなど、いろいろな一覧をまとめています。
掲載されているルールブック・サプリメントについても載っているので、ぜひご活用ください。
${pageSettingList
  .filter((p) => p.category === "list")
  .map((p) => `&button_${p.to}`)
  .join("\n")}


&1 サプリメントの紹介
&em_サプリメント （拡張ルールブック）については以下のページで紹介しています！
&button_/sw25/forbeginner/suppliment/1
&button_/sw25/forbeginner/suppliment/ranking

&1 共有のお願い
このページは &em_ソード・ワールド2.5の紹介用にバンバン使ってください！
&br
このページの内容が「分かりやすかった」「役に立った」という方は、ぜひ &em_知り合いに伝えたり、Twitterでシェアしたり してください！
&button-share
`;
</script>
