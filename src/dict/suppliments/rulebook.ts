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
    },
  },
];

export const rulebooksAndSuppliments: RulebookAndSuppliment[] = [
  ...rulebooks,
  ...supplimentList,
];
