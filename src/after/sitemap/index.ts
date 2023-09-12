import { readdirSync, statSync, writeFileSync } from "fs";
import { pageSettingList } from "../../pages/pageSettingList";
import { formatDateString } from "../../util/date";
import { searchWordList } from "./searchWordList";

const outputDirs = [
  `${process.cwd()}/.output/public`,
  `${process.cwd()}/public`,
];

// const searchTagLastmod = "2023-04-10";

export const setSitemap = () => {
  let result = "";

  pageSettingList
    .filter((pageSetting) => !pageSetting.hidden)
    .forEach((pageSetting) => {
      result += setUrlBlock(pageSetting);
    });

  // 検索関連
  searchWordList.forEach(({ searchWord, lastmod }) => {
    const url = `https://syachi-hoko-maru.github.io/trpg-system/search/${searchWord
      .map(encodeURIComponent)
      .join("/")}`;
    result += `<url><loc>${url}</loc><lastmod>${lastmod}</lastmod></url>`;
  });

  result = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${result.replace(/\s+/g, "")}
  </urlset>`;

  outputDirs.forEach((outputDir) => {
    writeFileSync(
      `${outputDir}/sitemap.xml`,
      result.replace(/\n/g, "").replace(/\s+/g, " ")
    );
  });
};

const setUrlBlock = (pageSetting: PageSetting): string => {
  if (!pageSetting.page?.length) {
    return setLocAndLastmod(pageSetting);
  } else {
    let result = "";
    for (let page = 0; page < pageSetting.page.length; page++) {
      result += setLocAndLastmod(pageSetting, page + 1);
    }
    return result;
  }
};

const setLocAndLastmod = (pageSetting: PageSetting, page?: number): string => {
  const url = `https://syachi-hoko-maru.github.io/trpg-system
  ${pageSetting.to !== "/" ? pageSetting.to + "/" : "/"}
  ${page ? page + "/" : ""}`;

  const lastmod = formatDateString(pageSetting.lastmod as string, false);
  return `
  <url>
    <loc>${url}</loc><lastmod>${lastmod}</lastmod>
    ${setImages(pageSetting)}
  </url>`;
};

const publicPath = `${process.cwd()}/public/`;

const setImages = (pageSetting: PageSetting): string => {
  let result = "";
  if (pageSetting.img) {
    const webpUrl = `https://syachi-hoko-maru.github.io/trpg-system/webp/${pageSetting.img}`;
    const pngUrl = `https://syachi-hoko-maru.github.io/trpg-system/image/${pageSetting.img.replace(
      /webp$/,
      "png"
    )}`;
    result += setImage(webpUrl) + setImage(pngUrl);
  }
  pageSetting.imgdirs?.forEach((dir) => {
    const images = readdirSync(publicPath + "image/" + dir);
    const webps = readdirSync(publicPath + "webp/" + dir);

    [
      images.map((n) => "image/" + dir + "/" + n),
      webps.map((n) => "webp/" + dir + "/" + n),
    ]
      .flat()
      .filter((path) => {
        const itemStat = statSync(publicPath + path);
        if (!itemStat.isDirectory()) {
          // ディレクトリではない→画像として追加する
          result += setImage(
            `https://syachi-hoko-maru.github.io/trpg-system/${path}`
          );
        }
      });
  });
  return result;
};

const setImage = (url: string): string => {
  return `<image:image><image:loc>${url}</image:loc></image:image>`;
};
