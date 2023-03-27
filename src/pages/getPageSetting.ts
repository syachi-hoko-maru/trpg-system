import { pageSettingList } from "./pageSettingList";

export const getPageSetting = (url: string): PageSetting => {
  let pageSetting = pageSettingList.find(
    (pageSetting) =>
      pageSetting.to ===
      url
        .replace(/#.*$/, "")
        .replace(/\?.*$/, "")
        .replace(/\d+\/?$/, "")
        .replace(/index\.html$/, "")
        .replace(/^(.+)\/$/, "$1")
  );
  if (!pageSetting) {
    pageSetting = pageSettingList.find(
      (pageSetting) => pageSetting.to === "error"
    );
  }
  if (!pageSetting) {
    throw `[ERROR] this page ${url} is not exists`;
  }
  console.log(url, pageSetting.to);
  return pageSetting;
};
