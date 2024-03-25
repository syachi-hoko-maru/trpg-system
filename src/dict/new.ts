const bookAttrList = [
  "title",
  "long",
  "date",
  "dispDate",
  "type",
  "explain",
  "amazon",
] as const;
export type BookAttr = (typeof bookAttrList)[number];
export type Book = {
  title: string;
  date: string;
} & {
  [key in BookAttr]?: string;
};
export const bookList: Book[] = [
  {
    title: "アーケインレリック",
    long: "アーケインレリック -種族と秘宝-",
    date: "2023/7/20",
    type: "サプリメント（大型サプリ）",
  },
  {
    title: "猫と星と秘宝",
    long: "ノベル+シナリオ 猫と星と秘宝",
    date: "2023/8/19",
    type: "シナリオ集",
    explain:
      "夏の大型サプリを使えるシナリオ集が発売予定。昨年秋に発売された『ストーリーフラグメンツ』のように文庫本サイズとのこと。",
  },
  {
    title: "ラクシアライフ",
    long: "ラクシアライフ -街の人たちと一般技能-",
    date: "2023/10/20",
    type: "サプリメント（新ジャンル）",
  },
  {
    title: "ギルドマスター・ウォーロックの依頼録",
    long: "ソロ＆マルチシナリオ集 ギルドマスター・ウォーロックの依頼録",
    date: "2023/11/20",
    type: "サプリメント（シナリオ集）",
    amazon: "ギルドマスター",
  },
  {
    title: "ドーデン博物誌",
    long: "ドーデン博物誌",
    date: "2024/1/19",
    type: "サプリメント（博物誌）",
  },
  {
    title: "アルフレイム見聞録",
    long: "アルフレイム見聞録",
    date: "2024/2/20",
    type: "サプリメント（その他）",
    explain:
      "ムックに掲載されていた「アルフレイム見聞録」のまとめた、小説形式でアルフレイム大陸について知ることができる内容とのこと。",
  },
  {
    title: "モノクロマティカ",
    long: "泡沫世界モノクロマティカ",
    date: "2024/3/19",
    type: "サプリメント",
    explain:
      "「泡沫世界」という神々の大戦で生じた数多の小世界、その中でも「無彩色の世界」である「モノクロマティカ」を冒険するサプリメントとのこと！！",
  },
  {
    title: "ボックスセット「饗宴」（仮）",
    long: "ボックスセット「饗宴」（仮）",
    date: "2024/4/30",
    dispDate: "2024/4/?（下旬とのこと）",
    type: "ボードゲーム",
    explain:
      "ソード・ワールド2.5を準備不要で簡単に遊べるボードゲームが発売予定！　舞台はドーデン地方キングスフォール。「大鉄堂祭のスペシャルメニュー」を完成させるためにPCたちが食材を求めて大冒険とのこと！",
  },
  {
    title: "蛮族サプリ（仮）",
    // long: "",
    date: "2024/8/20",
    dispDate: "2024/??/??",
    type: "サプリメント",
    explain: "「蛮族」がテーマのシリーズが展開されるとの情報がきています！",
  },
];

export const langList: {
  [key in BookAttr]: string;
} = {
  title: "タイトル",
  long: "正式名称",
  date: "発売日",
  dispDate: "発売日",
  type: "タイプ",
  explain: "紹介",
  amazon: "",
};
