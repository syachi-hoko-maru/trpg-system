import { pageSettingList } from "./pageSettingList";
import { scenarioData } from "./scenario";

const shuffle = <T>(array: Array<T>) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const getOsusumePageList = (
  pageSetting: PageSetting,
  type: "kanren" | "osusume",
  pageArray: string[]
) => {
  // 隠しページでなく説明があり、かつ今表示していないページ
  const dataList = pageSettingList.filter(
    (page) => !page.hidden && page.explain && page.to !== pageSetting.to
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
  } else {
    // おすすめ
    const osusumeDataList = dataList.filter((page) => page.img && page.osusume);
    // 作者がしゃちほこ丸のシナリオを表示する
    if (pageSetting.to.indexOf("scenario") === -1) {
      scenarioData
        .filter((sd) => sd.author === "しゃちほこ丸")
        .forEach((sd) => {
          osusumeDataList.push({
            title: sd.title,
            to: `/scenario#${sd.id}`,
            explain: sd.explain,
            img: sd.img,
            osusume: true,
            lastmod: "",
            tags: [],
          });
        });
    }
    return shuffle(osusumeDataList)
      .filter((page) =>
        pageArray.slice(0, osusumeDataList.length - 9).indexOf(page.to)
      )
      .slice(0, 5);
  }
  return [];
};
