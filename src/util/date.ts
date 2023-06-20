type DateLike = string | Date | number;

/**
 * 2023/6/10のような形式を2023-06-10のような形式にする
 * @param str 元となる時間文字列
 * @returns
 */
export const formatDateString = (str: string, gmt: boolean = true): string => {
  const formatDate = str
    .split("/")
    .map((str) => (str.length < 2 ? "0" + str : str))
    .join("-");
  if (!gmt || formatDate.endsWith("+0900")) {
    return formatDate;
  } else {
    return `${formatDate}T00:00:00+0900`;
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
    b = new Date();
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
