import { readdirSync } from "fs";
import sharp from "sharp";

const pngDir = `${process.cwd()}/public/image`;
const webpDir = `${process.cwd()}/public/webp`;

const imgDirList = readdirSync(pngDir);

const setwebp = (dirname: string) => {
  const pngList = readdirSync(`${pngDir}/${dirname}`).filter(
    (str) =>
      str.endsWith(".png") || str.endsWith(".jpeg") || str.endsWith(".jpg")
  );
  const webpList = readdirSync(`${webpDir}/${dirname}`);
  const sharps: Promise<void>[] = [];
  pngList.forEach((img) => {
    const imgwebp = `${img
      .replace(".png", "")
      .replace(".jpeg", "")
      .replace(".jpg", "")}.webp`;
    if (webpList.indexOf(imgwebp) !== -1) return;
    sharps.push(
      sharp(`${pngDir}/${dirname}/${img}`)
        .webp({
          quality: 75,
        })
        .toFile(`${webpDir}/${dirname}/${imgwebp}`)
        .then(() => {
          console.log(`generate ${imgwebp}`);
        })
        .catch((err: any) => {
          console.error(err);
        })
    );
  });
  return sharps;
};

export const setwebps = () => {
  return Promise.all(imgDirList.map(setwebp));
};
