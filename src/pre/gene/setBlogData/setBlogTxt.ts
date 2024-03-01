import { readdirSync, readFileSync, writeFileSync } from "fs";
import { blogTextDir, RawBlog, blogJSON, scenarioJson } from "../index";

export const setBlogTxt = async (): Promise<RawBlog[]> => {
  try {
    const blogs: RawBlog[] = [];
    for (let type of ["code", "code2", "cms"]) {
      const blogList = readdirSync(`${blogTextDir}/${type}`);
      for (let fileName of blogList) {
        if (!fileName.endsWith(".txt")) continue;
        const id = fileName.replace(/\..*$/, "");
        const file = readFileSync(
          `${blogTextDir}/${type}/${fileName}`,
          "utf-8"
        );
        const lines = file.split("\n");
        if (lines.length >= 4) {
          // OGPを指定する場合の処理
          let bodyStratLine = 3;
          let img: string = `blog-image/${id}\.webp`;
          if (lines[3].startsWith("ogp=")) {
            bodyStratLine = 4;
            img = `page-image/${lines[3].replace("ogp=", "")}\.webp`;
          }
          // OGP処理ここまで
          // 日付処理（2023/11/5追加、更新用）
          const dates = lines[1].split(",");
          const date = dates[0];
          const date2 = dates[1] ? dates[1] : dates[0];
          // 日付処理ここまで
          blogs.push({
            id,
            // 1行目がタイトル
            title: lines[0],
            // 2行目が日付
            date: date,
            date2: date2,
            // 3行目がタグ
            tags: lines[2].split(","),
            // 以降がブログ本文
            andml: lines.slice(bodyStratLine).join("\n"),
            img,
          });
        } else {
          console.error(`\n[error] id=${id} is too short!`);
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
