import { content } from "html2canvas/dist/types/css/property-descriptors/content";
import type { Gino } from "../ginou";
import type { Syuzoku } from "../syuzoku";
import type { BookSmallType } from "./bookType";
import { supplimentList } from "./suppliment";

type Rulebook = Pick<
  SupplimentData<string, Gino, Syuzoku, string, BookSmallType>,
  "name" | "contents"
> & {
  bookType: "ルールブック";
};
type RulebookAndSuppliment = Pick<
  SupplimentData<string, Gino, Syuzoku, string, BookSmallType>,
  "name" | "contents"
> & {
  bookType: BookSmallType | "ルールブック";
};

export const rulebooks: Rulebook[] = [
  {
    name: "ルールブックI",
    bookType: "ルールブック",
    contents: {
      data: [
        {
          type: "scenario",
          list: [{ title: "蛮族を駆逐せよ", reguration: 0 }],
        },
      ],
    },
  },
  {
    name: "ルールブックII",
    bookType: "ルールブック",
    contents: {
      data: [
        {
          type: "scenario",
          list: [{ title: "不死の女王の眷属", reguration: 15 }],
        },
      ],
      rule: [
        { name: "種族特徴の強化" },
        {
          name: "判定についての追加要素",
          detail: [
            "水泳判定・聞き込み判定が追加される。",
            "行為判定の再挑戦ルールが追加される。",
            "所要時間を短縮して行為判定を行うためのルールが追加される。",
          ],
        },
        { name: "上級戦闘" },
        { name: "確定ダメージ" },
        {
          name: "特殊な状況についてのルール",
          detail: [
            "透明への対応が追加される。",
            "聴覚による行為判定への修正が追加される。",
            "水中での行動と戦闘に関するルールが追加される。",
            "空中での行動と落下に関するルールが追加される。",
          ],
        },
        { name: "装備制限の逸脱に関するルール" },
        { name: "コンジャラー技能の追加要素：ゴーレムとアンデッド" },
        { name: "プリースト技能の追加要素：神の力と影響圏" },
        {
          name: "名誉点関連",
          detail: [
            "名誉点の〈剣のかけら〉による獲得方法が追加される。",
            "名誉アイテムの獲得が追加される。",
            "冒険者ランクについてが追加される。",
            "不名誉点についてが追加される。",
          ],
        },
        { name: "オーダーメイド武器", customize: true },
        { name: "銀製武器", customize: true },
        { name: "魔法の武器+1", customize: true },
        { name: "魔法の鎧+1", customize: true },
        { name: "妖精の武器", customize: true },
        { name: "防弾加工の鎧", customize: true },
        { name: "アビス強化", customize: true },
        { name: "蛮族が侵攻する神々" },
      ],
    },
  },
  {
    name: "ルールブックIII",
    bookType: "ルールブック",
    contents: {
      data: [
        {
          type: "scenario",
          list: [{ title: "天を仰ぐ巨人", reguration: 34 }],
        },
      ],
      rule: [
        { name: "高レベルキャラクターの作成" },
        { name: "フェアリーテイマー技能の追加要素：古代種妖精の召喚" },
        { name: "「形状：突破」" },
        { name: "構造物の破壊" },
        {
          name: "名誉点関連",
          detail: ["NPCコネクションの獲得方法が追加される。"],
        },
        { name: "複数属性" },
        { name: "SSランクの武器への加工", customize: true },
        { name: "イグニダイト加工", customize: true },
        { name: "マナタイトの追加装甲", customize: true },
      ],
    },
  },
];

export const rulebooksAndSuppliments: RulebookAndSuppliment[] = [
  ...rulebooks,
  ...supplimentList,
];
