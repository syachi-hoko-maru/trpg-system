import { readdirSync } from "fs";
import sharp from "sharp";

const imageDir = `${process.cwd()}/public/image`;
const webpDir = `${process.cwd()}/public/webp`;

const imgDirList = readdirSync(imageDir);

const setwebp = (dirname: string) => {
  const imageList = readdirSync(`${imageDir}/${dirname}`).filter(
    (str) =>
      str.endsWith(".png") || str.endsWith(".jpeg") || str.endsWith(".jpg")
  );
  const webpList = readdirSync(`${webpDir}/${dirname}`);

  const sharps: Promise<void>[] = [];

  imageList.forEach((imageFileName) => {
    const webpFileName = `${imageFileName
      .replace(".png", "")
      .replace(".jpeg", "")
      .replace(".jpg", "")}.webp`;
    if (webpList.indexOf(webpFileName) !== -1) return;
    sharps.push(
      sharp(`${imageDir}/${dirname}/${imageFileName}`)
        .webp({
          quality: 75,
        })
        .toFile(`${webpDir}/${dirname}/${webpFileName}`)
        .then(() => {
          console.log(`generate ${webpFileName}`);
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
