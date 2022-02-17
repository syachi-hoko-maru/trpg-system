import Vue from "vue";

type Dice = 1 | 2 | 3 | 4 | 5 | 6;
type TwoDice = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type HanteiOption = {
  nodoKoteichi?: Boolean;
  zyudoKoteichi?: Boolean;
  nodoGf?: Boolean;
  zyudoGf?: Boolean;
  teiko?: "必中" | "半減" | String;
};

type DamageOption = {
  bougo?: number;
  half?: Boolean;
  criticalRay?: number;
  hissatsu?: number;
  yakushi?: number;
  gf?: Boolean;
};

declare module "vue/types/vue" {
  interface Vue {
    $dice: () => Dice;
    $twoDice: (number?: number) => TwoDice;
    $hantei: (difference: number, option: HanteiOption) => 0 | 1 | 2;
    $hanteiSimulate: (
      trial: number,
      difference: number,
      option: HanteiOption
    ) => number[];
    $damage: (
      keyNumber: number,
      additionalDamage: number,
      criticalNumber: number,
      option: DamageOption
    ) => number;
  }
}

const $dice = (number = 6) => Math.ceil(Math.random() * number) as Dice;
const $twoDice = (number?: number) => {
  if (number) return ($dice() + Number(number)) as TwoDice;
  else return ($dice() + $dice()) as TwoDice;
};

const $hantei = (difference: number, option: HanteiOption) => {
  const nodoDice = option.nodoKoteichi
    ? 0
    : option.nodoGf
    ? $dice() * 2
    : $twoDice();
  // 固定値ではない場合に処理を行う
  if (!option.nodoKoteichi) {
    // 能動自動失敗
    if (nodoDice == 2) return 0;
  }
  // 「抵抗：必中」の場合を処理する
  if (option.teiko == "必中") {
    return 2;
  }
  const zyudoDice = option.zyudoKoteichi
    ? 0
    : option.zyudoGf
    ? $dice() * 2
    : $twoDice();
  // 固定値ではない場合に処理を行う
  if (!option.zyudoKoteichi) {
    // 受動自動成功
    if (zyudoDice == 12) {
      if (option.teiko == "半減") return 1;
      else return 0;
    }
    // 能動自動成功 or 受動自動失敗
    if (nodoDice == 12 || zyudoDice == 2) {
      return 2;
    }
  }
  // 普通に上回る
  if (nodoDice + difference > zyudoDice) {
    return 2;
  } else {
    if (option.teiko == "半減") return 1;
    return 0;
  }
};

const $hanteiSimulate = (
  trial: number,
  difference: number,
  option: HanteiOption
) => {
  const counts: number[] = [0, 0, 0];
  for (let i = 0; i < trial; i++) {
    counts[$hantei(difference, option)]++;
  }
  return counts;
};

