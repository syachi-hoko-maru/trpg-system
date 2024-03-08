import type { DateLike } from "../util/date";
import { supplimentYesNo } from "./yesno/supplimentYesNo";

export const supplimentList = [
  { name: "エピックトレジャリー", type: "大型サプリ", tags: [], date: "" },
  { name: "モンストラスロア", type: "大型サプリ", tags: [], date: "" },
  { name: "メイガスアーツ", type: "大型サプリ", tags: [], date: "" },
  { name: "バトルマスタリー", type: "大型サプリ", tags: [], date: "" },
  {
    name: "アーケインレリック",
    type: "大型サプリ",
    tags: [],
    date: "2023/7/20",
  },
  //   { name: "バトルマスタリー", type: "大型サプリ", tags: [], date: "" },
] as const satisfies Readonly<
  {
    name: string;
    type: "大型サプリ";
    tags: readonly (keyof typeof supplimentYesNo)[];
    date: DateLike;
  }[]
>;

export type SupplimentList = (typeof supplimentList)[number]["name"];
