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
なお &em_夏（7月）に発売予定の新サプリメントで追加される予定の新種族 については、 &link_#新種族について,こちら で紹介しています。
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
&br
ソード・ワールド2.5に登場する &em_技能 については以下をご覧ください。
&button_/sw25/forbeginner/ginou
`

const syuzokuAndml2 = `
&1 サプリメントについて
シャドウ・ソレイユ・アルヴ・ウィークリングが掲載されているサプリメント（拡張ルールブック） &em_『アウトロープロファイルブック』 については以下で紹介しています。
&button_/sw25/forbeginner/suppliment/3#${encodeURIComponent("アウトロープロファイルブック")} こちら

&1 新種族について
夏（7月）に発売予定の新サプリメントでは"種族&秘宝"がテーマであり、 &em_新たに種族が追加予定 だそうです！！
追加予定の種族は以下の通り！
&br
- SW2.0未登場種族（完全新規）
-- スプリガン
-- アビスボーン
- SW2.0登場種族
-- ハイマン
-- フロウライト
-- ダークドワーフ
&br
さらに、「希少種」という &em_既存種族の亜種的な存在 も出てくるとか……。
GMウォーロックでは「戦闘用ルーンフォーク」など4種が既に載っていました。
&br
&em_めちゃくちゃワクワク しますね！
&br
詳しくは以下のページをご覧ください。
&button_/blog/news230501

&1 関連リンク
出版社のサイトである「富士見書房TRPG¥sONLINE」では &em_イラスト付きで各種族を紹介 してくれていますので、こちらもご確認ください。
&button_https://fujimi-trpg-online.jp/game/sw25-character.html こちら

`
</script>