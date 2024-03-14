import { readdirSync, statSync } from "fs";

/** 再起的にファイルを取得する関数 */
export const getFileListFromDir = (
  dir: string,
  predicate: (s: string) => boolean
): string[] => {
  const result: string[] = [];
  const ds = readdirSync(dir);
  ds.forEach((d) => {
    const dd = dir + "/" + d;
    if (statSync(dd).isDirectory()) {
      // ディレクトリーなら
      result.push(...getFileListFromDir(dd, predicate));
    } else if (predicate(dd)) {
      result.push(dd);
    }
  });
  return result;
};

// 画像関連
export const isImage = (s: string) =>
  s.endsWith(".png") || s.endsWith(".jpeg") || s.endsWith(".jpg");
export const renameImage2webp = (s: string): string =>
  s.replace(".png", "").replace(".jpeg", "").replace(".jpg", "") + ".webp";
export const isSameWebpImage = (webp: string, image: string): boolean =>
  webp === renameImage2webp(image);
