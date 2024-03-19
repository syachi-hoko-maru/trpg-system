<template>
  <CardArrayByAndml :andml="andml2" />
</template>

<script setup lang="ts">
import { pageSettingList } from "~/src/pages/pageSettingList";

const pagePath = "/sw25/forbeginner/";
const forbeginnerPages = pageSettingList.filter(
  (page) =>
    page.to.startsWith(pagePath) &&
    !page.to.startsWith("/sw25/forbeginner/build/")
);

const andml2 = `
&1 このページについて
このページではソード・ワールド2.5（SW2.5/ソドワ）の初心者の方へ役立つ情報をまとめています。
種族・技能の紹介からサプリメントの紹介、よくある質問（FAQ）や便利なリンクを載せています。
&br
「ソード・ワールド2.5に興味がある」
「どんな感じか知りたい」
という方はもちろん、 &em_「やったことあるけど難しいな」 って感じた方にも読んでいただきたいです！
&br
また、「布教するために初心者向けの教え方が知りたい」って方にも読んでいただきたいページです。
&br

&1 ソード・ワールド2.5って何？
「ソード・ワールド2.5って何？」という方は以下のページを読んでください……！
&button_/sw25

&3 TRPGって何？
「TRPGって何？」って方はまずは以下のページをご覧ください。
&button_/trpg

&1 ソード・ワールド2.5の「一覧」ページ
いろいろな一覧をまとめています。
掲載されているルールブック・サプリメントについても載っているので、ぜひご活用ください。
${forbeginnerPages
  .filter((p) => p.category === "list")
  .map((p) => `&button_${p.to}`)
  .join("\n")}

&1 一緒に遊ぶ人を探すなら
「ソドワをやってる人と繋がりたい！」って方はこちらをぜひご活用ください！！
&button_/sw25/tool/intro
&button_/sw25/tool/community

&1 ソード・ワールド2.5の本の紹介
ソード・ワールド2.5で出ているいろいろな本を紹介しています。
&em_サプリメント （拡張ルールブック）のほか、 &em_4択クイズ形式で異世界での冒険がわかる「異世界冒険ガイド」 や、ソード・ワールド2.5を遊んでいる &em_ゆるふわTRPGマンガ「だいすろーる！」 もおすすめです！
${pageSettingList
  .filter((p) => p.category === "bookIntro")
  .map((p) => `&button_${p.to}`)
  .join("\n")}


&1 他にも！　ソドワ初心者向けのページ
ソード・ワールド2.5の初心者向けページは他にもあります！
${forbeginnerPages
  .filter(
    (p) =>
      p.category !== "bookIntro" &&
      p.category !== "forgm" &&
      p.category !== "list"
  )
  .map((p) => `&button_${p.to}`)
  .join("\n")}


&1 GM向けの情報
当サイトには初心者GM・初GM（GM未経験者）におすすめの情報もまとまっています！
${pageSettingList
  .filter((p) => p.category === "forgm" && p.to.indexOf("tool") < 0)
  .map((p) => `&button_${p.to}`)
  .join("\n")}
&3 GM向けのツール
遊ぶ際はぜひこちらもお役立てください。
${pageSettingList
  .filter((p) => p.category === "forgm" && p.to.indexOf("tool") >= 0)
  .map((p) => `&button_${p.to}`)
  .join("\n")}

&1 共有のお願い
このページは &em_ソード・ワールド2.5の紹介用にバンバン使ってください！
&br
このページの内容が「分かりやすかった」「役に立った」という方は、ぜひ &em_知り合いに伝えたり、Twitterでシェアしたり してください！
&button-share
`;
</script>
