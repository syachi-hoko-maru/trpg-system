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
