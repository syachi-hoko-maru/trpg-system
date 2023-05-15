<template>
  <card>
    <template #title>このページについて</template>
    <andml :andmls="first" />
  </card>
  <itemPagesindex title="SW2.5 初心者向けページ一覧" :pageSettingList="forbeginnerPages" />
  <CardArrayByAndml :andml="andml2" />
</template>

<script setup lang="ts">
const first = `
このページではソード・ワールド2.5（SW2.5・ソドワ）の初心者の方へ役立つ情報をまとめています。
種族・技能の紹介からサプリメントの紹介、よくある質問（FAQ）や便利なリンクを載せています。
&br
「ソード・ワールド2.5に興味がある」「どんな感じか知りたい」って方はもちろん、「やったことあるけど難しいな」って感じた方や、「布教するために初心者向けの教え方が知りたい」って方など、幅広い方に読んでいただきたいページです。
&br
&em_「ソード・ワールド2.5って何？」 という方は以下のページを読んでください……！
&button_/sw25
「TRPGって何？」って方はまず以下のページをご覧ください。
&button_/trpg
`

const andml2 = `
&1 他にも！　ソドワ初心者向けのページ
「ソドワをやってる人と繋がりたい！」って方はこちらもご覧ください。
&button_/sw25/tool/intro
&button_/sw25/tool/community

&1 共有のお願い
このページはソード・ワールド2.5の紹介用にバンバン使ってください！
&br
このページの内容が「分かりやすかった」「役に立った」という方は、ぜひ知り合いに伝えたり、Twitterでシェアしたり、してください！
Twitterでのシェアはもう少し下へスクロールしたところにボタンがあります。
`
const { $pageSettingList } = useNuxtApp()

const forbeginnerPages = $pageSettingList.filter(page =>
  page.to.startsWith("/sw25/forbeginner/")
  && !page.to.startsWith("/sw25/forbeginner/build/")
  && !page.hidden
)

</script>