import { existsSync, readdirSync, readFileSync } from "fs";
import sharp from "sharp";
import { blogImgDir, blogJSON, RawBlog } from "../../index";

import { createCanvas, registerFont } from "canvas";

type OGPType = "normal" | "sw25" | "rm" | "rugby" | "tech";

export const geneImage = async () => {
  // const blogImgs = readdirSync(blogImgDir);
  const blogs = JSON.parse(
    readFileSync(blogJSON, "utf-8")
  ) as unknown as RawBlog[];

  for (let { title, tags, date, img } of blogs) {
    const pngImg = img.replace(/\.webp$/, ".png");
    // imgがあるか調べる
    const imgPath = `${process.cwd()}/public/image/${pngImg}`;
    if (!existsSync(imgPath)) {
      console.log(`start generate image ${pngImg}`);
      try {
        const tagList = tags.join("");
        const ogpType: OGPType =
          tagList.indexOf("tech") >= 0
            ? "tech"
            : tagList.indexOf("rugby") >= 0
            ? "rugby"
            : tagList.indexOf("rm") >= 0
            ? "rm"
            : tagList.indexOf("sw25") >= 0
            ? "sw25"
            : "normal";
        await generateImage(pngImg, title, ogpType, date).catch((err) => {
          console.error(err);
        });
      } catch (err) {
        console.error(err);
      }
    }
  }
};

const typeDict: {
  [key in OGPType]: { image: string; color: string; lineColor: string };
} = {
  normal: { image: "ogp.svg", color: "#222", lineColor: "#5e3012" },
  sw25: { image: "ogp_sw25.svg", color: "#222", lineColor: "#5e3012" },
  rm: { image: "ogp_rm.svg", color: "#004B98", lineColor: "#FFD700" },
  rugby: { image: "ogp_rugby.svg", color: "#fff", lineColor: "#fff" },
  tech: { image: "ogp_tech.svg", color: "#fff", lineColor: "#fff" },
};

const generateImage = async (
  pngImg: string,
  title: string,
  ogpType: OGPType,
  date: string
) => {
  const width = 1200;
  const height = 630;

  const dict = typeDict[ogpType];

  registerFont(
    `${process.cwd()}/src/pre/gene/setBlogData/geneImage/BIZ_UDPMincho/BIZUDPMincho-Regular.ttf`,
    { family: "font" }
  );

  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");
  context.textBaseline = "middle";
  context.fillStyle = dict.color;

  const fontSize = 80;

  context.save();

  context.font = `${fontSize}px font`;

  const baseWidth = width - 250;
  let countOverLine = 0;
  const lines = title
    // .replace(/([！!？?]+)/g, "$1 ")
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
  context.fillStyle = dict.lineColor;
  context.textAlign = "center";
  context.fillText(date, x, 105);
  context.restore();

  const img = `${process.cwd()}/src/pre/gene/setBlogData/geneImage/${
    dict.image
  }`;

  await sharp(img)
    .composite([{ input: canvas.toBuffer(), top: 0, left: 0 }])
    .png()
    .toFile(`${blogImgDir}/${pngImg.replace("blog-image/", "")}`);
};
