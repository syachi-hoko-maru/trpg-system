import { readdirSync, readFileSync, writeFileSync } from "fs";

const outputDir = `${process.cwd()}/.output/public`;
const publicDir = `${process.cwd()}/public`;

const searchHTML = (dirname: string) => {
  const htmls: string[] = [];
  const dir = readdirSync(outputDir + dirname);
  dir.forEach((name) => {
    if (name === ".gitkeep" || name === "200.html" || name === "404.html") {
      return;
    } else if (/.+\..+/.test(name)) {
      if (name.endsWith(".html")) htmls.push(dirname + "/" + name);
    } else {
      searchHTML(dirname + "/" + name).forEach((html) => htmls.push(html));
    }
  });
  return htmls;
};

const getData = (): { [key: string]: string } => {
  const htmls = searchHTML("");
  const temp: { [key: string]: string } = {};
  htmls.forEach((html) => {
    const path = html.replace("/index.html", "");
    temp[path ? path : "/"] = readFileSync(outputDir + html, "utf-8")
      .replace(/<a href.+?\/a>/g, "")
      .replace(/\<style[^\<]*\<\/style\>/g, "")
      .replace(/<script[^<]*<\/script>/g, (str) => str.replace(/[a-zA-Z]/g, ""))
      .replace(/<[^>]+>/g, "")
      .replace(/[\s\{\}\[\]\(\)<>\\\/\.,:;\-_'`"$&=]/g, "")
      .replace(/Rating/g, "")
      .replace(/of/g, "");
  });
  const values = Object.values(temp);
  let common: { str: string; count: number }[] = [];
  values.forEach((value, i) => {
    const strArray: string[] = [];
    values.forEach((v, j) => {
      if (i >= j) return;
      getCommonStr(v, value).forEach((commonStr) => {
        if (strArray.indexOf(commonStr) === -1) strArray.push(commonStr);
      });
    });
    strArray.forEach((commonStr) => {
      const index = common.findIndex(({ str }) => str === commonStr);
      if (index >= 0) common[index].count++;
      else common.push({ str: commonStr, count: 1 });
    });
  });
  const commonStrArray: string[] = common
    .filter((co) => co.count + co.str.length / 3 > htmls.length / 2)
    .map((co) => co.str)
    .sort((a, b) => b.length - a.length);
  console.log(commonStrArray);
  const result: { [key: string]: string } = {};
  Object.entries(temp).forEach(([k, v]) => {
    let value = v;
    commonStrArray.forEach((commonStr) => {
      value = value.replaceAll(commonStr, "");
    });
    const p = k.replace(/\/\d+/, "");
    if (!result[p]) result[p] = "";
    result[p] += value;
  });
  return result;
};

export const setSearchJson = () => {
  const searchJson = JSON.stringify(getData());
  writeFileSync(`${outputDir}/search.json`, searchJson);
  writeFileSync(`${publicDir}/search.json`, searchJson);
};

const getCommonStr = (str1: string, str2: string): string[] => {
  const common: string[] = [];
  const charArr = str1.split("");
  let str = "";
  charArr.forEach((c, j) => {
    const index = str2.indexOf(str + c);
    if (index === -1 || j === charArr.length - 1) {
      if (str.length >= 3 && common.indexOf(str) === -1) {
        common.push(str);
      }
      str = c;
    } else {
      str += c;
    }
  });
  return common.sort((a, b) => b.length - a.length);
};
