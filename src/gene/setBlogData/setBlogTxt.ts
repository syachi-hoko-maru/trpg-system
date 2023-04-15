import { readdirSync, readFileSync, writeFileSync } from "fs";
import { blogTextDir, Blog, blogJSON, scenarioJson } from "../index";

export const setBlogTxt = async () => {
  try {
    const blogs: Blog[] = [];
    for (let type of ["code", "cms"]) {
      const blogList = readdirSync(`${blogTextDir}/${type}`);
      for (let fileName of blogList) {
        const file = readFileSync(
          `${blogTextDir}/${type}/${fileName}`,
          "utf-8"
        );
        const lines = file.split("\n");
        const id = fileName.replace(/\..*$/, "");
        if (lines.length >= 3) {
          blogs.push({
            id,
            title: lines[0],
            date: lines[1],
            tags: lines[2].split(","),
            andml: lines.slice(3).join("\n"),
          });
        }
      }
    }
    writeFileSync(blogJSON, JSON.stringify(blogs), "utf-8");
    console.log("[success] blog.json generated!");
    return blogs;
  } catch (err) {
    console.error("\n[error] blog.json generate error!\n\n", err);
    return [];
  }
};

export const setScenarioTxt = async () => {
  try {
    const scenarios: { id: string; andml: string }[] = [];
    const blogList = readdirSync(`${blogTextDir}/scenario`);
    for (let fileName of blogList) {
      const file = readFileSync(`${blogTextDir}/scenario/${fileName}`, "utf-8");
      const id = fileName.replace(/\..*$/, "");
      scenarios.push({
        id,
        andml: file,
      });
    }
    writeFileSync(scenarioJson, JSON.stringify(scenarios), "utf-8");
    console.log("[success] scenario.json generated!");
    return scenarios;
  } catch (err) {
    console.error("\n[error] scenario.json generate error!\n\n", err);
    return [];
  }
};
