import { damage } from "./damage/damage";
import { kurabeai } from "./hantei/hantei";
import { getSelect } from "./util";

export const fukugo: simulateFunc = (
  nodoSetting: FormSetting[],
  zyudoSetting: FormSetting[],
  damageSetting: FormSetting[],
  getHiDamageSetting: FormSetting[]
): simulateFuncResult => {
  let result: number = 0;
  let nodo: SimpleHanteiResult | undefined = undefined;
  let zyudo: SimpleHanteiResult | undefined = undefined;
  let damageResult: DamageResult | undefined = undefined;

  const teiko = getSelect<TeikoSettingName>("teiko", damageSetting);
  let flag: "damage" | "half" | "no";
  if (teiko === "必中") {
    flag = "damage";
  } else {
    const kurabeaiFuncResult = kurabeai(nodoSetting, zyudoSetting);
    nodo = kurabeaiFuncResult.nodo;
    zyudo = kurabeaiFuncResult.zyudo;
    if (kurabeaiFuncResult.result === 1) {
      flag = "damage";
    } else if (teiko === "半減") {
      flag = "half";
    } else if (teiko === "消滅") {
      flag = "no";
    } else {
      throw "抵抗の入力が不正です。";
    }
  }
  switch (flag) {
    case "damage": {
      const damageFuncResult = damage(damageSetting, getHiDamageSetting);
      result = damageFuncResult.result;
      damageResult = damageFuncResult.damageResult;
      break;
    }
    case "half": {
      const damageFuncResult = damage(
        damageSetting.map((d) => {
          if (d.name === "critical") d.value = 13;
          return d;
        }),
        getHiDamageSetting
      );
      result = Math.ceil(damageFuncResult.result / 2);
      damageResult = damageFuncResult.damageResult;
      break;
    }
  }

  return {
    result,
    nodo,
    zyudo,
    damageResult,
  };
};
