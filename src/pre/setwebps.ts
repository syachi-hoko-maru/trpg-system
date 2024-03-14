import { mkdirSync, readdirSync, statSync } from "fs";
import sharp from "sharp";
import { imageDir, webpDir } from "../util/pathList";

const imgDirList = readdirSync(imageDir);

const setwebp = (dirname: string) => {
  const itemList = readdirSync(`${imageDir}/${dirname}`);
  const imageList: string[] = [];

  itemList.forEach((itemName) => {
    // 画像ファイルの場合、imageListにぶち込む
    if (isImage(itemName)) {
      imageList.push(itemName);
    } else {
      // ディレクトリならその階層に対してsetwebpをする
      const itemStat = statSync(`${imageDir}/${dirname}/${itemName}`);
      if (itemStat.isDirectory()) {
        setwebp(`${dirname}/${itemName}`);
      }
    }
  });

  let webpList: string[];
  try {
    webpList = readdirSync(`${webpDir}/${dirname}`);
  } catch {
    mkdirSync(`${webpDir}/${dirname}`, { recursive: true });
    webpList = [];
  }

  const sharps: Promise<void>[] = [];

  imageList.forEach((imageFileName) => {
    const webpFileName = renameImage2webp(imageFileName);
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

export const isImage = (s: string) =>
  s.endsWith(".png") || s.endsWith(".jpeg") || s.endsWith(".jpg");
export const renameImage2webp = (s: string): string =>
  s.replace(".png", "").replace(".jpeg", "").replace(".jpg", "") + ".webp";
export const isSameWebpImage = (webp: string, image: string): boolean =>
  webp === renameImage2webp(image);
