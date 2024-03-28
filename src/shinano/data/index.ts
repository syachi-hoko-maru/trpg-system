export type EffectLikeMagicTarget =
  | "1体"
  | "1体全"
  | "1体X"
  | { range: number; max: number };

export type EffectLikeMagicTime =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 18
  | 60
  | "一瞬"
  | "特殊";

export type EffectLikeMagic<Target> = {
  move: "主" | "補助" | "補助（戦闘準備）";
  mp: number;
  time: EffectLikeMagicTime;
  teiko: "必中" | "半減" | "消滅" | "任意" | "なし";
} & (
  | {
      target: "術者" | { range: number; max: number };
      range: "術者";
      form: "-";
    }
  | {
      target: Target;
      range: number;
      form: "起点指定" | "射撃" | "貫通" | "突進";
    }
  | {
      target: Target;
      range: "接触";
      form: "-";
    }
);

export const getTimeString = (time: EffectLikeMagicTime): string[] => {
  if (typeof time === "number") {
    if (time % (24 * 60 * 6) === 0) {
      return [`${time / (24 * 60 * 6)}日`];
    } else if (time % (60 * 6) === 0) {
      return [`${time / (60 * 6)}時間`, `（${time}R）`];
    } else if (time % 6 === 0) {
      return [`${time / 6}分`, `（${time}R）`];
    } else {
      return [`${time * 10}秒`, `（${time}R）`];
    }
  } else {
    return [time];
  }
};
