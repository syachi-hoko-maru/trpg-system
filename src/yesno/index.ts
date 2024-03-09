import { getEntries, getKeys } from "../util";

const setParent = <Def extends YesnoDefine>(
  yesnoTags: Readonly<(keyof Def)[]>,
  yesnoDefine: Def,
  history: (keyof Def)[] = []
): (keyof Def)[] => {
  return yesnoTags.flatMap((t) => {
    const parent = yesnoDefine[t].parent;
    if (parent && parent.length > 0) {
      return [
        t,
        ...setParent(
          // 既出を除いたparent（ループ阻止）
          parent.filter((p) => history.indexOf(p) === -1),
          yesnoDefine,
          // 記述の引き継ぎ
          [t, ...history]
        ),
      ];
    }
    return t;
  });
};
/**
 * @param dict YesNoDict
 * @param arr 現在の候補
 */
const getTag = <Key extends string, Def extends YesnoDefine>(
  dict: YesNoDict<Key, Def>,
  arr: Key[],
  tagHistory: YesNoTagHistory<Def>,
  first?: true
): keyof Def | null => {
  if (arr.length <= 1) return null;
  /** 各yesnoTagがどれだけ出現するか */
  const tagCounts: { [key in keyof Def]?: number } = {};
  // tagCountsをカウント
  arr.forEach((key) => {
    dict[key].forEach((tag) => {
      // 既出のタグは対象外とする
      if (tagHistory[tag] || tagHistory[tag] === 0) return;
      const value = tagCounts[tag];
      if (!value) tagCounts[tag] = 1;
      else tagCounts[tag] = value + 1;
    });
  });
  if (!getKeys(tagCounts).length) return null;
  // 中間値を取得する
  const mid = arr.length / 2;
  const resultTags: [keyof Def, number | undefined][] = getEntries(
    tagCounts
  ).sort((a, b) => {
    const aValue: number | undefined = a[1];
    const bValue: number | undefined = b[1];
    if (!aValue) return -1;
    if (!bValue) return 1;
    const aD = Math.abs(mid - aValue);
    const bD = Math.abs(mid - bValue);
    if (aD > bD) return 1;
    if (aD < bD) return -1;
    return Math.random() - 1 / 2;
  });
  if (!first) {
    return resultTags[0][0];
  } else {
    //最初なら上位からランダムで選ぶ
    return resultTags[
      Math.floor(
        Math.random() *
          Math.min(resultTags.length > 20 ? 5 : 3, resultTags.length)
      )
    ][0];
  }
};

const setScore = <Key extends string, Def extends YesnoDefine>(
  score: YesNoScore<Key>,
  dict: YesNoDict<Key, Def>,
  tag: keyof Def,
  flag: boolean
): void => {
  getEntries(dict).forEach(([key, yesnoTags]) => {
    const value = score[key];
    if (flag === yesnoTags.includes(tag)) {
      if (!value) score[key] = 1;
      else if (value > 0) score[key] = value * 2;
      else score[key] = value + 1;
    } else {
      if (!value) score[key] = -1;
      else score[key] = value - 1;
    }
  });
};

const setArr = <Key extends string>(score: YesNoScore<Key>): Key[] => {
  //   const forAverageScore: [number, number] = getEntries(score).reduce(
  //     (prev, [_, num]) => {
  //       if (!num || num <= 0) return prev;
  //       return [(prev[0] += num), (prev[1] += 1)];
  //     },
  //     [0, 0]
  //   );
  //   const averageScore: number = forAverageScore[0] / forAverageScore[1];
  let maxScore = 0;
  return getEntries(score).reduce((prev, [key, num]) => {
    if (num && num > maxScore) {
      maxScore = num;
      return [key];
    }
    if (num && num === maxScore) {
      return [...prev, key];
    }
    return prev;
  }, [] as Key[]);
};

