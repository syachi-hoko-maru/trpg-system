import { sortPagesByDate } from "../util/date";

export const sortValues = [
  { label: "デフォルト（関連度順）", value: "default" },
  { label: "更新日が新しい順", value: "recent" },
  { label: "更新日が古い順", value: "old" },
] as const;

export type SortType = (typeof sortValues)[number]["value"];

export const isSortType = (str: string): str is SortType => {
  return sortValues.map(({ value }) => value).indexOf(str as SortType) >= 0;
};

/**
 * ソートを行う関数（非破壊）
 * @param searchResults
 * @param sortType
 * @param allFlag 「ページ一覧」か否か
 * @returns ソートを行った結果
 */
export const sort = (
  searchResults: SearchResult[],
  sortType: SortType,
  allFlag: boolean
): SearchResult[] => {
  const sortedSearchResults: SearchResult[] = JSON.parse(
    JSON.stringify(searchResults)
  );
  return sortedSearchResults
    .filter((serchResult) => {
      if (sortType !== "default" && !allFlag) {
        // ソートタイプがデフォルトではなく、ページ一覧ではない場合、関連度が1未満（不合格）のものは表示しない
        return serchResult.kanren >= 1;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortType) {
        case "default":
          return b.kanren - a.kanren;
        case "recent":
          return sortPagesByDate(true)(a.pageSetting, b.pageSetting);
        case "old":
          return sortPagesByDate(false)(a.pageSetting, b.pageSetting);
      }
    });
};
