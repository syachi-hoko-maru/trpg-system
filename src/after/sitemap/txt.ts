import { pageSettingList } from "../../pages/pageSettingList";
import { searchWordList } from "./searchWordList";
import { isHidden } from "../../pages/getPageSetting";
import { outputDirs } from ".";
import { writeFileSync } from "fs";

export const setSitemapTxt = () => {
  let result = "";
  pageSettingList
    .filter((pageSetting) => !isHidden(pageSetting))
    .forEach((pageSetting) => {
      if (!pageSetting.page?.length) {
        result += `https://trpg.syachi.work${
          pageSetting.to !== "/" ? pageSetting.to + "/" : "/"
        }\n`;
      } else {
        for (let page = 0; page < pageSetting.page.length; page++) {
          result += `https://trpg.syachi.work${pageSetting.to}/${page}/\n`;
        }
      }
    });
  searchWordList.forEach(({ searchWord, lastmod }) => {
    const url = `https://trpg.syachi.work/search/${searchWord
      .map(encodeURIComponent)
      .join("/")}/\n`;
    result += url;
  });

  outputDirs.forEach((outputDir) => {
    writeFileSync(`${outputDir}/sitemap.txt`, result);
  });
};
