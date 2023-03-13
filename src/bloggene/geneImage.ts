import { readFileSync, writeFileSync, unlinkSync } from "fs";
import sharp from "sharp";
import { blogImgDir } from ".";

export const generateImage = async (id: string, title: string) => {
  const svgPath = `${process.cwd()}/src/bloggene/ogp.svg`;
  const tmpDir = `${process.cwd()}/src/bloggene/tmp`;

  const pngSize = 1200;

  let svg = readFileSync(svgPath, "utf-8");
  if (title.length <= 12) {
    svg = svg.replace("this is area A", title);
  } else {
    const half = Math.round(title.length / 2);
    svg = svg.replace("this is area B", title.slice(0, half));
    svg = svg.replace("this is area C", title.slice(half));
    svg = svg.replace(/display:\s*\n\s*block;/, "1234567890abcdefg");
    svg = svg.replace(/display:\s*\n\s*none;/, "display: block;");
    svg = svg.replace("1234567890abcdefg", "display: none;");
  }

  const resultPath = `${tmpDir}/${id}.svg`;
  writeFileSync(resultPath, svg, "utf-8");

  console.log("sharp");
  await sharp(resultPath)
    .resize(pngSize)
    .png({
      quality: 100,
    })
    .toFile(`${blogImgDir}/${id}.png`)
    .then(() => {
      unlinkSync(resultPath);
      console.log(`generate ${id}.png`);
    })
    .catch((err: any) => {
      console.error(err);
    });
};
