import { ginou } from "../ginou";

export const ryuhaYesNo = {
  // 分類
  武器: {
    question: "武器（剣・弓・銃など）を使って戦いたいですか？",
  },
  魔法: {
    question: "魔法を使って戦いたいですか？",
    parent: ["全ての魔法使い系技能"],
  },
  // 距離
  近距離: {
    question: "敵と近い距離で戦いたいですか？",
  },
  遠距離: {
    question: "敵から離れて戦いたいですか？",
  },
  // 武器の詳細
  近接武器: {
    question: "近接武器（剣・斧・槍など）を使って戦いたいですか？",
    parent: ["武器", "近距離"],
  },
  格闘: {
    question: "パンチやキックなどで戦いたいですか？",
    parent: ["近距離", "グラップラー"],
  },
  弓弩: {
    question: "弓や弩を使って戦いたいですか？",
    parent: ["武器", "シューター"],
  },
  銃: {
    question: "銃を使って戦いたいですか？",
    parent: ["武器", "マギシュー"],
  },
  大型武器: {
    question: "大きな武器を使って戦いたいですか？",
    parent: ["武器"],
  },
  特殊武器: {
    question: "流派に伝わる特殊な武器を使いたいですか？",
    parent: ["武器"],
  },
  回避防御寄り: {
    question: "回避や防御を高めたいですか？",
    parent: ["近接"],
  },
  // 魔法の詳細
  魔法戦士: {
    question: "魔法と武器を両方使いこなしたいですか？",
    parent: ["魔法", "武器"],
  },
  特殊魔法: {
    question: "流派に伝わる特殊な魔法を使いたいですか？",
    parent: ["魔法"],
  },
  // その他
  ライダー強化: {
    question: "ライダー技能を強化したいですか？",
    parent: ["ライダー"],
  },
  // 技能
  ...ginou.reduce((pre, g) => {
    pre[g.name] = {
      question: `${g.name}技能を使用したいですか？`,
      parent: [
        (g.type as readonly string[]).find((t) => t === "戦士系")
          ? "全ての戦士系技能"
          : (g.type as readonly string[]).find((t) => t === "魔法使い系")
          ? "全ての魔法使い系技能"
          : null,
      ].filter((s) => s),
      kaburi:
        (g.type as readonly string[]).find((t) => t === "前衛") &&
        (g.type as readonly string[]).find((t) => t === "戦士系")
          ? ginou
              .filter(
                (s) =>
                  s.name != g.name &&
                  (s.type as readonly string[]).find((st) => st === "前衛") &&
                  (s.type as readonly string[]).find((st) => st === "戦士系")
              )
              .map((s) => s.name)
          : [],
    };
    return pre;
  }, {} as YesnoDefineFree),
  マギシュー: {
    question: "マギテック技能とシューター技能でガンを撃ちたいですか？",
    parent: ["マギテック", "シューター"],
  },
  全ての戦士系技能: {
    question: "戦士系技能を使用したいですか？",
    parent: [],
  },
  全ての魔法使い系技能: {
    question: "魔法使い系技能を使用したいですか？",
    parent: [],
  },
  全ての技能: {
    question: "全ての技能で使用できる流派をしようしたいですか",
    parent: [],
  },
} as const satisfies YesnoDefine;
