export const pageTagSettings: PageTagSettings = {
  sw25: {
    label: "ソード・ワールド2.5",
    explanation: "TRPG「ソード・ワールド2.5」に関するタグ",
  },
  sw25_new: {
    label: "ソード・ワールド2.5 新刊情報",
    explanation: "TRPG「ソード・ワールド2.5」の新刊情報に関するタグ",
  },
  sw25_moso: {
    label: "ソード・ワールド2.5 妄想",
    explanation:
      "TRPG「ソード・ワールド2.5」のオリジナルデータ、オリジナル設定などのタグ",
  },
  scenario: {
    label: "シナリオ",
    explanation: "TRPGのシナリオに関するタグ",
  },
  tool: {
    label: "ツール",
    explanation: "TRPGに役立つツールのタグ",
  },
  trpg: {
    label: "TRPG全般",
    explanation: "TRPG全般に関するタグ",
  },
  me: {
    label: "しゃちほこ丸",
    explanation: "管理人のしゃちほこ丸に関するタグ",
  },
};
export const pageTags: PageTag[] = [
  "sw25",
  "sw25_new",
  "sw25_moso",
  "scenario",
  "tool",
  "trpg",
  "me",
];
export const isPageTag = (a: unknown): a is PageTag => {
  return pageTags.some((pageTag) => pageTag === a);
};
