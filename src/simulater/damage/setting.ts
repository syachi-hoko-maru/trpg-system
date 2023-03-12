import * as lodash from "lodash";
const { cloneDeep } = lodash;

const damageSetting: DamageSetting[] = [
  { name: "iryoku", label: "威力", type: "number", value: 10 },
  { name: "tsuika", label: "追加ダメージ", type: "number", value: 4 },
  {
    name: "critical",
    label: "C値",
    type: "number",
    value: 10,
    hint: "クリティカルしない場合は13と入力してください",
  },
  {
    name: "plus",
    label: "1回だけ出目を修正する ※【クリティカルレイ】など",
    type: "number",
    value: 0,
    hint: "固定しない場合は0と入力してください",
  },
  {
    name: "cplus",
    label: "クリティカル後も出目を修正する ※《必殺攻撃》など",
    type: "number",
    value: 0,
    hint: "固定しない場合は0と入力してください",
  },
  {
    name: "kotei",
    label: "1回だけ出目のうち1つを固定する ※〈薬師道具セット〉など",
    type: "number",
    value: 0,
    hint: "固定しない場合は0と入力してください",
    conflict: ["ckotei", "kake2", "ckake2"],
  },
  {
    name: "ckotei",
    label: "クリティカル後も出目のうち1つを固定する",
    type: "number",
    value: 0,
    hint: "固定しない場合は0と入力してください",
    conflict: ["kake2", "ckake2"],
  },
  {
    name: "kake2",
    label: "1回だけ2dではなく1d*2を使用する",
    type: "boolean",
    value: false,
    conflict: ["ckake2"],
  },
  {
    name: "ckake2",
    label: "クリティカル後も2dではなく1d*2を使用する",
    type: "boolean",
    value: false,
  },
];
const teikoSetting: TeikoSetting<"消滅" | "半減" | "必中">[] = [
  {
    name: "teiko",
    label: "抵抗",
    type: "select",
    value: "消滅",
    selects: ["消滅", "半減", "必中"],
    hint: "武器による攻撃も消滅に含む",
  },
];
const hiDamageSetting: HiDamageSetting[] = [
  {
    name: "bogo",
    label: "ダメージを減少させる効果 ※防護点など",
    type: "number",
    value: 0,
  },
];

export const getDamageSetting = (): DamageSetting[] => {
  if (typeof cloneDeep === "function") {
    return cloneDeep(damageSetting);
  }
  return [];
};
export const getDamageWithTeikoSetting = (): DamageWithTeikoSetting[] => {
  if (typeof cloneDeep === "function") {
    return cloneDeep(
      (teikoSetting as DamageWithTeikoSetting[]).concat(damageSetting)
    );
  }
  return [];
};
export const getHiDamageSetting = (): HiDamageSetting[] => {
  if (typeof cloneDeep === "function") {
    return cloneDeep(hiDamageSetting);
  }
  return [];
};
