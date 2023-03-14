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
      .replace(/<style[^<]*<\/style>/g, "")
      .replace(/<script[^<]*<\/script>/g, (str) =>
        str.replace(/[a-zA-Z\s\{\}\[\]\(\)<>\\\/\.,:;\-_'`"$&#=]/g, "")
      )
      .replace(/<[^>]+>/g, "")
      .replace(/"/g, "")
      .replace(/\s/g, "");
  });
  const values = Object.values(temp);
  let common: string[] = [];
  values.forEach((value, i) => {
    if (i === 0) return;
    if (i === 1) {
      common = getCommonStr(values[0], value);
    } else {
      common = getCommonStr(common.join(" "), value);
    }
  });
  common.sort((a, b) => b.length - a.length);
  // console.log(common);
  const result: { [key: string]: string } = {};
  Object.entries(temp).forEach(([k, v]) => {
    let value = v;
    common.forEach((commonStr) => {
      value = value.replaceAll(commonStr, "");
    });
    result[k] = value;
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
  return common;
};
