import type {
  Item,
  ItemYoho,
  NormalItemCategoryWeapon,
  WeaponArmorRank,
} from "./type";

export type NormalWeapon = Item<NormalItemCategoryWeapon> & {
  dazan: "打撃" | "斬撃" | "打撃斬撃";
  yoho: ItemYoho;
  hikkin: number;
  meichu: -2 | -1 | 0 | 1 | 2;
  iryoku: number;
  c: 8 | 9 | 10 | 11 | 12 | 13;
  d: 0 | 1 | 2 | 3 | 4 | 5;
  kakuto?: "パンチ" | "キック" | "投げ";
};
export type GunWeapon = Item<["ガン", WeaponArmorRank]> & {
  yoho: ItemYoho;
  hikkin: number;
  soten: number;
  meichu: -2 | -1 | 0 | 1 | 2;
  c?: false;
  d: 0 | 1 | 2 | 3 | 4 | 5;
  range: 10 | 20 | 30 | 40 | 50;
};
export type YatamaWeapon = Item<["矢弾", WeaponArmorRank]> & {
  yoho?: false;
  shooter: "ボウ" | "クロスボウ" | "ガン";
};
export type Weapon = NormalWeapon | GunWeapon | YatamaWeapon;
export const WeaponList: Weapon[] = [
  {
    name: "爪（クローリー）",
    price: "-",
    known: 7,
    category: ["格闘", "B"],
    dazan: "斬撃",
    yoho: "1H拳",
    hikkin: 1,
    meichu: 1,
    iryoku: 9,
    c: 9,
    d: 0,
    kakuto: "パンチ",
  },
];
