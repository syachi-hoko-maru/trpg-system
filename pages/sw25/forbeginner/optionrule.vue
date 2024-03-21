<template>
  <div>
    <CardArrayByAndml :andml="optionruleAndml" />
  </div>
</template>

<script setup lang="ts">
import { rulebooksAndSuppliments } from "~/src/dict/suppliments/rulebook";
import { pageSettingList } from "~/src/pages/pageSettingList";

const optionruleSupplimentList = rulebooksAndSuppliments.filter(
  (suppliment) =>
    suppliment.contents?.rule && suppliment.contents.rule.length >= 1
);
type Optionrule = SupplimentOptionrule & {
  book: (typeof rulebooksAndSuppliments)[number]["name"];
};
const optionruleList: Optionrule[] = rulebooksAndSuppliments.reduce(
  (pre, suppliment) => {
    suppliment.contents?.rule?.forEach((rule) => {
      pre.push({ ...rule, book: suppliment.name });
    });
    return pre;
  },
  [] as Optionrule[]
);

const optionruleAndml = `
&1 このページについて
このページはソード・ワールド2.5（SW2.5/ソドワ）に登場する、オプションルールの一覧と紹介です。
追加ルールが掲載されているルールブックと &em_サプリメント${
  optionruleSupplimentList.filter((r) => r.bookType !== "ルールブック").length
}冊 に掲載されている &em_${
  optionruleList.length
}種類 のオプションルール全てを掲載しています！
&br
- 「ソドワにはどんなオプションルールがあるの？」
- 「オプションルールってルール、どんなルールなの？」
- 「〇〇ってオプションルールはどの本に出てくるの？」
&br
といった方向けです！

&3 オプションルールとは？
オプションルールという言葉が常に使われているわけではありませんが、このページでは &em_「サプリメントで追加されたルール」 を「オプションルール」として、紹介していきます。
&br
あくまで独自の分類となりますので、「〇〇ってオプションルール扱いじゃないの？」といったものがあれば &itwitter まで教えていただけると助かります！
&br
サプリメントで追加されたもののうち、アイテムなどのデータや、種族・技能・流派などはここでは扱いません。
以下のページも合わせてご覧ください。
&button_/sw25/forbeginner/syuzoku
&button_/sw25/forbeginner/ginou
&button_/sw25/forbeginner/ryuha
&br
&em_ルールブックには出てこないルール ですので初心者の方は「へ〜こういうのがあるんだ！」くらいに思っておくのがおすすめです！

&1 オプションルールが掲載されているサプリメント一覧
以下にオプションルールが掲載されているサプリメント${
  optionruleSupplimentList.filter((r) => r.bookType !== "ルールブック").length
}冊を紹介します。
&br
${optionruleSupplimentList
  .filter((r) => r.bookType !== "ルールブック")
  .map((suppliment) => `- ${suppliment.name}`)
  .join("\n")}

&1 ルールブックII・III掲載のオプションルール一覧
${optionruleSupplimentList
  .filter((r) => r.bookType === "ルールブック")
  .map((suppliment) =>
    suppliment.contents?.rule && suppliment.contents.rule.length >= 1
      ? [
          `&3 ${suppliment.name}`,
          ...suppliment.contents.rule.map((rule, i, all) => [
            `- ${rule.name}`,
            ...(rule.detail
              ? rule.detail.map((d) => `-- ${d}`)
              : i === all.length - 1
              ? ["&br"]
              : []),
          ]),
        ]
      : []
  )
  .flat(2)
  .join("\n")}

&1 サプリメント別オプションルール一覧
以下ではサプリメント別に、 &em_オプションルール${
  optionruleList.length
}種類 を全て紹介します！
${optionruleSupplimentList
  .filter((r) => r.bookType !== "ルールブック")
  .map((suppliment) =>
    suppliment.contents?.rule && suppliment.contents.rule.length >= 1
      ? [
          `&3 ${suppliment.name}`,
          ...suppliment.contents.rule.map((rule, i, all) => [
            `- ${rule.name}`,
            ...(rule.detail ? rule.detail.map((d) => `-- ${d}`) : []),
          ]),
        ]
      : []
  )
  .flat(2)
  .join("\n")}

&1 武器や防具の強化に関するルールの一覧
武器や防具の強化に関する ${
  optionruleList.filter((op) => op.customize).length
}個のルールについて一覧で紹介します。
${optionruleList
  .filter((op) => op.customize)
  .map((op) => [
    `&4 ${op.name}`,
    `- 『${op.book}』掲載。`,
    ...(op.detail ? op.detail.map((d) => `- ${d}`) : []),
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
