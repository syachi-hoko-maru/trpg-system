<template>
  <Card>
    <template #title>流派YesNo診断</template>
    <div class="mb-5">
      <template v-if="phase === 0">
        <template v-if="result">
          <Andml :andmls="result" />
          <item-button @click="start">もう一度診断する</item-button>
        </template>
        <template v-else>
          <Andml :andmls="result" />
          <item-button @click="start">開始する</item-button>
        </template>
      </template>
      <template v-if="phase === 1">
        {{ question }}
        <item-button @click="answer('yes')">Yes</item-button>
        <item-button @click="answer('no')">No</item-button>
        <item-button @click="answer('?')">わからない</item-button>
      </template>
    </div>
  </Card>
  <CardArrayByAndml :andml="ryuhaAndml" />
</template>

<script setup lang="ts">
import type { RyuhaBook, RyuhaData, RyuhaNames } from "~/src/dict/ryuha";
import { ryuhaList } from "~/src/dict/ryuha";
import { ryuhaYesNo } from "~/src/dict/yesno/ryuhaYesNo";
import { yesnoQuestion } from "~/src/yesno";

const format = (ryuha: RyuhaData) =>
  [
    `&3 ${ryuha.name}`,
    `「${ryuha.name}」はサプリメント『 &em_${ryuha.book.replace(
      /（.*）/,
      ""
    )} 』に掲載されている流派です。`,
    ryuha.area ? `&br &em_${ryuha.area} に伝わっています。` : "",
    ryuha.description.length ? ["&br", ...ryuha.description] : "",
    ryuha.gino.length
      ? `&br 主に &em_${ryuha.gino.join("・")} と相性が良い流派です。`
      : "",
  ].flat();

const ryuhaAndml = `
&1 このページについて
このページはソード・ワールド2.5（SW2.5/ソドワ）に登場する、「流派」の一覧です。
現在ある &em_${ryuhaList.length}種類 の流派全てを掲載しています！
&br
ソード・ワールド2.5において流派とは、戦闘特技などを拡張し、より複雑な戦闘スタイル等をデータで表わせるルールです。
&br
サプリメント『魔導の学府ユーシズ』で最初に登場し、『バトルマスタリー』で本格的に導入されました。
&br
- 「ソドワにはどんな流派があるの？」
// - 「〇〇するキャラクターを作りたい！　いい流派はあるかな？」
// - 「〇〇って流派、どんな流派なの？」
- 「〇〇って流派はどの本に出てくるの？」
&br
といった方向けに情報まとめています。
&amazon_バトルマスタリー・ユーシズ
&br
ルールブックには出てこないルール・データですので初心者の方は「へ〜こういうのがあるんだ！」くらいに思っておくのがおすすめです。
&br
&br
ソード・ワールド2.5については &link_/sw25,こちら をご覧ください。
またソード・ワールド2.5初心者向け情報は &link_/sw25/forbeginner,こちら にまとめてありますので合わせてご覧ください。
&br
&br
なお、画像には今回Midjourneyを使用して生成した画像を一部使用しています。
詳しくはこちら。
&button_/blog/midjourney

&1 ソード・ワールド2.5の流派一覧
以下はソード・ワールド2.5に登場している流派の一覧です。
現在、 &em_${ryuhaList.length} の流派のデータがあります！
&br
${ryuhaList
  .reduce((prev, curr) => {
    const obj = prev.find((p) => p.book === curr.book);
    if (obj) {
      obj.list.push(curr.name);
    } else {
      prev.push({
        book: curr.book,
        list: [curr.name],
      });
    }
    return prev;
  }, [] as { book: RyuhaBook; list: RyuhaData["name"][] }[])
  .map((d) => [
    `&3 ${d.book}`,
    `${d.book}の流派は以下の${d.list.length}つです。`,
    "&br",
    ...d.list.map((l) => `- ${l}`),
  ])
  .flat()
  .join("\n")}

&1 ソード・ワールド2.5の流派詳細
個別の詳細な解説は現在準備中です。
&br
${ryuhaList.map(format).flat().join("\n")}

&1 他のページ
ソード・ワールド2.5に登場する &em_種族 については以下をご覧ください。
&button_/sw25/forbeginner/syuzoku

ソード・ワールド2.5に登場する &em_技能 については以下をご覧ください。
&button_/sw25/forbeginner/ginou
&br
&amazon_バトルマスタリー・博物誌・ユーシズ
`;

const ryuhaObj: {
  [key in RyuhaNames]?: {
    yesnoTags: readonly (keyof typeof ryuhaYesNo)[];
  };
} = Object.fromEntries(
  ryuhaList.map((r: (typeof ryuhaList)[number]) => {
    return [r.name, { yesnoTags: [...r.tags, ...r.gino] }];
  })
);

const phase = ref(0);
const question = ref("");
const result = ref(
  "「YES」「NO」を答えるだけで、あなたにおすすめの流派を紹介します。 &br &br なお、 &em_実験中の機能 なため、変な流派をおすすめするかもしれません。その際は &itwitter までフィードバックいただければ幸いです。"
);

let gene: ReturnType<typeof yesnoQuestion> | null = null;

// ゲーム開始処理
const start = () => {
  phase.value = 1;
  gene = yesnoQuestion(ryuhaObj, ryuhaYesNo, false, 2);
  const v = gene.next();
  if (v.done) {
    phase.value = 0;
    return;
  } else {
    question.value = v.value.question;
    return;
  }
};

// 回答時
const answer = (ans: "yes" | "no" | "?") => {
  if (gene === null) {
    phase.value = 0;
    return;
  }
  if (ans !== "yes" && ans !== "no" && ans !== "?") {
    return;
  }
  const v = gene.next(ans);
  if (v.done) {
    phase.value = 0;
    if (typeof v.value?.foryou === "string") {
      const res = v.value.foryou;
      const book: string | undefined = ryuhaList
        .find((r) => r.name === res)
        ?.book.replace(/（.*）/, "");
      if (book) {
        result.value = `
あなたにオススメの流派は【${res}】です。
流派【${res}】はサプリメント『${book}』に掲載されています。
詳しくは下記の詳細もご覧ください。`;
      }
    }
    return;
  } else {
    question.value = v.value.question;
    return;
  }
};
</script>
