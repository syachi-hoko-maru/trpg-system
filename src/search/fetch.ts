import { wait } from "../util";

/**
 * searchJSONを取得する
 * @param maxCount 最大試行回数（デフォルト5回）
 * @returns
 */
export const fetchSearchJSON = async (maxCount = 5): Promise<SearchJSON> => {
  let json: SearchJSON = {};
  let count = 0;
  mainLoop: while (count < maxCount) {
    try {
      json = (
        await useFetch("/search.json").catch((err) => {
          console.error(err);
          return { data: ref({}) };
        })
      ).data.value as { [key: string]: string };

      if (json["/"]) {
        // トップページの検索ワードがあるならwhileを抜けてreturnする
        break mainLoop;
      } else {
        // ないならリセットしてcatchに飛ばす
        json = {};
        throw "";
      }
    } catch {
      count++;
      await wait(0.5 * count * 1000);
    }
  }
  // whileを抜けたらreturnする
  return json;
};
