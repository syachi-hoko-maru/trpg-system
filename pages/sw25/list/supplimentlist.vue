<template>
  <CardArrayByAndml :andml="andml1" />
</template>

<script setup lang="ts">
import { bookTypes } from "~/src/dict/suppliments/bookType";
import { getContents } from "~/src/dict/suppliments/getExplain";
import { getSupplimentLink } from "~/src/dict/suppliments/getLink";
import { supplimentList } from "~/src/dict/suppliments/suppliment";
import { pageSettingList } from "~/src/pages/pageSettingList";
import { getValues } from "~/src/util";

const andml1 = `
&1 このページについて
このページではソード・ワールド2.5（SW2.5/ソドワ）の &em_サプリメント （拡張ルールブック）やシナリオ集 を全て紹介します。
その数はなんと &em_${supplimentList.length}種類 です！
全て紹介するので、ぜひご覧ください。
&br
&em_初心者の方のおすすめ のサプリメント （拡張ルールブック）の紹介は以下のページでしています！
ぜひ合わせてご覧ください。
&button_/sw25/forbeginner/suppliment/1
&button_/sw25/forbeginner/suppliment/ranking

&button_/sw25/forbeginner/suppliment/1
&button_/sw25/forbeginner/suppliment/ranking
&id_一覧,¥s

&1 サプリメントとシナリオ集の一覧
以下では分類別にサプリメントとシナリオ集の一覧を掲載します。
とはいえ、分類は公式からしっかり分けられているわけではないのでご注意ください。
タイトルをクリックすると内容紹介へ飛びます。
${getValues(bookTypes)
  .flat()
  .map((bookType) => [
    `&3 ${bookType}`,
    ...supplimentList.reduce((pre, suppliment) => {
      if (suppliment.bookType === bookType)
        pre.push(
          `- &link_#${suppliment.name.replace(
            /\s/g,
            "¥s"
          )},${suppliment.name.replace(/\s/g, "¥s")}`
        );
      return pre;
    }, [] as string[]),
  ])
  .flat()
  .join("\n")}

${supplimentList
  .map((suppliment) => [
    `&id_${suppliment.name.replace(/\s/g, "¥s")},¥s`,
    `&1 ${suppliment.name}`,
    `分類「${suppliment.bookType}」の1つである『${suppliment.name.replace(
      /\s/g,
      "¥s"
    )}』の主な掲載コンテンツは以下の通りです。`,
    ...getContents(suppliment, true),
    `&3 初心者向け情報`,
    `『${suppliment.name.replace(
      /\s/g,
      "¥s"
    )}』の初心者向けの説明は以下のボタンからご覧ください。`,
    `&button_${getSupplimentLink(suppliment)} 初心者向けの説明はこちら`,
    `&button_#一覧 一覧に戻る`,
  ])
  .flat()
  .join("\n")}

&1 他の「一覧」ページ
種族・技能からオプションルールなど、いろいろな一覧をまとめています。
${pageSettingList
  .filter((p) => p.category === "list")
  .map((p) => `&button_${p.to}`)
  .join("\n")}
`;
</script>
