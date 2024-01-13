type GodBook =
  | "ルールブックI〜III"
  | "ルールブックII〜III"
  | "メイガスアーツ"
  | "剣と荒野と放浪者2"
  | "フェアリーガーデン"
  | "エンドレスメイズ"
  | "ラクシアゴッドブック";

export type God = {
  sword: 0 | 1 | 2 | 3;
  hn: string;
  name: string;
  game: 20 | 25 | 2025;
  area?: string;
  description?: string[];
} & (
  | {
      game: 25 | 2025;
      book: GodBook[];
    }
  | {
      game: 20;
      book?: GodBook[];
    }
) &
  (
    | {
        type: 0 | 1;
      }
    | {
        type: 2;
        game: 20;
      }
    | {
        type: 2;
        game: 25 | 2025;
        area: string;
      }
  );
export const godList: God[] = [
  {
    sword: 1,
    type: 0,
    hn: "始祖神",
    name: "ライフォス",
    game: 2025,
    book: ["ルールブックI〜III", "メイガスアーツ"],
    description: [
      "最初に第一の剣ルミエルに触れた人族で、調和を大切にしていたと言われます。",
    ],
  },
  {
    sword: 1,
    type: 0,
    hn: "太陽神",
    name: "ティダン",
    game: 2025,
    book: ["ルールブックI〜III", "メイガスアーツ"],
    description: [
      "ライフォスの仲間だったとされます。",
      "アンデッドを嫌っていたり、ソレイユが眷属と言われていたりするのが特徴です。",
    ],
  },
  {
    sword: 1,
    type: 0,
    hn: "妖精神",
    name: "アステリア",
    game: 2025,
    book: ["ルールブックII〜III", "メイガスアーツ"],
    description: [
      "ライフォスの仲間だったとされます。",
      "エルフの先祖とされます。",
    ],
  },
  {
    sword: 1,
    type: 0,
    hn: "炎武帝",
    name: "グレンダール",
    game: 2025,
    book: ["ルールブックII〜III", "メイガスアーツ"],
    description: [
      "ライフォスの仲間だったとされます。",
      "ドワーフの先祖とされます。",
    ],
  },
  { sword: 1, type: 0, hn: "紡糸の女神", name: "エルピュセ", game: 20 },
  {
    sword: 1,
    type: 0,
    hn: "貨幣神",
    name: "ガメル",
    game: 2025,
    book: ["メイガスアーツ"],
    description: ["ラクシアの通貨「ガメル」の価値を決めたとされる神様です。"],
  },
  {
    sword: 1,
    type: 1,
    hn: "月神",
    name: "シーン",
    game: 2025,
    book: ["ルールブックI〜III", "メイガスアーツ"],
  },
  {
    sword: 1,
    type: 1,
    hn: "神の指先",
    name: "ミルタバル",
    game: 25,
    book: ["ルールブックI〜III", "メイガスアーツ"],
  },
  {
    sword: 1,
    type: 1,
    hn: "奈落の盾神",
    name: "イーヴ",
    game: 25,
    book: ["ルールブックI〜III", "メイガスアーツ"],
  },
  {
    sword: 1,
    type: 1,
    hn: "導きの星神",
    name: "ハルーラ",
    game: 25,
    book: ["ルールブックI〜III", "メイガスアーツ"],
  },
  {
    sword: 1,
    type: 1,
    hn: "樹神",
    name: "ダリオン",
    game: 25,
    book: ["ルールブックII〜III", "メイガスアーツ"],
  },
  {
    sword: 1,
    type: 1,
    hn: "慈愛と復讐の女神",
    name: "ミリッツァ",
    game: 25,
    book: ["ルールブックII〜III", "メイガスアーツ"],
  },
  {
    sword: 1,
    type: 1,
    hn: "食福神",
    name: "ミィルズ",
    game: 25,
    book: ["メイガスアーツ"],
  },
  {
    sword: 1,
    type: 1,
    hn: "機甲神",
    name: "アールマータ",
    game: 25,
    book: ["メイガスアーツ"],
  },
  {
    sword: 1,
    type: 1,
    hn: "酒幸神",
    name: "サカロス",
    game: 20,
    book: [],
  },
  { sword: 1, type: 1, hn: "騎士神", name: "ザイア", game: 20 },
  { sword: 1, type: 1, hn: "慈雨神", name: "フェトル", game: 20 },
  {
    sword: 1,
    type: 2,
    hn: "風と雨の女神",
    name: "フルシル",
    game: 25,
    area: "ブルライト地方",
    book: ["ルールブックI〜III", "メイガスアーツ"],
  },
  {
    sword: 1,
    type: 2,
    hn: "鉄道神王",
    name: "ストラスフォード",
    game: 25,
    area: "ドーデン地方",
    book: ["ルールブックII〜III", "メイガスアーツ"],
  },
  {
    sword: 1,
    type: 2,
    hn: "放浪神",
    name: "サドゥール",
    game: 25,
    area: "オーレルム地方",
    book: ["メイガスアーツ"],
  },
  { sword: 1, type: 2, hn: "水の神", name: "ルーフェリア", game: 20 },
  { sword: 1, type: 2, hn: "融合神", name: "リルズ", game: 20 },
  { sword: 1, type: 2, hn: "剣神", name: "ヒューレ", game: 20 },
  { sword: 1, type: 2, hn: "韋駄天", name: "ラトクレス", game: 20 },
  { sword: 1, type: 2, hn: "鉄槌神", name: "エセルフィン", game: 20 },
  { sword: 1, type: 2, hn: "竜帝神", name: "シムルグ", game: 20 },
  // カースドランド
  //   {
  //     sword: 1,
  //     type: 2,
  //     hn: "制裁の双子女神",
  //     name: "ヴィルトルード＆オイゲーニア",
  //     game: 20,
  //     book: ["カースドランド"]
  //   },
  // データなし
  { sword: 1, type: 1, hn: "裁竜の魔女", name: "ニコラ", game: 20 },
  { sword: 1, type: 2, hn: "牧畜神", name: "ジャージュ", game: 20 },
  { sword: 1, type: 2, hn: "潮の女神", name: "マール", game: 20 },
  { sword: 1, type: 2, hn: "伝達神", name: "レータン", game: 20 },
  { sword: 1, type: 2, hn: "共生神", name: "ルイファ", game: 20 },
  // 第3の剣
  {
    sword: 3,
    type: 0,
    hn: "賢神",
    name: "キルヒア",
    game: 2025,
    book: ["ルールブックI〜III", "メイガスアーツ"],
  },
  { sword: 3, type: 0, hn: "戦勝神", name: "ユリスカロア", game: 20 },
  {
    sword: 3,
    type: 0,
    hn: "秘隠神",
    name: "クス",
    game: 2025,
    book: ["メイガスアーツ"],
  },
  {
    sword: 3,
    type: 1,
    hn: "伝令神",
    name: "パロ",
    game: 25,
    book: ["メイガスアーツ"],
  },
  {
    sword: 3,
    type: 1,
    hn: "糸織神",
    name: "アーデニ",
    game: 25,
    book: ["メイガスアーツ"],
  },
  { sword: 3, type: 1, hn: "纏いの神", name: "ニールダ", game: 20 },
  { sword: 3, type: 1, hn: "学護神", name: "エッケザッカ", game: 20 },
  { sword: 3, type: 1, hn: "器械神", name: "レパラール", game: 20 },
  { sword: 3, type: 2, hn: "刃神", name: "マキシム", game: 20 },
  // 第2の剣
  {
    sword: 2,
    type: 0,
    hn: "戦神",
    name: "ダルクレム",
    game: 2025,
    book: ["ルールブックII〜III", "メイガスアーツ"],
  },
  { sword: 2, type: 0, hn: "死の神", name: "ザールギアス", game: 20 },
  { sword: 2, type: 0, hn: "惑いと偽りの神", name: "ソーンダーク", game: 20 },
  {
    sword: 2,
    type: 1,
    hn: "海掠神",
    name: "エイリャーク",
    game: 25,
    book: ["ルールブックII〜III", "メイガスアーツ"],
  },
  {
    sword: 2,
    type: 1,
    hn: "不死の女王",
    name: "ツァイデス",
    game: 25,
    book: ["ルールブックII〜III", "メイガスアーツ"],
  },
  {
    sword: 2,
    type: 1,
    hn: "血浴み神",
    name: "ニバセプス",
    game: 25,
    book: ["メイガスアーツ"],
  },
  {
    sword: 2,
    type: 1,
    hn: "罠の神",
    name: "グルヴァゾ",
    game: 25,
    book: ["メイガスアーツ"],
  },
  {
    sword: 2,
    type: 1,
    hn: "荒天地神",
    name: "ゾラス＝バレス",
    game: 25,
    book: ["メイガスアーツ"],
  },
  {
    sword: 2,
    type: 1,
    hn: "英雄を導く神",
    name: "テケルロコ",
    game: 25,
    book: ["剣と荒野と放浪者2"],
  },
  { sword: 2, type: 1, hn: "風来神", name: "ル＝ロウド", game: 20 },
  { sword: 2, type: 1, hn: "腐敗の女神", name: "ブラグザバス", game: 20 },
  { sword: 2, type: 1, hn: "不死神", name: "メティシエ", game: 20 },
  { sword: 2, type: 1, hn: "眠りの神", name: "カオルルウプテ", game: 20 },
  { sword: 2, type: 1, hn: "不和神", name: "ニディスニオ", game: 20 },
  { sword: 2, type: 1, hn: "策謀神", name: "ワギル＝イシナニ", game: 20 },
  { sword: 2, type: 1, hn: "霧闇神", name: "フラクシス", game: 20 },
  {
    sword: 2,
    type: 2,
    hn: "詐金神",
    name: "メイガル",
    game: 25,
    area: "アルフレイム大陸各地",
    book: ["メイガスアーツ"],
  },
  { sword: 2, type: 2, hn: "宥和神", name: "アーメス", game: 20 },
  { sword: 2, type: 2, hn: "毒薬の神", name: "テメリオ", game: 20 },
  { sword: 2, type: 2, hn: "海風の神", name: "ヴァ＝セアン", game: 20 },
  // データなし
  { sword: 2, type: 2, hn: "吸生神", name: "キュリアドラル", game: 20 },
  { sword: 2, type: 2, hn: "蹂躙の戦乙女", name: "イズマイア", game: 20 },
  {
    sword: 2,
    type: 2,
    hn: "邪妖の女神",
    name: "ネアン",
    game: 20,
    book: ["フェアリーガーデン", "ラクシアゴッドブック"],
  },
  // その他
  {
    sword: 0,
    type: 1,
    hn: "狂神",
    name: "ラーリス",
    game: 2025,
    book: ["ルールブックII〜III", "メイガスアーツ"],
  },
];

export const formatGod = (god: God): string => {
  const godType =
    ["古代神", "大神", "小神"][god.type] + (god.area ? `：${god.area}` : "");
  const sword = [, "一", "二", "三"][god.sword];
  if (god.sword !== 0) {
    return `"${god.hn}" ${god.name}（第${sword}の剣・${godType}）`;
  } else {
    return `"${god.hn}" ${god.name}（${godType}）`;
  }
};
