import { readdirSync, readFileSync, writeFileSync } from "fs";
import { word4search } from "./word4search";
import { getMainDataFromHTML, searchHTMLFiles } from "./getHTML";

export const outputDir = `${process.cwd()}/.output/public`;
export const publicDir = `${process.cwd()}/public`;

const getData = (): { [key: string]: [string, number][] } => {
  // htmlを全て取得する
  const htmlList = searchHTMLFiles("");
  // htmlの中身を取得する
  const temp: { [pageTo: string]: string[] } = {};
  htmlList.forEach((html) => {
    const path = html.replace("/index.html", "");
    const fileData = readFileSync(outputDir + html, "utf-8");
    temp[path ? path : "/"] = getMainDataFromHTML(fileData)
      .map((s) => word4search(s))
      .flat();
  });

  const keywords: { [pageTo: string]: { [keyword: string]: number } } = {};
  const all: { [keywords: string]: string[] } = {};
  Object.entries(temp).forEach(([page, ks]) => {
    keywords[page] = {};
    ks.forEach((k) => {
      if (!all[k]) {
        all[k] = [];
      }
      if (all[k].indexOf(page) === -1) {
        all[k].push(page);
      }
      if (!keywords[page][k]) {
        keywords[page][k] = 0;
      }
      keywords[page][k]++;
    });
  });

  // 整形する
  const result: { [key: string]: [string, number][] } = {};
  Object.entries(keywords).forEach(([p, value]) => {
    const page = p.replace(/\/\d+\/?$/, "");
    if (!result[page]) result[page] = [];
    Object.entries(value).forEach(([keyword, count]) => {
      const num = Math.round(
        count - (all[keyword].length / htmlList.length) * 1.5
      );
      if (num > 0) {
        result[page].push([keyword, num]);
      }
    });
  });
  return result;
};

export const setSearchJson = () => {
  const searchJson = JSON.stringify(getData());
  writeFileSync(`${outputDir}/search.json`, searchJson);
  writeFileSync(`${publicDir}/search.json`, searchJson);
};
