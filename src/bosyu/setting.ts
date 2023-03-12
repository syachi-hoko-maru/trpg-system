const rulebooks: string[] = [
  "ルールブックI",
  "ルールブックII",
  "ルールブックIII",
  "エピックトレジャリー",
  "モンストラスロア",
  "メイガスアーツ",
  "バトルマスタリー",
  "キャラクタービルディングブック",
  "アウトロープロファイルブック",
  "グランゼール",
  "キングスフォール",
  "サイレックオード",
  "ユーシズ",
  "ブルライト博物誌",
  "ヴァイスシティ",
  "デモンズライン",
  "グリフォンロード",
  "エンシェントブルー",
];

export const bosyuSettings: BosyuSetting = [
  {
    name: "base",
    label: "基本情報",
    items: [
      {
        name: "scenario",
        label: "シナリオ名",
        selects: ["ウォフト=ルーバの研究所跡"],
        type: "combo",
        value: "",
      },
      {
        name: "author",
        label: "シナリオ作者名",
        selects: ["オリジナル", "しゃちほこ丸"],
        type: "combo",
        value: "",
      },
      {
        name: "type",
        label: "セッション形式",
        selects: ["ボイセ", "テキセ", "半テキセ"],
        type: "combo",
        value: "",
      },
    ],
  },
  {
    name: "date",
    label: "日程",
    items: [
      {
        name: "nitteiType",
        label: "日程調整で募集する",
        type: "boolean",
        value: false,
        conflict: ["date"],
      },
      {
        name: "date",
        label: "日付",
        type: "date",
        value: "",
      },
      {
        name: "starttime",
        label: "開始時間",
        // type: "select",
        type: "string",
        value: "",
        // selects: [
        //   18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
        //   14, 15, 16, 17,
        // ]
        //   .map((v) => [`${v}:00`, `${v}:30`])
        //   .flat(),
      },
      {
        name: "usetime",
        label: "所要時間",
        // type: "select",
        type: "string",
        value: "",
        // selects: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        //   .map((v) => [`${v}:00`, `${v}:30`])
        //   .flat(),
      },
    ],
  },

  {
    name: "bosyu",
    label: "募集要項",
    items: [
      {
        name: "count",
        label: "募集人数",
        selects: ["1", "2", "3", "4", "5", "6", "7", "8"],
        type: "slider",
        value: [3, 4],
      },
      {
        name: "hanni",
        label: "募集範囲",
        selects: ["誰でも", "FF内", "FFのFF内"],
        type: "combo",
        value: "",
      },
      {
        name: "oubo",
        label: "応募方法",
        selects: ["リプライ", "DM", "リプライ or DM"],
        type: "combo",
        value: "",
      },
    ],
  },
  {
    name: "regyu",
    label: "レギュレーション等",
    items: [
      {
        name: "regyu",
        label: "レギュレーション",
        type: "select",
        selects: [
          "初期作成",
          "3〜4レベル",
          "4〜5レベル",
          "5〜6レベル",
          "6〜7レベル",
          "7〜8レベル",
          "8〜9レベル",
          "10〜11レベル",
          "11〜12レベル",
          "12〜13レベル",
          "13〜14レベル",
          "14〜15レベル",
          "15+Aレベル",
          "15+Bレベル",
          "15+Cレベル",
        ],
        value: "初期作成",
      },
      {
        name: "hissu",
        label: "必須ルールブック・サプリメント",
        selects: rulebooks,
        type: "combo",
        value: "ルールブックI",
        multiple: true,
      },
      {
        name: "kano",
        label: "使用可能ルールブック・サプリメント",
        selects: rulebooks,
        type: "combo",
        value: "",
        multiple: true,
      },
      {
        name: "keizoku",
        label: "継続キャラクターの使用",
        type: "boolean",
        value: false,
      },
    ],
  },
  {
    name: "others",
    label: "その他",
    items: [
      {
        name: "gaiyo",
        label: "シナリオ概要",
        type: "textarea",
        value: "",
      },
      {
        name: "caution",
        label: "注意事項",
        type: "textarea",
        value: "",
      },
      {
        name: "note",
        label: "備考",
        type: "textarea",
        value: "",
      },
    ],
  },
];
