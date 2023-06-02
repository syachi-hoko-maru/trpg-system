import { readdirSync } from "fs";
import { blogTextDir } from ".";

export const getBlogList = (): string[] => {
  return getList([`${blogTextDir}/cms`, `${blogTextDir}/code`]);
};

export const getScenarioList = (): string[] => {
  return getList([`${blogTextDir}/scenario`]);
};

const getList = (dirList: string[]) => {
  try {
    return dirList
      .map((dir) => readdirSync(dir))
      .flat()
      .filter((fileName) => fileName !== ".gitkeep")
      .map((fileName) => fileName.replace(/\..*$/, ""));
  } catch (err) {
    console.error("getList error!!\n", err);
    return [];
  }
};
