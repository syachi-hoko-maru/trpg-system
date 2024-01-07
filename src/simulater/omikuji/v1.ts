import { syuzoku } from "../../dict/syuzoku";
import { ginou } from "../../dict/ginou";
import { FortuneFunction, FortuneResult, FortuneScore, sep } from ".";
import { Random } from "./random";
import { formatGod, godList } from "../../dict/god";

export const fortuneTypeListV1 = [
  "コミュニティ",
  "ダイス",
  "キャラクター",
  "シナリオ作成",
] as const;
type FortuneType = (typeof fortuneTypeListV1)[number];
type Fortune = { message: string; score: number };

const syuzokuList = Object.entries(syuzoku)
  .map(([syuzoku, { rare }]) => {
    return [syuzoku, rare?.map((r) => `${r}（${syuzoku}希少種）`)];
  })
  .flat(2)
  .filter((s) => s);
const fortuneList: { [key in FortuneType]: Fortune[] } = {
  コミュニティ: [
    { message: "今後10年を共にする仲間ができる。", score: 5 },
    { message: "待てば来る。", score: 4 },
    { message: "今いる仲間が最高の仲間。", score: 5 },
    { message: "積極的に出会い、相性良き人を探せ。", score: 2 },
    { message: "自ら探すべし。", score: 3 },
    { message: "春に良き出会いあり。", score: 4 },
    { message: "夏に良き出会いあり。", score: 3 },
    { message: "秋に良き出会いあり。", score: 2 },
    { message: "冬に良き出会いあり。", score: 4 },
  ],
  ダイス: [
    { message: "6ゾロと1ゾロばかり。", score: 5 },
    { message: "1ゾロ出ず。", score: 3 },
    { message: "1ゾロ多く、経験点伸びる。", score: 3 },
    { message: "最も大事な場面で6ゾロ。", score: 4 },
    { message: "格好つけると1ゾロ。", score: 2 },
    { message: "2d6の平均値が9となる。", score: 6 },
    { message: "2d6の平均値が8となる。", score: 5 },
    { message: "2d6の平均値は当然7。", score: 4 },
    { message: "2d6の平均値は6だと思うべし。", score: 3 },
    { message: "2d6の平均値は5だと思うべし。", score: 2 },
    { message: "2d6の平均値は4だと思うべし。", score: 1 },
    { message: "2d6の平均値は3だと思うべし。", score: 0 },
  ],
  キャラクター: [
    { message: "長く共に冒険をするキャラクターと出会える。", score: 5 },
    { message: "最高のキャラクターと出会うだろう。", score: 4 },
    { message: "今までのキャラクターを大切に。", score: 4 },
    { message: "出会いあり。別れあり。", score: 2 },
    { message: "愛を注げば答えてくれる。", score: 4 },
    { message: "愛を尽かせば別れとなる。", score: 3 },
    { message: "最高のNPCとの出会いあり。", score: 3 },
  ],
  シナリオ作成: [
    { message: "書けば最高傑作。", score: 5 },
    { message: "凡作多数。数作るべし。", score: 4 },
    { message: "インプットを増やすべし。", score: 3 },
    { message: "アイデア良し。書き上げるべし。", score: 4 },
    { message: "5つ書けば1つ当たる。", score: 4 },
    { message: "名作を生む。", score: 4 },
  ],
};

const maxChoiceCount = Math.max(
  ...Object.values(fortuneList).map((f) => f.length)
);
export const getFortuneV1: FortuneFunction = (id: number): FortuneResult => {
  if (id === 0) {
    throw "error";
  }
  const messageList: string[] = [];
  let fortuneScore: FortuneScore = "吉";
  let score: number = 0;

  const random = new Random(Number(id));

  fortuneTypeListV1.forEach((fortuneType, i) => {
    const fortuneArr = fortuneList[fortuneType];
    const fortune: Fortune =
      fortuneArr[random.nextInt(0, fortuneArr.length - 1)];
    messageList.push(`${fortuneType}${sep}${fortune.message}`);
    score += fortune.score;
  });

  // 種族
  const syuzoku1 = syuzokuList[random.nextInt(0, syuzokuList.length - 1)];
  let syuzoku2 = syuzokuList[random.nextInt(0, syuzokuList.length - 1)];
  while (syuzoku1 === syuzoku2) {
    syuzoku2 = syuzokuList[random.nextInt(0, syuzokuList.length - 1)];
  }

  const syuzokuArr = [
    `種族${sep}${syuzoku1}と相性良し。${syuzoku2}も相性良し。`,
    `種族${sep}${syuzoku1}と相性良し。${syuzoku2}と相性悪し。`,
  ];

  messageList.push(syuzokuArr[random.nextInt(0, syuzokuArr.length - 1)]);

  // 技能
  const ginouList = Object.keys(ginou);
  const ginou1 = ginouList[random.nextInt(0, ginouList.length - 1)];
  let ginou2 = ginouList[random.nextInt(0, ginouList.length - 1)];
  while (ginou1 === ginou2) {
    ginou2 = ginouList[random.nextInt(0, ginouList.length - 1)];
  }

  const ginouArr = [
    `技能${sep}${ginou1}と相性良し。${ginou2}も相性良し。`,
    `技能${sep}${ginou1}と相性良し。${ginou2}と相性悪し。`,
    `技能${sep}${ginou1}を愛用せよ。`,
  ];

  messageList.push(ginouArr[random.nextInt(0, ginouArr.length - 1)]);

  const aveScore =
    score / fortuneTypeListV1.length + (random.nextInt(0, 16) - 6) / 16;

  // 神
  const godArr = godList.filter(
    ({ sword, game }) => (sword === 1 || sword === 3) && game !== 20
  );
  messageList.push(
    `信仰${sep}${formatGod(
      godArr[random.nextInt(0, godArr.length - 1)]
    )}を信仰せよ。`
  );

  if (aveScore > 4.375) {
    fortuneScore = "超大吉";
  } else if (aveScore > 4) {
    fortuneScore = "大吉";
  } else if (aveScore > 3.375) {
    fortuneScore = "吉";
  } else if (aveScore > 3.25) {
    fortuneScore = "小吉";
  } else if (aveScore > 3) {
    fortuneScore = "末吉";
  } else if (aveScore > 2.875) {
    fortuneScore = "凶";
  } else {
    fortuneScore = "大凶";
  }
  return {
    fortuneScore,
    messageList,
  };
};
