<template>
  <card>
    <template #title>
      SW2.5の種族一覧
    </template>
    <andml :andmls="syuzokuAndml" />
  </card>
  <div v-if="Object.entries($syuzoku).length" id="各種族の紹介">
    <card v-for="[syuzoku, { explain, debut }] of Object.entries($syuzoku)" :key="syuzoku" :id="syuzoku">
      <template #title>
        {{ syuzoku }}
      </template>
      <template #subtitle>
        {{ debut }}
      </template>
      <andml :andmls="explain" />
    </card>
  </div>
  <card-array-by-andml :andml="syuzokuAndml2" />
</template>

<script setup lang="ts">
const { $syuzoku } = useNuxtApp()

let currentDebut = ""
const syuzokuAndml = `
以下はソード・ワールド2.5（SW2.5）に登場する種族の一覧です。
ソード・ワールド2.5については &link_/sw25,こちら をご覧ください。
` + Object.entries($syuzoku).map(([syuzoku, { debut }]) => {
  let str = ""
  if (debut !== currentDebut) {
    str += `&2 ${debut} \n`
    currentDebut = debut
  }
  str += `- &link_#${syuzoku},${syuzoku}`
  return str
}).join("\n") + `
&br
以下では &em_各種族について 簡単にですが紹介します。
なお、サプリメントについては以下をご覧ください。
&button_/sw25/forbeginner/suppliment/1 
`

const syuzokuAndml2 = `
&1 サプリメントについて
シャドウ・ソレイユ・アルヴ・ウィークリングが掲載されているサプリメント（拡張ルールブック） &em_『アウトロープロファイルブック』 については以下で紹介しています。
&button_/sw25/forbeginner/suppliment/3#${encodeURIComponent("アウトロープロファイルブック")} こちら
&1 関連リンク
公式サイトでは &em_イラスト付き で各種族を紹介してくれていますので、こちらもご確認ください。
&button_https://fujimi-trpg-online.jp/game/sw25-character.html こちら

`
</script>