type ItemCategory =
  | ItemCategoryWeapon
  | ItemCategoryArmor
  | YakusoPotion
  | BokenGino
  | BokenDogu
  | Accessory;
export type Item<Category extends ItemCategory> = {
  name: string;
  price: number | "-";
  known: number;
  shape?: string;
  category: Category;
  gaiyo?: string;
  effect?: string;
};

export type WeaponArmorRank = "B" | "A" | "S" | "SS";
/** 武器 */
export type NormalItemCategoryWeapon = [
  (typeof normalWeaponTypeList)[number],
  WeaponArmorRank
];
export type ItemCategoryWeapon = [
  (typeof WeaponTypeList)[number],
  WeaponArmorRank
];
const normalWeaponTypeList = [
  "ソード",
  "アックス",
  "スピア",
  "メイス",
  "スタッフ",
  "フレイル",
  "ウォーハンマー",
  "格闘",
  "投擲",
  "ボウ",
  "クロスボウ",
] as const;
const WeaponTypeList = [...normalWeaponTypeList, "ガン", "矢弾"] as const;

/** 防具 */
type ItemCategoryArmor = [(typeof armorTypeList)[number], WeaponArmorRank];
const yoroiList = ["非金属鎧", "金属鎧"] as const;
const armorTypeList = [...yoroiList, "盾"] as const;
/** 薬草類・ポーション類 */
type YakusoPotion = "薬草" | "ポーション";
/** 冒険者技能用アイテム */
type BokenGino = "冒険者技能用アイテム" | "冒険者技能用アイテム（消耗品）";
/** 冒険道具類 */
type BokenDogu = "冒険道具類" | "冒険道具類（消耗品）";
/** 装飾品 */
type Accessory = (typeof accessoryList)[number];
const accessoryList = [
  "頭",
  "耳",
  "首",
  "背中",
  "手",
  "腰",
  "足",
  "任意",
] as const;

export type ItemYoho = (typeof yohoList)[number];
const yohoList = ["1H", "1H拳", "1H#", "1H投", "2H"] as const;
