<template>
  <card>
    <template #title> SW2.5の種族一覧 </template>
    <andml :andmls="syuzokuAndml" />
  </card>
  <div v-if="Object.entries($syuzoku).length" id="各種族の紹介">
    <card
      v-for="[syuzoku, { explain, debut, rare }] of Object.entries($syuzoku)"
      :key="syuzoku"
    >
      <template #title>
        {{ syuzoku }}
      </template>
      <template #subtitle> 初出：{{ debut }} </template>
      <andml :andmls="setExplain(explain, rare)" />
    </card>
  </div>
  <card-array-by-andml :andml="syuzokuAndml2" />
</template>

<script setup lang="ts">
import exp from "constants";

const { $syuzoku } = useNuxtApp();

let currentDebut = "";
const syuzokuAndml =
  `
以下はソード・ワールド2.5（SW2.5/ソドワ）に登場する種族の一覧です。
「ソドワにはどんな種族がいるの？」「〇〇って種族はどのルルブ（ルールブック）に載っているの？」という方向けに情報まとめています。
&br
ソード・ワールド2.5については &link_/sw25,こちら をご覧ください。
またソード・ワールド2.5初心者向け情報は &link_/sw25/forbeginner,こちら にまとめてありますので合わせてご覧ください。
&br
各種属名をクリックすると、簡単な紹介に飛びます。
` +
  Object.entries($syuzoku)
    .map(([syuzoku, { debut }]) => {
      let str = "";
      if (debut !== currentDebut) {
        str += `&3 ${debut} \n`;
        currentDebut = debut;
      }
      str += `- &link_#${syuzoku},${syuzoku}`;
      return str;
    })
    .join("\n") +
  `
&br
以下では &em_各種族について 簡単にですが紹介します。
どんな希少種がいるかも合わせて紹介します！
&br
なお、サプリメントについては以下をご覧ください。
&button_/sw25/forbeginner/suppliment/1 
&br
ソード・ワールド2.5に登場する &em_技能 については以下をご覧ください。
&button_/sw25/forbeginner/ginou
`;

const setExplain = (explain: string, rare: string[] | undefined): string[] => {
  const result = [explain];
  if (rare?.length) {
    result.push("&3 希少種");
    for (let r of rare) {
      result.push(`- ${r}`);
    }
  }
  return result;
};

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
&button_/sw25/forbeginner/suppliment/2#${encodeURIComponent(
  "アーケインレリック"
)} こちら
&amazon_アーケインレリック

&1 希少種について
希少種とは、亜種的な存在で、上述の『アーケインレリック』で追加されました。
各希少種の紹介については、以下のブログをご覧ください
&button_/blog/arcane_relic6

&1 関連リンク
出版社のサイトである「富士見書房TRPG¥sONLINE」では &em_イラスト付きで各種族を紹介 してくれていますので、こちらもご確認ください。
&button_https://fujimi-trpg-online.jp/game/sw25-character.html こちら
&br
&br
&amazon_アーケインレリック・アウトロープロファイルブック
`;
</script>
