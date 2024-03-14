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
