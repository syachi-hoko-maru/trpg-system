import { readdirSync } from "fs";
import { blogTextDir } from ".";

export const getBlogList = (): string[] => {
  try {
    const blogcmsList = readdirSync(`${blogTextDir}/cms`);
    const blogcodeList = readdirSync(`${blogTextDir}/code`);
    const blogList = ([] as string[])
      .concat(blogcmsList, blogcodeList)
      .filter((fileName) => fileName !== ".gitkeep")
      .map((fileName) => fileName.replace(/\..*$/, ""));
    return blogList;
  } catch (err) {
    console.error("getBlogList error!!\n", err);
    return [];
  }
};
