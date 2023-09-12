/**
 * 一定時間、待つasync関数
 * @param ms 待つ時間（ms）
 * @returns 待った時間（ms）
 */
export const wait = <T extends number>(ms: T): Promise<T> => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve(ms);
    }, ms);
  });
};
