export const ryuhaYesNo = {
  // 分類
  武器: {
    question: "武器（剣・弓・銃など）を使って戦いたいですか？",
  },
  魔法: {
    question: "魔法を使って戦いたいですか？",
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
  拳: {
    question: "パンチやキックなどで戦いたいですか？",
    parent: ["近距離"],
  },
  弓弩: {
    question: "弓や弩を使って戦いたいですか？",
    parent: ["武器"],
  },
  銃: {
    question: "銃を使って戦いたいですか？",
    parent: ["武器"],
  },
  大型武器: {
    question: "大きな武器を使って戦いたいですか？",
    parent: ["武器"],
  },
  特殊武器: {
    question: "流派に伝わる特殊な武器を使いたいですか？",
    parent: ["武器"],
  },
  // 魔法の詳細
  特殊魔法: {
    question: "流派に伝わる特殊な魔法を使いたいですか？",
    parent: ["魔法"],
  },
} as const satisfies YesnoDefine;
