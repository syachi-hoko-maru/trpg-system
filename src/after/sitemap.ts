import { writeFileSync } from "fs";
import { pageSettingList } from "../pages/pageSettingList";

const outputDir = `${process.cwd()}/.output/public`;

export const setSitemap = () => {
  let result = "";
  result += `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

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
<image:loc>https://syachi-hoko-maru.github.io/trpg-system/webp/${pageSetting.img}</image:loc>
</image:image>
`;
        }
        result += "</url>";
      } else {
        for (let p = 1; p <= pageSetting.page; p++) {
          result += `
<url>
<loc>
https://syachi-hoko-maru.github.io/trpg-system${pageSetting.to}/${p}
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
<image:loc>https://syachi-hoko-maru.github.io/trpg-system/${pageSetting.img}</image:loc>
</image:image>
`;
          }
          result += "</url>";
        }
      }
    });
  result += "</urlset>";

  writeFileSync(
    `${outputDir}/sitemap.xml`,
    result.replace(/\n/g, "").replace(/\s+/g, " ")
  );
};
