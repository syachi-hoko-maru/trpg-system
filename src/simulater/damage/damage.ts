import dice from "../dice";
import { getBoolean, getNumber } from "../util";
import { keyNumberTable } from "./keyNumberTable";
import { getHiDamageSetting } from "./setting";

const getDiceAndValue = (
  damageSetting: FormSetting[],
  criticalCount: number = 0
): { value: number; dice: number[] } => {
  let kotei = getNumber<DamageSettingName>("ckotei", damageSetting);
  let kake2 = getBoolean<DamageSettingName>("ckake2", damageSetting);
  let plus = getNumber<DamageSettingName>("cplus", damageSetting);
  if (criticalCount === 0) {
    kotei += getNumber<DamageSettingName>("kotei", damageSetting);
    kake2 = getBoolean<DamageSettingName>("kake2", damageSetting);
    plus += getNumber<DamageSettingName>("plus", damageSetting);
  }
  let ndResult: NdResult;
  let value: number;
  if (!kotei && !kake2) {
    ndResult = dice.nd(2, 6);
    value = ndResult.sum;
  } else {
    ndResult = dice.nd(1, 6);
    if (kotei) {
      value = kotei + ndResult.sum;
    } else if (kake2) {
      value = ndResult.sum * 2;
    } else throw "[Bug] Yosogai ERROR!?";
  }
  if (plus) {
    value += plus;
  }
  if (value < 2) value = 2;
  if (value > 12) value = 12;
  return {
    value,
    dice: ndResult.ndiceArray,
  };
};

const simpleDamage = (damageSetting: FormSetting[]): DamageResult => {
  const iryoku = getNumber<DamageSettingName>("iryoku", damageSetting);
  const tsuika = getNumber<DamageSettingName>("tsuika", damageSetting);
  const critical = getNumber<DamageSettingName>("critical", damageSetting);
  const cplus = getNumber<DamageSettingName>("cplus", damageSetting);
  const ckotei = getNumber<DamageSettingName>("ckotei", damageSetting);

  const keyTable = keyNumberTable[iryoku];

  if (iryoku < 0 || iryoku > 100)
    throw "威力は0〜100までの整数値で指定する必要があります。";
  if (critical - cplus - (ckotei ? ckotei - 3.5 : 0) < 6)
    throw "クリティカルが起きすぎるため、シミュレートできません。";

  const values: number[] = [];
  const dices: number[][] = [];
  let criticalCount: number = 0;
  let damage: number = 0;
  while (true) {
    const { value, dice } = getDiceAndValue(damageSetting, criticalCount);
    values.push(value);
    dices.push(dice);
    if (criticalCount === 0 && value !== 2) {
      damage += tsuika;
    }
    damage += keyTable[value - 2];
    if (value >= critical && value !== 2) {
      criticalCount++;
    } else {
      break;
    }
  }
  return { damage, criticalCount, values, dices };
};

export const damage: simulateFunc = (
  damageSetting: FormSetting[],
  getHiDamageSetting: FormSetting[]
): simulateFuncResult => {
  const damageResult = simpleDamage(damageSetting);
  const bogo = getNumber<HiDamageSettingName>("bogo", getHiDamageSetting);
  const result = damageResult.damage > bogo ? damageResult.damage - bogo : 0;
  return { result, damageResult };
};
