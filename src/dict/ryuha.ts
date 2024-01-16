import { Gino } from "./ginou";
import { ryuhaYesNo } from "./yesno/ryuhaYesNo";

export type RyuhaBook =
  | "ユーシズ"
  | "バトルマスタリー（新規）"
  | "バトルマスタリー（SW2.0からの移植）"
  | "ブルライト博物誌"
  | "ドーデン博物誌";
export type RyuhaData = {
  name: string;
  book: RyuhaBook;
  gino:
    | Gino[]
    | ["全ての技能"]
    | ["全ての戦士系技能", ...Gino[]]
    | ["全ての魔法使い系技能", ...Gino[]];
  area?:
    | "アルフレイム大陸全域"
    | "ブルライト地方"
    | "ユーシズ（ブルライト地方）";
  description: string[];
  tags: (keyof typeof ryuhaYesNo)[];
};
export const ryuhaList: RyuhaData[] = [
  {
    name: "『七色のマナ』特別魔法行使学",
    book: "ユーシズ",
    area: "ユーシズ（ブルライト地方）",
    gino: ["全ての魔法使い系技能"],
    description: [],
    tags: ["魔法"],
  },
  {
    name: "イーヴァル狂闘術",
    book: "バトルマスタリー（新規）",
    area: "ユーシズ（ブルライト地方）",
    gino: [],
    description: [],
    tags: [],
  },
  {
    name: "ミハウ式流円闘技",
    book: "バトルマスタリー（新規）",
    area: "アルフレイム大陸全域",
    gino: [],
    description: [],
    tags: [],
  },
  {
    name: "カスロット豪砂拳・バタス派",
    book: "バトルマスタリー（新規）",
    area: "アルフレイム大陸全域",
    gino: [],
    description: [],
    tags: [],
  },
  {
    name: "マカジャハット・プロ・グラップリング",
    book: "バトルマスタリー（新規）",
    area: "アルフレイム大陸全域",
    gino: [],
    description: [],
    tags: [],
  },
  {
    name: "ナルザラント柔盾活用術",
    book: "バトルマスタリー（新規）",
    area: "アルフレイム大陸全域",
    gino: [],
    description: [],
    tags: [],
  },
  {
    name: "アースト強射術",
    book: "バトルマスタリー（新規）",
    area: "アルフレイム大陸全域",
    gino: [],
    description: [],
    tags: [],
  },
  {
    name: "ヒアデム魔力流転操撃",
    book: "バトルマスタリー（新規）",
    area: "アルフレイム大陸全域",
    gino: [],
    description: [],
    tags: ["魔法"],
  },
  {
    name: "古モルガナンシン王国式戦域魔導術",
    book: "バトルマスタリー（新規）",
    area: "アルフレイム大陸全域",
    gino: [],
    description: [],
    tags: ["魔法"],
  },
  {
    name: "ダイケホーン双霊氷法",
    book: "バトルマスタリー（新規）",
    area: "アルフレイム大陸全域",
    gino: [],
    description: [],
    tags: ["特殊魔法"],
  },
  {
    name: "スホルテン騎乗戦技",
    book: "バトルマスタリー（新規）",
    area: "アルフレイム大陸全域",
    gino: [],
    description: [],
    tags: [],
  },
  {
    name: "アードリアン琉古武道・メルキアノ道場",
    book: "バトルマスタリー（SW2.0からの移植）",
    gino: [],
    description: [],
    tags: [],
  },
  {
    name: "エルエレナ惑乱操布術",
    book: "バトルマスタリー（SW2.0からの移植）",
    gino: [],
    description: [],
    tags: [],
  },
  {
    name: "ファイラステン古流ヴィンド派（双剣の型）",
    book: "バトルマスタリー（SW2.0からの移植）",
    gino: [],
    description: [],
    tags: [],
  },
  {
    name: "クウェラン闇弓術改式",
    book: "バトルマスタリー（SW2.0からの移植）",
    gino: [],
    description: [],
    tags: [],
  },
  {
    name: "ヴァルト式戦場剣殺法",
    book: "バトルマスタリー（SW2.0からの移植）",
    gino: [],
    description: [],
    tags: [],
  },
  {
    name: "ガオン無双獣投術",
    book: "バトルマスタリー（SW2.0からの移植）",
    gino: [],
    description: [],
    tags: [],
  },
  {
    name: "聖戦士ローガン鉄壁の型",
    book: "バトルマスタリー（SW2.0からの移植）",
    gino: [],
    description: [],
    tags: [],
  },
  {
    name: "クーハイケン強竜乗法",
    book: "バトルマスタリー（SW2.0からの移植）",
    gino: [],
    description: [],
    tags: [],
  },
  {
    name: "キルガリー双刃戦舞闘技",
    book: "ブルライト博物誌",
    gino: [],
    description: [],
    tags: [],
  },
  {
    name: "エステル式ポール武闘術",
    book: "ブルライト博物誌",
    gino: [],
    description: [],
    tags: [],
  },
  {
    name: "銛王ナイネルガの伝承",
    book: "ブルライト博物誌",
    gino: [],
    description: [],
    tags: [],
  },
  {
    name: "死骸銃遊戯",
    book: "ブルライト博物誌",
    gino: [],
    description: [],
    tags: ["銃"],
  },
  {
    name: "対奈落教会議・奈落反転神術",
    book: "ブルライト博物誌",
    gino: [],
    description: [],
    tags: ["魔法"],
  },
  {
    name: "『七色のマナ』式招異魔法術・魔使影光学理論",
    book: "ブルライト博物誌",
    gino: [],
    description: [],
    tags: ["魔法"],
  },
];
