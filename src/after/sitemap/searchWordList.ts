import { sampleWords } from "../../search/sampleWords";
import { pageTags } from "../../pages/pageTags";
import { ginou } from "../../dict/ginou";
import { syuzoku } from "../../dict/syuzoku";

export const searchWordList: { searchWord: string[]; lastmod: string }[] = [
  ...sampleWords.map((word) => ({
    searchWord: word.split(" "),
    lastmod: "2023-09-14",
  })),
  // ...pageTags.map((tag) => ({
  //   searchWord: [tag],
  //   lastmod: "2023-09-??",
  // })),
  // ...Object.keys(syuzoku).map((w) => ({
  //   searchWord: [w],
  //   lastmod: "2023-09-??",
  // })),
  // ...Object.keys(ginou).map((w) => ({
  //   searchWord: [w],
  //   lastmod: "2023-09-??",
  // })),
];
