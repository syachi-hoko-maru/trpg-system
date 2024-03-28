import type { BokenGino, Item } from "./type";

const zokuseiList = [
  { zokusei: "土", color: "黄", level: 1 },
  { zokusei: "水・氷", color: "青", level: 1 },
  { zokusei: "火", color: "赤", level: 1 },
  { zokusei: "風", color: "緑", level: 1 },
  { zokusei: "光", color: "白", level: 2 },
  { zokusei: "闇", color: "黒", level: 2 },
];

type GishikiItem = Item<BokenGino> & { group: "儀式用意" };
export const gishikiItem: GishikiItem[] = [
  {
    name: "簡易儀式セット",
    group: "儀式用意",
    price: 500,
    known: 8,
    category: "冒険者技能用アイテム",
    shape: "簡易的な儀式に必要なアイテムが揃っている木箱",
    gaiyo: "どこでも簡易的な儀式をすることができる",
    effect: [
      "簡易的な儀式を行うことができます。以下の儀式を用意します。この儀式の用意は主動作です。",
      "&gishiki_0,5,任意",
    ],
  },
  ...zokuseiList.map(
    (z) =>
      ({
        name: `${z.color}の式布`,
        group: "儀式用意",
        price: z.level * 300 + 200,
        known: 8,
        category: "冒険者技能用アイテム（消耗品）",
        shape: `儀式に用いる${z.color}色の布`,
        gaiyo: `${z.zokusei}属性の儀式に使用する。`,
        effect: [
          "簡易儀式セットと合わせて使用することで、以下の儀式を用意します。この儀式の用意は主動作です。",
          `&gishiki_${z.level * 5},6,${z.zokusei}`,
        ],
      } as GishikiItem)
  ),
];
