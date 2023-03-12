import * as lodash from "lodash";
const { cloneDeep } = lodash;

const hanteiCoreSettings: FormSetting<HanteiCoreSettingName>[] = [
  { name: "kizyun", label: "基準値", type: "number", value: 4 },
  {
    name: "kotei",
    label: "出目のうち1つを固定する",
    type: "number",
    value: 0,
    hint: "固定しない場合は0と入力してください",
    conflict: ["kake2", "koteichi"],
  },
  {
    name: "kake2",
    label: "2dではなく1d*2を使用する",
    type: "boolean",
    value: false,
    conflict: ["kotei", "koteichi"],
  },
];
const hanteiSetting: FormSetting<HanteiSettingName>[] = [
  { name: "mokuhyo", label: "目標値", type: "number", value: 10 },
];
const kurabeaiSetting: FormSetting<kurabeaiSettingName>[] = [
  {
    name: "koteichi",
    label: "固定値（基準値+7）を使用する",
    type: "boolean",
    value: false,
  },
];

export const getHanteiSettings = (): HanteiSetting[] => {
  if (typeof cloneDeep === "function") {
    return cloneDeep(
      (hanteiCoreSettings as HanteiSetting[]).concat(hanteiSetting)
    );
  }
  return [];
};
export const getKurabeaiSettings = (): KurabeaiSetting[] => {
  if (typeof cloneDeep === "function") {
    return cloneDeep(
      (hanteiCoreSettings as KurabeaiSetting[]).concat(kurabeaiSetting)
    );
  }
  return [];
};
