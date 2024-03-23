import type { Monster } from "..";

export const gavderungaGolem: Monster = {
  name: "ゴーレム：ガブディランガ（初期状態）",
  initiative: -1,
  externalUrl: "https://yutorize.2-d.jp/ytsheet/sw2.5/?id=DPsv4F",
  myUrl: "gavderunga.html",
  status: [
    { label: "核HP", value: 20, max: 20 },
    { label: "核MP", value: 0, max: 0 },
    { label: "上半身HP", value: 40, max: 40 },
    { label: "上半身MP", value: 0, max: 0 },
    { label: "下半身HP", value: 40, max: 40 },
    { label: "下半身MP", value: 0, max: 0 },
  ],
  commands:
    "2d+9+{生命抵抗修正} 生命抵抗力\n2d+9+{精神抵抗修正} 精神抵抗力\n2d+10+{回避修正} 回避／核\n2d+8+{回避修正} 回避／上半身\n2d+6+{回避修正} 回避／下半身\n\n－+{打撃修正} ダメージ／なし（核）\n\n2d+10+{命中修正} 命中力／腕（上半身）\n2d+12+{打撃修正} ダメージ／腕（上半身）\n\n－+{打撃修正} ダメージ／なし（下半身）\n\n▶咆哮／13／精神抵抗力／半減\n2d+6 ▶咆哮／精神抵抗力／半減\n2d+2 衝撃属性魔法ダメージ／咆哮\n(2d+2)/2U 衝撃属性魔法ダメージ（半減）／咆哮\n\n▶地震／14／生命抵抗力／消滅\n2d+7 ▶地震／生命抵抗力／消滅\n\n\n\n### ■パラメータ\n",
};
