import * as lodash from "lodash";
import { toNumber } from "./util";
import { nowDate } from "../util/date";

const { cloneDeep } = lodash;

export const simulate = async (
  simulateCount: number | string,
  mode: Mode,
  { label, func, tabs }: ModeSetting,
  args: FormSetting[][]
): Promise<simulateResult> => {
  if (tabs.length !== args.length) throw "[Bug] tabs.length !== args.length";
  const argsClone = cloneDeep(args);
  const date = nowDate();
  const arr: simulateFuncResult[] = [];
  const count = toNumber(simulateCount);
  console.log(`start ${count}`);
  for (let i = 0; i < count; i++) {
    arr.push(func(...(argsClone as any)));
  }
  const value =
    Math.round(
      (arr.reduce((sum, a) => (sum += a.result), 0) / arr.length) * 1000
    ) / 1000;
  const argSetting: ArgSetting = {};
  tabs.forEach((tab, i) => {
    argSetting[tab] = argsClone[i];
  });
  console.log("end");
  return { mode, label, value, argSetting, date };
};
