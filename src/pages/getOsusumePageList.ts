import { getPageSetting, isHidden } from "./getPageSetting";
import { pageSettingList } from "./pageSettingList";
import { shuffle } from "~/src/util";

export const getOsusumePageList = (
  pageSetting: PageSetting,
  type: "kanren" | "osusume" | "popular",
  pageArray: string[]
) => {
  // 隠しページでなく説明があり、かつ今表示していないページ
  const dataList = pageSettingList.filter(
    (page) =>
      !isHidden(page) &&
      !page.noSearch &&
      page.explain &&
      page.img &&
      page.to !== pageSetting.to
  );
  // 関連ならtagの一致を調べる
  if (type === "kanren") {
    const kanrenDataList: { pageSetting: PageSetting; kanren: number }[] =
      dataList
        .map((pa) => {
          let kanren = 0;
          for (let tag of pa.tags) {
            if (pageSetting.tags.indexOf(tag) >= 0) {
              // タグが含まれる時
              kanren += 2;
            } else if (pageSetting.tags.join("").indexOf(tag) >= 0) {
              // 親タグが含まれる時
              kanren += 1;
            }
          }
          if (pageSetting.to.indexOf(pa.to) >= 0) {
            // このページが親ページの時
            kanren += 3;
          } else if (pa.to.indexOf(pageSetting.to) >= 0) {
            // このページが子ページの時
            kanren += 2;
          }
          return { pageSetting: pa, kanren };
        })
        .sort((a, b) => -a.kanren + b.kanren)
        .slice(0, 10);
    // console.log(kanrenDataList);
    return kanrenDataList.map((d) => d.pageSetting).slice(0, 5);
  } else if (type === "popular") {
    // 人気
    const popularPageArray = shuffle(
      [
        "/sw25/forbeginner/suppliment",
        "/sw25/tool/simulate",
        "/sw25/forbeginner/scenario",
        "/sw25/tool",
        "/sw25/forbeginner/syuzoku",
        "/sw25/tool/intro",
      ]
        .filter((str) => str !== pageSetting.to)
        .map((url) => getPageSetting(url))
        .slice(0, 5)
    );
    return popularPageArray;
  } else {
    // おすすめ
    const osusumeDataList = dataList.filter((page) => page.img && page.osusume);
    return shuffle(osusumeDataList)
      .filter((page) =>
        pageArray.slice(0, osusumeDataList.length - 9).indexOf(page.to)
      )
      .slice(0, 5);
  }
  return [];
};
