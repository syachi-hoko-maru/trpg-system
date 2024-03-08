import type { Gino } from "./ginou";
import { ryuhaYesNo } from "./yesno/ryuhaYesNo";

type GinoWGunner =
  | Gino
  | "マギシュー"
  | "全ての戦士系技能"
  | "全ての魔法使い系技能"
  | "全ての技能";
export type RyuhaBook =
  | "ユーシズ"
  | "バトルマスタリー（新規）"
  | "バトルマスタリー（SW2.0からの移植）"
  | "ブルライト博物誌"
  | "ドーデン博物誌";
export type RyuhaData = {
  name: string;
  book: RyuhaBook;
  readonly gino: Readonly<GinoWGunner[]>;
  readonly area?:
    | "アルフレイム大陸全域"
    | "ブルライト地方"
    | "ユーシズ（ブルライト地方）";
  readonly description: Readonly<string[]>;
  readonly tags: Readonly<(keyof typeof ryuhaYesNo)[]>;
};
export const ryuhaList = [
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
    gino: ["ファイター", "バトルダンサー", "フェンサー"],
    description: [],
    tags: ["近接武器", "近距離"],
  },
  {
    name: "ミハウ式流円闘技",
    book: "バトルマスタリー（新規）",
    area: "アルフレイム大陸全域",
    gino: ["ファイター", "バトルダンサー", "フェンサー"],
    description: [],
    tags: ["近接武器", "近距離", "回避防御寄り"],
  },
  {
    name: "カスロット豪砂拳・バタス派",
    book: "バトルマスタリー（新規）",
    area: "アルフレイム大陸全域",
    gino: ["グラップラー"],
    description: [],
    tags: ["格闘"],
  },
  {
    name: "マカジャハット・プロ・グラップリング",
    book: "バトルマスタリー（新規）",
    area: "アルフレイム大陸全域",
    gino: ["グラップラー"],
    description: [],
    tags: ["格闘"],
  },
  {
    name: "ナルザラント柔盾活用術",
    book: "バトルマスタリー（新規）",
    area: "アルフレイム大陸全域",
    gino: ["ファイター", "バトルダンサー", "フェンサー"],
    description: [],
    tags: ["近接武器", "近距離"],
  },
  {
    name: "アースト強射術",
    book: "バトルマスタリー（新規）",
    area: "アルフレイム大陸全域",
    gino: ["シューター"],
    description: [],
    tags: ["弓弩", "特殊武器", "遠距離"],
  },
  {
    name: "ヒアデム魔力流転操撃",
    book: "バトルマスタリー（新規）",
    area: "アルフレイム大陸全域",
    gino: ["全ての魔法使い系技能"],
    description: [],
    tags: ["魔法戦士", "近接武器", "近距離"],
  },
  {
    name: "古モルガナンシン王国式戦域魔導術",
    book: "バトルマスタリー（新規）",
    area: "アルフレイム大陸全域",
    gino: ["全ての魔法使い系技能"],
    description: [],
    tags: ["魔法"],
  },
  {
    name: "ダイケホーン双霊氷法",
    book: "バトルマスタリー（新規）",
    area: "アルフレイム大陸全域",
    gino: ["コンジャラー", "フェアリーテイマー"],
    description: [],
    tags: ["特殊魔法"],
  },
  {
    name: "スホルテン騎乗戦技",
    book: "バトルマスタリー（新規）",
    area: "アルフレイム大陸全域",
    gino: ["ライダー"],
    description: [],
    tags: ["ライダー強化"],
  },
  {
    name: "アードリアン琉古武道・メルキアノ道場",
    book: "バトルマスタリー（SW2.0からの移植）",
    gino: ["グラップラー"],
    description: [],
    tags: ["格闘"],
  },
  {
    name: "エルエレナ惑乱操布術",
    book: "バトルマスタリー（SW2.0からの移植）",
    gino: ["バトルダンサー", "フェンサー"],
    description: [],
    tags: ["近距離", "特殊魔法"],
  },
  {
    name: "ファイラステン古流ヴィンド派（双剣の型）",
    book: "バトルマスタリー（SW2.0からの移植）",
    gino: ["ファイター", "バトルダンサー", "フェンサー"],
    description: [],
    tags: ["近距離", "近接武器"],
  },
  {
    name: "クウェラン闇弓術改式",
    book: "バトルマスタリー（SW2.0からの移植）",
    gino: ["シューター"],
    description: [],
    tags: ["近距離", "弓弩"],
  },
  {
    name: "ヴァルト式戦場剣殺法",
    book: "バトルマスタリー（SW2.0からの移植）",
    gino: ["ファイター", "バトルダンサー"],
    description: [],
    tags: ["近距離", "近接武器"],
  },
  {
    name: "ガオン無双獣投術",
    book: "バトルマスタリー（SW2.0からの移植）",
    gino: ["グラップラー"],
    description: [],
    tags: ["格闘"],
  },
  {
    name: "聖戦士ローガン鉄壁の型",
    book: "バトルマスタリー（SW2.0からの移植）",
    gino: ["プリースト", "ファイター"],
    description: [],
    tags: ["回避防御寄り"],
  },
  {
    name: "クーハイケン強竜乗法",
    book: "バトルマスタリー（SW2.0からの移植）",
    gino: ["ライダー"],
    description: [],
    tags: ["ライダー強化"],
  },
  {
    name: "キルガリー双刃戦舞闘技",
    book: "ブルライト博物誌",
    gino: ["ファイター", "バトルダンサー", "フェンサー"],
    description: [],
    tags: ["近接武器", "近距離", "特殊武器"],
  },
  {
    name: "エステル式ポール武闘術",
    book: "ブルライト博物誌",
    gino: ["ファイター", "バトルダンサー", "フェンサー", "グラップラー"],
    description: [],
    tags: ["近接武器", "近距離", "特殊武器", "格闘"],
  },
  {
    name: "銛王ナイネルガの伝承",
    book: "ブルライト博物誌",
    gino: ["ファイター", "バトルダンサー", "フェンサー"],
    description: [],
    tags: ["近接武器", "近距離", "特殊武器"],
  },
  {
    name: "死骸銃遊戯",
    book: "ブルライト博物誌",
    gino: ["マギシュー"],
    description: [],
    tags: ["銃", "遠距離"],
  },
  {
    name: "対奈落教会議・奈落反転神術",
    book: "ブルライト博物誌",
    gino: ["プリースト"],
    description: [],
    tags: ["魔法"],
  },
  {
    name: "『七色のマナ』式招異魔法術・魔使影光学理論",
    book: "ブルライト博物誌",
    gino: ["デーモンルーラー"],
    description: [],
    tags: ["魔法"],
  },
  {
    name: "アルショニ軽身跳闘法",
    book: "ドーデン博物誌",
    gino: ["スカウト", "レンジャー"],
    description: [],
    tags: ["回避防御寄り"],
  },
  {
    name: "ノーザンファング鉱士削岩闘法",
    book: "ドーデン博物誌",
    gino: ["ファイター", "バトルダンサー"],
    description: [],
    tags: ["近接武器", "近距離"],
  },
  {
    name: "キングスレイ式近接銃撃術",
    book: "ドーデン博物誌",
    gino: ["マギシュー"],
    description: [],
    tags: ["銃", "近距離"],
  },
  {
    name: "ネルネアニン騎獣調香術",
    book: "ドーデン博物誌",
    gino: ["ライダー"],
    description: [],
    tags: ["ライダー強化"],
  },
  {
    name: "オルフィード式蒸発妖精術",
    book: "ドーデン博物誌",
    gino: ["フェアリーテイマー"],
    description: [],
    tags: ["特殊魔法"],
  },
  {
    name: "フィノア派森羅導術",
    book: "ドーデン博物誌",
    gino: ["ドルイド"],
    description: [],
    tags: ["特殊魔法"],
  },
] as const satisfies Readonly<RyuhaData[]>;

export type RyuhaNames = (typeof ryuhaList)[number]["name"];
