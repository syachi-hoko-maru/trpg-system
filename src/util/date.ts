export type DateLike = string | Date | number;

/**
 * 将来的にここは管理画面から切り替えたい……
 */
export const settedTime: { value: string; setValue: (s: string) => void } = {
  value: "",
  setValue: (s: string) => {
    settedTime.value = s;
  },
};
export const nowDate = (): Date => {
  const settedDate = getDate(settedTime.value);
  return settedDate ? settedDate : new Date();
};

/**
 * 2023/6/10のような形式を2023-06-10のような形式にする
 * @param str 元となる時間文字列
 * @returns
 */
export const formatDateString = (str: string, gmt: boolean = true): string => {
  const splitedStr: string[] = str.split("/");
  const formatDate: string = splitedStr
    .map((str) => (str.length < 2 ? "0" + str : str))
    .join("-");
  // 9/12追加分、9/31をエラーにする
  if (new Date(formatDate).getMonth() + 1 !== Number(splitedStr[1])) {
    // console.error(`ERROR: ${str}/${formatDate} is invalid date string!`);
    throw `ERROR: ${str}/${formatDate} is invalid date string!`;
  }
  if (!gmt || formatDate.endsWith("+0900")) {
    // 追加分ここまで
    return formatDate;
  } else {
    return `${formatDate}T00:00:00+0900`;
  }
};

const getDate = (date: DateLike): Date | null => {
  let result: Date;
  try {
    if (typeof date === "string") {
      result = new Date(formatDateString(date));
    } else if (typeof date === "object") {
      result = date;
    } else if (Number.isNaN(date)) {
      result = new Date(date);
    } else {
      return null;
    }
    if (Number.isNaN(result.getDate())) {
      return null;
    }
    return result;
  } catch (e) {
    return null;
  }
};

const getTimeNumber = (date: DateLike): number => {
  if (typeof date === "string") {
    date = new Date(formatDateString(date));
  }
  if (typeof date === "object") {
    date = date.getTime();
  }
  if (Number.isNaN(date)) {
    console.error(`ERROR: Number isNaN in Function getTimeNumber(${date}). `);
    return 0;
  }
  return date;
};

/**
 * 対象の日付が比較対象の日付より過去かどうかを調べる
 * aが（bよりも）昔なら true を返し、aが（bよりも）未来なら false を返します
 * @param a 対象の日付
 * @param b 比較対象の日付（入力しない場合は今）
 */
export const isPast = (a: DateLike, b?: DateLike): boolean => {
  if (!b) {
    b = nowDate();
  }
  // aの方が小さい → aの方がbよりも過去
  return getTimeNumber(a) - getTimeNumber(b) < 0;
};

/**
 * 対象の日付が比較対象の日付より過去かどうかでソートする
 * @param a 対象の日付
 * @param b 比較対象の日付（入力しない場合は今）
 */
export const sortByDate =
  (recent?: boolean) =>
  (a: DateLike, b: DateLike): number => {
    let c = recent ? 1 : -1;
    const isPastFlage = isPast(a, b);
    if (isPastFlage) return c;
    else return -c;
  };

export const sortPagesByDate =
  (recent?: boolean) => (a: PageSetting, b: PageSetting) =>
    sortByDate(recent)(a.lastmod, b.lastmod);
