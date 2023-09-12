import { pageSettingList } from "./pageSettingList";

export const getPageSetting = (url: string): PageSetting => {
  const path = url
    // #以下を無視
    .replace(/#.*$/, "")
    // URLクエリーを無視
    .replace(/\?.*$/, "")
    // pageを示す数字を無視
    .replace(/\/\d+\/?$/, "")
    // index.html表記を無視
    .replace(/index\.html$/, "")
    // search以下の検索パラメータを無視
    .replace(/^\/search\/.*$/, "/search")
    // 末尾の/を無視
    .replace(/^(.+)\/$/, "$1");

  // console.log(path);
  let pageSetting = pageSettingList.find(
    (pageSetting) => pageSetting.to === path
  );
  if (!pageSetting) {
    pageSetting = pageSettingList.find(
      (pageSetting) => pageSetting.to === "error"
    );
  }
  if (!pageSetting) {
    throw `[ERROR] this page ${url} is not exists`;
  }
  // console.log(url, pageSetting.to);
  return pageSetting;
};
