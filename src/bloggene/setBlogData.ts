import { readdirSync, readFileSync, writeFileSync } from "fs";
import { blogTextDir, blogImgDir, Blog, blogJSON } from ".";
import { generateImage } from "./geneImage";

export const setBlogData = async () => {
  try {
    const blogImgs = readdirSync(blogImgDir);
    const blogs: Blog[] = [];
    for (let type of ["cms", "code"]) {
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
          if (blogImgs.indexOf(`${id}.png`) === -1) {
            console.log(`start generate image ${id}.png`);
            await generateImage(id, lines[0]).catch((err) => {
              console.error(err);
            });
          }
        }
      }
    }
    writeFileSync(blogJSON, JSON.stringify(blogs), "utf-8");
    console.log("[success] blog.json generated!");
  } catch (err) {
    console.error("\n[error] blog.json generate error!\n\n", err);
  }
};
