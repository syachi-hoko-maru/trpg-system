import blogSettingList from "../../assets/blog.json";
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
      title: b.title,
      to: "/blog/" + b.id,
      img: b.img,
      created: b.date,
      lastmod: b.date2,
      tags: b.tags.filter(isPageTag) as PageTag[],
      osusume: count <= 10 && osusumeTagFlag ? true : false,
      hiddenFlag: false, // dateFlag ? false : true,
      explain: setBlogExplain(b, 100),
    };
  });
