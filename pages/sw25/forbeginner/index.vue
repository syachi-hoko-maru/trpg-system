<template>
  <card>
    <template #title>このページについて</template>
    <andml :andmls="first" />
  </card>
  <itemPageindex :pageSettingList="forbeginnerPages" />
</template>

<script setup lang="ts">
const first = `
このページではソード・ワールド2.5（SW2.5）の初心者の方へ役立つ情報をまとめています。
種族・技能の紹介からサプリメントの紹介、よくある質問（FAQ）や便利なリンクを載せています。
&br
「ソード・ワールド2.5に興味がある」「どんな感じか知りたい」って方はもちろん、「やったことあるけど難しいな」って感じた方や、「布教するために初心者向けの教え方が知りたい」って方など、幅広い方に読んでいただきたいページです。
&br
&em_「ソード・ワールド2.5って何？」 という方は以下のページを読んでください……！
&button_/sw25
`
const { $pageSettingList } = useNuxtApp()

const forbeginnerPages = $pageSettingList.filter(page => page.to.startsWith("/sw25/forbeginner/") && !page.hidden)

</script>