import { readdirSync } from "fs";
import sharp from "sharp";

const pngDir = `${process.cwd()}/public`;
const webpDir = `${process.cwd()}/public/webp`;

const pageImg = `page-image`;
const blogImg = `blog-image`;

const setwebp = (dirname: string) => {
  const pngList = readdirSync(`${pngDir}/${dirname}`).filter((str) =>
    str.endsWith(".png")
  );
  const webpList = readdirSync(`${webpDir}/${dirname}`).filter((str) =>
    str.endsWith(".webp")
  );
  const sharps: Promise<void>[] = [];
  pngList.forEach((img) => {
    if (webpList.indexOf(img) !== -1) return;
    sharps.push(
      sharp(`${pngDir}/${dirname}/${img}`)
        .webp({
          quality: 75,
        })
        .toFile(`${webpDir}/${dirname}/${img.replace(".png", "")}.webp`)
        .then(() => {
          console.log(`generate ${img.replace(".png", "")}.webp`);
        })
        .catch((err: any) => {
          console.error(err);
        })
    );
  });
  return sharps;
};

export const setwebps = () => {
  return Promise.all([...setwebp(pageImg), ...setwebp(blogImg)]);
};
