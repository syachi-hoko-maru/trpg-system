<template>
  <card>
    <template #title>
      SW2.5の種族一覧
    </template>
    <andml :andmls="syuzokuAndml" />
  </card>
  <div v-if="Object.entries($syuzoku).length" id="各種族の紹介">
    <card v-for="[syuzoku, { explain, debut }] of Object.entries($syuzoku)" :key="syuzoku">
      <template #title>
        {{ syuzoku }}
      </template>
      <template #subtitle>
        初出：{{ debut }}
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
「ソドワにはどんな種族がいるの？」「〇〇って種族はどのルルブ（ルールブック）に載っているの？」という方向けに情報まとめています。
&br
ソード・ワールド2.5については &link_/sw25,こちら をご覧ください。
またソード・ワールド2.5初心者向け情報は &link_/sw25/forbeginner,こちら にまとめてありますので合わせてご覧ください。
&br
各種属名をクリックすると、簡単な紹介に飛びます。
` + Object.entries($syuzoku).map(([syuzoku, { debut }]) => {
  let str = ""
  if (debut !== currentDebut) {
    str += `&3 ${debut} \n`
    currentDebut = debut
  }
  str += `- &link_#${syuzoku},${syuzoku}`
  return str
}).join("\n") + `
&br
以下では &em_各種族について 簡単にですが紹介します。
なお、サプリメントについては以下をご覧ください。
&button_/sw25/forbeginner/suppliment/1 
&br
ソード・ワールド2.5に登場する &em_技能 については以下をご覧ください。
&button_/sw25/forbeginner/ginou
`

const syuzokuAndml2 = `
&1 サプリメントについて
以下の、サプリメントで追加された種族、さらに希少種が掲載されているサプリメント（拡張ルールブック） &em_『アーケインレリック』 については以下で紹介しています。
&br
- アビスボーン
- スプリガン
- ハイマン
- フロウライト
- ダークドワーフ
- アルヴ（初出は『アウトロープロファイルブック』）
- シャドウ（初出は『アウトロープロファイルブック』）
- ソレイユ（初出は『アウトロープロファイルブック』）
- ウィークリング（初出は『アウトロープロファイルブック』）
&br
&button_/sw25/forbeginner/suppliment/2#${encodeURIComponent("アーケインレリック")} こちら
&amazon_アーケインレリック

&1 関連リンク
出版社のサイトである「富士見書房TRPG¥sONLINE」では &em_イラスト付きで各種族を紹介 してくれていますので、こちらもご確認ください。
&button_https://fujimi-trpg-online.jp/game/sw25-character.html こちら

`
</script>