const keyNumberTable = [
  // 0
  [0, 0, 0, 0, 1, 2, 2, 3, 3, 4, 4],
  // 1
  [0, 0, 0, 0, 1, 2, 3, 3, 3, 4, 4],
  [0, 0, 0, 0, 1, 2, 3, 4, 4, 4, 4],
  [0, 0, 0, 1, 1, 2, 3, 4, 4, 4, 5],
  [0, 0, 0, 1, 2, 2, 3, 4, 4, 5, 5],
  [0, 0, 1, 1, 2, 2, 3, 4, 5, 5, 5],
  [0, 0, 1, 1, 2, 3, 3, 4, 5, 5, 5],
  [0, 0, 1, 1, 2, 3, 4, 4, 5, 5, 6],
  [0, 0, 1, 2, 2, 3, 4, 4, 5, 6, 6],
  [0, 0, 1, 2, 3, 3, 4, 4, 5, 6, 7],
  [0, 1, 1, 2, 3, 3, 4, 5, 5, 6, 7],
  // 11
  [0, 1, 2, 2, 3, 3, 4, 5, 6, 6, 7],
  [0, 1, 2, 2, 3, 4, 4, 5, 6, 6, 7],
  [0, 1, 2, 3, 3, 4, 4, 5, 6, 7, 7],
  [0, 1, 2, 3, 4, 4, 4, 5, 6, 7, 8],
  [0, 1, 2, 3, 4, 4, 5, 5, 6, 7, 8],
  [0, 1, 2, 3, 4, 4, 5, 6, 7, 7, 8],
  [0, 1, 2, 3, 4, 5, 5, 6, 7, 7, 8],
  [0, 1, 2, 3, 4, 5, 6, 6, 7, 7, 8],
  [0, 1, 2, 3, 4, 5, 6, 7, 7, 8, 9],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  // 21
  [0, 1, 2, 3, 4, 6, 6, 7, 8, 9, 10],
  [0, 1, 2, 3, 5, 6, 6, 7, 8, 9, 10],
  [0, 2, 2, 3, 5, 6, 7, 7, 8, 9, 10],
  [0, 2, 3, 4, 5, 6, 7, 7, 8, 9, 10],
  [0, 2, 3, 4, 5, 6, 7, 8, 8, 9, 10],
  [0, 2, 3, 4, 5, 6, 8, 8, 9, 9, 10],
  [0, 2, 3, 4, 6, 6, 8, 8, 9, 9, 10],
  [0, 2, 3, 4, 6, 6, 8, 9, 9, 10, 10],
  [0, 2, 3, 4, 6, 7, 8, 9, 9, 10, 10],
  [0, 2, 4, 4, 6, 7, 8, 9, 10, 10, 10],
  // 31
  [0, 2, 4, 5, 6, 7, 8, 9, 10, 10, 11],
  [0, 3, 4, 5, 6, 7, 8, 10, 10, 10, 11],
  [0, 3, 4, 5, 6, 8, 8, 10, 10, 10, 11],
  [0, 3, 4, 5, 6, 8, 9, 10, 10, 11, 11],
  [0, 3, 4, 5, 7, 8, 9, 10, 10, 11, 12],
  [0, 3, 5, 5, 7, 8, 9, 10, 11, 11, 12],
  [0, 3, 5, 6, 7, 8, 9, 10, 11, 12, 12],
  [0, 3, 5, 6, 7, 8, 10, 10, 11, 12, 13],
  [0, 4, 5, 6, 7, 8, 10, 11, 11, 12, 13],
  [0, 4, 5, 6, 7, 9, 10, 11, 11, 12, 13],
  // 41
  [0, 4, 6, 6, 7, 9, 10, 11, 12, 12, 13],
  [0, 4, 6, 7, 7, 9, 10, 11, 12, 13, 13],
  [0, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  [0, 4, 6, 7, 8, 10, 10, 11, 12, 13, 14],
  [0, 4, 6, 7, 9, 10, 10, 11, 12, 13, 14],
  [0, 4, 6, 7, 9, 10, 10, 12, 13, 13, 14],
  [0, 4, 6, 7, 9, 10, 11, 12, 13, 13, 15],
  [0, 4, 6, 7, 9, 10, 12, 12, 13, 13, 15],
  [0, 4, 6, 7, 10, 10, 12, 12, 13, 14, 15],
  [0, 4, 6, 8, 10, 10, 12, 12, 13, 15, 15],
  // 51
  [0, 5, 7, 8, 10, 10, 12, 12, 13, 15, 15],
  [0, 5, 7, 8, 10, 11, 12, 12, 13, 15, 15],
  [0, 5, 7, 9, 10, 11, 12, 12, 14, 15, 15],
  [0, 5, 7, 9, 10, 11, 12, 13, 14, 15, 16],
  [0, 5, 7, 10, 10, 11, 12, 13, 14, 16, 16],
  [0, 5, 8, 10, 10, 11, 12, 13, 15, 16, 16],
  [0, 5, 8, 10, 11, 11, 12, 13, 15, 16, 17],
  [0, 5, 8, 10, 11, 12, 12, 13, 15, 16, 17],
  [0, 5, 9, 10, 11, 12, 12, 14, 15, 16, 17],
  [0, 5, 9, 10, 11, 12, 13, 14, 15, 16, 18],
  // 61
  [0, 5, 9, 10, 11, 12, 13, 14, 16, 17, 18],
  [0, 5, 9, 10, 11, 13, 13, 14, 16, 17, 18],
  [0, 5, 9, 10, 11, 13, 13, 15, 17, 17, 18],
  [0, 5, 9, 10, 11, 13, 14, 15, 17, 17, 18],
  [0, 5, 9, 10, 12, 13, 14, 15, 17, 18, 18],
  [0, 5, 9, 10, 12, 13, 15, 15, 17, 18, 19],
  [0, 5, 9, 10, 12, 13, 15, 16, 17, 19, 19],
  [0, 5, 9, 10, 12, 14, 15, 16, 17, 19, 19],
  [0, 5, 9, 10, 12, 14, 16, 16, 17, 19, 19],
  [0, 5, 9, 10, 12, 14, 16, 17, 18, 19, 19],
  // 71
  [0, 5, 9, 10, 13, 14, 16, 17, 18, 19, 20],
  [0, 5, 9, 10, 13, 15, 16, 17, 18, 19, 20],
  [0, 5, 9, 10, 13, 15, 16, 17, 19, 20, 21],
  [0, 6, 9, 10, 13, 15, 16, 18, 19, 20, 21],
  [0, 6, 9, 10, 13, 16, 16, 18, 19, 20, 21],
  [0, 6, 9, 10, 13, 16, 17, 18, 19, 20, 21],
  [0, 6, 9, 10, 13, 16, 17, 18, 20, 21, 22],
  [0, 6, 9, 10, 13, 16, 17, 19, 20, 22, 23],
  [0, 6, 9, 10, 13, 16, 18, 19, 20, 22, 23],
  [0, 6, 9, 10, 13, 16, 18, 20, 21, 22, 23],
  // 81
  [0, 6, 9, 10, 13, 17, 18, 20, 21, 22, 23],
  [0, 6, 9, 10, 14, 17, 18, 20, 21, 22, 24],
  [0, 6, 9, 11, 14, 17, 18, 20, 21, 23, 24],
  [0, 6, 9, 11, 14, 17, 19, 20, 21, 23, 24],
  [0, 6, 9, 11, 14, 17, 19, 21, 22, 23, 24],
  [0, 7, 10, 11, 14, 17, 19, 21, 22, 23, 25],
  [0, 7, 10, 12, 14, 17, 19, 21, 22, 24, 25],
  [0, 7, 10, 12, 14, 18, 19, 21, 22, 24, 25],
  [0, 7, 10, 12, 15, 18, 19, 21, 22, 24, 26],
  [0, 7, 10, 12, 15, 18, 19, 21, 23, 25, 26],
  // 91
  [0, 7, 11, 13, 15, 18, 19, 21, 23, 25, 26],
  [0, 7, 11, 13, 15, 18, 20, 21, 23, 25, 27],
  [0, 8, 11, 13, 15, 18, 20, 22, 23, 25, 27],
  [0, 8, 11, 13, 16, 18, 20, 22, 23, 25, 28],
  [0, 8, 11, 14, 16, 18, 20, 22, 23, 26, 28],
  [0, 8, 11, 14, 16, 19, 20, 22, 23, 26, 28],
  [0, 8, 12, 14, 16, 19, 20, 22, 24, 26, 28],
  [0, 8, 12, 15, 16, 19, 20, 22, 24, 27, 28],
  [0, 8, 12, 15, 17, 19, 20, 22, 24, 27, 29],
  [0, 8, 12, 15, 18, 19, 20, 22, 24, 27, 30],
];

const $damage = (
  keyNumber: number,
  additionalDamage: number,
  criticalNumber: number,
  option: DamageOption
) => {
  // 以下の場合に計算を行わない
  // 威力が範囲外
  // C値が小さすぎる
  // 必殺の値が高すぎる
  if (
    keyNumber < 0 ||
    keyNumber > 100 ||
    criticalNumber < 6 ||
    (option.hissatsu && option.hissatsu + 2 >= criticalNumber)
  ) {
    return 0;
  }
  const key = keyNumberTable[keyNumber];
  let damageDice: number;
  damageDice = option.yakushi
    ? $twoDice(option.yakushi)
    : option.gf
    ? $dice() * 2
    : $twoDice();
  // クリティカルレイ or 必殺攻撃
  if (option.criticalRay || option.hissatsu) {
    damageDice += Number(option.criticalRay) + Number(option.hissatsu);
    if (damageDice > 12) damageDice = 12;
  }
  // 自動失敗
  if (damageDice == 2) return 0;
  // 成功した場合
  let damage = 0;
  damage += key[damageDice - 2] + additionalDamage;
  // 半減の場合とC値が13以上の場合はクリティカルしないのでここで返す
  if (option.half || criticalNumber >= 13) {
    return Math.ceil(damage / 2);
  }
  // クリティカル処理
  criticalLoop: while (true) {
    if (damageDice >= criticalNumber) {
      damage += key[damageDice - 2];
    } else {
      break criticalLoop;
    }
    damageDice = $twoDice();
    // 必殺攻撃
    if (option.hissatsu) {
      damageDice += Number(option.hissatsu);
      if (damageDice > 12) damageDice = 12;
    }
  }
  // 防護点を超えなかった場合
  if (option.bougo && damage < Number(option.bougo)) return 0;
  return damage - Number(option.bougo);
};

Vue.prototype.$dice = $dice;
Vue.prototype.$twoDice = $twoDice;
Vue.prototype.$hantei = $hantei;
Vue.prototype.$hanteiSimulate = $hanteiSimulate;
Vue.prototype.$damage = $damage;
