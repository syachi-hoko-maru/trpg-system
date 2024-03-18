import * as lodash from "lodash";
import dice from "../dice";
import { getBoolean, getNumber } from "../util";

const { isEqual } = lodash;
const simpleHantei = (hanteiSettings: FormSetting[]): SimpleHanteiResult => {
  const kizyun = getNumber<HanteiCoreSettingName>("kizyun", hanteiSettings);
  const kotei = getNumber<HanteiCoreSettingName>("kotei", hanteiSettings);
  const kake2 = getBoolean<HanteiCoreSettingName>("kake2", hanteiSettings);
  let diceResult: NdResult;
  let value: number;
  let autoSuccess: boolean;
  let autoFailure: boolean;
  if (!kotei && !kake2) {
    diceResult = dice.nd(2, 6);
    value = kizyun + diceResult.sum;
    autoSuccess = isEqual(diceResult.ndiceArray, [6, 6]);
    autoFailure = isEqual(diceResult.ndiceArray, [1, 1]);
  } else {
    diceResult = dice.nd(1, 6);
    if (kotei) {
      value = kizyun + diceResult.sum + kotei;
      autoSuccess = kotei === 6 && isEqual(diceResult.ndiceArray, [6]);
      autoFailure = kotei === 1 && isEqual(diceResult.ndiceArray, [1]);
    } else if (kake2) {
      value = kizyun + diceResult.sum * 2;
      autoSuccess = isEqual(diceResult.ndiceArray, [6]);
      autoFailure = isEqual(diceResult.ndiceArray, [1]);
    } else {
      throw "[Bug] Yosogai ERROR!?";
    }
  }
  return {
    value,
    dice: diceResult.ndiceArray,
    autoSuccess,
    autoFailure,
  };
};

export const hantei: simulateFunc = (
  hanteiSettings: FormSetting[]
): simulateFuncResult => {
  const hantei = simpleHantei(hanteiSettings);
  const mokuhyo = getNumber<HanteiSettingName>("mokuhyo", hanteiSettings);
  const result = hantei.autoFailure
    ? 0
    : hantei.autoSuccess
    ? 1
    : hantei.value >= mokuhyo
    ? 1
    : 0;
  return {
    result,
    mokuhyo,
    hantei,
  };
};

const simpleHanteiWithKoteichi = (hanteiSettings: FormSetting[]) => {
  const kizyun = getNumber<HanteiCoreSettingName>("kizyun", hanteiSettings);
  const koteichi = getBoolean<kurabeaiSettingName>("koteichi", hanteiSettings);
  if (koteichi) {
    return { value: kizyun + 7 };
  } else return simpleHantei(hanteiSettings);
};

export const kurabeai: simulateFunc = (
  nodoSetting: FormSetting[],
  zyudoSetting: FormSetting[]
): simulateFuncResult => {
  const nodo = simpleHanteiWithKoteichi(nodoSetting);
  const zyudo = simpleHanteiWithKoteichi(zyudoSetting);
  const result =
    zyudo.autoSuccess || nodo.autoFailure
      ? 0
      : zyudo.autoFailure || nodo.autoSuccess
      ? 1
      : nodo.value > zyudo.value
      ? 1
      : 0;
  return {
    result,
    nodo,
    zyudo,
  };
};
