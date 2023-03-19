import { readdirSync, readFileSync } from "fs";
import sharp from "sharp";
import { blogImgDir, blogJSON, Blog } from "../../index";

import { createCanvas, registerFont } from "canvas";

export const geneImage = async () => {
  const blogImgs = readdirSync(blogImgDir);
  const blogs = JSON.parse(
    readFileSync(blogJSON, "utf-8")
  ) as unknown as Blog[];

  for (let { id, title } of blogs) {
    if (blogImgs.indexOf(`${id}.png`) === -1) {
      console.log(`start generate image ${id}.png`);
      try {
        await generateImage(id, title).catch((err) => {
          console.error(err);
        });
      } catch (err) {
        console.error(err);
      }
    }
  }
};

export const generateImage = async (id: string, title: string) => {
  const width = 1200;
  const height = 630;

  registerFont(
    `${process.cwd()}/src/gene/setBlogData/geneImage/BIZ_UDPMincho/BIZUDPMincho-Regular.ttf`,
    { family: "font" }
  );

  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");
  context.textBaseline = "middle";
  context.fillStyle = "#222";

  const fontSize = 90;

  context.save();

  context.font = `${fontSize}px font`;

  let line = "";
  const lines = [];
  for (let i = 0; i < title.length; i++) {
    line += title[i];
    if (lines.length < 3) {
      const lineWidth = context.measureText(line).width;
      if (lineWidth > width - 300 || i == title.length - 1) {
        lines.push({ text: line, width: lineWidth });
        line = "";
      }
    } else {
      if (i == title.length - 1) {
        lines.push({ text: line, width: context.measureText(line).width });
      } else {
        const lineWidth = context.measureText(line + "...").width;
        if (lineWidth > width - 300) {
          lines.push({ text: line + "...", width: lineWidth });
        }
      }
    }
  }

  const lineHeight = fontSize * 1.2;

  const x = width / 2;
  context.textAlign = "center";

  lines.forEach((line, index) => {
    const y =
      index * lineHeight + height / 2 - (lineHeight / 2) * (lines.length - 1);
    context.fillText(line.text, x, y);
  });

  context.restore();

  await sharp(`${process.cwd()}/src/gene/ogp.svg`)
    .composite([{ input: canvas.toBuffer(), top: 0, left: 0 }])
    .png()
    .toFile(`${blogImgDir}/${id}.png`);
};
