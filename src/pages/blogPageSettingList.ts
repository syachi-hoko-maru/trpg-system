import blogSettingList from "../../assets/blog.json";
import secretSettingList from "../../assets/secret.json";
import { isPast } from "../util/date";
import { setBlogExplain } from "./blogExplain";
import { isPageTag } from "./pageTags";

let count = 0;

export const blogPageSettingList: PageSetting[] = (blogSettingList as Blog[])
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .map((b, i) => {
    const osusumeTagFlag =
      b.tags.filter((tag) => tag !== "me" && tag !== "rm" && tag !== "tech")
        .length > 0;
    if (osusumeTagFlag && isPast(b.date)) count++;
    return {
      title: b.title.replace(/¥s/g, " "),
      to: "/blog/" + b.id,
      img: b.img,
      created: b.date,
      lastmod: b.date2,
      tags: b.tags.filter(isPageTag) as PageTag[],
      osusume:
        // 「TRPGいろいろ」は常におすすめ
        b.tags.indexOf("otrpg") >= 0
          ? true
          : // オススメにならないタグを持つ最新10記事
          count <= 10 && osusumeTagFlag
          ? true
          : false,
      hiddenFlag: false, // dateFlag ? false : true,
      explain: setBlogExplain(b, 100),
    };
  });

export const secretgPageSettingList: PageSetting[] = (
  secretSettingList as SecretJson
).list.map((b, i) => {
  return {
    title: "隠しページ",
    to: "/secret/" + b.id,
    lastmod: "1900/1/1",
    tags: ["me"] as PageTag[],
    osusume: false,
    hiddenFlag: false,
    explain: "隠しページです",
  };
});
