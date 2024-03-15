<template>
  <Card>
    <template #title>流派YesNo診断</template>
    <div class="mb-5">
      <div class="lottie">
        <ItemLottie props="tanuki" />
      </div>
      <template v-if="phase === 0">
        <template v-if="result">
          <Andml :andmls="result" />
          <ItemShare
            v-if="shareObj && shareObj.url && shareObj.hashTag"
            :url="shareObj.url"
            :text="shareText"
            :hash-tag="shareObj.hashTag"
          >
            結果をツイートする
          </ItemShare>
          <item-button @click="start">もう一度診断する</item-button>
        </template>
        <template v-else>
          <Andml :andmls="explain" />
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
</template>

<script setup lang="ts">
import type { RyuhaNames } from "~/src/dict/ryuha";
import { ryuhaList } from "~/src/dict/ryuha";
import { ryuhaYesNo } from "~/src/dict/yesno/ryuhaYesNo";
import { yesnoQuestion } from "~/src/yesno";

interface Props {
  yesNoTypeStr: YesNoType;
}
const Props = defineProps<Props>();

const shareObj = (
  {
    ryuha: {
      url: "https://trpg.syachi.work/sw25/forbeginner/ryuha/",
      hashTag: "ソドワ流派YesNo診断",
    },
  } as { [key in YesNoType]: { url: string; hashTag: string } }
)[Props.yesNoTypeStr];

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
const result = ref("");
const shareText = ref("");
const explain = `「YES」「NO」を答えるだけで、あなたにおすすめの流派を紹介します。
&br
なお、 &em_実験中の機能 なため、変な流派をおすすめするかもしれません。
その際は &itwitter までフィードバックいただければ幸いです。`;

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
        // Twitter用
        shareText.value = `あなたにオススメの流派は……
【${res}】
※『${book}』掲載

ソード・ワールド2.5のおすすめ流派がYesNo診断でわかる！
`;
      }
    }
    return;
  } else {
    question.value = v.value?.question ? v.value.question : question.value;
    return;
  }
};
</script>