const getResult = <Key extends string>(
  yesnoScore: YesNoScore<Key>
): YesNoResult<Key> => {
  let maxScore = 0;
  const list: Key[] = getEntries(yesnoScore).reduce((prev, [key, score]) => {
    if (score && score > maxScore) {
      maxScore = score;
      return [key];
    }
    if (score && score === maxScore) {
      return [...prev, key];
    }
    return prev;
  }, [] as Key[]);
  const foryou = list[Math.floor(Math.random() * list.length)];
  const other: Key[] = getEntries(yesnoScore)
    .filter(([key, _]) => key !== foryou)
    .sort((a, b) => {
      const aValue: number | undefined = a[1];
      const bValue: number | undefined = b[1];
      if (!aValue) return bValue || 1;
      if (!bValue) return -aValue;
      if (aValue > bValue) return -1;
      if (aValue < bValue) return 1;
      return Math.random() - 1 / 2;
    })
    .map((a) => a[0])
    .slice(0, 5);
  return { foryou, other };
};

export const yesnoQuestion = function* <
  Key extends string,
  Def extends YesnoDefine
>(
  data: {
    [key in Key]?: {
      yesnoTags: readonly (keyof Def)[];
    } & {
      [k: string]: any;
    };
  },
  yesnoDefine: Def,
  haita: boolean = true,
  answerCount: number = 1
): Generator<
  { question: string; arr: Key[] },
  YesNoResult<Key> | null,
  "yes" | "no" | "?"
> {
  const yesnoDict: YesNoDict<Key, Def> = Object.fromEntries(
    getEntries(data).reduce((pre, arr) => {
      if (!arr) return pre;
      const [key, val] = arr;
      if (!val || !val.yesnoTags) return pre;
      pre.push([
        key,
        val.yesnoTags.flatMap((t) => {
          const question = yesnoDefine[t].question;
          if (!question) {
            return [];
          }
          const parent = yesnoDefine[t].parent;
          if (parent && parent.length > 0) {
            return [t, ...parent];
          }
          return t;
        }),
      ]);
      return pre;
    }, [] as [Key, (keyof Def)[]][])
  ) as YesNoDict<Key, Def>;
  const yesnoScore: YesNoScore<Key> = {};
  const tagHistory: YesNoTagHistory<Def> = {};
  let arr: Key[] = getKeys(yesnoDict);
  let tag: keyof Def | null = getTag(yesnoDict, arr, tagHistory, true);
  let count = 0;
  while (count < 1000) {
    if (tag === null || arr.length <= answerCount) {
      const result = getResult(yesnoScore);
      return result;
    }
    count++;
    const answer = yield { question: yesnoDefine[tag].question, arr };
    if (answer === "yes" || answer === "no" || answer === "?") {
      // 履歴の更新
      tagHistory[tag] = answer === "yes" ? 1 : answer === "no" ? -1 : 0;
      if (answer === "yes") {
        // yes→親も履歴を更新する
        yesnoDefine[tag].parent?.forEach((p) => {
          tagHistory[p] = 1;
        });
        // yes→被りを0にする
        yesnoDefine[tag].kaburi?.forEach((p) => {
          // console.log(`${String(tag)}の被り${p}を0にしました`);
          tagHistory[p] = 0;
        });
      } else if (answer === "no") {
        // no→子も履歴を更新する
        getEntries(yesnoDefine).forEach(([key, val]) => {
          // 親にtagを持つ（=子）ならnoが伝播
          if (val.parent && val.parent.indexOf(tag) >= 0) {
            tagHistory[key] = -1;
          }
        });
      }
      if (answer === "yes" || (haita && answer === "no")) {
        const flag: boolean = (answer === "yes") === !yesnoDefine[tag].reverse;
        setScore(yesnoScore, yesnoDict, tag, flag);
        arr = setArr(yesnoScore);
      }
      tag = getTag(yesnoDict, arr, tagHistory);
    } else {
      continue;
    }
  }
  return getResult(yesnoScore);
};
