<template>
  <CardArrayByAndml :andml="andml1" />
</template>

<script setup lang="ts">
import { monochroGodList } from "~/src/dict/monochro/god";
import { pageSettingList } from "~/src/pages/pageSettingList";

const andml1 = `
&1 このページについて
このページではソード・ワールド2.5（SW2.5/ソドワ）の泡沫世界、「モノクロマティカ」に登場する神々を一覧で紹介するページです。
&br
「モノクロマティカ」はサプリメント『泡沫世界モノクロマティカ』で紹介された、泡沫世界の1つです。
「泡沫世界」や「モノクロマティカ」のついては以下のページをご覧ください。
&button_/blog/monochro3
&amazon_モノクロマティカ

&1 モノクロマティカの神々一覧
${monochroGodList
  .map((monochroGod) => [
    `&3 ${monochroGod.hn}${monochroGod.name}`,
    `${monochroGod.hn}${monochroGod.name}はサプリメント『${monochroGod.book}』で登場した「モノクロマティカ」の神です。`,
    ...monochroGod.description,
  ])
  .flat()
  .join("\n")}

&1 『モノクロマティカ』の神についての参考ページ
神の確定について：『モノクロマティカ』p.122
絶望の根源アズナレプス：『モノクロマティカ』p.170
夢見る女神エティラエル：『モノクロマティカ』p.172
境界の番人ティルカト：『モノクロマティカ』p.174
時の娘ネラインガトス：『モノクロマティカ』p.176
姿なき混沌メドロ：『モノクロマティカ』p.179
&br
その他、『モノクロマティカ』のよく使用しそうなページは以下でまとめています。
合わせてご覧ください。
&button_/blog/monochro3

&1 他の「一覧」ページ
種族・技能からオプションルールなど、いろいろな一覧をまとめています。
${pageSettingList
  .filter((p) => p.category === "list")
  .map((p) => `&button_${p.to}`)
  .join("\n")}
`;
</script>
