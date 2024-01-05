import { readdirSync, statSync, writeFileSync } from "fs";
import { pageSettingList } from "../../pages/pageSettingList";
import { formatDateString } from "../../util/date";
import { searchWordList } from "./searchWordList";
import { isHidden } from "../../pages/getPageSetting";

export const outputDirs = [
  `${process.cwd()}/.output/public`,
  `${process.cwd()}/public`,
];

export const setSitemap = () => {
  let result = "";

  // ページ
  pageSettingList
    .filter((pageSetting) => !isHidden(pageSetting))
    .forEach((pageSetting) => {
      result += setUrlBlock(pageSetting);
    });

  // 検索ページ関連
  searchWordList.forEach(({ searchWord, lastmod }) => {
    const url = `https://trpg.syachi.work/search/${searchWord
      .map(encodeURIComponent)
      .join("/")}/`;
    result += `<url><loc>${url}</loc><lastmod>${lastmod}</lastmod></url>`;
  });

  result = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${result}
</urlset>`;

  outputDirs.forEach((outputDir) => {
    writeFileSync(
      `${outputDir}/sitemap.xml`,
      result.replace(/\s+/g, " ").replace(/>\s*</g, ">\n<")
    );
  });
  console.log("  sitemap was created");
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
  const url = `https://trpg.syachi.work${
    pageSetting.to !== "/" ? pageSetting.to + "/" : "/"
  }${page ? page + "/" : ""}`;

  const lastmod = formatDateString(pageSetting.lastmod as string, false);
  return `
<url>
  <loc>${url}</loc>
  <lastmod>${lastmod}</lastmod>
  ${setImages(pageSetting)}
</url>`;
};

const publicPath = `${process.cwd()}/public/`;

const setImages = (pageSetting: PageSetting): string => {
  let result = "";
  // pageSetting.imgの処理
  if (pageSetting.img && pageSetting.img.endsWith(".webp")) {
    const webpUrl = `https://trpg.syachi.work/webp/${pageSetting.img}`;
    const pngUrl = `https://trpg.syachi.work/image/${pageSetting.img.replace(
      /webp$/,
      "png"
    )}`;
    result += setImage(webpUrl) + setImage(pngUrl);
  } else {
    const imgUrl = `https://trpg.syachi.work/webp/${pageSetting.img}`;
    result += setImage(imgUrl);
  }
  // pageSetting.imgDirsの処理
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
          result += setImage(`https://trpg.syachi.work/${path}`);
        }
      });
  });
  return result;
};

const setImage = (url: string): string => {
  return `<image:image><image:loc>${url}</image:loc></image:image>`;
};
