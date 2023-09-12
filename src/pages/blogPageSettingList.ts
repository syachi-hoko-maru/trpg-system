import blogSettingList from "../../assets/blog.json";
import { isPast } from "../util/date";
import { setBlogExplain } from "./blogExplain";
import { isPageTag } from "./pageTags";

let count = 0;

export const blogPageSettingList: PageSetting[] = (blogSettingList as Blog[])
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .map((b, i) => {
    const dateFlag = isPast(b.date);
    const osusumeTagFlag =
      b.tags.filter((tag) => tag !== "me" && tag !== "rm").length > 0;
    if (dateFlag && osusumeTagFlag) count++;
    console.log(b.img);
    return {
      title: b.title,
      to: "/blog/" + b.id,
      img: b.img,
      lastmod: b.date,
      tags: b.tags.filter(isPageTag) as PageTag[],
      osusume: count <= 10 && dateFlag && osusumeTagFlag ? true : false,
      hidden: dateFlag ? false : true,
      explain: setBlogExplain(b, 100),
    };
  });
