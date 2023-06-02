import { readdirSync, readFileSync } from "fs";
import sharp from "sharp";
import { blogImgDir, blogJSON, Blog } from "../../index";

import { createCanvas, registerFont } from "canvas";

export const geneImage = async () => {
  const blogImgs = readdirSync(blogImgDir);
  const blogs = JSON.parse(
    readFileSync(blogJSON, "utf-8")
  ) as unknown as Blog[];

  for (let { id, title, tags, date } of blogs) {
    if (blogImgs.indexOf(`${id}.png`) === -1) {
      console.log(`start generate image ${id}.png`);
      try {
        const img =
          `${process.cwd()}/src/pre/gene/setBlogData/geneImage/` +
          (tags.join("").indexOf("sw25") >= 0 ? "ogp_sw25.svg" : "ogp.svg");
        await generateImage(id, title, img, date).catch((err) => {
          console.error(err);
        });
      } catch (err) {
        console.error(err);
      }
    }
  }
};

const generateImage = async (
  id: string,
  title: string,
  img: string,
  date: string
) => {
  const width = 1200;
  const height = 630;

  registerFont(
    `${process.cwd()}/src/pre/gene/setBlogData/geneImage/BIZ_UDPMincho/BIZUDPMincho-Regular.ttf`,
    { family: "font" }
  );

  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");
  context.textBaseline = "middle";
  context.fillStyle = "#222";

  const fontSize = 80;

  context.save();

  context.font = `${fontSize}px font`;

  const baseWidth = width - 250;
  let countOverLine = 0;
  const lines = title
    .replace(/([！!？?]+)/g, "$1 ")
    .split(" ")
    .filter((line) => line)
    .map((line) => {
      const length = context.measureText(line).width;
      countOverLine += Math.floor(length / baseWidth);
      return { text: line, length };
    });

  const resultLines: string[] = [];
  lines.forEach((line, i) => {
    if (resultLines.length > 2) return;
    if (line.length <= baseWidth) {
      resultLines.push(line.text);
    } else {
      let text = "";
      for (let i = 0; i < line.text.length; i++) {
        if (resultLines.length > 2) return;
        text += line.text[i];
        if (
          context.measureText(text + (resultLines.length === 2 ? "......" : ""))
            .width > baseWidth
        ) {
          resultLines.push(
            text.slice(0, -1) + (resultLines.length === 2 ? "......" : "")
          );
          text = line.text[i];
        } else if (i === line.text.length - 1) {
          resultLines.push(text);
          text = "";
        }
      }
    }
  });

  const lineHeight = fontSize * 1.2;

  const x = width / 2;
  context.textAlign = "center";

  resultLines.forEach((line, index) => {
    const y =
      index * lineHeight +
      height / 2 -
      (lineHeight / 2) * (resultLines.length - 1);
    context.fillText(line, x, y);
  });
  context.restore();

  context.save();
  context.font = `20px font`;
  context.fillStyle = "#5e3012";
  context.textAlign = "center";
  context.fillText(date, x, 105);
  context.restore();

  await sharp(img)
    .composite([{ input: canvas.toBuffer(), top: 0, left: 0 }])
    .png()
    .toFile(`${blogImgDir}/${id}.png`);
};
