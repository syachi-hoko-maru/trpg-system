<template>
  <CardArrayByAndml :andml="godAndml" />
</template>

<script setup lang="ts">
import type { God } from "~/src/dict/god";
import { godList } from "~/src/dict/god";
import { pageSettingList } from "~/src/pages/pageSettingList";

godList.sort((a, b) => {
  if (a.sword > b.sword) return 1;
  if (a.sword < b.sword) return -1;
  if (a.type > b.type) return 1;
  if (a.type < b.type) return -1;
  return 0;
});

const getSword = (sword: 1 | 2 | 3) => [, "一", "ニ", "三"][sword];
const getType = (type: 0 | 1 | 2) =>
  [
    " &ruby_古代神,エンシェントゴッド ",
    " &ruby_大神,メジャーゴッド ",
    " &ruby_小神,マイナーゴッド ",
  ][type];
const format = (god: God) => [
  `&3 "${god.hn}"¥s${god.name}`,
  god.sword
    ? `"${god.hn}"¥s${god.name}は第${getSword(
        god.sword
      )}の剣に由来する ${getType(god.type)} です。`
    : `"${god.hn}"¥s${
        god.name
      }は全てが謎であり、異界の神なのではないかとも言われる ${getType(
        god.type
      )} です。`,
  god.area ? `${god.area}で信仰されています。` : "",
  god.book
    ? `&br ${god.book.map((b) => `『${b}』`).join("・")}に登場します。`
    : "",
  god.description ? "&br\n" + god.description.join("\n") : "",
];
const godAndml = `
&1 このページについて
このページはソード・ワールド2.5（SW2.5/ソドワ）に登場する、「ラクシア」の神の一覧です。
&br
- 「ソドワにはどんな神様がいるの？」
- 「〇〇って神様はどんな神様なの？」
- 「〇〇って神様はどの本に出てくるの？」
&br
という方向けに情報まとめています。
&br
「神」はプリースト技能を持つキャラクターが信仰するほか、世界観を深めるためにも役立ちます。
&br
ルールブックI・IIのほか、サプリメント『メイガスアーツ』で大量に追加されました。
&amazon_メイガスアーツ
ソード・ワールド2.5については &link_/sw25,こちら をご覧ください。
またソード・ワールド2.5初心者向け情報は &link_/sw25/forbeginner,こちら にまとめてありますので合わせてご覧ください。
&br
&br
なお、おまけで旧版であるソード・ワールド2.0に登場した神についても掲載しています。
抜け漏れがあるかもしれませんがご容赦ください。
&br
なお、泡沫世界の1つ「モノクロマティカ」の神は以下にまとめています。
合わせてご覧ください。
&button_/sw25/list/monochroGod

&1 ラクシアの神の一覧（第一の剣）
以下はソード・ワールド2.5に登場している神のうち、 &em_第一の剣ルミエル に由来する神の一覧です。
${godList
  .filter((god) => god.game !== 20 && god.sword === 1)
  .map(format)
  .flat()
  .join("\n")}

&1 ラクシアの神の一覧（第三の剣）
以下はソード・ワールド2.5に登場している神のうち、 &em_第三の剣カルディア に由来する神の一覧です。
&br
知的な神が多いのが特徴です。
${godList
  .filter((god) => god.game !== 20 && god.sword === 3)
  .map(format)
  .flat()
  .join("\n")}

&1 ラクシアの神の一覧（第ニの剣）
以下はソード・ワールド2.5に登場している神のうち、 &em_第ニの剣イグニス に由来する神とその他の神の一覧です。
&br
基本的にプレイヤーキャラクターが信仰することはできないので注意してください。
&br
また、公式リプレイ等のネタバレになりますので閲覧は自己責任でお願いします。
&&tatami_ネタバレの可能性あり
${godList
  .filter((god) => god.game !== 20 && (god.sword === 2 || god.sword === 0))
  .map(format)
  .flat()
  .join("\n")}
&&&

&1 ラクシアの神の一覧（ソード・ワールド2.0）
以下は旧版であるソード・ワールド2.0に登場している神のうち、ソード・ワールド2.5に登場していない神の一覧です。
&br
基本的にソード・ワールド2.5で使用することはできないので注意してください。
&br
また、バトルブック系のサプリメントや公式リプレイ等のネタバレになりますので閲覧は自己責任でお願いします。

&&tatami_ネタバレの可能性あり
${godList
  .filter((god) => god.game === 20)
  .map(format)
  .flat()
  .join("\n")}
&&&

&1 他の「一覧」ページ
種族・技能からオプションルールなど、いろいろな一覧をまとめています。
${pageSettingList
  .filter((p) => p.category === "list")
  .map((p) => `&button_${p.to}`)
  .join("\n")}
`;
</script>
