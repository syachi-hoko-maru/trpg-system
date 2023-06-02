import { writeFileSync } from "fs";
import { pageTags } from "../../pages/pageTags";
import { pageSettingList } from "../../pages/pageSettingList";
// import { searchWordList } from "./searchWordList";

const outputDir = `${process.cwd()}/.output/public`;

// const searchTagLastmod = "2023-04-10";

export const setSitemap = () => {
  let result = "";

  pageSettingList
    .filter((page) => !page.hidden)
    .forEach((pageSetting) => {
      if (!pageSetting.page) {
        result += `
<url>
<loc>
https://syachi-hoko-maru.github.io/trpg-system
${pageSetting.to ? pageSetting.to + "/" : "/"}
</loc>
<lastmod>
${(pageSetting.lastmod as string)
  .split("/")
  .map((str) => (str.length < 2 ? "0" + str : str))
  .join("-")}
</lastmod>`;
        if (pageSetting.img) {
          result += `
<image:image>
<image:loc>
https://syachi-hoko-maru.github.io/trpg-system/webp/${pageSetting.img}
</image:loc>
</image:image>
<image:image>
<image:loc>
https://syachi-hoko-maru.github.io/trpg-system/${pageSetting.img.replace(
            /webp$/,
            "png"
          )}
</image:loc>
</image:image>

`;
        }
        result += "</url>";
      } else {
        for (let p = 1; p <= pageSetting.page; p++) {
          result += `
<url>
<loc>
https://syachi-hoko-maru.github.io/trpg-system${pageSetting.to}/${p}/
</loc>
<lastmod>
${(pageSetting.lastmod as string)
  .split("/")
  .map((str) => (str.length < 2 ? "0" + str : str))
  .join("-")}
</lastmod>
    `;
          if (pageSetting.img) {
            result += `
<image:image>
<image:loc>
https://syachi-hoko-maru.github.io/trpg-system/webp/${pageSetting.img}
</image:loc>
</image:image>
<image:image>
<image:loc>
https://syachi-hoko-maru.github.io/trpg-system/${pageSetting.img.replace(
              /webp$/,
              "png"
            )}
</image:loc>
</image:image>
`;
          }
          result += "</url>";
        }
      }
    });

  //   searchWordList.forEach(([word, lastmod]) => {
  //     result += `
  // <url>
  //     <loc>
  //     https://syachi-hoko-maru.github.io/trpg-system/search/?word=${encodeURIComponent(
  //       word
  //     )}
  //     </loc>
  //     <lastmod>${lastmod}</lastmod>
  // </url>
  //     `;
  //   });

  //   pageTags.forEach((tag) => {
  //     result += `
  // <url>
  //     <loc>
  //     https://syachi-hoko-maru.github.io/trpg-system/search/?tag=${encodeURIComponent(
  //       tag
  //     )}
  //     </loc>
  //     <lastmod>${searchTagLastmod}</lastmod>
  // </url>
  //     `;
  //   });

  result =
    '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">' +
    result.replace(/\s+/g, "") +
    "</urlset>";

  writeFileSync(
    `${outputDir}/sitemap.xml`,
    result.replace(/\n/g, "").replace(/\s+/g, " ")
  );
};
