import { readdirSync, writeFileSync } from "fs";

const outputDir = `${process.cwd()}/.output/public`;

const htmls: string[] = [];
const searchHTML = (dirname: string) => {
  const dir = readdirSync(outputDir + dirname);
  dir.forEach((name) => {
    if (/.+\..+/.test(name)) {
      if (name.endsWith(".html")) htmls.push(dirname + "/" + name);
    } else {
      try {
        searchHTML(dirname + "/" + name);
      } catch (err) {
        console.error(err);
      }
    }
  });
};

const setSitemap = () => {
  let result = "";
  result += `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  htmls.forEach((html) => {
    result += `
<url>
<loc>
https://syachi-hoko-maru.github.io/trpg-system${html.replace("index.html", "")}
</loc>
<lastmod>2023-03-01</lastmod>
<priority>0.8</priority>
</url>
    `;
  });
  result += "</urlset>";
  writeFileSync(
    `${outputDir}/sitemap.xml`,
    result.replace(/[\n]/g, "").replace(/\s+/g, " ")
  );
};

searchHTML("");
console.log(htmls);
setSitemap();
