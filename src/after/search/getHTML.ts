import { readdirSync } from "fs";
import { outputDir } from ".";

/**
 * HTMLファイルを集める関数
 * @param dirname
 * @returns file path list
 */
export const searchHTMLFiles = (dirname: string): string[] => {
  const htmls: string[] = [];
  const dir = readdirSync(outputDir + dirname);
  dir.forEach((name) => {
    if (name === ".gitkeep" || name === "200.html" || name === "404.html") {
      return;
    } else if (/.+\..+/.test(name)) {
      if (name.endsWith(".html")) htmls.push(dirname + "/" + name);
    } else {
      if (name.indexOf("search") < 0) {
        // 検索以外であれば再起的に深い階層を確認する
        searchHTMLFiles(dirname + "/" + name).forEach((html) =>
          htmls.push(html)
        );
      }
    }
  });
  return htmls;
};

export const getMainDataFromHTML = (raw: string): string[] => {
  const splitKey = ",";
  const scriptJapanese: string[] = [];
  // const scripts = raw.matchAll(/<script.*<\/script>/g);
  // [...scripts].forEach((s) => {
  //   scriptJapanese.push(
  //     ...s[0]
  //       .replace(/[a-zA-Z0-9]/g, ",")
  //       .split(",")
  //       .filter((s) => s)
  //   );
  // });

  const article = raw.slice(raw.indexOf("<article"), raw.indexOf("</article>"));
  return [
    ...scriptJapanese,
    article
      // コメントアウトを削除
      // .replace(/\/\/.*$/g, "")
      // リンクを削除
      .replace(/<\/a>/g, "＾")
      .replace(/<a[^＾]*＾/g, (a) => {
        // 内部リンクのみを削除する
        if (a.match(/<a[>]+href="\//)) return splitKey;
        else return splitKey + a + splitKey;
      })
      .replace(/＾/g, "</a>")
      // CSS・JS・HTMLタグを削除
      .replace(/\<style[^\<]*\<\/style\>/g, splitKey)
      .replace(
        /<script[^<]*<\/script>/g,
        (str) =>
          // JSは日本語を残しておく
          splitKey + str.replace(/[a-zA-Z0-9]/g, "") + splitKey
      )
      .replace(/<[^>]+>/g, splitKey)
      // おすすめ度の星関係のコードを削除
      .replace(/Rating/g, splitKey)
      .replace(/of/g, splitKey),
  ];
};
