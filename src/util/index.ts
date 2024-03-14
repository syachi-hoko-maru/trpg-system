import { readdirSync, statSync } from "fs";

/**
 * 一定時間、待つasync関数
 * @param ms 待つ時間（ms）
 * @returns 待った時間（ms）
 */
export const wait = <T extends number>(ms: T): Promise<T> => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve(ms);
    }, ms);
  });
};

/**
 * sha256でハッシュ値を生成する
 * @param text
 * @returns
 */
export const getHash = (text: string): Promise<string> => {
  return new Promise((resolve) => {
    const msgUint8 = new window.TextEncoder().encode(text);
    crypto.subtle.digest("SHA-256", msgUint8).then((hashBuffer) => {
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray
        .map((b) => {
          return b.toString(16).padStart(2, "0");
        })
        .join("");
      return resolve(hashHex);
    });
  });
};

/**
 * 配列をシャッフルする関数
 */
export const shuffle = <T>(array: Array<T>) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

type Entries<T> = (keyof T extends infer U
  ? U extends keyof T
    ? [U, T[U]]
    : never
  : never)[];
export const getEntries = <T extends Record<string, unknown>>(
  obj: T
): Entries<T> => {
  return Object.entries(obj) as Entries<T>;
};

type Keys<T> = (keyof T extends infer U
  ? U extends keyof T
    ? U
    : never
  : never)[];
export const getKeys = <T extends Record<string, unknown>>(obj: T): Keys<T> => {
  return Object.keys(obj) as Keys<T>;
};

type Values<T> = (keyof T extends infer U
  ? U extends keyof T
    ? T[U]
    : never
  : never)[];
export const getValues = <T extends Record<string, unknown>>(
  obj: T
): Values<T> => {
  return Object.values(obj) as Values<T>;
};

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
